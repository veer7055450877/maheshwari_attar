import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// 60+ Predefined Luxury Fragrance Questions
const PREDEFINED_QA = [
  // Basics & Origins
  { q: "What is the difference between Attar and Perfume?", a: "Attars are pure, alcohol-free botanical distillations aged in sandalwood oil. They offer a more intimate, natural, and long-lasting experience compared to synthetic perfumes." },
  { q: "What does 'Attar' mean?", a: "The word 'Attar' or 'Ittar' is derived from the Persian word 'Itr', meaning 'fragrance' or 'divine sweet smell'." },
  { q: "Where do your attars originate?", a: "Our attars are crafted in Kannauj, India, the historical perfume capital of the world, using centuries-old 'Deg Bhapka' distillation methods." },
  { q: "Are your attars alcohol-free?", a: "Yes, all Maheshwari Attars are 100% alcohol-free, making them pure, skin-safe, and spiritually compliant for prayer." },
  { q: "Are attars vegan and cruelty-free?", a: "Absolutely. We use ethical, plant-based ingredients. Our musks are botanical or ethically derived without harming any animals." },
  
  // Application & Usage
  { q: "How should I properly apply Attar?", a: "Apply a single drop to your pulse points—the inside of your wrists, behind the earlobes, or the nape of your neck. Do not rub; let your body heat awaken the essence." },
  { q: "Can I wear attar on my clothing?", a: "Yes, but apply carefully. Rub a drop between your palms and lightly brush over dark fabrics. Avoid direct application on light silks to prevent oil stains." },
  { q: "Can I use attar in my hair?", a: "Yes, a tiny drop rubbed between your palms and gently swept through the ends of your hair leaves a beautiful, lingering scent trail." },
  { q: "How much attar should I use?", a: "Attars are highly concentrated. A single drop or a gentle swipe of the glass applicator is entirely sufficient for a full day's wear." },
  { q: "Can I layer different attars?", a: "Yes. Layering is a royal tradition. We recommend applying a strong base like Oud first, followed by a softer floral like Rose on top." },
  
  // Longevity & Storage
  { q: "Which fragrance lasts the longest?", a: "Oud and Amber-based attars possess the highest longevity, often lingering on the skin for over 24 hours and on fabric for days." },
  { q: "Do attars expire?", a: "True artisanal attars do not expire. They mature and grow richer with age, much like fine wine." },
  { q: "How should I store my attar?", a: "Store your crystal bottles in a cool, dark place, away from direct sunlight and extreme temperatures. The velvet-lined box is ideal." },
  { q: "Why does my attar smell different in winter?", a: "Attars react to body heat. In winter, the scent stays closer to the skin and feels warmer, while in summer, the heat projects the scent further." },
  { q: "Does the color of the attar change over time?", a: "Yes, natural aging can darken the oil. This is a sign of purity and maturation, enhancing the depth of the fragrance." },

  // Oud (Agarwood)
  { q: "What exactly is Oud?", a: "Oud is a dark, fragrant resin produced by the rare Aquilaria tree. It is one of the most expensive and sought-after fragrance ingredients in the world." },
  { q: "What does Oud smell like?", a: "Oud is complex. It is deep, woody, slightly sweet, smoky, and sometimes animalic. It is the scent of ancient royalty." },
  { q: "Why is Oud so expensive?", a: "Only a small percentage of Aquilaria trees produce the resin, and the extraction process is incredibly labor-intensive, making it rarer than gold." },
  { q: "Is Oud suitable for beginners?", a: "Pure Oud can be intense. For beginners, we recommend our Oud blended with Rose or Amber for a softer, more approachable introduction." },
  { q: "What is the difference between Hindi Oud and Cambodi Oud?", a: "Hindi (Indian) Oud is typically bolder, earthier, and more animalic, while Cambodi Oud tends to be sweeter and fruitier." },

  // Rose & Florals
  { q: "What makes your Rose Attar special?", a: "Our Damascus Rose attar requires thousands of hand-picked petals distilled at dawn to produce just a single drop of pure essence." },
  { q: "Is Rose attar only for women?", a: "Not at all. In royal traditions, Rose is a symbol of strength and elegance, worn proudly by kings and nobles." },
  { q: "What is Ruh Khus?", a: "Ruh Khus is the pure essence of Vetiver. It is an earthy, green, and incredibly cooling scent, perfect for hot summer days." },
  { q: "What does Jasmine (Mogra) signify?", a: "Jasmine is the scent of romance and the night. It is deeply floral, intoxicating, and historically used in royal bridal ceremonies." },
  { q: "Do you use synthetic floral notes?", a: "Never. Every floral note in our collection is extracted directly from nature." },

  // Musk & Amber
  { q: "What is botanical Musk?", a: "Botanical musk is derived from plants like ambrette seeds, offering the sensual, warm, skin-like scent of traditional musk without animal cruelty." },
  { q: "What does Amber smell like?", a: "Amber is a warm, golden, sweet, and slightly powdery scent made from a blend of resins like labdanum, benzoin, and vanilla." },
  { q: "Is Musk suitable for day wear?", a: "Yes, our White Musk is clean, soft, and perfect for daytime, while our darker musks are better suited for the evening." },
  { q: "What is the difference between Amber and Ambergris?", a: "Amber is a sweet resinous blend, whereas Ambergris is a rare oceanic element with a salty, musky, and earthy profile." },
  { q: "Does Amber attar have a warming effect?", a: "Yes, Amber is traditionally known as a 'warm' scent, making it incredibly comforting during cold winter months." },

  // Occasions & Recommendations
  { q: "Which attar is best for a wedding?", a: "For weddings, we recommend Royal Oud for the groom and Damascus Rose or Jasmine for the bride, symbolizing majesty and romance." },
  { q: "What is the best attar for the office?", a: "White Musk or a light Sandalwood attar is perfect for professional settings—clean, elegant, and not overpowering." },
  { q: "Which attar should I wear in the summer?", a: "Ruh Khus (Vetiver) or Majmua are excellent for summer. They have a natural cooling effect on the body and mind." },
  { q: "Which attar is best for winter?", a: "Warm, heavy scents like Amber, Oud, and Saffron are perfect for winter, providing a comforting, enveloping aura." },
  { q: "What is the best attar for meditation or prayer?", a: "Sandalwood and pure Frankincense are deeply spiritual scents that calm the mind and enhance focus during meditation." },

  // Craftsmanship & Process
  { q: "What is the 'Deg Bhapka' method?", a: "It is a 5,000-year-old hydro-distillation method using copper pots (Deg) and bamboo pipes to gently extract oils into a sandalwood base." },
  { q: "Why do you use a Sandalwood base?", a: "Sandalwood oil acts as a natural fixative. It absorbs the floral or woody essences perfectly and helps the fragrance last longer on the skin." },
  { q: "How long does it take to make one bottle?", a: "The distillation process takes weeks, but the aging process can take months or even years before the attar is ready for our clients." },
  { q: "Who crafts your attars?", a: "Our attars are crafted by master artisans whose families have been perfecting the art of perfumery in Kannauj for generations." },
  { q: "Are your bottles handmade?", a: "Yes, our crystal flacons are individually crafted to ensure they are as beautiful and unique as the essence they hold." },

  // Gifting & Services
  { q: "Do you offer custom fragrance blending?", a: "Yes, we offer bespoke blending services for our distinguished clients. Please contact us via WhatsApp to arrange a private consultation." },
  { q: "Can I gift an attar?", a: "Attar is considered one of the highest forms of gifting in royal culture. We provide luxurious velvet packaging perfect for special occasions." },
  { q: "Do you offer sample sets?", a: "Yes, we offer a 'Discovery Set' featuring our signature blends so you can experience the spectrum of our craftsmanship." },
  { q: "Can I engrave the bottle?", a: "We offer personalized gold engraving on our premium crystal bottles for weddings and corporate gifting." },
  { q: "Do you ship internationally?", a: "Yes, we ship our luxury attars worldwide using secure, climate-controlled logistics." },

  // Mystique & Culture
  { q: "Why is attar considered a royal tradition?", a: "Historically, attars were commissioned exclusively by Mughal emperors and Indian royalty as a symbol of wealth, purity, and divine connection." },
  { q: "What is the 'Scent of Rain' (Mitti Attar)?", a: "Mitti Attar captures the exact scent of the first rain hitting dry earth (petrichor). It is distilled from baked clay and is profoundly nostalgic." },
  { q: "Can attar affect my mood?", a: "Yes, natural essential oils have aromatherapeutic properties. Rose uplifts, Oud grounds and empowers, and Sandalwood calms." },
  { q: "What is 'Shamama'?", a: "Shamama is a complex, secret blend of over 40 herbs, spices, and woods. It is a deeply traditional, warm, and spicy winter fragrance." },
  { q: "Why does attar smell different on everyone?", a: "Because attars are 100% natural, they interact directly with your skin's unique pH, diet, and temperature, creating a truly bespoke scent." },

  // Troubleshooting
  { q: "My attar has thickened, is it ruined?", a: "Not at all. Pure oils, especially Oud and Sandalwood, can thicken in cold weather. Simply warm the bottle gently in your hands." },
  { q: "The scent is too strong, what should I do?", a: "Attars are concentrated. If it feels too strong, apply less—just a micro-drop—or apply it to your wrists rather than near your neck." },
  { q: "I can't smell my attar after a few hours, why?", a: "This is called 'olfactory fatigue'. Your nose gets used to the scent, but others around you can still smell it clearly." },
  { q: "How do I remove attar from clothing?", a: "If accidentally spilled, treat the spot immediately with a gentle dish soap or talcum powder to absorb the oil before washing." },
  { q: "Can I mix attar with unscented lotion?", a: "Yes, mixing a drop of attar into a pure, unscented body lotion is a wonderful way to create a subtle, all-over body fragrance." },

  // Final Curiosities
  { q: "What is the rarest attar you offer?", a: "Our Aged Assam Oud, matured for over 30 years, is our most exclusive and rare offering, available only in limited quantities." },
  { q: "Do you use real gold in your packaging?", a: "Yes, the accents on our signature collection bottles feature 24k gold leaf detailing." },
  { q: "Can I visit your perfumery?", a: "We welcome distinguished guests to our showroom in Kannauj by private appointment to witness the ancient art of distillation." },
  { q: "What does Saffron attar smell like?", a: "Saffron (Zafran) is leathery, spicy, slightly sweet, and incredibly luxurious. It is often called 'red gold'." },
  { q: "How do I know if an attar is pure?", a: "Pure attar feels smooth, not greasy, absorbs well into the skin, and has a scent profile that evolves over hours, unlike linear synthetic perfumes." }
];

