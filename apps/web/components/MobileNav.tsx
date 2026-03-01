'use client';

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, Search, Library, LayoutDashboard } from "lucide-react";

const MOBILE_NAV_ITEMS = [
  { label: "Home", href: "/", icon: Home },
  { label: "Explore", href: "/explore", icon: Search },
  { label: "Library", href: "/library", icon: Library },
  { label: "Studio", href: "/studio", icon: LayoutDashboard },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-background/80 backdrop-blur-xl border-t border-white/5 z-50 flex items-center justify-around px-2">
      {MOBILE_NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link key={item.href} href={item.href} className="flex-1">
            <motion.div
              whileTap={{ scale: 0.9 }}
              className={`flex flex-col items-center gap-1 transition-colors ${
                isActive ? "text-accent" : "text-text-secondary"
              }`}
            >
              <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-bold uppercase tracking-widest">
                {item.label}
              </span>
              {isActive && (
                <motion.div 
                  layoutId="activeTab" 
                  className="absolute -bottom-2 w-1 h-1 bg-accent rounded-full" 
                />
              )}
            </motion.div>
          </Link>
        );
      })}
    </nav>
  );
}
