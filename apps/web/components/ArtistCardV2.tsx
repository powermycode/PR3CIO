"use client";

import React from "react";
import { motion } from "framer-motion";
import { Play, Verified, Headphones } from "lucide-react";
import Link from "next/link";
import { Artist } from "../data/artists";

interface ArtistCardV2Props {
  artist: Artist;
  index?: number;
  size?: "default" | "large" | "small";
  showStats?: boolean;
}

export default function ArtistCardV2({
  artist,
  index = 0,
  size = "default",
  showStats = true,
}: ArtistCardV2Props) {
  const isLarge = size === "large";
  const isSmall = size === "small";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <Link href={`/artist/${artist.slug}`} className="block">
        <div
          className={`
          relative rounded-3xl overflow-hidden shadow-2xl shadow-black/50
          ${isLarge ? "aspect-[3/4]" : isSmall ? "aspect-square" : "aspect-[3/4]"}
          ${!isSmall ? "border border-white/5" : ""}
        `}
        >
          <img
            src={artist.image}
            alt={artist.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

          {artist.sponsored && (
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1.5 bg-accent/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-lg">
                Featured
              </span>
            </div>
          )}

          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 translate-y-2 group-hover:translate-y-0">
            <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center shadow-2xl shadow-accent/40">
              <Play size={26} fill="white" className="text-white ml-1" />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-center gap-2 mb-2">
              <h3
                className={`
                font-black text-white uppercase tracking-tight truncate
                ${isLarge ? "text-4xl" : "text-2xl"}
              `}
              >
                {artist.name}
              </h3>
              {artist.verified && (
                <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                  <Verified size={12} className="text-white" />
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 text-white/70">
              <span className="text-xs font-bold uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full">
                {artist.genre}
              </span>
              {showStats && (
                <span className="text-xs font-medium flex items-center gap-1.5">
                  <Headphones size={14} />
                  {artist.listeners}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
