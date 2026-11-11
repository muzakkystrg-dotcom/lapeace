import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';

const DB_PATH = path.resolve('database/sitapak.db');
const SCHEMA_PATH = path.resolve('database/schema.sql');
const SEED_PATH = path.resolve('database/seed.sql');

console.log('--- INISIALISASI DATABASE SITAPAK SIDOARJO (ENTERPRISE UPGRADE) ---');
console.log(`Database File: ${DB_PATH}`);

try {
  // Jika database lama ada, hapus untuk clean rebuild
  if (fs.existsSync(DB_PATH)) {
    fs.unlinkSync(DB_PATH);
    console.log('File database lama dibersihkan.');
  }

  // Buka atau buat file database SQLite
  const db = new DatabaseSync(DB_PATH);
  
  // Baca dan jalankan schema DDL
  console.log('Menerapkan Schema Enterprise (Tables, Constraints & Indexes)...');
  const schemaSql = fs.readFileSync(SCHEMA_PATH, 'utf-8');
  db.exec(schemaSql);
  console.log('Schema DDL berhasil diterapkan!');

  // Baca dan jalankan seed data
  console.log('Menyuntikkan Data Dummy Realistis...');
  const seedSql = fs.readFileSync(SEED_PATH, 'utf-8');
  db.exec(seedSql);
  console.log('Data Dummy berhasil disuntikkan!');

  // Tampilkan ringkasan isi tabel
  console.log('\n--- RINGKASAN DATA DATABASE SITAPAK ---');
  const tables = [
    'opd_organizations',
    'citizens',
    'citizen_credentials',
    'services',
    'service_requests',
    'request_workflow_timeline',
    'ktp_application_details',
    'sku_application_details',
    'healthcare_units',
    'faskes_appointments',
    'hospital_bed_inventory',
    'citizen_reports',
    'report_timelines',
    'document_attachments',
    'audit_trail_logs',
    'budget_metrics',
    'district_budgets',
    'strategic_projects',
    'open_datasets',
  ];

  for (const table of tables) {
    const row = db.prepare(`SELECT COUNT(*) as count FROM ${table}`).get();
    console.log(`- ${table.padEnd(26)}: ${row.count} baris data`);
  }

  // Tampilkan sampel service_requests (TrackDocModal)
  const sampleTrack = db.prepare('SELECT tracking_number, applicant_name, nik_masked, service_name, status, current_opd FROM service_requests').all();
  console.log('\nSampel Berkas Pelacakan Layanan (Live Tracking):', sampleTrack);

  // Tampilkan sampel laporan
  const sampleReport = db.prepare('SELECT ticket_number, title, status, assigned_opd FROM citizen_reports LIMIT 2').all();
  console.log('\nSampel Laporan 112 (Anti-IDOR Ticket):', sampleReport);

  db.close();
  console.log('\nDatabase SITAPAK siap digunakan!');
} catch (error) {
  console.error('Gagal menginisialisasi database:', error);
  process.exit(1);
}
