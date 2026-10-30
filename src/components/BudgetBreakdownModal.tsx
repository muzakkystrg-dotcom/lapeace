import React from 'react';
import { X, PieChart, TrendingUp, Download, CheckCircle2, ShieldCheck, ArrowUpRight } from 'lucide-react';

interface BudgetBreakdownModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BudgetBreakdownModal: React.FC<BudgetBreakdownModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const allocations = [
    { name: 'Infrastruktur Jalan & PU Bina Marga SDA', amount: 'Rp 1,27 Triliun', percentage: 24.1, color: 'bg-emerald-600', note: 'Betonisasi jalan ruas Tarik-Prambon, normalisasi avour sungai, & PJU jalan' },
    { name: 'Pendidikan & Peningkatan Mutu Sekolah', amount: 'Rp 1,18 Triliun', percentage: 22.4, color: 'bg-teal-600', note: 'Beasiswa pendidikan tinggi, BOSDA SD/SMP, dan sarana digitalisasi kelas' },
    { name: 'Perlindungan Sosial & Pemberdayaan Ekonomi', amount: 'Rp 1,08 Triliun', percentage: 20.3, color: 'bg-amber-600', note: 'Program KURDA Sayang, bantuan pangan lansia, dan stimulus UMKM Desa' },
    { name: 'Kesehatan & Universal Health Coverage (UHC)', amount: 'Rp 960 Miliar', percentage: 18.2, color: 'bg-cyan-600', note: 'Jaminan BPJS PBI Pemda 100%, penguatan 32 Puskesmas & RSUD Sidoarjo' },
    { name: 'Pelayanan Publik & Transformasi Digital', amount: 'Rp 790 Miliar', percentage: 15.0, color: 'bg-emerald-800', note: 'Pengembangan SITAPAK, CCTV Smart City, & sistem keamanan siber BSSN' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-emerald-900/10 overflow-hidden relative my-8 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="bg-[#083C2E] px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-amber-300">
              <PieChart className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="text-[11px] font-semibold text-amber-300 uppercase tracking-wider">
                TRANSPARANSI KEUANGAN DAERAH
              </div>
              <h3 className="font-display font-bold text-xl leading-tight">
                Struktur Alokasi APBD Sidoarjo TA 2025
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-300/80 hover:text-white hover:bg-emerald-900/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Headline Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
              <div className="text-xs text-emerald-800 font-medium">Total Anggaran Belanja</div>
              <div className="text-2xl font-extrabold text-emerald-950 font-display mt-1">Rp 5,28 T</div>
              <div className="text-[11px] text-emerald-700 mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-emerald-600" />
                <span>+6.4% dari TA sebelumnya</span>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <div className="text-xs text-slate-600 font-medium">Realisasi Serapan Berjalan</div>
              <div className="text-2xl font-extrabold text-slate-900 font-display mt-1">84,6%</div>
              <div className="text-[11px] text-slate-500 mt-1">Target Triwulan IV: 96%</div>
            </div>

            <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
              <div className="text-xs text-amber-800 font-medium">Opini BPK RI Terakhir</div>
              <div className="text-2xl font-extrabold text-amber-900 font-display mt-1">WTP 11x</div>
              <div className="text-[11px] text-amber-700 mt-1">Wajar Tanpa Pengecualian</div>
            </div>
          </div>

          {/* Allocation List */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
              Rincian Alokasi Per Sektor Prioritas
            </h4>

            <div className="space-y-3">
              {allocations.map((item, idx) => (
                <div key={idx} className="bg-slate-50 rounded-xl p-4 border border-slate-200/80">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <span className="text-sm font-bold text-slate-900">{item.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-extrabold text-emerald-900 font-mono">{item.amount}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-bold">
                        {item.percentage}%
                      </span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden mb-2">
                    <div
                      className={`h-full ${item.color} rounded-full`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>

                  <p className="text-xs text-slate-500">
                    <span className="font-semibold text-slate-700">Fokus Program: </span>
                    {item.note}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Legal basis & audit */}
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-100 text-xs text-slate-600">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>
              Data sinkron otomatis dengan Sistem Informasi Pemerintahan Daerah (SIPD-RI) Kemendagri & BPKAD Kabupaten Sidoarjo.
            </span>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-800"
          >
            Tutup
          </button>

          <button
            onClick={() => alert('Mengunduh Buku Laporan Ringkasan APBD Kabupaten Sidoarjo 2025 (PDF)...')}
            className="px-4 py-2.5 bg-[#038D66] hover:bg-[#026E4F] text-white font-semibold text-xs sm:text-sm rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Unduh Buku Ringkasan APBD (PDF)</span>
          </button>
        </div>

      </div>
    </div>
  );
};
