import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, FileText, Shield, Info, Eye, Handshake } from 'lucide-react';
import { LEGAL_CONTENT, LegalType } from '../constants/legalContent';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: LegalType | null;
}

export default function LegalModal({ isOpen, onClose, type }: LegalModalProps) {
  if (!type) return null;
  const data = LEGAL_CONTENT[type];

  const getIcon = () => {
    switch (type) {
      case 'about': return Info;
      case 'privacy': return Shield;
      case 'terms': return FileText;
      case 'clarification': return Eye;
      case 'distanceSelling': return Handshake;
      default: return FileText;
    }
  };

  const Icon = getIcon();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-gradient-to-b from-white/[0.02] to-transparent">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-neon-green/10 flex items-center justify-center border border-neon-green/20">
                  <Icon className="w-6 h-6 text-neon-green" />
                </div>
                <div>
                  <h2 className="text-2xl font-black tracking-tighter text-white">{data.title}</h2>
                  <p className="text-[10px] font-bold text-neon-green uppercase tracking-[0.3em] mt-1">MEZ HALISAHA KOMPLEKSİ</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
              <div className="prose prose-invert max-w-none">
                {data.content.split('\n').map((line, i) => (
                  <p key={i} className="text-zinc-400 text-sm leading-relaxed mb-4 font-medium whitespace-pre-line">
                    {line.trim()}
                  </p>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/5 bg-white/[0.01] flex justify-end">
              <button 
                onClick={onClose}
                className="px-8 py-3 bg-white text-black font-black text-[11px] uppercase tracking-widest rounded-xl hover:bg-neon-green transition-colors"
              >
                ANLADIM
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
