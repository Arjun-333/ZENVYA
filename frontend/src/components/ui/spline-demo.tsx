'use client'

import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
 
export default function SplineSceneBasic() {
  return (
    <Card className="w-full h-[500px] bg-black/[0.96] relative overflow-hidden border-border/10 rounded-sm">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      
      <div className="flex flex-col md:flex-row h-full">
        {/* Left content */}
        <div className="flex-1 p-8 md:p-12 relative z-10 flex flex-col justify-center">
          <p className="text-primary uppercase tracking-[0.4em] text-[10px] font-bold mb-4">Neural Visualization</p>
          <h2 className="text-4xl md:text-6xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 leading-tight">
            Interactive <span className="italic">3D</span> Matrix
          </h2>
          <p className="mt-6 text-neutral-300 max-w-lg text-sm leading-relaxed tracking-wide">
            Experience the marketplace in a new dimension. Our neural engine visualizes 
            live arbitrage flows across the global network in real-time.
          </p>
          <div className="mt-8 flex gap-4">
             <div className="h-px w-12 bg-primary/50 self-center"></div>
             <p className="text-[10px] uppercase tracking-widest text-primary font-bold">Protocol Active</p>
          </div>
        </div>

        {/* Right content */}
        <div className="flex-1 relative h-[300px] md:h-full">
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>
    </Card>
  )
}
