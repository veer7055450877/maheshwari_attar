import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { ProductionModal } from '../components/ui/ProductionModal';
import { addData, PRODUCTION } from '../lib/data';
import Head from '../lib/head';

export const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Add enquiry to DB or Mock
    await addData('enquiries', formData);

    setSubmitted(true);

    if (!PRODUCTION) {
      setShowModal(true);
    }
  };

  return (
    <div className="bg-brand-black min-h-screen pt-32 pb-20 flex items-center">
      <Head
        title="Contact — Maheshwari Attar"
        description="Get in touch with Maheshwari Attar for private consultations, custom blends, and press inquiries."
      />
      <ProductionModal isOpen={showModal} onClose={() => setShowModal(false)} />

      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-20">

        {/* Info */}
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="font-serif text-5xl md:text-7xl text-brand-ivory mb-12"
          >
            Get in <span className="italic text-brand-gold">Touch</span>
          </motion.h1>

          <div className="space-y-8 text-brand-ivory/70 font-light">
            <p className="text-lg">
              For private consultations, custom blends, or press inquiries, please contact us.
            </p>
            <div>
              <span className="block text-brand-gold text-xs uppercase tracking-widest mb-2">Address</span>
              <p>Royal Perfumery Lane, Kannauj, India - 209725</p>
            </div>
            <div>
              <span className="block text-brand-gold text-xs uppercase tracking-widest mb-2">Email</span>
              <p>concierge@maheshwari.com</p>
            </div>
            <div>
              <span className="block text-brand-gold text-xs uppercase tracking-widest mb-2">Phone</span>
              <p>+91 987 654 3210</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white/[0.02] p-10 border border-white/5">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-8">
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1, duration: 0.8 }}>
                <label className="block text-brand-gold text-xs uppercase tracking-widest mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-transparent border-b border-white/20 py-2 text-brand-ivory outline-none focus:border-brand-gold transition-colors duration-500"
                  required
                />
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.8 }}>
                <label className="block text-brand-gold text-xs uppercase tracking-widest mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-transparent border-b border-white/20 py-2 text-brand-ivory outline-none focus:border-brand-gold transition-colors duration-500"
                  required
                />
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>
                <label className="block text-brand-gold text-xs uppercase tracking-widest mb-2">Message</label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-transparent border-b border-white/20 py-2 text-brand-ivory outline-none focus:border-brand-gold transition-colors duration-500 resize-none"
                  required
                ></textarea>
              </motion.div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                type="submit"
                className="w-full py-4 border border-brand-gold/30 text-brand-gold uppercase tracking-[0.2em] text-xs hover:bg-brand-gold hover:text-brand-black transition-all duration-700"
              >
                Send Message
              </motion.button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full flex flex-col items-center justify-center text-center py-20"
            >
              <div className="w-16 h-16 border border-brand-gold rounded-full flex items-center justify-center mb-6">
                <div className="w-2 h-2 bg-brand-gold rounded-full" />
              </div>
              <h3 className="font-serif text-2xl text-brand-ivory mb-4">Message Received</h3>
              <p className="text-brand-ivory/50 font-light">Our concierge will respond to your inquiry shortly.</p>
            </motion.div>
          )}
        </div>

      </div>
    </div>
  );
};
