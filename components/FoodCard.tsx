
import React from 'react';
import { motion } from 'framer-motion';
import { FoodItem } from '../types';
import { Heart, ShoppingBag } from 'lucide-react';

interface FoodCardProps {
  item: FoodItem;
  onAddToCart?: (item: FoodItem) => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({ item, onAddToCart }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="relative group bg-white/40 backdrop-blur-md border border-white/50 rounded-[40px] p-6 shadow-xl shadow-black/5 flex flex-col items-center text-center min-w-[240px] md:min-w-0"
    >
      <div className="relative mb-6">
        <motion.div
          whileHover={{ rotate: 15, scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="w-40 h-40 rounded-full overflow-hidden shadow-2xl ring-4 ring-white"
        >
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        </motion.div>
        <button className="absolute top-0 right-0 p-2 bg-white rounded-full shadow-lg text-rose-500 hover:scale-110 transition-transform">
          <Heart size={18} fill="currentColor" />
        </button>
      </div>

      <h3 className="text-xl font-bold text-gray-800 mb-1">{item.name}</h3>
      <p className="text-sm text-gray-500 mb-4 h-10 line-clamp-2">{item.description}</p>
      
      <div className="flex items-center justify-between w-full mt-auto">
        <span className="text-lg font-bold text-gray-900">${item.price.toFixed(2)}</span>
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={() => onAddToCart?.(item)}
          className="bg-black text-white p-3 rounded-2xl shadow-lg hover:bg-orange-500 transition-colors"
        >
          <ShoppingBag size={20} />
        </motion.button>
      </div>
    </motion.div>
  );
};