'use client';

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Mic2, Plus, Loader2, Sparkles, Send, Music4, AlertCircle, CheckCircle2 } from "lucide-react";
import { UploadTrack } from "../../components/UploadTrack";
import { TrackList } from "../../components/TrackList";
import { useAppStore } from "../../lib/store/use-app-store";

export default function Dashboard() {
  const isMountedRef = useRef(true);
  const [mood, setMood] = useState("Dark");
  const [genre, setGenre] = useState("Hip Hop");
  const [theme, setTheme] = useState("");
  const [loading, setLoading] = useState(false);
  const [isGeneratingTrack, setIsGeneratingTrack] = useState(false);
  const [lyrics, setLyrics] = useState("");
  const [trackMessage, setTrackMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [view, setView] = useState<"studio" | "tracks">("studio");
  const addUploadedTrack = useAppStore((state) => state.addUploadedTrack);

  const moods = ["Dark", "Energetic", "Melodic", "Aggressive", "Chill", "Soulful"];
  const genres = ["Hip Hop", "Trap", "R&B", "Drill", "LoFi", "Dancehall"];

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const safeSetTrackMessage = (message: { type: "success" | "error"; text: string } | null) => {
    if (isMountedRef.current) {
      setTrackMessage(message);
    }
  };

  const safeSetLyrics = (value: string) => {
    if (isMountedRef.current) {
      setLyrics(value);
    }
  };

  const generateLyrics = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/generate-lyrics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mood,
          genre,
          theme,
        }),
      });

      const data = (await res.json().catch(() => null)) as { lyrics?: string } | null;
      safeSetLyrics(data?.lyrics || "No lyrics returned");
    } catch (err) {
      console.error(err);
      safeSetLyrics("Error generating lyrics");
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  };

  const generateTrack = async () => {
    if (!theme.trim()) {
      setTrackMessage({ type: "error", text: "Enter a prompt before generating a track." });
      return;
    }

    try {
      setIsGeneratingTrack(true);
      safeSetTrackMessage(null);

      const res = await fetch("/api/generate-track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: theme,
        }),
      });

      const data = (await res.json().catch(() => null)) as {
        success?: boolean;
        error?: string;
        title?: string;
        artist?: string;
        fileUrl?: string;
      } | null;

      if (!res.ok || !data?.success) {
        throw new Error(data?.error || "Track generation failed");
      }

      addUploadedTrack({
        id:
          typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
            ? crypto.randomUUID()
            : `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        title: data.title || "Generated Track",
        artist: data.artist || "AI Studio",
        audioUrl: data.fileUrl || "",
        cover: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=300",
      });

      safeSetTrackMessage({ type: "success", text: "Track generated and added to your library." });
      if (isMountedRef.current) {
        setView("tracks");
      }
    } catch (err) {
      console.error(err);
      safeSetTrackMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Track generation failed",
      });
    } finally {
      if (isMountedRef.current) {
        setIsGeneratingTrack(false);
      }
    }
  };

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
            {view === "studio" ? "Studio" : "Library"}
          </h1>
          <p className="text-secondary font-medium tracking-[0.2em] uppercase text-xs">
            {view === "studio" ? "AI Lyric Engine • v2.0" : "Your Published Tracks"}
          </p>
        </div>
        
        <div className="flex bg-surface/50 p-1 rounded-2xl border border-white/5 backdrop-blur-xl">
          <button 
            onClick={() => setView("studio")}
            className={`px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2 ${
              view === "studio" ? 'bg-accent text-black' : 'text-secondary hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Studio
          </button>
          <button 
            onClick={() => setView("tracks")}
            className={`px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2 ${
              view === "tracks" ? 'bg-accent text-black' : 'text-secondary hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            My Tracks
          </button>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {view === "studio" ? (
          <motion.div 
            key="studio"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-12"
          >
            {/* Form Column */}
            <div className="lg:col-span-1 space-y-8">
              <div className="p-8 rounded-[2rem] bg-surface/50 border border-white/5 space-y-8 shadow-2xl backdrop-blur-3xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Sparkles className="w-24 h-24" />
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Mood Selector</label>
                    <div className="grid grid-cols-2 gap-2">
                      {moods.slice(0, 4).map(m => (
                        <button 
                          key={m}
                          onClick={() => setMood(m)}
                          className={`px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                            mood === m ? 'bg-accent border-accent text-black' : 'bg-background border-white/5 text-secondary hover:border-white/20'
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Genre</label>
                    <select 
                      value={genre}
                      onChange={(e) => setGenre(e.target.value)}
                      className="w-full bg-background border border-white/5 rounded-xl px-4 py-4 text-xs font-black uppercase tracking-widest focus:border-accent outline-none appearance-none cursor-pointer transition-all"
                    >
                      {genres.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Theme / Topic</label>
                    <textarea 
                      value={theme}
                      onChange={(e) => setTheme(e.target.value)}
                      placeholder="Type your vision here..."
                      className="w-full bg-background border border-white/5 rounded-2xl px-6 py-6 text-sm font-bold focus:border-accent outline-none min-h-[160px] resize-none transition-all placeholder:text-secondary/30"
                    />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <button 
                    onClick={generateLyrics}
                    disabled={loading || !theme}
                    className="w-full py-5 bg-accent hover:bg-accent-hover disabled:bg-accent/20 disabled:text-accent/50 text-black rounded-2xl font-black uppercase tracking-[0.2em] text-sm transition-all flex items-center justify-center gap-3 shadow-2xl shadow-accent/20"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                    {loading ? "Igniting AI..." : "Generate Lyrics"}
                  </button>
                  <button 
                    onClick={generateTrack}
                    disabled={isGeneratingTrack || !theme}
                    className="w-full py-5 bg-white/5 hover:bg-white/10 disabled:bg-white/5 disabled:text-white/30 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-sm transition-all flex items-center justify-center gap-3 border border-white/10"
                  >
                    {isGeneratingTrack ? <Loader2 className="w-5 h-5 animate-spin" /> : <Music4 className="w-5 h-5" />}
                    {isGeneratingTrack ? "Generating Track..." : "Generate Track"}
                  </button>
                </div>

                {trackMessage ? (
                  <div
                    className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-xs font-black uppercase tracking-widest ${
                      trackMessage.type === "success"
                        ? "border-green-400/20 bg-green-400/10 text-green-300"
                        : "border-red-400/20 bg-red-400/10 text-red-300"
                    }`}
                  >
                    {trackMessage.type === "success" ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <AlertCircle className="w-4 h-4" />
                    )}
                    {trackMessage.text}
                  </div>
                ) : null}
              </div>
            </div>

            {/* Output Column */}
            <div className="lg:col-span-2 h-full">
              {lyrics ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative p-10 rounded-[2.5rem] bg-surface/30 border border-white/5 h-full flex flex-col shadow-2xl backdrop-blur-3xl group"
                >
                  <div className="mb-10 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-accent/10 rounded-2xl">
                        <Mic2 className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black uppercase tracking-tight">AI Generation</h3>
                        <p className="text-[10px] font-black uppercase tracking-widest text-accent">Studio Grade • Original</p>
                      </div>
                    </div>
                    <button className="p-3 hover:bg-white/5 rounded-full transition-colors">
                      <Plus className="w-5 h-5 text-secondary" />
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto whitespace-pre-wrap font-mono text-base leading-relaxed text-secondary/80 bg-black/40 p-10 rounded-3xl border border-white/5 scrollbar-hide">
                    {lyrics}
                  </div>
                </motion.div>
              ) : (
                <div className="h-full min-h-[500px] border-2 border-dashed border-white/5 rounded-[3rem] flex flex-col items-center justify-center text-center p-12 bg-surface/5 group hover:bg-surface/10 transition-all hover:border-accent/20">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                    <Sparkles className="w-10 h-10 text-secondary/20 group-hover:text-accent/40" />
                  </div>
                  <h3 className="text-3xl font-black uppercase tracking-tight mb-3 text-secondary/30">Studio Engine Idle</h3>
                  <p className="text-secondary/20 max-w-sm font-bold uppercase text-[10px] tracking-[0.3em] leading-loose">Input your theme to start generating studio-grade music lyrics.</p>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="tracks"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-12"
          >
            <div className="lg:col-span-1">
              <UploadTrack />
            </div>
            <div className="lg:col-span-2">
              <TrackList />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
