import React from 'react';
import { Trophy, Instagram, Twitter, Facebook, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-neon-green rounded-xl flex items-center justify-center shadow-lg shadow-neon-green/40">
                <Trophy className="text-black w-6 h-6" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-white">
                MEZ <span className="text-neon-green">HALISAHA</span>
              </span>
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
