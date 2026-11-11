import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { DatabaseModule } from './database/database.module.js';
import { AuthModule } from './auth/auth.module.js';
import { CryptoService } from './common/crypto.service.js';
import { CacheService } from './common/cache.service.js';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, CryptoService, CacheService],
  exports: [CacheService],
})
export class AppModule {}
