'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function PresentationPage() {
  return (
    <div className="bg-[#0B0B0F] text-white selection:bg-accent/30">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 md:py-8 bg-background/50 backdrop-blur-xl border-b border-white/5">
        <Link href="/" className="flex items-center gap-2 group">
          <img src="/logo.webp" alt="PR3CIO" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
          <span className="text-xl md:text-2xl font-black tracking-tighter uppercase italic">PR3CIO</span>
        </Link>
        <div className="flex gap-4 md:gap-8 items-center">
          <Link href="/explore" className="text-sm font-bold uppercase tracking-widest hover:text-accent transition-colors">
            Explore
          </Link>
          <Link href="/signup" className="px-6 py-2 bg-white text-black text-sm font-bold uppercase rounded-full hover:scale-105 transition-transform">
            Join Now
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10"
        >
          <h1 className="text-6xl md:text-[120px] font-black tracking-tighter leading-none uppercase italic mb-8">
            PR3CIO <br />
            <span className="text-accent">Artist Discovery</span> <br />
            Engine
          </h1>
        </motion.div>
      </section>

      {/* 1. The Problem */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5">
        <motion.div {...fadeInUp}>
          <span className="text-accent font-black uppercase tracking-[0.3em] text-sm mb-4 block">01 / The Problem</span>
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-12 italic">
            Invisible <br />Genius.
          </h2>
          <p className="text-2xl md:text-4xl text-text-secondary max-w-3xl leading-tight font-medium">
            Independent hip hop artists struggle to get discovered. The algorithms are crowded, and the gatekeepers are distant.
          </p>
        </motion.div>
      </section>

      {/* 2. The Solution */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <motion.div {...fadeInUp}>
          <span className="text-accent font-black uppercase tracking-[0.3em] text-sm mb-4 block">02 / The Solution</span>
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-12 italic">
            The PR3CIO <br />Bridge.
          </h2>
          <p className="text-2xl md:text-4xl text-text-secondary max-w-3xl leading-tight font-medium">
            PR3CIO connects emerging hip hop artists with global listeners using AI-powered music tools. We don't just host music; we amplify talent.
          </p>
        </motion.div>
      </section>

      {/* 3. Growth System */}
      <section className="py-32 bg-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div {...fadeInUp} className="mb-20">
            <span className="text-accent font-black uppercase tracking-[0.3em] text-sm mb-4 block">03 / Growth System</span>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic">The Loop.</h2>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            {[
              { title: "Instagram", desc: "Where the buzz starts." },
              { title: "Artist Page", desc: "The conversion point." },
              { title: "PR3CIO", desc: "The immersive home." },
              { title: "New Artists", desc: "Join the movement." }
            ].map((step, i) => (
              <motion.div 
                key={i}
                variants={fadeInUp}
                className="bg-card p-8 rounded-3xl border border-white/5 flex flex-col justify-between h-[280px]"
              >
                <div className="text-4xl font-black italic">{i + 1}.</div>
                <div>
                  <h3 className="text-2xl font-black uppercase mb-2 italic">{step.title}</h3>
                  <p className="text-text-secondary">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. Sponsored Artist Model */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="mb-20">
          <span className="text-accent font-black uppercase tracking-[0.3em] text-sm mb-4 block">04 / Model</span>
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic">Sponsored <br />Growth.</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { title: "Dedicated page", desc: "A bespoke home for every artist." },
            { title: "Marketing funnel", desc: "Converting listeners into fans." },
            { title: "Discovery exposure", desc: "AI-driven placement across the platform." }
          ].map((item, i) => (
            <motion.div 
              key={i}
              {...fadeInUp}
              transition={{ delay: i * 0.1 }}
              className="border-l-2 border-accent pl-8 py-4"
            >
              <h3 className="text-2xl font-black uppercase mb-4 italic">{item.title}</h3>
              <p className="text-lg text-text-secondary font-medium">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-20">
          <h4 className="text-sm font-black uppercase tracking-[0.3em] text-white/40 mb-12">Example Artists</h4>
          <div className="flex flex-wrap gap-4">
            {['Rico Milano', 'Artizz', 'Lesj'].map((artist, i) => (
              <Link key={i} href={`/${artist.toLowerCase().replace(' ', '-')}`}>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="px-10 py-6 bg-card border border-white/5 rounded-2xl text-2xl font-black italic uppercase cursor-pointer hover:border-accent/50 transition-colors"
                >
                  {artist}
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Platform Vision */}
      <section className="py-40 bg-accent text-black overflow-hidden relative">
        <div className="absolute top-0 right-0 text-[300px] font-black leading-none opacity-10 pointer-events-none -translate-y-1/4 translate-x-1/4 italic">
          PR3CIO
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <motion.div {...fadeInUp}>
            <span className="font-black uppercase tracking-[0.3em] text-sm mb-4 block">05 / Vision</span>
            <h2 className="text-6xl md:text-[100px] font-black tracking-tighter uppercase leading-[0.9] italic mb-12">
              The Home of <br />Hip Hop's Next <br />Generation.
            </h2>
          </motion.div>
        </div>
      </section>

      {/* 6. Call To Action */}
      <section className="py-40 px-6 md:px-12 text-center">
        <motion.div {...fadeInUp}>
          <h2 className="text-4xl md:text-6xl font-black uppercase italic mb-16">Ready to lead the discovery?</h2>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <Link href="/explore" className="px-12 py-6 bg-white text-black text-xl font-black uppercase rounded-full hover:scale-105 transition-transform italic">
              Explore Artists
            </Link>
            <Link href="/studio" className="px-12 py-6 border-2 border-white text-white text-xl font-black uppercase rounded-full hover:bg-white hover:text-black transition-all italic">
              Upload Music
            </Link>
          </div>
        </motion.div>
      </section>

      <footer className="py-20 border-t border-white/5 text-center text-white/30 text-sm font-bold uppercase tracking-widest">
        PR3CIO © 2026 / For Luis Santos
      </footer>
    </div>
  );
}
