import React, { useState, useEffect } from 'react';
import {
  FileText,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  RefreshCw,
  Send,
  Building2,
  MapPin,
  X,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  User,
  Calendar,
} from 'lucide-react';

interface ReportTimeline {
  step_number: number;
  stage_name: string;
  status_text: string;
  description: string;
  officer_or_system: string;
  is_completed: number;
  created_at: string;
}

interface ReportItem {
  id: number;
  ticket_number: string;
  title: string;
  category: string;
  category_label: string;
  description: string;
  kecamatan: string;
  kelurahan: string;
  location_address: string;
  reporter_name: string;
  is_anonymous: number;
  status: string;
  progress_percent: number;
  assigned_opd: string;
  sla_target: string;
  official_response?: string;
  responder_name?: string;
  responder_opd?: string;
  created_at: string;
  updated_at: string;
  timeline?: ReportTimeline[];
}

const OPD_LIST = [
  'Dinas PU Bina Marga & Sumber Daya Air Sidoarjo',
  'Dinas Perhubungan Kabupaten Sidoarjo',
  'Dinas Lingkungan Hidup dan Kebersihan (DLHK)',
  'Badan Penanggulangan Bencana Daerah (BPBD 112)',
  'Dinas Kesehatan Kab. Sidoarjo',
  'Dinas Sosial Kabupaten Sidoarjo',
  'Dinas Kependudukan & Pencatatan Sipil Sidoarjo',
  'Kantor Kecamatan Sidoarjo Kota',
  'Kantor Kecamatan Candi',
  'Kantor Kecamatan Waru',
];

const STATUS_OPTIONS = [
  'Menunggu Verifikasi',
  'Penanganan Lapangan',
  'Selesai',
  'Ditolak',
];

