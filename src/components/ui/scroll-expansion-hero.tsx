'use client';

import { useRef, ReactNode } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
}: ScrollExpandMediaProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Calculate dynamic dimensions for the center media block
  // It starts as a small box and expands to cover 100% of the screen
  const mediaWidth = useTransform(scrollYProgress, [0, 0.7], ['300px', '100vw']);
  const mediaHeight = useTransform(scrollYProgress, [0, 0.7], ['400px', '100vh']);
  const mediaBorderRadius = useTransform(scrollYProgress, [0, 0.7], ['24px', '0px']);

  // Move the split text apart
  const textTranslateXLeft = useTransform(scrollYProgress, [0, 0.5], ['0vw', '-50vw']);
  const textTranslateXRight = useTransform(scrollYProgress, [0, 0.5], ['0vw', '50vw']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  // Fade out the background as we zoom in
  const bgOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const firstWord = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  return (
    <div ref={containerRef} className="relative h-[150vh] bg-[#0B0908] w-full">
      {/* Sticky container that stays on screen while we scroll through the 250vh */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        
        {/* Background Image that fades out */}
        <motion.div
          className="absolute inset-0 z-0 h-full w-full pointer-events-none"
          style={{ opacity: bgOpacity }}
        >
          <Image
            src={bgImageSrc}
            alt="Background"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>

        {/* Central Expanding Media Container */}
        <motion.div
          className="absolute z-10 flex items-center justify-center overflow-hidden"
          style={{
            width: mediaWidth,
            height: mediaHeight,
            borderRadius: mediaBorderRadius,
            boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.5)',
          }}
        >
          {mediaType === 'video' ? (
            <video
              src={mediaSrc}
              poster={posterSrc}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
            />
          ) : (
            <Image
              src={mediaSrc}
              alt={title || 'Media content'}
              fill
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>

        {/* Title & Decorative Text (Splits apart as you scroll) */}
        <div className={`relative z-20 flex flex-col items-center justify-center w-full h-full pointer-events-none ${textBlend ? 'mix-blend-difference' : 'mix-blend-normal'}`}>
          <div className="flex items-center justify-center gap-6 w-full px-4">
            <motion.h2
              className="text-5xl md:text-7xl lg:text-9xl font-bold text-white tracking-tighter"
              style={{ transform: textTranslateXLeft, opacity: textOpacity }}
            >
              {firstWord}
            </motion.h2>
            <motion.h2
              className="text-5xl md:text-7xl lg:text-9xl font-bold text-[#D4AF37] tracking-tighter"
              style={{ transform: textTranslateXRight, opacity: textOpacity }}
            >
              {restOfTitle}
            </motion.h2>
          </div>
          
          {(date || scrollToExpand) && (
            <motion.div 
              className="absolute bottom-20 flex flex-col items-center"
              style={{ opacity: textOpacity }}
            >
              {date && <p className="text-xl md:text-2xl text-[#D4AF37] font-semibold tracking-widest uppercase mb-2">{date}</p>}
              {scrollToExpand && <p className="text-sm md:text-base text-white/60 uppercase tracking-[0.3em]">{scrollToExpand}</p>}
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Content that appears underneath the fully expanded media */}
      <div className="relative z-30 w-full bg-[#0B0908]">
        {children}
      </div>
    </div>
  );
};

export default ScrollExpandMedia;
