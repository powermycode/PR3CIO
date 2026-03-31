"use client";

import React from "react";
import { motion } from "framer-motion";
import { Play, Pause, MoreHorizontal, Heart, Clock } from "lucide-react";
import { useAudio } from "../lib/audio-context";

interface TrackCardProps {
  id: string;
  title: string;
  artist: string;
  cover: string;
  audioUrl: string;
  duration?: string;
  index?: number;
  showIndex?: boolean;
  onPlay?: () => void;
}

export default function TrackCard({
  id,
  title,
  artist,
  cover,
  audioUrl,
  duration = "3:24",
  index = 0,
  showIndex = false,
  onPlay,
}: TrackCardProps) {
  const { currentTrack, isPlaying, playTrack, togglePlay } = useAudio();
  const isCurrentTrack = currentTrack?.id === id;
  const isTrackPlaying = isCurrentTrack && isPlaying;

  const handlePlay = () => {
    if (onPlay) onPlay();
    if (isCurrentTrack) {
      togglePlay();
    } else {
      playTrack({ id, title, artist, audioUrl, cover });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className={`
        group flex items-center gap-4 p-3 rounded-2xl transition-all duration-200 cursor-pointer
        ${isCurrentTrack ? "bg-surface-2" : "hover:bg-surface/60"}
      `}
    >
      <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 shadow-lg">
        <img src={cover} alt={title} className="w-full h-full object-cover" />
        <div
          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
          onClick={handlePlay}
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shadow-lg shadow-accent/30"
          >
            {isTrackPlaying ? (
              <Pause size={18} fill="white" className="text-white" />
            ) : (
              <Play size={18} fill="white" className="text-white ml-0.5" />
            )}
          </motion.div>
        </div>
        {isCurrentTrack && !isTrackPlaying && (
          <div
            className="absolute inset-0 bg-black/60 flex items-center justify-center"
            onClick={handlePlay}
          >
            <Play size={18} fill="white" className="text-white ml-0.5" />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h4
          className={`
          font-bold truncate transition-colors
          ${isCurrentTrack ? "text-accent" : "text-white group-hover:text-accent"}
        `}
        >
          {title}
        </h4>
        <p className="text-sm text-text-secondary truncate">{artist}</p>
      </div>

      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
          <Heart size={18} className="text-text-secondary hover:text-red-400" />
        </button>
        <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
          <MoreHorizontal size={18} className="text-text-secondary" />
        </button>
      </div>

      <div className="hidden sm:flex items-center gap-1 text-text-muted text-xs font-medium w-12 justify-end">
        <Clock size={14} />
        {duration}
      </div>
    </motion.div>
  );
}
