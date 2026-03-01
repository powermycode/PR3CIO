'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export function UploadTrack() {
  const [loading, setLoading] = useState(false);

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-white/5">
      <h2 className="text-2xl font-bold mb-6 text-primary">Upload Track</h2>
      <form onSubmit={handleUpload} className="flex flex-col gap-4">
        <div>
          <label className="text-xs font-bold text-secondary uppercase tracking-widest mb-2 block">Track Title</label>
          <input 
            type="text" 
            placeholder="Enter title" 
            className="w-full bg-background border border-white/10 rounded-lg p-4 text-primary focus:border-accent focus:outline-none transition-colors"
            required
          />
        </div>
        
        <div>
          <label className="text-xs font-bold text-secondary uppercase tracking-widest mb-2 block">Genre</label>
          <input 
            type="text" 
            placeholder="e.g. Hip Hop" 
            className="w-full bg-background border border-white/10 rounded-lg p-4 text-primary focus:border-accent focus:outline-none transition-colors"
            required
          />
        </div>

        <div>
          <label className="text-xs font-bold text-secondary uppercase tracking-widest mb-2 block">Description</label>
          <textarea 
            placeholder="Tell your fans about this track..." 
            className="w-full bg-background border border-white/10 rounded-lg p-4 text-primary focus:border-accent focus:outline-none transition-colors min-h-[100px]"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="text-xs font-bold text-secondary uppercase tracking-widest mb-2 block">Audio File</label>
            <div className="w-full bg-background border border-white/10 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-accent transition-colors">
              <span className="text-accent text-sm font-bold">Select Audio</span>
            </div>
          </div>
          <div className="flex-1">
            <label className="text-xs font-bold text-secondary uppercase tracking-widest mb-2 block">Cover Art</label>
            <div className="w-full bg-background border border-white/10 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-accent transition-colors">
              <span className="text-accent text-sm font-bold">Select Image</span>
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="mt-4 w-full px-6 py-4 bg-accent text-primary rounded-full font-bold uppercase tracking-widest text-sm hover:bg-opacity-90 transition-colors disabled:opacity-50"
        >
          {loading ? 'Publishing...' : 'Publish Track'}
        </motion.button>
      </form>
    </div>
  );
}
