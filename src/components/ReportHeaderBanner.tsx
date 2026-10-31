import React, { useState } from 'react';
import { Printer, Share2, Check, CheckCircle2 } from 'lucide-react';

interface ReportHeaderBannerProps {
  id: string;
  statusBadge: string;
  onPrint: () => void;
}

export const ReportHeaderBanner: React.FC<ReportHeaderBannerProps> = ({
  id,
  statusBadge,
  onPrint,
}) => {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        
        {/* Left Badges & Title */}
        <div className="space-y-2.5">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-md bg-[#E9F7EE] text-[#083C2E] font-mono text-xs font-bold border border-emerald-200/80">
              ID: {id}
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF3C7] text-[#92400E] border border-amber-200 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span>{statusBadge}</span>
            </span>
          </div>

          <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#15211C] tracking-tight">
            Detail Status Laporan Warga
          </h1>

          <p className="text-xs sm:text-sm text-[#5A6862] max-w-2xl">
            Pantau perkembangan dan tindak lanjut penanganan laporan secara transparan.
          </p>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2.5 self-start lg:self-center shrink-0">
          <button
            onClick={onPrint}
            className="px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold rounded-xl border border-slate-300 transition-colors flex items-center gap-2 cursor-pointer shadow-2xs"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>Cetak Dokumen Tiket</span>
          </button>

          <button
            onClick={handleShare}
            className="px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold rounded-xl border border-slate-300 transition-colors flex items-center gap-2 cursor-pointer shadow-2xs"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 font-bold">Tautan Disalin!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-slate-500" />
                <span>Bagikan Tautan</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
