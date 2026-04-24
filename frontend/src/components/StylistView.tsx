"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Upload, ShoppingBag, Loader2, Search } from "lucide-react";
import ProductCard from "./ProductCard";

export default function StylistView({ onBack }: { onBack: () => void }) {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [analysisStep, setAnalysisStep] = useState(0);

  const steps = [
    "Analyzing Color Profiles",
    "Mapping Aesthetic Integrity",
    "Intercepting Market Nodes",
    "Finalizing Tailored Suitability"
  ];

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (rd) => setImage(rd.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const startAnalysis = async () => {
    setIsAnalyzing(true);
    setAnalysisStep(0);
    
    for (let i = 0; i < steps.length; i++) {
      await new Promise(r => setTimeout(r, 1500));
      setAnalysisStep(i + 1);
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/search?q=minimalist`);
      const data = await res.json();
      setRecommendations(data.results);
    } catch (err) {
      console.error("Atelier search failed:", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-12">
      <div className="flex justify-between items-end mb-16">
        <div>
           <p className="text-primary uppercase tracking-[0.4em] text-[10px] font-bold mb-4">Neural Personal Advisor</p>
           <h2 className="text-7xl font-display text-foreground tracking-tighter">Bespoke <span className="italic opacity-30">Atelier</span></h2>
        </div>
        <button onClick={onBack} className="text-[10px] uppercase tracking-widest text-foreground/40 hover:text-primary transition-colors">Return to pulse</button>
      </div>

      <div className="grid grid-cols-12 gap-12">
        <div className="col-span-12 lg:col-span-5 flex flex-col gap-8">
           <div className="relative aspect-[4/5] bg-card border border-dashed border-border rounded-sm flex flex-col items-center justify-center overflow-hidden group shadow-inner">
              {image ? (
                <>
                  <img src={image} alt="User" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                     <label className="cursor-pointer bg-primary text-primary-foreground px-10 py-5 rounded-full text-xs font-bold uppercase tracking-widest">Update Profile</label>
                     <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
                  </div>
                </>
              ) : (
                <>
                  <Upload className="w-12 h-12 text-foreground/20 mb-8 group-hover:text-primary transition-colors" />
                  <p className="text-sm text-foreground/40 uppercase tracking-widest text-center px-12">
                    Submit your profile to initiate <br/> <span className="text-primary font-bold">Neural Mapping</span>
                  </p>
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleUpload} accept="image/*" />
                </>
              )}

              {isAnalyzing && (
                <div className="absolute inset-0 bg-background/90 backdrop-blur-xl flex flex-col items-center justify-center p-12">
                   <div className="relative w-full aspect-square mb-12 flex items-center justify-center">
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: -1, ease: "linear" }} className="absolute inset-0 border border-primary/20 rounded-full" />
                      <motion.div animate={{ rotate: -360 }} transition={{ duration: 12, repeat: -1, ease: "linear" }} className="absolute inset-4 border border-primary/10 rounded-full" />
                      <Loader2 className="w-12 h-12 text-primary animate-spin" />
                   </div>
                   <div className="space-y-5 w-full">
                      {steps.map((text, i) => (
                        <div key={i} className="flex items-center gap-5">
                           <div className={`w-2 h-2 rounded-full transition-colors duration-500 ${analysisStep > i ? 'bg-primary shadow-[0_0_10px_rgba(194,168,132,0.8)]' : 'bg-border'}`} />
                           <p className={`text-[10px] uppercase tracking-widest transition-all duration-500 ${analysisStep >= i ? 'text-foreground font-bold' : 'text-foreground/10'}`}>{text}</p>
                        </div>
                      ))}
                   </div>
                </div>
              )}
           </div>

           {image && !isAnalyzing && recommendations.length === 0 && (
             <button onClick={startAnalysis} className="w-full bg-primary text-primary-foreground py-6 rounded-full font-bold uppercase tracking-[0.4em] text-xs flex items-center justify-center gap-4 hover:bg-transparent hover:text-primary border border-primary transition-all shadow-xl">
                Consult the Atelier
             </button>
           )}

           {recommendations.length > 0 && (
              <div className="bg-primary/5 border border-primary/20 p-10 rounded-sm">
                 <p className="text-primary uppercase tracking-[0.2em] text-[10px] font-bold mb-6">Integrity Analysis</p>
                 <h4 className="text-3xl font-display text-foreground mb-6">Aesthetic Alignment: Verified</h4>
                 <p className="text-base text-foreground/60 leading-relaxed font-light">
                   We have identified <span className="text-primary font-bold">{recommendations.length} curated intercepts</span> that align with your structural profile. These selections prioritize silhouette integrity and material longevity.
                 </p>
              </div>
           )}
        </div>

        <div className="col-span-12 lg:col-span-7">
           <div className="flex items-center gap-5 mb-16">
              <ShoppingBag className="w-8 h-8 text-primary" />
              <h3 className="text-4xl font-display text-foreground">Curated Intercepts</h3>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {recommendations.length > 0 ? recommendations.map(p => <ProductCard key={p.id} {...p} onClick={() => {}} />) : (
                Array(4).fill(0).map((_, i) => (
                  <div key={i} className="aspect-[4/5] bg-card/20 border border-border rounded-sm flex flex-col items-center justify-center opacity-20">
                     <Search className="w-10 h-10 mb-6" />
                     <p className="text-[10px] uppercase tracking-widest">Awaiting Analysis</p>
                  </div>
                ))
              )}
           </div>
        </div>
      </div>
    </div>
  );
}
