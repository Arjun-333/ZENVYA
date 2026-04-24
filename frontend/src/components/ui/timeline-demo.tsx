"use client";

import { ShieldCheck, Database, Globe, ShoppingBag, Zap } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

const timelineData = [
  {
    id: 1,
    title: "Intercept Planning",
    date: "Node Alpha",
    content: "Zenvya Oracle identifies a high-probability price floor for target items.",
    category: "Planning",
    icon: Globe,
    relatedIds: [2],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "Neural Mapping",
    date: "Node Beta",
    content: "Bespoke Atelier synchronizes user aesthetic profile with marketplace flux.",
    category: "Design",
    icon: Database,
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 90,
  },
  {
    id: 3,
    title: "Arbitrage Execution",
    date: "Active Sync",
    content: "Micro-Deal Sniper intercepts flash coupons across 4 global platforms.",
    category: "Development",
    icon: Zap,
    relatedIds: [2, 4],
    status: "in-progress" as const,
    energy: 60,
  },
  {
    id: 4,
    title: "Ledger Validation",
    date: "Sync Queue",
    content: "Recording price snapshot to Decentralised Price Ledger (Polygon PoS).",
    category: "Testing",
    icon: ShieldCheck,
    relatedIds: [3, 5],
    status: "pending" as const,
    energy: 30,
  },
  {
    id: 5,
    title: "Node Acquisition",
    date: "Final Intercept",
    content: "Capital successfully optimized. Intercept synchronized to user bag.",
    category: "Release",
    icon: ShoppingBag,
    relatedIds: [4],
    status: "pending" as const,
    energy: 10,
  },
];

export function RadialOrbitalTimelineDemo() {
  return (
    <div className="w-full bg-black/40 border border-border/10 rounded-sm overflow-hidden py-24">
      <div className="text-center mb-12">
         <p className="text-primary uppercase tracking-[0.4em] text-[10px] font-bold mb-4">Neural Lifecycle</p>
         <h2 className="text-4xl font-display text-white tracking-tighter">Intercept <span className="italic text-primary">Orbital</span> Plane</h2>
      </div>
      <RadialOrbitalTimeline timelineData={timelineData} />
    </div>
  );
}
