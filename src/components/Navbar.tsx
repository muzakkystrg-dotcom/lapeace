import React, { useState } from 'react';
import { Landmark, UserPlus, LogIn, Menu, X, ShieldCheck, ChevronRight } from 'lucide-react';

interface NavbarProps {
  onOpenRegister: () => void;
  onOpenLogin: () => void;
  onNavigateSection: (sectionId: string) => void;
  activeNav: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenRegister,
  onOpenLogin,
  onNavigateSection,
  activeNav,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'transparansi', label: 'Data Publik' },
    { id: 'layanan', label: 'Layanan' },
    { id: 'laporan', label: 'Laporan Warga' },
    { id: 'tentang', label: 'Tentang Kami' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#083C2E] text-white border-b border-emerald-900/50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left Brand Lockup */}
          <div 
            onClick={() => onNavigateSection('beranda')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 shadow-inner group-hover:scale-105 transition-transform">
              <Landmark className="w-5 h-5 text-emerald-300" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
                SITAPAK Sidoarjo
              </span>
              <span className="text-xs text-emerald-300/80 font-normal">
                Portal Terpadu & Transparansi Pemkab
              </span>
            </div>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1.5 bg-[#05241B]/70 p-1.5 rounded-xl border border-emerald-900/60 shadow-inner">
            {navItems.map((item) => {
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigateSection(item.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-emerald-900/80 text-white shadow-sm border border-emerald-700/60'
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
            <button
              onClick={onOpenLogin}
              className="text-sm font-medium text-emerald-100 hover:text-white px-3.5 py-2 rounded-lg hover:bg-emerald-900/40 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogIn className="w-4 h-4 text-emerald-300" />
              <span>Masuk</span>
            </button>
            <button
              onClick={onOpenRegister}
              className="bg-[#38d49a] hover:bg-[#2fc48d] text-[#05241B] font-semibold text-sm px-4 py-2 rounded-lg transition-all shadow-sm hover:shadow-md flex items-center gap-2 cursor-pointer active:scale-98"
            >
              <UserPlus className="w-4 h-4 text-[#05241B]" />
              <span>Daftar Akun Warga</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenRegister}
              className="bg-[#38d49a] text-[#05241B] text-xs font-semibold px-2.5 py-1.5 rounded-md flex items-center gap-1"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Daftar</span>
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

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#05241B] border-b border-emerald-800/60 px-4 pt-3 pb-5 space-y-3">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigateSection(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm font-medium text-left ${
                  activeNav === item.id
                    ? 'bg-emerald-900/80 text-white font-semibold'
                    : 'text-emerald-100/80 hover:bg-emerald-900/40 hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 text-emerald-400/60" />
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-emerald-900/80 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenLogin();
                setMobileMenuOpen(false);
              }}
              className="w-full text-center py-2.5 rounded-lg text-sm font-medium text-white bg-emerald-900/50 hover:bg-emerald-900/80"
            >
              Masuk ke Portal
            </button>
            <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-300/70 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Tersertifikasi Keamanan Siber Diskominfo Sidoarjo</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
