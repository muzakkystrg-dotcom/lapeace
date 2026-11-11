import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  Res,
  Query,
  NotFoundException,
  ForbiddenException,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { DatabaseService } from './database/database.service.js';
import { CryptoService } from './common/crypto.service.js';
import { CacheService } from './common/cache.service.js';
import { JwtAuthGuard } from './auth/jwt-auth.guard.js';
import { RolesGuard } from './auth/roles.guard.js';
import { Roles } from './auth/roles.decorator.js';

@Controller('api')
export class AppController {
  constructor(
    @Inject(DatabaseService) private readonly db: DatabaseService,
    @Inject(CacheService) private readonly cache: CacheService,
  ) {}

  @Get('health')
  getHealth() {
    return {
      status: 'ok',
      service: 'SITAPAK Sidoarjo Enterprise API Gateway',
      version: '2.4.0',
      databaseEngine: 'SQLite 3 (Enterprise WAL Mode)',
      securityStatus: 'Secured (JWT + RBAC + Anti-IDOR + PDP Masked)',
      performanceOptimization: 'Enabled (In-Memory Cache TTL + Keyset Cursor Pagination)',
      complianceStandards: ['ISO 27001', 'Perpres 95/2018 SPBE', 'UU PDP No. 27/2022'],
      timestamp: new Date().toISOString(),
    };
  }

  // Cache telemetry and stats endpoints
  @Get('cache/stats')
  getCacheStats() {
    return this.cache.getStats();
  }

  // Unified single-window tracking for service requests and reports
  @Get('tracking/:ticket')
  getTracking(@Param('ticket') ticket: string) {
    const record = this.db.getUnifiedTracking(ticket);
    if (!record) {
      throw new NotFoundException(`Nomor berkas atau tiket '${ticket}' tidak ditemukan dalam pangkalan data SITAPAK.`);
    }
    return record;
  }

  // Restricted to operators and admins (UU PDP compliance)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin_pemkab', 'operator_opd')
  @Get('citizens')
  getCitizens(@Query('limit') limit?: string, @Query('cursor') cursor?: string) {
    const l = limit ? parseInt(limit, 10) : 20;
    const c = cursor ? parseInt(cursor, 10) : undefined;
    return this.db.getCitizens(l, c);
  }

  // Individual citizen profile
  @UseGuards(JwtAuthGuard)
  @Get('citizens/:nik')
  getCitizen(@Param('nik') nik: string, @Req() req: any) {
    const user = req.user;
    // Warga hanya boleh mengakses datanya sendiri, kecuali peran admin/operator OPD
    if (user.role !== 'admin_pemkab' && user.role !== 'operator_opd' && user.nik !== nik) {
      throw new ForbiddenException(
        'Akses Ditolak: Anda tidak memiliki wewenang melihat data kependudukan warga lain.',
      );
    }

    const citizen = this.db.getCitizenByNik(nik);
    if (!citizen) {
      throw new NotFoundException(`Warga dengan identitas '${nik}' tidak ditemukan.`);
    }
    return citizen;
  }

  // Public services directory (cached 1 hour)
  @Get('services')
  async getServices(@Res({ passthrough: true }) res?: any) {
    return this.cache.wrap('services:all', 3600, () => this.db.getServices(), res);
  }

  @Get('services/:id')
  async getService(@Param('id') id: string, @Res({ passthrough: true }) res?: any) {
    return this.cache.wrap(
      `services:${id}`,
      3600,
      () => {
        const service = this.db.getServiceById(id);
        if (!service) {
          throw new NotFoundException(`Layanan dengan kode '${id}' tidak ditemukan.`);
        }
        return service;
      },
      res,
    );
  }

  // Healthcare beds availability (cached 2 minutes)
  @Get('faskes')
  async getHealthcareUnits(@Res({ passthrough: true }) res?: any) {
    return this.cache.wrap('faskes:units', 120, () => this.db.getHealthcareUnits(), res);
  }

  @Get('faskes/beds')
  async getHospitalBeds(@Res({ passthrough: true }) res?: any) {
    return this.cache.wrap('faskes:beds', 120, () => this.db.getHospitalBeds(), res);
  }

  @Get('faskes/appointments')
  getFaskesAppointments() {
    return this.db.getFaskesAppointments();
  }

  // Citizen reports endpoints with keyset pagination
  @Get('reports')
  async getReports(
    @Query('limit') limit?: string,
    @Query('cursor') cursor?: string,
    @Res({ passthrough: true }) res?: any,
  ) {
    const l = limit ? parseInt(limit, 10) : 20;
    const c = cursor ? parseInt(cursor, 10) : undefined;
    const cacheKey = `reports:page:${l}:${c || 'initial'}`;
    return this.cache.wrap(cacheKey, 60, () => this.db.getReports(l, c), res);
  }

  @Get('reports/:ticket')
  getReportByTicket(@Param('ticket') ticket: string) {
    const report = this.db.getReportByTicket(ticket);
    if (!report) {
      throw new NotFoundException(`Tiket aduan '${ticket}' tidak ditemukan.`);
    }
    return report;
  }

  @Post('reports')
  async createReport(@Body() body: any) {
    const result = this.db.createReport(body);
    // Invalidate cached report lists upon creation
    this.cache.delPattern(/^reports:/);
    return result;
  }

  // Immutable audit trail logs (admin only)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin_pemkab')
  @Get('audit-logs')
  getAuditLogs() {
    return this.db.getAuditLogs();
  }

  // Budget transparency data (cached 5 minutes)
  @Get('budget')
  async getBudget(@Res({ passthrough: true }) res?: any) {
    return this.cache.wrap(
      'budget:2026',
      300,
      () => ({
        metrics: this.db.getBudgetMetrics(),
        districts: this.db.getDistrictBudgets(),
        projects: this.db.getStrategicProjects(),
      }),
      res,
    );
  }

  // Open data catalog (cached 30 minutes)
  @Get('datasets')
  async getDatasets(@Res({ passthrough: true }) res?: any) {
    return this.cache.wrap('datasets:all', 1800, () => this.db.getOpenDatasets(), res);
  }
}
