import React from 'react';
import { Image, Camera, Hourglass, CheckCircle2, Eye } from 'lucide-react';
import { EvidencePhotoData } from '../types/reportDetail';

interface EvidenceMediaCardProps {
  evidence: EvidencePhotoData;
  onPreviewCitizenPhoto: () => void;
}

export const EvidenceMediaCard: React.FC<EvidenceMediaCardProps> = ({
  evidence,
  onPreviewCitizenPhoto,
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 sm:p-7 border border-emerald-100/90 shadow-sm space-y-5">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#EFFDF4] border border-emerald-200/80 text-emerald-800 flex items-center justify-center shrink-0">
            <Image className="w-5 h-5 text-emerald-700" />
          </div>
          <div>
            <h2 className="font-display font-bold text-lg text-[#15211C]">
              Dokumentasi Penanganan & Bukti Fisik
            </h2>
            <p className="text-xs text-[#5A6862]">
              Komparasi bukti kerusakan warga dengan progres penanganan instansi
            </p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold self-start sm:self-auto shrink-0">
          2 Berkas Foto Terhubung
        </span>
      </div>

      {/* 2-Column Photo Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Foto 1: Bukti Aduan Warga */}
        <div className="rounded-xl border border-slate-200 overflow-hidden bg-slate-50 flex flex-col justify-between">
          <div className="p-3.5 pb-2 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <Camera className="w-3.5 h-3.5 text-emerald-700" />
              <span>{evidence.citizenPhoto.title}</span>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">
              {evidence.citizenPhoto.date}
            </span>
          </div>

          <div className="relative aspect-[16/10] overflow-hidden group cursor-pointer" onClick={onPreviewCitizenPhoto}>
            <img
              src={evidence.citizenPhoto.imageUrl}
              alt="Bukti Aduan Warga"
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
            />
            {/* Overlay Badge */}
            <div className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-xs text-white text-[11px] font-semibold flex items-center gap-1.5">
              <span>{evidence.citizenPhoto.overlayBadge}</span>
            </div>

            <div className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <Eye className="w-4 h-4" />
            </div>
          </div>

          <div className="p-3 text-xs text-slate-600 leading-relaxed border-t border-slate-200/80">
            {evidence.citizenPhoto.caption}
          </div>
        </div>

        {/* Foto 2: Dokumentasi Tindak Lanjut (Waiting state) */}
        <div className="rounded-xl border border-slate-200 overflow-hidden bg-slate-50 flex flex-col justify-between">
          <div className="p-3.5 pb-2 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <Hourglass className="w-3.5 h-3.5 text-amber-600" />
              <span>{evidence.followupPhoto.title}</span>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold">
              {evidence.followupPhoto.statusBadge}
            </span>
          </div>

          {/* Placeholder state */}
          <div className="aspect-[16/10] bg-slate-100 flex flex-col items-center justify-center p-6 text-center border-y border-slate-200">
            <div className="w-12 h-12 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center mb-2.5 shadow-2xs">
              <Hourglass className="w-6 h-6 animate-pulse text-amber-600" />
            </div>
            <h4 className="font-display font-bold text-xs sm:text-sm text-slate-800">
              {evidence.followupPhoto.waitingTitle}
            </h4>
            <p className="text-[11px] text-slate-500 mt-1 max-w-xs leading-relaxed">
              {evidence.followupPhoto.waitingDesc}
            </p>
          </div>

          <div className="p-3 text-xs text-slate-500 leading-relaxed">
            {evidence.followupPhoto.notes}
          </div>
        </div>

      </div>

    </div>
  );
};
