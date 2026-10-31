import React, { useState } from 'react';
import { Info, Copy, Check, CheckCircle2, AlertTriangle, Smartphone } from 'lucide-react';

interface ReportSummaryCardProps {
  reportId: string;
  title: string;
  category: string;
  urgencyLevel: string;
  reporterIdentity: string;
  reportingChannel: string;
}

export const ReportSummaryCard: React.FC<ReportSummaryCardProps> = ({
  reportId,
  title,
  category,
  urgencyLevel,
  reporterIdentity,
  reportingChannel,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(reportId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-emerald-100/90 shadow-sm space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 className="font-display font-bold text-base text-[#15211C]">
          Informasi Laporan
        </h3>
        <Info className="w-4 h-4 text-emerald-700" />
      </div>

      {/* Ticket ID with Copy */}
      <div>
        <div className="text-[10px] uppercase font-bold text-slate-400">
          NOMOR LAPORAN
        </div>
        <div className="flex items-center justify-between mt-1 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
          <span className="font-mono font-extrabold text-sm sm:text-base text-slate-900">
            {reportId}
          </span>
          <button
            onClick={handleCopy}
            className="px-2.5 py-1 text-xs font-semibold text-slate-700 hover:text-emerald-800 bg-white hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors flex items-center gap-1 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-600" />
                <span className="text-emerald-700">Salin</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 text-slate-400" />
                <span>Salin</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Judul */}
      <div>
        <div className="text-[10px] uppercase font-bold text-slate-400">
          JUDUL LAPORAN
        </div>
        <div className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">
          {title}
        </div>
      </div>

      {/* Kategori Layanan */}
      <div>
        <div className="text-[10px] uppercase font-bold text-slate-400">
          KATEGORI LAYANAN
        </div>
        <div className="text-xs text-slate-700 mt-0.5">
          {category}
        </div>
      </div>

      {/* Tingkat Urgensi */}
      <div>
        <div className="text-[10px] uppercase font-bold text-slate-400">
          TINGKAT URGENSI
        </div>
        <div className="text-xs font-semibold text-amber-800 flex items-center gap-1.5 mt-0.5">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span>{urgencyLevel}</span>
        </div>
      </div>

      {/* Identitas Pelapor */}
      <div>
        <div className="text-[10px] uppercase font-bold text-slate-400">
          IDENTITAS PELAPOR
        </div>
        <div className="text-xs text-slate-800 mt-0.5">
          <div className="flex items-center gap-1.5 font-semibold">
            <span>Budi Santoso</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="text-[11px] text-slate-400 italic mt-0.5">
            Anonimitas Publik: Nama disamarkan untuk umum
          </div>
        </div>
      </div>

      {/* Saluran Pelaporan */}
      <div className="pt-1">
        <div className="text-[10px] uppercase font-bold text-slate-400">
          SALURAN PELAPORAN
        </div>
        <div className="text-xs text-slate-700 flex items-center gap-1.5 mt-0.5">
          <Smartphone className="w-3.5 h-3.5 text-emerald-700" />
          <span>{reportingChannel}</span>
        </div>
      </div>

    </div>
  );
};
