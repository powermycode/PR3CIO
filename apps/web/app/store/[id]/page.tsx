"use client";

import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ShoppingBag,
  Calendar,
  ArrowLeft,
  Disc3,
  Plus,
  Check,
  Music2,
  Users,
} from "lucide-react";
import { artists } from "../../../data/artists";
import { useState } from "react";

const mockMerch = [
  {
    id: "1",
    name: "Official Tour Hoodie",
    price: 89,
    type: "Apparel",
    variants: ["S", "M", "L", "XL"],
  },
  {
    id: "2",
    name: "Signed Poster",
    price: 45,
    type: "Merch",
    variants: ["A3", "A2"],
  },
  {
    id: "3",
    name: "Studio Session",
    price: 200,
    type: "Service",
    variants: ["1hr", "2hr"],
  },
  {
    id: "4",
    name: "Custom Beat",
    price: 350,
    type: "Service",
    variants: ["Basic", "Premium"],
  },
  {
    id: "5",
    name: "Vinyl Album",
    price: 65,
    type: "Music",
    variants: ["Standard", "Deluxe"],
  },
  {
    id: "6",
    name: "Meet & Greet",
    price: 500,
    type: "Experience",
    variants: ["Virtual", "In-Person"],
  },
];

const mockBookings = [
  {
    id: "1",
    date: "Apr 15, 2026",
    time: "2:00 PM",
    type: "Studio Session",
    price: 200,
    available: true,
  },
  {
    id: "2",
    date: "Apr 18, 2026",
    time: "10:00 AM",
    type: "Virtual Collab",
    price: 150,
    available: true,
  },
  {
    id: "3",
    date: "Apr 20, 2026",
    time: "7:00 PM",
    type: "Live Performance",
    price: 2500,
    available: false,
  },
  {
    id: "4",
    date: "Apr 22, 2026",
    time: "3:00 PM",
    type: "Masterclass",
    price: 100,
    available: true,
  },
];

