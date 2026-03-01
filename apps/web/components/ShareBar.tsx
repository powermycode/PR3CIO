'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, Link as LinkIcon, Twitter, Instagram, Check } from 'lucide-react';

interface ShareBarProps {
  slug: string;
  name: string;
}

export default function ShareBar({ slug, name }: ShareBarProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/artist/${slug}` : '';

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openTwitterShare = () => {
    const text = encodeURIComponent(`Check out ${name} on PR3CIO! 🔥 #PR3CIO #MusicDiscovery`);
    const url = encodeURIComponent(shareUrl);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  const openInstagramShare = () => {
    // Note: Instagram doesn't have a direct share intent like Twitter, typically redirected to IG
    window.open(`https://www.instagram.com/`, '_blank');
  };

  return (
    <div className="flex flex-wrap items-center gap-4 bg-surface/50 backdrop-blur-md p-4 rounded-2xl border border-white/5">
      <div className="flex items-center gap-2 text-text-secondary mr-2">
        <Share2 size={18} />
        <span className="text-xs font-bold uppercase tracking-widest">Share Artist</span>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={copyLink}
        className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors group"
      >
        {copied ? (
          <Check size={16} className="text-green-500" />
        ) : (
          <LinkIcon size={16} className="text-accent group-hover:text-white" />
        )}
        <span className="text-sm font-bold">{copied ? 'Copied' : 'Copy Link'}</span>
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={openTwitterShare}
        className="flex items-center gap-2 px-4 py-2 bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 rounded-full transition-colors group"
      >
        <Twitter size={16} className="text-[#1DA1F2]" />
        <span className="text-sm font-bold text-[#1DA1F2]">Tweet Track</span>
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={openInstagramShare}
        className="flex items-center gap-2 px-4 py-2 bg-[#E1306C]/10 hover:bg-[#E1306C]/20 rounded-full transition-colors group"
      >
        <Instagram size={16} className="text-[#E1306C]" />
        <span className="text-sm font-bold text-[#E1306C]">Instagram</span>
      </motion.button>
    </div>
  );
}
