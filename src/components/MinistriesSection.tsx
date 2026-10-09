import React, { useState } from 'react';
import { MINISTRIES_DATA } from '../data/churchData';
import { Ministry } from '../types';
import { Shield, Heart, Flame, Smile, Music, HandHeart, Users, Calendar, ArrowRight } from 'lucide-react';

export const MinistriesSection: React.FC = () => {
  const [selectedMinistry, setSelectedMinistry] = useState<Ministry | null>(null);
  const [contactInfo, setContactInfo] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const getIcon = (name: string) => {
    switch (name) {
      case 'shield':
        return <Shield className="w-5 h-5 text-amber-400" />;
      case 'heart':
        return <Heart className="w-5 h-5 text-rose-400" />;
      case 'flame':
        return <Flame className="w-5 h-5 text-orange-400" />;
      case 'smile':
        return <Smile className="w-5 h-5 text-emerald-400" />;
      case 'music':
        return <Music className="w-5 h-5 text-purple-400" />;
      default:
        return <HandHeart className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="ministries" className="py-20 bg-slate-900/60 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>Kingdom Wings & Fellowships</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-cinzel text-white">
            Find Your Place at the Altar
          </h2>
          <p className="text-sm text-slate-300 mt-2">
            No one walks alone. Join a vibrant ministry wing designed to build your spiritual depth, sharpen your gifts, and cultivate genuine godly community.
          </p>
        </div>

        {/* Ministries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MINISTRIES_DATA.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-500/40 transition flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-video rounded-xl overflow-hidden mb-4 bg-slate-900">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-500 opacity-90"
                  />
                  <div className="absolute top-2.5 left-2.5 p-2 bg-slate-950/80 backdrop-blur rounded-lg border border-slate-700">
                    {getIcon(item.iconName)}
                  </div>
                  {item.leadImage && (
                    <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 bg-slate-950/90 backdrop-blur rounded-full border border-amber-400/50 flex items-center gap-1.5 shadow-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                      <span className="text-[10px] font-semibold text-amber-200">Pastor in Charge</span>
                    </div>
                  )}
                </div>

                <h3 className="text-base font-bold font-cinzel text-white group-hover:text-amber-300 transition">
                  {item.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  {item.leadImage && (
                    <img
                      src={item.leadImage}
                      alt={item.lead}
                      referrerPolicy="no-referrer"
                      className="w-6 h-6 rounded-full object-cover object-top border border-amber-400/60 shadow-sm shrink-0"
                    />
                  )}
                  <div className="text-xs text-amber-400 font-medium">
                    Led by {item.lead}
                  </div>
                </div>

                <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
                  {item.description}
                </p>

                {/* Activities tag list */}
                <div className="mt-4 space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                    Core Focus:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.activities.map((act, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 text-[10px] border border-slate-800"
                      >
                        {act}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1 text-[11px]">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  {item.meetingTime}
                </span>
                <button
                  onClick={() => setSelectedMinistry(item)}
                  className="text-amber-400 hover:text-amber-300 font-semibold text-xs flex items-center gap-1"
                >
                  Join Wing &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ministry Join Info Modal */}
      {selectedMinistry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white space-y-4">
            <div className="flex justify-between items-start border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                {selectedMinistry.leadImage && (
                  <img
                    src={selectedMinistry.leadImage}
                    alt={selectedMinistry.lead}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-full object-cover object-top border-2 border-amber-400 shadow-md shrink-0"
                  />
                )}
                <div>
                  <h3 className="text-base font-bold font-cinzel text-amber-400">{selectedMinistry.name}</h3>
                  <span className="text-xs text-slate-300">Led by {selectedMinistry.lead}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedMinistry(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedMinistry.description}
            </p>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
              <span className="text-slate-400">Regular Gathering:</span>
              <div className="font-semibold text-white">{selectedMinistry.meetingTime}</div>
              <div className="text-[11px] text-slate-400">Venue: Altar of God Ministries Main Campus</div>
            </div>

            {isSubmitted ? (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl space-y-2 text-center">
                <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center font-bold">
                  ✓
                </div>
                <h4 className="text-sm font-bold text-emerald-300">Request Received!</h4>
                <p className="text-xs text-slate-300">
                  Thank you for your heart to serve! <strong>{selectedMinistry.lead}</strong> and the leadership of <strong>{selectedMinistry.name}</strong> will reach out to you via SMS/call before the next gathering.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setContactInfo('');
                    setSelectedMinistry(null);
                  }}
                  className="mt-2 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <label className="block text-xs text-slate-300">Your Full Name & Phone Number:</label>
                  <input
                    type="text"
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    placeholder="e.g. Brother Isaac Tembo - 097xxxxxxx"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setSelectedMinistry(null)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (!contactInfo.trim()) return;
                      setIsSubmitted(true);
                    }}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition"
                  >
                    Confirm & Connect with {selectedMinistry.lead}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
