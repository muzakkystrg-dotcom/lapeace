export type ReportCategoryKey = 'jalan' | 'pju' | 'sampah' | 'saluran' | 'kesehatan' | 'lainnya';

export type ReportStatusCode = 'menunggu' | 'diproses' | 'selesai';

export interface TimelineEntry {
  title: string;
  date: string;
  opd: string;
  completed: boolean;
  current?: boolean;
  notes?: string;
}

export interface ReportItem {
  id: string; // e.g. '#LP-2024-0891'
  title: string;
  category: string;
  categoryKey: ReportCategoryKey;
  status: 'Menunggu Verifikasi' | 'Diproses' | 'Selesai';
  statusCode: ReportStatusCode;
  date: string;
  location: string;
  description: string;
  stepCurrent: number;
  stepTotal: number;
  stepLabel: string;
  progressPercent: number;
  opd: string;
  imageUrl?: string;
  fileName?: string;
  fileSize?: string;
  isAnonymous: boolean;
  reporterName?: string;
  timeline: TimelineEntry[];
}

export interface ReportFormInput {
  title: string;
  category: string;
  locationAddress: string;
  coordinates: string;
  description: string;
  isAnonymous: boolean;
  attachedFile?: {
    name: string;
    size: string;
    previewUrl?: string;
  };
}
