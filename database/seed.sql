-- ============================================================
-- DATA DUMMY REALISTIS PEMKAB SIDOARJO (ENTERPRISE SEED DATA)
-- Kepatuhan: ISO 27001, UU PDP No. 27/2022
-- ============================================================

-- ------------------------------------------------------------
-- 1. OPD ORGANISASI
-- ------------------------------------------------------------
INSERT OR REPLACE INTO opd_organizations (id, code, name, category, district_code, contact_phone, contact_email) VALUES
(1, 'DISDUKCAPIL', 'Dinas Kependudukan & Pencatatan Sipil Kab. Sidoarjo', 'dinas', '35.15.08', '031-8941010', 'dispendukcapil@sidoarjokab.go.id'),
(2, 'DINKES', 'Dinas Kesehatan Kab. Sidoarjo', 'dinas', '35.15.08', '031-8941456', 'dinkes@sidoarjokab.go.id'),
(3, 'DPMPTSP', 'Dinas Penanaman Modal & Pelayanan Terpadu Satu Pintu', 'dinas', '35.15.08', '031-8968000', 'dpmptsp@sidoarjokab.go.id'),
(4, 'DISKOMINFO', 'Dinas Komunikasi dan Informatika Kab. Sidoarjo', 'dinas', '35.15.08', '031-8951234', 'diskominfo@sidoarjokab.go.id'),
(5, 'PUBMSDA', 'Dinas PU Bina Marga & Sumber Daya Air Kab. Sidoarjo', 'dinas', '35.15.08', '031-8921876', 'pubmsda@sidoarjokab.go.id'),
(6, 'DLHK', 'Dinas Lingkungan Hidup dan Kebersihan Kab. Sidoarjo', 'dinas', '35.15.08', '031-8963456', 'dlhk@sidoarjokab.go.id'),
(7, 'DISHUB', 'Dinas Perhubungan Kab. Sidoarjo', 'dinas', '35.15.08', '031-8945678', 'dishub@sidoarjokab.go.id'),
(8, 'BPBD', 'Badan Penanggulangan Bencana Daerah (Call 112)', 'badan', '35.15.08', '112', 'bpbd@sidoarjokab.go.id'),
(9, 'RSUD_NOTOPURO', 'RSUD R.T. Notopuro Sidoarjo (Pusat)', 'rsud', '35.15.08', '031-8961649', 'rsud@sidoarjokab.go.id'),
(10, 'RSUD_SDA_BARAT', 'RSUD Sidoarjo Barat (Krian)', 'rsud', '35.15.09', '031-8977112', 'rsudbarat@sidoarjokab.go.id'),
(11, 'KEC_SDA_KOTA', 'Kantor Kecamatan Sidoarjo Kota', 'kecamatan', '35.15.08', '031-8921200', 'kec.sidoarjo@sidoarjokab.go.id'),
(12, 'KEC_CANDI', 'Kantor Kecamatan Candi', 'kecamatan', '35.15.04', '031-8921300', 'kec.candi@sidoarjokab.go.id'),
(13, 'KEC_WARU', 'Kantor Kecamatan Waru', 'kecamatan', '35.15.01', '031-8531000', 'kec.waru@sidoarjokab.go.id');

