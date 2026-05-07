
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FoodItem } from '../types';
import { Heart, ShoppingBag } from 'lucide-react';

interface FoodCardProps {
  item: FoodItem;
  onAddToCart?: (item: FoodItem) => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({ item, onAddToCart }) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="perspective-1000">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative group bg-white/60 backdrop-blur-md border border-white/80 rounded-[40px] p-6 shadow-2xl shadow-black/5 flex flex-col items-center text-center transition-shadow hover:shadow-orange-500/10"
      >
        <div 
          className="relative mb-6 preserve-3d"
          style={{ transform: "translateZ(50px)" }}
        >
          <motion.div
            className="w-40 h-40 rounded-full overflow-hidden shadow-2xl ring-4 ring-white"
          >
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          </motion.div>
          <button className="absolute top-0 right-0 p-2 bg-white rounded-full shadow-lg text-rose-500 hover:scale-110 transition-transform">
            <Heart size={18} fill="currentColor" />
          </button>
        </div>

        <div style={{ transform: "translateZ(30px)" }} className="preserve-3d">
          <h3 className="text-xl font-bold text-gray-800 mb-1">{item.name}</h3>
          <p className="text-sm text-gray-500 mb-4 h-10 line-clamp-2">{item.description}</p>
          
          <div className="flex items-center justify-between w-full mt-auto gap-4">
            <span className="text-lg font-bold text-gray-900">${item.price.toFixed(2)}</span>
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={() => onAddToCart?.(item)}
              className="bg-black text-white p-3 rounded-2xl shadow-lg hover:bg-orange-500 transition-colors"
            >
              <ShoppingBag size={20} />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
