"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Marquee from "react-fast-marquee";
import { Coffee, Star, Sparkles, ChevronDown } from "lucide-react";

const FRAME_COUNT = 240;
const FRAME_PREFIX = "/frames/frame_";
const FRAME_PAD = 4;
const FRAME_EXT = ".jpg";

function getFrameUrl(index: number) {
  const padIndex = (index + 1).toString().padStart(FRAME_PAD, "0");
  return `${FRAME_PREFIX}${padIndex}${FRAME_EXT}`;
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  const framesRef = useRef<HTMLImageElement[]>([]);
  const tickingRef = useRef(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile === null) return;
    if (isMobile) {
      setLoaded(true);
      return;
    }

    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      img.onload = () => {
        loadedCount++;
        setLoadProgress((loadedCount / FRAME_COUNT) * 100);
        if (loadedCount === FRAME_COUNT) {
          framesRef.current = images;
          setLoaded(true);
        }
      };
      // Error handling to prevent infinite loading
      img.onerror = () => {
        console.error("Failed to load frame", i);
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          framesRef.current = images;
          setLoaded(true);
        }
      };
      images.push(img);
    }
  }, [isMobile]);

  const drawFrame = (frameIndex: number) => {
    if (!canvasRef.current || !framesRef.current[frameIndex]) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = framesRef.current[frameIndex];

    const dpr = window.devicePixelRatio || 1;
    const isMobile = window.innerWidth < 768;
    const zoom = isMobile ? 1.3 : 1;

    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    ctx.scale(dpr, dpr);

    const canvasRatio = window.innerWidth / window.innerHeight;
    const imgRatio = img.width / img.height;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      drawWidth = window.innerWidth * zoom;
      drawHeight = (window.innerWidth / imgRatio) * zoom;
    } else {
      drawWidth = (window.innerHeight * imgRatio) * zoom;
      drawHeight = window.innerHeight * zoom;
    }

    offsetX = (window.innerWidth - drawWidth) / 2;
    offsetY = (window.innerHeight - drawHeight) / 2;

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  useEffect(() => {
    if (isMobile === null || isMobile) return;
    if (!loaded) return;

    // Ensure the first frame is drawn immediately
    requestAnimationFrame(() => drawFrame(0));

    const handleScroll = () => {
      if (!tickingRef.current) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current) {
            tickingRef.current = false;
            return;
          }

          const rect = containerRef.current.getBoundingClientRect();
          const scrollDistance = rect.height - window.innerHeight;
          let progress = -rect.top / scrollDistance;

          progress = Math.max(0, Math.min(1, progress));

          const frameIndex = Math.floor(progress * (FRAME_COUNT - 1));
          drawFrame(frameIndex);

          tickingRef.current = false;
        });
        tickingRef.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", () => drawFrame(0), { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", () => drawFrame(0));
    };
  }, [loaded, isMobile]);

  if (isMobile === null) return <div className="h-screen w-full bg-[#0B0908]" />;

  if (isMobile) {
    return (
      <section className="relative w-full h-[100svh] bg-[#0B0908] overflow-hidden flex flex-col items-center justify-center">
        {/* Auto-playing video loop for mobile */}
        <video 
          src="/assets/hero.mp4" 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0908]/90 via-transparent to-[#0B0908] pointer-events-none" />

        {/* Mobile Animated Text */}
        <div className="relative z-10 flex flex-col items-center text-center p-6 w-full max-w-sm mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-8 relative"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-10 -left-10 opacity-40 text-[#D4AF37]"
            >
              <Sparkles className="w-20 h-20 blur-[2px]" />
            </motion.div>
            <span className="text-[#D4AF37] font-semibold tracking-[0.3em] text-xs mb-4 uppercase block drop-shadow-md">Aether Café</span>
            <h1 className="text-5xl font-black text-white mb-4 tracking-tighter drop-shadow-2xl leading-tight">
              Coffee Beyond <br/> Gravity.
            </h1>
            <p className="text-white/80 text-lg font-light leading-relaxed">
              Crafted slowly. Experienced deeply. A true cinematic journey in a cup.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="flex flex-col items-center text-[#D4AF37] gap-2 mt-8"
          >
            <span className="text-[10px] tracking-[0.3em] font-semibold uppercase">Explore Below</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <ChevronDown className="w-5 h-5 opacity-80" />
            </motion.div>
          </motion.div>
        </div>

        {/* Dynamic Marquee at the bottom of the screen */}
        <div className="absolute bottom-0 w-full bg-[#D4AF37]/90 text-[#0B0908] py-2 backdrop-blur-sm border-t border-[#D4AF37] z-20">
          <Marquee autoFill speed={40} className="overflow-hidden font-bold tracking-widest text-xs uppercase">
            <span className="mx-6 flex items-center gap-3"><Coffee className="w-3 h-3" /> Single Origin</span>
            <span className="mx-6 flex items-center gap-3"><Star className="w-3 h-3" /> Master Crafted</span>
            <span className="mx-6 flex items-center gap-3"><Sparkles className="w-3 h-3" /> Liquid Physics</span>
          </Marquee>
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef} className="relative w-full bg-[#0B0908]" style={{ height: "300vh" }}>
      {!loaded && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0B0908] text-[#D4AF37]">
          <h2 className="text-2xl font-bold mb-4 tracking-tight">Brewing Experience</h2>
          <div className="w-64 h-1 bg-[#1E1A17] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#D4AF37] transition-all duration-200 ease-out"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
        </div>
      )}

      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0B0908]">
        <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />

        {loaded && (
          <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
            <ScrollText containerRef={containerRef} />

            {/* Animated Scroll Indicator */}
            <motion.div
              className="absolute bottom-12 flex flex-col items-center text-[#D4AF37] gap-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
            >
              <span className="text-xs tracking-[0.3em] font-semibold uppercase">Scroll to Explore</span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <ChevronDown className="w-6 h-6 opacity-70" />
              </motion.div>
            </motion.div>

            {/* Dynamic Marquee at the bottom of the screen */}
            <div className="absolute bottom-0 w-full bg-[#D4AF37]/90 text-[#0B0908] py-3 backdrop-blur-sm shadow-[0_-10px_40px_rgba(212,175,55,0.15)] border-t border-[#D4AF37]">
              <Marquee autoFill speed={50} className="overflow-hidden font-bold tracking-widest text-sm uppercase">
                <span className="mx-8 flex items-center gap-4"><Coffee className="w-4 h-4" /> Single Origin Roasts</span>
                <span className="mx-8 flex items-center gap-4"><Star className="w-4 h-4" /> Master Crafted</span>
                <span className="mx-8 flex items-center gap-4"><Sparkles className="w-4 h-4" /> Liquid Physics</span>
                <span className="mx-8 flex items-center gap-4"><Coffee className="w-4 h-4" /> Award Winning Baristas</span>
              </Marquee>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function ScrollText({ containerRef }: { containerRef: React.RefObject<HTMLDivElement> }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3], [0, 1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3], [50, 0, 0, -50]);

  const opacity2 = useTransform(scrollYProgress, [0.3, 0.4, 0.5, 0.6], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.3, 0.4, 0.5, 0.6], [50, 0, 0, -50]);

  const opacity3 = useTransform(scrollYProgress, [0.6, 0.7, 0.8, 0.9], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.6, 0.7, 0.8, 0.9], [50, 0, 0, -50]);

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  // Split text helper for character animations
  const AnimatedWord = ({ text }: { text: string }) => {
    const words = text.split(" ");
    return (
      <motion.div className="flex flex-wrap justify-center gap-x-3" variants={textVariants} initial="hidden" whileInView="visible">
        {words.map((word, idx) => (
          <motion.span key={idx} variants={itemVariants} className="inline-block">
            {word}
          </motion.span>
        ))}
      </motion.div>
    );
  };

  return (
    <>
      <motion.div
        style={{ opacity: opacity1, y: y1 }}
        className="absolute flex flex-col items-center text-center p-8 rounded-3xl backdrop-blur-xl bg-black/40 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.1)]"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-12 -left-12 opacity-50 text-[#D4AF37]"
        >
          <Sparkles className="w-24 h-24 blur-sm" />
        </motion.div>

        <span className="text-[#D4AF37] font-semibold tracking-[0.4em] text-sm mb-4 uppercase drop-shadow-md">Aether Café</span>
        <h1 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter drop-shadow-2xl">
          <AnimatedWord text="Coffee Beyond Gravity." />
        </h1>
        <p className="text-white/90 max-w-lg text-xl font-light leading-relaxed">
          Crafted slowly. Experienced deeply. A true cinematic journey in a cup.
        </p>
      </motion.div>

      <motion.div
        style={{ opacity: opacity2, y: y2 }}
        className="absolute flex flex-col items-center text-center p-8 rounded-3xl backdrop-blur-xl bg-black/40 border border-[#D4AF37]/20 shadow-[0_8px_32px_rgba(212,175,55,0.1),inset_0_1px_0_rgba(212,175,55,0.2)]"
      >
        <span className="text-[#D4AF37] font-semibold tracking-[0.4em] text-sm mb-4 uppercase drop-shadow-md">The Experience</span>
        <h1 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter drop-shadow-2xl">
          <AnimatedWord text="Liquid Physics." />
        </h1>
        <p className="text-white/90 max-w-lg text-xl font-light leading-relaxed">
          Observe the precise art of extraction in ultra slow motion.
        </p>
      </motion.div>

      <motion.div
        style={{ opacity: opacity3, y: y3 }}
        className="absolute flex flex-col items-center text-center p-8 rounded-3xl backdrop-blur-xl bg-black/40 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.1)]"
      >
        <span className="text-[#D4AF37] font-semibold tracking-[0.4em] text-sm mb-4 uppercase drop-shadow-md">The Culmination</span>
        <h1 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter drop-shadow-2xl">
          <AnimatedWord text="World Class Aroma." />
        </h1>
        <p className="text-white/90 max-w-lg text-xl font-light leading-relaxed">
          Every drop is a universe of flavor waiting to be discovered.
        </p>
      </motion.div>
    </>
  );
}
