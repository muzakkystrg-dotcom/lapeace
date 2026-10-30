export type ServiceCategory = 'semua' | 'kependudukan' | 'perizinan' | 'anggaran' | 'pengaduan' | 'sosial';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  category: ServiceCategory;
  iconName: 'Plavon' | 'Sipraja' | 'SatuData' | 'Lapor';
  actionLabel: string;
  badge?: string;
  externalUrl?: string;
  opd: string;
  sla: string;
  requirements: string[];
  features: string[];
}

export interface TransparencyMetric {
  id: string;
  label: string;
  value: string;
  subtext: string;
  category: string;
  trend?: string;
  statusColor?: string;
}

export interface LiveUpdateItem {
  id: string;
  opd: string;
  message: string;
  timeAgo: string;
  category: 'infrastruktur' | 'anggaran' | 'layanan' | 'kesehatan';
}

export interface TrackRecord {
  trackingNumber: string;
  serviceName: string;
  applicantName: string;
  nikMasked: string;
  submitDate: string;
  status: 'Diterima' | 'Verifikasi Dokumen' | 'Proses OPD' | 'Siap Diambil' | 'Selesai';
  currentOpd: string;
  lastUpdated: string;
  steps: {
    title: string;
    date?: string;
    completed: boolean;
    current?: boolean;
    notes?: string;
  }[];
}

export interface CitizenAccount {
  nik: string;
  fullName: string;
  email: string;
  phone: string;
  kecamatan: string;
  kelurahan: string;
}
