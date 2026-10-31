import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { PageHeader } from './components/PageHeader';
import { ReportFormSection } from './components/ReportFormSection';
import { PublicTrackingSection } from './components/PublicTrackingSection';
import { ReportDetailModal } from './components/ReportDetailModal';
import { HeroSection } from './components/HeroSection';
import { QuickSearch } from './components/QuickSearch';
import { FeaturedServices, servicesData } from './components/FeaturedServices';
import { TransparencySection } from './components/TransparencySection';
import { SingleAccountBanner } from './components/SingleAccountBanner';
import { Footer } from './components/Footer';

// Confirmation Screen Components
import { Breadcrumb } from './components/Breadcrumb';
import { SuccessHeroBanner } from './components/SuccessHeroBanner';
import { TicketSummaryCard } from './components/TicketSummaryCard';
import { WorkflowTimelineCard } from './components/WorkflowTimelineCard';
import { ActionPanel } from './components/ActionPanel';
import { InfoNoticeCard } from './components/InfoNoticeCard';
import { EmergencyAssistanceCard } from './components/EmergencyAssistanceCard';
import { PhotoPreviewModal } from './components/PhotoPreviewModal';

// Detail Status Page Components
import { ReportHeaderBanner } from './components/ReportHeaderBanner';
import { StatusHighlightCard } from './components/StatusHighlightCard';
import { MetadataGrid } from './components/MetadataGrid';
import { TimelineCard } from './components/TimelineCard';
import { OfficerResponseCard } from './components/OfficerResponseCard';
import { EvidenceMediaCard } from './components/EvidenceMediaCard';
import { ReportSummaryCard } from './components/ReportSummaryCard';
import { LocationMapCard } from './components/LocationMapCard';
import { ActionSidebar } from './components/ActionSidebar';
import { EmergencyNoticeCard } from './components/EmergencyNoticeCard';

// Modals
import { TrackDocModal } from './components/TrackDocModal';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { RegisterAccountModal } from './components/RegisterAccountModal';
import { BudgetBreakdownModal } from './components/BudgetBreakdownModal';
import { ServiceGuideModal } from './components/ServiceGuideModal';

