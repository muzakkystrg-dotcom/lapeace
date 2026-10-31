import React from 'react';
import { ArrowLeft, Download, PlusCircle } from 'lucide-react';

interface ActionSidebarProps {
  onBackToReports: () => void;
  onDownloadPdf: () => void;
  onCreateNewReport: () => void;
}

export const ActionSidebar: React.FC<ActionSidebarProps> = ({
  onBackToReports,
  onDownloadPdf,
  onCreateNewReport,
}) => {
  return (
    <div className="space-y-3">
      {/* Primary Back Button */}
      <button
        onClick={onBackToReports}
        className="w-full py-3 bg-[#083C2E] hover:bg-[#05241B] text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-98"
      >
        <ArrowLeft className="w-4 h-4 text-emerald-300" />
        <span>Kembali ke Daftar Laporan</span>
      </button>

      {/* Secondary Download Button */}
      <button
        onClick={onDownloadPdf}
        className="w-full py-2.5 bg-white hover:bg-emerald-50 text-emerald-950 font-semibold text-xs sm:text-sm rounded-xl border border-emerald-300 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
      >
        <Download className="w-4 h-4 text-emerald-700" />
        <span>Unduh Bukti Laporan (PDF)</span>
      </button>

      {/* Link to Report New Issue */}
      <div className="pt-1 text-center">
        <button
          onClick={onCreateNewReport}
          className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <PlusCircle className="w-3.5 h-3.5 text-emerald-600" />
          <span>Punya kendala lain? Laporkan Masalah Baru</span>
        </button>
      </div>
    </div>
  );
};
