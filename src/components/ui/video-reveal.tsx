"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play } from "lucide-react";

interface VideoRevealProps {
  videoSrc: string;
  title: string;
  subtitle: string;
}

export function VideoReveal({ videoSrc, title, subtitle }: VideoRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Scale the video wrapper from 30% to 100% width
  const scale = useTransform(scrollYProgress, [0.2, 0.5], [0.4, 1]);
  // Border radius goes from round to square
  const borderRadius = useTransform(scrollYProgress, [0.2, 0.5], ["20%", "0%"]);
  // Text opacity fades out as it expands
  const textOpacity = useTransform(scrollYProgress, [0.3, 0.45], [1, 0]);
  const textY = useTransform(scrollYProgress, [0.3, 0.45], [0, -50]);

  return (
    <section ref={containerRef} className="relative h-[200vh] bg-[#050403] w-full">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        <motion.div 
          style={{ opacity: textOpacity, y: textY }}
          className="absolute z-20 flex flex-col items-center text-center px-4 pointer-events-none"
        >
          <span className="text-[#D4AF37] tracking-[0.3em] text-sm font-semibold uppercase mb-4 block">The Process</span>
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white drop-shadow-2xl">{title}</h2>
          <p className="mt-4 text-xl text-white/80 font-light max-w-xl">{subtitle}</p>
        </motion.div>

        <motion.div
          style={{ 
            scale,
            borderRadius,
          }}
          className="relative z-10 w-full h-[80vh] overflow-hidden shadow-[0_20px_60px_rgba(212,175,55,0.15)] flex items-center justify-center bg-[#1E1A17]"
        >
          <div className="absolute inset-0 bg-black/20 z-10" />

          <video
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-[1.2]"
          />
          
          {/* Fallback pattern if video is missing */}
          <div className="absolute inset-0 -z-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjMUUxQTE3Ij48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDBMOCA4Wk04IDBMMCA4WiIgc3Ryb2tlPSIjM0QzNDJCIiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KPC9zdmc+')] opacity-20" />
        </motion.div>
      </div>
    </section>
  );
}
