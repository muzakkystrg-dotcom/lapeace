import React, { useState, useRef, useEffect } from 'react';
import { CitizenAccount } from '../../types/portal';

export interface NavbarProps {
  currentUser?: CitizenAccount | null;
  activeNav?: string;
  notificationsCount?: number;
  onOpenLogin?: () => void;
  onOpenRegister?: () => void;
  onLogout?: () => void;
  onNavigateSection?: (sectionId: string) => void;
  onOpenTrackModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  activeNav = 'beranda',
  notificationsCount = 2,
  onOpenLogin,
  onOpenRegister,
  onLogout,
  onNavigateSection,
  onOpenTrackModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const userDropdownRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target as Node)
      ) {
        setUserDropdownOpen(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setNotificationOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { id: 'beranda', path: 'beranda', label: 'Beranda' },
    { id: 'transparansi', path: 'data-publik', label: 'Data Publik' },
    { id: 'layanan', path: 'layanan', label: 'Layanan' },
    { id: 'laporan', path: 'laporan-warga', label: 'Laporan Warga' },
    { id: 'tentang', path: 'tentang-kami', label: 'Tentang Kami' },
  ];

  const handleNavClick = (id: string) => {
    if (onNavigateSection) {
      onNavigateSection(id);
    }
    setMobileMenuOpen(false);
  };

  // Helper for user initials
  const userName = currentUser?.fullName || 'Budi Santoso';
  const userInitials = userName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join('') || 'BS';

  const userRole = currentUser ? 'Warga Terverifikasi' : 'Warga Terverifikasi';

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#083c2e]/95 backdrop-blur-md shadow-md border-b border-[#00251b]">
      <div className="h-20 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Left: Brand Lockup */}
        <div className="flex items-center gap-4">
          <a
            href="#beranda"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('beranda');
            }}
            className="flex items-center gap-3 group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-[#8af7c9] flex items-center justify-center text-[#002115] shadow-sm group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[24px]">account_balance</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg text-white leading-tight tracking-tight">
                SITAPAK Sidoarjo
              </span>
              <span className="text-xs text-[#77a794] leading-tight">
                Portal Terpadu &amp; Transparansi Pemkab
              </span>
            </div>
          </a>
        </div>

        {/* Center: Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive =
              activeNav === item.id ||
              activeNav === item.path ||
              (item.id === 'beranda' && (!activeNav || activeNav === 'beranda'));

            return (
              <a
                key={item.id}
                href={`#${item.path}`}
                data-path={item.path}
                aria-current={isActive ? 'page' : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                className={`px-3.5 py-2 text-sm rounded-lg transition-colors font-medium ${
                  isActive
                    ? 'bg-white/15 text-white font-bold shadow-xs'
                    : 'text-[#77a794] hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {/* LOGGED IN STATE */}
          {currentUser !== null ? (
            <div className="flex items-center gap-3">
              {/* Notifications Button */}
              <div className="relative" ref={notificationRef}>
                <button
                  type="button"
                  aria-label="Notifikasi"
                  onClick={() => setNotificationOpen(!notificationOpen)}
                  className="relative p-2 rounded-xl text-[#77a794] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[24px]">notifications</span>
                  {notificationsCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#ba1a1a] text-white text-[10px] font-bold">
                      {notificationsCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {notificationOpen && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-[#083c2e] border border-[#6edaae]/30 shadow-2xl p-4 text-white z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="flex items-center justify-between pb-3 border-b border-emerald-800/60 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px] text-[#8af7c9]">notifications</span>
                        <span className="font-bold text-sm">Notifikasi Warga</span>
                      </div>
                      <span className="text-[11px] bg-[#ba1a1a] text-white px-2 py-0.5 rounded-full font-bold">
                        {notificationsCount} Baru
                      </span>
                    </div>

                    <div className="space-y-2.5 max-h-72 overflow-y-auto">
                      <div className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-emerald-900/40">
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-semibold text-xs text-[#8af7c9]">Dukcapil Plavon</span>
                          <span className="text-[10px] text-[#77a794]">10 mnt lalu</span>
                        </div>
                        <p className="text-xs text-emerald-100 mt-1">
                          Verifikasi permohonan KTP-el telah disetujui. Siap dicetak di MPP Sidoarjo.
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-emerald-900/40">
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-semibold text-xs text-yellow-300">Call Center 112</span>
                          <span className="text-[10px] text-[#77a794]">1 jam lalu</span>
                        </div>
                        <p className="text-xs text-emerald-100 mt-1">
                          Laporan perbaikan lampu jalan di Taman Pinang Indah telah ditugaskan ke Dishub.
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-emerald-800/60 mt-3 text-center">
                      <button
                        onClick={() => {
                          setNotificationOpen(false);
                          if (onOpenTrackModal) onOpenTrackModal();
                        }}
                        className="text-xs text-[#8af7c9] hover:underline font-semibold"
                      >
                        Buka Status Seluruh Layanan &rarr;
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* User Pill Button (Google Stitch Exact) */}
              <div className="relative" ref={userDropdownRef}>
                <div
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-3 pl-2 py-1 pr-3 rounded-full bg-[#083c2e] border border-[#6edaae]/30 shadow-sm cursor-pointer hover:bg-[#00251b] transition-all select-none"
                >
                  <div className="w-9 h-9 rounded-full bg-[#8af7c9] text-[#002115] font-bold font-display flex items-center justify-center text-[14px] shadow-sm relative shrink-0">
                    <span>{userInitials}</span>
                    <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#006c4d] text-white flex items-center justify-center text-[10px] ring-1 ring-[#083c2e]">
                      <span className="material-symbols-outlined text-[10px] font-bold">check</span>
                    </span>
                  </div>
                  <div className="hidden sm:flex flex-col text-left">
                    <span className="text-xs sm:text-sm text-white font-bold leading-tight font-display">
                      {userName}
                    </span>
                    <span className="text-[11px] text-[#8af7c9] leading-tight font-medium">
                      {userRole}
                    </span>
                  </div>
                  <span
                    className={`material-symbols-outlined text-[#77a794] text-[18px] transition-transform duration-200 ${
                      userDropdownOpen ? 'rotate-180' : ''
                    }`}
                  >
                    expand_more
                  </span>
                </div>

                {/* User Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#083c2e] border border-[#6edaae]/30 shadow-2xl p-2 text-white z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="p-3 border-b border-emerald-800/60 mb-1">
                      <div className="text-xs font-bold text-white font-display">{userName}</div>
                      <div className="text-[11px] text-[#8af7c9] flex items-center gap-1 mt-0.5">
                        <span className="material-symbols-outlined text-[14px]">verified</span>
                        <span>NIK: {currentUser?.nik || '351508******0002'}</span>
                      </div>
                      <div className="text-[11px] text-[#77a794] mt-0.5">
                        Kecamatan: {currentUser?.kecamatan || 'Sidoarjo Kota'}
                      </div>
                    </div>

                    <div className="py-1 space-y-1 text-xs">
                      {onOpenTrackModal && (
                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                            onOpenTrackModal();
                          }}
                          className="w-full text-left px-3 py-2 rounded-xl text-emerald-100 hover:text-white hover:bg-white/10 flex items-center gap-2.5 transition-colors cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[18px] text-[#8af7c9]">description</span>
                          <span>Lacak Dokumen Saya</span>
                        </button>
                      )}

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          handleNavClick('laporan');
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-emerald-100 hover:text-white hover:bg-white/10 flex items-center gap-2.5 transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[18px] text-[#8af7c9]">campaign</span>
                        <span>Riwayat Laporan 112</span>
                      </button>
                    </div>

                    <div className="pt-1.5 border-t border-emerald-800/60 mt-1">
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          if (onLogout) onLogout();
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-red-300 hover:text-white hover:bg-red-900/40 flex items-center gap-2.5 transition-colors cursor-pointer text-xs font-semibold"
                      >
                        <span className="material-symbols-outlined text-[18px] text-red-400">logout</span>
                        <span>Keluar dari Akun</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* GUEST STATE (Not Logged In) */
            <div className="hidden sm:flex items-center gap-3">
              <button
                type="button"
                data-path="masuk"
                onClick={onOpenLogin}
                className="text-sm px-4 py-2 rounded-xl text-white hover:bg-white/15 transition-all font-medium cursor-pointer"
              >
                Masuk
              </button>
              <button
                type="button"
                data-path="daftar"
                onClick={onOpenRegister}
                className="text-sm px-5 py-2.5 rounded-xl bg-[#8af7c9] text-[#002115] hover:bg-[#6edaae] font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">person_add</span>
                <span>Daftar Akun Warga</span>
              </button>
            </div>
          )}

          {/* Mobile Menu Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-[#77a794] hover:text-white hover:bg-white/10 focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-[26px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#083c2e] border-b border-[#00251b] px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const isActive = activeNav === item.id || activeNav === item.path;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-sm font-medium text-left transition-colors ${
                    isActive
                      ? 'bg-white/15 text-white font-bold'
                      : 'text-[#77a794] hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-emerald-900/80 flex flex-col gap-2">
            {currentUser !== null ? (
              <div className="space-y-2">
                <div className="px-3 py-2 bg-white/5 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#8af7c9] text-[#002115] font-bold flex items-center justify-center text-xs">
                      {userInitials}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">{userName}</div>
                      <div className="text-[10px] text-[#8af7c9]">Warga Terverifikasi</div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      if (onLogout) onLogout();
                    }}
                    className="text-xs text-red-300 hover:text-white font-semibold"
                  >
                    Keluar
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenLogin) onOpenLogin();
                  }}
                  className="w-full text-center py-2.5 rounded-xl text-sm font-medium text-white bg-white/10 hover:bg-white/20 transition-colors"
                >
                  Masuk
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenRegister) onOpenRegister();
                  }}
                  className="w-full text-center py-2.5 rounded-xl text-sm font-bold bg-[#8af7c9] text-[#002115] hover:bg-[#6edaae] transition-colors"
                >
                  Daftar
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
export default Navbar;
