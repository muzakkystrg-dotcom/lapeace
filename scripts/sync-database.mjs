import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';

const DB_PATH = path.resolve('database/sitapak.db');
const db = new DatabaseSync(DB_PATH);

console.log('--- SINKRONISASI DATABASE SITAPAK SIDOARJO ---');

// 1. Pastikan Akun Admin Pemkab & Operator OPD Terdaftar
const adminUser = db.prepare('SELECT id FROM citizens WHERE nik = ?').get('3515000000000001');
if (!adminUser) {
  console.log('Menambahkan akun Admin Pemkab (3515000000000001)...');
  const resAdmin = db.prepare(`
    INSERT INTO citizens (nik_hash, nik_masked, nik, full_name, email, phone, kecamatan, kelurahan, address, is_verified, role)
    VALUES ('f7c3bc1d808e04732adf679965ccc34ca7ae3441', '351500000000****', '3515000000000001', 'Bambang Haryo Pratama, S.STP', 'admin.pemkab@sidoarjokab.go.id', '081122334455', 'Sidoarjo (Kota)', 'Sidokumpul', 'Gedung Setda Pemkab Sidoarjo, Jl. Gubernur Suryo No. 1', 1, 'admin_pemkab')
  `).run();
  const adminId = Number(resAdmin.lastInsertRowid);
  db.prepare(`
    INSERT INTO citizen_credentials (citizen_id, password_hash, salt, last_login_at, failed_login_count, is_locked)
    VALUES (?, '407992a855b17d2a86570df87982a48d087342f3287401df911ab8de4ec0fbac', '330af7c1d0f5', '2026-11-11 18:00:00', 0, 0)
  `).run(adminId);
} else {
  console.log('Akun Admin Pemkab sudah ada.');
}

const operatorUser = db.prepare('SELECT id FROM citizens WHERE nik = ?').get('3515000000000002');
if (!operatorUser) {
  console.log('Menambahkan akun Operator OPD (3515000000000002)...');
  const resOp = db.prepare(`
    INSERT INTO citizens (nik_hash, nik_masked, nik, full_name, email, phone, kecamatan, kelurahan, address, is_verified, role)
    VALUES ('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '351500000000****', '3515000000000002', 'Dewi Lestari, S.Kom', 'operator.dispendukcapil@sidoarjokab.go.id', '081133445566', 'Sidoarjo (Kota)', 'Sidokare', 'Kantor Disdukcapil Sidoarjo, Jl. Sultan Agung No. 34', 1, 'operator_opd')
  `).run();
  const opId = Number(resOp.lastInsertRowid);
  db.prepare(`
    INSERT INTO citizen_credentials (citizen_id, password_hash, salt, last_login_at, failed_login_count, is_locked)
    VALUES (?, '407992a855b17d2a86570df87982a48d087342f3287401df911ab8de4ec0fbac', '330af7c1d0f5', '2026-11-11 18:00:00', 0, 0)
  `).run(opId);
} else {
  console.log('Akun Operator OPD sudah ada.');
}

