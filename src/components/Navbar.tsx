import React, { useState } from 'react';
import { Heart, Menu, X, Receipt, Smartphone, Flame, Radio, Clock } from 'lucide-react';
import { AIRTEL_MONEY_CONFIG, CHURCH_CONFIG } from '../data/churchData';

interface NavbarProps {
  onOpenDonate: (category?: any) => void;
  onOpenLedger: () => void;
  donationCount: number;
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenDonate,
  onOpenLedger,
  donationCount,
  onNavigate,
  activeSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'giving', label: 'Giving Platform' },
    { id: 'airtel-guide', label: 'Airtel Money' },
    { id: 'sermons', label: 'Sermons' },
    { id: 'prayer', label: 'Prayer Wall' },
    { id: 'ministries', label: 'Ministries' },
    { id: 'events', label: 'Events' },
    { id: 'about', label: 'Founder & About' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80">
      {/* Top Banner: Service Announcement & Airtel Notice */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-amber-950 text-slate-200 text-[11px] py-1.5 px-4 border-b border-emerald-900/40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1 text-emerald-400 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              Giving Lines:
            </span>
            <span className="font-mono font-extrabold text-amber-300">
              Airtel: {AIRTEL_MONEY_CONFIG.displayPhone}
            </span>
            <span className="text-yellow-400 font-mono font-bold">
              · MTN: +260964293130
            </span>
            <span className="text-slate-400 hidden lg:inline">({AIRTEL_MONEY_CONFIG.accountName})</span>
          </div>

          <div className="flex items-center gap-3 text-slate-300">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-amber-400" />
              <span>Next Service: Sunday 08:30 AM (Hall of Glory)</span>
            </div>
            <div className="hidden lg:flex items-center gap-1 text-emerald-400 font-medium">
              <Radio className="w-3 h-3 animate-pulse" />
              <span>Streaming Worldwide</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left group focus:outline-none"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition">
            <Flame className="w-6 h-6 fill-slate-950" />
          </div>
          <div>
            <span className="text-base sm:text-lg font-extrabold tracking-tight text-white font-cinzel block leading-tight">
              Altar of God
            </span>
            <span className="text-[10px] uppercase tracking-widest text-amber-400 font-semibold block">
              Ministries International
            </span>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition ${
                activeSection === item.id
                  ? 'text-amber-400 bg-amber-500/10'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Ledger / Receipts button */}
          <button
            onClick={onOpenLedger}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-800/80 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold border border-slate-700 transition"
            title="My Giving History & Receipts"
          >
            <Receipt className="w-3.5 h-3.5 text-amber-400" />
            <span>My Receipts</span>
            {donationCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 text-[10px] font-bold flex items-center justify-center">
                {donationCount}
              </span>
            )}
          </button>

          {/* Primary Giving Button with Airtel Highlight */}
          <button
            onClick={() => onOpenDonate('tithe')}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-600 via-emerald-600 to-amber-500 hover:from-emerald-500 hover:to-amber-400 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-emerald-950/40 group"
          >
            <Smartphone className="w-4 h-4 text-emerald-100 group-hover:scale-110 transition" />
            <span>Give via Airtel Money</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => onOpenDonate('tithe')}
            className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold rounded-lg flex items-center gap-1 shadow"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Give</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-400 hover:text-white rounded-lg focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-slate-950 border-b border-slate-800 px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold ${
                activeSection === item.id
                  ? 'bg-amber-500/20 text-amber-400'
                  : 'text-slate-300 hover:bg-slate-900'
              }`}
            >
              {item.label}
            </button>
          ))}

          <div className="pt-3 border-t border-slate-800 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLedger();
              }}
              className="w-full flex items-center justify-between px-3 py-2 bg-slate-900 rounded-lg text-xs text-slate-300"
            >
              <div className="flex items-center gap-2">
                <Receipt className="w-4 h-4 text-amber-400" />
                <span>My Giving Receipts</span>
              </div>
              <span className="font-mono text-amber-400 font-bold">{donationCount}</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDonate('tithe');
              }}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-2 shadow"
            >
              <Smartphone className="w-4 h-4" />
              <span>Give Online (Airtel Money)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
