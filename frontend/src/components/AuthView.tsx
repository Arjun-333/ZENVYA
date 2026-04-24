"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, ShieldCheck, Mail, Lock, ArrowRight, Loader2, Info } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

export default function AuthView({ onComplete }: { onComplete: () => void }) {
  const { setUser } = useAppContext();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Authentication failed");
      }

      // On Success
      setUser(data);
      onComplete();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-24">
      <div className="text-center mb-12">
        <div className="inline-flex p-4 bg-primary/10 rounded-full mb-6">
           <ShieldCheck className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-5xl font-display text-foreground mb-4">
           {isLogin ? "Neural Access" : "Create Node"}
        </h2>
        <p className="text-sm text-foreground/40 uppercase tracking-[0.3em]">
           {isLogin ? "Authenticate your commerce intercept" : "Initialize your persistent identity"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {!isLogin && (
          <div className="relative">
            <User className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
            <input 
              type="text" 
              required
              placeholder="Display Name" 
              className="w-full bg-card border border-border rounded-sm pl-16 pr-6 py-5 text-sm focus:outline-none focus:border-primary transition-all"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
        )}
        <div className="relative">
          <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
          <input 
            type="email" 
            required
            placeholder="Neural Email" 
            className="w-full bg-card border border-border rounded-sm pl-16 pr-6 py-5 text-sm focus:outline-none focus:border-primary transition-all"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>
        <div className="relative">
          <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
          <input 
            type="password" 
            required
            placeholder="Access Key" 
            className="w-full bg-card border border-border rounded-sm pl-16 pr-6 py-5 text-sm focus:outline-none focus:border-primary transition-all"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] uppercase font-bold tracking-widest rounded-sm"
          >
            <Info className="w-4 h-4" />
            {error}
          </motion.div>
        )}

        <button 
          disabled={loading}
          type="submit" 
          className="w-full bg-primary text-primary-foreground py-6 rounded-full font-bold uppercase tracking-[0.4em] text-xs flex items-center justify-center gap-4 hover:bg-transparent hover:text-primary border border-primary transition-all shadow-xl disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
            <>
              {isLogin ? "Authorize Intercept" : "Initialize Node"}
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <div className="mt-12 text-center">
        <button 
          onClick={() => setIsLogin(!isLogin)}
          className="text-[10px] uppercase tracking-widest text-foreground/40 hover:text-primary transition-colors font-bold"
        >
          {isLogin ? "No identity found? Register Node" : "Already initialized? Sign In"}
        </button>
      </div>
    </div>
  );
}
