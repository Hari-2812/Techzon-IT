import React from 'react';
import { motion } from 'framer-motion';
import { PrincipleIcon } from './PrincipleIcon';

export const PrincipleModule = ({ index, title, description, icon, isMobile, positionClasses }) => {
  const tiltProps = isMobile ? {} : {
    whileHover: { 
      translateZ: 18, 
      scale: 1.015,
      rotateX: [0, 3, -3, 0], 
    },
    transition: { type: "spring", stiffness: 300, damping: 20 }
  };

  return (
    <motion.div 
      className={`relative flex flex-col p-6 bg-white/70 backdrop-blur-md border-[3px] border-primary rounded-2xl shadow-[0_8px_32px_rgba(36,18,82,0.08),0_0_20px_rgba(36,18,82,0.15)] group ${positionClasses}`}
      style={{ transformStyle: "preserve-3d" }}
      {...tiltProps}
    >
      <div className="flex items-center gap-4 mb-4">
        <span className="text-sm font-bold text-orange-500 opacity-80">0{index}</span>
        <PrincipleIcon icon={icon} />
        <h3 className="text-xl font-bold text-primary leading-tight flex-1">{title}</h3>
      </div>
      <p className="text-primary/70 text-sm leading-relaxed translate-z-10 transform-gpu">
        {description}
      </p>
    </motion.div>
  );
};
