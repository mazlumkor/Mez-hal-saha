import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Phone, Mail, Clock } from 'lucide-react';

export default function Location() {
  return (
    <section id="location" className="py-32 bg-[#050505] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-green/5 blur-[120px] rounded-full -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600/5 blur-[120px] rounded-full translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-20">
          <span className="text-neon-green text-[10px] font-bold tracking-[0.3em] uppercase mb-4 block">
            BİZE ULAŞIN
          </span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 text-white leading-none">
            MERKEZİ <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green via-emerald-400 to-neon-green bg-[length:200%_auto] animate-gradient">
              KONUMUMUZ.
            </span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Map Container */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group h-[500px] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.825203303643!2d28.5284043!3d41.0503056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b5597984848485%3A0x8484848484848484!2zVMO8cmtvYmEsIEV6ZWwgU2suIE5vOjIxLCAzNDU0MCBCw7x5w7xrY2VrbWVjZS_EsHN0YW5idWw!5e0!3m2!1str!2str!4v1710850000000!5m2!1str!2str"
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700"
            ></iframe>
            
            <div className="absolute bottom-8 left-8 right-8">
              <a 
                href="https://www.google.com/maps/dir//Türkoba,+Ezel+Sk.+No:21,+34540+Büyükçekmece%2Fİstanbul"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-4 bg-white text-black font-black rounded-2xl hover:bg-neon-green transition-colors shadow-2xl"
              >
                <Navigation className="w-5 h-5" />
                YOL TARİFİ AL
              </a>
            </div>
          </motion.div>

          {/* Info Cards */}
          <div className="grid gap-6">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:border-neon-green/30 transition-all group"
            >
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-neon-green/10 flex items-center justify-center shrink-0 group-hover:bg-neon-green transition-all duration-500">
                  <MapPin className="w-6 h-6 text-neon-green group-hover:text-black transition-colors" />
                </div>
                <div>
                  <h4 className="text-white font-black text-lg mb-2 uppercase tracking-tight">ADRES</h4>
                  <p className="text-zinc-400 font-medium leading-relaxed">
                    Türkoba Mahallesi Ezel Sokak No:21 <br />
                    Büyükçekmece, İstanbul
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:border-neon-green/30 transition-all group"
            >
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-neon-green/10 flex items-center justify-center shrink-0 group-hover:bg-neon-green transition-all duration-500">
                  <Phone className="w-6 h-6 text-neon-green group-hover:text-black transition-colors" />
                </div>
                <div>
                  <h4 className="text-white font-black text-lg mb-2 uppercase tracking-tight">TELEFON</h4>
                  <p className="text-zinc-400 font-medium leading-relaxed">
                    +90 546 224 93 29
                  </p>
                  <p className="text-[10px] text-neon-green font-bold uppercase tracking-widest mt-2">7/24 Rezervasyon Hattı</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:border-neon-green/30 transition-all group"
            >
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-neon-green/10 flex items-center justify-center shrink-0 group-hover:bg-neon-green transition-all duration-500">
                  <Clock className="w-6 h-6 text-neon-green group-hover:text-black transition-colors" />
                </div>
                <div>
                  <h4 className="text-white font-black text-lg mb-2 uppercase tracking-tight">ÇALIŞMA SAATLERİ</h4>
                  <div className="grid grid-cols-2 gap-8 mt-2">
                    <div>
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest block mb-1">Hafta İçi</span>
                      <span className="text-white font-black">09:00 - 02:00</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest block mb-1">Hafta Sonu</span>
                      <span className="text-white font-black">08:00 - 03:00</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
