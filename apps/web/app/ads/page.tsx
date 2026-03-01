'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const artists = [
  {
    name: 'LesJ',
    fullName: 'LesjPr3cio',
    image: '/artists/LesjPr3cio.png',
  },
  {
    name: 'Artizz',
    fullName: 'ArtizzPr3cio',
    image: '/artists/ArtizzPr3cio.png',
  },
  {
    name: 'Rico Milano',
    fullName: 'RicoMilanoPr3cio',
    image: '/artists/RicoMilanoPr3cio.png',
  },
];

const WaveformBackground = () => {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
      overflow: 'hidden',
      opacity: 0.1,
      pointerEvents: 'none',
    }}>
      <svg width="100%" height="100%" viewBox="0 0 1000 1000" preserveAspectRatio="none">
        {[...Array(5)].map((_, i) => (
          <motion.path
            key={i}
            d="M0,500 Q250,400 500,500 T1000,500"
            fill="none"
            stroke="#8a55f7"
            strokeWidth="2"
            animate={{
              d: [
                `M0,${500 + i * 20} Q250,${400 - i * 50} 500,${500 + i * 20} T1000,${500 + i * 20}`,
                `M0,${500 + i * 20} Q250,${600 + i * 50} 500,${500 + i * 20} T1000,${500 + i * 20}`,
                `M0,${500 + i * 20} Q250,${400 - i * 50} 500,${500 + i * 20} T1000,${500 + i * 20}`,
              ]
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </svg>
    </div>
  );
};

const ArtistCard = ({ artist, index }: { artist: typeof artists[0], index: number }) => {
  const [expanded, setExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: index * 0.1,
        layout: { duration: 0.4, ease: "circOut" }
      }}
      className="ads-artist-card"
      style={{
        cursor: 'pointer',
        width: expanded ? '100%' : 'auto',
        maxWidth: expanded ? '1200px' : '400px',
        gridColumn: expanded ? '1 / -1' : 'auto',
      }}
      onClick={() => setExpanded(!expanded)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div layout className="ads-artist-image-wrap" style={{ height: expanded ? '600px' : '400px' }}>
        <motion.div
          animate={{
            filter: isHovered || expanded ? 'grayscale(0%)' : 'grayscale(100%)',
            scale: isHovered ? 1.05 : 1,
            boxShadow: isHovered || expanded ? '0 0 30px rgba(138, 85, 247, 0.4)' : 'none',
          }}
          transition={{ duration: 0.4 }}
          style={{ width: '100%', height: '100%' }}
        >
          <Image
            src={artist.image}
            alt={artist.name}
            width={800}
            height={800}
            className="ads-artist-image"
            priority
          />
        </motion.div>
      </motion.div>
      <motion.div layout className="ads-artist-info">
        <motion.h3 layout className="ads-artist-name">{artist.name}</motion.h3>
        <motion.p layout className="ads-artist-meta">{artist.fullName}</motion.p>
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ marginTop: '20px', color: 'rgba(255, 255, 255, 0.7)' }}
            >
              <p>
                A visionary artist pushing the boundaries of hip hop through cinematic storytelling 
                and innovative audio landscapes. Experience the next era of PR3CIO.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default function ArtistDiscoveryPage() {
  return (
    <main className="ads-page" style={{ minHeight: '100vh', position: 'relative' }}>
      <WaveformBackground />

      {/* Header */}
      <nav style={{
        padding: '30px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Image src="/logo.png" alt="PR3CIO Logo" width={40} height={40} className="glow-pulse" />
          <span style={{ fontWeight: 900, fontSize: '1.5rem', letterSpacing: '2px' }}>PR3CIO</span>
        </div>
        <Link href="/">
          <button className="ads-btn ads-btn-secondary">Explore Platform</button>
        </Link>
      </nav>

      {/* Title */}
      <section style={{ textAlign: 'center', padding: '60px 20px' }}>
        <motion.h2
          initial={{ opacity: 0, letterSpacing: '0.1em' }}
          animate={{ opacity: 1, letterSpacing: '0.4em' }}
          transition={{ duration: 1 }}
          style={{
            fontSize: '1.2rem',
            fontWeight: 800,
            color: 'var(--accent)',
            textTransform: 'uppercase',
          }}
        >
          HIP HOP • USA
        </motion.h2>
      </section>

      {/* Artist Grid */}
      <section style={{ 
        maxWidth: '1400px', 
        margin: '0 auto', 
        padding: '0 40px 100px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '40px',
        alignItems: 'start'
      }}>
        {artists.map((artist, index) => (
          <ArtistCard key={artist.name} artist={artist} index={index} />
        ))}
      </section>

      {/* Footer */}
      <footer style={{
        padding: '100px 40px',
        textAlign: 'center',
        background: 'linear-gradient(to top, rgba(138, 85, 247, 0.05), transparent)',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <p style={{
            fontSize: '1.5rem',
            fontWeight: 500,
            marginBottom: '40px',
            lineHeight: 1.5,
            color: 'rgba(255, 255, 255, 0.8)',
          }}>
            PR3CIO is a premium music discovery and creator platform designed for the next era of audio.
          </p>
          <Link href="/">
            <button className="ads-btn ads-btn-primary">Explore Platform →</button>
          </Link>
        </div>
        <div style={{ marginTop: '60px', opacity: 0.3, fontSize: '0.8rem', letterSpacing: '2px' }}>
          © 2026 PR3CIO. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </main>
  );
}
