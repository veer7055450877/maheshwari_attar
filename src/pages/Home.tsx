import React from 'react';
import { Hero } from '../components/Hero';
import { SensoryScroll } from '../components/SensoryScroll';
import { Collection } from '../components/Collection';
import { BrandPhilosophy } from '../components/BrandPhilosophy';
import { Craftsmanship } from '../components/Craftsmanship';
import { FAQ } from '../components/FAQ';
import { Testimonials } from '../components/Testimonials';
import { ExperienceCTA } from '../components/ExperienceCTA';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="bg-brand-black min-h-screen selection:bg-brand-gold selection:text-brand-black">
      {/* 1. The Cinematic Lock & Release Hero */}
      <Hero />

      {/* 2. Sensory Immersion (Fixed Sections) */}
      <SensoryScroll />

      {/* 3. Signature Creations (Reveal on Commitment) */}
      <Collection />

      {/* 4. Brand Philosophy (Editorial Text) */}
      <BrandPhilosophy />

      {/* 5. Process Preview (Sequential Authority) */}
      <Craftsmanship />

      {/* 6. FAQ Section (Knowledge) */}
      <FAQ />

      {/* 7. Experience CTA */}
      <ExperienceCTA />

      {/* 8. Testimonials (Confidence) */}
      <Testimonials />

      {/* 9. Final CTA (Silent Closure) */}
      <section className="relative py-48 bg-brand-black text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#000]" />
        
        <div className="relative z-10 container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-5xl md:text-7xl text-brand-ivory mb-12">
              Begin Your <br/> <span className="text-brand-gold italic">Fragrance Journey</span>
            </h2>
            
            <Link 
              to="/collection"
              className="group relative inline-flex items-center gap-4 px-8 py-2 overflow-hidden"
            >
              <span className="relative z-10 text-brand-ivory uppercase tracking-[0.3em] text-xs group-hover:text-brand-gold transition-colors duration-500">
                Explore The Collection
              </span>
              <span className="h-[1px] w-12 bg-brand-ivory group-hover:w-20 group-hover:bg-brand-gold transition-all duration-500"></span>
              
              {/* Subtle Glow */}
              <div className="absolute inset-0 bg-brand-gold/0 group-hover:bg-brand-gold/5 blur-xl transition-colors duration-700" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
