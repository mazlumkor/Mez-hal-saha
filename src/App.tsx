/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import ReservationCalendar from './components/ReservationCalendar';
import PaymentModal from './components/PaymentModal';
import LoginModal from './components/LoginModal';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';

export default function App() {
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<{ date: string; slot: string; rawDate: Date } | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check for stored user
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Expose payment modal trigger to window for the calendar component
    (window as any).openPaymentModal = () => setIsPaymentOpen(true);
    (window as any).openLoginModal = () => setIsLoginOpen(true);

    // Handle hash changes for the login modal
    const handleHashChange = () => {
      if (window.location.hash === '#login') {
        setIsLoginOpen(true);
      }
      if (window.location.hash === '#admin') {
        setIsAdminOpen(true);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initial check
    if (window.location.hash === '#login') {
      setIsLoginOpen(true);
    }
    if (window.location.hash === '#admin') {
      setIsAdminOpen(true);
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleLoginSuccess = (userData: any) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setIsAdminOpen(false);
  };

  const handleSelectSlot = (date: Date, slot: string) => {
    setSelectedReservation({
      date: format(date, 'd MMMM yyyy', { locale: tr }),
      slot,
      rawDate: date,
    });
  };

  const closeAdmin = () => {
    setIsAdminOpen(false);
    window.history.pushState("", document.title, window.location.pathname + window.location.search);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-neon-green selection:text-black">
      <Navbar onLoginClick={() => setIsLoginOpen(true)} user={user} onLogout={handleLogout} />
      
      <main>
        <Hero />
        <Services />
        <ReservationCalendar onSelectSlot={handleSelectSlot} />
      </main>

      <Footer />

      {/* Modals */}
      <PaymentModal 
        isOpen={isPaymentOpen} 
        onClose={() => setIsPaymentOpen(false)} 
        reservationDetails={selectedReservation}
        user={user}
      />
      
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => {
          setIsLoginOpen(false);
          // Clear hash without jump
          window.history.pushState("", document.title, window.location.pathname + window.location.search);
        }} 
        onLoginSuccess={handleLoginSuccess}
      />

      {isAdminOpen && user?.role === 'admin' && (
        <AdminPanel user={user} onClose={closeAdmin} />
      )}

      {/* PWA Install Prompt (Simplified) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button className="w-12 h-12 bg-white/5 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center hover:bg-neon-green hover:text-black transition-all group shadow-xl">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span className="absolute right-full mr-4 px-3 py-1 bg-black border border-white/10 rounded-lg text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Uygulamayı İndir
          </span>
        </button>
      </div>
    </div>
  );
}
