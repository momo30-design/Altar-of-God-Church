import React, { useState } from 'react';
import { INITIAL_PRAYER_REQUESTS } from '../data/churchData';
import { PrayerRequest } from '../types';
import { Heart, Send, Shield, Lock, CheckCircle2, MessageCircleHeart, Sparkles } from 'lucide-react';

export const PrayerWallSection: React.FC = () => {
  const [requests, setRequests] = useState<PrayerRequest[]>(INITIAL_PRAYER_REQUESTS);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  // Submit form state
  const [name, setName] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [category, setCategory] = useState<'Healing' | 'Family' | 'Breakthrough' | 'Spiritual Growth' | 'Deliverance' | 'Thanksgiving'>('Breakthrough');
  const [requestText, setRequestText] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const categories = ['All', 'Healing', 'Breakthrough', 'Family', 'Spiritual Growth', 'Deliverance'];

  const filteredRequests = categoryFilter === 'All'
    ? requests
    : requests.filter(r => r.category === categoryFilter);

  const handlePray = (id: string) => {
    setRequests(prev =>
      prev.map(r => {
        if (r.id === id) {
          const hasPrayed = !r.hasPrayed;
          return {
            ...r,
            prayerCount: hasPrayed ? r.prayerCount + 1 : r.prayerCount - 1,
            hasPrayed
          };
        }
        return r;
      })
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestText.trim()) return;

    const newReq: PrayerRequest = {
      id: 'req-' + Date.now(),
      name: isAnonymous ? 'Anonymous Believer' : name.trim() || 'A Believer in Christ',
      category,
      request: requestText.trim(),
      date: 'Just now',
      isPrivate,
      prayerCount: 1,
      hasPrayed: true,
    };

    if (!isPrivate) {
      setRequests([newReq, ...requests]);
    }

    setSubmitSuccess(true);
    setRequestText('');
    setName('');
    setTimeout(() => setSubmitSuccess(false), 4000);
  };

  return (
    <section id="prayer" className="py-20 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <MessageCircleHeart className="w-3.5 h-3.5" />
            <span>The Intercessory Altar</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-cinzel text-white">
            Standing in the Gap with You
          </h2>
          <p className="text-sm text-slate-300 mt-2">
            “The effectual fervent prayer of a righteous man availeth much.” — James 5:16. Post your prayer burden or join hundreds of believers lifting up one another before the throne of grace.
          </p>
        </div>

        {/* Two-column layout: Left (Submit Prayer), Right (Prayer Wall Feed) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Submit Prayer Box (5 cols) */}
          <div className="lg:col-span-5 p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl space-y-5">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold font-cinzel text-white">Submit a Prayer Request</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Our intercessory prayer warriors lay hands on every prayer request at 05:00 AM daily.
              </p>
            </div>

            {submitSuccess && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>
                  {isPrivate
                    ? 'Your private prayer request has been sent securely to Pastor Moses Mwale & the pastoral intercessors.'
                    : 'Your prayer request is posted on the altar wall. Believers are standing with you in faith!'}
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  disabled={isAnonymous}
                  placeholder={isAnonymous ? 'Posting Anonymously' : 'e.g. Sister Grace M.'}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 disabled:opacity-50"
                />
                <label className="inline-flex items-center gap-2 mt-1.5 text-[11px] text-slate-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="rounded bg-slate-950 border-slate-700 text-amber-500 focus:ring-0"
                  />
                  <span>Post anonymously (Keep my name confidential)</span>
                </label>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Prayer Need Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="Breakthrough">Financial & Career Breakthrough</option>
                  <option value="Healing">Divine Healing & Restoration</option>
                  <option value="Family">Family, Marriage & Children</option>
                  <option value="Spiritual Growth">Spiritual Hunger & Deliverance</option>
                  <option value="Thanksgiving">Praise Report / Thanksgiving</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Prayer Burden / Petition *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Share what you are believing God for..."
                  value={requestText}
                  onChange={(e) => setRequestText(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <label className="flex items-start gap-2.5 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPrivate}
                    onChange={(e) => setIsPrivate(e.target.checked)}
                    className="mt-0.5 rounded bg-slate-900 border-slate-700 text-amber-500 focus:ring-0"
                  />
                  <div>
                    <span className="font-semibold text-white flex items-center gap-1">
                      <Lock className="w-3 h-3 text-amber-400" />
                      Keep Private (Pastoral Team Only)
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      Will NOT appear on the public wall; sent directly to Pastor Moses Mwale (Founder) for private intercession.
                    </span>
                  </div>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition shadow"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Place on the Altar</span>
              </button>
            </form>
          </div>

          {/* Prayer Wall Feed (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Filter categories */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <span className="text-xs font-semibold text-slate-400">Filter Needs:</span>
              <div className="flex flex-wrap gap-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-2.5 py-1 rounded-lg text-xs transition ${
                      categoryFilter === cat
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Requests Cards List */}
            <div className="space-y-3.5 max-h-[600px] overflow-y-auto pr-1">
              {filteredRequests.map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 hover:border-slate-700 transition space-y-3"
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-amber-400 text-xs">
                        {item.name.charAt(0)}
                      </div>
                      <div>
                        <span className="font-semibold text-white block leading-tight">{item.name}</span>
                        <span className="text-[10px] text-slate-500">{item.date}</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] text-amber-300 border border-slate-700 font-medium">
                      {item.category}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    "{item.request}"
                  </p>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                    <button
                      onClick={() => handlePray(item.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                        item.hasPrayed
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${item.hasPrayed ? 'fill-amber-400 text-amber-400' : ''}`} />
                      <span>{item.hasPrayed ? 'You Prayed' : 'I Prayed for This'}</span>
                    </button>

                    <span className="text-[11px] text-slate-400 font-mono">
                      {item.prayerCount} {item.prayerCount === 1 ? 'believer interceding' : 'believers interceding'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
