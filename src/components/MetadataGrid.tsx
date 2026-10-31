import React from 'react';
import { Hash, Calendar, Building2, Flag } from 'lucide-react';

interface MetadataGridProps {
  registrationNumber: string;
  submittedDate: string;
  submittedTime: string;
  agencyClassification: string;
  agencySubtext: string;
  urgencyPriority: string;
  urgencySubtext: string;
}

export const MetadataGrid: React.FC<MetadataGridProps> = ({
  registrationNumber,
  submittedDate,
  submittedTime,
  agencyClassification,
  agencySubtext,
  urgencyPriority,
  urgencySubtext,
}) => {
  const items = [
    {
      label: 'NOMOR REGISTRASI',
      value: registrationNumber,
      sub: 'Tercatat di SP4N-LAPOR!',
      icon: Hash,
      iconColor: 'text-emerald-700',
      valueColor: 'text-slate-900 font-mono',
    },
    {
      label: 'TANGGAL PENGIRIMAN',
      value: submittedDate,
      sub: submittedTime,
      icon: Calendar,
      iconColor: 'text-emerald-700',
      valueColor: 'text-slate-900',
    },
    {
      label: 'KLASIFIKASI INSTANSI',
      value: agencyClassification,
      sub: agencySubtext,
      icon: Building2,
      iconColor: 'text-emerald-700',
      valueColor: 'text-slate-900',
    },
    {
      label: 'INDIKATOR URGENSI',
      value: urgencyPriority,
      sub: urgencySubtext,
      icon: Flag,
      iconColor: 'text-amber-600',
      valueColor: 'text-amber-800 font-semibold',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-emerald-100/90 shadow-xs flex items-start justify-between"
            >
              <div className="space-y-1">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  {item.label}
                </div>
                <div className={`font-display font-extrabold text-base sm:text-lg ${item.valueColor}`}>
                  {item.value}
                </div>
                <div className="text-[11px] text-slate-500">
                  {item.sub}
                </div>
              </div>

              <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 shrink-0">
                <Icon className={`w-5 h-5 ${item.iconColor}`} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
