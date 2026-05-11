"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface SelectorOption {
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
}

interface InteractiveSelectorProps {
  title: string;
  subtitle: string;
  options: SelectorOption[];
}

export const InteractiveSelector: React.FC<InteractiveSelectorProps> = ({ title, subtitle, options }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatedOptions, setAnimatedOptions] = useState<number[]>([]);
  
  const handleOptionClick = (index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    
    options.forEach((_, i) => {
      const timer = setTimeout(() => {
        setAnimatedOptions(prev => [...prev, i]);
      }, 180 * i);
      timers.push(timer);
    });
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [options]);

  return (
    <div className="relative flex flex-col items-center justify-center w-full font-sans"> 
      <div className="w-full max-w-4xl px-6 mb-12 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tighter"
        >
          {title}
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl text-white/60 font-light max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      </div>

      <div className="flex flex-col md:flex-row w-full max-w-[1200px] h-[600px] md:h-[500px] mx-auto items-stretch overflow-hidden relative px-4 md:px-0 gap-2 md:gap-0">
        {options.map((option, index) => (
          <div
            key={index}
            className="relative flex flex-col justify-end overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
            style={{
              backgroundImage: `url('${option.image}')`,
              backgroundSize: activeIndex === index ? 'cover' : 'cover',
              backgroundPosition: 'center',
              opacity: animatedOptions.includes(index) ? 1 : 0,
              minHeight: '70px',
              minWidth: '70px',
              borderWidth: '2px',
              borderStyle: 'solid',
              borderColor: activeIndex === index ? '#D4AF37' : 'rgba(255,255,255,0.05)',
              cursor: 'pointer',
              backgroundColor: '#18181b',
              boxShadow: activeIndex === index 
                ? '0 20px 60px rgba(0,0,0,0.8)' 
                : '0 10px 30px rgba(0,0,0,0.5)',
              flex: activeIndex === index ? '7 1 0%' : '1 1 0%',
              zIndex: activeIndex === index ? 10 : 1,
              borderRadius: '16px',
              margin: '0 4px',
            }}
            onClick={() => handleOptionClick(index)}
          >
            <div 
              className="absolute left-0 right-0 pointer-events-none transition-all duration-700 ease-in-out"
              style={{
                bottom: activeIndex === index ? '0' : '-40px',
                height: '150px',
                background: activeIndex === index 
                  ? 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)' 
                  : 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)'
              }}
            />
            
            <div className="absolute left-0 right-0 bottom-4 md:bottom-6 flex items-center justify-start h-12 z-10 pointer-events-none px-4 gap-4 w-full">
              <div 
                className={`min-w-[48px] max-w-[48px] h-[48px] flex items-center justify-center rounded-full backdrop-blur-md border-2 flex-shrink-0 flex-grow-0 transition-all duration-500 ${
                  activeIndex === index ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37]' : 'bg-black/50 border-white/10 text-white/50'
                }`}
              >
                {option.icon}
              </div>
              <div className="text-white whitespace-pre relative overflow-hidden">
                <div 
                  className="font-bold text-xl md:text-2xl transition-all duration-700 ease-in-out"
                  style={{
                    opacity: activeIndex === index ? 1 : 0,
                    transform: activeIndex === index ? 'translateX(0)' : 'translateX(25px)'
                  }}
                >
                  {option.title}
                </div>
                <div 
                  className="text-sm md:text-base text-[#D4AF37] mt-1 font-light tracking-wider transition-all duration-700 ease-in-out delay-75"
                  style={{
                    opacity: activeIndex === index ? 1 : 0,
                    transform: activeIndex === index ? 'translateX(0)' : 'translateX(25px)'
                  }}
                >
                  {option.description}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
