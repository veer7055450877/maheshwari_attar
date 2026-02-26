import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { getData, Product } from '../lib/data';
import { Loader } from '../components/ui/Loader';
import { useNavigate } from 'react-router-dom';

// --- INDIVIDUAL PRODUCT CARD COMPONENT ---
const ProductCard = ({ product, index }: { product: Product, index: number }) => {
  const [showIntent, setShowIntent] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Scroll Depth Illusion Logic
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const scrollOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);
  const scrollScale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);

  const handleMouseEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setShowIntent(true), 800);
  };

  const handleMouseLeave = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setShowIntent(false);
  };

  const handleClick = () => {
    navigate(`/attar/${product.id}`);
  };

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ opacity: scrollOpacity, scale: scrollScale }}
      className="w-full"
    >
      <div 
        className="group/card relative aspect-[3/4] md:aspect-[2/3] w-full cursor-pointer overflow-hidden transition-all duration-1000 ease-out hover:-translate-y-4 hover:shadow-2xl hover:shadow-brand-gold/10 group-hover/grid:opacity-30 group-hover/grid:scale-[0.98] hover:!opacity-100 hover:!scale-100"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#111] to-[#050505] z-0" />

        <img 
          src={product.image} 
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover z-10 mix-blend-luminosity opacity-60 group-hover/card:opacity-90 group-hover/card:mix-blend-normal transition-all duration-1000"
        />

        <AnimatePresence>
          {showIntent && (
            <motion.div
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="absolute inset-0 z-20 bg-brand-black/40 flex flex-col items-center justify-center p-8 text-center"
            >
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="font-serif text-brand-ivory/90 italic text-xl md:text-2xl mb-8 leading-relaxed"
              >
                "{product.poeticDesc}"
              </motion.p>
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-brand-gold uppercase tracking-[0.3em] text-[10px] border-b border-brand-gold/50 pb-2 flex items-center gap-2"
              >
                View Essence <span className="text-lg leading-none">&rarr;</span>
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute bottom-0 left-0 right-0 p-8 z-10 bg-gradient-to-t from-brand-black via-brand-black/80 to-transparent transform transition-transform duration-700 group-hover/card:translate-y-2">
          <h3 className="font-serif text-3xl md:text-4xl text-brand-ivory mb-4">{product.name}</h3>
          <div className="h-[1px] w-12 bg-brand-gold/40 transition-all duration-700 group-hover/card:w-24 group-hover/card:bg-brand-gold" />
        </div>
      </div>
    </motion.div>
  );
};

export const CollectionPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Oud", "Rose", "Musk", "Spice", "Amber", "Floral"];

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getData('products');
      setProducts(data as Product[]);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p => 
    activeFilter === "All" || p.category === activeFilter
  );

  if (loading) return <Loader onComplete={() => {}} />;

  return (
    <div className="bg-brand-black min-h-screen pt-40 pb-32">
      <div className="text-center mb-24 px-6">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="font-serif text-5xl md:text-7xl text-brand-ivory tracking-wide"
        >
          Our Attars
        </motion.h1>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "40px" }}
          transition={{ duration: 1, delay: 0.5 }}
          className="h-[1px] bg-brand-gold mx-auto mt-8"
        />
      </div>

      <div className="container mx-auto px-6 mb-20">
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className="relative text-xs uppercase tracking-[0.2em] transition-colors duration-500 pb-2"
              style={{ color: activeFilter === filter ? '#F4F1EC' : 'rgba(244, 241, 236, 0.4)' }}
            >
              {filter}
              {activeFilter === filter && (
                <motion.div 
                  layoutId="activeFilterUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[1px] bg-brand-gold"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 max-w-[1600px]">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-20 group/grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32"
          >
            <p className="text-brand-ivory/40 font-serif italic text-2xl">No creations found for this note.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};
