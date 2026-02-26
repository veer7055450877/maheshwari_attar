import React, { useState } from 'react';
import { Section } from './ui/Section';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "What distinguishes an Attar from a standard perfume?",
    answer: "Attars are pure, highly concentrated botanical extracts distilled traditionally into a sandalwood oil base. Unlike standard perfumes, they contain absolutely no alcohol or synthetic solvents, resulting in a deeper, more intimate scent that evolves beautifully with your body chemistry."
  },
  {
    question: "How should I apply Maheshwari Attar?",
    answer: "Attar is an intimate ritual. Apply a single drop to your pulse points—the inside of your wrists, behind the earlobes, or the nape of your neck. Do not rub the oil; simply let the natural heat of your skin awaken the essence."
  },
  {
    question: "How long does the fragrance last on the skin?",
    answer: "Because our attars are entirely oil-based and highly concentrated, their longevity is exceptional. Depending on the specific notes (Oud and Amber being the longest-lasting), a single drop can linger on the skin for 12 to 24 hours, and on fabric for several days."
  },
  {
    question: "Do attars expire or lose their scent over time?",
    answer: "True artisanal attars do not expire. In fact, like fine wine, they mature and grow richer with age. As the moisture naturally evaporates over decades, the scent profile deepens, becoming smoother and more profound."
  },
  {
    question: "Are your ingredients ethically sourced and cruelty-free?",
    answer: "Absolutely. We harvest our botanicals from ethical, sustainable farms across India and the globe. Our musks are entirely plant-based or ethically derived, ensuring no harm comes to any animal in the pursuit of our luxury."
  },
  {
    question: "How should I store my attar collection?",
    answer: "To preserve the integrity of the delicate oils, store your crystal bottles in a cool, dark place, away from direct sunlight and extreme temperature fluctuations. The velvet-lined boxes they arrive in are perfect for long-term preservation."
  },
  {
    question: "Can I wear attar on my clothing?",
    answer: "While attar is traditionally worn on the skin to mix with your natural chemistry, you can apply it to dark clothing. However, because it is a pure oil, we recommend avoiding direct application on light-colored silks or delicate fabrics to prevent staining. Instead, gently rub a drop between your palms and lightly brush over your garments."
  }
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section className="bg-[#020202] py-32 border-t border-white/5">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-20">
          <span className="text-brand-gold uppercase tracking-[0.3em] text-xs block mb-6">
            Inquiries
          </span>
          <h2 className="font-serif text-4xl md:text-6xl text-brand-ivory">
            The Knowledge of <span className="italic text-brand-gold">Essence</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="border border-white/5 bg-white/[0.01] overflow-hidden transition-colors duration-500 hover:border-white/10"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
              >
                <span className={`font-serif text-lg md:text-xl transition-colors duration-500 ${openIndex === index ? 'text-brand-gold' : 'text-brand-ivory'}`}>
                  {faq.question}
                </span>
                <span className="text-brand-gold ml-6 shrink-0">
                  {openIndex === index ? <Minus size={18} strokeWidth={1} /> : <Plus size={18} strokeWidth={1} />}
                </span>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="px-6 pb-8 md:px-8 text-brand-ivory/60 font-light leading-relaxed text-sm md:text-base">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};
