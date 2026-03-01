"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import { BrandLogo } from "./brand-logo";

export function TopBar({ subtitle }: { subtitle: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="top-bar-container">
      <BrandLogo subtitle={subtitle} />
      
      <div className="desktop-actions" style={actionsWrap}>
        <nav style={navStyle}>
          <Link href="/listener" style={linkStyle}>
            Listener
          </Link>
          <Link href="/artist" style={linkStyle}>
            Artist
          </Link>
          <Link href="/admin" style={linkStyle}>
            Admin
          </Link>
        </nav>
        <Link href="/login" style={loginButtonStyle}>
          Login
        </Link>
      </div>

      <button 
        className="hamburger-btn" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <span className={`hamburger-line ${isOpen ? 'open' : ''}`}></span>
        <span className={`hamburger-line ${isOpen ? 'open' : ''}`}></span>
        <span className={`hamburger-line ${isOpen ? 'open' : ''}`}></span>
      </button>

      <nav className={`mobile-nav ${isOpen ? 'open' : ''}`}>
        <Link href="/listener" onClick={() => setIsOpen(false)}>
          Listener
        </Link>
        <Link href="/artist" onClick={() => setIsOpen(false)}>
          Artist
        </Link>
        <Link href="/admin" onClick={() => setIsOpen(false)}>
          Admin
        </Link>
        <Link 
          href="/login" 
          style={{...loginButtonStyle, textAlign: 'center'}}
          onClick={() => setIsOpen(false)}
        >
          Login
        </Link>
      </nav>
    </header>
  );
}

const actionsWrap: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  flexWrap: "nowrap"
};

const navStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  flexWrap: "nowrap"
};

const linkStyle: CSSProperties = {
  border: "1px solid var(--line)",
  borderRadius: 999,
  padding: "6px 10px",
  color: "#e8e8e8",
  fontSize: 12,
  textDecoration: "none"
};

const loginButtonStyle: CSSProperties = {
  border: "1px solid #6f64ff",
  borderRadius: 999,
  padding: "7px 14px",
  color: "#ffffff",
  background: "linear-gradient(135deg, #6f64ff, #7f3ef0)",
  fontSize: 12,
  fontWeight: 600,
  textDecoration: "none"
};
