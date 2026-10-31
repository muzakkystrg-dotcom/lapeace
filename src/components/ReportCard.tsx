import React from 'react';
import { Lightbulb, Trash2, Construction, Calendar, MapPin, ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import { ReportItem } from '../types/report';

interface ReportCardProps {
  report: ReportItem;
  onViewDetail: (report: ReportItem) => void;
}

export const ReportCard: React.FC<ReportCardProps> = ({ report, onViewDetail }) => {
  const getCategoryIcon = (key: string) => {
    switch (key) {
      case 'pju':
        return <Lightbulb className="w-3.5 h-3.5 text-blue-600" />;
      case 'sampah':
        return <Trash2 className="w-3.5 h-3.5 text-emerald-600" />;
      case 'jalan':
      default:
        return <Construction className="w-3.5 h-3.5 text-amber-600" />;
    }
  };

  const getStatusBadge = (code: string, label: string) => {
    switch (code) {
      case 'menunggu':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-sky-50 text-sky-800 border border-sky-200">
            <span className="w-2 h-2 rounded-full bg-sky-500" />
            <span>{label}</span>
          </span>
        );
      case 'diproses':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-teal-50 text-teal-800 border border-teal-200">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
            <span>{label}</span>
          </span>
        );
      case 'selesai':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            <span>{label}</span>
          </span>
        );
    }
  };

  const getProgressBarColor = (code: string) => {
    switch (code) {
      case 'menunggu':
        return 'bg-sky-500';
      case 'diproses':
        return 'bg-[#038D66]';
      case 'selesai':
      default:
        return 'bg-emerald-600';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-emerald-100/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
      <div>
        {/* Top Header: ID & Status */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-mono font-bold">
            {report.id}
          </span>
          {getStatusBadge(report.statusCode, report.status)}
        </div>

        {/* Category */}
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-2">
          {getCategoryIcon(report.categoryKey)}
          <span className={report.categoryKey === 'pju' ? 'text-blue-800' : report.categoryKey === 'sampah' ? 'text-emerald-800' : 'text-slate-800'}>
            {report.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-base text-slate-900 group-hover:text-emerald-900 transition-colors line-clamp-2 leading-snug mb-3">
          {report.title}
        </h3>

        {/* Meta: Date & Location */}
        <div className="space-y-1.5 text-xs text-slate-500 mb-5">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{report.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="line-clamp-1">{report.location}</span>
          </div>
        </div>

        {/* Step Progress Container */}
        <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80 mb-5">
          <div className="flex items-center justify-between text-xs font-bold mb-1.5">
            <span className="text-slate-700">
              Tahap {report.stepCurrent} dari {report.stepTotal}
            </span>
            <span className={`text-[11px] font-semibold ${report.statusCode === 'selesai' ? 'text-emerald-700' : 'text-slate-600'}`}>
              {report.stepLabel}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mb-2">
            <div
              className={`h-full ${getProgressBarColor(report.statusCode)} rounded-full transition-all duration-500`}
              style={{ width: `${report.progressPercent}%` }}
            />
          </div>

          <div className="text-[11px] text-slate-500 flex items-center gap-1">
            {report.statusCode === 'selesai' ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            ) : (
              <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            )}
            <span className="line-clamp-1">
              {report.timeline.find((t) => t.current)?.notes || report.timeline[report.timeline.length - 1]?.notes || 'Diproses sesuai SOP pelayanan publik.'}
            </span>
          </div>
        </div>
      </div>

      {/* Action CTA */}
      <button
        type="button"
        onClick={() => onViewDetail(report)}
        className="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-950 border border-slate-200 hover:border-emerald-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
      >
        <span>Lihat Detail & Riwayat</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};
