'use client'

import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
 
export function SplineSceneBasic() {
  return (
    <Card className="w-full h-[500px] bg-black/[0.96] relative overflow-hidden border-border/10 rounded-sm">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="var(--primary)"
      />
      
      <div className="flex h-full flex-col md:flex-row">
        {/* Left content */}
        <div className="flex-1 p-12 relative z-10 flex flex-col justify-center">
          <p className="text-primary uppercase tracking-[0.4em] text-[10px] font-bold mb-4">Neural Visualization</p>
          <h1 className="text-5xl md:text-7xl font-display text-white tracking-tighter leading-none mb-6">
            Interactive <span className="italic text-primary">Market</span> 3D
          </h1>
          <p className="text-neutral-400 max-w-lg text-sm font-light leading-relaxed">
            Experience the ZENVYA architecture in high-fidelity. Our engine maps market intercepts across a 3D structural plane, providing absolute clarity on commerce flux.
          </p>
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
