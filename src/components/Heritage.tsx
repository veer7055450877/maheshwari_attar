import React from 'react';
import { Section } from './ui/Section';
import { motion } from 'framer-motion';

export const Heritage = () => {
  return (
    <Section id="heritage" className="bg-brand-black py-40 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Editorial Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          {/* Text Column */}
          <div className="md:col-span-5 md:col-start-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <span className="text-brand-gold uppercase tracking-[0.3em] text-xs block mb-8">
                The Heritage
              </span>
              <h2 className="font-serif text-4xl md:text-6xl text-brand-ivory mb-12 leading-[1.2]">
                A Century of <br/> <span className="italic text-brand-ivory/50">Silence & Scent</span>
              </h2>
              <p className="text-brand-ivory/70 font-light leading-loose text-lg mb-8">
                Founded in the royal courts of 1920, Maheshwari Attar began as a secret between kings. We believe that true luxury does not shout; it whispers.
              </p>
              <p className="text-brand-ivory/70 font-light leading-loose text-lg">
                Our process remains unchanged for 100 years. No alcohol. No synthetics. Just the pure soul of nature, captured in crystal.
              </p>
            </motion.div>
          </div>

          {/* Image Column */}
          <div className="md:col-span-5 md:col-start-8 relative mt-12 md:mt-0">
            <motion.div 
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              whileInView={{ clipPath: "inset(0% 0 0 0)" }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="relative aspect-[4/5]"
            >
              <img 
                src="https://images.unsplash.com/photo-1616084403156-9ae114af72f4?q=80&w=2574&auto=format&fit=crop" 
                alt="Heritage" 
                className="w-full h-full object-cover grayscale opacity-80"
              />
              <div className="absolute inset-0 bg-brand-gold/10 mix-blend-overlay" />
            </motion.div>
            
            {/* Floating Element */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              viewport={{ once: true }}
              className="absolute -bottom-12 -left-12 bg-brand-charcoal p-8 border border-white/5 hidden md:block"
            >
              <span className="block font-serif text-4xl text-brand-gold">1920</span>
              <span className="text-[10px] uppercase tracking-widest text-brand-ivory/50">Establishment</span>
            </motion.div>
          </div>

        </div>
      </div>
    </Section>
  );
};
