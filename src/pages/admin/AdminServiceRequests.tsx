import React, { useState, useEffect } from 'react';
import {
  Layers,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  RefreshCw,
  Send,
  Building2,
  X,
  ChevronRight,
  FileCheck,
  User,
  Calendar,
} from 'lucide-react';

interface RequestStep {
  id?: number;
  step_number: number;
  title: string;
  date_text?: string;
  notes?: string;
  is_completed: number;
  is_current: number;
}

interface ServiceRequestItem {
  id: number;
  tracking_number: string;
  service_id: string;
  applicant_name: string;
  nik_masked: string;
  service_name: string;
  status: string;
  current_opd: string;
  current_stage_text: string;
  progress_percent: number;
  priority: string;
  submit_date_formatted: string;
  estimated_completion: string;
  notes: string;
  created_at: string;
  updated_at: string;
  steps?: RequestStep[];
}

const SERVICE_FILTER_OPTIONS = [
  { id: 'semua', label: 'Semua Layanan' },
  { id: 'ktp', label: 'KTP-el & KK (Disdukcapil)' },
  { id: 'sku', label: 'Surat Keterangan Usaha (SIPRAJA)' },
  { id: 'nib', label: 'Perizinan Mandiri (OSS-RBA)' },
];

const STATUS_OPTIONS = [
  'Diterima',
  'Verifikasi Dokumen',
  'Proses OPD',
  'Siap Diambil',
  'Selesai',
];

