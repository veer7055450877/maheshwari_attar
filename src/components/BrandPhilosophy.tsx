import React, { useRef } from 'react';
import { Section } from './ui/Section';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

// Scroll-Bound Typing Component
const ScrollTypingText = ({ 
  text, 
  progress, 
  range,
  className = "",
  italic = false
}: { 
  text: string, 
  progress: MotionValue<number>,
  range: [number, number],
  className?: string,
  italic?: boolean
}) => {
  const words = text.split(" ");
  const totalChars = text.length;
  const rangeWidth = range[1] - range[0];
  const charStep = rangeWidth / totalChars;

  let globalCharIndex = 0;

  return (
    <span className={`inline ${className}`}>
      {words.map((word, i) => {
        const wordComponent = (
          <span key={i} className="inline-block whitespace-nowrap mr-[0.25em]">
            {word.split("").map((char, j) => {
              const start = range[0] + (globalCharIndex * charStep);
              const end = start + charStep;
              // Smooth fade-in for luxury feel (0.1 -> 1)
              // Using a tight range [start, end] creates a "typing" feel
              const opacity = useTransform(progress, [start, end], [0.1, 1]);
              
              globalCharIndex++;
              return (
                <motion.span 
                  key={j} 
                  style={{ opacity }}
                  className={italic ? 'italic' : ''}
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        );
        // Increment for the space after the word
        globalCharIndex++; 
        return wordComponent;
      })}
    </span>
  );
};

export const BrandPhilosophy = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Optional: Fade out the entire block slightly at the end of the section
  const containerOpacity = useTransform(scrollYProgress, [0.95, 1], [1, 0]);
  const containerScale = useTransform(scrollYProgress, [0.95, 1], [1, 0.98]);

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-brand-black">
      <motion.div 
        style={{ opacity: containerOpacity, scale: containerScale }}
        className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden"
      >
        <div className="container mx-auto px-6 md:px-20">
          <div className="max-w-5xl mx-auto text-center md:text-left">
            <motion.span 
              style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [0, 1]) }}
              className="text-brand-gold uppercase tracking-[0.3em] text-xs block mb-16"
            >
              The Philosophy
            </motion.span>
            
            <div className="font-serif text-3xl md:text-5xl lg:text-6xl text-brand-ivory leading-[1.4] space-y-16 md:space-y-20">
              
              {/* Stanza 1 (0.0 - 0.3) */}
              <div className="block">
                <ScrollTypingText 
                  text="We do not create perfumes." 
                  progress={scrollYProgress} 
                  range={[0.05, 0.2]} 
                />
                <br className="hidden md:block" />
                <ScrollTypingText 
                  text="We bottle memories." 
                  progress={scrollYProgress} 
                  range={[0.2, 0.3]}
                  italic 
                  className="text-brand-ivory/50 mt-2 md:mt-0" 
                />
              </div>

              {/* Stanza 2 (0.3 - 0.6) */}
              <div className="block">
                <ScrollTypingText 
                  text="In a world of noise, Maheshwari Attar is the silence." 
                  progress={scrollYProgress} 
                  range={[0.35, 0.5]}
                />
                <br className="hidden md:block" />
                <ScrollTypingText 
                  text="A pause in time, crafted from the rarest ingredients on earth." 
                  progress={scrollYProgress} 
                  range={[0.5, 0.65]}
                  className="mt-2 md:mt-0 block md:inline-block"
                />
              </div>

              {/* Stanza 3 (0.6 - 0.9) */}
              <div className="block">
                <ScrollTypingText 
                  text="No alcohol. No synthetics." 
                  progress={scrollYProgress} 
                  range={[0.7, 0.8]}
                />
                <br className="hidden md:block" />
                <ScrollTypingText 
                  text="Just pure, unadulterated soul." 
                  progress={scrollYProgress} 
                  range={[0.8, 0.9]}
                  className="text-brand-gold mt-2 md:mt-0" 
                />
              </div>

            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
