import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CitizenAccount } from '../../types/portal';
import {
  Landmark,
  Bell,
  Check,
  ChevronDown,
  BadgeCheck,
  FileText,
  Megaphone,
  LogOut,
  UserPlus,
  Menu,
  X,
  ChevronRight,
  Shield,
  LayoutDashboard,
} from 'lucide-react';

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
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

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

  // Keyboard accessibility: Escape to close dropdowns and modal
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        if (showLogoutConfirm) {
          setShowLogoutConfirm(false);
        } else if (userDropdownOpen) {
          setUserDropdownOpen(false);
        } else if (notificationOpen) {
          setNotificationOpen(false);
        } else if (mobileMenuOpen) {
          setMobileMenuOpen(false);
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showLogoutConfirm, userDropdownOpen, notificationOpen, mobileMenuOpen]);

  // Lock body scroll when logout modal is open
  useEffect(() => {
    if (showLogoutConfirm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showLogoutConfirm]);

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

  const userName = currentUser?.fullName || 'Budi Santoso';
  const userInitials = userName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join('') || 'BS';

  const userRole =
    currentUser?.role === 'admin_pemkab'
      ? 'Admin Pemkab Sidoarjo'
      : currentUser?.role === 'operator_opd'
      ? 'Operator OPD Sidoarjo'
      : 'Warga Terverifikasi';

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#083c2e]/95 backdrop-blur-md shadow-md border-b border-[#00251b]">
      <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Left: Brand Lockup */}
        <div className="flex items-center gap-4">
          <a
            href="#beranda"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('beranda');
            }}
            className="flex items-center gap-3 group select-none focus:outline-none focus:ring-2 focus:ring-[#8af7c9] rounded-xl"
          >
            <div className="w-10 h-10 rounded-xl bg-[#8af7c9] flex items-center justify-center text-[#002115] shadow-sm group-hover:scale-105 transition-transform">
              <Landmark className="w-5 h-5 text-[#002115]" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg text-white leading-tight tracking-tight">
                SITAPAK Sidoarjo
              </span>
              <span className="text-xs text-[#bbedd9] leading-tight">
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
                className={`px-3.5 py-2 text-sm rounded-lg transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-[#8af7c9] ${
                  isActive
                    ? 'bg-white/15 text-white font-bold shadow-xs'
                    : 'text-[#bbedd9] hover:text-white hover:bg-white/10'
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
                  aria-expanded={notificationOpen}
                  onClick={() => setNotificationOpen(!notificationOpen)}
                  className="relative p-2 rounded-xl text-[#bbedd9] hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#8af7c9] transition-colors cursor-pointer"
                >
                  <Bell className="w-5 h-5 text-white" />
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
                        <Bell className="w-4 h-4 text-[#8af7c9]" />
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
                          <span className="text-[10px] text-[#bbedd9]">10 mnt lalu</span>
                        </div>
                        <p className="text-xs text-emerald-100 mt-1">
                          Verifikasi permohonan KTP-el telah disetujui. Siap dicetak di MPP Sidoarjo.
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-emerald-900/40">
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-semibold text-xs text-yellow-300">Call Center 112</span>
                          <span className="text-[10px] text-[#bbedd9]">1 jam lalu</span>
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
                        className="text-xs text-[#8af7c9] hover:underline font-semibold focus:outline-none focus:ring-2 focus:ring-[#8af7c9] rounded-md px-2 py-1"
                      >
                        Buka Status Seluruh Layanan &rarr;
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Admin Portal Direct Button if authorized */}
              {(currentUser?.role === 'admin_pemkab' || currentUser?.role === 'operator_opd') && (
                <button
                  type="button"
                  onClick={() => {
                    window.location.hash = '#admin';
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-extrabold text-xs shadow-md transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#8af7c9]"
                >
                  <Shield className="w-3.5 h-3.5 text-slate-950" />
                  <span className="hidden sm:inline">Portal Admin</span>
                  <span className="sm:hidden">Admin</span>
                </button>
              )}

              {/* User Pill Button (Google Stitch Exact) */}
              <div className="relative" ref={userDropdownRef}>
                <button
                  type="button"
                  aria-expanded={userDropdownOpen}
                  aria-haspopup="true"
                  aria-label={`Menu profil ${userName}`}
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-3 pl-2 py-1 pr-3 rounded-full bg-[#083c2e] border border-[#6edaae]/30 shadow-sm cursor-pointer hover:bg-[#00251b] focus:outline-none focus:ring-2 focus:ring-[#8af7c9] transition-all select-none text-left"
                >
                  <div className="w-9 h-9 rounded-full bg-[#8af7c9] text-[#002115] font-bold font-display flex items-center justify-center text-[14px] shadow-sm relative shrink-0">
                    <span>{userInitials}</span>
                    <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#006c4d] text-white flex items-center justify-center text-[10px] ring-1 ring-[#083c2e]">
                      <Check className="w-2.5 h-2.5 text-white" />
                    </span>
                  </div>
                  <div className="hidden sm:flex flex-col text-left">
                    <span
                      className="text-xs sm:text-sm text-white font-bold leading-tight font-display max-w-[120px] sm:max-w-[160px] truncate"
                      title={userName}
                    >
                      {userName}
                    </span>
                    <span className="text-[11px] text-[#8af7c9] leading-tight font-medium">
                      {userRole}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-[#bbedd9] transition-transform duration-200 ${
                      userDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* User Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#083c2e] border border-[#6edaae]/30 shadow-2xl p-2 text-white z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="p-3 border-b border-emerald-800/60 mb-1">
                      <div className="text-xs font-bold text-white font-display truncate" title={userName}>{userName}</div>
                      <div className="text-[11px] text-[#8af7c9] flex items-center gap-1 mt-0.5">
                        <BadgeCheck className="w-3.5 h-3.5 text-[#8af7c9]" />
                        <span>NIK: {currentUser?.nik || '351508******0002'}</span>
                      </div>
                      <div className="text-[11px] text-[#bbedd9] mt-0.5">
                        Kecamatan: {currentUser?.kecamatan || 'Sidoarjo Kota'}
                      </div>
                    </div>

                    <div className="py-1 space-y-1 text-xs">
                      {(currentUser?.role === 'admin_pemkab' || currentUser?.role === 'operator_opd') && (
                        <button
                          type="button"
                          onClick={() => {
                            setUserDropdownOpen(false);
                            window.location.hash = '#admin';
                          }}
                          className="w-full text-left px-3 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 flex items-center gap-2.5 transition-colors cursor-pointer border border-emerald-500/40 font-bold focus:outline-none focus:ring-2 focus:ring-[#8af7c9]"
                        >
                          <LayoutDashboard className="w-4 h-4 text-emerald-400" />
                          <span>Buka Admin Dashboard</span>
                        </button>
                      )}

                      {onOpenTrackModal && (
                        <button
                          type="button"
                          onClick={() => {
                            setUserDropdownOpen(false);
                            onOpenTrackModal();
                          }}
                          className="w-full text-left px-3 py-2 rounded-xl text-emerald-100 hover:text-white hover:bg-white/10 flex items-center gap-2.5 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#8af7c9]"
                        >
                          <FileText className="w-4 h-4 text-[#8af7c9]" />
                          <span>Lacak Dokumen Saya</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          setUserDropdownOpen(false);
                          handleNavClick('laporan');
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-emerald-100 hover:text-white hover:bg-white/10 flex items-center gap-2.5 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#8af7c9]"
                      >
                        <Megaphone className="w-4 h-4 text-[#8af7c9]" />
                        <span>Riwayat Laporan 112</span>
                      </button>
                    </div>

                    <div className="pt-1.5 border-t border-emerald-800/60 mt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setUserDropdownOpen(false);
                          setShowLogoutConfirm(true);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-red-300 hover:text-white hover:bg-red-900/40 flex items-center gap-2.5 transition-colors cursor-pointer text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-red-400"
                      >
                        <LogOut className="w-4 h-4 text-red-400" />
                        <span>Keluar dari Akun</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Guest navigation */
            <div className="hidden sm:flex items-center gap-3">
              <button
                type="button"
                data-path="masuk"
                onClick={onOpenLogin}
                className="text-sm px-4 py-2 rounded-xl text-white hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all font-medium cursor-pointer"
              >
                Masuk
              </button>
              <button
                type="button"
                data-path="daftar"
                onClick={onOpenRegister}
                className="text-sm px-5 py-2.5 rounded-xl bg-[#8af7c9] text-[#002115] hover:bg-[#6edaae] focus:outline-none focus:ring-2 focus:ring-[#8af7c9] font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <UserPlus className="w-4 h-4 text-[#002115]" />
                <span>Daftar Akun Warga</span>
              </button>
            </div>
          )}

          {/* Mobile Menu Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-[#bbedd9] hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#8af7c9] cursor-pointer"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-[#bbedd9]" />}
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
                  className={`flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-sm font-medium text-left transition-colors focus:outline-none focus:ring-2 focus:ring-[#8af7c9] ${
                    isActive
                      ? 'bg-white/15 text-white font-bold'
                      : 'text-[#bbedd9] hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-[#bbedd9]" />
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-emerald-900/80 flex flex-col gap-2">
            {currentUser !== null ? (
              <div className="space-y-2">
                {(currentUser?.role === 'admin_pemkab' || currentUser?.role === 'operator_opd') && (
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      window.location.hash = '#admin';
                    }}
                    className="w-full py-2.5 px-3 rounded-xl bg-emerald-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Shield className="w-4 h-4 text-slate-950" />
                    <span>Buka Admin Dashboard</span>
                  </button>
                )}
                <div className="px-3 py-2 bg-white/5 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#8af7c9] text-[#002115] font-bold flex items-center justify-center text-xs">
                      {userInitials}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white max-w-[140px] truncate" title={userName}>{userName}</div>
                      <div className="text-[10px] text-[#8af7c9]">Warga Terverifikasi</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setShowLogoutConfirm(true);
                    }}
                    className="text-xs text-red-300 hover:text-white font-semibold px-2 py-1 rounded-lg hover:bg-red-950/40 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
                  >
                    Keluar
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenLogin) onOpenLogin();
                  }}
                  className="w-full text-center py-2.5 rounded-xl text-sm font-medium text-white bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 transition-colors"
                >
                  Masuk
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenRegister) onOpenRegister();
                  }}
                  className="w-full text-center py-2.5 rounded-xl text-sm font-bold bg-[#8af7c9] text-[#002115] hover:bg-[#6edaae] focus:outline-none focus:ring-2 focus:ring-[#8af7c9] transition-colors"
                >
                  Daftar
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Logout (Teleported via createPortal ke document.body) */}
      {showLogoutConfirm &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-confirm-title"
            aria-describedby="logout-confirm-desc"
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          >
            <div className="bg-[#083c2e] border border-[#6edaae]/40 rounded-2xl shadow-2xl max-w-md w-full p-6 text-white animate-in zoom-in-95 duration-150 relative">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center shrink-0">
                  <LogOut className="w-6 h-6 text-red-400" />
                </div>
                <div className="flex-1">
                  <h3
                    id="logout-confirm-title"
                    className="text-lg font-bold font-display text-white"
                  >
                    Konfirmasi Keluar Akun
                  </h3>
                  <p
                    id="logout-confirm-desc"
                    className="text-sm text-[#bbedd9] mt-2 leading-relaxed"
                  >
                    Apakah Anda yakin ingin keluar dari akun warga SITAPAK? Draf pengajuan atau laporan yang belum dikirim mungkin akan hilang.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-emerald-800/60">
                <button
                  type="button"
                  onClick={() => setShowLogoutConfirm(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/30 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowLogoutConfirm(false);
                    if (onLogout) onLogout();
                  }}
                  className="px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-red-600 hover:bg-red-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 flex items-center gap-2 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Ya, Keluar Akun</span>
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </header>
  );
};
export default Navbar;
