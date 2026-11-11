import React from 'react';

export interface SkuServicePageProps {
  onBack?: () => void;
  onApply?: () => void;
}

export const SkuServicePage: React.FC<SkuServicePageProps> = ({
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
      {/* Top Metadata & Breadcrumb Header */}
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
            <a href="#beranda" className="hover:text-secondary transition-colors">Beranda</a>
            <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
            <button onClick={onBack} className="hover:text-secondary transition-colors">
              Direktori Layanan Publik
            </button>
            <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
            <span className="text-on-surface font-semibold">Surat Keterangan Usaha (SIPRAJA)</span>
          </nav>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-surface-container text-primary font-label-md text-xs font-semibold">
            <span className="material-symbols-outlined text-[16px] text-secondary">verified</span>
            <span>Layanan Resmi Terakreditasi ISO 9001:2015</span>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        {/* Title & Executive Overview */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-2.5 py-1 rounded bg-secondary-container/40 text-on-secondary-container font-label-md text-xs font-bold uppercase tracking-wider">
              PELAYANAN KECAMATAN &amp; DESA
            </span>
            <span className="px-2.5 py-1 rounded bg-surface-container-highest text-primary font-label-md text-xs font-semibold">
              SIPRAJA MANDIRI
            </span>
            <span className="px-2.5 py-1 rounded bg-tertiary-container/30 text-tertiary font-label-md text-xs font-bold">
              24 JENIS SURAT KELURAHAN
            </span>
          </div>
          <h1 className="font-headline-lg text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary tracking-tight max-w-4xl mb-3">
            Surat Keterangan Usaha (SKU) SIPRAJA Sidoarjo
          </h1>
          <p className="font-body-lg text-base sm:text-lg text-on-surface-variant max-w-5xl leading-relaxed">
            Layanan mandiri penerbitan Surat Keterangan Usaha resmi bertanda tangan elektronik (TTE) dari Kepala Desa/Lurah dan Camat se-Kabupaten Sidoarjo untuk legalitas usaha mikro, pengajuan KUR perbankan, dan kelengkapan perizinan.
          </p>
        </div>

        {/* 4 Essential Metrics Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-xl bg-surface-container-low border border-surface-container-high/60 shadow-sm flex flex-col justify-between">
            <span className="font-label-md text-xs font-semibold text-on-surface-variant mb-2">Tarif Retribusi</span>
            <div>
              <div className="font-stat-numeral text-2xl font-extrabold text-secondary mb-1">Rp 0</div>
              <div className="font-label-md text-xs text-on-surface">Gratis Tanpa Pungutan</div>
            </div>
          </div>
          <div className="p-5 rounded-xl bg-surface-container-low border border-surface-container-high/60 shadow-sm flex flex-col justify-between">
            <span className="font-label-md text-xs font-semibold text-on-surface-variant mb-2">Standar SLA Waktu</span>
            <div>
              <div className="font-stat-numeral text-2xl font-extrabold text-primary mb-1">15–30 Menit</div>
              <div className="font-label-md text-xs text-on-surface">Verifikasi Digital Otomatis</div>
            </div>
          </div>
          <div className="p-5 rounded-xl bg-surface-container-low border border-surface-container-high/60 shadow-sm flex flex-col justify-between">
            <span className="font-label-md text-xs font-semibold text-on-surface-variant mb-2">Kanal Pengurusan</span>
            <div>
              <div className="font-stat-numeral text-2xl font-extrabold text-primary mb-1">100% Daring</div>
              <div className="font-label-md text-xs text-on-surface">Portal SIPRAJA Mandiri</div>
            </div>
          </div>
          <div className="p-5 rounded-xl bg-surface-container-low border border-surface-container-high/60 shadow-sm flex flex-col justify-between">
            <span className="font-label-md text-xs font-semibold text-on-surface-variant mb-2">Instansi Pembina</span>
            <div>
              <div className="font-title-md text-base font-bold text-primary mb-1">Kelurahan &amp; Kecamatan</div>
              <div className="font-label-md text-xs text-on-surface">Didukung Bagian Pemerintahan Pemkab</div>
            </div>
          </div>
        </div>

        {/* Main 2-Column Workframe */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (Substantive Details ~65%) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Section A: Kelengkapan Dokumen Pemohon */}
            <section className="flex flex-col gap-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-5 bg-secondary rounded-full inline-block"></span>
                  <h2 className="font-headline-sm text-lg sm:text-xl text-primary font-bold">
                    Kelengkapan Dokumen Persyaratan
                  </h2>
                </div>
                <span className="font-label-md text-xs text-on-surface-variant font-medium">
                  Format: JPG, PNG, atau PDF (Maks. 2MB)
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-4 rounded-xl bg-surface-container-lowest border border-surface-container-high/60 shadow-sm flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[20px]">badge</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <h3 className="font-title-md text-sm text-on-surface font-semibold">KTP-el &amp; Kartu Keluarga</h3>
                      <span className="text-[10px] px-1.5 py-0.5 bg-secondary-container/40 text-secondary rounded font-bold">Wajib</span>
                    </div>
                    <p className="font-body-sm text-xs text-on-surface-variant mt-1 leading-relaxed">
                      Domisili Sidoarjo aktif &amp; sinkron Dispendukcapil otomatis.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-surface-container-lowest border border-surface-container-high/60 shadow-sm flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[20px]">storefront</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <h3 className="font-title-md text-sm text-on-surface font-semibold">Foto Aktivitas Usaha</h3>
                      <span className="text-[10px] px-1.5 py-0.5 bg-secondary-container/40 text-secondary rounded font-bold">Wajib</span>
                    </div>
                    <p className="font-body-sm text-xs text-on-surface-variant mt-1 leading-relaxed">
                      Foto tampak depan tempat usaha / produk fisik &amp; plang nama.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-surface-container-lowest border border-surface-container-high/60 shadow-sm flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[20px]">mark_email_read</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <h3 className="font-title-md text-sm text-on-surface font-semibold">Surat Pengantar RT/RW</h3>
                      <span className="text-[10px] px-1.5 py-0.5 bg-secondary-container/40 text-secondary rounded font-bold">Wajib</span>
                    </div>
                    <p className="font-body-sm text-xs text-on-surface-variant mt-1 leading-relaxed">
                      Dapat melalui validasi digital SIPRAJA atau upload surat fisik.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-surface-container-lowest border border-surface-container-high/60 shadow-sm flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-surface-container-low flex items-center justify-center text-primary shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[20px]">description</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <h3 className="font-title-md text-sm text-on-surface font-semibold">Bukti Sewa / Domisili Luar</h3>
                      <span className="text-[10px] px-1.5 py-0.5 bg-surface-container text-on-surface-variant rounded font-semibold">Opsional</span>
                    </div>
                    <p className="font-body-sm text-xs text-on-surface-variant mt-1 leading-relaxed">
                      Diperlukan jika alamat usaha berbeda dengan alamat KTP.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section B: Alur Pengurusan Mandiri */}
            <section className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-5 bg-secondary rounded-full inline-block"></span>
                <h2 className="font-headline-sm text-lg sm:text-xl text-primary font-bold">
                  4 Tahapan Cepat Pengurusan Mandiri
                </h2>
              </div>
              <div className="p-5 rounded-2xl bg-surface-container-lowest border border-surface-container-high/60 shadow-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-xl bg-surface-container-low flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="w-6 h-6 rounded-full bg-primary text-on-primary text-xs font-bold flex items-center justify-center">1</span>
                        <span className="material-symbols-outlined text-outline text-[18px]">login</span>
                      </div>
                      <h3 className="font-title-md text-sm text-on-surface font-bold">Akses Akun</h3>
                      <p className="font-body-sm text-xs text-on-surface-variant mt-1 leading-relaxed">
                        Login NIK di SIPRAJA, pilih menu SKU.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-surface-container-low flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="w-6 h-6 rounded-full bg-primary text-on-primary text-xs font-bold flex items-center justify-center">2</span>
                        <span className="material-symbols-outlined text-outline text-[18px]">edit_note</span>
                      </div>
                      <h3 className="font-title-md text-sm text-on-surface font-bold">Input Data Usaha</h3>
                      <p className="font-body-sm text-xs text-on-surface-variant mt-1 leading-relaxed">
                        Isi KBLI, alamat usaha, dan modal awal.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-surface-container-low flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="w-6 h-6 rounded-full bg-primary text-on-primary text-xs font-bold flex items-center justify-center">3</span>
                        <span className="material-symbols-outlined text-outline text-[18px]">verified</span>
                      </div>
                      <h3 className="font-title-md text-sm text-on-surface font-bold">Validasi Desa</h3>
                      <p className="font-body-sm text-xs text-on-surface-variant mt-1 leading-relaxed">
                        Verifikasi data desa &amp; TTE elektronik.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-surface-container-low flex flex-col justify-between border-l-2 border-secondary">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="w-6 h-6 rounded-full bg-secondary text-white text-xs font-bold flex items-center justify-center">4</span>
                        <span className="material-symbols-outlined text-secondary text-[18px]">check_circle</span>
                      </div>
                      <h3 className="font-title-md text-sm text-on-surface font-bold">Terbit &amp; Unduh</h3>
                      <p className="font-body-sm text-xs text-on-surface-variant mt-1 leading-relaxed">
                        PDF bertanda QR BSrE terbit instan &amp; sah.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section C: Callout Ringkas Terintegrasi */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-surface-container-lowest border border-surface-container-high/60 shadow-sm flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary shrink-0">
                  <span className="material-symbols-outlined text-[24px]">print</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <h3 className="font-title-md text-sm text-on-surface font-bold">Anjungan Mandiri &amp; MPP</h3>
                    <span className="text-[10px] px-1.5 py-0.5 bg-secondary-container/40 text-secondary rounded font-bold">24 Jam</span>
                  </div>
                  <p className="font-body-sm text-xs text-on-surface-variant mt-1 leading-relaxed">
                    Tersedia di 18 Kantor Kecamatan &amp; MPP Lingkar Timur untuk cetak mandiri dan pendampingan petugas.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-primary-container text-on-primary flex items-center justify-between gap-3 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-surface-container-lowest/10 flex items-center justify-center text-secondary-fixed shrink-0">
                    <span className="material-symbols-outlined text-[24px]">hub</span>
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-title-md text-sm font-bold text-on-primary leading-tight">
                      Lanjut Integrasi NIB OSS-RBA
                    </h3>
                    <p className="font-body-sm text-xs text-on-primary-container leading-tight mt-0.5">
                      Untuk syarat sertifikasi halal &amp; KUR bunga rendah.
                    </p>
                  </div>
                </div>
                <a
                  className="px-3 py-1.5 rounded-lg bg-secondary text-white font-label-md text-xs font-semibold hover:bg-secondary/90 shrink-0 inline-flex items-center gap-1 transition-colors"
                  href="#layanan/nib"
                >
                  <span>Panduan</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </a>
              </div>
            </div>

            {/* Section D: FAQ Esensial */}
            <section className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-5 bg-secondary rounded-full inline-block"></span>
                <h2 className="font-headline-sm text-lg sm:text-xl text-primary font-bold">Tanya Jawab Pokok</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-surface-container-lowest border border-surface-container-high/60 shadow-sm flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-[20px]">help</span>
                    <h3 className="font-title-md text-sm text-on-surface font-semibold">Apakah butuh stempel basah?</h3>
                  </div>
                  <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed pl-7">
                    Tidak perlu. Dokumen dilengkapi Tanda Tangan Elektronik (TTE) &amp; QR Code Balai Sertifikasi Elektronik (BSrE BSSN) yang sah secara hukum.
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-surface-container-lowest border border-surface-container-high/60 shadow-sm flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-[20px]">help</span>
                    <h3 className="font-title-md text-sm text-on-surface font-semibold">Berapa masa berlaku SKU?</h3>
                  </div>
                  <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed pl-7">
                    Berlaku selama 1 (satu) tahun sejak tanggal terbit, dan dapat diperbarui gratis melalui portal jika terdapat perubahan data usaha.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column (Operational Action Cards ~35%) */}
          <div className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-24">
            {/* Primary Action Card */}
            <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-high/80 shadow-md flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[24px]">assignment_turned_in</span>
                </div>
                <div>
                  <h3 className="font-title-md text-base font-bold text-on-surface">Mulai Pengajuan SKU</h3>
                  <span className="font-label-md text-xs text-secondary font-semibold">Layanan Mandiri Warga</span>
                </div>
              </div>
              <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                Masuk ke sistem SIPRAJA menggunakan akun warga terverifikasi Anda untuk mengisi formulir permohonan.
              </p>
              <div className="flex flex-col gap-2.5">
                <a
                  className="w-full py-3 px-4 rounded-xl bg-secondary text-white font-label-lg text-sm hover:bg-secondary/90 transition-all flex items-center justify-center gap-2 font-bold text-center shadow-md active:scale-98"
                  href="https://sipraja.sidoarjokab.go.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleApplyClick}
                >
                  <span>Mulai Pengajuan Online</span>
                  <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                </a>
                <button
                  onClick={onBack}
                  className="w-full py-2.5 px-4 rounded-xl bg-surface-container text-primary font-label-lg text-xs sm:text-sm hover:bg-surface-container-high transition-colors flex items-center justify-center gap-1.5 font-semibold text-center"
                >
                  <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                  <span>Kembali ke Direktori Layanan</span>
                </button>
                <a
                  className="w-full py-2 px-3 text-center text-xs text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center gap-1"
                  href="#template-sku"
                >
                  <span className="material-symbols-outlined text-[16px]">download_for_offline</span>
                  <span>Unduh Template Pengantar (PDF)</span>
                </a>
              </div>
              <div className="pt-2 border-t border-surface-container flex items-center gap-2 font-label-md text-[11px] text-on-surface-variant">
                <span className="material-symbols-outlined text-secondary text-[16px]">verified_user</span>
                <span>Terintegrasi TTE BSrE BSSN &amp; Kemendagri</span>
              </div>
            </div>

            {/* Performance & Server Status Card */}
            <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-high/80 shadow-sm flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="font-title-md text-base font-bold text-on-surface">Kapasitas &amp; Kinerja</h3>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-container/50 text-secondary font-label-md text-[11px] font-bold">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                  Server Aktif
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container-high/40">
                  <div className="font-label-md text-[11px] text-on-surface-variant">Rata-rata Terbit Hari Ini</div>
                  <div className="font-title-md text-lg font-bold text-primary mt-1">1.240</div>
                  <div className="font-label-md text-[11px] text-secondary font-medium">Dokumen Sah</div>
                </div>
                <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container-high/40">
                  <div className="font-label-md text-[11px] text-on-surface-variant">Waktu Verifikasi</div>
                  <div className="font-title-md text-lg font-bold text-primary mt-1">14.8 Menit</div>
                  <div className="font-label-md text-[11px] text-secondary font-medium">Lebih Cepat dr SLA</div>
                </div>
                <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container-high/40">
                  <div className="font-label-md text-[11px] text-on-surface-variant">Jam Pengajuan</div>
                  <div className="font-title-md text-lg font-bold text-primary mt-1">24 Jam</div>
                  <div className="font-label-md text-[11px] text-on-surface-variant">Nonstop Otomatis</div>
                </div>
                <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container-high/40">
                  <div className="font-label-md text-[11px] text-on-surface-variant">Indeks Kepuasan</div>
                  <div className="font-title-md text-lg font-bold text-secondary mt-1">98.9%</div>
                  <div className="font-label-md text-[11px] text-on-surface-variant">Sangat Puas</div>
                </div>
              </div>
            </div>

            {/* Help & Consultation Card */}
            <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-high/80 shadow-sm flex flex-col gap-3">
              <h3 className="font-title-md text-base font-bold text-on-surface">
                Bantuan &amp; Konsultasi SIPRAJA
              </h3>
              <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                Mengalami kendala otentikasi data KTP atau permohonan tertolak? Hubungi tim pendamping kami.
              </p>
              <div className="flex flex-col gap-2 pt-1">
                <a
                  className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors flex items-center justify-between border border-surface-container-high/40"
                  href="https://wa.me/6281234567890"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px]">chat</span>
                    </div>
                    <div>
                      <div className="font-label-md text-xs font-bold text-on-surface">WhatsApp Helpdesk</div>
                      <div className="font-body-sm text-[11px] text-on-surface-variant">0812-3456-7890 (Respon Cepat)</div>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-outline text-[18px]">chevron_right</span>
                </a>
                <div className="p-3 rounded-xl bg-surface-container-low flex items-start gap-2.5 border border-surface-container-high/40">
                  <div className="w-8 h-8 rounded-full bg-surface-container-highest text-primary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px]">pin_drop</span>
                  </div>
                  <div>
                    <div className="font-label-md text-xs font-bold text-on-surface">Loket SIPRAJA Mall Pelayanan Publik</div>
                    <div className="font-body-sm text-[11px] text-on-surface-variant leading-tight mt-0.5">
                      Gedung MPP Sidoarjo Lantai 1, Jl. Lingkar Timur, Buduran.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkuServicePage;
