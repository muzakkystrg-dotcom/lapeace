import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { QuickSearch } from './components/QuickSearch';
import { FeaturedServices, servicesData } from './components/FeaturedServices';
import { TransparencySection } from './components/TransparencySection';
import { SingleAccountBanner } from './components/SingleAccountBanner';
import { Footer } from './components/Footer';
import { TrackDocModal } from './components/TrackDocModal';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { ServiceApplicationModal } from './components/ServiceApplicationModal';
import { RegisterAccountModal } from './components/RegisterAccountModal';
import { BudgetBreakdownModal } from './components/BudgetBreakdownModal';
import { ServiceGuideModal } from './components/ServiceGuideModal';
import { AboutModal } from './components/AboutModal';
import { ServiceItem, ServiceCategory, CitizenAccount, TrackRecord } from './types/portal';
import { CheckCircle2, LogOut } from 'lucide-react';

export default function App() {
  const [activeNav, setActiveNav] = useState('beranda');
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [accountMode, setAccountMode] = useState<'register' | 'login'>('register');
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState<ServiceCategory>('semua');
  const [filteredServices, setFilteredServices] = useState<ServiceItem[] | undefined>(undefined);
  const [searchActive, setSearchActive] = useState(false);

  // Tracking dynamic state
  const [customTrackRecords, setCustomTrackRecords] = useState<Record<string, TrackRecord>>({});
  const [activeTrackingCode, setActiveTrackingCode] = useState<string>('');

  // Logged-in citizen simulation
  const [currentUser, setCurrentUser] = useState<CitizenAccount | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
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

    // Smooth scroll to services if query provided
    const servicesEl = document.getElementById('layanan');
    if (servicesEl) {
      servicesEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigateSection = (sectionId: string) => {
    setActiveNav(sectionId);
    if (sectionId === 'beranda') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === 'transparansi') {
      const el = document.getElementById('transparansi');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'layanan') {
      const el = document.getElementById('layanan');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'laporan') {
      const lapor = servicesData.find((s) => s.id === 'lapor112');
      if (lapor) {
        setSelectedService(lapor);
        setIsServiceModalOpen(true);
      }
    } else if (sectionId === 'tentang') {
      setIsAboutModalOpen(true);
    }
  };

  const handleStartApplication = (service: ServiceItem) => {
    setSelectedService(service);
    setIsApplicationModalOpen(true);
  };

  const handleApplicationSuccess = (application: { trackingId: string; serviceName: string; applicantName: string }) => {
    const formattedDate = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const newRecord: TrackRecord = {
      trackingNumber: application.trackingId,
      serviceName: application.serviceName,
      applicantName: application.applicantName,
      nikMasked: currentUser ? `${currentUser.nik.slice(0, 6)}******${currentUser.nik.slice(-4)}` : '351508******1234',
      submitDate: `${formattedDate}, ${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`,
      status: 'Diterima',
      currentOpd: selectedService?.opd || 'Pemerintah Kabupaten Sidoarjo',
      lastUpdated: 'Baru saja',
      steps: [
        { title: 'Pengajuan Permohonan Berkas Online Berhasil', date: 'Hari ini', completed: true, notes: 'Dokumen dan rincian formulir berhasil dicatat di portal SITAPAK.' },
        { title: 'Verifikasi Dokumen oleh Petugas Kelurahan / OPD', completed: false, current: true, notes: 'Menunggu telaah kelengkapan administrasi dan berkas pendukung.' },
        { title: 'Pemeriksaan Lapangan / Validasi Teknis OPD', completed: false },
        { title: 'Penerbitan Dokumen / Tanda Tangan Elektronik', completed: false },
        { title: 'Dokumen Selesai & Siap Diambil / Diunduh', completed: false },
      ],
    };

    setCustomTrackRecords((prev) => ({
      ...prev,
      [application.trackingId]: newRecord,
    }));
    setActiveTrackingCode(application.trackingId);
    showToast(`Pengajuan ${application.serviceName} berhasil dikirim! No: ${application.trackingId}`);
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

      {/* User Login Pill Bar if authenticated */}
      {currentUser && (
        <div className="bg-[#05241B] text-emerald-100 text-xs py-2 px-4 border-b border-emerald-900/60 flex items-center justify-between">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>
                Akun Terverifikasi: <strong>{currentUser.fullName}</strong> (NIK: {currentUser.nik.slice(0, 6)}******{currentUser.nik.slice(-4)}) • Kecamatan {currentUser.kecamatan}
              </span>
            </div>
            <button
              onClick={() => {
                setCurrentUser(null);
                showToast('Anda telah keluar dari sesi akun warga.');
              }}
              className="text-emerald-300 hover:text-white flex items-center gap-1 cursor-pointer font-medium"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      )}

      {/* 1. Header / Navbar */}
      <Navbar
        activeNav={activeNav}
        onNavigateSection={handleNavigateSection}
        onOpenLogin={() => {
          setAccountMode('login');
          setIsAccountModalOpen(true);
        }}
        onOpenRegister={() => {
          setAccountMode('register');
          setIsAccountModalOpen(true);
        }}
      />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <HeroSection
          onExploreServices={() => {
            const el = document.getElementById('layanan');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenTrackModal={() => setIsTrackModalOpen(true)}
        />

        {/* 3. Quick Search Bar */}
        <QuickSearch onSearch={handleSearch} initialQuery={searchQuery} />

        {/* 4. Featured Services */}
        <FeaturedServices
          filteredServices={filteredServices}
          searchActive={searchActive}
          onSelectService={(service) => {
            setSelectedService(service);
            setIsServiceModalOpen(true);
          }}
        />

        {/* 5. Transparency & Budget Section */}
        <TransparencySection
          onOpenBudgetModal={() => setIsBudgetModalOpen(true)}
        />

        {/* 6. Single Account Citizen Banner */}
        <SingleAccountBanner
          onOpenRegister={() => {
            setAccountMode('register');
            setIsAccountModalOpen(true);
          }}
          onOpenGuide={() => setIsGuideModalOpen(true)}
        />
      </main>

      {/* 7. Official Civic Footer */}
      <Footer onNavigateSection={handleNavigateSection} />

      {/* Interactive Modals */}
      <TrackDocModal
        isOpen={isTrackModalOpen}
        onClose={() => setIsTrackModalOpen(false)}
        initialTrackingCode={activeTrackingCode}
        customRecords={customTrackRecords}
      />

      <ServiceDetailModal
        service={selectedService}
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
        onStartApplication={handleStartApplication}
      />

      <ServiceApplicationModal
        isOpen={isApplicationModalOpen}
        onClose={() => setIsApplicationModalOpen(false)}
        service={selectedService}
        currentUser={currentUser}
        onSubmitSuccess={handleApplicationSuccess}
      />

      <RegisterAccountModal
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
        initialMode={accountMode}
        onSuccess={(account) => {
          setCurrentUser(account);
          showToast(`Selamat datang di SITAPAK Sidoarjo, ${account.fullName}!`);
        }}
      />

      <BudgetBreakdownModal
        isOpen={isBudgetModalOpen}
        onClose={() => setIsBudgetModalOpen(false)}
      />

      <ServiceGuideModal
        isOpen={isGuideModalOpen}
        onClose={() => setIsGuideModalOpen(false)}
        onOpenRegister={() => {
          setAccountMode('register');
          setIsAccountModalOpen(true);
        }}
      />

      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
      />

    </div>
  );
}
