import React from 'react';
import { Search, Home, Printer, ArrowRight } from 'lucide-react';

interface ActionPanelProps {
  onTrackStatus: () => void;
  onNavigateHome: () => void;
  onPrintReport: () => void;
}

export const ActionPanel: React.FC<ActionPanelProps> = ({
  onTrackStatus,
  onNavigateHome,
  onPrintReport,
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-emerald-100/90 shadow-sm space-y-3">
      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
        TINDAKAN SELANJUTNYA
      </div>

      {/* Primary: Pantau Status */}
      <button
        onClick={onTrackStatus}
        className="w-full py-3.5 bg-[#083C2E] hover:bg-[#05241B] text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-98"
      >
        <Search className="w-4 h-4 text-emerald-300" />
        <span>Pantau Status Laporan</span>
        <ArrowRight className="w-4 h-4 ml-1" />
      </button>

      {/* Secondary: Kembali ke Beranda */}
      <button
        onClick={onNavigateHome}
        className="w-full py-3 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm rounded-xl border border-slate-300 transition-colors flex items-center justify-center gap-2 cursor-pointer active:scale-98"
      >
        <Home className="w-4 h-4 text-slate-500" />
        <span>Kembali ke Beranda</span>
      </button>

      {/* Tertiary: Cetak Bukti Laporan */}
      <div className="pt-2 text-center">
        <button
          onClick={onPrintReport}
          className="text-xs font-semibold text-slate-600 hover:text-emerald-900 inline-flex items-center gap-1.5 transition-colors cursor-pointer py-1"
        >
          <Printer className="w-4 h-4 text-slate-500" />
          <span>Cetak Bukti Laporan (PDF / Fisik)</span>
        </button>
      </div>
    </div>
  );
};
