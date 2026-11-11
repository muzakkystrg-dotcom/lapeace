import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CryptoService } from '../common/crypto.service.js';

export const IS_PUBLIC_KEY = 'isPublic';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @Inject(CryptoService) private readonly cryptoService: CryptoService,
    @Inject(Reflector) private readonly reflector?: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector
      ? this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
          context.getHandler(),
          context.getClass(),
        ])
      : false;

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    let token: string | null = null;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    } else if (request.cookies && request.cookies.sitapak_token) {
      token = request.cookies.sitapak_token;
    }

    if (!token) {
      if (isPublic) return true;
      throw new UnauthorizedException('Akses Ditolak: Token otentikasi tidak ditemukan.');
    }

    const payload = this.cryptoService.verifyJwt(token);
    if (!payload) {
      if (isPublic) return true;
      throw new UnauthorizedException('Akses Ditolak: Token otentikasi tidak valid atau telah kedaluwarsa.');
    }

    // Attach user to request
    request.user = payload;
    return true;
  }
}
