import React, { useState } from 'react';
import { X, Send, FileUp, CheckCircle2 } from 'lucide-react';
import { ServiceItem, CitizenAccount } from '../types/portal';

interface ServiceApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceItem | null;
  currentUser: CitizenAccount | null;
  onSubmitSuccess: (application: { trackingId: string; serviceName: string; applicantName: string }) => void;
}

export const ServiceApplicationModal: React.FC<ServiceApplicationModalProps> = ({
  isOpen,
  onClose,
  service,
  currentUser,
  onSubmitSuccess,
}) => {
  const [keperluan, setKeperluan] = useState('');
  const [alamat, setAlamat] = useState(currentUser?.kelurahan ? `Kec. ${currentUser.kecamatan}, Kel. ${currentUser.kelurahan}` : '');
  const [fileName, setFileName] = useState<string | null>(null);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  if (!isOpen || !service) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate tracking code unik berbasis timestamp Sidoarjo
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const trackingCode = `SDA-${Date.now().toString().slice(-4)}-${randomSuffix}`;

    setSubmittedId(trackingCode);
    onSubmitSuccess({
      trackingId: trackingCode,
      serviceName: service.title,
      applicantName: currentUser?.fullName || 'Warga Sidoarjo',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        <div className="bg-[#083C2E] px-6 py-4 text-white flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg">Formulir Pengajuan Layanan</h3>
            <p className="text-xs text-emerald-300">{service.title} - Pemkab Sidoarjo</p>
          </div>
          <button onClick={onClose}><X className="w-5 h-5 cursor-pointer" /></button>
        </div>

        {submittedId ? (
          <div className="p-8 text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h4 className="font-bold text-xl text-slate-900">Pengajuan Berhasil Dikirim!</h4>
            <p className="text-sm text-slate-600">Simpan Nomor Registrasi Berkas Anda:</p>
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl font-mono font-bold text-lg text-emerald-900">
              {submittedId}
            </div>
            <p className="text-xs text-slate-400">Gunakan nomor ini pada menu "Lacak Berkas" untuk memantau status verifikasi.</p>
            <button
              onClick={() => { setSubmittedId(null); onClose(); }}
              className="w-full py-2.5 bg-[#038D66] text-white font-semibold rounded-xl text-sm cursor-pointer hover:bg-[#026E4F] transition-colors"
            >
              Selesai
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nama Pemohon</label>
              <input
                type="text"
                disabled
                value={currentUser?.fullName || 'Warga Sidoarjo'}
                className="w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded-xl text-sm text-slate-600"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Alamat Domisili / Kecamatan</label>
              <input
                type="text"
                required
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
                placeholder="Contoh: Jl. Ahmad Yani No. 12, Kec. Sidoarjo"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Rincian Permohonan / Catatan</label>
              <textarea
                required
                rows={3}
                value={keperluan}
                onChange={(e) => setKeperluan(e.target.value)}
                placeholder="Jelaskan kebutuhan pengurusan dokumen Anda..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Upload Berkas Pendukung (KTP/KK/Surat Pengantar)</label>
              <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-xl cursor-pointer bg-slate-50">
                <FileUp className="w-6 h-6 text-slate-400 mb-1" />
                <span className="text-xs text-slate-600">{fileName || 'Klik untuk memilih file PDF atau JPG (Maks. 5MB)'}</span>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  onChange={(e) => setFileName(e.target.files?.[0]?.name || null)}
                />
              </label>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-[#038D66] hover:bg-[#026E4F] text-white font-semibold rounded-xl text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Kirim Permohonan Berkas</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
