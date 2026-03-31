"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Pause, Play, Radio, Volume2 } from "lucide-react";
import type { ArtistRecord, TrackRecord } from "../lib/mock-db";

interface SongFeedProps {
  tracks: TrackRecord[];
  artists: ArtistRecord[];
}

export function SongFeed({ tracks, artists }: SongFeedProps) {
  const [activeTrack, setActiveTrack] = useState<TrackRecord | null>(tracks[0] ?? null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !activeTrack) {
      return;
    }

    audio.pause();
    audio.load();
    if (!isPlaying) {
      return;
    }

    void audio.play().catch(() => {
      setIsPlaying(false);
    });
  }, [activeTrack, isPlaying]);

  const trendingArtists = artists.slice(0, 3);

  return (
    <section id="feed" className="grid gap-8 xl:grid-cols-[1.35fr_0.8fr]">
      <div className="space-y-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-[#4CC9F0]">Live feed</p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-white">New OG drops landing right now</h2>
          </div>
          <div className="hidden rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/40 md:block">
            Demo catalog
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {tracks.map((track, index) => (
            <motion.button
              key={track.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              viewport={{ once: true }}
              whileHover={{ y: -6, scale: 1.01 }}
              onClick={() => {
                setActiveTrack(track);
                setIsPlaying(true);
              }}
              className="group overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] text-left shadow-[0_24px_80px_rgba(5,8,18,0.28)] transition hover:border-white/16"
            >
              <div className="relative aspect-square overflow-hidden">
                <img src={track.coverUrl} alt={`${track.title} cover`} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-white/55">{track.genre}</p>
                    <p className="mt-1 font-[family-name:var(--font-display)] text-lg font-semibold text-white">{track.title}</p>
                    <p className="text-sm text-white/68">{track.artistName}</p>
                  </div>
                  <div className="rounded-full border border-white/12 bg-white/10 p-3 text-white backdrop-blur">
                    {activeTrack?.id === track.id && isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between px-4 py-4 text-sm text-white/55">
                <span>{track.streams.toLocaleString()} streams</span>
                <span>{track.likes.toLocaleString()} saves</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="space-y-5">
        <div className="rounded-[30px] border border-white/10 bg-white/[0.04] p-5">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.32em] text-[#7C4DFF]">
            <Radio className="h-4 w-4" />
            Preview player
          </div>
          <AnimatePresence mode="wait">
            {activeTrack ? (
              <motion.div
                key={activeTrack.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="mt-5"
              >
                <img src={activeTrack.coverUrl} alt={`${activeTrack.title} artwork`} className="aspect-square w-full rounded-[28px] object-cover" />
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="font-[family-name:var(--font-display)] text-2xl font-semibold text-white">{activeTrack.title}</p>
                    <p className="mt-1 text-sm text-white/55">{activeTrack.artistName}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsPlaying((current) => !current)}
                    className="rounded-full border border-white/10 bg-white/[0.06] p-3 text-white transition hover:bg-white/[0.12]"
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </button>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm text-white/48">
                  <span>{activeTrack.genre}</span>
                  <span>{activeTrack.bpm} BPM</span>
                  <span>{Math.floor(activeTrack.durationSec / 60)}:{String(activeTrack.durationSec % 60).padStart(2, "0")}</span>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <audio ref={audioRef} className="hidden" src={activeTrack?.previewUrl} />
        </div>

        <div className="rounded-[30px] border border-white/10 bg-white/[0.04] p-5">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.32em] text-[#4CC9F0]">
            <Volume2 className="h-4 w-4" />
            Trending artists
          </div>
          <div className="mt-5 space-y-3">
            {trendingArtists.map((artist) => (
              <div key={artist.id} className="flex items-center gap-3 rounded-[22px] border border-white/8 bg-black/20 px-3 py-3">
                <img src={artist.avatarUrl} alt={artist.name} className="h-12 w-12 rounded-2xl object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-white">{artist.name}</p>
                  <p className="truncate text-sm text-white/45">{artist.genre} • {artist.city}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-white">{artist.monthlyListeners.toLocaleString()}</p>
                  <p className="text-xs uppercase tracking-[0.22em] text-white/35">monthly</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
