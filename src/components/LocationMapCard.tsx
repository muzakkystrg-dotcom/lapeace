import React from 'react';
import { MapPin, ExternalLink, Navigation } from 'lucide-react';
import { LocationDetailData } from '../types/reportDetail';

interface LocationMapCardProps {
  location: LocationDetailData;
}

export const LocationMapCard: React.FC<LocationMapCardProps> = ({ location }) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-emerald-100/90 shadow-sm space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 className="font-display font-bold text-base text-[#15211C]">
          Titik Lokasi Terlapor
        </h3>
        <MapPin className="w-4 h-4 text-emerald-700" />
      </div>

      {/* Address & Coords */}
      <div className="space-y-1">
        <div className="text-xs sm:text-sm font-semibold text-slate-900 leading-snug">
          {location.address}
        </div>
        <div className="text-xs text-emerald-800 font-mono font-medium">
          Koordinat: {location.coordinates}
        </div>
      </div>

      {/* Visual Mini Map */}
      <div className="relative rounded-xl overflow-hidden border border-slate-200 aspect-[16/9] bg-[#E8F5E9] flex items-center justify-center group">
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#083C2E 1.5px, transparent 1.5px)`,
            backgroundSize: '14px 14px',
          }}
        />

        {/* Center Pin */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-[#083C2E] border-2 border-white shadow-md flex items-center justify-center text-emerald-300">
            <MapPin className="w-5 h-5 fill-emerald-300 text-[#083C2E]" />
          </div>
          <span className="mt-1 px-2 py-0.5 rounded-full bg-white/95 text-[10px] font-bold text-slate-800 shadow-xs border border-slate-200">
            Jl. Melati
          </span>
        </div>

        {/* Bottom Accuracy & Radius Bar */}
        <div className="absolute bottom-2 inset-x-2 flex items-center justify-between text-[10px] font-semibold text-slate-700 px-2.5 py-1 bg-white/95 backdrop-blur-xs rounded-lg border border-slate-200 shadow-2xs">
          <span>{location.radiusText}</span>
          <span className="text-emerald-800">{location.accuracyText}</span>
        </div>
      </div>

      {/* Button */}
      <a
        href={location.navigationUrl}
        target="_blank"
        rel="noreferrer"
        className="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold text-xs border border-slate-300 transition-colors flex items-center justify-center gap-1.5"
      >
        <Navigation className="w-3.5 h-3.5 text-emerald-700" />
        <span>Buka di Peta Navigasi</span>
        <ExternalLink className="w-3 h-3 text-slate-400" />
      </a>

    </div>
  );
};
