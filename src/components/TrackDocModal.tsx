import React, { useState } from 'react';
import { X, Search, CheckCircle2, Clock, AlertCircle, FileText, ArrowRight, Printer } from 'lucide-react';
import { TrackRecord } from '../types/portal';

interface TrackDocModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockTrackDatabase: Record<string, TrackRecord> = {
  'REG-SDA-2025-08912': {
    trackingNumber: 'REG-SDA-2025-08912',
    serviceName: 'Penerbitan KTP Elektronik & Pembaruan KK',
    applicantName: 'Bagus Tri Prakoso',
    nikMasked: '351508210492****',
    submitDate: '28 Oktober 2025, 09:14 WIB',
    status: 'Proses OPD',
    currentOpd: 'Dinas Kependudukan & Pencatatan Sipil Sidoarjo',
    lastUpdated: '30 Oktober 2025, 08:30 WIB',
    steps: [
      { title: 'Pengajuan Berkas Online via Plavon', date: '28 Okt 2025, 09:14 WIB', completed: true, notes: 'Dokumen KK & scan formulir F-1.02 lengkap diunggah.' },
      { title: 'Verifikasi Petugas Kelurahan Sidokare', date: '28 Okt 2025, 14:22 WIB', completed: true, notes: 'Data pemohon dinyatakan valid & bebas tunggakan adm.' },
      { title: 'Pencetakan Blanko KTP-el di Dispendukcapil', date: '29 Okt 2025, 11:05 WIB', completed: true, current: true, notes: 'Sedang dalam antrean cetak mesin ADM Dispendukcapil Sidoarjo.' },
      { title: 'Sertifikasi Tanda Tangan Elektronik (TTE)', completed: false, notes: 'Menunggu otorisasi digital Kepala Dispendukcapil via BSrE BSSN.' },
      { title: 'Dokumen Siap Diambil / Dikirim via Kurir', completed: false, notes: 'Pilihan pengantaran: Pos Kilat Khusus ke alamat domisili.' },
    ],
  },
  'SIP-2025-44109': {
    trackingNumber: 'SIP-2025-44109',
    serviceName: 'Surat Keterangan Usaha Mikro (SKU) SIPRAJA',
    applicantName: 'Siti Aminah',
    nikMasked: '351504560789****',
    submitDate: '29 Oktober 2025, 13:40 WIB',
    status: 'Siap Diambil',
    currentOpd: 'Kecamatan Candi - Sidoarjo',
    lastUpdated: '30 Oktober 2025, 07:15 WIB',
    steps: [
      { title: 'Pengajuan Mandiri via SIPRAJA', date: '29 Okt 2025, 13:40 WIB', completed: true },
      { title: 'Validasi RT/RW dan Desa Sepande', date: '29 Okt 2025, 16:10 WIB', completed: true },
      { title: 'Verifikasi Seksi Perekonomian Kecamatan Candi', date: '30 Okt 2025, 06:45 WIB', completed: true },
      { title: 'Penandatanganan Elektronik (TTE) Camat Candi', date: '30 Okt 2025, 07:15 WIB', completed: true, current: true, notes: 'Dokumen PDF ber-barcode resmi sudah terbit.' },
      { title: 'Selesai & Dapat Diunduh', completed: true, notes: 'Silakan unduh dokumen sah ber-TTE di menu portal.' },
    ],
  },
};

