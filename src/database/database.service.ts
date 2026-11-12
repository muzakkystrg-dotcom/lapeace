import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { DatabaseSync } from 'node:sqlite';
import * as path from 'node:path';
import * as fs from 'node:fs';
import * as crypto from 'node:crypto';
import { escapeSqlLike } from '../common/sanitizer.js';

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

  // Citizens repository with PDP masking and keyset pagination
  getCitizens(limit = 20, cursor?: number) {
    const safeLimit = Math.min(Math.max(1, Number(limit) || 20), 100);
    let rows: any[];
    if (cursor) {
      rows = this.db.prepare(`
        SELECT c.id, c.nik_masked, c.full_name, c.email, c.phone, c.kecamatan, c.kelurahan, c.is_verified, c.role, c.created_at, cr.is_locked, cr.failed_login_count
        FROM citizens c
        LEFT JOIN citizen_credentials cr ON c.id = cr.citizen_id
        WHERE c.id > ?
        ORDER BY c.id ASC
        LIMIT ?
      `).all(cursor, safeLimit + 1);
    } else {
      rows = this.db.prepare(`
        SELECT c.id, c.nik_masked, c.full_name, c.email, c.phone, c.kecamatan, c.kelurahan, c.is_verified, c.role, c.created_at, cr.is_locked, cr.failed_login_count
        FROM citizens c
        LEFT JOIN citizen_credentials cr ON c.id = cr.citizen_id
        ORDER BY c.id ASC
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

  // Services directory
  getServices() {
    return this.db.prepare('SELECT * FROM services ORDER BY popularity_score DESC').all();
  }

  getServiceById(id: string) {
    return this.db.prepare('SELECT * FROM services WHERE id = ?').get(id);
  }

  // Service requests and single-window tracking
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

    // Cek di permohonan berkas layanan (KTP, SKU, NIB, dll)
    const serviceReq = this.getServiceRequestByTrackingNumber(clean);
    if (serviceReq) {
      return { type: 'service_request', data: serviceReq };
    }

    // Cek di laporan pengaduan warga (Call 112 / SP4N-LAPOR!)
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

  // Healthcare units and hospital bed inventory
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

  // Citizen reports with keyset pagination and high-entropy tickets
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
    const rawData = hasMore ? rows.slice(0, safeLimit) : rows;
    const nextCursor = rawData.length > 0 ? rawData[rawData.length - 1].id : null;
    const countRow = this.db.prepare('SELECT COUNT(*) as total FROM citizen_reports').get() as { total: number };

    const data = rawData.map((r: any) => {
      const timelines = this.db.prepare('SELECT * FROM report_timelines WHERE report_id = ? ORDER BY step_number ASC').all(r.id);
      return { ...r, timeline: timelines };
    });

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
    ticketNumber?: string;
    title: string;
    category: string;
    categoryLabel?: string;
    description: string;
    kecamatan: string;
    kelurahan?: string;
    locationAddress?: string;
    address?: string;
    coordinates?: string;
    reporterName?: string;
    citizenId?: number;
    isAnonymous?: boolean | number;
    assignedOpd?: string;
    photoUrl?: string;
  }) {
    // Nomor tiket kriptografis ber-entropi tinggi (Contoh: LAPOR-2026-8F3A9C)
    // Entropi 16.7+ juta kombinasi per tahun (mencegah enumerasi / brute-force IDOR)
    const entropySuffix = crypto.randomBytes(3).toString('hex').toUpperCase();
    const ticketNumber = (data.ticketNumber && /^LAPOR-\d{4}-[A-Z0-9]+$/i.test(data.ticketNumber))
      ? data.ticketNumber.toUpperCase()
      : `LAPOR-2026-${entropySuffix}`;
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
      data.categoryLabel || data.category || null,
      data.description,
      data.kecamatan,
      data.kelurahan || data.kecamatan || 'Pusat Kecamatan',
      data.locationAddress || data.address || null,
      data.coordinates || null,
      data.photoUrl || null,
      opd
    );

    const reportId = Number(result.lastInsertRowid);

    // Initial 4-stage timeline
    const insertTimeline = this.db.prepare(`
      INSERT INTO report_timelines (report_id, step_number, stage_name, status_text, description, officer_or_system, is_completed)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    insertTimeline.run(reportId, 1, 'Tahap 1: Laporan Diterima Sistem', 'Diterima', 'Laporan berhasil dicatat di server SITAPAK.', 'Gateway Digital SITAPAK V2.4', 1);
    insertTimeline.run(reportId, 2, 'Tahap 2: Verifikasi Bukti & Lokasi', 'Menunggu Antrean', 'Petugas verifikator akan memeriksa keabsahan materi keluhan, koordinat lokasi, dan foto pendukung.', 'Helpdesk SP4N-LAPOR Diskominfo Sidoarjo', 0);
    insertTimeline.run(reportId, 3, 'Tahap 3: Disposisi OPD & Penanganan Lapangan', 'Mendatang', `Disposisi penanganan teknis ke ${opd} untuk pengecekan dan tindak lanjut lapangan.`, opd, 0);
    insertTimeline.run(reportId, 4, 'Tahap 4: Selesai & Evaluasi Kepuasan', 'Mendatang', 'Pekerjaan selesai, foto hasil diunggah, dan warga diundang memberikan evaluasi kepuasan.', 'Sistem Terpadu Pelayanan Publik Sidoarjo', 0);

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

  // Audit trail logging with cryptographic hash chain
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

  // Budget and open data
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

  // ==========================================
  // ADMIN PORTAL ENTERPRISE EXTENSIONS
  // ==========================================

  getAdminAnalytics() {
    // 1. Reports stats
    const totalReports = (this.db.prepare('SELECT COUNT(*) as count FROM citizen_reports').get() as any)?.count || 0;
    const pendingReports = (this.db.prepare("SELECT COUNT(*) as count FROM citizen_reports WHERE status = 'Menunggu Verifikasi'").get() as any)?.count || 0;
    const processingReports = (this.db.prepare("SELECT COUNT(*) as count FROM citizen_reports WHERE status IN ('Penanganan Lapangan', 'Disposisi OPD', 'Proses Lapangan')").get() as any)?.count || 0;
    const completedReports = (this.db.prepare("SELECT COUNT(*) as count FROM citizen_reports WHERE status = 'Selesai'").get() as any)?.count || 0;
    const rejectedReports = (this.db.prepare("SELECT COUNT(*) as count FROM citizen_reports WHERE status = 'Ditolak'").get() as any)?.count || 0;

    // 2. Service requests stats
    const totalServiceRequests = (this.db.prepare('SELECT COUNT(*) as count FROM service_requests').get() as any)?.count || 0;
    const pendingServiceRequests = (this.db.prepare("SELECT COUNT(*) as count FROM service_requests WHERE status = 'Diterima'").get() as any)?.count || 0;
    const processingServiceRequests = (this.db.prepare("SELECT COUNT(*) as count FROM service_requests WHERE status IN ('Verifikasi Dokumen', 'Proses OPD')").get() as any)?.count || 0;
    const readyServiceRequests = (this.db.prepare("SELECT COUNT(*) as count FROM service_requests WHERE status = 'Siap Diambil'").get() as any)?.count || 0;
    const completedServiceRequests = (this.db.prepare("SELECT COUNT(*) as count FROM service_requests WHERE status = 'Selesai'").get() as any)?.count || 0;

    // 3. Citizens stats
    const totalCitizens = (this.db.prepare('SELECT COUNT(*) as count FROM citizens').get() as any)?.count || 0;
    const verifiedCitizens = (this.db.prepare('SELECT COUNT(*) as count FROM citizens WHERE is_verified = 1').get() as any)?.count || 0;
    const lockedCitizens = (this.db.prepare('SELECT COUNT(*) as count FROM citizen_credentials WHERE is_locked = 1').get() as any)?.count || 0;

    // 4. Hospital beds stats
    const bedTotals = this.db.prepare('SELECT SUM(total_beds) as total, SUM(available_beds) as available, SUM(occupied_beds) as occupied FROM hospital_bed_inventory').get() as any;
    const totalBeds = bedTotals?.total || 0;
    const availableBeds = bedTotals?.available || 0;
    const occupiedBeds = bedTotals?.occupied || 0;
    const occupancyRate = totalBeds > 0 ? Math.round((occupiedBeds / totalBeds) * 100) : 0;

    // 5. Recent audit logs
    const recentAuditLogs = this.db.prepare('SELECT * FROM audit_trail_logs ORDER BY id DESC LIMIT 6').all();

    return {
      reports: {
        total: totalReports,
        pending: pendingReports,
        processing: processingReports,
        completed: completedReports,
        rejected: rejectedReports,
        averageSlaDays: '2.4 Hari',
      },
      serviceRequests: {
        total: totalServiceRequests,
        pending: pendingServiceRequests,
        processing: processingServiceRequests,
        ready: readyServiceRequests,
        completed: completedServiceRequests,
      },
      citizens: {
        total: totalCitizens,
        verified: verifiedCitizens,
        locked: lockedCitizens,
      },
      healthcare: {
        totalBeds,
        availableBeds,
        occupiedBeds,
        occupancyRate,
      },
      recentAuditLogs,
    };
  }

  getAdminReports(filters: { status?: string; category?: string; search?: string }) {
    let query = 'SELECT * FROM citizen_reports WHERE 1=1';
    const params: any[] = [];

    if (filters.status && filters.status !== 'semua') {
      query += ' AND status = ?';
      params.push(filters.status);
    }
    if (filters.category && filters.category !== 'semua') {
      query += ' AND category = ?';
      params.push(filters.category);
    }
    if (filters.search) {
      query +=
        " AND (ticket_number LIKE ? ESCAPE '/' OR title LIKE ? ESCAPE '/' OR description LIKE ? ESCAPE '/' OR reporter_name LIKE ? ESCAPE '/' OR kecamatan LIKE ? ESCAPE '/')";
      const s = `%${escapeSqlLike(filters.search.trim())}%`;
      params.push(s, s, s, s, s);
    }
    query += ' ORDER BY id DESC';

    const reports = this.db.prepare(query).all(...params);
    return reports.map((r: any) => {
      const timelines = this.db.prepare('SELECT * FROM report_timelines WHERE report_id = ? ORDER BY step_number ASC').all(r.id);
      return { ...r, timeline: timelines };
    });
  }

  updateReportStatus(
    id: number,
    data: {
      status: string;
      progressPercent?: number;
      assignedOpd?: string;
      officialResponse?: string;
      officerNotes?: string;
      officerName?: string;
      responderOpd?: string;
    },
  ) {
    const report = this.db.prepare('SELECT * FROM citizen_reports WHERE id = ?').get(id) as any;
    if (!report) return null;

    let progress = data.progressPercent;
    if (progress === undefined) {
      if (data.status === 'Selesai') progress = 100;
      else if (data.status === 'Penanganan Lapangan' || data.status === 'Proses Lapangan') progress = 75;
      else if (data.status === 'Disposisi OPD') progress = 50;
      else if (data.status === 'Ditolak') progress = 0;
      else progress = 25;
    }

    const assignedOpd = data.assignedOpd || report.assigned_opd;
    const officerName = data.officerName || 'Admin Diskominfo Sidoarjo';
    const responderOpd = data.responderOpd || assignedOpd;
    const officialResponse = data.officialResponse || data.officerNotes || report.official_response;

    this.db.prepare(`
      UPDATE citizen_reports
      SET status = ?, progress_percent = ?, assigned_opd = ?, official_response = ?, responder_name = ?, responder_opd = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(data.status, progress, assignedOpd, officialResponse, officerName, responderOpd, id);

    // Ambil jumlah step timeline yang sudah ada
    const lastStep = this.db.prepare('SELECT MAX(step_number) as max_step FROM report_timelines WHERE report_id = ?').get(id) as any;
    const nextStep = (lastStep?.max_step || 1) + 1;

    const desc = data.officerNotes || data.officialResponse || `Status diperbarui menjadi '${data.status}' oleh ${officerName}. Disposisi: ${assignedOpd}`;

    this.db.prepare(`
      INSERT INTO report_timelines (report_id, step_number, stage_name, status_text, description, officer_or_system, is_completed)
      VALUES (?, ?, ?, ?, ?, ?, 1)
    `).run(id, nextStep, `Tahap ${nextStep}: ${data.status}`, data.status, desc, officerName);

    this.createAuditLog({
      eventType: 'CITIZEN_REPORT_STATUS_UPDATE',
      actorType: 'admin',
      actorId: String(id),
      actorName: officerName,
      targetEntity: 'citizen_reports',
      targetId: report.ticket_number,
      actionDetails: `Status tiket ${report.ticket_number} diperbarui menjadi '${data.status}'. Catatan: ${desc}`,
    });

    return this.getReportByTicket(report.ticket_number);
  }

  getAdminServiceRequests(filters: { status?: string; serviceId?: string; search?: string }) {
    let query = 'SELECT * FROM service_requests WHERE 1=1';
    const params: any[] = [];

    if (filters.status && filters.status !== 'semua') {
      query += ' AND status = ?';
      params.push(filters.status);
    }
    if (filters.serviceId && filters.serviceId !== 'semua') {
      query += ' AND service_id = ?';
      params.push(filters.serviceId);
    }
    if (filters.search) {
      query +=
        " AND (tracking_number LIKE ? ESCAPE '/' OR applicant_name LIKE ? ESCAPE '/' OR service_name LIKE ? ESCAPE '/' OR current_opd LIKE ? ESCAPE '/')";
      const s = `%${escapeSqlLike(filters.search.trim())}%`;
      params.push(s, s, s, s);
    }
    query += ' ORDER BY id DESC';

    const requests = this.db.prepare(query).all(...params);
    return requests.map((req: any) => {
      const steps = this.db.prepare('SELECT * FROM request_workflow_timeline WHERE request_id = ? ORDER BY step_number ASC').all(req.id);
      return { ...req, steps };
    });
  }

  updateServiceRequestStatus(
    id: number,
    data: {
      status: string;
      currentStageText?: string;
      progressPercent?: number;
      currentOpd?: string;
      notes?: string;
      officerName?: string;
    },
  ) {
    const req = this.db.prepare('SELECT * FROM service_requests WHERE id = ?').get(id) as any;
    if (!req) return null;

    let progress = data.progressPercent;
    if (progress === undefined) {
      if (data.status === 'Selesai') progress = 100;
      else if (data.status === 'Siap Diambil') progress = 90;
      else if (data.status === 'Proses OPD') progress = 60;
      else if (data.status === 'Verifikasi Dokumen') progress = 35;
      else progress = 15;
    }

    const stage = data.currentStageText || req.current_stage_text;
    const opd = data.currentOpd || req.current_opd;
    const notes = data.notes || req.notes;

    this.db.prepare(`
      UPDATE service_requests
      SET status = ?, current_stage_text = ?, progress_percent = ?, current_opd = ?, notes = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(data.status, stage, progress, opd, notes, id);

    const officer = data.officerName || 'Administrator Layanan Terpadu';
    this.createAuditLog({
      eventType: 'SERVICE_REQUEST_STATUS_UPDATE',
      actorType: 'admin',
      actorId: String(id),
      actorName: officer,
      targetEntity: 'service_requests',
      targetId: req.tracking_number,
      actionDetails: `Status permohonan ${req.tracking_number} (${req.service_name}) diperbarui menjadi '${data.status}'. Tahapan: ${stage}`,
    });

    return this.getServiceRequestByTrackingNumber(req.tracking_number);
  }

  verifyCitizen(id: number, isVerified: boolean, officerName?: string) {
    const citizen = this.db.prepare('SELECT * FROM citizens WHERE id = ?').get(id) as any;
    if (!citizen) return null;

    this.db.prepare('UPDATE citizens SET is_verified = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(isVerified ? 1 : 0, id);

    const officer = officerName || 'Admin Pemkab Sidoarjo';
    this.createAuditLog({
      eventType: isVerified ? 'CITIZEN_VERIFIED' : 'CITIZEN_UNVERIFIED',
      actorType: 'admin',
      actorId: String(id),
      actorName: officer,
      targetEntity: 'citizens',
      targetId: citizen.nik_masked,
      actionDetails: `Status verifikasi akun warga ${citizen.full_name} (${citizen.nik_masked}) diubah menjadi: ${isVerified ? 'Terverifikasi' : 'Belum Terverifikasi'}`,
    });

    return { success: true, isVerified, id };
  }

  unlockCitizenAccount(id: number, officerName?: string) {
    const citizen = this.db.prepare('SELECT * FROM citizens WHERE id = ?').get(id) as any;
    if (!citizen) return null;

    this.db.prepare('UPDATE citizen_credentials SET is_locked = 0, failed_login_count = 0 WHERE citizen_id = ?').run(id);

    const officer = officerName || 'Admin Keamanan SPBE';
    this.createAuditLog({
      eventType: 'CITIZEN_ACCOUNT_UNLOCKED',
      actorType: 'admin',
      actorId: String(id),
      actorName: officer,
      targetEntity: 'citizen_credentials',
      targetId: citizen.nik_masked,
      actionDetails: `Akun warga ${citizen.full_name} (${citizen.nik_masked}) berhasil dibuka blokirnya.`,
    });

    return { success: true, message: `Akun warga ${citizen.full_name} berhasil dibuka blokir.`, id };
  }

  updateCitizenRole(id: number, role: string, officerName?: string) {
    const citizen = this.db.prepare('SELECT * FROM citizens WHERE id = ?').get(id) as any;
    if (!citizen) return null;

    this.db.prepare('UPDATE citizens SET role = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(role, id);

    const officer = officerName || 'Admin Pemkab Sidoarjo';
    this.createAuditLog({
      eventType: 'CITIZEN_ROLE_CHANGED',
      actorType: 'admin',
      actorId: String(id),
      actorName: officer,
      targetEntity: 'citizens',
      targetId: citizen.nik_masked,
      actionDetails: `Peran akun warga ${citizen.full_name} (${citizen.nik_masked}) diubah menjadi '${role}'.`,
    });

    return { success: true, role, id };
  }

  updateHospitalBed(id: number, data: { availableBeds: number; occupiedBeds: number }, officerName?: string) {
    const bed = this.db.prepare('SELECT * FROM hospital_bed_inventory WHERE id = ?').get(id) as any;
    if (!bed) return null;

    const available = Math.max(0, Number(data.availableBeds) || 0);
    const occupied = Math.max(0, Number(data.occupiedBeds) || 0);
    const total = available + occupied;

    this.db.prepare(`
      UPDATE hospital_bed_inventory
      SET available_beds = ?, occupied_beds = ?, total_beds = ?, last_updated = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(available, occupied, total, id);

    const officer = officerName || 'Admin Dinkes Sidoarjo';
    this.createAuditLog({
      eventType: 'HOSPITAL_BED_INVENTORY_UPDATE',
      actorType: 'admin',
      actorId: String(id),
      actorName: officer,
      targetEntity: 'hospital_bed_inventory',
      targetId: String(id),
      actionDetails: `Ketersediaan ranjang ID ${id} (${bed.class_name}) diperbarui: Tersedia ${available}, Terisi ${occupied}, Total ${total}.`,
    });

    return this.db.prepare(`
      SELECT b.*, h.name as faskes_name, h.type as faskes_type, h.district
      FROM hospital_bed_inventory b
      JOIN healthcare_units h ON b.faskes_id = h.id
      WHERE b.id = ?
    `).get(id);
  }
}
