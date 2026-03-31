"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Home,
  Search,
  Library,
  LayoutDashboard,
  User,
  Compass,
  Headphones,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", href: "/", icon: Home },
  { label: "Explore", href: "/explore", icon: Compass },
  { label: "Library", href: "/library", icon: Library },
  { label: "Studio", href: "/studio", icon: LayoutDashboard },
];

export default function PremiumNavSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-64 flex-col h-screen sticky top-0">
      <div className="p-6 mb-4">
        <Link href="/" className="block group">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src="/logo.webp"
                alt="PR3CIO"
                className="w-12 h-12 object-contain transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight">PR3CIO</span>
              <p className="text-[10px] text-text-muted uppercase tracking-[0.2em]">
                Music Platform
              </p>
            </div>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-200
                  ${
                    isActive
                      ? "bg-accent text-white shadow-lg shadow-accent/20"
                      : "text-text-secondary hover:text-white hover:bg-white/5"
                  }
                `}
              >
                <item.icon size={22} className={isActive ? "text-white" : ""} />
                <span className="font-semibold">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-white"
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <Link href="/login">
          <div className="flex items-center gap-4 px-4 py-3.5 rounded-2xl text-text-secondary hover:text-white hover:bg-white/5 transition-all">
            <User size={22} />
            <div>
              <span className="font-semibold block">Sign In</span>
              <span className="text-xs text-text-muted">Access your music</span>
            </div>
          </div>
        </Link>
      </div>

      <div className="p-4 pt-0">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-accent/20 to-purple-600/10 border border-accent/20">
          <div className="flex items-center gap-3 mb-3">
            <Headphones size={20} className="text-accent" />
            <span className="text-sm font-bold">Start Creating</span>
          </div>
          <p className="text-xs text-text-muted mb-4">
            Upload tracks, manage your profile, and grow your audience.
          </p>
          <Link href="/studio" className="btn-primary w-full text-sm py-2.5">
            Open Studio
          </Link>
        </div>
      </div>
    </aside>
  );
}
