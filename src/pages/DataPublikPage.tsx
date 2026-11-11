import { Icon } from '../components/common/Icon';
import React, { useState, useMemo } from 'react';

export interface DatasetItem {
  id: string;
  title: string;
  description: string;
  opd: string;
  category: 'keuangan' | 'kependudukan' | 'infrastruktur' | 'kesehatan' | 'pendidikan' | 'ekonomi';
  categoryLabel: string;
  updatedAt: string;
  formats: string[];
  size: string;
  downloadCount: number;
  badgeColor: string;
  sampleColumns: string[];
  sampleRows: Record<string, string | number>[];
}

export interface KecamatanBudget {
  nama: string;
  pagu: string;
  penduduk: string;
  prioritas: string;
  progres: string;
}

export interface StrategicProject {
  nama: string;
  lokasi: string;
  anggaran: string;
  rekanan: string;
  progres: number;
  status: 'Pengerjaan 85%' | 'Pengerjaan 65%' | 'Selesai 100%' | 'Tahap Akhir 92%';
}

const datasetsData: DatasetItem[] = [
  {
    id: 'apbd-q3-2026',
    title: 'Data Realisasi Anggaran APBD Kabupaten Sidoarjo Triwulan III 2026',
    description:
      'Rincian pendapatan asli daerah, belanja operasi, belanja modal, belanja tak terduga, dan pembiayaan per satuan kerja perangkat daerah (SKPD).',
    opd: 'BPKAD Kab. Sidoarjo',
    category: 'keuangan',
    categoryLabel: 'Keuangan Daerah',
    updatedAt: 'Diperbarui 3 hari lalu',
    formats: ['.CSV', '.XLSX', '.JSON'],
    size: '2.4 MB',
    downloadCount: 3412,
    badgeColor: 'bg-[#ffe087] text-[#231a00]',
    sampleColumns: ['Kode Rekening', 'Nama Rekening / SKPD', 'Pagu Anggaran (Rp)', 'Realisasi (Rp)', 'Persentase (%)'],
    sampleRows: [
      { 'Kode Rekening': '4.1.01', 'Nama Rekening / SKPD': 'Pajak Daerah (BPPD)', 'Pagu Anggaran (Rp)': '1.450.000.000.000', 'Realisasi (Rp)': '1.189.000.000.000', 'Persentase (%)': '82.0%' },
      { 'Kode Rekening': '4.1.02', 'Nama Rekening / SKPD': 'Retribusi Daerah', 'Pagu Anggaran (Rp)': '185.000.000.000', 'Realisasi (Rp)': '148.000.000.000', 'Persentase (%)': '80.0%' },
      { 'Kode Rekening': '5.1.01', 'Nama Rekening / SKPD': 'Dinas Pendidikan & Kebudayaan', 'Pagu Anggaran (Rp)': '1.310.000.000.000', 'Realisasi (Rp)': '1.063.720.000.000', 'Persentase (%)': '81.2%' },
      { 'Kode Rekening': '5.1.02', 'Nama Rekening / SKPD': 'Dinas PU Bina Marga & SDA', 'Pagu Anggaran (Rp)': '1.135.000.000.000', 'Realisasi (Rp)': '845.575.000.000', 'Persentase (%)': '74.5%' },
      { 'Kode Rekening': '5.1.03', 'Nama Rekening / SKPD': 'Dinas Kesehatan & RSUD Sidoarjo', 'Pagu Anggaran (Rp)': '960.000.000.000', 'Realisasi (Rp)': '825.600.000.000', 'Persentase (%)': '86.0%' },
    ],
  },
  {
    id: 'kependudukan-2026',
    title: 'Kompilasi Jumlah Penduduk, Kepala Keluarga & Rasio Gender per Desa/Kecamatan 2026',
    description:
      'Tabel agregat kependudukan 18 kecamatan, 318 desa, dan 31 kelurahan. Bebas data privat perseorangan (tanpa NIK) sesuai kaidah UU PDP.',
    opd: 'Disdukcapil Sidoarjo',
    category: 'kependudukan',
    categoryLabel: 'Kependudukan',
    updatedAt: 'Diperbarui 1 pekan lalu',
    formats: ['.CSV', '.JSON'],
    size: '1.8 MB',
    downloadCount: 5120,
    badgeColor: 'bg-[#8af7c9] text-[#002115]',
    sampleColumns: ['Kecamatan', 'Jumlah Desa/Kel.', 'Penduduk Laki-laki', 'Penduduk Perempuan', 'Total Penduduk', 'Jumlah KK'],
    sampleRows: [
      { Kecamatan: 'Sidoarjo Kota', 'Jumlah Desa/Kel.': 24, 'Penduduk Laki-laki': '99.820', 'Penduduk Perempuan': '98.580', 'Total Penduduk': '198.400', 'Jumlah KK': '63.200' },
      { Kecamatan: 'Waru', 'Jumlah Desa/Kel.': 17, 'Penduduk Laki-laki': '108.900', 'Penduduk Perempuan': '106.700', 'Total Penduduk': '215.600', 'Jumlah KK': '71.400' },
      { Kecamatan: 'Taman', 'Jumlah Desa/Kel.': 24, 'Penduduk Laki-laki': '93.200', 'Penduduk Perempuan': '91.700', 'Total Penduduk': '184.900', 'Jumlah KK': '59.800' },
      { Kecamatan: 'Candi', 'Jumlah Desa/Kel.': 24, 'Penduduk Laki-laki': '77.800', 'Penduduk Perempuan': '76.400', 'Total Penduduk': '154.200', 'Jumlah KK': '49.600' },
      { Kecamatan: 'Gedangan', 'Jumlah Desa/Kel.': 15, 'Penduduk Laki-laki': '71.600', 'Penduduk Perempuan': '70.500', 'Total Penduduk': '142.100', 'Jumlah KK': '45.800' },
    ],
  },
  {
    id: 'infrastruktur-jalan-2026',
    title: 'Daftar Ruas Jalan Kabupaten, Panjang Penanganan & Status Progres Betonisasi 2026',
    description:
      'Geospasial ruas jalan kabupaten beserta nilai kontrak pemenang lelang tender, tanggal mulai pengerjaan, dan estimasi selesai proyek.',
    opd: 'Dinas PU Bina Marga SDA',
    category: 'infrastruktur',
    categoryLabel: 'Infrastruktur',
    updatedAt: 'Diperbarui 31 Okt 2026',
    formats: ['.CSV', '.GEOJSON'],
    size: '4.1 MB',
    downloadCount: 2890,
    badgeColor: 'bg-[#bbedd9] text-[#002117]',
    sampleColumns: ['Ruas Jalan', 'Kecamatan', 'Panjang (Meter)', 'Lebar (M)', 'Nilai Kontrak (Rp)', 'Status Progres'],
    sampleRows: [
      { 'Ruas Jalan': 'Banjarkemantren - Buduran', Kecamatan: 'Buduran', 'Panjang (Meter)': '1.850', 'Lebar (M)': '7.0', 'Nilai Kontrak (Rp)': '12.450.000.000', 'Status Progres': '95% (Selesai)' },
      { 'Ruas Jalan': 'Krembung - Mojoruntut', Kecamatan: 'Krembung', 'Panjang (Meter)': '2.400', 'Lebar (M)': '6.5', 'Nilai Kontrak (Rp)': '15.800.000.000', 'Status Progres': '88% (Pengecoran)' },
      { 'Ruas Jalan': 'Tarik - Mindi', Kecamatan: 'Tarik / Porong', 'Panjang (Meter)': '3.100', 'Lebar (M)': '7.0', 'Nilai Kontrak (Rp)': '21.200.000.000', 'Status Progres': '78% (Struktur Lapisan)' },
      { 'Ruas Jalan': 'Gedangan - Betro', Kecamatan: 'Sedati', 'Panjang (Meter)': '1.450', 'Lebar (M)': '8.0', 'Nilai Kontrak (Rp)': '11.100.000.000', 'Status Progres': '100% (Selesai Mantap)' },
    ],
  },
  {
    id: 'kesehatan-bor-2026',
    title: 'Sebaran Fasilitas Kesehatan, Ketersediaan Tempat Tidur (BOR) & Stok Obat Puskesmas',
    description:
      'Data kapasitas 31 Puskesmas induk, RSUD R.T. Notopuro Sidoarjo, dan RSUD Sidoarjo Barat Krian terintegrasi dengan Satu Sehat Kemenkes.',
    opd: 'Dinas Kesehatan & RSUD Sidoarjo',
    category: 'kesehatan',
    categoryLabel: 'Kesehatan',
    updatedAt: 'Pembaruan Harian Terbuka',
    formats: ['.CSV', '.XLSX'],
    size: '1.2 MB',
    downloadCount: 4670,
    badgeColor: 'bg-[#ffe087] text-[#231a00]',
    sampleColumns: ['Nama Fasilitas', 'Tipe Faskes', 'Total Tempat Tidur', 'Terpakai (BOR)', 'Tersedia', 'Status Integrasi'],
    sampleRows: [
      { 'Nama Fasilitas': 'RSUD R.T. Notopuro', 'Tipe Faskes': 'RSUD Tipe B', 'Total Tempat Tidur': '520', 'Terpakai (BOR)': '418 (80.3%)', Tersedia: '102 TT', 'Status Integrasi': 'Satu Sehat Aktif' },
      { 'Nama Fasilitas': 'RSUD Sidoarjo Barat', 'Tipe Faskes': 'RSUD Tipe C', 'Total Tempat Tidur': '180', 'Terpakai (BOR)': '132 (73.3%)', Tersedia: '48 TT', 'Status Integrasi': 'Satu Sehat Aktif' },
      { 'Nama Fasilitas': 'Puskesmas Sidoarjo Kota', 'Tipe Faskes': 'Puskesmas Rawat Inap', 'Total Tempat Tidur': '15', 'Terpakai (BOR)': '8 (53.3%)', Tersedia: '7 TT', 'Status Integrasi': 'Satu Sehat Aktif' },
      { 'Nama Fasilitas': 'Puskesmas Porong', 'Tipe Faskes': 'Puskesmas Rawat Inap', 'Total Tempat Tidur': '18', 'Terpakai (BOR)': '11 (61.1%)', Tersedia: '7 TT', 'Status Integrasi': 'Satu Sehat Aktif' },
    ],
  },
  {
    id: 'pendidikan-beasiswa-2026',
    title: 'Data Alokasi & Penerima Program Beasiswa Pemuda Berprestasi Sidoarjo 2026',
    description:
      'Sebaran penerima beasiswa prestasi akademik, non-akademik (olahraga/seni), keagamaan, serta mahasiswa pra-sejahtera 18 kecamatan.',
    opd: 'Dinas Pendidikan & Bagian Kesra',
    category: 'pendidikan',
    categoryLabel: 'Pendidikan & Beasiswa',
    updatedAt: 'Diperbarui 5 hari lalu',
    formats: ['.CSV', '.XLSX', '.PDF'],
    size: '1.6 MB',
    downloadCount: 3890,
    badgeColor: 'bg-[#8af7c9] text-[#002115]',
    sampleColumns: ['Kategori Beasiswa', 'Jenjang', 'Target Kuota', 'Penerima Ditetapkan', 'Total Dana (Rp)', 'Status Seleksi'],
    sampleRows: [
      { 'Kategori Beasiswa': 'Prestasi Akademik Kuliah', Jenjang: 'S1 / D4', 'Target Kuota': '4.500 Mahasiswa', 'Penerima Ditetapkan': '4.500', 'Total Dana (Rp)': '22.500.000.000', 'Status Seleksi': 'Pencairan Tahap II' },
      { 'Kategori Beasiswa': 'Prestasi Non-Akademik', Jenjang: 'SMA / Mahasiswa', 'Target Kuota': '1.500 Atlet/Seniman', 'Penerima Ditetapkan': '1.500', 'Total Dana (Rp)': '7.500.000.000', 'Status Seleksi': 'Tuntas Diterima' },
      { 'Kategori Beasiswa': 'Keagamaan / Penghafal Al-Quran', Jenjang: 'Semua Jenjang', 'Target Kuota': '2.000 Santri/Siswa', 'Penerima Ditetapkan': '2.000', 'Total Dana (Rp)': '10.000.000.000', 'Status Seleksi': 'Tuntas Diterima' },
      { 'Kategori Beasiswa': 'Bantuan Khusus Mahasiswa Prasejahtera', Jenjang: 'Perguruan Tinggi', 'Target Kuota': '2.000 Mahasiswa', 'Penerima Ditetapkan': '2.000', 'Total Dana (Rp)': '10.000.000.000', 'Status Seleksi': 'Pencairan Tahap II' },
    ],
  },
  {
    id: 'ekonomi-kurda-2026',
    title: 'Data Pelaku Usaha Mikro & Penyaluran KURDA Sayang BPR Delta Artha 2026',
    description:
      'Distribusi subsidi bunga kredit pinjaman modal usaha bergulir tanpa agunan untuk pelaku UMKM dan pedagang pasar tradisional.',
    opd: 'Dinas Koperasi & UMKM',
    category: 'ekonomi',
    categoryLabel: 'Ekonomi & UMKM',
    updatedAt: 'Diperbarui 2 pekan lalu',
    formats: ['.CSV', '.XLSX'],
    size: '2.1 MB',
    downloadCount: 2140,
    badgeColor: 'bg-[#ffe087] text-[#231a00]',
    sampleColumns: ['Sektor Usaha', 'Jumlah Debitur UMKM', 'Plafon Kredit Rerata', 'Total Realisasi (Rp)', 'Tingkat NPL / Macet'],
    sampleRows: [
      { 'Sektor Usaha': 'Kuliner & Olahan Bandeng/Kupang', 'Jumlah Debitur UMKM': '3.420 Usaha', 'Plafon Kredit Rerata': 'Rp 15.000.000', 'Total Realisasi (Rp)': '51.300.000.000', 'Tingkat NPL / Macet': '0.4%' },
      { 'Sektor Usaha': 'Kerajinan Tas & Kulit Tanggulangin', 'Jumlah Debitur UMKM': '1.250 Pengrajin', 'Plafon Kredit Rerata': 'Rp 25.000.000', 'Total Realisasi (Rp)': '31.250.000.000', 'Tingkat NPL / Macet': '0.7%' },
      { 'Sektor Usaha': 'Perdagangan Eceran Pasar Rakyat', 'Jumlah Debitur UMKM': '4.100 Pedagang', 'Plafon Kredit Rerata': 'Rp 10.000.000', 'Total Realisasi (Rp)': '41.000.000.000', 'Tingkat NPL / Macet': '0.3%' },
      { 'Sektor Usaha': 'Bengkel Las & Industri Logam Waru', 'Jumlah Debitur UMKM': '890 Bengkel', 'Plafon Kredit Rerata': 'Rp 30.000.000', 'Total Realisasi (Rp)': '26.700.000.000', 'Tingkat NPL / Macet': '0.5%' },
    ],
  },
];

