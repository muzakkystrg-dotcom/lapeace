import React from 'react';

export interface KtpServicePageProps {
  onBack?: () => void;
  onApply?: () => void;
}

export const KtpServicePage: React.FC<KtpServicePageProps> = ({
  onBack = () => {
    window.location.hash = '#layanan';
  },
  onApply,
}) => {
  const handleApplyClick = (e: React.MouseEvent) => {
    if (onApply) {
      e.preventDefault();
      onApply();
    }
  };

  return (
    <div className="w-full bg-surface text-on-surface">
      {/* Sub-Navigation / Breadcrumb Bar */}
      <section className="w-full bg-surface-container-low py-4 border-b border-surface-container">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-label-md text-label-md text-on-surface-variant flex-wrap">
            <button
              onClick={onBack}
              className="hover:text-secondary transition-colors flex items-center gap-1 font-semibold text-secondary"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              <span>Kembali ke Direktori Layanan</span>
            </button>
            <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
            <a href="#beranda" className="hover:text-primary transition-colors">Beranda</a>
            <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
            <button onClick={onBack} className="hover:text-primary transition-colors">
              Layanan Publik
            </button>
            <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
            <span className="text-primary font-semibold">Perekaman &amp; Cetak KTP-el</span>
          </nav>
          <div className="hidden md:flex items-center gap-2 font-label-md text-label-md text-on-surface-variant">
            <span className="material-symbols-outlined text-[16px] text-secondary">verified</span>
            <span>Layanan Resmi Terakreditasi ISO 9001:2015</span>
          </div>
        </div>
      </section>

      {/* Editorial Headline Section */}
      <section className="w-full bg-surface py-8 lg:py-10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-secondary-container/40 text-on-secondary-container font-label-md text-xs font-bold uppercase tracking-wider">
              ADMINISTRASI KEPENDUDUKAN
            </span>
            <span className="px-2.5 py-1 rounded bg-surface-container-highest text-primary font-label-md text-xs font-semibold">
              DISDUKCAPIL KABUPATEN SIDOARJO
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary text-white font-label-md text-xs font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
              100% Online &amp; ADM
            </span>
          </div>
          <h1 className="font-headline-lg text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary max-w-4xl tracking-tight leading-tight">
            Perekaman dan Cetak KTP-el Sidoarjo
          </h1>
          <p className="font-body-lg text-base sm:text-lg text-on-surface-variant max-w-3xl leading-relaxed">
            Layanan resmi penggantian KTP rusak atau hilang, pembaruan elemen data kependudukan, serta pencetakan pemula usia 17 tahun oleh Dinas Kependudukan dan Pencatatan Sipil Kabupaten Sidoarjo secara mandiri dan bebas pungutan liar.
          </p>
        </div>
      </section>

      {/* Metric Facts Panel (Flat, quiet, high contrast) */}
      <section className="w-full bg-surface">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-surface-container border border-surface-container-high/60 shadow-sm">
            <div className="flex flex-col gap-1 p-3">
              <span className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Tarif Retribusi</span>
              <span className="font-stat-numeral text-2xl lg:text-3xl text-secondary font-extrabold leading-none">Rp 0</span>
              <span className="font-body-sm text-xs text-on-surface-variant font-medium">Gratis Tanpa Pungutan</span>
            </div>
            <div className="flex flex-col gap-1 p-3">
              <span className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Standar SLA Waktu</span>
              <span className="font-stat-numeral text-2xl lg:text-3xl text-primary font-extrabold leading-none">1–3 Hari</span>
              <span className="font-body-sm text-xs text-on-surface-variant font-medium">Hari Kerja Aktif</span>
            </div>
            <div className="flex flex-col gap-1 p-3">
              <span className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Kanal Pengurusan</span>
              <span className="font-headline-md text-xl lg:text-2xl text-primary font-bold leading-tight">100% Daring</span>
              <span className="font-body-sm text-xs text-on-surface-variant font-medium">Plavon Dukcapil Sidoarjo</span>
            </div>
            <div className="flex flex-col gap-1 p-3">
              <span className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Instansi Pembina</span>
              <span className="font-headline-md text-xl lg:text-2xl text-primary font-bold leading-tight">Disdukcapil</span>
              <span className="font-body-sm text-xs text-on-surface-variant font-medium">Pemkab Sidoarjo</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Structured Operational Content */}
      <section className="w-full bg-surface pb-12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Core Requirements & Operational Workflow (8 Cols) */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              {/* Persyaratan Dokumen */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <h2 className="font-headline-md text-xl lg:text-2xl font-bold text-primary">Kelengkapan Dokumen Pemohon</h2>
                  <p className="font-body-md text-sm text-on-surface-variant mt-1">
                    Pastikan seluruh berkas difoto atau dipindai secara jelas dalam format PDF atau JPG (maksimal 2MB per berkas).
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Card 1: Pemula */}
                  <div className="p-5 rounded-xl bg-surface-container-lowest border border-surface-container-high/60 shadow-sm flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-primary">
                      <span className="material-symbols-outlined text-[22px] text-secondary">badge</span>
                      <span className="font-title-md text-base font-bold">Pencetakan Pemula (17+)</span>
                    </div>
                    <ul className="flex flex-col gap-2 font-body-sm text-xs sm:text-sm text-on-surface-variant">
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px] text-secondary shrink-0">check_circle</span>
                        <span>KK Barcode TTE aktif</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px] text-secondary shrink-0">check_circle</span>
                        <span>Bukti rekam biometrik</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px] text-secondary shrink-0">check_circle</span>
                        <span>Ijazah / Akta Kelahiran</span>
                      </li>
                    </ul>
                  </div>

                  {/* Card 2: Hilang / Rusak */}
                  <div className="p-5 rounded-xl bg-surface-container-lowest border border-surface-container-high/60 shadow-sm flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-primary">
                      <span className="material-symbols-outlined text-[22px] text-secondary">credit_card_off</span>
                      <span className="font-title-md text-base font-bold">KTP Hilang / Rusak</span>
                    </div>
                    <ul className="flex flex-col gap-2 font-body-sm text-xs sm:text-sm text-on-surface-variant">
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px] text-secondary shrink-0">check_circle</span>
                        <span>Surat Kehilangan Polsek (bila hilang)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px] text-secondary shrink-0">check_circle</span>
                        <span>Fisik KTP lama (bila rusak)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px] text-secondary shrink-0">check_circle</span>
                        <span>KK domisili Sidoarjo</span>
                      </li>
                    </ul>
                  </div>

                  {/* Card 3: Perubahan Data */}
                  <div className="p-5 rounded-xl bg-surface-container-lowest border border-surface-container-high/60 shadow-sm flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-primary">
                      <span className="material-symbols-outlined text-[22px] text-secondary">manage_accounts</span>
                      <span className="font-title-md text-base font-bold">Perubahan Data</span>
                    </div>
                    <ul className="flex flex-col gap-2 font-body-sm text-xs sm:text-sm text-on-surface-variant">
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px] text-secondary shrink-0">check_circle</span>
                        <span>KK pembaruan terkini</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px] text-secondary shrink-0">check_circle</span>
                        <span>Fisik KTP-el lama</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px] text-secondary shrink-0">check_circle</span>
                        <span>Buku Nikah / Ijazah pendukung</span>
                      </li>
                    </ul>
                  </div>

                  {/* Card 4: Formulir F-1.02 */}
                  <div className="p-5 rounded-xl bg-surface-container-lowest border border-surface-container-high/60 shadow-sm flex flex-col justify-between gap-3">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-primary">
                        <span className="material-symbols-outlined text-[22px] text-secondary">description</span>
                        <span className="font-title-md text-base font-bold">Formulir F-1.02</span>
                      </div>
                      <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                        Wajib diisi bila terdapat perubahan elemen data primer atau status kependudukan.
                      </p>
                    </div>
                    <a
                      className="inline-flex items-center gap-1.5 font-label-md text-xs sm:text-sm text-secondary hover:underline font-bold"
                      href="#unduh-form"
                    >
                      <span className="material-symbols-outlined text-[18px]">download</span>
                      <span>Unduh Blanko Resmi (PDF)</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Alur Prosedur Pengurusan */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <h2 className="font-headline-md text-xl lg:text-2xl font-bold text-primary">Tahapan Pengurusan Mandiri</h2>
                  <p className="font-body-md text-sm text-on-surface-variant mt-1">
                    Prosedur verifikasi tersinkronisasi otomatis dengan basis data Sistem Informasi Administrasi Kependudukan (SIAK).
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl bg-surface-container-lowest border border-surface-container-high/60 shadow-sm flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="w-8 h-8 rounded-lg bg-primary-container text-secondary-fixed flex items-center justify-center font-bold text-sm">
                        1
                      </span>
                      <span className="material-symbols-outlined text-[20px] text-secondary">login</span>
                    </div>
                    <div>
                      <h3 className="font-title-md text-sm font-bold text-primary leading-tight mb-1">Masuk Plavon</h3>
                      <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                        Login dengan NIK, pilih KTP-el, &amp; unggah berkas PDF/JPG.
                      </p>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-surface-container-lowest border border-surface-container-high/60 shadow-sm flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="w-8 h-8 rounded-lg bg-primary-container text-secondary-fixed flex items-center justify-center font-bold text-sm">
                        2
                      </span>
                      <span className="material-symbols-outlined text-[20px] text-secondary">fact_check</span>
                    </div>
                    <div>
                      <h3 className="font-title-md text-sm font-bold text-primary leading-tight mb-1">Verifikasi Online</h3>
                      <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                        Pemeriksaan berkas 1×24 jam &amp; notifikasi WhatsApp.
                      </p>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-surface-container-lowest border border-surface-container-high/60 shadow-sm flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="w-8 h-8 rounded-lg bg-primary-container text-secondary-fixed flex items-center justify-center font-bold text-sm">
                        3
                      </span>
                      <span className="material-symbols-outlined text-[20px] text-secondary">print</span>
                    </div>
                    <div>
                      <h3 className="font-title-md text-sm font-bold text-primary leading-tight mb-1">Pencetakan Fisik</h3>
                      <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                        Penerbitan kartu kependudukan &amp; Tanda Bukti Barcode.
                      </p>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-surface-container-lowest border border-surface-container-high/60 shadow-sm flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="w-8 h-8 rounded-lg bg-secondary text-white flex items-center justify-center font-bold text-sm">
                        4
                      </span>
                      <span className="material-symbols-outlined text-[20px] text-secondary">pin_drop</span>
                    </div>
                    <div>
                      <h3 className="font-title-md text-sm font-bold text-primary leading-tight mb-1">Ambil / Pos</h3>
                      <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                        Ambil di MPP, Kantor Kecamatan, atau delivery Pos.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Titik Lokasi Pengambilan & Perekaman Biometrik */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <h2 className="font-headline-md text-xl lg:text-2xl font-bold text-primary">Titik Layanan Fisik &amp; Perekaman Biometrik</h2>
                  <p className="font-body-md text-sm text-on-surface-variant mt-1">
                    Bagi warga pemula yang belum merekam sidik jari dan iris mata, kunjungi lokasi layanan resmi berikut:
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container-high/60 flex flex-col justify-between gap-2">
                    <div className="flex flex-col gap-1">
                      <span className="font-label-md text-[11px] text-secondary font-bold uppercase tracking-wider">
                        Pusat Layanan Utama
                      </span>
                      <h3 className="font-title-md text-sm sm:text-base text-primary font-bold">MPP Jl. Lingkar Timur</h3>
                      <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                        Senin-Jumat: 08.00-15.00 WIB (4 Mesin Cetak ADM Mandiri)
                      </p>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container-high/60 flex flex-col justify-between gap-2">
                    <div className="flex flex-col gap-1">
                      <span className="font-label-md text-[11px] text-secondary font-bold uppercase tracking-wider">
                        Tingkat Wilayah
                      </span>
                      <h3 className="font-title-md text-sm sm:text-base text-primary font-bold">18 Kantor Kecamatan</h3>
                      <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                        Sesuai domisili pemohon • Senin-Jumat: 08.00-14.30 WIB
                      </p>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container-high/60 flex flex-col justify-between gap-2">
                    <div className="flex flex-col gap-1">
                      <span className="font-label-md text-[11px] text-secondary font-bold uppercase tracking-wider">
                        Jemput Bola
                      </span>
                      <h3 className="font-title-md text-sm sm:text-base text-primary font-bold">Mobil Dukcapil Keliling</h3>
                      <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                        Layanan berkala ke desa, sekolah, lansia &amp; warga berkebutuhan khusus.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section Edukasi Identitas Kependudukan Digital (IKD) */}
              <div className="p-5 rounded-2xl bg-primary-container text-on-primary flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-surface-container-lowest/10 flex items-center justify-center text-secondary-fixed shrink-0">
                    <span className="material-symbols-outlined text-[26px]">smartphone</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <h3 className="font-title-md text-base sm:text-lg text-on-primary font-bold">Aktivasi IKD (KTP Digital)</h3>
                      <span className="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold uppercase">
                        Terintegrasi
                      </span>
                    </div>
                    <p className="font-body-sm text-xs sm:text-sm text-on-primary-container leading-relaxed">
                      Gunakan identitas digital di ponsel Android &amp; iOS tanpa menunggu pencetakan fisik kartu.
                    </p>
                  </div>
                </div>
                <a
                  className="px-4 py-2.5 rounded-lg bg-secondary text-white font-label-lg text-xs sm:text-sm font-semibold hover:bg-secondary/90 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-sm"
                  href="https://web.dukcapil.kemendagri.go.id"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Aktivasi IKD</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </a>
              </div>
            </div>

            {/* Right Column: Action Card & Realtime Metrics Panel (4 Cols) */}
            <div className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-24">
              {/* Primary Action Box */}
              <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-high/80 shadow-md flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <span className="font-label-md text-xs text-secondary font-bold uppercase tracking-wider">
                    Layanan Mandiri Warga
                  </span>
                  <h3 className="font-title-md text-xl font-bold text-primary">Mulai Pengajuan KTP-el</h3>
                  <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    Masuk ke sistem Plavon menggunakan NIK yang terdaftar pada akun kependudukan Anda.
                  </p>
                </div>
                <div className="flex flex-col gap-2.5 pt-1">
                  <a
                    className="w-full py-3 px-4 rounded-xl bg-secondary hover:bg-secondary/90 text-white font-label-lg text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-md active:scale-98 text-center"
                    href="https://plavon.sidoarjokab.go.id"
                    rel="noopener noreferrer"
                    target="_blank"
                    onClick={handleApplyClick}
                  >
                    <span>Mulai Pengajuan Online</span>
                    <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                  </a>
                  <button
                    onClick={onBack}
                    className="w-full py-2.5 px-4 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary font-label-lg text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                    <span>Kembali ke Direktori Layanan</span>
                  </button>
                  <a
                    className="w-full py-2 px-3 text-center text-xs text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center gap-1"
                    href="#unduh-form"
                  >
                    <span className="material-symbols-outlined text-[16px]">download</span>
                    <span>Unduh Formulir F-1.02 (PDF)</span>
                  </a>
                </div>
                <div className="p-3 rounded-lg bg-surface-container-low flex items-center gap-2.5 border border-surface-container-high/40">
                  <span className="material-symbols-outlined text-secondary text-[20px] shrink-0">verified_user</span>
                  <span className="font-body-sm text-[11px] text-on-surface-variant leading-tight">
                    Terintegrasi aman dengan Ditjen Kependudukan Kemendagri RI.
                  </span>
                </div>
              </div>

              {/* Real-Time Quota & System Status */}
              <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-high/80 shadow-sm flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-xs font-semibold text-on-surface-variant">Kapasitas &amp; Kuota Harian</span>
                  <span className="px-2 py-0.5 rounded bg-secondary-container/40 text-secondary font-label-md text-[11px] font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                    Server Aktif
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-baseline justify-between">
                    <span className="font-body-sm text-xs text-on-surface-variant">Blangko Tersedia Hari Ini</span>
                    <span className="font-stat-numeral text-xl text-primary font-bold">850 Keping</span>
                  </div>
                  {/* Visual Bar */}
                  <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                    <div className="h-full bg-secondary rounded-full" style={{ width: '72%' }}></div>
                  </div>
                  <div className="flex items-center justify-between font-label-md text-[11px] text-on-surface-variant pt-0.5">
                    <span>Terpakai 612 / 850</span>
                    <span className="text-secondary font-semibold">Tersedia 238 Keping</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 pt-2 border-t border-surface-container text-xs text-on-surface-variant">
                  <div className="flex items-center justify-between">
                    <span>Jam Pengajuan Daring:</span>
                    <span className="font-semibold text-primary">24 Jam Nonstop</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Jam Cetak Loket MPP:</span>
                    <span className="font-semibold text-primary">08.00 - 15.00 WIB</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Estimasi Verifikasi Berkas:</span>
                    <span className="font-semibold text-secondary">Rata-rata 4.2 Jam</span>
                  </div>
                </div>
              </div>

              {/* Helpdesk & Dukungan Warga */}
              <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-high/80 shadow-sm flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <h3 className="font-title-md text-base font-bold text-primary">Bantuan &amp; Pengaduan</h3>
                  <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                    Kendala NIK tidak sinkron atau berkas tertolak dapat dikonsultasikan melalui kanal resmi:
                  </p>
                </div>
                <div className="flex flex-col gap-2 pt-1">
                  <a
                    className="p-3 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors flex items-center justify-between"
                    href="https://wa.me/628113118118"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-secondary text-[22px]">chat</span>
                      <div>
                        <div className="font-label-md text-xs font-bold text-primary">WhatsApp Dukcapil</div>
                        <div className="font-body-sm text-[11px] text-on-surface-variant">0811-3118-118</div>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant text-[16px]">chevron_right</span>
                  </a>
                  <div className="p-3 rounded-xl bg-surface-container flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-secondary text-[22px]">support_agent</span>
                      <div>
                        <div className="font-label-md text-xs font-bold text-primary">Loket Informasi MPP</div>
                        <div className="font-body-sm text-[11px] text-on-surface-variant">Gedung MPP Lantai 1 Buduran</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Tanya Jawab Spesifik (FAQ KTP-el Sidoarjo) */}
      <section className="w-full bg-surface-container-low py-8 lg:py-10 border-t border-surface-container">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h2 className="font-headline-md text-xl lg:text-2xl font-bold text-primary">Pertanyaan yang Sering Diajukan Warga</h2>
            <p className="font-body-md text-sm text-on-surface-variant max-w-2xl">
              Jawaban resmi mengenai regulasi administrasi kependudukan di wilayah Kabupaten Sidoarjo.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-surface-container-lowest border border-surface-container-high/60 shadow-sm flex flex-col gap-2">
              <div className="flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined text-secondary text-[20px]">verified</span>
                <h3 className="font-title-md text-base font-semibold text-primary">Masa Berlaku KTP-el Seumur Hidup</h3>
              </div>
              <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                Berdasarkan UU No. 24 Tahun 2013, KTP-el berlaku seumur hidup selama fisik kartu terbaca dan tidak terdapat revisi elemen data kependudukan (alamat, status perkawinan, dsb).
              </p>
            </div>
            <div className="p-5 rounded-xl bg-surface-container-lowest border border-surface-container-high/60 shadow-sm flex flex-col gap-2">
              <div className="flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined text-secondary text-[20px]">payments</span>
                <h3 className="font-title-md text-base font-semibold text-primary">Bebas Biaya Retribusi (Rp 0 &amp; Anti Pungli)</h3>
              </div>
              <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                Seluruh pengurusan dokumen kependudukan Disdukcapil Sidoarjo 100% gratis tanpa biaya administrasi. Aduan pungutan liar dapat dilaporkan langsung ke Hotline Saber Pungli 112.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default KtpServicePage;
