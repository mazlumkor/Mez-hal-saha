import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Bell, Info, Shield, FileText, Eye, 
  Handshake, LogOut, Trash2, ChevronRight, 
  User, Settings, Heart, Calendar, MessageSquare 
} from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  onLogout: () => void;
}

export default function ProfileModal({ isOpen, onClose, user, onLogout }: ProfileModalProps) {
  if (!user) return null;

  const menuItems = [
    { icon: Bell, label: 'Bildirim Ayarları', color: 'text-blue-400', action: () => {} },
    { icon: Info, label: 'Hakkında', color: 'text-emerald-400', action: () => (window as any).openLegalModal('about') },
    { icon: Shield, label: 'Gizlilik Politikası', color: 'text-purple-400', action: () => (window as any).openLegalModal('privacy') },
    { icon: FileText, label: 'Kullanım Koşulları', color: 'text-orange-400', action: () => (window as any).openLegalModal('terms') },
    { icon: Eye, label: 'Aydınlatma Metni', color: 'text-cyan-400', action: () => (window as any).openLegalModal('clarification') },
    { icon: Handshake, label: 'Mesafeli Satış Sözleşmesi', color: 'text-yellow-400', action: () => (window as any).openLegalModal('distanceSelling') },
  ];

  const quickActions = [
    { icon: Heart, label: 'Favorilerim' },
    { icon: Calendar, label: 'Maçlarım' },
    { icon: MessageSquare, label: 'Destek' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="p-8 border-b border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent">
              <div className="flex justify-between items-start mb-8">
                <h2 className="text-3xl font-black tracking-tighter text-white">PROFİLİM</h2>
                <button 
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center gap-6">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-neon-green to-emerald-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
                  <div className="relative w-20 h-20 bg-black rounded-2xl flex items-center justify-center border border-white/10 overflow-hidden">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-10 h-10 text-neon-green" />
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-black text-white uppercase tracking-tight">{user.name}</h3>
                  <p className="text-zinc-500 font-bold text-xs tracking-widest uppercase mt-1">{user.email || user.phone || '546 224 93 29'}</p>
                  <button className="mt-3 px-4 py-1.5 bg-neon-green/10 border border-neon-green/20 rounded-lg text-[10px] font-black text-neon-green uppercase tracking-widest hover:bg-neon-green hover:text-black transition-all">
                    Profili Düzenle
                  </button>
                </div>
              </div>

              {/* Version Tag */}
              <div className="mt-8 text-center">
                <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.3em]">Version: 2.0</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-px bg-white/5 border-b border-white/5">
              {quickActions.map((action, i) => (
                <button key={i} className="py-6 bg-[#0A0A0A] hover:bg-white/[0.02] transition-colors flex flex-col items-center gap-2 group">
                  <action.icon className="w-5 h-5 text-zinc-500 group-hover:text-neon-green transition-colors" />
                  <span className="text-[9px] font-bold text-zinc-500 group-hover:text-white uppercase tracking-widest">{action.label}</span>
                </button>
              ))}
            </div>

            {/* Menu List */}
            <div className="max-h-[400px] overflow-y-auto custom-scrollbar p-4">
              <div className="space-y-1">
                {menuItems.map((item, i) => (
                  <button 
                    key={i}
                    onClick={() => {
                      item.action();
                      if (item.label !== 'Bildirim Ayarları') onClose();
                    }}
                    className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-white/10 transition-colors`}>
                        <item.icon className={`w-5 h-5 ${item.color}`} />
                      </div>
                      <span className="text-sm font-bold text-zinc-300 group-hover:text-white transition-colors uppercase tracking-tight">{item.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-neon-green transition-all group-hover:translate-x-1" />
                  </button>
                ))}

                <div className="h-px bg-white/5 my-4 mx-4" />

                <button 
                  onClick={() => { onLogout(); onClose(); }}
                  className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-red-500/5 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/10 group-hover:border-red-500/20 transition-colors">
                      <LogOut className="w-5 h-5 text-red-500" />
                    </div>
                    <span className="text-sm font-bold text-red-500 uppercase tracking-tight">Çıkış Yap</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-red-900 group-hover:text-red-500 transition-all group-hover:translate-x-1" />
                </button>

                <button 
                  className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-red-900/10 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-red-900/10 flex items-center justify-center border border-red-900/10 group-hover:border-red-900/20 transition-colors">
                      <Trash2 className="w-5 h-5 text-red-900 group-hover:text-red-600" />
                    </div>
                    <span className="text-sm font-bold text-red-900 group-hover:text-red-600 uppercase tracking-tight">Hesabımı Sil</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-red-900/50 group-hover:text-red-600 transition-all group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
