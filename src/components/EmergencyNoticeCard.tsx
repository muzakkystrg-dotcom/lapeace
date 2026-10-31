import React from 'react';
import { Headphones, Phone, MessageSquare } from 'lucide-react';

export const EmergencyNoticeCard: React.FC = () => {
  return (
    <div className="bg-[#EFFDF4] rounded-2xl p-5 border border-emerald-200/80 space-y-3.5 shadow-2xs">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0">
          <Headphones className="w-4 h-4 text-emerald-700" />
        </div>
        <div>
          <h4 className="font-display font-bold text-xs sm:text-sm text-slate-900 leading-tight">
            Butuh Klarifikasi Tambahan?
          </h4>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Layanan tanggap darurat dan klarifikasi siaga 24 jam.
          </p>
        </div>
      </div>

      <div className="space-y-2 pt-1">
        {/* 112 */}
        <a
          href="tel:112"
          className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-red-200 hover:bg-red-50 text-red-950 text-xs font-semibold transition-colors group"
        >
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-red-600 animate-pulse" />
            <span>Call Center 112</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-md bg-red-100 text-red-800 font-bold">
            Bebas Pulsa
          </span>
        </a>

        {/* SP4N-LAPOR */}
        <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200 text-slate-800 text-xs font-semibold">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
            <span>SP4N-LAPOR! Sidoarjo</span>
          </div>
          <span className="text-[11px] font-mono font-bold text-emerald-900">
            SMS 1708
          </span>
        </div>
      </div>
    </div>
  );
};
