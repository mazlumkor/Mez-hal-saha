import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CreditCard, ShieldCheck, Lock, Copy, Check } from 'lucide-react';
import { cn } from '../lib/utils';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  reservationDetails: { date: string; slot: string; rawDate: Date } | null;
  user: any;
}

export default function PaymentModal({ isOpen, onClose, reservationDetails, user }: PaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'iban'>('card');
  const [error, setError] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const IBAN = "TR12 0006 2000 5710 0006 6164 45";
  const ACCOUNT_HOLDER = "Mazlum Kör";

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast.success(`${field} kopyalandı!`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reservationDetails) return;

    setIsProcessing(true);
    setError(null);

    try {
      const response = await fetch('/api/reserve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: format(reservationDetails.rawDate, 'yyyy-MM-dd'),
          slot: reservationDetails.slot,
          userEmail: user?.email || 'misafir@email.com',
          userName: user?.name || 'Misafir',
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Rezervasyon sırasında bir hata oluştu.');
      }

      toast.success('Rezervasyon Başarılı!', {
        description: `${user?.email || 'E-posta'} adresine onay e-postası gönderildi (Simülasyon).`
      });

      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
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
                <h3 className="text-2xl font-black tracking-tighter uppercase text-white">Ödeme <span className="text-neon-green">Paneli</span></h3>
                <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              {isSuccess ? (
                <div className="py-12 text-center">
                  <div className="w-20 h-20 bg-neon-green rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-neon-green/40">
                    <ShieldCheck className="text-black w-10 h-10" />
                  </div>
                  <h4 className="text-2xl font-bold mb-2 text-white">Ödeme Başarılı!</h4>
                  <p className="text-gray-400 mb-6">Rezervasyonunuz onaylandı. E-posta ile bilgilendirme gönderildi.</p>
                  <div className="p-4 rounded-2xl bg-neon-green/10 border border-neon-green/20 text-sm text-neon-green">
                    <strong>Not:</strong> Kalan 2.500 TL tutarı maç günü tesiste nakit veya kartla ödeyebilirsiniz.
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="p-4 rounded-2xl bg-black/40 border border-white/10 mb-6">
                    <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Rezervasyon Özeti</div>
                    <div className="text-sm font-bold text-white">
                      {reservationDetails?.date} | {reservationDetails?.slot}
                    </div>
                    <div className="mt-4 flex flex-col gap-2">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Saha Ücreti</span>
                        <span>3.000 TL</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Kapora Tutarı</span>
                        <span className="text-xl font-black text-neon-green">500.00 TL</span>
                      </div>
                      <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest text-right">
                        Kalan: 2.500 TL (Sahada Ödenecek)
                      </div>
                    </div>
                  </div>

                  <div className="flex p-1.5 bg-black/40 rounded-2xl mb-8 border border-white/5">
                    <button
                      onClick={() => setPaymentMethod('card')}
                      className={cn(
                        'flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all',
                        paymentMethod === 'card' ? 'bg-neon-green text-black shadow-lg' : 'text-zinc-500 hover:text-white'
                      )}
                    >
                      KREDİ KARTI
                    </button>
                    <button
                      onClick={() => setPaymentMethod('iban')}
                      className={cn(
                        'flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all',
                        paymentMethod === 'iban' ? 'bg-neon-green text-black shadow-lg' : 'text-zinc-500 hover:text-white'
                      )}
                    >
                      IBAN / EFT
                    </button>
                  </div>

                  {paymentMethod === 'card' ? (
                    <form onSubmit={handlePayment} className="space-y-6">
                      <div className="space-y-4">
                        <div className="relative">
                          <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest ml-2 mb-1 block">Kart Sahibi</label>
                          <input
                            required
                            type="text"
                            placeholder="AD SOYAD"
                            className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-neon-green transition-colors font-bold placeholder:text-gray-700 text-white"
                          />
                        </div>
                        <div className="relative">
                          <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest ml-2 mb-1 block">Kart Numarası</label>
                          <div className="relative">
                            <input
                              required
                              type="text"
                              placeholder="0000 0000 0000 0000"
                              className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-neon-green transition-colors font-bold placeholder:text-gray-700 text-white"
                            />
                            <CreditCard className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-700" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="relative">
                            <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest ml-2 mb-1 block">S.K.T</label>
                            <input
                              required
                              type="text"
                              placeholder="AA/YY"
                              className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-neon-green transition-colors font-bold placeholder:text-gray-700 text-white"
                            />
                          </div>
                          <div className="relative">
                            <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest ml-2 mb-1 block">CVV</label>
                            <input
                              required
                              type="text"
                              placeholder="000"
                              className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-neon-green transition-colors font-bold placeholder:text-gray-700 text-white"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-center gap-4">
                        <div className="flex items-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all">
                          <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Troy_logo.svg/1200px-Troy_logo.svg.png" alt="Troy" className="h-4" />
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                            <Lock className="w-3 h-3 text-neon-green" />
                            256-BIT SSL GÜVENLİ ÖDEME
                          </div>
                          <div className="text-[8px] text-zinc-600 font-bold uppercase tracking-widest">
                            Kart bilgileriniz sunucularımızda saklanmaz
                          </div>
                        </div>
                      </div>

                      {error && (
                        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-xs text-red-500 text-center font-bold">
                          {error}
                        </div>
                      )}

                      <button
                        disabled={isProcessing}
                        type="submit"
                        className="w-full py-5 bg-neon-green text-black font-black rounded-2xl hover:scale-[1.02] transition-transform shadow-xl shadow-neon-green/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                      >
                        {isProcessing ? (
                          <div className="w-6 h-6 border-4 border-black/20 border-t-black rounded-full animate-spin" />
                        ) : (
                          'KAPORA ÖDE VE ONAYLA'
                        )}
                      </button>
                    </form>
                  ) : (
                    <div className="space-y-6">
                      <div className="p-6 rounded-2xl bg-neon-green/5 border border-neon-green/10 space-y-4">
                        <div>
                          <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Banka Adı</div>
                          <div className="font-bold text-white">GARANTİ BANKASI</div>
                        </div>
                        <div className="group relative">
                          <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Hesap Sahibi</div>
                          <div className="flex items-center justify-between">
                            <div className="font-bold text-white">{ACCOUNT_HOLDER}</div>
                            <button 
                              onClick={() => copyToClipboard(ACCOUNT_HOLDER, "İsim Soyisim")}
                              className="p-2 hover:bg-neon-green/20 rounded-lg transition-colors text-neon-green"
                            >
                              {copiedField === "İsim Soyisim" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                        <div className="group relative">
                          <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">IBAN</div>
                          <div className="flex items-center justify-between gap-4">
                            <div className="font-mono font-bold text-white break-all text-xs">{IBAN}</div>
                            <button 
                              onClick={() => copyToClipboard(IBAN, "IBAN")}
                              className="p-2 hover:bg-neon-green/20 rounded-lg transition-colors text-neon-green shrink-0"
                            >
                              {copiedField === "IBAN" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                        <div>
                          <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Açıklama</div>
                          <div className="font-bold text-neon-green uppercase">REZ-{reservationDetails?.slot.split(' ')[0]}</div>
                        </div>
                      </div>
                      <p className="text-[10px] text-gray-500 text-center leading-relaxed">
                        * Ödemeyi yaptıktan sonra dekontunuzu WhatsApp üzerinden iletmeyi unutmayın. 
                        Rezervasyonunuz dekont sonrası onaylanacaktır.
                      </p>
                      <button
                        onClick={() => setIsSuccess(true)}
                        className="w-full py-5 bg-white/5 border border-white/10 text-white font-black rounded-2xl hover:bg-white/10 transition-all shadow-xl"
                      >
                        ÖDEMEYİ YAPTIM
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
