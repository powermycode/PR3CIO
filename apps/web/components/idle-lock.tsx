"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { BrandLogo } from "./brand-logo";

const IDLE_TIMEOUT_MS = 2 * 60 * 1000; // 2 minutes

export function IdleLock() {
  const [isLocked, setIsLocked] = useState(false);
  
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const resetTimer = () => {
      if (isLocked) return;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsLocked(true), IDLE_TIMEOUT_MS);
    };

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    
    events.forEach(event => {
      document.addEventListener(event, resetTimer, true);
    });
    
    resetTimer();

    return () => {
      clearTimeout(timeoutId);
      events.forEach(event => {
        document.removeEventListener(event, resetTimer, true);
      });
    };
  }, [isLocked]);

  if (!isLocked) return null;

  return (
    <div style={lockOverlay}>
      <div className="hero-noise-layer" style={{ zIndex: 1 }} />
      <div className="ai-waveform-container" style={{ opacity: 0.4, zIndex: 2 }}>
        <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="ai-waveform-svg" style={{ animationDuration: '10s' }}>
          <path d="M0,50 Q125,0 250,50 T500,50 T750,50 T1000,50 V100 H0 Z" fill="url(#lockWaveGrad)" />
          <defs>
            <linearGradient id="lockWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6f64ff" />
              <stop offset="50%" stopColor="#457dff" />
              <stop offset="100%" stopColor="#6f64ff" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      <div style={lockContent}>
        <div style={{ transform: 'scale(1.5)', marginBottom: 20 }}>
          <BrandLogo />
        </div>
        <h2 style={{ fontSize: 32, margin: '0 0 8px', fontWeight: 600 }}>Session Locked</h2>
        <p style={{ color: 'var(--muted)', margin: '0 0 32px' }}>You have been idle for a while.</p>
        
        <button 
          onClick={() => setIsLocked(false)}
          className="hero-btn primary"
          style={{ padding: '12px 40px', fontSize: 16 }}
        >
          Unlock Session
        </button>
      </div>
    </div>
  );
}

const lockOverlay: CSSProperties = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(5, 5, 7, 0.95)',
  backdropFilter: 'blur(20px)',
  zIndex: 10000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const lockContent: CSSProperties = {
  position: 'relative',
  zIndex: 10,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: 'rgba(255,255,255,0.03)',
  padding: 60,
  borderRadius: 32,
  border: '1px solid var(--line)',
  boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
};
