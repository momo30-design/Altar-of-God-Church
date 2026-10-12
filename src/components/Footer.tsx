import React from 'react';
import { CHURCH_CONFIG, AIRTEL_MONEY_CONFIG, OTHER_PAYMENT_CONFIG } from '../data/churchData';
import { Flame, Smartphone, Heart, MapPin, Phone, Mail, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenDonate: (category?: any) => void;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDonate, onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      {/* Pre-footer Callout Banner */}
      <div className="bg-gradient-to-r from-emerald-950/70 via-slate-900 to-amber-950/70 py-8 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white font-bold text-sm shadow">
              A
            </div>
            <div>
              <span className="font-bold text-white text-sm">Need help giving through Airtel Money?</span>
              <p className="text-slate-300 text-xs mt-0.5">
                Our church treasury support desk is available on <span className="font-mono text-amber-300 font-bold">{AIRTEL_MONEY_CONFIG.supportHotline}</span>.
              </p>
            </div>
          </div>

          <button
            onClick={() => onOpenDonate('tithe')}
            className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 via-emerald-600 to-amber-500 hover:from-emerald-500 hover:to-amber-400 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-emerald-950/40 transition shrink-0"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Give via Airtel Money Now</span>
          </button>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Col 1: Brand & Theme (2 cols on lg) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 font-bold shadow">
              <Flame className="w-5 h-5 fill-slate-950" />
            </div>
            <div>
              <span className="text-base font-bold text-white font-cinzel block">
                {CHURCH_CONFIG.name}
              </span>
              <span className="text-[10px] text-amber-400 uppercase tracking-widest font-semibold block">
                A Sanctuary of Fire & Transformation
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed pr-4">
            Founded under apostolic mandate in 2012, Altar of God Ministries is dedicated to preaching the unadulterated gospel of Jesus Christ, raising fervent intercessors, and demonstrating the power of the Holy Spirit.
          </p>

          <p className="text-[11px] text-amber-300/80 italic font-serif">
            {CHURCH_CONFIG.scriptureTheme}
          </p>
        </div>

        {/* Col 2: Navigation */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white font-cinzel">Quick Links</h4>
          <ul className="space-y-2">
            {['home', 'giving', 'airtel-guide', 'sermons', 'prayer', 'ministries', 'events', 'about'].map((id) => (
              <li key={id}>
                <button
                  onClick={() => onNavigate(id)}
                  className="hover:text-amber-400 transition capitalize"
                >
                  {id.replace('-', ' ')}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Giving Channels */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white font-cinzel">Giving Channels</h4>
          <div className="space-y-2 text-xs">
            <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 space-y-0.5">
              <span className="font-bold text-emerald-400 block">Airtel Money (Featured)</span>
              <span className="font-mono text-amber-300 font-bold block text-[11px]">No: {AIRTEL_MONEY_CONFIG.displayPhone}</span>
              <span className="text-[10px] text-slate-400 block font-mono">Till: {AIRTEL_MONEY_CONFIG.merchantCode}</span>
              <span className="text-[10px] text-slate-500 block">Dial {AIRTEL_MONEY_CONFIG.ussdDirectSend}</span>
            </div>

            <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 space-y-0.5">
              <span className="font-bold text-yellow-400 block">MTN MoMo</span>
              <span className="font-mono text-amber-300 font-bold block text-[11px]">No: +260964293130</span>
              <span className="text-[10px] text-slate-400 block font-mono">Code: {OTHER_PAYMENT_CONFIG.mtnMomo.merchantCode}</span>
            </div>

            <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
              <span className="font-bold text-blue-400 block">NATSAVE (National Savings Bank)</span>
              <span className="font-mono text-slate-300 text-[11px] block mt-0.5">A/C: 2070668192902 (ZMW)</span>
            </div>
          </div>
        </div>

        {/* Col 4: Service Times & Venue */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white font-cinzel">Service Hours</h4>
          <div className="space-y-2 text-[11px] leading-relaxed">
            <div>
              <strong className="text-white block">Sunday Celebration:</strong>
              <span>08:30 AM – 11:30 AM</span>
            </div>
            <div>
              <strong className="text-white block">Wednesday Healing School:</strong>
              <span>17:30 PM – 19:30 PM</span>
            </div>
            <div>
              <strong className="text-white block">Friday Night Fire Vigil:</strong>
              <span>21:00 PM – 04:30 AM</span>
            </div>
            <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-500">
              Plot 4821, Great East Road, Arcades, Lusaka, Zambia
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Back to Top */}
      <div className="border-t border-slate-900 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} {CHURCH_CONFIG.name}. All Rights Reserved. Registered Religious Charity Society.
          </div>

          <div className="flex items-center gap-4">
            <span>Powered for Kingdom Impact</span>
            <button
              onClick={scrollToTop}
              className="p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition flex items-center gap-1 text-[11px]"
              title="Back to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
