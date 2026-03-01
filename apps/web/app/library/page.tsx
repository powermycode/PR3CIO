'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function LibraryPage() {
  return (
    <main className="ads-page" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center',
      position: 'relative',
      background: 'radial-gradient(circle at center, rgba(138, 85, 247, 0.05) 0%, #000 80%)'
    }}>
      {/* Top Navbar */}
      <nav style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        padding: '30px 40px',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        zIndex: 10,
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Image src="/logo.png" alt="PR3CIO Logo" width={35} height={35} className="glow-pulse" />
          <span style={{ fontWeight: 900, fontSize: '1.2rem', letterSpacing: '2px' }}>PR3CIO</span>
        </Link>
      </nav>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', padding: '0 20px' }}
      >
        <h1 style={{ fontSize: '4rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', margin: '0 0 15px' }}>
          Your Library
        </h1>
        <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 40px' }}>
          Your saved music and playlists will appear here.
        </p>
        <Link href="/explore">
          <button className="ads-btn ads-btn-primary" style={{ padding: '18px 40px', fontSize: '1rem' }}>
            Explore Artists →
          </button>
        </Link>
      </motion.div>

      {/* Bottom Navigation */}
      <nav style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        padding: '40px',
        display: 'flex',
        justifyContent: 'center',
        gap: '60px',
        zIndex: 10,
      }}>
        {[
          { name: 'Home', path: '/' },
          { name: 'Explore', path: '/explore' },
          { name: 'Library', path: '/library' },
        ].map((item) => (
          <Link key={item.name} href={item.path}>
            <motion.span
              whileHover={{ color: 'var(--accent)', scale: 1.1 }}
              style={{
                fontSize: '0.9rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: item.path === '/library' ? 'var(--accent)' : 'rgba(255, 255, 255, 0.5)',
                cursor: 'pointer',
                transition: 'color 0.3s'
              }}
            >
              {item.name}
            </motion.span>
          </Link>
        ))}
      </nav>
    </main>
  );
}
