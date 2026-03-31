"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Music4, Sparkles, UploadCloud, WandSparkles } from "lucide-react";
import { generateTrack, uploadTrackAction } from "../app/actions";
import { parseFileName } from "../lib/track-metadata";

interface UploadFormProps {
  title: string;
  description: string;
  compact?: boolean;
}

interface ActionFeedback {
  status: "idle" | "success" | "error";
  message: string;
  artist: string;
  title: string;
  fileUrl: string;
  provider?: "suno" | "mock";
  warning?: string;
}

const initialFeedback: ActionFeedback = {
  status: "idle",
  message: "",
  artist: "",
  title: "",
  fileUrl: ""
};

export function UploadForm({ title, description, compact = false }: UploadFormProps) {
  const isMountedRef = useRef(true);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [prompt, setPrompt] = useState("");
  const [preview, setPreview] = useState(parseFileName("New Artist - Untitled.mp3"));
  const [uploadFeedback, setUploadFeedback] = useState<ActionFeedback>(initialFeedback);
  const [generateFeedback, setGenerateFeedback] = useState<ActionFeedback>(initialFeedback);
  const [isUploading, startUploadTransition] = useTransition();
  const [isGenerating, startGenerateTransition] = useTransition();

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const resetSelectedFile = () => {
    setSelectedFileName("");
    setPreview(parseFileName("New Artist - Untitled.mp3"));
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const setInputFile = (file: File) => {
    const transfer = new DataTransfer();
    transfer.items.add(file);
    if (inputRef.current) {
      inputRef.current.files = transfer.files;
    }

    const parsed = parseFileName(file.name);
    setSelectedFileName(file.name);
    setPreview(parsed);
    setUploadFeedback(initialFeedback);
  };

  const handleUpload = (formData: FormData) => {
    startUploadTransition(async () => {
      try {
        const result = await uploadTrackAction(formData);
        if (!result.success) {
          if (isMountedRef.current) {
            setUploadFeedback({
              ...initialFeedback,
              status: "error",
              message: result.error ?? "Upload failed.",
              artist: preview.artistName,
              title: preview.title
            });
          }
          return;
        }

        if (isMountedRef.current) {
          setUploadFeedback({
            status: "success",
            message: "Track uploaded successfully.",
            artist: result.artist ?? preview.artistName,
            title: result.title ?? preview.title,
            fileUrl: result.fileUrl ?? ""
          });
        }
        resetSelectedFile();
        try {
          router.refresh();
        } catch (error) {
          console.error(error);
        }
      } catch (error) {
        console.error(error);
        if (isMountedRef.current) {
          setUploadFeedback({
            ...initialFeedback,
            status: "error",
            message: "Upload failed.",
            artist: preview.artistName,
            title: preview.title
          });
        }
      }
    });
  };

  const handleGenerate = () => {
    startGenerateTransition(async () => {
      try {
        const result = await generateTrack(prompt);
        if (!result.success) {
          if (isMountedRef.current) {
            setGenerateFeedback({
              ...initialFeedback,
              status: "error",
              message: result.error ?? "Generation failed."
            });
          }
          return;
        }

        if (isMountedRef.current) {
          setGenerateFeedback({
            status: "success",
            message: result.provider === "suno" ? "AI track generated successfully." : "Mock AI track created successfully.",
            artist: result.artist ?? "AI Studio",
            title: result.title ?? "Generated Track",
            fileUrl: result.fileUrl ?? "",
            ...(result.provider ? { provider: result.provider } : {}),
            ...(result.warning ? { warning: result.warning } : {})
          });
          setPrompt("");
        }
        try {
          router.refresh();
        } catch (error) {
          console.error(error);
        }
      } catch (error) {
        console.error(error);
        if (isMountedRef.current) {
          setGenerateFeedback({
            ...initialFeedback,
            status: "error",
            message: "Generation failed."
          });
        }
      }
    });
  };

  return (
    <div
      id="upload"
      className={`rounded-[28px] border border-white/12 bg-white/[0.04] ${compact ? "p-5" : "p-7"} shadow-[0_20px_80px_rgba(5,8,18,0.4)]`}
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-[#7C4DFF]">Artist ingestion</p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold text-white">{title}</h2>
          <p className="mt-2 max-w-xl text-sm text-white/58">{description}</p>
        </div>
        <div className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/40">
          Metadata auto-detect + Suno
        </div>
      </div>

      <form
        action={handleUpload}
        className="mt-6 space-y-4"
      >
        <input
          ref={inputRef}
          type="file"
          accept=".mp3,audio/mpeg"
          name="audioFile"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) {
              setInputFile(file);
            }
          }}
        />

        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(event) => {
            event.preventDefault();
            setIsDragging(false);
            const file = event.dataTransfer.files?.[0];
            if (file) {
              setInputFile(file);
            }
          }}
          className={`group relative overflow-hidden rounded-[28px] border border-dashed px-5 py-8 transition ${
            isDragging ? "border-[#7C4DFF] bg-[#7C4DFF]/12" : "border-white/14 bg-black/25 hover:border-white/24 hover:bg-white/[0.05]"
          }`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,77,255,0.18),transparent_45%)] opacity-0 transition group-hover:opacity-100" />
          <div className="relative flex flex-col items-center justify-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.06] text-[#7C4DFF]">
              <UploadCloud className="h-8 w-8" />
            </div>
            <p className="font-[family-name:var(--font-display)] text-xl font-semibold text-white">Drop an MP3 or browse</p>
            <p className="mt-2 max-w-md text-sm text-white/50">
              PR3CIO reads ID3 metadata first, falls back to the filename, creates the artist automatically, and publishes the track into the live feed.
            </p>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-[1.2fr_1fr]">
          <div className="rounded-[24px] border border-white/10 bg-black/20 p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-white/72">
              <Music4 className="h-4 w-4 text-[#4CC9F0]" />
              Selected file
            </div>
            <p className="mt-3 truncate font-[family-name:var(--font-display)] text-lg text-white">
              {selectedFileName || "No track selected yet"}
            </p>
            <p className="mt-2 text-sm text-white/45">
              {selectedFileName ? "Ready to ingest into the live feed and admin console." : "Use a file like Artist - Title.mp3 for the cleanest fallback parse."}
            </p>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-black/20 p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-white/72">
              <Sparkles className="h-4 w-4 text-[#7C4DFF]" />
              Parsed preview
            </div>
            <p className="mt-3 text-sm text-white/45">Artist</p>
            <p className="text-base font-medium text-white">{selectedFileName ? preview.artistName : "Waiting for file"}</p>
            <p className="mt-3 text-sm text-white/45">Title</p>
            <p className="text-base font-medium text-white">{selectedFileName ? preview.title : "Waiting for file"}</p>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-[1.25fr_auto]">
          <div className="rounded-[24px] border border-white/10 bg-black/20 p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-white/72">
              <WandSparkles className="h-4 w-4 text-[#4CC9F0]" />
              Generate with AI
            </div>
            <textarea
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              placeholder="Describe the song you want Suno to generate..."
              className="mt-3 min-h-[118px] w-full rounded-[18px] border border-white/10 bg-[#050913] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-[#4CC9F0]"
            />
          </div>

          <button
            type="button"
            disabled={isGenerating || prompt.trim().length === 0}
            onClick={handleGenerate}
            className="inline-flex items-center justify-center rounded-full border border-[#4CC9F0]/30 bg-[#4CC9F0]/12 px-6 py-3 text-sm font-semibold text-white transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isGenerating ? "Generating..." : "Generate with AI"}
          </button>
        </div>

        <AnimatePresence initial={false}>
          {uploadFeedback.status !== "idle" ? (
            <FeedbackBanner
              key={`upload-${uploadFeedback.message}`}
              feedback={uploadFeedback}
            />
          ) : null}
        </AnimatePresence>

        <AnimatePresence initial={false}>
          {generateFeedback.status !== "idle" ? (
            <FeedbackBanner
              key={`generate-${generateFeedback.message}`}
              feedback={generateFeedback}
            />
          ) : null}
        </AnimatePresence>

        <button
          type="submit"
          disabled={isUploading || selectedFileName.length === 0}
          className={`inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#7C4DFF] via-[#6A8DFF] to-[#4CC9F0] font-semibold text-white shadow-[0_20px_60px_rgba(92,124,255,0.32)] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60 ${
            compact ? "w-full px-5 py-3 text-sm" : "px-6 py-3.5 text-sm"
          }`}
        >
          {isUploading ? "Uploading track..." : "Upload and parse track"}
        </button>
      </form>
    </div>
  );
}

function FeedbackBanner({ feedback }: { feedback: ActionFeedback }) {
  const isSuccess = feedback.status === "success";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6 }}
      className={`flex items-start gap-3 rounded-[22px] border px-4 py-3 text-sm ${
        isSuccess ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-100" : "border-rose-400/20 bg-rose-400/10 text-rose-100"
      }`}
    >
      {isSuccess ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /> : <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />}
      <div>
        <p className="font-medium">{feedback.message}</p>
        {feedback.artist || feedback.title ? (
          <p className="mt-1 text-xs uppercase tracking-[0.22em] text-white/55">
            {feedback.artist} {feedback.title ? `• ${feedback.title}` : ""}
          </p>
        ) : null}
        {feedback.warning ? (
          <p className="mt-2 text-xs text-white/70">{feedback.warning}</p>
        ) : null}
      </div>
    </motion.div>
  );
}
