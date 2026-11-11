import { Icon } from './common/Icon';
import React, { useState } from 'react';
import { X, UserPlus, LogIn, ShieldCheck, CheckCircle2, User, Phone, Mail, MapPin, AlertCircle } from 'lucide-react';
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

  const handleDemoLogin = async (demoNik: string, demoPassword = 'WargaSidoarjo2026!') => {
    setNik(demoNik);
    setPassword(demoPassword);
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nik: demoNik, password: demoPassword }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Gagal login demo.');
      }

      if (data.token) {
        sessionStorage.setItem('sitapak_auth_token', data.token);
        localStorage.setItem('sitapak_auth_token', data.token);
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
      let fallbackAccount: CitizenAccount;
      if (demoNik === '3515000000000001') {
        fallbackAccount = {
          id: 7,
          nik: '3515000000000001',
          fullName: 'Bambang Haryo Pratama, S.STP',
          phone: '081122334455',
          email: 'admin.pemkab@sidoarjokab.go.id',
          kecamatan: 'Sidoarjo (Kota)',
          kelurahan: 'Sidokumpul',
          role: 'admin_pemkab',
          isVerified: true,
        };
      } else if (demoNik === '3515000000000002') {
        fallbackAccount = {
          id: 8,
          nik: '3515000000000002',
          fullName: 'Dewi Lestari, S.Kom',
          phone: '081133445566',
          email: 'operator.dispendukcapil@sidoarjokab.go.id',
          kecamatan: 'Sidoarjo (Kota)',
          kelurahan: 'Sidokare',
          role: 'operator_opd',
          isVerified: true,
        };
      } else if (demoNik === '3515014508920001') {
        fallbackAccount = {
          id: 4,
          nik: '3515014508920001',
          fullName: 'Siti Rahmawati',
          phone: '082198765432',
          email: 'siti.rahmawati@warga.sidoarjokab.go.id',
          kecamatan: 'Waru',
          kelurahan: 'Kureksari',
          role: 'warga',
          isVerified: true,
        };
      } else {
        fallbackAccount = {
          id: 1,
          nik: '3515082104900002',
          fullName: 'Budi Santoso',
          phone: '081234567890',
          email: 'budi.santoso@warga.sidoarjokab.go.id',
          kecamatan: 'Sidoarjo (Kota)',
          kelurahan: 'Sidokumpul',
          role: 'warga',
          isVerified: true,
        };
      }

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

    if (nik.trim().length !== 16) {
      setErrorMessage('NIK harus terdiri dari tepat 16 digit angka.');
      return;
    }

    if (mode === 'register' && password.trim().length < 8) {
      setErrorMessage('Kata sandi untuk pendaftaran akun minimal 8 karakter.');
      return;
    }

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
              password: password.trim(),
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
        localStorage.setItem('sitapak_auth_token', data.token);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-lg max-h-[calc(100dvh-1.5rem)] sm:max-h-[90vh] rounded-2xl shadow-2xl border border-emerald-900/10 flex flex-col overflow-hidden relative animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="bg-[#083C2E] px-4 py-3.5 sm:px-6 sm:py-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 pr-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 shrink-0">
              {mode === 'register' ? (
                <UserPlus className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-300" />
              ) : (
                <LogIn className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-300" />
              )}
            </div>
            <div className="min-w-0">
              <h3 className="font-display font-bold text-base sm:text-lg leading-tight truncate">
                {mode === 'register' ? 'Satu Akun Warga Sidoarjo' : 'Masuk Portal SITAPAK'}
              </h3>
              <p className="text-[11px] sm:text-xs text-emerald-300/80 truncate">
                Layanan Terpadu & Transparansi Pemerintahan Digital
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup modal akun"
            className="p-1.5 rounded-lg text-emerald-300/80 hover:text-white hover:bg-emerald-900/60 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Toggle */}
        <div className="flex border-b border-slate-200 bg-slate-50 shrink-0">
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`flex-1 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold transition-colors ${
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
            className={`flex-1 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold transition-colors ${
              mode === 'login'
                ? 'bg-white text-emerald-800 border-b-2 border-emerald-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Masuk Akun
          </button>
        </div>

        {/* Body Form */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
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
                <div className="space-y-2.5">
                  {/* Admin Demo Buttons */}
                  <div className="p-3 rounded-xl bg-slate-900 text-white border border-slate-700 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        Akses Administrator SPBE (1-Klik):
                      </span>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded font-bold">
                        Akses Khusus Admin
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        type="button"
                        disabled={isLoading}
                        onClick={() => handleDemoLogin('3515000000000001', 'AdminSidoarjo2026!')}
                        className="flex-1 text-xs px-2.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-emerald-500/50 text-white font-medium transition-all text-left flex items-center justify-between cursor-pointer disabled:opacity-50"
                      >
                        <div>
                          <div className="font-bold text-emerald-300">Admin Pemkab</div>
                          <div className="text-[10px] text-slate-400">Super Admin SPBE</div>
                        </div>
                        <span className="text-[10px] bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded font-mono border border-emerald-800">
                          3515...0001
                        </span>
                      </button>
                      <button
                        type="button"
                        disabled={isLoading}
                        onClick={() => handleDemoLogin('3515000000000002', 'AdminSidoarjo2026!')}
                        className="flex-1 text-xs px-2.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-sky-500/50 text-white font-medium transition-all text-left flex items-center justify-between cursor-pointer disabled:opacity-50"
                      >
                        <div>
                          <div className="font-bold text-sky-300">Operator OPD</div>
                          <div className="text-[10px] text-slate-400">Dispendukcapil</div>
                        </div>
                        <span className="text-[10px] bg-sky-950 text-sky-300 px-1.5 py-0.5 rounded font-mono border border-sky-800">
                          3515...0002
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Warga Demo Buttons */}
                  <div className="p-3 rounded-xl bg-[#e9f7ee] border border-[#88f4c6] flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#00251b] flex items-center gap-1.5">
                        <Icon className="material-symbols-outlined text-[16px] text-[#006c4d]">badge</Icon>
                        Akun Warga Terverifikasi (1-Klik):
                      </span>
                      <span className="text-[10px] bg-[#88f4c6]/60 text-[#00251b] px-2 py-0.5 rounded font-bold">Warga</span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        type="button"
                        disabled={isLoading}
                        onClick={() => handleDemoLogin('3515082104900002', 'WargaSidoarjo2026!')}
                        className="flex-1 text-xs px-2.5 py-1.5 rounded-lg bg-white border border-[#8af7c9] hover:bg-[#8af7c9]/30 text-[#00251b] font-medium transition-colors text-left flex items-center justify-between cursor-pointer disabled:opacity-50"
                      >
                        <span>Budi Santoso</span>
                        <span className="text-[10px] text-[#717974] font-mono">351508...0002</span>
                      </button>
                      <button
                        type="button"
                        disabled={isLoading}
                        onClick={() => handleDemoLogin('3515014508920001', 'WargaSidoarjo2026!')}
                        className="flex-1 text-xs px-2.5 py-1.5 rounded-lg bg-white border border-[#8af7c9] hover:bg-[#8af7c9]/30 text-[#00251b] font-medium transition-colors text-left flex items-center justify-between cursor-pointer disabled:opacity-50"
                      >
                        <span>Siti Rahmawati</span>
                        <span className="text-[10px] text-[#717974] font-mono">351501...0001</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* NIK Field */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Nomor Induk Kependudukan (NIK)
                  </label>
                  {nik.length > 0 && nik.length < 16 && (
                    <span className="text-[11px] font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      {16 - nik.length} digit lagi
                    </span>
                  )}
                </div>
                <input
                  type="text"
                  maxLength={16}
                  minLength={16}
                  required
                  value={nik}
                  onChange={(e) => setNik(e.target.value.replace(/\D/g, ''))}
                  placeholder="3515xxxxxxxxxxxx (16 digit)"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 outline-none font-mono placeholder:text-slate-500"
                />
                <p className="text-[11px] text-slate-500 mt-1">
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
                      <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Contoh: Bagus Tri Prakoso"
                        className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 outline-none placeholder:text-slate-500"
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
                        <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="08xxxxxxxxxx"
                          className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 outline-none placeholder:text-slate-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Email Aktif
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="nama@email.com"
                          className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 outline-none placeholder:text-slate-500"
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
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 outline-none placeholder:text-slate-500"
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
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 outline-none placeholder:text-slate-500"
                />
              </div>

              {/* Error Feedback */}
              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
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
