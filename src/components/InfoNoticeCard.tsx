import React from 'react';
import { Info } from 'lucide-react';

interface InfoNoticeCardProps {
  ticketId: string;
}

export const InfoNoticeCard: React.FC<InfoNoticeCardProps> = ({ ticketId }) => {
  return (
    <div className="bg-[#EFFDF4] rounded-2xl p-5 border border-emerald-200/80 flex items-start gap-3.5 shadow-2xs">
      <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0 mt-0.5">
        <Info className="w-5 h-5 text-emerald-700" />
      </div>
      <div>
        <h4 className="font-display font-bold text-sm text-[#15211C]">
          Penting untuk Pemantauan Mandiri
        </h4>
        <p className="text-xs sm:text-sm text-[#5A6862] mt-1 leading-relaxed">
          Anda dapat memantau perkembangan laporan melalui menu <strong className="text-slate-800">Laporan Warga</strong> kapan saja menggunakan Nomor Tiket <strong className="text-emerald-900 font-mono font-bold">{ticketId}</strong>. Notifikasi SMS dan email juga akan dikirimkan otomatis saat ada perubahan status.
        </p>
      </div>
    </div>
  );
};
