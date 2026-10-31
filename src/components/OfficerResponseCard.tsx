import React from 'react';
import { MessageSquare, CheckCircle2, Download, Lock, FileText, Quote } from 'lucide-react';
import { OfficerResponseData } from '../types/reportDetail';

interface OfficerResponseCardProps {
  response: OfficerResponseData;
}

export const OfficerResponseCard: React.FC<OfficerResponseCardProps> = ({ response }) => {
  return (
    <div className="bg-white rounded-2xl p-6 sm:p-7 border border-emerald-100/90 shadow-sm space-y-5">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#EFFDF4] border border-emerald-200/80 text-emerald-800 flex items-center justify-center shrink-0">
            <MessageSquare className="w-5 h-5 text-emerald-700" />
          </div>
          <div>
            <h2 className="font-display font-bold text-lg text-[#15211C]">
              Tanggapan Petugas & Tindak Lanjut Resmi
            </h2>
            <p className="text-xs text-[#5A6862]">
              Respon akuntabel pejabat instansi penanggung jawab teknis
            </p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-900 text-xs font-semibold self-start sm:self-auto shrink-0">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Instansi Terverifikasi</span>
        </span>
      </div>

      {/* Officer Profile Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#083C2E] text-emerald-200 font-bold text-sm flex items-center justify-center shadow-xs shrink-0">
            {response.officerInitials}
          </div>
          <div>
            <h4 className="font-display font-bold text-sm text-slate-900">
              {response.officerName}
            </h4>
            <div className="text-xs text-slate-600">
              {response.officerRole}
            </div>
            <div className="text-[11px] font-semibold text-emerald-800">
              {response.agencyName}
            </div>
          </div>
        </div>

        <div className="text-left sm:text-right">
          <div className="text-[10px] uppercase font-bold text-slate-400">
            Waktu Respon Resmi
          </div>
          <div className="text-xs font-semibold text-slate-800 font-mono mt-0.5">
            {response.responseTime}
          </div>
        </div>
      </div>

      {/* Message Quote */}
      <div className="relative bg-[#EFFDF4]/60 border border-emerald-200/80 rounded-xl p-4 sm:p-5 pl-6 sm:pl-7">
        <Quote className="w-6 h-6 text-emerald-300 absolute left-2 top-3 -scale-x-100 opacity-60 pointer-events-none" />
        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed italic">
          {response.quoteMessage}
        </p>
      </div>

      {/* Attachment & Digital Signature */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span className="text-slate-400">Dokumen Pendukung:</span>
          <button
            onClick={() => alert(`Mengunduh ${response.attachmentFileName}...`)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg font-mono font-semibold transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-emerald-700" />
            <span>{response.attachmentFileName}</span>
            <Download className="w-3.5 h-3.5 text-slate-500" />
          </button>
        </div>

        <div className="inline-flex items-center gap-1.5 text-emerald-800 font-medium">
          <Lock className="w-3.5 h-3.5 text-emerald-600" />
          <span>{response.digitalSignatureBadge}</span>
        </div>
      </div>

    </div>
  );
};
