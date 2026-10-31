import React from 'react';
import { CheckCircle2, Zap } from 'lucide-react';

export const QuickGuideSidebar: React.FC = () => {
  const guidePoints = [
    { label: 'Informasi Jelas', desc: 'Kronologi ringkas tanpa asumsi.' },
    { label: 'Lokasi Akurat', desc: 'Cantumkan jalan & patokan jelas.' },
    { label: 'Foto Nyata', desc: 'Lampirkan bukti kondisi terkini.' },
    { label: 'Bahasa Santun', desc: 'Bahasa Indonesia lugas & santun.' },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-emerald-100/90 shadow-sm space-y-5">
      <div>
        <h3 className="font-display font-bold text-base text-[#15211C] flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-700" />
          <span>Panduan Singkat</span>
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Ikuti panduan agar laporan cepat diverifikasi:
        </p>
      </div>

      <ul className="space-y-3">
        {guidePoints.map((pt, idx) => (
          <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
            <div>
              <strong className="text-slate-900 font-semibold">{pt.label}: </strong>
              <span className="text-slate-600">{pt.desc}</span>
            </div>
          </li>
        ))}
      </ul>

      {/* Quick Tip Box */}
      <div className="bg-[#EFFDF4] rounded-xl p-3.5 border border-emerald-200/80 flex items-start gap-3">
        <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0 mt-0.5">
          <Zap className="w-4 h-4 text-emerald-700" />
        </div>
        <div>
          <div className="text-[11px] font-bold text-emerald-950 uppercase tracking-wider">
            TIPS CEPAT
          </div>
          <p className="text-xs text-emerald-900 mt-0.5 leading-relaxed">
            Laporan berfoto diproses <strong className="font-bold text-emerald-950">40% lebih cepat</strong> oleh petugas dinas.
          </p>
        </div>
      </div>
    </div>
  );
};
