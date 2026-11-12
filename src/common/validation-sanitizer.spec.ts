import { describe, it, expect } from 'vitest';
import {
  escapeHtml,
  stripDangerousHtml,
  escapeSqlLike,
  sanitizePayload,
} from './sanitizer.js';
import { SecurityValidationPipe } from './validation.pipe.js';
import {
  CreateReportDto,
  LoginDto,
  RegisterCitizenDto,
  UpdateReportStatusDto,
  UpdateCitizenRoleDto,
  VerifyCitizenDto,
} from './dto.js';
import { BadRequestException } from '@nestjs/common';

describe('Sanitizer & Output Encoding Utility', () => {
  describe('stripDangerousHtml', () => {
    it('should strip script tags and their content', () => {
      const malicious = '<script>alert("XSS")</script>Halo Warga Sidoarjo';
      expect(stripDangerousHtml(malicious)).toBe('Halo Warga Sidoarjo');
    });

    it('should strip iframe and event handlers', () => {
      const malicious = '<iframe src="evil.com"></iframe><img src=x onerror=alert(1)>Jalan Berlubang';
      expect(stripDangerousHtml(malicious)).toBe('Jalan Berlubang');
    });

    it('should neutralize javascript pseudo protocols', () => {
      const malicious = 'javascript:evil()';
      expect(stripDangerousHtml(malicious)).toContain('javascript_blocked:');
    });

    it('should strip null bytes', () => {
      const malicious = 'admin\0secret';
      expect(stripDangerousHtml(malicious)).toBe('adminsecret');
    });
  });

  describe('escapeHtml', () => {
    it('should escape HTML special characters for safe output reflection', () => {
      const raw = '<div class="alert">& "quote"</div>';
      const escaped = escapeHtml(raw);
      expect(escaped).toBe('&lt;div class=&quot;alert&quot;&gt;&amp; &quot;quote&quot;&lt;/div&gt;');
    });
  });

  describe('escapeSqlLike', () => {
    it('should escape %, _, and / for SQLite LIKE queries', () => {
      expect(escapeSqlLike('100%')).toBe('100/%');
      expect(escapeSqlLike('user_name')).toBe('user/_name');
      expect(escapeSqlLike('path/to')).toBe('path//to');
    });
  });

  describe('sanitizePayload', () => {
    it('should recursively sanitize string fields in nested objects', () => {
      const payload = {
        title: '<script>evil()</script>Jalan Rusak',
        details: {
          address: 'Jl. Pahlawan <b onmouseover=evil()>No. 10</b>',
        },
      };
      const clean = sanitizePayload(payload);
      expect(clean.title).toBe('Jalan Rusak');
      expect(clean.details.address).toBe('Jl. Pahlawan No. 10');
    });

    it('should block prototype pollution attempts', () => {
      const maliciousPayload = JSON.parse('{"__proto__": {"polluted": true}, "name": "Budi"}');
      const clean = sanitizePayload(maliciousPayload);
      expect((clean as any).polluted).toBeUndefined();
      expect(({} as any).polluted).toBeUndefined();
    });
  });
});

