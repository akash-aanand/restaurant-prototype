
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const FloatingDecorations: React.FC = () => {
  const { scrollYProgress } = useScroll();
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -800]);
  const r1 = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const r2 = useTransform(scrollYProgress, [0, 1], [0, -360]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
      {/* Spinach Leaf 1 */}
      <motion.div 
        style={{ y: y1, rotate: r1 }}
        className="absolute top-[20%] left-[10%] w-16 h-16 bg-green-500/20 blur-xl rounded-full"
      />
      {/* Spinach Leaf 2 */}
      <motion.div 
        style={{ y: y2, rotate: r2 }}
        className="absolute top-[60%] right-[15%] w-24 h-24 bg-green-600/10 blur-2xl rounded-full"
      />
      {/* Tomato Fragment */}
      <motion.div 
        style={{ y: y1, rotate: r2 }}
        className="absolute top-[40%] right-[5%] w-12 h-12 bg-red-500/10 blur-lg rounded-full"
      />
      {/* Background Blurs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-100/50 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-green-50/50 blur-[150px] rounded-full translate-y-1/2 -translate-x-1/2" />
    </div>
  );
};
