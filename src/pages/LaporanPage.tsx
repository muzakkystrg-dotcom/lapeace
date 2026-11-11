import React, { useState, useRef } from 'react';
import { CitizenAccount } from '../types/portal';

// Type definitions for citizen reports and tracking
export type ReportCategory =
  | 'infrastruktur'
  | 'kesehatan'
  | 'kependudukan'
  | 'darurat'
  | 'sampah'
  | 'lampu-jalan'
  | 'fasilitas-umum';

export type ReportStatus =
  | 'Menunggu Verifikasi'
  | 'Verifikasi Diskominfo'
  | 'Disposisi OPD'
  | 'Penanganan Lapangan'
  | 'Selesai';

export interface TimelineStep {
  stepNumber: number;
  title: string;
  stageName: string;
  statusText: string;
  timestamp: string;
  description: string;
  officerOrSystem: string;
  completed: boolean;
  active?: boolean;
}

export interface CitizenReportItem {
  ticketNumber: string;
  title: string;
  category: ReportCategory;
  categoryLabel: string;
  categoryIcon: string;
  description: string;
  kecamatan: string;
  kelurahan: string;
  locationAddress: string;
  coordinates: string;
  submitDate: string;
  submitTime: string;
  urgency: 'Prioritas Reguler' | 'Urgensi Tinggi' | 'Darurat Medis / Bencana';
  status: ReportStatus;
  progressPercent: number; // 0 - 100
  currentStageText: string;
  slaTarget: string;
  estimatedCompletion: string;
  assignedOpd: string;
  dispositionNumber?: string;
  isAnonymous: boolean;
  reporterName: string;
  photoUrl: string;
  photoFileName: string;
  photoSize: string;
  afterPhotoUrl?: string;
  officialResponse?: {
    officerName: string;
    officerRole: string;
    officerOpd: string;
    officerInitials: string;
    responseTime: string;
    message: string;
    attachmentPdf?: string;
  };
  timeline: TimelineStep[];
}

export interface LaporanPageProps {
  onNavigateHome?: () => void;
  initialTicket?: string;
  currentUser?: CitizenAccount | null;
  onOpenLogin?: () => void;
  onOpenRegister?: () => void;
}

// 18 Kecamatan in Sidoarjo
const SIDOARJO_KECAMATAN = [
  'Sidoarjo (Kota)',
  'Buduran',
  'Candi',
  'Porong',
  'Krembung',
  'Tulangan',
  'Tanggulangin',
  'Jabon',
  'Tarik',
  'Prambon',
  'Wonoayu',
  'Sukodono',
  'Taman',
  'Krian',
  'Balongbendo',
  'Sedati',
  'Waru',
  'Gedangan',
];

// Initial mock database of citizen reports matching Stitch designs
const INITIAL_REPORTS: CitizenReportItem[] = [
  {
    ticketNumber: 'LAPOR-2025-0814',
    title: 'Jalan Berlubang di Jl. Pahlawan Dekat SDN Sidokumpul',
    category: 'infrastruktur',
    categoryLabel: 'Infrastruktur & Bina Marga',
    categoryIcon: 'construction',
    description:
      'Terdapat lubang jalan sedalam kurang lebih 15 cm di lajur kiri Jl. Pahlawan No. 42 yang membahayakan pengendara roda dua, terutama saat malam hari dan saat hujan tergenang air.',
    kecamatan: 'Sidoarjo (Kota)',
    kelurahan: 'Kel. Sidokumpul',
    locationAddress: 'Jl. Pahlawan No. 42, Kel. Sidokumpul, Kec. Sidoarjo Kota',
    coordinates: '-7.4478° S, 112.7183° E',
    submitDate: '29 Oktober 2026',
    submitTime: '14:32 WIB',
    urgency: 'Prioritas Reguler',
    status: 'Penanganan Lapangan',
    progressPercent: 75,
    currentStageText: 'Tahap 3 dari 4: Penanganan Lapangan TRC',
    slaTarget: '3x24 Jam Kerja',
    estimatedCompletion: '2 November 2026',
    assignedOpd: 'Dinas PU Bina Marga & Sumber Daya Air Sidoarjo',
    dispositionNumber: 'DSP/BM/2026/1029',
    isAnonymous: false,
    reporterName: 'Budi Santoso',
    photoUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDRRJDZqFD8FgmrIGkXhxUpRuzc01o8NOc0u2KnO_CNRxNWck1nUdpxmmWl1g1dWKQQ_hxyo8-x21GEvz-nYzooUq3MuYz_oo9JT3Z-3Px4JihFA-oEr-X_Zc5clCKGwP1HOiI3-zg_bWHGaJw6gUTCHFQ3Eu2nfh8PSVx7mwAx46BsqbrzCoa0KOefocUT-Gl9wbLb95CkINr-RPkbP6rF2uBtMpLFf8jqFLmo9r2I',
    photoFileName: 'foto_jalan_rusak_pahlawan.jpg',
    photoSize: '1.8 MB',
    afterPhotoUrl:
      'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=800&q=80',
    officialResponse: {
      officerName: 'Ir. H. Hendra Setiawan',
      officerRole: 'Koordinator Unit Pemeliharaan Jalan Wilayah Tengah',
      officerOpd: 'Dinas Pekerjaan Umum & Bina Marga Sidoarjo',
      officerInitials: 'HS',
      responseTime: '31 Oktober 2026, 11:45 WIB',
      message:
        'Laporan telah diverifikasi dan masuk SPK Tim Reaksi Cepat (TRC). Penambalan aspal cold-mix dijadwalkan selesai pada 2 November 2026. Mohon berhati-hati saat melintas di lokasi.',
      attachmentPdf: 'SPK-BM-2026/XI/082.pdf (1.2 MB)',
    },
    timeline: [
      {
        stepNumber: 1,
        title: 'Tahap 1: Laporan Diterima Sistem',
        stageName: 'Diterima',
        statusText: 'Tercatat Resmi',
        timestamp: '29 Oktober 2026, 14:32 WIB',
        description:
          'Laporan berhasil diterima oleh sistem SITAPAK dan nomor registrasi tiket resmi diterbitkan.',
        officerOrSystem: 'Gateway Digital SITAPAK V2.4 (Otomatis)',
        completed: true,
      },
      {
        stepNumber: 2,
        title: 'Tahap 2: Verifikasi Tim Diskominfo',
        stageName: 'Verifikasi Diskominfo',
        statusText: 'Tervalidasi',
        timestamp: '30 Oktober 2026, 09:15 WIB',
        description:
          'Bukti foto, kelengkapan berkas, dan keakuratan koordinat GPS divalidasi oleh verifikator SP4N-LAPOR! Sidoarjo.',
        officerOrSystem: 'Rahmat Danu, S.Kom (Helpdesk SP4N-LAPOR Sidoarjo)',
        completed: true,
      },
      {
        stepNumber: 3,
        title: 'Tahap 3: Disposisi & Penanganan Lapangan',
        stageName: 'Penanganan Lapangan',
        statusText: 'Sedang Berjalan',
        timestamp: '31 Oktober 2026, 11:20 WIB',
        description:
          'Survei fisik telah selesai. Tim Reaksi Cepat Bina Marga dikerahkan ke lokasi untuk penambalan aspal jalan.',
        officerOrSystem: 'Dinas PU Bina Marga & SDA (No. Disposisi: DSP/BM/2026/1029)',
        completed: true,
        active: true,
      },
      {
        stepNumber: 4,
        title: 'Tahap 4: Selesai & Evaluasi Kepuasan (IKM)',
        stageName: 'Selesai',
        statusText: 'Estimasi 2 Nov 2026',
        timestamp: 'Estimasi: 2 November 2026, 16:00 WIB',
        description:
          'Pekerjaan fisik selesai 100%, foto dokumentasi diunggah, dan Berita Acara Penyelesaian diterbitkan untuk penilaian kepuasan pelapor.',
        officerOrSystem: 'Sistem Penilaian IKM SITAPAK',
        completed: false,
      },
    ],
  },
  {
    ticketNumber: 'LP-2024-0891',
    title: 'Lampu Penerangan Jalan Umum Mati Sepanjang Jl. Lingkar Barat',
    category: 'lampu-jalan',
    categoryLabel: 'Lampu Jalan (PJU)',
    categoryIcon: 'lightbulb',
    description:
      'Tiga titik tiang lampu penerangan jalan umum mati total di area Jl. Lingkar Barat KM 4, membahayakan pengendara malam hari.',
    kecamatan: 'Sidoarjo (Kota)',
    kelurahan: 'Kel. Magersari',
    locationAddress: 'Jl. Lingkar Barat KM 4, Kel. Magersari, Sidoarjo',
    coordinates: '-7.4520° S, 112.7090° E',
    submitDate: '14 Oktober 2024',
    submitTime: '19:30 WIB',
    urgency: 'Prioritas Reguler',
    status: 'Menunggu Verifikasi',
    progressPercent: 33,
    currentStageText: 'Tahap 1 dari 4: Verifikasi Administrasi',
    slaTarget: '2x24 Jam',
    estimatedCompletion: '16 Oktober 2024',
    assignedOpd: 'Dinas Perhubungan Kabupaten Sidoarjo',
    isAnonymous: false,
    reporterName: 'Warga Magersari',
    photoUrl:
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80',
    photoFileName: 'pju_mati_lingkar_barat.jpg',
    photoSize: '2.1 MB',
    timeline: [
      {
        stepNumber: 1,
        title: 'Tahap 1: Laporan Diterima Sistem',
        stageName: 'Diterima',
        statusText: 'Menunggu Verifikasi',
        timestamp: '14 Oktober 2024, 19:30 WIB',
        description: 'Laporan masuk antrean verifikasi bukti foto dan kelayakan data.',
        officerOrSystem: 'Piket Command Center 112 Sidoarjo',
        completed: true,
        active: true,
      },
      {
        stepNumber: 2,
        title: 'Tahap 2: Verifikasi & Disposisi Dishub',
        stageName: 'Verifikasi Diskominfo',
        statusText: 'Antrean',
        timestamp: 'Estimasi: 15 Okt 2024',
        description: 'Pemeriksaan nomor tiang PJU dan jaringan panel.',
        officerOrSystem: 'Dinas Perhubungan Sidoarjo',
        completed: false,
      },
      {
        stepNumber: 3,
        title: 'Tahap 3: Perbaikan Lampu & Jaringan',
        stageName: 'Penanganan Lapangan',
        statusText: 'Mendatang',
        timestamp: 'Estimasi: 15-16 Okt 2024',
        description: 'Penggantian bohlam LED dan trafo oleh teknisi Dishub.',
        officerOrSystem: 'Tim PJU Dishub Sidoarjo',
        completed: false,
      },
      {
        stepNumber: 4,
        title: 'Tahap 4: Tuntas & Terang Kembali',
        stageName: 'Selesai',
        statusText: 'Mendatang',
        timestamp: 'Estimasi: 16 Okt 2024',
        description: 'Uji nyala malam hari dan penerbitan laporan tuntas.',
        officerOrSystem: 'Dishub & SITAPAK',
        completed: false,
      },
    ],
  },
  {
    ticketNumber: 'LP-2024-0842',
    title: 'Tumpukan Sampah Liar Menutupi Saluran Air Pasar Krian',
    category: 'sampah',
    categoryLabel: 'Kebersihan & Sampah',
    categoryIcon: 'delete_sweep',
    description:
      'Timbulan sampah plastik dan limbah lapak pedagang menumpuk di saluran pembuangan air sisi barat Pasar Krian, menyebabkan bau tidak sedap dan saluran tersumbat.',
    kecamatan: 'Krian',
    kelurahan: 'Kel. Krian',
    locationAddress: 'Kawasan Pasar Krian, Sisi Barat, Kel. Krian',
    coordinates: '-7.4112° S, 112.5841° E',
    submitDate: '12 Oktober 2024',
    submitTime: '08:15 WIB',
    urgency: 'Prioritas Reguler',
    status: 'Penanganan Lapangan',
    progressPercent: 66,
    currentStageText: 'Tahap 3 dari 4: Petugas DLHK di Lokasi',
    slaTarget: '1x24 Jam',
    estimatedCompletion: '13 Oktober 2024',
    assignedOpd: 'Dinas Lingkungan Hidup & Kebersihan (DLHK) Sidoarjo',
    dispositionNumber: 'DSP/DLHK/X/441',
    isAnonymous: true,
    reporterName: 'Warga Peduli Krian (Anonim)',
    photoUrl:
      'https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?auto=format&fit=crop&w=800&q=80',
    photoFileName: 'sampah_saluran_pasar_krian.jpg',
    photoSize: '3.4 MB',
    afterPhotoUrl:
      'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80',
    officialResponse: {
      officerName: 'Siti Rahmawati, S.T.',
      officerRole: 'Kepala Bidang Pengelolaan Sampah & Kebersihan',
      officerOpd: 'DLHK Kabupaten Sidoarjo',
      officerInitials: 'SR',
      responseTime: '12 Oktober 2024, 13:00 WIB',
      message:
        'Armada dump truck dan tim penyapu jalan DLHK telah dikerahkan ke lokasi Pasar Krian. Pengangkutan sampah dan pengerukan sedimentasi saluran selesai sore ini.',
      attachmentPdf: 'BAP-Pembersihan-DLHK-842.pdf (890 KB)',
    },
    timeline: [
      {
        stepNumber: 1,
        title: 'Tahap 1: Laporan Diterima',
        stageName: 'Diterima',
        statusText: 'Tercatat',
        timestamp: '12 Oktober 2024, 08:15 WIB',
        description: 'Laporan warga anonim tercatat dengan perlindungan privasi penuh.',
        officerOrSystem: 'SITAPAK Gateway',
        completed: true,
      },
      {
        stepNumber: 2,
        title: 'Tahap 2: Verifikasi Diskominfo ke DLHK',
        stageName: 'Verifikasi Diskominfo',
        statusText: 'Selesai Verifikasi',
        timestamp: '12 Oktober 2024, 09:30 WIB',
        description: 'Disposisi cepat ke Pengawas DLHK Wilayah Barat.',
        officerOrSystem: 'Tim SP4N Diskominfo',
        completed: true,
      },
      {
        stepNumber: 3,
        title: 'Tahap 3: Pembersihan Armada Dump Truck',
        stageName: 'Penanganan Lapangan',
        statusText: 'Sedang Berlangsung',
        timestamp: '12 Oktober 2024, 11:00 WIB',
        description: 'Pengerukan saluran air dan pengangkutan 2 rit sampah ke TPA Jabon.',
        officerOrSystem: 'Regu Lapangan DLHK Sidoarjo',
        completed: true,
        active: true,
      },
      {
        stepNumber: 4,
        title: 'Tahap 4: Saluran Lancar & Selesai',
        stageName: 'Selesai',
        statusText: 'Estimasi Sore Ini',
        timestamp: '12 Oktober 2024, 16:00 WIB',
        description: 'Saluran bersih, foto tuntas diunggah, dan koordinasi dengan pengelola pasar.',
        officerOrSystem: 'DLHK Sidoarjo',
        completed: false,
      },
    ],
  },
  {
    ticketNumber: 'LP-2024-0799',
    title: 'Perbaikan Jalan Berlubang di Dekat SDN Sidokare 1',
    category: 'infrastruktur',
    categoryLabel: 'Jalan Rusak',
    categoryIcon: 'edit_road',
    description:
      'Lubang aspal di depan gerbang keluar SDN Sidokare 1 Jl. Diponegoro telah membahayakan anak-anak sekolah dan wali murid saat jam antar-jemput.',
    kecamatan: 'Sidoarjo (Kota)',
    kelurahan: 'Kel. Sidokare',
    locationAddress: 'Jl. Diponegoro No. 88, Sidokare, Sidoarjo',
    coordinates: '-7.4580° S, 112.7150° E',
    submitDate: '08 Oktober 2024',
    submitTime: '11:20 WIB',
    urgency: 'Prioritas Reguler',
    status: 'Selesai',
    progressPercent: 100,
    currentStageText: 'Tahap 4 dari 4: Tuntas 100% & Terverifikasi',
    slaTarget: '3x24 Jam',
    estimatedCompletion: '10 Oktober 2024',
    assignedOpd: 'Dinas PU Bina Marga & SDA Sidoarjo',
    dispositionNumber: 'DSP/BM/2024/799',
    isAnonymous: false,
    reporterName: 'Agus Priyono',
    photoUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCCuP5TXLCf5iF31flxK5PW-c50LQK1gWTlop_dIgWzCBzZ8l6SdO6chfTyLM-pA6FhaORLJ4D2oLrBMF7lXDh9XB5LA8Tmn59_AqZjLmVogrPn2yw5olmf1QaWjKz5JczQ-aDfFrqMZ23RszMCxuFTc5wv6O1hm3roC_ZsbCyJShT9PBo8epXScopKcSBnYOBQapPFBiodMeAGWS0v58o88HcZWCT71ZPGdQLUfWf6',
    photoFileName: 'jalan_rusak_sdn_sidokare.jpg',
    photoSize: '2.4 MB',
    afterPhotoUrl:
      'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=800&q=80',
    officialResponse: {
      officerName: 'Bambang Irawan, S.T.',
      officerRole: 'Kepala Seksi Pemeliharaan Jalan & Jembatan',
      officerOpd: 'Dinas PU Bina Marga & SDA Sidoarjo',
      officerInitials: 'BI',
      responseTime: '10 Oktober 2024, 15:30 WIB',
      message:
        'Pekerjaan pengaspalan ulang dan penambalan jalan di depan SDN Sidokare 1 telah tuntas 100%. Kondisi jalan kini rata dan aman dilewati warga.',
      attachmentPdf: 'BAP-Penyelesaian-Sidokare-799.pdf (1.5 MB)',
    },
    timeline: [
      {
        stepNumber: 1,
        title: 'Tahap 1: Laporan Diterima Sistem',
        stageName: 'Diterima',
        statusText: 'Tercatat',
        timestamp: '08 Oktober 2024, 11:20 WIB',
        description: 'Laporan pengaduan fasilitas jalan sekolah diterima.',
        officerOrSystem: 'SITAPAK Gateway',
        completed: true,
      },
      {
        stepNumber: 2,
        title: 'Tahap 2: Verifikasi Diskominfo',
        stageName: 'Verifikasi Diskominfo',
        statusText: 'Tervalidasi',
        timestamp: '08 Oktober 2024, 14:00 WIB',
        description: 'Validasi lapangan dan koordinasi tim reaksi cepat.',
        officerOrSystem: 'Diskominfo Sidoarjo',
        completed: true,
      },
      {
        stepNumber: 3,
        title: 'Tahap 3: Penanganan Lapangan TRC',
        stageName: 'Penanganan Lapangan',
        statusText: 'Selesai Dikerjakan',
        timestamp: '09 Oktober 2024, 16:30 WIB',
        description: 'Penambalan aspal hot-mix oleh unit pemeliharaan jalan.',
        officerOrSystem: 'Dinas PU Bina Marga',
        completed: true,
      },
      {
        stepNumber: 4,
        title: 'Tahap 4: Tuntas & IKM Bintang 5',
        stageName: 'Selesai',
        statusText: 'Tuntas 100%',
        timestamp: '10 Oktober 2024, 09:00 WIB',
        description: 'Dokumentasi foto selesai terverifikasi dan pelapor memberikan ulasan memuaskan.',
        officerOrSystem: 'Warga & Pemkab Sidoarjo',
        completed: true,
      },
    ],
  },
];

