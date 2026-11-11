-- ============================================================================
-- ARSITEKTUR BASIS DATA PRODUCTION: SITAPAK PEMKAB SIDOARJO (MYSQL 8 / MARIADB)
-- Target: VPS Webuzo / cPanel / MariaDB Server
-- Standar: ISO 27001, Perpres 95/2018 (SPBE), UU No. 27/2022 (PDP)
-- ============================================================================

SET FOREIGN_KEY_CHECKS = 0;

-- 1. OPD ORGANIZATIONS
CREATE TABLE IF NOT EXISTS opd_organizations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(200) NOT NULL,
    category ENUM('dinas', 'badan', 'kecamatan', 'kelurahan', 'rsud', 'puskesmas') NOT NULL,
    district_code VARCHAR(20),
    contact_phone VARCHAR(30),
    contact_email VARCHAR(150),
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_my_opd_code (code),
    INDEX idx_my_opd_cat (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. CITIZENS (PDP MASKED & SECURE HASH)
CREATE TABLE IF NOT EXISTS citizens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nik_hash VARCHAR(64) NOT NULL UNIQUE,
    nik_masked VARCHAR(20) NOT NULL,
    nik VARCHAR(16) NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone VARCHAR(25) NOT NULL,
    kecamatan VARCHAR(100) NOT NULL,
    kelurahan VARCHAR(100) NOT NULL,
    address TEXT,
    is_verified TINYINT(1) NOT NULL DEFAULT 1,
    role ENUM('warga', 'operator_opd', 'admin_pemkab') NOT NULL DEFAULT 'warga',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_my_citizens_nik_hash (nik_hash),
    INDEX idx_my_citizens_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. CITIZEN CREDENTIALS
CREATE TABLE IF NOT EXISTS citizen_credentials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    citizen_id INT NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    salt VARCHAR(64) NOT NULL,
    last_login_at DATETIME,
    failed_login_count INT NOT NULL DEFAULT 0,
    is_locked TINYINT(1) NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (citizen_id) REFERENCES citizens(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. SERVICES CATALOG
CREATE TABLE IF NOT EXISTS services (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    opd VARCHAR(150) NOT NULL,
    opd_key VARCHAR(50) NOT NULL,
    category VARCHAR(50) NOT NULL,
    access_channel VARCHAR(50) NOT NULL,
    badge VARCHAR(80),
    badge_icon VARCHAR(50),
    description TEXT NOT NULL,
    sla VARCHAR(50) NOT NULL,
    fee VARCHAR(50) NOT NULL DEFAULT 'Rp 0 (Gratis)',
    primary_action_label VARCHAR(80) NOT NULL,
    detail_route VARCHAR(100),
    has_detail_page TINYINT(1) NOT NULL DEFAULT 0,
    popularity_score INT NOT NULL DEFAULT 50,
    requirements_json JSON,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. SERVICE REQUESTS (UNIVERSAL TRACKING)
CREATE TABLE IF NOT EXISTS service_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tracking_number VARCHAR(50) NOT NULL UNIQUE,
    service_id VARCHAR(50) NOT NULL,
    citizen_id INT,
    applicant_name VARCHAR(150) NOT NULL,
    nik_masked VARCHAR(20) NOT NULL,
    service_name VARCHAR(200) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Diajukan',
    current_opd VARCHAR(150) NOT NULL,
    current_stage_text VARCHAR(200),
    progress_percent INT NOT NULL DEFAULT 20,
    priority VARCHAR(30) NOT NULL DEFAULT 'Reguler',
    submit_date_formatted VARCHAR(100) NOT NULL,
    estimated_completion VARCHAR(100),
    notes TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE RESTRICT,
    FOREIGN KEY (citizen_id) REFERENCES citizens(id) ON DELETE SET NULL,
    INDEX idx_my_req_tracking (tracking_number),
    INDEX idx_my_req_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. REQUEST WORKFLOW TIMELINE
CREATE TABLE IF NOT EXISTS request_workflow_timeline (
    id INT AUTO_INCREMENT PRIMARY KEY,
    request_id INT NOT NULL,
    step_number INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    date_text VARCHAR(100),
    notes TEXT,
    is_completed TINYINT(1) NOT NULL DEFAULT 0,
    is_current TINYINT(1) NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (request_id) REFERENCES service_requests(id) ON DELETE CASCADE,
    INDEX idx_my_wf_req_step (request_id, step_number)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. KTP & SKU DETAILS
CREATE TABLE IF NOT EXISTS ktp_application_details (
    id INT AUTO_INCREMENT PRIMARY KEY,
    request_id INT NOT NULL UNIQUE,
    application_type VARCHAR(50) NOT NULL,
    pickup_channel VARCHAR(50) NOT NULL,
    pos_tracking_number VARCHAR(100),
    biometric_verified TINYINT(1) NOT NULL DEFAULT 1,
    adm_machine_location VARCHAR(150),
    FOREIGN KEY (request_id) REFERENCES service_requests(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS sku_application_details (
    id INT AUTO_INCREMENT PRIMARY KEY,
    request_id INT NOT NULL UNIQUE,
    business_name VARCHAR(200) NOT NULL,
    business_type VARCHAR(100) NOT NULL,
    business_address TEXT NOT NULL,
    employee_count INT NOT NULL DEFAULT 1,
    capital_amount BIGINT NOT NULL DEFAULT 5000000,
    tte_cert_id VARCHAR(100),
    tte_signed_by VARCHAR(150),
    pdf_download_url TEXT,
    FOREIGN KEY (request_id) REFERENCES service_requests(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. HEALTHCARE & APPOINTMENTS
CREATE TABLE IF NOT EXISTS healthcare_units (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(200) NOT NULL,
    type ENUM('Puskesmas', 'RSUD') NOT NULL,
    address TEXT NOT NULL,
    district VARCHAR(100) NOT NULL,
    contact_phone VARCHAR(30) NOT NULL,
    active_queue_count INT NOT NULL DEFAULT 0,
    bpjs_integrated TINYINT(1) NOT NULL DEFAULT 1,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS faskes_appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    booking_code VARCHAR(50) NOT NULL UNIQUE,
    faskes_id INT NOT NULL,
    citizen_id INT,
    patient_name VARCHAR(150) NOT NULL,
    nik_masked VARCHAR(20) NOT NULL,
    clinic_department VARCHAR(100) NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_session VARCHAR(50) NOT NULL,
    queue_number VARCHAR(20) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Menunggu Panggilan',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (faskes_id) REFERENCES healthcare_units(id) ON DELETE RESTRICT,
    FOREIGN KEY (citizen_id) REFERENCES citizens(id) ON DELETE SET NULL,
    INDEX idx_my_faskes_appt (faskes_id, appointment_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS hospital_bed_inventory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    faskes_id INT NOT NULL,
    class_name VARCHAR(50) NOT NULL,
    total_beds INT NOT NULL DEFAULT 0,
    occupied_beds INT NOT NULL DEFAULT 0,
    available_beds INT NOT NULL DEFAULT 0,
    last_updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (faskes_id) REFERENCES healthcare_units(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. CITIZEN REPORTS & TIMELINES
CREATE TABLE IF NOT EXISTS citizen_reports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ticket_number VARCHAR(50) NOT NULL UNIQUE,
    citizen_id INT,
    reporter_name VARCHAR(150) NOT NULL,
    is_anonymous TINYINT(1) NOT NULL DEFAULT 0,
    title VARCHAR(250) NOT NULL,
    category VARCHAR(50) NOT NULL,
    category_label VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    kecamatan VARCHAR(100) NOT NULL,
    kelurahan VARCHAR(100) NOT NULL,
    location_address TEXT NOT NULL,
    coordinates VARCHAR(100),
    photo_url TEXT,
    urgency VARCHAR(50) NOT NULL DEFAULT 'Prioritas Reguler',
    status VARCHAR(50) NOT NULL DEFAULT 'Menunggu Verifikasi',
    progress_percent INT NOT NULL DEFAULT 25,
    assigned_opd VARCHAR(150) NOT NULL,
    sla_target VARCHAR(50) NOT NULL DEFAULT '3x24 Jam Kerja',
    official_response TEXT,
    responder_name VARCHAR(150),
    responder_opd VARCHAR(150),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (citizen_id) REFERENCES citizens(id) ON DELETE SET NULL,
    INDEX idx_my_rep_ticket (ticket_number),
    INDEX idx_my_rep_status (status, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS report_timelines (
    id INT AUTO_INCREMENT PRIMARY KEY,
    report_id INT NOT NULL,
    step_number INT NOT NULL,
    stage_name VARCHAR(150) NOT NULL,
    status_text VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    officer_or_system VARCHAR(150) NOT NULL,
    is_completed TINYINT(1) NOT NULL DEFAULT 1,
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (report_id) REFERENCES citizen_reports(id) ON DELETE CASCADE,
    INDEX idx_my_report_step (report_id, step_number)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. DOCUMENT ATTACHMENTS & AUDIT TRAIL LOGS
CREATE TABLE IF NOT EXISTS document_attachments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    entity_type VARCHAR(50) NOT NULL,
    entity_id INT NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_size_bytes INT NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    storage_path TEXT NOT NULL,
    sha256_hash VARCHAR(64) NOT NULL,
    uploader_id INT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS audit_trail_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    event_type VARCHAR(100) NOT NULL,
    actor_type VARCHAR(50) NOT NULL,
    actor_id VARCHAR(100) NOT NULL,
    actor_name VARCHAR(150) NOT NULL,
    target_entity VARCHAR(100) NOT NULL,
    target_id VARCHAR(100) NOT NULL,
    action_details TEXT NOT NULL,
    ip_address VARCHAR(45) NOT NULL DEFAULT '127.0.0.1',
    previous_hash VARCHAR(64) NOT NULL,
    current_hash VARCHAR(64) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_my_audit_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
