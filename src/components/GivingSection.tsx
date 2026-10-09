import React from 'react';
import { GIVING_CAUSES, AIRTEL_MONEY_CONFIG, OTHER_PAYMENT_CONFIG } from '../data/churchData';
import { GivingCategory } from '../types';
import { formatCurrency } from '../utils/formatters';
import { Coins, HeartHandshake, Landmark, Globe, Users, Sparkles, Smartphone, ArrowRight, ShieldCheck } from 'lucide-react';

interface GivingSectionProps {
  onOpenDonate: (category: GivingCategory) => void;
}

export const GivingSection: React.FC<GivingSectionProps> = ({ onOpenDonate }) => {
  const getCauseIcon = (id: string) => {
    switch (id) {
      case 'tithe':
        return <Coins className="w-5 h-5 text-amber-400" />;
      case 'offering':
        return <HeartHandshake className="w-5 h-5 text-emerald-400" />;
      case 'building':
        return <Landmark className="w-5 h-5 text-blue-400" />;
      case 'missions':
        return <Globe className="w-5 h-5 text-cyan-400" />;
      case 'welfare':
        return <Users className="w-5 h-5 text-rose-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <section id="giving" className="py-20 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Coins className="w-3.5 h-3.5" />
            <span>Kingdom Stewardship & Covenant Partnership</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-cinzel text-white">
            Honoring the Lord with Your Substance
          </h2>
          <p className="text-sm text-slate-300 mt-3 leading-relaxed">
            Every seed you sow at the Altar of God Ministries directly fuels the preaching of the gospel, sustains vulnerable families, and builds a sanctuary for generations to encounter Jesus.
          </p>
        </div>

        {/* Causes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GIVING_CAUSES.map((cause) => {
            const hasProgress = cause.target && cause.raised;
            const progressPercent = hasProgress
              ? Math.min(100, Math.round((cause.raised! / cause.target!) * 100))
              : null;

            return (
              <div
                key={cause.id}
                className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                  cause.highlight
                    ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-amber-950/30 border-amber-500/40 shadow-xl'
                    : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  {/* Top Bar with Icon & Scripture Tag */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center">
                      {getCauseIcon(cause.id)}
                    </div>
                    <span className="text-[11px] font-mono font-semibold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                      {cause.scripture}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white font-cinzel leading-snug">
                    {cause.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    {cause.subtitle}
                  </p>

                  {/* Scripture Verse Quote */}
                  <blockquote className="mt-4 p-3 bg-slate-950/70 rounded-xl border border-slate-800 text-[11px] italic text-slate-300 leading-relaxed font-serif">
                    {cause.scriptureText}
                  </blockquote>

                  {/* Progress bar if campaign with target */}
                  {hasProgress && (
                    <div className="mt-4 space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Raised:</span>
                        <span className="font-mono font-bold text-amber-300">
                          {formatCurrency(cause.raised!, 'ZMW')}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full"
                          style={{ width: `${progressPercent}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                        <span>Target: {formatCurrency(cause.target!, 'ZMW')}</span>
                        <span>{progressPercent}% Complete</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Action Area */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-slate-400 gap-1.5 font-mono">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50"></span>
                      Airtel: <strong className="text-white">{AIRTEL_MONEY_CONFIG.displayPhone}</strong>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-yellow-400 shadow-sm shadow-yellow-400/50"></span>
                      MTN: <strong className="text-yellow-300">+260964293130</strong>
                    </span>
                  </div>

                  <button
                    onClick={() => onOpenDonate(cause.id as GivingCategory)}
                    className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition shadow"
                  >
                    <span>Give to this Cause</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust & Transparency Footer Callout */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Financial Integrity & Covenant Accountability</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                All donations via Airtel Money ({AIRTEL_MONEY_CONFIG.displayPhone}), MTN MoMo (+260964293130), and bank channels are overseen by the Board of Trustees and independently audited annually under Zambian religious charity regulations.
              </p>
            </div>
          </div>

          <button
            onClick={() => onOpenDonate('tithe')}
            className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 via-emerald-600 to-amber-500 hover:from-emerald-500 hover:to-amber-400 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 shadow-lg shadow-emerald-950/40"
          >
            <Smartphone className="w-3.5 h-3.5" />
            Give via Airtel Money
          </button>
        </div>
      </div>
    </section>
  );
};
