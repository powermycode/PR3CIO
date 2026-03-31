"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Music4, Radio, Sparkles, TrendingUp, UploadCloud } from "lucide-react";
import Link from "next/link";
import type { HomeSnapshot } from "../lib/mock-db";
import { SiteHeader } from "./site-header";
import { SongFeed } from "./song-feed";
import { UploadForm } from "./upload-form";

export function HomeExperience({ snapshot }: { snapshot: HomeSnapshot }) {
  return (
    <div className="min-h-screen bg-[#04070f] text-white">
      <SiteHeader />

      <main className="mx-auto flex max-w-7xl flex-col gap-14 px-4 pb-20 pt-8 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[#070b16] px-6 py-10 shadow-[0_30px_120px_rgba(5,8,18,0.48)] sm:px-8 lg:px-10 lg:py-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(124,77,255,0.22),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(76,201,240,0.18),transparent_30%),linear-gradient(135deg,#070b16,#09111f_52%,#071423)]" />
          <div className="absolute inset-0 opacity-40">
            <motion.div
              animate={{ x: ["0%", "8%", "0%"], y: ["0%", "-6%", "0%"] }}
              transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
              className="absolute left-[-8%] top-[-14%] h-72 w-72 rounded-full bg-[#7C4DFF]/18 blur-3xl"
            />
            <motion.div
              animate={{ x: ["0%", "-6%", "0%"], y: ["0%", "8%", "0%"] }}
              transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
              className="absolute bottom-[-10%] right-[-6%] h-80 w-80 rounded-full bg-[#4CC9F0]/12 blur-3xl"
            />
          </div>

          <div className="relative grid items-center gap-10 lg:grid-cols-[1.2fr_0.85fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs uppercase tracking-[0.32em] text-white/66">
                <Sparkles className="h-4 w-4 text-[#7C4DFF]" />
                AI-powered music studio + discovery
              </div>
              <h1 className="mt-6 max-w-4xl font-[family-name:var(--font-display)] text-5xl font-semibold tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
                Turn Your Sound Into Revenue
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/62 sm:text-lg">
                PR3CIO helps independent artists upload OG tracks, auto-build clean artist profiles, and surface songs inside a discovery engine that looks ready for scale on day one.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="#upload"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#7C4DFF] via-[#6A8DFF] to-[#4CC9F0] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_20px_60px_rgba(92,124,255,0.38)] transition hover:scale-[1.01]"
                >
                  Upload Your First Track
                  <UploadCloud className="h-4 w-4" />
                </Link>
                <Link
                  href="/admin"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-6 py-3.5 text-sm font-semibold text-white/84 transition hover:bg-white/[0.08]"
                >
                  Open Admin
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                <MetricCard label="Artists onboarded" value={snapshot.totalArtists.toLocaleString()} icon={Music4} />
                <MetricCard label="Tracks in feed" value={snapshot.totalTracks.toLocaleString()} icon={Radio} />
                <MetricCard label="Weekly growth" value={`+${snapshot.weeklyGrowthPercent}%`} icon={TrendingUp} />
              </div>
              <div className="rounded-[30px] border border-white/10 bg-black/25 p-5 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.28em] text-white/38">What happens on upload</p>
                <div className="mt-4 grid gap-3">
                  {[
                    "PR3CIO reads your MP3 and extracts artist + title metadata",
                    "New artist profiles are created automatically when needed",
                    "Songs land instantly in the discovery feed and admin workspace"
                  ].map((item) => (
                    <div key={item} className="rounded-[20px] border border-white/8 bg-white/[0.04] px-4 py-3 text-sm text-white/68">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <UploadForm
          title="Fast artist onboarding through track upload"
          description="Drop an MP3, let PR3CIO parse metadata, auto-create the artist if needed, and inject the release into the feed with premium feedback."
        />

        <SongFeed artists={snapshot.artists} tracks={snapshot.tracks} />
      </main>
    </div>
  );
}

function MetricCard({
  label,
  value,
  icon: Icon
}: {
  label: string;
  value: string;
  icon: typeof Music4;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-[28px] border border-white/10 bg-white/[0.05] p-5 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-white/38">{label}</p>
          <p className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold text-white">{value}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-3 text-[#7C4DFF]">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </motion.div>
  );
}