describe('SecurityValidationPipe (Server-Side DTO Validation)', () => {
  const pipe = new SecurityValidationPipe();

  describe('CreateReportDto validation', () => {
    it('should allow valid report payload and sanitize HTML tags', () => {
      const body = {
        title: '<b>Jalan Berlubang di Sepande</b>',
        category: 'infrastruktur',
        description: 'Ada lubang aspal yang cukup dalam di dekat jembatan tol.',
        kecamatan: 'Candi',
        address: 'Jl. Raya Sepande No. 45',
        reporterName: 'Budi Santoso',
      };
      const res = pipe.transform(body, { type: 'body', metatype: CreateReportDto });
      expect(res.title).toBe('Jalan Berlubang di Sepande');
      expect(res.category).toBe('infrastruktur');
    });

    it('should reject reports with title shorter than 5 chars', () => {
      const body = {
        title: 'Hi',
        category: 'infrastruktur',
        description: 'Ada lubang aspal yang cukup dalam di dekat jembatan tol.',
        kecamatan: 'Candi',
        address: 'Jl. Raya Sepande No. 45',
      };
      expect(() => pipe.transform(body, { type: 'body', metatype: CreateReportDto })).toThrow(
        BadRequestException,
      );
    });

    it('should reject reports with invalid category', () => {
      const body = {
        title: 'Jalan Berlubang di Sepande',
        category: 'illegal_category_sql_inject',
        description: 'Ada lubang aspal yang cukup dalam di dekat jembatan tol.',
        kecamatan: 'Candi',
        address: 'Jl. Raya Sepande No. 45',
      };
      expect(() => pipe.transform(body, { type: 'body', metatype: CreateReportDto })).toThrow(
        BadRequestException,
      );
    });
  });

  describe('LoginDto validation', () => {
    it('should accept valid 16-digit numeric NIK', () => {
      const body = { nik: '3515082104900002', password: 'ValidPassword123' };
      const res = pipe.transform(body, { type: 'body', metatype: LoginDto });
      expect(res.nik).toBe('3515082104900002');
    });

    it('should reject NIK with invalid length or non-digits', () => {
      expect(() =>
        pipe.transform({ nik: '12345', password: 'pass' }, { type: 'body', metatype: LoginDto }),
      ).toThrow(BadRequestException);
      expect(() =>
        pipe.transform(
          { nik: '351508210490000A', password: 'pass' },
          { type: 'body', metatype: LoginDto },
        ),
      ).toThrow(BadRequestException);
    });
  });

  describe('RegisterCitizenDto validation', () => {
    it('should reject invalid email format', () => {
      const body = {
        nik: '3515082104900002',
        fullName: 'Budi Santoso',
        email: 'invalid-email-address',
        password: 'ValidPassword123!',
        phone: '081234567890',
        kecamatan: 'Sidoarjo (Kota)',
        kelurahan: 'Sidokumpul',
        address: 'Jl. Pahlawan',
      };
      expect(() => pipe.transform(body, { type: 'body', metatype: RegisterCitizenDto })).toThrow(
        BadRequestException,
      );
    });

    it('should reject short password (< 8 chars)', () => {
      const body = {
        nik: '3515082104900002',
        fullName: 'Budi Santoso',
        email: 'budi@warga.sidoarjokab.go.id',
        password: '123',
        phone: '081234567890',
        kecamatan: 'Sidoarjo (Kota)',
        kelurahan: 'Sidokumpul',
        address: 'Jl. Pahlawan',
      };
      expect(() => pipe.transform(body, { type: 'body', metatype: RegisterCitizenDto })).toThrow(
        BadRequestException,
      );
    });
  });

  describe('Admin DTO validation', () => {
    it('should reject invalid report status', () => {
      const body = { status: 'DELETED_HACKED' };
      expect(() =>
        pipe.transform(body, { type: 'body', metatype: UpdateReportStatusDto }),
      ).toThrow(BadRequestException);
    });

    it('should reject invalid citizen role elevation value', () => {
      const body = { role: 'super_root_admin' };
      expect(() =>
        pipe.transform(body, { type: 'body', metatype: UpdateCitizenRoleDto }),
      ).toThrow(BadRequestException);
    });

    it('should accept valid citizen role update', () => {
      const body = { role: 'operator_opd' };
      const res = pipe.transform(body, { type: 'body', metatype: UpdateCitizenRoleDto });
      expect(res.role).toBe('operator_opd');
    });

    it('should reject non-boolean verifyCitizen status', () => {
      const body = { isVerified: 'yes' };
      expect(() =>
        pipe.transform(body, { type: 'body', metatype: VerifyCitizenDto }),
      ).toThrow(BadRequestException);
    });
  });
});
