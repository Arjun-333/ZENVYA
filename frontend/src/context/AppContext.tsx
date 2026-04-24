"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  name: string;
  email: string;
  avatar?: string;
}

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: "processing" | "shipped";
  estimatedDelivery: string;
}

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  cart: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  orders: Order[];
  placeOrder: (items: CartItem[], total: number) => void;
  isAuthenticated: boolean;
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  const addToCart = (product: any) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearCart = () => setCart([]);

  const placeOrder = (items: CartItem[], total: number) => {
    const now = new Date();
    const delivery = new Date(now.getTime() + (2 + Math.random() * 3) * 24 * 60 * 60 * 1000);
    const order: Order = {
      id: `ZNV-${Date.now().toString(36).toUpperCase()}`,
      items: [...items],
      total,
      date: now.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
      status: "processing",
      estimatedDelivery: delivery.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
    };
    setOrders((prev) => [order, ...prev]);

    // Simulate status updates
    setTimeout(() => {
      setOrders((prev) => prev.map((o) => o.id === order.id ? { ...o, status: "shipped" } : o));
    }, 15000);
  };

  return (
    <AppContext.Provider 
      value={{ user, setUser, cart, addToCart, removeFromCart, clearCart, orders, placeOrder, isAuthenticated: !!user, theme, toggleTheme }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) throw new Error("useAppContext must be used within an AppProvider");
  return context;
}
