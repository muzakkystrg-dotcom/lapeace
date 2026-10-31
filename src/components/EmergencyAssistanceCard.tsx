import React from 'react';
import { Headphones, PhoneCall } from 'lucide-react';

export const EmergencyAssistanceCard: React.FC = () => {
  return (
    <div className="bg-[#EFFDF4] rounded-2xl p-4 sm:p-5 border border-emerald-200/80 flex items-center justify-between gap-3 shadow-2xs">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-amber-100/90 text-amber-800 flex items-center justify-center shrink-0">
          <Headphones className="w-5 h-5 text-amber-700" />
        </div>
        <div>
          <div className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
            Butuh Bantuan Mendesak?
          </div>
          <div className="text-[11px] sm:text-xs text-slate-600 mt-0.5">
            Hubungi Layanan Darurat Terpadu <strong className="text-red-700">112</strong>
          </div>
        </div>
      </div>

      <a
        href="tel:112"
        className="px-3 py-1.5 rounded-lg bg-white border border-emerald-300 text-emerald-900 text-xs font-bold hover:bg-emerald-50 transition-colors shrink-0 shadow-2xs"
      >
        Bebas Pulsa
      </a>
    </div>
  );
};