export default function ArtistStorePage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<"merch" | "bookings">("merch");
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [selectedVariant, setSelectedVariant] = useState<{
    [key: string]: string;
  }>({});
  const [purchaseSuccess, setPurchaseSuccess] = useState<string | null>(null);

  const artist = artists.find((a) => a.slug === id);

  if (!artist) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4">Store Not Found</h1>
          <p className="text-text-secondary mb-8">
            This artist store doesn&apos;t exist.
          </p>
          <Link
            href="/explore"
            className="px-8 py-3 bg-accent rounded-full font-bold"
          >
            Back to Explore
          </Link>
        </div>
      </div>
    );
  }

  const addToCart = (itemId: string) => {
    setCart((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    setPurchaseSuccess(itemId);
    setTimeout(() => setPurchaseSuccess(null), 2000);
  };

  const cartTotal = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-indigo-900/10 pointer-events-none" />

      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href={`/artist/${artist.slug}`}
              className="p-2 hover:bg-surface rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/10">
              <img
                src={artist.image}
                alt={artist.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="font-display text-xl font-black">
                {artist.name} Store
              </h1>
              <p className="text-text-secondary text-sm">
                Official Merch & Bookings
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-6">
              <button
                onClick={() => setActiveTab("merch")}
                className={`flex items-center gap-2 text-sm font-bold transition-colors ${activeTab === "merch" ? "text-purple-400" : "text-text-secondary hover:text-text-primary"}`}
              >
                <ShoppingBag className="w-4 h-4" />
                Merch
              </button>
              <button
                onClick={() => setActiveTab("bookings")}
                className={`flex items-center gap-2 text-sm font-bold transition-colors ${activeTab === "bookings" ? "text-purple-400" : "text-text-secondary hover:text-text-primary"}`}
              >
                <Calendar className="w-4 h-4" />
                Book
              </button>
            </nav>

            <button className="relative p-3 rounded-full bg-surface hover:bg-surface-2 transition-colors border border-white/5">
              <ShoppingBag className="w-5 h-5" />
              {cartTotal > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-purple-500 text-xs font-bold flex items-center justify-center">
                  {cartTotal}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden">
            <div className="absolute inset-0">
              <img
                src={artist.image}
                alt={artist.name}
                className="w-full h-full object-cover opacity-30"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-background/60 to-background" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            <div className="relative h-full flex items-end px-12 pb-8">
              <div>
                <p className="text-purple-400 text-sm font-black uppercase tracking-widest mb-2">
                  Official Store
                </p>
                <h2 className="font-display text-4xl md:text-6xl font-black mb-2">
                  {artist.name}
                </h2>
                <p className="text-text-secondary max-w-md">
                  Exclusive merch drops, studio sessions, and experiences from
                  the artist
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex gap-3 mb-12">
          <button
            onClick={() => setActiveTab("merch")}
            className={`px-6 py-3 rounded-full font-bold text-sm transition-all ${
              activeTab === "merch"
                ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg shadow-purple-500/20"
                : "bg-surface text-text-secondary hover:bg-surface-2"
            }`}
          >
            Merchandise
          </button>
          <button
            onClick={() => setActiveTab("bookings")}
            className={`px-6 py-3 rounded-full font-bold text-sm transition-all ${
              activeTab === "bookings"
                ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg shadow-purple-500/20"
                : "bg-surface text-text-secondary hover:bg-surface-2"
            }`}
          >
            Book a Session
          </button>
        </div>

        {activeTab === "merch" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {mockMerch.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="group"
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-surface border border-white/5 mb-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-indigo-500/10" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 backdrop-blur border border-white/10 flex items-center justify-center">
                      {item.type === "Music" ? (
                        <Disc3 className="w-12 h-12 text-purple-400" />
                      ) : item.type === "Service" ? (
                        <Music2 className="w-12 h-12 text-purple-400" />
                      ) : (
                        <ShoppingBag className="w-12 h-12 text-purple-400" />
                      )}
                    </div>
                  </div>
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold backdrop-blur">
                    {item.type}
                  </span>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>

                <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                <p className="text-purple-400 font-black text-xl mb-3">
                  ${item.price}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {item.variants.map((variant) => (
                    <button
                      key={variant}
                      onClick={() =>
                        setSelectedVariant((prev) => ({
                          ...prev,
                          [item.id]: variant,
                        }))
                      }
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        selectedVariant[item.id] === variant
                          ? "bg-purple-500 text-white"
                          : "bg-surface text-text-secondary hover:bg-surface-2"
                      }`}
                    >
                      {variant}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => addToCart(item.id)}
                  className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                    purchaseSuccess === item.id
                      ? "bg-green-500 text-white"
                      : "bg-surface hover:bg-surface-2 border border-white/5"
                  }`}
                >
                  {purchaseSuccess === item.id ? (
                    <>
                      <Check className="w-4 h-4" />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      Add to Cart
                    </>
                  )}
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === "bookings" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {mockBookings.map((slot, i) => (
              <motion.div
                key={slot.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
                className={`p-6 rounded-2xl border transition-all ${
                  slot.available
                    ? "bg-surface border-white/5 hover:border-purple-500/30"
                    : "bg-surface border-white/5 opacity-50"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="px-3 py-1.5 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold">
                    {slot.type}
                  </span>
                  <span className="text-purple-400 font-black text-xl">
                    ${slot.price}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-text-secondary text-xs font-bold uppercase tracking-wider mb-1">
                      Date
                    </p>
                    <p className="font-bold">{slot.date}</p>
                  </div>
                  <div>
                    <p className="text-text-secondary text-xs font-bold uppercase tracking-wider mb-1">
                      Time
                    </p>
                    <p className="font-bold">{slot.time}</p>
                  </div>
                </div>

                {slot.available ? (
                  <button
                    onClick={() => addToCart(`booking-${slot.id}`)}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                  >
                    Book Now
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full py-3 rounded-xl bg-surface-2 font-bold text-sm text-text-secondary cursor-not-allowed"
                  >
                    Unavailable
                  </button>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>

      <footer className="border-t border-white/5 mt-24">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-text-secondary text-sm">
                © 2026 {artist.name}. Powered by PR3CIO.
              </p>
            </div>
            <div className="flex gap-6 text-text-secondary text-sm">
              <a href="#" className="hover:text-text-primary transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-text-primary transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-text-primary transition-colors">
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
