"use client";

import { useEffect } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  a: number;
}

export function HeroSection() {
  useEffect(() => {
    const canvas = document.getElementById("heroCanvas") as HTMLCanvasElement | null;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    let width = 0;
    let height = 0;
    let rafId = 0;
    let lastTime = 0;
    const frameMs = 1000 / 30;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const particles: Particle[] = [];
    const baseCount = window.innerWidth < 768 ? 24 : 44;

    const syncCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    syncCanvasSize();

    for (let i = 0; i < baseCount; i += 1) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.14,
        vy: (Math.random() - 0.5) * 0.12,
        r: Math.random() * 1.8 + 0.8,
        a: Math.random() * 0.55 + 0.1
      });
    }

    const draw = (time: number) => {
      if (time - lastTime < frameMs) {
        rafId = window.requestAnimationFrame(draw);
        return;
      }
      lastTime = time;

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(7,8,12,0.16)";
      ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = "lighter";

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < -30 || particle.x > width + 30) {
          particle.vx *= -1;
        }
        if (particle.y < -30 || particle.y > height + 30) {
          particle.vy *= -1;
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2, false);
        ctx.fillStyle = `rgba(127, 104, 247, ${particle.a})`;
        ctx.fill();

        // Draw connections (Neural Network)
        particles.forEach((other) => {
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(111, 100, 255, ${0.15 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      rafId = window.requestAnimationFrame(draw);
    };

    if (!reduceMotion) {
      rafId = window.requestAnimationFrame(draw);
    }

    const onResize = () => {
      syncCanvasSize();
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section id="hero" className="hero-section">
      <div className="hero-bg-image-layer">
        <img src="/images/hero-ai-music.png" alt="" className="hero-bg-img" />
        <div className="hero-bg-gradient" />
      </div>

      <div className="hero-content">
        <div className="headline-waveform" />
        <h1 className="hero-title">Create Music With AI. Share Your Sound.</h1>
        <p className="hero-subtitle">Experience the future of music production and discovery on PR3CIO.</p>
        <div className="hero-cta-group">
          <a href="/login" className="btn hero-btn primary">
            Get Started
          </a>
          <a href="/listener" className="btn hero-btn secondary">
            Explore
          </a>
        </div>
      </div>

      <div className="hero-visual-wrapper">
        <div className="hero-canvas-blur" />
        {/* Animated Spectrum Bars */}
        <div className="audio-spectrum hero-spectrum" style={{ height: 120, gap: 8, opacity: 0.6, zIndex: 1 }}>
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="spectrum-bar glow" 
              style={{ 
                animationDelay: `${i * 0.08}s`, 
                height: `${20 + (i % 5) * 20}%`,
                width: 10,
                background: 'linear-gradient(to top, #6f64ff, #457dff)'
              }}
            ></div>
          ))}
        </div>
        <canvas id="heroCanvas" />
      </div>

      <div className="ai-waveform-container">
        <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="ai-waveform-svg">
          <path
            d="M0,50 Q125,0 250,50 T500,50 T750,50 T1000,50 V100 H0 Z"
            fill="url(#waveformGradient)"
          />
          <defs>
            <linearGradient id="waveformGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6f64ff" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#457dff" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#6f64ff" stopOpacity="0.4" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
}
