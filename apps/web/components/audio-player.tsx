"use client";

import React from "react";
import { useAudio } from "../lib/audio-context";
import { Track } from "../lib/demo-tracks";

interface AudioPlayerProps {
  track: Track;
}

export function AudioPlayer({ track }: AudioPlayerProps) {
  const { currentTrack, isPlaying, playTrack } = useAudio();
  
  const isCurrent = currentTrack?.id === track.id;
  const showPlaying = isCurrent && isPlaying;

  return (
    <button 
      onClick={(e) => {
        e.stopPropagation();
        playTrack(track);
      }}
      style={{
        background: 'var(--accent)',
        border: 'none',
        borderRadius: '50%',
        width: 40,
        height: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
      }}
    >
      {showPlaying ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
      )}
    </button>
  );
}
