'use client';

import React from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Play, Heart, Disc3, Users, Globe, Music2 } from "lucide-react";
import Link from "next/link";
import { artists } from "../../../data/artists";
import ShareBar from "../../../components/ShareBar";

export default function ArtistProfilePage() {
  const { slug } = useParams();
  
  const artist = artists.find(a => a.slug === slug);
  
  if (!artist) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center text-center p-8">
        <h1 className="text-4xl font-black mb-4 uppercase">Artist Not Found</h1>
        <p className="text-text-secondary mb-8">The artist you are looking for does not exist in our system.</p>
        <Link href="/explore" className="px-8 py-3 bg-accent rounded-full font-bold">Back to Explore</Link>
      </div>
    );
  }

  const otherArtists = artists.filter(a => a.slug !== slug);

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] md:h-[70vh] flex items-end p-6 md:p-12 overflow-hidden pt-20 md:pt-24">
        <div className="absolute inset-0 z-0">
          <img 
            src={artist.image} 
            alt={artist.name}
            className="w-full h-full object-cover scale-105 blur-2xl opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8 w-full max-w-[1400px] mx-auto text-center md:text-left">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 flex justify-center w-full md:w-auto"
          >
            <div className="w-full max-w-md md:w-72 md:h-72 aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-white/5 flex-shrink-0">
              <img src={artist.image} alt={artist.name} className="w-full h-full object-cover" />
            </div>
          </motion.div>

          <div className="flex-1 space-y-4 w-full">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              {artist.verified && (
                <div className="flex items-center gap-2 bg-accent/20 text-accent px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-accent/30">
                  <Disc3 size={14} className="animate-spin-slow" />
                  Verified Artist
                </div>
              )}
              {artist.sponsored && (
                <div className="bg-yellow-500/10 text-yellow-500 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-yellow-500/20">
                  Sponsored
                </div>
              )}
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none mb-2">
              {artist.name}
            </h1>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-6 text-text-secondary font-bold text-base md:text-lg">
              <span className="flex items-center gap-2"><Users size={20} className="text-accent" /> {artist.listeners} Listeners</span>
              <span className="flex items-center gap-2"><Globe size={20} className="text-accent" /> {artist.country}</span>
              <span className="flex items-center gap-2 uppercase tracking-widest text-sm bg-surface px-3 py-1 rounded-lg border border-white/5">{artist.genre}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto p-8 md:p-12 space-y-16">
        {/* Stats & Actions */}
        <section className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="flex-1 space-y-10 w-full">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-6">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-accent rounded-full font-black text-xl flex items-center gap-3 shadow-xl shadow-accent/20 hover:bg-accent/90 transition-all"
              >
                <Play fill="white" size={24} />
                Play Track
              </motion.button>
              <button className="px-10 py-4 rounded-full border-2 border-white/10 font-black text-xl hover:bg-white/5 transition-all uppercase tracking-widest">
                Follow
              </button>
              <motion.div whileHover={{ scale: 1.1 }} className="p-4 bg-surface rounded-full border border-white/5 cursor-pointer">
                <Heart size={28} className="text-text-secondary hover:text-red-500 transition-colors" />
              </motion.div>
            </div>

            {/* Bio Section */}
            <div className="space-y-4">
              <h2 className="text-2xl font-black uppercase tracking-tight">Biography</h2>
              <p className="text-text-secondary text-lg leading-relaxed max-w-3xl">
                {artist.bio || `${artist.name} is a talented ${artist.genre} artist from ${artist.country} making waves with ${artist.listeners} monthly listeners.`}
              </p>
            </div>

            {/* Share Section */}
            <div className="space-y-4 pt-4">
              <ShareBar slug={artist.slug} name={artist.name} />
            </div>
          </div>

          {/* Stats Sidebar */}
          <div className="w-full lg:w-80 space-y-6">
            <div className="bg-surface border border-white/5 p-8 rounded-3xl space-y-6">
              <h3 className="font-black uppercase tracking-widest text-sm text-text-secondary border-b border-white/5 pb-4">Performance</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary font-medium">Rank</span>
                  <span className="font-black text-accent">#12 Trending</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary font-medium">Monthly Listeners</span>
                  <span className="font-black">{artist.listeners}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary font-medium">Followers</span>
                  <span className="font-black">84.2K</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary font-medium">Total Streams</span>
                  <span className="font-black">4.2M</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Music Section (Latest Track) */}
        <section className="space-y-8">
          <h2 className="text-3xl font-black uppercase tracking-tight flex items-center gap-3">
            <Music2 className="text-accent" />
            Latest Release
          </h2>
          <div className="bg-gradient-to-r from-surface to-background border border-white/5 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 group">
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-2xl overflow-hidden shadow-2xl flex-shrink-0 relative">
              <img src={artist.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Play fill="white" size={32} />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left space-y-2">
              <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
                {artist.featuredTrack?.title || `${artist.name} Special Mix`}
              </h3>
              <p className="text-text-secondary font-bold text-xl uppercase tracking-widest">Single • 2024</p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4">
                <button className="bg-white text-black px-8 py-3 rounded-full font-black uppercase tracking-widest hover:bg-gray-200 transition-colors">
                  Stream Now
                </button>
                <button className="bg-transparent border border-white/20 px-8 py-3 rounded-full font-black uppercase tracking-widest hover:bg-white/5 transition-colors">
                  Add to Library
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Discovery Section */}
        <section className="space-y-8 pb-12">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-black uppercase tracking-tight">More Artists You May Like</h2>
            <Link href="/explore" className="text-accent font-bold uppercase text-sm tracking-widest hover:underline">View All</Link>
          </div>
          
          <div className="flex gap-6 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4 snap-x">
            {otherArtists.map((other, i) => (
              <motion.div
                key={other.slug}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex-none w-[240px] md:w-[280px] snap-start group"
              >
                <Link href={`/artist/${other.slug}`}>
                  <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 shadow-xl border border-white/5">
                    <img 
                      src={other.image} 
                      alt={other.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-14 h-14 bg-accent rounded-full flex items-center justify-center shadow-lg">
                        <Play fill="white" size={24} />
                      </div>
                    </div>
                  </div>
                  <h3 className="font-black text-xl uppercase tracking-tighter truncate group-hover:text-accent transition-colors">
                    {other.name}
                  </h3>
                  <p className="text-text-secondary font-bold uppercase tracking-widest text-xs">
                    {other.genre} • {other.listeners}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
