import React from 'react';
import { Phone, MessageSquare, ShieldAlert, TrendingUp, ChevronRight } from 'lucide-react';

export const EmergencyContactCard: React.FC = () => {
  return (
    <div className="space-y-4">
      
      {/* Emergency Hotline Card */}
      <div className="bg-white rounded-2xl p-6 border border-emerald-100/90 shadow-sm space-y-4">
        <div>
          <h3 className="font-display font-bold text-base text-[#15211C] flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-600" />
            <span>Kontak Darurat</span>
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Khusus kondisi darurat keselamatan jiwa & bencana:
          </p>
        </div>

        <div className="space-y-2.5">
          {/* 112 Button */}
          <a
            href="tel:112"
            className="flex items-center justify-between p-3.5 rounded-xl bg-red-50/70 hover:bg-red-50 border border-red-200/90 text-red-950 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-red-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Phone className="w-4 h-4 animate-pulse" />
              </div>
              <div>
                <div className="text-xs font-bold text-red-950">Call Center 112</div>
                <div className="text-[11px] text-red-700">Bebas Pulsa • 24 Jam Siaga</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-red-400 group-hover:translate-x-1 transition-transform" />
          </a>

          {/* WhatsApp Hotline */}
          <a
            href="https://wa.me/62811300112"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-50/80 hover:bg-emerald-50 border border-emerald-200 text-emerald-950 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#038D66] text-white flex items-center justify-center shrink-0 shadow-xs">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-emerald-950">Hotline WhatsApp Aduan</div>
                <div className="text-[11px] text-emerald-700">Piket Cepat Diskominfo Sidoarjo</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-emerald-500 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>Terintegrasi posko darurat Sidoarjo.</span>
        </div>
      </div>

      {/* Handling Speed Metric Tile */}
      <div className="bg-white rounded-2xl p-5 border border-emerald-100/90 shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-[#083C2E] text-white flex items-center justify-center shrink-0">
          <TrendingUp className="w-6 h-6 text-emerald-400" />
        </div>
        <div>
          <div className="text-xs font-semibold text-slate-800">
            Rata-rata Penanganan: <span className="font-bold text-emerald-800">1.8 Hari</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            Dari 1.240 laporan bulan ini
          </div>
        </div>
      </div>

    </div>
  );
};
