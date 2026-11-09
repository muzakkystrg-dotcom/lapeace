import React, { useState } from 'react';
import { Lock, ChevronRight, Calendar, Info } from 'lucide-react';

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
      subtext: 'Ringkasan Alokasi 2025',
      highlightColor: 'text-[#FFE087]',
      detail: 'Alokasi APBD TA 2025 dengan fokus belanja modal infrastruktur jalan, pendidikan merata, dan kesehatan preventif gratis.',
    },
    {
      id: 'layanan',
      label: 'Layanan Selesai',
      value: '1,82 Juta',
      subtext: 'Tercatat di Portal Pemkab',
      highlightColor: 'text-white',
      detail: 'Akumulasi permohonan kependudukan dan izin usaha terlayani sepanjang tahun berjalan.',
    },
    {
      id: 'laporan',
      label: 'Tindak Lanjut Laporan',
      value: '98,2%',
      subtext: 'Respon Cepat Layanan 112',
      highlightColor: 'text-white',
      detail: 'Rasio penanganan aduan SP4N-LAPOR! dan Call Center 112 yang ditindaklanjuti OPD teknis.',
    },
    {
      id: 'wilayah',
      label: 'Wilayah Terpadu',
      value: '18 Kecamatan',
      subtext: '349 Desa & Kelurahan',
      highlightColor: 'text-[#FFE087]',
      detail: 'Integrasi pelayanan administrasi kependudukan dan perizinan terhubung digital dari desa hingga pusat pemerintahan.',
    },
  ];

  const agendaPublik = [
    { tanggal: 'Senin - Jumat', waktu: '08:00 - 15:00 WIB', kegiatan: 'Layanan Adminduk Keliling di Kecamatan Candi & Sukodono' },
    { tanggal: 'Setiap Hari', waktu: '24 Jam Non-Stop', kegiatan: 'Call Center Kedaruratan 112 Sidoarjo Siaga' },
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
              <span>TRANSPARANSI ANGGARAN & PELAYANAN KABUPATEN SIDOARJO</span>
            </div>

            {/* Title */}
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Keterbukaan APBD & Kinerja Pelayanan Publik Sidoarjo
            </h2>

            {/* Subtitle */}
            <p className="mt-3 text-base text-emerald-100/80 leading-relaxed">
              Pantau alokasi APBD Kabupaten Sidoarjo dan komitmen layanan terpadu bagi warga Sidoarjo secara terbuka.
            </p>
          </div>

          {/* Sync status tag */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-[#05241B] border border-emerald-800/80 text-xs font-medium text-emerald-200 self-start md:self-auto shrink-0 shadow-inner">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span>Publikasi Resmi BPKAD & Diskominfo Sidoarjo</span>
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-4">
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

        {/* Sumber Data Attribution */}
        <div className="flex items-center gap-2 text-xs text-emerald-300/80 mb-10 px-1">
          <Info className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>Sumber Data: Buku Ringkasan Alokasi APBD Kabupaten Sidoarjo Tahun Anggaran 2025 (Dipublikasikan oleh BPKAD Sidoarjo).</span>
        </div>

        {/* Agenda Publik & Informasi Daerah */}
        <div className="bg-[#05241B] rounded-2xl border border-emerald-900/90 p-6 shadow-inner">
          <div className="flex items-center gap-2 mb-4 text-amber-300 font-bold text-sm uppercase tracking-wide">
            <Calendar className="w-4 h-4" />
            <span>Agenda Pelayanan Daerah & Informasi Publik</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {agendaPublik.map((agenda, idx) => (
              <div key={idx} className="bg-[#083C2E]/60 border border-emerald-800/60 rounded-xl p-4 flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs text-emerald-300">
                  <span className="font-semibold text-emerald-200">{agenda.tanggal}</span>
                  <span className="bg-emerald-900/80 px-2 py-0.5 rounded text-[11px] font-mono text-emerald-300 border border-emerald-700/50">{agenda.waktu}</span>
                </div>
                <p className="text-sm font-medium text-white">{agenda.kegiatan}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
