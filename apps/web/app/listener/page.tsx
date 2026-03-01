'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const ALBUMS = [
  { title: "Neon Nights", artist: "LesJ", cover: "/artists/LesjPr3cio.png" },
  { title: "Digital Canvas", artist: "Artizz", cover: "/artists/ArtizzPr3cio.png" },
  { title: "Cinematic Drop", artist: "Rico Milano", cover: "/artists/RicoMilanoPr3cio.png" },
  { title: "AI Frequencies", artist: "LesJ", cover: "/artists/LesjPr3cio.png" },
  { title: "Rap Architect", artist: "Artizz", cover: "/artists/ArtizzPr3cio.png" },
  { title: "Global Energy", artist: "Rico Milano", cover: "/artists/RicoMilanoPr3cio.png" },
];

const Section = ({ title, items }: { title: string, items: typeof ALBUMS }) => (
  <div className="mb-12">
    <h2 className="text-2xl font-bold mb-6 tracking-tight text-primary">{title}</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {items.map((item, idx) => (
        <motion.div 
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05 }}
          className="group cursor-pointer"
        >
          <div className="relative aspect-square w-full rounded-md overflow-hidden bg-card mb-3 shadow-lg">
            <Image
              src={item.cover}
              alt={item.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <h3 className="font-semibold text-sm truncate text-primary">{item.title}</h3>
          <p className="text-xs text-secondary truncate">{item.artist}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

export default function ListenerPage() {
  return (
    <div className="w-full flex flex-col py-8 px-6 max-w-7xl mx-auto">
      <header className="mb-10">
        <h1 className="text-4xl font-black uppercase tracking-tighter text-primary">Discover Feed</h1>
      </header>

      <Section title="New Releases" items={ALBUMS.slice(0, 6)} />
      <Section title="Trending Artists" items={ALBUMS.slice(0, 4).reverse()} />
      <Section title="Recommended for You" items={ALBUMS.slice(1, 5)} />
    </div>
  );
}
