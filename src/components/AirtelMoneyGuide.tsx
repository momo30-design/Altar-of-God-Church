import React, { useState } from 'react';
import { Smartphone, Copy, Check, PhoneCall, HelpCircle, ShieldCheck, ArrowRight } from 'lucide-react';
import { AIRTEL_MONEY_CONFIG, CHURCH_CONFIG } from '../data/churchData';

interface AirtelMoneyGuideProps {
  onOpenDonate: (category?: any) => void;
}

export const AirtelMoneyGuide: React.FC<AirtelMoneyGuideProps> = ({ onOpenDonate }) => {
  const [calculatorAmount, setCalculatorAmount] = useState<number>(200);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [ussdType, setUssdType] = useState<'direct' | 'merchant'>('direct');

  const directUssdCode = `*115*1*1*${AIRTEL_MONEY_CONFIG.directPhone}*${calculatorAmount}#`;
  const merchantUssdCode = `*115*4*1*${AIRTEL_MONEY_CONFIG.merchantCode}*${calculatorAmount}#`;
  const activeCode = ussdType === 'direct' ? directUssdCode : merchantUssdCode;

  const handleCopyCode = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <section id="airtel-guide" className="py-20 bg-slate-900/90 text-white border-y border-slate-800 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-600/15 border border-emerald-500/40 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Smartphone className="w-3.5 h-3.5" />
            <span>Airtel Money Giving Center</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-cinzel text-white">
            Give Instantly Through Airtel Money
          </h2>
          <p className="text-sm text-slate-300 mt-3 leading-relaxed">
            Giving your tithes, Sunday offerings, and building pledges has never been easier. Send directly to our official church Airtel number <strong className="text-amber-300 font-mono">{AIRTEL_MONEY_CONFIG.displayPhone}</strong> or pay via Merchant code with instant verification.
          </p>
        </div>

        {/* Dedicated Phone Number Banner */}
        <div className="max-w-4xl mx-auto mb-10 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-950 to-emerald-950 border-2 border-emerald-600/60 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white flex items-center justify-center font-black text-xl shadow-lg shadow-emerald-950/50 shrink-0">
              A
            </div>
            <div>
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest block">
                Official Giving Mobile Number
              </span>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mt-1">
                <span className="font-mono text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {AIRTEL_MONEY_CONFIG.displayPhone}
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-600/30 text-emerald-300 border border-emerald-500/40">
                  {AIRTEL_MONEY_CONFIG.accountName}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Local: <span className="font-mono text-amber-300">{AIRTEL_MONEY_CONFIG.formattedPhone}</span> · International: <span className="font-mono text-amber-300">{AIRTEL_MONEY_CONFIG.internationalPhone}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => handleCopyCode(AIRTEL_MONEY_CONFIG.internationalPhone, 'banner-phone')}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-lg shadow-emerald-950/40"
            >
              {copiedCode === 'banner-phone' ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copiedCode === 'banner-phone' ? 'Copied Number' : 'Copy Number'}</span>
            </button>
            <a
              href={`tel:${AIRTEL_MONEY_CONFIG.internationalPhone}`}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition border border-slate-700"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>Dial Directly</span>
            </a>
          </div>
        </div>

        {/* Main Grid: USSD Interactive Generator + Step by Step Guide */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive USSD Code Generator (5 cols) */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-gradient-to-b from-emerald-950/40 to-slate-950 border border-emerald-800/50 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-emerald-900/40 pb-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-emerald-400 font-bold block">
                  Interactive USSD Generator
                </span>
                <span className="text-sm font-semibold text-white">Generate Your Direct Dial Code</span>
              </div>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center font-bold text-white text-xs shadow">
                A
              </div>
            </div>

            {/* USSD Type Toggle */}
            <div className="grid grid-cols-2 gap-1 p-1 bg-slate-900 rounded-xl border border-slate-800 text-xs">
              <button
                type="button"
                onClick={() => setUssdType('direct')}
                className={`py-2 px-2 rounded-lg font-semibold transition text-center ${
                  ussdType === 'direct'
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Direct to 0972159373
              </button>
              <button
                type="button"
                onClick={() => setUssdType('merchant')}
                className={`py-2 px-2 rounded-lg font-semibold transition text-center ${
                  ussdType === 'merchant'
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Merchant Till (772410)
              </button>
            </div>

            {/* Quick Amount Selector */}
            <div>
              <label className="block text-xs text-slate-300 font-medium mb-2">
                Select Amount to Give (ZMW Kwacha):
              </label>
              <div className="grid grid-cols-4 gap-2 mb-3">
                {[50, 100, 200, 500, 1000, 2500, 5000, 10000].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setCalculatorAmount(val)}
                    className={`py-1.5 px-1 rounded-lg text-xs font-mono font-bold transition ${
                      calculatorAmount === val
                        ? 'bg-emerald-600 text-white shadow'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    K{val}
                  </button>
                ))}
              </div>

              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs font-mono text-slate-400">K</span>
                <input
                  type="number"
                  min="5"
                  value={calculatorAmount}
                  onChange={(e) => setCalculatorAmount(Math.max(1, parseInt(e.target.value) || 0))}
                  placeholder="Or enter custom amount..."
                  className="w-full pl-8 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Generated USSD Code Box */}
            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-900/60 space-y-2">
              <span className="text-[11px] text-slate-400 block font-medium">
                {ussdType === 'direct'
                  ? `Direct Send to ${AIRTEL_MONEY_CONFIG.displayPhone} for K${calculatorAmount}:`
                  : `Merchant Payment (772410) for K${calculatorAmount}:`}
              </span>
              <div className="flex items-center justify-between gap-2 p-2.5 bg-slate-900 rounded-lg border border-slate-800 font-mono text-sm sm:text-base font-bold text-amber-300">
                <span className="truncate">{activeCode}</span>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleCopyCode(activeCode, 'calc-code')}
                    className="p-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition shadow"
                    title="Copy Code"
                  >
                    {copiedCode === 'calc-code' ? <Check className="w-3.5 h-3.5 text-emerald-200" /> : <Copy className="w-3.5 h-3.5" />}
                    <span className="text-[11px]">{copiedCode === 'calc-code' ? 'Copied' : 'Copy'}</span>
                  </button>
                  <a
                    href={`tel:${encodeURIComponent(activeCode)}`}
                    className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1 transition"
                    title="Open Phone Dialer"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-[11px]">Dial</span>
                  </a>
                </div>
              </div>
              <p className="text-[10px] text-slate-400">
                Dialing this code on your Airtel SIM opens the payment prompt on your handset directly.
              </p>
            </div>

            {/* Direct Giving Details Box */}
            <div className="space-y-2 text-xs p-3.5 bg-slate-950/80 rounded-xl border border-slate-800">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Church Airtel Number:</span>
                <span className="font-mono font-bold text-amber-300">{AIRTEL_MONEY_CONFIG.displayPhone}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Merchant Till Code:</span>
                <span className="font-mono font-bold text-white">{AIRTEL_MONEY_CONFIG.merchantCode}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Recipient Name:</span>
                <span className="font-semibold text-white">{AIRTEL_MONEY_CONFIG.merchantName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Helpline / WhatsApp:</span>
                <span className="font-mono text-slate-300">{AIRTEL_MONEY_CONFIG.supportHotline}</span>
              </div>
            </div>

            <button
              onClick={() => onOpenDonate('tithe')}
              className="w-full py-3 bg-gradient-to-r from-emerald-600 via-emerald-600 to-amber-500 hover:from-emerald-500 hover:to-amber-400 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-emerald-950/40"
            >
              <Smartphone className="w-4 h-4" />
              <span>Launch Web Donation Terminal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Right Column: Step-by-Step Instructions & Safeguards (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 space-y-5">
              <h3 className="text-lg font-bold text-white font-cinzel">
                How to Send to {AIRTEL_MONEY_CONFIG.displayPhone} in 5 Steps
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-full bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wide">
                      Dial *115# on your Airtel handset
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Works on all phones (smartphones and button phones) without mobile data or internet.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-full bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wide">
                      Select Option 1 (Send Money) or Option 4 (Make Payment)
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Enter Church Airtel Number: <strong className="font-mono text-amber-300">{AIRTEL_MONEY_CONFIG.directPhone}</strong> or Merchant Code <strong className="font-mono text-amber-300">{AIRTEL_MONEY_CONFIG.merchantCode}</strong>.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-full bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wide">
                      Enter Your Amount & Purpose Reference
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Specify the amount you wish to give. In the reference field, write <span className="text-amber-300 font-mono">TITHE</span>, <span className="text-amber-300 font-mono">OFFERING</span>, <span className="text-amber-300 font-mono">BUILDING</span>, or your full name.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-full bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    4
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wide">
                      Confirm Name: ALTAR OF GOD MINISTRIES & Enter PIN
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Verify that the recipient is displayed as <strong>ALTAR OF GOD MINISTRIES</strong> and enter your private 4-digit PIN.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-full bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    5
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wide">
                      Receive Confirmation SMS & Retrieve Official Church Receipt
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Airtel Money will send you an instant SMS with your Transaction ID. You can enter that ID on this platform to generate and print your formal church receipt.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Airtel Money Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
                <ShieldCheck className="w-5 h-5 text-emerald-400 mb-1.5" />
                <h5 className="text-xs font-bold text-white">Direct Reconciliation</h5>
                <p className="text-[11px] text-slate-400 mt-0.5">Credited directly to church accounts with immediate SMS acknowledgment.</p>
              </div>

              <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
                <Smartphone className="w-5 h-5 text-emerald-400 mb-1.5" />
                <h5 className="text-xs font-bold text-white">Available 24/7</h5>
                <p className="text-[11px] text-slate-400 mt-0.5">Give during services or from anywhere across Zambia and diaspora.</p>
              </div>

              <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
                <HelpCircle className="w-5 h-5 text-amber-400 mb-1.5" />
                <h5 className="text-xs font-bold text-white">Giving Desk Lines</h5>
                <p className="text-[10px] text-slate-400 mt-0.5 font-mono">
                  <span className="text-emerald-400 block">Airtel: {AIRTEL_MONEY_CONFIG.displayPhone}</span>
                  <span className="text-yellow-400 block">MTN: +260964293130</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
