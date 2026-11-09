import React from 'react';
import { X, Building2, Clock, MapPin, Phone, ShieldCheck, ExternalLink } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-emerald-900/10 overflow-hidden relative my-8 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="bg-[#083C2E] px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
              <Building2 className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <div className="text-[11px] font-semibold text-emerald-300 uppercase tracking-wider">
                PORTAL RESMI PEMKAB SIDOARJO
              </div>
              <h3 className="font-display font-bold text-xl leading-tight">
                Tentang Portal SITAPAK
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-300/80 hover:text-white hover:bg-emerald-900/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          <div>
            <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-2">
              Sistem Informasi Terpadu Administrasi Pelayanan & Keterbukaan Publik
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              SITAPAK merupakan portal digital resmi Pemerintah Kabupaten Sidoarjo yang mengintegrasikan layanan administrasi kependudukan (Plavon Dukcapil), perizinan berusaha dan non-berusaha (SIPRAJA), pelaporan pengaduan kedaruratan (Call Center 112), serta keterbukaan alokasi anggaran APBD secara transparan bagi seluruh warga di 18 kecamatan.
            </p>
          </div>

          {/* Lokasi & Fasilitas Fisik */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs uppercase mb-1.5">
                  <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Mal Pelayanan Publik (MPP)</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Jl. Lingkar Timur, Dusun Prasung, Kec. Buduran, Kabupaten Sidoarjo, Jawa Timur 61252
                </p>
              </div>
              <span className="text-[11px] text-emerald-800 font-medium mt-3 block">
                Melayani 100+ gerai instansi daerah & kementerian
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase mb-1.5">
                  <Building2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Kantor Bupati & Sekretariat</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Jl. Gubernur Suryo No. 1, Sidokumpul, Kec. Sidoarjo, Kabupaten Sidoarjo, Jawa Timur 61218
                </p>
              </div>
              <span className="text-[11px] text-slate-600 font-medium mt-3 block">
                Pusat Tata Kelola Pemerintahan Daerah
              </span>
            </div>
          </div>

          {/* Jam Operasional */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <h5 className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase mb-3">
              <Clock className="w-4 h-4 text-emerald-700" />
              <span>Jam Operasional Pelayanan</span>
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <div className="text-slate-500 font-medium">Senin - Kamis</div>
                <div className="text-slate-900 font-bold mt-0.5">08:00 - 15:30 WIB</div>
              </div>
              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <div className="text-slate-500 font-medium">Jumat</div>
                <div className="text-slate-900 font-bold mt-0.5">08:00 - 14:30 WIB</div>
              </div>
              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <div className="text-slate-500 font-medium">Layanan 112</div>
                <div className="text-emerald-700 font-bold mt-0.5">24 Jam Non-Stop</div>
              </div>
            </div>
          </div>

          {/* Nilai Layanan */}
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-emerald-50 text-xs text-emerald-900 border border-emerald-100">
            <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
            <span className="leading-relaxed">
              Pelayanan publik Pemkab Sidoarjo bebas pungutan liar (zero pungli), non-diskriminatif, dan mengedepankan kemudahan akses bagi seluruh lapisan masyarakat.
            </span>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#038D66] hover:bg-[#026E4F] text-white font-semibold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
