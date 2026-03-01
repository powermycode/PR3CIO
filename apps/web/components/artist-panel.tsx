"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { TopBar } from "./top-bar";

interface ArtistProfile {
  id: string;
  stageName: string;
  bio: string;
  genres: string[];
  instagram: string;
  youtube: string;
  tiktok: string;
  monthlyListeners: number;
  streamCount: number;
  ogBadge: boolean;
}

interface AIProject {
  id: string;
  mood: string;
  genre: string;
  theme: string;
  customLyrics?: string;
  generatedLyrics: string;
  instrumentalUrl: string;
  provider: "suno" | "mock" | "mock-fallback";
  status: "QUEUED" | "GENERATING" | "COMPLETED" | "FAILED";
  createdAt: string;
  publishedTrackId?: string;
}

export function ArtistPanel() {
  const [profile, setProfile] = useState<ArtistProfile | null>(null);
  const [projects, setProjects] = useState<AIProject[]>([]);
  const [mood, setMood] = useState("cinematic");
  const [genre, setGenre] = useState("electronic");
  const [theme, setTheme] = useState("future optimism");
  const [customLyrics, setCustomLyrics] = useState("");
  const [status, setStatus] = useState("Loading artist studio...");
  const [submitting, setSubmitting] = useState(false);

  const [uploadForm, setUploadForm] = useState({ title: '', genre: '', description: '', cover: null as File | null, audio: null as File | null });
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    const [profileRes, projectsRes] = await Promise.all([
      fetch("/api/demo/profiles/artist"),
      fetch("/api/demo/ai/projects")
    ]);

    setProfile((await profileRes.json()) as ArtistProfile);
    setProjects((await projectsRes.json()) as AIProject[]);
  };

  useEffect(() => {
    void load().then(() => setStatus("Artist studio ready."));
  }, []);

  const generate = async () => {
    setSubmitting(true);
    setStatus("Generating with Suno route...");

    const response = await fetch("/api/demo/ai/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        mood,
        genre,
        theme,
        customLyrics: customLyrics || undefined
      })
    });

    const payload = (await response.json()) as { ok: boolean; warning?: string };
    await load();

    setStatus(payload.warning ? `Generated with fallback: ${payload.warning}` : "Suno generation completed.");
    setSubmitting(false);
  };

  const publishProject = async (projectId: string) => {
    const response = await fetch(`/api/demo/ai/projects/${projectId}/publish`, {
      method: "POST"
    });

    if (!response.ok) {
      setStatus("Publish failed or already published.");
      return;
    }

    await load();
    setStatus("Project published as OG track.");
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadForm.title || !uploadForm.audio) {
      setStatus("Please provide a title and an audio file.");
      return;
    }
    setUploading(true);
    setStatus("Uploading track...");
    // Mock upload delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    setStatus(`Track "${uploadForm.title}" uploaded successfully and added to Discover OGs!`);
    setUploadForm({ title: '', genre: '', description: '', cover: null, audio: null });
    setUploading(false);
  };

  return (
    <main className="page-container" style={{ minHeight: "100vh", padding: 16, display: "grid", gap: 16 }}>
      <TopBar subtitle="Artist Studio" />

      <section style={heroCard}>
        <h2 style={{ margin: 0, fontSize: 28 }}>Artist Panel</h2>
        <p style={{ margin: 0, color: "var(--muted)" }}>{status}</p>
      </section>

      <div className="responsive-grid" style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
        <section style={panelCard}>
          <h3 style={h3}>Artist Profile</h3>
          <p style={titleText}>{profile?.stageName ?? "..."}</p>
          <p style={mutedText}>{profile?.bio ?? "Loading bio..."}</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
            {(profile?.genres ?? []).map((entry) => (
              <span key={entry} style={pill}>
                {entry}
              </span>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginTop: 14 }}>
            <Metric label="Monthly" value={profile?.monthlyListeners ?? 0} />
            <Metric label="Streams" value={profile?.streamCount ?? 0} />
            <Metric label="OG Badge" value={profile?.ogBadge ? 1 : 0} suffix={profile?.ogBadge ? "Yes" : "No"} />
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <a href={profile?.instagram ?? "#"} style={linkButton}>
              Instagram
            </a>
            <a href={profile?.youtube ?? "#"} style={linkButton}>
              YouTube
            </a>
            <a href={profile?.tiktok ?? "#"} style={linkButton}>
              TikTok
            </a>
          </div>
        </section>

        <section style={panelCard}>
          <h3 style={h3}>Upload Track</h3>
          <p style={mutedText}>Upload an original .mp3 or .wav file directly.</p>
          <form onSubmit={handleUpload} style={{ display: "grid", gap: 10, marginTop: 12 }}>
            <input 
              value={uploadForm.title} 
              onChange={e => setUploadForm({...uploadForm, title: e.target.value})} 
              placeholder="Track Title" 
              style={textInput} 
              required 
            />
            <input 
              value={uploadForm.genre} 
              onChange={e => setUploadForm({...uploadForm, genre: e.target.value})} 
              placeholder="Genre" 
              style={textInput} 
            />
            <textarea 
              value={uploadForm.description} 
              onChange={e => setUploadForm({...uploadForm, description: e.target.value})} 
              placeholder="Description" 
              style={{...textInput, minHeight: 60, resize: 'vertical'}} 
            />
            <div>
              <label style={{ fontSize: 12, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>Audio File (.mp3, .wav)</label>
              <input 
                type="file" 
                accept="audio/mp3, audio/wav" 
                onChange={e => setUploadForm({...uploadForm, audio: e.target.files?.[0] || null})} 
                style={{ color: 'var(--text)', fontSize: 13 }} 
                required 
              />
            </div>
            <div>
              <label style={{ fontSize: 12, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>Cover Image</label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={e => setUploadForm({...uploadForm, cover: e.target.files?.[0] || null})} 
                style={{ color: 'var(--text)', fontSize: 13 }} 
              />
            </div>
            <button type="submit" style={primaryButton} disabled={uploading}>
              {uploading ? "Uploading..." : "Publish Track"}
            </button>
          </form>
        </section>

        <section style={panelCard}>
          <h3 style={h3}>AI Music Creation (Suno)</h3>
          <p style={mutedText}>Create lyrics + instrumental draft, then publish as OG.</p>
          <div style={{ display: "grid", gap: 8, marginTop: 12 }}>
            <input value={mood} onChange={(event) => setMood(event.target.value)} placeholder="Mood" style={textInput} />
            <input value={genre} onChange={(event) => setGenre(event.target.value)} placeholder="Genre" style={textInput} />
            <input value={theme} onChange={(event) => setTheme(event.target.value)} placeholder="Theme" style={textInput} />
            <textarea
              value={customLyrics}
              onChange={(event) => setCustomLyrics(event.target.value)}
              placeholder="Optional custom lyrics"
              style={{ ...textInput, minHeight: 110, resize: "vertical" }}
            />
            <button style={primaryButton} onClick={generate} disabled={submitting}>
              {submitting ? "Generating..." : "Generate with Suno"}
            </button>
          </div>
        </section>
      </div>

      <section style={panelCard}>
        <h3 style={h3}>Draft Projects</h3>
        <div style={{ display: "grid", gap: 10, marginTop: 10 }}>
          {projects.length === 0 ? <p style={mutedText}>No projects yet.</p> : null}
          {projects.map((project) => (
            <article key={project.id} style={{ border: "1px solid var(--line)", borderRadius: 14, padding: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                <p style={{ margin: 0, fontWeight: 600 }}>
                  {project.theme} • {project.genre}
                </p>
                <span style={pill}>{project.provider.toUpperCase()}</span>
              </div>
              <p style={{ margin: "8px 0 0", color: "var(--muted)", whiteSpace: "pre-wrap" }}>{project.generatedLyrics}</p>
              <audio controls preload="none" src={project.instrumentalUrl} style={{ width: "100%", marginTop: 10 }} />
              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                <button
                  style={{ ...primaryButton, opacity: project.publishedTrackId ? 0.6 : 1 }}
                  onClick={() => publishProject(project.id)}
                  disabled={Boolean(project.publishedTrackId)}
                >
                  {project.publishedTrackId ? "Published" : "Publish OG"}
                </button>
                {project.publishedTrackId ? <span style={pill}>Track {project.publishedTrackId}</span> : null}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function Metric({ label, value, suffix }: { label: string; value: number; suffix?: string }) {
  return (
    <div style={{ border: "1px solid var(--line)", borderRadius: 10, padding: 10, textAlign: "center" }}>
      <p style={{ margin: 0, color: "var(--muted)", fontSize: 12 }}>{label}</p>
      <p style={{ margin: "6px 0 0", fontWeight: 700 }}>{suffix ?? value.toLocaleString()}</p>
    </div>
  );
}

const heroCard: CSSProperties = {
  border: "1px solid var(--line)",
  background: "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
  borderRadius: 20,
  padding: 20
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

const titleText: CSSProperties = {
  margin: "10px 0 0",
  fontSize: 20,
  fontWeight: 600
};

const mutedText: CSSProperties = {
  margin: "4px 0 0",
  color: "var(--muted)"
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

const linkButton: CSSProperties = {
  border: "1px solid var(--line)",
  borderRadius: 999,
  padding: "6px 12px",
  color: "#d8d8d8",
  fontSize: 13
};

const pill: CSSProperties = {
  border: "1px solid var(--line)",
  borderRadius: 999,
  padding: "5px 10px",
  fontSize: 12,
  color: "var(--muted)"
};

const textInput: CSSProperties = {
  width: "100%",
  border: "1px solid var(--line)",
  borderRadius: 10,
  background: "#0a0a0a",
  color: "#fff",
  padding: "10px 12px"
};
