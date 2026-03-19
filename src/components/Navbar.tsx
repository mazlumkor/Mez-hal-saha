import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Trophy, Calendar, Users, LogIn, LogOut, ShieldCheck, User, MapPin } from 'lucide-react';
import { cn } from '../lib/utils';

interface NavbarProps {
  onLoginClick: () => void;
  onProfileClick: () => void;
  user: any;
  onLogout: () => void;
}

export default function Navbar({ onLoginClick, onProfileClick, user, onLogout }: NavbarProps) {
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
    { name: 'Konum', href: '#location', icon: MapPin },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
        scrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/10 shadow-lg' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-neon-green to-emerald-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative w-12 h-12 bg-black rounded-xl flex items-center justify-center border border-white/10 shadow-2xl">
              <svg viewBox="0 0 100 100" className="w-8 h-8">
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
            <span className="text-2xl font-black tracking-tighter text-white leading-none">
              MEZ<span className="text-neon-green">.</span>
            </span>
            <span className="text-[8px] font-black tracking-[0.4em] text-zinc-500 uppercase leading-none mt-1">
              HALISAHA KOMPLEKSİ
            </span>
          </div>
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
            {user ? (
              <div className="flex items-center gap-6">
                <div className="flex flex-col items-end">
                  <button 
                    onClick={onProfileClick}
                    className="text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2 hover:text-neon-green transition-colors"
                  >
                    {user.role === 'admin' && <ShieldCheck className="w-3 h-3 text-neon-green" />}
                    {user.name}
                  </button>
                  <span className="text-[8px] font-bold text-neon-green uppercase tracking-widest">
                    {user.role === 'admin' ? 'YÖNETİCİ' : (user.teamName || 'BİREYSEL')}
                  </span>
                </div>
                {user.role === 'admin' && (
                  <a 
                    href="#admin" 
                    className="text-[10px] font-black text-neon-green hover:text-white transition-colors uppercase tracking-widest border border-neon-green/20 px-4 py-2 rounded-lg bg-neon-green/5"
                  >
                    PANEL
                  </a>
                )}
                <button 
                  onClick={onLogout}
                  className="p-2 hover:bg-white/5 rounded-full transition-colors group"
                  title="Çıkış Yap"
                >
                  <LogOut className="w-5 h-5 text-zinc-500 group-hover:text-red-500 transition-colors" />
                </button>
              </div>
            ) : (
              <>
                <button 
                  onClick={onLoginClick}
                  className="text-[11px] font-bold text-zinc-400 hover:text-white transition-colors uppercase tracking-[0.2em]"
                >
                  GİRİŞ YAP
                </button>
                <button 
                  onClick={onLoginClick}
                  className="bg-neon-green text-black px-8 py-3 rounded-full font-black text-[11px] uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_0_20px_rgba(57,255,20,0.3)]"
                >
                  KAYIT OL
                </button>
              </>
            )}
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
              
              <div className="mt-4 pt-4 border-t border-white/5">
                {user ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => { onProfileClick(); setIsOpen(false); }}
                          className="w-10 h-10 bg-neon-green/10 rounded-xl flex items-center justify-center border border-neon-green/20 hover:bg-neon-green/20 transition-colors"
                        >
                          <User className="w-5 h-5 text-neon-green" />
                        </button>
                        <div>
                          <button 
                            onClick={() => { onProfileClick(); setIsOpen(false); }}
                            className="text-sm font-black text-white uppercase tracking-widest hover:text-neon-green transition-colors"
                          >
                            {user.name}
                          </button>
                          <div className="text-[10px] font-bold text-neon-green uppercase tracking-widest">
                            {user.role === 'admin' ? 'YÖNETİCİ' : (user.teamName || 'BİREYSEL')}
                          </div>
                        </div>
                      </div>
                      <button 
                        onClick={() => { onLogout(); setIsOpen(false); }}
                        className="p-3 bg-red-500/10 text-red-500 rounded-xl border border-red-500/20"
                      >
                        <LogOut className="w-5 h-5" />
                      </button>
                    </div>
                    {user.role === 'admin' && (
                      <a 
                        href="#admin"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-center gap-2 w-full py-4 bg-neon-green/10 text-neon-green font-black rounded-xl border border-neon-green/20"
                      >
                        <ShieldCheck className="w-5 h-5" />
                        YÖNETİM PANELİ
                      </a>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => { setIsOpen(false); onLoginClick(); }}
                      className="py-3 rounded-xl font-bold border border-white/10 text-gray-300 hover:bg-white/5 transition-colors"
                    >
                      GİRİŞ
                    </button>
                    <button 
                      onClick={() => { setIsOpen(false); onLoginClick(); }}
                      className="bg-neon-green text-black py-3 rounded-xl font-bold hover:scale-[1.02] transition-transform"
                    >
                      KAYIT
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
