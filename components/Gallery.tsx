
import React from 'react';
import { motion } from 'framer-motion';
import { GALLERY_IMAGES } from '../constants';

export const Gallery: React.FC = () => {
  return (
    <section id="gallery" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="uppercase tracking-[0.3em] text-orange-500 font-bold text-sm mb-4"
        >
          Visual Experience
        </motion.p>
        <h2 className="text-4xl md:text-6xl font-black mb-6">Our Atmosphere</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
        {GALLERY_IMAGES.map((img, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -10 }}
            className={`relative group overflow-hidden rounded-[30px] md:rounded-[50px] cursor-pointer shadow-2xl ${
              img.size === 'large' ? 'col-span-2 row-span-2' : 
              img.size === 'medium' ? 'col-span-1 row-span-2' : 'col-span-1'
            }`}
          >
            <img 
              src={img.url} 
              alt={img.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
              <p className="text-white font-bold text-xl">{img.title}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
