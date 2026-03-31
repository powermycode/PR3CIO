"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  BarChart3,
  Users,
  PlayCircle,
  Music,
  Sparkles,
  Settings,
  Clock,
  TrendingUp,
  DollarSign,
  Check,
  AlertCircle,
  Loader2,
  X,
  Image as ImageIcon,
} from "lucide-react";
import TrackCard from "../../components/TrackCard";
import { useAppStore } from "../../lib/store/use-app-store";
import { demoTracks } from "../../lib/demo-tracks";

const DEMO_ARTIST_ID = "artist_lesj";

export default function PremiumStudioPage() {
  const [activeTab, setActiveTab] = useState<"upload" | "tracks" | "profile">(
    "upload",
  );
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("Hip Hop");
  const [description, setDescription] = useState("");
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [tracks, setTracks] = useState<
    Array<{
      id: string;
      title: string;
      artist: string;
      audioUrl: string;
      cover: string;
    }>
  >([]);

  const uploadedTracks = useAppStore((state) => state.uploadedTracks);
  const addUploadedTrack = useAppStore((state) => state.addUploadedTrack);

  const audioInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const allTracks = [...tracks, ...uploadedTracks, ...demoTracks.slice(0, 3)];

  const stats = [
    {
      label: "Total Streams",
      value: "1.2M",
      icon: PlayCircle,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
    },
    {
      label: "Followers",
      value: "45.8K",
      icon: Users,
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
    },
    {
      label: "Growth",
      value: "+12.5%",
      icon: TrendingUp,
      color: "text-green-400",
      bgColor: "bg-green-400/10",
    },
    {
      label: "Revenue",
      value: "$4,250",
      icon: DollarSign,
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/10",
    },
  ];

  const tabs = [
    { id: "upload" as const, label: "Upload", icon: Upload },
    { id: "tracks" as const, label: "My Tracks", icon: Music },
    { id: "profile" as const, label: "Profile", icon: Settings },
  ];

  const handleAudioSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAudioFile(file);
    }
  };

  const handleCoverSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setCoverPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setErrorMessage("Please enter a track title");
      setUploadStatus("error");
      return;
    }
    if (!audioFile) {
      setErrorMessage("Please select an audio file");
      setUploadStatus("error");
      return;
    }

    setIsUploading(true);
    setUploadStatus("uploading");
    setErrorMessage("");

    try {
      const formData = new FormData();
      formData.append("audioFile", audioFile);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        const text = await uploadRes.text();
        console.error("[/api/upload] Non-JSON response:", text);
        throw new Error(`Upload failed (${uploadRes.status}): ${text}`);
      }

      const contentType = uploadRes.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        const text = await uploadRes.text();
        console.error(
          "[/api/upload] Expected JSON but got:",
          contentType,
          text,
        );
        throw new Error("Server returned HTML instead of JSON");
      }

      const uploadData = await uploadRes.json();
      console.log("[/api/upload] Response:", uploadData);

      if (!uploadData.success) {
        throw new Error(uploadData.error || "Upload failed");
      }

      const trackRes = await fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          audioUrl: uploadData.fileUrl,
          artistId: DEMO_ARTIST_ID,
          coverUrl: coverPreview || null,
          genre,
          description: description.trim() || null,
        }),
      });

      if (!trackRes.ok) {
        const text = await trackRes.text();
        console.error("[/api/track] Non-JSON response:", text);
        throw new Error(`Failed to create track (${trackRes.status}): ${text}`);
      }

      const trackContentType = trackRes.headers.get("content-type") || "";
      if (!trackContentType.includes("application/json")) {
        const text = await trackRes.text();
        console.error(
          "[/api/track] Expected JSON but got:",
          trackContentType,
          text,
        );
        throw new Error("Server returned HTML instead of JSON");
      }

      const trackData = await trackRes.json();
      console.log("[/api/track] Response:", trackData);

      if (!trackData.success) {
        throw new Error(trackData.error || "Failed to create track");
      }

      const newTrack = {
        id: trackData.track.id,
        title: title.trim(),
        artist: "You",
        audioUrl: uploadData.fileUrl,
        cover: coverPreview || "/artists/artist-placeholder.jpg",
      };

      setTracks((prev) => [newTrack, ...prev]);
      addUploadedTrack(newTrack);
      setUploadStatus("success");

      setTimeout(() => {
        setTitle("");
        setDescription("");
        setAudioFile(null);
        setCoverFile(null);
        setCoverPreview(null);
        setUploadStatus("idle");
      }, 2000);
    } catch (error) {
      console.error("Upload error:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Upload failed. Please try again.",
      );
      setUploadStatus("error");
    } finally {
      setIsUploading(false);
    }
  };

  const removeAudio = () => {
    setAudioFile(null);
    if (audioInputRef.current) audioInputRef.current.value = "";
  };

  const removeCover = () => {
    setCoverFile(null);
    setCoverPreview(null);
    if (coverInputRef.current) coverInputRef.current.value = "";
  };

  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
            Artist Studio
          </h1>
          <p className="text-text-secondary text-lg">
            Manage your tracks, analyze performance, and grow your audience.
          </p>
        </div>

        <div className="flex bg-surface/80 backdrop-blur-xl p-1.5 rounded-2xl border border-white/5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all
                ${
                  activeTab === tab.id
                    ? "bg-accent text-white shadow-lg shadow-accent/20"
                    : "text-text-secondary hover:text-white hover:bg-white/5"
                }
              `}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-3xl p-6 space-y-3"
          >
            <div
              className={`w-12 h-12 rounded-2xl ${stat.bgColor} flex items-center justify-center`}
            >
              <stat.icon size={24} className={stat.color} />
            </div>
            <p className="text-text-muted text-xs font-bold uppercase tracking-widest">
              {stat.label}
            </p>
            <h3 className="text-3xl font-black">{stat.value}</h3>
          </motion.div>
        ))}
      </section>

      <AnimatePresence mode="wait">
        {activeTab === "upload" && (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-5 gap-10"
          >
            <div className="lg:col-span-3">
              <div className="glass rounded-3xl p-8 md:p-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center">
                    <Upload size={24} className="text-accent" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black">Upload New Track</h2>
                    <p className="text-text-secondary text-sm">
                      Share your music with the world
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="label">Track Title *</label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter your track title"
                        className="input"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="label">Genre</label>
                      <select
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        className="input appearance-none cursor-pointer"
                      >
                        <option>Hip Hop</option>
                        <option>Trap</option>
                        <option>R&B</option>
                        <option>Drill</option>
                        <option>Lo-Fi</option>
                        <option>Dancehall</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="label">Description (optional)</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Tell your fans about this track..."
                      rows={3}
                      className="input resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="label">Audio File *</label>
                      <div
                        className={`
                          drop-zone relative
                          ${audioFile ? "border-accent/50 bg-accent/5" : ""}
                        `}
                        onClick={() => audioInputRef.current?.click()}
                      >
                        <input
                          ref={audioInputRef}
                          type="file"
                          accept="audio/*,.mp3,.wav,.flac,.m4a"
                          onChange={handleAudioSelect}
                          className="hidden"
                        />

                        {audioFile ? (
                          <div className="flex items-center gap-4 w-full">
                            <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                              <Music size={24} className="text-accent" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-bold truncate">
                                {audioFile.name}
                              </p>
                              <p className="text-xs text-text-muted">
                                {(audioFile.size / (1024 * 1024)).toFixed(2)} MB
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeAudio();
                              }}
                              className="p-2 rounded-full hover:bg-white/10 transition-colors"
                            >
                              <X size={18} className="text-text-secondary" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center">
                              <Upload size={28} className="text-text-muted" />
                            </div>
                            <div className="text-center">
                              <p className="font-bold mb-1">
                                Drop audio file here
                              </p>
                              <p className="text-sm text-text-muted">
                                or click to browse
                              </p>
                              <p className="text-xs text-text-muted mt-2">
                                MP3, WAV, FLAC (Max 50MB)
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="label">Cover Art</label>
                      <div
                        className={`
                          drop-zone relative
                          ${coverFile ? "border-accent/50 bg-accent/5" : ""}
                        `}
                        onClick={() => coverInputRef.current?.click()}
                      >
                        <input
                          ref={coverInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleCoverSelect}
                          className="hidden"
                        />

                        {coverPreview ? (
                          <div className="flex items-center gap-4 w-full">
                            <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                              <img
                                src={coverPreview}
                                alt="Cover preview"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="font-bold">Cover art selected</p>
                              <p className="text-xs text-text-muted">
                                {coverFile?.name}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeCover();
                              }}
                              className="p-2 rounded-full hover:bg-white/10 transition-colors"
                            >
                              <X size={18} className="text-text-secondary" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center">
                              <ImageIcon
                                size={28}
                                className="text-text-muted"
                              />
                            </div>
                            <div className="text-center">
                              <p className="font-bold mb-1">Drop image here</p>
                              <p className="text-sm text-text-muted">
                                or click to browse
                              </p>
                              <p className="text-xs text-text-muted mt-2">
                                JPG, PNG (Max 5MB)
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {uploadStatus === "error" && (
                    <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl">
                      <AlertCircle size={20} className="text-red-400" />
                      <p className="text-sm font-medium text-red-400">
                        {errorMessage}
                      </p>
                    </div>
                  )}

                  <AnimatePresence mode="wait">
                    {uploadStatus === "success" ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex items-center justify-center gap-3 p-6 bg-green-500/10 border border-green-500/20 rounded-2xl"
                      >
                        <Check size={24} className="text-green-400" />
                        <p className="font-bold text-green-400">
                          Track uploaded successfully!
                        </p>
                      </motion.div>
                    ) : (
                      <motion.button
                        type="submit"
                        disabled={isUploading}
                        className="w-full btn-primary py-5 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isUploading ? (
                          <>
                            <Loader2 size={22} className="animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload size={22} />
                            Publish Track
                          </>
                        )}
                      </motion.button>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="glass rounded-3xl p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Clock size={18} className="text-accent" />
                  Recent Uploads
                </h3>
                <div className="space-y-3">
                  {tracks.slice(0, 3).map((track, i) => (
                    <motion.div
                      key={track.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-surface/50"
                    >
                      <div className="w-10 h-10 rounded-lg overflow-hidden">
                        <img
                          src={track.cover}
                          alt={track.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold truncate text-sm">
                          {track.title}
                        </p>
                        <p className="text-xs text-text-muted">Just now</p>
                      </div>
                    </motion.div>
                  ))}
                  {tracks.length === 0 && (
                    <p className="text-text-muted text-sm text-center py-4">
                      No uploads yet
                    </p>
                  )}
                </div>
              </div>

              <div className="glass rounded-3xl p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <BarChart3 size={18} className="text-accent" />
                  Quick Stats
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary text-sm">
                      Total Tracks
                    </span>
                    <span className="font-bold">{allTracks.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary text-sm">
                      Published
                    </span>
                    <span className="font-bold text-green-400">
                      {tracks.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary text-sm">Drafts</span>
                    <span className="font-bold">0</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "tracks" && (
          <motion.div
            key="tracks"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="glass rounded-3xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">All Tracks</h2>
                <span className="text-text-muted text-sm">
                  {allTracks.length} tracks
                </span>
              </div>
              <div className="space-y-2">
                {allTracks.map((track, i) => (
                  <TrackCard key={track.id} {...track} index={i} showIndex />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "profile" && (
          <motion.div
            key="profile"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-10"
          >
            <div className="lg:col-span-2">
              <div className="glass rounded-3xl p-8 space-y-6">
                <h2 className="text-2xl font-bold">Edit Profile</h2>

                <div className="space-y-2">
                  <label className="label">Stage Name</label>
                  <input
                    type="text"
                    placeholder="Your artist name"
                    className="input"
                  />
                </div>

                <div className="space-y-2">
                  <label className="label">Bio</label>
                  <textarea
                    placeholder="Tell your fans who you are..."
                    rows={4}
                    className="input resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="label">Instagram URL</label>
                    <input
                      type="url"
                      placeholder="https://instagram.com/..."
                      className="input"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="label">YouTube URL</label>
                    <input
                      type="url"
                      placeholder="https://youtube.com/..."
                      className="input"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <button className="btn-primary">Save Changes</button>
                  <button className="btn-secondary">Discard</button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="glass rounded-3xl p-6">
                <h3 className="text-lg font-bold mb-6">Profile Picture</h3>
                <div className="flex flex-col items-center gap-4">
                  <div className="w-32 h-32 rounded-2xl overflow-hidden bg-surface-2 border border-white/10">
                    <img
                      src="/artists/LesjPr3cio.png"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button className="btn-secondary w-full">
                    <ImageIcon size={18} />
                    Upload New Image
                  </button>
                </div>
              </div>

              <div className="glass rounded-3xl p-6">
                <h3 className="text-lg font-bold mb-4">Profile Preview</h3>
                <div className="text-center p-6 bg-surface rounded-2xl">
                  <div className="w-20 h-20 mx-auto rounded-xl overflow-hidden mb-3 border border-white/10">
                    <img
                      src="/artists/LesjPr3cio.png"
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="font-black text-lg">Lesj</h4>
                  <p className="text-text-muted text-xs uppercase tracking-widest">
                    Hip Hop • 269K Listeners
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
