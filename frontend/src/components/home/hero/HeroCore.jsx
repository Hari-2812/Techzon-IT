import React from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { Cpu } from 'lucide-react';
import './Hero.css';

export const HeroCore = ({ mouseX, mouseY, prefersReducedMotion }) => {
  // Constrained parallax for the core (max 5px movement)
  const coreX = useSpring(useTransform(mouseX, [0, 1], [-5, 5]), { stiffness: 40, damping: 20 });
  const coreY = useSpring(useTransform(mouseY, [0, 1], [-5, 5]), { stiffness: 40, damping: 20 });

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 preserve-3d z-20" // Z-index 20 sits between background nodes (15) and foreground nodes (25)
      style={{
        x: prefersReducedMotion ? '-50%' : coreX,
        y: prefersReducedMotion ? '-50%' : coreY,
        transform: 'translate(-50%, -50%)',
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <motion.div 
        className="relative w-[180px] h-[180px] md:w-[220px] md:h-[220px] preserve-3d"
        animate={prefersReducedMotion ? {} : {
          y: [-4, 4, -4] // Realistic, slow vertical float
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Layer 1: Atmospheric Shadow / Glow underneath */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-6 bg-muted/30 rounded-[100%] blur-xl opacity-60 pointer-events-none" />

        {/* Layer 2: Outer Glass Shell */}
        <div className="absolute inset-0 rounded-full bg-white/35 backdrop-blur-[18px] border border-primary/30 shadow-[0_25px_70px_rgba(90,70,180,0.15),inset_0_4px_30px_rgba(255,255,255,0.9)] overflow-hidden preserve-3d flex items-center justify-center transition-all duration-700 hover:shadow-[0_25px_80px_rgba(118,87,217,0.3),inset_0_4px_30px_rgba(255,255,255,0.9)]">
          
          {/* Glass Reflection Highlight Sweep */}
          <div className="hero-glass-reflection" />
          
          {/* Edge Rim Lighting */}
          <div className="absolute inset-0 rounded-full border border-white/70 pointer-events-none" />
          
          {/* Subtle Refraction Gradient */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 via-transparent to-primary/10 pointer-events-none" />

          {/* Layer 3: Inner Glass Sphere */}
          <div className="absolute w-[85%] h-[85%] rounded-full bg-white/20 border border-white/30 backdrop-blur-sm shadow-[inset_0_0_20px_rgba(255,255,255,0.5)] flex items-center justify-center preserve-3d group">
            
            {/* Layer 4: Rotating Thin Energy Ring (Internal) */}
            <motion.div 
              className="absolute inset-2 rounded-full border border-dashed border-[#5BC0EB]/40"
              animate={prefersReducedMotion ? {} : { rotateZ: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />

            {/* Layer 5: Glowing Digital Nucleus */}
            <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-white to-white/70 backdrop-blur-md shadow-[0_0_30px_rgba(118,87,217,0.4),inset_0_2px_10px_rgba(255,255,255,1)] border border-white flex flex-col items-center justify-center z-10 preserve-3d transition-transform duration-700 hover:scale-105">
              <Cpu className="w-6 h-6 md:w-8 md:h-8 text-primary mb-1 drop-shadow-sm transition-colors duration-300" />
              <span className="text-[9px] font-bold tracking-widest uppercase text-primary">Core</span>
            </div>
            
            {/* Layer 6: Internal Slow-Moving Particles */}
            {!prefersReducedMotion && (
              <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                 {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1.5 h-1.5 rounded-full bg-[#5BC0EB]/60 shadow-[0_0_5px_#5BC0EB]"
                      style={{
                        left: `${40 + Math.random() * 20}%`,
                        top: `${40 + Math.random() * 20}%`,
                      }}
                      animate={{
                        y: [0, -15, 0],
                        x: [0, (Math.random() - 0.5) * 15, 0],
                        opacity: [0.3, 0.8, 0.3],
                      }}
                      transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random(),
                        ease: "easeInOut"
                      }}
                    />
                 ))}
              </div>
            )}
            
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
