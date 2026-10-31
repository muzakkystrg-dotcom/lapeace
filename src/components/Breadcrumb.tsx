import React from 'react';
import { Home, ChevronRight } from 'lucide-react';

interface BreadcrumbProps {
  onNavigateHome: () => void;
  onNavigateReports: () => void;
  currentLabel: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  onNavigateHome,
  onNavigateReports,
  currentLabel,
}) => {
  return (
    <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 py-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <button
        onClick={onNavigateHome}
        className="flex items-center gap-1 hover:text-emerald-800 transition-colors cursor-pointer font-medium"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Beranda</span>
      </button>

      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />

      <button
        onClick={onNavigateReports}
        className="hover:text-emerald-800 transition-colors cursor-pointer font-medium"
      >
        Laporan Warga
      </button>

      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />

      <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-900 text-xs font-semibold">
        {currentLabel}
      </span>
    </nav>
  );
};
