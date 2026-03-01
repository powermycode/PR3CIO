'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="w-full py-16 px-6 md:py-32 flex flex-col items-center text-center">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight max-w-4xl"
      >
        Discover the Next Generation of Hip Hop Artists
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-6 text-secondary text-base md:text-lg max-w-2xl"
      >
        PR3CIO connects emerging artists with global listeners using AI powered music tools.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-10 flex flex-col md:flex-row w-full md:w-auto gap-4"
      >
        <Link href="/explore" className="w-full md:w-auto">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full md:w-auto px-6 py-4 bg-primary text-background rounded-full font-bold uppercase tracking-widest text-sm"
          >
            Explore Artists
          </motion.button>
        </Link>
        <Link href="/signup" className="w-full md:w-auto">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full md:w-auto px-6 py-4 border-2 border-primary/20 text-primary rounded-full font-bold uppercase tracking-widest text-sm hover:border-primary transition-colors"
          >
            Create Account
          </motion.button>
        </Link>
      </motion.div>
    </section>
  );
}
