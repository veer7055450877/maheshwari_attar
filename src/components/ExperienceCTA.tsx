import React from 'react';
import { Section } from './ui/Section';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const ExperienceCTA = () => {
  return (
    <Section className="bg-brand-black py-32 border-t border-white/5">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="relative py-20 px-8 border border-brand-gold/10 bg-gradient-to-b from-white/[0.02] to-transparent"
        >
          <h2 className="font-serif text-4xl md:text-6xl text-brand-ivory mb-8">
            Experience the <span className="text-brand-gold italic">Essence</span>
          </h2>
          <p className="text-brand-ivory/50 font-light max-w-xl mx-auto mb-12 leading-relaxed">
            A fragrance cannot be explained, only felt. We invite you to discover your signature scent through a personal consultation.
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <Link 
              to="/experience"
              className="inline-block px-10 py-4 border border-brand-gold/30 text-brand-gold uppercase tracking-[0.2em] text-[10px] hover:bg-brand-gold hover:text-brand-black transition-all duration-700"
            >
              Visit Our Store
            </Link>
            <Link 
              to="/contact"
              className="inline-block px-10 py-4 border border-white/10 text-brand-ivory uppercase tracking-[0.2em] text-[10px] hover:bg-white/10 transition-all duration-700"
            >
              Request Consultation
            </Link>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};
