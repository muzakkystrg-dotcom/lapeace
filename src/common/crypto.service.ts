import { Injectable } from '@nestjs/common';
import * as crypto from 'node:crypto';

@Injectable()
export class CryptoService {
  // Master keys from environment variable or secure defaults
  private readonly jwtSecret: string =
    process.env.SITAPAK_JWT_SECRET || 'sitapak_sidoarjo_super_secret_jwt_key_2026_delta_csirt';
  private readonly encKey: Buffer;
  private readonly blindIndexKey: Buffer;

  constructor() {
    const rawKey =
      process.env.SITAPAK_PII_ENCRYPTION_KEY || 'sidoarjo_sitapak_aes_256_master_key_32bytes!!';
    // Pastikan tepat 32 bytes (256-bit) untuk AES-256-GCM
    this.encKey = crypto.createHash('sha256').update(rawKey).digest();
    this.blindIndexKey = crypto.createHash('sha256').update(rawKey + '_blind_index_salt').digest();
  }

  // Password hashing with PBKDF2 SHA-512
  hashPassword(password: string, existingSalt?: string): { hash: string; salt: string } {
    const salt = existingSalt || crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha512').toString('hex');
    return { hash, salt };
  }

  verifyPassword(password: string, expectedHash: string, salt: string): boolean {
    const { hash } = this.hashPassword(password, salt);
    // Timing-safe comparison to prevent timing attacks
    const bufferA = Buffer.from(hash, 'hex');
    const bufferB = Buffer.from(expectedHash, 'hex');
    if (bufferA.length !== bufferB.length) return false;
    return crypto.timingSafeEqual(bufferA, bufferB);
  }

  // AES-256-GCM encryption at rest (PDP compliance)
  encrypt(plaintext: string): string {
    if (!plaintext) return '';
    const iv = crypto.randomBytes(12); // Standard 96-bit IV for GCM
    const cipher = crypto.createCipheriv('aes-256-gcm', this.encKey, iv);

    let encrypted = cipher.update(plaintext, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const authTag = cipher.getAuthTag().toString('hex');

    return `${iv.toString('hex')}:${authTag}:${encrypted}`;
  }

  decrypt(cipherPayload: string): string {
    if (!cipherPayload) return '';
    const parts = cipherPayload.split(':');
    if (parts.length !== 3) {
      return cipherPayload; // Fallback jika teks belum terenkripsi
    }

    const [ivHex, authTagHex, ciphertextHex] = parts;
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');

    const decipher = crypto.createDecipheriv('aes-256-gcm', this.encKey, iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(ciphertextHex, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  }

  // Blind indexing with HMAC-SHA256 searchable ciphertext
  generateBlindIndex(value: string): string {
    return crypto.createHmac('sha256', this.blindIndexKey).update(value.trim()).digest('hex');
  }

  // JWT generation and verification (HMAC-SHA256)
  generateJwt(payload: Record<string, any>, expiresInSeconds = 86400): string {
    const header = { alg: 'HS256', typ: 'JWT' };
    const now = Math.floor(Date.now() / 1000);
    const fullPayload = {
      ...payload,
      iat: now,
      exp: now + expiresInSeconds,
    };

    const encode = (obj: any) =>
      Buffer.from(JSON.stringify(obj))
        .toString('base64url');

    const headerB64 = encode(header);
    const payloadB64 = encode(fullPayload);
    const unsignedToken = `${headerB64}.${payloadB64}`;

    const signature = crypto
      .createHmac('sha256', this.jwtSecret)
      .update(unsignedToken)
      .digest('base64url');

    return `${unsignedToken}.${signature}`;
  }

  verifyJwt(token: string): Record<string, any> | null {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;

      const [headerB64, payloadB64, signature] = parts;
      const unsignedToken = `${headerB64}.${payloadB64}`;

      const expectedSig = crypto
        .createHmac('sha256', this.jwtSecret)
        .update(unsignedToken)
        .digest('base64url');

      if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig))) {
        return null;
      }

      const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf8'));
      const now = Math.floor(Date.now() / 1000);
      if (payload.exp && payload.exp < now) {
        return null; // Expired
      }

      return payload;
    } catch {
      return null;
    }
  }
}
