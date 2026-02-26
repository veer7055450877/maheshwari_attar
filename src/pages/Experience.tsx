import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '../components/ui/Section';

export const Experience = () => {
  return (
    <div className="bg-brand-black min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-24"
        >
          <h1 className="font-serif text-5xl md:text-7xl text-brand-ivory mb-8">
            The Art of <span className="italic text-brand-gold">Wearing</span>
          </h1>
          <p className="text-brand-ivory/50 font-light max-w-2xl mx-auto text-lg">
            Attar is not sprayed; it is anointed. It is an intimate ritual between the wearer and the scent.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { title: "The Pulse", desc: "Apply a single drop to the inside of your wrist. Do not rub. Let the heat of your pulse awaken the oil." },
            { title: "The Aura", desc: "Dab gently behind the earlobes. As you move, the scent will create a subtle aura around you." },
            { title: "The Fabric", desc: "A trace on your collar or scarf will carry the memory of the fragrance for days." }
          ].map((item, i) => (
            <Section key={i} className="py-0">
              <div className="border border-white/5 p-10 h-full hover:border-brand-gold/20 transition-colors duration-700">
                <span className="text-brand-gold font-serif text-4xl block mb-6">0{i + 1}</span>
                <h3 className="font-serif text-2xl text-brand-ivory mb-4">{item.title}</h3>
                <p className="text-brand-ivory/50 font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </Section>
          ))}
        </div>

        <div className="mt-32 text-center">
          <h2 className="font-serif text-3xl text-brand-ivory mb-8">Visit Our Showroom</h2>
          <div className="aspect-video w-full max-w-4xl mx-auto relative overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1580251639726-0ef0875c7553?q=80&w=2574&auto=format&fit=crop" 
              alt="Showroom" 
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-[2s]"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="px-8 py-3 border border-brand-ivory text-brand-ivory uppercase tracking-widest hover:bg-brand-ivory hover:text-black transition-all duration-500">
                Get Directions
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
