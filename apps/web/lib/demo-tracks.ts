export interface Track {
  id: string;
  title: string;
  artist: string;
  audioUrl: string;
  cover: string;
}

export const demoTracks: Track[] = [
  {
    id: "1",
    title: "Neon Skyline",
    artist: "SynthWave AI",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "2",
    title: "Digital Rain",
    artist: "CyberPunk Beta",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "3",
    title: "Neural Network Groove",
    artist: "AI Flow",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    cover: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "4",
    title: "Quantum Dreams",
    artist: "Deep Learning",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "5",
    title: "Edo Soul",
    artist: "Rico Milano",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    cover: "/artists/rico-milano.png"
  },
  {
    id: "6",
    title: "Artizz Flow",
    artist: "Artizz",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    cover: "/artists/artizz.png"
  },
  {
    id: "7",
    title: "Lesj Vibe",
    artist: "Lesj",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    cover: "/artists/lesj.png"
  }
];
