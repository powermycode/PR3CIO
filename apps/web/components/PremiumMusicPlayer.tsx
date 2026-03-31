"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Repeat,
  Shuffle,
  Heart,
  ListMusic,
} from "lucide-react";
import { useAudio } from "../lib/audio-context";

export default function PremiumMusicPlayer() {
  const {
    currentTrack,
    isPlaying,
    progress,
    duration,
    volume,
    togglePlay,
    setVolume,
  } = useAudio();

  if (!currentTrack) return null;

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progressPercent = duration ? (progress / duration) * 100 : 0;

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 h-24 bg-background/95 backdrop-blur-2xl border-t border-white/5 z-[60]"
    >
      <div className="h-full max-w-[1800px] mx-auto px-4 md:px-8 flex items-center gap-4">
        <div className="flex items-center gap-4 w-1/3 min-w-0">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 shadow-lg border border-white/10 bg-surface"
          >
            <img
              src={currentTrack.cover}
              alt={currentTrack.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="min-w-0 hidden sm:block">
            <h4 className="font-bold text-sm text-white truncate">
              {currentTrack.title}
            </h4>
            <p className="text-xs text-text-secondary truncate font-medium">
              {currentTrack.artist}
            </p>
          </div>
          <button className="p-2 rounded-full hover:bg-white/5 transition-colors hidden sm:block">
            <Heart
              size={18}
              className="text-text-secondary hover:text-red-400"
            />
          </button>
        </div>

        <div className="flex flex-col items-center gap-2 flex-1 max-w-2xl">
          <div className="flex items-center gap-4 md:gap-6">
            <button className="p-2 text-text-secondary hover:text-white transition-colors hidden sm:block">
              <Shuffle size={18} />
            </button>
            <button className="p-2 text-text-secondary hover:text-white transition-colors">
              <SkipBack size={22} className="fill-current" />
            </button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={togglePlay}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-all shadow-lg"
            >
              {isPlaying ? (
                <Pause size={20} fill="black" className="text-black" />
              ) : (
                <Play size={20} fill="black" className="text-black ml-0.5" />
              )}
            </motion.button>
            <button className="p-2 text-text-secondary hover:text-white transition-colors">
              <SkipForward size={22} className="fill-current" />
            </button>
            <button className="p-2 text-text-secondary hover:text-white transition-colors hidden sm:block">
              <Repeat size={18} />
            </button>
          </div>

          <div className="w-full flex items-center gap-3 px-4">
            <span className="text-[10px] font-bold text-text-secondary w-10 text-right tabular-nums hidden sm:block">
              {formatTime(progress)}
            </span>
            <div className="flex-1 player-progress group">
              <div
                className="player-progress-bar"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-[10px] font-bold text-text-secondary w-10 tabular-nums hidden sm:block">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 w-1/3 hidden lg:flex">
          <button className="p-2 text-text-secondary hover:text-white transition-colors">
            <ListMusic size={20} />
          </button>
          <div className="flex items-center gap-3 w-36">
            <button
              onClick={() => setVolume(volume > 0 ? 0 : 0.7)}
              className="p-2 text-text-secondary hover:text-white transition-colors"
            >
              {volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <div className="flex-1 player-progress">
              <div
                className="player-progress-bar"
                style={{ width: `${volume * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute top-0 left-0 h-full bg-accent/10 transition-all duration-150 pointer-events-none"
        style={{ width: `${progressPercent}%` }}
      />
    </motion.div>
  );
}
