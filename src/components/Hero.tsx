import React from 'react';
import { Smartphone, Play, Heart, Flame, Shield, ArrowRight, MapPin, Sparkles } from 'lucide-react';
import { AIRTEL_MONEY_CONFIG, OTHER_PAYMENT_CONFIG, CHURCH_CONFIG } from '../data/churchData';

interface HeroProps {
  onOpenDonate: (category?: any) => void;
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenDonate, onNavigate }) => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950 via-[#0a0f1d] to-[#0d1424] text-white py-16 px-4 sm:px-6 lg:px-8">
      {/* Background Ambience & Sacred Lighting Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-amber-600/20 via-emerald-600/15 to-transparent rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#0c1017] to-transparent"></div>
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px]"></div>
      </div>

      <div className="relative max-w-5xl mx-auto text-center space-y-8 z-10">
        {/* Sacred Motto & Scripture Tag */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium tracking-wide shadow-sm">
            <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>Exodus 20:24 · Sanctuary of Living Fire & Grace</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Founder: <strong>Pastor Moses Mwale</strong></span>
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-cinzel leading-tight max-w-4xl mx-auto">
          Welcome to the Altar of God Ministries
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-sans leading-relaxed">
          Founded by <strong>Pastor Moses Mwale</strong>. Where broken lives encounter restoring fire, prayers produce tangible breakthroughs, and believers walk in covenant victory.
        </p>

        {/* Dedicated Giving Channels Quick Feature Banner */}
        <div className="max-w-2xl mx-auto p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-950/70 via-slate-900/90 to-amber-950/60 border border-emerald-700/50 shadow-xl backdrop-blur-sm text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-amber-600 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-md">
                <Smartphone className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Official Giving Channels
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-500/30 font-semibold">
                    Instant & Direct
                  </span>
                </div>
                <div className="text-sm font-semibold text-white mt-1 flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span>Airtel: <strong className="font-mono text-amber-300 text-sm">{AIRTEL_MONEY_CONFIG.displayPhone}</strong></span>
                  <span>MTN: <strong className="font-mono text-yellow-300 text-sm">+260964293130</strong></span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Airtel Till: <strong className="text-white font-mono">{AIRTEL_MONEY_CONFIG.merchantCode}</strong> · MTN Code: <strong className="text-yellow-300 font-mono">{OTHER_PAYMENT_CONFIG.mtnMomo.merchantCode}</strong>
                </p>
              </div>
            </div>

            <button
              onClick={() => onOpenDonate('tithe')}
              className="sm:self-center px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-amber-500 hover:from-emerald-500 hover:to-amber-400 text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-950/40 shrink-0"
            >
              <Smartphone className="w-4 h-4 text-emerald-100" />
              <span>Give Online</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => onOpenDonate('tithe')}
            className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-sm transition flex items-center gap-2 shadow-lg shadow-amber-500/20"
          >
            <Heart className="w-4 h-4 fill-slate-950" />
            <span>Give Tithes & Offerings</span>
          </button>

          <button
            onClick={() => onNavigate('sermons')}
            className="px-6 py-3.5 bg-slate-800/90 hover:bg-slate-700 text-slate-100 font-semibold rounded-xl text-sm transition flex items-center gap-2 border border-slate-700"
          >
            <Play className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>Watch Latest Sermons</span>
          </button>

          <button
            onClick={() => onNavigate('prayer')}
            className="px-5 py-3.5 bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-semibold rounded-xl text-sm transition border border-slate-800"
          >
            <span>Request Prayer</span>
          </button>
        </div>

        {/* Proof / Pillars Bar */}
        <div className="pt-8 border-t border-slate-800/80 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-3">
            <div className="text-xl sm:text-2xl font-bold font-cinzel text-amber-400">Exodus 20:24</div>
            <div className="text-xs text-slate-400 mt-1">Foundation of Living Fire</div>
          </div>
          <div className="p-3">
            <div className="text-xl sm:text-2xl font-bold font-mono text-white">4 Services</div>
            <div className="text-xs text-slate-400 mt-1">Weekly Worship & Deliverance</div>
          </div>
          <div className="p-3">
            <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">100% Verified</div>
            <div className="text-xs text-slate-400 mt-1">Airtel Money & Banking</div>
          </div>
          <div className="p-3">
            <div className="text-xl sm:text-2xl font-bold font-mono text-amber-400">K498K+</div>
            <div className="text-xs text-slate-400 mt-1">Nehemiah Cathedral Fund</div>
          </div>
        </div>
      </div>
    </section>
  );
};
