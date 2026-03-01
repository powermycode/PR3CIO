/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { TopBar } from "./top-bar";
import { pr3cioSubtitle } from "../lib/pr3cio-content";

interface FeaturePageProps {
  title: string;
  description: string;
  image?: string;
}

export function FeaturePage({ title, description, image }: FeaturePageProps) {
  return (
    <main className="page-container" style={{ minHeight: '100vh', padding: 16, position: 'relative', overflow: 'hidden' }}>
      <TopBar subtitle={pr3cioSubtitle} />
      
      {/* Background Music Visuals */}
      <div className="grid-bg-effects" style={{ opacity: 0.4 }}>
        <div className="moving-glow" />
        <div className="ai-waveform-container" style={{ opacity: 0.15, bottom: '10%' }}>
          <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="ai-waveform-svg" style={{ animationDuration: '20s' }}>
            <path d="M0,50 Q125,0 250,50 T500,50 T750,50 T1000,50 V100 H0 Z" fill="url(#waveGrad)" />
            <defs>
              <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6f64ff" />
                <stop offset="50%" stopColor="#457dff" />
                <stop offset="100%" stopColor="#6f64ff" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <div className="reveal visible" style={{ marginTop: 60, textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <h1 style={{ 
          fontSize: 'clamp(40px, 10vw, 84px)', 
          fontWeight: 900,
          letterSpacing: '-0.04em',
          marginBottom: 24,
          background: 'linear-gradient(to bottom, #fff 40%, rgba(255,255,255,0.5))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          {title}
        </h1>
        
        <div className="audio-visual-hero" style={{ height: 320, marginBottom: 48, boxShadow: '0 0 50px rgba(111, 100, 255, 0.2)' }}>
          {image ? (
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <img 
                src={image} 
                alt={title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg), transparent)' }} />
            </div>
          ) : (
            <div className="audio-spectrum" style={{ gap: 6, height: 120 }}>
              {[...Array(40)].map((_, i) => (
                <div 
                  key={i} 
                  className="spectrum-bar" 
                  style={{ 
                    animationDelay: `${i * 0.04}s`, 
                    height: `${30 + (i % 5) * 15}%`,
                    width: 6,
                    background: 'linear-gradient(to top, #6f64ff, #457dff)'
                  }}
                ></div>
              ))}
            </div>
          )}
        </div>

        <div style={{ 
          maxWidth: 720, 
          margin: '0 auto', 
          textAlign: 'center', 
          background: 'rgba(20,20,24,0.6)', 
          padding: '48px 32px', 
          borderRadius: 32, 
          border: '1px solid var(--line)',
          backdropFilter: 'blur(12px)'
        }}>
          <p style={{ fontSize: 22, lineHeight: 1.6, color: '#e0e0e0', marginBottom: 40 }}>
            {description}
          </p>
          
          <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href={"/get-started" as any} className="hero-btn primary" style={{ padding: '16px 40px', fontSize: 18 }}>
              Get Started Now
            </Link>
            <Link href="/" className="hero-btn secondary" style={{ padding: '16px 40px', fontSize: 18 }}>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
