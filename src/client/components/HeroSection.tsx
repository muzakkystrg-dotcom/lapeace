import React from 'react';
import { ArrowRight, Search, ShieldCheck, Users } from 'lucide-react';
import civicHeroImg from '@/assets/images/sidoarjo_civic_center_1793361616866.jpg';

interface HeroSectionProps {
  onExploreServices: () => void;
  onOpenTrackModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreServices,
  onOpenTrackModal,
}) => {
  return (
    <section className="relative pt-10 pb-16 lg:pt-14 lg:pb-20 overflow-hidden bg-gradient-to-b from-[#F2FAF6] to-[#F8FAF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            
            {/* Official Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-100 border border-emerald-200 text-emerald-900 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span>PORTAL LAYANAN PUBLIK KABUPATEN SIDOARJO</span>
            </div>

            {/* Display Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-[#15211C] tracking-tight leading-[1.12] text-balance">
              Layanan & Keterbukaan Publik Sidoarjo.
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-[#5A6862] max-w-2xl leading-relaxed">
              Akses cepat kependudukan, perizinan, transparansi APBD, serta pengaduan warga Sidoarjo dalam satu pintu.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
              <button
                onClick={onExploreServices}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#038D66] hover:bg-[#026E4F] text-white font-semibold text-base rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2.5 cursor-pointer active:scale-98"
              >
                <span>Jelajahi Layanan</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenTrackModal}
                className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-50 text-[#15211C] font-semibold text-base rounded-xl border border-slate-300 hover:border-emerald-600 transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>Lacak Berkas</span>
                <Search className="w-4 h-4 text-emerald-700" />
              </button>
            </div>

            {/* Trust Markers */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-[#5A6862] font-medium border-t border-slate-200/80 w-full">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Diskominfo Sidoarjo</span>
              </div>
              <span className="hidden sm:inline text-slate-300">•</span>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-700" />
                <span>18 Kecamatan Terpadu</span>
              </div>
            </div>
          </div>

          {/* Right Hero Column: Visual Representation with Caption */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-200 rounded-2xl shadow-xl border border-slate-200/80">
                <img
                  src={civicHeroImg}
                  alt="Pusat Pelayanan Terpadu Kabupaten Sidoarjo"
                  className="w-full h-full object-cover rounded-2xl shadow-lg"
                  loading="eager"
                />
              </div>

              {/* Informative Photo Caption */}
              <div className="mt-3 p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
                <span>Kantor Bupati & Mal Pelayanan Publik (MPP) Lingkar Timur</span>
                <span className="font-semibold text-emerald-700">Kabupaten Sidoarjo</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
