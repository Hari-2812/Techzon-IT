import React from 'react';
import { cn } from '../../utils/cn';

/**
 * FloatingPanel is a surface that slightly bobs up and down and lives in Z-space.
 */
export const FloatingPanel = ({ children, className, depth = 50, delay = 0, variant = 'surface' }) => {
  return (
    <div 
      className={cn(
        "preserve-3d animate-float", 
        variant === 'glass' ? "glass-panel" : "surface-panel",
        className
      )}
      style={{ 
        transform: `translateZ(${depth}px)`,
        animationDelay: `${delay}s`
      }}
    >
      {children}
    </div>
  );
};
