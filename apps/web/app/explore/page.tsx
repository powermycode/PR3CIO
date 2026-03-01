'use client';

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Play, Filter, Disc3 } from "lucide-react";
import Link from "next/link";
import { artists } from "../data/artists";

const GENRES = ["All", "Hip Hop", "Trap", "R&B", "Drill", "Lo-Fi", "Boom Bap"];

export default function ExplorePage() {
  const [selectedGenre, setSelectedGenre] = useState("All");

  const filteredArtists = selectedGenre === "All"
    ? artists
    : artists.filter(a => a.genre === selectedGenre);

  // Sponsored/Featured top row
  const featuredArtists = artists.filter(a => a.sponsored);

  return (
    <div className="space-y-12 max-w-[1200px] mx-auto">
      <header className="space-y-6">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight uppercase">EXPLORE</h1>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-accent transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search artists..."
              className="w-full bg-surface border border-white/5 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all text-lg"
            />
          </div>
          <button className="flex items-center justify-center gap-2 bg-surface border border-white/5 px-6 py-4 rounded-2xl font-bold hover:bg-white/5 transition-colors">
            <Filter size={20} />
            Filters
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
          {GENRES.map((genre) => (
            <button 
              key={genre} 
              onClick={() => setSelectedGenre(genre)}
              className={`px-6 py-2 rounded-full border transition-all whitespace-nowrap font-semibold ${
                selectedGenre === genre 
                  ? "bg-accent border-accent text-white" 
                  : "bg-surface border-white/5 text-text-secondary hover:border-accent/50"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </header>

      {/* Featured Artists Top Row */}
      {selectedGenre === "All" && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black uppercase tracking-widest flex items-center gap-2">
              <span className="w-8 h-[2px] bg-accent" />
              Featured Spotlight
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredArtists.map((artist, i) => (
              <motion.div
                key={`featured-${artist.slug}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="relative h-48 rounded-3xl overflow-hidden group cursor-pointer border border-white/10"
              >
                <Link href={`/artist/${artist.slug}`}>
                  <img src={artist.image} className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent p-6 flex flex-col justify-center">
                    <p className="text-accent text-[10px] font-black uppercase tracking-[0.3em] mb-1">Sponsored</p>
                    <h3 className="text-2xl font-black uppercase tracking-tighter">{artist.name}</h3>
                    <p className="text-text-secondary text-xs font-bold uppercase">{artist.genre} • {artist.listeners}</p>
                  </div>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                      <Play fill="white" size={20} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Grid Section */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-black uppercase tracking-tight">{selectedGenre} Discovery</h2>
          <span className="text-text-secondary text-sm font-bold uppercase tracking-widest">{filteredArtists.length} Artists</span>
        </div>

        {filteredArtists.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredArtists.map((artist, i) => (
              <motion.div
                key={artist.slug}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="group cursor-pointer"
              >
                <Link href={`/artist/${artist.slug}`}>
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4 shadow-xl border border-white/5">
                    <img 
                      src={artist.image} 
                      alt={artist.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                    
                    <div className="absolute top-4 left-4">
                      <div className="bg-accent/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white flex items-center gap-1">
                        <Disc3 size={12} className="animate-spin-slow" />
                        {artist.genre}
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-2xl font-black text-white group-hover:text-accent transition-colors truncate uppercase tracking-tighter">
                          {artist.name}
                        </h3>
                        {artist.verified && (
                          <div className="w-4 h-4 bg-accent rounded-full flex items-center justify-center">
                            <svg viewBox="0 0 24 24" fill="none" className="w-2.5 h-2.5 text-white stroke-[4]" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17L4 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          </div>
                        )}
                      </div>
                      <p className="text-gray-300 text-sm font-bold uppercase tracking-wider">
                        {artist.listeners} Listeners
                      </p>
                    </div>

                    <div className="absolute top-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-lg">
                        <Play fill="white" size={20} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="h-64 flex flex-col items-center justify-center text-text-secondary border-2 border-dashed border-white/10 rounded-3xl">
            <Search size={48} className="mb-4 opacity-20" />
            <p className="font-bold uppercase tracking-widest">No artists in {selectedGenre} yet</p>
            <button 
              onClick={() => setSelectedGenre("All")}
              className="mt-4 text-accent font-black uppercase tracking-widest text-sm hover:underline"
            >
              Explore All Artists
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
