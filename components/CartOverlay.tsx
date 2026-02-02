
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

export const CartOverlay: React.FC<CartOverlayProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemove 
}) => {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-white z-[101] shadow-2xl flex flex-col"
          >
            <div className="p-8 flex justify-between items-center border-b">
              <div>
                <h2 className="text-3xl font-black tracking-tight">Your Cart</h2>
                <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Taste Premium Dining</p>
              </div>
              <button 
                onClick={onClose}
                className="p-3 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                    <ShoppingBag size={32} />
                  </div>
                  <p className="font-bold text-gray-400 uppercase tracking-widest">Cart is empty</p>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div 
                    layout
                    key={item.id} 
                    className="flex gap-4 items-center"
                  >
                    <div className="w-24 h-24 rounded-3xl overflow-hidden shadow-lg shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-lg truncate">{item.name}</h4>
                      <p className="text-orange-500 font-black mb-2">${item.price.toFixed(2)}</p>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex items-center bg-gray-100 rounded-xl p-1">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 hover:bg-white rounded-lg transition-colors"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-8 text-center font-black text-sm">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 hover:bg-white rounded-lg transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <button 
                          onClick={() => onRemove(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            <div className="p-8 bg-gray-50 border-t space-y-6">
              <div className="flex justify-between items-center text-xl">
                <span className="font-bold text-gray-500">Subtotal</span>
                <span className="font-black">${subtotal.toFixed(2)}</span>
              </div>
              <button 
                disabled={items.length === 0}
                className="w-full bg-black text-white py-5 rounded-[24px] font-black text-lg shadow-2xl hover:bg-orange-500 transition-all disabled:opacity-50 disabled:bg-gray-400"
              >
                Checkout Now
              </button>
              <p className="text-center text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                Taxes and shipping calculated at checkout
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};