export const AdminServiceRequests: React.FC = () => {
  const [requests, setRequests] = useState<ServiceRequestItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedReq, setSelectedReq] = useState<ServiceRequestItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('semua');
  const [serviceFilter, setServiceFilter] = useState('semua');

  // Form states in modal
  const [newStatus, setNewStatus] = useState('');
  const [newStageText, setNewStageText] = useState('');
  const [newOpd, setNewOpd] = useState('');
  const [notes, setNotes] = useState('');
  const [progressPercent, setProgressPercent] = useState(60);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const fetchRequests = async () => {
    setIsLoading(true);
    const token = sessionStorage.getItem('sitapak_auth_token');
    try {
      const url = new URL('/api/admin/service-requests', window.location.origin);
      if (statusFilter !== 'semua') url.searchParams.set('status', statusFilter);
      if (serviceFilter !== 'semua') url.searchParams.set('serviceId', serviceFilter);
      if (searchQuery.trim()) url.searchParams.set('search', searchQuery.trim());

      const res = await fetch(url.toString(), {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (res.ok) {
        const data = await res.json();
        setRequests(data);
      } else {
        throw new Error('Gagal mengambil data permohonan.');
      }
    } catch {
      // Fallback data
      setRequests([
        {
          id: 1,
          tracking_number: 'REG-SDA-2025-08912',
          service_id: 'ktp',
          applicant_name: 'Bagus Tri Prakoso',
          nik_masked: '351508210492****',
          service_name: 'Penerbitan KTP Elektronik & Pembaruan KK',
          status: 'Proses OPD',
          current_opd: 'Dinas Kependudukan & Pencatatan Sipil Sidoarjo',
          current_stage_text: 'Pencetakan Blanko KTP-el di Dispendukcapil',
          progress_percent: 60,
          priority: 'Reguler',
          submit_date_formatted: '28 Oktober 2025, 09:14 WIB',
          estimated_completion: '31 Oktober 2025',
          notes: 'Permohonan penggantian blanko rusak telah lolos verifikasi administrasi kelurahan.',
          created_at: '2026-10-28 09:14:00',
          updated_at: '2026-10-29 11:30:00',
        },
        {
          id: 2,
          tracking_number: 'SIP-2025-44109',
          service_id: 'sku',
          applicant_name: 'Siti Aminah',
          nik_masked: '351504560789****',
          service_name: 'Surat Keterangan Usaha Mikro (SKU) SIPRAJA',
          status: 'Siap Diambil',
          current_opd: 'Kecamatan Candi - Sidoarjo',
          current_stage_text: 'Penandatanganan Elektronik (TTE) Camat Candi',
          progress_percent: 100,
          priority: 'Reguler',
          submit_date_formatted: '29 Oktober 2025, 13:40 WIB',
          estimated_completion: '30 Oktober 2025',
          notes: 'Dokumen ber-TTE resmi Balai Sertifikasi Elektronik (BSrE) BSSN siap diunduh secara digital.',
          created_at: '2026-10-29 13:40:00',
          updated_at: '2026-10-30 15:20:00',
        },
        {
          id: 3,
          tracking_number: 'NIB-2025-77218',
          service_id: 'nib',
          applicant_name: 'Hendra Wijaya',
          nik_masked: '351503190785****',
          service_name: 'Perizinan Berusaha Mandiri (OSS-RBA)',
          status: 'Selesai',
          current_opd: 'Dinas PMPTSP Kab. Sidoarjo',
          current_stage_text: 'NIB Diterbitkan via Sistem OSS-RBA',
          progress_percent: 100,
          priority: 'Reguler',
          submit_date_formatted: '01 November 2025, 10:20 WIB',
          estimated_completion: '01 November 2025',
          notes: 'NIB Nomor 1205240019283 telah sinkron ke database BKPM dan izin usaha mikro berlaku efektif.',
          created_at: '2026-11-01 10:20:00',
          updated_at: '2026-11-01 10:25:00',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [statusFilter, serviceFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchRequests();
  };

  const openProcessModal = (req: ServiceRequestItem) => {
    setSelectedReq(req);
    setNewStatus(req.status);
    setNewStageText(req.current_stage_text);
    setNewOpd(req.current_opd);
    setProgressPercent(req.progress_percent || 50);
    setNotes(req.notes || '');
    setActionSuccess(null);
    setIsModalOpen(true);
  };

  const handleSubmitUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReq) return;

    setIsSubmitting(true);
    setActionSuccess(null);

    const token = sessionStorage.getItem('sitapak_auth_token');
    try {
      const res = await fetch(`/api/admin/service-requests/${selectedReq.id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          status: newStatus,
          currentStageText: newStageText,
          currentOpd: newOpd,
          progressPercent,
          notes,
        }),
      });

      if (!res.ok) {
        throw new Error('Gagal memperbarui permohonan berkas.');
      }

      setActionSuccess(`Status permohonan ${selectedReq.tracking_number} berhasil diperbarui.`);
      setTimeout(() => {
        setIsModalOpen(false);
        fetchRequests();
      }, 1000);
    } catch (err: any) {
      alert(err.message || 'Terjadi kesalahan sistem.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Selesai':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Siap Diambil':
        return 'bg-teal-50 text-teal-700 border-teal-200';
      case 'Proses OPD':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Verifikasi Dokumen':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Diterima':
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-800">
              Modul Pelayanan Publik & Tracking
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display mt-1">
            Manajemen Permohonan Berkas Warga
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Verifikasi kelengkapan syarat, validasi TTE Camat/Kades SIPRAJA, cetak blanko KTP Disdukcapil, dan integrasi OSS-RBA.
          </p>
        </div>

        <button
          onClick={fetchRequests}
          disabled={isLoading}
          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer self-start md:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-blue-400' : ''}`} />
          <span>Segarkan Data</span>
        </button>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
        <form onSubmit={handleSearchSubmit} className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari berdasarkan No. Resi (REG-SDA-..., SIP-..., NIB-...), Nama Pemohon, atau OPD..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
          />
        </form>

        <div className="flex flex-wrap items-center gap-2">
          {/* Service Filter */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs">
            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="bg-transparent font-medium text-slate-700 outline-none cursor-pointer"
            >
              {SERVICE_FILTER_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent font-medium text-slate-700 outline-none cursor-pointer"
            >
              <option value="semua">Semua Status</option>
              {STATUS_OPTIONS.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center space-y-3">
            <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto" />
            <p className="text-xs text-slate-500 font-medium">Memuat data permohonan berkas...</p>
          </div>
        ) : requests.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <Layers className="w-10 h-10 text-slate-300 mx-auto" />
            <h4 className="text-sm font-bold text-slate-700">Tidak ada permohonan yang sesuai filter</h4>
            <p className="text-xs text-slate-400">Coba ubah filter layanan atau kata kunci pencarian.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200/80">
                <tr>
                  <th className="py-3 px-4">No. Registrasi / Resi</th>
                  <th className="py-3 px-4">Jenis Layanan</th>
                  <th className="py-3 px-4">Nama Pemohon (NIK Masked)</th>
                  <th className="py-3 px-4">Tahapan & OPD Saat Ini</th>
                  <th className="py-3 px-4">Status & Kemajuan</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {requests.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      {req.tracking_number}
                      <div className="text-[10px] text-slate-400 font-sans mt-0.5">
                        {req.submit_date_formatted || '2026'}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="font-bold text-slate-900">{req.service_name}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5 font-medium">
                        Prioritas: {req.priority || 'Reguler'}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{req.applicant_name}</div>
                      <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                        {req.nik_masked}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 max-w-[240px]">
                      <div className="font-semibold text-slate-800 line-clamp-1">
                        {req.current_stage_text}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1 line-clamp-1">
                        <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
                        <span>{req.current_opd}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="space-y-1.5">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold border ${getStatusBadge(req.status)}`}>
                          {req.status}
                        </span>
                        <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500 rounded-full"
                            style={{ width: `${req.progress_percent || 25}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => openProcessModal(req)}
                        className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-300 font-bold text-xs transition-all cursor-pointer"
                      >
                        Proses Berkas
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal for Service Request Workflow Update */}
      {isModalOpen && selectedReq && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            {/* Header */}
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between rounded-t-3xl">
              <div>
                <span className="text-xs font-mono font-bold text-blue-400">
                  {selectedReq.tracking_number}
                </span>
                <h3 className="text-lg font-bold font-display mt-0.5 text-white">
                  Pembaruan Alur & Verifikasi Dokumen
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6">
              {/* Request Info Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{selectedReq.service_name}</h4>
                    <div className="text-xs text-slate-600 mt-1">
                      Pemohon: <span className="font-bold text-slate-800">{selectedReq.applicant_name}</span> ({selectedReq.nik_masked})
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold shrink-0 border ${getStatusBadge(selectedReq.status)}`}>
                    {selectedReq.status}
                  </span>
                </div>

                <div className="text-[11px] text-slate-600 bg-white p-2.5 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-700">Catatan Berkas Saat Ini:</span> {selectedReq.notes || 'Tidak ada catatan khusus.'}
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmitUpdate} className="space-y-4">
                {actionSuccess && (
                  <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs font-semibold text-emerald-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{actionSuccess}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Status Permohonan
                    </label>
                    <select
                      value={newStatus}
                      onChange={(e) => {
                        const s = e.target.value;
                        setNewStatus(s);
                        if (s === 'Selesai') setProgressPercent(100);
                        else if (s === 'Siap Diambil') setProgressPercent(90);
                        else if (s === 'Proses OPD') setProgressPercent(60);
                        else if (s === 'Verifikasi Dokumen') setProgressPercent(35);
                        else setProgressPercent(15);
                      }}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 font-semibold text-slate-800 outline-none"
                    >
                      {STATUS_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Progress Penyelesaian ({progressPercent}%)
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={progressPercent}
                      onChange={(e) => setProgressPercent(Number(e.target.value))}
                      className="w-full mt-2 accent-blue-600 cursor-pointer"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Judul Tahapan Berkas
                  </label>
                  <input
                    type="text"
                    value={newStageText}
                    onChange={(e) => setNewStageText(e.target.value)}
                    placeholder="Contoh: Pencetakan Blanko KTP-el di Dispendukcapil"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 text-slate-800 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    OPD Penanggung Jawab
                  </label>
                  <input
                    type="text"
                    value={newOpd}
                    onChange={(e) => setNewOpd(e.target.value)}
                    placeholder="Contoh: Dinas Kependudukan & Pencatatan Sipil Sidoarjo"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 text-slate-800 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Catatan Untuk Pemohon / Status Dokumen
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Contoh: Dokumen e-KTP telah dicetak dan siap diambil di Kantor Kecamatan atau via Pos pengantaran."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full p-3 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 text-slate-800 outline-none"
                  ></textarea>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-700/20 flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Memproses...' : 'Simpan Tahapan'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
