import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service.js';
import { CryptoService } from '../common/crypto.service.js';

@Injectable()
export class AuthService {
  constructor(
    @Inject(DatabaseService) private readonly dbService: DatabaseService,
    @Inject(CryptoService) private readonly cryptoService: CryptoService,
  ) {}

  login(nik: string, password?: string, ipAddress = '127.0.0.1') {
    const db = this.dbService.getDatabase();
    const cleanNik = nik.trim();

    // 1. Cari warga berdasarkan NIK asli atau nik_masked
    const citizen = db
      .prepare('SELECT * FROM citizens WHERE nik = ? OR nik_masked = ?')
      .get(cleanNik, cleanNik) as any;

    if (!citizen) {
      this.dbService.createAuditLog({
        eventType: 'AUTH_LOGIN_FAILED',
        actorType: 'anonymous',
        actorId: cleanNik,
        actorName: 'Unknown',
        targetEntity: 'citizens',
        targetId: cleanNik,
        actionDetails: `Percobaan login gagal: NIK tidak terdaftar (${cleanNik})`,
        ipAddress,
      });
      throw new UnauthorizedException('NIK atau kata sandi tidak valid.');
    }

    // 2. Ambil kredensial akun
    const cred = db
      .prepare('SELECT * FROM citizen_credentials WHERE citizen_id = ?')
      .get(citizen.id) as any;

    if (cred && cred.is_locked) {
      throw new UnauthorizedException(
        'Akun Anda terkunci sementara karena beberapa kali percobaan login gagal. Hubungi Diskominfo Sidoarjo.',
      );
    }

    // 3. Verifikasi Password (Mendukung password resmi & Master Demo Password 'WargaSidoarjo2026!')
    const isValidDemoPassword = password === 'WargaSidoarjo2026!';
    let isPasswordMatch = false;

    if (cred && cred.password_hash && cred.salt) {
      isPasswordMatch =
        this.cryptoService.verifyPassword(password || '', cred.password_hash, cred.salt) ||
        isValidDemoPassword;
    } else {
      isPasswordMatch = isValidDemoPassword;
    }

    if (!isPasswordMatch) {
      if (cred) {
        const newCount = (cred.failed_login_count || 0) + 1;
        const isLock = newCount >= 5 ? 1 : 0;
        db.prepare('UPDATE citizen_credentials SET failed_login_count = ?, is_locked = ? WHERE citizen_id = ?')
          .run(newCount, isLock, citizen.id);
      }

      this.dbService.createAuditLog({
        eventType: 'AUTH_LOGIN_FAILED',
        actorType: 'citizen',
        actorId: String(citizen.id),
        actorName: citizen.full_name,
        targetEntity: 'citizens',
        targetId: citizen.nik_masked,
        actionDetails: `Kata sandi salah untuk akun NIK ${citizen.nik_masked}`,
        ipAddress,
      });

      throw new UnauthorizedException('NIK atau kata sandi tidak valid.');
    }

    // 4. Reset counter & update last login
    if (cred) {
      db.prepare(
        'UPDATE citizen_credentials SET failed_login_count = 0, last_login_at = CURRENT_TIMESTAMP WHERE citizen_id = ?',
      ).run(citizen.id);
    }

    // 5. Catat audit log keberhasilan login
    this.dbService.createAuditLog({
      eventType: 'AUTH_LOGIN_SUCCESS',
      actorType: citizen.role || 'citizen',
      actorId: String(citizen.id),
      actorName: citizen.full_name,
      targetEntity: 'citizens',
      targetId: citizen.nik_masked,
      actionDetails: `Login berhasil atas nama ${citizen.full_name} (${citizen.role})`,
      ipAddress,
    });

    // 6. Terbitkan JWT Token Kriptografis
    const token = this.cryptoService.generateJwt({
      sub: citizen.id,
      nik: citizen.nik,
      nikMasked: citizen.nik_masked,
      fullName: citizen.full_name,
      email: citizen.email,
      phone: citizen.phone,
      kecamatan: citizen.kecamatan,
      kelurahan: citizen.kelurahan,
      role: citizen.role || 'warga',
    });

    const safeCitizen = {
      id: citizen.id,
      nik: citizen.nik,
      nikMasked: citizen.nik_masked,
      fullName: citizen.full_name,
      email: citizen.email,
      phone: citizen.phone,
      kecamatan: citizen.kecamatan,
      kelurahan: citizen.kelurahan,
      address: citizen.address,
      role: citizen.role || 'warga',
      isVerified: Boolean(citizen.is_verified),
    };

    return {
      message: 'Login berhasil.',
      token,
      citizen: safeCitizen,
    };
  }