// 2. Tambahkan 4 Laporan Baku ke Database jika belum ada
const initialReports = [
  {
    ticket_number: 'LAPOR-2026-0814',
    citizen_id: 1,
    reporter_name: 'Budi Santoso',
    is_anonymous: 0,
    title: 'Jalan Berlubang di Jl. Pahlawan Dekat SDN Sidokumpul',
    category: 'infrastruktur',
    category_label: 'Infrastruktur & Bina Marga',
    description: 'Terdapat lubang jalan sedalam kurang lebih 15 cm di lajur kiri Jl. Pahlawan No. 42 yang membahayakan pengendara roda dua, terutama saat malam hari dan saat hujan tergenang air.',
    kecamatan: 'Sidoarjo (Kota)',
    kelurahan: 'Sidokumpul',
    location_address: 'Jl. Pahlawan No. 42, Kel. Sidokumpul, Kec. Sidoarjo Kota',
    coordinates: '-7.4478° S, 112.7183° E',
    photo_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRRJDZqFD8FgmrIGkXhxUpRuzc01o8NOc0u2KnO_CNRxNWck1nUdpxmmWl1g1dWKQQ_hxyo8-x21GEvz-nYzooUq3MuYz_oo9JT3Z-3Px4JihFA-oEr-X_Zc5clCKGwP1HOiI3-zg_bWHGaJw6gUTCHFQ3Eu2nfh8PSVx7mwAx46BsqbrzCoa0KOefocUT-Gl9wbLb95CkINr-RPkbP6rF2uBtMpLFf8jqFLmo9r2I',
    urgency: 'Prioritas Reguler',
    status: 'Penanganan Lapangan',
    progress_percent: 75,
    assigned_opd: 'Dinas PU Bina Marga & Sumber Daya Air Sidoarjo',
    sla_target: '3x24 Jam Kerja',
    official_response: 'Laporan telah diverifikasi dan masuk SPK Tim Reaksi Cepat (TRC). Penambalan aspal cold-mix dijadwalkan selesai pada 2 November 2026. Mohon berhati-hati saat melintas di lokasi.',
    responder_name: 'Ir. H. Hendra Setiawan',
    responder_opd: 'Dinas Pekerjaan Umum & Bina Marga Sidoarjo',
  },
  {
    ticket_number: 'LP-2026-0891',
    citizen_id: 1,
    reporter_name: 'Warga Magersari',
    is_anonymous: 0,
    title: 'Lampu Penerangan Jalan Umum Mati Sepanjang Jl. Lingkar Barat',
    category: 'lampu-jalan',
    category_label: 'Lampu Jalan (PJU)',
    description: 'Tiga titik tiang lampu penerangan jalan umum mati total di area Jl. Lingkar Barat KM 4, membahayakan pengendara malam hari.',
    kecamatan: 'Sidoarjo (Kota)',
    kelurahan: 'Magersari',
    location_address: 'Jl. Lingkar Barat KM 4, Kel. Magersari, Sidoarjo',
    coordinates: '-7.4520° S, 112.7090° E',
    photo_url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80',
    urgency: 'Prioritas Reguler',
    status: 'Menunggu Verifikasi',
    progress_percent: 25,
    assigned_opd: 'Dinas Perhubungan Kabupaten Sidoarjo',
    sla_target: '2x24 Jam Kerja',
  },
  {
    ticket_number: 'LP-2026-0842',
    citizen_id: 1,
    reporter_name: 'Warga Peduli Krian (Anonim)',
    is_anonymous: 1,
    title: 'Tumpukan Sampah Liar Menutupi Saluran Air Pasar Krian',
    category: 'sampah',
    category_label: 'Kebersihan & Sampah',
    description: 'Timbulan sampah plastik dan limbah lapak pedagang menumpuk di saluran pembuangan air sisi barat Pasar Krian, menyebabkan bau tidak sedap dan saluran tersumbat.',
    kecamatan: 'Krian',
    kelurahan: 'Krian',
    location_address: 'Kawasan Pasar Krian, Sisi Barat, Kel. Krian',
    coordinates: '-7.4112° S, 112.5841° E',
    photo_url: 'https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?auto=format&fit=crop&w=800&q=80',
    urgency: 'Prioritas Reguler',
    status: 'Penanganan Lapangan',
    progress_percent: 66,
    assigned_opd: 'Dinas Lingkungan Hidup & Kebersihan (DLHK) Sidoarjo',
    sla_target: '1x24 Jam Kerja',
    official_response: 'Armada dump truck dan tim penyapu jalan DLHK telah dikerahkan ke lokasi Pasar Krian. Pengangkutan sampah dan pengerukan sedimentasi saluran selesai sore ini.',
    responder_name: 'Siti Rahmawati, S.T.',
    responder_opd: 'DLHK Kabupaten Sidoarjo',
  },
  {
    ticket_number: 'LP-2026-0799',
    citizen_id: 1,
    reporter_name: 'Agus Priyono',
    is_anonymous: 0,
    title: 'Perbaikan Jalan Berlubang di Dekat SDN Sidokare 1',
    category: 'infrastruktur',
    category_label: 'Jalan Rusak',
    description: 'Lubang aspal di depan gerbang keluar SDN Sidokare 1 Jl. Diponegoro telah membahayakan anak-anak sekolah dan wali murid saat jam antar-jemput.',
    kecamatan: 'Sidoarjo (Kota)',
    kelurahan: 'Sidokare',
    location_address: 'Jl. Diponegoro No. 88, Sidokare, Sidoarjo',
    coordinates: '-7.4580° S, 112.7150° E',
    photo_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCuP5TXLCf5iF31flxK5PW-c50LQK1gWTlop_dIgWzCBzZ8l6SdO6chfTyLM-pA6FhaORLJ4D2oLrBMF7lXDh9XB5LA8Tmn59_AqZjLmVogrPn2yw5olmf1QaWjKz5JczQ-aDfFrqMZ23RszMCxuFTc5wv6O1hm3roC_ZsbCyJShT9PBo8epXScopKcSBnYOBQapPFBiodMeAGWS0v58o88HcZWCT71ZPGdQLUfWf6',
    urgency: 'Prioritas Reguler',
    status: 'Selesai',
    progress_percent: 100,
    assigned_opd: 'Dinas PU Bina Marga & SDA Sidoarjo',
    sla_target: '3x24 Jam Kerja',
    official_response: 'Pekerjaan pengaspalan ulang dan penambalan jalan di depan SDN Sidokare 1 telah tuntas 100%. Kondisi jalan kini rata dan aman dilewati warga.',
    responder_name: 'Bambang Irawan, S.T.',
    responder_opd: 'Dinas PU Bina Marga & SDA Sidoarjo',
  },
];

