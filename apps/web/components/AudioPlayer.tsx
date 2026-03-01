"use client";

import React, { useState, useEffect } from "react";
import { useAudio } from "../lib/audio-context";
import { demoTracks } from "../lib/demo-tracks";
import type { CSSProperties } from "react";

export function AudioPlayer() {
  const { currentTrack, isPlaying, progress, duration, volume, togglePlay, setVolume, seek, playTrack } = useAudio();
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isExpanded]);

  if (!currentTrack) return null;

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleNext = () => {
    const currentIndex = demoTracks.findIndex(t => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % demoTracks.length;
    playTrack(demoTracks[nextIndex]!);
  };

  const handlePrev = () => {
    const currentIndex = demoTracks.findIndex(t => t.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + demoTracks.length) % demoTracks.length;
    playTrack(demoTracks[prevIndex]!);
  };

  return (
    <>
      {/* Bottom Sticky Player */}
      <div style={playerBar}>
        <div style={playerLeft}>
          <img 
            src={currentTrack.cover} 
            alt="cover" 
            style={{ ...coverThumb, cursor: 'pointer' }} 
            onClick={() => setIsExpanded(true)}
          />
          <div style={trackInfo}>
            <p style={trackTitle}>{currentTrack.title}</p>
            <p style={trackArtist}>{currentTrack.artist}</p>
          </div>
        </div>

        <div style={playerCenter}>
          <div style={controls}>
            <button style={secondaryControlBtn}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--muted)"><path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"/></svg>
            </button>
            <button onClick={handlePrev} style={secondaryControlBtn}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
            </button>
            <button onClick={togglePlay} style={playBtn}>
              {isPlaying ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="black"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="black"><path d="M8 5v14l11-7z"/></svg>
              )}
            </button>
            <button onClick={handleNext} style={secondaryControlBtn}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
            </button>
            <button style={secondaryControlBtn}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--muted)"><path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/></svg>
            </button>
          </div>
          <div style={timelineWrap}>
            <span style={timeText}>{formatTime(progress)}</span>
            <input 
              type="range" 
              min="0" 
              max={duration || 100} 
              value={progress} 
              onChange={(e) => seek(parseFloat(e.target.value))}
              style={sliderStyle}
            />
            <span style={timeText}>{formatTime(duration)}</span>
          </div>
        </div>

        <div style={playerRight}>
          <div style={volumeControl}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--muted)"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.01" 
              value={volume} 
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              style={{ ...sliderStyle, width: 80 }}
            />
          </div>
          <button onClick={() => setIsExpanded(true)} style={secondaryControlBtn}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--muted)"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>
          </button>
        </div>
      </div>

      {/* Fullscreen Player Overlay */}
      <div style={{
        ...fullscreenOverlay,
        opacity: isExpanded ? 1 : 0,
        pointerEvents: isExpanded ? 'all' : 'none',
        transform: isExpanded ? 'translateY(0)' : 'translateY(100%)'
      }}>
        <div style={fsHeader}>
          <button onClick={() => setIsExpanded(false)} style={closeBtn}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="white"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
          </button>
        </div>

        <div style={fsContent}>
          <div style={fsCoverWrap}>
            <img src={currentTrack.cover} alt="large cover" style={fsCover} />
          </div>
          
          <div style={fsInfoWrap}>
            <h1 style={fsTrackTitle}>{currentTrack.title}</h1>
            <h2 style={fsTrackArtist}>{currentTrack.artist}</h2>
          </div>

          <div style={fsControlsWrap}>
            <div style={fsTimelineWrap}>
              <span style={fsTimeText}>{formatTime(progress)}</span>
              <input 
                type="range" 
                min="0" 
                max={duration || 100} 
                value={progress} 
                onChange={(e) => seek(parseFloat(e.target.value))}
                style={{ ...sliderStyle, height: 6 }}
              />
              <span style={fsTimeText}>{formatTime(duration)}</span>
            </div>

            <div style={fsMainControls}>
              <button onClick={handlePrev} style={fsSecondaryBtn}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="white"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
              </button>
              <button onClick={togglePlay} style={fsPlayBtn}>
                {isPlaying ? (
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="black"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                ) : (
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="black"><path d="M8 5v14l11-7z"/></svg>
                )}
              </button>
              <button onClick={handleNext} style={fsSecondaryBtn}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="white"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
              </button>
            </div>

            <div style={fsVolumeWrap}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--muted)"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                value={volume} 
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                style={{ ...sliderStyle, width: 200 }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const playerBar: CSSProperties = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  height: 90,
  background: 'rgba(10, 10, 14, 0.95)',
  backdropFilter: 'blur(20px)',
  borderTop: '1px solid var(--line)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 24px',
  zIndex: 9999
};

