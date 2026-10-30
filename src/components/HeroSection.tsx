import React from 'react';
import { ArrowRight, Search, ShieldCheck, Users, Star, CheckCircle2 } from 'lucide-react';

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
      {/* Subtle architectural background watermark grid */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#083C2E 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            
            {/* Official Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200/80 text-emerald-900 text-xs sm:text-sm font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>PORTAL RESMI PEMKAB SIDOARJO</span>
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
                <span>Diskominfo & BSSN</span>
              </div>
              <span className="hidden sm:inline text-slate-300">•</span>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-700" />
                <span>18 Kecamatan Terpadu</span>
              </div>
            </div>
          </div>

          {/* Right Hero Column: Visual Representation with Floating Badges */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl overflow-hidden shadow-xl border border-emerald-950/10 bg-slate-100 group">
              
              {/* Civic Hall Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-200">
                <img
                  src="/src/assets/images/sidoarjo_civic_center_1793361616866.jpg"
                  alt="Kantor Bupati & Kompleks Pelayanan Terpadu Kabupaten Sidoarjo"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                  loading="eager"
                  onError={(e) => {
                    // Fallback visual if image fails
                    const target = e.currentTarget;
                    target.style.display = 'none';
                  }}
                />
                
                {/* Fallback pattern overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />
              </div>

              {/* Top Floating Badge */}
              <div className="absolute top-4 left-4 sm:top-5 sm:left-5 bg-white/95 backdrop-blur-md rounded-xl p-3 sm:p-3.5 shadow-lg border border-slate-200/90 flex items-center gap-3 max-w-[280px]">
                <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                </div>
                <div>
                  <div className="text-[11px] font-medium text-slate-500 leading-tight">
                    Indeks Transparansi Pemkab Sidoarjo
                  </div>
                  <div className="text-sm sm:text-base font-bold text-slate-900 font-display">
                    96.2% <span className="text-emerald-700 font-semibold text-xs">(Sangat Baik)</span>
                  </div>
                </div>
              </div>

              {/* Bottom Floating Badge */}
              <div className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 bg-white/95 backdrop-blur-md rounded-xl p-3 sm:p-3.5 shadow-lg border border-slate-200/90 flex items-center gap-3 max-w-[290px]">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                  <div className="w-3 h-3 rounded-full bg-emerald-600 animate-ping" />
                </div>
                <div>
                  <div className="text-[11px] font-medium text-slate-500 leading-tight">
                    Status Pelayanan 18 Kecamatan
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-emerald-900 font-display flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Aktif & Terpantau Real-Time</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
