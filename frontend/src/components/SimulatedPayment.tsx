"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Loader2, CheckCircle2, Lock, Zap, Database, Globe } from "lucide-react";

interface SimulatedPaymentProps {
  total: number;
  onComplete: () => void;
}

export default function SimulatedPayment({ total, onComplete }: SimulatedPaymentProps) {
  const [step, setStep] = useState(0);

  const steps = [
    { title: "Securing Node Connection", icon: Lock, color: "text-primary" },
    { title: "Encrypting Identity Payload", icon: ShieldCheck, color: "text-blue-500" },
    { title: "Verifying Capital Liquidity", icon: Zap, color: "text-yellow-500" },
    { title: "Synchronizing Decentralised Ledger", icon: Database, color: "text-emerald-500" },
    { title: "Finalizing Intercept", icon: Globe, color: "text-primary" }
  ];

  useEffect(() => {
    if (step < steps.length) {
      const timer = setTimeout(() => setStep(step + 1), 2000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(onComplete, 2000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div className="fixed inset-0 z-[1000] bg-background flex flex-col items-center justify-center p-12">
      {/* Background Neural Lines */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="w-full h-full border-[0.5px] border-primary/20 bg-[radial-gradient(circle_at_center,_var(--primary)_1px,_transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="max-w-md w-full relative z-10 text-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-16"
        >
          <p className="text-primary uppercase tracking-[0.4em] text-[10px] font-bold mb-4">Transaction Hub</p>
          <h2 className="text-7xl font-display text-foreground tracking-tighter">₹{total.toLocaleString()}</h2>
          <p className="text-[10px] text-foreground/40 uppercase tracking-widest mt-4">Authorized Intercept Value</p>
        </motion.div>

        <div className="space-y-10">
          {steps.map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: step >= i ? 1 : 0.1,
                x: step >= i ? 0 : -20,
                scale: step === i ? 1.05 : 1
              }}
              className="flex items-center gap-6"
            >
              <div className={`p-4 rounded-full border border-border transition-all duration-500 ${step === i ? 'bg-primary/10 border-primary shadow-[0_0_20px_rgba(194,168,132,0.2)]' : ''}`}>
                {step > i ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                ) : step === i ? (
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                ) : (
                  <s.icon className={`w-6 h-6 text-foreground/20`} />
                )}
              </div>
              <div className="text-left">
                <p className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-colors duration-500 ${step === i ? 'text-foreground' : 'text-foreground/20'}`}>
                   {s.title}
                </p>
                {step === i && i === 3 && (
                  <p className="text-[8px] text-emerald-500 uppercase tracking-widest mt-1 animate-pulse">
                    Recording Snapshot to Polygon PoS...
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {step === steps.length && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-16 flex flex-col items-center gap-6"
          >
             <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.4)]">
                <CheckCircle2 className="w-8 h-8" />
             </div>
             <div className="space-y-2">
                <p className="text-sm font-display text-foreground">Intercept Successfully Synchronized</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-500 font-bold">Estimated Arrival: 48 - 72 Hours</p>
             </div>
             
             <div className="mt-8 p-6 border border-border bg-card/40 rounded-sm w-full">
                <p className="text-[8px] uppercase tracking-widest text-foreground/40 font-bold mb-4">Logistics Summary</p>
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                   <span>Neural Node</span>
                   <span className="text-primary">MUM-IX-042</span>
                </div>
             </div>
          </motion.div>
        )}
      </div>

      {/* Security Badge */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3">
         <Lock className="w-4 h-4 text-primary" />
         <span className="text-[10px] font-black uppercase tracking-widest text-primary">Neural Encryption Node v1.02 Active</span>
      </div>
    </div>
  );
}
