import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const notes = [
  {
    name: "OUD",
    image:
      "https://scentsnstories.pk/cdn/shop/collections/D_OudFest_26_Banner.webp?v=1769423960", // Wood texture
    desc: "Ancient. Deep. Resinous.",
  },
  {
    name: "ROSE",
    image:
      "https://images.unsplash.com/photo-1594035910663-369b72b7abe2?q=80&w=2574&auto=format&fit=crop", // Rose petals
    desc: "Velvet. Floral. Eternal.",
  },
  {
    name: "MUSK",
    image:
      "https://fashionminglewp.nyc3.digitaloceanspaces.com/wp-content/uploads/2024/03/musk-perfume.jpeg", // Silk/Texture
    desc: "Sensual. Warm. Skin.",
  },
  {
    name: "AMBER",
    image:
      "https://perfumedubai.com/cdn/shop/files/amber_ee209da4-7ed6-4fe5-8ce5-43c9dd8532d8_1024x1024.jpg?v=1758904859", // Amber glow
    desc: "Golden. Sweet. Earth.",
  },
];

export const SensoryScroll = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-brand-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {notes.map((note, i) => {
          // Calculate active range for each note
          const start = i / notes.length;
          const end = (i + 1) / notes.length;
          const fadeStart = start;
          const fadeEnd = start + 0.05;
          const exitStart = end - 0.05;
          const exitEnd = end;

          const opacity = useTransform(scrollYProgress,
            [fadeStart, fadeEnd, exitStart, exitEnd],
            [0, 1, 1, 0]
          );

          const scale = useTransform(scrollYProgress, [start, end], [1, 1.1]);

          return (
            <motion.div
              key={note.name}
              style={{ opacity }}
              className="absolute inset-0 w-full h-full flex items-center justify-center"
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/60 z-10" />
                <motion.img
                  style={{ scale }}
                  src={note.image}
                  alt={note.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="relative z-20 text-center">
                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="font-serif text-[12vw] md:text-[15vw] text-brand-ivory/90 tracking-widest leading-none mix-blend-overlay"
                >
                  {note.name}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="text-brand-gold uppercase tracking-[0.4em] text-sm mt-4"
                >
                  {note.desc}
                </motion.p>
              </div>
            </motion.div>
          );
        })}

        {/* Smoke Overlay (Global) */}
        <div className="absolute inset-0 z-30 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/foggy-birds.png')] opacity-20 animate-pulse-slow mix-blend-screen"></div>
      </div>
    </section>
  );
};
