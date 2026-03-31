"use client";

import { motion } from "framer-motion";
import { Activity, Music2, Sparkles, Users } from "lucide-react";
import Link from "next/link";
import type { AdminSnapshot } from "../lib/mock-db";
import { UploadForm } from "./upload-form";

export function AdminExperience({ snapshot }: { snapshot: AdminSnapshot }) {
  return (
    <div className="min-h-screen bg-[#050812] text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 rounded-[34px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_26px_100px_rgba(4,6,14,0.48)] lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.34em] text-[#7C4DFF]">Admin control room</p>
            <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-[-0.04em] text-white">
              Manage artists, tracks, and ingestion health
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-white/56">
              Production-style admin surface for PR3CIO with live metrics, artist growth signals, and direct upload controls for catalog operations.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="rounded-full border border-white/12 bg-white/[0.05] px-5 py-3 text-sm font-medium text-white/84 transition hover:bg-white/[0.08]">
              Back to home
            </Link>
            <Link href="/login" className="rounded-full bg-gradient-to-r from-[#7C4DFF] via-[#6A8DFF] to-[#4CC9F0] px-5 py-3 text-sm font-semibold text-white">
              Invite admin
            </Link>
          </div>
        </div>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <AdminMetric label="Total artists" value={snapshot.totalArtists.toLocaleString()} icon={Users} />
          <AdminMetric label="Total songs" value={snapshot.totalTracks.toLocaleString()} icon={Music2} />
          <AdminMetric label="Total streams" value={snapshot.totalStreams.toLocaleString()} icon={Activity} />
          <AdminMetric label="Avg songs / artist" value={snapshot.avgTracksPerArtist.toString()} icon={Sparkles} />
        </section>

        <section className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
          <UploadForm
            title="Manual catalog upload"
            description="Use the same ingestion flow the product relies on. Artist profiles are auto-created from metadata when the artist does not exist."
            compact
          />

          <div className="rounded-[30px] border border-white/10 bg-white/[0.04] p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-[#4CC9F0]">Artist registry</p>
                <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold text-white">Live artist roster</h2>
              </div>
              <p className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/38">
                Auto-created enabled
              </p>
            </div>
            <div className="mt-5 overflow-hidden rounded-[24px] border border-white/8">
              <table className="min-w-full divide-y divide-white/8 text-left text-sm">
                <thead className="bg-black/30 text-white/44">
                  <tr>
                    <th className="px-4 py-3 font-medium">Artist</th>
                    <th className="px-4 py-3 font-medium">Genre</th>
                    <th className="px-4 py-3 font-medium">Tracks</th>
                    <th className="px-4 py-3 font-medium">Listeners</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/6 bg-white/[0.03]">
                  {snapshot.artists.map((artist) => (
                    <tr key={artist.id}>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <img src={artist.avatarUrl} alt={artist.name} className="h-11 w-11 rounded-2xl object-cover" />
                          <div>
                            <p className="font-medium text-white">{artist.name}</p>
                            <p className="text-xs uppercase tracking-[0.22em] text-white/35">{artist.city}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-white/65">{artist.genre}</td>
                      <td className="px-4 py-4 text-white/65">{artist.trackCount}</td>
                      <td className="px-4 py-4 text-white/65">{artist.monthlyListeners.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="rounded-[30px] border border-white/10 bg-white/[0.04] p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-[#7C4DFF]">Song ledger</p>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold text-white">Catalog inventory</h2>
            </div>
            <p className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/38">
              Latest first
            </p>
          </div>
          <div className="mt-5 overflow-hidden rounded-[24px] border border-white/8">
            <table className="min-w-full divide-y divide-white/8 text-left text-sm">
              <thead className="bg-black/30 text-white/44">
                <tr>
                  <th className="px-4 py-3 font-medium">Track</th>
                  <th className="px-4 py-3 font-medium">Artist</th>
                  <th className="px-4 py-3 font-medium">Genre</th>
                  <th className="px-4 py-3 font-medium">Streams</th>
                  <th className="px-4 py-3 font-medium">Uploaded</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/6 bg-white/[0.03]">
                {snapshot.tracks.map((track) => (
                  <tr key={track.id}>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <img src={track.coverUrl} alt={track.title} className="h-14 w-14 rounded-2xl object-cover" />
                        <div>
                          <p className="font-medium text-white">{track.title}</p>
                          <p className="text-xs uppercase tracking-[0.2em] text-white/35">{track.mood}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-white/65">{track.artistName}</td>
                    <td className="px-4 py-4 text-white/65">{track.genre}</td>
                    <td className="px-4 py-4 text-white/65">{track.streams.toLocaleString()}</td>
                    <td className="px-4 py-4 text-white/65">{new Date(track.uploadedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

function AdminMetric({
  label,
  value,
  icon: Icon
}: {
  label: string;
  value: string;
  icon: typeof Users;
}) {
  return (
    <motion.div whileHover={{ y: -4 }} className="rounded-[28px] border border-white/10 bg-white/[0.05] p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-white/38">{label}</p>
          <p className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold text-white">{value}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/20 p-3 text-[#7C4DFF]">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </motion.div>
  );
}
