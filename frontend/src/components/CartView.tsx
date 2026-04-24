"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

interface CartViewProps {
  onBack: () => void;
  onCheckout: () => void;
}

export default function CartView({ onBack, onCheckout }: CartViewProps) {
  const { cart, addToCart, removeFromCart } = useAppContext();

  const total = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

  const updateQty = (item: any, delta: number) => {
    if (item.quantity + delta <= 0) {
      removeFromCart(item.id);
    } else if (delta > 0) {
      addToCart(item);
    } else {
      // Decrease: we need to handle this manually since addToCart only increments
      removeFromCart(item.id);
      if (item.quantity - 1 > 0) {
        for (let i = 0; i < item.quantity - 1; i++) {
          addToCart(item);
        }
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 md:px-8 pt-32">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-3 rounded-full border border-border hover:bg-primary hover:text-primary-foreground transition-all">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <p className="text-primary uppercase tracking-widest text-xs font-bold mb-1">Shopping</p>
          <h2 className="text-2xl md:text-3xl font-display text-foreground tracking-tight">Your Bag</h2>
        </div>
      </div>

      {cart.length === 0 ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-center py-24 border border-dashed border-border rounded-lg">
          <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">Your bag is empty</p>
          <p className="text-sm text-muted-foreground mt-1">Add products to see them here.</p>
          <button onClick={onBack} className="mt-6 px-6 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-bold uppercase tracking-wider hover:opacity-90 transition-all">
            Continue Shopping
          </button>
        </motion.div>
      ) : (
        <>
          <div className="space-y-4 mb-8">
            {cart.map((item, i) => (
              <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg">
                <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-lg border border-border" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{item.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">₹{item.price.toLocaleString()} each</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQty(item, -1)}
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-border hover:bg-muted transition-colors">
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                  <button onClick={() => updateQty(item, 1)}
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-border hover:bg-muted transition-colors">
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                <p className="text-sm font-bold text-foreground w-24 text-right">₹{(item.price * item.quantity).toLocaleString()}</p>
                <button onClick={() => removeFromCart(item.id)}
                  className="p-2 text-muted-foreground hover:text-red-500 transition-colors" aria-label="Remove item">
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <div className="border border-border bg-card rounded-lg p-6 space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal ({cart.reduce((a, i) => a + i.quantity, 0)} items)</span>
              <span className="font-semibold">₹{total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Delivery</span>
              <span className="font-semibold text-emerald-500">Free</span>
            </div>
            <div className="border-t border-border pt-4 flex justify-between">
              <span className="text-sm font-bold">Total</span>
              <span className="text-lg font-bold text-primary">₹{total.toLocaleString()}</span>
            </div>
            <button onClick={onCheckout}
              className="w-full mt-4 flex items-center justify-center gap-3 bg-primary text-primary-foreground py-4 rounded-full font-bold text-sm uppercase tracking-wider hover:opacity-90 transition-all">
              Proceed to Payment <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
