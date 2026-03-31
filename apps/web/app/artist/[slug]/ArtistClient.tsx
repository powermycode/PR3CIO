"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Play,
  Heart,
  Share2,
  Users,
  Globe,
  Music2,
  ExternalLink,
  Verified,
  Disc3,
  Loader2,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { artists } from "../../../data/artists";
import TrackCard from "../../../components/TrackCard";
import ShareBar from "../../../components/ShareBar";
import { useAudio } from "../../../lib/audio-context";

interface Track {
  id: string;
  title: string;
  audioUrl: string;
  coverArt?: string | null;
  genre?: string | null;
  playCount: number;
  likes: number;
  createdAt: string;
  artist: {
    id: string;
    stageName?: string | null;
    avatar?: string | null;
    user: {
      name?: string | null;
    };
  };
}

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: {
    id: string;
    name?: string | null;
    image?: string | null;
    isSupporter?: boolean;
  };
}

export default function ArtistProfilePage() {
  const { slug } = useParams();
  const { playTrack } = useAudio();
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);

  const artist = artists.find((a) => a.slug === slug);

  const handleSubscribe = async () => {
    if (!artist) return;
    setProcessingPayment(true);
    try {
      const res = await fetch("/api/stripe/create-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          artistId: artist.id,
          successUrl: window.location.href + "?success=true",
          cancelUrl: window.location.href + "?canceled=true",
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Error creating subscription:", error);
    } finally {
      setProcessingPayment(false);
    }
  };

  const handleSupport = async () => {
    if (!artist) return;
    setProcessingPayment(true);
    try {
      const res = await fetch("/api/stripe/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          artistId: artist.id,
          amount: 1000, // $10.00 tip
          successUrl: window.location.href + "?success=true",
          cancelUrl: window.location.href + "?canceled=true",
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Error creating payment:", error);
    } finally {
      setProcessingPayment(false);
    }
  };

  useEffect(() => {
    async function fetchArtistTracks() {
      try {
        const res = await fetch("/api/track");
        const data = await res.json();
        if (data.tracks) {
          setTracks(data.tracks);
        }
      } catch (error) {
        console.error("Error fetching tracks:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchArtistTracks();
  }, []);

  const handlePlayAll = () => {
    const firstTrack = tracks[0];
    if (firstTrack) {
      playTrack({
        id: firstTrack.id,
        title: firstTrack.title,
        artist:
          firstTrack.artist.stageName ||
          firstTrack.artist.user.name ||
          "Unknown",
        audioUrl: firstTrack.audioUrl,
        cover: firstTrack.coverArt || "/artists/artist-placeholder.jpg",
      });
      setIsPlaying(true);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    const firstTrack = tracks[0];
    if (!newComment.trim() || !firstTrack) return;

    setSubmittingComment(true);
    try {
      const res = await fetch("/api/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: newComment.trim(),
          trackId: firstTrack.id,
        }),
      });
      const data = await res.json();
      if (data.success && data.comment) {
        setComments((prev) => [data.comment, ...prev]);
        setNewComment("");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setSubmittingComment(false);
    }
  };

  if (!artist) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-8">
        <div className="w-20 h-20 rounded-full bg-surface flex items-center justify-center mb-6">
          <Music2 size={40} className="text-text-muted" />
        </div>
        <h1 className="text-4xl font-black mb-4 uppercase tracking-tight">
          Artist Not Found
        </h1>
        <p className="text-text-secondary mb-8 max-w-md">
          The artist you are looking for doesn&apos;t exist or may have been
          removed.
        </p>
        <Link href="/explore" className="btn-primary">
          Back to Explore
        </Link>
      </div>
    );
  }

  const otherArtists = artists.filter((a) => a.slug !== slug);

  return (
    <div className="relative">
      <section className="relative min-h-[60vh] md:min-h-[75vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={artist.image}
            alt=""
            className="w-full h-full object-cover scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/50 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 pt-32 md:pt-40 pb-12 flex flex-col md:flex-row items-end gap-8 md:gap-12 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0"
          >
            <div className="w-52 h-52 md:w-72 md:h-72 rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10">
              <img
                src={artist.image}
                alt={artist.name}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <div className="flex-1 space-y-6">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-text-muted">
                Artist Profile
              </span>
              {artist.verified && (
                <span className="inline-flex items-center gap-1.5 bg-accent/20 text-accent px-3 py-1 rounded-full text-xs font-bold border border-accent/30">
                  <Verified size={14} />
                  Verified
                </span>
              )}
              {artist.sponsored && (
                <span className="inline-flex items-center gap-1.5 bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-bold border border-yellow-500/30">
                  <Disc3 size={14} className="animate-spin-slow" />
                  Featured
                </span>
              )}
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.85]"
            >
              {artist.name}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-text-secondary"
            >
              <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider">
                <Users size={18} className="text-accent" />
                {artist.listeners} Listeners
              </span>
              <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider">
                <Globe size={18} className="text-accent" />
                {artist.country || "Global"}
              </span>
              <span className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-bold uppercase tracking-wider">
                {artist.genre}
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 py-12 space-y-16">
        <section className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="flex-1 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center gap-4"
            >
              <motion.button
                onClick={handlePlayAll}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary px-8 py-4 text-lg shadow-xl shadow-accent/30"
                disabled={tracks.length === 0 && !loading}
              >
                <Play size={22} fill="white" />
                Play All
              </motion.button>

              <button
                onClick={() => setIsFollowing(!isFollowing)}
                className={`btn px-8 py-4 text-base transition-all ${
                  isFollowing
                    ? "bg-accent/20 border-accent text-accent"
                    : "btn-secondary"
                }`}
              >
                {isFollowing ? "Following" : "Follow"}
              </button>

              <button
                onClick={handleSubscribe}
                disabled={processingPayment}
                className="btn px-8 py-4 text-base bg-accent text-white hover:bg-accent/90"
              >
                {processingPayment ? <Loader2 size={18} className="animate-spin" /> : "Subscribe"}
              </button>

              <button
                onClick={handleSupport}
                disabled={processingPayment}
                className="btn px-8 py-4 text-base border border-accent text-accent hover:bg-accent/5"
              >
                {processingPayment ? <Loader2 size={18} className="animate-spin" /> : "Support Artist"}
              </button>

              <Link
                href={`/store/${artist.slug}`}
                className="btn px-8 py-4 text-base bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-500/20"
              >
                Visit Store
                <ExternalLink size={18} />
              </Link>

              <motion.button
                onClick={() => setIsLiked(!isLiked)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`p-4 rounded-full border transition-all ${
                  isLiked
                    ? "bg-red-500/20 border-red-500/50 text-red-500"
                    : "glass hover:bg-white/5"
                }`}
              >
                <Heart size={24} fill={isLiked ? "currentColor" : "none"} />
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-black uppercase tracking-tight">
                Biography
              </h2>
              <p className="text-text-secondary text-lg leading-relaxed max-w-2xl">
                {artist.bio ||
                  `${artist.name} is a talented ${artist.genre} artist from ${artist.country || "the world"} making waves with ${artist.listeners} monthly listeners. Known for their unique sound and authentic approach to music.`}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <ShareBar slug={artist.slug} name={artist.name} />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:w-80 space-y-6"
          >
            <div className="glass rounded-3xl p-8 space-y-6">
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-text-muted border-b border-white/5 pb-4">
                Performance Stats
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary font-medium">
                    Monthly Listeners
                  </span>
                  <span className="font-black text-accent">
                    {artist.listeners}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary font-medium">
                    Followers
                  </span>
                  <span className="font-black">84.2K</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary font-medium">
                    Total Streams
                  </span>
                  <span className="font-black">4.2M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary font-medium">
                    Tracks
                  </span>
                  <span className="font-black">
                    {tracks.length || artist.tracks || 12}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-black uppercase tracking-tight flex items-center gap-3">
              <Music2 className="text-accent" />
              Tracks
            </h2>
            <span className="text-text-muted text-sm font-bold uppercase tracking-widest">
              {loading ? "..." : tracks.length} Releases
            </span>
          </div>

          {loading ? (
            <div className="glass rounded-3xl p-12 flex flex-col items-center justify-center">
              <Loader2 size={32} className="animate-spin text-accent mb-4" />
              <p className="text-text-muted">Loading tracks...</p>
            </div>
          ) : tracks.length > 0 ? (
            <div className="glass rounded-3xl p-6 space-y-2">
              {tracks.map((track, i) => (
                <TrackCard
                  key={track.id}
                  id={track.id}
                  title={track.title}
                  artist={
                    track.artist.stageName ||
                    track.artist.user.name ||
                    artist.name
                  }
                  cover={track.coverArt || artist.image}
                  audioUrl={track.audioUrl}
                  index={i}
                  showIndex
                />
              ))}
            </div>
          ) : (
            <div className="glass rounded-3xl p-12 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-surface flex items-center justify-center mb-4">
                <Music2 size={32} className="text-text-muted" />
              </div>
              <h3 className="text-xl font-bold mb-2">No tracks yet</h3>
              <p className="text-text-secondary mb-6">
                Check back soon for new releases
              </p>
              {artist.featuredTrack && (
                <TrackCard
                  id={`featured-${artist.slug}`}
                  title={artist.featuredTrack.title}
                  artist={artist.name}
                  cover={artist.image}
                  audioUrl={artist.featuredTrack.audioUrl}
                  index={0}
                  showIndex
                />
              )}
            </div>
          )}
        </section>

        {tracks.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3">
              <MessageSquare className="text-accent" />
              Comments
            </h2>
            <div className="glass rounded-3xl p-6 space-y-6">
              <form onSubmit={handleSubmitComment} className="flex gap-3">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Leave a comment..."
                  className="input flex-1"
                />
                <button
                  type="submit"
                  disabled={submittingComment || !newComment.trim()}
                  className="btn-primary px-6"
                >
                  {submittingComment ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    "Post"
                  )}
                </button>
              </form>
              <div className="space-y-4">
                {comments.length === 0 ? (
                  <p className="text-text-muted text-center py-4">
                    No comments yet. Be the first to comment!
                  </p>
                ) : (
                  comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="flex gap-4 p-4 bg-surface/50 rounded-2xl"
                    >
                      <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-accent font-bold text-sm">
                          {comment.user.name?.charAt(0).toUpperCase() || "A"}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-sm">
                            {comment.user.name || "Anonymous"}
                          </span>
                          {comment.user.isSupporter && (
                            <span className="inline-flex items-center gap-1 bg-accent/20 text-accent px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest border border-accent/30">
                              Supporter
                            </span>
                          )}
                          <span className="text-text-muted text-xs">
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-text-secondary text-sm">
                          {comment.content}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>
        )}

        {artist.featuredTrack && (
          <section className="space-y-8">
            <h2 className="text-3xl font-black uppercase tracking-tight">
              Featured Release
            </h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="glass rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 group"
            >
              <div className="relative w-40 h-40 md:w-52 md:h-52 rounded-2xl overflow-hidden shadow-2xl flex-shrink-0">
                <img
                  src={artist.image}
                  alt={artist.featuredTrack.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                  onClick={handlePlayAll}
                >
                  <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center shadow-xl shadow-accent/40">
                    <Play size={32} fill="white" className="text-white ml-1" />
                  </div>
                </div>
              </div>
              <div className="flex-1 text-center md:text-left space-y-4">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-accent">
                  Featured Single
                </span>
                <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
                  {artist.featuredTrack.title}
                </h3>
                <p className="text-text-secondary text-lg uppercase tracking-widest font-bold">
                  {artist.name} • 2024
                </p>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4">
                  <button
                    onClick={handlePlayAll}
                    className="btn-primary px-8 py-4"
                  >
                    <Play size={20} fill="white" />
                    Stream Now
                  </button>
                  <button className="btn-secondary px-8 py-4">
                    Add to Library
                  </button>
                </div>
              </div>
            </motion.div>
          </section>
        )}

        <section className="space-y-8 pb-12">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-black uppercase tracking-tight">
              More Artists
            </h2>
            <Link
              href="/explore"
              className="text-accent font-bold uppercase text-sm tracking-widest hover:underline"
            >
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {otherArtists.slice(0, 4).map((a, i) => (
              <Link key={a.slug} href={`/artist/${a.slug}`}>
                <div className="group cursor-pointer">
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-3 shadow-xl shadow-black/30">
                    <img
                      src={a.image}
                      alt={a.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center shadow-lg shadow-accent/30">
                        <Play size={24} fill="white" className="text-white" />
                      </div>
                    </div>
                  </div>
                  <h3 className="font-black text-xl uppercase tracking-tight group-hover:text-accent transition-colors">
                    {a.name}
                  </h3>
                  <p className="text-text-muted text-xs font-bold uppercase tracking-widest">
                    {a.genre} • {a.listeners}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