export const TrackDocModal: React.FC<TrackDocModalProps> = ({ isOpen, onClose }) => {
  const [inputCode, setInputCode] = useState('');
  const [result, setResult] = useState<TrackRecord | null>(mockTrackDatabase['REG-SDA-2025-08912']);
  const [searched, setSearched] = useState(false);
  const [notFound, setNotFound] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = inputCode.trim().toUpperCase();
    if (!clean) return;

    setSearched(true);
    if (mockTrackDatabase[clean]) {
      setResult(mockTrackDatabase[clean]);
      setNotFound(false);
    } else {
      setResult(null);
      setNotFound(true);
    }
  };

  const loadSample = (code: string) => {
    setInputCode(code);
    setResult(mockTrackDatabase[code]);
    setNotFound(false);
    setSearched(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-emerald-900/10 overflow-hidden relative my-8 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="bg-[#083C2E] px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
              <Search className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg leading-tight">
                Lacak Status Berkas Layanan Warga
              </h3>
              <p className="text-xs text-emerald-300/80">
                Pantau proses penerbitan dokumen Dukcapil & SIPRAJA secara real-time
              </p>
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
        <div className="p-6 space-y-6">
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Masukkan Nomor Registrasi Berkas
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder="Contoh: REG-SDA-2025-08912 atau SIP-2025-44109"
                className="flex-1 px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 outline-none uppercase font-mono"
              />
              <button
                type="submit"
                className="px-5 py-3 bg-[#038D66] hover:bg-[#026E4F] text-white font-semibold text-sm rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
              >
                <span>Cari</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Sample Links */}
            <div className="flex items-center gap-2 pt-1 text-xs text-slate-500">
              <span>Coba nomor sampel:</span>
              <button
                type="button"
                onClick={() => loadSample('REG-SDA-2025-08912')}
                className="text-emerald-700 font-semibold underline hover:text-emerald-900"
              >
                REG-SDA-2025-08912 (KTP)
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => loadSample('SIP-2025-44109')}
                className="text-emerald-700 font-semibold underline hover:text-emerald-900"
              >
                SIP-2025-44109 (SIPRAJA)
              </button>
            </div>
          </form>

          {/* Not Found State */}
          {notFound && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3 text-sm">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold">Nomor Berkas Tidak Ditemukan</div>
                <div className="text-xs text-amber-800 mt-1">
                  Pastikan kode pendaftaran yang dimasukkan sesuai dengan tanda terima pengajuan berkas di Plavon Dukcapil atau SIPRAJA.
                </div>
              </div>
            </div>
          )}

          {/* Tracking Result View */}
          {result && (
            <div className="space-y-5 pt-2">
              
              {/* Summary Header Card */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-xs text-slate-500">Jenis Layanan</div>
                  <div className="font-bold text-slate-900 text-base">{result.serviceName}</div>
                  <div className="text-xs text-slate-600 mt-1">
                    Pemohon: <span className="font-semibold text-slate-800">{result.applicantName}</span> (NIK: {result.nikMasked})
                  </div>
                </div>

                <div className="sm:text-right">
                  <div className="text-xs text-slate-500">Status Terkini</div>
                  <span className="inline-block mt-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                    {result.status}
                  </span>
                </div>
              </div>

              {/* Stepper Timeline */}
              <div className="space-y-4">
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Riwayat Progres Dokumen
                </div>

                <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                  {result.steps.map((step, idx) => (
                    <div key={idx} className="relative">
                      {/* Step Indicator Dot */}
                      <div
                        className={`absolute -left-6 top-1 w-5 h-5 rounded-full flex items-center justify-center text-white ${
                          step.completed
                            ? 'bg-emerald-600 ring-4 ring-emerald-50'
                            : step.current
                            ? 'bg-amber-500 ring-4 ring-amber-50 animate-pulse'
                            : 'bg-slate-300'
                        }`}
                      >
                        {step.completed ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>

                      {/* Content */}
                      <div>
                        <div className="flex flex-wrap items-center justify-between gap-1">
                          <h4 className={`text-sm font-semibold ${step.completed ? 'text-slate-900' : 'text-slate-500'}`}>
                            {step.title}
                          </h4>
                          {step.date && (
                            <span className="text-[11px] text-slate-400 font-mono">
                              {step.date}
                            </span>
                          )}
                        </div>

                        {step.notes && (
                          <p className="text-xs text-slate-600 mt-1 bg-white p-2.5 rounded-lg border border-slate-100">
                            {step.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <div className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Diperbarui otomatis: {result.lastUpdated}</span>
                </div>

                <button
                  onClick={() => alert(`Bukti Tanda Terima Digital untuk berkas ${result.trackingNumber} berhasil dicetak/diunduh!`)}
                  className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Cetak Tanda Terima</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