-- ------------------------------------------------------------
-- 2. WARGA & KREDENSIAL KEAMANAN (Mencakup Pemilik Nomor Berkas di TrackDocModal)
-- ------------------------------------------------------------
INSERT OR REPLACE INTO citizens (id, nik_hash, nik_masked, nik, full_name, email, phone, kecamatan, kelurahan, address, is_verified, role) VALUES
(1, 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', '351508210490****', '3515082104900002', 'Budi Santoso', 'budi.santoso@warga.sidoarjokab.go.id', '081234567890', 'Sidoarjo (Kota)', 'Sidokumpul', 'Jl. Pahlawan No. 42, Kel. Sidokumpul, Kec. Sidoarjo Kota', 1, 'warga'),
(2, 'a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e', '351508210492****', '3515082104920005', 'Bagus Tri Prakoso', 'bagus.prakoso@warga.sidoarjokab.go.id', '081299887766', 'Sidoarjo (Kota)', 'Sidokare', 'Perum Sidokare Indah Blok G-09, Sidoarjo Kota', 1, 'warga'),
(3, '2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae', '351504560789****', '3515045607890003', 'Siti Aminah', 'siti.aminah@warga.sidoarjokab.go.id', '085711223344', 'Candi', 'Sepande', 'Jl. Raya Sepande No. 18, Kec. Candi', 1, 'warga'),
(4, 'fc8252c8dc55839967c58b9ad755a59b61b67c1322016be7f26c70a56ac5b026', '351501450892****', '3515014508920001', 'Siti Rahmawati', 'siti.rahmawati@warga.sidoarjokab.go.id', '082198765432', 'Waru', 'Kureksari', 'Perum Waru Indah Blok B-12, Waru', 1, 'warga'),
(5, 'cd9fb1e14721ae2a84e4d57d3fb4916a4107141326c24137f68fafb81934ee86', '351512120388****', '3515121203880004', 'Ahmad Fauzi', 'ahmad.fauzi@warga.sidoarjokab.go.id', '085712349876', 'Candi', 'Gelam', 'Jl. Raya Gelam No. 15, Candi', 1, 'warga'),
(6, 'd41d8cd98f00b204e9800998ecf8427e1b5b7a188f6c4f0b4d4b31a89f929312', '351503190785****', '3515031907850005', 'Hendra Wijaya', 'hendra.wijaya@warga.sidoarjokab.go.id', '082233445566', 'Sedati', 'Pabean', 'Jl. Raya Juanda No. 88, Sedati', 1, 'warga'),
(7, 'f7c3bc1d808e04732adf679965ccc34ca7ae3441', '351500000000****', '3515000000000001', 'Bambang Haryo Pratama, S.STP', 'admin.pemkab@sidoarjokab.go.id', '081122334455', 'Sidoarjo (Kota)', 'Sidokumpul', 'Gedung Setda Pemkab Sidoarjo, Jl. Gubernur Suryo No. 1', 1, 'admin_pemkab'),
(8, 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '351500000000****', '3515000000000002', 'Dewi Lestari, S.Kom', 'operator.dispendukcapil@sidoarjokab.go.id', '081133445566', 'Sidoarjo (Kota)', 'Sidokare', 'Kantor Disdukcapil Sidoarjo, Jl. Sultan Agung No. 34', 1, 'operator_opd');

-- Kredensial Hashed Password (salt + sha256 mock hash untuk keamanan sandi)
INSERT OR REPLACE INTO citizen_credentials (id, citizen_id, password_hash, salt, last_login_at, failed_login_count, is_locked) VALUES
(1, 1, '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', 'c18d9f02a4b8', '2026-11-10 08:30:00', 0, 0),
(2, 2, '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'f3e7a1b9c204', '2026-10-30 09:10:00', 0, 0),
(3, 3, '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a', 'd9c0e2a4f611', '2026-10-30 07:12:00', 0, 0),
(4, 4, 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', 'a8b7c6d5e4f3', '2026-11-01 11:20:00', 0, 0),
(5, 5, '2c5a71146777080a91176b5c32750da7b233a75a74e54e488d05e0c5f49e4933', 'b1c2d3e4f5a6', '2026-11-02 14:00:00', 0, 0),
(6, 6, '1b4f0e9851971998e732078544c61836cb8e064906f368297b98d249d4791336', '7a8b9c0d1e2f', '2026-11-05 16:45:00', 0, 0),
(7, 7, '407992a855b17d2a86570df87982a48d087342f3287401df911ab8de4ec0fbac', '330af7c1d0f5', '2026-11-11 18:00:00', 0, 0),
(8, 8, '407992a855b17d2a86570df87982a48d087342f3287401df911ab8de4ec0fbac', '330af7c1d0f5', '2026-11-11 18:00:00', 0, 0);

-- ------------------------------------------------------------
-- 3. KATALOG LAYANAN PUBLIK (12 Layanan SITAPAK)
-- ------------------------------------------------------------
INSERT OR REPLACE INTO services (id, title, opd, opd_key, category, access_channel, badge, badge_icon, description, sla, fee, primary_action_label, detail_route, has_detail_page, popularity_score) VALUES
('ktp', 'Perekaman & Cetak KTP Elektronik', 'Dinas Kependudukan & Pencatatan Sipil', 'disdukcapil', 'kependudukan', 'online', '100% Online & ADM', 'bolt', 'Penggantian e-KTP rusak, hilang, perubahan elemen data kependudukan atau pemula 17 tahun langsung diantar Pos atau cetak instan di mesin ADM.', '1 - 3 Hari Kerja', 'Rp 0 (Gratis)', 'Ajukan Sekarang', '#layanan/ktp', 1, 99),
('sku', 'Surat Keterangan Usaha & Domisili (SIPRAJA)', 'Kecamatan & Kelurahan', 'kecamatan', 'perizinan', 'online', 'TTE BSSN Sah', 'verified', 'Surat izin domisili dan keterangan legalitas tempat usaha resmi dengan tanda tangan elektronik Camat/Kades langsung terverifikasi.', '15 - 30 Menit', 'Rp 0 (Gratis)', 'Buka SIPRAJA', '#layanan/sku', 1, 98),
('nib', 'Perizinan Berusaha Mandiri (OSS-RBA)', 'Dinas PMPTSP Kab. Sidoarjo', 'dpmptsp', 'perizinan', 'online', 'Akreditasi BKPM RI', 'domain', 'Penerbitan Nomor Induk Berusaha mandiri secara terpadu melalui integrasi sistem OSS-RBA nasional dan asistensi Klinik LKPM.', 'Instan Terbit', 'Rp 0 (Gratis)', 'Buat NIB Mandiri', '#layanan/nib', 1, 95),
('faskes', 'Pendaftaran Faskes & Antrean Puskesmas Online', 'Dinas Kesehatan Kab. Sidoarjo', 'dinkes', 'kesehatan', 'mobile', 'Satu Sehat Mobile', 'phone_iphone', 'Booking antrean periksa di 31 Puskesmas se-Sidoarjo, integrasi BPJS Satu Sehat Kemenkes, dan rujukan terpadu RSUD R.T. Notopuro real-time.', '5 - 10 Menit', 'Rp 0 (BPJS Aktif)', 'Ambil Antrean', '#layanan/faskes', 1, 94),
('lapor', 'Pengaduan SP4N-LAPOR! & Kedaruratan Call 112', 'Diskominfo Sidoarjo', 'diskominfo', 'sosial', 'online', 'Siaga 24 Jam', 'alarm', 'Kanal aspirasi pengaduan publik jalan rusak, lampu PJU padam, tumpukan sampah, serta bantuan cepat ambulans & damkar darurat bebas pulsa.', 'Maks 2x24 Jam', 'Bebas Pulsa 100%', 'Kirim Laporan', '#laporan', 1, 92),
('dtks', 'Pendaftaran DTKS & Bantuan Sosial Sidoarjo', 'Dinas Sosial', 'dinsos', 'sosial', 'online', 'Bansos & PKH', 'handshake', 'Pengecekan status kepesertaan Data Terpadu Kesejahteraan Sosial, pendaftaran beasiswa yatim berprestasi daerah, dan bantuan beras non-tunai.', '3 - 5 Hari Kerja', 'Rp 0 (Gratis)', 'Cek Status NIK', '#layanan/dtks', 1, 87),
('pbb', 'Pengelolaan & Pembayaran PBB-P2 & BPHTB', 'Badan Pelayanan Pajak Daerah (BPPD)', 'bppd', 'pajak', 'online', 'Diskon Pokok PBB 10%', 'percent', 'Cek tagihan SPPT PBB tahun berjalan, riwayat pembayaran, cetak e-SPPT resmi, dan pembayaran multi-kanal QRIS, Bank Jatim, Tokopedia, Indomaret.', 'Realtime Online', 'Bebas Biaya Admin', 'Belum Tersedia', NULL, 0, 91),
('kia', 'Kartu Identitas Anak (KIA) Usia 0-17 Tahun', 'Dinas Kependudukan & Catatan Sipil', 'disdukcapil', 'kependudukan', 'adm', 'Diskon Merchant Mitra', 'child_care', 'Penerbitan kartu identitas resmi bagi anak usia 0 hingga 17 tahun kurang satu hari yang memberikan hak akses identitas dan fasilitas mitra diskon.', '2 - 3 Hari Kerja', 'Rp 0 (Gratis)', 'Belum Tersedia', NULL, 0, 89),
('mpp', 'Reservasi Antrean Sentra Pelayanan Publik (MPP)', 'DPMPTSP Mall Pelayanan Publik', 'dpmptsp', 'perizinan', 'mpp', '32 Instansi / 140 Layanan', 'apartment', 'Booking tiket antrean tatap muka terpadu di Gedung MPP Lingkar Timur untuk layanan Imigrasi Paspor, Samsat Corner, ATR/BPN, dan Kemenag.', 'Sesuai Jadwal Jam', 'Rp 0 (Gratis)', 'Belum Tersedia', NULL, 0, 88),
('ak1', 'Kartu Kuning AK-1 & Bursa Karir Perusahaan', 'Dinas Tenaga Kerja', 'disnaker', 'usaha', 'online', 'e-AK1 Langsung Jadi', 'picture_as_pdf', 'Penerbitan kartu pencari kerja digital instan PDF ber-QR Code resmi, pelatihan BLK daerah, dan bursa lamaran ke 400+ industri terdaftar di Sidoarjo.', 'Instan Digital', 'Rp 0 (Gratis)', 'Belum Tersedia', NULL, 0, 84),
('pbg', 'Persetujuan Bangunan Gedung (PBG & SLF)', 'Dinas Perkim Cipta Karya & Tata Ruang', 'dinas-pu', 'perizinan', 'online', 'SIMBG Nasional', 'gavel', 'Permohonan izin PBG resmi pengganti IMB untuk rumah tinggal, tempat usaha ruko, pabrik pergudangan dengan asistensi sidang Tim Profesi Ahli (TPA).', '7 - 14 Hari Kerja', 'Sesuai Perda Luas', 'Belum Tersedia', NULL, 0, 82),
('kurasi', 'Sertifikasi Halal & Kurasi Produk UMKM Delta', 'Dinas Koperasi & Usaha Mikro', 'dinkop', 'usaha', 'online', 'Fasilitasi Uji Lab Gratis', 'verified', 'Program fasilitasi sertifikasi Halal Self Declare BPJPH, uji nutrisi laboratorium daerah, dan pendaftaran izin edar P-IRT gratis bagi UMKM Sidoarjo.', '10 - 20 Hari Kerja', '100% Ditanggung APBD', 'Belum Tersedia', NULL, 0, 79);

-- ------------------------------------------------------------
-- 4. PERMOHONAN LAYANAN REALISTIS (SERVICE REQUESTS TERINTEGRASI TRACKING)
-- ------------------------------------------------------------
INSERT OR REPLACE INTO service_requests (id, tracking_number, service_id, citizen_id, applicant_name, nik_masked, service_name, status, current_opd, current_stage_text, progress_percent, priority, submit_date_formatted, estimated_completion, notes) VALUES
(1, 'REG-SDA-2025-08912', 'ktp', 2, 'Bagus Tri Prakoso', '351508210492****', 'Penerbitan KTP Elektronik & Pembaruan KK', 'Proses OPD', 'Dinas Kependudukan & Pencatatan Sipil Sidoarjo', 'Pencetakan Blanko KTP-el di Dispendukcapil', 60, 'Reguler', '28 Oktober 2025, 09:14 WIB', '31 Oktober 2025', 'Permohonan penggantian blanko rusak telah lolos verifikasi administrasi kelurahan.'),
(2, 'SIP-2025-44109', 'sku', 3, 'Siti Aminah', '351504560789****', 'Surat Keterangan Usaha Mikro (SKU) SIPRAJA', 'Siap Diambil', 'Kecamatan Candi - Sidoarjo', 'Penandatanganan Elektronik (TTE) Camat Candi', 100, 'Reguler', '29 Oktober 2025, 13:40 WIB', '30 Oktober 2025', 'Dokumen ber-TTE resmi Balai Sertifikasi Elektronik (BSrE) BSSN siap diunduh secara digital.'),
(3, 'NIB-2025-77218', 'nib', 6, 'Hendra Wijaya', '351503190785****', 'Perizinan Berusaha Mandiri (OSS-RBA)', 'Selesai', 'Dinas PMPTSP Kab. Sidoarjo', 'NIB Diterbitkan via Sistem OSS-RBA', 100, 'Reguler', '01 November 2025, 10:20 WIB', '01 November 2025', 'NIB Nomor 1205240019283 telah sinkron ke database BKPM dan izin usaha mikro berlaku efektif.');

-- ------------------------------------------------------------
-- 5. TAHAPAN ALUR WORKFLOW TIMELINE (SESUAI DOKUMEN TRACKDOCMODAL)
-- ------------------------------------------------------------
-- Steps untuk REG-SDA-2025-08912 (KTP Bagus Tri Prakoso)
INSERT OR REPLACE INTO request_workflow_timeline (id, request_id, step_number, title, date_text, notes, is_completed, is_current) VALUES
(1, 1, 1, 'Pengajuan Berkas Online via Plavon', '28 Okt 2025, 09:14 WIB', 'Dokumen KK & scan formulir F-1.02 lengkap diunggah.', 1, 0),
(2, 1, 2, 'Verifikasi Petugas Kelurahan Sidokare', '28 Okt 2025, 14:22 WIB', 'Data pemohon dinyatakan valid & bebas tunggakan adm.', 1, 0),
(3, 1, 3, 'Pencetakan Blanko KTP-el di Dispendukcapil', '29 Okt 2025, 11:05 WIB', 'Sedang dalam antrean cetak mesin ADM Dispendukcapil Sidoarjo.', 1, 1),
(4, 1, 4, 'Sertifikasi Tanda Tangan Elektronik (TTE)', 'Estimasi: 30 Okt 2025', 'Menunggu otorisasi digital Kepala Dispendukcapil via BSrE BSSN.', 0, 0),
(5, 1, 5, 'Dokumen Siap Diambil / Dikirim via Kurir', 'Estimasi: 31 Okt 2025', 'Pilihan pengantaran: Pos Kilat Khusus ke alamat domisili.', 0, 0);

-- Steps untuk SIP-2025-44109 (SKU Siti Aminah)
INSERT OR REPLACE INTO request_workflow_timeline (id, request_id, step_number, title, date_text, notes, is_completed, is_current) VALUES
(6, 2, 1, 'Pengajuan Mandiri via SIPRAJA', '29 Okt 2025, 13:40 WIB', 'Pengisian profil usaha kuliner & unggah foto lapak/toko.', 1, 0),
(7, 2, 2, 'Validasi RT/RW dan Desa Sepande', '29 Okt 2025, 16:10 WIB', 'Surat pengantar RT/RW nomor 042/RT03/2025 disetujui digital.', 1, 0),
(8, 2, 3, 'Verifikasi Seksi Perekonomian Kecamatan Candi', '30 Okt 2025, 06:45 WIB', 'Kesesuaian alamat fisik usaha terkonfirmasi.', 1, 0),
(9, 2, 4, 'Penandatanganan Elektronik (TTE) Camat Candi', '30 Okt 2025, 07:15 WIB', 'Dokumen PDF ber-barcode resmi sudah terbit.', 1, 1),
(10, 2, 5, 'Selesai & Dapat Diunduh', '30 Okt 2025, 07:16 WIB', 'Silakan unduh dokumen sah ber-TTE di menu portal.', 1, 0);

-- Steps untuk NIB-2025-77218 (NIB Hendra Wijaya)
INSERT OR REPLACE INTO request_workflow_timeline (id, request_id, step_number, title, date_text, notes, is_completed, is_current) VALUES
(11, 3, 1, 'Input NIK & Profil KBLI di OSS-RBA', '01 Nov 2025, 10:20 WIB', 'KBLI 47112 (Perdagangan Eceran Barang Campuran) risiko rendah.', 1, 0),
(12, 3, 2, 'Validasi Otomatis Tata Ruang (KKPR)', '01 Nov 2025, 10:25 WIB', 'Zonasi wilayah sesuai Rencana Tata Ruang Wilayah (RTRW) Sidoarjo.', 1, 0),
(13, 3, 3, 'Pernyataan Mandiri K3L & Lingkungan (SPPL)', '01 Nov 2025, 10:28 WIB', 'Komitmen kepatuhan standar lingkungan hidup mandiri.', 1, 0),
(14, 3, 4, 'Penerbitan NIB Resmi Kementerian Investasi/BKPM', '01 Nov 2025, 10:30 WIB', 'NIB berlaku sebagai izin tunggal, TDP, dan hak akses kepabeanan.', 1, 1);

-- Detail Permohonan KTP & SKU
INSERT OR REPLACE INTO ktp_application_details (id, request_id, application_type, pickup_channel, pos_tracking_number, biometric_verified, adm_machine_location) VALUES
(1, 1, 'rusak', 'pos_kilat', 'POS-SDA-8829104', 1, 'ADM MPP Lingkar Timur');

INSERT OR REPLACE INTO sku_application_details (id, request_id, business_name, business_type, business_address, employee_count, capital_amount, tte_cert_id, tte_signed_by, pdf_download_url) VALUES
(1, 2, 'Warung Makan Bu Siti Barokah', 'Kuliner & Minuman Tradisional', 'Jl. Raya Sepande No. 18, RT 03/RW 01, Desa Sepande, Candi', 3, 15000000, 'BSRE-TTE-351504-2025-0914', 'Drs. H. Lukman Hakim, M.Si (Camat Candi)', 'https://sipraja.sidoarjokab.go.id/download/sku/SIP-2025-44109.pdf');

-- ------------------------------------------------------------
-- 6. FASILITAS KESEHATAN (PUSKESMAS & RSUD SIDOARJO)
-- ------------------------------------------------------------
INSERT OR REPLACE INTO healthcare_units (id, code, name, type, address, district, contact_phone, active_queue_count, bpjs_integrated) VALUES
(1, 'RSUD_NOTOPURO', 'RSUD R.T. Notopuro Sidoarjo (Tipe B Pendidikan)', 'RSUD', 'Jl. Mojopahit No. 667, Sidoarjo Kota', 'Sidoarjo (Kota)', '031-8961649', 84, 1),
(2, 'RSUD_SDA_BARAT', 'RSUD Sidoarjo Barat (Tipe C)', 'RSUD', 'Jl. Bibis No. 1, Krian', 'Krian', '031-8977112', 38, 1),
(3, 'PUSK_SDA_KOTA', 'Puskesmas Sidoarjo Kota', 'Puskesmas', 'Jl. Dr. Soetomo No. 14, Sidoarjo Kota', 'Sidoarjo (Kota)', '031-8941212', 24, 1),
(4, 'PUSK_CANDI', 'Puskesmas Candi', 'Puskesmas', 'Jl. Raya Candi No. 10, Candi', 'Candi', '031-8921444', 19, 1),
(5, 'PUSK_WARU', 'Puskesmas Waru', 'Puskesmas', 'Jl. Barito No. 2, Waru', 'Waru', '031-8532111', 28, 1),
(6, 'PUSK_PORONG', 'Puskesmas Porong', 'Puskesmas', 'Jl. Bhayangkari No. 5, Porong', 'Porong', '031-8931122', 15, 1);

-- Monitoring Tempat Tidur RSUD
INSERT OR REPLACE INTO hospital_bed_inventory (id, faskes_id, class_name, total_beds, occupied_beds, available_beds, last_updated) VALUES
(1, 1, 'VVIP / Suite', 14, 11, 3, '2026-11-10 14:00:00'),
(2, 1, 'VIP', 32, 26, 6, '2026-11-10 14:00:00'),
(3, 1, 'Kelas 1', 68, 55, 13, '2026-11-10 14:00:00'),
(4, 1, 'Kelas 2', 84, 71, 13, '2026-11-10 14:00:00'),
(5, 1, 'Kelas 3 (BPJS PBI)', 180, 162, 18, '2026-11-10 14:00:00'),
(6, 1, 'ICU & CVCU', 24, 21, 3, '2026-11-10 14:00:00'),
(7, 1, 'NICU / PICU Bayi', 18, 14, 4, '2026-11-10 14:00:00'),
(8, 2, 'VIP', 16, 12, 4, '2026-11-10 14:00:00'),
(9, 2, 'Kelas 1', 28, 21, 7, '2026-11-10 14:00:00'),
(10, 2, 'Kelas 2 & 3', 75, 59, 16, '2026-11-10 14:00:00'),
(11, 2, 'ICU', 8, 6, 2, '2026-11-10 14:00:00');

-- Antrean Poli Faskes
INSERT OR REPLACE INTO faskes_appointments (id, booking_code, faskes_id, citizen_id, patient_name, nik_masked, clinic_department, appointment_date, appointment_session, queue_number, status) VALUES
(1, 'Q-SDA-2026-0412', 3, 1, 'Budi Santoso', '351508210490****', 'Poli Umum', '2026-11-12', 'Pagi (08:00 - 11:00)', 'A-014', 'Menunggu Panggilan'),
(2, 'Q-SDA-2026-0413', 4, 3, 'Siti Aminah', '351504560789****', 'Poli Gigi & Mulut', '2026-11-12', 'Pagi (08:00 - 11:00)', 'G-008', 'Menunggu Panggilan'),
(3, 'Q-SDA-2026-0399', 5, 4, 'Siti Rahmawati', '351501450892****', 'Poli KIA & Imunisasi', '2026-11-11', 'Siang (12:00 - 14:00)', 'K-005', 'Selesai');

-- ------------------------------------------------------------
-- 7. LAPORAN & ASPIRASI WARGA (KODE TIKET KRIPTOGRAFIS TINGGI)
-- ------------------------------------------------------------
INSERT OR REPLACE INTO citizen_reports (id, ticket_number, citizen_id, reporter_name, is_anonymous, title, category, category_label, description, kecamatan, kelurahan, location_address, coordinates, photo_url, urgency, status, progress_percent, assigned_opd, sla_target, official_response, responder_name, responder_opd) VALUES
(1, 'LAPOR-2025-8F3A9C', 1, 'Budi Santoso', 0, 'Jalan Berlubang di Jl. Pahlawan Dekat SDN Sidokumpul', 'infrastruktur', 'Infrastruktur & Bina Marga', 'Terdapat lubang jalan sedalam kurang lebih 15 cm di lajur kiri Jl. Pahlawan No. 42 yang membahayakan pengendara roda dua, terutama saat malam hari dan saat hujan tergenang air.', 'Sidoarjo (Kota)', 'Sidokumpul', 'Jl. Pahlawan No. 42, Kel. Sidokumpul, Kec. Sidoarjo Kota', '-7.4478° S, 112.7183° E', 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=800&q=80', 'Prioritas Reguler', 'Penanganan Lapangan', 75, 'Dinas PU Bina Marga & Sumber Daya Air Sidoarjo', '3x24 Jam Kerja', 'Laporan telah diverifikasi oleh Tim Helpdesk SP4N Diskominfo dan telah diteruskan ke Dinas PUBMSDA. Material aspal dingin dan alat compactor telah dikerahkan ke lokasi untuk penambalan darurat.', 'Ir. Dwi Prasetyo, M.T.', 'Koordinator TRC Dinas PUBMSDA Sidoarjo'),
(2, 'LAPOR-2025-4K2P7D', 4, 'Siti Rahmawati', 0, 'Lampu Penerangan Jalan Umum (PJU) Padam di Sepanjang Jl. Kolonel Sugiono Waru', 'lampu-jalan', 'Lampu Jalan & Listrik Umum', 'PJU padam total sebanyak 6 tiang berturut-turut menyebabkan jalan sangat gelap dan rawan tindak kejahatan begal pada jam 21.00 ke atas.', 'Waru', 'Kureksari', 'Jl. Kolonel Sugiono No. 8-16, Kec. Waru', '-7.3512° S, 112.7534° E', 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=800&q=80', 'Urgensi Tinggi', 'Selesai', 100, 'Dinas Perhubungan Kabupaten Sidoarjo', '2x24 Jam Kerja', 'Tim Penerangan Jalan Dishub Sidoarjo telah melakukan penggantian trafo miniature dan bohlam LED 120W pada 6 tiang tersebut. Lampu kini menyala normal.', 'Hadi Santosa, S.T.', 'Kasi Pemeliharaan PJU Dishub Sidoarjo'),
(3, 'LAPOR-2025-9M1X5B', 5, 'Ahmad Fauzi', 0, 'Antrean Poli Gigi Puskesmas Candi Terlalu Penuh Kuota Offline', 'kesehatan', 'Kesehatan & Layanan Faskes', 'Mohon penambahan kuota booking online poli gigi di Puskesmas Candi karena pasien lansia sering kehabisan nomor jika datang langsung pagi hari.', 'Candi', 'Gelam', 'Puskesmas Candi, Jl. Raya Candi No. 10', '-7.4812° S, 112.7210° E', NULL, 'Prioritas Reguler', 'Disposisi OPD', 50, 'Dinas Kesehatan Kabupaten Sidoarjo', '3x24 Jam Kerja', 'Terima kasih atas aspirasinya. Mulai Senin pekan depan kuota antrean online di aplikasi SITAPAK Faskes ditambah menjadi 40 pasien/hari.', 'dr. Endang Sulistyowati', 'Kepala Puskesmas Candi'),
(4, 'LAPOR-2025-7J4R2E', 1, 'Warga Sidoarjo (Anonim)', 1, 'Tumpukan Sampah Liar di Saluran Irigasi Krian Mengakibatkan Banjir Saluran', 'sampah', 'Kebersihan & Persampahan', 'Warga membuang sampah kantong plastik ke saluran sekunder Krian yang menyebabkan aliran air tersumbat dan meluap ke badan jalan saat hujan deras.', 'Krian', 'Katerungan', 'Saluran Irigasi Katerungan RT 03/RW 01, Kec. Krian', '-7.4123° S, 112.5843° E', 'https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?auto=format&fit=crop&w=800&q=80', 'Prioritas Reguler', 'Selesai', 100, 'Dinas Lingkungan Hidup dan Kebersihan Sidoarjo', '2x24 Jam Kerja', 'Armada truk sampah DLHK bersama paguyuban warga desa Katerungan telah mengevakuasi 2 ton sampah dari saluran dan memasang jaring penyekat.', 'Bambang Irawan', 'Mandor Kebersihan Wilayah Barat DLHK');

-- Timeline Laporan Warga
INSERT OR REPLACE INTO report_timelines (id, report_id, step_number, stage_name, status_text, description, officer_or_system, is_completed, timestamp) VALUES
(1, 1, 1, 'Tahap 1: Laporan Diterima Sistem', 'Diterima', 'Laporan warga berhasil tercatat di database sentral SITAPAK dengan tiket LAPOR-2025-8F3A9C dan status enkripsi valid.', 'Gateway Digital SITAPAK V2.4', 1, '2026-10-29 14:32:00'),
(2, 1, 2, 'Tahap 2: Verifikasi Bukti & Lokasi', 'Terverifikasi', 'Kelengkapan foto faktual, titik koordinat GPS (-7.4478, 112.7183), dan domisili NIK pelapor dinyatakan valid.', 'Helpdesk SP4N-LAPOR Diskominfo Sidoarjo', 1, '2026-10-29 16:15:00'),
(3, 1, 3, 'Tahap 3: Disposisi OPD & Penanganan Lapangan', 'Diproses Lapangan', 'Surat Perintah Kerja (SPK) No. 602/PUBMSDA/2026 diterbitkan. Tim Reaksi Cepat menuju lokasi penambalan.', 'Tim Reaksi Cepat (TRC) Dinas PUBMSDA', 1, '2026-10-30 09:00:00'),
(4, 1, 4, 'Tahap 4: Selesai & Evaluasi Kepuasan', 'Estimasi Selesai', 'Pekerjaan perkerasan aspal dingin tuntas, foto pasca-pengerjaan diunggah, dan notifikasi konfirmasi dikirim ke pelapor.', 'Seksi Pemeliharaan Jalan & Jembatan', 0, '2026-11-02 12:00:00');

-- ------------------------------------------------------------
-- 8. LAMPIRAN DOKUMEN & AUDIT TRAIL LOGS (HASH CHAIN)
-- ------------------------------------------------------------
INSERT OR REPLACE INTO document_attachments (id, entity_type, entity_id, file_name, file_size_bytes, mime_type, storage_path, sha256_hash, uploader_id) VALUES
(1, 'service_request', 1, 'scan_kk_asli_bagus.pdf', 1450200, 'application/pdf', 'private/ktp/2025/10/scan_kk_asli_bagus.pdf', '3a88a0e28f32bc7e49e2954a7c1b75e921d78e348982a514d0263b6d396a84c2', 2),
(2, 'service_request', 2, 'foto_lapak_usaha_sepande.jpg', 2145000, 'image/jpeg', 'private/sku/2025/10/foto_lapak_usaha_sepande.jpg', '7b4e9f1a2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f', 3),
(3, 'citizen_report', 1, 'foto_jalan_rusak_pahlawan_faktual.jpg', 1887430, 'image/jpeg', 'public/reports/2025/10/foto_jalan_rusak_pahlawan_faktual.jpg', '5c8d3e2a1b9f7a6b5c4d3e2a1b9f7a6b5c4d3e2a1b9f7a6b5c4d3e2a1b9f7a6b', 1);

-- Audit Trail Logs dengan Hash Chaining
INSERT OR REPLACE INTO audit_trail_logs (id, event_type, actor_type, actor_id, actor_name, target_entity, target_id, action_details, ip_address, previous_hash, current_hash, created_at) VALUES
(1, 'SYSTEM_BOOT', 'system', 'SYSTEM_CORE', 'Kernel SITAPAK V2.4', 'DATABASE', 'sitapak.db', 'Inisialisasi database engine dan pembuatan schema ISO 27001.', '127.0.0.1', '0000000000000000000000000000000000000000000000000000000000000000', '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08', '2026-10-28 08:00:00'),
(2, 'SERVICE_REQUEST_SUBMIT', 'citizen', '3515082104920005', 'Bagus Tri Prakoso', 'service_requests', 'REG-SDA-2025-08912', 'Pengajuan permohonan KTP-el online via portal SITAPAK.', '180.252.164.12', '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08', '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a', '2026-10-28 09:14:00'),
(3, 'TTE_DOCUMENT_SIGN', 'operator_opd', 'NIP_197508122002121003', 'Drs. H. Lukman Hakim, M.Si (Camat Candi)', 'service_requests', 'SIP-2025-44109', 'Penerbitan TTE BSrE BSSN Surat Keterangan Usaha Mikro (SKU).', '10.15.4.1', '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a', 'ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d', '2026-10-30 07:15:00');

-- ------------------------------------------------------------
-- 9. DATA TRANSPARANSI APBD, KECAMATAN & SATU DATA
-- ------------------------------------------------------------
INSERT OR REPLACE INTO budget_metrics (id, fiscal_year, sector_name, allocated_rupiah, allocated_formatted, percentage, realization_percent, description) VALUES
(1, 2026, 'Pendidikan & Beasiswa Delta Cerdas', 1309440000000, 'Rp 1,31 Triliun', 24.8, 81.2, 'BOSda, beasiswa perguruan tinggi 10.000 mahasiswa, dan renovasi sarana 120 sekolah dasar/menengah.'),
(2, 2026, 'Infrastruktur Jalan Beton & Drainase', 1135200000000, 'Rp 1,14 Triliun', 21.5, 76.5, 'Program prioritas tuntas betonisasi 45 ruas jalan kabupaten, normalisasi afvour kali, dan jembatan penghubung.'),
(3, 2026, 'Kesehatan & Puskesmas Terpadu', 960960000000, 'Rp 960 Miliar', 18.2, 79.4, 'Universal Health Coverage (UHC) 99,1% premi BPJS Kesehatan warga, operasional RSUD Barat, dan 31 Puskesmas.'),
(4, 2026, 'Pelayanan Publik & SPBE Digital', 813120000000, 'Rp 813 Miliar', 15.4, 82.0, 'Infrastruktur Command Center, jaringan fiber optik 18 kecamatan, Anjungan Dukcapil Mandiri, dan Delta-CSIRT.'),
(5, 2026, 'Ekonomi Kreatif & Pemberdayaan UMKM', 612480000000, 'Rp 612 Miliar', 11.6, 73.8, 'Bantuan modal bergulir KURDA bunga 3%, kurasi ekspor UMKM Delta, fasilitasi sertifikasi halal, dan pelatihan BLK.'),
(6, 2026, 'Perlindungan Sosial & Bantuan Pangan', 448800000000, 'Rp 448 Miliar', 8.5, 84.1, 'Bansos DTKS pangan beras lokal 10 kg, insentif RT/RW, bantuan lansia terlantar, dan penanganan anak stunting.');

INSERT OR REPLACE INTO district_budgets (id, fiscal_year, kecamatan_name, allocation_rupiah, allocation_formatted, absorption_percent, priority_focus, active_projects_count) VALUES
(1, 2026, 'Sidoarjo (Kota)', 384500000000, 'Rp 384,5 Miliar', 82.4, 'Revitalisasi Saluran Perkotaan & Trotoar Ramah Difabel', 14),
(2, 2026, 'Waru', 342100000000, 'Rp 342,1 Miliar', 79.8, 'Penanganan Banjir Rob Tropodo & Pelebaran Frontage Road', 12),
(3, 2026, 'Taman', 312800000000, 'Rp 312,8 Miliar', 81.0, 'Betonisasi Geluran-Kletek & Pasar Tradisional Sepanjang', 11),
(4, 2026, 'Candi', 298400000000, 'Rp 298,4 Miliar', 77.5, 'Saluran Pembuang Lingkar Timur & Puskesmas Pembantu', 9),
(5, 2026, 'Krian', 285600000000, 'Rp 285,6 Miliar', 78.2, 'Flyover Krian & Kawasan Penyangga Industri Barat', 10),
(6, 2026, 'Gedangan', 274200000000, 'Rp 274,2 Miliar', 80.5, 'Frontage Road Segmen Gedangan & Jaringan Irigasi', 8),
(7, 2026, 'Sukodono', 265900000000, 'Rp 265,9 Miliar', 76.8, 'Betonisasi Panjunan-Suko & Gedung Pelayanan Kecamatan', 7),
(8, 2026, 'Sedati', 254800000000, 'Rp 254,8 Miliar', 75.4, 'Jalan Akses Wisata Bahari Tlocor & Drainase Juanda', 8),
(9, 2026, 'Porong', 248700000000, 'Rp 248,7 Miliar', 83.2, 'Penguatan Tanggul Kali Porong & Pasar Wisata Baru', 6),
(10, 2026, 'Buduran', 242500000000, 'Rp 242,5 Miliar', 79.1, 'Pengembangan Sentra Industri Kerupuk & PJU Poros', 7),
(11, 2026, 'Tanggulangin', 238600000000, 'Rp 238,6 Miliar', 76.0, 'Pompa Banjir Banjarasri & Sentra Tas/Kulit Kludan', 9),
(12, 2026, 'Tulangan', 229400000000, 'Rp 229,4 Miliar', 77.9, 'Betonisasi Modong-Grabagan & Fasilitas Faskes Pratama', 6),
(13, 2026, 'Wonoayu', 221800000000, 'Rp 221,8 Miliar', 78.6, 'Pembangunan Jembatan Ploso & Irigasi Pertanian Padi', 5),
(14, 2026, 'Prambon', 214500000000, 'Rp 214,5 Miliar', 74.8, 'Jalan Usaha Tani & Normalisasi Saluran Pematusan', 6),
(15, 2026, 'Krembung', 208200000000, 'Rp 208,2 Miliar', 76.3, 'Rehabilitasi Saluran Sekunder PG Krembung & Aspal Desa', 5),
(16, 2026, 'Balongbendo', 202400000000, 'Rp 202,4 Miliar', 75.1, 'Penerangan Jalan Perbatasan Mojokerto & Puskesmas Pembantu', 5),
(17, 2026, 'Tarik', 198500000000, 'Rp 198,5 Miliar', 79.4, 'Betonisasi Tarik-Mliriprowo & Saluran Primer Brantas', 6),
(18, 2026, 'Jabon', 195200000000, 'Rp 195,2 Miliar', 81.6, 'Kawasan Tambak Bandeng Terpadu & Tanggul Air Payau', 5);

INSERT OR REPLACE INTO strategic_projects (id, fiscal_year, project_name, kecamatan, contractor, budget_rupiah, budget_formatted, physical_progress, status) VALUES
(1, 2026, 'Peningkatan Struktur Jalan Beton Ruas Tarik - Mliriprowo (2,8 Km)', 'Tarik', 'PT. Delta Karya Graha', 28500000000, 'Rp 28,5 Miliar', 94.2, 'Finishing Tahap Akhir'),
(2, 2026, 'Pembangunan Saluran Drainase Urban & Pedestrian Jl. Pahlawan', 'Sidoarjo (Kota)', 'PT. Sidoarjo Maju Bersama', 18200000000, 'Rp 18,2 Miliar', 88.5, 'Pengerjaan Fisik'),
(3, 2026, 'Pengadaan & Pemasangan 450 Titik Lampu PJU Solar Smart Segmen Krian - Balongbendo', 'Krian', 'CV. Sumber Cahaya Delta', 9800000000, 'Rp 9,8 Miliar', 100.0, 'Selesai 100%'),
(4, 2026, 'Modernisasi Fasilitas Bed Rawat Inap & Gedung IGD Terpadu RSUD R.T. Notopuro Sidoarjo Barat', 'Krian', 'PT. Adhi Citra Medika', 46000000000, 'Rp 46,0 Miliar', 78.4, 'Pengerjaan Fisik'),
(5, 2026, 'Normalisasi Kali Cantuk & Pengadaan Rumah Pompa Kapasitas 2.500 Liter/Detik', 'Waru', 'PT. Brantas Delta Abadi', 34500000000, 'Rp 34,5 Miliar', 82.0, 'Pengerjaan Fisik');

INSERT OR REPLACE INTO open_datasets (id, title, opd, category, file_formats, downloads_count, last_updated, description) VALUES
('apbd-2026', 'Data Rincian Anggaran Pendapatan & Belanja Daerah (APBD) Sidoarjo TA 2026', 'BPKAD Kab. Sidoarjo', 'Keuangan', 'CSV, XLSX, JSON, PDF', 4280, '28 Okt 2026', 'Kumpulan data tabular lengkap alokasi pagu belanja dan realisasi triwulanan menurut urusan pemerintahan daerah.'),
('kependudukan-2026', 'Statistik Agregat Kependudukan & Rasio Usia Produktif Per Kecamatan', 'Disdukcapil Sidoarjo', 'Kependudukan', 'CSV, XLSX, JSON, GEOJSON', 3150, '15 Okt 2026', 'Data kependudukan semesteran terverifikasi SIAK mencakup jumlah jiwa, kepala keluarga, dan distribusi gender per kecamatan.'),
('jalan-kemantapan', 'Inventarisasi Kondisi Kemantapan Jalan Kabupaten & Status Proyek Betonisasi', 'Dinas PUBMSDA', 'Infrastruktur', 'CSV, XLSX, GEOJSON', 2890, '22 Okt 2026', 'Data geospasial panjang ruas jalan kabupaten dalam kondisi mantap, sedang, rusak ringan, serta progres proyek betonisasi.'),
('faskes-sebaran', 'Sebaran 31 Puskesmas, 2 RSUD Daerah, dan Ketersediaan Tempat Tidur (BOR)', 'Dinas Kesehatan', 'Kesehatan', 'CSV, XLSX, JSON, API', 1980, '29 Okt 2026', 'Data direktori fasilitas kesehatan, tenaga medis terdaftar, status akreditasi paripurna, dan kapasitas rawat inap real-time.'),
('lapor-rekapitulasi', 'Rekapitulasi Penanganan Aduan Warga SP4N-LAPOR & Call 112 Tahun 2025-2026', 'Diskominfo Sidoarjo', 'Pelayanan', 'CSV, XLSX, JSON', 2410, '29 Okt 2026', 'Data statistik aduan masuk per sektor permasalahan, waktu respon rata-rata OPD, dan indeks kepuasan penanganan masalah.');
