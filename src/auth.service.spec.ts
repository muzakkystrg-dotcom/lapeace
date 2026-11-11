import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth/auth.service.js';
import { CryptoService } from './common/crypto.service.js';

describe('AuthService & CryptoService Security Hardening', () => {
  let cryptoService: CryptoService;

  beforeEach(() => {
    delete process.env.SITAPAK_JWT_SECRET;
    delete process.env.JWT_SECRET;
    delete process.env.SITAPAK_PII_ENCRYPTION_KEY;
    delete process.env.CIPHER_KEY_HEX;
    process.env.NODE_ENV = 'test';
    cryptoService = new CryptoService();
  });

  afterEach(() => {
    delete process.env.NODE_ENV;
    delete process.env.SITAPAK_JWT_SECRET;
    delete process.env.JWT_SECRET;
    delete process.env.SITAPAK_PII_ENCRYPTION_KEY;
    delete process.env.CIPHER_KEY_HEX;
  });

  describe('CryptoService', () => {
    it('should support JWT_SECRET as fallback for SITAPAK_JWT_SECRET', () => {
      process.env.JWT_SECRET = 'my_custom_jwt_secret_token_1234567890';
      const cs = new CryptoService();
      const token = cs.generateJwt({ sub: 1, role: 'warga' });
      const payload = cs.verifyJwt(token);
      expect(payload?.sub).toBe(1);
      expect(payload?.role).toBe('warga');
    });

    it('should support CIPHER_KEY_HEX as fallback for SITAPAK_PII_ENCRYPTION_KEY', () => {
      process.env.CIPHER_KEY_HEX = 'my_custom_aes_cipher_key_1234567890';
      const cs = new CryptoService();
      const plaintext = 'Data PII Sensitif Sidoarjo';
      const encrypted = cs.encrypt(plaintext);
      const decrypted = cs.decrypt(encrypted);
      expect(decrypted).toBe(plaintext);
    });

    it('should throw fatal error in production if JWT secret matches leaked default string', () => {
      process.env.NODE_ENV = 'production';
      process.env.SITAPAK_JWT_SECRET = 'sitapak_sidoarjo_super_secret_jwt_key_2026_delta_csirt';
      expect(() => new CryptoService()).toThrow(
        'FATAL: Leaked default SITAPAK_JWT_SECRET cannot be used in production.',
      );
    });

    it('should throw fatal error in production if JWT secret is missing', () => {
      process.env.NODE_ENV = 'production';
      delete process.env.SITAPAK_JWT_SECRET;
      delete process.env.JWT_SECRET;
      expect(() => new CryptoService()).toThrow(
        'FATAL: Leaked default SITAPAK_JWT_SECRET cannot be used in production.',
      );
    });

    it('should allow production startup if strong custom JWT secret is provided', () => {
      process.env.NODE_ENV = 'production';
      process.env.SITAPAK_JWT_SECRET = 'f9a2b7c4d8e1f0a3b5c7d9e2f4a6b8c0d2e4f6a8b0c2d4e6f8a0b2c4d6e8f0a2';
      process.env.SITAPAK_PII_ENCRYPTION_KEY = 'strong_production_key_32bytes_aes';
      expect(() => new CryptoService()).not.toThrow();
    });
  });

  describe('AuthService - No Demo Password Backdoor & Strict PBKDF2', () => {
    it('should authenticate successfully with correct PBKDF2 password', () => {
      const { hash, salt } = cryptoService.hashPassword('WargaSidoarjo2026!');
      const mockDb = {
        prepare: (query: string) => {
          if (query.includes('FROM citizens WHERE')) {
            return {
              get: () => ({
                id: 1,
                nik: '3515082104900002',
                nik_masked: '351508210490****',
                full_name: 'Budi Santoso',
                role: 'warga',
                is_verified: 1,
              }),
            };
          }
          if (query.includes('FROM citizen_credentials WHERE')) {
            return {
              get: () => ({
                id: 1,
                citizen_id: 1,
                password_hash: hash,
                salt,
                failed_login_count: 0,
                is_locked: 0,
              }),
            };
          }
          return { run: () => ({}) };
        },
      };

      const mockDbService = {
        getDatabase: () => mockDb,
        createAuditLog: () => {},
      };

      const authService = new AuthService(mockDbService as any, cryptoService);
      const res = authService.login('3515082104900002', 'WargaSidoarjo2026!');
      expect(res.message).toBe('Login berhasil.');
      expect(res.token).toBeDefined();
      expect(res.citizen.nik).toBe('3515082104900002');
    });

    it('should reject login if password does not match hash (even if demo password string is used on different account)', () => {
      // Akun ini memiliki password 'BerbedaSidoarjo123!'
      const { hash, salt } = cryptoService.hashPassword('BerbedaSidoarjo123!');
      const mockDb = {
        prepare: (query: string) => {
          if (query.includes('FROM citizens WHERE')) {
            return {
              get: () => ({
                id: 1,
                nik: '3515082104900002',
                nik_masked: '351508210490****',
                full_name: 'Budi Santoso',
                role: 'warga',
              }),
            };
          }
          if (query.includes('FROM citizen_credentials WHERE')) {
            return {
              get: () => ({
                id: 1,
                citizen_id: 1,
                password_hash: hash,
                salt,
                failed_login_count: 0,
                is_locked: 0,
              }),
            };
          }
          return { run: () => ({}) };
        },
      };

      const mockDbService = {
        getDatabase: () => mockDb,
        createAuditLog: () => {},
      };

      const authService = new AuthService(mockDbService as any, cryptoService);

      // Mencoba backdoor demo password 'WargaSidoarjo2026!' pada akun yang hashnya bukan itu
      expect(() => authService.login('3515082104900002', 'WargaSidoarjo2026!')).toThrow(
        UnauthorizedException,
      );
      expect(() => authService.login('3515082104900002', 'AdminSidoarjo2026!')).toThrow(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException("Kredensial akun belum diatur.") if credential record is missing', () => {
      const mockDb = {
        prepare: (query: string) => {
          if (query.includes('FROM citizens WHERE')) {
            return {
              get: () => ({
                id: 10,
                nik: '3515999999999999',
                nik_masked: '351599999999****',
                full_name: 'Warga Baru',
              }),
            };
          }
          if (query.includes('FROM citizen_credentials WHERE')) {
            return { get: () => null };
          }
          return { run: () => ({}) };
        },
      };

      const mockDbService = {
        getDatabase: () => mockDb,
        createAuditLog: () => {},
      };

      const authService = new AuthService(mockDbService as any, cryptoService);
      expect(() => authService.login('3515999999999999', 'WargaSidoarjo2026!')).toThrow(
        new UnauthorizedException('Kredensial akun belum diatur.'),
      );
    });

    it('should throw UnauthorizedException("Kredensial akun belum diatur.") if password_hash or salt is empty', () => {
      const mockDb = {
        prepare: (query: string) => {
          if (query.includes('FROM citizens WHERE')) {
            return {
              get: () => ({
                id: 10,
                nik: '3515999999999999',
                nik_masked: '351599999999****',
                full_name: 'Warga Baru',
              }),
            };
          }
          if (query.includes('FROM citizen_credentials WHERE')) {
            return {
              get: () => ({
                id: 10,
                citizen_id: 10,
                password_hash: '',
                salt: '',
              }),
            };
          }
          return { run: () => ({}) };
        },
      };

      const mockDbService = {
        getDatabase: () => mockDb,
        createAuditLog: () => {},
      };

      const authService = new AuthService(mockDbService as any, cryptoService);
      expect(() => authService.login('3515999999999999', 'WargaSidoarjo2026!')).toThrow(
        new UnauthorizedException('Kredensial akun belum diatur.'),
      );
    });
  });
});
