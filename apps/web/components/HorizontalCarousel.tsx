'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';

interface CarouselItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  link: string;
}

interface HorizontalCarouselProps {
  title: string;
  items: CarouselItem[];
}

export function HorizontalCarousel({ title, items }: HorizontalCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="mb-12 pl-4 md:pl-8 overflow-hidden">
      <h2 className="text-2xl font-bold mb-6 tracking-tight text-primary px-2">{title}</h2>
      
      <div 
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto no-scrollbar pb-6 pr-8 snap-x snap-mandatory"
      >
        {items.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="flex-none w-[160px] md:w-[200px] snap-start group relative"
          >
            <Link href={item.link} className="block">
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-surface mb-4 shadow-lg group-hover:shadow-2xl transition-all duration-300">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute bottom-3 right-3 bg-accent rounded-full p-3 shadow-xl flex items-center justify-center translate-y-2 group-hover:translate-y-0 transition-all duration-300 opacity-0 group-hover:opacity-100"
                >
                  <Play fill="currentColor" size={20} className="text-white ml-1" />
                </motion.div>
              </div>
              <h3 className="font-semibold text-base truncate text-primary px-1">{item.title}</h3>
              <p className="text-sm text-secondary truncate px-1 mt-1">{item.subtitle}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
