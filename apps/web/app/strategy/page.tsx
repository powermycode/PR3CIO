'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowRight, 
  Map as MapIcon, 
  MapPin, 
  Globe, 
  Navigation, 
  Clock, 
  Instagram, 
  Star, 
  Users, 
  ChevronDown, 
  Check, 
  Mic2, 
  Rocket, 
  Sparkles,
  Disc3
} from 'lucide-react';

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PR3CIO Global Expansion Strategy | AI Music Platform",
  description: "Explore PR3CIO's artist acquisition strategy and global expansion plan across India, USA, Brazil and Dominican Republic.",
  openGraph: {
    title: "PR3CIO Global Expansion Strategy | AI Music Platform",
    description: "Explore PR3CIO's artist acquisition strategy and global expansion plan across India, USA, Brazil and Dominican Republic.",
    type: "website",
  }
};

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

export default function StrategyPage() {
  return (
    <div className="bg-[#000] text-white selection:bg-accent/30 min-h-screen font-sans">
      {/* SECTION 1 — HERO */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 1000 500" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.circle 
              cx="200" cy="150" r="2" fill="#8B5CF6" 
              animate={{ opacity: [0.2, 1, 0.2] }} 
              transition={{ duration: 2, repeat: Infinity }} 
            />
            <motion.circle 
              cx="500" cy="300" r="2" fill="#8B5CF6" 
              animate={{ opacity: [0.2, 1, 0.2] }} 
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} 
            />
            <motion.circle 
              cx="800" cy="100" r="2" fill="#8B5CF6" 
              animate={{ opacity: [0.2, 1, 0.2] }} 
              transition={{ duration: 2, repeat: Infinity, delay: 1 }} 
            />
            <motion.path 
              d="M200 150 Q 350 100 500 300 T 800 100" 
              stroke="#8B5CF6" strokeWidth="0.5" strokeDasharray="5 5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </svg>
        </div>

        <div className="relative z-10 max-w-5xl space-y-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1 rounded-full border border-accent/30 bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-4"
          >
            Strategy Dashboard v1.0
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl font-black tracking-tighter leading-none uppercase italic"
          >
            PR3CIO <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Global Artist</span> <br />
            Network
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light tracking-wide"
          >
            AI powered music creation platform <br />
            for independent artists.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="pt-8"
          >
            <Link href="/luis" className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform">
              Join the movement
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-20"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </section>

      {/* SECTION 2 — THE VISION */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <motion.div {...fadeInUp} className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-none italic">
              The Music Industry <br />Is Changing
            </h2>
            <div className="space-y-6 text-xl text-gray-400 font-light leading-relaxed">
              <p>Artists no longer need labels to create music.</p>
              <p>PR3CIO is building an AI powered studio where artists can create, release and earn from original music.</p>
            </div>
            <div className="pt-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center font-bold">L</div>
              <div>
                <div className="text-sm font-bold uppercase tracking-widest text-gray-500">Founder</div>
                <div className="text-accent font-bold">Luis Santos</div>
              </div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative bg-white/[0.03] border border-white/5 backdrop-blur-xl rounded-[40px] p-10 overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Clock className="w-32 h-32" />
            </div>
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-accent mb-10 block">Evolution Timeline</h3>
            <div className="space-y-12">
              {[
                { phase: "Phase 1", title: "AI Studio Launch", active: true },
                { phase: "Phase 2", title: "Global Artist Onboarding", active: false },
                { phase: "Phase 3", title: "The Artist Economy", active: false }
              ].map((item, i) => (
                <div key={i} className={`relative pl-8 border-l ${item.active ? 'border-accent' : 'border-white/10'}`}>
                  <div className={`absolute -left-1.5 top-0 w-3 h-3 rounded-full ${item.active ? 'bg-accent shadow-[0_0_10px_#8B5CF6]' : 'bg-white/20'}`}></div>
                  <div className={`text-sm font-bold mb-1 uppercase ${item.active ? 'text-accent' : 'text-gray-500'}`}>{item.phase}</div>
                  <div className="font-bold text-xl uppercase">{item.title}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3 — GLOBAL EXPANSION */}
      <section className="py-32 px-6 bg-accent/5">
        <div className="max-w-7xl mx-auto space-y-20">
          <motion.div {...fadeInUp} className="text-center space-y-4">
            <h2 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter">PR3CIO Global Expansion</h2>
            <p className="text-xl text-gray-400 font-light">PR3CIO is onboarding independent artists worldwide.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { country: "India", status: "Active Hub", icon: MapIcon, color: "text-purple-500" },
              { country: "USA", status: "Growth Target", icon: MapPin, color: "text-blue-500" },
              { country: "Brazil", status: "Expansion Phase", icon: Globe, color: "text-green-500" },
              { country: "Dominican Republic", status: "Artist Beta", icon: Navigation, color: "text-yellow-500" }
            ].map((item, i) => (
              <motion.div 
                key={i}
                {...fadeInUp}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, borderColor: 'rgba(139, 92, 246, 0.5)' }}
                className="bg-white/[0.03] border border-white/5 backdrop-blur-xl rounded-3xl p-8 transition-all group cursor-default"
              >
                <div className={`mb-6 drop-shadow-[0_0_10px_rgba(139,92,246,0.3)] ${item.color}`}>
                  <item.icon className="w-12 h-12" />
                </div>
                <h4 className="text-2xl font-bold uppercase tracking-tight mb-2">{item.country}</h4>
                <p className="text-sm text-gray-500 uppercase font-black tracking-widest">{item.status}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — FEATURED ARTISTS */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div>
            <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">Early PR3CIO Artists</h2>
            <p className="text-xl text-gray-400 font-light mt-4">The pioneers of the network.</p>
          </div>
          <Link href="/explore" className="text-accent font-bold uppercase tracking-widest text-sm hover:underline">View all talent</Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Artizz", slug: "artizz", img: "/artists/artizz.png" },
            { name: "LesJ", slug: "lesj", img: "/artists/lesj.png" },
            { name: "Rico Milano", slug: "rico-milano", img: "/artists/rico-milano.png" }
          ].map((artist, i) => (
            <motion.div 
              key={i}
              {...fadeInUp}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative aspect-[4/5] rounded-[40px] overflow-hidden bg-white/[0.03] border border-white/5"
            >
              <Link href={`/artist/${artist.slug}`}>
                <img src={artist.img} alt={artist.name} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10"></div>
                <div className="absolute bottom-0 left-0 right-0 p-10 z-20 space-y-4">
                  <h3 className="text-3xl font-black uppercase italic tracking-tighter">{artist.name}</h3>
                  <div className="inline-flex items-center gap-2 px-6 py-2 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold uppercase group-hover:bg-white group-hover:text-black transition-all">
                    View Artist
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 5 — INSTAGRAM STRATEGY */}
      <section className="py-32 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-10 bg-accent/10 blur-[100px] rounded-full"></div>
              <div className="relative grid grid-cols-2 gap-4">
                {[
                  { title: "Vision Posts", icon: Instagram, mt: false },
                  { title: "Expansion Posts", icon: Globe, mt: true },
                  { title: "Artist Spotlight", icon: Star, mt: false },
                  { title: "Community Feed", icon: Users, mt: true }
                ].map((post, i) => (
                  <div key={i} className={`aspect-square bg-white/[0.03] border border-white/5 backdrop-blur-xl rounded-3xl p-4 flex flex-col justify-between group overflow-hidden ${post.mt ? 'mt-8' : ''}`}>
                    <post.icon className="w-8 h-8 opacity-20 group-hover:opacity-100 group-hover:text-accent transition-all" />
                    <div className="text-xs font-black uppercase tracking-tighter leading-tight">{post.title}</div>
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div {...fadeInUp} className="space-y-8">
              <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none">Instagram Artist <br />Discovery Engine</h2>
              <p className="text-xl text-gray-400 font-light leading-relaxed">
                PR3CIO uses Instagram to recruit independent artists globally. Through immersive visual storytelling, we showcase our AI studio capabilities and global reach.
              </p>
              <div className="space-y-4">
                {[
                  "Global Outreach",
                  "Visual Social Proof",
                  "Automated Lead Gen"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-accent"></div>
                    <span className="font-bold uppercase text-xs tracking-widest">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — ARTIST FUNNEL */}
      <section className="py-32 px-6 max-w-5xl mx-auto text-center">
        <motion.h2 {...fadeInUp} className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-24">The Artist Journey</motion.h2>
        
        <div className="relative space-y-4">
          <motion.div 
            variants={{
              initial: {},
              whileInView: { transition: { staggerChildren: 0.2 } }
            }}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            {[
              "Instagram",
              "PR3CIO Discovery",
              "Artist Landing Page",
              "Profile Creation",
              "Upload Original Track"
            ].map((step, i) => (
              <React.Fragment key={i}>
                <motion.div variants={fadeInUp} className="bg-white/[0.03] border border-white/5 backdrop-blur-xl px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm border-accent/30">
                  {step}
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <ChevronDown className="w-6 h-6 my-4 text-accent opacity-50" />
                </motion.div>
              </React.Fragment>
            ))}
            <motion.div 
              variants={fadeInUp}
              className="bg-accent px-10 py-6 rounded-3xl font-black uppercase tracking-[0.2em] text-lg shadow-[0_0_30px_rgba(139,92,246,0.4)]"
            >
              Artist Network Growth
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 7 — 30 DAY BLUEPRINT */}
      <section className="py-32 px-6 bg-accent/5">
        <div className="max-w-7xl mx-auto space-y-20">
          <motion.div {...fadeInUp} className="text-center space-y-4">
            <h2 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter">First 500 Artists Without Ads</h2>
            <p className="text-xl text-gray-400 font-light uppercase tracking-widest">30 Day Artist Acquisition Blueprint</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { week: "Week 1", progress: 25, tasks: ["Launch Instagram", "India Artist Outreach", "DM 100 Artists/Day"], done: true },
              { week: "Week 2", progress: 50, tasks: ["Spotlight Content", "Creator Collaborations", "100 Onboarded"], done: false },
              { week: "Week 3", progress: 75, tasks: ["USA Outreach", "Producer Communities", "Cross Promotion"], done: false },
              { week: "Week 4", progress: 100, tasks: ["LatAm Expansion", "Network Flywheel", "Goal: 500 Artists"], done: false, pulse: true }
            ].map((item, i) => (
              <motion.div 
                key={i}
                {...fadeInUp}
                transition={{ delay: i * 0.1 }}
                className="space-y-6"
              >
                <div className="text-sm font-black text-accent uppercase tracking-[0.3em]">{item.week}</div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.progress}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className={`h-full bg-accent ${item.pulse ? 'animate-pulse' : ''}`}
                  />
                </div>
                <ul className="space-y-4 text-sm text-gray-400">
                  {item.tasks.map((task, j) => (
                    <li key={j} className="flex gap-2">
                      {item.done ? <Check className="w-4 h-4 text-accent" /> : <div className="w-4 h-4 rounded-full border border-accent/30" />}
                      <span className={j === item.tasks.length - 1 && item.progress === 100 ? "font-black text-white italic underline" : ""}>{task}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8 — WHY JOIN */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "AI Music Studio", icon: Mic2, desc: "Pro-grade production tools powered by generative AI for lyrics and instrumentals.", color: "text-purple-500" },
            { title: "Global Artist Network", icon: Users, desc: "Direct connection to a worldwide community of creators and listeners.", color: "text-blue-500" },
            { title: "Direct Release", icon: Rocket, desc: "Skip the gatekeepers. Release your music directly to fans and keep your earnings.", color: "text-green-500" }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              {...fadeInUp}
              transition={{ delay: i * 0.1 }}
              className="bg-white/[0.03] border border-white/5 backdrop-blur-xl p-12 rounded-[40px] space-y-6 hover:bg-white/[0.05] transition-colors"
            >
              <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center ${feature.color}`}>
                <feature.icon className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-black uppercase italic">{feature.title}</h4>
              <p className="text-gray-400 leading-relaxed font-light">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 9 — FINAL CTA */}
      <section className="py-40 px-6 text-center">
        <motion.div {...fadeInUp} className="max-w-4xl mx-auto space-y-12">
          <h2 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-none">Join the <br />PR3CIO Movement</h2>
          <div className="pt-8">
            <Link href="/luis" className="inline-flex items-center gap-4 px-12 py-6 bg-accent text-white rounded-full font-black uppercase tracking-[0.2em] text-xl shadow-[0_0_50px_rgba(139,92,246,0.5)] hover:scale-110 transition-all">
              Create your artist profile
              <Sparkles className="w-6 h-6" />
            </Link>
          </div>
        </motion.div>
      </section>

      <footer className="py-20 border-t border-white/5 text-center text-gray-600">
        <p className="text-xs font-black uppercase tracking-[0.5em]">PR3CIO Global Strategy 2026</p>
      </footer>
    </div>
  );
}
