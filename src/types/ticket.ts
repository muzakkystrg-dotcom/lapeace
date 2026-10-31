export interface TimelineStep {
  stepNumber: number;
  phaseLabel: string;
  slaBadge: string;
  title: string;
  description: string;
  status: 'active' | 'upcoming' | 'completed';
  deadlineNotice?: string;
}

export interface TicketDetails {
  ticketId: string; // e.g. "GOV-2026-00128"
  priority: 'Prioritas Reguler' | 'Prioritas Tinggi' | 'Darurat';
  status: 'Menunggu Verifikasi' | 'Sedang Diproses Lapangan' | 'Selesai & Publikasi Hasil';
  title: string;
  category: string;
  submittedAt: string;
  location: string;
  coordinates: string;
  subdistrict: string;
  investigationRadiusText: string;
  attachment: {
    fileName: string;
    fileSize: string;
    format: string;
    verificationText: string;
    previewUrl?: string;
  };
  steps: TimelineStep[];
  averageResponseTime: string;
  resolutionRate: string;
}
