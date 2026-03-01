'use client';

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Github } from "lucide-react";
import Link from "next/link";
import { createClient } from "../../lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      window.location.href = "/";
    }
    setLoading(false);
  };

  const handleMagicLink = async () => {
    if (!email) {
      setMessage("Please enter your email first.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) setMessage(error.message);
    else setMessage("Check your email for the magic link!");
    setLoading(false);
  };

  return (
    <div className="w-full max-w-md p-8 bg-surface border border-white/5 rounded-3xl shadow-2xl">
      <div className="flex flex-col items-center mb-10">
        <motion.div 
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
          className="mb-4"
        >
          <img src="/logo.webp" alt="PR3CIO" className="w-32 h-32 object-contain mx-auto" />
        </motion.div>
        <h1 className="text-3xl font-black tracking-tighter">WELCOME BACK</h1>
        <p className="text-text-secondary text-sm mt-2 uppercase tracking-widest font-bold">Log in to PR3CIO</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-text-secondary uppercase tracking-widest ml-1">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full bg-background border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-accent/50 outline-none transition-all"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center ml-1">
            <label className="text-xs font-bold text-text-secondary uppercase tracking-widest">Password</label>
            <Link href="/forgot-password" className="text-[10px] text-accent font-bold uppercase hover:underline">Forgot?</Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-background border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-accent/50 outline-none transition-all"
              required
            />
          </div>
        </div>

        {message && (
          <p className={`text-sm font-bold text-center ${message.includes("Check") ? "text-green-500" : "text-red-500"}`}>
            {message}
          </p>
        )}

        <button 
          disabled={loading}
          className="w-full bg-accent hover:bg-accent/90 text-white py-4 rounded-2xl font-black text-lg transition-all shadow-lg shadow-accent/20 flex items-center justify-center gap-2 group"
        >
          {loading ? "Authenticating..." : "Log In"}
          {!loading && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
        </button>
      </form>

      <div className="mt-8 space-y-4">
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
          <span className="relative px-4 bg-surface text-[10px] text-text-secondary font-bold uppercase tracking-[0.3em]">OR CONTINUE WITH</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={handleMagicLink}
            className="bg-white/5 hover:bg-white/10 border border-white/10 py-3 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors"
          >
            <Mail size={16} />
            Magic Link
          </button>
          <button className="bg-white/5 hover:bg-white/10 border border-white/10 py-3 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors">
            <Github size={16} />
            GitHub
          </button>
        </div>
      </div>

      <p className="mt-10 text-center text-text-secondary text-sm">
        Don&apos;t have an account? <Link href="/signup" className="text-accent font-bold hover:underline">Sign up for free</Link>
      </p>
    </div>
  );
}
