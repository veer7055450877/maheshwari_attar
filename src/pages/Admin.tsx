import { AnimatePresence, motion } from 'framer-motion';
import { Image as ImageIcon, Layers, LayoutDashboard, MessageSquare, Package, Plus, Search, Settings, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { addData, deleteData, getData, Media, Product, PRODUCTION, Testimonial, toggleProduction, updateData } from '../lib/data';
import Head from '../lib/head';

export const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isProd, setIsProd] = useState(PRODUCTION);

  // Data States
  const [products, setProducts] = useState<Product[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [media, setMedia] = useState<Media[]>([]);
  const [collections, setCollections] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

  // UI States
  const [searchQuery, setSearchQuery] = useState('');
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);

  const loadAllData = async () => {
    setProducts(await getData('products'));
    setTestimonials(await getData('testimonials'));
    setMedia(await getData('media'));
    setCollections(await getData('collections'));
    setOrders(await getData('orders'));
  };

  useEffect(() => {
    loadAllData();
  }, [isProd]);

  const handleToggleMode = () => {
    const newMode = !isProd;
    setIsProd(newMode);
    toggleProduction(newMode);
  };

  // --- PRODUCT HANDLERS ---
  const handleSaveProduct = async () => {
    if (editingProduct?.id) {
      await updateData('products', editingProduct.id, editingProduct);
    } else {
      await addData('products', { ...editingProduct, status: 'Active', category: 'Oud', notes: {top:[], heart:[], base:[]} });
    }
    setEditingProduct(null);
    loadAllData();
  };

  const handleDeleteProduct = async (id: number) => {
    if(confirm("Delete this product?")) {
      await deleteData('products', id);
      loadAllData();
    }
  };

  // --- MEDIA HANDLERS ---
  const handleAddMedia = async () => {
    const url = prompt("Enter Image URL:");
    if (url) {
      await addData('media', { name: "New Upload", url });
      loadAllData();
    }
  };

  const handleDeleteMedia = async (id: number) => {
    await deleteData('media', id);
    loadAllData();
  };

  // --- TESTIMONIAL HANDLERS ---
  const handleAddTestimonial = async () => {
    const name = prompt("Customer Name:");
    const message = prompt("Quote:");
    if (name && message) {
      await addData('testimonials', { name, message, role: "Verified Buyer", rating: 5, approved: true });
      loadAllData();
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'collections', label: 'Collections', icon: Layers },
    { id: 'media', label: 'Media Library', icon: ImageIcon },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#050505] text-brand-ivory flex font-sans selection:bg-brand-gold selection:text-black">
      <Head title="Admin — Maheshwari Attar" description="Admin dashboard" noIndex />

      {/* SIDEBAR */}
      <div className="w-72 border-r border-white/5 bg-[#0a0a0a] flex flex-col relative z-20">
        <div className="p-8">
          <h2 className="font-serif text-2xl text-brand-gold mb-1">MAHESHWARI</h2>
          <span className="text-[9px] text-brand-ivory/30 tracking-[0.3em] uppercase">Control Room</span>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id} onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-md transition-all duration-300 ${isActive ? 'bg-white/5 text-brand-gold' : 'text-brand-ivory/50 hover:bg-white/[0.02] hover:text-brand-ivory'}`}
              >
                <Icon size={18} strokeWidth={isActive ? 2 : 1.5} />
                <span className="text-sm font-light tracking-wide">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">

        {/* HEADER */}
        <header className="h-20 border-b border-white/5 px-10 flex items-center justify-between bg-[#0a0a0a]/50 backdrop-blur-md z-10">
          <h1 className="font-serif text-2xl text-brand-ivory capitalize">{activeTab}</h1>
          <div className="flex items-center gap-4 bg-white/5 px-4 py-2 rounded-full border border-white/5">
            <span className="text-[10px] uppercase tracking-widest text-brand-ivory/50">Data Source</span>
            <button onClick={handleToggleMode} className={`relative w-12 h-6 rounded-full transition-colors duration-500 ${isProd ? 'bg-brand-gold' : 'bg-white/10'}`}>
              <motion.div className="absolute top-1 left-1 w-4 h-4 bg-brand-black rounded-full" animate={{ x: isProd ? 24 : 0 }} />
            </button>
            <span className={`text-[10px] font-bold uppercase tracking-widest ${isProd ? 'text-brand-gold' : 'text-brand-ivory/30'}`}>
              {isProd ? 'MySQL (Prod)' : 'Mock JSON'}
            </span>
          </div>
        </header>

        {/* DYNAMIC CONTENT */}
        <main className="flex-1 overflow-y-auto p-10">
          <AnimatePresence mode="wait">

            {/* DASHBOARD */}
            {activeTab === 'dashboard' && (
              <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white/[0.02] border border-white/5 p-8 rounded-lg">
                    <span className="text-brand-gold text-[10px] uppercase tracking-widest block mb-4">Total Revenue</span>
                    <span className="font-serif text-5xl text-brand-ivory block mb-2">$14,250</span>
                    <span className="text-brand-ivory/30 text-xs font-light">Last 30 days</span>
                  </div>
                  <div className="bg-white/[0.02] border border-white/5 p-8 rounded-lg">
                    <span className="text-brand-gold text-[10px] uppercase tracking-widest block mb-4">Total Orders</span>
                    <span className="font-serif text-5xl text-brand-ivory block mb-2">{orders.length}</span>
                    <span className="text-brand-ivory/30 text-xs font-light">Active processing</span>
                  </div>
                  <div className="bg-white/[0.02] border border-white/5 p-8 rounded-lg">
                    <span className="text-brand-gold text-[10px] uppercase tracking-widest block mb-4">Catalog Size</span>
                    <span className="font-serif text-5xl text-brand-ivory block mb-2">{products.length}</span>
                    <span className="text-brand-ivory/30 text-xs font-light">Active products</span>
                  </div>
                </div>

                {/* Elegant CSS Bar Chart */}
                <div className="bg-white/[0.02] border border-white/5 p-8 rounded-lg">
                  <h3 className="text-brand-gold text-xs uppercase tracking-widest mb-8">Revenue Overview (Last 7 Days)</h3>
                  <div className="h-48 flex items-end gap-4 md:gap-8">
                    {[40, 70, 45, 90, 60, 100, 80].map((height, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                        <div className="w-full bg-white/5 rounded-t-sm relative h-full flex items-end">
                          <motion.div
                            initial={{ height: 0 }} animate={{ height: `${height}%` }} transition={{ duration: 1, delay: i * 0.1 }}
                            className="w-full bg-brand-gold/50 group-hover:bg-brand-gold transition-colors rounded-t-sm"
                          />
                        </div>
                        <span className="text-[10px] text-brand-ivory/40">Day {i+1}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* PRODUCTS */}
            {activeTab === 'products' && !editingProduct && (
              <motion.div key="products" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="flex justify-between items-center mb-8">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                    <input
                      type="text" placeholder="Search catalog..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-md py-2 pl-10 pr-4 text-sm font-light text-brand-ivory focus:border-brand-gold outline-none w-64"
                    />
                  </div>
                  <button onClick={() => setEditingProduct({ name: '', poeticDesc: '', image: '' })} className="flex items-center gap-2 bg-brand-gold text-brand-black px-6 py-2 rounded-md text-sm font-medium hover:bg-white transition-colors">
                    <Plus size={16} /> Add Creation
                  </button>
                </div>

                <div className="bg-white/[0.02] border border-white/5 rounded-lg overflow-hidden">
                  <table className="w-full text-left text-sm font-light">
                    <thead className="bg-white/5 text-brand-ivory/40 text-[10px] uppercase tracking-widest border-b border-white/5">
                      <tr>
                        <th className="p-6 font-normal">Visual</th>
                        <th className="p-6 font-normal">Identity</th>
                        <th className="p-6 font-normal">Category</th>
                        <th className="p-6 font-normal text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredProducts.map((product) => (
                        <tr key={product.id} className="hover:bg-white/[0.04] transition-colors group">
                          <td className="p-6">
                            <div className="w-12 h-16 rounded overflow-hidden border border-white/10">
                              <img src={product.image} alt={product.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                            </div>
                          </td>
                          <td className="p-6">
                            <span className="font-serif text-lg text-brand-ivory block">{product.name}</span>
                            <span className="text-brand-ivory/30 text-xs">{product.poeticDesc}</span>
                          </td>
                          <td className="p-6 text-brand-gold">{product.category}</td>
                          <td className="p-6 text-right space-x-4">
                            <button onClick={() => setEditingProduct(product)} className="text-brand-ivory/50 hover:text-brand-gold text-xs uppercase tracking-widest">Edit</button>
                            <button onClick={() => handleDeleteProduct(product.id)} className="text-red-400/50 hover:text-red-400 text-xs uppercase tracking-widest">Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* PRODUCT EDIT */}
            {activeTab === 'products' && editingProduct && (
              <motion.div key="edit-product" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
                  <button onClick={() => setEditingProduct(null)} className="text-brand-ivory/40 hover:text-brand-ivory text-xs uppercase tracking-widest">&larr; Back</button>
                  <button onClick={handleSaveProduct} className="bg-brand-gold text-brand-black px-8 py-2 rounded-md text-sm font-medium hover:bg-white transition-colors">Save Changes</button>
                </div>
                <div className="bg-white/[0.02] border border-white/5 p-8 rounded-lg space-y-6 max-w-2xl">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-brand-ivory/50 mb-2">Name</label>
                    <input type="text" value={editingProduct.name} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} className="w-full bg-transparent border-b border-white/20 py-2 text-brand-ivory outline-none focus:border-brand-gold font-serif text-xl" />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-brand-ivory/50 mb-2">Poetic Description</label>
                    <input type="text" value={editingProduct.poeticDesc} onChange={e => setEditingProduct({...editingProduct, poeticDesc: e.target.value})} className="w-full bg-transparent border-b border-white/20 py-2 text-brand-ivory outline-none focus:border-brand-gold font-serif italic" />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-brand-ivory/50 mb-2">Image URL</label>
                    <input type="text" value={editingProduct.image} onChange={e => setEditingProduct({...editingProduct, image: e.target.value})} className="w-full bg-transparent border-b border-white/20 py-2 text-brand-ivory outline-none focus:border-brand-gold text-sm font-mono" />
                  </div>
                </div>
              </motion.div>
            )}

            {/* COLLECTIONS */}
            {activeTab === 'collections' && (
              <motion.div key="collections" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {collections.map(col => (
                    <div key={col.id} className="bg-white/[0.02] border border-white/5 p-8 rounded-lg hover:border-brand-gold/30 transition-colors cursor-pointer">
                      <h3 className="font-serif text-2xl text-brand-ivory mb-2">{col.name}</h3>
                      <p className="text-brand-ivory/40 text-sm">{col.count} Products</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* MEDIA LIBRARY */}
            {activeTab === 'media' && (
              <motion.div key="media" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="flex justify-between mb-8">
                  <h2 className="font-serif text-2xl text-brand-ivory">Media Assets</h2>
                  <button onClick={handleAddMedia} className="bg-brand-gold text-brand-black px-6 py-2 rounded-md text-sm font-medium hover:bg-white transition-colors">Add Media</button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {media.map(m => (
                    <div key={m.id} className="relative group aspect-square rounded-lg overflow-hidden border border-white/10">
                      <img src={m.url} alt={m.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button onClick={() => handleDeleteMedia(m.id)} className="text-red-400 bg-white/10 p-2 rounded-full hover:bg-red-400 hover:text-white"><Trash2 size={16} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* TESTIMONIALS */}
            {activeTab === 'testimonials' && (
              <motion.div key="testimonials" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="flex justify-between mb-8">
                  <h2 className="font-serif text-2xl text-brand-ivory">Client Voices</h2>
                  <button onClick={handleAddTestimonial} className="bg-brand-gold text-brand-black px-6 py-2 rounded-md text-sm font-medium hover:bg-white transition-colors">Add Testimonial</button>
                </div>
                <div className="space-y-4">
                  {testimonials.map(t => (
                    <div key={t.id} className="bg-white/[0.02] border border-white/5 p-6 rounded-lg flex justify-between items-center">
                      <div>
                        <p className="font-serif text-brand-ivory text-lg italic mb-2">"{t.message}"</p>
                        <p className="text-brand-gold text-xs uppercase tracking-widest">{t.name} - {t.role}</p>
                      </div>
                      <button onClick={async () => { await deleteData('testimonials', t.id); loadAllData(); }} className="text-red-400/50 hover:text-red-400"><Trash2 size={16} /></button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* SETTINGS */}
            {activeTab === 'settings' && (
              <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-2xl">
                <div className="bg-white/[0.02] border border-white/5 p-8 rounded-lg space-y-8">
                  <h2 className="font-serif text-2xl text-brand-ivory border-b border-white/5 pb-4">Brand Settings</h2>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-brand-ivory/50 mb-2">Brand Name</label>
                    <input type="text" defaultValue="Maheshwari Attar" className="w-full bg-transparent border-b border-white/20 py-2 text-brand-ivory outline-none focus:border-brand-gold" />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-brand-ivory/50 mb-2">WhatsApp Number (For Concierge)</label>
                    <input type="text" defaultValue="+91 987 654 3210" className="w-full bg-transparent border-b border-white/20 py-2 text-brand-ivory outline-none focus:border-brand-gold font-mono" />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-brand-ivory/50 mb-2">Contact Email</label>
                    <input type="email" defaultValue="concierge@maheshwari.com" className="w-full bg-transparent border-b border-white/20 py-2 text-brand-ivory outline-none focus:border-brand-gold" />
                  </div>
                  <button className="bg-brand-gold text-brand-black px-8 py-2 rounded-md text-sm font-medium hover:bg-white transition-colors">Save Settings</button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};
