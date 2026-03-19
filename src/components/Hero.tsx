import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Play } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-neon-green/20 rounded-full blur-[150px] opacity-40" />
        <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-pitch-green/20 rounded-full blur-[150px] opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-neon-green/10 border border-neon-green/20 text-neon-green text-xs font-bold tracking-widest uppercase mb-6">
            Şehrin En İyi Halısahası
          </span>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9] text-white">
            SAHANIN <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green via-emerald-400 to-neon-green bg-[length:200%_auto] animate-gradient">
              YILDIZI OL
            </span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Profesyonel zemin, gece aydınlatması ve canlı maç kaydı ile futbol keyfini zirveye taşı. 
            Mez Halısaha'da yerini hemen ayırt.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#booking"
              className="group relative px-8 py-4 bg-neon-green text-black font-black rounded-full overflow-hidden transition-all hover:scale-105 shadow-[0_0_30px_rgba(57,255,20,0.4)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                REZERVASYON YAP <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
            <button className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-full font-bold hover:bg-white/10 transition-all">
              <div className="w-8 h-8 bg-neon-green rounded-full flex items-center justify-center">
                <Play className="w-4 h-4 text-black fill-current" />
              </div>
              MAÇLARI İZLE
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-10 border-t border-white/5"
        >
          {[
            { label: 'Aktif Saha', value: '3' },
            { label: 'Yıllık Maç', value: '1,200+' },
            { label: 'Mutlu Takım', value: '500+' },
            { label: 'HD Kamera', value: '12' },
          ].map((stat) => (
            <div key={stat.label} className="group cursor-default">
              <div className="text-3xl font-black text-white mb-1 group-hover:text-neon-green transition-colors">{stat.value}</div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-bold">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
