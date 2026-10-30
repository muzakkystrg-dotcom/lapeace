import React, { useState } from 'react';
import { Lock, RefreshCw, BarChart3, ChevronRight, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';

interface TransparencySectionProps {
  onOpenBudgetModal?: () => void;
}

export const TransparencySection: React.FC<TransparencySectionProps> = ({
  onOpenBudgetModal,
}) => {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  const stats = [
    {
      id: 'apbd',
      label: 'APBD Sidoarjo',
      value: 'Rp 5,28 T',
      subtext: 'Realisasi Terbuka',
      highlightColor: 'text-[#FFE087]',
      detail: 'Alokasi APBD TA 2025 dengan fokus belanja modal infrastruktur jalan, pendidikan merata, dan kesehatan preventif gratis.',
    },
    {
      id: 'layanan',
      label: 'Layanan Selesai',
      value: '1,82 Juta',
      subtext: 'Kepuasan 97,4%',
      highlightColor: 'text-white',
      detail: 'Akumulasi 1.820.000+ permohonan kependudukan dan izin usaha terlayani sepanjang tahun berjalan dengan survei kepuasan 97,4%.',
    },
    {
      id: 'laporan',
      label: 'Tindak Lanjut Laporan',
      value: '98,2%',
      subtext: 'Respon Cepat 2×24 Jam',
      highlightColor: 'text-white',
      detail: 'Rasio penanganan aduan SP4N-LAPOR! dan Call Center 112 yang berhasil dieksekusi tuntas oleh OPD teknis dalam tempo < 48 jam.',
    },
    {
      id: 'wilayah',
      label: 'Wilayah Terpadu',
      value: '18 Kecamatan',
      subtext: '349 Desa & Kelurahan',
      highlightColor: 'text-[#FFE087]',
      detail: '100% integrasi pelayanan administrasi kependudukan dan perizinan terhubung digital dari pelosok desa hingga pusat pemerintahan.',
    },
  ];

  const liveFeeds = [
    'Dinas PU Bina Marga & SDA Sidoarjo menyelesaikan perbaikan jalan ruas Tarik - Prambon (12 menit lalu)',
    'BPKAD Sidoarjo memutakhirkan Laporan Realisasi Anggaran Triwulan III (38 menit lalu)',
    'Dispendukcapil melayani 1.420 permohonan KTP-el dan Akta Kelahiran hari ini (1 jam lalu)',
    'Call Center 112 Sidoarjo Siaga menuntaskan 28 penanganan pohon rawan tumbang di Sedati (2 jam lalu)',
    'Dinas Kesehatan Sidoarjo mendistribusikan alat skrining kesehatan ke 32 Puskesmas (3 jam lalu)',
  ];

  return (
    <section id="transparansi" className="py-16 sm:py-20 bg-[#083C2E] text-white relative overflow-hidden">
      {/* Decorative ambient gradient */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-800/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-14">
          <div className="max-w-3xl">
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-300/90 tracking-wider mb-2">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>TRANSPARANSI KABUPATEN SIDOARJO REAL-TIME</span>
            </div>

            {/* Title */}
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Keterbukaan APBD & Kinerja Pelayanan Publik Sidoarjo
            </h2>

            {/* Subtitle */}
            <p className="mt-3 text-base text-emerald-100/80 leading-relaxed">
              Pantau serapan APBD Kabupaten Sidoarjo, kepatuhan OPD, dan realisasi program prioritas pembangunan daerah secara transparan.
            </p>
          </div>

          {/* Sync status tag */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-[#05241B] border border-emerald-800/80 text-xs font-medium text-emerald-200 self-start md:self-auto shrink-0 shadow-inner">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Sinkronisasi BPKAD & Diskominfo Sidoarjo</span>
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-10">
          {stats.map((stat) => (
            <div
              key={stat.id}
              onClick={() => {
                setSelectedMetric(stat.id === selectedMetric ? null : stat.id);
                if (onOpenBudgetModal) onOpenBudgetModal();
              }}
              className="bg-[#05241B]/90 hover:bg-[#05241B] rounded-2xl p-6 border border-emerald-900/80 hover:border-emerald-600/60 shadow-lg transition-all duration-200 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="text-xs uppercase font-medium text-emerald-300/75 tracking-wider mb-2">
                  {stat.label}
                </div>
                <div className={`font-display text-3xl sm:text-4xl font-extrabold tracking-tight mb-2 ${stat.highlightColor}`}>
                  {stat.value}
                </div>
              </div>
              <div className="pt-3 border-t border-emerald-900/60 flex items-center justify-between">
                <span className="text-xs font-medium text-emerald-200/90">
                  {stat.subtext}
                </span>
                <ChevronRight className="w-4 h-4 text-emerald-500/60 group-hover:text-emerald-300 group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>
          ))}
        </div>

        {/* Live Update Ticker Strip */}
        <div className="bg-[#041c15] rounded-xl border border-emerald-900/90 p-2 sm:p-2.5 flex items-center gap-3 overflow-hidden shadow-inner">
          <div className="bg-amber-400 text-amber-950 text-xs font-bold px-3 py-1.5 rounded-lg shrink-0 tracking-wide uppercase flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-900 animate-ping" />
            <span>LIVE UPDATE</span>
          </div>

          <div className="overflow-hidden whitespace-nowrap w-full flex items-center">
            <div className="animate-marquee flex items-center gap-8 text-xs sm:text-sm text-emerald-100/90 font-medium">
              {liveFeeds.map((feed, idx) => (
                <span key={idx} className="flex items-center gap-3">
                  <span>{feed}</span>
                  <span className="text-emerald-600 font-bold">•</span>
                </span>
              ))}
              {/* Duplicate for seamless looping marquee */}
              {liveFeeds.map((feed, idx) => (
                <span key={`dup-${idx}`} className="flex items-center gap-3">
                  <span>{feed}</span>
                  <span className="text-emerald-600 font-bold">•</span>
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
