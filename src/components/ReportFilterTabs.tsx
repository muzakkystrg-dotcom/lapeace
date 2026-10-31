import React from 'react';
import { ReportStatusCode } from '../types/report';

interface ReportFilterTabsProps {
  activeTab: 'semua' | ReportStatusCode;
  onTabChange: (tab: 'semua' | ReportStatusCode) => void;
  counts: {
    semua: number;
    menunggu: number;
    diproses: number;
    selesai: number;
  };
}

export const ReportFilterTabs: React.FC<ReportFilterTabsProps> = ({
  activeTab,
  onTabChange,
  counts,
}) => {
  const tabs: { id: 'semua' | ReportStatusCode; label: string; count: number }[] = [
    { id: 'semua', label: 'Semua Aduan', count: counts.semua },
    { id: 'menunggu', label: 'Menunggu Verifikasi', count: counts.menunggu },
    { id: 'diproses', label: 'Diproses', count: counts.diproses },
    { id: 'selesai', label: 'Selesai', count: counts.selesai },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-slate-200/80 pb-3">
      {tabs.map((t) => {
        const isActive = activeTab === t.id;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => onTabChange(t.id)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              isActive
                ? 'bg-[#083C2E] text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <span>{t.label}</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                isActive ? 'bg-emerald-700/60 text-white' : 'bg-slate-100 text-slate-500'
              }`}
            >
              {t.count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
