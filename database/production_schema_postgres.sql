-- ============================================================================
-- ARSITEKTUR BASIS DATA PRODUCTION: SITAPAK PEMKAB SIDOARJO (POSTGRESQL 15/16)
-- Target: VPS Webuzo / Managed RDS / Cloud SQL
-- Standar: ISO 27001, Perpres 95/2018 (SPBE), UU No. 27/2022 (PDP)
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. OPD ORGANIZATIONS
CREATE TABLE IF NOT EXISTS opd_organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(200) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('dinas', 'badan', 'kecamatan', 'kelurahan', 'rsud', 'puskesmas')),
    district_code VARCHAR(20),
    contact_phone VARCHAR(30),
    contact_email VARCHAR(150),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_pg_opd_code ON opd_organizations(code);
CREATE INDEX IF NOT EXISTS idx_pg_opd_cat ON opd_organizations(category);

-- 2. CITIZENS (PDP MASKED & SECURE HASH)
CREATE TABLE IF NOT EXISTS citizens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nik_hash VARCHAR(64) NOT NULL UNIQUE,
    nik_masked VARCHAR(20) NOT NULL,
    nik_encrypted TEXT NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone VARCHAR(25) NOT NULL,
    kecamatan VARCHAR(100) NOT NULL,
    kelurahan VARCHAR(100) NOT NULL,
    address TEXT,
    is_verified BOOLEAN NOT NULL DEFAULT TRUE,
    role VARCHAR(20) NOT NULL DEFAULT 'warga' CHECK (role IN ('warga', 'operator_opd', 'admin_pemkab')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_pg_citizens_nik_hash ON citizens(nik_hash);
CREATE INDEX IF NOT EXISTS idx_pg_citizens_email ON citizens(email);

-- 3. CITIZEN CREDENTIALS
CREATE TABLE IF NOT EXISTS citizen_credentials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    citizen_id UUID NOT NULL UNIQUE REFERENCES citizens(id) ON DELETE CASCADE,
    password_hash VARCHAR(255) NOT NULL,
    salt VARCHAR(64) NOT NULL,
    last_login_at TIMESTAMPTZ,
    failed_login_count INT NOT NULL DEFAULT 0,
    is_locked BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

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
    has_detail_page BOOLEAN NOT NULL DEFAULT FALSE,
    popularity_score INT NOT NULL DEFAULT 50,
    requirements_json JSONB,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 5. SERVICE REQUESTS (UNIVERSAL TRACKING)
CREATE TABLE IF NOT EXISTS service_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tracking_number VARCHAR(50) NOT NULL UNIQUE,
    service_id VARCHAR(50) NOT NULL REFERENCES services(id) ON DELETE RESTRICT,
    citizen_id UUID REFERENCES citizens(id) ON DELETE SET NULL,
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
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_pg_req_tracking ON service_requests(tracking_number);
CREATE INDEX IF NOT EXISTS idx_pg_req_citizen ON service_requests(citizen_id);
CREATE INDEX IF NOT EXISTS idx_pg_req_status ON service_requests(status);

-- 6. REQUEST WORKFLOW TIMELINE
CREATE TABLE IF NOT EXISTS request_workflow_timeline (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    request_id UUID NOT NULL REFERENCES service_requests(id) ON DELETE CASCADE,
    step_number INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    date_text VARCHAR(100),
    notes TEXT,
    is_completed BOOLEAN NOT NULL DEFAULT FALSE,
    is_current BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_pg_wf_req_step ON request_workflow_timeline(request_id, step_number);

-- 7. KTP & SKU DETAILS
CREATE TABLE IF NOT EXISTS ktp_application_details (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    request_id UUID NOT NULL UNIQUE REFERENCES service_requests(id) ON DELETE CASCADE,
    application_type VARCHAR(50) NOT NULL,
    pickup_channel VARCHAR(50) NOT NULL,
    pos_tracking_number VARCHAR(100),
    biometric_verified BOOLEAN NOT NULL DEFAULT TRUE,
    adm_machine_location VARCHAR(150)
);

CREATE TABLE IF NOT EXISTS sku_application_details (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    request_id UUID NOT NULL UNIQUE REFERENCES service_requests(id) ON DELETE CASCADE,
    business_name VARCHAR(200) NOT NULL,
    business_type VARCHAR(100) NOT NULL,
    business_address TEXT NOT NULL,
    employee_count INT NOT NULL DEFAULT 1,
    capital_amount BIGINT NOT NULL DEFAULT 5000000,
    tte_cert_id VARCHAR(100),
    tte_signed_by VARCHAR(150),
    pdf_download_url TEXT
);

-- 8. HEALTHCARE & APPOINTMENTS
CREATE TABLE IF NOT EXISTS healthcare_units (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(200) NOT NULL,
    type VARCHAR(30) NOT NULL CHECK (type IN ('Puskesmas', 'RSUD')),
    address TEXT NOT NULL,
    district VARCHAR(100) NOT NULL,
    contact_phone VARCHAR(30) NOT NULL,
    active_queue_count INT NOT NULL DEFAULT 0,
    bpjs_integrated BOOLEAN NOT NULL DEFAULT TRUE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS faskes_appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_code VARCHAR(50) NOT NULL UNIQUE,
    faskes_id UUID NOT NULL REFERENCES healthcare_units(id) ON DELETE RESTRICT,
    citizen_id UUID REFERENCES citizens(id) ON DELETE SET NULL,
    patient_name VARCHAR(150) NOT NULL,
    nik_masked VARCHAR(20) NOT NULL,
    clinic_department VARCHAR(100) NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_session VARCHAR(50) NOT NULL,
    queue_number VARCHAR(20) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Menunggu Panggilan',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS hospital_bed_inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    faskes_id UUID NOT NULL REFERENCES healthcare_units(id) ON DELETE CASCADE,
    class_name VARCHAR(50) NOT NULL,
    total_beds INT NOT NULL DEFAULT 0,
    occupied_beds INT NOT NULL DEFAULT 0,
    available_beds INT NOT NULL DEFAULT 0,
    last_updated TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 9. CITIZEN REPORTS & TIMELINES
CREATE TABLE IF NOT EXISTS citizen_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_number VARCHAR(50) NOT NULL UNIQUE,
    citizen_id UUID REFERENCES citizens(id) ON DELETE SET NULL,
    reporter_name VARCHAR(150) NOT NULL,
    is_anonymous BOOLEAN NOT NULL DEFAULT FALSE,
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
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_pg_rep_ticket ON citizen_reports(ticket_number);
CREATE INDEX IF NOT EXISTS idx_pg_rep_status_date ON citizen_reports(status, created_at DESC);

CREATE TABLE IF NOT EXISTS report_timelines (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    report_id UUID NOT NULL REFERENCES citizen_reports(id) ON DELETE CASCADE,
    step_number INT NOT NULL,
    stage_name VARCHAR(150) NOT NULL,
    status_text VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    officer_or_system VARCHAR(150) NOT NULL,
    is_completed BOOLEAN NOT NULL DEFAULT TRUE,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 10. DOCUMENT ATTACHMENTS & AUDIT TRAIL LOGS
CREATE TABLE IF NOT EXISTS document_attachments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_type VARCHAR(50) NOT NULL,
    entity_id UUID NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_size_bytes INT NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    storage_path TEXT NOT NULL,
    sha256_hash VARCHAR(64) NOT NULL,
    uploader_id UUID,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS audit_trail_logs (
    id BIGSERIAL PRIMARY KEY,
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
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_pg_audit_created ON audit_trail_logs(created_at DESC);

-- Trigger Immutability Audit (Mencegah UPDATE & DELETE pada audit_trail_logs)
CREATE OR REPLACE FUNCTION trg_prevent_audit_tampering()
RETURNS TRIGGER AS $$
BEGIN
    RAISE EXCEPTION 'Operasi % dilarang pada tabel audit_trail_logs (Immutable Ledger)!', TG_OP;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_audit_no_tamper ON audit_trail_logs;
CREATE TRIGGER trg_audit_no_tamper
BEFORE UPDATE OR DELETE ON audit_trail_logs
FOR EACH ROW EXECUTE FUNCTION trg_prevent_audit_tampering();
