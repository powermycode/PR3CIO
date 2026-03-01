'use client';

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Play, ArrowRight, Disc3 } from "lucide-react";
import Link from "next/link";
import { artists } from "../data/artists";
export default function MarketingLandingPage() {
  const { marketingSlug } = useParams();
  const router = useRouter();
  
  const artist = artists.find(a => a.slug === marketingSlug);
  
  // If no artist found, this might be a 404 or another route
  // In a real app, we might want to handle this differently, but for now we follow the "Sponsored Artist Landing System"
  if (!artist) {
    return null; // Next.js will eventually 404 if no other route matches
  }

  return (
    <div className="fixed inset-0 z-[100] bg-background overflow-y-auto no-scrollbar">
      <section className="relative min-h-screen flex items-center justify-center p-8 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={artist.image} 
            alt={artist.name}
            className="w-full h-full object-cover scale-110 opacity-40 blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-background/80 to-background" />
        </div>

        <div className="relative z-10 max-w-5xl w-full text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-center gap-2 text-accent font-black uppercase tracking-[0.3em] text-sm">
              <Disc3 size={18} className="animate-spin-slow" />
              Featured Spotlight
            </div>
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-none">
              {artist.name}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative w-64 h-64 md:w-96 md:h-96 mx-auto rounded-3xl overflow-hidden shadow-2xl border border-white/10"
          >
            <img src={artist.image} alt={artist.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/20" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link 
              href={`/artist/${artist.slug}`}
              className="w-full sm:w-auto px-12 py-5 bg-accent hover:bg-accent/90 text-white rounded-full font-black text-xl transition-all shadow-2xl shadow-accent/40 flex items-center justify-center gap-3 group"
            >
              <Play fill="white" size={24} />
              Play Track
            </Link>
            <Link 
              href="/explore"
              className="w-full sm:w-auto px-12 py-5 bg-white/5 hover:bg-white/10 text-white rounded-full font-black text-xl transition-all border border-white/10 flex items-center justify-center gap-3"
            >
              Discover more artists on PR3CIO
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Floating Badges */}
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-20 right-10 md:right-40 bg-surface/80 backdrop-blur-xl p-6 rounded-3xl border border-white/10 hidden md:block"
        >
          <p className="text-accent font-black text-3xl">{artist.listeners}</p>
          <p className="text-text-secondary font-bold uppercase tracking-widest text-xs">Monthly Listeners</p>
        </motion.div>
      </section>
    </div>
  );
}
