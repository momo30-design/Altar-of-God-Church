import React, { useState } from 'react';
import { SERMONS_DATA } from '../data/churchData';
import { Sermon } from '../types';
import { Play, Pause, BookOpen, Volume2, Share2, Heart, Clock, Calendar, Check, ExternalLink } from 'lucide-react';

interface SermonsSectionProps {
  onOpenDonate: (category?: any) => void;
}

export const SermonsSection: React.FC<SermonsSectionProps> = ({ onOpenDonate }) => {
  const [activeSermon, setActiveSermon] = useState<Sermon>(SERMONS_DATA[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <section id="sermons" className="py-20 bg-[#0a0f1d] text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Word of Truth & Revelation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-cinzel text-white">
            Transformational Sermons & Media
          </h2>
          <p className="text-sm text-slate-300 mt-2">
            Feast on prophetic teachings and life-altering messages from Pastor Moses Mwale (Founder), Pastor Rachel Nanyangwe, and the ministerial team.
          </p>
        </div>

        {/* Featured Sermon Active Player */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl">
          {/* Thumbnail / Video Simulation (7 cols) */}
          <div className="lg:col-span-7 relative rounded-2xl overflow-hidden shadow-xl aspect-video bg-slate-950 group">
            <img
              src={activeSermon.thumbnail}
              alt={activeSermon.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-between p-6">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-emerald-600/90 text-white text-[11px] font-bold rounded-lg uppercase tracking-wider shadow">
                  Featured Message
                </span>
                <span className="px-3 py-1 bg-slate-900/80 backdrop-blur-md text-amber-400 text-xs font-mono rounded-lg border border-slate-700">
                  {activeSermon.scripture}
                </span>
              </div>

              {/* Big Play Button Overlay */}
              <div className="flex items-center justify-center my-auto">
                <button
                  onClick={togglePlay}
                  className="w-16 h-16 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center shadow-xl shadow-amber-500/30 transition hover:scale-110"
                  aria-label={isPlaying ? 'Pause sermon' : 'Play sermon'}
                >
                  {isPlaying ? (
                    <Pause className="w-7 h-7 fill-slate-950" />
                  ) : (
                    <Play className="w-7 h-7 fill-slate-950 ml-1" />
                  )}
                </button>
              </div>

              {/* Status Bar */}
              <div className="flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                  <span>{isPlaying ? 'Now Playing Stream' : 'Ready to Stream'}</span>
                </div>
                <span>{activeSermon.duration}</span>
              </div>
            </div>
          </div>

          {/* Sermon Details & Controls (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
                Series: {activeSermon.series}
              </span>
              <h3 className="text-2xl font-bold font-cinzel text-white mt-1 leading-snug">
                {activeSermon.title}
              </h3>
              <div className="flex items-center gap-2.5 mt-2.5">
                {activeSermon.speakerImage && (
                  <img
                    src={activeSermon.speakerImage}
                    alt={activeSermon.speaker}
                    referrerPolicy="no-referrer"
                    className="w-8 h-8 rounded-full object-cover object-top border border-amber-400/60 shadow"
                  />
                )}
                <p className="text-xs text-slate-300">
                  Ministered by <strong className="text-amber-300 font-semibold">{activeSermon.speaker}</strong> · {activeSermon.date}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {activeSermon.summary}
            </p>

            {/* Key Points Outline */}
            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-[11px] uppercase tracking-wider text-amber-400 font-bold block">
                Key Prophetic Revelations:
              </span>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                {activeSermon.keyPoints.map((point, idx) => (
                  <li key={idx} className="text-[11px] leading-relaxed">
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <button
                onClick={() => setShowNotesModal(true)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl flex items-center gap-1.5 border border-slate-700 transition"
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                <span>Study Notes</span>
              </button>

              <button
                onClick={handleShare}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl flex items-center gap-1.5 border border-slate-700 transition"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Link Copied' : 'Share'}</span>
              </button>

              <button
                onClick={() => onOpenDonate('tithe')}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl flex items-center gap-1.5 transition ml-auto shadow"
              >
                <Heart className="w-3.5 h-3.5 fill-slate-950" />
                <span>Sow a Seed for this Word</span>
              </button>
            </div>
          </div>
        </div>

        {/* Recent Sermons Grid */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold font-cinzel text-white">Recent Sermons in this Season</h3>
            <span className="text-xs text-slate-400">Select any message to play</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SERMONS_DATA.map((sermon) => (
              <div
                key={sermon.id}
                onClick={() => {
                  setActiveSermon(sermon);
                  setIsPlaying(true);
                }}
                className={`cursor-pointer rounded-2xl overflow-hidden border transition-all duration-300 p-4 flex flex-col justify-between ${
                  activeSermon.id === sermon.id
                    ? 'bg-slate-900 border-amber-500/60 shadow-lg'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="relative aspect-video rounded-xl overflow-hidden mb-3 bg-slate-950">
                    <img
                      src={sermon.thumbnail}
                      alt={sermon.title}
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 rounded text-[10px] font-mono text-white">
                      {sermon.duration}
                    </div>
                  </div>

                  <span className="text-[10px] text-amber-400 font-semibold uppercase tracking-wider">
                    {sermon.series}
                  </span>
                  <h4 className="text-sm font-bold text-white font-cinzel mt-1 line-clamp-2">
                    {sermon.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                    {sermon.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <div className="flex items-center gap-1.5 min-w-0">
                    {sermon.speakerImage && (
                      <img
                        src={sermon.speakerImage}
                        alt={sermon.speaker}
                        referrerPolicy="no-referrer"
                        className="w-5 h-5 rounded-full object-cover object-top border border-amber-400/40 shrink-0"
                      />
                    )}
                    <span className="truncate font-medium text-slate-300">{sermon.speaker}</span>
                  </div>
                  <span className="font-mono text-amber-300 text-[10px] shrink-0 ml-2">{sermon.scripture}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sermon Notes Viewer Modal */}
      {showNotesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white space-y-4">
            <div className="flex justify-between items-start border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                {activeSermon.speakerImage && (
                  <img
                    src={activeSermon.speakerImage}
                    alt={activeSermon.speaker}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover object-top border-2 border-amber-400 shadow shrink-0"
                  />
                )}
                <div>
                  <span className="text-xs text-amber-400 font-semibold uppercase">Sermon Study Notes</span>
                  <h3 className="text-base font-bold font-cinzel mt-0.5">{activeSermon.title}</h3>
                  <span className="text-xs text-slate-400">{activeSermon.scripture} · {activeSermon.speaker}</span>
                </div>
              </div>
              <button
                onClick={() => setShowNotesModal(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300 leading-relaxed max-h-72 overflow-y-auto">
              <p><strong>Scripture Foundation:</strong> {activeSermon.scripture}</p>
              <p><strong>Core Thesis:</strong> {activeSermon.summary}</p>
              <div>
                <strong className="block mb-1">Key Principles to Meditate Upon:</strong>
                <ul className="list-disc list-inside space-y-1">
                  {activeSermon.keyPoints.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </div>
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-200 text-[11px] italic">
                “Thy word is a lamp unto my feet, and a light unto my path.” — Psalm 119:105
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => setShowNotesModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg"
              >
                Close Notes
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
