import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { GlobalSecurityExceptionFilter } from './common/http-exception.filter.js';
import { SecurityValidationPipe } from './common/validation.pipe.js';
import type { Request, Response, NextFunction } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Hardened security headers middleware (OWASP standard)
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(self)');
    res.setHeader(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload',
    );
    res.setHeader(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; connect-src 'self' https:;",
    );
    // Hapus header fingerprint teknologi
    res.removeHeader('X-Powered-By');
    next();
  });

  // Strict CORS configuration
  app.enableCors({
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
      // Izinkan akses dari domain lokal dev atau domain resmi pemkab & VPS demo
      if (
        !origin ||
        /^(http:\/\/localhost:\d+|https?:\/\/([a-z0-9-]+\.)*(sidoarjokab\.go\.id|founduslab\.my\.id))$/.test(origin)
      ) {
        callback(null, true);
      } else {
        callback(new Error('Akses diblokir oleh kebijakan keamanan CORS SITAPAK.'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  });

  // Global security validation & input sanitization pipe (OWASP A03 / Anti-XSS)
  app.useGlobalPipes(new SecurityValidationPipe());

  // Global security sanitizer exception filter
  app.useGlobalFilters(new GlobalSecurityExceptionFilter());

  const port = process.env.PORT ?? 3000;
  await app.listen(port, '127.0.0.1');
  console.log(`[SECURITY HARDENED] SITAPAK Gateway aktif pada port ${port}`);
}

await bootstrap();
