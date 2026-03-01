'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const BOTTOM_LINKS = [
  { label: 'Home', href: '/', icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' },
  { label: 'Explore', href: '/explore', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
  { label: 'Library', href: '/listener', icon: 'M4 6h16M4 12h16M4 18h16' },
  { label: 'Studio', href: '/artist', icon: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-white/5 pb-[env(safe-area-inset-bottom)] md:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        {BOTTOM_LINKS.map((link) => {
          const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
                isActive ? 'text-accent' : 'text-secondary hover:text-primary'
              }`}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {link.label === 'Home' && <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />}
                {link.label === 'Explore' && <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>}
                {link.label === 'Library' && <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></>}
                {link.label === 'Studio' && <><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></>}
              </svg>
              <span className="text-[10px] font-medium">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
