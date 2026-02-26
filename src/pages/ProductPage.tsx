import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getData, addData, Product, PRODUCTION } from '../lib/data';
import { Loader } from '../components/ui/Loader';
import { ProductionModal } from '../components/ui/ProductionModal';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getData('products') as Product[];
      const found = data.find(p => p.id === Number(id));
      if (found) setProduct(found);
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addData('orders', {
      customerName: formData.name,
      email: formData.email,
      productName: product?.name,
      amount: product?.price ? parseInt(product.price.replace('$', '')) : 0,
      status: 'Pending',
      message: formData.message
    });
    
    setOrderSuccess(true);
    if (!PRODUCTION) {
      setShowModal(true);
    }
  };

  if (loading) return <Loader onComplete={() => {}} />;
  if (!product) return <div className="min-h-screen bg-brand-black text-brand-ivory flex items-center justify-center">Essence not found.</div>;

  return (
    <div className="bg-brand-black min-h-screen flex flex-col md:flex-row selection:bg-brand-gold selection:text-black">
      <ProductionModal isOpen={showModal} onClose={() => setShowModal(false)} />

      {/* Left Column: Sticky Product Image */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-screen sticky top-0 z-10 overflow-hidden bg-[#050505]">
        <motion.img 
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.8 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover mix-blend-luminosity"
        />
        {/* Gradient overlays for smooth blending */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-brand-black/90" />
        
        <button 
          onClick={() => navigate('/collection')}
          className="absolute top-8 left-6 md:top-12 md:left-12 z-40 text-brand-ivory/70 hover:text-brand-gold flex items-center gap-2 transition-colors uppercase tracking-widest text-[10px] bg-black/20 px-4 py-2 rounded-full backdrop-blur-md border border-white/10"
        >
          <ArrowLeft size={14} /> Back to Gallery
        </button>
      </div>

      {/* Right Column: Product Details & Order */}
      <div className="w-full md:w-1/2 min-h-screen bg-brand-black z-20 px-8 py-16 md:px-20 md:py-24 flex flex-col justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="max-w-xl"
        >
          {/* Header Info */}
          <div className="mb-10">
            <span className="text-brand-gold uppercase tracking-[0.4em] text-[10px] block mb-4">
              {product.category} Collection
            </span>
            <h1 className="font-serif text-5xl md:text-7xl text-brand-ivory mb-4 leading-tight">
              {product.name}
            </h1>
            <p className="font-serif italic text-xl md:text-2xl text-brand-ivory/60">
              "{product.poeticDesc}"
            </p>
          </div>

          {/* Description & Meta */}
          <div className="mb-12">
            <p className="text-brand-ivory/70 font-light leading-relaxed mb-8">
              {product.description}
            </p>
            <div className="flex gap-8 text-[10px] uppercase tracking-widest text-brand-ivory/40 border-y border-white/10 py-4">
              <span>Intensity: <span className="text-brand-gold">{product.intensity}</span></span>
              <span>Occasion: <span className="text-brand-gold">{product.occasion}</span></span>
              {product.price && <span>Value: <span className="text-brand-gold">{product.price}</span></span>}
            </div>
          </div>

          {/* Fragrance Architecture */}
          <div className="mb-16">
            <h3 className="font-serif text-2xl text-brand-ivory mb-6">Fragrance Architecture</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <span className="text-brand-gold text-[10px] uppercase tracking-widest block mb-2">Top Notes</span>
                <span className="text-brand-ivory/80 text-sm font-light">{product.notes.top.join(', ')}</span>
              </div>
              <div>
                <span className="text-brand-gold text-[10px] uppercase tracking-widest block mb-2">Heart Notes</span>
                <span className="text-brand-ivory/80 text-sm font-light">{product.notes.heart.join(', ')}</span>
              </div>
              <div>
                <span className="text-brand-gold text-[10px] uppercase tracking-widest block mb-2">Base Notes</span>
                <span className="text-brand-ivory/80 text-sm font-light">{product.notes.base.join(', ')}</span>
              </div>
            </div>
          </div>

          {/* Order Section */}
          <div className="bg-white/[0.02] border border-white/10 p-8">
            <AnimatePresence mode="wait">
              {!showOrderForm && !orderSuccess ? (
                <motion.div
                  key="button"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-center"
                >
                  <p className="text-brand-ivory/50 text-sm font-light mb-6">
                    Acquire this essence directly from our master perfumers.
                  </p>
                  <button 
                    onClick={() => setShowOrderForm(true)}
                    className="w-full py-4 bg-brand-gold text-brand-black uppercase tracking-[0.2em] text-xs font-semibold hover:bg-brand-ivory transition-colors"
                  >
                    Request to Order
                  </button>
                </motion.div>
              ) : !orderSuccess ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  onSubmit={handleOrderSubmit}
                  className="space-y-6"
                >
                  <h4 className="font-serif text-xl text-brand-ivory mb-4">Order Details</h4>
                  <div>
                    <label className="block text-brand-gold text-[10px] uppercase tracking-widest mb-2">Full Name</label>
                    <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-transparent border-b border-white/20 py-2 text-brand-ivory text-sm outline-none focus:border-brand-gold transition-colors" />
                  </div>
                  <div>
                    <label className="block text-brand-gold text-[10px] uppercase tracking-widest mb-2">Email Address</label>
                    <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-transparent border-b border-white/20 py-2 text-brand-ivory text-sm outline-none focus:border-brand-gold transition-colors" />
                  </div>
                  <div>
                    <label className="block text-brand-gold text-[10px] uppercase tracking-widest mb-2">Shipping Notes / Inquiries</label>
                    <textarea rows={2} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-transparent border-b border-white/20 py-2 text-brand-ivory text-sm outline-none focus:border-brand-gold resize-none transition-colors"></textarea>
                  </div>
                  <div className="pt-2 flex gap-4">
                    <button type="button" onClick={() => setShowOrderForm(false)} className="flex-1 py-3 border border-white/10 text-brand-ivory uppercase tracking-widest text-[10px] hover:bg-white/5 transition-colors">Cancel</button>
                    <button type="submit" className="flex-1 py-3 bg-brand-gold text-brand-black uppercase tracking-widest text-[10px] font-semibold hover:bg-brand-ivory transition-colors">Confirm Order</button>
                  </div>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6"
                >
                  <CheckCircle2 className="w-12 h-12 text-brand-gold mx-auto mb-4" strokeWidth={1.5} />
                  <h4 className="font-serif text-2xl text-brand-ivory mb-2">Order Requested</h4>
                  <p className="text-brand-ivory/50 font-light text-sm">
                    Our concierge will contact you shortly to finalize the acquisition of {product.name}.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </motion.div>
      </div>
    </div>
  );
};
