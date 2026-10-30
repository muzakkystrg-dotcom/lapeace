import React from 'react';
import { X, ExternalLink, CheckCircle2, Clock, Building2, FileCheck2, ArrowRight } from 'lucide-react';
import { ServiceItem } from '../types/portal';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  isOpen: boolean;
  onClose: () => void;
  onStartApplication: (service: ServiceItem) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  isOpen,
  onClose,
  onStartApplication,
}) => {
  if (!isOpen || !service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-emerald-900/10 overflow-hidden relative my-8 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="bg-[#083C2E] px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
              <Building2 className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <div className="text-[11px] font-semibold text-emerald-300 uppercase tracking-wider">
                LAYANAN PEMKAB SIDOARJO
              </div>
              <h3 className="font-display font-bold text-xl leading-tight">
                {service.title}
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

        {/* Modal Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Brief Overview */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Deskripsi Layanan
            </h4>
            <p className="text-slate-800 text-sm sm:text-base leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* OPD & SLA Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-emerald-50/60 border border-emerald-100 rounded-xl p-4">
            <div className="flex items-start gap-2.5">
              <Building2 className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
              <div>
                <div className="text-[11px] font-medium text-emerald-900">OPD Penanggung Jawab</div>
                <div className="text-xs font-semibold text-emerald-950 mt-0.5">{service.opd}</div>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
              <div>
                <div className="text-[11px] font-medium text-emerald-900">Standar Waktu Layanan (SLA)</div>
                <div className="text-xs font-semibold text-emerald-950 mt-0.5">{service.sla}</div>
              </div>
            </div>
          </div>

          {/* Persyaratan Dokumen */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <FileCheck2 className="w-4 h-4 text-emerald-700" />
              <span>Persyaratan Berkas Dokumen</span>
            </h4>
            <ul className="space-y-2">
              {service.requirements.map((req, index) => (
                <li key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Fasilitas & Keunggulan Digital */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
              Keunggulan Layanan Digital
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {service.features.map((feat, index) => (
                <div key={index} className="px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-700">
                  {feat}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-800 transition-colors"
          >
            Tutup
          </button>

          <button
            onClick={() => {
              onClose();
              onStartApplication(service);
            }}
            className="px-5 py-2.5 bg-[#038D66] hover:bg-[#026E4F] text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer active:scale-98"
          >
            <span>Ajukan Layanan Sekarang</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
