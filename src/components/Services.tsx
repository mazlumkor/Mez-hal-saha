import React from 'react';
import { motion } from 'motion/react';
import { Footprints, ShowerHead, Coffee, Video, CreditCard, RefreshCcw, ShieldCheck } from 'lucide-react';
import { SERVICES } from '../constants';

const iconMap: Record<string, any> = {
  Footprints,
  ShowerHead,
  Coffee,
  Video,
  CreditCard,
  RefreshCcw,
  ShieldCheck,
};

export default function Services() {
  return (
    <section id="services" className="py-32 bg-[#050505] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <span className="text-neon-green text-[10px] font-bold tracking-[0.3em] uppercase mb-4 block">
            AYRICALIKLARIMIZ
          </span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 text-white leading-none">
            SADECE BİR SAHA <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green via-emerald-400 to-neon-green bg-[length:200%_auto] animate-gradient">
              DEĞİL, DENEYİM.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
          {SERVICES.map((service, index) => {
            const Icon = iconMap[service.icon];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-neon-green/50 hover:bg-white/10 transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-neon-green/5 blur-3xl rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-16 h-16 rounded-2xl bg-neon-green/10 flex items-center justify-center mb-8 group-hover:bg-neon-green transition-all duration-500 shadow-lg shadow-neon-green/0 group-hover:shadow-neon-green/20">
                  <Icon className="w-8 h-8 text-neon-green group-hover:text-black transition-colors duration-500" />
                </div>
                <h3 className="text-2xl font-black mb-4 text-white uppercase tracking-tight">{service.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed font-medium">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Payment & Refund Policy */}
        <div className="relative overflow-hidden rounded-[3rem] bg-zinc-900/30 border border-white/5 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto p-10 md:p-20">
            <div className="text-center mb-16">
              <span className="text-neon-green text-[10px] font-bold tracking-[0.3em] uppercase mb-6 block">
                GÜVENLİ REZERVASYON
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-[0.9] tracking-tighter">
                ŞEFFAF VE <br />GÜVENLİ ÖDEME
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-12">
              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:border-neon-green/50 transition-colors">
                  <CreditCard className="w-8 h-8 text-neon-green" />
                </div>
                <h4 className="text-white font-black text-lg mb-3 uppercase tracking-tight">Kapora Sistemi</h4>
                <p className="text-zinc-400 text-sm leading-relaxed font-medium">
                  Rezervasyonunuzu kesinleştirmek için 500 TL kapora ödemesi alınır. 
                  Kalan ücret maç günü sahada nakit veya IBAN ile ödenir.
                </p>
              </div>

              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:border-neon-green/50 transition-colors">
                  <RefreshCcw className="w-8 h-8 text-neon-green" />
                </div>
                <h4 className="text-white font-black text-lg mb-3 uppercase tracking-tight">İade Koşulları</h4>
                <p className="text-zinc-400 text-sm leading-relaxed font-medium">
                  Maç saatinden 24 saat öncesine kadar yapılan iptallerde kapora iade edilir. 
                  Son 24 saat içindeki iptallerde iade yapılmaz.
                </p>
              </div>

              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:border-neon-green/50 transition-colors">
                  <ShieldCheck className="w-8 h-8 text-neon-green" />
                </div>
                <h4 className="text-white font-black text-lg mb-3 uppercase tracking-tight">Güvenli Ödeme</h4>
                <p className="text-zinc-400 text-sm leading-relaxed font-medium">
                  Tüm ödemeleriniz 256-bit SSL sertifikası ile korunur. 
                  IBAN ödemelerinde açıklama kısmına rezervasyon kodu yazılmalıdır.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
