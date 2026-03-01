"use client";

import { TopBar } from "../../components/top-bar";
import { pr3cioSubtitle } from "../../lib/pr3cio-content";

const mockTracks = [
  { id: 1, title: "Neon Skyline", artist: "SynthWave AI", cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=300", rank: 1 },
  { id: 2, title: "Ocean Breeze", artist: "Chill Beats", cover: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=300", rank: 2 },
  { id: 3, title: "Neon Nights", artist: "Cyber Flow", cover: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=300", rank: 3 },
  { id: 4, title: "Deep Space", artist: "Ambient Mind", cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=300", rank: 4 }
];

export default function TrendingPage() {
  return (
    <main className="page-container" style={{ minHeight: "100vh", padding: "16px 16px 120px" }}>
      <TopBar subtitle={pr3cioSubtitle} />
      
      <div style={{ padding: "40px 20px" }}>
        <h1 style={{ fontSize: 48, fontWeight: 800, marginBottom: 40, background: "linear-gradient(to right, #fff, #a0a0a0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Trending Now
        </h1>

        <div style={{ display: 'grid', gap: 16 }}>
          {mockTracks.map(item => (
            <div key={item.id} className="content-card hover-scale" style={{ display: 'flex', alignItems: 'center', gap: 20, background: "rgba(20,20,24,0.6)", padding: 16, borderRadius: 16, border: "1px solid var(--line)", cursor: "pointer" }}>
              <span style={{ fontSize: 24, fontWeight: 800, color: 'var(--muted)', width: 40, textAlign: 'center' }}>#{item.rank}</span>
              <div style={{ position: 'relative', width: 60, height: 60, borderRadius: 8, overflow: 'hidden' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.cover} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 className="truncate" style={{ margin: "0 0 4px", fontSize: 18, fontWeight: 600 }}>{item.title}</h3>
                <p className="truncate" style={{ margin: 0, color: "var(--muted)", fontSize: 14 }}>{item.artist}</p>
              </div>
              <div style={{ paddingRight: 16 }}>
                <div className="icon-pulse" style={{ width: 40, height: 40, background: 'rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
