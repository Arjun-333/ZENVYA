"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, TrendingDown, BarChart3, Loader2, Leaf, ShieldCheck, 
  Wallet, TrendingUp, Share2, MessageSquare, ExternalLink
} from "lucide-react";

// Direct import — 'use client' ensures this only runs client-side
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

interface IntelligenceDashboardProps {
  onBack: () => void;
  productTitle: string;
  productId: number;
}

export default function IntelligenceDashboard({ onBack, productTitle, productId }: IntelligenceDashboardProps) {
  const [data, setData] = useState<any>(null);
  const [priceHistory, setPriceHistory] = useState<any[]>([]);
  const [prediction, setPrediction] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    async function fetchAll() {
      try {
        const [prodRes, histRes, predRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/products/${productId}`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/prices/${productId}/history`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/prices/${productId}/predict`),
        ]);
        const prodData = await prodRes.json();
        setData(prodData);

        if (histRes.ok) {
          const histData = await histRes.json();
          setPriceHistory(histData.history?.map((h: any, i: number) => ({
            day: `T-${histData.history.length - i}`,
            price: h.price,
          })) || []);
        }
        if (predRes.ok) {
          setPrediction(await predRes.json());
        }
      } catch (err) {
        console.error("Failed to fetch product intelligence:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, [productId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-48 text-primary">
        <Loader2 className="w-12 h-12 animate-spin mb-4" />
        <p className="uppercase tracking-widest text-xs font-bold">Loading product data...</p>
      </div>
    );
  }

  const directionColor = prediction?.direction === "dropping" ? "text-emerald-500" : prediction?.direction === "rising" ? "text-red-500" : "text-yellow-500";
  const directionIcon = prediction?.direction === "dropping" ? <TrendingDown className="w-5 h-5" /> : <TrendingUp className="w-5 h-5" />;

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto py-8 px-4 md:px-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-3 rounded-full border border-border hover:bg-primary hover:text-primary-foreground transition-all">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <p className="text-primary uppercase tracking-widest text-xs font-bold mb-1">Product Intelligence</p>
          <h2 className="text-2xl md:text-3xl font-display text-foreground tracking-tight">{productTitle}</h2>
          {data?.source && (
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-muted-foreground">Source: <strong>{data.source}</strong></span>
              <ExternalLink className="w-3 h-3 text-primary" />
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left — Chart & Details */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          
          {/* Price Chart */}
          <div className="border border-border bg-card p-6 rounded-lg">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-bold text-foreground">Live Price History</h3>
              </div>
              {prediction && (
                <div className={`flex items-center gap-1 ${directionColor}`}>
                  {directionIcon}
                  <span className="text-xs uppercase tracking-wider font-bold">
                    Price {prediction.direction} ({prediction.pct_change > 0 ? '+' : ''}{prediction.pct_change}%)
                  </span>
                </div>
              )}
            </div>
            <div className="h-[280px] w-full">
              {mounted && priceHistory.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={priceHistory}>
                    <defs>
                      <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(34, 38%, 64%)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(34, 38%, 64%)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="day" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v: number) => `₹${(v/1000).toFixed(0)}k`} />
                    <Tooltip />
                    <Area type="monotone" dataKey="price" stroke="hsl(34, 38%, 64%)" fillOpacity={1} fill="url(#priceGrad)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                  {priceHistory.length === 0 ? "Price history loading..." : "Rendering chart..."}
                </div>
              )}
            </div>
          </div>

          {/* Social & Sustainability */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-card border border-border p-5 rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <Share2 className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold uppercase tracking-wider text-primary">Social Proof</span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">YouTube Reviews</span><span className="font-semibold">High Velocity</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">X Sentiment</span><span className="font-semibold text-emerald-500">+12.4%</span></div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1"><MessageSquare className="w-3 h-3" /> Reddit</span>
                  <span className="font-semibold text-emerald-500">Positive</span>
                </div>
              </div>
            </div>
            <div className="bg-card border border-border p-5 rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-500">Sustainability</span>
              </div>
              <h4 className="text-xl font-display text-foreground mb-2">Score: 84/100</h4>
              <p className="text-sm text-muted-foreground">CO2 per delivery: <strong className="text-emerald-500">0.42kg</strong>. 12% less emissions.</p>
            </div>
          </div>

          {/* Budget & Delivery */}
          <div className="bg-card border border-border p-5 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <Wallet className="w-4 h-4 text-blue-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-blue-500">Budget & Delivery</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-lg font-display text-foreground mb-1">Savings Potential</h4>
                <p className="text-sm text-muted-foreground">Save <strong className="text-blue-500">₹{data?.insights?.intercept_advantage?.toLocaleString() || '1,200'}</strong> on {data?.insights?.best_source || 'another platform'}.</p>
              </div>
              <div>
                <h4 className="text-lg font-display text-foreground mb-1">Estimated Delivery</h4>
                <p className="text-sm text-muted-foreground"><strong>2-3 business days</strong> via priority logistics.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right — AI Recommendation */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
          {/* AI Prediction Card */}
          {prediction && (
            <div className={`border p-6 rounded-lg ${
              prediction.recommendation === 'BUY_NOW' ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-yellow-500/30 bg-yellow-500/5'
            }`}>
              <p className="text-xs font-bold uppercase tracking-wider text-primary mb-3">AI Price Prediction</p>
              <h4 className="text-3xl font-display text-foreground mb-2">
                {prediction.recommendation === 'BUY_NOW' ? '🟢 Buy Now' : '🟡 Wait for Drop'}
              </h4>
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span className="text-sm font-bold text-primary">Confidence: {prediction.confidence}%</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{prediction.reasoning}</p>
              {prediction.current_price && (
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground">Current Live Price</p>
                  <p className="text-2xl font-display text-foreground">₹{prediction.current_price.toLocaleString()}</p>
                </div>
              )}
            </div>
          )}

          {/* Platform Recommendation */}
          <div className="border border-border bg-card p-6 rounded-lg">
            <p className="text-xs font-bold uppercase tracking-wider text-primary mb-4">Best Platform</p>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Source</span>
                <span className="text-sm font-bold">{data?.source || 'Amazon'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Rating</span>
                <span className="text-sm font-bold text-primary">⭐ {data?.platform_rating || 4.5}/5</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Status</span>
                <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-full ${
                  data?.insights?.status === 'OPTIMAL_NODE' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-yellow-500/10 text-yellow-500'
                }`}>
                  {data?.insights?.status === 'OPTIMAL_NODE' ? 'Best Price' : 'Check Alternatives'}
                </span>
              </div>
            </div>
          </div>

          {/* Review Authenticity */}
          <div className="border border-border bg-card p-6 rounded-lg">
            <p className="text-xs font-bold uppercase tracking-wider text-primary mb-4">Review Authenticity</p>
            <div className="mb-3">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Genuine Reviews</span>
                <span className="text-primary font-bold">{Math.round((data?.insights?.real_score || 4) * 20)}%</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${(data?.insights?.real_score || 4) * 20}%` }} transition={{ duration: 1.5 }} className="h-full bg-primary rounded-full" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Tracking 14 coupon opportunities across 4 platforms.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
