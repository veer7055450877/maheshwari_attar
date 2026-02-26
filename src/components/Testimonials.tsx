import React, { useState, useEffect } from 'react';
import { Section } from './ui/Section';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    quote: "It feels like wearing a memory of a place I've never been, yet always belonged to.",
    author: "Elena R.",
    role: "Paris"
  },
  {
    quote: "The silence of the scent is deafening. It commands attention without saying a word.",
    author: "Sheikh M.",
    role: "Dubai"
  },
  {
    quote: "Finally, a fragrance that understands the difference between expensive and priceless.",
    author: "Aarav S.",
    role: "Mumbai"
  }
];

export const Testimonials = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000); // Slow rotation
    return () => clearInterval(timer);
  }, []);

  return (
    <Section className="bg-brand-black py-40">
      <div className="container mx-auto px-6 text-center">
        <span className="text-brand-gold uppercase tracking-[0.3em] text-xs block mb-16">
          Voices of Royalty
        </span>

        <div className="min-h-[300px] flex flex-col justify-center items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="max-w-4xl mx-auto"
            >
              <span className="font-serif text-6xl text-brand-ivory/10 block mb-8">“</span>
              <h3 className="font-serif text-3xl md:text-5xl text-brand-ivory leading-tight mb-12">
                {testimonials[index].quote}
              </h3>
              <div>
                <p className="text-brand-gold text-sm tracking-widest uppercase mb-2">
                  {testimonials[index].author}
                </p>
                <p className="text-brand-ivory/30 text-xs uppercase tracking-widest">
                  {testimonials[index].role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
};
