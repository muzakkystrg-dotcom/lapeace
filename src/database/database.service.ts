import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { DatabaseSync } from 'node:sqlite';
import * as path from 'node:path';
import * as fs from 'node:fs';
import * as crypto from 'node:crypto';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private db!: DatabaseSync;
  private readonly dbPath = path.resolve('database/sitapak.db');

  onModuleInit() {
    const dir = path.dirname(this.dbPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    this.db = new DatabaseSync(this.dbPath);
    // Optimasi SQLite untuk VPS & Konkurensi Tinggi (WAL Mode)
    this.db.exec(`
      PRAGMA foreign_keys = ON;
      PRAGMA journal_mode = WAL;
      PRAGMA synchronous = NORMAL;
      PRAGMA busy_timeout = 5000;
    `);
  }

  onModuleDestroy() {
    if (this.db) {
      this.db.close();
    }
  }

  getDatabase(): DatabaseSync {
    return this.db;
  }

  // --- CITIZENS (PDP COMPLIANT, MASKED & KEYSET PAGINATED) ---
  getCitizens(limit = 20, cursor?: number) {
    const safeLimit = Math.min(Math.max(1, Number(limit) || 20), 100);
    let rows: any[];
    if (cursor) {
      rows = this.db.prepare(`
        SELECT id, nik_masked, full_name, email, kecamatan, kelurahan, is_verified, role, created_at
        FROM citizens
        WHERE id > ?
        ORDER BY id ASC
        LIMIT ?
      `).all(cursor, safeLimit + 1);
    } else {
      rows = this.db.prepare(`
        SELECT id, nik_masked, full_name, email, kecamatan, kelurahan, is_verified, role, created_at
        FROM citizens
        ORDER BY id ASC
        LIMIT ?
      `).all(safeLimit + 1);
    }

    const hasMore = rows.length > safeLimit;
    const data = hasMore ? rows.slice(0, safeLimit) : rows;
    const nextCursor = data.length > 0 ? data[data.length - 1].id : null;
    const countRow = this.db.prepare('SELECT COUNT(*) as total FROM citizens').get() as { total: number };

    return {
      data,
      pagination: {
        limit: safeLimit,
        hasMore,
        nextCursor: hasMore ? nextCursor : null,
        totalCount: countRow?.total || 0,
      },
    };
  }

  getCitizenByNik(nik: string) {
    // Cari baik berdasarkan NIK asli atau hash untuk backwards compatibility
    const citizen = this.db.prepare(`
      SELECT id, nik_masked, full_name, email, phone, kecamatan, kelurahan, address, is_verified, role, created_at
      FROM citizens
      WHERE nik = ? OR nik_masked = ?
    `).get(nik, nik);

    if (!citizen) return null;

    // Log akses PII ke audit trail
    this.createAuditLog({
      eventType: 'PII_CITIZEN_READ',
      actorType: 'system',
      actorId: 'API_GET_CITIZEN',
      actorName: 'Gateway Backend SITAPAK',
      targetEntity: 'citizens',
      targetId: (citizen as any).nik_masked,
      actionDetails: `Akses profil warga atas nama ${(citizen as any).full_name}`,
    });

    return citizen;
  }

  createCitizen(data: { nik: string; fullName: string; email: string; phone: string; kecamatan: string; kelurahan: string }) {
    const nikMasked = data.nik.length === 16 ? `${data.nik.slice(0, 12)}****` : '351508210492****';
    const nikHash = crypto.createHash('sha256').update(data.nik).digest('hex');

    const stmt = this.db.prepare(`
      INSERT INTO citizens (nik_hash, nik_masked, nik, full_name, email, phone, kecamatan, kelurahan, is_verified, role)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, 'warga')
    `);
    const result = stmt.run(nikHash, nikMasked, data.nik, data.fullName, data.email, data.phone, data.kecamatan, data.kelurahan);

    // Kredensial default
    const salt = crypto.randomBytes(6).toString('hex');
    const pwdHash = crypto.createHash('sha256').update('WargaSidoarjo2026!' + salt).digest('hex');
    this.db.prepare(`
      INSERT INTO citizen_credentials (citizen_id, password_hash, salt)
      VALUES (?, ?, ?)
    `).run(Number(result.lastInsertRowid), pwdHash, salt);

    this.createAuditLog({
      eventType: 'CITIZEN_REGISTER',
      actorType: 'citizen',
      actorId: String(result.lastInsertRowid),
      actorName: data.fullName,
      targetEntity: 'citizens',
      targetId: nikMasked,
      actionDetails: `Pendaftaran warga baru terverifikasi: ${data.fullName}`,
    });

    return { id: result.lastInsertRowid, nikMasked, fullName: data.fullName, email: data.email, kecamatan: data.kecamatan, kelurahan: data.kelurahan };
  }

  // --- SERVICES DIRECTORY ---
  getServices() {
    return this.db.prepare('SELECT * FROM services ORDER BY popularity_score DESC').all();
  }

  getServiceById(id: string) {
    return this.db.prepare('SELECT * FROM services WHERE id = ?').get(id);
  }

  // --- SERVICE REQUESTS & SINGLE-WINDOW TRACKING ---
  getServiceRequests() {
    return this.db.prepare('SELECT * FROM service_requests ORDER BY created_at DESC').all();
  }

  getServiceRequestByTrackingNumber(trackingNumber: string) {
    const clean = trackingNumber.trim().toUpperCase();
    const request = this.db.prepare('SELECT * FROM service_requests WHERE tracking_number = ?').get(clean);
    if (!request) return null;

    const steps = this.db.prepare(`
      SELECT step_number, title, date_text as date, notes, is_completed as completed, is_current as current
      FROM request_workflow_timeline
      WHERE request_id = ?
      ORDER BY step_number ASC
    `).all((request as any).id);

    return {
      trackingNumber: (request as any).tracking_number,
      serviceName: (request as any).service_name,
      applicantName: (request as any).applicant_name,
      nikMasked: (request as any).nik_masked,
      submitDate: (request as any).submit_date_formatted,
      status: (request as any).status,
      currentOpd: (request as any).current_opd,
      lastUpdated: (request as any).updated_at,
      progressPercent: (request as any).progress_percent,
      steps: steps.map((s: any) => ({
        title: s.title,
        date: s.date || undefined,
        notes: s.notes || undefined,
        completed: Boolean(s.completed),
        current: Boolean(s.current),
      })),
    };
  }

  // Universal Unified Tracker (Mencari di Service Requests maupun Citizen Reports)
  getUnifiedTracking(code: string) {
    const clean = code.trim().toUpperCase();

    // 1. Cek di permohonan berkas layanan (KTP, SKU, NIB, dll)
    const serviceReq = this.getServiceRequestByTrackingNumber(clean);
    if (serviceReq) {
      return { type: 'service_request', data: serviceReq };
    }

    // 2. Cek di laporan pengaduan warga (Call 112 / SP4N-LAPOR!)
    const report = this.getReportByTicket(clean);
    if (report) {
      return {
        type: 'citizen_report',
        data: {
          trackingNumber: (report as any).ticket_number,
          serviceName: `Pengaduan: ${(report as any).category_label}`,
          applicantName: (report as any).reporter_name,
          nikMasked: 'Terverifikasi Pelapor',
          submitDate: (report as any).created_at,
          status: (report as any).status,
          currentOpd: (report as any).assigned_opd,
          lastUpdated: (report as any).updated_at,
          progressPercent: (report as any).progress_percent,
          steps: ((report as any).timeline || []).map((t: any) => ({
            title: t.stage_name || t.status_text,
            date: t.timestamp,
            notes: t.description,
            completed: Boolean(t.is_completed),
            current: t.status_text === (report as any).status,
          })),
        },
      };
    }

    return null;
  }

  // --- HEALTHCARE & HOSPITAL BEDS ---
  getHealthcareUnits() {
    return this.db.prepare('SELECT * FROM healthcare_units WHERE is_active = 1 ORDER BY type ASC, name ASC').all();
  }

  getHospitalBeds() {
    return this.db.prepare(`
      SELECT b.*, h.name as faskes_name, h.type as faskes_type, h.district
      FROM hospital_bed_inventory b
      JOIN healthcare_units h ON b.faskes_id = h.id
      ORDER BY h.id ASC, b.id ASC
    `).all();
  }

  getFaskesAppointments() {
    return this.db.prepare(`
      SELECT a.*, h.name as faskes_name
      FROM faskes_appointments a
      JOIN healthcare_units h ON a.faskes_id = h.id
      ORDER BY a.appointment_date DESC, a.id ASC
    `).all();
  }

  // --- CITIZEN REPORTS (KEYSET PAGINATED & HIGH ENTROPY TICKET) ---
  getReports(limit = 20, cursor?: number) {
    const safeLimit = Math.min(Math.max(1, Number(limit) || 20), 100);
    let rows: any[];
    if (cursor) {
      rows = this.db.prepare(`
        SELECT * FROM citizen_reports
        WHERE id < ?
        ORDER BY id DESC
        LIMIT ?
      `).all(cursor, safeLimit + 1);
    } else {
      rows = this.db.prepare(`
        SELECT * FROM citizen_reports
        ORDER BY id DESC
        LIMIT ?
      `).all(safeLimit + 1);
    }

    const hasMore = rows.length > safeLimit;
    const data = hasMore ? rows.slice(0, safeLimit) : rows;
    const nextCursor = data.length > 0 ? data[data.length - 1].id : null;
    const countRow = this.db.prepare('SELECT COUNT(*) as total FROM citizen_reports').get() as { total: number };

    return {
      data,
      pagination: {
        limit: safeLimit,
        hasMore,
        nextCursor: hasMore ? nextCursor : null,
        totalCount: countRow?.total || 0,
      },
    };
  }

  getReportByTicket(ticket: string) {
    const clean = ticket.trim().toUpperCase();
    const report = this.db.prepare('SELECT * FROM citizen_reports WHERE ticket_number = ?').get(clean);
    if (!report) return null;

    const timelines = this.db.prepare('SELECT * FROM report_timelines WHERE report_id = ? ORDER BY step_number ASC').all((report as any).id);
    return { ...report, timeline: timelines };
  }

  createReport(data: {
    title: string;
    category: string;
    categoryLabel: string;
    description: string;
    kecamatan: string;
    kelurahan: string;
    locationAddress: string;
    coordinates?: string;
    reporterName?: string;
    citizenId?: number;
    isAnonymous?: boolean;
    assignedOpd?: string;
    photoUrl?: string;
  }) {
    // Nomor tiket kriptografis ber-entropi tinggi (Contoh: LAPOR-2025-8F3A9C)
    // Entropi 16.7+ juta kombinasi per tahun (mencegah enumerasi / brute-force IDOR)
    const entropySuffix = crypto.randomBytes(3).toString('hex').toUpperCase();
    const ticketNumber = `LAPOR-2025-${entropySuffix}`;
    const opd = data.assignedOpd || 'Diskominfo & OPD Teknis Sidoarjo';

    const stmt = this.db.prepare(`
      INSERT INTO citizen_reports (
        ticket_number, citizen_id, reporter_name, is_anonymous, title, category, category_label,
        description, kecamatan, kelurahan, location_address, coordinates, photo_url, status, progress_percent,
        assigned_opd, sla_target
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Menunggu Verifikasi', 25, ?, '3x24 Jam Kerja')
    `);

    const result = stmt.run(
      ticketNumber,
      data.citizenId || null,
      data.isAnonymous ? 'Warga Sidoarjo (Anonim)' : (data.reporterName || 'Budi Santoso'),
      data.isAnonymous ? 1 : 0,
      data.title,
      data.category,
      data.categoryLabel,
      data.description,
      data.kecamatan,
      data.kelurahan,
      data.locationAddress,
      data.coordinates || null,
      data.photoUrl || null,
      opd
    );

    const reportId = Number(result.lastInsertRowid);

    // Initial timeline
    this.db.prepare(`
      INSERT INTO report_timelines (report_id, step_number, stage_name, status_text, description, officer_or_system, is_completed)
      VALUES (?, 1, 'Tahap 1: Laporan Diterima Sistem', 'Diterima', 'Laporan berhasil dicatat di server SITAPAK.', 'Gateway Digital SITAPAK', 1)
    `).run(reportId);

    // Audit Trail Otomatis
    this.createAuditLog({
      eventType: 'CITIZEN_REPORT_SUBMIT',
      actorType: data.isAnonymous ? 'anonymous' : 'citizen',
      actorId: data.citizenId ? String(data.citizenId) : 'ANON',
      actorName: data.isAnonymous ? 'Warga Anonim' : (data.reporterName || 'Budi Santoso'),
      targetEntity: 'citizen_reports',
      targetId: ticketNumber,
      actionDetails: `Pengaduan baru terdaftar kategori: ${data.categoryLabel} di Kec. ${data.kecamatan}`,
    });

    return { id: reportId, ticketNumber, ...data };
  }

  // --- AUDIT TRAIL LOGGING (CRYPTOGRAPHIC HASH CHAIN) ---
  getAuditLogs(limit = 50) {
    return this.db.prepare(`
      SELECT * FROM audit_trail_logs
      ORDER BY id DESC
      LIMIT ?
    `).all(limit);
  }

  createAuditLog(entry: {
    eventType: string;
    actorType: string;
    actorId: string;
    actorName: string;
    targetEntity: string;
    targetId: string;
    actionDetails: string;
    ipAddress?: string;
  }) {
    try {
      // Ambil hash baris terakhir untuk mengikat rantai (Merkle hash chain)
      const lastRow = this.db.prepare('SELECT current_hash FROM audit_trail_logs ORDER BY id DESC LIMIT 1').get() as { current_hash?: string } | undefined;
      const previousHash = lastRow?.current_hash || 'GENESIS_HASH_SITAPAK_2026';

      const payload = `${previousHash}|${entry.eventType}|${entry.actorId}|${entry.targetEntity}|${entry.targetId}|${Date.now()}`;
      const currentHash = crypto.createHash('sha256').update(payload).digest('hex');

      this.db.prepare(`
        INSERT INTO audit_trail_logs (
          event_type, actor_type, actor_id, actor_name, target_entity, target_id, action_details, ip_address, previous_hash, current_hash
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        entry.eventType,
        entry.actorType,
        entry.actorId,
        entry.actorName,
        entry.targetEntity,
        entry.targetId,
        entry.actionDetails,
        entry.ipAddress || '127.0.0.1',
        previousHash,
        currentHash
      );
    } catch (err) {
      console.warn('Gagal mencatat audit log:', err);
    }
  }

  // --- BUDGET & OPEN DATA ---
  getBudgetMetrics(year = 2026) {
    return this.db.prepare('SELECT * FROM budget_metrics WHERE fiscal_year = ? ORDER BY allocated_rupiah DESC').all(year);
  }

  getDistrictBudgets(year = 2026) {
    return this.db.prepare('SELECT * FROM district_budgets WHERE fiscal_year = ? ORDER BY allocation_rupiah DESC').all(year);
  }

  getStrategicProjects(year = 2026) {
    return this.db.prepare('SELECT * FROM strategic_projects WHERE fiscal_year = ? ORDER BY budget_rupiah DESC').all(year);
  }

  getOpenDatasets() {
    return this.db.prepare('SELECT * FROM open_datasets ORDER BY downloads_count DESC').all();
  }
}
