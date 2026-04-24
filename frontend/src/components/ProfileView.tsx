"use client";

import React from "react";
import { useAppContext } from "@/context/AppContext";
import { Settings, Shield, History, LogOut } from "lucide-react";

export default function ProfileView() {
  const { user, setUser } = useAppContext();

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
        <div className="relative">
          <div className="w-32 h-32 rounded-full border-2 border-[#C2A884] p-1">
             <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-[#C2A884] p-2 rounded-full border-4 border-[#0A0806]">
             <Shield className="w-4 h-4 text-[#0A0806]" />
          </div>
        </div>

        <div className="flex-1 text-center md:text-left">
           <p className="text-[#C2A884] uppercase tracking-[0.4em] text-[10px] font-bold mb-2">Verified Neural Node</p>
           <h2 className="text-5xl font-display text-[#EAE0D5] mb-4">{user.name}</h2>
           <p className="text-[#EAE0D5]/40 text-sm tracking-widest">{user.email}</p>
        </div>

        <button 
          onClick={() => setUser(null)}
          className="p-4 rounded-full border border-red-500/20 text-red-500/60 hover:bg-red-500 hover:text-white transition-all group"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: History, label: "Neural History", val: "12 Intercepts" },
          { icon: Shield, label: "Trust Score", val: "98.2" },
          { icon: Settings, label: "Node Config", val: "Active" }
        ].map((stat, i) => (
          <div key={i} className="bg-[#14110F]/40 border border-[#2D241C] p-8 rounded-sm">
             <stat.icon className="w-6 h-6 text-[#C2A884] mb-4" />
             <p className="text-[10px] uppercase tracking-widest text-[#EAE0D5]/40 mb-2">{stat.label}</p>
             <p className="text-2xl font-display text-[#EAE0D5]">{stat.val}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
