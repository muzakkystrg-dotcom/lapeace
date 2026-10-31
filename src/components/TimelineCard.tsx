import React from 'react';
import { TrendingUp, CheckCircle2, Clock, Building2, FileCheck2, UserCheck, ShieldCheck } from 'lucide-react';
import { TimelineDetailStep } from '../types/reportDetail';

interface TimelineCardProps {
  timeline: TimelineDetailStep[];
}

export const TimelineCard: React.FC<TimelineCardProps> = ({ timeline }) => {
  return (
    <div className="bg-white rounded-2xl p-6 sm:p-7 border border-emerald-100/90 shadow-sm space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#EFFDF4] border border-emerald-200/80 text-emerald-800 flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5 text-emerald-700" />
          </div>
          <div>
            <h2 className="font-display font-bold text-lg text-[#15211C]">
              Riwayat Penanganan Laporan
            </h2>
            <p className="text-xs text-[#5A6862]">
              Jejak audit resmi sistem keterbukaan publik
            </p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold shrink-0">
          Diperbarui 10 Menit yang Lalu
        </span>
      </div>

      {/* Stepper Content */}
      <div className="relative pl-8 space-y-7 before:absolute before:left-3.5 before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-200">
        {timeline.map((step) => {
          const isDone = step.status === 'completed';
          const isCurrent = step.status === 'in_progress';

          return (
            <div key={step.stepNumber} className="relative">
              {/* Node Icon */}
              <div
                className={`absolute -left-8 top-0.5 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  isDone
                    ? 'bg-emerald-600 text-white ring-4 ring-emerald-50'
                    : isCurrent
                    ? 'bg-amber-500 text-white ring-4 ring-amber-50 animate-pulse'
                    : 'bg-slate-200 text-slate-500'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : isCurrent ? (
                  <Clock className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  step.stepNumber
                )}
              </div>

              {/* Step Body */}
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <h3 className={`font-display font-bold text-sm ${isDone || isCurrent ? 'text-slate-900' : 'text-slate-500'}`}>
                      {step.title}
                    </h3>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        step.badgeType === 'success'
                          ? 'bg-emerald-100 text-emerald-900'
                          : step.badgeType === 'warning'
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {step.badgeText}
                    </span>
                  </div>

                  <span className="text-xs text-slate-400 font-mono">
                    {step.timestamp}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {step.description}
                </p>

                {/* Specific Notes */}
                {step.authNote && (
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-800 bg-emerald-50/60 p-2 rounded-lg font-medium mt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{step.authNote}</span>
                  </div>
                )}

                {step.verifier && (
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100 mt-1">
                    <UserCheck className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>Verifikator: <strong>{step.verifier}</strong></span>
                  </div>
                )}

                {step.dispositionInfo && (
                  <div className="flex flex-wrap items-center gap-3 text-xs text-emerald-950 bg-emerald-50/90 border border-emerald-200/80 p-2.5 rounded-xl font-medium mt-1.5">
                    <div className="flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-emerald-700" />
                      <span>{step.dispositionInfo.agency}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1 font-mono text-[11px] text-emerald-900">
                      <FileCheck2 className="w-3.5 h-3.5" />
                      <span>No. Disposisi: {step.dispositionInfo.dispositionNo}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
