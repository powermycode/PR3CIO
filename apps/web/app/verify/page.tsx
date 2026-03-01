"use client";

import Link from "next/link";
import { TopBar } from "../../components/top-bar";
import { pr3cioSubtitle } from "../../lib/pr3cio-content";

export default function VerifyPage() {
  return (
    <main className="page-container" style={{ minHeight: "100vh", padding: 16 }}>
      <TopBar subtitle={pr3cioSubtitle} />
      
      <div style={{ maxWidth: 400, margin: "80px auto", background: "rgba(20,20,24,0.8)", padding: 40, borderRadius: 24, border: "1px solid var(--line)", textAlign: "center" }}>
        <h1 style={{ fontSize: 32, margin: "0 0 8px" }}>Check Your Email</h1>
        <p style={{ color: "var(--muted)", marginBottom: 32 }}>We&apos;ve sent a verification link to your email address. Please click the link to activate your account.</p>
        
        <Link href="/login" className="hero-btn secondary" style={{ display: "inline-block", width: "100%" }}>
          Back to Login
        </Link>
      </div>
    </main>
  );
}
