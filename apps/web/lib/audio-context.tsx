"use client";

import React, { createContext, useContext, useRef, useEffect } from "react";
import { Track } from "./demo-tracks";
import { useAppStore } from "./store/use-app-store";

interface AudioContextType {
  playTrack: (track: Track) => void;
  togglePlay: () => void;
  setVolume: (volume: number) => void;
  seek: (time: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentTrack, playerState, setCurrentTrack, setPlayerState, togglePlay: togglePlayState } = useAppStore();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio();
    const audio = audioRef.current;
    
    const updateProgress = () => setPlayerState({ progress: audio.currentTime });
    const updateDuration = () => setPlayerState({ duration: audio.duration });
    const handleEnded = () => setPlayerState({ isPlaying: false });

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
    };
  }, [setPlayerState]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = playerState.volume;
    }
  }, [playerState.volume]);

  const playTrack = (track: Track) => {
    if (!audioRef.current) return;

    if (currentTrack?.id === track.id) {
      togglePlay();
    } else {
      audioRef.current.src = track.audioUrl;
      audioRef.current.play();
      setCurrentTrack(track);
      setPlayerState({ isPlaying: true });
    }
  };

  const togglePlay = () => {
    if (!audioRef.current || !currentTrack) return;

    if (playerState.isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    togglePlayState();
  };

  const setVolume = (v: number) => {
    setPlayerState({ volume: v });
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setPlayerState({ progress: time });
    }
  };

  return (
    <AudioContext.Provider value={{
      playTrack,
      togglePlay,
      setVolume,
      seek
    }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  
  // Combine context methods with store state for a complete hook
  const store = useAppStore();
  return {
    ...context,
    currentTrack: store.currentTrack,
    ...store.playerState
  };
};
