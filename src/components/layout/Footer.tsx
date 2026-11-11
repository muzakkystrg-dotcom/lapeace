import React, { useState } from 'react';
import { Landmark, PhoneCall, Shield, Send, ShieldCheck, CheckCircle2, Scale } from 'lucide-react';

export interface FooterProps {
  onNavigateSection?: (sectionId: string) => void;
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
      setSubscribed(false);
    }, 4000);
  };

  const handleLinkClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    if (onNavigateSection) {
      onNavigateSection(sectionId);
    }
  };

  return (
    <footer className="w-full bg-[#05241B] text-white border-t border-emerald-900/80 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 mb-10 sm:mb-12">
          
          {/* Col 1 & 2: Brand, Address & Emergency Services (lg:col-span-2) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#8af7c9] flex items-center justify-center text-[#002115] shadow-sm">
                <Landmark className="w-5 h-5 text-[#002115]" />
              </div>
              <span className="font-display font-bold text-lg text-white">
                Pemerintah Kabupaten Sidoarjo - SITAPAK
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-emerald-100/70 max-w-sm leading-relaxed">
              Pusat Pelayanan Terpadu &amp; Call Center 112 Sidoarjo, Jl. Gubernur Suryo No. 1, Sidoarjo, Jawa Timur. Menjamin transparansi anggaran dan kepastian pelayanan publik warga Sidoarjo.
            </p>

            <div className="mt-1 flex flex-col gap-2">
              <span className="text-xs text-[#8af7c9] font-bold uppercase tracking-wider">
                Pusat Bantuan &amp; Tanggap Darurat
              </span>
              <div className="flex flex-wrap items-center gap-2.5 mt-0.5">
                <a
                  href="tel:112"
                  className="flex items-center gap-2 bg-red-950/40 hover:bg-red-900/50 px-3 py-1.5 rounded-xl shadow-xs border border-red-500/40 text-red-200 transition-colors"
                >
                  <PhoneCall className="w-4 h-4 text-red-400" />
                  <span className="text-xs font-semibold">
                    112 Sidoarjo Siaga
                  </span>
                </a>
                <a
                  href="tel:110"
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-xl shadow-xs border border-emerald-400/30 text-emerald-200 transition-colors"
                >
                  <Shield className="w-4 h-4 text-[#8af7c9]" />
                  <span className="text-xs font-semibold">
                    110 Polresta Sidoarjo
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Peta Situs */}
          <div className="flex flex-col gap-3">
            <span className="font-display font-bold text-sm sm:text-base text-white">
              Peta Situs
            </span>
            <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-emerald-100/70">
              <li>
                <a
                  className="hover:text-white transition-colors"
                  data-path="beranda"
                  href="#beranda"
                  onClick={(e) => handleLinkClick(e, 'beranda')}
                >
                  Beranda Utama
                </a>
              </li>
              <li>
                <a
                  className="hover:text-white transition-colors"
                  data-path="data-terbuka"
                  href="#data-publik"
                  onClick={(e) => handleLinkClick(e, 'transparansi')}
                >
                  Katalog Data Terbuka
                </a>
              </li>
              <li>
                <a
                  className="hover:text-white transition-colors"
                  data-path="layanan-publik"
                  href="#layanan"
                  onClick={(e) => handleLinkClick(e, 'layanan')}
                >
                  Direktori Layanan Publik
                </a>
              </li>
              <li>
                <a
                  className="hover:text-white transition-colors"
                  data-path="lapor-aspirasi"
                  href="#laporan"
                  onClick={(e) => handleLinkClick(e, 'laporan')}
                >
                  Kanal Pengaduan SP4N
                </a>
              </li>
              <li>
                <a
                  className="hover:text-white transition-colors"
                  data-path="tentang-kami"
                  href="#tentang"
                  onClick={(e) => handleLinkClick(e, 'tentang')}
                >
                  Tentang &amp; Kebijakan
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: OPD Pemkab Sidoarjo */}
          <div className="flex flex-col gap-3">
            <span className="font-display font-bold text-sm sm:text-base text-white">
              OPD Pemkab Sidoarjo
            </span>
            <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-emerald-100/70">
              <li>
                <a className="hover:text-white transition-colors" href="https://diskominfo.sidoarjokab.go.id" target="_blank" rel="noreferrer">
                  Dinas Komunikasi &amp; Informatika
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="https://dukcapil.sidoarjokab.go.id" target="_blank" rel="noreferrer">
                  Dinas Kependudukan &amp; Catatan Sipil
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="https://bappeda.sidoarjokab.go.id" target="_blank" rel="noreferrer">
                  Bappeda Kabupaten Sidoarjo
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="https://inspektorat.sidoarjokab.go.id" target="_blank" rel="noreferrer">
                  Inspektorat Kabupaten Sidoarjo
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="https://satudata.sidoarjokab.go.id" target="_blank" rel="noreferrer">
                  Satu Data Kabupaten Sidoarjo
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Langganan Pembaruan */}
          <div className="flex flex-col gap-3">
            <span className="font-display font-bold text-sm sm:text-base text-white">
              Langganan Pembaruan
            </span>
            <p className="text-xs sm:text-sm text-emerald-100/70 leading-relaxed">
              Dapatkan notifikasi resmi regulasi, keterbukaan anggaran, dan perilisan layanan publik digital.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2 mt-1">
              <input
                className="h-10 px-3.5 rounded-xl bg-white/10 text-xs sm:text-sm text-white placeholder:text-emerald-200/50 focus:outline-none focus:ring-2 focus:ring-[#8af7c9] border border-white/15"
                placeholder="Masukkan alamat email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                className="h-10 rounded-xl bg-[#038D66] hover:bg-[#026E4F] text-white text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm active:scale-98"
                type="submit"
              >
                <span>{subscribed ? 'Terima Kasih!' : 'Berlangganan Data'}</span>
                <Send className="w-3.5 h-3.5 text-white" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Trust & Legal Badges */}
        <div className="pt-6 border-t border-emerald-900/60 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5 text-emerald-200 text-xs bg-white/10 px-2.5 py-1 rounded-lg border border-white/10">
              <ShieldCheck className="w-3.5 h-3.5 text-[#8af7c9]" />
              <span>Sertifikasi ISO 27001:2022</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-200 text-xs bg-white/10 px-2.5 py-1 rounded-lg border border-white/10">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#8af7c9]" />
              <span>Kepatuhan BSSN &amp; PDP</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#FFE087] text-xs bg-white/10 px-2.5 py-1 rounded-lg border border-white/10">
              <Scale className="w-3.5 h-3.5 text-[#FFE087]" />
              <span>Undang-Undang KIP No. 14/2008</span>
            </div>
          </div>

          <p className="text-xs text-emerald-200/60 text-center md:text-right font-medium">
            &copy; 2026 Pemerintah Kabupaten Sidoarjo. Seluruh Hak Cipta Dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
