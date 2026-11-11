import { Icon } from './common/Icon';
import React, { useState } from 'react';
import { X, UserPlus, LogIn, ShieldCheck, CheckCircle2, User, Phone, Mail, MapPin } from 'lucide-react';
import { CitizenAccount } from '../types/portal';

interface RegisterAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'register' | 'login';
  onSuccess: (user: CitizenAccount) => void;
}

const KECAMATAN_SIDOARJO = [
  'Sidoarjo',
  'Candi',
  'Buduran',
  'Gedangan',
  'Waru',
  'Sedati',
  'Taman',
  'Sukodono',
  'Krian',
  'Balongbendo',
  'Tarik',
  'Prambon',
  'Krembung',
  'Tulangan',
  'Wonoayu',
  'Tanggulangin',
  'Porong',
  'Jabon',
];

export const RegisterAccountModal: React.FC<RegisterAccountModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'register',
  onSuccess,
}) => {
  const [mode, setMode] = useState<'register' | 'login'>(initialMode);
  const [nik, setNik] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [kecamatan, setKecamatan] = useState(KECAMATAN_SIDOARJO[0]);
  const [kelurahan, setKelurahan] = useState('');
  const [password, setPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDemoLogin = async (demoNik: string) => {
    setNik(demoNik);
    setPassword('WargaSidoarjo2026!');
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nik: demoNik, password: 'WargaSidoarjo2026!' }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Gagal login demo.');
      }

      if (data.token) {
        sessionStorage.setItem('sitapak_auth_token', data.token);
      }

      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setIsLoading(false);
        onSuccess(data.citizen);
        onClose();
      }, 800);
    } catch {
      // Fallback offline mock jika backend belum menyala
      const fallbackAccount: CitizenAccount =
        demoNik === '3515014508920001'
          ? {
              nik: '3515014508920001',
              fullName: 'Siti Rahmawati',
              phone: '082198765432',
              email: 'siti.rahmawati@warga.sidoarjokab.go.id',
              kecamatan: 'Waru',
              kelurahan: 'Kureksari',
            }
          : {
              nik: '3515082104900002',
              fullName: 'Budi Santoso',
              phone: '081234567890',
              email: 'budi.santoso@warga.sidoarjokab.go.id',
              kecamatan: 'Sidoarjo (Kota)',
              kelurahan: 'Sidokumpul',
            };

      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setIsLoading(false);
        onSuccess(fallbackAccount);
        onClose();
      }, 800);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
      const payload =
        mode === 'login'
          ? { nik: nik.trim(), password }
          : {
              nik: nik.trim(),
              fullName: fullName.trim(),
              phone: phone.trim(),
              email: email.trim(),
              kecamatan,
              kelurahan: kelurahan.trim(),
              password: password || 'WargaSidoarjo2026!',
            };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Terjadi kesalahan autentikasi.');
      }

      if (data.token) {
        sessionStorage.setItem('sitapak_auth_token', data.token);
      }

      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setIsLoading(false);
        onSuccess(data.citizen);
        onClose();
      }, 1000);
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage(err.message || 'Gagal terhubung ke gateway autentikasi.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-emerald-900/10 overflow-hidden relative my-8 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="bg-[#083C2E] px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
              {mode === 'register' ? (
                <UserPlus className="w-5 h-5 text-emerald-300" />
              ) : (
                <LogIn className="w-5 h-5 text-emerald-300" />
              )}
            </div>
            <div>
              <h3 className="font-display font-bold text-lg leading-tight">
                {mode === 'register' ? 'Satu Akun Warga Sidoarjo' : 'Masuk Portal SITAPAK'}
              </h3>
              <p className="text-xs text-emerald-300/80">
                Layanan Terpadu & Transparansi Pemerintahan Digital
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

        {/* Tab Toggle */}
        <div className="flex border-b border-slate-200 bg-slate-50">
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`flex-1 py-3 text-xs sm:text-sm font-semibold transition-colors ${
              mode === 'register'
                ? 'bg-white text-emerald-800 border-b-2 border-emerald-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Daftar Akun Baru
          </button>
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 py-3 text-xs sm:text-sm font-semibold transition-colors ${
              mode === 'login'
                ? 'bg-white text-emerald-800 border-b-2 border-emerald-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Masuk Akun
          </button>
        </div>

        {/* Body Form */}
        <div className="p-6">
          {isSuccess ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-display font-bold text-xl text-slate-900">
                {mode === 'register' ? 'Pendaftaran Berhasil!' : 'Berhasil Masuk!'}
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Identitas NIK Anda telah terverifikasi dengan database Dispendukcapil Kabupaten Sidoarjo.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Quick Demo Login Preset Buttons */}
              {mode === 'login' && (
                <div className="p-3.5 rounded-xl bg-[#e9f7ee] border border-[#88f4c6] flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#00251b] flex items-center gap-1.5">
                      <Icon className="material-symbols-outlined text-[16px] text-[#006c4d]">badge</Icon>
                      Pilihan Akun Demo (1-Klik):
                    </span>
                    <span className="text-[10px] bg-[#88f4c6]/60 text-[#00251b] px-2 py-0.5 rounded font-bold">Terverifikasi</span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      type="button"
                      disabled={isLoading}
                      onClick={() => handleDemoLogin('3515082104900002')}
                      className="flex-1 text-xs px-2.5 py-1.5 rounded-lg bg-white border border-[#8af7c9] hover:bg-[#8af7c9]/30 text-[#00251b] font-medium transition-colors text-left flex items-center justify-between cursor-pointer disabled:opacity-50"
                    >
                      <span>Budi Santoso</span>
                      <span className="text-[10px] text-[#717974] font-mono">351508...0002</span>
                    </button>
                    <button
                      type="button"
                      disabled={isLoading}
                      onClick={() => handleDemoLogin('3515014508920001')}
                      className="flex-1 text-xs px-2.5 py-1.5 rounded-lg bg-white border border-[#8af7c9] hover:bg-[#8af7c9]/30 text-[#00251b] font-medium transition-colors text-left flex items-center justify-between cursor-pointer disabled:opacity-50"
                    >
                      <span>Siti Rahmawati</span>
                      <span className="text-[10px] text-[#717974] font-mono">351501...0001</span>
                    </button>
                  </div>
                </div>
              )}

              {/* NIK Field */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Nomor Induk Kependudukan (NIK)
                </label>
                <input
                  type="text"
                  maxLength={16}
                  required
                  value={nik}
                  onChange={(e) => setNik(e.target.value.replace(/\D/g, ''))}
                  placeholder="3515xxxxxxxxxxxx (16 digit)"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 outline-none font-mono"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  NIK Sidoarjo digunakan untuk integrasi Plavon Dukcapil dan izin SIPRAJA.
                </p>
              </div>

              {mode === 'register' && (
                <>
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Nama Lengkap (Sesuai KTP)
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Contoh: Bagus Tri Prakoso"
                        className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 outline-none"
                      />
                    </div>
                  </div>

                  {/* Phone & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        No. WhatsApp
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="08xxxxxxxxxx"
                          className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Email Aktif
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="nama@email.com"
                          className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Kecamatan & Kelurahan */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Kecamatan
                      </label>
                      <select
                        value={kecamatan}
                        onChange={(e) => setKecamatan(e.target.value)}
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:border-emerald-600 focus:bg-white outline-none"
                      >
                        {KECAMATAN_SIDOARJO.map((kec) => (
                          <option key={kec} value={kec}>
                            Kecamatan {kec}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Kelurahan / Desa
                      </label>
                      <input
                        type="text"
                        required
                        value={kelurahan}
                        onChange={(e) => setKelurahan(e.target.value)}
                        placeholder="Nama Desa/Kelurahan"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 outline-none"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Kata Sandi
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 outline-none"
                />
              </div>

              {/* Error Feedback */}
              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
                  <Icon className="material-symbols-outlined text-[18px] text-red-600">error</Icon>
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Security Tag */}
              <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-50 text-[11px] text-emerald-900 border border-emerald-100">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Data kependudukan dilindungi UU PDP No. 27/2022 & terenkripsi BSSN.</span>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-[#038D66] hover:bg-[#026E4F] disabled:opacity-60 text-white font-semibold text-sm rounded-xl transition-all shadow-sm cursor-pointer mt-2 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    <span>Memproses Autentikasi...</span>
                  </>
                ) : (
                  <span>{mode === 'register' ? 'Buat Akun Warga Terpadu' : 'Masuk Sekarang'}</span>
                )}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
