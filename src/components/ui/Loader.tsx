import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Loader = ({ onComplete }: { onComplete: () => void }) => {
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    // Sequence: Draw (2s) -> Fill (1s) -> Pause (1s) -> Exit
    const timer1 = setTimeout(() => setIsFilled(true), 2500);
    const timer2 = setTimeout(onComplete, 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  // Royal "M" Monogram Path
  const iconPath = "M50 20 L20 80 L50 65 L80 80 L50 20 M50 20 L50 65";

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-brand-black flex flex-col items-center justify-center"
      exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
    >
      {/* Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

      <div className="relative z-10 flex flex-col items-center">
        
        {/* SVG Drawing Animation */}
        <div className="w-32 h-32 mb-8 relative">
          <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
            <motion.path
              d={iconPath}
              fill="transparent"
              stroke="#C8A349"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
            />
            <motion.path
              d={iconPath}
              fill="#C8A349"
              stroke="transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: isFilled ? 1 : 0 }}
              transition={{ duration: 1.5 }}
            />
          </svg>
          
          {/* Glow Effect */}
          <motion.div 
            className="absolute inset-0 bg-brand-gold/20 blur-3xl rounded-full"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: isFilled ? 0.4 : 0, scale: isFilled ? 1.2 : 0.5 }}
            transition={{ duration: 2 }}
          />
        </div>

        {/* Text Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isFilled ? 1 : 0, y: isFilled ? 0 : 10 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center"
        >
          <h1 className="font-serif text-3xl md:text-4xl text-brand-ivory tracking-[0.2em] uppercase">
            Maheshwari
          </h1>
          <span className="text-[10px] text-brand-gold tracking-[0.6em] uppercase mt-3 block">
            Attar
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};
