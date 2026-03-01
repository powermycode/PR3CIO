'use client';

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, Search, Library, LayoutDashboard, User } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", href: "/", icon: Home },
  { label: "Explore", href: "/explore", icon: Search },
  { label: "Library", href: "/library", icon: Library },
  { label: "Studio", href: "/studio", icon: LayoutDashboard },
];

export default function NavSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-64 flex-col bg-surface border-r border-white/5 h-screen sticky top-0">
      <div className="p-6 mb-4">
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div 
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <img src="/logo.webp" alt="PR3CIO" className="w-24 h-24 object-contain" />
          </motion.div>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-colors ${
                  isActive 
                    ? "bg-accent text-white" 
                    : "text-text-secondary hover:bg-white/5 hover:text-text-primary"
                }`}
              >
                <item.icon size={22} />
                <span className="font-semibold">{item.label}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto">
        <Link href="/login">
          <div className="flex items-center gap-4 px-4 py-3 rounded-xl text-text-secondary hover:bg-white/5 hover:text-text-primary transition-colors">
            <User size={22} />
            <span className="font-semibold">Login / Profile</span>
          </div>
        </Link>
      </div>
    </aside>
  );
}
