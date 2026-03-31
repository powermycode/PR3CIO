'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Play, Music, MoreVertical, Heart, Clock } from 'lucide-react';
import { useAppStore } from '../lib/store/use-app-store';
import { useAudio } from '../lib/audio-context';

export function TrackList() {
  const uploadedTracks = useAppStore(state => state.uploadedTracks);
  const { playTrack, currentTrack, isPlaying } = useAudio();

  if (uploadedTracks.length === 0) {
    return (
      <div className="h-full min-h-[300px] border border-dashed border-white/10 rounded-[2.5rem] flex flex-col items-center justify-center text-center p-12 bg-surface/10">
        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6">
          <Music className="w-8 h-8 text-secondary/30" />
        </div>
        <h3 className="text-2xl font-black uppercase tracking-tight mb-2 text-secondary/50">No tracks yet</h3>
        <p className="text-secondary/30 max-w-xs font-medium uppercase text-xs tracking-widest">Upload your first track to see it here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6 px-4">
        <h3 className="text-xl font-black uppercase tracking-tight">Your Published Tracks</h3>
        <span className="text-[10px] font-black uppercase tracking-widest text-accent">{uploadedTracks.length} Tracks Total</span>
      </div>

      <div className="space-y-2">
        {uploadedTracks.map((track, index) => {
          const isCurrent = currentTrack?.id === track.id;
          
          return (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              key={track.id}
              className={`group flex items-center gap-4 p-4 rounded-2xl border transition-all cursor-pointer ${
                isCurrent ? 'bg-accent/10 border-accent/20' : 'bg-surface/30 border-white/5 hover:bg-surface/50 hover:border-white/10'
              }`}
              onClick={() => playTrack(track)}
            >
              <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-white/5">
                <img src={track.cover} alt={track.title} className="w-full h-full object-cover" />
                <div className={`absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity ${isCurrent && isPlaying ? 'opacity-100' : ''}`}>
                  <Play className={`w-6 h-6 ${isCurrent ? 'text-accent' : 'text-white'} fill-current`} />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <h4 className={`text-sm font-bold truncate ${isCurrent ? 'text-accent' : 'text-white'}`}>{track.title}</h4>
                <p className="text-[10px] font-bold text-secondary uppercase tracking-widest truncate">{track.artist}</p>
              </div>

              <div className="hidden md:flex items-center gap-6 px-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-3 h-3 text-secondary" />
                  <span className="text-[10px] font-bold text-secondary uppercase">3:45</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-3 h-3 text-secondary group-hover:text-accent transition-colors" />
                  <span className="text-[10px] font-bold text-secondary">24</span>
                </div>
              </div>

              <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                <MoreVertical className="w-4 h-4 text-secondary" />
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
