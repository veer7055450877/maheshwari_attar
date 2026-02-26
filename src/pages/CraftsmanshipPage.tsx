import { motion } from 'framer-motion';
import { Craftsmanship } from '../components/Craftsmanship';
import Head from '../lib/head';

export const CraftsmanshipPage = () => {
  return (
    <div className="bg-brand-black min-h-screen">
      <Head
        title="Craftsmanship — Maheshwari Attar"
        description="Discover the traditional processes and time-honored techniques used in creating Maheshwari attars."
      />
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <img
          src="https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=2574&auto=format&fit=crop"
          alt="Craftsmanship Hero"
          className="w-full h-full object-cover"
        />
        <div className="relative z-20 text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="font-serif text-6xl md:text-8xl text-brand-ivory mb-6"
          >
            The Process
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="text-brand-gold uppercase tracking-[0.3em] text-sm"
          >
            From Earth to Essence
          </motion.p>
        </div>
      </div>

      <Craftsmanship />

      <div className="container mx-auto px-6 py-32 text-center max-w-3xl">
        <p className="font-serif text-2xl text-brand-ivory/80 italic leading-relaxed">
          "Time is the most essential ingredient in our attars. We do not rush nature; we wait for it to speak."
        </p>
      </div>
    </div>
  );
};
