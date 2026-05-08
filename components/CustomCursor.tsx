
import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Motion values for smooth tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring configs for different parts of the cursor to create a fluid trail
  const mainSpringConfig = { damping: 25, stiffness: 400 };
  const trailSpringConfig = { damping: 30, stiffness: 150 };

  const mainX = useSpring(mouseX, mainSpringConfig);
  const mainY = useSpring(mouseY, mainSpringConfig);
  
  const trailX = useSpring(mouseX, trailSpringConfig);
  const trailY = useSpring(mouseY, trailSpringConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractable = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        target.getAttribute('role') === 'button';
      
      setIsHovering(!!isInteractable);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseover', handleHover);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleHover);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden hidden md:block">
      {/* Outer Ring / Aura */}
      <motion.div
        className="absolute top-0 left-0 w-10 h-10 border border-orange-400/20 rounded-full flex items-center justify-center"
        style={{ 
          x: trailX, 
          y: trailY,
          translateX: '-50%',
          translateY: '-50%'
        }}
        animate={{ 
          scale: isHovering ? 2 : 1,
          opacity: 0.6
        }}
      />

      {/* Fluid Trail Shell */}
      <motion.div
        className="absolute top-0 left-0 w-6 h-6 bg-orange-500/10 rounded-full blur-sm"
        style={{ 
          x: trailX, 
          y: trailY,
          translateX: '-50%',
          translateY: '-50%'
        }}
        animate={{ 
          scale: isHovering ? 3.5 : 1,
        }}
      />

      {/* Main Sharp Dot */}
      <motion.div
        className="absolute top-0 left-0 w-2 h-2 bg-orange-500 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.5)]"
        style={{ 
          x: mainX, 
          y: mainY,
          translateX: '-50%',
          translateY: '-50%'
        }}
        animate={{ 
          scale: isHovering ? 0.5 : 1,
        }}
      />

      {/* Mix Blend Dot for readability on dark backgrounds */}
      <motion.div
        className="absolute top-0 left-0 w-12 h-12 bg-white rounded-full mix-blend-difference"
        style={{ 
          x: mainX, 
          y: mainY,
          translateX: '-50%',
          translateY: '-50%'
        }}
        animate={{ 
          scale: isHovering ? 1.5 : 0,
          opacity: isHovering ? 0.8 : 0
        }}
      />
    </div>
  );
};
