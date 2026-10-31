import React, { useState } from 'react';
import { FileText, MapPin, UploadCloud, CheckCircle2, Trash2, HelpCircle, Send, BookmarkCheck, Image as ImageIcon } from 'lucide-react';
import { ReportFormInput, ReportItem } from '../types/report';

interface ReportFormCardProps {
  onSubmitReport: (report: Partial<ReportItem>) => void;
  onSaveDraft?: (report: ReportFormInput) => void;
}

export const ReportFormCard: React.FC<ReportFormCardProps> = ({
  onSubmitReport,
  onSaveDraft,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [locationAddress, setLocationAddress] = useState('Jl. Pahlawan No. 42, Kel. Sidokumpul, Kec. Sidoarjo');
  const [detectedCoords, setDetectedCoords] = useState('-7.4478° S, 112.7183° E');
  const [detectedVillage, setDetectedVillage] = useState('Kelurahan Sidokumpul');
  const [description, setDescription] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [hasUploadedFile, setHasUploadedFile] = useState(true);
  const [fileName, setFileName] = useState('foto_jalan_rusak_pahlawan.jpg');
  const [fileSize, setFileSize] = useState('1.8 MB');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mapPickerNotice, setMapPickerNotice] = useState(false);

  const popularCategories = [
    { label: 'Jalan Rusak', value: 'Jalan Rusak' },
    { label: 'Lampu PJU', value: 'Lampu Jalan (PJU)' },
    { label: 'Sampah', value: 'Kebersihan & Sampah' },
  ];

  const handleSelectPopular = (val: string) => {
    setCategory(val);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name);
      setFileSize(`${(file.size / (1024 * 1024)).toFixed(1)} MB`);
      setHasUploadedFile(true);
    }
  };

  const handlePickMap = () => {
    setMapPickerNotice(true);
    setTimeout(() => {
      setLocationAddress('Jl. Pahlawan No. 42, Kel. Sidokumpul, Kec. Sidoarjo Kota');
      setDetectedCoords('-7.4478° S, 112.7183° E');
      setDetectedVillage('Kelurahan Sidokumpul (Akurat via GPS Pemkab)');
      setMapPickerNotice(false);
    }, 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Mohon isi Judul Laporan.');
      return;
    }
    if (!category) {
      alert('Mohon pilih Kategori Permasalahan.');
      return;
    }

    setIsSubmitting(true);
    const newReport: Partial<ReportItem> = {
      title: title.trim(),
      category: category,
      categoryKey: category.toLowerCase().includes('jalan')
        ? 'jalan'
        : category.toLowerCase().includes('lampu') || category.toLowerCase().includes('pju')
        ? 'pju'
        : category.toLowerCase().includes('sampah')
        ? 'sampah'
        : 'lainnya',
      location: locationAddress,
      description: description || 'Laporan kendala fasilitas publik Sidoarjo.',
      isAnonymous: isAnonymous,
      fileName: hasUploadedFile ? fileName : undefined,
      fileSize: hasUploadedFile ? fileSize : undefined,
      opd: category.toLowerCase().includes('jalan')
        ? 'Dinas PU Bina Marga & SDA Kab. Sidoarjo'
        : category.toLowerCase().includes('lampu')
        ? 'Dinas Perhubungan Sidoarjo'
        : 'Dinas Lingkungan Hidup dan Kebersihan',
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitReport(newReport);
      // Reset form
      setTitle('');
      setDescription('');
    }, 800);
  };

  const handleDraft = () => {
    if (onSaveDraft) {
      onSaveDraft({
        title,
        category,
        locationAddress,
        coordinates: detectedCoords,
        description,
        isAnonymous,
      });
    }
    alert('Draf laporan Anda berhasil disimpan di perangkat ini.');
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-emerald-100/90 shadow-sm relative">
      
      {/* Card Header */}
      <div className="flex items-start justify-between gap-4 pb-6 border-b border-slate-100">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#EFFDF4] border border-emerald-200/80 text-emerald-800 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-emerald-700" />
          </div>
          <div>
            <h2 className="font-display font-bold text-xl text-[#15211C]">
              Buat Laporan Baru
            </h2>
            <p className="text-xs sm:text-sm text-[#5A6862] mt-0.5">
              Isi data laporan dengan jelas dan valid.
            </p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold shrink-0">
          Wajib Diisi
        </span>
      </div>

      {/* Form Form */}
      <form onSubmit={handleSubmit} className="pt-6 space-y-6">
        
        {/* 1. Judul Laporan */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Judul Laporan <span className="text-red-500">*</span>
            </label>
            <span className="text-[11px] text-slate-400">
              {title.length}/80 karakter
            </span>
          </div>
          <input
            type="text"
            maxLength={80}
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Contoh: Jalan berlubang di Jl. Pahlawan"
            className="w-full px-4 py-3 bg-[#F0FDF4]/50 hover:bg-[#F0FDF4]/80 focus:bg-white text-slate-900 text-sm rounded-xl border border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 outline-none transition-all placeholder:text-slate-400"
          />
          <p className="text-[11px] text-slate-400 mt-1">
            Ringkas & jelas.
          </p>
        </div>

        {/* 2. Kategori Permasalahan */}
        <div>
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wide mb-1.5">
            Kategori Permasalahan <span className="text-red-500">*</span>
          </label>
          <select
            value={category}
            required
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 bg-white text-slate-800 text-sm rounded-xl border border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 outline-none transition-all"
          >
            <option value="">Pilih Kategori Permasalahan</option>
            <option value="Jalan Rusak">Jalan Rusak & Fasilitas Jalan</option>
            <option value="Lampu Jalan (PJU)">Lampu Jalan (PJU) Mati / Rusak</option>
            <option value="Kebersihan & Sampah">Kebersihan, Sampah & Saluran Air</option>
            <option value="Drainase & Saluran Air">Drainase & Saluran Pembuangan Air</option>
            <option value="Pelayanan Administrasi OPD">Pelayanan Publik & Administrasi</option>
            <option value="Fasilitas Kesehatan">Puskesmas & Fasilitas Kesehatan</option>
            <option value="Lainnya">Lainnya</option>
          </select>

          {/* Popular Tag Selectors */}
          <div className="flex flex-wrap items-center gap-2 mt-2.5">
            <span className="text-xs text-slate-500 font-medium mr-1">Populer:</span>
            {popularCategories.map((pop) => (
              <button
                key={pop.label}
                type="button"
                onClick={() => handleSelectPopular(pop.value)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  category === pop.value
                    ? 'bg-emerald-600 text-white font-semibold'
                    : 'bg-[#EFFDF4] text-emerald-900 border border-emerald-200/80 hover:bg-emerald-100'
                }`}
              >
                {pop.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Lokasi Kejadian */}
        <div>
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wide mb-1.5">
            Lokasi Kejadian <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <MapPin className="w-4 h-4 text-emerald-700 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                value={locationAddress}
                onChange={(e) => setLocationAddress(e.target.value)}
                placeholder="Jl. Pahlawan No. 42, Kel. Sidokumpul, Kec. Sidoarjo"
                className="w-full pl-10 pr-4 py-3 bg-[#F0FDF4]/50 focus:bg-white text-slate-800 text-sm rounded-xl border border-slate-200 focus:border-emerald-600 outline-none transition-all"
              />
            </div>
            <button
              type="button"
              onClick={handlePickMap}
              className="px-4 py-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-semibold text-xs sm:text-sm rounded-xl border border-emerald-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0"
            >
              <MapPin className="w-4 h-4 text-emerald-700" />
              <span>Pilih di Peta</span>
            </button>
          </div>

          {/* Coordinate detection banner */}
          <div className="mt-2 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between text-[11px] sm:text-xs text-slate-600">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span>Titik Terdeteksi: <strong>{detectedCoords}</strong></span>
            </div>
            <span className="text-emerald-800 font-medium">
              {mapPickerNotice ? 'Memperbarui koordinat...' : detectedVillage}
            </span>
          </div>
        </div>

        {/* 4. Deskripsi Lengkap Permasalahan */}
        <div>
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wide mb-1.5">
            Deskripsi Lengkap Permasalahan <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={4}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tuliskan kronologi singkat dan patokan lokasi..."
            className="w-full p-4 bg-white text-slate-800 text-sm rounded-xl border border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 outline-none transition-all placeholder:text-slate-400 leading-relaxed"
          />
          <p className="text-[11px] text-slate-400 mt-1">
            Tuliskan kronologi, patokan lokasi, dan dampaknya.
          </p>
        </div>

        {/* 5. Unggah Bukti Foto / Dokumen Pendukung */}
        <div>
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wide mb-1.5">
            Unggah Bukti Foto / Dokumen Pendukung
          </label>

          {/* Drag & Drop Area */}
          <div className="border-2 border-dashed border-emerald-300/80 bg-[#EFFDF4]/60 hover:bg-[#EFFDF4] rounded-2xl p-6 sm:p-8 text-center transition-all relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              title="Pilih file foto laporan"
            />
            <div className="w-12 h-12 rounded-xl bg-white text-emerald-700 mx-auto flex items-center justify-center shadow-xs border border-emerald-200 mb-3 pointer-events-none">
              <UploadCloud className="w-6 h-6 text-emerald-600" />
            </div>
            <h4 className="font-display font-bold text-sm text-slate-800 pointer-events-none">
              Tarik & lepas foto di sini
            </h4>
            <p className="text-xs text-slate-500 mt-0.5 pointer-events-none">
              Maks. 3 foto (JPG/PNG/WEBP, maks 5MB/berkas)
            </p>
            <div className="mt-3.5 inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 shadow-2xs pointer-events-none">
              <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
              <span>Pilih File</span>
            </div>
          </div>

          {/* Uploaded File Preview Item */}
          {hasUploadedFile && (
            <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {/* Thumbnail Preview */}
                <div className="w-10 h-10 rounded-lg bg-emerald-100 overflow-hidden flex items-center justify-center shrink-0 border border-emerald-200">
                  <img
                    src="/src/assets/images/sidoarjo_civic_center_1793361616866.jpg"
                    alt="Bukti foto"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-800 leading-tight">
                    {fileName}
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                    <span>{fileSize}</span>
                    <span>•</span>
                    <span className="text-emerald-700 font-medium">Berhasil diunggah</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <button
                  type="button"
                  onClick={() => setHasUploadedFile(false)}
                  className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                  title="Hapus berkas"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 6. Opsi Rahasia / Anonim */}
        <div className="pt-1">
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="mt-1 w-4 h-4 rounded text-emerald-600 border-slate-300 focus:ring-emerald-500"
            />
            <div>
              <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <span>Lapor secara Rahasia / Anonim</span>
                <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Identitas disembunyikan dari publik.
              </p>
            </div>
          </label>
        </div>

        {/* 7. Action Buttons */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-end gap-3">
          <button
            type="button"
            onClick={handleDraft}
            className="px-5 py-2.5 bg-slate-50 hover:bg-slate-100 text-emerald-950 font-semibold text-xs sm:text-sm rounded-xl border border-slate-300 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <BookmarkCheck className="w-4 h-4 text-emerald-800" />
            <span>Simpan Draf</span>
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-[#083C2E] hover:bg-[#05241B] text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-sm hover:shadow-md flex items-center gap-2 cursor-pointer active:scale-98 disabled:opacity-60"
          >
            <Send className="w-4 h-4 text-emerald-300" />
            <span>{isSubmitting ? 'Mengirim...' : 'Kirim Laporan'}</span>
          </button>
        </div>

      </form>
    </div>
  );
};
