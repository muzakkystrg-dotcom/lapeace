import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  FileText,
  Layers,
  Users,
  Hospital,
  ShieldCheck,
  LogOut,
  ExternalLink,
  ChevronRight,
  Menu,
  X,
  Bell,
  Clock,
  Landmark,
  Shield,
  Activity,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { CitizenAccount } from '../../types/portal';
import { AdminOverview } from './AdminOverview';
import { AdminReports } from './AdminReports';
import { AdminServiceRequests } from './AdminServiceRequests';
import { AdminCitizens } from './AdminCitizens';
import { AdminFaskes } from './AdminFaskes';
import { AdminAuditLogs } from './AdminAuditLogs';

interface AdminPortalProps {
  currentUser: CitizenAccount | null;
  onLogout: () => void;
  onNavigateHome: () => void;
  onOpenLoginModal?: () => void;
  onAdminLoginSuccess?: (account: CitizenAccount) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  currentUser,
  onLogout,
  onNavigateHome,
  onOpenLoginModal,
  onAdminLoginSuccess,
}) => {
  // Sync tab with hash e.g. #admin/laporan or default to overview
  const [activeTab, setActiveTab] = useState<string>(() => {
    const hash = window.location.hash || '';
    if (hash.startsWith('#admin/')) {
      const sub = hash.replace('#admin/', '');
      return sub || 'overview';
    }
    return 'overview';
  });

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('id-ID'));
  const [isDemoLoggingIn, setIsDemoLoggingIn] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('id-ID'));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash || '';
      if (hash.startsWith('#admin/')) {
        const sub = hash.replace('#admin/', '');
        setActiveTab(sub || 'overview');
      } else if (hash === '#admin') {
        setActiveTab('overview');
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    window.location.hash = `#admin/${tabId}`;
    setMobileSidebarOpen(false);
  };

  const isAuthorized =
    currentUser &&
    (currentUser.role === 'admin_pemkab' || currentUser.role === 'operator_opd');

  // Quick 1-Click login helper if not authorized yet
  const handleDirectAdminLogin = async (roleType: 'admin' | 'operator') => {
    setIsDemoLoggingIn(true);
    const demoNik = roleType === 'admin' ? '3515000000000001' : '3515000000000002';
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nik: demoNik, password: 'AdminSidoarjo2026!' }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        sessionStorage.setItem('sitapak_auth_token', data.token);
        localStorage.setItem('sitapak_citizen_session', JSON.stringify(data.citizen));
        if (onAdminLoginSuccess) {
          onAdminLoginSuccess(data.citizen);
        }
      } else {
        throw new Error(data.message || 'Login gagal.');
      }
    } catch {
      // Offline fallback
      const fallbackAccount: CitizenAccount = {
        id: roleType === 'admin' ? 7 : 8,
        nik: demoNik,
        fullName: roleType === 'admin' ? 'Bambang Haryo Pratama, S.STP' : 'Dewi Lestari, S.Kom',
        email: roleType === 'admin' ? 'admin.pemkab@sidoarjokab.go.id' : 'operator.dispendukcapil@sidoarjokab.go.id',
        phone: '081122334455',
        kecamatan: 'Sidoarjo (Kota)',
        kelurahan: 'Sidokumpul',
        role: roleType === 'admin' ? 'admin_pemkab' : 'operator_opd',
        isVerified: true,
      };
      if (onAdminLoginSuccess) {
        onAdminLoginSuccess(fallbackAccount);
      }
    } finally {
      setIsDemoLoggingIn(false);
    }
  };

  const navMenuItems = [
    {
      id: 'overview',
      label: 'Ringkasan Eksekutif',
      icon: LayoutDashboard,
      badge: 'Real-time',
    },
    {
      id: 'laporan',
      label: 'Pengaduan Warga (SP4N/112)',
      icon: FileText,
      badge: null,
    },
    {
      id: 'layanan',
      label: 'Permohonan Berkas (KTP/SKU)',
      icon: Layers,
      badge: null,
    },
    {
      id: 'warga',
      label: 'Kependudukan & Satu Akun',
      icon: Users,
      badge: 'UU PDP',
    },
    {
      id: 'faskes',
      label: 'Monitoring Ranjang RSUD',
      icon: Hospital,
      badge: null,
    },
    {
      id: 'audit',
      label: 'Audit Trail & Keamanan',
      icon: ShieldCheck,
      badge: 'Merkle',
    },
  ];

  // If user is not logged in as admin/operator, display authorization gate
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900 border border-emerald-500/30 rounded-3xl p-8 shadow-2xl text-center space-y-6 animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <div className="text-xs font-bold font-mono text-emerald-400 uppercase tracking-wider">
              Akses Terbatas • Perpres 95/2018 SPBE
            </div>
            <h2 className="text-2xl font-extrabold text-white font-display">
              Portal Administrator SITAPAK
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Halaman ini diperuntukkan bagi Administrator Pemkab Sidoarjo dan Operator OPD teknis untuk mengelola permohonan berkas dan aduan masyarakat.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
            <span className="text-xs font-bold text-slate-300 block">
              Pilih Akses Cepat Demo (1-Klik):
            </span>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleDirectAdminLogin('admin')}
                disabled={isDemoLoggingIn}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-700/30 flex items-center justify-between transition-all cursor-pointer disabled:opacity-50"
              >
                <div className="text-left">
                  <div>Masuk Sebagai Admin Pemkab</div>
                  <div className="text-[10px] text-emerald-100 font-normal">Super Administrator SPBE</div>
                </div>
                <ChevronRight className="w-4 h-4 text-emerald-200" />
              </button>

              <button
                onClick={() => handleDirectAdminLogin('operator')}
                disabled={isDemoLoggingIn}
                className="w-full py-3 px-4 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs flex items-center justify-between transition-all cursor-pointer disabled:opacity-50"
              >
                <div className="text-left">
                  <div>Masuk Sebagai Operator OPD</div>
                  <div className="text-[10px] text-slate-300 font-normal">Dispendukcapil / Teknis</div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </button>
            </div>
          </div>

          <button
            onClick={onNavigateHome}
            className="text-xs text-slate-400 hover:text-white transition-colors underline cursor-pointer"
          >
            Kembali ke Beranda Publik
          </button>
        </div>
      </div>
    );
  }

  const roleLabel =
    currentUser.role === 'admin_pemkab'
      ? 'Super Admin Pemkab'
      : 'Operator OPD Sidoarjo';

  return (
    <div className="min-h-screen bg-[#F4F6F5] text-slate-900 flex flex-col md:flex-row font-sans">
      {/* Mobile Header Bar */}
      <div className="md:hidden bg-slate-950 text-white px-4 py-3 flex items-center justify-between border-b border-slate-800 sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-bold">
            <Landmark className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold font-display text-white">SITAPAK ADMIN</div>
            <div className="text-[10px] text-emerald-400 font-mono">{roleLabel}</div>
          </div>
        </div>

        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
        >
          {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-950 text-white flex flex-col border-r border-slate-800/80 transition-transform duration-200 md:translate-x-0 md:static ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand / Logo */}
        <div className="p-6 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-slate-950 flex items-center justify-center font-extrabold shadow-lg shadow-emerald-500/20">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <div className="text-base font-extrabold text-white tracking-tight font-display flex items-center gap-1.5">
                <span>SITAPAK</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-1.5 py-0.5 rounded font-mono">
                  ADMIN
                </span>
              </div>
              <div className="text-[10px] text-slate-400 font-medium">Kabupaten Sidoarjo</div>
            </div>
          </div>

          <div className="mt-4 p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
            <span className="text-[11px] text-emerald-300 font-semibold truncate">
              {roleLabel}
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {navMenuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-700/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <IconComponent className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-bold ${
                      isActive ? 'bg-emerald-700 text-emerald-100' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer: User profile & Action buttons */}
        <div className="p-4 border-t border-slate-800/80 space-y-3">
          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-500 text-slate-950 font-extrabold flex items-center justify-center text-xs shrink-0">
              {currentUser.fullName
                ? currentUser.fullName
                    .split(' ')
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join('')
                : 'AD'}
            </div>
            <div className="overflow-hidden flex-1">
              <div className="text-xs font-bold text-white truncate" title={currentUser.fullName}>
                {currentUser.fullName}
              </div>
              <div className="text-[10px] text-slate-400 truncate">
                {currentUser.email}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onNavigateHome}
              title="Buka Portal Beranda Publik Warga"
              className="flex-1 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Portal Publik</span>
            </button>
            <button
              onClick={onLogout}
              title="Keluar Sesi Administrator"
              className="py-2 px-3 rounded-xl bg-rose-950/60 hover:bg-rose-900/60 border border-rose-800/60 text-rose-300 hover:text-rose-100 text-xs font-semibold flex items-center justify-center transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Backdrop for mobile drawer */}
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm md:hidden"
        ></div>
      )}

      {/* Main Administrative Workplace Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Desktop Topbar */}
        <header className="hidden md:flex bg-white border-b border-slate-200/80 px-8 py-4 items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold font-mono text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              SITAPAK v2.4.0
            </span>
            <div className="h-4 w-px bg-slate-200"></div>
            <div className="text-xs text-slate-500 font-medium flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{currentTime} WIB</span>
              <span className="text-slate-300">•</span>
              <span>Kabupaten Sidoarjo</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Enterprise SQLite WAL Mode</span>
            </div>

            <button
              onClick={onNavigateHome}
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Lihat Portal Publik</span>
            </button>
          </div>
        </header>

        {/* Dynamic Tab Body */}
        <main className="p-4 sm:p-8 flex-1 max-w-7xl w-full mx-auto">
          {activeTab === 'overview' && (
            <AdminOverview
              onNavigateTab={(tab) => handleTabChange(tab)}
              userRole={currentUser.role}
            />
          )}
          {activeTab === 'laporan' && <AdminReports />}
          {activeTab === 'layanan' && <AdminServiceRequests />}
          {activeTab === 'warga' && <AdminCitizens />}
          {activeTab === 'faskes' && <AdminFaskes />}
          {activeTab === 'audit' && <AdminAuditLogs />}
        </main>
      </div>
    </div>
  );
};