const kecamatanBudgets: KecamatanBudget[] = [
  { nama: 'Sidoarjo Kota', pagu: 'Rp 382 Miliar', penduduk: '198.400 Jiwa', prioritas: 'Drainase Perkotaan, MPP Digital, Revitalisasi Alun-alun', progres: '84.2%' },
  { nama: 'Waru', pagu: 'Rp 365 Miliar', penduduk: '215.600 Jiwa', prioritas: 'Penanganan Banjir Kali Buntung, Betonisasi Tambaksari', progres: '79.5%' },
  { nama: 'Taman', pagu: 'Rp 340 Miliar', penduduk: '184.900 Jiwa', prioritas: 'Pelebaran Akses Sepanjang, Puskesmas Pembantu', progres: '81.0%' },
  { nama: 'Krian', pagu: 'Rp 310 Miliar', penduduk: '132.800 Jiwa', prioritas: 'Dukungan Fasilitas RSUD Sibar, Pasar Baru Krian', progres: '85.4%' },
  { nama: 'Candi', pagu: 'Rp 295 Miliar', penduduk: '154.200 Jiwa', prioritas: 'Betonisasi Kalipecabean, Sentra Olahan Kerupuk', progres: '76.8%' },
  { nama: 'Gedangan', pagu: 'Rp 280 Miliar', penduduk: '142.100 Jiwa', prioritas: 'Underpass Gedangan Tahap II, Normalisasi Sungai', progres: '78.2%' },
  { nama: 'Sedati', pagu: 'Rp 260 Miliar', penduduk: '110.300 Jiwa', prioritas: 'Akses Wisata Bahari Tlocor, Betonisasi Betro', progres: '82.7%' },
  { nama: 'Sukodono', pagu: 'Rp 255 Miliar', penduduk: '122.400 Jiwa', prioritas: 'Jalan Beton Anggaswangi, Pengelolaan TPST Desa', progres: '80.1%' },
  { nama: 'Tanggulangin', pagu: 'Rp 245 Miliar', penduduk: '95.200 Jiwa', prioritas: 'Pompa Banjir Kedungbanteng, Revitalisasi INTAKO', progres: '86.5%' },
  { nama: 'Porong', pagu: 'Rp 240 Miliar', penduduk: '82.500 Jiwa', prioritas: 'Flyover Aloha Porong, Penguatan Tanggul Kali Porong', progres: '83.9%' },
  { nama: 'Tulangan', pagu: 'Rp 235 Miliar', penduduk: '104.200 Jiwa', prioritas: 'Betonisasi Grogol - Modong, Jaringan Irigasi Padi', progres: '77.3%' },
  { nama: 'Buduran', pagu: 'Rp 230 Miliar', penduduk: '98.700 Jiwa', prioritas: 'Museum Mpu Tantular & Sentra Beasiswa Guru', progres: '81.6%' },
  { nama: 'Wonoayu', pagu: 'Rp 225 Miliar', penduduk: '88.900 Jiwa', prioritas: 'Jalan Penghubung Krian-Wonoayu, Sarana Pertanian', progres: '75.4%' },
  { nama: 'Jabon', pagu: 'Rp 220 Miliar', penduduk: '56.400 Jiwa', prioritas: 'Pabrik Pengolahan RDF TPA Jabon, Tambak Rakyat', progres: '88.0%' },
  { nama: 'Balongbendo', pagu: 'Rp 215 Miliar', penduduk: '75.800 Jiwa', prioritas: 'Jalan Beton Bakungtemenggungan, Sanitasi Desa', progres: '74.2%' },
  { nama: 'Krembung', pagu: 'Rp 210 Miliar', penduduk: '71.800 Jiwa', prioritas: 'Perbaikan Jembatan Desa, Puskesmas Rawat Inap', progres: '79.0%' },
  { nama: 'Prambon', pagu: 'Rp 205 Miliar', penduduk: '76.500 Jiwa', prioritas: 'Pemberdayaan UMKM Tahu-Tempe, Air Bersih SPAM', progres: '73.8%' },
  { nama: 'Tarik', pagu: 'Rp 195 Miliar', penduduk: '68.300 Jiwa', prioritas: 'Jalan Usaha Tani, Normalisasi Sungai Brantas Hilir', progres: '76.1%' },
];

const strategicProjects: StrategicProject[] = [
  { nama: 'Penyelesaian Flyover Aloha Juanda & Penataan Simpang', lokasi: 'Kec. Waru / Gedangan', anggaran: 'Rp 345,8 Miliar', rekanan: 'PT Wijaya Karya - Kerjasama Pemkab', progres: 100, status: 'Selesai 100%' },
  { nama: 'Betonisasi 142 Titik Ruas Jalan Kabupaten (Tahap IV)', lokasi: 'Tersebar di 18 Kecamatan', anggaran: 'Rp 612,4 Miliar', rekanan: 'Konsorsium Bina Marga Delta', progres: 92, status: 'Tahap Akhir 92%' },
  { nama: 'Perluasan Gedung Baru & Ruang Bedah Jantung Terpadu RSUD Sidoarjo', lokasi: 'Jl. Mojopahit, Sidoarjo Kota', anggaran: 'Rp 184,2 Miliar', rekanan: 'PT PP Persero Delta Health', progres: 85, status: 'Pengerjaan 85%' },
  { nama: 'Fasilitas Pengolahan Bahan Bakar Sampah RDF Unit II TPA Jabon', lokasi: 'TPA Griyo Mulyo, Kec. Jabon', anggaran: 'Rp 96,5 Miliar', rekanan: 'PT Barata Indonesia Rekayasa', progres: 88, status: 'Pengerjaan 85%' },
  { nama: 'Pembangunan Saluran Drainase Induk & Rumah Pompa Kali Cantel', lokasi: 'Kecamatan Tanggulangin & Porong', anggaran: 'Rp 58,7 Miliar', rekanan: 'PT Delta Pratama Konstruksi', progres: 65, status: 'Pengerjaan 65%' },
  { nama: 'Revitalisasi Pasar Krian & Sentra UMKM Berkelanjutan', lokasi: 'Kecamatan Krian', anggaran: 'Rp 42,1 Miliar', rekanan: 'PT Cipta Karya Jatim Mandiri', progres: 92, status: 'Tahap Akhir 92%' },
];

