import React from 'react';
import { Instagram, Twitter, Facebook, MapPin, Mail, Phone } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#020202] text-brand-ivory border-t border-white/5 pt-20 pb-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="md:col-span-1">
            <h2 className="font-serif text-2xl text-brand-ivory mb-2">MAHESHWARI</h2>
            <span className="text-[10px] tracking-[0.3em] text-brand-gold uppercase block mb-6">Attar</span>
            <p className="text-brand-ivory/50 text-sm font-light leading-relaxed">
              Timeless fragrances crafted for the modern soul. Experience the royalty of pure artisanal attars.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="uppercase tracking-widest text-xs font-semibold text-brand-gold mb-6">Explore</h4>
            <ul className="space-y-4 text-sm text-brand-ivory/70 font-light">
              <li><a href="#" className="hover:text-brand-ivory transition-colors">Our Heritage</a></li>
              <li><a href="#" className="hover:text-brand-ivory transition-colors">The Collection</a></li>
              <li><a href="#" className="hover:text-brand-ivory transition-colors">Craftsmanship</a></li>
              <li><a href="#" className="hover:text-brand-ivory transition-colors">Journal</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="uppercase tracking-widest text-xs font-semibold text-brand-gold mb-6">Contact</h4>
            <ul className="space-y-4 text-sm text-brand-ivory/70 font-light">
              <li className="flex items-center gap-3">
                <MapPin size={14} className="text-brand-gold" />
                <span>Kannauj, India - 209725</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} className="text-brand-gold" />
                <span>concierge@maheshwari.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={14} className="text-brand-gold" />
                <span>+91 987 654 3210</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="uppercase tracking-widest text-xs font-semibold text-brand-gold mb-6">Newsletter</h4>
            <p className="text-brand-ivory/50 text-sm font-light mb-4">
              Subscribe to receive updates on new harvests and exclusive blends.
            </p>
            <div className="flex border-b border-brand-ivory/20 pb-2">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-transparent border-none outline-none text-brand-ivory placeholder:text-brand-ivory/30 w-full text-sm font-light"
              />
              <button className="text-brand-gold uppercase text-xs tracking-widest hover:text-brand-ivory transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-brand-ivory/30 text-xs font-light tracking-wide">
            © 2025 Maheshwari Attar. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-brand-ivory/50 hover:text-brand-gold transition-colors"><Instagram size={18} /></a>
            <a href="#" className="text-brand-ivory/50 hover:text-brand-gold transition-colors"><Twitter size={18} /></a>
            <a href="#" className="text-brand-ivory/50 hover:text-brand-gold transition-colors"><Facebook size={18} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};
