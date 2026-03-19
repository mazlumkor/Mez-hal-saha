import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { format, addDays, startOfToday } from 'date-fns';
import { tr } from 'date-fns/locale';
import { Calendar as CalendarIcon, Clock, CheckCircle2 } from 'lucide-react';
import { TIME_SLOTS } from '../constants';
import { cn } from '../lib/utils';

interface ReservationCalendarProps {
  onSelectSlot: (date: Date, slot: string) => void;
}

export default function ReservationCalendar({ onSelectSlot }: ReservationCalendarProps) {
  const [selectedDate, setSelectedDate] = useState(startOfToday());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  // Mock booked slots for demonstration
  const bookedSlots = ['19:00 - 20:00', '21:00 - 22:00', '22:00 - 23:00'];

  const days = Array.from({ length: 7 }, (_, i) => addDays(startOfToday(), i));

  const handleSlotClick = (slot: string) => {
    if (bookedSlots.includes(slot)) return;
    setSelectedSlot(slot);
    onSelectSlot(selectedDate, slot);
  };

  return (
    <section id="booking" className="py-32 bg-[#050505] relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-green/5 rounded-full blur-[150px] opacity-20" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <span className="text-neon-green text-[10px] font-bold tracking-[0.3em] uppercase mb-4 block">
            REZERVASYON
          </span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 text-white leading-none">
            SAHANI <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green via-emerald-400 to-neon-green bg-[length:200%_auto] animate-gradient">
              ŞİMDİ AYIRT.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Date Selection */}
          <div className="lg:col-span-4 space-y-8">
            <div className="flex items-center gap-3 mb-8">
              <CalendarIcon className="w-5 h-5 text-neon-green" />
              <h3 className="text-white font-black uppercase tracking-widest text-sm">Tarih Seçimi</h3>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {days.map((day) => {
                const isSelected = format(selectedDate, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd');
                return (
                  <button
                    key={day.toISOString()}
                    onClick={() => setSelectedDate(day)}
                    className={cn(
                      'flex items-center justify-between p-6 rounded-[2rem] border transition-all duration-500 text-left group relative overflow-hidden',
                      isSelected
                        ? 'bg-neon-green border-neon-green text-black shadow-[0_0_30px_rgba(57,255,20,0.3)] scale-[1.02]'
                        : 'bg-white/5 border-white/10 text-zinc-400 hover:border-white/20 hover:bg-white/10'
                    )}
                  >
                    <div className="relative z-10">
                      <div className={cn(
                        "text-[10px] uppercase tracking-widest mb-1 font-bold",
                        isSelected ? "text-black/60" : "text-zinc-500"
                      )}>
                        {format(day, 'EEEE', { locale: tr })}
                      </div>
                      <div className="text-2xl font-black tracking-tighter">
                        {format(day, 'd MMMM', { locale: tr })}
                      </div>
                    </div>
                    {isSelected && (
                      <CheckCircle2 className="w-8 h-8 text-black/20 absolute -right-2 -bottom-2" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Selection */}
          <div className="lg:col-span-8 space-y-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3 text-neon-green">
                <Clock className="w-5 h-5" />
                <h3 className="text-white font-black uppercase tracking-widest text-sm">Saat Seçimi</h3>
              </div>
              <div className="flex gap-6 text-[10px] font-bold uppercase tracking-[0.2em]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white/10 rounded-full" />
                  <span className="text-zinc-500">Boş</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500/50 rounded-full" />
                  <span className="text-zinc-500">Dolu</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-neon-green rounded-full" />
                  <span className="text-zinc-500">Seçili</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {TIME_SLOTS.map((slot) => {
                const isBooked = bookedSlots.includes(slot);
                const isSelected = selectedSlot === slot;

                return (
                  <button
                    key={slot}
                    disabled={isBooked}
                    onClick={() => handleSlotClick(slot)}
                    className={cn(
                      'p-6 rounded-2xl border transition-all duration-500 relative overflow-hidden font-black tracking-tight text-lg',
                      isBooked
                        ? 'bg-red-500/5 border-red-500/10 text-red-500/20 cursor-not-allowed'
                        : isSelected
                        ? 'bg-neon-green border-neon-green text-black shadow-[0_0_20px_rgba(57,255,20,0.2)]'
                        : 'bg-white/5 border-white/10 text-zinc-400 hover:border-white/20 hover:bg-white/10'
                    )}
                  >
                    {slot}
                    {isBooked && (
                      <div className="absolute top-0 right-0 p-1.5">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <AnimatePresence>
              {selectedSlot && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="mt-12 p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-neon-green/5 blur-3xl rounded-full -mr-32 -mt-32" />
                  <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div>
                      <span className="text-neon-green text-[10px] font-bold tracking-[0.3em] uppercase mb-4 block">
                        SEÇİLEN REZERVASYON
                      </span>
                      <h4 className="text-3xl font-black text-white mb-2 tracking-tighter">
                        {format(selectedDate, 'd MMMM yyyy', { locale: tr })}
                      </h4>
                      <p className="text-zinc-400 font-bold uppercase tracking-widest text-sm">
                        Saat: <span className="text-white">{selectedSlot}</span>
                      </p>
                    </div>
                    <button 
                      onClick={() => (window as any).openPaymentModal()}
                      className="w-full md:w-auto px-12 py-5 bg-neon-green text-black font-black rounded-2xl text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_0_30px_rgba(57,255,20,0.3)]"
                    >
                      KAPORA ÖDE VE AYIRT
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
