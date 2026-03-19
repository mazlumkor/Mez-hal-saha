import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Trash2, Calendar, Clock, User, Mail, ShieldCheck, X } from 'lucide-react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

interface AdminPanelProps {
  user: any;
  onClose: () => void;
}

export default function AdminPanel({ user, onClose }: AdminPanelProps) {
  const [reservations, setReservations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [deleteConfirm, setDeleteConfirm] = useState<{ date: string; slot: string } | null>(null);

  useEffect(() => {
    fetchReservations();
    
    // Listen for real-time updates if needed, but fetch is enough for now
    const interval = setInterval(fetchReservations, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await fetch('/api/reservations');
      const data = await response.json();
      setReservations(data);
    } catch (error) {
      console.error('Rezervasyonlar yüklenemedi:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (date: string, slot: string) => {
    try {
      const response = await fetch(`/api/reservations/${date}/${slot}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setDeleteConfirm(null);
        fetchReservations();
      }
    } catch (error) {
      console.error('Silme işlemi başarısız:', error);
    }
  };

  if (user?.role !== 'admin') return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col">
      <div className="p-6 border-b border-white/10 flex items-center justify-between bg-zinc-900/50 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-neon-green/10 rounded-2xl flex items-center justify-center border border-neon-green/20">
            <ShieldCheck className="w-6 h-6 text-neon-green" />
          </div>
          <div>
            <h2 className="text-xl font-black tracking-tighter uppercase text-white">Yönetim <span className="text-neon-green">Paneli</span></h2>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Tüm Rezervasyonları Yönet</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-3 hover:bg-white/5 rounded-full transition-colors text-zinc-500 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#050505]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              <div className="col-span-full py-20 flex flex-col items-center justify-center gap-4">
                <div className="w-10 h-10 border-4 border-neon-green/20 border-t-neon-green rounded-full animate-spin" />
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Yükleniyor...</span>
              </div>
            ) : reservations.length === 0 ? (
              <div className="col-span-full py-20 text-center border-2 border-dashed border-white/5 rounded-[2.5rem]">
                <Calendar className="w-12 h-12 text-zinc-800 mx-auto mb-4" />
                <p className="text-zinc-500 font-bold uppercase tracking-widest text-sm">Henüz rezervasyon bulunmuyor.</p>
              </div>
            ) : (
              reservations.map((res, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={`${res.date}-${res.slot}`}
                  className="bg-zinc-900/50 border border-white/10 rounded-[2rem] p-6 hover:border-neon-green/30 transition-all group"
                >
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-3 bg-neon-green/10 rounded-xl border border-neon-green/20">
                        <Calendar className="w-5 h-5 text-neon-green" />
                      </div>
                      <div className="flex items-center gap-2">
                        {deleteConfirm?.date === res.date && deleteConfirm?.slot === res.slot ? (
                          <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-2">
                            <button 
                              onClick={() => setDeleteConfirm(null)}
                              className="text-[10px] font-bold text-zinc-500 hover:text-white uppercase tracking-widest"
                            >
                              İptal
                            </button>
                            <button 
                              onClick={() => handleDelete(res.date, res.slot)}
                              className="px-3 py-1.5 bg-red-500 text-white text-[10px] font-black rounded-lg hover:bg-red-600 transition-colors uppercase tracking-widest"
                            >
                              Sil
                            </button>
                          </div>
                        ) : (
                          <button 
                            onClick={() => setDeleteConfirm({ date: res.date, slot: res.slot })}
                            className="p-2 text-zinc-600 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </div>

                  <div className="space-y-4">
                    <div>
                      <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-1 flex items-center gap-2">
                        <Calendar className="w-3 h-3" /> Tarih
                      </div>
                      <div className="text-sm font-black text-white uppercase tracking-tight">
                        {format(new Date(res.date), 'd MMMM yyyy', { locale: tr })}
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-1 flex items-center gap-2">
                        <Clock className="w-3 h-3" /> Saat
                      </div>
                      <div className="text-sm font-black text-neon-green uppercase tracking-tight">
                        {res.slot}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/5">
                      <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-1 flex items-center gap-2">
                        <User className="w-3 h-3" /> Müşteri
                      </div>
                      <div className="text-sm font-bold text-white uppercase truncate">
                        {res.userName || 'Misafir'}
                      </div>
                      <div className="text-[10px] font-bold text-zinc-600 truncate flex items-center gap-1 mt-1">
                        <Mail className="w-3 h-3" /> {res.userEmail || 'E-posta yok'}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
