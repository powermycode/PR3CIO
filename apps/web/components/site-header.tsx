"use client";

import { motion } from "framer-motion";
import { Disc3, ShieldCheck, Sparkles, UploadCloud } from "lucide-react";
import Link from "next/link";

const navItems = [
  { href: "#upload", label: "Upload", icon: UploadCloud },
  { href: "#feed", label: "Feed", icon: Disc3 },
  { href: "/admin", label: "Admin", icon: ShieldCheck }
] as const;

export function SiteHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 border-b border-white/10 bg-[#050812]/80 backdrop-blur-2xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <img src="/pr3cio-logo.png" alt="PR3CIO" className="h-11 w-11 rounded-2xl object-cover shadow-[0_0_24px_rgba(124,77,255,0.25)]" />
          <div className="min-w-0">
            <p className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-white">PR3CIO</p>
            <p className="truncate text-xs uppercase tracking-[0.32em] text-white/45">AI studio + discovery</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/78 transition hover:border-white/20 hover:bg-white/8 hover:text-white"
            >
              <Icon className="h-4 w-4 text-[#7C4DFF]" />
              {label}
            </Link>
          ))}
          <Link
            href="/login"
            className="ml-2 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#7C4DFF] via-[#6A8DFF] to-[#4CC9F0] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(108,125,255,0.35)] transition hover:scale-[1.02]"
          >
            <Sparkles className="h-4 w-4" />
            Sign In
          </Link>
        </nav>

        <Link
          href="/login"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#7C4DFF] to-[#4CC9F0] px-4 py-2 text-sm font-semibold text-white md:hidden"
        >
          <Sparkles className="h-4 w-4" />
          Login
        </Link>
      </div>
    </motion.header>
  );
}
