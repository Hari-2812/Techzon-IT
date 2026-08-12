import React from 'react';
import { motion } from 'framer-motion';
import { cn } from "../../utils/cn";
import { useReducedMotion } from './useReducedMotion';

export const GlassPanel = ({ 
  children, 
  className, 
  animated = true, 
  hoverable = false,
  ...props 
}) => {
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = animated && !prefersReducedMotion;

  const Component = shouldAnimate ? motion.div : 'div';
  
  const baseClasses = cn(
    "relative bg-white/75 backdrop-blur-2xl border border-primary/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)]",
    hoverable && "transition-all duration-500 hover:shadow-[0_20px_40px_rgba(118,87,217,0.1)] hover:border-primary/30 hover:-translate-y-1 hover:bg-white/90",
    className
  );

  return (
    <Component className={baseClasses} {...props}>
      <div className="absolute inset-0 rounded-[inherit] pointer-events-none bg-gradient-to-br from-white/60 to-transparent" />
      <div className="relative z-10">
        {children}
      </div>
    </Component>
  );
};
