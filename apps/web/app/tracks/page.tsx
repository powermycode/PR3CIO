"use client";

import { TopBar } from "../../components/top-bar";
import { pr3cioSubtitle } from "../../lib/pr3cio-content";

const mockTracks = [
  { id: 1, title: "Neon Skyline", artist: "SynthWave AI", cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=300" },
  { id: 2, title: "Ocean Breeze", artist: "Chill Beats", cover: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=300" },
  { id: 3, title: "Neon Nights", artist: "Cyber Flow", cover: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=300" },
  { id: 4, title: "Deep Space", artist: "Ambient Mind", cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=300" },
  { id: 5, title: "Summer Vibes", artist: "DJ Solar", cover: "https://images.unsplash.com/photo-1493225457124-a1a2a5f5f4f4?auto=format&fit=crop&q=80&w=300" },
  { id: 6, title: "Urban Pulse", artist: "City Sounds", cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=300" },
  { id: 7, title: "Lost in Tokyo", artist: "Neo Tokyo", cover: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=300" },
  { id: 8, title: "Golden Hour", artist: "Sunset Blvd", cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=300" }
];

export default function TracksPage() {
  return (
    <main className="page-container" style={{ minHeight: "100vh", padding: "16px 16px 120px" }}>
      <TopBar subtitle={pr3cioSubtitle} />
      
      <div style={{ padding: "40px 20px" }}>
        <h1 style={{ fontSize: 48, fontWeight: 800, marginBottom: 40, background: "linear-gradient(to right, #fff, #a0a0a0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          All Tracks
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 24 }}>
          {mockTracks.map(item => (
            <div key={item.id} className="content-card hover-scale" style={{ background: "rgba(20,20,24,0.6)", padding: 16, borderRadius: 16, border: "1px solid var(--line)", cursor: "pointer" }}>
              <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', marginBottom: 16, overflow: 'hidden', borderRadius: 8 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.cover} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} className="card-banner-img" />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)', opacity: 0, transition: 'opacity 0.2s' }} className="card-overlay">
                  <div style={{ position: 'absolute', bottom: 12, right: 12, width: 40, height: 40, background: 'var(--accent)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.4)' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                </div>
              </div>
              <h3 className="truncate" style={{ margin: "0 0 4px", fontSize: 16, fontWeight: 600 }}>{item.title}</h3>
              <p className="truncate" style={{ margin: 0, color: "var(--muted)", fontSize: 14 }}>{item.artist}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
