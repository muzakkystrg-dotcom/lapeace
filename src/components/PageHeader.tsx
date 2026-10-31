import React from 'react';
import { ChevronRight, Send, Clock, ShieldCheck, Users, Shield, CheckCircle2 } from 'lucide-react';

interface PageHeaderProps {
  onNavigateHome: () => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ onNavigateHome }) => {
  return (
    <section className="bg-gradient-to-b from-[#083C2E] to-[#0a4837] text-white pt-6 pb-12 sm:pt-8 sm:pb-16 border-b border-emerald-900/60 relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-emerald-200/80 mb-5">
          <button
            onClick={onNavigateHome}
            className="hover:text-white transition-colors cursor-pointer flex items-center gap-1 font-medium"
          >
            <span>Beranda</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-emerald-400/60" />
          <span className="text-white font-semibold">Laporan Warga</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Title & Value Props */}
          <div className="lg:col-span-8 space-y-4">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-600/50 text-emerald-200 text-xs font-semibold tracking-wide">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Pengaduan Warga SITAPAK</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Sampaikan Laporan & Aspirasi
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-emerald-100/85 max-w-2xl leading-relaxed">
              Lapor kendala fasilitas & layanan publik di Sidoarjo secara cepat dan transparan.
            </p>

            {/* 3 Value Pillars */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#05241B]/70 border border-emerald-800/80 text-xs sm:text-sm font-medium text-emerald-100">
                <Send className="w-4 h-4 text-emerald-400" />
                <span>Langsung ke OPD</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#05241B]/70 border border-emerald-800/80 text-xs sm:text-sm font-medium text-emerald-100">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>Respon 2×24 Jam</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#05241B]/70 border border-emerald-800/80 text-xs sm:text-sm font-medium text-emerald-100">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>Bisa Anonim</span>
              </div>
            </div>
          </div>

          {/* Right Widget: Partisipasi Warga */}
          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <div className="w-full sm:w-auto min-w-[280px] bg-[#05241B]/85 backdrop-blur-md rounded-2xl p-5 border border-emerald-700/40 shadow-xl flex flex-col justify-between">
              <div className="flex items-center gap-3.5 mb-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 shrink-0">
                  <Users className="w-6 h-6 text-emerald-300" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-white leading-tight">
                    Partisipasi Warga
                  </h3>
                  <p className="text-xs text-emerald-200/80 mt-0.5 leading-snug">
                    <strong className="text-emerald-300 font-bold">98,4%</strong> aduan tahun ini selesai ditangani.
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-emerald-900/80 flex items-center justify-between text-xs text-emerald-300/80 font-medium">
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-100/70">Server:</span>
                  <span className="text-white font-semibold">Aktif</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-800 text-[11px] text-emerald-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Siaga</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
