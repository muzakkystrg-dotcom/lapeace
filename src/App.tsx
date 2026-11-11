import React, { useState, useEffect, useMemo, Suspense, lazy } from 'react';
import { Navbar, Footer } from './components/layout';
import { HeroSection } from './components/HeroSection';
import { QuickSearch } from './components/QuickSearch';
import { FeaturedServices, servicesData } from './components/FeaturedServices';
import { TransparencySection } from './components/TransparencySection';
import { SingleAccountBanner } from './components/SingleAccountBanner';
import { ServiceItem, ServiceCategory, CitizenAccount } from './types/portal';
import { CheckCircle2 } from 'lucide-react';

// Lazy loaded route pages (diunduh on-demand saat rute aktif)
const DataPublikPage = lazy(() => import('./pages/DataPublikPage').then(m => ({ default: m.DataPublikPage })));
const LayananPage = lazy(() => import('./pages/LayananPage').then(m => ({ default: m.LayananPage })));
const LaporanPage = lazy(() => import('./pages/LaporanPage').then(m => ({ default: m.LaporanPage })));
const TentangPage = lazy(() => import('./pages/TentangPage').then(m => ({ default: m.TentangPage })));

// Lazy loaded sub-pages layanan
const KtpServicePage = lazy(() => import('./pages/services/KtpServicePage').then(m => ({ default: m.KtpServicePage })));
const NibServicePage = lazy(() => import('./pages/services/NibServicePage').then(m => ({ default: m.NibServicePage })));
const SkuServicePage = lazy(() => import('./pages/services/SkuServicePage').then(m => ({ default: m.SkuServicePage })));
const FaskesServicePage = lazy(() => import('./pages/services/FaskesServicePage').then(m => ({ default: m.FaskesServicePage })));
const DtksServicePage = lazy(() => import('./pages/services/DtksServicePage').then(m => ({ default: m.DtksServicePage })));

// Lazy loaded full-screen Admin Portal (terisolasi dari portal publik)
const AdminPortal = lazy(() => import('./pages/admin/AdminPortal').then(m => ({ default: m.AdminPortal })));

// Lazy loaded interactive modals (diunduh hanya saat pemicu diklik)
const TrackDocModal = lazy(() => import('./components/TrackDocModal').then(m => ({ default: m.TrackDocModal })));
const ServiceDetailModal = lazy(() => import('./components/ServiceDetailModal').then(m => ({ default: m.ServiceDetailModal })));
const RegisterAccountModal = lazy(() => import('./components/RegisterAccountModal').then(m => ({ default: m.RegisterAccountModal })));
const BudgetBreakdownModal = lazy(() => import('./components/BudgetBreakdownModal').then(m => ({ default: m.BudgetBreakdownModal })));
const ServiceGuideModal = lazy(() => import('./components/ServiceGuideModal').then(m => ({ default: m.ServiceGuideModal })));

// Smooth Skeleton loader fallback saat rute sedang dimuat
const RouteSkeleton = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse space-y-6">
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 bg-emerald-100/60 rounded-xl"></div>
      <div className="space-y-2 flex-1">
        <div className="h-6 bg-slate-200 rounded-md w-1/3"></div>
        <div className="h-3 bg-slate-100 rounded w-1/2"></div>
      </div>
    </div>
    <div className="h-4 bg-slate-100 rounded w-2/3"></div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
      <div className="h-56 bg-slate-100 rounded-2xl border border-slate-200/60"></div>
      <div className="h-56 bg-slate-100 rounded-2xl border border-slate-200/60"></div>
      <div className="h-56 bg-slate-100 rounded-2xl border border-slate-200/60"></div>
    </div>
  </div>
);

const defaultStitchCitizen: CitizenAccount = {
  nik: '3515082104900002',
  fullName: 'Budi Santoso',
  email: 'budi.santoso@warga.sidoarjokab.go.id',
  phone: '081234567890',
  kecamatan: 'Sidoarjo Kota',
  kelurahan: 'Sidokumpul',
};

