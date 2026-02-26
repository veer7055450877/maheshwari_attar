import React from 'react';
import { Section } from './ui/Section';
import { motion } from 'framer-motion';

const steps = [
  { num: "01", title: "The Harvest", desc: "Hand-picked at dawn when the scent is purest." },
  { num: "02", title: "The Fire", desc: "Slow distillation over wood fires for 30 days." },
  { num: "03", title: "The Wait", desc: "Aged in leather bottles until the oil matures." }
];

export const Craftsmanship = () => {
  return (
    <Section id="craftsmanship" className="bg-brand-black py-32 md:py-48">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-32">
          <span className="text-brand-gold uppercase tracking-[0.3em] text-xs">The Process</span>
        </div>

        <div className="space-y-32">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              viewport={{ margin: "-20%" }}
              className="relative flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16 group"
            >
              {/* Number - Ink Reveal */}
              <div className="font-serif text-8xl text-brand-charcoal group-hover:text-brand-gold/20 transition-colors duration-1000">
                {step.num}
              </div>

              {/* Content - Sequential Authority */}
              <div className="pt-4 text-center md:text-left">
                <div className="overflow-hidden mb-4">
                  <motion.h3 
                    initial={{ y: "100%" }}
                    whileInView={{ y: "0%" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    viewport={{ margin: "-10%" }}
                    className="font-serif text-4xl text-brand-ivory"
                  >
                    {step.title}
                  </motion.h3>
                </div>
                <p className="text-brand-ivory/50 font-light text-lg leading-relaxed max-w-md">
                  {step.desc}
                </p>
                
                {/* Gold Line Accent */}
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "60px" }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="h-[1px] bg-brand-gold mt-8 mx-auto md:mx-0"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};
