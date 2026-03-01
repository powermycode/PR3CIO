'use client';

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, User } from "lucide-react";
import Link from "next/link";
import { createClient } from "../../lib/supabase/client";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const supabase = createClient();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Check your email to confirm your account!");
    }
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
        <h1 className="text-3xl font-black tracking-tighter uppercase">Join PR3CIO</h1>
        <p className="text-text-secondary text-sm mt-2 uppercase tracking-widest font-bold">Create your artist profile</p>
      </div>

      <form onSubmit={handleSignup} className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-text-secondary uppercase tracking-widest ml-1">Full Name</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
            <input 
              type="text" 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="J. Cole"
              className="w-full bg-background border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-accent/50 outline-none transition-all"
              required
            />
          </div>
        </div>

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
          <label className="text-xs font-bold text-text-secondary uppercase tracking-widest ml-1">Password</label>
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
          {loading ? "Creating Account..." : "Sign Up"}
          {!loading && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
        </button>
      </form>

      <p className="mt-10 text-center text-text-secondary text-sm">
        Already have an account? <Link href="/login" className="text-accent font-bold hover:underline">Log in</Link>
      </p>
    </div>
  );
}
