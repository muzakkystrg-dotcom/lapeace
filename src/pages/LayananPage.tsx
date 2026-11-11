import { Icon } from '../components/common/Icon';
import React, { useState, useMemo } from 'react';

export interface DirectoryService {
  id: string;
  title: string;
  opd: string;
  opdKey: string;
  category: 'kependudukan' | 'perizinan' | 'kesehatan' | 'pajak' | 'sosial' | 'usaha';
  accessChannel: 'online' | 'mpp' | 'adm' | 'mobile';
  badge: string;
  badgeType?: 'primary' | 'secondary' | 'error' | 'warning';
  badgeIcon: string;
  description: string;
  metricLabel1: string;
  metricValue1: string;
  metricLabel2: string;
  metricValue2: string;
  secondaryActionLabel: string;
  secondaryActionIcon: string;
  primaryActionLabel: string;
  detailRoute?: string;
  popularityScore: number;
}

export const directoryServicesData: DirectoryService[] = [
  {
    id: 'ktp',
    title: 'Perekaman & Cetak KTP Elektronik',
    opd: 'Disdukcapil',
    opdKey: 'disdukcapil',
    category: 'kependudukan',
    accessChannel: 'online',
    badge: '100% Online & ADM',
    badgeType: 'secondary',
    badgeIcon: 'bolt',
    description: 'Penggantian e-KTP rusak, hilang, perubahan elemen data kependudukan atau pemula 17 tahun langsung diantar Pos Indonesia atau dicetak instan di anjungan ADM terdekat.',
    metricLabel1: 'Estimasi Waktu',
    metricValue1: '1 - 3 Hari Kerja',
    metricLabel2: 'Biaya Retribusi',
    metricValue2: 'Rp 0 (Gratis)',
    secondaryActionLabel: 'Pelajari Syarat',
    secondaryActionIcon: 'info',
    primaryActionLabel: 'Ajukan Sekarang',
    detailRoute: '#layanan/ktp',
    popularityScore: 99,
  },
  {
    id: 'sku',
    title: 'Surat Keterangan Usaha & Domisili (SIPRAJA)',
    opd: 'Kecamatan & Desa',
    opdKey: 'kecamatan',
    category: 'usaha',
    accessChannel: 'online',
    badge: 'SIPRAJA Mandiri',
    badgeType: 'secondary',
    badgeIcon: 'check_circle',
    description: 'Layanan mandiri permohonan 24 jenis surat pengantar desa, SKU UMKM, surat domisili ber-TTE Camat/Kades sah tanpa perlu datang ke kantor kelurahan.',
    metricLabel1: 'Estimasi Waktu',
    metricValue1: '30 Mnt - 1 Hari',
    metricLabel2: 'Biaya Administrasi',
    metricValue2: 'Rp 0 (Gratis)',
    secondaryActionLabel: '24 Jenis Surat',
    secondaryActionIcon: 'format_list_bulleted',
    primaryActionLabel: 'Buka SIPRAJA',
    detailRoute: '#layanan/sku',
    popularityScore: 97,
  },
  {
    id: 'nib',
    title: 'Penerbitan NIB & Izin Usaha (OSS-RBA)',
    opd: 'DPMPTSP Kab. Sidoarjo',
    opdKey: 'dpmptsp',
    category: 'perizinan',
    accessChannel: 'online',
    badge: 'OSS-RBA Nasional',
    badgeType: 'secondary',
    badgeIcon: 'verified',
    description: 'Fasilitasi perizinan berusaha legalitas Nomor Induk Berusaha mandiri bagi pelaku UMK risiko rendah, menengah, dan pendampingan izin lingkungan daerah.',
    metricLabel1: 'Estimasi Waktu',
    metricValue1: 'Instan Terbit',
    metricLabel2: 'Biaya Penerbitan',
    metricValue2: 'Rp 0 (Gratis)',
    secondaryActionLabel: 'Panduan KBLI',
    secondaryActionIcon: 'menu_book',
    primaryActionLabel: 'Buat NIB Mandiri',
    detailRoute: '#layanan/nib',
    popularityScore: 95,
  },
  {
    id: 'faskes',
    title: 'Pendaftaran Faskes & Antrean Puskesmas Online',
    opd: 'Dinas Kesehatan',
    opdKey: 'dinkes',
    category: 'kesehatan',
    accessChannel: 'mobile',
    badge: 'Satu Sehat Mobile',
    badgeType: 'secondary',
    badgeIcon: 'phone_iphone',
    description: 'Booking antrean periksa di 31 Puskesmas se-Sidoarjo, integrasi BPJS Satu Sehat Kemenkes, dan rujukan terpadu RSUD R.T. Notopuro secara real-time.',
    metricLabel1: 'Waktu Tunggu',
    metricValue1: '5 - 10 Menit',
    metricLabel2: 'Biaya Pendaftaran',
    metricValue2: 'Rp 0 (BPJS Aktif)',
    secondaryActionLabel: 'Daftar 31 Faskes',
    secondaryActionIcon: 'pin_drop',
    primaryActionLabel: 'Ambil Antrean',
    detailRoute: '#layanan/faskes',
    popularityScore: 94,
  },
  {
    id: 'pbb',
    title: 'Pengelolaan & Pembayaran PBB-P2 & BPHTB',
    opd: 'BPPD Kab. Sidoarjo',
    opdKey: 'bppd',
    category: 'pajak',
    accessChannel: 'online',
    badge: 'Host-to-Host QRIS',
    badgeType: 'secondary',
    badgeIcon: 'qr_code_2',
    description: 'Cek tagihan NOP, unduh e-SPPT sah ber-barcode BSrE, bayar lewat QRIS/Virtual Account, dan validasi berkas SSPD BPHTB terpadu ATR/BPN Sidoarjo.',
    metricLabel1: 'Konfirmasi Bayar',
    metricValue1: 'Instan / Realtime',
    metricLabel2: 'Biaya Admin Portal',
    metricValue2: 'Rp 0 Admin',
    secondaryActionLabel: 'Cek NOP Anda',
    secondaryActionIcon: 'search',
    primaryActionLabel: 'Bayar PBB Online',
    popularityScore: 91,
  },
  {
    id: 'akta',
    title: 'Akta Kelahiran & Kartu Identitas Anak (3-in-1)',
    opd: 'Disdukcapil',
    opdKey: 'disdukcapil',
    category: 'kependudukan',
    accessChannel: 'online',
    badge: 'Paket 3-in-1 Otomatis',
    badgeType: 'secondary',
    badgeIcon: 'auto_mode',
    description: 'Penerbitan terpadu sekaligus: Akta Kelahiran resmi, pembaharuan Kartu Keluarga bertambah anggota, dan pencetakan KIA yang dikirim langsung ke rumah.',
    metricLabel1: 'Estimasi Waktu',
    metricValue1: '1 - 2 Hari Kerja',
    metricLabel2: 'Biaya Dokumen',
    metricValue2: 'Rp 0 (Gratis)',
    secondaryActionLabel: 'Ketentuan Saksi',
    secondaryActionIcon: 'help_outline',
    primaryActionLabel: 'Daftar Akta Anak',
    popularityScore: 89,
  },
  {
    id: 'mpp',
    title: 'Booking Nomor Antrean Mall Pelayanan Publik (MPP)',
    opd: 'MPP Jl. Lingkar Timur',
    opdKey: 'dpmptsp',
    category: 'perizinan',
    accessChannel: 'mpp',
    badge: '142 Loket Terpadu',
    badgeType: 'primary',
    badgeIcon: 'event_seat',
    description: 'Reservasi kuota antrean instan untuk pengurusan fisik SIM/SKCK Polresta, Paspor Imigrasi Kelas I, sertipikat BPN, perbankan BPD Jatim, dan kejaksaan.',
    metricLabel1: 'Waktu Tunggu Loket',
    metricValue1: '< 15 Menit',
    metricLabel2: 'Biaya Tiket Antre',
    metricValue2: 'Rp 0 (Gratis)',
    secondaryActionLabel: 'Denah 142 Loket',
    secondaryActionIcon: 'map',
    primaryActionLabel: 'Reservasi Loket',
    popularityScore: 88,
  },
  {
    id: 'lapor',
    title: 'Pengaduan SP4N-LAPOR! & Kedaruratan Call 112',
    opd: 'Diskominfo Sidoarjo',
    opdKey: 'diskominfo',
    category: 'sosial',
    accessChannel: 'online',
    badge: 'Siaga 24 Jam',
    badgeType: 'error',
    badgeIcon: 'alarm',
    description: 'Kanal aspirasi pengaduan publik perbaikan jalan, penerangan jalan umum, tumpukan sampah, serta bantuan cepat ambulans gawat darurat & pemadam kebakaran.',
    metricLabel1: 'SLA Respon Tindak',
    metricValue1: 'Maks 2x24 Jam',
    metricLabel2: 'Akses Pulsa',
    metricValue2: 'Bebas Pulsa 100%',
    secondaryActionLabel: 'Pantau Tiket Anda',
    secondaryActionIcon: 'visibility',
    primaryActionLabel: 'Kirim Laporan',
    detailRoute: '#laporan',
    popularityScore: 92,
  },
  {
    id: 'dtks',
    title: 'Pendaftaran DTKS & Bantuan Sosial Sidoarjo',
    opd: 'Dinas Sosial',
    opdKey: 'dinsos',
    category: 'sosial',
    accessChannel: 'online',
    badge: 'Bansos & PKH',
    badgeType: 'secondary',
    badgeIcon: 'handshake',
    description: 'Pengecekan status kepesertaan Data Terpadu Kesejahteraan Sosial, pendaftaran beasiswa yatim berprestasi daerah, dan klaim bantuan pangan beras non-tunai.',
    metricLabel1: 'Verifikasi Lapangan',
    metricValue1: '3 - 5 Hari Kerja',
    metricLabel2: 'Biaya Pengusulan',
    metricValue2: 'Rp 0 (Gratis)',
    secondaryActionLabel: 'Kriteria Kemiskinan',
    secondaryActionIcon: 'rule',
    primaryActionLabel: 'Cek Status NIK',
    detailRoute: '#layanan/dtks',
    popularityScore: 87,
  },
  {
    id: 'ak1',
    title: 'Kartu Kuning AK-1 & Bursa Karir Perusahaan',
    opd: 'Dinas Tenaga Kerja',
    opdKey: 'disnaker',
    category: 'usaha',
    accessChannel: 'online',
    badge: 'e-AK1 Langsung Jadi',
    badgeType: 'secondary',
    badgeIcon: 'picture_as_pdf',
    description: 'Penerbitan kartu tanda pencari kerja digital instan PDF ber-QR Code resmi, pelatihan BLK daerah, serta kanal lamaran ke 400+ industri terdaftar di Sidoarjo.',
    metricLabel1: 'Waktu Penerbitan',
    metricValue1: 'Instan Digital',
    metricLabel2: 'Biaya Layanan',
    metricValue2: 'Rp 0 (Gratis)',
    secondaryActionLabel: 'Lowongan Aktif',
    secondaryActionIcon: 'open_in_new',
    primaryActionLabel: 'Buat AK-1 Online',
    popularityScore: 84,
  },
  {
    id: 'pbg',
    title: 'Persetujuan Bangunan Gedung (PBG & SLF)',
    opd: 'Dinas Perkim CKTR',
    opdKey: 'dinas-pu',
    category: 'perizinan',
    accessChannel: 'online',
    badge: 'SIMBG Nasional',
    badgeType: 'primary',
    badgeIcon: 'gavel',
    description: 'Permohonan izin PBG resmi pengganti IMB untuk rumah tinggal, tempat usaha ruko, pabrik pergudangan dengan asistensi sidang Tim Profesi Ahli (TPA) Sidoarjo.',
    metricLabel1: 'Durasi Verifikasi',
    metricValue1: '7 - 14 Hari Kerja',
    metricLabel2: 'Retribusi Resmi',
    metricValue2: 'Sesuai Perda Luas',
    secondaryActionLabel: 'Simulasi Retribusi',
    secondaryActionIcon: 'calculate',
    primaryActionLabel: 'Masuk Portal PBG',
    popularityScore: 82,
  },
  {
    id: 'halal',
    title: 'Sertifikasi Halal & Fasilitasi Uji Lab UMKM',
    opd: 'Dinkop & Usaha Mikro',
    opdKey: 'dinkop',
    category: 'usaha',
    accessChannel: 'online',
    badge: 'Fasilitasi Bersubsidi',
    badgeType: 'warning',
    badgeIcon: 'workspace_premium',
    description: 'Program pendampingan sertifikasi Halal Self-Declare BPJPH, uji nutrisi laboratorium terakreditasi, sertifikat P-IRT, dan kurasi kemasan produk khas Sidoarjo.',
    metricLabel1: 'Proses Bimbingan',
    metricValue1: '14 Hari Kerja',
    metricLabel2: 'Biaya Pendamping',
    metricValue2: '100% Gratis APBD',
    secondaryActionLabel: 'Jadwal Kurasi',
    secondaryActionIcon: 'calendar_today',
    primaryActionLabel: 'Daftar Kurasi',
    popularityScore: 85,
  },
];

