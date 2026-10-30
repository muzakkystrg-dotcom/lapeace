import React from 'react';
import { X, BookOpen, CheckCircle2, UserCheck, FileSearch, DownloadCloud, ArrowRight } from 'lucide-react';

interface ServiceGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenRegister: () => void;
}

export const ServiceGuideModal: React.FC<ServiceGuideModalProps> = ({
  isOpen,
  onClose,
  onOpenRegister,
}) => {
  if (!isOpen) return null;

  const steps = [
    {
      step: '01',
      title: 'Pendaftaran & Verifikasi NIK Sidoarjo',
      description: 'Cukup masukkan 16 digit NIK Anda. Sistem SITAPAK akan otomatis mencocokkan data identitas dengan server Dispendukcapil Sidoarjo secara aman.',
      icon: UserCheck,
    },
    {
      step: '02',
      title: 'Pilih Layanan & Unggah Berkas Persyaratan',
      description: 'Pilih kebutuhan Anda: urus KTP/KK di Plavon Dukcapil, ajukan surat pengantar di SIPRAJA, atau sampaikan keluhan fasilitas jalan di Lapor 112.',
      icon: FileSearch,
    },
    {
      step: '03',
      title: 'Pantau Real-Time & Unduh Dokumen Ber-TTE',
      description: 'Dapatkan nomor registrasi berkas (misal: REG-SDA-2025-08912). Saat disetujui Camat/Kadis, dokumen PDF ber-barcode BSrE BSSN siap diunduh atau dikirim kurir.',
      icon: DownloadCloud,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-emerald-900/10 overflow-hidden relative my-8 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="bg-[#083C2E] px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
              <BookOpen className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <div className="text-[11px] font-semibold text-emerald-300 uppercase tracking-wider">
                PANDUAN WARGA
              </div>
              <h3 className="font-display font-bold text-xl leading-tight">
                Tata Cara Akses Satu Akun Warga SITAPAK
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-300/80 hover:text-white hover:bg-emerald-900/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <p className="text-slate-600 text-sm leading-relaxed">
            SITAPAK menyatukan seluruh kanal birokrasi Kabupaten Sidoarjo sehingga warga tidak perlu lagi mengantre dari pagi atau berpindah-pindah aplikasi.
          </p>

          <div className="space-y-4">
            {steps.map((st, i) => {
              const Icon = st.icon;
              return (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-display font-bold shrink-0">
                    <Icon className="w-5 h-5 text-emerald-800" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                        Langkah {st.step}
                      </span>
                    </div>
                    <h4 className="font-display font-bold text-slate-900 text-base mt-0.5">
                      {st.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                      {st.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
            <span className="font-bold">Butuh Bantuan Langsung? </span>
            Hubungi Call Center Bebas Pulsa 112 Sidoarjo Siaga atau kunjungi Mal Pelayanan Publik (MPP) Jl. Lingkar Timur Sidoarjo.
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-800"
          >
            Tutup
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenRegister();
            }}
            className="px-5 py-2.5 bg-[#038D66] hover:bg-[#026E4F] text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer active:scale-98"
          >
            <span>Daftar Akun Sekarang</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
