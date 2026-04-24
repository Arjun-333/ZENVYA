"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShoppingBag, TrendingUp, Info, ShieldCheck, Globe, Star, Zap, AlertTriangle } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  source: string;
  image: string;
  insights: {
    real_score: number;
    oracle_recommendation: string;
    confidence_pct: number;
    intercept_advantage: number;
    best_source: string;
    status: string;
  };
  onClick: () => void;
}

export default function ProductCard({ title, price, source, image, insights, onClick }: ProductCardProps) {
  const { addToCart } = useAppContext();

  const getBadge = () => {
    if (insights.status === 'OPTIMAL_NODE') return { text: "Value King", color: "bg-primary text-primary-foreground" };
    return { text: "Risky Flux", color: "bg-red-500 text-white" };
  };

  const badge = getBadge();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-card border border-border rounded-sm overflow-hidden hover:border-primary transition-all duration-500 shadow-sm hover:shadow-2xl flex flex-col h-full"
    >
      {/* Product Image & Overlays */}
      <div className="relative aspect-[4/5] overflow-hidden cursor-pointer" onClick={onClick}>
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
           <button 
             onClick={(e) => { e.stopPropagation(); onClick(); }}
             className="bg-white text-black p-4 rounded-full hover:scale-110 transition-transform"
           >
              <Info className="w-5 h-5" />
           </button>
           <button 
             onClick={(e) => { e.stopPropagation(); addToCart({ id: Math.random(), title, price, source, image }); }}
             className="bg-primary text-primary-foreground p-4 rounded-full hover:scale-110 transition-transform"
           >
              <ShoppingBag className="w-5 h-5" />
           </button>
        </div>
        
        {/* Market Intercept Badges */}
        <div className="absolute top-6 left-6 flex flex-col gap-2">
           <span className={`px-4 py-2 rounded-full text-[8px] font-black uppercase tracking-widest ${badge.color} shadow-lg`}>
              {badge.text}
           </span>
           
           {/* Intercept Advantage Detection */}
           {insights.intercept_advantage > 0 ? (
              <div className="bg-red-500/90 text-white px-4 py-2 rounded-full text-[8px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg backdrop-blur-md">
                 <AlertTriangle className="w-3 h-3" />
                 Save ₹{insights.intercept_advantage.toLocaleString()} on {insights.best_source}
              </div>
           ) : (
              <div className="bg-emerald-500/90 text-white px-4 py-2 rounded-full text-[8px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg backdrop-blur-md">
                 <Zap className="w-3 h-3" />
                 Lowest Market Intercept
              </div>
           )}
        </div>

        {/* Hype Score Badge (Social Proof Aggregator) */}
        <div className="absolute bottom-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full flex items-center gap-2">
           <Star className="w-3 h-3 text-primary fill-primary" />
           <span className="text-[8px] font-black text-white uppercase tracking-widest">Hype: 8.4</span>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-8 flex flex-col flex-1 gap-6">
        <div className="flex justify-between items-start gap-4">
          <h3 className="text-xl font-display text-foreground leading-tight group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>
          <span className="text-[10px] font-black uppercase tracking-widest text-primary/40 bg-primary/5 px-2 py-1 rounded-sm border border-primary/10 h-fit">
            {source}
          </span>
        </div>

        <div className="mt-auto space-y-4">
          <div className="flex items-end justify-between">
            <div className="space-y-1">
               <p className="text-[10px] uppercase tracking-widest text-foreground/40 font-bold">Intercept Price</p>
               <p className="text-3xl font-display text-foreground">₹{price.toLocaleString()}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
               <div className="flex items-center gap-1 text-emerald-500">
                  <TrendingUp className="w-3 h-3" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Real Score: {Math.round(insights.real_score * 20)}%</span>
               </div>
               <p className="text-[8px] uppercase tracking-widest text-foreground/20 font-bold">Neural Sentiment Validated</p>
            </div>
          </div>
          
          <button 
            onClick={onClick}
            className="w-full py-4 border border-border hover:border-primary text-[10px] font-black uppercase tracking-widest transition-all hover:bg-primary hover:text-primary-foreground group/btn"
          >
             Intercept Intelligence <span className="group-hover/btn:translate-x-2 inline-block transition-transform ml-2">→</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
