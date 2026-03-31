"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  ArrowLeft,
  CreditCard,
  Lock,
  Check,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
} from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  variant: string;
  quantity: number;
}

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Limited Edition Hoodie",
      price: 89,
      variant: "M",
      quantity: 1,
    },
    { id: "2", name: "Tour Tee 2026", price: 45, variant: "L", quantity: 2 },
  ]);
  const [step, setStep] = useState(1);
  const [orderComplete, setOrderComplete] = useState(false);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 150 ? 0 : 12;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : item;
          }
          return item;
        })
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    setOrderComplete(true);
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center"
          >
            <Check className="w-12 h-12 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-text-secondary mb-8">
            Thank you for your purchase. You&apos;ll receive a confirmation
            email shortly with tracking details.
          </p>
          <p className="text-accent font-medium">
            Order #PR3-{Math.random().toString(36).substr(2, 9).toUpperCase()}
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <header className="border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-surface rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="font-bold">Checkout</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-text-secondary text-sm">
            <Lock className="w-4 h-4" />
            Secure Checkout
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="flex gap-2 mb-8">
              {["Cart", "Shipping", "Payment"].map((s, i) => (
                <div key={s} className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      i + 1 <= step
                        ? "bg-accent text-white"
                        : "bg-surface text-text-secondary"
                    }`}
                  >
                    {i + 1 < step ? <Check className="w-4 h-4" /> : i + 1}
                  </div>
                  <span
                    className={`text-sm ${i + 1 <= step ? "text-text-primary" : "text-text-secondary"}`}
                  >
                    {s}
                  </span>
                  {i < 2 && <div className="w-12 h-px bg-surface mx-2" />}
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="cart"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-4"
                >
                  <h2 className="text-2xl font-bold">Your Cart</h2>
                  {cartItems.length === 0 ? (
                    <div className="text-center py-16 bg-surface rounded-2xl">
                      <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-text-secondary" />
                      <p className="text-text-secondary">Your cart is empty</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-6 p-4 bg-surface rounded-2xl border border-white/5"
                        >
                          <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
                            <ShoppingBag className="w-8 h-8 text-text-secondary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium mb-1">{item.name}</h3>
                            <p className="text-text-secondary text-sm">
                              Size: {item.variant}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-2 rounded-lg bg-surface-2 hover:bg-white/10 transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-2 rounded-lg bg-surface-2 hover:bg-white/10 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-accent">
                              ${item.price * item.quantity}
                            </p>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-text-secondary hover:text-red-400 transition-colors mt-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {cartItems.length > 0 && (
                    <button
                      onClick={() => setStep(2)}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 font-bold mt-6"
                    >
                      Continue to Shipping
                    </button>
                  )}
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold">Shipping Information</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-text-secondary mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-surface rounded-xl border border-white/10 focus:border-accent outline-none transition-colors"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-text-secondary mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-surface rounded-xl border border-white/10 focus:border-accent outline-none transition-colors"
                        placeholder="Smith"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm text-text-secondary mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 bg-surface rounded-xl border border-white/10 focus:border-accent outline-none transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm text-text-secondary mb-2">
                        Address
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-surface rounded-xl border border-white/10 focus:border-accent outline-none transition-colors"
                        placeholder="123 Music Ave"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-text-secondary mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-surface rounded-xl border border-white/10 focus:border-accent outline-none transition-colors"
                        placeholder="Los Angeles"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-text-secondary mb-2">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-surface rounded-xl border border-white/10 focus:border-accent outline-none transition-colors"
                        placeholder="90001"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setStep(1)}
                      className="px-6 py-4 rounded-xl bg-surface font-medium border border-white/10"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="flex-1 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 font-bold"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold">Payment Details</h2>
                  <div className="p-6 bg-surface rounded-2xl border border-white/5">
                    <div className="flex items-center gap-3 mb-6">
                      <CreditCard className="w-6 h-6 text-accent" />
                      <span className="font-medium">Card Information</span>
                    </div>
                    <div className="space-y-4">
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-surface-2 rounded-xl border border-white/10 focus:border-accent outline-none transition-colors"
                        placeholder="Card number"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          className="w-full px-4 py-3 bg-surface-2 rounded-xl border border-white/10 focus:border-accent outline-none transition-colors"
                          placeholder="MM/YY"
                        />
                        <input
                          type="text"
                          className="w-full px-4 py-3 bg-surface-2 rounded-xl border border-white/10 focus:border-accent outline-none transition-colors"
                          placeholder="CVC"
                        />
                      </div>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-surface-2 rounded-xl border border-white/10 focus:border-accent outline-none transition-colors"
                        placeholder="Name on card"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setStep(2)}
                      className="px-6 py-4 rounded-xl bg-surface font-medium border border-white/10"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleCheckout}
                      className="flex-1 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 font-bold"
                    >
                      Pay ${total.toFixed(2)}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 p-6 bg-surface rounded-2xl border border-white/5 space-y-6">
              <h3 className="font-bold text-lg">Order Summary</h3>
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-text-secondary">
                      {item.name} x{item.quantity}
                    </span>
                    <span>${item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/5 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-400">FREE</span>
                    ) : (
                      `$${shipping}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>
              <div className="border-t border-white/5 pt-4">
                <div className="flex justify-between font-bold text-xl">
                  <span>Total</span>
                  <span className="text-accent">${total.toFixed(2)}</span>
                </div>
              </div>
              {subtotal < 150 && (
                <p className="text-xs text-text-secondary text-center">
                  Add ${(150 - subtotal).toFixed(2)} more for free shipping!
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