export default function App() {
  const [currentHash, setCurrentHash] = useState<string>(() => {
    return window.location.hash || '#beranda';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '#beranda';
      setCurrentHash(hash);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const activeNav = useMemo(() => {
    if (currentHash === '#data-publik' || currentHash === '#transparansi') return 'transparansi';
    if (currentHash.startsWith('#layanan')) return 'layanan';
    if (currentHash === '#laporan' || currentHash === '#lapor') return 'laporan';
    if (currentHash === '#tentang') return 'tentang';
    return 'beranda';
  }, [currentHash]);

  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [accountMode, setAccountMode] = useState<'register' | 'login'>('register');
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState<ServiceCategory>('semua');
  const [filteredServices, setFilteredServices] = useState<ServiceItem[] | undefined>(undefined);
  const [searchActive, setSearchActive] = useState(false);

  // Citizen session with server-validated JWT token & cache
  const [currentUser, setCurrentUser] = useState<CitizenAccount | null>(() => {
    try {
      const cached = localStorage.getItem('sitapak_citizen_session');
      if (cached) {
        return JSON.parse(cached) as CitizenAccount;
      }
    } catch (e) {
      console.warn('Gagal membaca sesi warga dari localStorage:', e);
    }
    return null;
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Verifikasi keabsahan sesi token ke server backend SITAPAK
  useEffect(() => {
    const token =
      sessionStorage.getItem('sitapak_auth_token') ||
      localStorage.getItem('sitapak_auth_token');
    if (token) {
      fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          if (res.ok) return res.json();
          if (res.status === 401) {
            throw new Error('UNAUTHORIZED');
          }
          // Jika respons error lain (500 atau gateway error), pertahankan sesi lokal warga
          return null;
        })
        .then((data) => {
          if (data && data.citizen) {
            setCurrentUser(data.citizen);
            localStorage.setItem('sitapak_citizen_session', JSON.stringify(data.citizen));
          }
        })
        .catch((err) => {
          if (err && err.message === 'UNAUTHORIZED') {
            // Token secara definitif tidak sah/kedaluwarsa (401)
            sessionStorage.removeItem('sitapak_auth_token');
            localStorage.removeItem('sitapak_auth_token');
            localStorage.removeItem('sitapak_citizen_session');
            setCurrentUser(null);
          } else {
            console.warn('Verifikasi token latar belakang gagal terhubung ke server:', err);
          }
        });
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleLoginSuccess = (account: CitizenAccount) => {
    setCurrentUser(account);
    try {
      localStorage.setItem('sitapak_citizen_session', JSON.stringify(account));
    } catch (e) {
      console.warn('Gagal menyimpan sesi warga ke localStorage:', e);
    }
    showToast(`Selamat datang di SITAPAK Sidoarjo, ${account.fullName}!`);
    if (account.role === 'admin_pemkab' || account.role === 'operator_opd') {
      window.location.hash = '#admin';
    }
  };

  const handleLogout = () => {
    const token =
      sessionStorage.getItem('sitapak_auth_token') ||
      localStorage.getItem('sitapak_auth_token');
    if (token) {
      fetch('/api/auth/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      }).catch(() => {});
    }
    setCurrentUser(null);
    try {
      sessionStorage.removeItem('sitapak_auth_token');
      localStorage.removeItem('sitapak_auth_token');
      localStorage.removeItem('sitapak_citizen_session');
    } catch (e) {
      console.warn('Gagal menghapus sesi warga dari storage:', e);
    }
    showToast('Anda telah keluar dari sesi akun warga.');
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

    // If on another page, navigate to layanan or scroll
    if (currentHash !== '#beranda') {
      window.location.hash = '#layanan';
    } else {
      const servicesEl = document.getElementById('layanan');
      if (servicesEl) {
        servicesEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleNavigateSection = (sectionId: string) => {
    if (sectionId === 'beranda') {
      window.location.hash = '#beranda';
    } else if (sectionId === 'transparansi' || sectionId === 'data-publik') {
      window.location.hash = '#data-publik';
    } else if (sectionId === 'layanan') {
      window.location.hash = '#layanan';
    } else if (sectionId === 'laporan') {
      window.location.hash = '#laporan';
    } else if (sectionId === 'tentang') {
      window.location.hash = '#tentang';
    } else {
      window.location.hash = `#${sectionId}`;
    }
  };

  const handleStartApplication = (service: ServiceItem) => {
    if (service.id === 'lapor112') {
      setIsServiceModalOpen(false);
      window.location.hash = '#laporan';
      return;
    }
    if (service.id === 'plavon') {
      setIsServiceModalOpen(false);
      window.location.hash = '#layanan/ktp';
      return;
    }
    if (service.id === 'sipraja') {
      setIsServiceModalOpen(false);
      window.location.hash = '#layanan/sku';
      return;
    }
    if (!currentUser) {
      setAccountMode('register');
      setIsAccountModalOpen(true);
      showToast(`Silakan mendaftar Satu Akun Warga untuk melanjutkan ke ${service.title}.`);
    } else {
      setIsTrackModalOpen(true);
      showToast(`Membuka sistem pengajuan digital ${service.title} untuk ${currentUser.fullName}.`);
    }
  };

  // Full-screen isolated Admin Portal (terisolasi penuh dari layout portal publik)
  if (currentHash.startsWith('#admin')) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-900">
        {toastMessage && (
          <div className="fixed top-6 right-6 z-50 max-w-md bg-[#05241B] text-white p-4 rounded-xl shadow-2xl border border-emerald-500/50 flex items-start gap-3 animate-in fade-in slide-in-from-top-4 duration-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm font-medium leading-relaxed">
              {toastMessage}
            </div>
          </div>
        )}
        <Suspense fallback={<RouteSkeleton />}>
          <AdminPortal
            currentUser={currentUser}
            onLogout={handleLogout}
            onNavigateHome={() => {
              window.location.hash = '#beranda';
            }}
            onOpenLoginModal={() => {
              setAccountMode('login');
              setIsAccountModalOpen(true);
            }}
            onAdminLoginSuccess={handleLoginSuccess}
          />
        </Suspense>
      </div>
    );
  }

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

      {/* 1. Header / Navbar (Google Stitch Exact) */}
      <Navbar
        currentUser={currentUser}
        activeNav={activeNav}
        notificationsCount={2}
        onNavigateSection={handleNavigateSection}
        onOpenLogin={() => {
          setAccountMode('login');
          setIsAccountModalOpen(true);
        }}
        onOpenRegister={() => {
          setAccountMode('register');
          setIsAccountModalOpen(true);
        }}
        onLogout={handleLogout}
        onOpenTrackModal={() => setIsTrackModalOpen(true)}
      />

      <main className="flex-1 pt-20">
        <Suspense fallback={<RouteSkeleton />}>
          {(() => {
            // Halaman Data Publik & Transparansi Anggaran
            if (currentHash === '#data-publik' || currentHash === '#transparansi') {
              return <DataPublikPage />;
            }

            // Direktori Layanan Publik
            if (currentHash === '#layanan') {
              return (
                <LayananPage
                  onSelectService={(serviceId) => {
                    window.location.hash = `#layanan/${serviceId}`;
                  }}
                  onStartApplication={(service) => {
                    if (service.detailRoute) {
                      window.location.hash = service.detailRoute;
                    } else {
                      handleStartApplication({
                        id: service.id,
                        title: service.title,
                        description: service.description,
                        category: 'kependudukan',
                        iconName: 'Plavon',
                        actionLabel: service.primaryActionLabel,
                        opd: service.opd,
                        sla: service.metricValue1,
                        requirements: [],
                        features: [],
                      });
                    }
                  }}
                />
              );
            }

            // Layanan KTP-el Disdukcapil
            if (currentHash === '#layanan/ktp' || currentHash === '#layanan-ktp') {
              return (
                <KtpServicePage
                  onBack={() => {
                    window.location.hash = '#layanan';
                  }}
                  onApply={() => {
                    setIsTrackModalOpen(true);
                    showToast('Membuka Formulir Antrean Online KTP-el Disdukcapil Sidoarjo.');
                  }}
                />
              );
            }

            // Layanan NIB OSS DPMPTSP
            if (currentHash === '#layanan/nib' || currentHash === '#layanan-nib') {
              return (
                <NibServicePage
                  onBack={() => {
                    window.location.hash = '#layanan';
                  }}
                  onApply={() => {
                    setIsTrackModalOpen(true);
                    showToast('Membuka Integrasi OSS-RBA DPMPTSP Sidoarjo.');
                  }}
                />
              );
            }

            // Layanan SKU SIPRAJA
            if (currentHash === '#layanan/sku' || currentHash === '#layanan-sku') {
              return (
                <SkuServicePage
                  onBack={() => {
                    window.location.hash = '#layanan';
                  }}
                  onApply={() => {
                    setIsTrackModalOpen(true);
                    showToast('Membuka Pengajuan Surat Keterangan Usaha SIPRAJA Sidoarjo.');
                  }}
                />
              );
            }

            // Layanan Antrean Faskes RSUD & Puskesmas
            if (currentHash === '#layanan/faskes' || currentHash === '#layanan-faskes') {
              return (
                <FaskesServicePage
                  onBack={() => {
                    window.location.hash = '#layanan';
                  }}
                  onApply={() => {
                    setIsTrackModalOpen(true);
                    showToast('Membuka Sistem Reservasi Antrean Puskesmas & RSUD Sidoarjo.');
                  }}
                />
              );
            }

            // Layanan DTKS Bansos Dinsos
            if (currentHash === '#layanan/dtks' || currentHash === '#layanan-dtks') {
              return (
                <DtksServicePage
                  onBack={() => {
                    window.location.hash = '#layanan';
                  }}
                  onApply={() => {
                    setIsTrackModalOpen(true);
                    showToast('Membuka Pengecekan NIK & Usulan Bansos DTKS Dinsos Sidoarjo.');
                  }}
                />
              );
            }

            // Laporan Warga & Aspirasi Call 112 / SP4N
            if (currentHash === '#laporan' || currentHash === '#lapor') {
              return (
                <LaporanPage
                  currentUser={currentUser}
                  onOpenLogin={() => {
                    setAccountMode('login');
                    setIsAccountModalOpen(true);
                  }}
                  onOpenRegister={() => {
                    setAccountMode('register');
                    setIsAccountModalOpen(true);
                  }}
                  onNavigateHome={() => {
                    window.location.hash = '#beranda';
                  }}
                />
              );
            }

            // Tentang Kami & Regulasi SPBE
            if (currentHash === '#tentang') {
              return (
                <TentangPage
                  onNavigateHome={() => {
                    window.location.hash = '#beranda';
                  }}
                />
              );
            }

            // Default: Beranda (Home Portal)
            return (
              <>
                {/* 2. Hero Section */}
                <HeroSection
                  onExploreServices={() => {
                    window.location.hash = '#layanan';
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
                    if (service.id === 'plavon') {
                      window.location.hash = '#layanan/ktp';
                    } else if (service.id === 'sipraja') {
                      window.location.hash = '#layanan/sku';
                    } else if (service.id === 'lapor112') {
                      window.location.hash = '#laporan';
                    } else {
                      setSelectedService(service);
                      setIsServiceModalOpen(true);
                    }
                  }}
                />

                {/* 5. Transparency & Budget Section */}
                <TransparencySection
                  onOpenBudgetModal={() => {
                    window.location.hash = '#data-publik';
                  }}
                />

                {/* 6. Single Account Citizen Banner */}
                <SingleAccountBanner
                  currentUser={currentUser}
                  onOpenRegister={() => {
                    setAccountMode('register');
                    setIsAccountModalOpen(true);
                  }}
                  onOpenGuide={() => setIsGuideModalOpen(true)}
                  onOpenTrack={() => setIsTrackModalOpen(true)}
                  onNavigateReports={() => {
                    window.location.hash = '#laporan-warga';
                    handleNavigateSection('laporan');
                  }}
                />
              </>
            );
          })()}
        </Suspense>
      </main>

      {/* 7. Official Civic Footer */}
      <Footer onNavigateSection={handleNavigateSection} />

      {/* Interactive Modals (Loaded on-demand) */}
      <Suspense fallback={null}>
        {isTrackModalOpen && (
          <TrackDocModal
            isOpen={isTrackModalOpen}
            onClose={() => setIsTrackModalOpen(false)}
          />
        )}

        {isServiceModalOpen && (
          <ServiceDetailModal
            service={selectedService}
            isOpen={isServiceModalOpen}
            onClose={() => setIsServiceModalOpen(false)}
            onStartApplication={handleStartApplication}
          />
        )}

        {isAccountModalOpen && (
          <RegisterAccountModal
            isOpen={isAccountModalOpen}
            onClose={() => setIsAccountModalOpen(false)}
            initialMode={accountMode}
            onSuccess={handleLoginSuccess}
          />
        )}

        {isBudgetModalOpen && (
          <BudgetBreakdownModal
            isOpen={isBudgetModalOpen}
            onClose={() => setIsBudgetModalOpen(false)}
          />
        )}

        {isGuideModalOpen && (
          <ServiceGuideModal
            isOpen={isGuideModalOpen}
            onClose={() => setIsGuideModalOpen(false)}
            onOpenRegister={() => {
              setAccountMode('register');
              setIsAccountModalOpen(true);
            }}
          />
        )}
      </Suspense>
    </div>
  );
}
