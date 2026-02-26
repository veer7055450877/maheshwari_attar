import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { getData, Product } from "../lib/data";

export const Collection = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    (async () => {
      const data = await getData('products');
      if (mounted) setProducts(data as Product[]);
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <section id="collection" className="bg-brand-black">
      {/* Vertical Poster Walk */}
      {products.map((product, index) => (
        <div
          key={product.id}
          className="relative h-screen w-full flex items-center justify-center overflow-hidden sticky top-0"
        >
          {/* Background Gradient - Unique per card feeling */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] to-[#0a0a0a] z-0" />

          <div className="relative z-10 container mx-auto px-6 h-full flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
            {/* Poster Image Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              viewport={{ margin: "-20%" }}
              className="w-full max-w-md aspect-[3/4] relative group"
            >
              <div className="absolute inset-0 border border-white/5 group-hover:border-brand-gold/50 transition-colors duration-1000 z-20" />
              <div className="w-full h-full overflow-hidden relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2s] ease-out"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-1000" />
              </div>
            </motion.div>

            {/* Editorial Details */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              viewport={{ margin: "-20%" }}
              className="text-center md:text-left"
            >
              <span className="block text-brand-gold text-xs tracking-[0.4em] uppercase mb-6">
                Collection No. 0{product.id}
              </span>
              <h2 className="font-serif text-5xl md:text-7xl text-brand-ivory mb-4 leading-[0.9]">
                {product.name}
              </h2>
              <p className="font-serif text-brand-ivory/50 italic text-xl mb-12">
                {product.tagline}
              </p>
              <button
                className="text-[10px] uppercase tracking-[0.3em] text-brand-ivory border-b border-white/20 pb-2 hover:text-brand-gold hover:border-brand-gold transition-all duration-500"
                onClick={() => navigate(`/attar/${product.id}`)}
              >
                View Frame
              </button>
            </motion.div>
          </div>
        </div>
      ))}
    </section>
  );
};
