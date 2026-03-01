'use client';

import React from 'react';
import { UploadTrack } from '../../components/UploadTrack';

export default function ArtistStudioPage() {
  return (
    <div className="w-full flex flex-col py-8 px-6 max-w-7xl mx-auto min-h-screen">
      <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter text-primary">Artist Studio</h1>
          <p className="text-secondary mt-1">Manage your tracks and insights</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-card px-6 py-4 rounded-xl border border-white/5 text-center flex-1 md:flex-none">
            <p className="text-secondary text-xs uppercase tracking-widest mb-1">Total Plays</p>
            <p className="text-2xl font-bold text-primary">124.5K</p>
          </div>
          <div className="bg-card px-6 py-4 rounded-xl border border-white/5 text-center flex-1 md:flex-none">
            <p className="text-secondary text-xs uppercase tracking-widest mb-1">Followers</p>
            <p className="text-2xl font-bold text-primary">8.2K</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <UploadTrack />
        </div>
        
        <div className="space-y-8">
          <div className="bg-card rounded-xl p-6 border border-white/5">
            <h2 className="text-lg font-bold mb-4 text-primary">Draft Projects</h2>
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-background rounded-lg border border-white/5">
                  <div className="w-12 h-12 bg-white/10 rounded-md flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-secondary">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-primary">Untitled Track {i}</h4>
                    <p className="text-xs text-secondary">Last edited 2 days ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
