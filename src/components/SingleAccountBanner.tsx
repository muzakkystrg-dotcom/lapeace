import React from 'react';
import { Zap, ArrowRight, HelpCircle } from 'lucide-react';

interface SingleAccountBannerProps {
  onOpenRegister: () => void;
  onOpenGuide: () => void;
}

export const SingleAccountBanner: React.FC<SingleAccountBannerProps> = ({
  onOpenRegister,
  onOpenGuide,
}) => {
  return (
    <section className="py-12 sm:py-16 bg-[#F8FAF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#083C2E] via-[#064233] to-[#04281E] p-8 sm:p-12 lg:p-14 text-white overflow-hidden shadow-xl border border-emerald-800/40">
          
          {/* Subtle civic watermark silhouette of government building / columns */}
          <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-10 pointer-events-none hidden md:flex items-center justify-end pr-10">
            <svg
              className="w-80 h-80 text-emerald-300"
              viewBox="0 0 200 200"
              fill="currentColor"
            >
              {/* Classical government pediment & pillars */}
              <polygon points="100,20 20,65 180,65" />
              <rect x="25" y="68" width="150" height="10" />
              <rect x="35" y="82" width="16" height="85" rx="3" />
              <rect x="65" y="82" width="16" height="85" rx="3" />
              <rect x="95" y="82" width="16" height="85" rx="3" />
              <rect x="125" y="82" width="16" height="85" rx="3" />
              <rect x="155" y="82" width="16" height="85" rx="3" />
              <rect x="20" y="170" width="160" height="14" />
            </svg>
          </div>

          <div className="relative z-10 max-w-2xl">
            {/* Pill */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-600/50 text-emerald-200 text-xs font-semibold tracking-wider mb-4">
              <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>SATU AKUN WARGA</span>
            </div>

            {/* Headline */}
            <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug">
              Akses Layanan Sidoarjo dalam Satu Akun
            </h3>

            {/* Description */}
            <p className="mt-3 text-sm sm:text-base text-emerald-100/80 leading-relaxed max-w-xl">
              Nikmati kemudahan urus dokumen, pantau anggaran, dan sampaikan aspirasi kapan saja tanpa perlu mendaftar ulang di tiap aplikasi dinas.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenRegister}
                className="px-6 py-3.5 bg-[#E2B714] hover:bg-[#d0a70e] text-[#15211C] font-bold text-sm sm:text-base rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-98"
              >
                <span>Daftar Akun Warga</span>
                <ArrowRight className="w-4 h-4 text-[#15211C]" />
              </button>

              <button
                onClick={onOpenGuide}
                className="px-5 py-3.5 bg-emerald-900/60 hover:bg-emerald-900/90 text-white font-medium text-sm sm:text-base rounded-xl border border-emerald-700/60 transition-all flex items-center gap-2 cursor-pointer active:scale-98"
              >
                <span>Panduan Layanan</span>
                <HelpCircle className="w-4 h-4 text-emerald-300" />
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};