import { ServiceItem, ServiceCategory, CitizenAccount } from './types/portal';
import { ReportItem } from './types/report';
import { TicketDetails } from './types/ticket';
import { ReportDetailData } from './types/reportDetail';
import { initialMockReports } from './data/mockReports';
import { defaultMockTicket } from './data/mockTicket';
import { mockReportDetailData } from './data/mockReportDetail';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  // Page Routing: 'beranda' | 'laporan' | 'konfirmasi' | 'detail'
  const [currentPage, setCurrentPage] = useState<'beranda' | 'laporan' | 'konfirmasi' | 'detail'>('detail');

  // Active Detail Report Data
  const [reportDetail, setReportDetail] = useState<ReportDetailData>(mockReportDetailData);

  // Active Submitted Ticket for the Confirmation Screen
  const [activeTicket, setActiveTicket] = useState<TicketDetails>(defaultMockTicket);
  const [isPhotoPreviewOpen, setIsPhotoPreviewOpen] = useState(false);

  // Reports state for Civic Reporting
  const [reports, setReports] = useState<ReportItem[]>(initialMockReports);
  const [selectedReport, setSelectedReport] = useState<ReportItem | null>(null);
  const [isReportDetailOpen, setIsReportDetailOpen] = useState(false);

  // Home portal modals & state
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [accountMode, setAccountMode] = useState<'register' | 'login'>('register');
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);

  // Search state for Beranda
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState<ServiceCategory>('semua');
  const [filteredServices, setFilteredServices] = useState<ServiceItem[] | undefined>(undefined);
  const [searchActive, setSearchActive] = useState(false);

  // Verified user state
  const [currentUser, setCurrentUser] = useState<CitizenAccount>({
    nik: '3515082104920003',
    fullName: 'Budi Santoso',
    email: 'budi.santoso@warga.sidoarjo.go.id',
    phone: '081234567890',
    kecamatan: 'Sidoarjo',
    kelurahan: 'Sidokumpul',
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleNavigatePage = (page: 'beranda' | 'laporan' | 'konfirmasi' | 'detail', sectionId?: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (page === 'beranda' && sectionId && sectionId !== 'beranda') {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleSearch = (query: string, category: ServiceCategory) => {
    setSearchQuery(query);
    setSearchCategory(category);

    if (!query && category === 'semua') {
      setFilteredServices(undefined);
      setSearchActive(false);
      return;
    }

    setSearchActive(true);
    const results = servicesData.filter((item) => {
      const matchCat = category === 'semua' || item.category === category;
      const qLower = query.toLowerCase();
      const matchQuery =
        !query ||
        item.title.toLowerCase().includes(qLower) ||
        item.description.toLowerCase().includes(qLower) ||
        item.opd.toLowerCase().includes(qLower) ||
        item.features.some((f) => f.toLowerCase().includes(qLower));

      return matchCat && matchQuery;
    });

    setFilteredServices(results);

    const servicesEl = document.getElementById('layanan');
    if (servicesEl) {
      servicesEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Submit new report from ReportFormCard -> transitions to Confirmation Screen
  const handleSubmitNewReport = (newReportData: Partial<ReportItem>) => {
    const randomTicketNum = Math.floor(1000 + Math.random() * 9000);
    const ticketId = `GOV-2026-0${randomTicketNum}`;

    const newTicket: TicketDetails = {
      ticketId: ticketId,
      priority: 'Prioritas Reguler',
      status: 'Menunggu Verifikasi',
      title: newReportData.title || 'Laporan Kendala Fasilitas Publik',
      category: newReportData.category || 'Infrastruktur & Bina Marga',
      submittedAt: 'Hari ini, baru saja',
      location: newReportData.location || 'Jalan Melati, Sidoarjo, Jawa Timur',
      coordinates: '-7.2575° S, 112.7521° E',
      subdistrict: 'Wilayah Kab. Sidoarjo',
      investigationRadiusText: `Radius Investigasi Terpetakan: ${newReportData.location || 'Lokasi Kejadian'}`,
      attachment: {
        fileName: newReportData.fileName || 'bukti_foto_lapangan.jpg',
        fileSize: newReportData.fileSize || '2.4 MB',
        format: 'Format JPG',
        verificationText: 'Terverifikasi EXIF Geotag',
        previewUrl: '/src/assets/images/sidoarjo_civic_center_1793361616866.jpg',
      },
      steps: [
        {
          stepNumber: 1,
          phaseLabel: 'TAHAP 1 • AKTIF SAAT INI',
          slaBadge: 'SLA: 1×24 Jam',
          title: 'Menunggu Verifikasi Petugas',
          description: 'Laporan sedang dalam antrean pemeriksaan berkas kelengkapan bukti dan validasi keabsahan oleh petugas piket Command Center SITAPAK.',
          status: 'active',
          deadlineNotice: 'Ditinjau sebelum: 24 jam ke depan',
        },
        {
          stepNumber: 2,
          phaseLabel: 'TAHAP 2 • MENDATANG',
          slaBadge: 'Estimasi 2-4 Hari',
          title: 'Sedang Diproses Lapangan',
          description: 'Setelah terverifikasi, laporan diteruskan ke dinas teknis terkait untuk survei lokasi dan pengerjaan perbaikan.',
          status: 'upcoming',
        },
        {
          stepNumber: 3,
          phaseLabel: 'TAHAP 3 • SELESAI',
          slaBadge: 'Hasil Akhir',
          title: 'Selesai & Publikasi Hasil',
          description: 'Pekerjaan fisik selesai, foto perbaikan diunggah, dan Berita Acara Penyelesaian diterbitkan.',
          status: 'upcoming',
        },
      ],
      averageResponseTime: '4.2 Jam',
      resolutionRate: '98.4%',
    };

    setActiveTicket(newTicket);
    setCurrentPage('konfirmasi');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Laporan berhasil dikirim! ID Tiket: ${ticketId}.`);
  };

  const handleOpenReportDetail = (report: ReportItem) => {
    // When clicking a report card, update detail view and navigate to 'detail'
    setReportDetail({
      ...mockReportDetailData,
      id: report.id,
      statusBadge: report.status,
      summary: {
        ...mockReportDetailData.summary,
        title: report.title,
        category: report.category,
      },
      location: {
        ...mockReportDetailData.location,
        address: report.location,
      },
    });
    setCurrentPage('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectFeaturedService = (service: ServiceItem) => {
    if (service.id === 'lapor112') {
      setCurrentPage('laporan');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      showToast('Beralih ke Portal Laporan Warga & Pengaduan SP4N 112.');
    } else {
      setSelectedService(service);
      setIsServiceModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF9] text-[#15211C]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-4 sm:right-8 z-50 max-w-md bg-[#05241B] text-white p-4 rounded-xl shadow-2xl border border-emerald-500/50 flex items-start gap-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm font-medium leading-relaxed">
            {toastMessage}
          </div>
        </div>
      )}

      {/* Universal Top Navigation Bar */}
      <Navbar
        currentPage={currentPage === 'beranda' ? 'beranda' : 'laporan'}
        onNavigatePage={handleNavigatePage}
        onOpenLogin={() => {
          setAccountMode('login');
          setIsAccountModalOpen(true);
        }}
        onOpenRegister={() => {
          setAccountMode('register');
          setIsAccountModalOpen(true);
        }}
        user={{
          fullName: currentUser.fullName,
          isVerified: true,
        }}
      />

      {/* Main Body Content */}
      <main className="flex-1">
        {/* SCREEN 4: Detail Status & Pelacakan Laporan Warga */}
        {currentPage === 'detail' ? (
          <div className="pb-16">
            {/* Breadcrumb */}
            <Breadcrumb
              onNavigateHome={() => handleNavigatePage('beranda')}
              onNavigateReports={() => handleNavigatePage('laporan')}
              currentLabel="Detail Laporan"
            />

            {/* Header Banner */}
            <ReportHeaderBanner
              id={reportDetail.id}
              statusBadge={reportDetail.statusBadge}
              onPrint={() => window.print()}
            />

            {/* SLA Status Highlight Banner */}
            <StatusHighlightCard
              title={reportDetail.slaTitle}
              subtext={reportDetail.slaSubtext}
              slaTarget={reportDetail.slaTarget}
              estimatedFinish={reportDetail.slaEstimatedFinish}
            />

            {/* 4-Card Overview Metadata Grid */}
            <MetadataGrid
              registrationNumber={reportDetail.metadata.registrationNumber}
              submittedDate={reportDetail.metadata.submittedDate}
              submittedTime={reportDetail.metadata.submittedTime}
              agencyClassification={reportDetail.metadata.agencyClassification}
              agencySubtext={reportDetail.metadata.agencySubtext}
              urgencyPriority={reportDetail.metadata.urgencyPriority}
              urgencySubtext={reportDetail.metadata.urgencySubtext}
            />

            {/* 12-Column Grid: Left 8 cols, Right 4 cols */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Column (8 cols) */}
                <div className="lg:col-span-8 space-y-6">
                  {/* Riwayat Penanganan Laporan Stepper */}
                  <TimelineCard timeline={reportDetail.timeline} />

                  {/* Tanggapan Petugas & Tindak Lanjut Resmi */}
                  <OfficerResponseCard response={reportDetail.officerResponse} />

                  {/* Dokumentasi Penanganan & Bukti Fisik */}
                  <EvidenceMediaCard
                    evidence={reportDetail.evidence}
                    onPreviewCitizenPhoto={() => setIsPhotoPreviewOpen(true)}
                  />
                </div>

                {/* Right Column (4 cols) */}
                <div className="lg:col-span-4 space-y-6">
                  {/* Informasi Laporan Card */}
                  <ReportSummaryCard
                    reportId={reportDetail.id}
                    title={reportDetail.summary.title}
                    category={reportDetail.summary.category}
                    urgencyLevel={reportDetail.summary.urgencyLevel}
                    reporterIdentity={reportDetail.summary.reporterIdentity}
                    reportingChannel={reportDetail.summary.reportingChannel}
                  />

                  {/* Titik Lokasi Terlapor Card */}
                  <LocationMapCard location={reportDetail.location} />

                  {/* Aksi Cepat Sidebar */}
                  <ActionSidebar
                    onBackToReports={() => handleNavigatePage('laporan')}
                    onDownloadPdf={() => alert(`Mengunduh dokumen PDF Berita Acara Laporan ${reportDetail.id}...`)}
                    onCreateNewReport={() => {
                      handleNavigatePage('laporan');
                      setTimeout(() => {
                        window.scrollTo({ top: 300, behavior: 'smooth' });
                      }, 200);
                    }}
                  />

                  {/* Butuh Klarifikasi Tambahan Card */}
                  <EmergencyNoticeCard />
                </div>

              </div>
            </div>
          </div>
        ) : currentPage === 'konfirmasi' ? (
          /* SCREEN 3: Konfirmasi Laporan Berhasil Dikirim */
          <div className="pb-16">
            <Breadcrumb
              onNavigateHome={() => handleNavigatePage('beranda')}
              onNavigateReports={() => handleNavigatePage('laporan')}
              currentLabel="Konfirmasi Pengiriman Laporan"
            />

            <SuccessHeroBanner />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 space-y-6">
                  <TicketSummaryCard
                    ticket={activeTicket}
                    onPreviewPhoto={() => setIsPhotoPreviewOpen(true)}
                  />
                  <InfoNoticeCard ticketId={activeTicket.ticketId} />
                </div>

                <div className="lg:col-span-5 space-y-6">
                  <WorkflowTimelineCard
                    steps={activeTicket.steps}
                    averageResponseTime={activeTicket.averageResponseTime}
                    resolutionRate={activeTicket.resolutionRate}
                  />

                  <ActionPanel
                    onTrackStatus={() => {
                      setCurrentPage('detail');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    onNavigateHome={() => handleNavigatePage('beranda')}
                    onPrintReport={() => window.print()}
                  />

                  <EmergencyAssistanceCard />
                </div>
              </div>
            </div>
          </div>
        ) : currentPage === 'laporan' ? (
          /* SCREEN 2: Formulir Laporan Warga & Pelacakan */
          <>
            <PageHeader onNavigateHome={() => handleNavigatePage('beranda')} />
            <ReportFormSection
              onSubmitReport={handleSubmitNewReport}
              onSaveDraft={() => showToast('Draf aduan Anda telah berhasil disimpan.')}
            />
            <PublicTrackingSection
              reports={reports}
              onViewDetail={handleOpenReportDetail}
            />
          </>
        ) : (
          /* SCREEN 1: Beranda Utama */
          <>
            <HeroSection
              onExploreServices={() => {
                const el = document.getElementById('layanan');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenTrackModal={() => setIsTrackModalOpen(true)}
            />
            <QuickSearch onSearch={handleSearch} initialQuery={searchQuery} />
            <FeaturedServices
              filteredServices={filteredServices}
              searchActive={searchActive}
              onSelectService={handleSelectFeaturedService}
            />
            <TransparencySection
              onOpenBudgetModal={() => setIsBudgetModalOpen(true)}
            />
            <SingleAccountBanner
              onOpenRegister={() => {
                setAccountMode('register');
                setIsAccountModalOpen(true);
              }}
              onOpenGuide={() => setIsGuideModalOpen(true)}
            />
          </>
        )}
      </main>

      {/* Universal Civic Footer */}
      <Footer
        onNavigateSection={(sectionId, page) => {
          if (page) {
            handleNavigatePage(page, sectionId);
          } else {
            handleNavigatePage('beranda', sectionId);
          }
        }}
      />

      {/* Photo Preview Modal */}
      <PhotoPreviewModal
        isOpen={isPhotoPreviewOpen}
        onClose={() => setIsPhotoPreviewOpen(false)}
        fileName={reportDetail.evidence.citizenPhoto.title}
        fileSize="2.4 MB"
        imageUrl={reportDetail.evidence.citizenPhoto.imageUrl}
        coordinates={reportDetail.location.coordinates}
      />

      {/* Modal Quick View */}
      <ReportDetailModal
        report={selectedReport}
        isOpen={isReportDetailOpen}
        onClose={() => setIsReportDetailOpen(false)}
      />

      {/* Document Track Modal (Beranda) */}
      <TrackDocModal
        isOpen={isTrackModalOpen}
        onClose={() => setIsTrackModalOpen(false)}
      />

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
        onStartApplication={(svc) => {
          if (svc.id === 'lapor112') {
            setCurrentPage('laporan');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            setIsTrackModalOpen(true);
            showToast(`Membuka sistem pengajuan digital ${svc.title}.`);
          }
        }}
      />

      {/* Register / Login Modal */}
      <RegisterAccountModal
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
        initialMode={accountMode}
        onSuccess={(account) => {
          setCurrentUser(account);
          showToast(`Akun warga ${account.fullName} berhasil diverifikasi!`);
        }}
      />

      {/* Budget Modal */}
      <BudgetBreakdownModal
        isOpen={isBudgetModalOpen}
        onClose={() => setIsBudgetModalOpen(false)}
      />

      {/* Guide Modal */}
      <ServiceGuideModal
        isOpen={isGuideModalOpen}
        onClose={() => setIsGuideModalOpen(false)}
        onOpenRegister={() => {
          setAccountMode('register');
          setIsAccountModalOpen(true);
        }}
      />

    </div>
  );
}
