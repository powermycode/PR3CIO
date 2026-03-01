'use client';

import React from "react";
import { motion } from "framer-motion";
import { 
  Upload, 
  BarChart3, 
  Users, 
  PlayCircle, 
  Plus, 
  MoreVertical,
  Music,
  Image as ImageIcon
} from "lucide-react";

export default function StudioPage() {
  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">ARTIST STUDIO</h1>
          <p className="text-text-secondary text-lg">Manage your tracks, analyze performance, and grow your audience.</p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg shadow-accent/20">
          <Upload size={20} />
          Upload New Track
        </button>
      </header>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Streams", value: "1.2M", icon: PlayCircle, color: "text-blue-500" },
          { label: "Followers", value: "45.8K", icon: Users, color: "text-purple-500" },
          { label: "Track Performance", value: "+12.5%", icon: BarChart3, color: "text-green-500" },
          { label: "Revenue", value: "$4,250", icon: Music, color: "text-yellow-500" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-surface border border-white/5 p-8 rounded-3xl"
          >
            <div className={`p-3 rounded-2xl bg-white/5 w-fit mb-6 ${stat.color}`}>
              <stat.icon size={28} />
            </div>
            <p className="text-text-secondary font-bold uppercase tracking-wider text-xs mb-1">{stat.label}</p>
            <h3 className="text-4xl font-black">{stat.value}</h3>
          </motion.div>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Upload Form Panel */}
        <section className="lg:col-span-2 space-y-8">
          <div className="bg-surface border border-white/5 p-8 rounded-3xl">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <Plus className="text-accent" />
              Upload Track Details
            </h2>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-text-secondary uppercase tracking-widest">Track Title</label>
                  <input 
                    type="text" 
                    placeholder="Enter track title"
                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-accent/50 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-text-secondary uppercase tracking-widest">Genre</label>
                  <select className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-accent/50 outline-none transition-all appearance-none">
                    <option>Hip Hop</option>
                    <option>Trap</option>
                    <option>R&B</option>
                    <option>Drill</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-text-secondary uppercase tracking-widest">Description</label>
                <textarea 
                  placeholder="Tell your fans about this track..."
                  rows={4}
                  className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-accent/50 outline-none transition-all resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-sm font-bold text-text-secondary uppercase tracking-widest">Audio File</label>
                  <div className="border-2 border-dashed border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 hover:border-accent/50 transition-colors cursor-pointer group">
                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Music className="text-text-secondary" />
                    </div>
                    <p className="text-sm font-bold text-text-secondary text-center">
                      Drag & drop audio or <span className="text-accent">browse</span>
                    </p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-tighter">MP3, WAV, FLAC (Max 50MB)</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-bold text-text-secondary uppercase tracking-widest">Cover Image</label>
                  <div className="border-2 border-dashed border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 hover:border-accent/50 transition-colors cursor-pointer group">
                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <ImageIcon className="text-text-secondary" />
                    </div>
                    <p className="text-sm font-bold text-text-secondary text-center">
                      Drag & drop image or <span className="text-accent">browse</span>
                    </p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-tighter">JPG, PNG (Max 5MB)</p>
                  </div>
                </div>
              </div>

              <button className="w-full bg-white text-black py-4 rounded-xl font-black text-lg hover:bg-gray-200 transition-colors">
                Publish Track
              </button>
            </form>
          </div>
        </section>

        {/* Recent Performance Panel */}
        <section className="space-y-8">
          <div className="bg-surface border border-white/5 p-8 rounded-3xl h-full">
            <h2 className="text-2xl font-bold mb-8">Recent Tracks</h2>
            <div className="space-y-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-16 h-16 rounded-xl bg-background border border-white/10 overflow-hidden flex-shrink-0">
                    <div className="w-full h-full bg-accent/20 flex items-center justify-center">
                      <Music size={24} className="text-accent" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold truncate">Demo Track #{i}</h4>
                    <p className="text-xs text-text-secondary">Released 2 days ago</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">2.4k</p>
                    <p className="text-[10px] text-green-500 font-bold uppercase">Plays</p>
                  </div>
                  <MoreVertical size={20} className="text-text-secondary" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
