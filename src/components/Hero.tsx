import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // 400vh scroll container for the 5-Frame Narrative
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001
  });

  // --- FRAME LOGIC ---

  // FRAME 1: ARRIVAL (0 - 0.15)
  // Image fades in, ambient motion. Handled by initial CSS/Motion.

  // FRAME 2: PRESSURE (0.15 - 0.35)
  // Image sharpens, Vignette intensifies, Background darkens
  const vignetteOpacity = useTransform(smoothProgress, [0.15, 0.35], [0, 0.8]);
  const imgScale = useTransform(smoothProgress, [0.15, 0.35], [1, 1.05]);
  const imgContrast = useTransform(smoothProgress, [0.15, 0.35], ["100%", "110%"]);

  // FRAME 3: IDENTITY REVEAL (0.35 - 0.55)
  // Text Mask Reveals
  const textMaskWidth = useTransform(smoothProgress, [0.35, 0.55], ["0%", "100%"]);
  const imgDim = useTransform(smoothProgress, [0.35, 0.55], [1, 0.6]);

  // FRAME 4: AUTHORITY (0.55 - 0.8)
  // Tagline appears, Image retreats (blur + scale down)
  const taglineOpacity = useTransform(smoothProgress, [0.6, 0.7], [0, 1]);
  const imgRetreatScale = useTransform(smoothProgress, [0.6, 0.8], [1.05, 0.9]);
  const imgBlur = useTransform(smoothProgress, [0.6, 0.8], ["0px", "8px"]);

  // FRAME 5: TRANSITION (0.85 - 1.0)
  // Fade out to black for handoff
  const containerOpacity = useTransform(smoothProgress, [0.9, 1], [1, 0]);

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-brand-black z-20">
      <motion.div
        style={{ opacity: containerOpacity }}
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center"
      >
        {/* --- BACKGROUND --- */}
        <div className="absolute inset-0 bg-[#050505]" />

        {/* Dynamic Vignette (Pressure) */}
        <motion.div
          style={{ opacity: vignetteOpacity }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_90%)] z-10 pointer-events-none"
        />

        {/* --- IMAGE LAYER --- */}
        <motion.div
          className="relative z-0 w-full h-full flex items-center justify-center"
          style={{
            scale: useTransform(imgScale, (v) => v * imgRetreatScale.get()), // Combine scales
            filter: useTransform(
              imgContrast,
              (c) => `contrast(${c}) blur(${imgBlur.get()})`,
            ),
            opacity: imgDim,
          }}
        >
          {/* Atmospheric Scene Image */}
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-black/20 z-10" />
            <picture>
              <source
                media="(min-width: 550px)"
                srcset="https://images.unsplash.com/photo-1588514912908-8f5891714f8d?q=80&w=2574&auto=format&fit=crop"
              />
              <img
                src="https://images.unsplash.com/photo-1723391962154-8a2b6299bc09?q=80&w=2574&auto=format&fit=crop"
                alt="Maheshwari Attar Atmospheric"
                className="w-full h-full object-cover"
              />
            </picture>
            {/* Dust/Grain Overlay */}
            <div className="absolute inset-0 opacity-[0.15] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] animate-pulse-slow mix-blend-overlay" />
          </div>
        </motion.div>

        {/* --- TEXT LAYER (Z-30) --- */}
        <div className="absolute z-30 flex flex-col items-center justify-center w-full px-4">
          {/* Identity Reveal (Masked) */}
          <div className="relative overflow-hidden mb-6">
            <motion.div
              style={{ width: textMaskWidth }}
              className="overflow-hidden whitespace-nowrap"
            >
              <h1 className="font-serif text-5xl md:text-8xl lg:text-9xl text-brand-ivory uppercase leading-none tracking-tight text-center">
                Maheshwari
              </h1>
            </motion.div>
          </div>

          {/* Authority Tagline */}
          <motion.p
            style={{ opacity: taglineOpacity }}
            className="font-sans text-brand-gold text-xs md:text-sm tracking-[0.4em] uppercase"
          >
            Crafted in Tradition. Worn in Royalty.
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};
