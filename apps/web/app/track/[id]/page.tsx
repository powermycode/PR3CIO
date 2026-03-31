'use client';

import React, { useState } from "react";
import { Music, ArrowLeft, Share2, Play, Users, MessageSquare, Send, Plus } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function TrackPage() {
  const params = useParams();
  const [comment, setComment] = useState("");
  
  const mockLyrics = `[Verse 1]
Midnight city, lights flashing gold
Stories of ambition yet to be told
Riding through the shadows, feeling the heat
Concrete jungle under my feet.

[Chorus]
We're rising higher, touch the sky
Never looking back, never asking why
PR3CIO diamond, shine so bright
In the middle of the darkest night.

[Verse 2]
Every step I take, I'm making my way
Turn the night into a brand new day
The rhythm in my veins, the fire in my soul
Taking back the power, taking full control.`;

  const collaborators = [
    { name: "Alex Producer", role: "Producer", status: "Online" },
    { name: "Sarah Vocalist", role: "Feature", status: "Offline" },
  ];

  const comments = [
    { author: "Alex Producer", text: "Love the energy in the second verse! Let's add some heavy bass there.", time: "2 hours ago" },
    { author: "You", text: "Great idea, Alex. I'll tweak the lyrics to match that vibe.", time: "1 hour ago" },
  ];

  return (
    <div className="min-h-screen bg-background text-white font-sans">
      {/* Header */}
      <header className="border-b border-white/5 bg-surface/30 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="p-2 hover:bg-white/5 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5 text-secondary" />
            </Link>
            <div>
              <h1 className="text-xl font-black uppercase tracking-tight">Midnight Ambition</h1>
              <p className="text-[10px] font-black uppercase tracking-widest text-accent">Track ID: {params.id}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-6 py-2 bg-white/5 hover:bg-white/10 text-white rounded-full text-xs font-black uppercase tracking-widest border border-white/10 flex items-center gap-2 transition-all">
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button className="px-6 py-2 bg-accent hover:bg-accent-hover text-black rounded-full text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 shadow-lg shadow-accent/20">
              <Play className="w-4 h-4 fill-black" />
              Generate Music
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Lyrics Section */}
          <div className="lg:col-span-7 space-y-8">
            <div className="p-10 rounded-[2.5rem] bg-surface/50 border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-accent/10 rounded-lg text-accent">
                    <Music className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-black uppercase tracking-tight">Lyric Sheet</h2>
                </div>
                <div className="whitespace-pre-wrap font-mono text-lg leading-relaxed text-secondary/90 bg-black/20 p-8 rounded-3xl border border-white/5">
                  {mockLyrics}
                </div>
              </div>
            </div>
          </div>

          {/* Collaboration Sidebar */}
          <div className="lg:col-span-5 space-y-8">
            {/* Collaborators */}
            <section className="p-8 rounded-[2rem] bg-surface/50 border border-white/5">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-accent" />
                  <h3 className="font-black uppercase tracking-tight">Collaborators</h3>
                </div>
                <button className="p-2 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-4">
                {collaborators.map((collab) => (
                  <div key={collab.name} className="flex items-center justify-between p-4 rounded-2xl bg-black/20 border border-white/5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gold-gradient rounded-full flex items-center justify-center text-black font-black text-xs">
                        {collab.name[0]}
                      </div>
                      <div>
                        <div className="text-sm font-bold">{collab.name}</div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-secondary">{collab.role}</div>
                      </div>
                    </div>
                    <div className={`text-[10px] font-black uppercase tracking-widest ${collab.status === 'Online' ? 'text-green-500' : 'text-secondary/50'}`}>
                      {collab.status}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Comments / Chat */}
            <section className="p-8 rounded-[2rem] bg-surface/50 border border-white/5 flex flex-col h-[500px]">
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="w-5 h-5 text-accent" />
                <h3 className="font-black uppercase tracking-tight">Feedback</h3>
              </div>
              <div className="flex-1 overflow-y-auto space-y-6 mb-6 scrollbar-hide">
                {comments.map((msg, i) => (
                  <div key={i} className={`flex flex-col ${msg.author === 'You' ? 'items-end' : 'items-start'}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-black uppercase tracking-widest text-secondary">{msg.author}</span>
                      <span className="text-[10px] text-secondary/30">• {msg.time}</span>
                    </div>
                    <div className={`p-4 rounded-2xl text-sm max-w-[80%] ${msg.author === 'You' ? 'bg-accent text-black font-medium' : 'bg-white/5 border border-white/10 text-secondary'}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
              <div className="relative">
                <input 
                  type="text" 
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-sm font-medium focus:border-accent outline-none pr-12"
                />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-accent hover:text-accent-hover transition-colors">
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
