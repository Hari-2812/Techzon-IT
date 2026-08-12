import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { useReducedMotion } from './useReducedMotion';

export const DigitalCore = ({ 
  icon: Icon, 
  title, 
  subtitle,
  size = 'md', // sm, md, lg
  pulse = false,
  className 
}) => {
  const prefersReducedMotion = useReducedMotion();

  const sizeClasses = {
    sm: 'w-16 h-16 md:w-20 md:h-20',
    md: 'w-24 h-24 md:w-32 md:h-32',
    lg: 'w-32 h-32 md:w-48 md:h-48'
  };

  const ringSizes = {
    sm: 'inset-[-12px]',
    md: 'inset-[-20px]',
    lg: 'inset-[-30px]'
  };

  const innerRingSizes = {
    sm: 'inset-[-4px]',
    md: 'inset-[-6px]',
    lg: 'inset-[-10px]'
  };

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      {/* Outer Glow / Deep Atmosphere */}
      <div className={cn(
        "absolute rounded-full blur-[60px] md:blur-[80px] pointer-events-none transition-all duration-1000",
        pulse ? "opacity-60 scale-110" : "opacity-30 scale-100",
        size === 'lg' ? "w-64 h-64 md:w-96 md:h-96" : "w-40 h-40 md:w-56 md:h-56",
        "bg-gradient-to-tr from-primary via-[#5BC0EB] to-[#FF8A3D]" // Galactic deep colors
      )} />

      {/* Rotating Outer Ring */}
      {!prefersReducedMotion && (
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: pulse ? 12 : 25, repeat: Infinity, ease: "linear" }}
          className={cn("absolute rounded-full border border-dashed border-[#5BC0EB]/30", ringSizes[size])}
        />
      )}

      {/* Counter-Rotating Mid Ring (New for V13) */}
      {!prefersReducedMotion && size !== 'sm' && (
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: pulse ? 18 : 35, repeat: Infinity, ease: "linear" }}
          className={cn("absolute rounded-full border border-dotted border-primary/40", innerRingSizes[size])}
        />
      )}

      {/* Inner Solid Ring */}
      <div className={cn("absolute rounded-full border border-[#5BC0EB]/20 transition-all duration-700", innerRingSizes[size], pulse && "border-[#FF8A3D]/60 scale-[1.05]")} />
      
      {/* Core Panel - using new galaxy-core style */}
      <div className={cn(
        "relative rounded-full galaxy-core flex flex-col items-center justify-center transition-all duration-700 z-10",
        sizeClasses[size],
        pulse ? "border-[#5BC0EB]/60 shadow-[0_12px_48px_rgba(0,0,0,0.6),_0_0_32px_rgba(6,182,212,0.5),_inset_0_2px_4px_rgba(255,255,255,0.2)]" : ""
      )}>
        {/* Core internal energy gradient */}
        <div className={cn(
          "absolute inset-0 rounded-full transition-opacity duration-700",
          pulse ? "bg-gradient-to-br from-[#5BC0EB]/20 via-[#0B2D4D]/10 to-[#FF8A3D]/20 opacity-100" : "bg-gradient-to-br from-[#5BC0EB]/5 to-transparent opacity-50"
        )} />
        
        {Icon && (
          <Icon className={cn(
            "text-[#5BC0EB] mb-1 md:mb-2 transition-all duration-500 relative z-20",
            size === 'sm' ? 'w-5 h-5 md:w-6 md:h-6' : size === 'lg' ? 'w-8 h-8 md:w-12 md:h-12' : 'w-6 h-6 md:w-8 md:h-8',
            pulse && "text-[#FF8A3D] drop-shadow-[0_0_8px_rgba(245,124,32,0.8)]"
          )} />
        )}
        
        {title && (
          <span className={cn(
            "font-display font-bold text-white tracking-widest text-center uppercase leading-tight px-2 relative z-20",
            size === 'sm' ? 'text-[9px] md:text-[10px]' : size === 'lg' ? 'text-sm md:text-base' : 'text-[10px] md:text-xs',
            pulse && "text-transparent bg-clip-text bg-gradient-to-r from-white to-[#FF8A3D]"
          )}>
            {title}
          </span>
        )}
        
        {subtitle && (
          <span className="text-[8px] md:text-[10px] text-[#5BC0EB]/80 font-sans font-semibold tracking-wider uppercase mt-1 relative z-20">
            {subtitle}
          </span>
        )}
      </div>
      
      {/* Pulse Effect */}
      {pulse && !prefersReducedMotion && (
        <div className="absolute inset-0 rounded-full border-2 border-[#5BC0EB] animate-ping opacity-20 pointer-events-none" />
      )}
    </div>
  );
};
