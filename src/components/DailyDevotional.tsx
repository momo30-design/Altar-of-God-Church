import React, { useState } from 'react';
import { TODAY_DEVOTIONAL } from '../data/churchData';
import { Sparkles, Volume2, VolumeX, Share2, Check, Flame } from 'lucide-react';

export const DailyDevotional: React.FC = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copied, setCopied] = useState(false);

  const toggleSpeak = () => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported in this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const textToRead = `${TODAY_DEVOTIONAL.title}. Scripture: ${TODAY_DEVOTIONAL.scriptureRef}. ${TODAY_DEVOTIONAL.verseText}. ${TODAY_DEVOTIONAL.message}. Prayer: ${TODAY_DEVOTIONAL.prayer}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 0.95;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const handleShare = () => {
    const shareText = `Altar of God Ministries Daily Devotional: "${TODAY_DEVOTIONAL.title}" (${TODAY_DEVOTIONAL.scriptureRef})\n\n${TODAY_DEVOTIONAL.verseText}\n\nRead more at our church portal.`;
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-16 bg-[#0c121e] text-white border-t border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-amber-500/30 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Background Flame Accent */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-5">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Flame className="w-4 h-4 fill-amber-400" />
              </span>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Daily Altar Devotional
                </span>
                <span className="text-[11px] text-slate-400 block">{TODAY_DEVOTIONAL.date}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleSpeak}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg flex items-center gap-1.5 border border-slate-700 transition"
              >
                {isSpeaking ? <VolumeX className="w-3.5 h-3.5 text-amber-400" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span>{isSpeaking ? 'Stop Audio' : 'Listen'}</span>
              </button>

              <button
                onClick={handleShare}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg flex items-center gap-1.5 border border-slate-700 transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Share'}</span>
              </button>
            </div>
          </div>

          {/* Title & Scripture Focus */}
          <div className="my-6">
            <h3 className="text-2xl sm:text-3xl font-bold font-cinzel text-white">
              {TODAY_DEVOTIONAL.title}
            </h3>
            <div className="inline-block mt-2 text-xs font-mono font-semibold text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
              {TODAY_DEVOTIONAL.scriptureRef}
            </div>

            <blockquote className="mt-4 p-4 rounded-xl bg-slate-950/70 border-l-4 border-amber-500 text-xs sm:text-sm italic font-serif text-slate-200 leading-relaxed">
              {TODAY_DEVOTIONAL.verseText}
            </blockquote>
          </div>

          {/* Devotional Body Text */}
          <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-3 font-sans whitespace-pre-line">
            {TODAY_DEVOTIONAL.message}
          </div>

          {/* Prayer of the Day Box */}
          <div className="mt-6 p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-1.5">
            <span className="text-[11px] uppercase tracking-wider font-bold text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Prayer for Today:
            </span>
            <p className="text-xs sm:text-sm italic text-amber-100 font-serif leading-relaxed">
              "{TODAY_DEVOTIONAL.prayer}"
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
            <span className="text-[11px] text-slate-500 italic">Daily Manna for the Spirit</span>
            <div className="flex items-center gap-2">
              {TODAY_DEVOTIONAL.authorImage && (
                <img
                  src={TODAY_DEVOTIONAL.authorImage}
                  alt={TODAY_DEVOTIONAL.author}
                  className="w-7 h-7 rounded-full object-cover border border-amber-500/40 ring-1 ring-amber-500/20"
                />
              )}
              <span>
                Authored by <strong className="text-slate-200 font-medium">{TODAY_DEVOTIONAL.author}</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
