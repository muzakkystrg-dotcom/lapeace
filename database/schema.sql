-- ============================================================
-- SISTEM DATABASE SITAPAK SIDOARJO (PORTAL DIGITAL RESMI)
-- Engine: SQLite 3 Enterprise Architecture (WAL Mode Enabled)
-- Standar: ISO 27001, Perpres 95/2018 (SPBE), UU PDP No. 27/2022
-- ============================================================

PRAGMA foreign_keys = ON;
PRAGMA journal_mode = WAL;
PRAGMA synchronous = NORMAL;
PRAGMA busy_timeout = 5000;

-- ------------------------------------------------------------
-- 1. TABEL MASTER ORGANISASI & PERANGKAT DAERAH (OPD)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS opd_organizations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code VARCHAR(50) NOT NULL UNIQUE, -- 'DISDUKCAPIL', 'DINKES', 'KEC_CANDI', dll
    name VARCHAR(200) NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'dinas', 'badan', 'kecamatan', 'kelurahan', 'rsud', 'puskesmas'
    district_code VARCHAR(20),
    contact_phone VARCHAR(30),
    contact_email VARCHAR(150),
    is_active BOOLEAN NOT NULL DEFAULT 1,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_opd_code ON opd_organizations(code);
CREATE INDEX IF NOT EXISTS idx_opd_category ON opd_organizations(category);

