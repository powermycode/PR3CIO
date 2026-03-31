"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Music,
  Image as ImageIcon,
  X,
  Check,
  Loader2,
  AlertCircle,
} from "lucide-react";

interface UploadFormProps {
  onUploadComplete?: (track: {
    title: string;
    audioFile: File;
    coverFile?: File;
  }) => void;
  compact?: boolean;
}

export default function UploadForm({
  onUploadComplete,
  compact = false,
}: UploadFormProps) {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("Hip Hop");
  const [description, setDescription] = useState("");
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [isDraggingAudio, setIsDraggingAudio] = useState(false);
  const [isDraggingCover, setIsDraggingCover] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const audioInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const genres = [
    "Hip Hop",
    "Trap",
    "R&B",
    "Drill",
    "Lo-Fi",
    "Dancehall",
    "Boom Bap",
    "Afrobeats",
  ];

  const handleAudioDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingAudio(false);
    const file = e.dataTransfer.files[0];
    if (
      file &&
      (file.type.includes("audio") ||
        file.name.match(/\.(mp3|wav|flac|m4a|aac|ogg)$/i))
    ) {
      setAudioFile(file);
    }
  };

  const handleCoverDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingCover(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setCoverFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setCoverPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleAudioSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setAudioFile(file);
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

  const simulateUpload = async () => {
    setIsUploading(true);
    setUploadProgress(0);
    setUploadStatus("idle");
    setErrorMessage("");

    for (let i = 0; i <= 100; i += 10) {
      await new Promise((r) => setTimeout(r, 150));
      setUploadProgress(i);
    }

    setIsUploading(false);
    setUploadStatus("success");

    if (onUploadComplete && audioFile) {
      onUploadComplete({
        title,
        audioFile,
        ...(coverFile ? { coverFile } : {}),
      });
    }

    setTimeout(() => {
      setUploadStatus("idle");
      setAudioFile(null);
      setCoverFile(null);
      setCoverPreview(null);
      setTitle("");
      setDescription("");
      setUploadProgress(0);
    }, 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setErrorMessage("Please enter a track title");
      return;
    }
    if (!audioFile) {
      setErrorMessage("Please upload an audio file");
      return;
    }

    setErrorMessage("");
    await simulateUpload();
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

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Track title"
          className="input"
        />

        <div className="grid grid-cols-2 gap-4">
          <div
            className={`drop-zone p-4 ${audioFile ? "border-accent bg-accent/5" : ""}`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDraggingAudio(true);
            }}
            onDragLeave={() => setIsDraggingAudio(false)}
            onDrop={handleAudioDrop}
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
              <div className="flex items-center gap-3">
                <Music size={20} className="text-accent" />
                <span className="text-sm truncate">{audioFile.name}</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <Music size={24} className="text-text-muted" />
                <span className="text-xs">Audio</span>
              </div>
            )}
          </div>

          <div
            className={`drop-zone p-4 ${coverFile ? "border-accent bg-accent/5" : ""}`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDraggingCover(true);
            }}
            onDragLeave={() => setIsDraggingCover(false)}
            onDrop={handleCoverDrop}
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
              <div className="relative w-full aspect-square rounded-lg overflow-hidden">
                <img
                  src={coverPreview}
                  alt="Cover"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <ImageIcon size={24} className="text-text-muted" />
                <span className="text-xs">Cover</span>
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="btn-primary w-full"
          disabled={isUploading}
        >
          {isUploading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Upload size={18} />
          )}
          {isUploading ? "Uploading..." : "Upload Track"}
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
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
            {genres.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
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
              ${isDraggingAudio ? "drop-zone-active" : ""}
              ${audioFile ? "border-accent/50 bg-accent/5" : ""}
            `}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDraggingAudio(true);
            }}
            onDragLeave={() => setIsDraggingAudio(false)}
            onDrop={handleAudioDrop}
            onClick={() => audioInputRef.current?.click()}
          >
            <input
              ref={audioInputRef}
              type="file"
              accept="audio/*,.mp3,.wav,.flac,.m4a"
              onChange={handleAudioSelect}
              className="hidden"
            />

            <AnimatePresence mode="wait">
              {audioFile ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex items-center gap-4 w-full"
                >
                  <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <Music size={24} className="text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold truncate">{audioFile.name}</p>
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
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-4"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center">
                    <Upload size={28} className="text-text-muted" />
                  </div>
                  <div className="text-center">
                    <p className="font-bold mb-1">Drop audio file here</p>
                    <p className="text-sm text-text-muted">
                      or click to browse
                    </p>
                    <p className="text-xs text-text-muted mt-2">
                      MP3, WAV, FLAC (Max 50MB)
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="space-y-3">
          <label className="label">Cover Art</label>
          <div
            className={`
              drop-zone relative
              ${isDraggingCover ? "drop-zone-active" : ""}
              ${coverFile ? "border-accent/50 bg-accent/5" : ""}
            `}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDraggingCover(true);
            }}
            onDragLeave={() => setIsDraggingCover(false)}
            onDrop={handleCoverDrop}
            onClick={() => coverInputRef.current?.click()}
          >
            <input
              ref={coverInputRef}
              type="file"
              accept="image/*"
              onChange={handleCoverSelect}
              className="hidden"
            />

            <AnimatePresence mode="wait">
              {coverPreview ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex items-center gap-4 w-full"
                >
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={coverPreview}
                      alt="Cover preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold">Cover art selected</p>
                    <p className="text-xs text-text-muted">{coverFile?.name}</p>
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
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-4"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center">
                    <ImageIcon size={28} className="text-text-muted" />
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
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {errorMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl"
        >
          <AlertCircle size={20} className="text-red-400" />
          <p className="text-sm font-medium text-red-400">{errorMessage}</p>
        </motion.div>
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
            disabled={isUploading || !title || !audioFile}
            className="w-full btn-primary py-5 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? (
              <>
                <Loader2 size={22} className="animate-spin" />
                Uploading... {uploadProgress}%
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

      {isUploading && (
        <div className="relative h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-accent rounded-full"
            style={{ width: `${uploadProgress}%` }}
            transition={{ duration: 0.15 }}
          />
        </div>
      )}
    </form>
  );
}
