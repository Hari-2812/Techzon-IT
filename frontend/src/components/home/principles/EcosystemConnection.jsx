import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../../utils/cn';

export const EcosystemConnection = ({ 
  id,
  startX = 50,
  startY = 50,
  targetX, 
  targetY, 
  isHovered, 
  isAnyHovered,
  prefersReducedMotion,
  particleDelay = 0
}) => {
  // Calculate a control point for a smooth Bezier curve
  const midX = (startX + targetX) / 2;
  const midY = (startY + targetY) / 2;
  
  // Create a slight curve by offsetting the control point
  const dx = targetX - startX;
  const dy = targetY - startY;
  const dist = Math.sqrt(dx * dx + dy * dy);
  
  // Control point offset magnitude
  const offset = dist * 0.2; 
  
  // Normal vector
  const nx = -dy / dist;
  const ny = dx / dist;
  
  const cpX = midX + nx * offset;
  const cpY = midY + ny * offset;

  const pathD = `M ${startX} ${startY} Q ${cpX} ${cpY} ${targetX} ${targetY}`;
  
  const shouldDim = isAnyHovered && !isHovered;

  return (
    <div className="absolute inset-0 pointer-events-none z-10 opacity-60">
      <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0B2D4D" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#5BC0EB" stopOpacity={isHovered ? "0.6" : "0.2"} />
            <stop offset="100%" stopColor="#0B2D4D" stopOpacity="0.1" />
          </linearGradient>
          
          <linearGradient id={`active-grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#5BC0EB" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>

        {/* Base connection path */}
        <path 
          d={pathD}
          fill="none"
          stroke={`url(#grad-${id})`}
          strokeWidth="0.4"
          className={cn("transition-opacity duration-500", shouldDim ? "opacity-20" : "opacity-100")}
        />

        {/* Hover Highlight Path */}
        <motion.path 
          d={pathD}
          fill="none"
          stroke={`url(#active-grad-${id})`}
          strokeWidth="0.8"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ filter: 'drop-shadow(0 0 2px rgba(6, 182, 212, 0.5))' }}
        />

        {/* Moving Energy Particle (Only if not reduced motion) */}
        {!prefersReducedMotion && (
          <motion.circle
            r="0.8"
            fill="#5BC0EB"
            className={cn("transition-opacity duration-500", shouldDim ? "opacity-0" : "opacity-80")}
            style={{ filter: 'drop-shadow(0 0 2px #0B2D4D)' }}
          >
            <animateMotion 
              dur="4s" 
              repeatCount="indefinite" 
              path={pathD} 
              begin={`${particleDelay}s`}
            />
          </motion.circle>
        )}
      </svg>
    </div>
  );
};
