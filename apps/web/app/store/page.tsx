"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  ShoppingBag,
  Calendar,
  Music2,
  ChevronRight,
  Plus,
  Minus,
  Check,
} from "lucide-react";

interface MerchItem {
  id: string;
  name: string;
  price: number;
  image: string;
  variants: string[];
}

interface BookingSlot {
  id: string;
  date: string;
  time: string;
  type: string;
  price: number;
  available: boolean;
}

const mockMerch: MerchItem[] = [
  {
    id: "1",
    name: "Limited Edition Hoodie",
    price: 89,
    image: "/api/placeholder/400/500",
    variants: ["S", "M", "L", "XL"],
  },
  {
    id: "2",
    name: "Tour Tee 2026",
    price: 45,
    image: "/api/placeholder/400/500",
    variants: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "3",
    name: "Vinyl Bundle",
    price: 120,
    image: "/api/placeholder/400/500",
    variants: ["Standard", "Deluxe"],
  },
  {
    id: "4",
    name: "Signed Poster",
    price: 35,
    image: "/api/placeholder/400/500",
    variants: ["A3", "A2"],
  },
];

const mockBookings: BookingSlot[] = [
  {
    id: "1",
    date: "Apr 15, 2026",
    time: "2:00 PM",
    type: "Studio Session",
    price: 500,
    available: true,
  },
  {
    id: "2",
    date: "Apr 15, 2026",
    time: "6:00 PM",
    type: "Studio Session",
    price: 500,
    available: false,
  },
  {
    id: "3",
    date: "Apr 16, 2026",
    time: "10:00 AM",
    type: "Virtual Collab",
    price: 250,
    available: true,
  },
  {
    id: "4",
    date: "Apr 18, 2026",
    time: "3:00 PM",
    type: "AI Blend Session",
    price: 350,
    available: true,
  },
  {
    id: "5",
    date: "Apr 20, 2026",
    time: "7:00 PM",
    type: "Live Performance",
    price: 2000,
    available: true,
  },
  {
    id: "6",
    date: "Apr 22, 2026",
    time: "11:00 AM",
    type: "Masterclass",
    price: 150,
    available: true,
  },
];

export default function ArtistStore() {
  const [activeTab, setActiveTab] = useState<"merch" | "bookings">("merch");
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [selectedVariant, setSelectedVariant] = useState<{
    [key: string]: string;
  }>({});
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const addToCart = (itemId: string) => {
    setCart((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) {
        newCart[itemId]--;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
  };

  const handleBooking = (slot: BookingSlot) => {
    setBookingSuccess(true);
    setTimeout(() => setBookingSuccess(false), 3000);
  };

  const cartTotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = mockMerch.find((m) => m.id === id);
    return sum + (item ? item.price * qty : 0);
  }, 0);

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-cyan-900/10 pointer-events-none" />

      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
              <Music2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold">NEON COLLISION</h1>
              <p className="text-text-secondary text-sm">
                Official Artist Store
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-8">
              <button
                onClick={() => setActiveTab("merch")}
                className={`flex items-center gap-2 transition-colors ${activeTab === "merch" ? "text-cyan-400" : "text-text-secondary hover:text-text-primary"}`}
              >
                <ShoppingBag className="w-4 h-4" />
                Merch
              </button>
              <button
                onClick={() => setActiveTab("bookings")}
                className={`flex items-center gap-2 transition-colors ${activeTab === "bookings" ? "text-cyan-400" : "text-text-secondary hover:text-text-primary"}`}
              >
                <Calendar className="w-4 h-4" />
                Book
              </button>
            </nav>

            <button className="relative p-3 rounded-full bg-surface-2 hover:bg-surface transition-colors">
              <ShoppingBag className="w-5 h-5" />
              {Object.values(cart).reduce((a, b) => a + b, 0) > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-cyan-500 text-xs font-bold flex items-center justify-center">
                  {Object.values(cart).reduce((a, b) => a + b, 0)}
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
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-transparent to-cyan-900/80" />
            <div className="absolute inset-0 bg-[url('/api/placeholder/1200/400')] bg-cover bg-center opacity-50" />
            <div className="relative h-full flex items-center px-12">
              <div>
                <p className="text-cyan-400 text-sm font-medium mb-2">
                  EXCLUSIVE COLLECTION
                </p>
                <h2 className="font-display text-4xl md:text-6xl font-bold mb-4">
                  Spring 2026 Tour
                </h2>
                <p className="text-text-secondary max-w-md">
                  Limited edition merch and exclusive booking opportunities
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex gap-4 mb-12">
          <button
            onClick={() => setActiveTab("merch")}
            className={`px-6 py-3 rounded-full font-medium transition-all ${
              activeTab === "merch"
                ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white"
                : "bg-surface-2 text-text-secondary hover:bg-surface"
            }`}
          >
            Merchandise
          </button>
          <button
            onClick={() => setActiveTab("bookings")}
            className={`px-6 py-3 rounded-full font-medium transition-all ${
              activeTab === "bookings"
                ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white"
                : "bg-surface-2 text-text-secondary hover:bg-surface"
            }`}
          >
            Book a Session
          </button>
        </div>

        {activeTab === "merch" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {mockMerch.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-surface-2 mb-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-cyan-500/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-purple-500/30 to-cyan-500/30 backdrop-blur" />
                  </div>
                  {item.id === "1" && (
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-xs font-bold">
                      NEW
                    </span>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                </div>

                <h3 className="font-medium mb-1">{item.name}</h3>
                <p className="text-cyan-400 font-bold mb-3">${item.price}</p>

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
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                        selectedVariant[item.id] === variant
                          ? "bg-cyan-500 text-white"
                          : "bg-surface-2 text-text-secondary hover:bg-surface"
                      }`}
                    >
                      {variant}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => addToCart(item.id)}
                  className="w-full py-3 rounded-xl bg-surface-2 hover:bg-surface transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add to Cart
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === "bookings" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {mockBookings.map((slot, i) => (
              <motion.div
                key={slot.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className={`p-6 rounded-2xl border transition-all ${
                  slot.available
                    ? "bg-surface-2 border-white/5 hover:border-purple-500/50"
                    : "bg-surface border-white/5 opacity-50"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs font-medium">
                    {slot.type}
                  </span>
                  <span className="text-cyan-400 font-bold">${slot.price}</span>
                </div>

                <div className="mb-4">
                  <p className="text-text-secondary text-sm mb-1">Date</p>
                  <p className="font-medium">{slot.date}</p>
                </div>

                <div className="mb-6">
                  <p className="text-text-secondary text-sm mb-1">Time</p>
                  <p className="font-medium">{slot.time}</p>
                </div>

                {slot.available ? (
                  <button
                    onClick={() => handleBooking(slot)}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                  >
                    Book Now
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full py-3 rounded-xl bg-surface font-medium text-text-secondary cursor-not-allowed"
                  >
                    Sold Out
                  </button>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {bookingSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-4 rounded-full bg-green-500 flex items-center gap-3 shadow-2xl"
          >
            <Check className="w-5 h-5 text-white" />
            <span className="font-medium">
              Booking confirmed! Check your email.
            </span>
          </motion.div>
        )}
      </main>

      <footer className="border-t border-white/5 mt-24">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-text-secondary text-sm">
              © 2026 NEON COLLISION. All rights reserved.
            </p>
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
