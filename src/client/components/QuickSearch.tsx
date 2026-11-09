import React, { useState } from 'react';
import { Search, SlidersHorizontal, ArrowRight, TrendingUp } from 'lucide-react';
import { ServiceCategory } from '../types/portal';

interface QuickSearchProps {
  onSearch: (query: string, category: ServiceCategory) => void;
  initialQuery?: string;
}

export const QuickSearch: React.FC<QuickSearchProps> = ({
  onSearch,
  initialQuery = '',
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('semua');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const categories: { id: ServiceCategory; label: string }[] = [
    { id: 'semua', label: 'Semua Kategori' },
    { id: 'kependudukan', label: 'Kependudukan & Catatan Sipil' },
    { id: 'perizinan', label: 'Perizinan Desa & Kecamatan' },
    { id: 'anggaran', label: 'APBD & Data Publik' },
    { id: 'pengaduan', label: 'Pengaduan & Kedaruratan 112' },
  ];

  const popularKeywords = [
    { label: 'Plavon Dukcapil', category: 'kependudukan' as ServiceCategory },
    { label: 'SIPRAJA Desa', category: 'perizinan' as ServiceCategory },
    { label: 'APBD Sidoarjo', category: 'anggaran' as ServiceCategory },
    { label: 'Lapor SP4N / 112', category: 'pengaduan' as ServiceCategory },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query.trim(), selectedCategory);
  };

  const handleSelectKeyword = (keyword: string, cat: ServiceCategory) => {
    setQuery(keyword);
    setSelectedCategory(cat);
    onSearch(keyword, cat);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-20 -mt-6 sm:-mt-8">
      <div className="bg-white rounded-2xl shadow-lg border border-emerald-900/10 p-3 sm:p-4 md:p-5 transition-all">
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-stretch gap-2.5 sm:gap-3">
          
          {/* Text Input */}
          <div className="relative flex-1 flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari Layanan (SIPRAJA, Plavon Dukcapil), Dokumen APBD Sidoarjo, atau Regulasi..."
              className="w-full pl-12 pr-4 py-3 sm:py-3.5 bg-slate-50/80 hover:bg-slate-50 focus:bg-white text-slate-800 text-sm sm:text-base rounded-xl border border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 outline-none transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Category Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full md:w-auto px-4 py-3 sm:py-3.5 bg-slate-50/80 hover:bg-slate-100 text-slate-700 text-sm font-medium rounded-xl border border-slate-200 flex items-center justify-between md:justify-start gap-2.5 transition-all cursor-pointer whitespace-nowrap"
            >
              <SlidersHorizontal className="w-4 h-4 text-emerald-700" />
              <span>{categories.find((c) => c.id === selectedCategory)?.label || 'Semua Kategori'}</span>
              <span className="text-xs text-slate-400">▾</span>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-30">
                {categories.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(c.id);
                      setIsDropdownOpen(false);
                      onSearch(query, c.id);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-xs sm:text-sm transition-colors flex items-center justify-between ${
                      selectedCategory === c.id
                        ? 'bg-emerald-50 text-emerald-800 font-semibold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{c.label}</span>
                    {selectedCategory === c.id && <span className="text-emerald-700 font-bold">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Submit Search Button */}
          <button
            type="submit"
            className="px-6 py-3 sm:py-3.5 bg-[#038D66] hover:bg-[#026E4F] text-white font-semibold text-sm sm:text-base rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-98 shrink-0"
          >
            <span>Cari Sekarang</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Popular Tags */}
        <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <div className="flex items-center gap-1.5 text-slate-600 font-medium mr-1">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            <span>Populer:</span>
          </div>
          {popularKeywords.map((tag) => (
            <button
              key={tag.label}
              type="button"
              onClick={() => handleSelectKeyword(tag.label, tag.category)}
              className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-900 transition-colors cursor-pointer text-xs font-medium"
            >
              {tag.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
