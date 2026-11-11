import { Icon } from '../../components/common/Icon';
import React from 'react';

export interface FaskesServicePageProps {
  onBack?: () => void;
  onApply?: () => void;
}

export const FaskesServicePage: React.FC<FaskesServicePageProps> = ({
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
      {/* Top Breadcrumbs & Sub-Navigation */}
      <section className="w-full bg-surface-container-low py-4 border-b border-surface-container">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-label-md text-label-md text-on-surface-variant flex-wrap">
            <button
              onClick={onBack}
              className="hover:text-secondary transition-colors flex items-center gap-1 font-semibold text-secondary"
            >
              <Icon className="material-symbols-outlined text-[18px]">arrow_back</Icon>
              <span>Kembali ke Direktori Layanan</span>
            </button>
            <Icon className="material-symbols-outlined text-[14px] text-outline">chevron_right</Icon>
            <a href="#beranda" className="hover:text-secondary transition-colors">Beranda</a>
            <Icon className="material-symbols-outlined text-[14px] text-outline">chevron_right</Icon>
            <button onClick={onBack} className="hover:text-secondary transition-colors">
              Direktori Layanan Publik
            </button>
            <Icon className="material-symbols-outlined text-[14px] text-outline">chevron_right</Icon>
            <span className="text-primary font-semibold">Antrean Faskes &amp; RSUD Sidoarjo</span>
          </nav>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/40 text-on-secondary-container font-label-md text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            <span>Online 24 Jam • BPJS Kesehatan &amp; Satu Sehat</span>
          </div>
        </div>
      </section>

      {/* Main Shell */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10 flex flex-col gap-8">
        {/* Header Area with Sovereign Banner */}
        <div className="w-full rounded-2xl bg-surface-container-lowest p-6 sm:p-8 shadow-sm border border-surface-container-high/60 flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-secondary-fixed/30 blur-3xl pointer-events-none"></div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-surface-container text-primary font-label-md text-xs font-bold uppercase tracking-wider">
                PELAYANAN KESEHATAN MASYARAKAT
              </span>
              <span className="px-2.5 py-1 rounded bg-primary text-white font-label-md text-xs font-semibold">
                DINAS KESEHATAN KABUPATEN SIDOARJO
              </span>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/40 text-on-secondary-container font-label-md text-xs font-semibold">
              <Icon className="material-symbols-outlined text-[16px] text-secondary">verified</Icon>
              31 Puskesmas &amp; 2 RSUD
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pt-2">
            <div className="lg:col-span-8 flex flex-col gap-2">
              <h1 className="font-headline-lg text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary tracking-tight">
                Pendaftaran Faskes, Antrean Puskesmas &amp; Rujukan RSUD Online
              </h1>
              <p className="font-body-md text-base sm:text-lg text-on-surface-variant leading-relaxed mt-1">
                Layanan mandiri booking antrean berobat di 31 Puskesmas se-Kabupaten Sidoarjo, pengecekan ketersediaan kamar rawat inap (BOR) RSUD R.T. Notopuro, serta penerbitan rujukan terpadu tanpa antre fisik.
              </p>
            </div>

            {/* Banner Kanan / Akreditasi */}
            <div className="lg:col-span-4 rounded-xl bg-primary-container text-on-primary p-5 flex flex-col justify-between gap-3 relative overflow-hidden shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shrink-0">
                  <Icon className="material-symbols-outlined text-[24px]">verified_user</Icon>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-md text-[11px] text-tertiary-fixed font-bold tracking-wider">
                    AKREDITASI DIGITAL RESMI
                  </span>
                  <span className="font-title-md text-sm sm:text-base text-on-primary font-bold leading-snug">
                    SATU SEHAT KEMENKES &amp; BPJS PCare
                  </span>
                </div>
              </div>
              <p className="font-body-sm text-xs text-on-primary-container leading-relaxed">
                Tersertifikasi Keamanan Data Rekam Medis Elektronik sesuai standar UU Perlindungan Data Pribadi (UU PDP) &amp; standar Ditjen Yankes Kemenkes RI.
              </p>
              <div className="flex items-center gap-2 pt-2 border-t border-primary-fixed-dim/20 text-[11px] font-label-md text-secondary-fixed">
                <Icon className="material-symbols-outlined text-[16px]">lock</Icon>
                <span>Enkripsi TLS 1.3 End-to-End</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Layanan KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-xl bg-surface-container-lowest p-5 shadow-sm border border-surface-container-high/60 flex flex-col justify-between gap-2">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-xs font-semibold text-on-surface-variant">Tarif Retribusi / Biaya</span>
              <span className="w-8 h-8 rounded-lg bg-secondary-container/40 text-secondary flex items-center justify-center">
                <Icon className="material-symbols-outlined text-[20px]">payments</Icon>
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-stat-numeral text-2xl font-extrabold text-secondary">Rp 0</span>
              <span className="font-body-sm text-xs text-on-surface-variant">Gratis Warga KTP Sidoarjo / BPJS PBI</span>
            </div>
          </div>

          <div className="rounded-xl bg-surface-container-lowest p-5 shadow-sm border border-surface-container-high/60 flex flex-col justify-between gap-2">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-xs font-semibold text-on-surface-variant">Standar SLA Waktu</span>
              <span className="w-8 h-8 rounded-lg bg-secondary-container/40 text-secondary flex items-center justify-center">
                <Icon className="material-symbols-outlined text-[20px]">timer</Icon>
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-stat-numeral text-2xl font-extrabold text-primary">5 - 10 Menit</span>
              <span className="font-body-sm text-xs text-on-surface-variant">Booking Tiket &amp; No. Antrean Instan</span>
            </div>
          </div>

          <div className="rounded-xl bg-surface-container-lowest p-5 shadow-sm border border-surface-container-high/60 flex flex-col justify-between gap-2">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-xs font-semibold text-on-surface-variant">Kanal Pengurusan</span>
              <span className="w-8 h-8 rounded-lg bg-secondary-container/40 text-secondary flex items-center justify-center">
                <Icon className="material-symbols-outlined text-[20px]">devices</Icon>
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-stat-numeral text-2xl font-extrabold text-primary">100% Online</span>
              <span className="font-body-sm text-xs text-on-surface-variant">Portal SITAPAK &amp; Mobile JKN</span>
            </div>
          </div>

          <div className="rounded-xl bg-surface-container-lowest p-5 shadow-sm border border-surface-container-high/60 flex flex-col justify-between gap-2">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-xs font-semibold text-on-surface-variant">Instansi Pembina</span>
              <span className="w-8 h-8 rounded-lg bg-secondary-container/40 text-secondary flex items-center justify-center">
                <Icon className="material-symbols-outlined text-[20px]">local_hospital</Icon>
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-stat-numeral text-xl font-extrabold text-primary">Dinkes Sidoarjo</span>
              <span className="font-body-sm text-xs text-on-surface-variant">Membina 31 Puskesmas &amp; 2 RSUD</span>
            </div>
          </div>
        </div>

        {/* Main Body: Split 8-Col / 4-Col Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {/* Section: Kelengkapan Berkas & Persyaratan Pasien */}
            <div className="rounded-2xl bg-surface-container-lowest p-6 sm:p-7 shadow-sm border border-surface-container-high/60 flex flex-col gap-6">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center">
                    <Icon className="material-symbols-outlined text-[22px]">assignment</Icon>
                  </span>
                  <div>
                    <h2 className="font-title-md text-lg sm:text-xl text-primary font-bold">
                      Kelengkapan Berkas &amp; Persyaratan Pasien
                    </h2>
                    <p className="font-body-sm text-xs text-on-surface-variant">
                      Pastikan data berikut aktif saat registrasi antrean online
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-secondary-container/40 text-secondary font-label-md text-xs font-bold">
                  4 Syarat Valid
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl bg-surface-container-low p-4 flex flex-col justify-between gap-2 border border-surface-container-high/40">
                  <div className="flex items-start justify-between gap-2">
                    <span className="w-7 h-7 rounded-full bg-primary text-white font-label-md text-xs flex items-center justify-center font-bold">1</span>
                    <span className="px-2 py-0.5 rounded-full bg-secondary text-white font-label-md text-[10px] font-bold">Wajib Utama</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-title-md text-sm font-bold text-primary">
                      NIK Sidoarjo / e-KTP Pasien
                    </h3>
                    <p className="font-body-sm text-xs text-on-surface-variant">
                      Tervalidasi langsung dengan basis data kependudukan Dukcapil Sidoarjo.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-surface-container flex items-center gap-1.5 text-secondary font-label-md text-xs font-semibold">
                    <Icon className="material-symbols-outlined text-[16px]">check_circle</Icon>
                    <span>Terhubung SIPD &amp; SIAK</span>
                  </div>
                </div>

                <div className="rounded-xl bg-surface-container-low p-4 flex flex-col justify-between gap-2 border border-surface-container-high/40">
                  <div className="flex items-start justify-between gap-2">
                    <span className="w-7 h-7 rounded-full bg-primary text-white font-label-md text-xs flex items-center justify-center font-bold">2</span>
                    <span className="px-2 py-0.5 rounded-full bg-secondary text-white font-label-md text-[10px] font-bold">Kepesertaan</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-title-md text-sm font-bold text-primary">
                      Nomor BPJS Kesehatan / KIS Aktif
                    </h3>
                    <p className="font-body-sm text-xs text-on-surface-variant">
                      Terkoneksi API BPJS Mobile JKN &amp; PCare untuk pembebasan biaya retribusi.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-surface-container flex items-center gap-1.5 text-secondary font-label-md text-xs font-semibold">
                    <Icon className="material-symbols-outlined text-[16px]">verified</Icon>
                    <span>Terverifikasi BPJS PCare</span>
                  </div>
                </div>

                <div className="rounded-xl bg-surface-container-low p-4 flex flex-col justify-between gap-2 border border-surface-container-high/40">
                  <div className="flex items-start justify-between gap-2">
                    <span className="w-7 h-7 rounded-full bg-surface-container-highest text-on-surface font-label-md text-xs flex items-center justify-center font-bold">3</span>
                    <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-md text-[10px] font-semibold">Opsional Khusus</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-title-md text-sm font-bold text-primary">
                      Buku KIA / Catatan Medis Terdahulu
                    </h3>
                    <p className="font-body-sm text-xs text-on-surface-variant">
                      Khusus pasien Ibu Hamil, Balita, dan Imunisasi Dasar di Poli KIA Puskesmas.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-surface-container flex items-center gap-1.5 text-on-surface-variant font-label-md text-xs">
                    <Icon className="material-symbols-outlined text-[16px]">child_care</Icon>
                    <span>Pemeriksaan Ibu &amp; Bayi</span>
                  </div>
                </div>

                <div className="rounded-xl bg-surface-container-low p-4 flex flex-col justify-between gap-2 border border-surface-container-high/40">
                  <div className="flex items-start justify-between gap-2">
                    <span className="w-7 h-7 rounded-full bg-primary text-white font-label-md text-xs flex items-center justify-center font-bold">4</span>
                    <span className="px-2 py-0.5 rounded-full bg-secondary text-white font-label-md text-[10px] font-bold">Rujukan Poli</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-title-md text-sm font-bold text-primary">
                      Surat Rujukan Faskes Tingkat 1
                    </h3>
                    <p className="font-body-sm text-xs text-on-surface-variant">
                      Dibutuhkan khusus jika mendaftar Poli Spesialis di RSUD R.T. Notopuro / Sidoarjo Barat.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-surface-container flex items-center gap-1.5 text-secondary font-label-md text-xs font-semibold">
                    <Icon className="material-symbols-outlined text-[16px]">sync_alt</Icon>
                    <span>Integrasi Sisrute Kemenkes</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section: Tahapan Pengurusan Mandiri Antrean */}
            <div className="rounded-2xl bg-surface-container-lowest p-6 sm:p-7 shadow-sm border border-surface-container-high/60 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-secondary text-white flex items-center justify-center">
                  <Icon className="material-symbols-outlined text-[22px]">format_list_numbered</Icon>
                </span>
                <div>
                  <h2 className="font-title-md text-lg sm:text-xl text-primary font-bold">
                    Tahapan Pengurusan Mandiri Antrean
                  </h2>
                  <p className="font-body-sm text-xs text-on-surface-variant">
                    4 langkah ringkas berobat tanpa antre berjejal di ruang tunggu
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl bg-surface-container-low p-4 flex flex-col gap-2 border border-surface-container-high/40">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-md bg-primary-container text-white font-label-md text-xs font-bold">
                      Langkah 01
                    </span>
                    <Icon className="material-symbols-outlined text-secondary text-[22px]">apartment</Icon>
                  </div>
                  <h3 className="font-title-md text-base text-primary font-bold">Pilih Faskes &amp; Poli</h3>
                  <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                    Pilih salah satu dari 31 Puskesmas terdekat di wilayah Sidoarjo atau langsung ke RSUD daerah bila memiliki surat rujukan aktif.
                  </p>
                </div>

                <div className="rounded-xl bg-surface-container-low p-4 flex flex-col gap-2 border border-surface-container-high/40">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-md bg-primary-container text-white font-label-md text-xs font-bold">
                      Langkah 02
                    </span>
                    <Icon className="material-symbols-outlined text-secondary text-[22px]">calendar_month</Icon>
                  </div>
                  <h3 className="font-title-md text-base text-primary font-bold">Tentukan Jadwal &amp; Dokter</h3>
                  <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                    Tentukan tanggal kedatangan (H-7 hingga H-1), sesi pagi atau siang, serta dokter pemeriksa yang sedang bertugas di poli pilihan.
                  </p>
                </div>

                <div className="rounded-xl bg-surface-container-low p-4 flex flex-col gap-2 border border-surface-container-high/40">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-md bg-primary-container text-white font-label-md text-xs font-bold">
                      Langkah 03
                    </span>
                    <Icon className="material-symbols-outlined text-secondary text-[22px]">qr_code_2</Icon>
                  </div>
                  <h3 className="font-title-md text-base text-primary font-bold">Dapatkan QR-Code E-Tiket</h3>
                  <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                    Nomor antrean resmi, estimasi jam pelayanan, dan barcode verifikasi akan langsung terbit serta tersimpan di akun SITAPAK Anda.
                  </p>
                </div>

                <div className="rounded-xl bg-surface-container-low p-4 flex flex-col gap-2 border border-surface-container-high/40">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-md bg-primary-container text-white font-label-md text-xs font-bold">
                      Langkah 04
                    </span>
                    <Icon className="material-symbols-outlined text-secondary text-[22px]">contactless</Icon>
                  </div>
                  <h3 className="font-title-md text-base text-primary font-bold">Datang &amp; Scan di Mesin Mandiri</h3>
                  <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                    Tiba 15 menit sebelum estimasi waktu. Scan barcode pada Anjungan Mandiri Faskes untuk konfirmasi kedatangan tanpa loket manual.
                  </p>
                </div>
              </div>
            </div>

            {/* Banner Layanan Darurat */}
            <div className="rounded-2xl bg-error text-on-error p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-md">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white text-error flex items-center justify-center shrink-0 shadow">
                  <Icon className="material-symbols-outlined text-[30px]">emergency</Icon>
                </div>
                <div className="flex flex-col">
                  <span className="font-title-md text-base sm:text-lg font-bold">
                    Kedaruratan Medis &amp; Ambulans Gratis Sidoarjo
                  </span>
                  <p className="font-body-sm text-xs sm:text-sm text-on-error/90 leading-relaxed mt-0.5">
                    Untuk kondisi kritis, kecelakaan, atau persalinan darurat segera hubungi Call Center Bebas Pulsa 112 atau Hotline PSC 119 Sidoarjo Siaga 24 Jam.
                  </p>
                </div>
              </div>
              <a
                className="px-4 py-2.5 rounded-xl bg-white text-error font-label-lg text-sm font-bold hover:bg-surface-container-low transition-colors shadow-sm flex items-center gap-1.5 shrink-0"
                href="tel:112"
              >
                <Icon className="material-symbols-outlined text-[18px]">call</Icon>
                <span>Hubungi 112</span>
              </a>
            </div>

            {/* Section: Fasilitas Layanan Medis Terpadu (2 Featured Interactive Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Card 1: Bed Monitor */}
              <div className="rounded-2xl bg-surface-container-lowest p-6 shadow-sm border border-surface-container-high/60 flex flex-col justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full bg-secondary-container/40 text-on-secondary-container font-label-md text-xs font-semibold">
                      Update Real-Time 15 Menit
                    </span>
                    <Icon className="material-symbols-outlined text-secondary text-[24px]">bed</Icon>
                  </div>
                  <h3 className="font-title-md text-base font-bold text-primary">
                    Pantau Bed Rawat Inap (BOR) RSUD
                  </h3>
                  <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                    Cek sisa kamar rawat inap kelas 1, 2, 3, VIP, ICU, dan NICU di RSUD R.T. Notopuro serta RSUD Sidoarjo Barat secara transparan.
                  </p>
                </div>
                <div className="rounded-xl bg-surface-container-low p-3.5 flex flex-col gap-2 border border-surface-container-high/40">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-on-surface">Ketersediaan Bed Kelas 3 RSUD</span>
                    <span className="text-secondary font-bold">48 Tersedia / 210 Total</span>
                  </div>
                  <div className="w-full bg-surface-container-high rounded-full h-2 overflow-hidden">
                    <div className="bg-secondary h-2 rounded-full" style={{ width: '77%' }}></div>
                  </div>
                </div>
                <button
                  className="w-full py-2.5 px-4 rounded-xl bg-surface-container-high text-primary font-label-lg text-xs font-semibold hover:bg-surface-variant transition-colors flex items-center justify-center gap-2"
                  type="button"
                >
                  <span>Buka Dasbor Bed RSUD Sidoarjo</span>
                  <Icon className="material-symbols-outlined text-[16px]">arrow_forward</Icon>
                </button>
              </div>

              {/* Card 2: Skrining Mandiri */}
              <div className="rounded-2xl bg-surface-container-lowest p-6 shadow-sm border border-surface-container-high/60 flex flex-col justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full bg-tertiary-fixed/40 text-on-tertiary-fixed font-label-md text-xs font-semibold">
                      Satu Sehat Mobile Sync
                    </span>
                    <Icon className="material-symbols-outlined text-tertiary text-[24px]">health_and_safety</Icon>
                  </div>
                  <h3 className="font-title-md text-base font-bold text-primary">
                    Skrining Kesehatan Mandiri Warga
                  </h3>
                  <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                    Deteksi dini risiko penyakit tidak menular (hipertensi, diabetes, jantung koroner) dan riwayat imunisasi keluarga langsung dari gawai Anda.
                  </p>
                </div>
                <div className="rounded-xl bg-surface-container-low p-3.5 flex items-center gap-3 border border-surface-container-high/40">
                  <span className="w-8 h-8 rounded-lg bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-bold">
                    <Icon className="material-symbols-outlined text-[18px]">ecg_heart</Icon>
                  </span>
                  <div className="flex flex-col">
                    <span className="font-label-md text-xs text-primary font-bold">Pemeriksaan Berkala 6 Bulan</span>
                    <span className="font-body-sm text-[11px] text-on-surface-variant">Hasil otomatis masuk rekam medis Dinkes</span>
                  </div>
                </div>
                <button
                  className="w-full py-2.5 px-4 rounded-xl bg-surface-container-high text-primary font-label-lg text-xs font-semibold hover:bg-surface-variant transition-colors flex items-center justify-center gap-2"
                  type="button"
                >
                  <span>Mulai Skrining Kesehatan Mandiri</span>
                  <Icon className="material-symbols-outlined text-[16px]">arrow_forward</Icon>
                </button>
              </div>
            </div>

            {/* Section: Tanya Jawab Pokok (FAQ Layanan Kesehatan) */}
            <div className="rounded-2xl bg-surface-container-lowest p-6 sm:p-7 shadow-sm border border-surface-container-high/60 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center">
                  <Icon className="material-symbols-outlined text-[22px]">quiz</Icon>
                </span>
                <div>
                  <h2 className="font-title-md text-lg sm:text-xl text-primary font-bold">
                    Tanya Jawab Pokok (FAQ Layanan Kesehatan)
                  </h2>
                  <p className="font-body-sm text-xs text-on-surface-variant">
                    Pertanyaan umum seputar pendaftaran antrean dan integrasi faskes
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="rounded-xl bg-surface-container-low p-4 flex flex-col gap-1 border border-surface-container-high/40">
                  <div className="flex items-start gap-2.5">
                    <Icon className="material-symbols-outlined text-secondary text-[22px] mt-0.5">help</Icon>
                    <div className="flex flex-col gap-1">
                      <h3 className="font-title-md text-sm font-bold text-primary">
                        Apakah warga luar domisili Sidoarjo bisa mendaftar antrean Puskesmas online melalui portal ini?
                      </h3>
                      <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                        Bisa untuk pemeriksaan umum mandiri reguler. Namun bagi peserta BPJS Kesehatan dengan faskes luar Sidoarjo, pelayanan tanpa rujukan dibatasi maksimal 3 kali kunjungan gawat darurat/kebutuhan mendesak sesuai ketentuan regulasi nasional BPJS Kesehatan.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-surface-container-low p-4 flex flex-col gap-1 border border-surface-container-high/40">
                  <div className="flex items-start gap-2.5">
                    <Icon className="material-symbols-outlined text-secondary text-[22px] mt-0.5">help</Icon>
                    <div className="flex flex-col gap-1">
                      <h3 className="font-title-md text-sm font-bold text-primary">
                        Kapan batas waktu pembatalan atau pergantian jadwal periksa jika berhalangan hadir?
                      </h3>
                      <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                        Pembatalan dapat dilakukan maksimal H-1 jadwal kunjungan sebelum pukul 21.00 WIB melalui portal SITAPAK pada menu "Tiket Saya" atau melalui konfirmasi WhatsApp bot Puskesmas terkait agar kuota antrean dapat dialihkan kepada warga lain yang membutuhkan.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Sidebar - 4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-24">
            {/* Card Aksi Mandiri Warga */}
            <div className="rounded-2xl bg-surface-container-lowest p-6 shadow-md border border-surface-container-high/80 flex flex-col gap-4 relative overflow-hidden">
              <div className="w-1.5 h-full bg-secondary absolute left-0 top-0"></div>
              <div className="flex flex-col gap-1 pl-2">
                <span className="font-label-md text-xs text-secondary font-bold tracking-wider">
                  PORTAL PELAYANAN CEPAT
                </span>
                <h2 className="font-headline-md text-xl font-bold text-primary">Aksi Mandiri Warga</h2>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  Fasilitas pemesanan nomor antrean poli dan cek kuota dokter di seluruh fasilitas kesehatan daerah Sidoarjo.
                </p>
              </div>
              <div className="flex flex-col gap-2.5 pt-1">
                <button
                  className="w-full py-3.5 px-4 rounded-xl bg-secondary text-white font-label-lg text-sm font-bold hover:bg-secondary/90 transition-all flex items-center justify-center gap-2 shadow-md active:scale-98"
                  type="button"
                  onClick={handleApplyClick}
                >
                  <Icon className="material-symbols-outlined text-[20px]">how_to_reg</Icon>
                  <span>Mulai Pengajuan Online</span>
                </button>
                <button
                  onClick={onBack}
                  className="w-full py-2.5 px-4 rounded-xl bg-surface-container text-primary font-label-lg text-xs sm:text-sm font-semibold hover:bg-surface-container-high transition-colors flex items-center justify-center gap-1.5"
                  type="button"
                >
                  <Icon className="material-symbols-outlined text-[16px]">arrow_back</Icon>
                  <span>Kembali ke Direktori Layanan</span>
                </button>
                <button
                  className="w-full py-2.5 px-4 rounded-xl bg-surface-container-low text-on-surface font-label-lg text-xs font-semibold hover:bg-surface-container transition-colors flex items-center justify-center gap-2 border border-surface-container-high/40"
                  type="button"
                >
                  <Icon className="material-symbols-outlined text-[18px]">bed</Icon>
                  <span>Cek Ketersediaan Bed RSUD (Live)</span>
                </button>
              </div>
              <div className="pt-2 pl-2 flex items-center gap-2 text-on-surface-variant font-label-md text-[11px] border-t border-surface-container">
                <Icon className="material-symbols-outlined text-[16px] text-tertiary">security</Icon>
                <span>Terintegrasi BPJS PCare &amp; Satu Sehat Kemenkes</span>
              </div>
            </div>

            {/* Widget Statistik Kinerja Faskes Bulan Ini */}
            <div className="rounded-2xl bg-surface-container-lowest p-6 shadow-sm border border-surface-container-high/80 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                  <span className="font-title-md text-base font-bold text-primary">Statistik Kinerja Faskes</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-secondary-container/40 text-on-secondary-container font-label-md text-[11px] font-semibold">
                  Bulan Ini
                </span>
              </div>
              <div className="flex flex-col gap-2.5">
                <div className="p-3 rounded-xl bg-surface-container-low flex items-center justify-between border border-surface-container-high/40">
                  <div className="flex items-center gap-2.5">
                    <span className="w-9 h-9 rounded-lg bg-surface-container-lowest text-primary flex items-center justify-center shadow-xs">
                      <Icon className="material-symbols-outlined text-[20px]">groups</Icon>
                    </span>
                    <div className="flex flex-col">
                      <span className="font-body-sm text-[11px] text-on-surface-variant">Pasien Terlayani</span>
                      <span className="font-stat-numeral text-base font-bold text-primary">42.850 Pasien</span>
                    </div>
                  </div>
                  <Icon className="material-symbols-outlined text-secondary text-[18px]">trending_up</Icon>
                </div>

                <div className="p-3 rounded-xl bg-surface-container-low flex items-center justify-between border border-surface-container-high/40">
                  <div className="flex items-center gap-2.5">
                    <span className="w-9 h-9 rounded-lg bg-surface-container-lowest text-tertiary flex items-center justify-center shadow-xs">
                      <Icon className="material-symbols-outlined text-[20px]">thumb_up</Icon>
                    </span>
                    <div className="flex flex-col">
                      <span className="font-body-sm text-[11px] text-on-surface-variant">Tingkat Kepuasan (IKM)</span>
                      <span className="font-stat-numeral text-base font-bold text-primary">98,6%</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-tertiary-fixed/30 text-on-tertiary-fixed font-label-md text-[11px] font-bold">
                    Sangat Baik
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-surface-container-low flex items-center justify-between border border-surface-container-high/40">
                  <div className="flex items-center gap-2.5">
                    <span className="w-9 h-9 rounded-lg bg-surface-container-lowest text-secondary flex items-center justify-center shadow-xs">
                      <Icon className="material-symbols-outlined text-[20px]">pace</Icon>
                    </span>
                    <div className="flex flex-col">
                      <span className="font-body-sm text-[11px] text-on-surface-variant">Rata-rata Waktu Tunggu</span>
                      <span className="font-stat-numeral text-base font-bold text-primary">12 Menit</span>
                    </div>
                  </div>
                  <Icon className="material-symbols-outlined text-secondary text-[18px]">check_circle</Icon>
                </div>
              </div>
            </div>

            {/* Pusat Bantuan & Konsultasi Medis Dinkes */}
            <div className="rounded-2xl bg-surface-container-lowest p-6 shadow-sm border border-surface-container-high/80 flex flex-col gap-3">
              <div className="flex items-center gap-2.5">
                <span className="w-9 h-9 rounded-lg bg-primary-container text-secondary-fixed flex items-center justify-center">
                  <Icon className="material-symbols-outlined text-[20px]">support_agent</Icon>
                </span>
                <div className="flex flex-col">
                  <h3 className="font-title-md text-base font-bold text-primary">Pusat Bantuan Dinkes</h3>
                  <span className="font-body-sm text-[11px] text-on-surface-variant">Layanan Informasi Dinkes Sidoarjo</span>
                </div>
              </div>
              <div className="rounded-xl bg-surface-container-low p-3.5 flex flex-col gap-1 border border-surface-container-high/40">
                <span className="font-label-md text-[11px] text-on-surface-variant font-semibold">
                  WHATSAPP HELPDESK FASKES SIDOARJO
                </span>
                <div className="flex items-center justify-between">
                  <span className="font-title-md text-base text-secondary font-bold">0811-3000-1199</span>
                  <span className="px-2 py-0.5 rounded bg-secondary-container/40 text-on-secondary-container font-label-md text-[10px] font-semibold">
                    Fast Response
                  </span>
                </div>
                <span className="font-body-sm text-[11px] text-on-surface-variant">
                  Setiap hari kerja (07.30 - 15.30 WIB)
                </span>
              </div>
              <div className="flex flex-col gap-2 pt-1 text-xs">
                <div className="flex items-start gap-2 text-on-surface-variant">
                  <Icon className="material-symbols-outlined text-primary text-[18px] mt-0.5 shrink-0">domain</Icon>
                  <div>
                    <strong className="text-on-surface font-semibold">Dinas Kesehatan Sidoarjo</strong>
                    <p className="text-[11px]">Jl. Mayjend Sungkono No. 46, Pucang</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 text-on-surface-variant">
                  <Icon className="material-symbols-outlined text-primary text-[18px] mt-0.5 shrink-0">storefront</Icon>
                  <div>
                    <strong className="text-on-surface font-semibold">Mall Pelayanan Publik (MPP)</strong>
                    <p className="text-[11px]">Loket 17-18 Dinkes Sidoarjo, Jl. Lingkar Timur</p>
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

export default FaskesServicePage;
