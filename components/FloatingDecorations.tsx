
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const FloatingDecorations: React.FC = () => {
  const { scrollYProgress } = useScroll();
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -1200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -600]);
  const r1 = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const r2 = useTransform(scrollYProgress, [0, 1], [0, -360]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
      {/* Dynamic 3D Blur Elements */}
      <motion.div 
        style={{ y: y1, rotate: r1 }}
        className="absolute top-[15%] left-[5%] w-32 h-32 bg-orange-200/30 blur-[60px] rounded-full"
      />
      <motion.div 
        style={{ y: y2, rotate: r2 }}
        className="absolute top-[70%] right-[10%] w-48 h-48 bg-green-200/20 blur-[80px] rounded-full"
      />
      <motion.div 
        style={{ y: y3, rotate: r1 }}
        className="absolute top-[40%] left-[80%] w-24 h-24 bg-red-100/30 blur-[50px] rounded-full"
      />
      
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-50/40 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[900px] h-[900px] bg-green-50/30 blur-[180px] rounded-full translate-y-1/2 -translate-x-1/2" />
    </div>
  );
};
