import React, { useState } from 'react';
import { FileText, Copy, Check, Wrench, Calendar, MapPin, Eye, Map, AlertCircle } from 'lucide-react';
import { TicketDetails } from '../types/ticket';

interface TicketSummaryCardProps {
  ticket: TicketDetails;
  onPreviewPhoto: () => void;
}

export const TicketSummaryCard: React.FC<TicketSummaryCardProps> = ({
  ticket,
  onPreviewPhoto,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(ticket.ticketId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-7 border border-emerald-100/90 shadow-sm space-y-6">
      
      {/* Card Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#EFFDF4] border border-emerald-200/80 text-emerald-800 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-emerald-700" />
          </div>
          <div>
            <h2 className="font-display font-bold text-lg text-[#15211C]">
              Ringkasan Bukti Pengaduan
            </h2>
            <p className="text-xs text-[#5A6862]">
              Dokumen Tanda Terima Elektronik Resmi
            </p>
          </div>
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="self-start sm:self-auto px-3.5 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700 font-bold">Disalin!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-500" />
              <span>Salin Nomor Tiket</span>
            </>
          )}
        </button>
      </div>

      {/* Ticket ID Highlight Box */}
      <div className="bg-gradient-to-r from-amber-50/70 to-emerald-50/40 rounded-2xl p-5 border border-amber-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            NOMOR REGISTRASI TIKET (TICKET ID)
          </div>
          <div className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5 font-mono">
            {ticket.ticketId}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FEF3C7] text-[#92400E] border border-amber-200">
            {ticket.priority.toUpperCase()}
          </span>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FEF9C3] text-[#854D0E] border border-yellow-200">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span>{ticket.status}</span>
          </span>
        </div>
      </div>

      {/* Metadata Fields */}
      <div className="space-y-4 pt-1">
        <div>
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
            JUDUL PENGADUAN
          </div>
          <h3 className="font-display font-bold text-base text-slate-900">
            {ticket.title}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Kategori Bidang
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800">
              <Wrench className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>{ticket.category}</span>
            </div>
          </div>

          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Tanggal & Waktu Terkirim
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800">
              <Calendar className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>{ticket.submittedAt}</span>
            </div>
          </div>
        </div>

        <div>
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Lokasi Terlapor
          </div>
          <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-800">
            <MapPin className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
            <div>
              <div className="font-semibold">{ticket.location}</div>
              <div className="text-xs text-slate-500 mt-0.5">
                Koordinat Referensi: {ticket.coordinates} ({ticket.subdistrict})
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bukti Lampiran Lapangan */}
      <div className="pt-2">
        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
          BUKTI LAMPIRAN LAPANGAN
        </div>

        <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-emerald-100 overflow-hidden flex items-center justify-center shrink-0 border border-emerald-200">
              <img
                src={ticket.attachment.previewUrl || '/src/assets/images/sidoarjo_civic_center_1793361616866.jpg'}
                alt="Lampiran Bukti"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-emerald-700" />
                <span>{ticket.attachment.fileName}</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                {ticket.attachment.fileSize} • {ticket.attachment.format} • {ticket.attachment.verificationText}
              </div>
            </div>
          </div>

          <button
            onClick={onPreviewPhoto}
            className="self-start sm:self-auto px-3.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Eye className="w-3.5 h-3.5 text-slate-500" />
            <span>Lihat Foto</span>
          </button>
        </div>
      </div>

      {/* Map Mini Preview Card */}
      <div className="pt-1">
        <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-emerald-50/50 aspect-[21/9] flex items-center justify-center p-4 group">
          {/* Stylized vector map graphic */}
          <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#038D66_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="relative z-10 bg-white/95 backdrop-blur-xs px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-600">
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-semibold text-slate-800">
              {ticket.investigationRadiusText}
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};