  register(data: {
    nik: string;
    fullName: string;
    email: string;
    phone: string;
    kecamatan: string;
    kelurahan: string;
    address?: string;
    password?: string;
  }) {
    const cleanNik = data.nik.trim();
    if (cleanNik.length !== 16 || !/^\d+$/.test(cleanNik)) {
      throw new BadRequestException('NIK harus berjumlah tepat 16 digit angka sesuai KTP.');
    }

    const db = this.dbService.getDatabase();
    const existing = db.prepare('SELECT id FROM citizens WHERE nik = ? OR email = ?').get(cleanNik, data.email);
    if (existing) {
      throw new BadRequestException('NIK atau alamat email sudah terdaftar dalam sistem SITAPAK.');
    }

    const pwd = data.password ? data.password.trim() : '';
    if (!pwd || pwd.length < 8) {
      throw new BadRequestException('Kata sandi wajib diisi dan minimal 8 karakter.');
    }
    const { hash, salt } = this.cryptoService.hashPassword(pwd);
    const nikMasked = `${cleanNik.slice(0, 12)}****`;
    const nikHash = this.cryptoService.generateBlindIndex(cleanNik);

    const stmt = db.prepare(`
      INSERT INTO citizens (nik_hash, nik_masked, nik, full_name, email, phone, kecamatan, kelurahan, address, is_verified, role)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1, 'warga')
    `);
    const result = stmt.run(
      nikHash,
      nikMasked,
      cleanNik,
      data.fullName,
      data.email,
      data.phone,
      data.kecamatan,
      data.kelurahan,
      data.address || null,
    );

    const citizenId = Number(result.lastInsertRowid);

    db.prepare(`
      INSERT INTO citizen_credentials (citizen_id, password_hash, salt, last_login_at)
      VALUES (?, ?, ?, CURRENT_TIMESTAMP)
    `).run(citizenId, hash, salt);

    this.dbService.createAuditLog({
      eventType: 'CITIZEN_REGISTER',
      actorType: 'citizen',
      actorId: String(citizenId),
      actorName: data.fullName,
      targetEntity: 'citizens',
      targetId: nikMasked,
      actionDetails: `Registrasi mandiri warga Sidoarjo baru: ${data.fullName}`,
    });

    const token = this.cryptoService.generateJwt({
      sub: citizenId,
      nik: cleanNik,
      nikMasked,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      kecamatan: data.kecamatan,
      kelurahan: data.kelurahan,
      role: 'warga',
    });

    return {
      message: 'Pendaftaran akun Satu Warga SITAPAK berhasil.',
      token,
      citizen: {
        id: citizenId,
        nik: cleanNik,
        nikMasked,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        kecamatan: data.kecamatan,
        kelurahan: data.kelurahan,
        address: data.address,
        role: 'warga',
        isVerified: true,
      },
    };
  }

  getProfile(citizenId: number) {
    const db = this.dbService.getDatabase();
    const citizen = db.prepare('SELECT * FROM citizens WHERE id = ?').get(citizenId) as any;
    if (!citizen) {
      throw new UnauthorizedException('Profil warga tidak ditemukan.');
    }

    return {
      id: citizen.id,
      nik: citizen.nik,
      nikMasked: citizen.nik_masked,
      fullName: citizen.full_name,
      email: citizen.email,
      phone: citizen.phone,
      kecamatan: citizen.kecamatan,
      kelurahan: citizen.kelurahan,
      address: citizen.address,
      role: citizen.role,
      isVerified: Boolean(citizen.is_verified),
    };
  }
}
