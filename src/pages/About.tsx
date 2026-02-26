import React from 'react';
import { Section } from '../components/ui/Section';
import { motion } from 'framer-motion';

export const About = () => {
  return (
    <div className="bg-brand-black min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-32"
        >
          <span className="text-brand-gold uppercase tracking-[0.3em] text-xs block mb-6">
            Our Story
          </span>
          <h1 className="font-serif text-5xl md:text-7xl text-brand-ivory">
            Heritage in{" "}
            <span className="italic text-brand-gold">Every Drop</span>
          </h1>
        </motion.div>

        {/* Story Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center mb-40">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
            className="relative aspect-[3/4]"
          >
            <img
              src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2574&auto=format&fit=crop"
              alt="Old Perfumery"
              className="w-full h-full object-cover grayscale opacity-80"
            />
            <div className="absolute inset-0 border border-white/10 m-4" />
          </motion.div>

          <div className="space-y-12">
            {[
              "Founded in 1920 in the historic city of Kannauj, the perfume capital of India, Maheshwari Attar began as a royal commission.",
              "Our ancestors believed that fragrance was not just a scent, but a bridge to the divine. This philosophy has guided us for four generations.",
              "We preserve the ancient art of 'Deg Bhapka' distillation, a slow, painstaking process that captures the soul of flowers into sandalwood oil.",
            ].map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2, duration: 1 }}
                viewport={{ margin: "-10%" }}
                className="text-brand-ivory/70 font-light text-lg leading-loose"
              >
                {text}
              </motion.p>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <Section className="border-t border-white/5 pt-32 overflow-visible">
          <h2 className="font-serif text-4xl text-brand-ivory text-center mb-20">
            The Timeline
          </h2>
          <div className="space-y-24 relative before:absolute before:left-0 md:before:left-1/2 before:top-0 before:h-full before:w-[1px] before:bg-white/10">
            {[
              {
                year: "1920",
                title: "The Beginning",
                desc: "Commissioned by the royal court of Awadh.",
              },
              {
                year: "1955",
                title: "Global Recognition",
                desc: "First export of pure Rose Attar to Paris.",
              },
              {
                year: "1998",
                title: "Modern Era",
                desc: "Blending tradition with contemporary elegance.",
              },
              {
                year: "2025",
                title: "The Legacy Continues",
                desc: "A new chapter of digital luxury.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ margin: "-10%" }}
                className={`flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-20`}
              >
                <div className="flex-1 md:text-right">
                  {i % 2 === 0 && (
                    <div className="hidden md:block">
                      <h3 className="font-serif text-3xl text-brand-gold mb-2">
                        {item.year}
                      </h3>
                      <h4 className="text-xl text-brand-ivory mb-2">
                        {item.title}
                      </h4>
                      <p className="text-brand-ivory/50 font-light">
                        {item.desc}
                      </p>
                    </div>
                  )}
                </div>

                <div className="w-4 h-4 bg-brand-gold rounded-full relative z-10 shrink-0 md:mx-auto -translate-x-1/2 md:translate-x-0">
                  <div className="absolute inset-0 bg-brand-gold blur-md opacity-50" />
                </div>

                <div className="flex-1">
                  {i % 2 !== 0 && (
                    <div className="ml-4 md:ml-0">
                      <h3 className="font-serif text-3xl text-brand-gold mb-2">
                        {item.year}
                      </h3>
                      <h4 className="text-xl text-brand-ivory mb-2">
                        {item.title}
                      </h4>
                      <p className="text-brand-ivory/50 font-light">
                        {item.desc}
                      </p>
                    </div>
                  )}
                  {i % 2 === 0 && (
                    <div className="md:hidden ml-4 md:ml-0">
                      <h3 className="font-serif text-3xl text-brand-gold mb-2">
                        {item.year}
                      </h3>
                      <h4 className="text-xl text-brand-ivory mb-2">
                        {item.title}
                      </h4>
                      <p className="text-brand-ivory/50 font-light">
                        {item.desc}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
};
