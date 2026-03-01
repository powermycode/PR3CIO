'use client';

import React from "react";
import { motion } from "framer-motion";
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  Repeat, 
  Shuffle,
  Heart,
  ListMusic
} from "lucide-react";
import { useAudio } from "../lib/audio-context";

export default function MusicPlayer() {
  const { 
    currentTrack, 
    isPlaying, 
    progress, 
    duration, 
    volume, 
    togglePlay 
  } = useAudio();

  if (!currentTrack) return null;

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 h-24 bg-black/95 backdrop-blur-2xl border-t border-white/5 z-[60] px-4 md:px-8 flex items-center justify-between gap-4"
    >
      {/* Current Track Info */}
      <div className="flex items-center gap-4 w-1/3 min-w-0">
        <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 shadow-lg border border-white/5">
          <img src={currentTrack.cover} alt={currentTrack.title} className="w-full h-full object-cover" />
        </div>
        <div className="min-w-0">
          <h4 className="font-bold text-sm text-white truncate">{currentTrack.title}</h4>
          <p className="text-xs text-text-secondary truncate font-medium">{currentTrack.artist}</p>
        </div>
        <Heart size={18} className="text-text-secondary hover:text-accent cursor-pointer transition-colors ml-2 flex-shrink-0" />
      </div>

      {/* Player Controls */}
      <div className="flex flex-col items-center gap-2 flex-1 max-w-xl">
        <div className="flex items-center gap-6">
          <Shuffle size={18} className="text-text-secondary hover:text-white cursor-pointer transition-colors" />
          <SkipBack size={24} className="text-text-secondary hover:text-white fill-current cursor-pointer transition-colors" />
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={togglePlay}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            {isPlaying ? <Pause size={20} fill="black" /> : <Play size={20} fill="black" className="ml-1" />}
          </motion.button>
          <SkipForward size={24} className="text-text-secondary hover:text-white fill-current cursor-pointer transition-colors" />
          <Repeat size={18} className="text-text-secondary hover:text-white cursor-pointer transition-colors" />
        </div>

        <div className="w-full flex items-center gap-3">
          <span className="text-[10px] font-bold text-text-secondary w-10 text-right tabular-nums">
            {formatTime(progress)}
          </span>
          <div className="flex-1 h-1 bg-white/10 rounded-full relative group cursor-pointer overflow-hidden">
            <motion.div 
              className="absolute inset-0 bg-accent rounded-full origin-left"
              style={{ scaleX: duration ? progress / duration : 0 }}
            />
          </div>
          <span className="text-[10px] font-bold text-text-secondary w-10 tabular-nums">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* Volume & Extra Controls */}
      <div className="flex items-center justify-end gap-4 w-1/3">
        <ListMusic size={20} className="text-text-secondary hover:text-white cursor-pointer transition-colors" />
        <div className="flex items-center gap-3 w-32">
          <Volume2 size={18} className="text-text-secondary" />
          <div className="flex-1 h-1 bg-white/10 rounded-full relative overflow-hidden group">
            <motion.div 
              className="absolute inset-0 bg-white rounded-full origin-left"
              style={{ scaleX: volume }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
