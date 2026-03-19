import React from 'react';
import { Trophy, Instagram, Twitter, Facebook, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-neon-green to-emerald-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative w-10 h-10 bg-black rounded-xl flex items-center justify-center border border-white/10 shadow-2xl">
                  <svg viewBox="0 0 100 100" className="w-6 h-6">
                    <path 
                      d="M20 80V20L50 50L80 20V80" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="12" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="text-neon-green"
                    />
                    <circle cx="50" cy="50" r="8" className="fill-neon-green animate-pulse" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tighter text-white leading-none">
                  MEZ<span className="text-neon-green">.</span>
                </span>
                <span className="text-[7px] font-black tracking-[0.4em] text-zinc-500 uppercase leading-none mt-1">
                  HALISAHA KOMPLEKSİ
                </span>
              </div>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed font-medium">
              Şehrin en modern futbol kompleksi. Profesyonel zemin, 
              kesintisiz aydınlatma ve sosyal alanlarımızla hizmetinizdeyiz.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:border-neon-green/50 hover:text-neon-green transition-all text-zinc-400">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-[10px] mb-8">HIZLI MENÜ</h4>
            <ul className="space-y-4">
              {['Ana Sayfa', 'Hizmetler', 'Rezervasyon', 'Abone Girişi'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-zinc-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-[10px] mb-8">İLETİŞİM</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-zinc-400">
                <MapPin className="w-5 h-5 text-neon-green shrink-0" />
                <span className="font-medium">Futbol Cad. No:123, <br />Merkez, İstanbul</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-zinc-400">
                <Phone className="w-5 h-5 text-neon-green shrink-0" />
                <span className="font-medium">+90 (212) 555 00 00</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-zinc-400">
                <Mail className="w-5 h-5 text-neon-green shrink-0" />
                <span className="font-medium">info@mezhalisaha.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-[10px] mb-8">ÇALIŞMA SAATLERİ</h4>
            <ul className="space-y-4">
              <li className="flex justify-between text-sm">
                <span className="text-zinc-400 font-bold uppercase tracking-widest text-[10px]">Hafta İçi</span>
                <span className="text-neon-green font-black">09:00 - 02:00</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-zinc-400 font-bold uppercase tracking-widest text-[10px]">Hafta Sonu</span>
                <span className="text-neon-green font-black">08:00 - 03:00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">
            © 2026 Mez Halısaha. Tüm hakları saklıdır.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-gray-500 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-widest">Gizlilik Politikası</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-widest">Kullanım Şartları</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
