import React from 'react';
import { X, Calendar, MapPin, Building2, CheckCircle2, Clock, AlertCircle, Shield, FileText } from 'lucide-react';
import { ReportItem } from '../types/report';

interface ReportDetailModalProps {
  report: ReportItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ReportDetailModal: React.FC<ReportDetailModalProps> = ({
  report,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !report) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-emerald-900/10 overflow-hidden relative my-8 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="bg-[#083C2E] px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
              <FileText className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-emerald-300">
                  {report.id}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-800 text-emerald-100 font-semibold uppercase">
                  {report.status}
                </span>
              </div>
              <h3 className="font-display font-bold text-lg leading-tight mt-0.5">
                {report.title}
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

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Metadata Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex items-start gap-2 text-xs text-slate-600">
              <Calendar className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Waktu Lapor</span>
                <span className="font-semibold text-slate-800">{report.date}</span>
              </div>
            </div>

            <div className="flex items-start gap-2 text-xs text-slate-600">
              <Building2 className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">OPD Menangani</span>
                <span className="font-semibold text-slate-800">{report.opd}</span>
              </div>
            </div>

            <div className="sm:col-span-2 flex items-start gap-2 text-xs text-slate-600 pt-2 border-t border-slate-200/80">
              <MapPin className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Lokasi Kejadian</span>
                <span className="font-semibold text-slate-800">{report.location}</span>
              </div>
            </div>
          </div>

          {/* Chronology & Description */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Deskripsi Aduan Warga
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed bg-white p-3.5 rounded-xl border border-slate-200">
              {report.description}
            </p>
          </div>

          {/* Stepper Timeline */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
              Tahapan Penanganan Aduan ({report.stepCurrent}/{report.stepTotal})
            </h4>

            <div className="relative pl-6 space-y-5 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {report.timeline.map((item, idx) => (
                <div key={idx} className="relative">
                  <div
                    className={`absolute -left-6 top-1 w-5 h-5 rounded-full flex items-center justify-center text-white ${
                      item.completed
                        ? 'bg-emerald-600 ring-4 ring-emerald-50'
                        : item.current
                        ? 'bg-amber-500 ring-4 ring-amber-50 animate-pulse'
                        : 'bg-slate-300'
                    }`}
                  >
                    {item.completed ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h5 className={`text-xs sm:text-sm font-semibold ${item.completed ? 'text-slate-900' : 'text-slate-500'}`}>
                        {item.title}
                      </h5>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {item.date}
                      </span>
                    </div>

                    <div className="text-[11px] text-emerald-800 font-medium mt-0.5">
                      Pelaksana: {item.opd}
                    </div>

                    {item.notes && (
                      <p className="text-xs text-slate-600 mt-1.5 bg-slate-50 p-2.5 rounded-lg border border-slate-200/80">
                        {item.notes}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Attached Evidence */}
          {report.fileName && (
            <div>
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Bukti Lampiran Foto
              </h4>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="w-12 h-12 rounded-lg bg-emerald-100 overflow-hidden flex items-center justify-center shrink-0 border border-emerald-200">
                  <img
                    src="/src/assets/images/sidoarjo_civic_center_1793361616866.jpg"
                    alt="Bukti Laporan"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-800">{report.fileName}</div>
                  <div className="text-[11px] text-slate-500">{report.fileSize || '1.8 MB'} • Terverifikasi GPS</div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-emerald-700" />
            <span>Kerahasiaan data pelapor dijamin Pemkab Sidoarjo.</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold text-xs rounded-xl transition-colors"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
