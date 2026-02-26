import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Our Attars', href: '/collection' },
  { name: 'Craftsmanship', href: '/craftsmanship' },
  { name: 'Experience', href: '/experience' },
  { name: 'Contact', href: '/contact' },
];

export const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // Reveal navbar only after Hero sequence (approx 350vh scroll)
      // This ensures the "Lock & Release" feel is respected
      const heroThreshold = window.innerHeight * 3.5; 
      if (window.scrollY > heroThreshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    if (location.pathname !== '/') {
      setIsVisible(true);
    } else {
      window.addEventListener('scroll', handleScroll);
    }
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: isVisible ? 1 : 0, 
          y: isVisible ? 0 : -20,
          pointerEvents: isVisible ? 'auto' : 'none'
        }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 px-8 py-6 md:px-12 md:py-8 mix-blend-difference text-brand-ivory backdrop-blur-[2px]"
      >
        <div className="flex justify-between items-center">
          {/* Logo - Text Only */}
          <Link to="/" className="font-serif text-lg tracking-widest text-brand-gold hover:text-brand-ivory transition-colors duration-500">
            MAHESHWARI
          </Link>

          {/* Editorial Menu Trigger */}
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="group flex items-center gap-3"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-brand-ivory group-hover:text-brand-gold transition-colors duration-500">Menu</span>
            <div className="flex flex-col items-end gap-1.5">
              <span className="block w-8 h-[1px] bg-brand-ivory group-hover:bg-brand-gold transition-colors duration-500"></span>
              <span className="block w-5 h-[1px] bg-brand-ivory group-hover:w-8 group-hover:bg-brand-gold transition-all duration-500"></span>
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Fullscreen Editorial Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] bg-brand-black flex flex-col justify-center items-center"
          >
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
            
            <button 
              className="absolute top-8 right-8 md:top-12 md:right-12 text-brand-ivory hover:text-brand-gold transition-colors duration-500"
              onClick={() => setIsMenuOpen(false)}
            >
              <X size={32} strokeWidth={1} />
            </button>
            
            <nav className="relative z-10 flex flex-col items-center gap-6 md:gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, letterSpacing: "0em" }}
                  animate={{ opacity: 1, letterSpacing: "0.05em" }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.2 + (i * 0.1), duration: 1 }}
                >
                  <Link
                    to={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="font-serif text-3xl md:text-5xl text-brand-ivory/60 hover:text-brand-ivory hover:italic transition-all duration-700 block text-center"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="absolute bottom-12 text-center"
            >
              <p className="text-brand-ivory/30 text-[10px] uppercase tracking-[0.4em]">
                Est. 1920
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
