import React from 'react';
import { CHURCH_CONFIG } from '../data/churchData';
import { Flame, Shield, BookOpen, Heart, Globe, MapPin, Phone, Mail } from 'lucide-react';
import pastorMosesImage from '../assets/images/pastor_moses_mwale.jpg';

export const AboutSection: React.FC = () => {
  const pillars = [
    {
      title: 'The Uncompromised Word',
      desc: 'Grounding every believer in the infallible, living Word of God as the final authority in life, faith, and doctrine.',
      icon: <BookOpen className="w-5 h-5 text-amber-400" />
    },
    {
      title: 'The Altar of Prayer & Fire',
      desc: 'Reviving personal and corporate altars through fervent intercession, fasting, and spiritual warfare.',
      icon: <Flame className="w-5 h-5 text-orange-400" />
    },
    {
      title: 'The Supernatural Holy Spirit',
      desc: 'Believing in the tangible gifts, power, healing anointing, and deliverance of the Holy Ghost for this modern generation.',
      icon: <Shield className="w-5 h-5 text-emerald-400" />
    },
    {
      title: 'Radical Love & Generosity',
      desc: 'Transforming communities through hospital visitation, feeding orphans, and lifting the vulnerable.',
      icon: <Heart className="w-5 h-5 text-rose-400" />
    }
  ];

  return (
    <section id="about" className="py-20 bg-slate-900/80 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Pastoral Welcome Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Pastor Image & Seal (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-emerald-500/40">
              <img
                src={pastorMosesImage}
                alt="Pastor Moses Mwale, Founder of Altar of God Ministries"
                className="w-full aspect-[3/4] object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex flex-col justify-end p-6">
                <span className="text-xs uppercase tracking-wider text-emerald-400 font-bold">Founder & General Overseer</span>
                <h3 className="text-2xl font-bold font-cinzel text-white">
                  Pastor Moses Mwale
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Founder & Senior Pastor, Altar of God Ministries
                </p>
              </div>
            </div>

            {/* Floating Gold Seal */}
            <div className="hidden sm:block absolute -bottom-4 -right-4 p-4 rounded-2xl bg-slate-950 border border-emerald-500/50 shadow-2xl">
              <div className="text-center font-mono">
                <span className="text-xs text-emerald-400 uppercase font-bold block">Founder & Visionary</span>
                <span className="text-base font-bold text-white">Pastor Moses Mwale</span>
              </div>
            </div>
          </div>

          {/* Welcome Letter (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5" />
              <span>A Warm Welcome from Our Founder</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold font-cinzel text-white leading-tight">
              A Home for Every Thirsty Soul
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              Grace and peace be multiplied unto you in the precious name of our Lord and Savior, Jesus Christ. As the founder of Altar of God Ministries, I welcome you with open arms into this sanctuary of life, prayer, and supernatural encounters.
            </p>

            <p className="text-sm text-slate-300 leading-relaxed">
              When God laid the foundation of this altar upon our hearts according to Exodus 20:24, His promise was clear and unwavering: <em>“In all places where I record my name I will come unto thee, and I will bless thee.”</em> Regardless of what you have been through or where you find yourself today, God's fire is able to restore your dignity, purge every limitation, and ignite your divine destiny.
            </p>

            <p className="text-sm text-slate-300 leading-relaxed">
              We invite you to worship with us this coming Sunday, partner with us in kingdom giving, and plug into any of our vibrant wings of fellowship. You will never remain the same!
            </p>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-serif italic text-base text-amber-300">Pastor Moses Mwale</span>
                <div className="text-xs text-slate-400 mt-0.5">Founder & Senior Pastor, Altar of God Ministries</div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl font-bold font-cinzel text-white">Our Core Pillars of Faith</h3>
            <p className="text-xs text-slate-400 mt-1">What we believe and stand upon</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pil, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center">
                  {pil.icon}
                </div>
                <h4 className="text-sm font-bold font-cinzel text-white">{pil.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{pil.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Location & Contact Details */}
        <div className="p-8 rounded-3xl bg-slate-950 border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-white text-sm font-bold font-cinzel">Sanctuary Address</strong>
              <span className="text-slate-400 leading-relaxed mt-1 block">
                {CHURCH_CONFIG.address}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-white text-sm font-bold font-cinzel">Church Lines & Airtel Help</strong>
              <span className="text-slate-400 leading-relaxed mt-1 block font-mono">
                {CHURCH_CONFIG.phone}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-white text-sm font-bold font-cinzel">Email Inquiries</strong>
              <span className="text-slate-400 leading-relaxed mt-1 block">
                {CHURCH_CONFIG.email}<br />
                Giving Desk: {CHURCH_CONFIG.givingEmail}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
