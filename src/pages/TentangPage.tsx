import { Icon } from '../components/common/Icon';
import React, { useState } from 'react';

export interface TentangPageProps {
  onNavigateSection?: (sectionId: string) => void;
  onNavigateHome?: () => void;
}

export const TentangPage: React.FC<TentangPageProps> = ({ onNavigateSection, onNavigateHome }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const handleNavClick = (sectionId: string) => {
    if (sectionId === 'beranda' && onNavigateHome) {
      onNavigateHome();
    } else if (onNavigateSection) {
      onNavigateSection(sectionId);
    } else if (sectionId === 'beranda') {
      window.location.hash = '#beranda';
    }
  };

  const performanceStats = [
    {
      label: 'Cakupan Wilayah',
      icon: 'hub',
      value: '100%',
      title: 'Terintegrasi Total',
      desc: '32 OPD & 18 Kecamatan se-Kabupaten Sidoarjo dalam satu basis data terpadu.',
      iconBg: 'bg-[#88f4c6]/40 text-[#038D66]',
    },
    {
      label: 'Transparansi Publik',
      icon: 'visibility',
      value: '96,2%',
      title: 'Indeks KIP Jawa Timur',
      desc: 'Kategori Informatif Tertinggi – Peringkat 1 Tingkat Provinsi Jawa Timur.',
      iconBg: 'bg-[#ffe087]/50 text-[#735c00]',
    },
    {
      label: 'Penyelesaian Berkas',
      icon: 'task_alt',
      value: '1,82 Juta',
      title: 'Layanan Sukses',
      desc: 'Tingkat Kepuasan Publik 97,4% berdasarkan Indeks Kepuasan Masyarakat (IKM).',
      iconBg: 'bg-[#bbedd9]/50 text-[#083c2e]',
    },
    {
      label: 'Kredibilitas Audit',
      icon: 'military_tech',
      value: '11x WTP',
      title: 'Opini BPK Berturut',
      desc: 'Pengelolaan keuangan daerah yang taat asas, presisi, dan nihil temuan material.',
      iconBg: 'bg-[#88f4c6]/40 text-[#038D66]',
    },
  ];

  const civicPhotos = [
    {
      category: 'Sentra Pemerintahan',
      title: 'Kantor Pusat Pemkab Sidoarjo',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuA5XlXEzSWJc4CWT5w9NxVGWiuN7clvN3l2M9fgVFiR8W9w9Je8itCd9Wtwx2cs-3CXw-HdLkc8QAX9njB6w7576FOi-LLtJkwsVmHUxdLEYAeT2Aqq5qsafJGEUkZl-KkABv_ZW6NZVJ8peUVNemBoYdzkcBMr9kZUtwmClt-jDH76mjT-D-8yA9Mlkb7Og2zMoLTLG3M1wCDOnJqEyGYv1HB55vnd4Jl65jA8bghU',
      alt: 'Gedung Sekretariat Pemerintah Kabupaten Sidoarjo dengan arsitektur modern berpadu ornamen khas Jawa Timur',
    },
    {
      category: 'Akses Langsung Warga',
      title: 'Sentra Mall Pelayanan Publik (MPP)',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBQcfqqPwIe5IlHQ08emATnV9zjI03hAajbm5HQN1CWEkixwe9-_9pZoWfqu0zZE7i1v1l0XjpqHKrqceaVUvF0MIl4DCoqcSK0JZx1otKkeNSH0I7cyP4suzk4wyrlFS_FuCDr6OhCdnllzcfKYdmIKy2xlHpn8TTvBLzeDLZ1RGdOx2Np4wWV--KSPHjMzWy8XQ6EGaxEYB_PgPA1K9RQq3tH8tuC-gG0okN4sH2g',
      alt: 'Gedung Mall Pelayanan Publik MPP Kabupaten Sidoarjo dengan aula pelayanan digital modern',
    },
    {
      category: 'Infrastruktur SPBE',
      title: 'Pusat Komando & Delta-CSIRT',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCma7YmGygWQHpfA2rBoXuRMpJEj-ItorI6EpGoRDy6j2g-gbO_b0kOMlv7P620kpA5IzEkxQkFPUVIReFBOORlKMLKIPJVf7wcQjclKcjJi9GM1jTtA3kYMZqHqHRY6esMH1llTTZQj61lnH8Sc_rPRdV8hY2Pnu6s_EybRDowC3ypeJqfNttmAgmIUzR42s31pk2KUGpe0UOrhEj7rmOzxTw4Ti2cbk8uO2hhwFXz',
      alt: 'Pusat Komando dan Pemantauan Delta Data Center Diskominfo Sidoarjo',
    },
  ];

  const empatPilar = [
    {
      number: '1',
      pilar: 'Pilar Transparansi',
      title: 'Akuntabilitas & Keterbukaan Nyata',
      icon: 'query_stats',
      iconBg: 'bg-[#cfa700] text-[#4f3e00]',
      desc: 'Keterbukaan alokasi anggaran APBD secara rinci per-OPD hingga penyerapan fisik di lapangan yang disajikan transparan tanpa manipulasi untuk pengawasan mandiri oleh seluruh masyarakat Sidoarjo.',
    },
    {
      number: '2',
      pilar: 'Pilar Efisiensi',
      title: 'Respon Cepat Terukur (SLA Tinggi)',
      icon: 'timer',
      iconBg: 'bg-[#038D66] text-white',
      desc: 'Standar pelayanan ketat dengan jaminan tanggapan pengaduan maksimal 2x24 jam kerja, disokong kesiapsiagaan Call Center 112 bebas pulsa yang beroperasi tanpa henti sepanjang 365 hari.',
    },
    {
      number: '3',
      pilar: 'Pilar Keterpaduan',
      title: 'Aksesibilitas Tanpa Batas (Single Window)',
      icon: 'all_inclusive',
      iconBg: 'bg-[#038D66] text-white',
      desc: 'Layanan publik inklusif yang dapat diakses 24 jam sehari, 7 hari seminggu melalui portal daring terpadu maupun gerai Sentra Mall Pelayanan Publik (MPP) secara setara bagi semua lapisan masyarakat.',
    },
    {
      number: '4',
      pilar: 'Pilar Responsif & Keamanan',
      title: 'Keamanan Siber & Privasi Terproteksi',
      icon: 'lock_person',
      iconBg: 'bg-[#00251b] text-white',
      desc: 'Menerapkan standar sertifikasi ISO/IEC 27001 serta kepatuhan menyeluruh terhadap UU Perlindungan Data Pribadi (UU PDP) demi menjaga kerahasiaan identitas dan integritas seluruh data kependudukan.',
    },
  ];

  const ekosistemOpd = [
    {
      category: 'Kepemimpinan Daerah',
      role: 'Pengarah Strategis SPBE',
      name: 'Bupati & Pimpinan Daerah Kab. Sidoarjo',
      icon: 'account_balance',
      iconBg: 'bg-[#083c2e] text-[#ffe087]',
      desc: 'Pemegang mandat eksekutif perumus arah kebijakan strategis transformasi digital daerah, penjamin reformasi birokrasi, serta pengawal integritas pelayanan publik di seluruh Kabupaten Sidoarjo.',
    },
    {
      category: 'Infrastruktur & SPBE',
      role: 'Pengampu Inti Sistem',
      name: 'Diskominfo Sidoarjo',
      icon: 'lan',
      iconBg: 'bg-[#083c2e] text-white',
      desc: 'Pengembang arsitektur infrastruktur cloud daerah, integrasi antar-aplikasi SPBE, pengelola pusat pengaduan SP4N-LAPOR, serta pusat respon darurat terpadu Call Center 112 Sidoarjo.',
    },
    {
      category: 'Identitas & Adminduk',
      role: 'Otoritas Data Warga',
      name: 'Disdukcapil Sidoarjo',
      icon: 'badge',
      iconBg: 'bg-[#88f4c6]/40 text-[#038D66]',
      desc: 'Integrasi Identitas Kependudukan Digital (IKD) dan ekosistem administrasi kependudukan cepat melalui keterhubungan langsung dengan modul Plavon Dukcapil Sidoarjo.',
    },
    {
      category: 'Perencanaan & APBD',
      role: 'Akuntabilitas Finansial',
      name: 'BPKAD & Bappeda Sidoarjo',
      icon: 'account_balance_wallet',
      iconBg: 'bg-[#ffe087]/50 text-[#735c00]',
      desc: 'Penyedia modul Satu Data Anggaran Publik, visualisasi realisasi belanja APBD berkala, dan pemantauan capaian target rencana kerja pemerintah daerah (RKPD).',
    },
    {
      category: 'Perizinan & Investasi',
      role: 'Sentra Pelayanan Fisik & Izin',
      name: 'DPMPTSP Sidoarjo',
      icon: 'storefront',
      iconBg: 'bg-[#bbedd9]/50 text-[#083c2e]',
      desc: 'Pengelola operasional Mall Pelayanan Publik (MPP), penerbitan perizinan berusaha OSS RBA terintegrasi, dan fasilitasi penanaman modal dengan kepastian waktu proses.',
    },
    {
      category: 'Pengawasan & Integritas',
      role: 'Pengawas Integritas Publik',
      name: 'Inspektorat Daerah Sidoarjo',
      icon: 'gavel',
      iconBg: 'bg-[#88f4c6]/40 text-[#038D66]',
      desc: 'Pengawasan independen kepatuhan ASN, penanganan Whistleblowing System (WBS), audit reguler, dan penjagaan zona integritas bebas korupsi di lingkungan Pemkab Sidoarjo.',
    },
  ];

  const regulasiList = [
    {
      tag: 'Regulasi Daerah Utama SPBE',
      title: 'Perbup Sidoarjo No. 42 Tahun 2023',
      icon: 'policy',
      desc: 'Tentang Penyelenggaraan Sistem Pemerintahan Berbasis Elektronik (SPBE) dalam kerangka keterpaduan tata kelola teknologi informasi dan komunikasi Kabupaten Sidoarjo.',
    },
    {
      tag: 'Keterbukaan Informasi Publik',
      title: 'Undang-Undang No. 14 Tahun 2008',
      icon: 'menu_book',
      desc: 'Tentang Keterbukaan Informasi Publik (UU KIP) yang mewajibkan penyediaan data berkala, serta merta, dan dapat diakses terbuka oleh masyarakat sipil.',
    },
    {
      tag: 'Perda Keterbukaan Daerah',
      title: 'Perda Kab. Sidoarjo No. 8 Tahun 2017',
      icon: 'gavel',
      desc: 'Tentang Keterbukaan Informasi Publik dan Partisipasi Masyarakat dalam Pengambilan Kebijakan Publik di Kabupaten Sidoarjo.',
    },
    {
      tag: 'Standardisasi Data Nasional',
      title: 'Peraturan Presiden No. 39 Tahun 2019',
      icon: 'dataset',
      desc: 'Tentang Satu Data Indonesia (SDI), mewajibkan konsistensi metadata, interoperabilitas data, dan kodefikasi referensi statistik terpadu antar-instansi.',
    },
    {
      tag: 'Standar Pelayanan Publik',
      title: 'Undang-Undang No. 25 Tahun 2009',
      icon: 'handshake',
      desc: 'Tentang Pelayanan Publik yang menjamin kepastian waktu penyelesaian, transparansi biaya retribusi nihil, dan perlindungan hak-hak penerima layanan.',
    },
    {
      tag: 'Perlindungan Kerahasiaan Warga',
      title: 'Undang-Undang No. 27 Tahun 2022',
      icon: 'security',
      desc: 'Tentang Perlindungan Data Pribadi (UU PDP), mewajibkan kepatuhan enkripsi dan pembatasan akses data kependudukan sensitif masyarakat.',
    },
  ];

  const securityBadges = [
    {
      icon: 'workspace_premium',
      title: 'ISO 27001:2022',
      subtitle: 'Sistem Manajemen Keamanan Info',
      iconColor: 'text-[#ffe087]',
    },
    {
      icon: 'security',
      title: 'Delta-CSIRT',
      subtitle: 'Terkoneksi BSSN Republik Indonesia',
      iconColor: 'text-[#8af7c9]',
    },
    {
      icon: 'dns',
      title: 'Data Center Lokal',
      subtitle: 'Backup Cloud Pusat Data Nasional',
      iconColor: 'text-[#8af7c9]',
    },
    {
      icon: 'lock',
      title: 'TLS 1.3 Strict',
      subtitle: 'Enkripsi 256-bit End-to-End',
      iconColor: 'text-[#ffe087]',
    },
  ];

  const faqItems = [
    {
      id: 1,
      q: 'Bagaimana data pribadi warga dilindungi dalam platform SITAPAK?',
      a: 'Data identitas diverifikasi langsung dengan database kependudukan nasional menggunakan enkripsi TLS 1.3 tingkat tinggi. Informasi rahasia seperti NIK dan dokumen keluarga disimpan di server lokal Pemkab Sidoarjo dengan pengawasan berkala dari BSSN sesuai amanat UU Perlindungan Data Pribadi No. 27 Tahun 2022.',
    },
    {
      id: 2,
      q: 'Apakah data realisasi anggaran APBD di SITAPAK benar-benar data riil?',
      a: 'Ya. Modul transparansi anggaran disinkronkan langsung dari Sistem Informasi Pemerintahan Daerah (SIPD) Kemendagri dan Sistem Perbendaharaan BPKAD Kabupaten Sidoarjo. Informasi dimutakhirkan secara otomatis setiap penutupan buku transaksi harian.',
    },
    {
      id: 3,
      q: 'Berapa lama estimasi penanganan aduan masyarakat di SITAPAK?',
      a: 'Sesuai Service Level Agreement (SLA) SP4N-LAPOR dan Diskominfo Sidoarjo, telaah awal dan verifikasi disposisi dilakukan dalam tempo kurang dari 24 jam. Tindak lanjut fisik atau investigasi lapangan oleh OPD teknis terkait memiliki batas maksimal 2x24 jam kerja dengan pelacakan nomor tiket terbuka untuk publik.',
    },
    {
      id: 4,
      q: 'Apakah layanan di Sentra Mall Pelayanan Publik (MPP) dan SITAPAK dipungut biaya?',
      a: 'Seluruh pengurusan perizinan dasar, dokumen kependudukan, pelaporan warga, dan konsultasi informasi publik di SITAPAK serta gerai MPP Sidoarjo adalah 100% Bebas Biaya (Gratis), kecuali retribusi resmi tertentu yang telah diatur oleh Peraturan Daerah dan dibayarkan melalui kanal kas daerah non-tunai.',
    },
  ];

  return (
    <div className="w-full bg-[#F8FAF9] min-h-screen text-[#15211C]">
      {/* Top Ambient Canvas & Hero Banner (Aligned with Beranda Style) */}
      <section className="relative pt-6 pb-14 overflow-hidden bg-gradient-to-b from-[#F2FAF6] to-[#F8FAF9] border-b border-slate-200/80">
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#083C2E 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Jalur Navigasi" className="flex items-center gap-2 text-slate-500 text-xs sm:text-sm font-medium">
            <button
              onClick={() => handleNavClick('beranda')}
              className="hover:text-[#038D66] flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Icon className="text-[16px]">home</Icon>
              <span>Beranda</span>
            </button>
            <Icon className="text-[14px] text-slate-400">chevron_right</Icon>
            <span className="text-[#038D66] font-semibold">Tentang Kami</span>
          </nav>

          {/* Main Civic Header Block */}
          <div className="mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 flex flex-col gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ffe087]/50 text-[#4f3e00] w-fit shadow-xs border border-[#cfa700]/30">
                <Icon className="material-symbols-outlined text-[16px] text-[#735c00]">verified</Icon>
                <span className="text-xs font-bold uppercase tracking-wider">
                  Profil &amp; Transformasi Tata Kelola Pemerintahan
                </span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl lg:text-[44px] lg:leading-[52px] text-[#15211C] font-extrabold tracking-tight">
                Mewujudkan Pemerintahan Digital yang Terbuka, Melayani, dan Berintegritas
              </h1>

              <p className="text-base sm:text-lg text-[#5A6862] max-w-3xl leading-relaxed">
                SITAPAK adalah pintu tunggal ekosistem pelayanan publik dan transparansi anggaran Kabupaten Sidoarjo,
                menghubungkan aspirasi 2,08 juta warga dengan 32 dinas teknis secara terukur dan akuntabel.
              </p>
            </div>

            {/* Official Seal / Visual Emblem Card */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-xs bg-white p-6 sm:p-7 rounded-2xl shadow-md text-center flex flex-col items-center border border-slate-200/90">
                <div className="w-16 h-16 rounded-2xl bg-[#083c2e] text-[#ffe087] flex items-center justify-center shadow-inner mb-3">
                  <Icon className="material-symbols-outlined text-[36px]">account_balance</Icon>
                </div>
                <span className="font-display text-lg font-bold text-[#15211C]">Republik Indonesia</span>
                <span className="text-sm text-[#5A6862] font-semibold">Pemerintah Kabupaten Sidoarjo</span>
                <div className="w-12 h-1 bg-[#cfa700] rounded-full my-3"></div>
                <span className="text-xs text-[#038D66] font-bold tracking-wider uppercase">SITAPAK SOVEREIGN CIVIC</span>
                <span className="text-[12px] text-[#5A6862]/80 mt-1">Platform Terpadu SPBE &amp; Akuntabilitas</span>
              </div>
            </div>
          </div>

          {/* 4 Core Performance Stats Bento Grid */}
          <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {performanceStats.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between border border-slate-200/90"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs uppercase tracking-wider text-[#5A6862] font-bold">{item.label}</span>
                  <div className={`w-9 h-9 rounded-xl ${item.iconBg} flex items-center justify-center`}>
                    <Icon className="material-symbols-outlined text-[20px]">{item.icon}</Icon>
                  </div>
                </div>
                <div>
                  <div className="font-display text-3xl font-extrabold text-[#15211C] tracking-tight">{item.value}</div>
                  <div className="font-display text-base font-bold text-[#038D66] mt-0.5">{item.title}</div>
                  <p className="text-xs sm:text-sm text-[#5A6862] mt-1 leading-snug">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Civic Landscape Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {civicPhotos.map((photo, idx) => (
            <div key={idx} className="relative h-64 rounded-2xl overflow-hidden shadow-md group border border-white/60">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                alt={photo.alt}
                src={photo.image}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#00251b]/95 via-[#00251b]/40 to-transparent flex flex-col justify-end p-5 text-white">
                <span className="text-xs text-[#ffe087] font-bold uppercase tracking-wider">{photo.category}</span>
                <span className="font-display text-base sm:text-lg font-bold">{photo.title}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section: Visi & Misi Transformasi Digital 2026+ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full">
        <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-12 shadow-sm border border-slate-200/90">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
            <div className="flex flex-col gap-1 max-w-2xl">
              <span className="text-xs sm:text-sm text-[#038D66] font-bold uppercase tracking-wider">
                Arah Strategis &amp; Komitmen
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#15211C]">
                Visi &amp; Misi Transformasi Digital Sidoarjo 2026+
              </h2>
              <p className="text-sm sm:text-base text-[#5A6862]">
                Landasan fundamental dalam merumuskan seluruh modul layanan digital terpadu demi kepuasan warga Sidoarjo.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#e3f1e9] text-[#15211C] rounded-xl text-xs sm:text-sm font-semibold self-start md:self-auto border border-[#c0c8c3]/40">
              <Icon className="material-symbols-outlined text-[#038D66] text-[18px]">verified_user</Icon>
              <span>Target RPJMD Terakselerasi</span>
            </div>
          </div>

          {/* Main Vision Highlight Box */}
          <div className="bg-[#083c2e] text-white p-6 sm:p-8 lg:p-10 rounded-2xl shadow-md mb-8 sm:mb-10 relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 opacity-10 text-white select-none pointer-events-none">
              <Icon className="material-symbols-outlined text-[180px] sm:text-[220px]">flag_circle</Icon>
            </div>
            <div className="relative z-10 flex flex-col gap-3">
              <span className="text-xs sm:text-sm text-[#ffe087] font-bold uppercase tracking-widest">
                Visi Utama Daerah
              </span>
              <p className="font-display text-xl sm:text-2xl lg:text-[26px] lg:leading-[38px] text-white font-extrabold max-w-4xl">
                “Terwujudnya Kabupaten Sidoarjo yang Sejahtera, Maju, Berdaya Saing, dan Berkelanjutan melalui Tata
                Kelola Pemerintahan Digital Kelas Dunia.”
              </p>
            </div>
          </div>

          {/* 4 Core Pillars Grid */}
          <div className="mb-4">
            <div className="mb-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#038D66]"></span>
              <h3 className="font-display text-lg font-bold text-[#15211C] uppercase tracking-wide">
                4 Pilar Utama Transformasi SITAPAK
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {empatPilar.map((pilar, idx) => (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-2xl bg-[#e9f7ee] hover:bg-[#e3f1e9] transition-colors flex gap-4 border border-slate-200/90"
                >
                  <div className={`w-12 h-12 rounded-xl ${pilar.iconBg} flex-shrink-0 flex items-center justify-center shadow-sm`}>
                    <Icon className="material-symbols-outlined text-[26px]">{pilar.icon}</Icon>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#038D66] uppercase tracking-wider">{pilar.pilar}</span>
                    </div>
                    <h4 className="font-display text-base sm:text-lg text-[#15211C] font-bold">{pilar.title}</h4>
                    <p className="text-xs sm:text-sm text-[#5A6862] leading-relaxed">{pilar.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section: Sinergi Ekosistem Pengelola (OPD Pengampu) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        <div className="mb-8 flex flex-col gap-1">
          <span className="text-xs sm:text-sm text-[#038D66] font-bold uppercase tracking-wider">
            Tata Kelola Kolaboratif
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#15211C]">
            Sinergi Ekosistem Pengelola SITAPAK
          </h2>
          <p className="text-sm sm:text-base text-[#5A6862] max-w-3xl">
            Penyelenggaraan SITAPAK diawasi langsung oleh Bupati Sidoarjo dan dioperasikan secara sinergis oleh seluruh
            instansi teknis berwenang Pemerintah Kabupaten Sidoarjo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ekosistemOpd.map((opd, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between border border-slate-200/90"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl ${opd.iconBg} flex items-center justify-center flex-shrink-0 shadow-xs`}>
                    <Icon className="material-symbols-outlined text-[26px]">{opd.icon}</Icon>
                  </div>
                  <div>
                    <span className="text-xs text-[#038D66] font-bold uppercase tracking-wide">{opd.category}</span>
                    <h3 className="font-display text-base sm:text-lg font-bold text-[#15211C] leading-snug">
                      {opd.name}
                    </h3>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-[#5A6862] leading-relaxed">{opd.desc}</p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-200/90 flex items-center text-[#038D66] text-xs sm:text-sm font-bold">
                <span>{opd.role}</span>
                <Icon className="material-symbols-outlined text-[16px] ml-1">chevron_right</Icon>
              </div>
            </div>
          ))}

          {/* Live SPBE Performance Telemetry Card */}
          <div className="bg-[#083c2e] text-white p-6 rounded-2xl shadow-sm flex flex-col justify-between border border-[#00251b]">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-wider text-[#ffe087] font-bold">Sinkronisasi Realtime</span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#88f4c6] animate-pulse"></span>
              </div>
              <h3 className="font-display text-lg font-bold text-white">Status Konektivitas 32 OPD</h3>
              <p className="text-xs sm:text-sm text-[#77a794] mt-2 leading-relaxed">
                Seluruh basis data dinas teknis terhubung langsung melalui Government Service Bus (GSB) dengan latensi
                transfer data di bawah 45 milidetik dan audit log otomatis.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#77a794]/20 flex items-center justify-between text-xs sm:text-sm">
              <span className="text-[#77a794]">Uptime Pelayanan:</span>
              <span className="text-[#8af7c9] font-bold">99.98% Stabil</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Payung Regulasi & Dasar Hukum */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 w-full">
        <div className="bg-[#e9f7ee] rounded-3xl p-6 sm:p-8 lg:p-12 border border-slate-200/90">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs sm:text-sm text-[#038D66] font-bold uppercase tracking-wider">Legitimasi Hukum</span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#15211C]">
                Dasar Hukum &amp; Payung Regulasi
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#5A6862] max-w-md">
              Setiap proses administrasi, keterbukaan data, dan otentikasi warga memiliki sandaran yuridis formal yang sah
              dan berkekuatan hukum tetap.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {regulasiList.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-xl flex items-start gap-3 shadow-xs border border-slate-200/90 hover:border-[#006c4d]/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-[#e3f1e9] flex items-center justify-center text-[#15211C] flex-shrink-0 mt-0.5">
                  <Icon className="material-symbols-outlined text-[22px]">{item.icon}</Icon>
                </div>
                <div>
                  <span className="text-xs text-[#038D66] font-bold">{item.tag}</span>
                  <h4 className="font-display text-sm sm:text-base font-bold text-[#15211C] mt-0.5">{item.title}</h4>
                  <p className="text-xs text-[#5A6862] mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Keamanan Data & Akreditasi Resmi */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        <div className="bg-[#083c2e] text-white rounded-3xl p-6 sm:p-8 lg:p-12 shadow-md border border-[#00251b]">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-xl flex flex-col gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#8af7c9] text-xs font-bold uppercase w-fit">
                <Icon className="material-symbols-outlined text-[16px]">shield</Icon>
                <span>Standar Ketahanan Siber Maksimal</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                Keamanan Data &amp; Akreditasi Siber Resmi
              </h2>
              <p className="text-xs sm:text-sm text-[#77a794] leading-relaxed">
                Data kependudukan, perizinan, dan riwayat laporan warga dilindungi dengan protokol keamanan berlapis
                bertaraf internasional, dipantau kontinu oleh tim tanggap insiden siber Delta-CSIRT.
              </p>
            </div>

            {/* Badges Cluster */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full lg:w-auto">
              {securityBadges.map((badge, idx) => (
                <div
                  key={idx}
                  className="bg-white/10 p-4 rounded-2xl flex flex-col items-center text-center border border-white/10"
                >
                  <Icon className={`material-symbols-outlined ${badge.iconColor} text-[32px] sm:text-[36px] mb-2`}>
                    {badge.icon}
                  </Icon>
                  <span className="text-xs sm:text-sm font-bold text-white">{badge.title}</span>
                  <span className="text-[11px] text-[#77a794] mt-1">{badge.subtitle}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section: Hubungi & Kunjungi Sekretariat Layanan SITAPAK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 w-full">
        <div className="mb-8 flex flex-col gap-1">
          <span className="text-xs sm:text-sm text-[#038D66] font-bold uppercase tracking-wider">
            Pusat Bantuan &amp; Konsultasi
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#15211C]">
            Hubungi &amp; Kunjungi Sekretariat SITAPAK
          </h2>
          <p className="text-sm sm:text-base text-[#5A6862] max-w-2xl">
            Kami siap mendampingi kebutuhan layanan publik dan permohonan informasi publik secara daring maupun tatap muka.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Office Address & Contact List */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            {/* Kantor Diskominfo */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm flex items-start gap-4 border border-slate-200/90">
              <div className="w-12 h-12 rounded-xl bg-[#083c2e] text-white flex items-center justify-center flex-shrink-0">
                <Icon className="material-symbols-outlined text-[24px]">apartment</Icon>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-[#038D66] font-bold uppercase">Kantor Pengelola Sistem</span>
                <h3 className="font-display text-base sm:text-lg font-bold text-[#15211C]">Diskominfo Kab. Sidoarjo</h3>
                <p className="text-xs sm:text-sm text-[#5A6862] mt-1">
                  Jl. Diponegoro No. 139, Kelurahan Lemahputro, Kec. Sidoarjo, Kabupaten Sidoarjo, Jawa Timur 61218
                </p>
                <span className="text-xs font-semibold text-[#15211C] mt-2">Senin – Jumat (07.30 - 15.30 WIB)</span>
              </div>
            </div>

            {/* Pelayanan Tatap Muka MPP */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm flex items-start gap-4 border border-slate-200/90">
              <div className="w-12 h-12 rounded-xl bg-[#88f4c6]/40 text-[#038D66] flex items-center justify-center flex-shrink-0">
                <Icon className="material-symbols-outlined text-[24px]">counter_1</Icon>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-[#038D66] font-bold uppercase">Loket Tatap Muka Terpadu</span>
                <h3 className="font-display text-base sm:text-lg font-bold text-[#15211C]">
                  Sentra Mall Pelayanan Publik (MPP)
                </h3>
                <p className="text-xs sm:text-sm text-[#5A6862] mt-1">
                  Jl. Lingkar Timur, Desa Bluru Kidul, Kec. Sidoarjo, Kabupaten Sidoarjo, Jawa Timur 61233
                </p>
                <span className="text-xs font-semibold text-[#15211C] mt-2">Senin – Jumat (08.00 - 15.00 WIB)</span>
              </div>
            </div>

            {/* Kanal Digital & Call 112 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-2xl shadow-sm flex items-center gap-3 border border-slate-200/90">
                <div className="w-11 h-11 rounded-xl bg-[#ffdad6] text-[#93000a] flex items-center justify-center flex-shrink-0">
                  <Icon className="material-symbols-outlined text-[24px]">phone_in_talk</Icon>
                </div>
                <div>
                  <span className="block text-[11px] uppercase font-bold text-[#5A6862]">Hotline 24 Jam Bebas Pulsa</span>
                  <span className="font-display text-xl sm:text-2xl font-extrabold text-[#ba1a1a] tracking-tight">
                    Call 112
                  </span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl shadow-sm flex items-center gap-3 border border-slate-200/90">
                <div className="w-11 h-11 rounded-xl bg-[#88f4c6]/40 text-[#038D66] flex items-center justify-center flex-shrink-0">
                  <Icon className="material-symbols-outlined text-[24px]">chat</Icon>
                </div>
                <div>
                  <span className="block text-[11px] uppercase font-bold text-[#5A6862]">WhatsApp Respon Cepat</span>
                  <span className="font-display text-base sm:text-lg font-extrabold text-[#15211C]">
                    0811-3000-112
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-sm flex items-center gap-3 border border-slate-200/90">
              <div className="w-10 h-10 rounded-xl bg-[#e3f1e9] flex items-center justify-center text-[#15211C] flex-shrink-0">
                <Icon className="material-symbols-outlined text-[22px]">alternate_email</Icon>
              </div>
              <div className="truncate">
                <span className="block text-[11px] uppercase font-bold text-[#5A6862]">Surat Elektronik Resmi</span>
                <span className="text-xs sm:text-sm text-[#038D66] font-bold">
                  layanan@sidoarjokab.go.id / kominfo@sidoarjokab.go.id
                </span>
              </div>
            </div>
          </div>

          {/* Static Map Section & Directions */}
          <div className="lg:col-span-6 flex flex-col h-full">
            <div className="bg-white p-5 rounded-2xl shadow-sm flex-1 flex flex-col justify-between border border-slate-200/90">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Icon className="material-symbols-outlined text-[#038D66] text-[20px]">pin_drop</Icon>
                  <span className="font-display text-base font-bold text-[#15211C]">Peta Lokasi Kantor Layanan</span>
                </div>
                <a
                  className="text-xs sm:text-sm text-[#038D66] hover:underline font-bold flex items-center gap-1"
                  href="https://maps.google.com/?q=Diskominfo+Kabupaten+Sidoarjo"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span>Buka Google Maps</span>
                  <Icon className="material-symbols-outlined text-[16px]">open_in_new</Icon>
                </a>
              </div>

              {/* Location Map Visual */}
              <div
                className="w-full h-72 sm:h-80 rounded-xl overflow-hidden bg-cover bg-center shadow-inner relative flex items-end p-4 border border-slate-200/90"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuB26TSjeRHd_fe7AcFvUyIL6C__WC0PZdsQXEmNCCIPxUC3XZRvY-U7jRemdmr06X6JYlp3rgU8u_l29g-kOYLmaHoxANfRO9KLtlaGzXg6sa6tUOJAe_6naa4kXK4DpKxpGtV5T_oBmz3Z1uVioMhmfvbREnqNj7FsouqrZkWXKt3KwKuXEZ5Mmrj7aMMlshqQ3GUfqsdmOTmn015Z85DF8rZab1P4ccL_4WPbM7Ou')`,
                }}
              >
                <div className="bg-white/95 backdrop-blur-sm p-3.5 rounded-xl shadow-md max-w-sm border border-slate-200/90">
                  <div className="flex items-center gap-1.5 text-[#15211C] font-bold text-xs sm:text-sm">
                    <Icon className="material-symbols-outlined text-[#038D66] text-[18px]">domain</Icon>
                    <span>Sekretariat SITAPAK &amp; MPP</span>
                  </div>
                  <p className="text-[12px] text-[#5A6862] mt-0.5 leading-snug">
                    Bersebelahan dengan Alun-alun Sidoarjo &amp; Sentra Industri UMKM Sidoarjo.
                  </p>
                </div>
              </div>

              <div className="mt-4 p-3 bg-[#e9f7ee] rounded-xl flex items-center justify-between border border-slate-200/90">
                <div className="flex items-center gap-2 text-[#5A6862] text-xs sm:text-sm">
                  <Icon className="material-symbols-outlined text-[18px] text-[#038D66]">accessible</Icon>
                  <span>Akses ramah disabilitas, parkir gratis luas, ruang laktasi, &amp; internet publik cepat.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Quick FAQ / Accordion */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 sm:pb-20 w-full">
        <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-12 shadow-sm border border-slate-200/90">
          <div className="mb-6 sm:mb-8">
            <span className="text-xs sm:text-sm text-[#038D66] font-bold uppercase tracking-wider">
              Informasi Tambahan
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#15211C]">
              Pertanyaan Umum Terkait Tata Kelola
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {faqItems.map((item) => {
              const isOpen = openFaq === item.id;
              return (
                <div
                  key={item.id}
                  className="rounded-xl bg-[#e9f7ee] p-4 sm:p-5 cursor-pointer transition-colors hover:bg-[#e3f1e9] border border-slate-200/90"
                  onClick={() => toggleFaq(item.id)}
                >
                  <div className="flex items-center justify-between gap-3">
                    <h4 className="font-display text-sm sm:text-base text-[#15211C] font-bold flex items-center gap-2.5">
                      <Icon className="material-symbols-outlined text-[#038D66] text-[20px] flex-shrink-0">
                        help_outline
                      </Icon>
                      <span>{item.q}</span>
                    </h4>
                    <Icon className={`material-symbols-outlined text-[#15211C] text-[20px] transition-transform duration-300 flex-shrink-0 ${
                        isOpen ? 'rotate-180' : 'rotate-0'
                      }`}
                    >
                      expand_more
                    </Icon>
                  </div>

                  {isOpen && (
                    <div className="mt-3 pt-3 border-t border-slate-200/90 text-[#5A6862] text-xs sm:text-sm leading-relaxed">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TentangPage;
