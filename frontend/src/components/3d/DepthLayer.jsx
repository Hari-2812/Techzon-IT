import React from 'react';
import { cn } from '../../utils/cn';

/**
 * DepthLayer pushes its children forward or backward in Z-space.
 */
export const DepthLayer = ({ children, depth = 0, className }) => {
  return (
    <div 
      className={cn("preserve-3d", className)}
      style={{ transform: `translateZ(${depth}px)` }}
    >
      {children}
    </div>
  );
};
