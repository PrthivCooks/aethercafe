"use client";

import React, { useEffect, useRef } from 'react';
import { Star } from 'lucide-react';
import { motion, animate } from 'framer-motion';
import { cn } from '@/lib/utils'; 

interface ReviewSummaryCardProps {
  rating: number;
  reviewCount: number;
  maxRating?: number;
  summaryText: string;
  className?: string;
}

export const ReviewSummaryCard: React.FC<ReviewSummaryCardProps> = ({
  rating,
  reviewCount,
  maxRating = 5,
  summaryText,
  className,
}) => {
  const ratingRef = useRef<HTMLSpanElement>(null);
  const reviewCountRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ratingControl = animate(0, rating, {
      duration: 1.5,
      ease: 'easeOut',
      onUpdate(value) {
        if (ratingRef.current) {
          ratingRef.current.textContent = value.toFixed(1);
        }
      },
    });

    const reviewCountControl = animate(0, reviewCount, {
      duration: 1.5,
      ease: 'easeOut',
      onUpdate(value) {
        if (reviewCountRef.current) {
          reviewCountRef.current.textContent = new Intl.NumberFormat('en-US').format(
            Math.round(value)
          );
        }
      },
    });

    return () => {
      ratingControl.stop();
      reviewCountControl.stop();
    };
  }, [rating, reviewCount]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: 'easeOut'
      } 
    },
  };

  const starVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.2 + i * 0.1,
        duration: 0.4,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <motion.div
      className={cn(
        'w-full max-w-xs rounded-xl border border-white/10 bg-[#1E1A17] p-6 text-center shadow-sm',
        'flex flex-col items-center justify-center',
        className
      )}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      aria-label={`Rating: ${rating} out of ${maxRating} based on ${reviewCount} reviews.`}
    >
      <div className="flex items-center gap-1">
        {Array.from({ length: maxRating }, (_, i) => (
          <motion.div key={i} custom={i} variants={starVariants}>
            <Star
              className={cn(
                'h-6 w-6',
                rating >= i + 0.5 ? 'text-[#D4AF37]' : 'text-white/20'
              )}
              fill="currentColor"
            />
          </motion.div>
        ))}
      </div>

      <h2 className="mt-4 text-4xl font-bold tracking-tight text-white">
        <span ref={ratingRef}>0.0</span>
        <span className="text-3xl font-semibold text-white/80">
          {' '}(<span ref={reviewCountRef}>0</span> Reviews)
        </span>
      </h2>

      <p className="mt-2 text-sm text-white/60">{summaryText}</p>
    </motion.div>
  );
};