export const DataPublikPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('2026');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');
  const [budgetTab, setBudgetTab] = useState<'ringkasan' | 'pendapatan' | 'belanja' | 'pembiayaan'>('ringkasan');
  
  const [previewDataset, setPreviewDataset] = useState<DatasetItem | null>(null);
  const [apiModalOpen, setApiModalOpen] = useState(false);
  const [ppidModalOpen, setPpidModalOpen] = useState(false);
  const [kecamatanModalOpen, setKecamatanModalOpen] = useState(false);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [ppidForm, setPpidForm] = useState({
    nama: '',
    nik: '',
    email: '',
    tujuan: '',
    rincianData: '',
    formatDipilih: 'CSV / Excel',
  });
  const [ppidSubmitted, setPpidSubmitted] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleDownloadFile = (datasetTitle: string, format: string) => {
    showToast(`Memulai pengunduhan berkas: ${datasetTitle} (${format}). Berkas siap digunakan.`);
  };

  // Filtered datasets based on category and live search
  const filteredDatasets = useMemo(() => {
    return datasetsData.filter((item) => {
      const matchCat = activeCategory === 'all' || item.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.opd.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [activeCategory, searchQuery]);

  const handlePpidSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPpidSubmitted(true);
    setTimeout(() => {
      showToast('Permohonan informasi publik PPID berhasil dikirim! Nomor Registrasi: PPID-SDA-2026-' + Math.floor(1000 + Math.random() * 9000));
      setPpidSubmitted(false);
      setPpidModalOpen(false);
      setPpidForm({ nama: '', nik: '', email: '', tujuan: '', rincianData: '', formatDipilih: 'CSV / Excel' });
    }, 1200);
  };

  return (
    <div className="w-full bg-[#F8FAF9] min-h-screen text-[#121e19] font-['Inter',sans-serif]">
      
      {/* Toast Alert Feedback */}
      {toastMessage && (
        <div className="fixed top-24 right-4 sm:right-8 z-50 max-w-md bg-[#00251b] text-white p-4 rounded-xl shadow-2xl border border-[#8af7c9]/40 flex items-start gap-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <Icon className="material-symbols-outlined text-[#8af7c9] text-[22px] shrink-0 mt-0.5">check_circle</Icon>
          <div className="text-xs sm:text-sm font-medium leading-relaxed">
            {toastMessage}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. BREADCRUMBS & EXECUTIVE HEADER (Beranda Style)                         */}
      {/* ========================================================================= */}
      <section className="relative pt-6 pb-12 overflow-hidden bg-gradient-to-b from-[#F2FAF6] to-[#F8FAF9] border-b border-slate-200/80">
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#083C2E 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col gap-4">
          
          {/* Breadcrumb Bar */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 font-medium">
              <a className="hover:text-[#038D66] transition-colors flex items-center gap-1" href="#beranda">
                <Icon className="text-[16px]">home</Icon>
                <span>Beranda</span>
              </a>
              <Icon className="text-[14px] text-slate-400">chevron_right</Icon>
              <span className="text-[#038D66] font-semibold">
                Data Publik &amp; Transparansi
              </span>
            </nav>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-200/70 text-emerald-900 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span>Satu Data Indonesia • Katalog Resmi Pemkab Sidoarjo</span>
            </div>
          </div>

          {/* Main Header Block with Context Actions */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white shadow-sm border border-slate-200/90 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/70 text-emerald-900 border border-emerald-200/60 text-xs font-bold tracking-wide">
                <Icon className="text-[16px] text-[#038D66]">hub</Icon>
                PORTAL SATU DATA &amp; KETERBUKAAN INFORMASI PUBLIK (KIP)
              </div>
              <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#15211C] tracking-tight">
                Data Publik &amp; Transparansi Sidoarjo
              </h1>
              <p className="text-sm sm:text-base text-[#5A6862] leading-relaxed">
                Informasi anggaran daerah, demografi kependudukan, dan capaian program pembangunan disajikan secara sederhana, transparan, dan mudah dipahami seluruh warga.
              </p>
            </div>

            {/* Controls: Search, Year, Executive PDF */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0 w-full lg:w-auto">
              
              {/* Live Search Bar */}
              <div className="relative flex-1 sm:w-64">
                <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
                  search
                </Icon>
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-11 pl-10 pr-9 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-all"
                  placeholder="Cari data, anggaran, topik..."
                  type="text"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    title="Hapus pencarian"
                  >
                    <Icon className="text-[16px]">close</Icon>
                  </button>
                )}
              </div>

              {/* Fiscal Year Selector */}
              <div className="relative shrink-0">
                <select
                  aria-label="Tahun Anggaran"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="h-11 pl-3.5 pr-8 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
                >
                  <option value="2026">Tahun Anggaran 2026</option>
                  <option value="2025">Tahun Anggaran 2025</option>
                  <option value="2024">Tahun Anggaran 2024</option>
                </select>
                <Icon className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 text-[18px]">
                  expand_more
                </Icon>
              </div>

              {/* Download Executive PDF */}
              <button
                onClick={() => handleDownloadFile(`Ringkasan Eksekutif APBD Sidoarjo ${selectedYear}`, 'PDF')}
                className="h-11 px-4 rounded-xl bg-[#038D66] hover:bg-[#026E4F] text-white text-sm font-semibold flex items-center justify-center gap-2 active:scale-95 transition-all shadow-sm shrink-0 cursor-pointer"
                type="button"
              >
                <Icon className="text-[18px]">picture_as_pdf</Icon>
                <span>Unduh Rekap (PDF)</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. KEY CIVIC METRIC CARDS (4 Highlight Cards)                             */}
      {/* ========================================================================= */}
      <section className="w-full px-4 sm:px-6 lg:px-8 pb-6 bg-[#F8FAF9]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: APBD */}
          <div className="p-6 rounded-2xl bg-white shadow-sm border border-slate-200 flex flex-col justify-between gap-4 hover:-translate-y-0.5 transition-all duration-200">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#5A6862]">Total APBD Sidoarjo {selectedYear}</span>
                <span className="p-1.5 rounded-lg bg-[#ffe087] text-[#231a00] flex items-center justify-center">
                  <Icon className="material-symbols-outlined text-[18px]">account_balance_wallet</Icon>
                </span>
              </div>
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#15211C] tracking-tight">
                Rp 5,28 <span className="text-lg font-bold text-[#735c00]">Triliun</span>
              </div>
              <p className="text-xs text-[#5A6862] leading-normal">
                Serapan Terealisasi: <strong className="text-[#006c4d] font-bold">84,6% (Rp 4,46 T)</strong> • Sesuai Target
              </p>
            </div>
            <div className="pt-2 border-t border-[#e3f1e9] flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-[#8af7c9] text-[#002115] text-xs font-bold">
                Dana Pembangunan
              </span>
              <Icon className="material-symbols-outlined text-[18px] text-[#006c4d]">trending_up</Icon>
            </div>
          </div>

          {/* Card 2: Demografi */}
          <div className="p-6 rounded-2xl bg-white shadow-sm border border-slate-200 flex flex-col justify-between gap-4 hover:-translate-y-0.5 transition-all duration-200">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#5A6862]">Jumlah Penduduk</span>
                <span className="p-1.5 rounded-lg bg-[#88f4c6] text-[#007151] flex items-center justify-center">
                  <Icon className="material-symbols-outlined text-[18px]">groups</Icon>
                </span>
              </div>
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#15211C] tracking-tight">
                2,08 <span className="text-lg font-bold text-[#006c4d]">Juta Jiwa</span>
              </div>
              <p className="text-xs text-[#5A6862] leading-normal">
                1,05 Jt Laki-laki <span className="text-[#717974]">•</span> 1,03 Jt Perempuan
              </p>
            </div>
            <div className="pt-2 border-t border-[#e3f1e9] flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-[#ddece3] text-[#5A6862] text-xs font-bold">
                18 Kec. / 349 Desa
              </span>
              <Icon className="material-symbols-outlined text-[18px] text-[#5A6862]">location_city</Icon>
            </div>
          </div>

          {/* Card 3: IPM */}
          <div className="p-6 rounded-2xl bg-white shadow-sm border border-slate-200 flex flex-col justify-between gap-4 hover:-translate-y-0.5 transition-all duration-200">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#5A6862]">Indeks Pembangunan Manusia</span>
                <span className="p-1.5 rounded-lg bg-[#bbedd9] text-[#002117] flex items-center justify-center">
                  <Icon className="material-symbols-outlined text-[18px]">award_star</Icon>
                </span>
              </div>
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#15211C] tracking-tight">
                81,64 <span className="text-lg font-bold text-[#006c4d]">Poin</span>
              </div>
              <p className="text-xs text-[#5A6862] leading-normal">
                +0,58 Poin kenaikan tahunan • Sangat Tinggi
              </p>
            </div>
            <div className="pt-2 border-t border-[#e3f1e9] flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-[#8af7c9] text-[#002115] text-xs font-bold">
                Pendidikan &amp; Kesehatan
              </span>
              <Icon className="material-symbols-outlined text-[18px] text-[#006c4d]">trending_up</Icon>
            </div>
          </div>

          {/* Card 4: KIP */}
          <div className="p-6 rounded-2xl bg-white shadow-sm border border-slate-200 flex flex-col justify-between gap-4 hover:-translate-y-0.5 transition-all duration-200">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#5A6862]">Keterbukaan Informasi (KIP)</span>
                <span className="p-1.5 rounded-lg bg-[#ffe087] text-[#231a00] flex items-center justify-center">
                  <Icon className="material-symbols-outlined text-[18px]">verified</Icon>
                </span>
              </div>
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#15211C] tracking-tight">
                96,2% <span className="text-lg font-bold text-[#735c00]">Informatif</span>
              </div>
              <p className="text-xs text-[#5A6862] leading-normal">
                Kepatuhan UU KIP No. 14/2008 &amp; Satu Data
              </p>
            </div>
            <div className="pt-2 border-t border-[#e3f1e9] flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-[#ffe087] text-[#231a00] text-xs font-bold">
                Peringkat 1 Jatim
              </span>
              <Icon className="material-symbols-outlined text-[18px] text-[#735c00]">workspace_premium</Icon>
            </div>
          </div>

        </div>

        {/* METRIK REAL-TIME TRANSPARANSI ANGGARAN STRIP */}
        <div className="max-w-7xl mx-auto mt-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#083C2E] via-[#064233] to-[#04281E] border border-emerald-800/40 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#8af7c9] text-[#002115] flex items-center justify-center shrink-0">
              <Icon className="text-[24px]">account_balance</Icon>
            </div>
            <div>
              <div className="text-xs font-bold tracking-wider uppercase text-[#8af7c9]">Keseimbangan Struktur Fiskal APBD 2026</div>
              <div className="text-sm font-medium text-white/90">
                Pendapatan: <strong>Rp 5,28 T</strong> | Belanja: <strong>Rp 5,28 T</strong> | Pembiayaan Netto: <strong>Rp 0</strong> (Anggaran Berimbang)
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#8af7c9]/20 text-[#8af7c9] text-xs font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#8af7c9] animate-pulse"></span>
              Surplus/Defisit: Rp 0 (Berimbang)
            </span>
            <button
              onClick={() => {
                const el = document.getElementById('alokasi-anggaran');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-3 py-1 text-xs bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium transition-colors cursor-pointer"
            >
              Lihat Rincian
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. SECTION: VISUALISASI ANGGARAN & APBD RAMAH WARGA                        */}
      {/* ========================================================================= */}
      <section id="alokasi-anggaran" className="w-full px-4 sm:px-6 lg:px-8 pb-6 bg-[#F8FAF9]">
        <div className="max-w-7xl mx-auto flex flex-col gap-4">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 pb-1">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#8af7c9] text-[#002115] text-xs font-bold uppercase mb-1">
                <Icon className="material-symbols-outlined text-[15px]">payments</Icon>
                Transparansi Keuangan
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-[#15211C]">
                Alokasi APBD Sidoarjo {selectedYear}: Ke Mana Uang Rakyat Digunakan?
              </h2>
              <p className="text-sm text-[#5A6862] max-w-3xl">
                Penjelasan peruntukan dana pajak dan pendapatan daerah agar setiap warga dapat memantau prioritas pembangunan secara akuntabel.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Toggle Chart vs Table */}
              <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-xs">
                <button
                  type="button"
                  onClick={() => setViewMode('chart')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    viewMode === 'chart'
                      ? 'bg-[#00251b] text-white shadow-xs'
                      : 'text-[#5A6862] hover:text-[#15211C]'
                  }`}
                >
                  <Icon className="material-symbols-outlined text-[16px]">bar_chart</Icon>
                  <span>Visual Grafik</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    viewMode === 'table'
                      ? 'bg-[#00251b] text-white shadow-xs'
                      : 'text-[#5A6862] hover:text-[#15211C]'
                  }`}
                >
                  <Icon className="material-symbols-outlined text-[16px]">table_chart</Icon>
                  <span>Tabel Detail</span>
                </button>
              </div>

              <div className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-[#5A6862]">
                <span className="w-2 h-2 rounded-full bg-[#038D66]"></span>
                <span>Audit BPK: WTP Ke-11</span>
              </div>
            </div>
          </div>

          {/* Main Visual Budget Split Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Sector Allocations (7 Columns) */}
            <div className="lg:col-span-7 p-6 rounded-2xl bg-white shadow-sm border border-slate-200 flex flex-col justify-between gap-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-display text-base sm:text-lg font-bold text-[#15211C]">
                      Distribusi 6 Sektor Prioritas
                    </h3>
                    <p className="text-xs text-[#5A6862]">Proporsi persentase belanja langsung dari pagu Rp 5,28 T</p>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-[#e3f1e9] text-[#5A6862]">
                    Pagu APBD {selectedYear}
                  </span>
                </div>

                {/* View Mode: CHART */}
                {viewMode === 'chart' ? (
                  <div className="space-y-4">
                    
                    {/* Item 1: Pendidikan */}
                    <div className="space-y-1.5 p-3 rounded-xl hover:bg-[#F8FAF9]/70 transition-colors">
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <div className="flex items-center gap-2 text-[#15211C] font-semibold flex-wrap">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#038D66]"></span>
                          <span>Pendidikan, Beasiswa &amp; Guru</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#8af7c9] text-[#002115] font-semibold">
                            Mandatori Min. 20% Terpenuhi
                          </span>
                        </div>
                        <span className="text-[#15211C] font-bold">
                          24,8% <span className="font-normal text-[#5A6862] text-xs">(Rp 1,31 T)</span>
                        </span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-[#e3f1e9] overflow-hidden">
                        <div className="h-full bg-[#038D66] rounded-full transition-all duration-700" style={{ width: '24.8%' }}></div>
                      </div>
                      <div className="flex justify-between text-xs text-[#5A6862]">
                        <span>Renovasi 182 Sekolah, Beasiswa 10.000 Mahasiswa &amp; BOSDA</span>
                        <span className="font-semibold text-[#006c4d]">Serapan 81,2%</span>
                      </div>
                    </div>

                    {/* Item 2: Infrastruktur & Jalan */}
                    <div className="space-y-1.5 p-3 rounded-xl hover:bg-[#F8FAF9]/70 transition-colors">
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <div className="flex items-center gap-2 text-[#15211C] font-semibold flex-wrap">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#083c2e]"></span>
                          <span>Infrastruktur &amp; Betonisasi Jalan</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#ddece3] text-[#5A6862] font-semibold">
                            Betonisasi &amp; Drainase
                          </span>
                        </div>
                        <span className="text-[#15211C] font-bold">
                          21,5% <span className="font-normal text-[#5A6862] text-xs">(Rp 1,13 T)</span>
                        </span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-[#e3f1e9] overflow-hidden">
                        <div className="h-full bg-[#083c2e] rounded-full transition-all duration-700" style={{ width: '21.5%' }}></div>
                      </div>
                      <div className="flex justify-between text-xs text-[#5A6862]">
                        <span>Penyelesaian Flyover, 142 Titik Jalan Beton, Normalisasi Sungai</span>
                        <span className="font-semibold text-[#006c4d]">Serapan 74,5%</span>
                      </div>
                    </div>

                    {/* Item 3: Kesehatan */}
                    <div className="space-y-1.5 p-3 rounded-xl hover:bg-[#F8FAF9]/70 transition-colors">
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <div className="flex items-center gap-2 text-[#15211C] font-semibold flex-wrap">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#cfa700]"></span>
                          <span>Kesehatan &amp; Fasilitas Puskesmas</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#ffe087] text-[#231a00] font-semibold">
                            Universal Health Care
                          </span>
                        </div>
                        <span className="text-[#15211C] font-bold">
                          18,2% <span className="font-normal text-[#5A6862] text-xs">(Rp 960 Miliar)</span>
                        </span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-[#e3f1e9] overflow-hidden">
                        <div className="h-full bg-[#735c00] rounded-full transition-all duration-700" style={{ width: '18.2%' }}></div>
                      </div>
                      <div className="flex justify-between text-xs text-[#5A6862]">
                        <span>Subsidi BPJS PBI Sidoarjo, Revitalisasi 26 Puskesmas Pembantu</span>
                        <span className="font-semibold text-[#006c4d]">Serapan 86,0%</span>
                      </div>
                    </div>

                    {/* Item 4: Pelayanan Digital */}
                    <div className="space-y-1.5 p-3 rounded-xl hover:bg-[#F8FAF9]/70 transition-colors">
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <div className="flex items-center gap-2 text-[#15211C] font-semibold flex-wrap">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#88f4c6]"></span>
                          <span>Pelayanan Publik &amp; MPP Digital</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#ddece3] text-[#5A6862] font-semibold">
                            SITAPAK &amp; Plavon
                          </span>
                        </div>
                        <span className="text-[#15211C] font-bold">
                          15,4% <span className="font-normal text-[#5A6862] text-xs">(Rp 813 Miliar)</span>
                        </span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-[#e3f1e9] overflow-hidden">
                        <div className="h-full bg-[#6edaae] rounded-full transition-all duration-700" style={{ width: '15.4%' }}></div>
                      </div>
                      <div className="flex justify-between text-xs text-[#5A6862]">
                        <span>Sentra Layanan Kecamatan, Internet Gratis 349 Balai RW</span>
                        <span className="font-semibold text-[#006c4d]">Serapan 79,8%</span>
                      </div>
                    </div>

                    {/* Item 5: Ekonomi & Pangan */}
                    <div className="space-y-1.5 p-3 rounded-xl hover:bg-[#F8FAF9]/70 transition-colors">
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <div className="flex items-center gap-2 text-[#15211C] font-semibold">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#735c00]"></span>
                          <span>Ekonomi, UMKM &amp; Ketahanan Pangan</span>
                        </div>
                        <span className="text-[#15211C] font-bold">
                          11,6% <span className="font-normal text-[#5A6862] text-xs">(Rp 612 Miliar)</span>
                        </span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-[#e3f1e9] overflow-hidden">
                        <div className="h-full bg-[#eec224] rounded-full transition-all duration-700" style={{ width: '11.6%' }}></div>
                      </div>
                      <div className="flex justify-between text-xs text-[#5A6862]">
                        <span>Bantuan Modal Bergulir KURDA &amp; Pasar Rakyat Modern</span>
                        <span className="font-semibold text-[#006c4d]">Serapan 72,1%</span>
                      </div>
                    </div>

                    {/* Item 6: Perlindungan Sosial */}
                    <div className="space-y-1.5 p-3 rounded-xl hover:bg-[#F8FAF9]/70 transition-colors">
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <div className="flex items-center gap-2 text-[#15211C] font-semibold">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#717974]"></span>
                          <span>Perlindungan Sosial &amp; Disabilitas</span>
                        </div>
                        <span className="text-[#15211C] font-bold">
                          8,5% <span className="font-normal text-[#5A6862] text-xs">(Rp 448 Miliar)</span>
                        </span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-[#e3f1e9] overflow-hidden">
                        <div className="h-full bg-[#717974] rounded-full transition-all duration-700" style={{ width: '8.5%' }}></div>
                      </div>
                      <div className="flex justify-between text-xs text-[#5A6862]">
                        <span>Bantuan Lansia Terlantar, Kursi Roda Gratis, Program RTLH</span>
                        <span className="font-semibold text-[#006c4d]">Serapan 84,3%</span>
                      </div>
                    </div>

                  </div>
                ) : (
                  <div>
                    <p className="text-[11px] text-slate-500 mb-2 flex items-center gap-1 sm:hidden">Geser ke kanan untuk melihat rincian kolom →</p>
                    <div className="overflow-x-auto border border-slate-200 rounded-xl">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-[#F8FAF9] border-b border-slate-200 text-[#15211C] font-semibold">
                          <tr>
                            <th className="p-3">Sektor Prioritas</th>
                            <th className="p-3">Pagu (Rp)</th>
                            <th className="p-3">Porsi</th>
                            <th className="p-3">Serapan Riil</th>
                            <th className="p-3">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#ddece3] text-[#5A6862]">
                          <tr className="hover:bg-[#F8FAF9]/50">
                            <td className="p-3 font-semibold text-[#15211C]">Pendidikan, Beasiswa &amp; Guru</td>
                            <td className="p-3">Rp 1,31 T</td>
                            <td className="p-3 font-bold text-[#006c4d]">24,8%</td>
                            <td className="p-3">81,2% (Rp 1,06 T)</td>
                            <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[11px] font-bold">Mandatori OK</span></td>
                          </tr>
                          <tr className="hover:bg-[#F8FAF9]/50">
                            <td className="p-3 font-semibold text-[#15211C]">Infrastruktur &amp; Betonisasi Jalan</td>
                            <td className="p-3">Rp 1,13 T</td>
                            <td className="p-3 font-bold text-[#006c4d]">21,5%</td>
                            <td className="p-3">74,5% (Rp 845 M)</td>
                            <td className="p-3"><span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[11px] font-bold">Sesuai Target</span></td>
                          </tr>
                          <tr className="hover:bg-[#F8FAF9]/50">
                            <td className="p-3 font-semibold text-[#15211C]">Kesehatan &amp; Puskesmas</td>
                            <td className="p-3">Rp 960 M</td>
                            <td className="p-3 font-bold text-[#006c4d]">18,2%</td>
                            <td className="p-3">86,0% (Rp 825 M)</td>
                            <td className="p-3"><span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[11px] font-bold">UHC 99.1%</span></td>
                          </tr>
                          <tr className="hover:bg-[#F8FAF9]/50">
                            <td className="p-3 font-semibold text-[#15211C]">Pelayanan Publik &amp; MPP Digital</td>
                            <td className="p-3">Rp 813 M</td>
                            <td className="p-3 font-bold text-[#006c4d]">15,4%</td>
                            <td className="p-3">79,8% (Rp 648 M)</td>
                            <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[11px] font-bold">Digitalisasi</span></td>
                          </tr>
                          <tr className="hover:bg-[#F8FAF9]/50">
                            <td className="p-3 font-semibold text-[#15211C]">Ekonomi, UMKM &amp; Pangan</td>
                            <td className="p-3">Rp 612 M</td>
                            <td className="p-3 font-bold text-[#006c4d]">11,6%</td>
                            <td className="p-3">72,1% (Rp 441 M)</td>
                            <td className="p-3"><span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[11px] font-bold">KURDA Aktif</span></td>
                          </tr>
                          <tr className="hover:bg-[#F8FAF9]/50">
                            <td className="p-3 font-semibold text-[#15211C]">Perlindungan Sosial &amp; Disabilitas</td>
                            <td className="p-3">Rp 448 M</td>
                            <td className="p-3 font-bold text-[#006c4d]">8,5%</td>
                            <td className="p-3">84,3% (Rp 377 M)</td>
                            <td className="p-3"><span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 text-[11px] font-bold">Bansos RTLH</span></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

              </div>

              {/* Citizen-Friendly Explainer Note */}
              <div className="p-4 rounded-xl bg-[#e3f1e9] flex items-start gap-3 text-[#15211C]">
                <Icon className="material-symbols-outlined text-[24px] text-[#735c00] shrink-0">lightbulb</Icon>
                <div className="text-xs sm:text-sm leading-relaxed">
                  <strong className="font-bold">Fakta Ramah Warga:</strong> Dari setiap <strong>Rp 1.000</strong> dana pajak dan APBD Sidoarjo yang dihimpun, sebanyak <strong>Rp 248</strong> dialokasikan langsung untuk pendidikan putra-putri daerah dan <strong>Rp 215</strong> digunakan untuk memuluskan jalan beton tanpa lubang.
                </div>
              </div>
            </div>

            {/* Right: Revenue vs Spending & Progress (5 Columns) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              
              {/* Balance Card: PAD vs Transfer */}
              <div className="p-6 rounded-2xl bg-white shadow-sm border border-slate-200 flex flex-col gap-4">
                <div>
                  <h3 className="font-display text-base sm:text-lg font-bold text-[#15211C]">
                    Asal Muasal Dana APBD Sidoarjo
                  </h3>
                  <p className="text-xs text-[#5A6862]">Keseimbangan kemandirian fiskal Kabupaten Sidoarjo</p>
                </div>

                {/* Revenue Source Split */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 sm:p-4 rounded-xl bg-[#e3f1e9] space-y-1">
                    <span className="text-xs text-[#5A6862] font-medium leading-tight block">
                      Pendapatan Asli Daerah (PAD)
                    </span>
                    <p className="font-display text-lg sm:text-xl text-[#15211C] font-extrabold">
                      Rp 2,65 T
                    </p>
                    <div className="flex items-center gap-1 text-[11px] sm:text-xs text-[#006c4d] font-bold">
                      <Icon className="material-symbols-outlined text-[14px]">pie_chart</Icon>
                      <span>50,2% (Mandiri)</span>
                    </div>
                    <p className="text-[11px] text-[#717974] pt-1">
                      Pajak hotel, restoran, PBB-P2 &amp; deviden BUMD Delta Artha
                    </p>
                  </div>

                  <div className="p-3 sm:p-4 rounded-xl bg-[#e3f1e9] space-y-1">
                    <span className="text-xs text-[#5A6862] font-medium leading-tight block">
                      Transfer Pusat &amp; Pemprov
                    </span>
                    <p className="font-display text-lg sm:text-xl text-[#15211C] font-extrabold">
                      Rp 2,63 T
                    </p>
                    <div className="flex items-center gap-1 text-[11px] sm:text-xs text-[#735c00] font-bold">
                      <Icon className="material-symbols-outlined text-[14px]">account_balance</Icon>
                      <span>49,8% (Transfer)</span>
                    </div>
                    <p className="text-[11px] text-[#717974] pt-1">
                      Dana Alokasi Umum (DAU), DAK, &amp; Bagi Hasil Pajak Jatim
                    </p>
                  </div>
                </div>

                {/* Execution Gauge / Progress */}
                <div className="p-4 rounded-xl bg-[#e9f7ee] space-y-2 border border-slate-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-[#15211C] font-bold">
                      Progres Penyerapan Belanja Daerah
                    </span>
                    <span className="font-display text-base sm:text-lg text-[#006c4d] font-extrabold">
                      84,6%
                    </span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-[#d8e6de] overflow-hidden">
                    <div className="h-full bg-[#038D66] rounded-full transition-all duration-700" style={{ width: '84.6%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-[#5A6862]">
                    <span>Terealisasi: Rp 4,46 Triliun</span>
                    <span>Target Akhir: Rp 5,28 Triliun</span>
                  </div>
                </div>

                {/* Strategic Drilldown Action Links */}
                <div className="flex flex-col gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setKecamatanModalOpen(true)}
                    className="p-3 rounded-xl bg-[#e3f1e9] hover:bg-[#ddece3] active:scale-[0.99] transition-all flex items-center justify-between text-[#15211C] text-xs sm:text-sm font-semibold cursor-pointer text-left"
                  >
                    <span className="flex items-center gap-2">
                      <Icon className="material-symbols-outlined text-[20px] text-[#006c4d]">map</Icon>
                      Lihat Alokasi Dana per 18 Kecamatan
                    </span>
                    <Icon className="material-symbols-outlined text-[18px]">chevron_right</Icon>
                  </button>

                  <button
                    type="button"
                    onClick={() => setProjectModalOpen(true)}
                    className="p-3 rounded-xl bg-[#e3f1e9] hover:bg-[#ddece3] active:scale-[0.99] transition-all flex items-center justify-between text-[#15211C] text-xs sm:text-sm font-semibold cursor-pointer text-left"
                  >
                    <span className="flex items-center gap-2">
                      <Icon className="material-symbols-outlined text-[20px] text-[#006c4d]">construction</Icon>
                      Daftar 25 Proyek Strategis Daerah 2026
                    </span>
                    <Icon className="material-symbols-outlined text-[18px]">chevron_right</Icon>
                  </button>
                </div>

                {/* Legal APBD Download Link */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => handleDownloadFile('Buku Dokumen Peraturan Daerah APBD Sidoarjo 2026 Lengkap', 'PDF')}
                    className="text-xs sm:text-sm text-[#006c4d] hover:text-[#005139] transition-colors inline-flex items-center gap-1 font-bold cursor-pointer"
                  >
                    <span>Pelajari Rincian Lengkap Buku Perda APBD {selectedYear}</span>
                    <Icon className="material-symbols-outlined text-[18px]">arrow_forward</Icon>
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. SECTION: STATISTIK KEPENDUDUKAN & KINERJA INFRASTRUKTUR                 */}
      {/* ========================================================================= */}
      <section className="w-full px-4 sm:px-6 lg:px-8 pb-6 bg-[#F8FAF9]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Card 1: Demografi & Ketenagakerjaan */}
          <div className="p-6 rounded-2xl bg-white shadow-sm border border-slate-200 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#8af7c9] text-[#002115] text-xs font-semibold mb-1">
                    <Icon className="material-symbols-outlined text-[15px]">badge</Icon>
                    Data Terverifikasi Disdukcapil
                  </div>
                  <h3 className="font-display text-base sm:text-lg font-bold text-[#15211C]">
                    Piramida &amp; Komposisi Penduduk Sidoarjo
                  </h3>
                  <p className="text-xs text-[#5A6862]">Struktur usia warga Kabupaten Sidoarjo pembaruan Triwulan III</p>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-[#e3f1e9] text-[#5A6862] text-xs font-bold">
                  2,08 Juta
                </span>
              </div>

              {/* Age Distribution Graphic Bar */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-[#5A6862]">
                  Distribusi Kelompok Usia (Bonus Demografi Aktif)
                </span>
                
                {/* Segmented Visual Bar */}
                <div className="w-full h-8 rounded-xl overflow-hidden flex bg-[#e3f1e9] shadow-inner">
                  <div
                    className="bg-[#038D66] h-full flex items-center justify-center text-white text-xs font-bold px-1 transition-all"
                    style={{ width: '69.2%' }}
                    title="Usia Produktif 69,2%"
                  >
                    69,2% Usia Produktif
                  </div>
                  <div
                    className="bg-[#eec224] h-full flex items-center justify-center text-[#231a00] text-xs font-bold px-1 transition-all"
                    style={{ width: '22.4%' }}
                    title="Anak-anak 22,4%"
                  >
                    22,4% Anak
                  </div>
                  <div
                    className="bg-[#717974] h-full flex items-center justify-center text-white text-[11px] font-bold px-1 transition-all"
                    style={{ width: '8.4%' }}
                    title="Lansia 8,4%"
                  >
                    8,4%
                  </div>
                </div>

                {/* Legend */}
                <div className="grid grid-cols-3 gap-2 pt-2 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-[#038D66] shrink-0"></span>
                    <div>
                      <p className="font-bold text-[#15211C]">15 - 64 Tahun</p>
                      <p className="text-[11px] text-[#5A6862]">1,44 Juta Jiwa</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-[#eec224] shrink-0"></span>
                    <div>
                      <p className="font-bold text-[#15211C]">0 - 14 Tahun</p>
                      <p className="text-[11px] text-[#5A6862]">465 Ribu Jiwa</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-[#717974] shrink-0"></span>
                    <div>
                      <p className="font-bold text-[#15211C]">65+ Tahun (Lansia)</p>
                      <p className="text-[11px] text-[#5A6862]">175 Ribu Jiwa</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Employment Summary Micro-cards */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-[#e3f1e9] space-y-0.5">
                  <span className="text-xs text-[#5A6862]">Angkatan Kerja Aktif</span>
                  <p className="font-display text-lg font-bold text-[#15211C]">
                    1,12 Juta
                  </p>
                  <span className="text-[11px] text-[#006c4d] font-semibold block">Tingkat Partisipasi Kerja: 71,8%</span>
                </div>
                <div className="p-3 rounded-xl bg-[#e3f1e9] space-y-0.5">
                  <span className="text-xs text-[#5A6862]">Kepala Keluarga (KK)</span>
                  <p className="font-display text-lg font-bold text-[#15211C]">
                    672.410
                  </p>
                  <span className="text-[11px] text-[#5A6862] block">Rerata 3,1 Anggota / KK</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#e3f1e9] flex items-center justify-between text-xs text-[#5A6862]">
              <span className="flex items-center gap-1">
                <Icon className="material-symbols-outlined text-[16px] text-[#006c4d]">sync</Icon>
                Sinkronisasi Plavon Dukcapil Sidoarjo
              </span>
              <button
                type="button"
                onClick={() => {
                  const item = datasetsData.find((d) => d.id === 'kependudukan-2026');
                  if (item) setPreviewDataset(item);
                }}
                className="text-[#006c4d] hover:text-[#005139] font-bold flex items-center gap-0.5"
              >
                <span>Buka Data Sensus</span>
                <Icon className="material-symbols-outlined text-[14px]">arrow_forward</Icon>
              </button>
            </div>
          </div>

          {/* Card 2: Indikator Layanan & Infrastruktur */}
          <div className="p-6 rounded-2xl bg-white shadow-sm border border-slate-200 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#8af7c9] text-[#002115] text-xs font-semibold mb-1">
                    <Icon className="material-symbols-outlined text-[15px]">speed</Icon>
                    Capaian SPM &amp; Indikator Makro
                  </div>
                  <h3 className="font-display text-base sm:text-lg font-bold text-[#15211C]">
                    Kualitas Hidup &amp; Infrastruktur Warga
                  </h3>
                  <p className="text-xs text-[#5A6862]">Capaian riil 4 pilar pelayanan publik dasar Kabupaten Sidoarjo</p>
                </div>
                <Icon className="material-symbols-outlined text-[#006c4d] text-[24px]">verified</Icon>
              </div>

              {/* 4 Critical Metrics Progress Indicators */}
              <div className="space-y-3.5">
                
                {/* Metric 1: UHC BPJS */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-[#15211C] font-semibold flex items-center gap-1.5">
                      <Icon className="material-symbols-outlined text-[18px] text-[#006c4d]">health_and_safety</Icon>
                      Universal Health Coverage (Jaminan BPJS Warga)
                    </span>
                    <span className="text-xs sm:text-sm text-[#006c4d] font-extrabold">99,1%</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-[#e3f1e9] overflow-hidden">
                    <div className="h-full bg-[#038D66] rounded-full transition-all duration-700" style={{ width: '99.1%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-[#5A6862]">
                    <span>Target Nasional (98%) telah terlampaui</span>
                    <span>2,06 Juta Terlindungi</span>
                  </div>
                </div>

                {/* Metric 2: Kemantapan Jalan Beton */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-[#15211C] font-semibold flex items-center gap-1.5">
                      <Icon className="material-symbols-outlined text-[18px] text-[#15211C]">road</Icon>
                      Kemantapan Jalan Kabupaten (Betonisasi)
                    </span>
                    <span className="text-xs sm:text-sm text-[#15211C] font-extrabold">91,2%</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-[#e3f1e9] overflow-hidden">
                    <div className="h-full bg-[#083c2e] rounded-full transition-all duration-700" style={{ width: '91.2%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-[#5A6862]">
                    <span>142 Ruas jalan kabupaten tuntas dibeton per 2026</span>
                    <span>Total 1.054 Km Jalan Mantap</span>
                  </div>
                </div>

                {/* Metric 3: Air Bersih Perpipaan */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-[#15211C] font-semibold flex items-center gap-1.5">
                      <Icon className="material-symbols-outlined text-[18px] text-[#006c4d]">water_drop</Icon>
                      Akses Air Minum Bersih Perpipaan (PDAM)
                    </span>
                    <span className="text-xs sm:text-sm text-[#006c4d] font-extrabold">89,4%</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-[#e3f1e9] overflow-hidden">
                    <div className="h-full bg-[#038D66] rounded-full transition-all duration-700" style={{ width: '89.4%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-[#5A6862]">
                    <span>SPAM Umbulan tahap perluasan sambungan rumah</span>
                    <span>Target 2026: 95,0%</span>
                  </div>
                </div>

                {/* Metric 4: Pengelolaan Sampah */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-[#15211C] font-semibold flex items-center gap-1.5">
                      <Icon className="material-symbols-outlined text-[18px] text-[#735c00]">recycling</Icon>
                      Pengelolaan Sampah Terpadu (TPST &amp; RDF)
                    </span>
                    <span className="text-xs sm:text-sm text-[#735c00] font-extrabold">82,5%</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-[#e3f1e9] overflow-hidden">
                    <div className="h-full bg-[#735c00] rounded-full transition-all duration-700" style={{ width: '82.5%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-[#5A6862]">
                    <span>38 TPST aktif + Unit Bahan Bakar Turunan RDF Jabon</span>
                    <span>Terkelola: 1.150 Ton/Hari</span>
                  </div>
                </div>

              </div>
            </div>

            <div className="pt-2 border-t border-[#e3f1e9] flex items-center justify-between text-xs text-[#5A6862]">
              <span className="flex items-center gap-1">
                <Icon className="material-symbols-outlined text-[16px] text-[#006c4d]">update</Icon>
                Laporan Kinerja Instansi Pemerintah (LKjIP)
              </span>
              <button
                type="button"
                onClick={() => showToast('Membuka ringkasan 24 indikator SPM Kabupaten Sidoarjo')}
                className="text-[#006c4d] hover:text-[#005139] font-bold"
              >
                Lihat Semua 24 Indikator →
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. SECTION: KATALOG DATASET TERBUKA & UNDUH DATA (OPEN DATA SIDOARJO)       */}
      {/* ========================================================================= */}
      <section id="katalog-open-data" className="w-full px-4 sm:px-6 lg:px-8 pb-6 bg-[#F8FAF9]">
        <div className="max-w-7xl mx-auto p-6 sm:p-8 rounded-2xl bg-white shadow-sm border border-slate-200 flex flex-col gap-6">
          
          {/* Catalog Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#8af7c9] text-[#002115] text-xs font-bold uppercase mb-1">
                <Icon className="material-symbols-outlined text-[15px]">database</Icon>
                Open Data Resmi
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-[#15211C]">
                Katalog Kumpulan Data Terbuka (Open Data)
              </h2>
              <p className="text-sm text-[#5A6862] max-w-3xl">
                Unduh data mentah resmi dalam format terbuka (.CSV, .XLSX, .JSON) untuk riset akademik, jurnalisme warga, dan pengawasan publik.
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              {/* REST API Button */}
              <button
                type="button"
                onClick={() => setApiModalOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-[#e3f1e9] text-[#15211C] hover:bg-[#ddece3] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Icon className="material-symbols-outlined text-[18px] text-[#006c4d]">api</Icon>
                <span>API Developer</span>
              </button>

              <div className="flex items-center gap-1 text-xs text-[#5A6862]">
                <Icon className="material-symbols-outlined text-[16px] text-[#006c4d]">download</Icon>
                <span className="hidden sm:inline">Lisensi: Open Government License (OGL-ID)</span>
              </div>
            </div>
          </div>

          {/* Filter Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {[
              { id: 'all', label: 'Semua Kategori (142)' },
              { id: 'keuangan', label: 'Keuangan & APBD (28)' },
              { id: 'kependudukan', label: 'Kependudukan & Catpil (34)' },
              { id: 'infrastruktur', label: 'Infrastruktur & PU (31)' },
              { id: 'kesehatan', label: 'Kesehatan (22)' },
              { id: 'pendidikan', label: 'Pendidikan & Beasiswa (27)' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#00251b] text-white shadow-xs'
                    : 'bg-[#e3f1e9] text-[#5A6862] hover:text-[#15211C] hover:bg-[#ddece3]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Dataset List */}
          <div className="space-y-3">
            {filteredDatasets.length > 0 ? (
              filteredDatasets.map((item) => (
                <div
                  key={item.id}
                  className="p-4 sm:p-5 rounded-xl bg-[#e9f7ee] hover:bg-[#e3f1e9] transition-all border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold ${item.badgeColor}`}>
                        {item.categoryLabel}
                      </span>
                      <span className="text-xs text-[#5A6862] font-semibold">{item.opd}</span>
                      <span className="text-[#717974]">•</span>
                      <span className="text-xs text-[#5A6862]">{item.updatedAt}</span>
                    </div>
                    
                    <h4 className="font-display text-sm sm:text-base text-[#15211C] font-bold">
                      {item.title}
                    </h4>
                    
                    <p className="text-xs sm:text-sm text-[#5A6862] leading-relaxed">
                      {item.description}
                    </p>
                    
                    <div className="flex items-center gap-3 pt-1 text-xs text-[#717974] flex-wrap">
                      <span className="font-mono bg-white px-2 py-0.5 rounded border border-slate-200 text-[#15211C] font-medium">
                        Format: {item.formats.join(', ')}
                      </span>
                      <span>•</span>
                      <span>Ukuran: {item.size}</span>
                      <span>•</span>
                      <span>Unduhan: {item.downloadCount.toLocaleString('id-ID')} kali</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setPreviewDataset(item)}
                      className="h-10 px-3.5 rounded-xl bg-white text-[#15211C] text-xs sm:text-sm font-semibold hover:bg-[#d8e6de] transition-colors flex items-center gap-1.5 shadow-xs border border-slate-200"
                      type="button"
                    >
                      <Icon className="material-symbols-outlined text-[18px]">visibility</Icon>
                      <span>Pratinjau</span>
                    </button>
                    
                    <button
                      onClick={() => handleDownloadFile(item.title, item.formats[0])}
                      className="h-10 px-4 rounded-xl bg-[#038D66] text-white text-xs sm:text-sm font-semibold hover:bg-[#026E4F] active:scale-95 transition-all flex items-center gap-1.5 shadow-sm"
                      type="button"
                    >
                      <Icon className="material-symbols-outlined text-[18px]">file_download</Icon>
                      <span>Unduh {item.formats[0]}</span>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 px-4 rounded-xl bg-[#e9f7ee] border border-dashed border-slate-200">
                <Icon className="material-symbols-outlined text-4xl text-[#717974] mb-2">search_off</Icon>
                <p className="text-sm font-bold text-[#15211C]">Tidak ditemukan dataset yang cocok</p>
                <p className="text-xs text-[#5A6862] mt-1">Coba kata kunci lain atau ubah kategori filter.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                  }}
                  className="mt-3 px-4 py-2 bg-[#038D66] text-white text-xs font-semibold rounded-lg hover:bg-[#026E4F]"
                >
                  Reset Filter
                </button>
              </div>
            )}
          </div>

          {/* PPID Special Information Callout */}
          <div className="p-6 rounded-2xl bg-[#083c2e] text-white flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Icon className="material-symbols-outlined text-[#8af7c9] text-[24px]">contact_support</Icon>
                <h4 className="font-display text-base sm:text-lg text-white font-bold">
                  Membutuhkan Permohonan Informasi Khusus?
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-[#a0d1bd] max-w-2xl leading-relaxed">
                Sesuai UU KIP No. 14 Tahun 2008, setiap warga negara berhak mengajukan permohonan data publik yang belum tercantum di katalog melalui Pejabat Pengelola Informasi dan Dokumentasi (PPID) Pemkab Sidoarjo.
              </p>
            </div>
            <button
              onClick={() => setPpidModalOpen(true)}
              className="h-11 px-5 rounded-xl bg-[#038D66] hover:bg-[#026E4F] text-white text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shrink-0 shadow-md cursor-pointer active:scale-95"
              type="button"
            >
              <span>Ajukan Permohonan PPID</span>
              <Icon className="material-symbols-outlined text-[18px]">arrow_forward</Icon>
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. CITIZEN ASSISTANCE & FAQ SECTION                                       */}
      {/* ========================================================================= */}
      <section className="w-full px-4 sm:px-6 lg:px-8 pb-10 bg-[#F8FAF9]">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#15211C]">
              Panduan &amp; Tanya Jawab Transparansi
            </h3>
            <p className="text-xs sm:text-sm text-[#5A6862]">
              Memahami hak warga atas keterbukaan informasi dan tata cara pemanfaatan data daerah
            </p>
          </div>

          {/* 3 FAQ Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="p-6 rounded-2xl bg-white shadow-sm border border-slate-200 space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-[#e3f1e9] flex items-center justify-center text-[#15211C]">
                  <Icon className="material-symbols-outlined text-[22px]">menu_book</Icon>
                </div>
                <h4 className="font-display text-sm sm:text-base text-[#15211C] font-bold">
                  Bagaimana cara membaca data APBD?
                </h4>
                <p className="text-xs text-[#5A6862] leading-relaxed">
                  APBD dibagi menjadi Pendapatan (sumber dana dari pajak dan pusat) serta Belanja (pengeluaran rutin operasional &amp; proyek fisik modal). Grafik di portal ini secara otomatis merangkum angka miliaran ke dalam persentase yang mudah dicerna.
                </p>
              </div>
              <button
                type="button"
                onClick={() => showToast('Membuka Glosarium Keuangan Daerah SITAPAK Sidoarjo')}
                className="text-xs text-[#006c4d] hover:text-[#005139] font-bold flex items-center gap-1 cursor-pointer pt-2"
              >
                <span>Baca Glosarium Keuangan Daerah</span>
                <Icon className="material-symbols-outlined text-[16px]">chevron_right</Icon>
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-white shadow-sm border border-slate-200 space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-[#e3f1e9] flex items-center justify-center text-[#006c4d]">
                  <Icon className="material-symbols-outlined text-[22px]">gavel</Icon>
                </div>
                <h4 className="font-display text-sm sm:text-base text-[#15211C] font-bold">
                  Apakah data di portal ini resmi dan legal?
                </h4>
                <p className="text-xs text-[#5A6862] leading-relaxed">
                  Ya, seluruh data yang dirilis pada portal SITAPAK telah diverifikasi oleh Wali Data (Diskominfo) dan bersumber langsung dari produsen data resmi (BPKAD, Bappeda, Dinas Terkait) dengan validitas hukum UU No. 14/2008 &amp; Perpres No. 39/2019.
                </p>
              </div>
              <button
                type="button"
                onClick={() => showToast('Menampilkan Surat Keputusan Bupati Regulasi Satu Data Sidoarjo')}
                className="text-xs text-[#006c4d] hover:text-[#005139] font-bold flex items-center gap-1 cursor-pointer pt-2"
              >
                <span>Lihat Regulasi Satu Data Sidoarjo</span>
                <Icon className="material-symbols-outlined text-[16px]">chevron_right</Icon>
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-white shadow-sm border border-slate-200 space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-[#e3f1e9] flex items-center justify-center text-[#735c00]">
                  <Icon className="material-symbols-outlined text-[22px]">live_help</Icon>
                </div>
                <h4 className="font-display text-sm sm:text-base text-[#15211C] font-bold">
                  Bagaimana cara mengajukan data yang belum ada?
                </h4>
                <p className="text-xs text-[#5A6862] leading-relaxed">
                  Jika data yang Anda cari untuk penelitian atau keperluan kerja belum tersedia dalam format terbuka, Anda dapat mengisi formulir Permohonan Informasi Publik PPID secara daring melalui formulir verifikasi e-KTP.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPpidModalOpen(true)}
                className="text-xs text-[#006c4d] hover:text-[#005139] font-bold flex items-center gap-1 cursor-pointer pt-2"
              >
                <span>Alur Standar Layanan PPID</span>
                <Icon className="material-symbols-outlined text-[16px]">chevron_right</Icon>
              </button>
            </div>

          </div>

          {/* Sync Banner Footer Note */}
          <div className="p-4 rounded-2xl bg-[#e3f1e9] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#5A6862] border border-slate-200">
            <div className="flex items-center gap-2">
              <Icon className="material-symbols-outlined text-[#006c4d] text-[20px]">cloud_sync</Icon>
              <span>
                Data terintegrasi otomatis dengan <strong>SIMDA Keuangan BPKAD</strong>, <strong>SIPD Kemendagri</strong>, &amp; <strong>Portal Satu Data Indonesia</strong>
              </span>
            </div>
            <div className="flex items-center gap-1 text-[#15211C] font-bold">
              <span>Pembaruan Terakhir: Hari ini, Pukul 08:00 WIB</span>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* MODAL 1: PRATINJAU DATASET                                               */}
      {/* ========================================================================= */}
      {previewDataset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-200 flex items-start justify-between bg-[#F8FAF9]">
              <div className="space-y-1 pr-6">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded text-xs font-bold ${previewDataset.badgeColor}`}>
                    {previewDataset.categoryLabel}
                  </span>
                  <span className="text-xs text-[#5A6862] font-semibold">{previewDataset.opd}</span>
                </div>
                <h3 className="font-display text-lg font-bold text-[#15211C]">
                  {previewDataset.title}
                </h3>
              </div>
              <button
                onClick={() => setPreviewDataset(null)}
                className="w-8 h-8 rounded-full bg-[#ddece3] hover:bg-[#d8e6de] flex items-center justify-center text-[#121e19] transition-colors"
              >
                <Icon className="material-symbols-outlined text-[20px]">close</Icon>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 overflow-y-auto space-y-4">
              <div className="p-3 bg-[#e9f7ee] rounded-xl text-xs text-[#5A6862]">
                {previewDataset.description}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-[#5A6862]">
                  <span className="font-semibold text-[#15211C]">Contoh 5 Baris Data Teratas (Preview Sample):</span>
                  <span>Menampilkan 5 dari ratusan baris data terbuka</span>
                </div>

                <p className="text-[11px] text-slate-500 mb-2 flex items-center gap-1 sm:hidden">Geser ke kanan untuk melihat rincian kolom →</p>
                <div className="overflow-x-auto border border-slate-200 rounded-xl">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F8FAF9] border-b border-slate-200 text-[#15211C] font-semibold">
                      <tr>
                        {previewDataset.sampleColumns.map((col, idx) => (
                          <th key={idx} className="p-3 whitespace-nowrap">{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#ddece3]">
                      {previewDataset.sampleRows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-[#F8FAF9]/50">
                          {previewDataset.sampleColumns.map((col, cIdx) => (
                            <td key={cIdx} className="p-3 whitespace-nowrap text-[#121e19]">
                              {row[col]}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Data Dictionary / Metadata */}
              <div className="p-3.5 rounded-xl bg-[#F8FAF9] border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div>
                  <span className="text-[#717974] block">Format Tersedia</span>
                  <strong className="text-[#15211C]">{previewDataset.formats.join(', ')}</strong>
                </div>
                <div>
                  <span className="text-[#717974] block">Ukuran Berkas</span>
                  <strong className="text-[#15211C]">{previewDataset.size}</strong>
                </div>
                <div>
                  <span className="text-[#717974] block">Frekuensi Update</span>
                  <strong className="text-[#15211C]">Berkala</strong>
                </div>
                <div>
                  <span className="text-[#717974] block">Hak Cipta / Lisensi</span>
                  <strong className="text-[#006c4d]">Open Govt License</strong>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 bg-[#F8FAF9] flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs text-[#5A6862]">
                Dukungan format UTF-8 ramah Excel &amp; Python Pandas
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPreviewDataset(null)}
                  className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-[#5A6862] hover:bg-[#ddece3]"
                >
                  Tutup
                </button>
                {previewDataset.formats.map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => {
                      handleDownloadFile(previewDataset.title, fmt);
                      setPreviewDataset(null);
                    }}
                    className="px-4 py-2 rounded-xl bg-[#038D66] text-white text-xs font-semibold hover:bg-[#026E4F] flex items-center gap-1 shadow-xs"
                  >
                    <Icon className="material-symbols-outlined text-[16px]">download</Icon>
                    <span>Unduh {fmt}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: DEVELOPER OPEN DATA API INFO                                     */}
      {/* ========================================================================= */}
      {apiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-[#083c2e] text-white">
              <div className="flex items-center gap-2.5">
                <Icon className="material-symbols-outlined text-[#8af7c9] text-[24px]">api</Icon>
                <div>
                  <h3 className="font-display text-base sm:text-lg font-bold">
                    SITAPAK Open Data REST API v1
                  </h3>
                  <p className="text-xs text-[#a0d1bd]">Integrasi data terbuka Pemkab Sidoarjo untuk pengembang</p>
                </div>
              </div>
              <button
                onClick={() => setApiModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
              >
                <Icon className="material-symbols-outlined text-[20px]">close</Icon>
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-[#5A6862]">
              <div className="space-y-1">
                <span className="font-bold text-[#15211C]">Base Endpoint URL</span>
                <div className="p-3 bg-[#00251b] text-[#8af7c9] font-mono text-xs rounded-xl flex items-center justify-between">
                  <span>https://data.sidoarjokab.go.id/api/v1/datasets</span>
                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText('https://data.sidoarjokab.go.id/api/v1/datasets');
                      showToast('URL Endpoint berhasil disalin ke clipboard!');
                    }}
                    className="text-white hover:text-[#8af7c9]"
                    title="Salin URL"
                  >
                    <Icon className="material-symbols-outlined text-[16px]">content_copy</Icon>
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-[#15211C]">Contoh Permintaan cURL</span>
                <pre className="p-3.5 bg-[#00251b] text-[#effdf4] font-mono text-xs rounded-xl overflow-x-auto">
{`curl -X GET "https://data.sidoarjokab.go.id/api/v1/datasets?category=keuangan&tahun=2026" \\
  -H "Accept: application/json" \\
  -H "X-Client-ID: sitapak-public-citizen"`}
                </pre>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-[#15211C]">Format Respon JSON Standar</span>
                <pre className="p-3.5 bg-[#F8FAF9] border border-slate-200 text-[#15211C] font-mono text-xs rounded-xl overflow-x-auto">
{`{
  "status": "success",
  "code": 200,
  "data": {
    "fiscal_year": 2026,
    "total_apbd": 5280000000000,
    "realization": 4140000000000,
    "sectors": [
      { "sector": "Pendidikan", "percentage": 24.8, "allocated": 1310000000000 },
      { "sector": "Infrastruktur", "percentage": 21.5, "allocated": 1130000000000 }
    ]
  }
}`}
                </pre>
              </div>

              <div className="p-3.5 rounded-xl bg-[#e3f1e9] text-xs text-[#15211C] space-y-1">
                <strong>Kebijakan Rate Limit:</strong>
                <p>100 request/menit untuk publik tanpa API Key. Untuk kuota riset akademik institusi, silakan hubungi Diskominfo Bidang Tata Kelola e-Government.</p>
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-[#F8FAF9] flex justify-end">
              <button
                onClick={() => setApiModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-[#038D66] text-white text-xs font-semibold hover:bg-[#026E4F]"
              >
                Tutup Dokumentasi
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: PENGAJUAN PERMOHONAN INFORMASI PPID                              */}
      {/* ========================================================================= */}
      {ppidModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-[#F8FAF9]">
              <div className="flex items-center gap-2">
                <Icon className="material-symbols-outlined text-[#006c4d] text-[22px]">assignment</Icon>
                <div>
                  <h3 className="font-display text-base sm:text-lg font-bold text-[#15211C]">
                    Formulir Permohonan Informasi Publik PPID
                  </h3>
                  <p className="text-xs text-[#5A6862]">Berdasarkan Undang-Undang KIP No. 14 Tahun 2008</p>
                </div>
              </div>
              <button
                onClick={() => setPpidModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#ddece3] hover:bg-[#d8e6de] flex items-center justify-center text-[#121e19]"
              >
                <Icon className="material-symbols-outlined text-[20px]">close</Icon>
              </button>
            </div>

            <form onSubmit={handlePpidSubmit} className="p-5 overflow-y-auto space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#15211C] mb-1">Nama Lengkap Pemohon</label>
                <input
                  required
                  type="text"
                  value={ppidForm.nama}
                  onChange={(e) => setPpidForm({ ...ppidForm, nama: e.target.value })}
                  placeholder="Contoh: Budi Santoso"
                  className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-[#F8FAF9] focus:outline-none focus:ring-2 focus:ring-[#006c4d]/30"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#15211C] mb-1">Nomor Induk Kependudukan (NIK)</label>
                  <input
                    required
                    type="text"
                    maxLength={16}
                    value={ppidForm.nik}
                    onChange={(e) => setPpidForm({ ...ppidForm, nik: e.target.value })}
                    placeholder="3515xxxxxxxxxxxx"
                    className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-[#F8FAF9] focus:outline-none focus:ring-2 focus:ring-[#006c4d]/30 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#15211C] mb-1">Alamat Email Aktif</label>
                  <input
                    required
                    type="email"
                    value={ppidForm.email}
                    onChange={(e) => setPpidForm({ ...ppidForm, email: e.target.value })}
                    placeholder="nama@domain.com"
                    className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-[#F8FAF9] focus:outline-none focus:ring-2 focus:ring-[#006c4d]/30"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#15211C] mb-1">Rincian Informasi / Data yang Diminta</label>
                <textarea
                  required
                  rows={3}
                  value={ppidForm.rincianData}
                  onChange={(e) => setPpidForm({ ...ppidForm, rincianData: e.target.value })}
                  placeholder="Jelaskan data OPD apa yang dibutuhkan, tahun anggaran, dan cakupan wilayah..."
                  className="w-full p-3 rounded-lg border border-slate-200 bg-[#F8FAF9] focus:outline-none focus:ring-2 focus:ring-[#006c4d]/30"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#15211C] mb-1">Tujuan Penggunaan Data</label>
                <input
                  required
                  type="text"
                  value={ppidForm.tujuan}
                  onChange={(e) => setPpidForm({ ...ppidForm, tujuan: e.target.value })}
                  placeholder="Contoh: Skripsi / Riset Akademik / Pengawasan Publik"
                  className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-[#F8FAF9] focus:outline-none focus:ring-2 focus:ring-[#006c4d]/30"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#15211C] mb-1">Format Berkas yang Diinginkan</label>
                <select
                  value={ppidForm.formatDipilih}
                  onChange={(e) => setPpidForm({ ...ppidForm, formatDipilih: e.target.value })}
                  className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-[#F8FAF9] focus:outline-none"
                >
                  <option>CSV / Excel Spreadsheet</option>
                  <option>PDF Resmi Berstempel Elektronik</option>
                  <option>Format JSON untuk Aplikasi</option>
                  <option>Salinan Fisik (Ambil di Diskominfo)</option>
                </select>
              </div>

              <div className="p-3 bg-[#e3f1e9] rounded-lg text-[11px] text-[#5A6862]">
                PPID Pemkab Sidoarjo akan memberikan tanggapan selambat-lambatnya <strong>10 hari kerja</strong> sesuai ketentuan UU KIP No. 14/2008.
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setPpidModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-[#5A6862] font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={ppidSubmitted}
                  className="px-5 py-2 rounded-xl bg-[#038D66] hover:bg-[#026E4F] text-white font-bold flex items-center gap-1.5 shadow-sm"
                >
                  {ppidSubmitted ? (
                    <>
                      <Icon className="material-symbols-outlined text-[16px] animate-spin">refresh</Icon>
                      <span>Mengirim...</span>
                    </>
                  ) : (
                    <>
                      <Icon className="material-symbols-outlined text-[16px]">send</Icon>
                      <span>Kirim Permohonan</span>
                    </>
                  )}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: ALOKASI DANA PER 18 KECAMATAN                                    */}
      {/* ========================================================================= */}
      {kecamatanModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-[#F8FAF9]">
              <div className="flex items-center gap-2.5">
                <Icon className="material-symbols-outlined text-[#006c4d] text-[24px]">map</Icon>
                <div>
                  <h3 className="font-display text-base sm:text-lg font-bold text-[#15211C]">
                    Alokasi Dana Pembangunan 18 Kecamatan Sidoarjo 2026
                  </h3>
                  <p className="text-xs text-[#5A6862]">Distribusi dana pembangunan kewilayahan berbasis populasi dan kebutuhan riil</p>
                </div>
              </div>
              <button
                onClick={() => setKecamatanModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#ddece3] hover:bg-[#d8e6de] flex items-center justify-center text-[#121e19]"
              >
                <Icon className="material-symbols-outlined text-[20px]">close</Icon>
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-3">
              <p className="text-[11px] text-slate-500 mb-2 flex items-center gap-1 sm:hidden">Geser ke kanan untuk melihat rincian kolom →</p>
              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F8FAF9] border-b border-slate-200 text-[#15211C] font-semibold">
                    <tr>
                      <th className="p-3">Nama Kecamatan</th>
                      <th className="p-3">Pagu Alokasi (Rp)</th>
                      <th className="p-3">Jumlah Penduduk</th>
                      <th className="p-3">Prioritas Utama Wilayah</th>
                      <th className="p-3">Realisasi Fisik</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#ddece3] text-[#5A6862]">
                    {kecamatanBudgets.map((kec, i) => (
                      <tr key={i} className="hover:bg-[#F8FAF9]/50">
                        <td className="p-3 font-bold text-[#15211C] whitespace-nowrap">{kec.nama}</td>
                        <td className="p-3 font-semibold text-[#006c4d] whitespace-nowrap">{kec.pagu}</td>
                        <td className="p-3 whitespace-nowrap">{kec.penduduk}</td>
                        <td className="p-3">{kec.prioritas}</td>
                        <td className="p-3 font-bold text-[#15211C] whitespace-nowrap">{kec.progres}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-slate-500 mt-3 italic">* Catatan: Selisih pagu kecamatan sebesar Rp 673 Miliar terhadap total APBD dialokasikan untuk Dana Cadangan Daerah, BTT (Belanja Tidak Terduga) Penanggulangan Bencana, dan Belanja Markas Setda Kabupaten Sidoarjo.</p>
            </div>

            <div className="p-4 border-t border-slate-200 bg-[#F8FAF9] flex items-center justify-between">
              <span className="text-xs text-[#5A6862]">
                Total pagu kewilayahan 18 kecamatan: <strong>Rp 4,51 Triliun</strong>
              </span>
              <button
                onClick={() => setKecamatanModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-[#038D66] text-white text-xs font-semibold hover:bg-[#026E4F]"
              >
                Tutup
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 5: DAFTAR 25 PROYEK STRATEGIS DAERAH 2026                            */}
      {/* ========================================================================= */}
      {projectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-[#F8FAF9]">
              <div className="flex items-center gap-2.5">
                <Icon className="material-symbols-outlined text-[#006c4d] text-[24px]">construction</Icon>
                <div>
                  <h3 className="font-display text-base sm:text-lg font-bold text-[#15211C]">
                    Daftar Proyek Strategis Daerah Kabupaten Sidoarjo 2026
                  </h3>
                  <p className="text-xs text-[#5A6862]">Pengawasan berkala tender lelang, rekanan pemenang, dan progres pengerjaan</p>
                </div>
              </div>
              <button
                onClick={() => setProjectModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#ddece3] hover:bg-[#d8e6de] flex items-center justify-center text-[#121e19]"
              >
                <Icon className="material-symbols-outlined text-[20px]">close</Icon>
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {strategicProjects.map((proj, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#e9f7ee] border border-slate-200 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-display text-xs sm:text-sm font-bold text-[#15211C]">
                        {proj.nama}
                      </h4>
                      <span className="px-2 py-0.5 rounded bg-[#8af7c9] text-[#002115] text-[10px] font-bold shrink-0">
                        {proj.status}
                      </span>
                    </div>

                    <div className="text-xs text-[#5A6862] space-y-1">
                      <div>Lokasi: <span className="font-medium text-[#15211C]">{proj.lokasi}</span></div>
                      <div>Anggaran: <span className="font-bold text-[#006c4d]">{proj.anggaran}</span></div>
                      <div>Pemenang Tender: <span className="font-medium text-[#15211C]">{proj.rekanan}</span></div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1 pt-1">
                      <div className="flex justify-between text-[11px] font-semibold">
                        <span className="text-[#5A6862]">Progres Fisik</span>
                        <span className="text-[#006c4d]">{proj.progres}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-[#ddece3] overflow-hidden">
                        <div className="h-full bg-[#038D66] rounded-full" style={{ width: `${proj.progres}%` }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-[#F8FAF9] flex justify-end">
              <button
                onClick={() => setProjectModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-[#038D66] text-white text-xs font-semibold hover:bg-[#026E4F]"
              >
                Tutup
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default DataPublikPage;