const playerLeft: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 16,
  width: '30%'
};

const coverThumb: CSSProperties = {
  width: 56,
  height: 56,
  borderRadius: 8,
  objectFit: 'cover'
};

const trackInfo: CSSProperties = {
  display: 'flex',
  flexDirection: 'column'
};

const trackTitle: CSSProperties = {
  margin: 0,
  fontSize: 14,
  fontWeight: 600,
  color: 'white'
};

const trackArtist: CSSProperties = {
  margin: '2px 0 0',
  fontSize: 12,
  color: 'var(--muted)'
};

const playerCenter: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '40%'
};

const controls: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 20,
  marginBottom: 8
};

const secondaryControlBtn: CSSProperties = {
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 4
};

const playBtn: CSSProperties = {
  background: 'white',
  border: 'none',
  borderRadius: '50%',
  width: 36,
  height: 36,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer'
};

const timelineWrap: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  width: '100%'
};

const timeText: CSSProperties = {
  fontSize: 11,
  color: 'var(--muted)',
  minWidth: 35
};

const sliderStyle: CSSProperties = {
  flex: 1,
  height: 4,
  accentColor: 'var(--accent)',
  cursor: 'pointer'
};

const playerRight: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: 16,
  width: '30%'
};

const volumeControl: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 8
};

const fullscreenOverlay: CSSProperties = {
  position: 'fixed',
  inset: 0,
  background: 'linear-gradient(to bottom, #1a1a24, #050507)',
  zIndex: 10000,
  display: 'flex',
  flexDirection: 'column',
  padding: 40,
  transition: 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
};

const fsHeader: CSSProperties = {
  display: 'flex',
  justifyContent: 'flex-end'
};

const closeBtn: CSSProperties = {
  background: 'transparent',
  border: 'none',
  cursor: 'pointer'
};

const fsContent: CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 40
};

const fsCoverWrap: CSSProperties = {
  width: 'min(400px, 80vw)',
  aspectRatio: '1/1',
  boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
  borderRadius: 20,
  overflow: 'hidden'
};

const fsCover: CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'cover'
};

const fsInfoWrap: CSSProperties = {
  textAlign: 'center'
};

const fsTrackTitle: CSSProperties = {
  fontSize: 32,
  fontWeight: 800,
  margin: '0 0 8px'
};

const fsTrackArtist: CSSProperties = {
  fontSize: 20,
  color: 'var(--muted)',
  margin: 0
};

const fsControlsWrap: CSSProperties = {
  width: 'min(600px, 90vw)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 32
};

const fsTimelineWrap: CSSProperties = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: 16
};

const fsTimeText: CSSProperties = {
  fontSize: 14,
  color: 'var(--muted)',
  minWidth: 45
};

const fsMainControls: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 48
};

const fsPlayBtn: CSSProperties = {
  background: 'white',
  border: 'none',
  borderRadius: '50%',
  width: 80,
  height: 80,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer'
};

const fsSecondaryBtn: CSSProperties = {
  background: 'transparent',
  border: 'none',
  cursor: 'pointer'
};

const fsVolumeWrap: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 16
};
