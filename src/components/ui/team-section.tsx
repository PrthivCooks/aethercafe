"use client";

import * as React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export interface AnimatedTeamSectionProps {
  title: string;
  description: string;
  members: TeamMember[];
  className?: string;
}

const getCardState = (index: number, total: number, isMobile: boolean) => {
  const centerIndex = (total - 1) / 2;
  const distanceFromCenter = index - centerIndex;

  const spreadX = isMobile ? 35 : 90;
  const spreadY = isMobile ? -15 : -30;
  const spreadRotate = isMobile ? 6 : 12;

  const x = distanceFromCenter * spreadX;
  const y = Math.abs(distanceFromCenter) * spreadY;
  const rotate = distanceFromCenter * spreadRotate;

  return { x, y, rotate };
};

const AnimatedTeamSection = React.forwardRef<
  HTMLDivElement,
  AnimatedTeamSectionProps
>(({ title, description, members, className, ...props }, ref) => {
  const controls = useAnimation();
  const [inViewRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView, isMobile]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.5, x: 0, y: isMobile ? 20 : 0, rotate: 0 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      x: isMobile ? 0 : getCardState(i, members.length, isMobile).x,
      y: isMobile ? 0 : getCardState(i, members.length, isMobile).y,
      rotate: isMobile ? 0 : getCardState(i, members.length, isMobile).rotate,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12,
      },
    }),
  };

  return (
    <section
      ref={ref}
      className={cn("w-full py-20 lg:py-28 overflow-hidden", className)}
      {...props}
    >
      <div className="container mx-auto flex flex-col items-center text-center px-4">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#F2EFEA] mb-3">
          {title}
        </h2>
        <p className="max-w-3xl text-white/60 md:text-xl">
          {description}
        </p>

        <motion.div
          ref={inViewRef}
          className="mt-16 md:mt-32 w-full grid grid-cols-2 sm:grid-cols-3 gap-4 md:flex md:relative md:items-center md:justify-center md:gap-0"
          style={{ minHeight: isMobile ? "auto" : "350px" }}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {members.map((member, index) => (
            <motion.div
              key={index}
              className="relative w-full aspect-[4/5] md:aspect-square md:absolute md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-xl overflow-hidden shadow-[0_15px_50px_rgba(0,0,0,0.9)] border-2 md:border-4 border-[#120F0D] group cursor-pointer"
              custom={index}
              variants={itemVariants}
              style={{ zIndex: isMobile ? 1 : members.length - Math.abs(index - (members.length - 1) / 2) }}
              whileHover={isMobile ? { scale: 1.02 } : {
                scale: 1.15,
                y: getCardState(index, members.length, isMobile).y - 20,
                zIndex: 99,
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-110"
              />
              <div className={cn(
                "absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-4 lg:p-6 text-left transition-opacity duration-300",
                isMobile ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              )}>
                <h3 className={cn(
                  "text-white font-bold text-lg lg:text-2xl tracking-tight transition-transform duration-300",
                  isMobile ? "translate-y-0" : "translate-y-4 group-hover:translate-y-0"
                )}>{member.name}</h3>
                <p className={cn(
                  "text-[#D4AF37] font-semibold text-xs lg:text-sm tracking-widest uppercase mt-1 transition-transform duration-300 delay-75",
                  isMobile ? "translate-y-0" : "translate-y-4 group-hover:translate-y-0"
                )}>{member.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
});

AnimatedTeamSection.displayName = "AnimatedTeamSection";

export { AnimatedTeamSection };
