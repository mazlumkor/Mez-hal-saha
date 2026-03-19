import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Users, Lock, ArrowRight, ShieldCheck, User } from 'lucide-react';
import { cn } from '../lib/utils';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps & { onLoginSuccess: (user: any) => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [loginType, setLoginType] = useState<'individual' | 'team'>('individual');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [teamName, setTeamName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const endpoint = isLogin ? '/api/login' : '/api/register';
    const payload = isLogin 
      ? { email, password }
      : { email, password, name, teamName, role: 'user' };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Bir hata oluştu.');
      }

      onLoginSuccess(data.user);
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-zinc-900 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl"
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black tracking-tighter uppercase text-white">
                  {showForgotPassword ? 'Şifremi' : (isLogin ? (loginType === 'team' ? 'Takım' : 'Kullanıcı') : 'Yeni')} <span className="text-neon-green">{showForgotPassword ? 'Unuttum' : (isLogin ? 'Girişi' : (loginType === 'team' ? 'Takım' : 'Hesap'))}</span>
                </h3>
                <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              {error && (
                <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-xs text-red-500 font-bold text-center">
                  {error}
                </div>
              )}

              {!showForgotPassword && (
                <div className="space-y-6 mb-8">
                  {/* Login/Register Toggle */}
                  <div className="flex p-1.5 bg-black/40 rounded-2xl border border-white/5">
                    <button
                      onClick={() => { setIsLogin(true); setError(null); }}
                      className={cn(
                        'flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all',
                        isLogin ? 'bg-neon-green text-black shadow-lg' : 'text-zinc-500 hover:text-white'
                      )}
                    >
                      GİRİŞ YAP
                    </button>
                    <button
                      onClick={() => { setIsLogin(false); setError(null); }}
                      className={cn(
                        'flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all',
                        !isLogin ? 'bg-neon-green text-black shadow-lg' : 'text-zinc-500 hover:text-white'
                      )}
                    >
                      KAYIT OL
                    </button>
                  </div>

                  {/* Individual/Team Toggle */}
                  <div className="flex gap-4">
                    <button
                      onClick={() => setLoginType('individual')}
                      className={cn(
                        'flex-1 py-4 rounded-2xl border text-[10px] font-black uppercase tracking-[0.2em] transition-all',
                        loginType === 'individual' ? 'border-neon-green bg-neon-green/10 text-neon-green' : 'border-white/5 text-zinc-500 hover:border-white/20'
                      )}
                    >
                      BİREYSEL
                    </button>
                    <button
                      onClick={() => setLoginType('team')}
                      className={cn(
                        'flex-1 py-4 rounded-2xl border text-[10px] font-black uppercase tracking-[0.2em] transition-all',
                        loginType === 'team' ? 'border-neon-green bg-neon-green/10 text-neon-green' : 'border-white/5 text-zinc-500 hover:border-white/20'
                      )}
                    >
                      ABONE TAKIM
                    </button>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {showForgotPassword ? (
                  <div className="space-y-6">
                    <p className="text-sm text-gray-400 leading-relaxed">
                      E-posta adresinizi girin, size şifre sıfırlama bağlantısı gönderelim.
                    </p>
                    <div className="relative">
                      <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest ml-2 mb-1 block">E-Posta</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={loginType === 'team' ? "takim@mezhalisaha.com" : "kullanici@email.com"}
                        className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-neon-green transition-colors font-bold placeholder:text-gray-700 text-white"
                      />
                    </div>
                    <button
                      type="button"
                      className="w-full py-5 bg-neon-green text-black font-black rounded-2xl hover:scale-[1.02] transition-transform shadow-xl shadow-neon-green/40"
                    >
                      SIFIRLAMA BAĞLANTISI GÖNDER
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(false)}
                      className="w-full text-xs font-bold text-gray-500 hover:text-neon-green transition-colors"
                    >
                      GİRİŞ EKRANINA DÖN
                    </button>
                  </div>
                ) : (
                  <>
                    {!isLogin && loginType === 'team' && (
                      <div className="relative">
                        <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest ml-2 mb-1 block">Takım Adı</label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                            placeholder="ŞAMPİYONLAR FC"
                            className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-neon-green transition-colors font-bold placeholder:text-gray-700 text-white"
                          />
                          <Users className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-700" />
                        </div>
                      </div>
                    )}
                    {!isLogin && loginType === 'individual' && (
                      <div className="relative">
                        <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest ml-2 mb-1 block">Ad Soyad</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="AHMET YILMAZ"
                          className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-neon-green transition-colors font-bold placeholder:text-gray-700 text-white"
                        />
                      </div>
                    )}
                    <div className="relative">
                      <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest ml-2 mb-1 block">E-Posta</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={loginType === 'team' ? "takim@mezhalisaha.com" : "kullanici@email.com"}
                        className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-neon-green transition-colors font-bold placeholder:text-gray-700 text-white"
                      />
                    </div>
                    <div className="relative">
                      <div className="flex justify-between items-center ml-2 mb-1">
                        <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em] block">Şifre</label>
                        {isLogin && (
                          <button 
                            type="button"
                            onClick={() => setShowForgotPassword(true)}
                            className="text-[10px] text-neon-green font-bold uppercase tracking-[0.2em] hover:underline"
                          >
                            Şifremi Unuttum
                          </button>
                        )}
                      </div>
                      <div className="relative">
                        <input
                          type="password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-neon-green transition-colors font-bold placeholder:text-gray-700 text-white"
                        />
                        <Lock className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-700" />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-5 bg-neon-green text-black font-black rounded-2xl hover:scale-[1.02] transition-transform shadow-xl shadow-neon-green/40 flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {isLoading ? (
                        <div className="w-6 h-6 border-4 border-black/20 border-t-black rounded-full animate-spin" />
                      ) : (
                        <>
                          {isLogin ? 'GİRİŞ YAP' : 'KAYIT OL'} <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </>
                )}
              </form>

              <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-center gap-4 text-gray-500">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                  <ShieldCheck className="w-4 h-4 text-neon-green" />
                  Güvenli Bağlantı
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
