import { Icon } from '../../components/common/Icon';
import React from 'react';

export interface DtksServicePageProps {
  onBack?: () => void;
  onApply?: () => void;
}

export const DtksServicePage: React.FC<DtksServicePageProps> = ({
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
      {/* Top Breadcrumbs & Kemensos Integration Pill */}
      <section className="w-full bg-surface-container-low py-4 border-b border-surface-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 font-label-md text-label-md text-on-surface-variant flex-wrap">
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
            <span className="text-primary font-semibold">Pendaftaran DTKS (Dinas Sosial)</span>
          </nav>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/40 text-on-secondary-container font-label-md text-xs font-semibold self-start sm:self-auto shadow-sm">
            <Icon className="material-symbols-outlined text-[16px] text-secondary">verified_user</Icon>
            <span>Terintegrasi SIKS-NG Kemensos RI</span>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10 flex flex-col gap-8">
        {/* Header Section: Title & Subtitle */}
        <div className="bg-surface-container-lowest rounded-2xl p-6 sm:p-8 shadow-sm border border-surface-container-high/60 relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-primary-fixed/30 pointer-events-none blur-3xl"></div>
          <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-surface-container font-label-md text-xs text-secondary font-bold uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              Kesejahteraan Sosial &amp; Perlindungan Warga
            </div>
            <h1 className="font-headline-lg text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary tracking-tight mb-3">
              Pendaftaran Data Terpadu Kesejahteraan Sosial (DTKS)
            </h1>
            <p className="font-body-md text-base sm:text-lg text-on-surface-variant leading-relaxed">
              Layanan usulan pendaftaran keluarga prasejahtera Kabupaten Sidoarjo ke dalam basis data terpadu untuk penyaluran bantuan sosial (PKH, BPNT/Sembako, PBI JK APBD/APBN, dan PIP).
            </p>
          </div>
        </div>

        {/* 4 KPI Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-surface-container-high/60 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="font-label-md text-xs font-semibold text-on-surface-variant">Tarif Retribusi</span>
              <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-secondary">
                <Icon className="material-symbols-outlined text-[20px]">payments</Icon>
              </div>
            </div>
            <div>
              <div className="font-stat-numeral text-2xl font-extrabold text-primary mb-1">Rp 0</div>
              <div className="font-body-sm text-xs text-secondary font-semibold flex items-center gap-1">
                <Icon className="material-symbols-outlined text-[14px]">check_circle</Icon>
                <span>Gratis / 100% Ditanggung APBD</span>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-surface-container-high/60 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="font-label-md text-xs font-semibold text-on-surface-variant">Standar SLA Waktu</span>
              <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-secondary">
                <Icon className="material-symbols-outlined text-[20px]">schedule</Icon>
              </div>
            </div>
            <div>
              <div className="font-stat-numeral text-2xl font-extrabold text-primary mb-1">14-30 Hari</div>
              <div className="font-body-sm text-xs text-on-surface-variant">
                Siklus Musdes/Kel &amp; Verivali Bulanan
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-surface-container-high/60 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="font-label-md text-xs font-semibold text-on-surface-variant">Kanal Pengurusan</span>
              <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-secondary">
                <Icon className="material-symbols-outlined text-[20px]">hub</Icon>
              </div>
            </div>
            <div>
              <div className="font-headline-sm text-lg font-bold text-primary mb-1">Daring &amp; Musdes</div>
              <div className="font-body-sm text-xs text-on-surface-variant truncate">
                Aplikasi Cek Bansos &amp; Desa/Kelurahan
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-surface-container-high/60 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="font-label-md text-xs font-semibold text-on-surface-variant">Instansi Pembina</span>
              <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-secondary">
                <Icon className="material-symbols-outlined text-[20px]">account_balance</Icon>
              </div>
            </div>
            <div>
              <div className="font-title-md text-base font-bold text-primary mb-1 truncate">Dinsos Sidoarjo</div>
              <div className="font-body-sm text-xs text-on-surface-variant truncate">
                Didukung Pusdatin Kemensos &amp; Pendamping
              </div>
            </div>
          </div>
        </div>

        {/* Main Two-Column Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Primary Left Column (7 of 12) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* 1. Kriteria & Persyaratan Dokumen */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 sm:p-7 shadow-sm border border-surface-container-high/60">
              <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary-container text-secondary-fixed flex items-center justify-center">
                    <Icon className="material-symbols-outlined text-[20px]">fact_check</Icon>
                  </div>
                  <h2 className="font-title-md text-base sm:text-lg text-primary font-bold">
                    Kriteria &amp; Persyaratan Dokumen
                  </h2>
                </div>
                <span className="font-label-md text-xs text-on-surface-variant bg-surface-container px-2.5 py-1 rounded font-semibold">
                  4 Berkas Wajib
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-4 rounded-xl bg-surface-container-low/70 flex items-start gap-3 border border-surface-container-high/40">
                  <span className="font-headline-sm text-lg text-secondary font-black opacity-80 leading-none">01</span>
                  <div>
                    <h3 className="font-label-lg text-xs sm:text-sm text-primary font-bold leading-snug">
                      KTP-el &amp; Kartu Keluarga (KK)
                    </h3>
                    <p className="font-body-sm text-xs text-on-surface-variant mt-1 leading-relaxed">
                      Status aktif terverifikasi dan padan database Disdukcapil Kabupaten Sidoarjo.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-surface-container-low/70 flex items-start gap-3 border border-surface-container-high/40">
                  <span className="font-headline-sm text-lg text-secondary font-black opacity-80 leading-none">02</span>
                  <div>
                    <h3 className="font-label-lg text-xs sm:text-sm text-primary font-bold leading-snug">
                      Surat Pengantar RT/RW
                    </h3>
                    <p className="font-body-sm text-xs text-on-surface-variant mt-1 leading-relaxed">
                      Keterangan Tidak Mampu (SKTM) resmi berstempel basah dari pengurus rukun warga.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-surface-container-low/70 flex items-start gap-3 border border-surface-container-high/40">
                  <span className="font-headline-sm text-lg text-secondary font-black opacity-80 leading-none">03</span>
                  <div>
                    <h3 className="font-label-lg text-xs sm:text-sm text-primary font-bold leading-snug">
                      Foto Hunian Lengkap
                    </h3>
                    <p className="font-body-sm text-xs text-on-surface-variant mt-1 leading-relaxed">
                      Tampak depan menyeluruh, kondisi atap, material lantai, dan dinding rumah.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-surface-container-low/70 flex items-start gap-3 border border-surface-container-high/40">
                  <span className="font-headline-sm text-lg text-secondary font-black opacity-80 leading-none">04</span>
                  <div>
                    <h3 className="font-label-lg text-xs sm:text-sm text-primary font-bold leading-snug">
                      Titik Geotag Domisili Riil
                    </h3>
                    <p className="font-body-sm text-xs text-on-surface-variant mt-1 leading-relaxed">
                      Koordinat lokasi tempat tinggal faktual di cakupan 18 Kecamatan se-Kabupaten Sidoarjo.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Alur 4 Tahap Ringkas */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 sm:p-7 shadow-sm border border-surface-container-high/60">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary-container text-secondary-fixed flex items-center justify-center">
                    <Icon className="material-symbols-outlined text-[20px]">route</Icon>
                  </div>
                  <h2 className="font-title-md text-base sm:text-lg text-primary font-bold">
                    Alur Pendaftaran &amp; Verifikasi
                  </h2>
                </div>
                <span className="font-label-md text-xs text-secondary font-semibold">
                  SOP Siklus Bulanan
                </span>
              </div>
              <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-surface-container-highest">
                {/* Step 1 */}
                <div className="relative">
                  <div className="absolute -left-6 top-0 w-6 h-6 rounded-full bg-secondary text-white font-label-md text-xs flex items-center justify-center font-bold shadow-sm">
                    1
                  </div>
                  <div className="pl-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-label-lg text-sm text-primary font-bold">Pengajuan Usulan</h3>
                      <span className="font-label-md text-[10px] px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-medium">
                        Tahap Awal
                      </span>
                    </div>
                    <p className="font-body-sm text-xs text-on-surface-variant mt-1 leading-relaxed">
                      Warga mengusulkan secara mandiri lewat fitur Tanggap Cek Bansos Kemensos RI atau membawa berkas ke Musyawarah Desa/Kelurahan setempat.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative">
                  <div className="absolute -left-6 top-0 w-6 h-6 rounded-full bg-secondary text-white font-label-md text-xs flex items-center justify-center font-bold shadow-sm">
                    2
                  </div>
                  <div className="pl-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-label-lg text-sm text-primary font-bold">Verifikasi &amp; Validasi Lapangan</h3>
                      <span className="font-label-md text-[10px] px-2 py-0.5 rounded bg-secondary-container/40 text-on-secondary-container font-semibold">
                        Verivali Dinsos
                      </span>
                    </div>
                    <p className="font-body-sm text-xs text-on-surface-variant mt-1 leading-relaxed">
                      Petugas enumerator Dinsos bersama Pendamping PKH mengecek fakta lapangan, mengambil geotagging kondisi rumah, dan menentukan desil kemiskinan.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative">
                  <div className="absolute -left-6 top-0 w-6 h-6 rounded-full bg-secondary text-white font-label-md text-xs flex items-center justify-center font-bold shadow-sm">
                    3
                  </div>
                  <div className="pl-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-label-lg text-sm text-primary font-bold">Musdes &amp; Pengesahan Kepala Daerah</h3>
                      <span className="font-label-md text-[10px] px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-medium">
                        SK Bupati
                      </span>
                    </div>
                    <p className="font-body-sm text-xs text-on-surface-variant mt-1 leading-relaxed">
                      Hasil pemeringkatan dibahas dalam Berita Acara Musdes/Muskel, kemudian direkapitulasi untuk penerbitan SK Pengesahan Bupati Sidoarjo setiap bulan.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="relative">
                  <div className="absolute -left-6 top-0 w-6 h-6 rounded-full bg-primary-container text-secondary-fixed font-label-md text-xs flex items-center justify-center font-bold shadow-sm">
                    4
                  </div>
                  <div className="pl-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-label-lg text-sm text-primary font-bold">Sinkronisasi SIKS-NG Kemensos</h3>
                      <span className="font-label-md text-[10px] px-2 py-0.5 rounded bg-tertiary-fixed/30 text-on-tertiary-fixed-variant font-semibold">
                        ID DTKS Terbit
                      </span>
                    </div>
                    <p className="font-body-sm text-xs text-on-surface-variant mt-1 leading-relaxed">
                      Pengunggahan data final ke SIKS-NG Kemensos RI pada tanggal 14-26 bulanan. NIK aktif resmi tercatat di pangkalan data penerima program bansos.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Tanya Jawab Pokok (FAQ) */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 sm:p-7 shadow-sm border border-surface-container-high/60">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-lg bg-primary-container text-secondary-fixed flex items-center justify-center">
                  <Icon className="material-symbols-outlined text-[20px]">help_outline</Icon>
                </div>
                <h2 className="font-title-md text-base sm:text-lg text-primary font-bold">
                  Tanya Jawab Pokok (FAQ)
                </h2>
              </div>
              <div className="space-y-3">
                <div className="rounded-xl bg-surface-container-low/60 p-4 border border-surface-container-high/40">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-label-lg text-xs sm:text-sm text-primary font-semibold">
                      Apakah masuk DTKS otomatis langsung menerima bantuan uang tunai (PKH/BPNT)?
                    </h3>
                    <Icon className="material-symbols-outlined text-secondary text-[20px] shrink-0">info</Icon>
                  </div>
                  <p className="font-body-sm text-xs text-on-surface-variant mt-2 leading-relaxed">
                    <strong className="text-primary font-semibold">Tidak otomatis.</strong> DTKS berfungsi sebagai basis data pintu masuk utama (whitelist). Kepesertaan bantuan spesifik (PKH, BPNT, KIS PBI JK, atau PIP) ditentukan oleh kuota nasional dari kementerian terkait serta tingkatan desil kemiskinan warga.
                  </p>
                </div>

                <div className="rounded-xl bg-surface-container-low/60 p-4 border border-surface-container-high/40">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-label-lg text-xs sm:text-sm text-primary font-semibold">
                      Berapa lama proses penetapan masuk ke dalam database DTKS?
                    </h3>
                    <Icon className="material-symbols-outlined text-secondary text-[20px] shrink-0">schedule</Icon>
                  </div>
                  <p className="font-body-sm text-xs text-on-surface-variant mt-2 leading-relaxed">
                    Pemutakhiran dilakukan dalam siklus satu bulan. Seluruh data usulan yang lolos verivali sebelum tanggal 14 akan diproses melalui integrasi SIKS-NG Kemensos dan disahkan pada akhir bulan berjalan.
                  </p>
                </div>

                <div className="rounded-xl bg-surface-container-low/60 p-4 border border-surface-container-high/40">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-label-lg text-xs sm:text-sm text-primary font-semibold">
                      Bagaimana jika data usulan berstatus ditolak saat verifikasi?
                    </h3>
                    <Icon className="material-symbols-outlined text-secondary text-[20px] shrink-0">cached</Icon>
                  </div>
                  <p className="font-body-sm text-xs text-on-surface-variant mt-2 leading-relaxed">
                    Warga dapat mengajukan sanggahan atau usulan pemutakhiran ulang melalui petugas operator SIKS-NG di kantor desa/kelurahan dengan melampirkan bukti perbaikan dokumen dan kondisi ekonomi terbaru.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Right Sidebar (5 of 12) */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-22">
            {/* Card Aksi Utama "Cek & Usulkan DTKS" */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 sm:p-7 shadow-md border border-surface-container-high/80">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary-container text-secondary-fixed flex items-center justify-center">
                  <Icon className="material-symbols-outlined text-[24px]">verified</Icon>
                </div>
                <div>
                  <h2 className="font-title-md text-base font-bold text-primary">Mulai Usulan Bansos</h2>
                  <span className="font-label-md text-xs text-secondary font-semibold">Layanan Mandiri Warga</span>
                </div>
              </div>
              <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant mb-4 leading-relaxed">
                Ajukan usulan mandiri baru, lakukan sanggahan kelayakan, atau cek status kepesertaan DTKS berdasarkan NIK Anda melalui portal resmi terintegrasi.
              </p>
              <div className="space-y-2.5">
                <a
                  className="w-full py-3 px-4 rounded-xl bg-secondary text-white font-label-lg text-sm hover:bg-secondary/90 transition-all flex items-center justify-center gap-2 font-bold shadow-md active:scale-98 text-center"
                  href="https://cekbansos.kemensos.go.id"
                  rel="noopener noreferrer"
                  target="_blank"
                  onClick={handleApplyClick}
                >
                  <span>Mulai Pengajuan Online</span>
                  <Icon className="material-symbols-outlined text-[18px]">open_in_new</Icon>
                </a>
                <button
                  onClick={onBack}
                  className="w-full py-2.5 px-4 rounded-xl bg-surface-container text-primary font-label-lg text-xs sm:text-sm hover:bg-surface-container-high transition-colors flex items-center justify-center gap-1.5 font-semibold text-center"
                >
                  <Icon className="material-symbols-outlined text-[16px]">arrow_back</Icon>
                  <span>Kembali ke Direktori Layanan</span>
                </button>
                <button
                  className="w-full py-2.5 px-4 rounded-xl bg-surface-container-low text-primary-container font-label-lg text-xs hover:bg-surface-container transition-colors flex items-center justify-center gap-1.5 font-semibold border border-surface-container-high/40"
                  type="button"
                >
                  <Icon className="material-symbols-outlined text-[16px] text-secondary">download</Icon>
                  <span>Unduh Formulir Musdes DTKS (PDF)</span>
                </button>
              </div>
              <div className="mt-4 pt-3 flex items-center justify-center gap-2 font-label-md text-[11px] text-on-surface-variant border-t border-surface-container">
                <Icon className="material-symbols-outlined text-[15px] text-secondary">lock</Icon>
                <span>Terintegrasi NIK Dukcapil &amp; SIKS-NG Resmi</span>
              </div>
            </div>

            {/* Card Kapasitas & Kinerja Dinsos Sidoarjo */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-surface-container-high/80">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-title-md text-base font-bold text-primary">Kinerja Layanan Dinsos</h2>
                <span className="font-label-md text-[11px] px-2.5 py-0.5 rounded-full bg-secondary-container/40 text-on-secondary-container font-semibold">
                  Siklus Aktif Bulan Berjalan
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 rounded-xl bg-surface-container-low/70 border border-surface-container-high/40">
                  <div className="font-label-md text-[11px] text-on-surface-variant mb-1">Usulan Terverifikasi</div>
                  <div className="font-stat-numeral text-xl text-primary font-extrabold">4.820 KK</div>
                  <div className="font-body-sm text-[10px] text-secondary font-medium mt-0.5">Terverifikasi Lapangan</div>
                </div>

                <div className="p-3 rounded-xl bg-surface-container-low/70 border border-surface-container-high/40">
                  <div className="font-label-md text-[11px] text-on-surface-variant mb-1">Validitas Data</div>
                  <div className="font-stat-numeral text-xl text-secondary font-extrabold">99.4%</div>
                  <div className="font-body-sm text-[10px] text-on-surface-variant mt-0.5">Padan NIK Dukcapil</div>
                </div>

                <div className="p-3 rounded-xl bg-surface-container-low/70 border border-surface-container-high/40">
                  <div className="font-label-md text-[11px] text-on-surface-variant mb-1">Rerata Verivali</div>
                  <div className="font-stat-numeral text-xl text-primary font-extrabold">18.2 Hari</div>
                  <div className="font-body-sm text-[10px] text-secondary font-medium mt-0.5">Lebih cepat dr target</div>
                </div>

                <div className="p-3 rounded-xl bg-surface-container-low/70 border border-surface-container-high/40">
                  <div className="font-label-md text-[11px] text-on-surface-variant mb-1">Indeks Kepuasan</div>
                  <div className="font-stat-numeral text-xl text-secondary font-extrabold">96.8%</div>
                  <div className="font-body-sm text-[10px] text-on-surface-variant mt-0.5">Sangat Puas (IKM 2025)</div>
                </div>
              </div>

              {/* Mini Progress Visualizer */}
              <div className="p-3.5 rounded-xl bg-surface-container-low/50 border border-surface-container-high/40">
                <div className="flex items-center justify-between font-label-md text-xs mb-1.5">
                  <span className="text-on-surface-variant">Progres Rekapitulasi Usulan Kecamatan</span>
                  <span className="font-bold text-primary">82.4%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
                  <div className="h-full bg-secondary rounded-full" style={{ width: '82.4%' }}></div>
                </div>
                <div className="flex justify-between items-center text-[10px] text-on-surface-variant mt-1.5 font-label-md">
                  <span>Batas Unggah: 26 Bulan Berjalan</span>
                  <span className="font-semibold text-primary">15 dari 18 Kecamatan Final</span>
                </div>
              </div>
            </div>

            {/* Bantuan & Konsultasi Hotline Dinsos */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-surface-container-high/80">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-secondary-container/40 text-secondary flex items-center justify-center">
                  <Icon className="material-symbols-outlined text-[20px]">support_agent</Icon>
                </div>
                <div>
                  <h2 className="font-title-md text-base font-bold text-primary">Bantuan &amp; Konsultasi</h2>
                  <span className="font-label-md text-xs text-on-surface-variant">Kendala NIK &amp; Pengajuan Usulan</span>
                </div>
              </div>
              <p className="font-body-sm text-xs text-on-surface-variant mb-3 leading-relaxed">
                Jika NIK tidak padan Dukcapil atau memerlukan pendampingan musyawarah desa, hubungi kanal resmi Dinsos Sidoarjo:
              </p>
              <div className="space-y-2.5">
                <a
                  className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors flex items-center justify-between border border-surface-container-high/40"
                  href="https://wa.me/6281130003467"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="material-symbols-outlined text-secondary text-[22px]">chat</Icon>
                    <div>
                      <div className="font-label-lg text-xs font-bold text-primary">WhatsApp Helpdesk Dinsos</div>
                      <div className="font-body-sm text-[11px] text-on-surface-variant">0811-3000-DINSOS (Hari Kerja 08.00 - 15.00 WIB)</div>
                    </div>
                  </div>
                  <Icon className="material-symbols-outlined text-[18px] text-outline">chevron_right</Icon>
                </a>
                <div className="p-3 rounded-xl bg-surface-container-low flex items-start gap-2.5 border border-surface-container-high/40 text-xs">
                  <Icon className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">location_on</Icon>
                  <div>
                    <div className="font-label-lg font-bold text-primary">Loket Pelayanan Langsung</div>
                    <div className="font-body-sm text-[11px] text-on-surface-variant mt-0.5 leading-snug">
                      • Mal Pelayanan Publik (MPP) Sidoarjo, Lt. 1<br />
                      • Kantor Dinsos Kab. Sidoarjo: Jl. Pahlawan No. 5
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

export default DtksServicePage;
