import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { cn } from '../../../utils/cn';

export const EcosystemNode = ({ 
  icon: Icon, 
  title, 
  x, 
  y, 
  z, 
  mouseX, 
  mouseY,
  isHovered,
  onHover,
  onLeave,
  prefersReducedMotion,
  isAnyHovered
}) => {
  // Parallax: nodes move slightly based on mouse, scaled by their depth
  const parallaxX = useTransform(mouseX, [0, 1], [-z * 0.15, z * 0.15]);
  const parallaxY = useTransform(mouseY, [0, 1], [-z * 0.15, z * 0.15]);

  // Determine dimming state: if any node is hovered, dim others
  const shouldDim = isAnyHovered && !isHovered;

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 preserve-3d cursor-default"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        x: prefersReducedMotion ? '-50%' : parallaxX,
        y: prefersReducedMotion ? '-50%' : parallaxY,
        z: isHovered ? z + 20 : z,
        // The -50% translation centers the node on its x/y coordinates
        transform: `translate(-50%, -50%) translateZ(${isHovered ? z + 20 : z}px)`
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: shouldDim ? 0.3 : 1, 
        scale: isHovered ? 1.05 : 1 
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="relative flex flex-col items-center justify-center group preserve-3d">
        {/* Soft shadow / glow below the node */}
        <div 
          className={cn(
            "absolute -bottom-3 left-1/2 -translate-x-1/2 w-4/5 h-2 rounded-[100%] blur-[4px] transition-all duration-400",
            isHovered ? "bg-primary/30 opacity-100" : "bg-muted/30 opacity-60"
          )}
        />

        {/* Premium Glass Node */}
        <div 
          className={cn(
            "relative flex items-center gap-2.5 rounded-full pl-3 pr-5 py-2 transition-all duration-400 backdrop-blur-[16px]",
            isHovered 
              ? "bg-white/80 border-primary/40 shadow-[0_15px_35px_rgba(118,87,217,0.15),inset_0_2px_10px_rgba(255,255,255,1)]" 
              : "bg-white/50 border-white/70 shadow-[0_8px_25px_rgba(118,87,217,0.06),inset_0_1px_5px_rgba(255,255,255,0.9)]"
          )}
        >
          {/* Inner Highlight */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/90 to-transparent pointer-events-none" />
          
          {/* Icon Container */}
          <div 
            className={cn(
              "relative w-8 h-8 rounded-full flex items-center justify-center border transition-colors duration-400",
              isHovered 
                ? "bg-gradient-to-br from-primary/25 to-[#5BC0EB]/25 border-primary/40" 
                : "bg-gradient-to-br from-primary/10 to-[#5BC0EB]/10 border-primary/20"
            )}
          >
            <Icon className={cn("w-4 h-4 transition-colors duration-400", isHovered ? "text-primary brightness-125" : "text-foreground")} />
          </div>
          
          {/* Label */}
          <span className={cn(
            "relative text-xs font-bold tracking-wide transition-colors duration-400",
            isHovered ? "text-primary" : "text-foreground"
          )}>
            {title}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
