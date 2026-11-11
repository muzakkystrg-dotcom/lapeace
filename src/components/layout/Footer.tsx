import React, { useState } from 'react';

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
    <footer className="w-full bg-[#ddece3] text-[#121e19] shadow-[0_-1px_6px_rgba(0,0,0,0.03)] border-t border-[#c0c8c3]/40">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          
          {/* Col 1 & 2: Brand, Address & Emergency Services (lg:col-span-2) */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[28px] text-[#006c4d]">
                account_balance
              </span>
              <span className="font-display font-bold text-lg text-[#00251b]">
                Pemerintah Kabupaten Sidoarjo - SITAPAK
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-[#404945] max-w-sm leading-relaxed">
              Pusat Pelayanan Terpadu &amp; Call Center 112 Sidoarjo, Jl. Gubernur Suryo No. 1, Sidoarjo, Jawa Timur. Menjamin transparansi anggaran dan kepastian pelayanan publik warga Sidoarjo.
            </p>

            <div className="mt-2 flex flex-col gap-1">
              <span className="text-xs text-[#00251b] font-bold uppercase tracking-wider">
                Pusat Bantuan &amp; Tanggap Darurat
              </span>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <a
                  href="tel:112"
                  className="flex items-center gap-2 bg-[#ffffff] px-3 py-1.5 rounded-lg shadow-xs border border-red-200/60 hover:bg-red-50/50 transition-colors"
                >
                  <span className="material-symbols-outlined text-[#ba1a1a] text-[18px]">
                    emergency
                  </span>
                  <span className="text-xs font-semibold text-[#121e19]">
                    112 Sidoarjo Siaga
                  </span>
                </a>
                <a
                  href="tel:110"
                  className="flex items-center gap-2 bg-[#ffffff] px-3 py-1.5 rounded-lg shadow-xs border border-emerald-200/60 hover:bg-emerald-50/50 transition-colors"
                >
                  <span className="material-symbols-outlined text-[#006c4d] text-[18px]">
                    local_police
                  </span>
                  <span className="text-xs font-semibold text-[#121e19]">
                    110 Polresta Sidoarjo
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Peta Situs */}
          <div className="flex flex-col gap-3">
            <span className="font-display font-bold text-sm sm:text-base text-[#00251b]">
              Peta Situs
            </span>
            <ul className="flex flex-col gap-2 text-xs sm:text-sm text-[#404945]">
              <li>
                <a
                  className="hover:text-[#006c4d] transition-colors"
                  data-path="beranda"
                  href="#beranda"
                  onClick={(e) => handleLinkClick(e, 'beranda')}
                >
                  Beranda Utama
                </a>
              </li>
              <li>
                <a
                  className="hover:text-[#006c4d] transition-colors"
                  data-path="data-terbuka"
                  href="#data-publik"
                  onClick={(e) => handleLinkClick(e, 'transparansi')}
                >
                  Katalog Data Terbuka
                </a>
              </li>
              <li>
                <a
                  className="hover:text-[#006c4d] transition-colors"
                  data-path="layanan-publik"
                  href="#layanan"
                  onClick={(e) => handleLinkClick(e, 'layanan')}
                >
                  Direktori Layanan Publik
                </a>
              </li>
              <li>
                <a
                  className="hover:text-[#006c4d] transition-colors"
                  data-path="lapor-aspirasi"
                  href="#laporan-warga"
                  onClick={(e) => handleLinkClick(e, 'laporan')}
                >
                  Kanal Pengaduan SP4N
                </a>
              </li>
              <li>
                <a
                  className="hover:text-[#006c4d] transition-colors"
                  data-path="tentang-kami"
                  href="#tentang-kami"
                  onClick={(e) => handleLinkClick(e, 'tentang')}
                >
                  Tentang &amp; Kebijakan
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: OPD Pemkab Sidoarjo */}
          <div className="flex flex-col gap-3">
            <span className="font-display font-bold text-sm sm:text-base text-[#00251b]">
              OPD Pemkab Sidoarjo
            </span>
            <ul className="flex flex-col gap-2 text-xs sm:text-sm text-[#404945]">
              <li>
                <a className="hover:text-[#006c4d] transition-colors" href="https://diskominfo.sidoarjokab.go.id" target="_blank" rel="noreferrer">
                  Dinas Komunikasi &amp; Informatika Sidoarjo
                </a>
              </li>
              <li>
                <a className="hover:text-[#006c4d] transition-colors" href="https://dukcapil.sidoarjokab.go.id" target="_blank" rel="noreferrer">
                  Dinas Kependudukan &amp; Pencatatan Sipil Sidoarjo
                </a>
              </li>
              <li>
                <a className="hover:text-[#006c4d] transition-colors" href="https://bappeda.sidoarjokab.go.id" target="_blank" rel="noreferrer">
                  Bappeda Kabupaten Sidoarjo
                </a>
              </li>
              <li>
                <a className="hover:text-[#006c4d] transition-colors" href="https://inspektorat.sidoarjokab.go.id" target="_blank" rel="noreferrer">
                  Inspektorat Kabupaten Sidoarjo
                </a>
              </li>
              <li>
                <a className="hover:text-[#006c4d] transition-colors" href="https://satudata.sidoarjokab.go.id" target="_blank" rel="noreferrer">
                  Satu Data Kabupaten Sidoarjo
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Langganan Pembaruan */}
          <div className="flex flex-col gap-3">
            <span className="font-display font-bold text-sm sm:text-base text-[#00251b]">
              Langganan Pembaruan
            </span>
            <p className="text-xs sm:text-sm text-[#404945] leading-relaxed">
              Dapatkan notifikasi resmi regulasi, keterbukaan anggaran, dan perilisan layanan publik digital.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2 mt-1">
              <input
                className="h-10 px-3.5 rounded-lg bg-[#ffffff] text-xs sm:text-sm text-[#121e19] placeholder:text-[#717974] focus:outline-none focus:ring-2 focus:ring-[#006c4d] shadow-[0_1px_4px_rgba(0,0,0,0.04)] border border-[#c0c8c3]/50"
                placeholder="Masukkan alamat email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                className="h-10 rounded-lg bg-[#006c4d] text-white text-xs sm:text-sm font-semibold hover:bg-[#005139] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-98"
                type="submit"
              >
                <span>{subscribed ? 'Terima Kasih!' : 'Berlangganan Data'}</span>
                <span className="material-symbols-outlined text-[16px]">send</span>
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Trust & Legal Badges */}
        <div className="pt-6 border-t border-[#c0c8c3]/40 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5 text-[#404945] text-xs bg-[#ffffff] px-2.5 py-1 rounded-md shadow-2xs border border-[#c0c8c3]/30">
              <span className="material-symbols-outlined text-[#006c4d] text-[16px]">security</span>
              <span>Sertifikasi ISO 27001:2022</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#404945] text-xs bg-[#ffffff] px-2.5 py-1 rounded-md shadow-2xs border border-[#c0c8c3]/30">
              <span className="material-symbols-outlined text-[#006c4d] text-[16px]">verified_user</span>
              <span>Kepatuhan BSSN &amp; PDP</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#404945] text-xs bg-[#ffffff] px-2.5 py-1 rounded-md shadow-2xs border border-[#c0c8c3]/30">
              <span className="material-symbols-outlined text-[#735c00] text-[16px]">gavel</span>
              <span>Undang-Undang KIP No. 14/2008</span>
            </div>
          </div>

          <p className="text-xs text-[#404945] text-center md:text-right font-medium">
            &copy; 2025 Pemerintah Kabupaten Sidoarjo. Seluruh Hak Cipta Dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