-- ------------------------------------------------------------
-- 2. TABEL WARGA (CITIZENS - PDP Masked & Compliant)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS citizens (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nik_hash VARCHAR(64) NOT NULL UNIQUE, -- HMAC-SHA256 untuk pencarian cepat & aman
    nik_masked VARCHAR(20) NOT NULL,      -- Contoh: '351508210492****'
    nik VARCHAR(16) NOT NULL,             -- Kolom terlindungi
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone VARCHAR(25) NOT NULL,
    kecamatan VARCHAR(100) NOT NULL,
    kelurahan VARCHAR(100) NOT NULL,
    address TEXT,
    is_verified BOOLEAN NOT NULL DEFAULT 1,
    role VARCHAR(20) NOT NULL DEFAULT 'warga', -- 'warga', 'operator_opd', 'admin_pemkab'
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_citizens_nik_hash ON citizens(nik_hash);
CREATE INDEX IF NOT EXISTS idx_citizens_email ON citizens(email);
CREATE INDEX IF NOT EXISTS idx_citizens_kecamatan ON citizens(kecamatan);

-- ------------------------------------------------------------
-- 3. TABEL KREDENSIAL KEAMANAN WARGA (CITIZEN CREDENTIALS)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS citizen_credentials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    citizen_id INTEGER NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    salt VARCHAR(64) NOT NULL,
    last_login_at DATETIME,
    failed_login_count INTEGER NOT NULL DEFAULT 0,
    is_locked BOOLEAN NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (citizen_id) REFERENCES citizens(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_credentials_citizen ON citizen_credentials(citizen_id);

-- ------------------------------------------------------------
-- 4. TABEL KATALOG LAYANAN PUBLIK (SERVICES)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS services (
    id VARCHAR(50) PRIMARY KEY, -- 'ktp', 'sku', 'nib', 'faskes', 'dtks', 'lapor', 'pbb'
    title VARCHAR(200) NOT NULL,
    opd VARCHAR(150) NOT NULL,
    opd_key VARCHAR(50) NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'kependudukan', 'perizinan', 'kesehatan', 'pajak', 'sosial', 'usaha'
    access_channel VARCHAR(50) NOT NULL, -- 'online', 'mpp', 'adm', 'mobile'
    badge VARCHAR(80),
    badge_icon VARCHAR(50),
    description TEXT NOT NULL,
    sla VARCHAR(50) NOT NULL,
    fee VARCHAR(50) NOT NULL DEFAULT 'Rp 0 (Gratis)',
    primary_action_label VARCHAR(80) NOT NULL,
    detail_route VARCHAR(100),
    has_detail_page BOOLEAN NOT NULL DEFAULT 0,
    popularity_score INTEGER NOT NULL DEFAULT 50,
    requirements_json TEXT, -- JSON Array persyaratan berkas
    is_active BOOLEAN NOT NULL DEFAULT 1,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_services_category ON services(category);
CREATE INDEX IF NOT EXISTS idx_services_opd ON services(opd_key);

-- ------------------------------------------------------------
-- 5. TABEL PERMOHONAN LAYANAN WARGA (SERVICE REQUESTS - UNIVERSAL TRACKING)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS service_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tracking_number VARCHAR(50) NOT NULL UNIQUE, -- 'REG-SDA-2025-08912', 'SIP-2025-44109', dll
    service_id VARCHAR(50) NOT NULL,
    citizen_id INTEGER,
    applicant_name VARCHAR(150) NOT NULL,
    nik_masked VARCHAR(20) NOT NULL,
    service_name VARCHAR(200) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Diajukan', -- 'Diajukan', 'Verifikasi Berkas', 'Proses OPD', 'Siap Diambil', 'Selesai', 'Ditolak'
    current_opd VARCHAR(150) NOT NULL,
    current_stage_text VARCHAR(200),
    progress_percent INTEGER NOT NULL DEFAULT 20,
    priority VARCHAR(30) NOT NULL DEFAULT 'Reguler',
    submit_date_formatted VARCHAR(100) NOT NULL,
    estimated_completion VARCHAR(100),
    notes TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE RESTRICT,
    FOREIGN KEY (citizen_id) REFERENCES citizens(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_requests_tracking ON service_requests(tracking_number);
CREATE INDEX IF NOT EXISTS idx_requests_citizen ON service_requests(citizen_id);
CREATE INDEX IF NOT EXISTS idx_requests_status ON service_requests(status);
CREATE INDEX IF NOT EXISTS idx_requests_service ON service_requests(service_id);

-- ------------------------------------------------------------
-- 6. TABEL TAHAPAN ALUR PERMOHONAN (REQUEST WORKFLOW TIMELINE)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS request_workflow_timeline (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    request_id INTEGER NOT NULL,
    step_number INTEGER NOT NULL,
    title VARCHAR(200) NOT NULL,
    date_text VARCHAR(100),
    notes TEXT,
    is_completed BOOLEAN NOT NULL DEFAULT 0,
    is_current BOOLEAN NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (request_id) REFERENCES service_requests(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_wf_request ON request_workflow_timeline(request_id);
CREATE INDEX IF NOT EXISTS idx_wf_step ON request_workflow_timeline(request_id, step_number);

-- ------------------------------------------------------------
-- 7. TABEL DETAIL PERMOHONAN KTP-EL (KTP APPLICATION DETAILS)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS ktp_application_details (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    request_id INTEGER NOT NULL UNIQUE,
    application_type VARCHAR(50) NOT NULL, -- 'pemula_17', 'rusak', 'hilang', 'perubahan_elemen'
    pickup_channel VARCHAR(50) NOT NULL,   -- 'pos_kilat', 'anjungan_adm', 'ambil_mpp', 'kantor_kecamatan'
    pos_tracking_number VARCHAR(100),      -- Nomor resi Pos Indonesia
    biometric_verified BOOLEAN NOT NULL DEFAULT 1,
    adm_machine_location VARCHAR(150),
    FOREIGN KEY (request_id) REFERENCES service_requests(id) ON DELETE CASCADE
);

-- ------------------------------------------------------------
-- 8. TABEL DETAIL PERMOHONAN SKU SIPRAJA (SKU APPLICATION DETAILS)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS sku_application_details (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    request_id INTEGER NOT NULL UNIQUE,
    business_name VARCHAR(200) NOT NULL,
    business_type VARCHAR(100) NOT NULL,
    business_address TEXT NOT NULL,
    employee_count INTEGER NOT NULL DEFAULT 1,
    capital_amount BIGINT NOT NULL DEFAULT 5000000,
    tte_cert_id VARCHAR(100), -- ID Sertifikasi BSrE BSSN
    tte_signed_by VARCHAR(150),
    pdf_download_url TEXT,
    FOREIGN KEY (request_id) REFERENCES service_requests(id) ON DELETE CASCADE
);

-- ------------------------------------------------------------
-- 9. TABEL FASILITAS KESEHATAN (HEALTHCARE UNITS - PUSKESMAS & RSUD)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS healthcare_units (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code VARCHAR(50) NOT NULL UNIQUE, -- 'PUSK_SDA_KOTA', 'RSUD_SDA_NOTOPURO', dll
    name VARCHAR(200) NOT NULL,
    type VARCHAR(30) NOT NULL,        -- 'Puskesmas', 'RSUD'
    address TEXT NOT NULL,
    district VARCHAR(100) NOT NULL,
    contact_phone VARCHAR(30) NOT NULL,
    active_queue_count INTEGER NOT NULL DEFAULT 0,
    bpjs_integrated BOOLEAN NOT NULL DEFAULT 1,
    is_active BOOLEAN NOT NULL DEFAULT 1,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_faskes_code ON healthcare_units(code);
CREATE INDEX IF NOT EXISTS idx_faskes_district ON healthcare_units(district);

-- ------------------------------------------------------------
-- 10. TABEL ANTREAN POLI FASKES ONLINE (FASKES APPOINTMENTS)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS faskes_appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    booking_code VARCHAR(50) NOT NULL UNIQUE, -- 'Q-SDA-2026-0412'
    faskes_id INTEGER NOT NULL,
    citizen_id INTEGER,
    patient_name VARCHAR(150) NOT NULL,
    nik_masked VARCHAR(20) NOT NULL,
    clinic_department VARCHAR(100) NOT NULL, -- 'Poli Umum', 'Poli Gigi', 'Poli KIA', dll
    appointment_date DATE NOT NULL,
    appointment_session VARCHAR(50) NOT NULL, -- 'Pagi (08:00 - 11:00)', 'Siang (12:00 - 14:00)'
    queue_number VARCHAR(20) NOT NULL,       -- 'A-014'
    status VARCHAR(50) NOT NULL DEFAULT 'Menunggu Panggilan', -- 'Menunggu Panggilan', 'Sedang Diperiksa', 'Selesai', 'Batal'
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (faskes_id) REFERENCES healthcare_units(id) ON DELETE RESTRICT,
    FOREIGN KEY (citizen_id) REFERENCES citizens(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_faskes_appt_booking ON faskes_appointments(booking_code);
CREATE INDEX IF NOT EXISTS idx_faskes_appt_date ON faskes_appointments(faskes_id, appointment_date);

-- ------------------------------------------------------------
-- 11. TABEL MONITORING TEMPAT TIDUR RSUD (HOSPITAL BED INVENTORY)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS hospital_bed_inventory (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    faskes_id INTEGER NOT NULL,
    class_name VARCHAR(50) NOT NULL, -- 'VVIP', 'VIP', 'Kelas 1', 'Kelas 2', 'Kelas 3', 'ICU', 'NICU'
    total_beds INTEGER NOT NULL DEFAULT 0,
    occupied_beds INTEGER NOT NULL DEFAULT 0,
    available_beds INTEGER NOT NULL DEFAULT 0,
    last_updated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (faskes_id) REFERENCES healthcare_units(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_bed_faskes ON hospital_bed_inventory(faskes_id);

-- ------------------------------------------------------------
-- 12. TABEL LAPORAN WARGA (CITIZEN REPORTS - CALL 112 & SP4N)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS citizen_reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ticket_number VARCHAR(50) NOT NULL UNIQUE, -- 'LAPOR-2025-8F3A9C' (Anti-Brute Force High Entropy)
    citizen_id INTEGER,
    reporter_name VARCHAR(150) NOT NULL,
    is_anonymous BOOLEAN NOT NULL DEFAULT 0,
    title VARCHAR(250) NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'infrastruktur', 'kesehatan', 'kependudukan', 'darurat', 'sampah', 'lampu-jalan'
    category_label VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    kecamatan VARCHAR(100) NOT NULL,
    kelurahan VARCHAR(100) NOT NULL,
    location_address TEXT NOT NULL,
    coordinates VARCHAR(100),
    photo_url TEXT,
    urgency VARCHAR(50) NOT NULL DEFAULT 'Prioritas Reguler',
    status VARCHAR(50) NOT NULL DEFAULT 'Menunggu Verifikasi', -- 'Menunggu Verifikasi', 'Verifikasi Diskominfo', 'Disposisi OPD', 'Penanganan Lapangan', 'Selesai'
    progress_percent INTEGER NOT NULL DEFAULT 25,
    assigned_opd VARCHAR(150) NOT NULL,
    sla_target VARCHAR(50) NOT NULL DEFAULT '3x24 Jam Kerja',
    official_response TEXT,
    responder_name VARCHAR(150),
    responder_opd VARCHAR(150),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (citizen_id) REFERENCES citizens(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_reports_ticket ON citizen_reports(ticket_number);
CREATE INDEX IF NOT EXISTS idx_reports_citizen ON citizen_reports(citizen_id);
CREATE INDEX IF NOT EXISTS idx_reports_status_date ON citizen_reports(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reports_kecamatan_status ON citizen_reports(kecamatan, status);
CREATE INDEX IF NOT EXISTS idx_reports_category ON citizen_reports(category);

-- ------------------------------------------------------------
-- 13. TABEL TIMELINE PROGRES LAPORAN (REPORT TIMELINES)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS report_timelines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    report_id INTEGER NOT NULL,
    step_number INTEGER NOT NULL,
    stage_name VARCHAR(150) NOT NULL,
    status_text VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    officer_or_system VARCHAR(150) NOT NULL,
    is_completed BOOLEAN NOT NULL DEFAULT 1,
    timestamp DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (report_id) REFERENCES citizen_reports(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_timelines_report_step ON report_timelines(report_id, step_number);

-- ------------------------------------------------------------
-- 14. TABEL MANAJEMEN LAMPIRAN BERKAS (DOCUMENT ATTACHMENTS)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS document_attachments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    entity_type VARCHAR(50) NOT NULL, -- 'service_request', 'citizen_report', 'faskes_appointment'
    entity_id INTEGER NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_size_bytes INTEGER NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    storage_path TEXT NOT NULL,
    sha256_hash VARCHAR(64) NOT NULL,
    uploader_id INTEGER,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_doc_entity ON document_attachments(entity_type, entity_id);

-- ------------------------------------------------------------
-- 15. TABEL AUDIT LOG TAK TERBANTAHKAN (AUDIT TRAIL LOGS - HASH CHAINED)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS audit_trail_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_type VARCHAR(100) NOT NULL, -- 'CITIZEN_LOGIN', 'REQUEST_SUBMITTED', 'STATUS_MUTATION', 'PII_ACCESSED'
    actor_type VARCHAR(50) NOT NULL,  -- 'citizen', 'operator_opd', 'system', 'admin'
    actor_id VARCHAR(100) NOT NULL,
    actor_name VARCHAR(150) NOT NULL,
    target_entity VARCHAR(100) NOT NULL,
    target_id VARCHAR(100) NOT NULL,
    action_details TEXT NOT NULL,
    ip_address VARCHAR(45) NOT NULL DEFAULT '127.0.0.1',
    previous_hash VARCHAR(64) NOT NULL DEFAULT 'GENESIS_HASH_SITAPAK_2026',
    current_hash VARCHAR(64) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_audit_created ON audit_trail_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_target ON audit_trail_logs(target_entity, target_id);
CREATE INDEX IF NOT EXISTS idx_audit_actor ON audit_trail_logs(actor_type, actor_id);

-- ------------------------------------------------------------
-- 16. TABEL TRANSPARANSI ANGGARAN APBD (BUDGET METRICS)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS budget_metrics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fiscal_year INTEGER NOT NULL DEFAULT 2026,
    sector_name VARCHAR(150) NOT NULL,
    allocated_rupiah BIGINT NOT NULL,
    allocated_formatted VARCHAR(50) NOT NULL,
    percentage REAL NOT NULL,
    realization_percent REAL NOT NULL,
    description TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_budget_year ON budget_metrics(fiscal_year);

-- ------------------------------------------------------------
-- 17. TABEL ANGGARAN KECAMATAN (DISTRICT BUDGETS)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS district_budgets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fiscal_year INTEGER NOT NULL DEFAULT 2026,
    kecamatan_name VARCHAR(100) NOT NULL UNIQUE,
    allocation_rupiah BIGINT NOT NULL,
    allocation_formatted VARCHAR(50) NOT NULL,
    absorption_percent REAL NOT NULL,
    priority_focus VARCHAR(200) NOT NULL,
    active_projects_count INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_district_budgets_year ON district_budgets(fiscal_year);

-- ------------------------------------------------------------
-- 18. TABEL PROYEK STRATEGIS DAERAH (STRATEGIC PROJECTS)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS strategic_projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fiscal_year INTEGER NOT NULL DEFAULT 2026,
    project_name VARCHAR(250) NOT NULL,
    kecamatan VARCHAR(100) NOT NULL,
    contractor VARCHAR(150) NOT NULL,
    budget_rupiah BIGINT NOT NULL,
    budget_formatted VARCHAR(50) NOT NULL,
    physical_progress REAL NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Pengerjaan Fisik'
);

CREATE INDEX IF NOT EXISTS idx_projects_year ON strategic_projects(fiscal_year);

-- ------------------------------------------------------------
-- 19. TABEL SATU DATA INDONESIA - OPEN DATASETS
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS open_datasets (
    id VARCHAR(80) PRIMARY KEY,
    title VARCHAR(250) NOT NULL,
    opd VARCHAR(150) NOT NULL,
    category VARCHAR(50) NOT NULL,
    file_formats VARCHAR(100) NOT NULL DEFAULT 'CSV, XLSX, JSON',
    downloads_count INTEGER NOT NULL DEFAULT 0,
    last_updated VARCHAR(50) NOT NULL,
    description TEXT
);
