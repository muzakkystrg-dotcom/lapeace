export interface TimelineDetailStep {
  stepNumber: number;
  title: string;
  badgeText: string;
  badgeType: 'success' | 'warning' | 'neutral';
  timestamp: string;
  description: string;
  authNote?: string;
  verifier?: string;
  dispositionInfo?: {
    agency: string;
    dispositionNo: string;
  };
  status: 'completed' | 'in_progress' | 'pending';
}

export interface OfficerResponseData {
  officerInitials: string;
  officerName: string;
  officerRole: string;
  agencyName: string;
  responseTime: string;
  quoteMessage: string;
  attachmentFileName: string;
  attachmentFileSize: string;
  digitalSignatureBadge: string;
}

export interface LocationDetailData {
  address: string;
  coordinates: string;
  radiusText: string;
  accuracyText: string;
  navigationUrl: string;
}

export interface EvidencePhotoData {
  citizenPhoto: {
    title: string;
    date: string;
    overlayBadge: string;
    caption: string;
    imageUrl: string;
  };
  followupPhoto: {
    title: string;
    statusBadge: string;
    waitingTitle: string;
    waitingDesc: string;
    notes: string;
  };
}

export interface ReportDetailData {
  id: string; // "GOV-2026-00128"
  statusBadge: string; // "Sedang Diproses"
  statusCode: 'diproses' | 'selesai' | 'menunggu';
  slaTitle: string;
  slaSubtext: string;
  slaTarget: string;
  slaEstimatedFinish: string;
  metadata: {
    registrationNumber: string;
    submittedDate: string;
    submittedTime: string;
    agencyClassification: string;
    agencySubtext: string;
    urgencyPriority: string;
    urgencySubtext: string;
  };
  timeline: TimelineDetailStep[];
  officerResponse: OfficerResponseData;
  evidence: EvidencePhotoData;
  summary: {
    title: string;
    category: string;
    urgencyLevel: string;
    reporterIdentity: string;
    reportingChannel: string;
  };
  location: LocationDetailData;
}
