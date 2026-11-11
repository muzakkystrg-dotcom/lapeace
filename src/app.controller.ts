import {
  Controller,
  Get,
  Post,
  Patch,
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
    @Inject(CryptoService) private readonly cryptoService: CryptoService,
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
  async createReport(@Body() body: any, @Req() req: any) {
    let citizenId = body.citizenId ? Number(body.citizenId) : undefined;
    if (!citizenId && req?.headers?.authorization?.startsWith('Bearer ')) {
      const token = req.headers.authorization.substring(7);
      const payload = this.cryptoService.verifyJwt(token);
      if (payload && payload.sub) {
        citizenId = Number(payload.sub);
      }
    }
    const result = this.db.createReport({ ...body, citizenId });
    // Invalidate cached report lists upon creation
    this.cache.delPattern(/^reports:/);
    return result;
  }

  // Immutable audit trail logs (admin & operator)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin_pemkab', 'operator_opd')
  @Get('audit-logs')
  getAuditLogs(@Query('limit') limit?: string) {
    const l = limit ? parseInt(limit, 10) : 50;
    return this.db.getAuditLogs(l);
  }

  // ==========================================
  // ADMIN PORTAL API ENDPOINTS
  // ==========================================

  // 1. Executive Analytics & KPI Summary
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin_pemkab', 'operator_opd')
  @Get('admin/analytics')
  getAdminAnalytics() {
    return this.db.getAdminAnalytics();
  }

  // 2. Citizen Reports Management
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin_pemkab', 'operator_opd')
  @Get('admin/reports')
  getAdminReports(
    @Query('status') status?: string,
    @Query('category') category?: string,
    @Query('search') search?: string,
  ) {
    return this.db.getAdminReports({ status, category, search });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin_pemkab', 'operator_opd')
  @Patch('admin/reports/:id/status')
  updateReportStatus(
    @Param('id') id: string,
    @Body() body: any,
    @Req() req: any,
  ) {
    const user = req.user;
    const result = this.db.updateReportStatus(Number(id), {
      ...body,
      officerName: user?.fullName || 'Petugas Diskominfo',
      responderOpd: user?.role === 'admin_pemkab' ? 'Pemerintah Kabupaten Sidoarjo' : 'OPD Terkait Sidoarjo',
    });
    if (!result) {
      throw new NotFoundException(`Laporan ID ${id} tidak ditemukan.`);
    }
    this.cache.delPattern(/^reports:/);
    return result;
  }

  // 3. Service Requests Management
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin_pemkab', 'operator_opd')
  @Get('admin/service-requests')
  getAdminServiceRequests(
    @Query('status') status?: string,
    @Query('serviceId') serviceId?: string,
    @Query('search') search?: string,
  ) {
    return this.db.getAdminServiceRequests({ status, serviceId, search });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin_pemkab', 'operator_opd')
  @Patch('admin/service-requests/:id/status')
  updateServiceRequestStatus(
    @Param('id') id: string,
    @Body() body: any,
    @Req() req: any,
  ) {
    const user = req.user;
    const result = this.db.updateServiceRequestStatus(Number(id), {
      ...body,
      officerName: user?.fullName || 'Petugas Pelayanan',
    });
    if (!result) {
      throw new NotFoundException(`Permohonan ID ${id} tidak ditemukan.`);
    }
    this.cache.delPattern(/^services:/);
    return result;
  }

  // 4. Citizens & Single Account Management
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin_pemkab')
  @Patch('admin/citizens/:id/verify')
  verifyCitizen(
    @Param('id') id: string,
    @Body() body: { isVerified: boolean },
    @Req() req: any,
  ) {
    const user = req.user;
    const result = this.db.verifyCitizen(Number(id), body.isVerified, user?.fullName);
    if (!result) {
      throw new NotFoundException(`Warga ID ${id} tidak ditemukan.`);
    }
    return result;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin_pemkab')
  @Patch('admin/citizens/:id/unlock')
  unlockCitizenAccount(
    @Param('id') id: string,
    @Req() req: any,
  ) {
    const user = req.user;
    const result = this.db.unlockCitizenAccount(Number(id), user?.fullName);
    if (!result) {
      throw new NotFoundException(`Warga ID ${id} tidak ditemukan.`);
    }
    return result;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin_pemkab')
  @Patch('admin/citizens/:id/role')
  updateCitizenRole(
    @Param('id') id: string,
    @Body() body: { role: string },
    @Req() req: any,
  ) {
    const user = req.user;
    const result = this.db.updateCitizenRole(Number(id), body.role, user?.fullName);
    if (!result) {
      throw new NotFoundException(`Warga ID ${id} tidak ditemukan.`);
    }
    return result;
  }

  // 5. Healthcare & Bed Inventory Management
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin_pemkab', 'operator_opd')
  @Patch('admin/faskes/beds/:id')
  updateHospitalBed(
    @Param('id') id: string,
    @Body() body: { availableBeds: number; occupiedBeds: number },
    @Req() req: any,
  ) {
    const user = req.user;
    const result = this.db.updateHospitalBed(Number(id), body, user?.fullName);
    if (!result) {
      throw new NotFoundException(`Data bed ID ${id} tidak ditemukan.`);
    }
    this.cache.delPattern(/^faskes:/);
    return result;
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
