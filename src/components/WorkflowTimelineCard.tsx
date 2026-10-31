import React from 'react';
import { Landmark, Clock } from 'lucide-react';
import { TimelineStep } from '../types/ticket';

interface WorkflowTimelineCardProps {
  steps: TimelineStep[];
  averageResponseTime: string;
  resolutionRate: string;
}

export const WorkflowTimelineCard: React.FC<WorkflowTimelineCardProps> = ({
  steps,
  averageResponseTime,
  resolutionRate,
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 sm:p-7 border border-emerald-100/90 shadow-sm space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h2 className="font-display font-bold text-lg text-[#15211C]">
            Alur Penanganan Laporan
          </h2>
          <p className="text-xs text-[#5A6862]">
            Estimasi SLA Penyelesaian Dinas Teknis
          </p>
        </div>
        <span className="px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-900 text-xs font-bold">
          Tahap 1 / 3
        </span>
      </div>

      {/* Stepper Steps */}
      <div className="relative pl-8 space-y-6 before:absolute before:left-3.5 before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-200">
        {steps.map((st) => (
          <div key={st.stepNumber} className="relative">
            {/* Step Icon / Number Indicator */}
            <div
              className={`absolute -left-8 top-0.5 w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                st.status === 'active'
                  ? 'bg-[#083C2E] text-white ring-4 ring-emerald-100'
                  : 'bg-slate-100 text-slate-500 border border-slate-300'
              }`}
            >
              {st.status === 'active' ? (
                <Landmark className="w-3.5 h-3.5 text-emerald-300" />
              ) : (
                st.stepNumber
              )}
            </div>

            {/* Step Content */}
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    st.status === 'active'
                      ? 'bg-emerald-100 text-emerald-900'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {st.phaseLabel}
                </span>

                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200/80">
                  {st.slaBadge}
                </span>
              </div>

              <h3 className={`font-display font-bold text-sm ${st.status === 'active' ? 'text-slate-900' : 'text-slate-700'}`}>
                {st.title}
              </h3>

              <p className="text-xs text-slate-500 leading-relaxed">
                {st.description}
              </p>

              {st.deadlineNotice && (
                <div className="inline-flex items-center gap-1.5 text-[11px] text-emerald-800 bg-emerald-50/70 px-2.5 py-1 rounded-md font-medium mt-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{st.deadlineNotice}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* KPI Performance Tiles */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 text-center">
          <div className="text-[11px] text-slate-500 font-medium">Rata-rata Respon</div>
          <div className="font-display font-extrabold text-xl text-slate-900 mt-0.5">
            {averageResponseTime}
          </div>
        </div>

        <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 text-center">
          <div className="text-[11px] text-slate-500 font-medium">Tingkat Penuntasan</div>
          <div className="font-display font-extrabold text-xl text-emerald-800 mt-0.5">
            {resolutionRate}
          </div>
        </div>
      </div>

    </div>
  );
};
