import { create } from 'zustand';
import { Track } from '../demo-tracks';

interface User {
  id: string;
  email: string;
  role: 'listener' | 'artist' | 'admin';
}

interface PlayerState {
  isPlaying: boolean;
  volume: number;
  progress: number;
  duration: number;
}

interface AppState {
  // User State
  user: User | null;
  setUser: (user: User | null) => void;

  // Track State
  currentTrack: Track | null;
  setCurrentTrack: (track: Track | null) => void;

  // Player State
  playerState: PlayerState;
  setPlayerState: (state: Partial<PlayerState>) => void;
  togglePlay: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),

  currentTrack: null,
  setCurrentTrack: (track) => set({ currentTrack: track }),

  playerState: {
    isPlaying: false,
    volume: 0.7,
    progress: 0,
    duration: 0,
  },
  setPlayerState: (state) => 
    set((prev) => ({ 
      playerState: { ...prev.playerState, ...state } 
    })),
  togglePlay: () => 
    set((prev) => ({ 
      playerState: { ...prev.playerState, isPlaying: !prev.playerState.isPlaying } 
    })),
}));
