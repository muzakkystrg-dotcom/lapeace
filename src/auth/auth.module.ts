import { Module } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { CryptoService } from '../common/crypto.service.js';
import { JwtAuthGuard } from './jwt-auth.guard.js';
import { RolesGuard } from './roles.guard.js';
import { DatabaseModule } from '../database/database.module.js';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthController],
  providers: [AuthService, CryptoService, JwtAuthGuard, RolesGuard, Reflector],
  exports: [AuthService, CryptoService, JwtAuthGuard, RolesGuard, Reflector],
})
export class AuthModule {}
