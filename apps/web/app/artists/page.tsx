"use client";

import { TopBar } from "../../components/top-bar";
import { pr3cioSubtitle } from "../../lib/pr3cio-content";

const mockArtists = [
  { id: 1, name: "SynthWave AI", followers: "1.2M", cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=300" },
  { id: 2, name: "Chill Beats", followers: "850K", cover: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=300" },
  { id: 3, name: "Cyber Flow", followers: "420K", cover: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=300" },
  { id: 4, name: "Ambient Mind", followers: "210K", cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=300" }
];

export default function ArtistsPage() {
  return (
    <main className="page-container" style={{ minHeight: "100vh", padding: "16px 16px 120px" }}>
      <TopBar subtitle={pr3cioSubtitle} />
      
      <div style={{ padding: "40px 20px" }}>
        <h1 style={{ fontSize: 48, fontWeight: 800, marginBottom: 40, background: "linear-gradient(to right, #fff, #a0a0a0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Top Artists
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 24 }}>
          {mockArtists.map(item => (
            <div key={item.id} className="content-card hover-scale" style={{ background: "rgba(20,20,24,0.6)", padding: 16, borderRadius: 16, border: "1px solid var(--line)", cursor: "pointer", textAlign: 'center' }}>
              <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', marginBottom: 16, overflow: 'hidden', borderRadius: '50%' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.cover} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} className="card-banner-img" />
              </div>
              <h3 className="truncate" style={{ margin: "0 0 4px", fontSize: 18, fontWeight: 600 }}>{item.name}</h3>
              <p className="truncate" style={{ margin: 0, color: "var(--muted)", fontSize: 14 }}>{item.followers} Followers</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
