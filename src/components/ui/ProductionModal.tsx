import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle } from 'lucide-react';

interface ProductionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProductionModal: React.FC<ProductionModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="bg-[#0a0a0a] border border-white/10 p-8 max-w-md w-full relative shadow-2xl"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-brand-ivory/50 hover:text-brand-gold transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center mb-6 text-brand-gold">
                <AlertCircle size={24} />
              </div>
              <h3 className="font-serif text-2xl text-brand-ivory mb-4">Development Mode</h3>
              <p className="text-brand-ivory/60 font-light text-sm leading-relaxed mb-8">
                The company is currently not in production mode. Your request has been saved locally for demonstration purposes, but no live database connection was made.
              </p>
              <button 
                onClick={onClose}
                className="w-full py-3 border border-brand-gold/30 text-brand-gold uppercase tracking-[0.2em] text-xs hover:bg-brand-gold hover:text-brand-black transition-all duration-500"
              >
                Acknowledge
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