const COMPANY_WHATSAPP = "919876543210";

export const Concierge = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Welcome to Maheshwari Attar. I am your personal fragrance concierge. Please explore our encyclopedia of essence below, or type a custom inquiry to connect with our master perfumers via WhatsApp." }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handlePredefinedQuestion = (qa: {q: string, a: string}) => {
    setMessages(prev => [...prev, { role: 'user', content: qa.q }]);
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { role: 'assistant', content: qa.a }]);
    }, 1500);
  };

  const handleCustomSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      const waUrl = `https://wa.me/${COMPANY_WHATSAPP}?text=${encodeURIComponent(userMsg)}`;
      window.open(waUrl, '_blank');
      setMessages(prev => [...prev, { role: 'assistant', content: "I have prepared your message. You are now being redirected to our private WhatsApp consultation line." }]);
    }, 1500);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: isOpen ? 0 : 1, scale: isOpen ? 0.8 : 1 }}
        transition={{ duration: 0.8 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 group flex items-center gap-3 pointer-events-auto"
        style={{ pointerEvents: isOpen ? 'none' : 'auto' }}
      >
        <span className="hidden md:block text-[10px] uppercase tracking-[0.2em] text-brand-ivory opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
          Consultation
        </span>
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-brand-gold/40 bg-brand-black/95 backdrop-blur-xl flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-brand-black transition-all duration-500 shadow-[0_0_30px_rgba(200,163,73,0.15)]">
          <span className="font-serif text-2xl md:text-3xl italic">M</span>
        </div>
      </motion.button>

      {/* Chat Panel - Fullscreen on Mobile/Tablet, Floating on Desktop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 w-full h-full md:inset-auto md:bottom-8 md:right-8 md:w-[420px] md:h-[750px] md:max-h-[85vh] z-50 bg-[#080808]/95 backdrop-blur-2xl md:border border-white/10 md:rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-gradient-to-b from-white/[0.06] to-transparent">
              <div>
                <h3 className="font-serif text-2xl text-brand-gold">The Concierge</h3>
                <span className="text-[10px] uppercase tracking-[0.2em] text-brand-ivory/50">Master Perfumer's Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-brand-ivory/50 hover:text-brand-gold transition-colors p-2 rounded-full hover:bg-white/5">
                <X size={24} strokeWidth={1} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
              {messages.map((msg, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={i} 
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className={`max-w-[85%] p-4 rounded-2xl shadow-lg ${msg.role === 'user' ? 'bg-brand-gold/15 text-brand-ivory/90 font-sans text-sm font-light rounded-br-none border border-brand-gold/20' : 'bg-white/5 text-brand-ivory font-serif text-base leading-relaxed rounded-bl-none border border-white/5'}`}>
                    {msg.content}
                  </div>
                  <span className="text-[9px] uppercase tracking-widest text-brand-ivory/30 mt-2 px-2">
                    {msg.role === 'user' ? 'You' : 'Concierge'}
                  </span>
                </motion.div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-start">
                  <div className="bg-white/5 border border-white/5 p-4 rounded-2xl rounded-bl-none flex gap-2 items-center h-[52px] shadow-lg">
                    <span className="w-1.5 h-1.5 bg-brand-gold/60 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-brand-gold/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <span className="w-1.5 h-1.5 bg-brand-gold/60 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                  <span className="text-[9px] uppercase tracking-widest text-brand-ivory/30 mt-2 px-2">Concierge is writing...</span>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Predefined Questions (Scrollable Encyclopedia) */}
            <div className="px-6 pb-4 space-y-3 relative">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] uppercase tracking-[0.2em] text-brand-gold/80 font-semibold">Encyclopedia of Essence</p>
                <span className="text-[9px] text-brand-ivory/30">{PREDEFINED_QA.length} Topics</span>
              </div>
              
              {/* Fade Overlay for scroll indication */}
              <div className="absolute bottom-4 left-6 right-6 h-8 bg-gradient-to-t from-[#080808] to-transparent pointer-events-none z-10" />
              
              <div className="flex flex-col gap-2 max-h-[180px] overflow-y-auto scrollbar-hide pb-6">
                {PREDEFINED_QA.map((qa, i) => (
                  <button
                    key={i}
                    onClick={() => handlePredefinedQuestion(qa)}
                    disabled={isTyping}
                    className="text-left text-sm font-light text-brand-ivory/80 bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-brand-gold/30 rounded-xl p-3.5 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed group"
                  >
                    <span className="group-hover:text-brand-gold transition-colors">{qa.q}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Input Area */}
            <div className="p-4 md:p-6 border-t border-white/5 bg-[#050505]">
              <form onSubmit={handleCustomSend} className="flex items-center gap-4 bg-white/[0.03] rounded-full px-5 py-2.5 border border-white/10 focus-within:border-brand-gold/50 focus-within:bg-white/[0.05] transition-all duration-300 shadow-inner">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isTyping}
                  placeholder="Inquire directly with a perfumer..."
                  className="flex-1 bg-transparent py-2 text-brand-ivory text-sm font-light outline-none placeholder:text-brand-ivory/30 disabled:opacity-50"
                />
                <button type="submit" disabled={!input.trim() || isTyping} className="text-brand-gold disabled:opacity-30 flex items-center gap-2 transition-opacity hover:scale-110 duration-300">
                  <MessageCircle size={20} />
                </button>
              </form>
              <p className="text-center text-[9px] text-brand-ivory/40 mt-4 uppercase tracking-[0.2em]">
                Custom inquiries redirect to secure WhatsApp
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
