"use client";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import { useState } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Card = ({
className,
image,
children,
}: {
className?: string;
image?: string;
children?: React.ReactNode;
}) => {
return (
  <div
    className={cn(
      "w-[300px] md:w-[350px] cursor-pointer h-[400px] md:h-[450px] overflow-hidden bg-[#1E1A17] rounded-3xl shadow-2xl border border-white/5",
      className
    )}
  >
    {image && (
      <div className="relative h-[250px] overflow-hidden w-full m-0 p-0">
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E1A17] to-transparent z-10" />
        <img
          src={image}
          alt="card"
          className="object-cover w-full h-full scale-105 hover:scale-110 transition-transform duration-700"
        />
      </div>
    )}
    {children && (
      <div className="px-6 p-4 flex flex-col gap-y-2 z-20 relative">{children}</div>
    )}
  </div>
);
};

export interface CardData {
image: string;
title: string;
description: string;
price?: string;
}

export const StackedCardsInteraction = ({
cards,
spreadDistance = 40,
rotationAngle = 5,
animationDelay = 0.1,
}: {
cards: CardData[];
spreadDistance?: number;
rotationAngle?: number;
animationDelay?: number;
}) => {
const [isHovering, setIsHovering] = useState(false);

const limitedCards = cards.slice(0, 3);

return (
  <div className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center">
    <div className="relative w-[300px] md:w-[350px] h-[400px] md:h-[450px]">
      {limitedCards.map((card, index) => {
        const isFirst = index === 0;

        let xOffset = 0;
        let rotation = 0;

        if (limitedCards.length > 1) {
          if (index === 1) {
            xOffset = -spreadDistance;
            rotation = -rotationAngle;
          } else if (index === 2) {
            xOffset = spreadDistance;
            rotation = rotationAngle;
          }
        }

        return (
          <motion.div
            key={index}
            className={cn("absolute", isFirst ? "z-10" : "z-0")}
            initial={{ x: 0, rotate: 0 }}
            animate={{
              x: isHovering ? xOffset : 0,
              rotate: isHovering ? rotation : 0,
              zIndex: isFirst ? 10 : 0,
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
              delay: index * animationDelay,
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
            {...(isFirst && {
              onHoverStart: () => setIsHovering(true),
              onHoverEnd: () => setIsHovering(false),
              onClick: () => setIsHovering(!isHovering),
            })}
          >
            <Card
              className={isFirst ? "z-10 cursor-pointer" : "z-0"}
              image={card.image}
            >
              <h2 className="text-2xl font-bold text-white tracking-tight">{card.title}</h2>
              <p className="text-white/70 text-sm leading-relaxed">{card.description}</p>
              {card.price && <div className="mt-2 text-[#D4AF37] font-mono">{card.price}</div>}
            </Card>
          </motion.div>
        );
      })}
    </div>
  </div>
);
};
