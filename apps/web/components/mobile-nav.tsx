"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CSSProperties } from "react";

export function MobileNav() {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/", icon: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" },
    { label: "Explore", href: "/explore", icon: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" },
    { label: "Library", href: "/listener", icon: "M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12zM10 9h8v2h-8zm0 3h4v2h-4zm0-6h8v2h-8z" },
    { label: "Studio", href: "/artist", icon: "M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" }
  ];

  return (
    <nav className="mobile-bottom-nav" style={navContainer}>
      {navItems.map((item) => {
        const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
        return (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          <Link key={item.label} href={item.href as any} style={{ ...navItem, color: isActive ? "var(--accent)" : "var(--muted)" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ marginBottom: 4 }}>
              <path d={item.icon} />
            </svg>
            <span style={{ fontSize: 10, fontWeight: 500 }}>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

const navContainer: CSSProperties = {
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  height: 60,
  background: "rgba(10, 10, 14, 0.95)",
  backdropFilter: "blur(20px)",
  borderTop: "1px solid var(--line)",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  paddingBottom: "env(safe-area-inset-bottom)",
  zIndex: 9900
};

const navItem: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textDecoration: "none",
  flex: 1,
  height: "100%",
  transition: "color 0.2s ease"
};
