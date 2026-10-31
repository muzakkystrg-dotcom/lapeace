import React, { useState } from 'react';
import { Landmark, Bell, CheckCircle2, User, Menu, X, ChevronRight, LogIn, UserPlus } from 'lucide-react';

interface NavbarProps {
  currentPage: 'beranda' | 'laporan';
  onNavigatePage: (page: 'beranda' | 'laporan', sectionId?: string) => void;
  onOpenRegister?: () => void;
  onOpenLogin?: () => void;
  user?: {
    fullName: string;
    isVerified: boolean;
  } | null;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigatePage,
  onOpenRegister,
  onOpenLogin,
  user = { fullName: 'Budi Santoso', isVerified: true },
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const navItems = [
    { id: 'beranda', label: 'Beranda', page: 'beranda' as const, section: 'beranda' },
    { id: 'transparansi', label: 'Data Publik', page: 'beranda' as const, section: 'transparansi' },
    { id: 'layanan', label: 'Layanan', page: 'beranda' as const, section: 'layanan' },
    { id: 'laporan', label: 'Laporan Warga', page: 'laporan' as const },
    { id: 'tentang', label: 'Tentang Kami', page: 'beranda' as const, section: 'transparansi' },
  ];

  const notifications = [
    { id: 1, title: 'Tiket #LP-2024-0842 Diperbarui', desc: 'Petugas DLHK telah dikerahkan ke Pasar Krian.', time: '10 menit lalu' },
    { id: 2, title: 'Tiket #LP-2024-0799 Selesai', desc: 'Perbaikan jalan di Jl. Diponegoro tuntas 100%.', time: '1 jam lalu' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#083C2E] text-white border-b border-emerald-900/50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left Brand Lockup */}
          <div
            onClick={() => onNavigatePage('beranda')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 shadow-inner group-hover:scale-105 transition-transform">
              <Landmark className="w-5 h-5 text-emerald-300" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
                SITAPAK
              </span>
              <span className="text-xs text-emerald-300/80 font-normal">
                Sistem Terpadu Pelayanan Publik
              </span>
            </div>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1.5 bg-[#05241B]/70 p-1.5 rounded-xl border border-emerald-900/60 shadow-inner">
            {navItems.map((item) => {
              const isActive =
                item.id === 'laporan'
                  ? currentPage === 'laporan'
                  : currentPage === 'beranda' && item.id === 'beranda';

              return (
                <button
                  key={item.id}
                  onClick={() => onNavigatePage(item.page, item.section)}
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-emerald-900/80 text-white shadow-sm border border-emerald-700/60 font-semibold'
                      : 'text-emerald-100/75 hover:text-white hover:bg-emerald-900/40'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Group */}
          <div className="hidden sm:flex items-center gap-3">
            
            {/* Notification Bell */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setNotificationOpen(!notificationOpen)}
                className="w-9 h-9 rounded-full bg-[#05241B] hover:bg-emerald-900/60 border border-emerald-800/70 flex items-center justify-center text-emerald-200 hover:text-white transition-colors relative cursor-pointer"
                title="Notifikasi Laporan"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                  2
                </span>
              </button>

              {notificationOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-2 text-slate-800 z-50">
                  <div className="px-3.5 py-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">Notifikasi Aduan</span>
                    <span className="text-[10px] text-emerald-700 font-semibold">2 Baru</span>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {notifications.map((n) => (
                      <div key={n.id} className="p-3 hover:bg-slate-50 transition-colors cursor-pointer">
                        <div className="text-xs font-bold text-slate-900">{n.title}</div>
                        <div className="text-[11px] text-slate-600 mt-0.5">{n.desc}</div>
                        <div className="text-[10px] text-slate-400 mt-1">{n.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Verified Citizen Profile Pill */}
            {user ? (
              <div className="bg-emerald-900/60 hover:bg-emerald-900/80 border border-emerald-700/50 rounded-full px-3.5 py-1.5 flex items-center gap-2 cursor-pointer transition-colors shadow-xs">
                <div className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs font-bold">
                  <User className="w-3.5 h-3.5 text-emerald-100" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-white whitespace-nowrap">
                    {user.fullName}
                  </span>
                  {user.isVerified && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400 text-white" />
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenLogin}
                  className="text-xs font-semibold text-emerald-200 hover:text-white px-3 py-1.5"
                >
                  Masuk
                </button>
                <button
                  onClick={onOpenRegister}
                  className="bg-[#38d49a] text-[#05241B] text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Daftar</span>
                </button>
              </div>
            )}

          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => onNavigatePage(currentPage === 'beranda' ? 'laporan' : 'beranda')}
              className="text-xs bg-emerald-800 text-emerald-100 px-2.5 py-1.5 rounded-lg font-medium"
            >
              {currentPage === 'beranda' ? 'Laporan' : 'Beranda'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-900/60 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#05241B] border-b border-emerald-800/60 px-4 pt-3 pb-5 space-y-3">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigatePage(item.page, item.section);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm font-medium text-left ${
                  (item.id === 'laporan' && currentPage === 'laporan') ||
                  (item.id === 'beranda' && currentPage === 'beranda')
                    ? 'bg-emerald-900/80 text-white font-semibold'
                    : 'text-emerald-100/80 hover:bg-emerald-900/40 hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 text-emerald-400/60" />
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-emerald-900/80 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-white">
              <User className="w-4 h-4 text-emerald-300" />
              <span>Budi Santoso (Warga Terverifikasi)</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
