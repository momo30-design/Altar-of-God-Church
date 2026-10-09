import React, { useState } from 'react';
import { CHURCH_EVENTS, SERVICE_SCHEDULE, CHURCH_CONFIG } from '../data/churchData';
import { ChurchEvent } from '../types';
import { Calendar, Clock, MapPin, Users, CheckCircle2, ArrowRight } from 'lucide-react';

export const EventsSection: React.FC = () => {
  const [events, setEvents] = useState<ChurchEvent[]>(CHURCH_EVENTS);
  const [activeRsvpEvent, setActiveRsvpEvent] = useState<ChurchEvent | null>(null);
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpPhone, setRsvpPhone] = useState('');
  const [rsvpSuccess, setRsvpSuccess] = useState(false);

  const handleConfirmRsvp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeRsvpEvent) return;

    setEvents(prev =>
      prev.map(ev =>
        ev.id === activeRsvpEvent.id
          ? { ...ev, registeredCount: ev.registeredCount + 1 }
          : ev
      )
    );

    setRsvpSuccess(true);
    setTimeout(() => {
      setRsvpSuccess(false);
      setActiveRsvpEvent(null);
      setRsvpName('');
      setRsvpPhone('');
    }, 2500);
  };

  return (
    <section id="events" className="py-20 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* PART 1: SERVICE SCHEDULE */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Clock className="w-3.5 h-3.5" />
              <span>Weekly Encounters & Service Times</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-cinzel text-white">
              Gather with Us in Fellowship
            </h2>
            <p className="text-sm text-slate-300 mt-2">
              Every gathering is saturated with intense worship, unbroken communion, and tangible miraculous manifestations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICE_SCHEDULE.map((svc, i) => (
              <div
                key={i}
                className={`p-6 rounded-2xl border transition flex flex-col justify-between ${
                  svc.isLiveNext
                    ? 'bg-gradient-to-b from-amber-950/40 via-slate-900 to-slate-900 border-amber-500/60 shadow-xl'
                    : 'bg-slate-900/80 border-slate-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                      {svc.day}
                    </span>
                    {svc.isLiveNext && (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-600/90 text-white text-[10px] font-bold uppercase tracking-wider shadow">
                        Next Gathering
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold font-cinzel text-white">
                    {svc.name}
                  </h3>

                  <div className="flex items-center gap-1.5 text-sm font-mono text-emerald-400 font-bold mt-2">
                    <Clock className="w-4 h-4 shrink-0" />
                    <span>{svc.time}</span>
                  </div>

                  <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
                    {svc.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800 text-[11px] text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                  <span className="truncate">{svc.hall}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PART 2: UPCOMING EVENTS & CONFERENCES */}
        <div>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs uppercase tracking-wider text-amber-400 font-bold">
                Calendar of Supernatural Gatherings
              </span>
              <h3 className="text-2xl font-bold font-cinzel text-white mt-1">
                Upcoming Church Events & Conferences
              </h3>
            </div>
            <span className="text-xs text-slate-400">
              Free entry · Reserve your seat in advance
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map((ev) => (
              <div
                key={ev.id}
                className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-video bg-slate-950 overflow-hidden">
                    <img
                      src={ev.image}
                      alt={ev.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-80"
                    />
                    <div className="absolute top-2 left-2 px-2.5 py-1 bg-black/80 backdrop-blur rounded-lg text-[10px] font-bold text-amber-300 uppercase tracking-wider">
                      {ev.category}
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
                      <Calendar className="w-3.5 h-3.5 shrink-0" />
                      <span>{ev.date}</span>
                    </div>

                    <h4 className="text-base font-bold font-cinzel text-white leading-snug">
                      {ev.title}
                    </h4>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {ev.description}
                    </p>

                    <div className="space-y-1 text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                      <div>Speaker: <strong className="text-slate-200">{ev.speaker}</strong></div>
                      <div>Venue: <span className="text-slate-300">{ev.location}</span></div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-800">
                    <span className="text-[11px] text-slate-400">
                      {ev.registeredCount} already registered
                    </span>
                    <button
                      onClick={() => setActiveRsvpEvent(ev)}
                      className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg transition"
                    >
                      RSVP Free
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RSVP Modal */}
      {activeRsvpEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white space-y-4">
            <div className="flex justify-between items-start border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs text-amber-400 font-semibold uppercase">Event Reservation</span>
                <h3 className="text-base font-bold font-cinzel mt-0.5">{activeRsvpEvent.title}</h3>
                <span className="text-xs text-slate-400">{activeRsvpEvent.date}</span>
              </div>
              <button
                onClick={() => setActiveRsvpEvent(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {rsvpSuccess ? (
              <div className="py-6 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white font-cinzel">Seat Reserved Successfully!</h4>
                <p className="text-xs text-slate-400">
                  We look forward to welcoming you at {activeRsvpEvent.location}. Expect a mighty encounter with the Lord!
                </p>
              </div>
            ) : (
              <form onSubmit={handleConfirmRsvp} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Moses Mwale"
                    value={rsvpName}
                    onChange={(e) => setRsvpName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Mobile Number (For Reminder SMS) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="097xxxxxxx"
                    value={rsvpPhone}
                    onChange={(e) => setRsvpPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs font-mono text-white"
                  />
                </div>

                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-[11px] text-slate-400">
                  Admission is free. Your details will be held securely by Altar of God Ministries.
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setActiveRsvpEvent(null)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg"
                  >
                    Confirm My Attendance
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
