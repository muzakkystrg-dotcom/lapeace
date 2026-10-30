import React from 'react';
import { CreditCard, FileText, Database, MessageSquareWarning, ArrowRight } from 'lucide-react';
import { ServiceItem } from '../types/portal';

interface FeaturedServicesProps {
  onSelectService: (service: ServiceItem) => void;
  filteredServices?: ServiceItem[];
  searchActive?: boolean;
}

export const servicesData: ServiceItem[] = [
  {
    id: 'plavon',
    title: 'Plavon Dukcapil',
    description: 'Pengurusan online KTP, Akta, KK, dan KIA tanpa antre di kantor dinas.',
    category: 'kependudukan',
    iconName: 'Plavon',
    actionLabel: 'Akses Dukcapil →',
    opd: 'Dinas Kependudukan & Pencatatan Sipil (Dispendukcapil)',
    sla: '1-3 Hari Kerja',
    requirements: [
      'Foto / Scan Kartu Keluarga Asli',
      'KTP Elektronik Pemohon',
      'Surat Pengantar RT/RW (khusus penerbitan baru)',
      'Surat Keterangan Kehilangan dari Polsek (jika hilang)',
    ],
    features: [
      'Cetak KTP-el mandiri di Anjungan Dukcapil Mandiri (ADM)',
      'Pengantaran dokumen langsung via Pos Kilat ke rumah',
      'Integrasi Identitas Kependudukan Digital (IKD)',
    ],
  },
  {
    id: 'sipraja',
    title: 'SIPRAJA Sidoarjo',
    description: 'Surat pengantar desa/kelurahan dan izin kecamatan secara digital mandiri.',
    category: 'perizinan',
    iconName: 'Sipraja',
    actionLabel: 'Buka SIPRAJA →',
    opd: 'Kecamatan & Kelurahan Se-Kabupaten Sidoarjo',
    sla: '1-2 Hari Kerja (Sertifikasi TTE Camat/Kades)',
    requirements: [
      'NIK Terverifikasi di Kabupaten Sidoarjo',
      'Nomor Induk Berusaha (NIB) untuk izin usaha mikro',
      'Surat Pernyataan Pemohon bermaterai Rp 10.000',
    ],
    features: [
      'Tanda Tangan Elektronik (TTE) Tersertifikasi Balai Sertifikasi Elektronik BSSN',
      '24 Jam Pengajuan dari rumah atau smartphone',
      'Barcode verifikasi keaslian dokumen instan',
    ],
  },
  {
    id: 'satudata',
    title: 'Satu Data & APBD',
    description: 'Keterbukaan alokasi anggaran daerah, realisasi proyek, dan data terbuka resmi.',
    category: 'anggaran',
    iconName: 'SatuData',
    actionLabel: 'Lihat Data APBD →',
    opd: 'Badan Pengelolaan Keuangan dan Aset Daerah (BPKAD) & Bappeda',
    sla: 'Pembaruan Real-Time (Siklus Triwulan)',
    requirements: [
      'Terbuka untuk umum (Warga, Peneliti, Media, Mahasiswa)',
      'Format data terbuka: CSV, JSON, API Endpoint Publik',
    ],
    features: [
      'Transparansi Belanja Modal & Operasional OPD',
      'Dashboard Geospasial Proyek Strategis Daerah',
      'Unduh Buku Ringkasan APBD Sidoarjo Resmi',
    ],
  },
  {
    id: 'lapor112',
    title: 'Lapor SP4N & 112',
    description: 'Laporan cepat infrastruktur, kedaruratan, dan keluhan layanan publik Sidoarjo.',
    category: 'pengaduan',
    iconName: 'Lapor',
    actionLabel: 'Kirim Aduan →',
    opd: 'Diskominfo Sidoarjo & Call Center 112 Siaga',
    sla: 'Maksimal 2x24 Jam Penugasan OPD Teknis',
    requirements: [
      'Lokasi kejadian yang jelas (Kecamatan/Desa/Nama Jalan)',
      'Foto bukti pendukung atau dokumentasi video',
      'Nomor kontak pelapor untuk konfirmasi tindak lanjut',
    ],
    features: [
      'Call Center Bebas Pulsa 112 Siaga 24 Jam Non-Stop',
      'Integrasi SP4N-LAPOR! KemenPAN-RB RI',
      'Notifikasi tracking penanganan via SMS / WhatsApp',
    ],
  },
];

export const FeaturedServices: React.FC<FeaturedServicesProps> = ({
  onSelectService,
  filteredServices,
  searchActive,
}) => {
  const displayList = filteredServices || servicesData;

  const renderIcon = (name: string) => {
    switch (name) {
      case 'Plavon':
        return (
          <div className="w-12 h-12 rounded-xl bg-[#EFFDF4] border border-emerald-200/70 text-[#038D66] flex items-center justify-center">
            <CreditCard className="w-6 h-6 text-[#038D66]" />
          </div>
        );
      case 'Sipraja':
        return (
          <div className="w-12 h-12 rounded-xl bg-emerald-50/80 border border-emerald-200/70 text-emerald-700 flex items-center justify-center">
            <FileText className="w-6 h-6 text-emerald-800" />
          </div>
        );
      case 'SatuData':
        return (
          <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-700 flex items-center justify-center">
            <Database className="w-6 h-6 text-amber-600" />
          </div>
        );
      case 'Lapor':
        return (
          <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-200/80 text-teal-700 flex items-center justify-center">
            <MessageSquareWarning className="w-6 h-6 text-teal-700" />
          </div>
        );
      default:
        return (
          <div className="w-12 h-12 rounded-xl bg-[#EFFDF4] text-[#038D66] flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
        );
    }
  };

  return (
    <section id="layanan" className="py-16 sm:py-20 bg-[#F8FAF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100/70 border border-emerald-200/60 text-emerald-900 text-xs font-semibold tracking-wider mb-3">
            LAYANAN UTAMA
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#15211C] tracking-tight">
            Layanan Publik Terpadu
          </h2>
          <p className="mt-3 text-base text-[#5A6862]">
            {searchActive
              ? `Menampilkan ${displayList.length} hasil layanan sesuai filter pencarian Anda.`
              : 'Akses cepat ke 4 layanan pemerintah Kabupaten Sidoarjo yang paling sering digunakan.'}
          </p>
        </div>

        {/* 4 Cards Grid */}
        {displayList.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 max-w-lg mx-auto">
            <p className="text-slate-600 text-base">Tidak ditemukan layanan yang cocok dengan kata kunci pencarian.</p>
            <p className="text-xs text-slate-400 mt-2">Coba gunakan kata kunci lain seperti "KTP", "Akta", "Anggaran", atau "Jalan Rusak".</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayList.map((service) => (
              <div
                key={service.id}
                onClick={() => onSelectService(service)}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 hover:border-emerald-500/80 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between cursor-pointer group hover:-translate-y-1"
              >
                <div>
                  <div className="mb-5">
                    {renderIcon(service.iconName)}
                  </div>
                  
                  <h3 className="font-display text-lg font-bold text-[#15211C] group-hover:text-[#038D66] transition-colors mb-2">
                    {service.title}
                  </h3>
                  
                  <p className="text-sm text-[#5A6862] leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#038D66] group-hover:text-[#026E4F] flex items-center gap-1.5 transition-colors">
                    <span>{service.actionLabel.replace(' →', '')}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {service.sla.split(' ')[0]} SLA
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
