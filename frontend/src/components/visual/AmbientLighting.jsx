import React from 'react';
import { cn } from '../../utils/cn';

export const AmbientLighting = ({ color = '#0B2D4D', intensity = 'medium', className }) => {
  const intensityMap = {
    low: 'opacity-20 blur-[100px]',
    medium: 'opacity-40 blur-[120px]',
    high: 'opacity-60 blur-[150px]'
  };

  return (
    <div className={cn("absolute inset-0 pointer-events-none overflow-hidden z-0", className)}>
      <div 
        className={cn("absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] aspect-square rounded-full", intensityMap[intensity])}
        style={{ background: `radial-gradient(circle, ${color} 0%, transparent 70%)` }}
      />
    </div>
  );
};
