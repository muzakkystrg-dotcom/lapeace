import { Icon } from '../../components/common/Icon';
import React from 'react';

export interface NibServicePageProps {
  onBack?: () => void;
  onApply?: () => void;
}

export const NibServicePage: React.FC<NibServicePageProps> = ({
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
    <div className="w-full bg-[#F8FAF9] text-on-surface">
      {/* Top Progress / Real-time Bar */}
      <div className="w-full bg-surface-container-high text-on-surface-variant py-3 px-4 sm:px-6 lg:px-8 border-b border-surface-container">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 font-label-md text-xs sm:text-sm">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={onBack}
              className="hover:text-secondary transition-colors flex items-center gap-1 font-semibold text-secondary"
            >
              <Icon className="material-symbols-outlined text-[18px]">arrow_back</Icon>
              <span>Kembali ke Direktori Layanan</span>
            </button>
            <Icon className="material-symbols-outlined text-[14px] text-outline">chevron_right</Icon>
            <a href="#beranda" className="hover:text-primary transition-colors">Beranda</a>
            <Icon className="material-symbols-outlined text-[14px] text-outline">chevron_right</Icon>
            <button onClick={onBack} className="hover:text-primary transition-colors">Direktori Layanan</button>
            <Icon className="material-symbols-outlined text-[14px] text-outline">chevron_right</Icon>
            <span className="text-primary font-semibold">Penerbitan NIB &amp; Izin Usaha (OSS-RBA)</span>
          </div>
          <div className="flex items-center gap-2 text-secondary font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
            </span>
            <span>Layanan Mandiri 24 Jam • Terintegrasi OSS-RBA Kementerian Investasi/BKPM RI</span>
          </div>
        </div>
      </div>

      {/* Main Content Wrap */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        {/* Header Block: Title & Official Accreditation Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-8">
          {/* Title & Context (8 Columns) */}
          <div className="lg:col-span-8 flex flex-col justify-between gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-secondary-fixed/50 text-on-secondary-fixed-variant font-label-md text-xs font-bold uppercase tracking-wider">
                  PERIZINAN BERUSAHA &amp; PENANAMAN MODAL
                </span>
                <span className="px-2.5 py-1 rounded bg-surface-container-highest text-primary font-label-md text-xs font-semibold tracking-wide">
                  DPMPTSP KABUPATEN SIDOARJO
                </span>
              </div>
              <h1 className="font-headline-lg text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary-container tracking-tight leading-tight">
                Penerbitan Nomor Induk Berusaha (NIB) &amp; Izin Usaha Daring (OSS-RBA)
              </h1>
              <p className="font-body-lg text-base sm:text-lg text-on-surface-variant max-w-3xl leading-relaxed">
                Fasilitasi penerbitan legalitas berusaha mandiri bagi pelaku UMK risiko rendah, menengah, hingga pendampingan izin lingkungan dan persetujuan gedung terpadu di Sidoarjo tanpa calo dan bebas biaya.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs sm:text-sm text-on-surface-variant">
              <div className="flex items-center gap-1.5 font-medium">
                <Icon className="material-symbols-outlined text-[18px] text-secondary">verified_user</Icon>
                <span>Dasar Hukum: PP No. 5 Tahun 2021</span>
              </div>
              <span className="text-outline-variant">•</span>
              <div className="flex items-center gap-1.5 font-medium">
                <Icon className="material-symbols-outlined text-[18px] text-secondary">domain</Icon>
                <span>Kewenangan: Sektor Perizinan Tunggal Sidoarjo</span>
              </div>
              <span className="text-outline-variant">•</span>
              <div className="flex items-center gap-1.5 font-bold text-tertiary">
                <Icon className="material-symbols-outlined text-[18px]">workspace_premium</Icon>
                <span>Layanan Prioritas UMKM Juara</span>
              </div>
            </div>
          </div>

          {/* Right Accreditation Box (4 Columns) */}
          <div className="lg:col-span-4 rounded-2xl bg-primary-container text-on-primary p-6 flex flex-col justify-between shadow-lg relative overflow-hidden border border-secondary/30">
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-secondary/15 rounded-full blur-2xl pointer-events-none"></div>
            <div className="flex flex-col gap-3 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-surface-container-lowest/10 flex items-center justify-center text-secondary-fixed">
                <Icon className="material-symbols-outlined text-[28px]">verified</Icon>
              </div>
              <div className="flex flex-col">
                <span className="font-label-md text-[11px] uppercase tracking-wider text-secondary-fixed font-bold">
                  AKREDITASI &amp; INTEGRASI DIGITAL RESMI
                </span>
                <span className="font-title-md text-base sm:text-lg font-bold text-on-primary leading-tight mt-0.5">
                  SISTEM OSS-RBA BKPM &amp; KEMENKOP UMKM
                </span>
              </div>
              <p className="font-body-sm text-xs text-primary-fixed-dim leading-relaxed">
                Tersertifikasi Keamanan Data Berusaha Nasional sesuai Peraturan Pemerintah No. 5 Tahun 2021 &amp; Standar BSSN.
              </p>
            </div>
            <div className="pt-4 border-t border-primary-fixed-dim/20 flex items-center justify-between font-label-md text-[11px] text-secondary-fixed relative z-10">
              <span className="flex items-center gap-1 font-medium">
                <Icon className="material-symbols-outlined text-[14px]">lock</Icon>
                <span>Enkripsi TLS 1.3</span>
              </span>
              <span className="flex items-center gap-1 font-semibold text-tertiary-fixed">
                <Icon className="material-symbols-outlined text-[14px]">history_edu</Icon>
                <span>BSrE Terverifikasi</span>
              </span>
            </div>
          </div>
        </div>

        {/* 4 KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-surface-container-high/60 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="font-label-md text-xs font-semibold text-on-surface-variant">Tarif Retribusi / Biaya</span>
              <div className="w-9 h-9 rounded-lg bg-secondary-fixed/40 text-secondary flex items-center justify-center">
                <Icon className="material-symbols-outlined text-[20px]">payments</Icon>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-stat-numeral text-2xl font-extrabold text-secondary tracking-tight">Rp 0 (Gratis)</span>
              <span className="font-label-md text-xs text-on-surface-variant/80 mt-1">Bebas Pungli / 100% Subsidi APBD &amp; BKPM</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-surface-container-high/60 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="font-label-md text-xs font-semibold text-on-surface-variant">Standar SLA Waktu</span>
              <div className="w-9 h-9 rounded-lg bg-tertiary-fixed/40 text-tertiary flex items-center justify-center">
                <Icon className="material-symbols-outlined text-[20px]">bolt</Icon>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-stat-numeral text-2xl font-extrabold text-primary-container tracking-tight">Instan – 1 Hari</span>
              <span className="font-label-md text-xs text-on-surface-variant/80 mt-1">NIB Risiko Rendah Terbit Langsung (Real-Time)</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-surface-container-high/60 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="font-label-md text-xs font-semibold text-on-surface-variant">Kanal Pengurusan</span>
              <div className="w-9 h-9 rounded-lg bg-surface-container-highest text-primary flex items-center justify-center">
                <Icon className="material-symbols-outlined text-[20px]">language</Icon>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-stat-numeral text-2xl font-extrabold text-primary-container tracking-tight">100% Online</span>
              <span className="font-label-md text-xs text-on-surface-variant/80 mt-1">Portal SITAPAK &amp; OSS-RBA Nasional</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-surface-container-high/60 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="font-label-md text-xs font-semibold text-on-surface-variant">Instansi Pembina</span>
              <div className="w-9 h-9 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center">
                <Icon className="material-symbols-outlined text-[20px]">assured_workload</Icon>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-stat-numeral text-xl font-extrabold text-primary-container tracking-tight">DPMPTSP Sidoarjo</span>
              <span className="font-label-md text-xs text-on-surface-variant/80 mt-1">Klinik LKPM &amp; Pendampingan 18 Kecamatan</span>
            </div>
          </div>
        </div>

        {/* Main Grid: 8 Cols Content + 4 Cols Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (8 Columns) */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {/* Section: Kelengkapan Berkas & Persyaratan (Numbered 4 Cards) */}
            <section className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className="material-symbols-outlined text-[24px] text-secondary">checklist</Icon>
                  <h2 className="font-headline-md text-xl font-bold text-primary-container">
                    Kelengkapan Berkas &amp; Persyaratan Pelaku Usaha
                  </h2>
                </div>
                <span className="px-2.5 py-1 rounded bg-secondary-fixed/50 text-on-secondary-fixed-variant font-label-md text-xs font-bold">
                  4 Syarat Valid
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Requirement 1 */}
                <div className="bg-surface-container-lowest rounded-xl p-5 border border-surface-container-high/60 shadow-sm flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary-container text-on-primary font-bold text-sm flex items-center justify-center shrink-0">
                    01
                  </div>
                  <div className="flex flex-col">
                    <span className="font-title-md text-sm font-bold text-on-surface leading-snug">
                      Nomor Induk Kependudukan (NIK) Pemilik / KTP-el
                    </span>
                    <p className="font-body-sm text-xs text-on-surface-variant mt-1 leading-relaxed">
                      Tervalidasi langsung dengan Ditjen Dukcapil &amp; database kependudukan SIPD Sidoarjo untuk kepemilikan WNI.
                    </p>
                    <div className="flex items-center gap-1 mt-2 text-secondary font-label-md text-[11px] font-semibold">
                      <Icon className="material-symbols-outlined text-[15px]">check_circle</Icon>
                      <span>Verifikasi KTP-el Otomatis</span>
                    </div>
                  </div>
                </div>

                {/* Requirement 2 */}
                <div className="bg-surface-container-lowest rounded-xl p-5 border border-surface-container-high/60 shadow-sm flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary-container text-on-primary font-bold text-sm flex items-center justify-center shrink-0">
                    02
                  </div>
                  <div className="flex flex-col">
                    <span className="font-title-md text-sm font-bold text-on-surface leading-snug">
                      Nomor Pokok Wajib Pajak (NPWP) Aktif
                    </span>
                    <p className="font-body-sm text-xs text-on-surface-variant mt-1 leading-relaxed">
                      Terhubung integrasi Konfirmasi Status Wajib Pajak (KSWP) Ditjen Pajak secara real-time tanpa berkas fisik.
                    </p>
                    <div className="flex items-center gap-1 mt-2 text-secondary font-label-md text-[11px] font-semibold">
                      <Icon className="material-symbols-outlined text-[15px]">sync_saved_locally</Icon>
                      <span>Validasi KSWP Ditjen Pajak</span>
                    </div>
                  </div>
                </div>

                {/* Requirement 3 */}
                <div className="bg-surface-container-lowest rounded-xl p-5 border border-surface-container-high/60 shadow-sm flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary-container text-on-primary font-bold text-sm flex items-center justify-center shrink-0">
                    03
                  </div>
                  <div className="flex flex-col">
                    <span className="font-title-md text-sm font-bold text-on-surface leading-snug">
                      Rencana Titik Lokasi Usaha &amp; Koordinat GPS
                    </span>
                    <p className="font-body-sm text-xs text-on-surface-variant mt-1 leading-relaxed">
                      Terverifikasi kesesuaian tata ruang daerah (KKPR Daring &amp; RTRW Sidoarjo) melalui penarikan poligon koordinat.
                    </p>
                    <div className="flex items-center gap-1 mt-2 text-secondary font-label-md text-[11px] font-semibold">
                      <Icon className="material-symbols-outlined text-[15px]">pin_drop</Icon>
                      <span>Integrasi RTRW Sidoarjo</span>
                    </div>
                  </div>
                </div>

                {/* Requirement 4 */}
                <div className="bg-surface-container-lowest rounded-xl p-5 border border-surface-container-high/60 shadow-sm flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary-container text-on-primary font-bold text-sm flex items-center justify-center shrink-0">
                    04
                  </div>
                  <div className="flex flex-col">
                    <span className="font-title-md text-sm font-bold text-on-surface leading-snug">
                      Data Usaha &amp; Pilihan Kode KBLI 2020
                    </span>
                    <p className="font-body-sm text-xs text-on-surface-variant mt-1 leading-relaxed">
                      Pilihan kode 5 digit Klasifikasi Baku Lapangan Usaha Indonesia sesuai profil kegiatan komersial Anda.
                    </p>
                    <div className="flex items-center gap-1 mt-2 text-secondary font-label-md text-[11px] font-semibold">
                      <Icon className="material-symbols-outlined text-[15px]">category</Icon>
                      <span>Katalog KBLI Terupdate</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section: Tahapan Pengurusan Mandiri NIB (4 Steps Flow) */}
            <section className="flex flex-col gap-4">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <Icon className="material-symbols-outlined text-[24px] text-secondary">alt_route</Icon>
                  <h2 className="font-headline-md text-xl font-bold text-primary-container">
                    Tahapan Pengurusan Mandiri NIB &amp; Izin Usaha
                  </h2>
                </div>
                <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant mt-1">
                  4 langkah ringkas legalitas usaha resmi tanpa perantara calo
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div className="bg-surface-container-lowest rounded-xl p-4 border border-surface-container-high/60 shadow-sm flex flex-col justify-between">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="font-label-md text-xs font-bold text-secondary">LANGKAH 01</span>
                      <div className="w-7 h-7 rounded bg-surface-container-high text-primary flex items-center justify-center">
                        <Icon className="material-symbols-outlined text-[16px]">person_add</Icon>
                      </div>
                    </div>
                    <h3 className="font-title-md text-sm font-bold text-on-surface leading-snug">
                      Registrasi Akun Hak Akses OSS
                    </h3>
                    <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                      Masukkan NIK dan email aktif penanggung jawab usaha untuk aktivasi akun OSS nasional.
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-surface-container-highest text-secondary font-label-md text-[11px] flex items-center gap-1 font-semibold">
                    <Icon className="material-symbols-outlined text-[14px]">timer</Icon>
                    <span>Durasi: 3 Menit</span>
                  </div>
                </div>

                <div className="bg-surface-container-lowest rounded-xl p-4 border border-surface-container-high/60 shadow-sm flex flex-col justify-between">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="font-label-md text-xs font-bold text-secondary">LANGKAH 02</span>
                      <div className="w-7 h-7 rounded bg-surface-container-high text-primary flex items-center justify-center">
                        <Icon className="material-symbols-outlined text-[16px]">storefront</Icon>
                      </div>
                    </div>
                    <h3 className="font-title-md text-sm font-bold text-on-surface leading-snug">
                      Isi Data Usaha &amp; Pilih KBLI
                    </h3>
                    <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                      Masukkan rincian modal usaha, jumlah tenaga kerja, dan kode KBLI 2020 yang sesuai.
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-surface-container-highest text-secondary font-label-md text-[11px] flex items-center gap-1 font-semibold">
                    <Icon className="material-symbols-outlined text-[14px]">touch_app</Icon>
                    <span>Pencarian Otomatis</span>
                  </div>
                </div>

                <div className="bg-surface-container-lowest rounded-xl p-4 border border-surface-container-high/60 shadow-sm flex flex-col justify-between">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="font-label-md text-xs font-bold text-secondary">LANGKAH 03</span>
                      <div className="w-7 h-7 rounded bg-surface-container-high text-primary flex items-center justify-center">
                        <Icon className="material-symbols-outlined text-[16px]">fact_check</Icon>
                      </div>
                    </div>
                    <h3 className="font-title-md text-sm font-bold text-on-surface leading-snug">
                      Verifikasi KKPR &amp; Pernyataan
                    </h3>
                    <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                      Sistem memeriksa zonasi tata ruang dan menyetujui pernyataan mandiri K3L dan SPPL.
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-surface-container-highest text-secondary font-label-md text-[11px] flex items-center gap-1 font-semibold">
                    <Icon className="material-symbols-outlined text-[14px]">speed</Icon>
                    <span>Otomasi Zonasi</span>
                  </div>
                </div>

                <div className="bg-surface-container-lowest rounded-xl p-4 border border-surface-container-high/60 shadow-sm flex flex-col justify-between">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="font-label-md text-xs font-bold text-secondary">LANGKAH 04</span>
                      <div className="w-7 h-7 rounded bg-surface-container-high text-primary flex items-center justify-center">
                        <Icon className="material-symbols-outlined text-[16px]">verified</Icon>
                      </div>
                    </div>
                    <h3 className="font-title-md text-sm font-bold text-on-surface leading-snug">
                      Unduh NIB &amp; Sertifikat Standar
                    </h3>
                    <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                      Dokumen NIB dengan QR Code TTE resmi terbit instan dan langsung tersimpan di akun SITAPAK.
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-surface-container-highest text-secondary font-label-md text-[11px] flex items-center gap-1 font-semibold">
                    <Icon className="material-symbols-outlined text-[14px]">download_for_offline</Icon>
                    <span>Format PDF Sah</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Banner Fasilitas & Pendampingan UMKM */}
            <div className="rounded-2xl bg-gradient-to-r from-primary-container via-primary to-primary-container text-on-primary p-6 shadow-md flex flex-col md:flex-row items-center justify-between gap-4 relative overflow-hidden">
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center shrink-0 shadow">
                  <Icon className="material-symbols-outlined text-[32px]">support_agent</Icon>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-headline-sm text-base sm:text-lg font-bold text-on-primary">
                      Klinik Layanan Investasi &amp; Pendampingan NIB Gratis Sidoarjo
                    </span>
                    <span className="px-2 py-0.5 rounded bg-secondary text-white font-label-md text-[10px] uppercase font-bold tracking-wider">
                      GRATIS
                    </span>
                  </div>
                  <p className="font-body-sm text-xs text-primary-fixed-dim mt-1 max-w-xl">
                    Butuh pendampingan pembuatan NIB bagi lansia atau pelaku usaha mikro pelosok desa? Dapatkan fasilitasi tatap muka gratis oleh fasilitator DPMPTSP.
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2.5 shrink-0 w-full md:w-auto relative z-10">
                <a
                  className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-surface-container-lowest text-primary hover:bg-surface-container-low transition-colors font-label-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm"
                  href="tel:081134569900"
                >
                  <Icon className="material-symbols-outlined text-[18px] text-secondary">call</Icon>
                  <span>Hotline: 0811-3456-9900</span>
                </a>
              </div>
            </div>

            {/* Section: Dua Kartu Layanan Unggulan Terpadu */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-surface-container-lowest rounded-xl p-5 border border-surface-container-high/60 shadow-sm flex flex-col justify-between gap-3">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded bg-secondary-fixed/50 text-secondary font-label-md text-xs font-bold">
                      TATA RUANG PRESISI
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-surface-container-high text-primary flex items-center justify-center">
                      <Icon className="material-symbols-outlined text-[20px]">map</Icon>
                    </div>
                  </div>
                  <h3 className="font-headline-sm text-base font-bold text-on-surface">
                    Cek Kesesuaian Tata Ruang (KKPR) Sidoarjo
                  </h3>
                  <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                    Cek peruntukan lahan kegiatan berusaha mandiri di 18 kecamatan sebelum menyewa atau membeli tempat usaha secara mandiri.
                  </p>
                  <div className="p-2.5 rounded-lg bg-surface-container-low flex items-center gap-2 text-on-surface-variant font-label-md text-xs">
                    <Icon className="material-symbols-outlined text-[18px] text-secondary">layers</Icon>
                    <span className="font-semibold text-primary">Indeks Kesesuaian RTRW 99.4% • 18 Kecamatan</span>
                  </div>
                </div>
                <a
                  className="inline-flex items-center justify-between text-secondary hover:text-primary transition-colors font-label-lg text-xs font-bold pt-2 border-t border-surface-container"
                  href="#zonasi"
                >
                  <span>Cek Zonasi Peta RTRW</span>
                  <Icon className="material-symbols-outlined text-[18px]">arrow_forward</Icon>
                </a>
              </div>

              <div className="bg-surface-container-lowest rounded-xl p-5 border border-surface-container-high/60 shadow-sm flex flex-col justify-between gap-3">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded bg-tertiary-fixed/60 text-tertiary font-label-md text-xs font-bold">
                      HILIRISASI UMKM
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-surface-container-high text-primary flex items-center justify-center">
                      <Icon className="material-symbols-outlined text-[20px]">verified</Icon>
                    </div>
                  </div>
                  <h3 className="font-headline-sm text-base font-bold text-on-surface">
                    Fasilitasi Sertifikasi Halal &amp; BPOM UMKM
                  </h3>
                  <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                    Integrasi pendampingan P-IRT Dinkes, Sertifikat Halal BPJPH gratis untuk pemegang NIB resmi Sidoarjo kategori mikro.
                  </p>
                  <div className="p-2.5 rounded-lg bg-surface-container-low flex items-center gap-2 text-on-surface-variant font-label-md text-xs">
                    <Icon className="material-symbols-outlined text-[18px] text-tertiary">workspace_premium</Icon>
                    <span className="font-semibold text-primary">Fasilitasi Aktif: 12.450 UMKM Terdaftar</span>
                  </div>
                </div>
                <a
                  className="inline-flex items-center justify-between text-secondary hover:text-primary transition-colors font-label-lg text-xs font-bold pt-2 border-t border-surface-container"
                  href="#halal"
                >
                  <span>Ajukan Pendampingan Halal</span>
                  <Icon className="material-symbols-outlined text-[18px]">arrow_forward</Icon>
                </a>
              </div>
            </div>

            {/* Section: Tanya Jawab Pokok (FAQ Layanan NIB) */}
            <section className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Icon className="material-symbols-outlined text-[24px] text-secondary">help</Icon>
                <h2 className="font-headline-md text-xl font-bold text-primary-container">
                  Tanya Jawab Pokok (FAQ Layanan NIB)
                </h2>
              </div>
              <div className="flex flex-col gap-3">
                <div className="bg-surface-container-lowest rounded-xl p-4 border border-surface-container-high/60 shadow-sm flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-secondary-fixed/50 text-secondary flex items-center justify-center shrink-0 font-bold text-xs">
                    Q
                  </div>
                  <div className="flex flex-col">
                    <h4 className="font-title-md text-sm font-bold text-on-surface">
                      Apakah NIB berlaku seumur hidup atau perlu diperpanjang?
                    </h4>
                    <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant mt-1.5 leading-relaxed">
                      Ya, NIB berlaku seumur hidup selama pelaku usaha menjalankan kegiatan usahanya sesuai ketentuan peraturan perundang-undangan dan tidak memerlukan perpanjangan tahunan. Pembaruan data hanya dilakukan jika terjadi perubahan permodalan, lokasi, atau penambahan kode KBLI baru.
                    </p>
                  </div>
                </div>
                <div className="bg-surface-container-lowest rounded-xl p-4 border border-surface-container-high/60 shadow-sm flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-secondary-fixed/50 text-secondary flex items-center justify-center shrink-0 font-bold text-xs">
                    Q
                  </div>
                  <div className="flex flex-col">
                    <h4 className="font-title-md text-sm font-bold text-on-surface">
                      Apakah usaha mikro dan kecil (UMK) langsung bisa beroperasi setelah NIB terbit?
                    </h4>
                    <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant mt-1.5 leading-relaxed">
                      Bagi kategori usaha tingkat risiko rendah, NIB berlaku sebagai legalitas tunggal (izin usaha, tanda daftar perusahaan, dan izin edar dasar) sehingga dapat langsung beroperasi seketika tanpa izin tambahan atau verifikasi lapangan lanjutan.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Sidebar (4 Columns) */}
          <aside className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-22">
            {/* Sidebar Card 1: Aksi Mandiri Warga */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 border border-surface-container-high/80 shadow-md flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-secondary-fixed/50 text-secondary flex items-center justify-center">
                  <Icon className="material-symbols-outlined text-[20px]">play_circle</Icon>
                </div>
                <div className="flex flex-col">
                  <h3 className="font-title-md text-base font-bold text-primary-container leading-tight">
                    Aksi Mandiri Warga
                  </h3>
                  <span className="font-label-md text-xs text-on-surface-variant">Portal Perizinan Cepat</span>
                </div>
              </div>
              <div className="flex flex-col gap-2.5">
                <a
                  className="w-full py-3 px-4 rounded-xl bg-secondary hover:bg-secondary/90 text-white transition-all font-label-lg text-sm font-bold flex items-center justify-center gap-2 shadow-md text-center"
                  href="https://oss.go.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleApplyClick}
                >
                  <span>Mulai Pengajuan Online</span>
                  <Icon className="material-symbols-outlined text-[18px]">open_in_new</Icon>
                </a>
                <button
                  onClick={onBack}
                  className="w-full py-2.5 px-4 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary transition-colors font-label-lg text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 text-center"
                >
                  <Icon className="material-symbols-outlined text-[16px]">arrow_back</Icon>
                  <span>Kembali ke Direktori Layanan</span>
                </button>
                <a
                  className="w-full py-2 px-3 text-center text-xs text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center gap-1"
                  href="https://oss.go.id"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="material-symbols-outlined text-[16px]">search</Icon>
                  <span>Cek Status Permohonan NIB</span>
                </a>
              </div>
              <div className="flex items-center gap-2 pt-1 text-on-surface-variant font-label-md text-[11px]">
                <Icon className="material-symbols-outlined text-[15px] text-secondary">cloud_done</Icon>
                <span>Terhubung Sistem OSS-RBA Nasional &amp; BKPM RI</span>
              </div>
            </div>

            {/* Sidebar Card 2: Statistik Realisasi NIB Sidoarjo */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 border border-surface-container-high/80 shadow-sm flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className="material-symbols-outlined text-[20px] text-secondary">query_stats</Icon>
                  <h3 className="font-title-md text-base font-bold text-primary-container">
                    Statistik Realisasi NIB
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-md text-[11px] font-semibold">
                  Bulan Ini
                </span>
              </div>
              <div className="flex flex-col gap-3">
                <div className="p-3.5 rounded-xl bg-surface-container-low flex flex-col gap-1 border border-surface-container-high/40">
                  <span className="font-label-md text-xs text-on-surface-variant">NIB Diterbitkan (Sidoarjo)</span>
                  <div className="flex items-center justify-between">
                    <span className="font-stat-numeral text-2xl font-bold text-primary">28.640</span>
                    <span className="flex items-center text-secondary font-label-md text-xs font-bold">
                      <Icon className="material-symbols-outlined text-[16px]">trending_up</Icon> +14.2%
                    </span>
                  </div>
                  <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden mt-1">
                    <div className="bg-secondary h-full rounded-full" style={{ width: '82%' }}></div>
                  </div>
                  <span className="font-label-md text-[11px] text-on-surface-variant/80 mt-0.5">
                    Target Rencana Strategis: 35.000 NIB
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 rounded-lg bg-surface-container-low flex flex-col border border-surface-container-high/40">
                    <span className="font-label-md text-[11px] text-on-surface-variant">Kepuasan Layanan (IKM)</span>
                    <span className="font-headline-sm text-lg font-bold text-primary mt-1">98,8%</span>
                    <span className="font-label-md text-[11px] text-secondary font-semibold">Sangat Baik</span>
                  </div>
                  <div className="p-3 rounded-lg bg-surface-container-low flex flex-col border border-surface-container-high/40">
                    <span className="font-label-md text-[11px] text-on-surface-variant">Rerata Durasi Terbit</span>
                    <span className="font-headline-sm text-lg font-bold text-primary mt-1">15 Menit</span>
                    <span className="font-label-md text-[11px] text-secondary font-semibold">Risiko Rendah</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Card 3: Pusat Bantuan & Konsultasi Perizinan DPMPTSP */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 border border-surface-container-high/80 shadow-sm flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Icon className="material-symbols-outlined text-[20px] text-secondary">contact_support</Icon>
                <h3 className="font-title-md text-base font-bold text-primary-container">
                  Pusat Bantuan DPMPTSP
                </h3>
              </div>
              <div className="flex flex-col gap-2.5 text-xs">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-container-low border border-surface-container-high/40">
                  <Icon className="material-symbols-outlined text-[20px] text-secondary mt-0.5 shrink-0">chat</Icon>
                  <div className="flex flex-col">
                    <span className="font-label-md text-xs font-bold text-on-surface">WhatsApp Helpdesk Resmi</span>
                    <a className="text-secondary hover:underline font-semibold text-xs" href="https://wa.me/6281133445566" target="_blank" rel="noopener noreferrer">
                      0811-3344-5566 (Respon Cepat)
                    </a>
                    <span className="text-on-surface-variant text-[11px]">Senin – Jumat (08.00 - 15.30 WIB)</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 p-2">
                  <Icon className="material-symbols-outlined text-[18px] text-primary mt-0.5 shrink-0">location_on</Icon>
                  <div className="flex flex-col">
                    <span className="font-label-md text-xs font-bold text-on-surface">Kantor Induk DPMPTSP</span>
                    <span className="text-on-surface-variant text-[11px]">Jl. Ksatrian No. 4, Sidokumpul, Sidoarjo</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 p-2">
                  <Icon className="material-symbols-outlined text-[18px] text-primary mt-0.5 shrink-0">store</Icon>
                  <div className="flex flex-col">
                    <span className="font-label-md text-xs font-bold text-on-surface">Mall Pelayanan Publik (MPP)</span>
                    <span className="text-on-surface-variant text-[11px]">Loket 01 - 08 DPMPTSP, Jl. Lingkar Timur</span>
                  </div>
                </div>
              </div>
              <div className="pt-2 text-center border-t border-surface-container">
                <span className="font-label-md text-[11px] text-on-surface-variant/80">
                  Pelayanan Bebas Gratifikasi • Pengaduan Hotline 112
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default NibServicePage;
