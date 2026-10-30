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
import { RegisterAccountModal } from './components/RegisterAccountModal';
import { BudgetBreakdownModal } from './components/BudgetBreakdownModal';
import { ServiceGuideModal } from './components/ServiceGuideModal';
import { ServiceItem, ServiceCategory, CitizenAccount } from './types/portal';
import { CheckCircle2, User, LogOut } from 'lucide-react';

export default function App() {
  const [activeNav, setActiveNav] = useState('beranda');
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [accountMode, setAccountMode] = useState<'register' | 'login'>('register');
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState<ServiceCategory>('semua');
  const [filteredServices, setFilteredServices] = useState<ServiceItem[] | undefined>(undefined);
  const [searchActive, setSearchActive] = useState(false);

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
      const el = document.getElementById('transparansi');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartApplication = (service: ServiceItem) => {
    if (!currentUser) {
      setAccountMode('register');
      setIsAccountModalOpen(true);
      showToast(`Silakan mendaftar Satu Akun Warga untuk melanjutkan ke ${service.title}.`);
    } else {
      setIsTrackModalOpen(true);
      showToast(`Membuka sistem pengajuan digital ${service.title} untuk ${currentUser.fullName}.`);
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
      />

      <ServiceDetailModal
        service={selectedService}
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
        onStartApplication={handleStartApplication}
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

    </div>
  );
}
