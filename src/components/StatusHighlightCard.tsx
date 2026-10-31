import React from 'react';
import { FileCheck, Clock, Calendar } from 'lucide-react';

interface StatusHighlightCardProps {
  title: string;
  subtext: string;
  slaTarget: string;
  estimatedFinish: string;
}

export const StatusHighlightCard: React.FC<StatusHighlightCardProps> = ({
  title,
  subtext,
  slaTarget,
  estimatedFinish,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
      <div className="bg-[#064E3B] text-white rounded-2xl p-5 sm:p-6 border border-emerald-700/60 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        {/* Left Section */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 shrink-0">
            <FileCheck className="w-6 h-6 text-emerald-300" />
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <h2 className="font-display font-bold text-base sm:text-lg text-white">
                {title}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-[#FEF3C7] text-[#92400E] text-[11px] font-bold">
                Fase Tindak Lanjut
              </span>
            </div>
            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
              {subtext}
            </p>
          </div>
        </div>

        {/* Right SLA Details */}
        <div className="flex items-center gap-6 self-start md:self-auto border-t md:border-t-0 md:border-l border-emerald-700/60 pt-4 md:pt-0 md:pl-6 shrink-0">
          <div>
            <div className="text-[11px] uppercase font-bold text-emerald-300/80 tracking-wider">
              TARGET WAKTU SLA
            </div>
            <div className="font-display font-extrabold text-base sm:text-lg text-white mt-0.5">
              {slaTarget}
            </div>
          </div>

          <div>
            <div className="text-[11px] uppercase font-bold text-emerald-300/80 tracking-wider">
              PERKIRAAN TUNTAS
            </div>
            <div className="font-display font-bold text-sm sm:text-base text-emerald-200 mt-0.5">
              {estimatedFinish}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
