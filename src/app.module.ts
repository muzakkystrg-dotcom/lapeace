import { Module } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { DatabaseModule } from './database/database.module.js';
import { AuthModule } from './auth/auth.module.js';
import { CryptoService } from './common/crypto.service.js';
import { CacheService } from './common/cache.service.js';
import { JwtAuthGuard } from './auth/jwt-auth.guard.js';
import { RolesGuard } from './auth/roles.guard.js';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, CryptoService, CacheService, JwtAuthGuard, RolesGuard, Reflector],
  exports: [CacheService, JwtAuthGuard, RolesGuard, Reflector],
})
export class AppModule {}
