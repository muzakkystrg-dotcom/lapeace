import * as path from 'node:path';
import * as crypto from 'node:crypto';

// Header bytes (Magic Number) dari format berkas yang diizinkan
export const ALLOWED_MAGIC_BYTES: Record<string, string> = {
  ffd8ffe0: 'image/jpeg',
  ffd8ffe1: 'image/jpeg',
  ffd8ffe2: 'image/jpeg',
  '89504e47': 'image/png',
  '52494646': 'image/webp', // RIFF header
  '25504446': 'application/pdf', // %PDF-
};

export interface FileValidationResult {
  isValid: boolean;
  sanitizedFileName: string;
  mimeType: string;
  errorMessage?: string;
}

export function validateAndSanitizeFile(
  originalFileName: string,
  fileBuffer: Buffer,
  allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
): FileValidationResult {
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.pdf'];
  const ext = path.extname(originalFileName).toLowerCase();

  // Validasi ekstensi yang diizinkan
  if (!allowedExtensions.includes(ext)) {
    return {
      isValid: false,
      sanitizedFileName: '',
      mimeType: '',
      errorMessage: 'Format berkas tidak diizinkan. Hanya menerima berkas JPG, PNG, WEBP, dan PDF.',
    };
  }

  // Cegah multiple extensions (contoh: malware.php.jpg)
  const dotCount = (originalFileName.match(/\./g) || []).length;
  if (dotCount > 1) {
    return {
      isValid: false,
      sanitizedFileName: '',
      mimeType: '',
      errorMessage: 'Nama berkas berisiko tinggi: terdeteksi ekstensi ganda.',
    };
  }

  // Validasi magic bytes untuk mendeteksi isi berkas sesungguhnya
  if (fileBuffer && fileBuffer.length >= 4) {
    const magicHex = fileBuffer.subarray(0, 4).toString('hex').toLowerCase();
    const detectedMime = ALLOWED_MAGIC_BYTES[magicHex];
    if (detectedMime && !allowedMimes.includes(detectedMime)) {
      return {
        isValid: false,
        sanitizedFileName: '',
        mimeType: detectedMime,
        errorMessage: 'Isi berkas tidak cocok dengan ekstensi berkas yang dilaporkan.',
      };
    }
  }

  // Sanitasi nama berkas dengan UUIDv4 unik (anti-path traversal & anti-overwrite)
  const secureFileName = `${crypto.randomUUID()}${ext}`;

  return {
    isValid: true,
    sanitizedFileName: secureFileName,
    mimeType: ext === '.pdf' ? 'application/pdf' : 'image/' + ext.replace('.', ''),
  };
}
