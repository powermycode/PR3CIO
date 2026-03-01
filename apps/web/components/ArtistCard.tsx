'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface ArtistCardProps {
  artist: {
    name: string;
    fullName: string;
    image: string;
  };
  index: number;
}

export function ArtistCard({ artist, index }: ArtistCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group bg-card rounded-xl overflow-hidden shadow-lg border border-white/5"
    >
      <Link href="/explore">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={artist.image}
            alt={artist.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />
        </div>
        <div className="p-4 text-center">
          <h3 className="font-bold text-lg">{artist.name}</h3>
          <p className="text-accent text-xs font-semibold uppercase tracking-wider">{artist.fullName}</p>
        </div>
      </Link>
    </motion.div>
  );
}
