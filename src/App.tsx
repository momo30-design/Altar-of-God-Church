import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AirtelMoneyGuide } from './components/AirtelMoneyGuide';
import { GivingSection } from './components/GivingSection';
import { SermonsSection } from './components/SermonsSection';
import { DailyDevotional } from './components/DailyDevotional';
import { PrayerWallSection } from './components/PrayerWallSection';
import { MinistriesSection } from './components/MinistriesSection';
import { EventsSection } from './components/EventsSection';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { DonationModal } from './components/DonationModal';
import { ReceiptModal } from './components/ReceiptModal';
import { DonorLedgerModal } from './components/DonorLedgerModal';
import { GivingCategory, DonationRecord } from './types';
import { getStoredDonations } from './utils/formatters';
import { Smartphone, Heart, Receipt } from 'lucide-react';

export default function App() {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [donationCategory, setDonationCategory] = useState<GivingCategory>('tithe');
  const [isLedgerModalOpen, setIsLedgerModalOpen] = useState(false);
  const [activeReceipt, setActiveReceipt] = useState<DonationRecord | null>(null);
  const [donations, setDonations] = useState<DonationRecord[]>([]);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // Load existing donations from storage
    const loaded = getStoredDonations();
    setDonations(loaded);
  }, []);

  const handleOpenDonate = (category: GivingCategory = 'tithe') => {
    setDonationCategory(category);
    setIsDonationModalOpen(true);
  };

  const handleDonationSuccess = (record: DonationRecord) => {
    setDonations((prev) => [record, ...prev]);
    // Optionally open receipt automatically or keep open in modal
  };

  const handleViewReceipt = (record: DonationRecord) => {
    setIsLedgerModalOpen(false);
    setActiveReceipt(record);
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0c1017] text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Primary Navigation */}
      <Navbar
        onOpenDonate={handleOpenDonate}
        onOpenLedger={() => setIsLedgerModalOpen(true)}
        donationCount={donations.length}
        onNavigate={scrollToSection}
        activeSection={activeSection}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 1. Hero Banner with Living Fire theme & Airtel Quick Giving */}
        <Hero
          onOpenDonate={handleOpenDonate}
          onNavigate={scrollToSection}
        />

        {/* 2. Giving Hub: Tithes, Building Fund, Outreaches */}
        <GivingSection
          onOpenDonate={handleOpenDonate}
        />

        {/* 3. Dedicated Airtel Money Interactive Giving Center & USSD Dial Builder */}
        <AirtelMoneyGuide
          onOpenDonate={handleOpenDonate}
        />

        {/* 4. Sermons & Media Archive with Audio Player & Outline Notes */}
        <SermonsSection
          onOpenDonate={handleOpenDonate}
        />

        {/* 5. Daily Altar Scripture & Reflection with Audio Read-Aloud */}
        <DailyDevotional />

        {/* 6. Intercessory Prayer Wall with Community Prayer Count */}
        <PrayerWallSection />

        {/* 7. Ministry Wings (Men, Women, Youth, Children, Worship, Mercy) */}
        <MinistriesSection />

        {/* 8. Weekly Service Schedule & Major Events Calendar */}
        <EventsSection />

        {/* 9. Pastoral Welcome, Vision & Statement of Faith */}
        <AboutSection />
      </main>

      {/* Footer with schedules, bank accounts, and contact lines */}
      <Footer
        onOpenDonate={handleOpenDonate}
        onNavigate={scrollToSection}
      />

      {/* Persistent Floating Airtel Money Quick-Giving Pill */}
      <div className="fixed bottom-5 right-5 z-30 flex flex-col items-end gap-2">
        <button
          onClick={() => handleOpenDonate('tithe')}
          className="flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white rounded-2xl shadow-2xl shadow-emerald-950/70 font-bold text-xs border border-emerald-400/40 group transition hover:scale-105"
          aria-label="Give via Airtel Money"
        >
          <div className="w-6 h-6 rounded-full bg-white text-emerald-700 flex items-center justify-center font-black text-xs shadow">
            A
          </div>
          <span className="tracking-wide">Give via Airtel Money</span>
        </button>
      </div>

      {/* Interactive Giving / Donation Modal */}
      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
        initialCategory={donationCategory}
        onSuccessDonation={handleDonationSuccess}
      />

      {/* Official Printable Church Receipt Modal */}
      <ReceiptModal
        donation={activeReceipt}
        onClose={() => setActiveReceipt(null)}
      />

      {/* Donor Ledger / Giving Statements Modal */}
      {isLedgerModalOpen && (
        <DonorLedgerModal
          donations={donations}
          onClose={() => setIsLedgerModalOpen(false)}
          onViewReceipt={handleViewReceipt}
        />
      )}
    </div>
  );
}
