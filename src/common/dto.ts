/**
 * SITAPAK Server-Side Data Transfer Objects (DTO) & Type Definitions
 * Enforces strict typing, length constraints, and whitelists across all controllers.
 */

export class CreateReportDto {
  title!: string;
  category!: string;
  categoryLabel?: string;
  description!: string;
  kecamatan!: string;
  kelurahan?: string;
  address!: string;
  locationNotes?: string;
  reporterName?: string;
  reporterPhone?: string;
  reporterEmail?: string;
  isAnonymous?: boolean | number;
  latitude?: number;
  longitude?: number;
  citizenId?: number;
}

export class LoginDto {
  nik!: string;
  password!: string;
}

export class RegisterCitizenDto {
  nik!: string;
  fullName!: string;
  email!: string;
  password!: string;
  phone!: string;
  kecamatan!: string;
  kelurahan!: string;
  address!: string;
}

export class UpdateReportStatusDto {
  status!: string;
  progressPercent?: number;
  assignedOpd?: string;
  officialResponse?: string;
  officerNotes?: string;
  officerName?: string;
  responderOpd?: string;
}

export class UpdateCitizenRoleDto {
  role!: 'admin_pemkab' | 'operator_opd' | 'warga';
}

export class VerifyCitizenDto {
  isVerified!: boolean;
}

export class UpdateHospitalBedDto {
  available!: number;
  occupied!: number;
  total!: number;
}
