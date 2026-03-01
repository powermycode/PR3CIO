'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight, Play, TrendingUp, Music, Users, Rocket, Sparkles, Instagram, ArrowRight } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

const SectionHeader = ({ title, subtitle, description }: { title: string; subtitle?: string; description?: string }) => (
  <motion.div 
    {...fadeInUp}
    className="max-w-4xl mx-auto text-center mb-20 px-6"
  >
    {subtitle && (
      <span className="text-accent font-bold uppercase tracking-[0.4em] text-xs mb-4 block">
        {subtitle}
      </span>
    )}
    <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
      {title}
    </h2>
    {description && (
      <p className="text-xl text-gray-400 font-medium leading-relaxed max-w-2xl mx-auto">
        {description}
      </p>
    )}
  </motion.div>
);

export default function LuisPresentationPage() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);

  return (
    <div className="bg-[#0B0B0F] text-white selection:bg-accent/30 overflow-x-hidden">
      {/* SECTION 1 — HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/20 rounded-full blur-[160px] animate-pulse" />
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px]" />
        </div>

        <motion.div 
          style={{ opacity, scale }}
          className="relative z-10 max-w-5xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
              PR3CIO <br />Growth Engine
            </h1>
            <p className="text-xl md:text-3xl font-medium text-gray-400 mb-6 max-w-3xl mx-auto leading-tight">
              Building the next generation platform for hip hop artists powered by AI music creation.
            </p>
            <p className="text-lg md:text-xl text-gray-500 mb-12 max-w-2xl mx-auto">
              PR3CIO connects emerging artists with global listeners while providing AI tools to create original music and earn from streams.
            </p>
            
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <Link href="/explore" className="group px-10 py-5 bg-white text-black text-lg font-bold rounded-full hover:scale-105 transition-all duration-300 flex items-center gap-2">
                Explore Artists
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })} className="px-10 py-5 bg-white/5 border border-white/10 text-lg font-bold rounded-full hover:bg-white/10 transition-all duration-300">
                View Strategy
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500"
        >
          <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-gray-500 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* SECTION 2 — ARTIST MARKETING PAGES */}
      <section className="py-40 px-6 max-w-7xl mx-auto">
        <SectionHeader 
          subtitle="Campaigns"
          title="Sponsored Artist Growth Pages"
          description="Each sponsored artist receives a dedicated marketing page designed to convert listeners into fans."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Rico Milano", listeners: "12.4K", img: "/artists/rico-milano.png" },
            { name: "Artizz", listeners: "8.2K", img: "/artists/artizz.png" },
            { name: "Lesj", listeners: "15.9K", img: "/artists/lesj.png" }
          ].map((artist, i) => (
            <motion.div
              key={artist.name}
              {...fadeInUp}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative aspect-[4/5] rounded-[32px] overflow-hidden bg-white/5 border border-white/10"
            >
              <img 
                src={artist.img} 
                alt={artist.name}
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="text-accent font-bold text-xs tracking-widest uppercase mb-2 block">Hip Hop</span>
                <h3 className="text-3xl font-bold mb-1">{artist.name}</h3>
                <p className="text-gray-400 text-sm mb-6 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {artist.listeners} monthly listeners
                </p>
                <Link href={`/${artist.name.toLowerCase().replace(' ', '-')}`} className="w-full py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-center font-bold text-sm hover:bg-white hover:text-black transition-all block">
                  View Artist Page
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 3 — TRACK PLAYER (V2) */}
      <section className="py-40 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader 
            subtitle="Platform"
            title="PR3CIO Streaming Player"
            description="A next generation music player designed for artist discovery and engagement."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Music, title: "Continuous Playback", desc: "Seamless cross-fading and bufferless streaming." },
              { icon: TrendingUp, title: "Listener Tracking", desc: "Real-time analytics on every play and skip." },
              { icon: Sparkles, title: "Artist Earnings", desc: "Automated payouts per stream via smart contracts." },
              { icon: Rocket, title: "Artist Discovery", desc: "AI algorithms matching moods to new talent." }
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                {...fadeInUp}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-[32px] bg-card border border-white/5 hover:border-accent/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 text-accent">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold mb-3">{feature.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Mock Player UI */}
          <motion.div 
            {...fadeInUp}
            className="mt-20 p-4 bg-[#14141A] rounded-[40px] border border-white/10 shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex flex-col md:flex-row items-center gap-8 p-6 relative z-10">
              <div className="w-48 h-48 rounded-3xl overflow-hidden shadow-xl bg-gray-800">
                <div className="w-full h-full animate-pulse bg-gradient-to-br from-accent/20 to-purple-600/20" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-3xl font-bold mb-2">Algorithm Discovery</h3>
                <p className="text-accent font-medium mb-6">Sponsored Track — Rico Milano</p>
                <div className="w-full h-1.5 bg-white/10 rounded-full mb-6 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '45%' }}
                    transition={{ duration: 2, delay: 0.5 }}
                    className="h-full bg-accent"
                  />
                </div>
                <div className="flex justify-center md:justify-start gap-8 items-center text-gray-400">
                  <Play className="w-8 h-8 fill-white text-white" />
                  <span className="text-sm font-bold tracking-widest uppercase">02:45 / 03:50</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4 — INSTAGRAM TALENT FUNNEL */}
      <section className="py-40 px-6 max-w-7xl mx-auto overflow-hidden">
        <SectionHeader 
          subtitle="Acquisition"
          title="Artist Acquisition Engine"
          description="Our most powerful growth vector: converting social media talent into platform assets."
        />

        <div className="relative">
          {/* Funnel Line */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/5 -translate-y-1/2 hidden md:block" />
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
            {[
              { icon: Instagram, title: "Discover", desc: "Find vocalists and cover artists on Instagram" },
              { icon: Play, title: "Invite", desc: "Invite them to create their first original track" },
              { icon: Sparkles, title: "Generate", desc: "Use AI studio to generate lyrics & beats" },
              { icon: Music, title: "Record", desc: "Artists record vocals and upload their song" },
              { icon: Rocket, title: "Amplify", desc: "PR3CIO promotes the artist with a page" }
            ].map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="w-16 h-16 rounded-full bg-card border border-white/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform bg-gradient-to-b from-white/5 to-transparent relative">
                  <step.icon className="w-6 h-6 text-accent" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full text-[10px] font-bold flex items-center justify-center text-white">
                    {i + 1}
                  </div>
                </div>
                <h5 className="font-bold mb-2 uppercase tracking-tighter">{step.title}</h5>
                <p className="text-sm text-gray-500 leading-relaxed px-4">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — GROWTH LOOP */}
      <section className="py-40 bg-white/[0.02] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <SectionHeader 
            subtitle="Flywheel"
            title="Self-Reinforcing Growth Loop"
          />

          <div className="relative h-[600px] flex items-center justify-center">
            {/* Animated Loop Background */}
            <svg className="absolute w-[500px] h-[500px] opacity-20" viewBox="0 0 100 100">
              <motion.circle
                cx="50" cy="50" r="45"
                fill="none" stroke="currentColor" strokeWidth="0.5"
                strokeDasharray="10 5"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />
            </svg>

            <div className="grid grid-cols-2 gap-20 relative z-10">
              <motion.div {...fadeInUp} className="flex flex-col items-center gap-4">
                <div className="p-8 bg-card rounded-[32px] border border-white/10 w-48 h-48 flex flex-col justify-center shadow-xl">
                  <h6 className="font-black text-xs uppercase mb-2">Artists</h6>
                  <p className="text-sm text-gray-400">Create Music</p>
                </div>
                <ArrowRight className="w-6 h-6 text-accent rotate-90" />
              </motion.div>

              <motion.div {...fadeInUp} transition={{ delay: 0.1 }} className="flex flex-col items-center gap-4">
                <div className="p-8 bg-card rounded-[32px] border border-white/10 w-48 h-48 flex flex-col justify-center shadow-xl">
                  <h6 className="font-black text-xs uppercase mb-2">Fans</h6>
                  <p className="text-sm text-gray-400">Discover Talent</p>
                </div>
                <ArrowRight className="w-6 h-6 text-accent rotate-180" />
              </motion.div>

              <motion.div {...fadeInUp} transition={{ delay: 0.3 }} className="flex flex-col items-center gap-4">
                <ArrowRight className="w-6 h-6 text-accent -rotate-90" />
                <div className="p-8 bg-card rounded-[32px] border border-white/10 w-48 h-48 flex flex-col justify-center shadow-xl">
                  <h6 className="font-black text-xs uppercase mb-2">New Talent</h6>
                  <p className="text-sm text-gray-400">Join Platform</p>
                </div>
              </motion.div>

              <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="flex flex-col items-center gap-4">
                <ArrowRight className="w-6 h-6 text-accent" />
                <div className="p-8 bg-card rounded-[32px] border border-white/10 w-48 h-48 flex flex-col justify-center shadow-xl">
                  <h6 className="font-black text-xs uppercase mb-2">Listeners</h6>
                  <p className="text-sm text-gray-400">Join PR3CIO</p>
                </div>
              </motion.div>
            </div>

            {/* Logo in Center */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-accent rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(139,92,246,0.3)] border-4 border-black">
              <img src="/logo.webp" alt="PR3CIO" className="w-12 h-12 object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — PLATFORM VISION */}
      <section className="py-40 px-6 max-w-7xl mx-auto">
        <SectionHeader 
          subtitle="Vision"
          title="PR3CIO Platform Vision"
          description="We own the full music pipeline, from creation to consumption to monetization."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "AI Music Studio", icon: Sparkles, desc: "Direct integration of LLMs for lyrics and diffusion models for instrumentals." },
            { title: "Artist Launch Platform", icon: Rocket, desc: "A turn-key solution for marketing and brand building for emerging artists." },
            { title: "Streaming Platform", icon: Music, desc: "A premium listening experience optimized for discovery and fair artist compensation." }
          ].map((vision, i) => (
            <motion.div
              key={vision.title}
              {...fadeInUp}
              transition={{ delay: i * 0.1 }}
              className="group p-12 rounded-[48px] bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500 h-[400px] flex flex-col justify-between"
            >
              <div className="w-16 h-16 rounded-3xl bg-accent/20 flex items-center justify-center text-accent">
                <vision.icon className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-3xl font-bold mb-4">{vision.title}</h4>
                <p className="text-gray-400 leading-relaxed font-medium">
                  {vision.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 7 — FINAL CTA */}
      <section className="py-60 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/10 blur-[120px] rounded-full" />
        
        <motion.div {...fadeInUp} className="relative z-10">
          <h2 className="text-5xl md:text-8xl font-black mb-12 tracking-tighter italic">
            The Future of <br />Artist Discovery
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-16 font-medium leading-relaxed">
            PR3CIO empowers independent artists to create original music, reach global listeners, and earn from their work.
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <Link href="/signup" className="px-12 py-6 bg-accent text-white text-xl font-bold rounded-full hover:scale-105 transition-all shadow-xl shadow-accent/20">
              Launch PR3CIO
            </Link>
            <Link href="/explore" className="px-12 py-6 bg-white/5 border border-white/10 text-white text-xl font-bold rounded-full hover:bg-white/10 transition-all">
              Explore Artists
            </Link>
          </div>
        </motion.div>
      </section>

      <footer className="py-20 border-t border-white/5 text-center text-gray-500 font-bold uppercase tracking-[0.4em] text-xs">
        PR3CIO © 2026 / For Luis Santos / Product Strategy
      </footer>
    </div>
  );
}
