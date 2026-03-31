"use client";

import React from "react";
import { motion } from "framer-motion";
import { Play, ArrowRight, Sparkles, Headphones } from "lucide-react";
import Link from "next/link";

export default function PremiumHero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden rounded-[3rem]">
      <div className="absolute inset-0 bg-gradient-to-b from-accent/10 via-background to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.15)_0%,transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay" />

      <div className="relative z-10 max-w-6xl w-full mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-3 glass px-5 py-2.5 rounded-full mb-10"
        >
          <Sparkles size={18} className="text-accent animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-white/90">
            The Future of Independent Music
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-10 leading-[0.85]"
        >
          <span className="text-white">NEXT GEN</span>
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent via-purple-400 to-purple-300">
            HIP HOP
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-14 font-medium leading-relaxed"
        >
          PR3CIO connects the world&apos;s most innovative emerging artists with
          global listeners. AI-powered tools. Studio-grade production. Real
          royalties.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/explore"
            className="group flex items-center gap-3 px-10 py-5 bg-accent hover:bg-accent-hover text-white rounded-full font-bold text-lg transition-all shadow-2xl shadow-accent/30 hover:shadow-accent/50 hover:-translate-y-0.5"
          >
            <Headphones size={22} />
            Explore Artists
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
          <Link
            href="/studio"
            className="flex items-center gap-3 px-10 py-5 bg-white/5 hover:bg-white/10 text-white rounded-full font-bold text-lg transition-all border border-white/10 hover:border-white/20"
          >
            Start Creating
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-20 flex items-center justify-center gap-12 text-text-muted"
        >
          <div className="text-center">
            <p className="text-3xl font-black text-white mb-1">500K+</p>
            <p className="text-xs font-bold uppercase tracking-widest">
              Artists
            </p>
          </div>
          <div className="w-px h-12 bg-white/10" />
          <div className="text-center">
            <p className="text-3xl font-black text-white mb-1">50M+</p>
            <p className="text-xs font-bold uppercase tracking-widest">
              Streams
            </p>
          </div>
          <div className="w-px h-12 bg-white/10" />
          <div className="text-center">
            <p className="text-3xl font-black text-white mb-1">$2M+</p>
            <p className="text-xs font-bold uppercase tracking-widest">
              Paid Out
            </p>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