export const AdminReports: React.FC = () => {
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<ReportItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('semua');
  const [categoryFilter, setCategoryFilter] = useState('semua');

  // Edit / Response states in modal
  const [newStatus, setNewStatus] = useState('');
  const [newOpd, setNewOpd] = useState('');
  const [officialNotes, setOfficialNotes] = useState('');
  const [progressPercent, setProgressPercent] = useState(50);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const fetchReports = async () => {
    setIsLoading(true);
    const token =
      sessionStorage.getItem('sitapak_auth_token') ||
      localStorage.getItem('sitapak_auth_token');
    try {
      const url = new URL('/api/admin/reports', window.location.origin);
      if (statusFilter !== 'semua') url.searchParams.set('status', statusFilter);
      if (categoryFilter !== 'semua') url.searchParams.set('category', categoryFilter);
      if (searchQuery.trim()) url.searchParams.set('search', searchQuery.trim());

      const res = await fetch(url.toString(), {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setReports(data);
          return;
        }
      }

      // Fallback cerdas: Panggil /api/reports langsung ke database backend
      const pubRes = await fetch('/api/reports?limit=100');
      if (pubRes.ok) {
        const pubJson = await pubRes.json();
        const list = Array.isArray(pubJson) ? pubJson : (pubJson.data || []);
        if (list.length > 0) {
          setReports(list);
          return;
        }
      }
      throw new Error('Gagal mengambil laporan');
    } catch (err) {
      console.warn('Admin fetch reports warning:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [statusFilter, categoryFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchReports();
  };

  const openHandleModal = (report: ReportItem) => {
    setSelectedReport(report);
    setNewStatus(report.status);
    setNewOpd(report.assigned_opd);
    setProgressPercent(report.progress_percent || 50);
    setOfficialNotes(report.official_response || '');
    setActionSuccess(null);
    setIsModalOpen(true);
  };

  const handleSubmitUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReport) return;

    setIsSubmitting(true);
    setActionSuccess(null);

    const token =
      sessionStorage.getItem('sitapak_auth_token') ||
      localStorage.getItem('sitapak_auth_token');
    try {
      const res = await fetch(`/api/admin/reports/${selectedReport.id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          status: newStatus,
          assignedOpd: newOpd,
          progressPercent,
          officialResponse: officialNotes,
          officerNotes: officialNotes,
        }),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => null);
        throw new Error(errJson?.message || 'Gagal memperbarui status laporan.');
      }

      setActionSuccess(`Status tiket ${selectedReport.ticket_number} berhasil diperbarui menjadi '${newStatus}'.`);
      setTimeout(() => {
        setIsModalOpen(false);
        fetchReports();
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
      case 'Penanganan Lapangan':
      case 'Sedang Diproses':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Menunggu Verifikasi':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Ditolak':
        return 'bg-rose-50 text-rose-700 border-rose-200';
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
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Modul Manajemen Aduan Warga
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display mt-1">
            SP4N-LAPOR! & Call 112 Kabupaten Sidoarjo
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Verifikasi validitas aduan, disposisi mandat ke OPD teknis, dan input tanggapan tindak lanjut resmi.
          </p>
        </div>

        <button
          onClick={fetchReports}
          disabled={isLoading}
          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer self-start md:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-emerald-400' : ''}`} />
          <span>Segarkan Data</span>
        </button>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
        <form onSubmit={handleSearchSubmit} className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari berdasarkan No. Tiket (LAPOR-...), Judul, Pelapor, atau Kecamatan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
          />
        </form>

        <div className="flex flex-wrap items-center gap-2">
          {/* Status Filter */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent font-medium text-slate-700 outline-none cursor-pointer"
            >
              <option value="semua">Semua Status</option>
              <option value="Menunggu Verifikasi">Menunggu Verifikasi</option>
              <option value="Penanganan Lapangan">Penanganan Lapangan</option>
              <option value="Selesai">Selesai Ditangani</option>
              <option value="Ditolak">Ditolak</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-transparent font-medium text-slate-700 outline-none cursor-pointer"
            >
              <option value="semua">Semua Kategori</option>
              <option value="infrastruktur">Jalan & Jembatan</option>
              <option value="pju">Lampu PJU & Rambu</option>
              <option value="sampah">Kebersihan & Sampah</option>
              <option value="sosial">Kesejahteraan & Bansos</option>
              <option value="kesehatan">Layanan Kesehatan</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reports Table / List */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center space-y-3">
            <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin mx-auto" />
            <p className="text-xs text-slate-500 font-medium">Memuat data pengaduan warga...</p>
          </div>
        ) : reports.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <FileText className="w-10 h-10 text-slate-300 mx-auto" />
            <h4 className="text-sm font-bold text-slate-700">Tidak ada laporan yang sesuai filter</h4>
            <p className="text-xs text-slate-400">Coba ubah kata kunci pencarian atau reset filter status.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200/80">
                <tr>
                  <th className="py-3 px-4">No. Tiket</th>
                  <th className="py-3 px-4">Judul & Kategori</th>
                  <th className="py-3 px-4">Lokasi / Kecamatan</th>
                  <th className="py-3 px-4">Pelapor</th>
                  <th className="py-3 px-4">Disposisi OPD</th>
                  <th className="py-3 px-4">Status & Progress</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {reports.map((report) => (
                  <tr key={report.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      {report.ticket_number}
                      <div className="text-[10px] text-slate-400 font-sans mt-0.5">
                        {report.created_at ? new Date(report.created_at).toLocaleDateString('id-ID') : 'Baru'}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="font-bold text-slate-900 line-clamp-1">{report.title}</div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-semibold">
                          {report.category_label || report.category}
                        </span>
                        <span className="text-[10px] text-slate-400">SLA: {report.sla_target || '3x24 Jam'}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1 text-slate-800 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>Kec. {report.kecamatan}</span>
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">
                        {report.location_address || report.kelurahan}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-800">
                        {report.is_anonymous ? 'Warga Anonim' : report.reporter_name}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {report.is_anonymous ? 'Privasi Dilindungi' : 'KTP Terverifikasi'}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 max-w-[200px]">
                      <div className="flex items-center gap-1 text-[11px] text-slate-700 line-clamp-2">
                        <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                        <span>{report.assigned_opd || 'Belum Ditentukan'}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="space-y-1.5">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold border ${getStatusBadge(report.status)}`}>
                          {report.status}
                        </span>
                        <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full"
                            style={{ width: `${report.progress_percent || 25}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => openHandleModal(report)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-xs transition-all cursor-pointer"
                      >
                        Kelola
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal / Drawer for Report Handling */}
      {isModalOpen && selectedReport && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full max-h-[calc(100dvh-1.5rem)] sm:max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 sm:p-6 bg-slate-900 text-white flex items-center justify-between shrink-0">
              <div className="min-w-0 pr-2">
                <span className="text-xs font-mono font-bold text-emerald-400 block truncate">
                  {selectedReport.ticket_number}
                </span>
                <h3 className="text-base sm:text-lg font-bold font-display mt-0.5 text-white truncate">
                  Tindak Lanjut & Verifikasi Aduan
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                aria-label="Tutup modal aduan"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 space-y-6 overflow-y-auto flex-1">
              {/* Report Information Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{selectedReport.title}</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{selectedReport.description}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold shrink-0 border ${getStatusBadge(selectedReport.status)}`}>
                    {selectedReport.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 border-t border-slate-200/80 text-[11px] text-slate-600">
                  <div>
                    <span className="text-slate-400 block">Kategori:</span>
                    <span className="font-semibold text-slate-800">{selectedReport.category_label || selectedReport.category}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Pelapor:</span>
                    <span className="font-semibold text-slate-800">
                      {selectedReport.is_anonymous ? 'Warga Anonim' : selectedReport.reporter_name}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Kecamatan:</span>
                    <span className="font-semibold text-slate-800">{selectedReport.kecamatan}</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-600 bg-white p-2.5 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-700">Alamat Lengkap:</span> {selectedReport.location_address}
                </div>
              </div>

              {/* Form Actions: Update Status, Disposisi, Notes */}
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
                      Ubah Status Penanganan
                    </label>
                    <select
                      value={newStatus}
                      onChange={(e) => {
                        const s = e.target.value;
                        setNewStatus(s);
                        if (s === 'Selesai') setProgressPercent(100);
                        else if (s === 'Penanganan Lapangan') setProgressPercent(75);
                        else if (s === 'Ditolak') setProgressPercent(0);
                        else setProgressPercent(25);
                      }}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 font-semibold text-slate-800 outline-none"
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
                      className="w-full mt-2 accent-emerald-600 cursor-pointer"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Disposisi ke OPD Teknis
                  </label>
                  <select
                    value={newOpd}
                    onChange={(e) => setNewOpd(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 font-medium text-slate-800 outline-none"
                  >
                    {OPD_LIST.map((opd) => (
                      <option key={opd} value={opd}>
                        {opd}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Tanggapan Resmi Petugas / Tindak Lanjut
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Contoh: Petugas telah diterjunkan ke lokasi untuk perbaikan aspal dan pekerjaan dijadwalkan selesai hari ini."
                    value={officialNotes}
                    onChange={(e) => setOfficialNotes(e.target.value)}
                    className="w-full p-3 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 text-slate-800 outline-none"
                  ></textarea>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Catatan ini akan otomatis muncul pada tracking publik warga dan tercatat dalam audit trail log keamanan SPBE.
                  </p>
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
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-700/20 flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Menyimpan...' : 'Simpan Pembaruan'}</span>
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
