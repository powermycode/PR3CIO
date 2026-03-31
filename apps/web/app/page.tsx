"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Headphones, Radio, TrendingUp } from "lucide-react";
import Link from "next/link";
import PremiumHero from "../components/PremiumHero";
import ArtistCardV2 from "../components/ArtistCardV2";
import { artists } from "./data/artists";

export default function PremiumHomePage() {
  const featuredArtists = artists.filter((a) => a.sponsored);
  const trendingArtists = artists.slice(0, 4);

  return (
    <div className="space-y-24 pb-24">
      <PremiumHero />

      <section className="max-w-[1400px] mx-auto px-6 space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-10 h-1 bg-accent rounded-full" />
              <span className="text-xs font-black uppercase tracking-[0.3em] text-accent">
                Featured
              </span>
            </div>
            <h2 className="section-title">Sponsored Artists</h2>
            <p className="section-subtitle">
              Hand-picked talent with the most momentum right now
            </p>
          </div>
          <Link
            href="/explore"
            className="btn-secondary self-start md:self-auto"
          >
            View All Artists
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredArtists.map((artist, i) => (
            <ArtistCardV2
              key={artist.slug}
              artist={artist}
              index={i}
              size="large"
            />
          ))}
        </div>
      </section>

      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Radio size={20} className="text-accent" />
                  <span className="text-xs font-black uppercase tracking-[0.3em] text-accent">
                    The Platform
                  </span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase leading-[0.9]">
                  Built for{" "}
                  <span className="text-gradient-accent">Artists</span>
                </h2>
              </div>

              <p className="text-lg text-text-secondary leading-relaxed">
                PR3CIO gives independent artists the tools they need to succeed:
                AI-powered production, smart distribution, direct fan
                connections, and transparent royalties.
              </p>

              <div className="space-y-4">
                {[
                  {
                    icon: Headphones,
                    title: "Global Distribution",
                    desc: "Reach listeners on every major platform",
                  },
                  {
                    icon: TrendingUp,
                    title: "Real-Time Analytics",
                    desc: "Track your growth with detailed insights",
                  },
                  {
                    icon: Radio,
                    title: "AI Studio Tools",
                    desc: "Create professional tracks with AI assistance",
                  },
                ].map((feature, i) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-surface/50 border border-white/5"
                  >
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <feature.icon size={22} className="text-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">{feature.title}</h4>
                      <p className="text-sm text-text-secondary">
                        {feature.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-6"
            >
              {trendingArtists.map((artist, i) => (
                <motion.div
                  key={artist.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`group cursor-pointer ${i % 2 !== 0 ? "mt-8" : ""}`}
                >
                  <Link href={`/artist/${artist.slug}`}>
                    <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-black/50">
                      <img
                        src={artist.image}
                        alt={artist.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="font-black text-xl uppercase tracking-tight">
                          {artist.name}
                        </h3>
                        <p className="text-xs text-white/70 font-bold uppercase tracking-wider mt-1">
                          {artist.genre} • {artist.listeners} listeners
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="section-title">Discover Artists</h2>
          <p className="section-subtitle max-w-xl mx-auto">
            From emerging talent to chart-topping hits, explore the most
            exciting artists on PR3CIO
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {[
            "Hip Hop",
            "Trap",
            "R&B",
            "Drill",
            "Lo-Fi",
            "Boom Bap",
            "Dancehall",
            "Afrobeats",
          ].map((genre, i) => (
            <Link
              key={genre}
              href={`/explore?genre=${encodeURIComponent(genre)}`}
            >
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="px-6 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-accent hover:border-accent text-sm font-bold uppercase tracking-wider transition-all"
              >
                {genre}
              </motion.button>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 text-center space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase">
            Ready to make your mark?
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            Join thousands of artists already building their careers on PR3CIO
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/studio"
            className="btn-primary px-10 py-5 text-lg shadow-2xl shadow-accent/30"
          >
            Start Creating
            <ArrowRight size={20} />
          </Link>
          <Link href="/explore" className="btn-secondary px-10 py-5 text-lg">
            Explore Music
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
