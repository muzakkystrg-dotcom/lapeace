import React, { useState } from 'react';
import { Search, Globe, Filter } from 'lucide-react';
import { ReportCard } from './ReportCard';
import { ReportFilterTabs } from './ReportFilterTabs';
import { ReportItem, ReportStatusCode } from '../types/report';

interface PublicTrackingSectionProps {
  reports: ReportItem[];
  onViewDetail: (report: ReportItem) => void;
}

export const PublicTrackingSection: React.FC<PublicTrackingSectionProps> = ({
  reports,
  onViewDetail,
}) => {
  const [activeTab, setActiveTab] = useState<'semua' | ReportStatusCode>('semua');
  const [ticketSearch, setTicketSearch] = useState('');

  // Filter calculations
  const counts = {
    semua: reports.length,
    menunggu: reports.filter((r) => r.statusCode === 'menunggu').length,
    diproses: reports.filter((r) => r.statusCode === 'diproses').length,
    selesai: reports.filter((r) => r.statusCode === 'selesai').length,
  };

  const filteredReports = reports.filter((item) => {
    const matchStatus = activeTab === 'semua' || item.statusCode === activeTab;
    const qLower = ticketSearch.trim().toLowerCase();
    const matchSearch =
      !ticketSearch ||
      item.id.toLowerCase().includes(qLower) ||
      item.title.toLowerCase().includes(qLower) ||
      item.location.toLowerCase().includes(qLower) ||
      item.category.toLowerCase().includes(qLower);

    return matchStatus && matchSearch;
  });

  return (
    <section id="tracking-publik" className="py-14 sm:py-16 bg-[#F8FAF9] border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 tracking-wider mb-2">
              <Globe className="w-3.5 h-3.5 text-emerald-600" />
              <span>TRANSPARANSI PUBLIK</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#15211C] tracking-tight">
              Pantau Laporan Anda
            </h2>
            <p className="mt-1 text-sm text-[#5A6862]">
              Pantau progres tindak lanjut aduan Anda secara real-time.
            </p>
          </div>

          {/* Search Box on Right */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
            <input
              type="text"
              value={ticketSearch}
              onChange={(e) => setTicketSearch(e.target.value)}
              placeholder="Cari No. Tiket..."
              className="w-full pl-10 pr-4 py-2.5 bg-white text-slate-800 text-xs sm:text-sm rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="mb-8">
          <ReportFilterTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            counts={counts}
          />
        </div>

        {/* 3 Column Grid */}
        {filteredReports.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 max-w-md mx-auto">
            <Filter className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-slate-600 text-sm font-semibold">Tidak ada aduan yang sesuai filter</p>
            <p className="text-xs text-slate-400 mt-1">
              Coba ganti tab status atau periksa kembali nomor tiket yang dicari.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReports.map((report) => (
              <ReportCard
                key={report.id}
                report={report}
                onViewDetail={onViewDetail}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
