import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from './useReducedMotion';
import { cn } from "../../utils/cn";

export const FloatingParticle = ({ 
  color = "#0B2D4D", 
  size = 4,
  duration = 3,
  delay = 0,
  className,
  ...props 
}) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return null;

  return (
    <motion.div
      animate={{
        y: [0, -10, 0],
        opacity: [0, 0.8, 0],
        scale: [0.8, 1.2, 0.8],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "easeInOut"
      }}
      className={cn("absolute rounded-full pointer-events-none", className)}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        boxShadow: `0 0 ${size * 2}px ${color}`,
        ...props.style
      }}
      {...props}
    />
  );
};
