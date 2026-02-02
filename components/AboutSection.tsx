
import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, Award, Users } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="relative">
          <div className="relative z-10 grid grid-cols-2 gap-4">
            <motion.img 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=600&fit=crop" 
              className="rounded-[40px] shadow-2xl mt-12"
            />
            <motion.img 
              initial={{ y: -20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              src="https://images.unsplash.com/photo-1550966841-3ee7adac1661?w=400&h=600&fit=crop" 
              className="rounded-[40px] shadow-2xl"
            />
          </div>
          {/* Decorative Experience Badge */}
          <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-orange-500 text-white w-32 h-32 rounded-full flex flex-col items-center justify-center border-8 border-white shadow-2xl"
          >
            <span className="text-3xl font-black leading-none">25+</span>
            <span className="text-[10px] font-bold uppercase tracking-widest">Years Exp.</span>
          </motion.div>
        </div>

        <div className="space-y-8">
          <motion.p 
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            className="uppercase tracking-[0.4em] text-orange-500 font-bold text-sm"
          >
            Our Story
          </motion.p>
          <h2 className="text-5xl md:text-7xl font-black leading-tight">Mastering The Art of Cooking</h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            Founded in 1995, Taste Restaurant began as a small family bistro with a simple mission: to bring people together over exceptional food. Today, we continue that tradition by blending modern culinary techniques with the freshest local ingredients.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
            <div className="flex gap-4">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg shrink-0">
                <Utensils className="text-orange-500" />
              </div>
              <div>
                <h4 className="font-bold text-xl mb-1">Authentic Taste</h4>
                <p className="text-gray-500 text-sm">Recipes passed down through generations.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg shrink-0">
                <Award className="text-orange-500" />
              </div>
              <div>
                <h4 className="font-bold text-xl mb-1">Top Quality</h4>
                <p className="text-gray-500 text-sm">Sourced only from organic local farms.</p>
              </div>
            </div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            className="mt-8 border-2 border-black px-10 py-5 rounded-[24px] font-black hover:bg-black hover:text-white transition-all"
          >
            Discover More
          </motion.button>
        </div>
      </div>
    </section>
  );
};