export interface LayananPageProps {
  onSelectService?: (serviceId: string) => void;
  onStartApplication?: (service: DirectoryService) => void;
}

export const LayananPage: React.FC<LayananPageProps> = ({
  onSelectService,
  onStartApplication,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedOpd, setSelectedOpd] = useState<string>('all');
  const [selectedChannel, setSelectedChannel] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const categories = [
    { key: 'all', label: 'Semua Layanan (48)', icon: 'apps' },
    { key: 'kependudukan', label: 'Kependudukan & Sipil (8)', icon: 'badge' },
    { key: 'perizinan', label: 'Perizinan & Investasi (12)', icon: 'business_center' },
    { key: 'kesehatan', label: 'Kesehatan & Jaminan Medis (9)', icon: 'vital_signs' },
    { key: 'pajak', label: 'Pajak & Retribusi Daerah (7)', icon: 'receipt_long' },
    { key: 'sosial', label: 'Sosial & Kesejahteraan (6)', icon: 'volunteer_activism' },
    { key: 'usaha', label: 'Ketenagakerjaan & Usaha (6)', icon: 'engineering' },
  ];

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedOpd('all');
    setSelectedChannel('all');
    setSortBy('popular');
    setCurrentPage(1);
  };

  const handleServiceClick = (service: DirectoryService) => {
    if (!service.detailRoute) {
      showToast(`Halaman detail untuk "${service.title}" belum tersedia di prototipe.`);
      return;
    }
    if (onSelectService) {
      onSelectService(service.id);
    } else {
      window.location.hash = service.detailRoute;
    }
  };

  const handleApplyClick = (e: React.MouseEvent, service: DirectoryService) => {
    e.stopPropagation();
    if (!service.detailRoute) {
      showToast(`Layanan "${service.title}" belum tersedia di prototipe saat ini.`);
      return;
    }
    if (onStartApplication) {
      onStartApplication(service);
    } else {
      window.location.hash = service.detailRoute;
    }
  };

  const filteredServices = useMemo(() => {
    return directoryServicesData
      .filter((s) => {
        const matchCategory =
          selectedCategory === 'all' || s.category === selectedCategory;
        const matchOpd = selectedOpd === 'all' || s.opdKey === selectedOpd;
        const matchChannel =
          selectedChannel === 'all' || s.accessChannel === selectedChannel;
        const matchQuery =
          !searchQuery.trim() ||
          s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.opd.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.badge.toLowerCase().includes(searchQuery.toLowerCase());

        return matchCategory && matchOpd && matchChannel && matchQuery;
      })
      .sort((a, b) => {
        if (sortBy === 'az') {
          return a.title.localeCompare(b.title);
        }
        if (sortBy === 'newest') {
          return b.id.localeCompare(a.id);
        }
        if (sortBy === 'time') {
          return a.metricValue1.localeCompare(b.metricValue1);
        }
        return b.popularityScore - a.popularityScore;
      });
  }, [searchQuery, selectedCategory, selectedOpd, selectedChannel, sortBy]);

  return (
    <div className="w-full bg-surface min-h-[calc(100vh-5rem)] text-on-surface">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-4 sm:right-8 z-50 max-w-md bg-[#05241B] text-white p-3.5 rounded-xl shadow-2xl border border-emerald-500/50 flex items-center gap-2.5 animate-in fade-in slide-in-from-top-4 duration-200">
          <Icon className="material-symbols-outlined text-[#8af7c9] text-[20px]">info</Icon>
          <div className="text-xs sm:text-sm font-medium">
            {toastMessage}
          </div>
        </div>
      )}

      {/* Top Sovereign Header / Hero Breadcrumb Band */}
      <section className="w-full bg-primary-container text-on-primary py-8 sm:py-10 relative overflow-hidden shadow-md">
        {/* Ambient Civic Glow Shapes */}
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-secondary/15 blur-3xl pointer-events-none"></div>
        <div className="absolute left-1/3 -bottom-20 w-80 h-80 rounded-full bg-secondary-container/10 blur-2xl pointer-events-none"></div>

        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col gap-4">
          {/* Breadcrumbs & Live System Status */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-label-md text-xs sm:text-sm text-on-primary-container">
              <a className="hover:text-secondary-fixed transition-colors flex items-center gap-1" href="#beranda">
                <Icon className="material-symbols-outlined text-[16px]">home</Icon>
                <span>Beranda</span>
              </a>
              <Icon className="material-symbols-outlined text-[14px] text-outline">chevron_right</Icon>
              <span className="text-on-primary-container">Direktori Layanan Publik</span>
              <Icon className="material-symbols-outlined text-[14px] text-outline">chevron_right</Icon>
              <span className="text-secondary-fixed font-semibold">Semua Layanan</span>
            </nav>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-lowest/10 backdrop-blur-sm text-secondary-fixed text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-pulse"></span>
              <span>Sistem Terintegrasi SPBE &amp; MPP Digital • 48 Layanan Terdaftar Aktif</span>
            </div>
          </div>

          {/* Main Headline Content */}
          <div className="max-w-4xl flex flex-col gap-2 mt-2">
            <div className="inline-flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-tertiary-fixed font-label-md text-[11px] tracking-wider uppercase font-bold bg-tertiary-container/30">
                DIREKTORI LENGKAP LAYANAN PUBLIK KAB. SIDOARJO
              </span>
            </div>
            <h1 className="font-headline-lg text-2xl sm:text-3xl lg:text-4xl text-on-primary tracking-tight font-extrabold leading-tight">
              Eksplorasi Seluruh Layanan Publik Sidoarjo
            </h1>
            <p className="font-body-md text-sm sm:text-base text-on-primary-container/90 leading-relaxed max-w-3xl">
              Temukan dan akses secara terpadu seluruh layanan administrasi kependudukan, perizinan berusaha, kesehatan, bantuan sosial, perpajakan, dan ketenagakerjaan dalam satu portal digital tanpa tatap muka.
            </p>
          </div>
        </div>
      </section>

      {/* Main Work Surface */}
      <main className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
        {/* Filter & Search Console (Card Surface Layer) */}
        <section className="w-full bg-surface-container-lowest rounded-2xl shadow-md p-5 sm:p-6 lg:p-7 flex flex-col gap-4 -mt-10 sm:-mt-12 relative z-20 border border-surface-container-high/80">
          {/* Search Field with Integrated Quick Action */}
          <div className="flex flex-col lg:flex-row items-stretch gap-3">
            <div className="relative flex-1 flex items-center bg-surface-container-low rounded-xl px-4 py-3 shadow-inner border border-surface-container-high/40">
              <Icon className="material-symbols-outlined text-secondary text-[24px] mr-3 shrink-0">search</Icon>
              <input
                aria-label="Cari layanan publik"
                className="w-full bg-transparent text-on-surface placeholder:text-outline font-body-md text-sm sm:text-base outline-none"
                id="searchInput"
                placeholder="Cari layanan (contoh: KTP, NIB, SIPRAJA, PBB, BPJS, Akta, Sanitasi, Beasiswa)..."
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="mr-2 text-outline hover:text-on-surface text-xs font-semibold"
                >
                  <Icon className="material-symbols-outlined text-[18px]">close</Icon>
                </button>
              )}
              <button
                onClick={handleResetFilters}
                className="shrink-0 px-3 py-1.5 rounded-lg bg-surface-container-highest text-on-surface-variant font-label-md text-xs hover:bg-surface-variant transition-colors flex items-center gap-1 font-semibold"
                type="button"
              >
                <Icon className="material-symbols-outlined text-[16px]">tune</Icon>
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>

            {/* OPD Filter */}
            <div className="relative min-w-[220px]">
              <select
                className="w-full h-full min-h-[48px] px-3.5 py-2.5 bg-surface-container-low text-on-surface font-label-lg text-xs sm:text-sm rounded-xl outline-none cursor-pointer appearance-none pr-10 hover:bg-surface-container transition-colors border border-surface-container-high/40"
                value={selectedOpd}
                onChange={(e) => setSelectedOpd(e.target.value)}
              >
                <option value="all">Semua Instansi / OPD</option>
                <option value="disdukcapil">Disdukcapil (Kependudukan)</option>
                <option value="dpmptsp">DPMPTSP (Perizinan &amp; MPP)</option>
                <option value="bppd">BPPD (Pajak &amp; Retribusi)</option>
                <option value="dinkes">Dinas Kesehatan</option>
                <option value="dinsos">Dinas Sosial</option>
                <option value="disnaker">Dinas Tenaga Kerja</option>
                <option value="kecamatan">Kecamatan &amp; Kelurahan (SIPRAJA)</option>
                <option value="dinas-pu">Dinas Perkim CKTR</option>
                <option value="dinkop">Dinas Koperasi &amp; UMKM</option>
                <option value="diskominfo">Diskominfo (Pengaduan 112)</option>
              </select>
              <Icon className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none text-[20px]">
                expand_more
              </Icon>
            </div>

            {/* Kanal Akses Filter */}
            <div className="relative min-w-[190px]">
              <select
                className="w-full h-full min-h-[48px] px-3.5 py-2.5 bg-surface-container-low text-on-surface font-label-lg text-xs sm:text-sm rounded-xl outline-none cursor-pointer appearance-none pr-10 hover:bg-surface-container transition-colors border border-surface-container-high/40"
                value={selectedChannel}
                onChange={(e) => setSelectedChannel(e.target.value)}
              >
                <option value="all">Semua Kanal Akses</option>
                <option value="online">100% Online Digital</option>
                <option value="mpp">Booking MPP &amp; Tatap Muka</option>
                <option value="adm">Mesin ADM Mandiri</option>
                <option value="mobile">Aplikasi Mobile / Host-to-Host</option>
              </select>
              <Icon className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none text-[20px]">
                expand_more
              </Icon>
            </div>

            {/* Urutkan Filter */}
            <div className="relative min-w-[170px]">
              <select
                className="w-full h-full min-h-[48px] px-3.5 py-2.5 bg-surface-container-low text-on-surface font-label-lg text-xs sm:text-sm rounded-xl outline-none cursor-pointer appearance-none pr-10 hover:bg-surface-container transition-colors border border-surface-container-high/40"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="popular">Paling Sering Digunakan</option>
                <option value="newest">Layanan Terbaru</option>
                <option value="az">Nama Layanan (A - Z)</option>
                <option value="time">Estimasi Tercepat</option>
              </select>
              <Icon className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none text-[20px]">
                sort
              </Icon>
            </div>
          </div>

          {/* Quick Filter Pills / Service Taxonomies */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-1">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-4 py-2 rounded-full font-label-lg text-xs sm:text-sm shrink-0 flex items-center gap-1.5 transition-all font-semibold ${
                    isActive
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'bg-surface-container text-on-surface hover:bg-secondary-container/40'
                  }`}
                >
                  <Icon className={`material-symbols-outlined text-[18px] ${
                      isActive ? 'text-white' : 'text-secondary'
                    }`}
                  >
                    {cat.icon}
                  </Icon>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Meta Bar: Counter, Transparency Badges & View Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
          <div className="flex items-center gap-3 flex-wrap">
            <p className="font-title-md text-base sm:text-lg font-bold text-on-surface">
              Menampilkan <span className="text-secondary">{filteredServices.length}</span> dari{' '}
              <span className="text-primary">{directoryServicesData.length}</span> Layanan Publik Resmi Pemkab Sidoarjo
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-container/30 text-on-secondary-container font-label-md text-xs font-bold">
              <Icon className="material-symbols-outlined text-[14px] text-secondary">verified_user</Icon>
              <span>Semua Layanan Bebas Pungli • 100% Transparan</span>
            </div>
          </div>

          {/* View Switcher */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="font-label-md text-xs text-on-surface-variant hidden lg:inline">Tampilan:</span>
            <div className="flex items-center p-1 bg-surface-container rounded-xl shadow-xs border border-surface-container-high/40">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 rounded-lg flex items-center gap-1 font-label-md text-xs font-semibold transition-all ${
                  viewMode === 'grid'
                    ? 'bg-surface-container-lowest text-primary shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
                title="Tampilan Kartu / Grid"
              >
                <Icon className="material-symbols-outlined text-[18px]">grid_view</Icon>
                <span className="hidden md:inline">Grid</span>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1 rounded-lg flex items-center gap-1 font-label-md text-xs font-semibold transition-all ${
                  viewMode === 'table'
                    ? 'bg-surface-container-lowest text-primary shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
                title="Tampilan Baris / Tabel"
              >
                <Icon className="material-symbols-outlined text-[18px]">table_rows</Icon>
                <span className="hidden md:inline">Daftar</span>
              </button>
            </div>
          </div>
        </div>

        {/* Services Directory: Grid or Table View */}
        {filteredServices.length === 0 ? (
          <div className="bg-surface-container-lowest rounded-2xl p-12 text-center flex flex-col items-center justify-center gap-3 border border-surface-container-high">
            <Icon className="material-symbols-outlined text-outline text-[48px]">search_off</Icon>
            <h3 className="font-title-md text-lg font-bold text-primary">Layanan Tidak Ditemukan</h3>
            <p className="font-body-sm text-sm text-on-surface-variant max-w-md">
              Tidak ada layanan yang sesuai dengan kata kunci atau filter yang Anda pilih. Silakan gunakan kata kunci lain atau reset filter.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-2 px-4 py-2 rounded-xl bg-secondary text-white font-label-md text-sm font-semibold hover:bg-secondary/90 transition-colors shadow-sm"
            >
              Reset Semua Filter
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* 12-Card Grid */
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <article
                key={service.id}
                onClick={() => handleServiceClick(service)}
                className="group bg-surface-container-lowest rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden border border-surface-container-high/60 cursor-pointer"
              >
                <div className="absolute top-0 left-0 w-1.5 h-full bg-secondary"></div>
                <div>
                  {/* Tags Header */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-surface-container-high text-primary font-label-md text-[11px] font-semibold">
                      <Icon className="material-symbols-outlined text-[14px]">account_balance</Icon>
                      {service.opd}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-label-md text-[11px] font-bold ${
                        service.badgeType === 'error'
                          ? 'bg-error-container text-on-error-container'
                          : service.badgeType === 'warning'
                          ? 'bg-tertiary-container/30 text-tertiary'
                          : service.badgeType === 'primary'
                          ? 'bg-surface-container-highest text-on-surface-variant'
                          : 'bg-secondary-container/40 text-on-secondary-container'
                      }`}
                    >
                      <Icon className="material-symbols-outlined text-[13px]">{service.badgeIcon}</Icon>
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="font-title-md text-lg font-bold text-on-surface group-hover:text-secondary transition-colors mb-2 leading-snug">
                    {service.title}
                  </h3>
                  <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-4 line-clamp-3">
                    {service.description}
                  </p>

                  {/* Metrics Band */}
                  <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-surface-container-low mb-4 border border-surface-container-high/40">
                    <div>
                      <span className="font-label-md text-[11px] text-on-surface-variant block">
                        {service.metricLabel1}
                      </span>
                      <span className="font-label-lg text-xs sm:text-sm font-bold text-on-surface">
                        {service.metricValue1}
                      </span>
                    </div>
                    <div>
                      <span className="font-label-md text-[11px] text-on-surface-variant block">
                        {service.metricLabel2}
                      </span>
                      <span className="font-label-lg text-xs sm:text-sm font-bold text-secondary">
                        {service.metricValue2}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-surface-container">
                  <span className="font-label-md text-xs sm:text-sm font-semibold text-secondary hover:underline flex items-center gap-1">
                    <span>{service.secondaryActionLabel}</span>
                    <Icon className="material-symbols-outlined text-[16px]">
                      {service.secondaryActionIcon}
                    </Icon>
                  </span>
                  {service.detailRoute ? (
                    <button
                      onClick={(e) => handleApplyClick(e, service)}
                      className="px-3.5 py-2 rounded-xl bg-secondary text-white font-label-lg text-xs sm:text-sm hover:bg-secondary/90 transition-all font-semibold flex items-center gap-1 shadow-sm active:scale-95 cursor-pointer"
                    >
                      <span>{service.primaryActionLabel}</span>
                      <Icon className="material-symbols-outlined text-[16px]">arrow_forward</Icon>
                    </button>
                  ) : (
                    <button
                      onClick={(e) => handleApplyClick(e, service)}
                      className="px-3.5 py-2 rounded-xl bg-surface-container-high text-on-surface-variant font-label-lg text-xs sm:text-sm border border-outline-variant/40 transition-all font-semibold flex items-center gap-1 cursor-pointer hover:bg-surface-container"
                      title="Halaman layanan ini belum tersedia di Google Stitch"
                    >
                      <span>Belum Tersedia</span>
                      <Icon className="material-symbols-outlined text-[16px]">schedule</Icon>
                    </button>
                  )}
                </div>
              </article>
            ))}
          </section>
        ) : (
          /* Table / List View */
          <div className="w-full bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container-high overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-surface-container-low text-on-surface-variant font-label-md text-xs border-b border-surface-container">
                  <tr>
                    <th className="py-3.5 px-4 font-bold">Nama Layanan</th>
                    <th className="py-3.5 px-4 font-bold">Instansi / OPD</th>
                    <th className="py-3.5 px-4 font-bold">Kanal Akses</th>
                    <th className="py-3.5 px-4 font-bold">Estimasi SLA</th>
                    <th className="py-3.5 px-4 font-bold">Biaya</th>
                    <th className="py-3.5 px-4 font-bold text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container">
                  {filteredServices.map((service) => (
                    <tr
                      key={service.id}
                      onClick={() => handleServiceClick(service)}
                      className="hover:bg-surface-container-low/50 transition-colors cursor-pointer"
                    >
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-on-surface hover:text-secondary transition-colors">
                          {service.title}
                        </div>
                        <div className="text-xs text-on-surface-variant line-clamp-1">
                          {service.description}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded bg-surface-container text-primary text-xs font-semibold">
                          {service.opd}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="text-xs text-secondary font-medium flex items-center gap-1">
                          <Icon className="material-symbols-outlined text-[14px]">{service.badgeIcon}</Icon>
                          {service.badge}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap text-xs font-semibold text-on-surface">
                        {service.metricValue1}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap text-xs font-bold text-secondary">
                        {service.metricValue2}
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        {service.detailRoute ? (
                          <button
                            onClick={(e) => handleApplyClick(e, service)}
                            className="px-3 py-1.5 rounded-lg bg-secondary text-white font-label-md text-xs font-semibold hover:bg-secondary/90 transition-colors shadow-xs cursor-pointer"
                          >
                            {service.primaryActionLabel}
                          </button>
                        ) : (
                          <button
                            onClick={(e) => handleApplyClick(e, service)}
                            className="px-3 py-1.5 rounded-lg bg-surface-container-high text-on-surface-variant border border-outline-variant/40 font-label-md text-xs font-semibold cursor-pointer hover:bg-surface-container"
                            title="Halaman layanan ini belum tersedia di Google Stitch"
                          >
                            Belum Tersedia
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pagination & Bottom Record Summary */}
        <div className="w-full bg-surface-container-lowest rounded-2xl p-4 sm:p-5 shadow-sm border border-surface-container-high flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-body-sm text-xs sm:text-sm text-on-surface-variant font-medium">
            Menampilkan <strong className="text-on-surface">1 - {filteredServices.length}</strong> dari total{' '}
            <strong className="text-on-surface">48</strong> layanan terdaftar aktif
          </span>
          <nav aria-label="Pagination Katalog Layanan" className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`w-9 h-9 rounded-xl flex items-center justify-center font-label-md text-xs transition-colors ${
                currentPage === 1
                  ? 'bg-surface-container text-outline cursor-not-allowed opacity-60'
                  : 'bg-surface-container hover:bg-secondary-container/50 text-on-surface'
              }`}
            >
              <Icon className="material-symbols-outlined text-[18px]">chevron_left</Icon>
            </button>
            {[1, 2, 3, 4].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 rounded-xl flex items-center justify-center font-label-md text-xs font-bold transition-all ${
                  currentPage === page
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-surface-container hover:bg-secondary-container/50 text-on-surface'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(4, p + 1))}
              disabled={currentPage === 4}
              className={`w-9 h-9 rounded-xl flex items-center justify-center font-label-md text-xs transition-colors ${
                currentPage === 4
                  ? 'bg-surface-container text-outline cursor-not-allowed opacity-60'
                  : 'bg-surface-container hover:bg-secondary-container/50 text-on-surface'
              }`}
            >
              <Icon className="material-symbols-outlined text-[18px]">chevron_right</Icon>
            </button>
          </nav>
        </div>

        {/* Panduan Akses Cepat & Bantuan Warga (Quick Support Triad) */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
          {/* Feature Card 1 */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-surface-container-high/60 flex flex-col justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-secondary-container/50 text-secondary flex items-center justify-center shrink-0">
                <Icon className="material-symbols-outlined text-[28px]">support_agent</Icon>
              </div>
              <div>
                <h4 className="font-title-md text-base font-bold text-on-surface leading-tight mb-1">
                  Butuh Bantuan Memilih Layanan?
                </h4>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  Bingung dokumen yang sesuai untuk kebutuhan perizinan usaha atau KK baru Anda? Konsultasikan langsung via Live Chat Helpdesk.
                </p>
              </div>
            </div>
            <a
              className="inline-flex items-center gap-1.5 font-label-lg text-xs sm:text-sm font-bold text-secondary hover:text-primary transition-colors pt-2 border-t border-surface-container"
              href="#helpdesk"
            >
              <span>Tanya Asisten SITAPAK</span>
              <Icon className="material-symbols-outlined text-[18px]">arrow_outward</Icon>
            </a>
          </div>

          {/* Feature Card 2 */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-surface-container-high/60 flex flex-col justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary-container text-secondary-fixed flex items-center justify-center shrink-0">
                <Icon className="material-symbols-outlined text-[28px]">accessible_forward</Icon>
              </div>
              <div>
                <h4 className="font-title-md text-base font-bold text-on-surface leading-tight mb-1">
                  Layanan Prioritas Ramah Inklusi
                </h4>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  Program jemput bola perekaman adminduk ke rumah bagi warga lanjut usia di atas 60 tahun, penyandang disabilitas, dan warga sakit menahun.
                </p>
              </div>
            </div>
            <a
              className="inline-flex items-center gap-1.5 font-label-lg text-xs sm:text-sm font-bold text-secondary hover:text-primary transition-colors pt-2 border-t border-surface-container"
              href="#prioritas"
            >
              <span>Permohonan Jemput Bola</span>
              <Icon className="material-symbols-outlined text-[18px]">arrow_outward</Icon>
            </a>
          </div>

          {/* Feature Card 3 */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-surface-container-high/60 flex flex-col justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-tertiary-container/20 text-tertiary flex items-center justify-center shrink-0">
                <Icon className="material-symbols-outlined text-[28px]">shield</Icon>
              </div>
              <div>
                <h4 className="font-title-md text-base font-bold text-on-surface leading-tight mb-1">
                  Kanal Bebas Pungli &amp; Saber Pungli
                </h4>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  Seluruh penerbitan identitas dan rekomendasi bebas biaya pungli. Ada indikasi calo atau pungutan tak resmi? Laporkan secara rahasia (WBS).
                </p>
              </div>
            </div>
            <a
              className="inline-flex items-center gap-1.5 font-label-lg text-xs sm:text-sm font-bold text-secondary hover:text-primary transition-colors pt-2 border-t border-surface-container"
              href="#wbs"
            >
              <span>Lapor Whistleblowing Pemkab</span>
              <Icon className="material-symbols-outlined text-[18px]">arrow_outward</Icon>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LayananPage;
