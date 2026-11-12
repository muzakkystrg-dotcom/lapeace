import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { sanitizePayload } from './sanitizer.js';
import {
  CreateReportDto,
  LoginDto,
  RegisterCitizenDto,
  UpdateReportStatusDto,
  UpdateCitizenRoleDto,
  VerifyCitizenDto,
  UpdateHospitalBedDto,
} from './dto.js';

@Injectable()
export class SecurityValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value === null || value === undefined) {
      return value;
    }

    // 1. Recursive payload sanitization (Anti-XSS & Prototype Pollution)
    const sanitized = sanitizePayload(value);

    // 2. Metatype DTO validation
    const { metatype } = metadata;
    if (!metatype) {
      return sanitized;
    }

    if (metatype === CreateReportDto) {
      this.validateCreateReport(sanitized);
    } else if (metatype === LoginDto) {
      this.validateLogin(sanitized);
    } else if (metatype === RegisterCitizenDto) {
      this.validateRegister(sanitized);
    } else if (metatype === UpdateReportStatusDto) {
      this.validateUpdateReportStatus(sanitized);
    } else if (metatype === UpdateCitizenRoleDto) {
      this.validateUpdateCitizenRole(sanitized);
    } else if (metatype === VerifyCitizenDto) {
      this.validateVerifyCitizen(sanitized);
    } else if (metatype === UpdateHospitalBedDto) {
      this.validateUpdateHospitalBed(sanitized);
    }

    return sanitized;
  }

  private validateCreateReport(data: any) {
    if (!data.title || typeof data.title !== 'string' || data.title.length < 5 || data.title.length > 150) {
      throw new BadRequestException('Judul laporan wajib diisi (antara 5 hingga 150 karakter).');
    }

    if (!data.description || typeof data.description !== 'string' || data.description.length < 10 || data.description.length > 3000) {
      throw new BadRequestException('Deskripsi laporan wajib diisi (antara 10 hingga 3000 karakter).');
    }

    const validCategories = [
      'infrastruktur',
      'kesehatan',
      'lingkungan',
      'sosial',
      'perizinan',
      'kependudukan',
      'keamanan',
      'lainnya',
    ];
    if (!data.category || !validCategories.includes(String(data.category).toLowerCase())) {
      throw new BadRequestException(
        `Kategori laporan tidak valid. Kategori yang didukung: ${validCategories.join(', ')}`,
      );
    }

    if (!data.kecamatan || typeof data.kecamatan !== 'string' || data.kecamatan.length < 3 || data.kecamatan.length > 60) {
      throw new BadRequestException('Nama kecamatan wajib diisi (antara 3 hingga 60 karakter).');
    }

    if (!data.address || typeof data.address !== 'string' || data.address.length < 5 || data.address.length > 300) {
      throw new BadRequestException('Alamat / lokasi kejadian wajib diisi (antara 5 hingga 300 karakter).');
    }

    if (data.reporterName && (typeof data.reporterName !== 'string' || data.reporterName.length > 100)) {
      throw new BadRequestException('Nama pelapor maksimal 100 karakter.');
    }
  }

  private validateLogin(data: any) {
    if (!data.nik || typeof data.nik !== 'string' || !/^\d{16}$/.test(data.nik.trim())) {
      throw new BadRequestException('NIK harus berjumlah tepat 16 digit angka sesuai KTP.');
    }

    if (!data.password || typeof data.password !== 'string' || data.password.length < 1 || data.password.length > 100) {
      throw new BadRequestException('Kata sandi wajib diisi dan maksimal 100 karakter.');
    }
  }

  private validateRegister(data: any) {
    if (!data.nik || typeof data.nik !== 'string' || !/^\d{16}$/.test(data.nik.trim())) {
      throw new BadRequestException('NIK harus berjumlah tepat 16 digit angka sesuai KTP.');
    }

    if (!data.fullName || typeof data.fullName !== 'string' || data.fullName.length < 3 || data.fullName.length > 100) {
      throw new BadRequestException('Nama lengkap wajib diisi (antara 3 hingga 100 karakter).');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || typeof data.email !== 'string' || !emailRegex.test(data.email) || data.email.length > 120) {
      throw new BadRequestException('Format alamat email tidak valid.');
    }

    if (!data.password || typeof data.password !== 'string' || data.password.length < 8 || data.password.length > 100) {
      throw new BadRequestException('Kata sandi wajib diisi dan minimal 8 karakter (maksimal 100 karakter).');
    }

    if (!data.phone || typeof data.phone !== 'string' || !/^(\+62|62|08)[0-9]{8,13}$/.test(data.phone.replace(/[\s-]/g, ''))) {
      throw new BadRequestException('Nomor telepon/HP tidak valid (contoh format: 081234567890).');
    }

    if (!data.kecamatan || typeof data.kecamatan !== 'string' || data.kecamatan.length < 3 || data.kecamatan.length > 60) {
      throw new BadRequestException('Kecamatan wajib dipilih.');
    }

    if (!data.kelurahan || typeof data.kelurahan !== 'string' || data.kelurahan.length < 3 || data.kelurahan.length > 60) {
      throw new BadRequestException('Kelurahan / Desa wajib dipilih.');
    }
  }

  private validateUpdateReportStatus(data: any) {
    const validStatuses = [
      'Menunggu Verifikasi',
      'Diverifikasi',
      'Disposisi OPD',
      'Penanganan Lapangan',
      'Selesai',
      'Ditolak',
    ];
    if (!data.status || !validStatuses.includes(data.status)) {
      throw new BadRequestException(
        `Status laporan tidak valid. Pilihan yang sah: ${validStatuses.join(', ')}`,
      );
    }

    if (data.progressPercent !== undefined) {
      const p = Number(data.progressPercent);
      if (isNaN(p) || p < 0 || p > 100) {
        throw new BadRequestException('Persentase progres harus berupa angka antara 0 hingga 100.');
      }
    }

    if (data.officerNotes && (typeof data.officerNotes !== 'string' || data.officerNotes.length > 1000)) {
      throw new BadRequestException('Catatan petugas maksimal 1000 karakter.');
    }
  }

  private validateUpdateCitizenRole(data: any) {
    const validRoles = ['admin_pemkab', 'operator_opd', 'warga'];
    if (!data.role || !validRoles.includes(data.role)) {
      throw new BadRequestException(`Peran akun tidak valid. Pilihan: ${validRoles.join(', ')}`);
    }
  }

  private validateVerifyCitizen(data: any) {
    if (data.isVerified === undefined || typeof data.isVerified !== 'boolean') {
      throw new BadRequestException('Status verifikasi (isVerified) harus berupa nilai boolean (true/false).');
    }
  }

  private validateUpdateHospitalBed(data: any) {
    const available = Number(data.available);
    const occupied = Number(data.occupied);
    const total = Number(data.total);

    if (isNaN(available) || available < 0 || isNaN(occupied) || occupied < 0 || isNaN(total) || total < 0) {
      throw new BadRequestException('Jumlah ranjang harus berupa angka bilangan bulat non-negatif.');
    }
  }
}
