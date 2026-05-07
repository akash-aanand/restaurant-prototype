
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu as MenuIcon, Phone, MapPin, ArrowRight, Instagram, Facebook, Twitter } from 'lucide-react';
import { CustomCursor } from './components/CustomCursor.tsx';
import { FloatingDecorations } from './components/FloatingDecorations.tsx';
import { FoodCard } from './components/FoodCard.tsx';
import { AboutSection } from './components/AboutSection.tsx';
import { Gallery } from './components/Gallery.tsx';
import { ReservationForm } from './components/ReservationForm.tsx';
import { CartOverlay } from './components/CartOverlay.tsx';
import { FoodItem, CartItem } from './types.ts';
import { fetchMenu, fetchCategories } from './src/services/api.ts';

const App: React.FC = () => {
  const [menuItems, setMenuItems] = useState<FoodItem[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [cats, menu] = await Promise.all([
          fetchCategories(),
          fetchMenu()
        ]);
        setCategories(cats);
        setMenuItems(menu.items);
      } catch (err) {
        console.error('Failed to load data:', err);
      } finally {
        setLoading(false);
      }
    };
    loadInitialData();
  }, []);

  useEffect(() => {
    const loadMenu = async () => {
      try {
        const data = await fetchMenu(selectedCategory || undefined);
        setMenuItems(data.items);
      } catch (err) {
        console.error('Failed to filter menu:', err);
      }
    };
    if (!loading) loadMenu();
  }, [selectedCategory]);

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const addToCart = (item: FoodItem) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(i => {
      if (i.id === id) {
        const newQty = Math.max(1, i.quantity + delta);
        return { ...i, quantity: newQty };
      }
      return i;
    }));
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  const cartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="relative min-h-screen">
      <CustomCursor />
      <FloatingDecorations />
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 md:px-12 md:py-8 flex justify-between items-center bg-white/5 backdrop-blur-xl border-b border-black/5">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex flex-col"
        >
          <span className="text-2xl font-black tracking-tighter uppercase italic leading-none">Taste</span>
          <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-orange-500">Fine Dining</span>
        </motion.div>
        
        <div className="hidden md:flex items-center gap-12 font-bold text-sm uppercase tracking-widest text-gray-500">
          {['Menu', 'About', 'Gallery', 'Reserve'].map((item) => (
            <motion.a 
              key={item}
              href={`#${item.toLowerCase()}`}
              whileHover={{ color: '#000', scale: 1.05 }}
              className="cursor-pointer transition-colors"
            >
              {item}
            </motion.a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-3 bg-black text-white rounded-2xl shadow-xl hover:bg-orange-500 transition-colors"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center ring-4 ring-white">
                {cartCount}
              </span>
            )}
          </button>
          <button className="md:hidden p-3 bg-white rounded-2xl shadow-md">
            <MenuIcon size={20} />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden px-6">
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="text-center max-w-4xl z-10"
        >
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-2 bg-white/30 backdrop-blur-md rounded-full border border-white/50 mb-8"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600">Michelin Star Experience</span>
          </motion.div>
          
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-6xl md:text-[120px] font-black tracking-tighter leading-[0.9] mb-8"
          >
            Savor the Art of <br/> <span className="text-orange-500 italic">Fine Dining</span>
          </motion.h1>

          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-gray-500 text-lg md:text-2xl font-medium max-w-2xl mx-auto mb-12"
          >
            A symphony of flavors crafted with seasonal ingredients and culinary precision.
          </motion.p>

          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6"
          >
            <a href="#menu" className="w-full md:w-auto px-12 py-6 bg-black text-white rounded-[24px] font-black text-lg flex items-center justify-center gap-3 shadow-2xl hover:bg-orange-600 transition-all hover:scale-105">
              Explore Menu <ArrowRight size={20} />
            </a>
            <a href="#reserve" className="w-full md:w-auto px-12 py-6 bg-white border-2 border-black/5 text-black rounded-[24px] font-black text-lg flex items-center justify-center gap-3 shadow-xl hover:bg-gray-50 transition-all">
              Book Table
            </a>
          </motion.div>
        </motion.div>

        {/* Hero 3D Images */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0, rotate: -15 }}
          animate={{ scale: 1, opacity: 0.2, rotate: 15 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute -right-40 -top-20 w-[600px] h-[600px] pointer-events-none hidden lg:block"
        >
          <img src="https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80" className="w-full h-full object-contain rounded-full blur-2xl" />
        </motion.div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <p className="uppercase tracking-[0.4em] text-orange-500 font-bold text-sm mb-4">Chef's Selection</p>
            <h2 className="text-4xl md:text-6xl font-black">Our Signature Menu</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar max-w-full">
            <button 
              onClick={() => setSelectedCategory(null)}
              className={`px-6 py-3 rounded-2xl font-bold text-sm tracking-widest uppercase transition-all flex-shrink-0 ${!selectedCategory ? 'bg-black text-white' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button 
                key={cat._id} 
                onClick={() => setSelectedCategory(cat._id)}
                className={`px-6 py-3 rounded-2xl font-bold text-sm tracking-widest uppercase transition-all flex-shrink-0 ${selectedCategory === cat._id ? 'bg-black text-white' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {menuItems.map((item, idx) => (
            <motion.div
              key={item.id || (item as any)._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <FoodCard item={item} onAddToCart={addToCart} />
            </motion.div>
          ))}
          {menuItems.length === 0 && !loading && (
            <div className="col-span-full py-20 text-center text-gray-400 font-bold uppercase tracking-widest">
              No items found in this selection.
            </div>
          )}
        </div>
      </section>

      <AboutSection />
      <Gallery />
      <ReservationForm />

      {/* Footer */}
      <footer className="bg-black text-white py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="space-y-8">
            <div className="flex flex-col">
              <span className="text-3xl font-black tracking-tighter uppercase italic leading-none">Taste</span>
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-orange-500">Fine Dining</span>
            </div>
            <p className="text-gray-400 font-medium leading-relaxed">
              Elevating the culinary experience through innovation, tradition, and passion for exceptional taste.
            </p>
            <div className="flex gap-6">
              <Instagram className="text-gray-500 hover:text-white cursor-pointer transition-colors" />
              <Facebook className="text-gray-500 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="text-gray-500 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          <div>
            <h4 className="font-black text-lg mb-8 uppercase tracking-widest">Opening Hours</h4>
            <ul className="space-y-4 text-gray-400 font-bold text-sm">
              <li className="flex justify-between"><span>Mon - Thu</span> <span>17:00 - 22:00</span></li>
              <li className="flex justify-between"><span>Fri - Sat</span> <span>17:00 - 23:30</span></li>
              <li className="flex justify-between"><span>Sunday</span> <span>12:00 - 21:00</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-lg mb-8 uppercase tracking-widest">Contact</h4>
            <ul className="space-y-4 text-gray-400 font-bold text-sm">
              <li className="flex items-center gap-3"><Phone size={16} /> +1 (555) 012-3456</li>
              <li className="flex items-center gap-3"><MapPin size={16} /> 123 Gourmet Ave, NY</li>
              <li className="flex items-center gap-3 underline">hello@taste.luxury</li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-lg mb-8 uppercase tracking-widest">Newsletter</h4>
            <p className="text-gray-400 font-medium mb-6 text-sm">Join our mailing list for exclusive events and seasonal menu updates.</p>
            <div className="relative">
              <input type="text" placeholder="Your Email" className="w-full bg-white/10 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-orange-500 outline-none text-white text-sm" />
              <button className="absolute right-2 top-2 bottom-2 bg-orange-500 text-white px-4 rounded-xl font-bold text-xs hover:bg-orange-600 transition-colors">Join</button>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-24 mt-24 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-bold text-gray-600 uppercase tracking-widest">
          <p>© 2024 Taste Restaurant Group. All rights reserved.</p>
          <div className="flex gap-12">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Accessibility</span>
          </div>
        </div>
      </footer>

      <CartOverlay 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeItem}
      />
    </div>
  );
};

export default App;