export const LaporanPage: React.FC<LaporanPageProps> = ({
  onNavigateHome,
  initialTicket,
  currentUser,
  onOpenLogin,
  onOpenRegister,
}) => {
  // Navigation / Tab state: 'buat-laporan' | 'lacak-laporan' | 'sukses'
  const [activeTab, setActiveTab] = useState<'buat-laporan' | 'lacak-laporan' | 'sukses'>('buat-laporan');

  // Reports state
  const [reportsList, setReportsList] = useState<CitizenReportItem[]>(INITIAL_REPORTS);
  const [selectedReport, setSelectedReport] = useState<CitizenReportItem>(INITIAL_REPORTS[0]);

  // Tracking tab filter: 'semua' | 'Menunggu Verifikasi' | 'Penanganan Lapangan' | 'Selesai'
  const [trackingFilter, setTrackingFilter] = useState<string>('semua');
  const [ticketSearchInput, setTicketSearchInput] = useState<string>(initialTicket || '');

  // Form states
  const [formCategory, setFormCategory] = useState<ReportCategory>('infrastruktur');
  const [formTitle, setFormTitle] = useState<string>('');
  const [formKecamatan, setFormKecamatan] = useState<string>('Sidoarjo (Kota)');
  const [formAddress, setFormAddress] = useState<string>('');
  const [formCoordinates, setFormCoordinates] = useState<string>('');
  const [formDescription, setFormDescription] = useState<string>('');
  const [formAnonymous, setFormAnonymous] = useState<boolean>(false);
  const [formPhoto, setFormPhoto] = useState<{
    name: string;
    size: string;
    url: string;
  } | null>(null);

  // UI feedback states
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const [draftSavedFeedback, setDraftSavedFeedback] = useState<boolean>(false);
  const [isPhotoPreviewOpen, setIsPhotoPreviewOpen] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Copy helper
  const handleCopyTicket = (code: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code).then(() => {
        setCopyFeedback(code);
        setTimeout(() => setCopyFeedback(null), 3000);
      });
    } else {
      setCopyFeedback(code);
      setTimeout(() => setCopyFeedback(null), 3000);
    }
  };

  // GPS auto-detect simulator
  const handleDetectGPS = () => {
    setFormAddress('Jl. Pahlawan No. 42, Kel. Sidokumpul, Kec. Sidoarjo Kota');
    setFormCoordinates('-7.4478° S, 112.7183° E');
    setFormKecamatan('Sidoarjo (Kota)');
  };

  // File upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fakeUrl = URL.createObjectURL(file);
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      setFormPhoto({
        name: file.name,
        size: `${sizeMB} MB`,
        url: fakeUrl,
      });
    }
  };

  // Form submit handler
  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      if (onOpenLogin) onOpenLogin();
      return;
    }
    if (!formTitle.trim() || !formDescription.trim()) return;

    // Generate ticket number dengan entropi kriptografis tinggi (Anti-Brute Force / IDOR)
    const entropyHex = Array.from(crypto.getRandomValues(new Uint8Array(3)))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')
      .toUpperCase();
    const newTicketNumber = `LAPOR-2025-${entropyHex}`;

    const now = new Date();
    const dateFormatted = now.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    const timeFormatted = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} WIB`;

    const categoryMap: Record<ReportCategory, { label: string; icon: string; opd: string }> = {
      infrastruktur: {
        label: 'Infrastruktur & Bina Marga',
        icon: 'construction',
        opd: 'Dinas PU Bina Marga & SDA Sidoarjo',
      },
      kesehatan: {
        label: 'Kesehatan & Layanan Faskes',
        icon: 'local_hospital',
        opd: 'Dinas Kesehatan Kabupaten Sidoarjo',
      },
      kependudukan: {
        label: 'Kependudukan & Catatan Sipil',
        icon: 'badge',
        opd: 'Dinas Kependudukan & Pencatatan Sipil',
      },
      darurat: {
        label: 'Kedaruratan & Bencana 112',
        icon: 'emergency',
        opd: 'Badan Penanggulangan Bencana Daerah (BPBD) / 112',
      },
      sampah: {
        label: 'Kebersihan & Persampahan',
        icon: 'delete_sweep',
        opd: 'Dinas Lingkungan Hidup & Kebersihan (DLHK)',
      },
      'lampu-jalan': {
        label: 'Lampu Penerangan Jalan Umum (PJU)',
        icon: 'lightbulb',
        opd: 'Dinas Perhubungan Kabupaten Sidoarjo',
      },
      'fasilitas-umum': {
        label: 'Fasilitas & Ketertiban Umum',
        icon: 'corporate_fare',
        opd: 'Satuan Polisi Pamong Praja (Satpol PP)',
      },
    };

    const catMeta = categoryMap[formCategory];

    const newReport: CitizenReportItem = {
      ticketNumber: newTicketNumber,
      title: formTitle,
      category: formCategory,
      categoryLabel: catMeta.label,
      categoryIcon: catMeta.icon,
      description: formDescription,
      kecamatan: formKecamatan,
      kelurahan: `Kel. ${formKecamatan.replace(' (Kota)', '')}`,
      locationAddress: formAddress,
      coordinates: formCoordinates,
      submitDate: dateFormatted,
      submitTime: timeFormatted,
      urgency: formCategory === 'darurat' ? 'Darurat Medis / Bencana' : 'Prioritas Reguler',
      status: 'Menunggu Verifikasi',
      progressPercent: 25,
      currentStageText: 'Tahap 1 dari 4: Menunggu Verifikasi Administrasi',
      slaTarget: formCategory === 'darurat' ? '< 15 Menit' : '3x24 Jam Kerja',
      estimatedCompletion: '3 Hari Kerja Mendatang',
      assignedOpd: catMeta.opd,
      isAnonymous: formAnonymous,
      reporterName: formAnonymous ? 'Warga Sidoarjo (Anonim)' : (currentUser?.fullName || 'Budi Santoso'),
      photoUrl: formPhoto
        ? formPhoto.url
        : 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=800&q=80',
      photoFileName: formPhoto ? formPhoto.name : 'lampiran_laporan.jpg',
      photoSize: formPhoto ? formPhoto.size : '1.2 MB',
      timeline: [
        {
          stepNumber: 1,
          title: 'Tahap 1: Laporan Diterima Sistem',
          stageName: 'Diterima',
          statusText: 'Tercatat',
          timestamp: `${dateFormatted}, ${timeFormatted}`,
          description:
            'Laporan pengaduan Anda telah terdaftar dalam sistem pangkalan data SP4N-LAPOR! & Call 112 Kabupaten Sidoarjo.',
          officerOrSystem: 'Gateway Digital SITAPAK V2.4 (Otomatis)',
          completed: true,
          active: true,
        },
        {
          stepNumber: 2,
          title: 'Tahap 2: Verifikasi Petugas Diskominfo',
          stageName: 'Verifikasi Diskominfo',
          statusText: 'Menunggu Antrean',
          timestamp: 'Estimasi: 1x24 Jam Kerja',
          description:
            'Petugas verifikator akan memeriksa keabsahan materi keluhan, koordinat lokasi, dan foto pendukung.',
          officerOrSystem: 'Helpdesk SP4N-LAPOR Diskominfo Sidoarjo',
          completed: false,
        },
        {
          stepNumber: 3,
          title: 'Tahap 3: Disposisi ke OPD & Tindak Lanjut',
          stageName: 'Disposisi OPD',
          statusText: 'Mendatang',
          timestamp: 'Estimasi: 2x24 Jam Kerja',
          description: `Disposisi penanganan teknis ke ${catMeta.opd} untuk pengecekan dan tindak lanjut lapangan.`,
          officerOrSystem: catMeta.opd,
          completed: false,
        },
        {
          stepNumber: 4,
          title: 'Tahap 4: Selesai & Penerbitan BAP Hasil',
          stageName: 'Selesai',
          statusText: 'Mendatang',
          timestamp: 'Estimasi: 3x24 Jam Kerja',
          description:
            'Pekerjaan selesai, foto hasil diunggah, dan warga diundang memberikan survei Indeks Kepuasan Masyarakat (IKM).',
          officerOrSystem: 'Sistem Terpadu Pelayanan Publik Sidoarjo',
          completed: false,
        },
      ],
    };

    // Prepend to reports list
    setReportsList([newReport, ...reportsList]);
    setSelectedReport(newReport);
    setFormTitle('');
    setFormDescription('');
    setFormAddress('');
    setFormCoordinates('');
    setFormPhoto(null);
    setActiveTab('sukses');
    window.scrollTo({ top: 120, behavior: 'smooth' });

    // Sinkronisasi data permohonan ke database backend SITAPAK
    fetch('/api/reports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: formTitle.trim(),
        category: formCategory,
        categoryLabel: catMeta.label,
        description: formDescription.trim(),
        kecamatan: formKecamatan,
        kelurahan: 'Sidokumpul',
        locationAddress: formAddress || 'Wilayah Kabupaten Sidoarjo',
        coordinates: formCoordinates || undefined,
        reporterName: formAnonymous ? 'Warga Sidoarjo (Anonim)' : (currentUser?.fullName || 'Budi Santoso'),
        isAnonymous: formAnonymous,
        assignedOpd: catMeta.opd,
        photoUrl: formPhoto ? formPhoto.url : undefined,
      }),
    }).catch((err) => {
      console.warn('Gagal sinkron laporan ke database backend:', err);
    });
  };

  // Search or select a ticket
  const handleSearchTicket = (e: React.FormEvent) => {
    e.preventDefault();
    const query = ticketSearchInput.trim().toUpperCase();
    if (!query) return;

    const found = reportsList.find(
      (r) =>
        r.ticketNumber.toUpperCase().includes(query) ||
        r.title.toLowerCase().includes(query.toLowerCase())
    );

    if (found) {
      setSelectedReport(found);
      setActiveTab('lacak-laporan');
    } else {
      alert(`Nomor tiket "${query}" tidak ditemukan dalam simulasi sistem.`);
    }
  };

  // Filtered reports for list
  const filteredReports = reportsList.filter((r) => {
    if (trackingFilter === 'semua') return true;
    return r.status === trackingFilter;
  });

  return (
    <div className="w-full bg-[#effdf4] min-h-screen text-[#121e19] selection:bg-[#88f4c6] selection:text-[#00251b]">
      
      {/* COPY TOAST FEEDBACK */}
      {copyFeedback && (
        <div className="fixed bottom-6 right-6 z-50 transform transition-all duration-300">
          <div className="px-5 py-3 rounded-xl bg-[#083c2e] text-white shadow-2xl flex items-center gap-3 border border-[#8af7c9]/40 text-sm font-semibold">
            <span className="material-symbols-outlined text-[#8af7c9] text-[20px]">check_circle</span>
            <span>Nomor Tiket <strong>{copyFeedback}</strong> berhasil disalin ke papan klip!</span>
          </div>
        </div>
      )}

      {/* DRAFT SAVED TOAST FEEDBACK */}
      {draftSavedFeedback && (
        <div className="fixed bottom-6 left-6 z-50 transform transition-all duration-300">
          <div className="px-5 py-3 rounded-xl bg-[#006c4d] text-white shadow-2xl flex items-center gap-3 border border-white/20 text-sm font-semibold">
            <span className="material-symbols-outlined text-white text-[20px]">drafts</span>
            <span>Draf formulir laporan Anda telah berhasil tersimpan di peramban.</span>
          </div>
        </div>
      )}

      {/* PHOTO PREVIEW MODAL */}
      {isPhotoPreviewOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsPhotoPreviewOpen(false)}
        >
          <div className="relative max-w-3xl w-full bg-[#083c2e] rounded-2xl overflow-hidden shadow-2xl border border-white/10" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 bg-[#05241b] flex items-center justify-between text-white border-b border-white/10">
              <span className="font-semibold text-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-[#8af7c9] text-[18px]">image</span>
                Pratinjau Foto Lampiran Aduan
              </span>
              <button
                type="button"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                onClick={() => setIsPhotoPreviewOpen(false)}
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <div className="p-4 flex items-center justify-center bg-black/40">
              <img
                src={selectedReport.photoUrl}
                alt="Lampiran Bukti Aduan"
                className="max-h-[70vh] w-auto object-contain rounded-lg"
              />
            </div>
            <div className="p-4 bg-[#083c2e] text-xs text-white/80 flex items-center justify-between">
              <span>{selectedReport.photoFileName} ({selectedReport.photoSize})</span>
              <span className="text-[#8af7c9] flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">verified</span> Terverifikasi EXIF GPS
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 1. BREADCRUMB & SOVEREIGN CIVIC HERO BANNER (Stitch 11 & 16) */}
      <section className="relative bg-[#083c2e] text-white overflow-hidden pt-6 pb-12 sm:pb-16 shadow-md border-b border-[#0f5441]">
        {/* Subtle Ambient Civic Geometric Background Glows */}
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-[#88f4c6]/10 blur-3xl pointer-events-none"></div>
        <div className="absolute left-1/3 -bottom-24 w-80 h-80 rounded-full bg-[#006c4d]/25 blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-[#bbedd9] mb-4">
            <button
              type="button"
              onClick={onNavigateHome}
              className="hover:text-white transition-colors flex items-center gap-1 font-medium"
            >
              <span className="material-symbols-outlined text-[16px]">home</span>
              Beranda
            </button>
            <span className="material-symbols-outlined text-[14px] text-white/50">chevron_right</span>
            <span className="text-white/80">Layanan Publik</span>
            <span className="material-symbols-outlined text-[14px] text-white/50">chevron_right</span>
            <span className="text-[#8af7c9] font-semibold">Kanal Pengaduan 112 &amp; SP4N-LAPOR!</span>
          </nav>

          {/* Hero Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#006c4d]/50 text-[#8af7c9] font-semibold text-xs border border-[#88f4c6]/30 shadow-xs">
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                  Kanal Resmi Pengaduan SITAPAK Sidoarjo
                </div>
                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-medium border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-[#8af7c9] animate-pulse"></span>
                  Terintegrasi SP4N-LAPOR! Nasional &amp; Call Center 112
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight font-display">
                Sampaikan Laporan &amp; Aspirasi Warga
              </h1>

              <p className="text-base sm:text-lg text-[#bbedd9] max-w-2xl leading-relaxed">
                Kanal satu pintu pengaduan fasilitas, kendala layanan publik, dan tanggap darurat Kabupaten Sidoarjo secara cepat, transparan, dan dapat dipantau hingga tuntas.
              </p>

              {/* Quick Reassurance Badges */}
              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm text-white text-xs sm:text-sm font-medium border border-white/15 shadow-xs">
                  <span className="material-symbols-outlined text-[#88f4c6] text-[18px]">domain_verification</span>
                  Langsung ke 32 OPD
                </div>
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm text-white text-xs sm:text-sm font-medium border border-white/15 shadow-xs">
                  <span className="material-symbols-outlined text-[#ffe087] text-[18px]">timer</span>
                  Respon 2×24 Jam
                </div>
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm text-white text-xs sm:text-sm font-medium border border-white/15 shadow-xs">
                  <span className="material-symbols-outlined text-[#88f4c6] text-[18px]">lock</span>
                  Bisa Anonim &amp; Terproteksi UU PDP
                </div>
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm text-white text-xs sm:text-sm font-medium border border-white/15 shadow-xs">
                  <span className="material-symbols-outlined text-[#ffe087] text-[18px]">payments</span>
                  Bebas Biaya (Rp 0)
                </div>
              </div>
            </div>

            {/* Visual Hero Badge / Civic Graphic (Stitch 11) */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="w-full max-w-xs bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/15 shadow-xl flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#88f4c6] flex items-center justify-center text-[#083c2e] mb-3 shadow-md">
                  <span className="material-symbols-outlined text-[36px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    how_to_reg
                  </span>
                </div>
                <span className="text-base font-bold text-white font-display">Partisipasi Warga Sidoarjo</span>
                <p className="text-xs text-[#bbedd9] mt-1">
                  <strong>98,4%</strong> aduan tahun ini selesai ditangani dengan transparan.
                </p>
                <div className="w-full mt-4 pt-3 flex items-center justify-between text-xs text-[#a0d1bd] border-t border-white/10">
                  <span>Server SITAPAK: Online</span>
                  <span className="flex items-center gap-1.5 text-[#88f4c6] font-semibold">
                    <span className="w-2 h-2 rounded-full bg-[#88f4c6] animate-pulse"></span> Siaga 24 Jam
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. EMERGENCY RED ALERT STRIP (Call 112 Red Card - Stitch 16 & 2) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20 w-full">
        <div className="bg-[#00251b] rounded-2xl p-4 sm:p-6 shadow-xl border border-red-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#ba1a1a] flex items-center justify-center text-white shrink-0 shadow-lg ring-4 ring-red-500/20">
              <span className="material-symbols-outlined text-[26px]">emergency</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white font-display">
                  Butuh Bantuan Tanggap Darurat Cepat?
                </h2>
                <span className="px-2 py-0.5 rounded bg-[#ffdad6] text-[#93000a] text-[11px] font-bold uppercase tracking-wide">
                  Siaga 24 Jam
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#bbedd9]/85 mt-0.5">
                Ambulans medis, pemadam kebakaran, kecelakaan lalu lintas, pohon tumbang, &amp; bencana alam bebas pulsa dari semua operator.
              </p>
            </div>
          </div>
          <a
            href="tel:112"
            className="w-full md:w-auto px-6 py-3 rounded-xl bg-[#ba1a1a] hover:bg-red-700 text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 shrink-0 group hover:scale-[1.02]"
          >
            <span className="material-symbols-outlined text-[20px] group-hover:animate-bounce">phone_in_talk</span>
            <span>Panggil Call Center 112 Bebas Pulsa</span>
          </a>
        </div>
      </section>

      {/* 3. CIVIC NAVIGATION TABS & QUICK KPI STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 w-full">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-4 border-b border-[#ddece3]">
          
          {/* Main Segmented Control for Modes */}
          <div className="inline-flex p-1.5 rounded-xl bg-[#e3f1e9] border border-[#d8e6de] shadow-inner gap-1">
            <button
              type="button"
              onClick={() => setActiveTab('buat-laporan')}
              className={`px-5 py-2.5 rounded-lg font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'buat-laporan'
                  ? 'bg-[#083c2e] text-white shadow-sm'
                  : 'text-[#404945] hover:text-[#00251b] hover:bg-white/60'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">rate_review</span>
              <span>Buat Laporan Baru</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('lacak-laporan')}
              className={`px-5 py-2.5 rounded-lg font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'lacak-laporan'
                  ? 'bg-[#083c2e] text-white shadow-sm'
                  : 'text-[#404945] hover:text-[#00251b] hover:bg-white/60'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">track_changes</span>
              <span>Pantau &amp; Lacak Laporan</span>
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-[#88f4c6] text-[#00251b] font-bold">
                {reportsList.length}
              </span>
            </button>

            {activeTab === 'sukses' && (
              <button
                type="button"
                onClick={() => setActiveTab('sukses')}
                className="px-5 py-2.5 rounded-lg font-semibold text-xs sm:text-sm flex items-center gap-2 bg-[#006c4d] text-white shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>Konfirmasi Sukses</span>
              </button>
            )}
          </div>

          {/* Quick Search Ticket Input in header */}
          <form onSubmit={handleSearchTicket} className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-64">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-[#717974]">search</span>
              <input
                type="text"
                placeholder="Cari No. Tiket (LAPOR-...)"
                value={ticketSearchInput}
                onChange={(e) => setTicketSearchInput(e.target.value)}
                className="w-full h-10 pl-9 pr-3 rounded-lg bg-white border border-[#d8e6de] text-xs text-[#121e19] focus:outline-none focus:ring-2 focus:ring-[#006c4d]"
              />
            </div>
            <button
              type="submit"
              className="h-10 px-4 rounded-lg bg-[#083c2e] hover:bg-[#00251b] text-white text-xs font-semibold flex items-center gap-1 transition-colors shadow-xs"
            >
              <span className="material-symbols-outlined text-[16px]">travel_explore</span>
              <span className="hidden sm:inline">Lacak</span>
            </button>
          </form>

        </div>
      </section>

      {/* 4. MAIN WORKSPACE DEPENDING ON ACTIVE TAB */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {/* ======================================================== */}
        {/* TAB 1: FORMULIR BUAT LAPORAN BARU (Stitch 11 & 16)       */}
        {/* ======================================================== */}
        {activeTab === 'buat-laporan' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Form Column (8 Cols) */}
            <section className="lg:col-span-8 flex flex-col">
              <div className="bg-white rounded-2xl shadow-sm border border-[#ddece3] p-6 sm:p-8">
                
                {/* Form Header */}
                <div className="flex items-start justify-between pb-4 mb-6 border-b border-[#e3f1e9]">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="material-symbols-outlined text-[#006c4d] text-[24px]">rate_review</span>
                      <h2 className="text-xl sm:text-2xl font-bold text-[#00251b] font-display">
                        Formulir Pengaduan SP4N-LAPOR! Mandiri
                      </h2>
                    </div>
                    <p className="text-xs sm:text-sm text-[#404945]">
                      Tuliskan rincian keluhan pelayanan atau fasilitas publik Sidoarjo dengan jelas dan faktual.
                    </p>
                  </div>
                  <span className="hidden sm:inline-flex px-3 py-1 rounded-full bg-[#e9f7ee] text-[#006c4d] border border-[#88f4c6]/60 text-xs font-semibold">
                    Wajib Valid
                  </span>
                </div>

                {/* Login Requirement Banner if not logged in */}
                {!currentUser ? (
                  <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-[#effdf4] border-2 border-[#006c4d]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#006c4d] text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                        <span className="material-symbols-outlined text-[22px]">lock</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm sm:text-base font-bold text-[#00251b] font-display">
                            Wajib Masuk / Login untuk Melapor
                          </h4>
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#ba1a1a] text-white">
                            Perlu Akun
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-[#404945] mt-1 leading-relaxed">
                          Sesuai standar SPBE, pelapor wajib memiliki <strong>Satu Akun Warga Terverifikasi</strong> untuk mencegah aduan palsu dan memastikan Anda menerima notifikasi penanganan real-time dari dinas terkait.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                      <button
                        type="button"
                        onClick={onOpenLogin}
                        className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-[#006c4d] hover:bg-[#005139] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-98"
                      >
                        <span className="material-symbols-outlined text-[16px]">login</span>
                        <span>Masuk</span>
                      </button>
                      <button
                        type="button"
                        onClick={onOpenRegister}
                        className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-[#8af7c9] hover:bg-[#6edaae] text-[#002115] text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-98"
                      >
                        <span className="material-symbols-outlined text-[16px]">person_add</span>
                        <span>Daftar</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mb-6 p-3.5 sm:p-4 rounded-xl bg-[#effdf4] border border-[#8af7c9] flex items-center justify-between gap-3 shadow-2xs">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#8af7c9] text-[#002115] font-bold text-xs flex items-center justify-center">
                        {currentUser.fullName.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase()}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#00251b] flex items-center gap-1.5">
                          <span>Pelapor Terverifikasi: {currentUser.fullName}</span>
                          <span className="material-symbols-outlined text-[#006c4d] text-[16px]">verified</span>
                          <span className="text-[10px] text-[#006c4d] font-semibold bg-[#88f4c6]/40 px-2 py-0.5 rounded-full">NIK Terverifikasi</span>
                        </div>
                        <div className="text-[11px] text-[#404945]">
                          NIK: {currentUser.nik.slice(0, 6)}******{currentUser.nik.slice(-4)} • Kecamatan {currentUser.kecamatan}
                        </div>
                      </div>
                    </div>
                    <span className="text-[11px] text-[#006c4d] font-semibold hidden md:inline-flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">shield</span>
                      <span>Tersambung ke SP4N &amp; 112</span>
                    </span>
                  </div>
                )}

                <form onSubmit={handleSubmitReport} className="flex flex-col gap-6">
                  
                  {/* Field 1: Kategori Laporan */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs sm:text-sm font-semibold text-[#121e19]" htmlFor="categorySelect">
                      Kategori Permasalahan <span className="text-[#ba1a1a]">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="categorySelect"
                        value={formCategory}
                        onChange={(e) => setFormCategory(e.target.value as ReportCategory)}
                        required
                        className="w-full h-11 px-4 appearance-none rounded-xl bg-[#e9f7ee]/60 border border-[#d8e6de] text-sm text-[#121e19] focus:bg-white focus:border-[#006c4d] focus:ring-1 focus:ring-[#006c4d] focus:outline-none cursor-pointer"
                      >
                        <option value="infrastruktur">🛣 Infrastruktur &amp; Jalan Rusak (Dinas PU Bina Marga)</option>
                        <option value="kesehatan">🏥 Layanan Kesehatan &amp; Puskesmas (Dinkes Sidoarjo)</option>
                        <option value="kependudukan">🪪 Kependudukan &amp; Plavon Dukcapil (Dispendukcapil)</option>
                        <option value="darurat">🚨 Kedaruratan &amp; Bencana (Call Center 112 / BPBD)</option>
                        <option value="sampah">🗑 Sampah &amp; Kebersihan Lingkungan (DLHK Sidoarjo)</option>
                        <option value="lampu-jalan">💡 Lampu Penerangan Jalan Umum (PJU Dishub)</option>
                        <option value="fasilitas-umum">🏢 Fasilitas &amp; Ketertiban Umum (Satpol PP)</option>
                      </select>
                      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-[#717974]">
                        <span className="material-symbols-outlined text-[20px]">expand_more</span>
                      </div>
                    </div>

                    {/* Popular Quick Categories */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-xs text-[#717974]">Pilihan Cepat:</span>
                      <button
                        type="button"
                        onClick={() => setFormCategory('infrastruktur')}
                        className={`px-2.5 py-0.5 rounded-md text-xs font-medium transition-colors border ${
                          formCategory === 'infrastruktur'
                            ? 'bg-[#006c4d] text-white border-[#006c4d]'
                            : 'bg-[#e9f7ee] text-[#006c4d] border-[#ddece3] hover:bg-[#88f4c6]/40'
                        }`}
                      >
                        Jalan Rusak
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormCategory('lampu-jalan')}
                        className={`px-2.5 py-0.5 rounded-md text-xs font-medium transition-colors border ${
                          formCategory === 'lampu-jalan'
                            ? 'bg-[#006c4d] text-white border-[#006c4d]'
                            : 'bg-[#e9f7ee] text-[#006c4d] border-[#ddece3] hover:bg-[#88f4c6]/40'
                        }`}
                      >
                        Lampu PJU
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormCategory('sampah')}
                        className={`px-2.5 py-0.5 rounded-md text-xs font-medium transition-colors border ${
                          formCategory === 'sampah'
                            ? 'bg-[#006c4d] text-white border-[#006c4d]'
                            : 'bg-[#e9f7ee] text-[#006c4d] border-[#ddece3] hover:bg-[#88f4c6]/40'
                        }`}
                      >
                        Persampahan
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormCategory('darurat')}
                        className={`px-2.5 py-0.5 rounded-md text-xs font-medium transition-colors border ${
                          formCategory === 'darurat'
                            ? 'bg-[#ba1a1a] text-white border-[#ba1a1a]'
                            : 'bg-red-50 text-[#ba1a1a] border-red-200 hover:bg-red-100'
                        }`}
                      >
                        Darurat 112
                      </button>
                    </div>
                  </div>

                  {/* Field 2: Judul Laporan */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs sm:text-sm font-semibold text-[#121e19] flex items-center justify-between" htmlFor="reportTitleInput">
                      <span>Judul Laporan <span className="text-[#ba1a1a]">*</span></span>
                      <span className="text-xs text-[#717974]">{formTitle.length}/80 Karakter</span>
                    </label>
                    <input
                      id="reportTitleInput"
                      type="text"
                      maxLength={80}
                      required
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      placeholder="Contoh: Jalan berlubang cukup dalam di Jl. Pahlawan depan SDN Sidokumpul"
                      className="w-full h-11 px-4 rounded-xl bg-[#e9f7ee]/60 border border-[#d8e6de] text-sm text-[#121e19] placeholder:text-[#717974] focus:bg-white focus:border-[#006c4d] focus:ring-1 focus:ring-[#006c4d] focus:outline-none transition-all"
                    />
                    <p className="text-xs text-[#404945]">Tuliskan ringkasan pokok masalah secara padat dan lugas.</p>
                  </div>

                  {/* Field 3: Lokasi & Kecamatan di Sidoarjo */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs sm:text-sm font-semibold text-[#121e19]">
                      Lokasi Kejadian &amp; Kecamatan Sidoarjo <span className="text-[#ba1a1a]">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div className="sm:col-span-1">
                        <select
                          value={formKecamatan}
                          onChange={(e) => setFormKecamatan(e.target.value)}
                          className="w-full h-11 px-3 rounded-xl bg-[#e9f7ee]/60 border border-[#d8e6de] text-xs font-semibold text-[#121e19] focus:bg-white focus:border-[#006c4d] focus:outline-none"
                        >
                          {SIDOARJO_KECAMATAN.map((kec) => (
                            <option key={kec} value={kec}>
                              Kec. {kec}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="sm:col-span-2 relative">
                        <span className="material-symbols-outlined absolute left-3 top-3 text-[18px] text-[#006c4d]">location_on</span>
                        <input
                          type="text"
                          required
                          value={formAddress}
                          onChange={(e) => setFormAddress(e.target.value)}
                          placeholder="Nama jalan, nomor, patokan gedung/gang terdekat"
                          className="w-full h-11 pl-9 pr-3 rounded-xl bg-[#e9f7ee]/60 border border-[#d8e6de] text-sm text-[#121e19] focus:bg-white focus:border-[#006c4d] focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Coordinates & GPS auto-detect bar */}
                    <div className="p-3 rounded-xl bg-[#e9f7ee] border border-[#ddece3] flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#006c4d]"></span>
                        <span className="font-semibold text-[#00251b]">Titik Geotag Terdeteksi:</span>
                        <span className="font-mono text-[#404945]">
                          {formCoordinates || 'Belum terdeteksi (Klik tombol di samping)'}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleDetectGPS}
                        className="px-3 py-1 rounded-lg bg-white border border-[#ddece3] hover:bg-[#88f4c6]/30 text-[#006c4d] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">gps_fixed</span>
                        Deteksi GPS Otomatis
                      </button>
                    </div>
                  </div>

                  {/* Field 4: Deskripsi Kejadian */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs sm:text-sm font-semibold text-[#121e19]" htmlFor="reportDescTextarea">
                      Deskripsi Lengkap Permasalahan <span className="text-[#ba1a1a]">*</span>
                    </label>
                    <textarea
                      id="reportDescTextarea"
                      rows={5}
                      required
                      value={formDescription}
                      onChange={(e) => setFormDescription(e.target.value)}
                      placeholder="Jelaskan kronologi masalah, perkiraan sejak kapan terjadi, dampak terhadap pengguna jalan/warga sekitar, dan harapan tindak lanjut..."
                      className="w-full p-4 rounded-xl bg-[#e9f7ee]/60 border border-[#d8e6de] text-sm text-[#121e19] leading-relaxed placeholder:text-[#717974] focus:bg-white focus:border-[#006c4d] focus:ring-1 focus:ring-[#006c4d] focus:outline-none transition-all"
                    />
                    <p className="text-xs text-[#404945]">
                      Mohon gunakan bahasa Indonesia yang santun, objektif, dan hindari kata bernada kasar atau provokatif.
                    </p>
                  </div>

                  {/* Field 5: Unggah Foto Bukti */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs sm:text-sm font-semibold text-[#121e19]">
                      Unggah Bukti Foto / Dokumen Pendukung
                    </label>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />

                    {/* Drag and Drop Zone */}
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="rounded-2xl bg-[#e9f7ee]/60 border-2 border-dashed border-[#c0c8c3] hover:border-[#006c4d] p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[#e9f7ee] transition-colors group"
                    >
                      <div className="w-12 h-12 rounded-full bg-[#88f4c6]/50 text-[#006c4d] flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                        <span className="material-symbols-outlined text-[28px]">add_a_photo</span>
                      </div>
                      <p className="font-semibold text-sm text-[#00251b] mb-0.5">Tarik &amp; lepas foto bukti di sini</p>
                      <p className="text-xs text-[#404945] mb-3">Maksimal 3 foto (Format JPG, PNG, WEBP hingga 5MB)</p>
                      <button
                        type="button"
                        className="h-9 px-4 rounded-lg bg-white text-[#006c4d] border border-[#88f4c6] text-xs font-semibold shadow-xs hover:bg-[#e9f7ee] transition-colors flex items-center gap-1.5"
                      >
                        <span className="material-symbols-outlined text-[16px]">upload_file</span>
                        Pilih Dari Komputer / Galeri
                      </button>
                    </div>

                    {/* Uploaded Thumbnail Preview */}
                    {formPhoto && (
                      <div className="p-3 rounded-xl bg-[#e9f7ee] border border-[#ddece3] flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#ddece3] shrink-0">
                            <img
                              src={formPhoto.url}
                              alt="Thumbnail bukti"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-xs font-semibold text-[#121e19] truncate">{formPhoto.name}</span>
                            <span className="text-[11px] text-[#717974]">{formPhoto.size} • Siap Dilampirkan</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[#006c4d] text-[20px]" title="Valid">check_circle</span>
                          <button
                            type="button"
                            onClick={() => setFormPhoto(null)}
                            aria-label="Hapus Foto"
                            className="w-8 h-8 rounded-full flex items-center justify-center text-[#717974] hover:text-[#ba1a1a] hover:bg-red-50 transition-colors"
                          >
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Field 6: Opsi Privasi & Anonim */}
                  <div className="p-4 rounded-xl bg-[#e3f1e9]/60 border border-[#ddece3]">
                    <label className="flex items-start gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={formAnonymous}
                        onChange={(e) => setFormAnonymous(e.target.checked)}
                        className="mt-1 w-5 h-5 rounded border-[#c0c8c3] text-[#006c4d] focus:ring-[#006c4d] cursor-pointer"
                      >
                      </input>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-[#00251b] flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[#006c4d] text-[18px]">shield</span>
                          Kirim Pengaduan Sebagai Anonim &amp; Rahasia
                        </span>
                        <span className="text-xs text-[#404945] mt-0.5 leading-relaxed">
                          Identitas nama dan NIK Anda akan disamarkan dari tampilan publik sesuai UU Perlindungan Data Pribadi (UU PDP). Hanya tim verifikator resmi yang dapat melihat data untuk kebutuhan validasi.
                        </span>
                      </div>
                    </label>
                  </div>

                  {/* Submit Action Bar */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#e3f1e9]">
                    <div className="text-xs text-[#717974] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px] text-[#006c4d]">lock</span>
                      Data terenkripsi SSL 256-bit standar BSSN
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={() => {
                          setDraftSavedFeedback(true);
                          setTimeout(() => setDraftSavedFeedback(false), 3000);
                        }}
                        className="flex-1 sm:flex-initial h-11 px-5 rounded-xl bg-[#e3f1e9] hover:bg-[#ddece3] text-[#00251b] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[18px]">drafts</span>
                        Simpan Draf
                      </button>
                      {!currentUser ? (
                        <button
                          type="button"
                          onClick={onOpenLogin}
                          className="flex-1 sm:flex-initial h-11 px-6 rounded-xl bg-[#006c4d] hover:bg-[#005139] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-98"
                        >
                          <span className="material-symbols-outlined text-[18px]">lock</span>
                          <span>Masuk untuk Melapor</span>
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="flex-1 sm:flex-initial h-11 px-6 rounded-xl bg-[#083c2e] hover:bg-[#00251b] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-98"
                        >
                          <span className="material-symbols-outlined text-[18px]">send</span>
                          <span>Kirim Laporan Resmi</span>
                        </button>
                      )}
                    </div>
                  </div>

                </form>

              </div>
            </section>

            {/* Sidebar Guidelines & Emergency (4 Cols) */}
            <aside className="lg:col-span-4 flex flex-col gap-6">
              
              {/* Card 1: Panduan Singkat */}
              <div className="bg-white rounded-2xl shadow-sm border border-[#ddece3] p-6 flex flex-col gap-4">
                <div className="flex items-center gap-2 text-[#00251b]">
                  <span className="material-symbols-outlined text-[#006c4d] text-[24px]">verified_user</span>
                  <h3 className="font-bold text-base font-display">Panduan Pelaporan Cepat</h3>
                </div>
                <p className="text-xs text-[#404945]">
                  Agar laporan segera ditindaklanjuti oleh dinas terkait, pastikan memenuhi kriteria berikut:
                </p>
                <ul className="flex flex-col gap-2.5 text-xs text-[#121e19]">
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[#006c4d] text-[18px] shrink-0 mt-0.5">check_circle</span>
                    <span><strong>Informasi Faktual:</strong> Uraikan kronologi nyata tanpa prasangka.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[#006c4d] text-[18px] shrink-0 mt-0.5">check_circle</span>
                    <span><strong>Lokasi Akurat:</strong> Sertakan nama jalan &amp; patokan wilayah Sidoarjo.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[#006c4d] text-[18px] shrink-0 mt-0.5">check_circle</span>
                    <span><strong>Foto Bukti Jelas:</strong> Ambil foto pencahayaan cukup kondisi saat ini.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[#006c4d] text-[18px] shrink-0 mt-0.5">check_circle</span>
                    <span><strong>Bahasa Santun:</strong> Gunakan bahasa Indonesia lugas dan tertib.</span>
                  </li>
                </ul>
                <div className="p-3 rounded-xl bg-[#e9f7ee] border border-[#88f4c6]/40 flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[#006c4d] text-[20px] shrink-0 mt-0.5">speed</span>
                  <div className="text-xs">
                    <span className="font-bold text-[#006c4d] uppercase tracking-wider block">Tips Percepatan</span>
                    <p className="text-[#121e19] mt-0.5">
                      Laporan yang menyertakan foto dan titik koordinat diproses <strong>40% lebih cepat</strong> oleh tim URC.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2: Saluran Darurat & Kontak Alternatif */}
              <div className="bg-white rounded-2xl shadow-sm border border-[#ddece3] p-6 flex flex-col gap-4">
                <div className="flex items-center gap-2 text-[#ba1a1a]">
                  <span className="material-symbols-outlined text-[24px]">contact_phone</span>
                  <h3 className="font-bold text-base text-[#00251b] font-display">Kontak Pengaduan Lainnya</h3>
                </div>
                <div className="flex flex-col gap-2.5">
                  <a
                    href="tel:112"
                    className="p-3 rounded-xl bg-red-50 hover:bg-red-100/80 border border-red-200 transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#ba1a1a] text-white flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[20px]">call</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-[#00251b]">Call Center 112 Sidoarjo</span>
                        <span className="text-[11px] text-[#717974]">Bebas Pulsa • Medis, Damkar, SAR</span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[#717974] group-hover:text-[#ba1a1a] transition-colors">
                      chevron_right
                    </span>
                  </a>

                  <a
                    href="https://wa.me/6281234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-[#e9f7ee] hover:bg-[#ddece3] border border-[#d8e6de] transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#083c2e] text-[#8af7c9] flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[20px]">chat</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-[#00251b]">Hotline WhatsApp SP4N</span>
                        <span className="text-[11px] text-[#717974]">Piket Pengaduan Diskominfo</span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[#717974] group-hover:text-[#00251b] transition-colors">
                      chevron_right
                    </span>
                  </a>

                  <div className="p-3 rounded-xl bg-[#e3f1e9] flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#00251b]">
                      <span className="material-symbols-outlined text-[#006c4d] text-[18px]">sms</span>
                      <span>SMS SP4N-LAPOR! Nasional</span>
                    </div>
                    <span className="text-xs font-bold text-[#006c4d] bg-white px-2 py-0.5 rounded">1708</span>
                  </div>
                </div>
              </div>

              {/* Card 3: Statistik Kinerja OPD */}
              <div className="bg-[#e9f7ee] border border-[#ddece3] rounded-2xl p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#006c4d] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <span className="material-symbols-outlined text-[24px]">query_stats</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#00251b]">Rata-rata Respon: 1.8 Hari Kerja</span>
                  <span className="text-[11px] text-[#717974]">Dari 1.240 laporan warga bulan ini</span>
                </div>
              </div>

            </aside>

          </div>
        )}

        {/* ======================================================== */}
        {/* STATE: KONFIRMASI LAPORAN SUKSES (Stitch 7)              */}
        {/* ======================================================== */}
        {activeTab === 'sukses' && (
          <div className="flex flex-col gap-8">
            
            {/* Success Hero Header Section */}
            <section className="w-full flex flex-col items-center text-center max-w-3xl mx-auto pt-2">
              <div className="relative flex items-center justify-center mb-4">
                <div className="absolute w-28 h-28 rounded-full bg-[#8af7c9]/40 animate-ping opacity-25"></div>
                <div className="relative w-24 h-24 rounded-full bg-[#e3f1e9] flex items-center justify-center shadow-lg shadow-[#083c2e]/10">
                  <div className="w-20 h-20 rounded-full bg-[#88f4c6] flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-[#083c2e] flex items-center justify-center text-white shadow-inner">
                      <span className="material-symbols-outlined text-[32px] text-[#8af7c9]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        verified
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-[#00251b] tracking-tight mb-2 font-display">
                Laporan Berhasil Terkirim ke SITAPAK!
              </h1>
              <p className="text-sm sm:text-base text-[#404945] max-w-xl mx-auto leading-relaxed mb-4">
                Terima kasih atas kepedulian Anda terhadap fasilitas Kabupaten Sidoarjo. Pengaduan telah masuk dalam pangkalan data terpusat dan sedang dalam antrean verifikasi dinas.
              </p>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ddece3] text-[#00251b] text-xs font-medium shadow-xs">
                <span className="material-symbols-outlined text-[#006c4d] text-[18px]">lock</span>
                <span>Terkirim Resmi ke SP4N-LAPOR! Sidoarjo</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#717974]"></span>
                <span className="text-[#006c4d] font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">shield</span> Dijamin Rahasia &amp; Terenkripsi
                </span>
              </div>
            </section>

            {/* Receipt & Timeline Grid (12 Cols: 7 cols Left, 5 cols Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Official Report Receipt Card (7 Cols) */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                
                <article className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-[#ddece3] flex flex-col gap-6 relative overflow-hidden">
                  {/* Top Gradient Accent Ribbon */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#083c2e] via-[#006c4d] to-[#cfa700]"></div>

                  {/* Card Header & Salin Tiket Button */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#ddece3]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#e3f1e9] flex items-center justify-center text-[#083c2e]">
                        <span className="material-symbols-outlined text-[24px]">receipt_long</span>
                      </div>
                      <div className="flex flex-col">
                        <h2 className="font-bold text-base sm:text-lg text-[#00251b] font-display">
                          Ringkasan Bukti Pengaduan Elektronik
                        </h2>
                        <span className="text-xs text-[#404945]">Tanda Terima Registrasi Resmi Pemkab Sidoarjo</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopyTicket(selectedReport.ticketNumber)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#e3f1e9] text-[#00251b] text-xs font-semibold hover:bg-[#88f4c6] hover:text-[#002115] transition-all cursor-pointer self-start sm:self-auto shadow-xs"
                    >
                      <span className="material-symbols-outlined text-[16px]">content_copy</span>
                      <span>Salin Nomor Tiket</span>
                    </button>
                  </div>

                  {/* Highlighted Ticket ID Banner */}
                  <div className="bg-[#e9f7ee] rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-[#88f4c6]/40">
                    <div className="flex flex-col">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#404945]">
                        Nomor Registrasi Aduan (Ticket ID)
                      </span>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-2xl sm:text-3xl font-extrabold text-[#083c2e] font-display tracking-tight select-all">
                          {selectedReport.ticketNumber}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-[#ffe087] text-[#231a00] text-[10px] font-bold uppercase">
                          {selectedReport.urgency}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 self-start sm:self-center">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300">
                        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                        {selectedReport.status}
                      </span>
                    </div>
                  </div>

                  {/* Key Report Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                    <div className="sm:col-span-2 p-3.5 rounded-xl bg-[#effdf4]/70 border border-[#ddece3]">
                      <span className="text-[11px] uppercase tracking-wider font-semibold text-[#404945] block mb-1">
                        Judul Laporan
                      </span>
                      <span className="text-base font-bold text-[#00251b] leading-snug">
                        {selectedReport.title}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#f8faf9] border border-[#ddece3]">
                      <span className="text-[11px] uppercase tracking-wider font-semibold text-[#404945] block mb-1">
                        Kategori Bidang
                      </span>
                      <div className="flex items-center gap-1.5 font-semibold text-[#00251b]">
                        <span className="material-symbols-outlined text-[#006c4d] text-[18px]">
                          {selectedReport.categoryIcon}
                        </span>
                        <span>{selectedReport.categoryLabel}</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-[#f8faf9] border border-[#ddece3]">
                      <span className="text-[11px] uppercase tracking-wider font-semibold text-[#404945] block mb-1">
                        Waktu Pengiriman
                      </span>
                      <div className="flex items-center gap-1.5 font-semibold text-[#00251b]">
                        <span className="material-symbols-outlined text-[#006c4d] text-[18px]">event_available</span>
                        <span>{selectedReport.submitDate}, {selectedReport.submitTime}</span>
                      </div>
                    </div>

                    <div className="sm:col-span-2 p-3 rounded-xl bg-[#f8faf9] border border-[#ddece3]">
                      <span className="text-[11px] uppercase tracking-wider font-semibold text-[#404945] block mb-1">
                        Lokasi Kejadian &amp; Geotag
                      </span>
                      <div className="flex items-start gap-2 text-[#00251b]">
                        <span className="material-symbols-outlined text-[#ba1a1a] text-[18px] shrink-0 mt-0.5">location_on</span>
                        <div className="flex flex-col">
                          <span className="font-semibold">{selectedReport.locationAddress}</span>
                          <span className="text-xs text-[#717974] font-mono mt-0.5">
                            Koordinat GPS: {selectedReport.coordinates} • {selectedReport.kelurahan}, {selectedReport.kecamatan}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="sm:col-span-2 p-3 rounded-xl bg-[#f8faf9] border border-[#ddece3]">
                      <span className="text-[11px] uppercase tracking-wider font-semibold text-[#404945] block mb-1">
                        Status Identitas Pelapor
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[#00251b]">{selectedReport.reporterName}</span>
                        {selectedReport.isAnonymous ? (
                          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-[#e9f7ee] text-[#006c4d] border border-[#88f4c6]">
                            Identitas Terproteksi Anonim
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-[#e9f7ee] text-[#006c4d] flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">verified</span> NIK Terverifikasi
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Attachment Section with Preview */}
                  <div className="flex flex-col gap-2 pt-2 border-t border-[#ddece3]">
                    <span className="text-xs uppercase tracking-wider font-semibold text-[#404945]">
                      Bukti Lampiran Lapangan
                    </span>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 rounded-xl bg-[#e9f7ee] hover:bg-[#ddece3] transition-colors">
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          onClick={() => setIsPhotoPreviewOpen(true)}
                          className="w-14 h-14 rounded-xl bg-[#ddece3] shrink-0 overflow-hidden relative cursor-pointer group"
                        >
                          <img
                            src={selectedReport.photoUrl}
                            alt="Bukti Aduan"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-xs font-bold text-[#00251b] truncate">{selectedReport.photoFileName}</span>
                          <span className="text-[11px] text-[#717974]">{selectedReport.photoSize} • Terverifikasi EXIF GPS Sidoarjo</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsPhotoPreviewOpen(true)}
                        className="px-3.5 py-1.5 rounded-lg bg-white text-[#00251b] text-xs font-semibold hover:bg-[#00251b] hover:text-white transition-all shadow-xs flex items-center gap-1 shrink-0"
                      >
                        <span className="material-symbols-outlined text-[16px]">visibility</span>
                        <span>Lihat Foto</span>
                      </button>
                    </div>
                  </div>

                </article>

                {/* Information Notice Box */}
                <div className="p-4 rounded-xl bg-[#ddece3]/70 flex items-start gap-3 text-[#121e19] border border-[#c0c8c3]/40">
                  <div className="w-8 h-8 rounded-full bg-[#006c4d] text-white shrink-0 flex items-center justify-center mt-0.5">
                    <span className="material-symbols-outlined text-[18px]">info</span>
                  </div>
                  <div className="flex flex-col gap-1 text-xs sm:text-sm">
                    <span className="font-bold text-[#00251b]">Penting Untuk Pemantauan Mandiri</span>
                    <p className="text-[#404945] leading-relaxed">
                      Simpan atau salin Nomor Tiket <strong className="text-[#083c2e] bg-white px-1.5 py-0.5 rounded font-mono font-bold">{selectedReport.ticketNumber}</strong>. Anda dapat melacak progres tindakan petugas setiap saat pada tab <strong>Pantau &amp; Lacak Laporan</strong>.
                    </p>
                  </div>
                </div>

              </div>

              {/* Right Column: Workflow Timeline & Action Hub (5 Cols) */}
              <aside className="lg:col-span-5 flex flex-col gap-6">
                
                {/* Workflow Card */}
                <section className="bg-white rounded-2xl p-6 shadow-md border border-[#ddece3] flex flex-col gap-5">
                  <div className="flex items-center justify-between border-b border-[#ddece3] pb-3">
                    <div className="flex flex-col">
                      <h3 className="font-bold text-base text-[#00251b] font-display">
                        Alur Penanganan Laporan
                      </h3>
                      <p className="text-xs text-[#404945]">Estimasi SLA Pelayanan: {selectedReport.slaTarget}</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-md bg-[#8af7c9] text-[#002115] text-xs font-bold">
                      Tahap 1 / 4
                    </span>
                  </div>

                  {/* Vertical Progression Timeline */}
                  <div className="relative flex flex-col gap-5 pl-2">
                    <div className="absolute left-[17px] top-4 bottom-4 w-0.5 bg-[#ddece3] -z-0"></div>

                    {selectedReport.timeline.map((step) => (
                      <div key={step.stepNumber} className="relative flex items-start gap-3 z-10">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-xs ${
                            step.completed
                              ? 'bg-[#083c2e] text-[#8af7c9] ring-2 ring-[#8af7c9]/40'
                              : 'bg-[#ddece3] text-[#717974]'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            {step.completed ? 'done' : 'hourglass_empty'}
                          </span>
                        </div>
                        <div className={`flex flex-col p-3 rounded-xl flex-1 text-xs border ${
                          step.active
                            ? 'bg-[#e9f7ee] border-[#88f4c6]/60'
                            : 'bg-[#f8faf9] border-[#ddece3]'
                        }`}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-[#00251b]">{step.stageName}</span>
                            <span className="font-semibold text-[#006c4d]">{step.statusText}</span>
                          </div>
                          <p className="text-[#404945] leading-relaxed">{step.description}</p>
                          <span className="text-[11px] text-[#717974] mt-1.5 flex items-center gap-1 font-mono">
                            <span className="material-symbols-outlined text-[14px]">schedule</span>
                            {step.timestamp}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Quick SLA Metrics */}
                  <div className="pt-3 border-t border-[#ddece3] grid grid-cols-2 gap-3 text-center">
                    <div className="p-2.5 rounded-xl bg-[#e9f7ee]">
                      <span className="text-[11px] text-[#404945] block">Target Respon</span>
                      <span className="text-base font-bold text-[#00251b] font-display">{selectedReport.slaTarget}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#e9f7ee]">
                      <span className="text-[11px] text-[#404945] block">Tingkat Tuntas</span>
                      <span className="text-base font-bold text-[#006c4d] font-display">98.4%</span>
                    </div>
                  </div>
                </section>

                {/* Action Hub Card */}
                <div className="bg-white rounded-2xl p-6 shadow-md border border-[#ddece3] flex flex-col gap-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#404945]">
                    Langkah Tindak Lanjut
                  </span>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('lacak-laporan');
                      window.scrollTo({ top: 100, behavior: 'smooth' });
                    }}
                    className="w-full h-11 px-5 rounded-xl bg-[#006c4d] hover:bg-[#005139] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">track_changes</span>
                    <span>Lacak Status &amp; Timeline Lengkap</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="w-full h-11 px-5 rounded-xl bg-[#e3f1e9] hover:bg-[#ddece3] text-[#00251b] font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[#006c4d] text-[18px]">print</span>
                    <span>Cetak Bukti Tanda Terima (PDF)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setFormTitle('');
                      setFormDescription('');
                      setFormAddress('');
                      setFormCoordinates('');
                      setFormPhoto(null);
                      setActiveTab('buat-laporan');
                    }}
                    className="w-full py-2 text-center text-xs text-[#006c4d] font-semibold hover:underline flex items-center justify-center gap-1 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">add_circle</span>
                    <span>Buat Pengaduan Lainnya</span>
                  </button>
                </div>

              </aside>

            </div>

          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: PANTAU & LACAK LAPORAN (Stitch 11 & 2)             */}
        {/* ======================================================== */}
        {activeTab === 'lacak-laporan' && (
          <div className="flex flex-col gap-8">
            
            {/* Upper Tracker & Search Filter Bar */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#ddece3] flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-[#006c4d] mb-1">
                  <span className="material-symbols-outlined text-[20px]">track_changes</span>
                  <span className="text-xs font-bold uppercase tracking-wider">Transparansi Penanganan Publik</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#00251b] font-display">
                  Pantau &amp; Lacak Laporan Warga
                </h2>
                <p className="text-xs sm:text-sm text-[#404945]">
                  Pantau perkembangan tindak lanjut aduan Anda secara real-time dan transparan.
                </p>
              </div>

              {/* Status Filter Chips */}
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => setTrackingFilter('semua')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    trackingFilter === 'semua'
                      ? 'bg-[#083c2e] text-white shadow-xs'
                      : 'bg-[#e9f7ee] text-[#404945] hover:bg-[#ddece3]'
                  }`}
                >
                  Semua ({reportsList.length})
                </button>
                <button
                  type="button"
                  onClick={() => setTrackingFilter('Menunggu Verifikasi')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    trackingFilter === 'Menunggu Verifikasi'
                      ? 'bg-[#083c2e] text-white shadow-xs'
                      : 'bg-[#e9f7ee] text-[#404945] hover:bg-[#ddece3]'
                  }`}
                >
                  Menunggu (1)
                </button>
                <button
                  type="button"
                  onClick={() => setTrackingFilter('Penanganan Lapangan')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    trackingFilter === 'Penanganan Lapangan'
                      ? 'bg-[#083c2e] text-white shadow-xs'
                      : 'bg-[#e9f7ee] text-[#404945] hover:bg-[#ddece3]'
                  }`}
                >
                  Diproses (2)
                </button>
                <button
                  type="button"
                  onClick={() => setTrackingFilter('Selesai')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    trackingFilter === 'Selesai'
                      ? 'bg-[#083c2e] text-white shadow-xs'
                      : 'bg-[#e9f7ee] text-[#404945] hover:bg-[#ddece3]'
                  }`}
                >
                  Selesai (1)
                </button>
              </div>
            </div>

            {/* Quick Sample Ticket Buttons */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-[#717974] font-medium">Contoh Tiket Pengaduan:</span>
              {reportsList.map((r) => (
                <button
                  key={r.ticketNumber}
                  type="button"
                  onClick={() => setSelectedReport(r)}
                  className={`px-3 py-1 rounded-lg border font-mono transition-all cursor-pointer ${
                    selectedReport.ticketNumber === r.ticketNumber
                      ? 'bg-[#006c4d] text-white border-[#006c4d] shadow-xs'
                      : 'bg-white text-[#083c2e] border-[#ddece3] hover:bg-[#e9f7ee]'
                  }`}
                >
                  #{r.ticketNumber}
                </button>
              ))}
            </div>

            {/* DETAIL STATUS & TRACKING LAPORAN (Stitch 2) */}
            <div className="flex flex-col gap-6">
              
              {/* Header Banner for Selected Ticket (Stitch 2) */}
              <div className="rounded-2xl bg-gradient-to-r from-[#083c2e] via-[#0d4f3e] to-[#083c2e] p-6 text-white shadow-lg flex flex-col lg:flex-row lg:items-center justify-between gap-4 border border-[#8af7c9]/20">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#8af7c9] text-[#002115] flex items-center justify-center shrink-0 shadow-md">
                    <span className="material-symbols-outlined text-[30px]">pending_actions</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-white/15 text-[#bbedd9] font-bold">
                        ID: {selectedReport.ticketNumber}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#ffe087] text-[#231a00]">
                        {selectedReport.status}
                      </span>
                      <span className="text-xs text-white/70">
                        • {selectedReport.categoryLabel}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white font-display">
                      {selectedReport.title}
                    </h3>
                    <p className="text-xs text-[#bbedd9] mt-0.5">
                      Ditugaskan ke: <strong>{selectedReport.assignedOpd}</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6 bg-black/25 backdrop-blur-sm p-4 rounded-xl shrink-0">
                  <div className="flex flex-col">
                    <span className="text-[11px] text-[#bbedd9] uppercase tracking-wider">Target Waktu SLA</span>
                    <span className="text-lg font-bold text-white font-display">{selectedReport.slaTarget}</span>
                  </div>
                  <div className="w-[1px] h-8 bg-white/20"></div>
                  <div className="flex flex-col">
                    <span className="text-[11px] text-[#bbedd9] uppercase tracking-wider">Perkiraan Tuntas</span>
                    <span className="text-sm font-semibold text-[#8af7c9]">{selectedReport.estimatedCompletion}</span>
                  </div>
                </div>
              </div>

              {/* 4 Quick Stat Metric Cards (Stitch 2) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-white shadow-xs border border-[#ddece3] flex flex-col gap-1">
                  <span className="text-[11px] font-semibold text-[#717974] uppercase tracking-wider">Nomor Registrasi</span>
                  <div className="flex items-center justify-between">
                    <span className="text-base font-bold text-[#00251b] font-display">{selectedReport.ticketNumber}</span>
                    <span className="material-symbols-outlined text-[#006c4d] text-[20px]">tag</span>
                  </div>
                  <span className="text-[11px] text-[#717974]">Tercatat di SP4N-LAPOR!</span>
                </div>

                <div className="p-4 rounded-xl bg-white shadow-xs border border-[#ddece3] flex flex-col gap-1">
                  <span className="text-[11px] font-semibold text-[#717974] uppercase tracking-wider">Waktu Terkirim</span>
                  <div className="flex items-center justify-between">
                    <span className="text-base font-bold text-[#00251b] font-display">{selectedReport.submitDate}</span>
                    <span className="material-symbols-outlined text-[#006c4d] text-[20px]">calendar_today</span>
                  </div>
                  <span className="text-[11px] text-[#717974]">Pukul {selectedReport.submitTime}</span>
                </div>

                <div className="p-4 rounded-xl bg-white shadow-xs border border-[#ddece3] flex flex-col gap-1">
                  <span className="text-[11px] font-semibold text-[#717974] uppercase tracking-wider">Instansi Penanggung Jawab</span>
                  <div className="flex items-center justify-between">
                    <span className="text-base font-bold text-[#00251b] font-display truncate">{selectedReport.categoryLabel}</span>
                    <span className="material-symbols-outlined text-[#006c4d] text-[20px]">engineering</span>
                  </div>
                  <span className="text-[11px] text-[#717974] truncate">{selectedReport.assignedOpd}</span>
                </div>

                <div className="p-4 rounded-xl bg-white shadow-xs border border-[#ddece3] flex flex-col gap-1">
                  <span className="text-[11px] font-semibold text-[#717974] uppercase tracking-wider">Tingkat Urgensi</span>
                  <div className="flex items-center justify-between">
                    <span className="text-base font-bold text-[#735c00] font-display">{selectedReport.urgency}</span>
                    <span className="material-symbols-outlined text-[#735c00] text-[20px]">flag</span>
                  </div>
                  <span className="text-[11px] text-[#717974]">Verifikasi teknis disetujui</span>
                </div>
              </div>

              {/* Main Tracking Details (12 Cols: 8 Cols Left Timeline & Official Response, 4 Cols Right Metadata) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* 8 Cols Column: Full Timeline & Responses & Photos */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                  
                  {/* Comprehensive Timeline (Stitch 2) */}
                  <article className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#ddece3] flex flex-col gap-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#ddece3]">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[24px] text-[#006c4d]">timeline</span>
                        <h3 className="text-lg font-bold text-[#00251b] font-display">
                          Riwayat Penanganan Laporan Terpadu
                        </h3>
                      </div>
                      <span className="text-xs text-[#006c4d] font-semibold bg-[#e9f7ee] px-3 py-1 rounded-full border border-[#88f4c6]/50">
                        Diperbarui 10 Menit yang Lalu
                      </span>
                    </div>

                    {/* Timeline Stepper */}
                    <div className="relative pl-6 sm:pl-8 flex flex-col gap-6">
                      <div className="absolute left-[11px] sm:left-[15px] top-4 bottom-4 w-0.5 bg-[#88f4c6]"></div>

                      {selectedReport.timeline.map((step) => (
                        <div
                          key={step.stepNumber}
                          className={`relative flex flex-col gap-1 ${
                            step.active ? 'p-4 rounded-xl bg-[#e9f7ee] shadow-xs border border-[#88f4c6]/60' : ''
                          }`}
                        >
                          <div
                            className={`absolute -left-6 sm:-left-8 top-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-xs ${
                              step.completed
                                ? 'bg-[#006c4d] text-white'
                                : step.active
                                ? 'bg-[#ffe087] text-[#231a00] ring-4 ring-amber-300/40'
                                : 'bg-[#ddece3] text-[#717974]'
                            }`}
                          >
                            <span className="material-symbols-outlined text-[14px] sm:text-[18px]">
                              {step.completed ? 'done' : step.active ? 'autorenew' : 'radio_button_unchecked'}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-[#00251b] font-display">{step.title}</span>
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  step.completed
                                    ? 'bg-[#8af7c9] text-[#002115]'
                                    : step.active
                                    ? 'bg-[#ffe087] text-[#231a00]'
                                    : 'bg-[#ddece3] text-[#717974]'
                                }`}
                              >
                                {step.statusText}
                              </span>
                            </div>
                            <span className="text-xs text-[#717974] font-medium font-mono">{step.timestamp}</span>
                          </div>

                          <p className="text-xs sm:text-sm text-[#404945] leading-relaxed mt-0.5">
                            {step.description}
                          </p>

                          <div className="mt-1 flex items-center gap-1.5 text-xs text-[#717974]">
                            <span className="material-symbols-outlined text-[16px] text-[#006c4d]">verified_user</span>
                            <span>Petugas / Otorisasi: <strong>{step.officerOrSystem}</strong></span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </article>

                  {/* Official Response & Notes Card (Stitch 2) */}
                  {selectedReport.officialResponse && (
                    <article className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#ddece3] flex flex-col gap-4">
                      <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-[#ddece3]">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#e3f1e9] flex items-center justify-center text-[#006c4d]">
                            <span className="material-symbols-outlined text-[24px]">forum</span>
                          </div>
                          <div>
                            <h3 className="font-bold text-base text-[#00251b] font-display">
                              Tanggapan Pejabat Teknis &amp; Tindak Lanjut Resmi
                            </h3>
                            <p className="text-xs text-[#717974]">Respon akuntabel pejabat dinas penanggung jawab lapangan</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#8af7c9] text-[#002115] text-xs font-bold">
                          <span className="material-symbols-outlined text-[16px]">verified</span>
                          <span>Instansi Terverifikasi</span>
                        </div>
                      </div>

                      <div className="p-4 sm:p-5 rounded-xl bg-[#e9f7ee] flex flex-col gap-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-[#083c2e] text-[#8af7c9] flex items-center justify-center font-bold text-sm shrink-0">
                              {selectedReport.officialResponse.officerInitials}
                            </div>
                            <div className="flex flex-col">
                              <span className="font-bold text-sm text-[#00251b]">
                                {selectedReport.officialResponse.officerName}
                              </span>
                              <span className="text-xs text-[#404945]">
                                {selectedReport.officialResponse.officerRole}
                              </span>
                              <span className="text-xs text-[#006c4d] font-semibold">
                                {selectedReport.officialResponse.officerOpd}
                              </span>
                            </div>
                          </div>
                          <div className="text-left sm:text-right">
                            <span className="text-[11px] text-[#717974] block">Waktu Respon Resmi</span>
                            <span className="text-xs font-semibold text-[#00251b]">
                              {selectedReport.officialResponse.responseTime}
                            </span>
                          </div>
                        </div>

                        <blockquote className="bg-white p-4 rounded-xl text-xs sm:text-sm text-[#121e19] italic shadow-xs border border-[#ddece3] relative leading-relaxed">
                          <span className="material-symbols-outlined absolute -top-2 left-3 text-[#d8e6de] text-[32px] select-none">
                            format_quote
                          </span>
                          <p className="relative z-10 pl-2">
                            "{selectedReport.officialResponse.message}"
                          </p>
                        </blockquote>

                        {selectedReport.officialResponse.attachmentPdf && (
                          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-[#404945]">Dokumen Surat Tugas / SPK:</span>
                              <a
                                href="#pdf"
                                onClick={(e) => {
                                  e.preventDefault();
                                  alert(`Mengunduh dokumen resmi: ${selectedReport.officialResponse?.attachmentPdf}`);
                                }}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#ddece3] text-[#00251b] hover:bg-[#083c2e] hover:text-white text-xs font-semibold transition-colors"
                              >
                                <span className="material-symbols-outlined text-[16px] text-[#ba1a1a]">picture_as_pdf</span>
                                <span>{selectedReport.officialResponse.attachmentPdf}</span>
                                <span className="material-symbols-outlined text-[14px]">download</span>
                              </a>
                            </div>
                            <span className="text-[11px] text-[#006c4d] font-semibold flex items-center gap-1">
                              <span className="material-symbols-outlined text-[14px]">lock</span> TTE BSrE Tersertifikasi
                            </span>
                          </div>
                        )}
                      </div>
                    </article>
                  )}

                  {/* Documentation & Comparison Before/After Photos (Stitch 2) */}
                  <article className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#ddece3] flex flex-col gap-4">
                    <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-[#ddece3]">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-[24px] text-[#006c4d]">photo_library</span>
                        <div>
                          <h3 className="font-bold text-base text-[#00251b] font-display">
                            Dokumentasi Penanganan &amp; Bukti Fisik Lapangan
                          </h3>
                          <p className="text-xs text-[#717974]">
                            Komparasi bukti kondisi kerusakan warga dengan hasil progres penanganan instansi
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-[#006c4d] bg-[#e9f7ee] px-2.5 py-1 rounded-lg">
                        {selectedReport.afterPhotoUrl ? '2 Berkas Foto Terhubung' : '1 Berkas Foto Terhubung'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      {/* Photo 1: Citizen proof */}
                      <div className="p-3.5 rounded-xl bg-[#e9f7ee] flex flex-col gap-2">
                        <div className="flex items-center justify-between text-xs font-semibold">
                          <span className="text-[#00251b] flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[18px] text-[#006c4d]">camera_alt</span>
                            Foto Aduan Warga
                          </span>
                          <span className="text-[#717974]">{selectedReport.submitDate}</span>
                        </div>
                        <div
                          onClick={() => setIsPhotoPreviewOpen(true)}
                          className="relative w-full h-48 rounded-lg overflow-hidden bg-[#ddece3] group cursor-pointer"
                        >
                          <img
                            src={selectedReport.photoUrl}
                            alt="Bukti Aduan Warga"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <span className="absolute bottom-2 left-2 bg-black/70 text-white text-[10px] font-semibold px-2 py-0.5 rounded backdrop-blur-sm">
                            Kamera Warga • Geotag Valid
                          </span>
                        </div>
                        <p className="text-xs text-[#404945] line-clamp-2">
                          Kondisi awal sebelum penanganan oleh dinas terkait.
                        </p>
                      </div>

                      {/* Photo 2: After repair / progress */}
                      <div className="p-3.5 rounded-xl bg-[#e9f7ee] flex flex-col gap-2">
                        <div className="flex items-center justify-between text-xs font-semibold">
                          <span className="text-[#00251b] flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[18px] text-[#006c4d]">task_alt</span>
                            Dokumentasi Hasil Penanganan
                          </span>
                          <span className="text-[#006c4d] font-bold">
                            {selectedReport.status === 'Selesai' ? 'Tuntas 100%' : 'Sedang Dikerjakan'}
                          </span>
                        </div>

                        {selectedReport.afterPhotoUrl ? (
                          <div className="relative w-full h-48 rounded-lg overflow-hidden bg-[#ddece3] group cursor-pointer">
                            <img
                              src={selectedReport.afterPhotoUrl}
                              alt="Dokumentasi Hasil Penanganan"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <span className="absolute bottom-2 left-2 bg-[#006c4d]/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded backdrop-blur-sm">
                              Hasil Fisik Selesai
                            </span>
                          </div>
                        ) : (
                          <div className="relative w-full h-48 rounded-lg bg-[#ddece3] flex flex-col items-center justify-center p-4 text-center">
                            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#717974] mb-2 shadow-xs">
                              <span className="material-symbols-outlined text-[24px]">hourglass_top</span>
                            </div>
                            <span className="font-semibold text-xs text-[#00251b]">Menunggu Tahap Akhir</span>
                            <p className="text-[11px] text-[#717974] mt-1 max-w-xs">
                              Foto pengerjaan fisik akan diunggah otomatis setelah penanganan selesai oleh dinas.
                            </p>
                          </div>
                        )}

                        <p className="text-xs text-[#404945] line-clamp-2">
                          {selectedReport.status === 'Selesai'
                            ? 'Pekerjaan fisik telah dituntaskan dan diverifikasi oleh tim pengawas.'
                            : 'Petugas lapangan sedang melaksanakan perbaikan di titik lokasi.'}
                        </p>
                      </div>

                    </div>
                  </article>

                </div>

                {/* 4 Cols Right: Detailed Metadata & Location Map */}
                <aside className="lg:col-span-4 flex flex-col gap-6">
                  
                  {/* Card: Informasi Detail Laporan */}
                  <section className="bg-white rounded-2xl p-6 shadow-sm border border-[#ddece3] flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-base text-[#00251b] font-display">Informasi Laporan</h3>
                      <span className="material-symbols-outlined text-[20px] text-[#006c4d]">info</span>
                    </div>

                    <div className="flex flex-col gap-3 text-xs sm:text-sm">
                      <div className="flex flex-col gap-1 pb-2 border-b border-[#ddece3]">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#717974]">Nomor Tiket</span>
                        <div className="flex items-center justify-between bg-[#e9f7ee] px-3 py-2 rounded-xl">
                          <span className="font-bold font-mono text-sm text-[#083c2e]">{selectedReport.ticketNumber}</span>
                          <button
                            type="button"
                            onClick={() => handleCopyTicket(selectedReport.ticketNumber)}
                            className="text-[#006c4d] hover:text-[#00251b] flex items-center gap-1 font-semibold text-xs"
                          >
                            <span className="material-symbols-outlined text-[16px]">content_copy</span>
                            Salin
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col gap-0.5">
                        <span className="text-[11px] text-[#717974]">Kategori Layanan</span>
                        <span className="font-semibold text-[#00251b]">{selectedReport.categoryLabel}</span>
                      </div>

                      <div className="flex flex-col gap-0.5">
                        <span className="text-[11px] text-[#717974]">Instansi Penanggung Jawab</span>
                        <span className="font-medium text-[#00251b]">{selectedReport.assignedOpd}</span>
                      </div>

                      <div className="flex flex-col gap-0.5">
                        <span className="text-[11px] text-[#717974]">Tingkat Urgensi</span>
                        <span className="font-semibold text-[#735c00] flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px]">flag</span>
                          {selectedReport.urgency} ({selectedReport.slaTarget})
                        </span>
                      </div>

                      <div className="flex flex-col gap-0.5">
                        <span className="text-[11px] text-[#717974]">Identitas Pelapor</span>
                        <span className="font-semibold text-[#00251b]">{selectedReport.reporterName}</span>
                        <span className="text-[11px] text-[#717974] italic">
                          {selectedReport.isAnonymous ? 'Disamarkan untuk privasi umum' : 'NIK Warga Terverifikasi'}
                        </span>
                      </div>
                    </div>
                  </section>

                  {/* Card: Titik Lokasi Terlapor & Mini Map */}
                  <section className="bg-white rounded-2xl p-6 shadow-sm border border-[#ddece3] flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-base text-[#00251b] font-display">Titik Lokasi Terlapor</h3>
                      <span className="material-symbols-outlined text-[20px] text-[#006c4d]">location_on</span>
                    </div>

                    <div className="flex flex-col gap-1 text-xs">
                      <span className="font-bold text-sm text-[#00251b]">{selectedReport.locationAddress}</span>
                      <span className="text-[#717974]">{selectedReport.kelurahan}, {selectedReport.kecamatan}</span>
                      <span className="text-[#006c4d] font-mono mt-0.5">Koordinat: {selectedReport.coordinates}</span>
                    </div>

                    {/* Stylized Visual Map Thumbnail */}
                    <div className="relative w-full h-44 rounded-xl overflow-hidden shadow-xs border border-[#ddece3] bg-[#083c2e]/10 flex items-center justify-center">
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                          backgroundImage:
                            "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80')",
                        }}
                      ></div>
                      <div className="absolute inset-0 bg-[#083c2e]/30 backdrop-blur-[0.5px]"></div>
                      
                      <div className="relative flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-[#8af7c9]/40 animate-ping absolute"></div>
                        <div className="w-10 h-10 rounded-full bg-[#083c2e] text-[#8af7c9] flex items-center justify-center shadow-lg relative z-10 border border-white/20">
                          <span className="material-symbols-outlined text-[22px]">push_pin</span>
                        </div>
                      </div>

                      <div className="absolute bottom-2 left-2 right-2 bg-white/90 backdrop-blur-sm p-2 rounded-lg flex items-center justify-between text-[11px]">
                        <span className="font-semibold text-[#00251b]">Radius Investigasi 25m</span>
                        <span className="text-[#006c4d] font-medium">GPS ±3m</span>
                      </div>
                    </div>

                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        selectedReport.locationAddress
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 rounded-xl bg-[#e3f1e9] text-[#00251b] hover:bg-[#88f4c6] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px] text-[#006c4d]">map</span>
                      <span>Buka di Peta Navigasi</span>
                    </a>
                  </section>

                  {/* Card: Action Buttons */}
                  <section className="flex flex-col gap-2.5">
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="w-full py-3 px-4 rounded-xl bg-white hover:bg-[#e9f7ee] text-[#00251b] border border-[#ddece3] text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[#006c4d] text-[18px]">print</span>
                      <span>Cetak Lembar Tiket Pengaduan</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('buat-laporan');
                        window.scrollTo({ top: 120, behavior: 'smooth' });
                      }}
                      className="w-full py-3 px-4 rounded-xl bg-[#083c2e] hover:bg-[#00251b] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">add_circle</span>
                      <span>Laporkan Kendala Lainnya</span>
                    </button>
                  </section>

                </aside>

              </div>
            </div>

            {/* List of Recent Citizen Reports Cards (Stitch 11) */}
            <section className="w-full bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#ddece3] flex flex-col gap-6 mt-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#ddece3]">
                <div>
                  <h3 className="text-lg font-bold text-[#00251b] font-display">
                    Daftar Pengaduan Terkini Warga Sidoarjo
                  </h3>
                  <p className="text-xs text-[#404945]">
                    Pilih salah satu kartu laporan untuk memuat riwayat penanganan dan status tindak lanjut di atas.
                  </p>
                </div>
                <span className="text-xs text-[#006c4d] font-semibold bg-[#e9f7ee] px-3 py-1 rounded-full">
                  Menampilkan {filteredReports.length} Aduan
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredReports.map((item) => (
                  <article
                    key={item.ticketNumber}
                    onClick={() => {
                      setSelectedReport(item);
                      window.scrollTo({ top: 220, behavior: 'smooth' });
                    }}
                    className={`bg-white rounded-2xl shadow-sm border p-5 flex flex-col justify-between hover:shadow-md transition-all cursor-pointer ${
                      selectedReport.ticketNumber === item.ticketNumber
                        ? 'border-[#006c4d] ring-2 ring-[#88f4c6]/50 bg-[#e9f7ee]/30'
                        : 'border-[#ddece3]'
                    }`}
                  >
                    <div>
                      {/* Upper Strip: Ticket ID & Status */}
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#ddece3]">
                        <span className="font-mono text-xs text-[#717974] px-2 py-0.5 rounded bg-[#e9f7ee] font-semibold">
                          #{item.ticketNumber}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            item.status === 'Selesai'
                              ? 'bg-[#8af7c9] text-[#002115]'
                              : item.status === 'Penanganan Lapangan'
                              ? 'bg-amber-100 text-amber-900'
                              : 'bg-[#ddece3] text-[#00251b]'
                          }`}
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${
                              item.status === 'Selesai'
                                ? 'bg-[#006c4d]'
                                : item.status === 'Penanganan Lapangan'
                                ? 'bg-amber-500'
                                : 'bg-[#717974]'
                            }`}
                          ></span>
                          {item.status}
                        </span>
                      </div>

                      {/* Category & Title */}
                      <div className="flex items-center gap-1.5 text-[#006c4d] text-xs font-semibold mb-1">
                        <span className="material-symbols-outlined text-[16px]">{item.categoryIcon}</span>
                        <span>{item.categoryLabel}</span>
                      </div>
                      <h4 className="font-bold text-sm text-[#00251b] font-display line-clamp-2 mb-3">
                        {item.title}
                      </h4>

                      {/* Metadata */}
                      <div className="flex flex-col gap-1 text-xs text-[#404945] mb-4">
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[15px] text-[#717974]">calendar_today</span>
                          <span>{item.submitDate}, {item.submitTime}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[15px] text-[#717974]">location_on</span>
                          <span className="truncate">{item.locationAddress}</span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="flex flex-col gap-1.5 mb-4 p-3 rounded-xl bg-[#e9f7ee] border border-[#ddece3]">
                        <div className="flex items-center justify-between text-xs font-semibold">
                          <span className="text-[#00251b]">{item.currentStageText.split(':')[0]}</span>
                          <span className="text-[#006c4d]">{item.progressPercent}%</span>
                        </div>
                        <div className="w-full bg-[#ddece3] h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-[#006c4d] h-full rounded-full transition-all duration-500"
                            style={{ width: `${item.progressPercent}%` }}
                          ></div>
                        </div>
                        <span className="text-[11px] text-[#717974] truncate">
                          {item.assignedOpd}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        className="w-full h-10 rounded-xl bg-white hover:bg-[#e9f7ee] text-[#00251b] text-xs font-bold transition-colors flex items-center justify-center gap-1 border border-[#ddece3] shadow-xs"
                      >
                        <span>Lihat Detail &amp; Riwayat</span>
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>

          </div>
        )}

      </div>
    </div>
  );
};

export default LaporanPage;
