import React from 'react';
import { cn } from '../../utils/cn';

/**
 * SystemNode represents a technology or capability node in 3D space.
 */
export const SystemNode = ({ icon: Icon, label, className, depth = 20, active = false }) => {
  return (
    <div 
      className={cn(
        "flex flex-col items-center justify-center gap-2 preserve-3d transition-all duration-300",
        active ? "text-primary" : "text-muted-foreground hover:text-foreground",
        className
      )}
      style={{ transform: `translateZ(${active ? depth + 20 : depth}px)` }}
    >
      <div className={cn(
        "w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300",
        active ? "border-primary shadow-[0_0_20px_rgba(36,18,82,0.15)] bg-white text-primary scale-110" : "border-border surface-panel text-muted-foreground bg-[rgba(255,255,255,0.8)] backdrop-blur"
      )}>
        {Icon && <Icon className="w-5 h-5" />}
      </div>
      {label && <span className="text-xs font-semibold tracking-wider uppercase">{label}</span>}
    </div>
  );
};
