import React from 'react';
import { X, MapPin, CheckCircle2, ShieldCheck, Download } from 'lucide-react';

interface PhotoPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileName: string;
  fileSize: string;
  imageUrl?: string;
  coordinates: string;
}

export const PhotoPreviewModal: React.FC<PhotoPreviewModalProps> = ({
  isOpen,
  onClose,
  fileName,
  fileSize,
  imageUrl = '/src/assets/images/sidoarjo_civic_center_1793361616866.jpg',
  coordinates,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-xs">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="bg-[#083C2E] px-5 py-4 text-white flex items-center justify-between">
          <div>
            <h3 className="font-display font-bold text-base leading-tight">
              Bukti Lapangan: {fileName}
            </h3>
            <p className="text-xs text-emerald-300/80">
              {fileSize} • Terverifikasi EXIF GPS
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-300/80 hover:text-white hover:bg-emerald-900/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Photo Container */}
        <div className="bg-slate-900 p-2 sm:p-4 flex items-center justify-center max-h-[60vh] overflow-hidden">
          <img
            src={imageUrl}
            alt={fileName}
            className="max-h-[55vh] w-auto object-contain rounded-lg shadow-lg"
          />
        </div>

        {/* Footer with EXIF info */}
        <div className="px-5 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
              <MapPin className="w-4 h-4 text-emerald-700" />
              <span>Koordinat EXIF: {coordinates}</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Otentisitas metadata foto terverifikasi valid</span>
            </div>
          </div>

          <button
            onClick={() => alert(`Mengunduh file ${fileName}...`)}
            className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg font-semibold flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Unduh Berkas</span>
          </button>
        </div>

      </div>
    </div>
  );
};
