import React from 'react';
import { motion } from 'framer-motion';

export const EcosystemCore = ({ prefersReducedMotion }) => {
  return (
    <motion.div
      className="relative z-20 flex items-center justify-center preserve-3d"
      animate={prefersReducedMotion ? {} : { y: [-5, 5, -5] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Layer 1: Atmospheric base glow */}
      <div className="absolute w-[180px] h-[180px] md:w-[240px] md:h-[240px] bg-gradient-to-r from-primary/20 to-[#5BC0EB]/20 rounded-full blur-2xl pointer-events-none" />

      {/* Layer 2: Transparent glass shell */}
      <div className="relative w-[140px] h-[140px] md:w-[180px] md:h-[180px] rounded-full bg-white/40 backdrop-blur-[24px] border border-white/60 shadow-[0_30px_60px_rgba(118,87,217,0.1),inset_0_4px_30px_rgba(255,255,255,1)] flex items-center justify-center preserve-3d overflow-hidden">
        
        {/* Subtle Refraction & Rim Light */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 via-transparent to-primary/10" />
        <div className="absolute inset-0 rounded-full border border-white/80" />

        {/* Layer 3: Inner luminous sphere */}
        <div className="relative w-[70%] h-[70%] rounded-full bg-white/30 border border-white/50 backdrop-blur-md shadow-[inset_0_0_20px_rgba(255,255,255,0.8)] flex items-center justify-center preserve-3d group">
          
          {/* Layer 4: Translucent rings */}
          <motion.div 
            className="absolute inset-2 rounded-full border border-dashed border-[#5BC0EB]/40"
            animate={prefersReducedMotion ? {} : { rotateZ: 360 }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute inset-4 rounded-full border border-primary/20"
            animate={prefersReducedMotion ? {} : { rotateZ: -360 }}
            transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          />

          {/* Layer 5: Small Techzon Center Mark */}
          <div className="relative z-10 w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-white to-slate-50 border border-white shadow-[0_0_25px_rgba(118,87,217,0.3),inset_0_2px_8px_rgba(255,255,255,1)] flex flex-col items-center justify-center">
            <span className="text-[8px] md:text-[10px] font-black tracking-[0.2em] text-primary uppercase">Techzon</span>
            <span className="text-[6px] md:text-[7px] font-bold tracking-widest text-primary mt-0.5">Core</span>
          </div>

        </div>
      </div>
    </motion.div>
  );
};
