"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import PremiumNavSidebar from "./PremiumNavSidebar";
import MobileNav from "./MobileNav";
import PremiumMusicPlayer from "./PremiumMusicPlayer";
import { AudioProvider } from "../lib/audio-context";
import Link from "next/link";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage =
    pathname?.startsWith("/login") || pathname?.startsWith("/signup");
  const isCleanPage =
    pathname?.startsWith("/presentation") ||
    pathname?.startsWith("/luis") ||
    pathname?.startsWith("/investors") ||
    pathname?.startsWith("/strategy");

  if (isAuthPage) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
        >
          {children}
        </motion.div>
      </main>
    );
  }

  if (isCleanPage) {
    return (
      <main className="min-h-screen bg-background overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    );
  }

  return (
    <AudioProvider>
      <div className="flex min-h-screen no-scrollbar bg-background text-text-primary">
        <PremiumNavSidebar />

        <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto overflow-x-hidden relative no-scrollbar">
          <header className="md:hidden flex items-center justify-between py-2 px-4 h-14 sticky top-0 bg-background/90 backdrop-blur-xl z-40 border-b border-white/5">
            <Link href="/" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <img
                  src="/logo.webp"
                  alt="PR3CIO"
                  className="w-10 h-10 object-contain"
                />
              </motion.div>
              <span className="text-lg font-black">PR3CIO</span>
            </Link>
          </header>

          <main className="flex-1 w-full max-w-[1400px] mx-auto pb-32 md:pb-36">
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="p-4 md:p-8"
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>

        <div className="hidden md:block">
          <PremiumMusicPlayer />
        </div>

        <MobileNav />
      </div>
    </AudioProvider>
  );
}
