import React, { useState } from 'react';
import { X, Search, CheckCircle2, Clock, AlertCircle, FileText, ArrowRight, Printer, Phone } from 'lucide-react';
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
  const [isLoading, setIsLoading] = useState(false);
  const [isLiveSource, setIsLiveSource] = useState(false);
  const [receiptFeedback, setReceiptFeedback] = useState<string | null>(null);

  if (!isOpen) return null;

  const fetchTracking = async (code: string) => {
    setIsLoading(true);
    setSearched(true);
    try {
      const res = await fetch(`/api/tracking/${encodeURIComponent(code)}`);
      if (res.ok) {
        const json = await res.json();
        const record = json.data || json;
        if (record && record.trackingNumber) {
          setResult(record);
          setNotFound(false);
          setIsLiveSource(true);
          setIsLoading(false);
          return;
        }
      }
    } catch {
      // Fallback ke mock database jika offline
    }

    if (mockTrackDatabase[code]) {
      setResult(mockTrackDatabase[code]);
      setNotFound(false);
      setIsLiveSource(false);
    } else {
      setResult(null);
      setNotFound(true);
      setIsLiveSource(false);
    }
    setIsLoading(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = inputCode.trim().toUpperCase();
    if (!clean) return;
    fetchTracking(clean);
  };

  const loadSample = (code: string) => {
    setInputCode(code);
    fetchTracking(code);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-2xl max-h-[calc(100dvh-1.5rem)] sm:max-h-[90vh] rounded-2xl shadow-2xl border border-emerald-900/10 flex flex-col overflow-hidden relative animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="bg-[#083C2E] px-4 py-3.5 sm:px-6 sm:py-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 pr-2">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 shrink-0">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-300" />
            </div>
            <div className="min-w-0">
              <h3 className="font-display font-bold text-base sm:text-lg leading-tight truncate">
                Lacak Status Berkas Layanan Warga
              </h3>
              <p className="text-[11px] sm:text-xs text-emerald-300/80 truncate">
                Pantau proses penerbitan dokumen Dukcapil & SIPRAJA secara real-time
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup modal pelacakan berkas"
            className="p-1.5 rounded-lg text-emerald-300/80 hover:text-white hover:bg-emerald-900/60 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-6 overflow-y-auto flex-1">
          
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
                disabled={isLoading}
                className="px-5 py-3 bg-[#038D66] hover:bg-[#026E4F] disabled:opacity-60 text-white font-semibold text-sm rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    <span>Memeriksa...</span>
                  </>
                ) : (
                  <>
                    <span>Cari</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
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
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold">Nomor Berkas Tidak Ditemukan</div>
                  <div className="text-xs text-amber-800 mt-1">
                    Pastikan kode pendaftaran yang dimasukkan sesuai dengan tanda terima pengajuan berkas di Plavon Dukcapil atau SIPRAJA.
                  </div>
                </div>
              </div>

              {/* Panduan Format Nomor Berkas & Bantuan Kontekstual */}
              <div className="pt-3 border-t border-amber-200/80 space-y-2.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-950">
                  <FileText className="w-3.5 h-3.5 text-amber-700" />
                  <span>Panduan Format Nomor Berkas:</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-xs text-amber-800 pl-1">
                  <li>
                    Layanan Kependudukan (Plavon): <span className="font-mono font-bold bg-amber-100/80 px-1.5 py-0.5 rounded">REG-SDA-YYYY-XXXXX</span> (contoh: <button type="button" className="font-mono text-emerald-800 font-semibold underline hover:text-emerald-950 cursor-pointer" onClick={() => loadSample('REG-SDA-2025-08912')}>REG-SDA-2025-08912</button>)
                  </li>
                  <li>
                    Layanan Perizinan (SIPRAJA): <span className="font-mono font-bold bg-amber-100/80 px-1.5 py-0.5 rounded">SIP-YYYY-XXXXX</span> (contoh: <button type="button" className="font-mono text-emerald-800 font-semibold underline hover:text-emerald-950 cursor-pointer" onClick={() => loadSample('SIP-2025-44109')}>SIP-2025-44109</button>)
                  </li>
                </ul>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <a
                    href="tel:112"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition-colors shadow-xs"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Hubungi Call Center 112</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => loadSample('REG-SDA-2025-08912')}
                    className="px-3 py-1.5 rounded-lg bg-white border border-amber-300 text-amber-900 font-semibold text-xs hover:bg-amber-100 transition-colors cursor-pointer"
                  >
                    Gunakan Contoh Nomor
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tracking Result View */}
          {result && (
            <div className="space-y-5 pt-2">
              
              {/* Data Source Indicator */}
              {isLiveSource && (
                <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200/80 text-[11px] text-emerald-800">
                  <span className="flex items-center gap-1.5 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                    Data Valid: Terhubung Langsung ke Basis Data Sentral SITAPAK
                  </span>
                  <span className="font-mono text-emerald-700 font-semibold">{result.trackingNumber}</span>
                </div>
              )}

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
                            <span className="text-[11px] text-slate-500 font-mono">
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

              {/* Receipt Inline Feedback */}
              {receiptFeedback && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-between animate-in fade-in duration-150">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{receiptFeedback}</span>
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5 rounded">
                    Sukses
                  </span>
                </div>
              )}

              {/* Footer Actions */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <div className="text-[11px] text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Diperbarui otomatis: {result.lastUpdated}</span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setReceiptFeedback(`Bukti Tanda Terima Digital untuk berkas ${result.trackingNumber} berhasil dicetak/diunduh!`);
                    setTimeout(() => setReceiptFeedback(null), 4000);
                  }}
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
