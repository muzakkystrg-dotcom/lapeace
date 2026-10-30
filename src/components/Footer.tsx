import React, { useState } from 'react';
import { Landmark, PhoneCall, ShieldAlert, Send, ShieldCheck, CheckCircle2, FileCheck } from 'lucide-react';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenServiceCategory?: (category: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 4000);
  };

  return (
    <footer className="bg-[#E9F7EE] text-[#15211C] border-t border-emerald-900/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-14">
          
          {/* Col 1: Brand Info & Emergency (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-800 text-emerald-100 flex items-center justify-center shadow-sm">
                <Landmark className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-display font-bold text-base text-[#15211C]">
                  Pemerintah Kabupaten Sidoarjo – SITAPAK
                </h4>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#5A6862] leading-relaxed">
              Pusat Pelayanan Terpadu & Call Center 112 Sidoarjo, Jl. Gubernur Suryo No. 1, Sidoarjo, Jawa Timur. Menjamin transparansi anggaran dan kepastian pelayanan publik warga Sidoarjo.
            </p>

            <div className="pt-2">
              <div className="text-[11px] font-bold tracking-wider uppercase text-emerald-900/80 mb-2">
                Pusat Bantuan & Tanggap Darurat
              </div>
              <div className="flex flex-wrap gap-2">
                <a
                  href="tel:112"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-red-200 text-red-700 text-xs font-semibold hover:bg-red-50 transition-colors shadow-2xs"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-red-600 animate-pulse" />
                  <span>112 Sidoarjo Siaga</span>
                </a>
                <a
                  href="tel:110"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-800 text-xs font-semibold hover:bg-slate-50 transition-colors shadow-2xs"
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-emerald-800" />
                  <span>110 Polresta Sidoarjo</span>
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Peta Situs (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <h5 className="font-display font-bold text-sm text-[#15211C]">
              Peta Situs
            </h5>
            <ul className="space-y-2 text-xs sm:text-sm text-[#5A6862]">
              <li>
                <button
                  onClick={() => onNavigateSection('beranda')}
                  className="hover:text-emerald-800 transition-colors cursor-pointer text-left"
                >
                  Beranda Utama
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('transparansi')}
                  className="hover:text-emerald-800 transition-colors cursor-pointer text-left"
                >
                  Katalog Data Terbuka
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('layanan')}
                  className="hover:text-emerald-800 transition-colors cursor-pointer text-left"
                >
                  Direktori Layanan Publik
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('layanan')}
                  className="hover:text-emerald-800 transition-colors cursor-pointer text-left"
                >
                  Kanal Pengaduan SP4N
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('beranda')}
                  className="hover:text-emerald-800 transition-colors cursor-pointer text-left"
                >
                  Tentang & Kebijakan
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: OPD Pemkab Sidoarjo (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h5 className="font-display font-bold text-sm text-[#15211C]">
              OPD Pemkab Sidoarjo
            </h5>
            <ul className="space-y-2 text-xs sm:text-sm text-[#5A6862]">
              <li className="hover:text-emerald-800 transition-colors cursor-pointer">
                Dinas Komunikasi & Informatika Sidoarjo
              </li>
              <li className="hover:text-emerald-800 transition-colors cursor-pointer">
                Dinas Kependudukan & Pencatatan Sipil Sidoarjo
              </li>
              <li className="hover:text-emerald-800 transition-colors cursor-pointer">
                Bappeda Kabupaten Sidoarjo
              </li>
              <li className="hover:text-emerald-800 transition-colors cursor-pointer">
                Inspektorat Kabupaten Sidoarjo
              </li>
              <li className="hover:text-emerald-800 transition-colors cursor-pointer">
                Satu Data Kabupaten Sidoarjo
              </li>
            </ul>
          </div>

          {/* Col 4: Langganan Pembaruan (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h5 className="font-display font-bold text-sm text-[#15211C]">
              Langganan Pembaruan
            </h5>
            <p className="text-xs sm:text-sm text-[#5A6862] leading-relaxed">
              Dapatkan notifikasi resmi regulasi, keterbukaan anggaran, dan perilisan layanan publik digital.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2 pt-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan alamat email"
                required
                className="w-full px-3.5 py-2.5 bg-white text-slate-800 text-xs sm:text-sm rounded-lg border border-slate-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition-all placeholder:text-slate-400"
              />
              <button
                type="submit"
                className="w-full py-2.5 bg-[#038D66] hover:bg-[#026E4F] text-white font-semibold text-xs sm:text-sm rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span>Berlangganan Data</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            {subscribed && (
              <div className="flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-100 p-2 rounded-lg font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>Terima kasih! Email Anda telah terdaftar untuk rilis resmi.</span>
              </div>
            )}
          </div>

        </div>

        {/* Sub-footer Legal Bar */}
        <div className="pt-8 border-t border-emerald-900/15 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#5A6862]">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Sertifikasi ISO 27001:2022</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Kepatuhan BSSN & PDP</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-emerald-700" />
              <span>Undang-Undang KIP No. 14/2008</span>
            </div>
          </div>

          <div className="text-center md:text-right font-medium">
            © 2025 Pemerintah Kabupaten Sidoarjo. Seluruh Hak Cipta Dilindungi.
          </div>
        </div>

      </div>
    </footer>
  );
};
