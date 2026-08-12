import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

/**
 * GlassReflection adds a subtle light reflection that follows the pointer.
 * Intended to be placed inside an overflow-hidden relative container (like a glass panel).
 */
export const GlassReflection = ({ className, intensity = 0.15 }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    // Only track if pointer is fine
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setPosition({ x, y });
    };

    const handleMouseEnter = () => setOpacity(1);
    const handleMouseLeave = () => setOpacity(0);

    const el = ref.current?.parentElement;
    if (el) {
      el.addEventListener('mousemove', handleMouseMove);
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        el.removeEventListener('mousemove', handleMouseMove);
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  return (
    <motion.div
      ref={ref}
      className={cn("absolute inset-0 pointer-events-none z-10 transition-opacity duration-500", className)}
      style={{
        background: `radial-gradient(circle 400px at ${position.x}% ${position.y}%, rgba(255,255,255,${intensity}), transparent)`,
        opacity
      }}
    />
  );
};
