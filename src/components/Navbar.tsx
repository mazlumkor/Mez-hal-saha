import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Trophy, Calendar, Users, CreditCard, LogIn } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Ana Sayfa', href: '#home', icon: Trophy },
    { name: 'Hizmetler', href: '#services', icon: Users },
    { name: 'Rezervasyon', href: '#booking', icon: Calendar },
    { name: 'Abone Girişi', href: '#login', icon: LogIn },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
        scrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/10 shadow-lg' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-neon-green rounded-xl flex items-center justify-center shadow-lg shadow-neon-green/40">
            <Trophy className="text-black w-6 h-6" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">
            MEZ <span className="text-neon-green">HALISAHA</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[11px] font-bold text-zinc-400 hover:text-neon-green transition-colors uppercase tracking-[0.2em]"
            >
              {link.name}
            </a>
          ))}
          <div className="flex items-center gap-6 ml-4 border-l border-white/10 pl-8">
            <button 
              onClick={() => (window as any).openLoginModal()}
              className="text-[11px] font-bold text-zinc-400 hover:text-white transition-colors uppercase tracking-[0.2em]"
            >
              GİRİŞ YAP
            </button>
            <button 
              onClick={() => (window as any).openLoginModal()}
              className="bg-neon-green text-black px-8 py-3 rounded-full font-black text-[11px] uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_0_20px_rgba(57,255,20,0.3)]"
            >
              KAYIT OL
            </button>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10 p-6 md:hidden shadow-2xl"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 text-lg font-bold text-gray-300 hover:text-neon-green transition-colors"
                >
                  <link.icon className="w-5 h-5 text-neon-green" />
                  {link.name}
                </a>
              ))}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <button 
                  onClick={() => { setIsOpen(false); (window as any).openLoginModal(); }}
                  className="py-3 rounded-xl font-bold border border-white/10 text-gray-300 hover:bg-white/5 transition-colors"
                >
                  GİRİŞ
                </button>
                <button 
                  onClick={() => { setIsOpen(false); (window as any).openLoginModal(); }}
                  className="bg-neon-green text-black py-3 rounded-xl font-bold hover:scale-[1.02] transition-transform"
                >
                  KAYIT
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
