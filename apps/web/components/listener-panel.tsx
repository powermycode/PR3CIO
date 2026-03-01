"use client";

import type { CSSProperties } from "react";
import { useState, useEffect } from "react";
import { TopBar } from "./top-bar";
import { useAudio } from "../lib/audio-context";
import { demoTracks } from "../lib/demo-tracks";
import { useRouter } from "next/navigation";
import { AudioPlayer } from "./audio-player";
import { demoListeningHabits } from "../lib/listening-habits";

interface ListenerProfile {
  id: string;
  name: string;
  bio: string;
  location: string;
  favoriteGenres: string;
  following: number;
  followers: number;
  playlists: number;
  likedSongs: number;
  listeningHours: number;
  photoUrl: string;
}

interface CommentItem {
  id: string;
  userName: string;
  message: string;
  createdAt: string;
}

const MOCK_COMMENTS: CommentItem[] = [
  { id: "c1", userName: "BeatJunkie", message: "This drop is insane! 🔥", createdAt: new Date().toISOString() },
  { id: "c2", userName: "SynthLover99", message: "Love the textures in the background.", createdAt: new Date().toISOString() }
];

export function ListenerPanel() {
  const router = useRouter();
  const { currentTrack, isPlaying, playTrack } = useAudio();
  
  const [profile, setProfile] = useState<ListenerProfile>({
    id: "l1",
    name: "Alex MusicFan",
    bio: "Always looking for the next big sound.",
    location: "New York, USA",
    favoriteGenres: "Synthwave, Lo-Fi, Ambient",
    following: 124,
    followers: 45,
    playlists: 12,
    likedSongs: 342,
    listeningHours: 1050,
    photoUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=200"
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(profile);
  const [comments, setComments] = useState<CommentItem[]>(MOCK_COMMENTS);
  const [commentText, setCommentText] = useState("");
  const [showBars, setShowBars] = useState(false);

  useEffect(() => {
    // Simple mock auth check
    const hasSession = typeof window !== 'undefined' && localStorage.getItem("pr3cio-auth-token");
    if (!hasSession) {
      router.push("/login");
    }
    
    // Trigger bar animation
    const timer = setTimeout(() => setShowBars(true), 100);
    return () => clearTimeout(timer);
  }, [router]);

  const submitComment = async () => {
    if (!commentText.trim()) return;
    const newComment = {
      id: Math.random().toString(),
      userName: profile.name,
      message: commentText,
      createdAt: new Date().toISOString()
    };
    setComments(prev => [newComment, ...prev]);
    setCommentText("");
  };

  const saveProfile = () => {
    setProfile(editForm);
    setIsEditing(false);
  };

  return (
    <main className="page-container" style={{ minHeight: "100vh", padding: "16px 16px 120px", display: "grid", gap: 24 }}>
      <TopBar subtitle="Listener Experience" />

      {/* Profile Section */}
      <section style={{ ...panelCard, position: 'relative', overflow: 'hidden' }}>
        <div className="fs-bg-blur" style={{ backgroundImage: `url(${profile.photoUrl})`, opacity: 0.3 }} />
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 20 }}>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
            <img src={profile.photoUrl} alt="" style={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }} className="hover-scale" />
            <div>
              <h2 style={{ fontSize: 32, margin: 0, fontWeight: 800 }}>{profile.name}</h2>
              <p style={{ color: 'var(--muted)', margin: '4px 0 12px' }}>{profile.location} • {profile.favoriteGenres}</p>
              <button onClick={() => setIsEditing(!isEditing)} style={{...primaryButton, padding: '8px 16px', fontSize: 13, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)'}}>
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>
          </div>
          <div style={{ display: "flex", gap: 16, flexWrap: 'wrap' }}>
            <Metric label="Following" value={profile.following} />
            <Metric label="Followers" value={profile.followers} />
            <Metric label="Listening Hours" value={profile.listeningHours} />
          </div>
        </div>
        
        {isEditing && (
          <div style={{ position: 'relative', zIndex: 2, display: 'grid', gap: 10, marginTop: 24, background: 'rgba(0,0,0,0.4)', padding: 20, borderRadius: 16 }}>
            <input value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} style={textInput} placeholder="Display Name" />
            <input value={editForm.bio} onChange={e => setEditForm({...editForm, bio: e.target.value})} style={textInput} placeholder="Bio" />
            <input value={editForm.location} onChange={e => setEditForm({...editForm, location: e.target.value})} style={textInput} placeholder="Location" />
            <input value={editForm.favoriteGenres} onChange={e => setEditForm({...editForm, favoriteGenres: e.target.value})} style={textInput} placeholder="Favourite Genres" />
            <button onClick={saveProfile} style={primaryButton}>Save Changes</button>
          </div>
        )}
      </section>

      {/* Suggested & Continue Listening (Horizontal Scroll) */}
      <section>
        <h3 style={sectionHeader}>Continue Listening</h3>
        <div className="horizontal-scroll-container">
          {demoTracks.map((track) => (
            <div key={track.id} className="horizontal-scroll-item hover-scale cursor-pointer" style={{ width: 160, position: 'relative' }} onClick={() => playTrack(track)}>
              <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', borderRadius: 12, overflow: 'hidden', marginBottom: 12 }}>
                <img src={track.cover} alt={track.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: track.id === currentTrack?.id ? 'rgba(0,0,0,0.4)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}>
                   <AudioPlayer track={track} />
                </div>
              </div>
              <p className="truncate" style={{ margin: 0, fontWeight: 600, fontSize: 14 }}>{track.title}</p>
              <p className="truncate" style={{ margin: "2px 0 0", color: "var(--muted)", fontSize: 12 }}>{track.artist}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="responsive-grid" style={{ display: "grid", gap: 24, gridTemplateColumns: "1fr 1fr" }}>
        {/* Discover OGs */}
        <section style={panelCard}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={h3}>Discover OGs & Trending</h3>
            <span style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 600, cursor: 'pointer' }} className="hover-glow">See All</span>
          </div>
          <div style={{ display: "grid", gap: 12 }}>
            {demoTracks.map((track) => (
              <div
                key={track.id}
                style={{
                  ...listButton,
                  borderColor: track.id === currentTrack?.id ? "var(--accent)" : "var(--line)",
                  background: track.id === currentTrack?.id ? "rgba(111, 100, 255, 0.1)" : "#111"
                }}
                className="hover-scale"
                onClick={() => playTrack(track)}
              >
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <AudioPlayer track={track} />
                  <div style={{ textAlign: "left" }}>
                    <p style={{ margin: 0, fontWeight: 600 }}>{track.title}</p>
                    <p style={{ margin: "2px 0 0", color: "var(--muted)", fontSize: 13 }}>
                      {track.artist}
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  {track.id === currentTrack?.id && isPlaying ? (
                    <div className="audio-spectrum" style={{ height: 20, gap: 2 }}>
                      {[1, 2, 3].map(i => <div key={i} className="spectrum-bar" style={{ width: 2, height: '100%', animationDelay: `${i * 0.1}s`, background: 'var(--accent)' }} />)}
                    </div>
                  ) : (
                    <span style={{ fontSize: 12, color: 'var(--muted)' }}>Trending</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Listening Habits & Comments */}
        <section style={{ display: 'grid', gap: 24 }}>
          <div style={panelCard}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <h3 style={h3}>Listening Habits</h3>
              <div style={{ textAlign: 'right' }}>
                <p style={{ margin: 0, fontSize: 12, color: 'var(--muted)' }}>Weekly Streak</p>
                <p style={{ margin: 0, fontSize: 18, fontWeight: 700, color: 'var(--accent)' }}>{demoListeningHabits.streakDays} Days</p>
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 20 }}>
              <div style={habitStat}>
                <p style={habitLabel}>Weekly Minutes</p>
                <p style={habitValue}>{demoListeningHabits.weeklyMinutes}</p>
              </div>
              <div style={habitStat}>
                <p style={habitLabel}>Favorite Genre</p>
                <p style={habitValue}>{demoListeningHabits.favoriteGenre}</p>
              </div>
              <div style={habitStat}>
                <p style={habitLabel}>Top Artist</p>
                <p style={habitValue}>{demoListeningHabits.topArtist}</p>
              </div>
              <div style={habitStat}>
                <p style={habitLabel}>Top Track</p>
                <p style={habitValue}>{demoListeningHabits.topTrack}</p>
              </div>
            </div>

            <div style={{ height: 120, display: 'flex', alignItems: 'flex-end', gap: 8, paddingBottom: 10 }}>
              {demoListeningHabits.weeklyBreakdown.map((item, i) => {
                const heightPercent = (item.minutes / 120) * 100;
                return (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                    <div 
                      style={{ 
                        width: '100%', 
                        height: showBars ? `${heightPercent}%` : '0%', 
                        background: 'linear-gradient(to top, #6f64ff, #457dff)', 
                        borderRadius: '4px 4px 0 0', 
                        opacity: 0.8,
                        transition: 'height 1s cubic-bezier(0.4, 0, 0.2, 1)',
                        transitionDelay: `${i * 0.1}s`
                      }} 
                      className="hover-glow cursor-pointer" 
                    />
                    <span style={{ fontSize: 10, color: 'var(--muted)' }}>{item.day}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={panelCard}>
            <h3 style={h3}>Recent Comments</h3>
            <div style={{ display: "grid", gap: 12, margin: "16px 0" }}>
              {comments.map((comment) => (
                <article key={comment.id} style={{ display: 'flex', gap: 12, paddingBottom: 12, borderBottom: "1px solid var(--line)" }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>
                    {comment.userName.charAt(0)}
                  </div>
                  <div>
                    <p style={{ margin: 0, fontWeight: 600, fontSize: 14 }}>{comment.userName}</p>
                    <p style={{ margin: "4px 0 0", color: "var(--muted)", fontSize: 14 }}>{comment.message}</p>
                  </div>
                </article>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                value={commentText}
                onChange={(event) => setCommentText(event.target.value)}
                placeholder="Add a comment"
                style={textInput}
              />
              <button onClick={submitComment} style={primaryButton}>
                Send
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div style={{ padding: '10px 16px', background: 'rgba(0,0,0,0.4)', borderRadius: 12, backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.05)', minWidth: 100 }}>
      <p style={{ margin: 0, color: "rgba(255,255,255,0.6)", fontSize: 12, fontWeight: 500 }}>{label}</p>
      <p style={{ margin: "4px 0 0", fontWeight: 700, fontSize: 20 }}>{value.toLocaleString()}</p>
    </div>
  );
}

const habitStat: CSSProperties = {
  background: 'rgba(255,255,255,0.03)',
  padding: '10px 12px',
  borderRadius: 12,
  border: '1px solid var(--line)'
};

const habitLabel: CSSProperties = {
  margin: 0,
  fontSize: 11,
  color: 'var(--muted)',
  textTransform: 'uppercase',
  letterSpacing: '0.05em'
};

const habitValue: CSSProperties = {
  margin: '2px 0 0',
  fontSize: 14,
  fontWeight: 600,
  color: 'white'
};

const sectionHeader: CSSProperties = {
  fontSize: 24,
  fontWeight: 700,
  margin: '0 0 20px',
  letterSpacing: '-0.02em'
};

const panelCard: CSSProperties = {
  border: "1px solid var(--line)",
  borderRadius: 18,
  padding: 16,
  background: "rgba(14,14,14,0.9)"
};

const h3: CSSProperties = {
  margin: 0,
  fontSize: 20
};

const primaryButton: CSSProperties = {
  border: "1px solid #6f64ff",
  background: "linear-gradient(135deg, #6f64ff, #7f3ef0)",
  color: "#fff",
  borderRadius: 10,
  padding: "9px 12px",
  fontWeight: 600,
  cursor: "pointer"
};

const listButton: CSSProperties = {
  border: "1px solid var(--line)",
  background: "#111",
  borderRadius: 12,
  padding: 12,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  cursor: "pointer",
  width: '100%',
  textAlign: 'left'
};

const textInput: CSSProperties = {
  flex: 1,
  border: "1px solid var(--line)",
  borderRadius: 10,
  background: "#0a0a0a",
  color: "#fff",
  padding: "10px 12px"
};
