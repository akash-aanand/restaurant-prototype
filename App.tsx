
import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Menu, ArrowRight, Phone, Mail, MapPin, Apple, Play, X, ChevronRight, Instagram, Twitter, Facebook } from 'lucide-react';
import { CustomCursor } from './components/CustomCursor';
import { FloatingDecorations } from './components/FloatingDecorations';
import { FoodCard } from './components/FoodCard';
import { Gallery } from './components/Gallery';
import { AboutSection } from './components/AboutSection';
import { ReservationForm } from './components/ReservationForm';
import { CartOverlay } from './components/CartOverlay';
import { CATEGORIES, FOOD_ITEMS, NAV_LINKS } from './constants';
import { FoodItem, CartItem } from './types';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState('home');
  const [activeCategory, setActiveCategory] = useState('all');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleAddToCart = (item: FoodItem) => {
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
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return FOOD_ITEMS;
    return FOOD_ITEMS.filter(item => item.category === activeCategory);
  }, [activeCategory]);

  const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as any }
  };

  const handleNavigate = (href: string) => {
    const page = href.replace('#', '');
    setActivePage(page);
    setIsMobileMenuOpen(false);
  };

  const menuContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: 50, rotate: 5 },
    visible: { 
      opacity: 1, 
      x: 0, 
      rotate: 0,
      transition: { type: 'spring' as const, damping: 20, stiffness: 100 }
    },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
  };

  return (
    <div className="min-h-screen relative text-gray-900 overflow-x-hidden bg-[#f8f4f1] scroll-smooth">
      <CustomCursor />
      <FloatingDecorations />
      
      <CartOverlay 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[60] flex justify-between items-center px-6 md:px-12 py-6 bg-white/10 backdrop-blur-md border-b border-white/20">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col cursor-pointer"
          onClick={() => setActivePage('home')}
        >
          <span className="text-2xl font-black tracking-tighter">Taste</span>
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">Restaurant & BBQ</span>
        </motion.div>
        
        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <button 
              key={link.label} 
              onClick={() => handleNavigate(link.href)}
              className={`font-bold text-xs uppercase tracking-[0.2em] transition-all hover:text-orange-500 ${
                activePage === link.href.replace('#', '') ? 'text-orange-600' : 'text-gray-600'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsCartOpen(true)}
            className="relative p-3 bg-black text-white rounded-2xl shadow-xl hover:bg-orange-500 transition-colors"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                key={cartCount}
                className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white"
              >
                {cartCount}
              </motion.span>
            )}
          </motion.button>
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-3 bg-white/80 backdrop-blur-md rounded-2xl border border-white/50 hover:bg-white transition-colors"
          >
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {/* Enhanced Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-3xl z-[100] flex flex-col overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/10 blur-[150px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
            
            <div className="relative z-10 p-8 h-full flex flex-col">
              <div className="flex justify-between items-center mb-16">
                <div className="flex flex-col text-white">
                  <span className="text-2xl font-black tracking-tighter">Taste</span>
                  <span className="text-[8px] uppercase tracking-[0.2em] font-bold text-gray-500">Premium Dining</span>
                </div>
                <motion.button 
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-4 text-white bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                >
                  <X size={28} />
                </motion.button>
              </div>

              <motion.div 
                variants={menuContainerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col gap-6"
              >
                {NAV_LINKS.map(link => (
                  <motion.button 
                    key={link.label} 
                    variants={menuItemVariants}
                    onClick={() => handleNavigate(link.href)}
                    className="text-left group relative"
                  >
                    <span className={`text-5xl font-black uppercase tracking-tighter transition-colors block ${
                      activePage === link.href.replace('#', '') ? 'text-orange-500' : 'text-white'
                    }`}>
                      {link.label}
                    </span>
                    <motion.div 
                      className="h-1 bg-orange-500 absolute -bottom-1 left-0 rounded-full"
                      initial={{ width: 0 }}
                      whileHover={{ width: '100%' }}
                    />
                  </motion.button>
                ))}
              </motion.div>

              <div className="mt-auto pt-10 border-t border-white/10">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="flex gap-6 text-white"
                >
                  <Instagram className="hover:text-orange-500 transition-colors cursor-pointer" size={24} />
                  <Twitter className="hover:text-orange-500 transition-colors cursor-pointer" size={24} />
                  <Facebook className="hover:text-orange-500 transition-colors cursor-pointer" size={24} />
                </motion.div>
                <p className="mt-8 text-gray-600 text-[10px] uppercase font-bold tracking-widest">© 2024 TASTE RESTAURANT</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Content Switcher */}
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          {activePage === 'home' && (
            <motion.div key="home" {...pageTransition}>
              {/* Hero Section */}
              <section className="relative pt-40 md:pt-64 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-[90vh] flex items-center">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
                  <div>
                    <h1 className="text-6xl md:text-9xl font-black leading-[0.9] mb-10 tracking-tight">
                      Eat <br />
                      <span className="text-orange-500">Authentic</span> <br />
                      Food Only.
                    </h1>
                    <p className="text-gray-500 text-lg md:text-xl mb-12 max-w-lg leading-relaxed">
                      Experience a symphony of flavors curated by world-renowned chefs using ingredients from our own organic gardens.
                    </p>
                    <div className="flex flex-wrap gap-6">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => setActivePage('reserve')}
                        className="flex items-center gap-3 bg-black text-white px-10 py-5 rounded-[24px] text-lg font-black shadow-2xl group"
                      >
                        Book Table
                        <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                      </motion.button>
                      <button 
                        onClick={() => setActivePage('about')}
                        className="flex items-center gap-4 font-black group"
                      >
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                          <Play className="fill-black ml-1" />
                        </div>
                        Watch Story
                      </button>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="relative z-10 w-full aspect-square max-w-[600px] mx-auto">
                      <motion.img 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                        src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1000&h=1000&fit=crop" 
                        className="w-full h-full object-cover rounded-full shadow-2xl ring-[20px] ring-white"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Quick Preview Sections */}
              <div className="bg-white/30 backdrop-blur-md py-20">
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
                  <h3 className="text-3xl font-black">Our Popular Picks</h3>
                  <button onClick={() => setActivePage('menu')} className="flex items-center gap-2 font-bold text-orange-500">
                    See All Menu <ChevronRight />
                  </button>
                </div>
                <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                   {FOOD_ITEMS.slice(0, 3).map(item => <FoodCard key={item.id} item={item} onAddToCart={handleAddToCart} />)}
                </div>
              </div>
            </motion.div>
          )}

          {activePage === 'about' && (
            <motion.div key="about" {...pageTransition} className="pt-32">
              <AboutSection />
            </motion.div>
          )}

          {activePage === 'menu' && (
            <motion.div key="menu" {...pageTransition} className="pt-32 pb-24">
              <section className="px-6 md:px-12 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                  <p className="uppercase tracking-[0.4em] text-orange-500 font-bold text-sm mb-4">Explore Menu</p>
                  <h2 className="text-5xl md:text-8xl font-black mb-8">Our Specialties</h2>
                  <div className="flex flex-wrap justify-center gap-3 no-scrollbar">
                    {CATEGORIES.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`flex items-center gap-3 px-8 py-4 rounded-[28px] transition-all border-2 ${
                          activeCategory === cat.id 
                          ? 'bg-black text-white border-black shadow-xl scale-105' 
                          : 'bg-white/40 border-white/60 text-gray-600'
                        }`}
                      >
                        <span>{cat.icon}</span>
                        <span className="font-black text-xs uppercase tracking-widest">{cat.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  <AnimatePresence mode="popLayout">
                    {filteredItems.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                      >
                        <FoodCard item={item} onAddToCart={handleAddToCart} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </section>
            </motion.div>
          )}

          {activePage === 'gallery' && (
            <motion.div key="gallery" {...pageTransition} className="pt-32">
              <Gallery />
            </motion.div>
          )}

          {activePage === 'reserve' && (
            <motion.div key="reserve" {...pageTransition} className="pt-32">
              <ReservationForm />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Shared Footer */}
      <footer className="px-6 md:px-12 max-w-7xl mx-auto pt-40 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-32">
          <div>
            <div className="flex flex-col mb-10">
              <span className="text-3xl font-black tracking-tighter">Taste</span>
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400">Restaurant & BBQ</span>
            </div>
            <p className="text-gray-500 leading-relaxed text-lg mb-8">Elevating the standard of dining since 1995. Fresh ingredients and masterful preparation.</p>
          </div>
          <div>
            <h4 className="font-black text-xl mb-10 uppercase tracking-widest">Pages</h4>
            <ul className="space-y-6 text-gray-500 font-bold text-lg">
              {NAV_LINKS.map(link => (
                <li key={link.label}>
                  <button onClick={() => handleNavigate(link.href)} className="hover:text-orange-500 transition-colors text-left">
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-black text-xl mb-10 uppercase tracking-widest">Hours</h4>
            <ul className="space-y-6 text-gray-500 font-bold text-lg">
              <li>Mon - Fri: 11AM - 11PM</li>
              <li>Sat - Sun: 9AM - 12AM</li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-xl mb-10 uppercase tracking-widest">Contact</h4>
            <ul className="space-y-6 text-gray-500 font-bold text-lg">
              <li className="flex gap-4"><MapPin className="shrink-0" /> 121 King St, VIC</li>
              <li className="flex gap-4"><Phone className="shrink-0" /> (555) 123-4567</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-12 flex justify-between items-center">
          <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">© 2024 Taste Restaurant.</p>
        </div>
      </footer>

      {/* Bottom Floating Nav for Mobile */}
      <AnimatePresence>
        {!isMobileMenuOpen && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="md:hidden fixed bottom-8 left-6 right-6 z-50"
          >
            <div className="bg-black/90 backdrop-blur-2xl rounded-[32px] p-5 flex justify-between items-center shadow-2xl">
              <button 
                onClick={() => setIsMobileMenuOpen(true)} 
                className="p-4 text-white bg-white/10 rounded-2xl hover:bg-white/20 transition-colors"
              >
                <Menu size={24} />
              </button>
              <button 
                onClick={() => setActivePage('reserve')} 
                className="flex-1 mx-4 p-4 bg-orange-500 text-white rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-orange-500/20 active:scale-95 transition-transform"
              >
                Reserve
              </button>
              <button 
                onClick={() => setIsCartOpen(true)}
                className="p-4 text-white bg-white/10 rounded-2xl relative"
              >
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute top-2 right-2 w-4 h-4 bg-orange-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;