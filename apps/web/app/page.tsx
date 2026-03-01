'use client';

import React from "react";
import { motion } from "framer-motion";
import { Play, ArrowRight, Disc3, Music2, Star } from "lucide-react";
import Link from "next/link";
import { artists } from "../data/artists";

export default function HomePage() {
  const sponsoredArtists = artists.filter(a => a.sponsored);

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center text-center px-4 overflow-hidden rounded-[3rem] bg-gradient-to-b from-accent/20 via-background to-background border border-white/5">
        <div className="relative z-10 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 mb-8"
          >
            <Star size={16} className="text-yellow-500 fill-yellow-500" />
            <span className="text-xs font-black uppercase tracking-[0.2em] text-white">The Future of Sound is Here</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.9] uppercase"
          >
            DISCOVER THE <span className="text-accent underline decoration-white/10 underline-offset-8">NEXT GEN</span> OF HIP HOP
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-text-secondary mb-12 max-w-3xl mx-auto font-medium leading-relaxed"
          >
            PR3CIO connects the world's most innovative emerging artists with global listeners using next-gen AI-powered music tools.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link href="/explore" className="w-full sm:w-auto px-12 py-5 bg-accent hover:bg-accent/90 text-white rounded-full font-black text-xl transition-all shadow-2xl shadow-accent/40 flex items-center justify-center gap-3 group">
              Explore Artists
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/signup" className="w-full sm:w-auto px-12 py-5 bg-white/5 hover:bg-white/10 text-white rounded-full font-black text-xl transition-all border border-white/10">
              Create Account
            </Link>
          </motion.div>
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,var(--color-accent)_0%,transparent_70%)] opacity-[0.08] pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />
      </section>

      {/* Sponsored Artists Section */}
      <section className="space-y-12 max-w-[1400px] mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase flex items-center gap-4">
              <span className="w-12 h-1 bg-accent" />
              Sponsored Artists
            </h2>
            <p className="text-text-secondary text-lg font-bold uppercase tracking-[0.2em]">Featured growth partners on PR3CIO</p>
          </div>
          <Link href="/explore" className="text-accent font-black uppercase tracking-widest text-sm hover:underline flex items-center gap-2">
            View All Talent
            <ArrowRight size={18} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sponsoredArtists.map((artist, i) => (
            <motion.div
              key={artist.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="group relative h-[500px] rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl shadow-black"
            >
              <Link href={`/artist/${artist.slug}`} className="block h-full">
                <img 
                  src={artist.image} 
                  alt={artist.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                
                <div className="absolute top-8 right-8">
                  <div className="w-12 h-12 bg-accent/90 backdrop-blur-md rounded-full flex items-center justify-center text-white shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                    <Play fill="white" size={24} />
                  </div>
                </div>

                <div className="absolute bottom-10 left-10 right-10 space-y-3">
                  <div className="bg-accent/20 backdrop-blur-xl border border-accent/30 w-fit px-4 py-1.5 rounded-full flex items-center gap-2">
                    <Disc3 size={14} className="text-accent animate-spin-slow" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-white">Trending Now</span>
                  </div>
                  <h3 className="text-4xl font-black text-white uppercase tracking-tighter">{artist.name}</h3>
                  <div className="flex items-center gap-4 text-gray-300 font-bold uppercase tracking-widest text-xs">
                    <span>{artist.genre}</span>
                    <span className="w-1.5 h-1.5 bg-white/20 rounded-full" />
                    <span>{artist.listeners} Listeners</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Discover Section */}
      <section className="bg-surface/30 border-y border-white/5 py-24 px-4 overflow-hidden relative">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
              THE SOUND OF <br /> <span className="text-accent">TOMORROW</span>
            </h2>
            <p className="text-text-secondary text-xl font-medium leading-relaxed max-w-xl">
              From global icons to emerging creators, PR3CIO is the home of the most exciting talent in music. Join the revolution.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              {["Hip Hop", "Trap", "R&B", "Drill", "LoFi"].map((tag) => (
                <span key={tag} className="px-6 py-2 rounded-full border border-white/10 bg-white/5 font-black uppercase tracking-widest text-xs">{tag}</span>
              ))}
            </div>
          </motion.div>
          
          <div className="grid grid-cols-2 gap-4">
            {artists.slice(0, 4).map((artist, i) => (
              <motion.div
                key={`grid-${artist.slug}-${i}`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className={`aspect-square rounded-3xl overflow-hidden border border-white/10 ${i % 2 !== 0 ? 'mt-8' : ''}`}
              >
                <img src={artist.image} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />
      </section>

      {/* Bottom CTA */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-8">
        <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase">Ready to join the movement?</h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link href="/explore" className="px-10 py-4 bg-white text-black rounded-full font-black uppercase tracking-widest hover:bg-gray-200 transition-all">Start Discovering</Link>
          <Link href="/studio" className="px-10 py-4 bg-accent text-white rounded-full font-black uppercase tracking-widest hover:bg-accent/90 transition-all">Artist Studio</Link>
        </div>
      </section>
    </div>
  );
}
