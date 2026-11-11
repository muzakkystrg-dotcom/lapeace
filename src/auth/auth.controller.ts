import {
  Controller,
  Post,
  Get,
  Body,
  Req,
  Res,
  UseGuards,
  Inject,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { AuthService } from './auth.service.js';
import { JwtAuthGuard } from './jwt-auth.guard.js';

@Controller('api/auth')
export class AuthController {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() body: any, @Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '127.0.0.1';
    const result = this.authService.login(body.nik || '', body.password || '', ip);

    // Kirim token via Set-Cookie HttpOnly & SameSite Strict (Keamanan tingkat enterprise)
    res.cookie('sitapak_token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400 * 1000, // 24 Jam
      path: '/',
    });

    return result;
  }

  @Post('register')
  register(@Body() body: any, @Res({ passthrough: true }) res: Response) {
    const result = this.authService.register(body);

    res.cookie('sitapak_token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400 * 1000,
      path: '/',
    });

    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Req() req: any) {
    const userId = req.user.sub;
    return {
      status: 'authenticated',
      citizen: this.authService.getProfile(userId),
    };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('sitapak_token', { path: '/' });
    return { message: 'Sesi berhasil diakhiri (Logout).' };
  }
}