const insertReportStmt = db.prepare(`
  INSERT INTO citizen_reports (
    ticket_number, citizen_id, reporter_name, is_anonymous, title, category, category_label,
    description, kecamatan, kelurahan, location_address, coordinates, photo_url, urgency, status,
    progress_percent, assigned_opd, sla_target, official_response, responder_name, responder_opd
  ) VALUES (
    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
  )
`);

const insertTimelineStmt = db.prepare(`
  INSERT INTO report_timelines (report_id, step_number, stage_name, status_text, description, officer_or_system, is_completed)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`);

for (const r of initialReports) {
  const existing = db.prepare('SELECT id FROM citizen_reports WHERE ticket_number = ?').get(r.ticket_number);
  if (!existing) {
    console.log(`Menambahkan laporan ${r.ticket_number} - ${r.title}...`);
    const res = insertReportStmt.run(
      r.ticket_number,
      r.citizen_id,
      r.reporter_name,
      r.is_anonymous,
      r.title,
      r.category,
      r.category_label,
      r.description,
      r.kecamatan,
      r.kelurahan,
      r.location_address,
      r.coordinates || null,
      r.photo_url || null,
      r.urgency,
      r.status,
      r.progress_percent,
      r.assigned_opd,
      r.sla_target,
      r.official_response || null,
      r.responder_name || null,
      r.responder_opd || null
    );
    const newId = Number(res.lastInsertRowid);
    insertTimelineStmt.run(newId, 1, 'Tahap 1: Laporan Diterima Sistem', 'Diterima', 'Laporan berhasil dicatat di server SITAPAK.', 'Gateway Digital SITAPAK V2.4', 1);
    insertTimelineStmt.run(newId, 2, 'Tahap 2: Verifikasi Bukti & Lokasi', 'Terverifikasi', 'Pemeriksaan keabsahan keluhan dan bukti foto pendukung.', 'Helpdesk SP4N-LAPOR Diskominfo', r.status !== 'Menunggu Verifikasi' ? 1 : 0);
    insertTimelineStmt.run(newId, 3, 'Tahap 3: Disposisi OPD & Lapangan', 'Diproses', `Disposisi tindak lanjut ke ${r.assigned_opd}.`, r.assigned_opd, r.status === 'Selesai' || r.status === 'Penanganan Lapangan' ? 1 : 0);
    insertTimelineStmt.run(newId, 4, 'Tahap 4: Selesai & Penerbitan BAP', 'Selesai', 'Pekerjaan selesai dan evaluasi kepuasan masyarakat.', 'Sistem SITAPAK', r.status === 'Selesai' ? 1 : 0);
  }
}

const totalReports = db.prepare('SELECT COUNT(*) as count FROM citizen_reports').get().count;
console.log(`\nSelesai! Total laporan di database: ${totalReports} laporan.`);
