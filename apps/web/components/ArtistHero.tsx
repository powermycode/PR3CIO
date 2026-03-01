'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface ArtistHeroProps {
  artist: {
    name: string;
    fullName: string;
    image: string;
    description: string;
  };
  index: number;
}

export function ArtistHero({ artist, index }: ArtistHeroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="w-full max-w-[420px] mx-auto mb-12 bg-card rounded-xl overflow-hidden border border-white/5 shadow-xl"
    >
      <div className="relative w-full h-[60vh] max-h-[70vh]">
        <Image
          src={artist.image}
          alt={artist.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-black/40 to-transparent" />
      </div>

      <div className="p-6 text-center -mt-20 relative z-10 space-y-4">
        <div>
          <h3 className="text-3xl font-black uppercase tracking-tighter text-primary">{artist.name}</h3>
          <p className="text-accent font-bold text-sm tracking-widest uppercase mb-2">{artist.fullName}</p>
          <p className="text-secondary text-sm leading-relaxed">
            {artist.description}
          </p>
        </div>
        
        <Link href={`/artist`} className="inline-block w-full">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-6 py-4 bg-accent text-primary rounded-full font-bold uppercase tracking-widest text-sm hover:bg-opacity-90 transition-colors"
          >
            View Profile
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}
