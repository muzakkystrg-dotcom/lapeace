import React from 'react';
import { Check, Lock, ShieldCheck } from 'lucide-react';

export const SuccessHeroBanner: React.FC = () => {
  return (
    <div className="text-center max-w-3xl mx-auto pt-6 pb-10 sm:pt-8 sm:pb-12 px-4">
      {/* Big Animated Circular Checkmark */}
      <div className="relative mx-auto w-24 h-24 rounded-full bg-[#EFFDF4] border-8 border-emerald-100/90 flex items-center justify-center mb-6 shadow-sm">
        <div className="w-14 h-14 rounded-full bg-[#038D66] flex items-center justify-center text-white shadow-md">
          <Check className="w-7 h-7 stroke-[3]" />
        </div>
      </div>

      {/* Main Heading */}
      <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#15211C] tracking-tight">
        Laporan Berhasil Dikirim!
      </h1>

      {/* Subheading */}
      <p className="mt-3 text-sm sm:text-base text-[#5A6862] leading-relaxed max-w-2xl mx-auto">
        Terima kasih atas partisipasi aktif Anda. Pengaduan telah kami terima dalam pangkalan data terpusat dan akan segera ditinjau oleh tim verifikator dinas terkait.
      </p>

      {/* Security Badges */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">
          <Lock className="w-3.5 h-3.5 text-slate-500" />
          <span>Terkirim ke Sistem Terpadu Pengaduan Warga</span>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Dijamin Rahasia & Terenkripsi</span>
        </div>
      </div>
    </div>
  );
};
