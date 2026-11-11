import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller.js';
import { DatabaseService } from './database/database.service.js';
import { CryptoService } from './common/crypto.service.js';
import { CacheService } from './common/cache.service.js';
import { AuthController } from './auth/auth.controller.js';
import { AuthService } from './auth/auth.service.js';
import { JwtAuthGuard } from './auth/jwt-auth.guard.js';
import { RolesGuard } from './auth/roles.guard.js';

describe('AppController & AuthController', () => {
  let appController: AppController;
  let authController: AuthController;

  beforeEach(async () => {
    const mockDbService = {
      getCitizens: () => ({
        data: [{ id: 1, nik_masked: '351508210490****', full_name: 'Budi Santoso' }],
        pagination: { limit: 20, hasMore: false, nextCursor: null, totalCount: 1 },
      }),
      getCitizenByNik: (nik: string) => ({ id: 1, nik_masked: '351508210490****', full_name: 'Budi Santoso' }),
      getServices: () => [],
      getServiceById: (id: string) => ({ id, title: 'Layanan Test' }),
      getReports: () => ({
        data: [],
        pagination: { limit: 20, hasMore: false, nextCursor: null, totalCount: 0 },
      }),
      getReportByTicket: (t: string) => ({ ticket_number: t, title: 'Laporan Test' }),
      createReport: (d: any) => ({ ticketNumber: 'LAPOR-2025-ABC123', ...d }),
      getUnifiedTracking: (code: string) => ({
        type: 'service_request',
        data: {
          trackingNumber: code,
          serviceName: 'Penerbitan KTP Elektronik',
          status: 'Proses OPD',
        },
      }),
      getHealthcareUnits: () => [{ id: 1, name: 'RSUD R.T. Notopuro' }],
      getHospitalBeds: () => [],
      getFaskesAppointments: () => [],
      getAuditLogs: () => [],
      getBudgetMetrics: () => [],
      getDistrictBudgets: () => [],
      getStrategicProjects: () => [],
      getOpenDatasets: () => [],
      getAdminAnalytics: () => ({
        reports: { total: 10, pending: 2, processing: 3, completed: 5 },
        serviceRequests: { total: 5, processing: 2, completed: 3 },
        citizens: { total: 8, verified: 8, locked: 0 },
        healthcare: { totalBeds: 215, occupancyRate: 68 },
      }),
      getAdminReports: () => [
        { id: 1, ticket_number: 'LAPOR-2025-TEST', status: 'Menunggu Verifikasi' },
      ],
      updateReportStatus: (id: number, data: any) => ({
        id,
        status: data.status,
        ticket_number: 'LAPOR-2025-TEST',
      }),
      getAdminServiceRequests: () => [
        { id: 1, tracking_number: 'REG-SDA-TEST', status: 'Proses OPD' },
      ],
      updateServiceRequestStatus: (id: number, data: any) => ({
        id,
        status: data.status,
        tracking_number: 'REG-SDA-TEST',
      }),
      verifyCitizen: (id: number, isVerified: boolean) => ({ success: true, isVerified, id }),
      unlockCitizenAccount: (id: number) => ({ success: true, message: 'Unlocked', id }),
      updateCitizenRole: (id: number, role: string) => ({ success: true, role, id }),
      updateHospitalBed: (id: number, data: any) => ({ id, ...data }),
    };

    const mockAuthService = {
      login: (nik: string, pwd?: string) => ({
        message: 'Login berhasil.',
        token: 'mock.jwt.token',
        citizen: { id: 1, nik, fullName: 'Budi Santoso', role: 'warga' },
      }),
      register: (data: any) => ({
        message: 'Pendaftaran berhasil.',
        token: 'mock.jwt.token',
        citizen: { id: 2, ...data, role: 'warga' },
      }),
      getProfile: (id: number) => ({ id, fullName: 'Budi Santoso', role: 'warga' }),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController, AuthController],
      providers: [
        CryptoService,
        CacheService,
        JwtAuthGuard,
        RolesGuard,
        {
          provide: DatabaseService,
          useValue: mockDbService,
        },
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    authController = app.get<AuthController>(AuthController);
  });

  describe('health', () => {
    it('should return health status with security enabled', () => {
      const res = appController.getHealth();
      expect(res.status).toBe('ok');
      expect(res.databaseEngine).toBe('SQLite 3 (Enterprise WAL Mode)');
      expect(res.securityStatus).toContain('Secured');
    });
  });

  describe('tracking', () => {
    it('should return unified tracking result', () => {
      const res = appController.getTracking('REG-SDA-2025-08912');
      expect(res.type).toBe('service_request');
      expect(res.data.trackingNumber).toBe('REG-SDA-2025-08912');
    });
  });

  describe('citizens (Restricted & Masked)', () => {
    it('should return masked citizen data for authorized admin/operator', () => {
      const res: any = appController.getCitizens();
      const citizen = res.data ? res.data[0] : res[0];
      expect(citizen.nik_masked).toBe('351508210490****');
    });
  });

  describe('auth', () => {
    it('should perform server-side login and return token', () => {
      const mockReq: any = { headers: {}, socket: { remoteAddress: '127.0.0.1' } };
      const mockRes: any = { cookie: () => {} };
      const res = authController.login({ nik: '3515082104900002', password: 'WargaSidoarjo2026!' }, mockReq, mockRes);
      expect(res.token).toBe('mock.jwt.token');
      expect(res.citizen.fullName).toBe('Budi Santoso');
    });
  });

  describe('admin portal endpoints', () => {
    it('should return executive analytics summary', () => {
      const res = appController.getAdminAnalytics();
      expect(res.reports.total).toBe(10);
      expect(res.healthcare.totalBeds).toBe(215);
    });

    it('should return admin reports and update report status', () => {
      const list = appController.getAdminReports();
      expect(list.length).toBe(1);

      const updated = appController.updateReportStatus('1', { status: 'Penanganan Lapangan' }, { user: { fullName: 'Admin Test' } });
      expect(updated.status).toBe('Penanganan Lapangan');
    });

    it('should allow admin to verify citizen and unlock account', () => {
      const verifyRes = appController.verifyCitizen('1', { isVerified: true }, { user: { fullName: 'Admin Test' } });
      expect(verifyRes.isVerified).toBe(true);

      const unlockRes = appController.unlockCitizenAccount('1', { user: { fullName: 'Admin Test' } });
      expect(unlockRes.success).toBe(true);
    });
  });
});
