import React from 'react';
import { cn } from '../../utils/cn';

export const ArchitecturalGrid = ({ className, size = 60, opacity = 0.05, perspective = false }) => {
  return (
    <div className={cn("absolute inset-0 pointer-events-none overflow-hidden z-0", perspective && "perspective-container", className)}>
      <div className={cn("absolute inset-0 w-full h-full", perspective && "preserve-3d rotate-x-60 scale-150 -translate-y-1/4 origin-bottom")}>
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="arch-grid-v11" width={size} height={size} patternUnits="userSpaceOnUse">
              <path d={`M ${size} 0 L 0 0 0 ${size}`} fill="none" stroke="currentColor" strokeWidth="1" opacity={opacity} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#arch-grid-v11)" className="text-[#85828D]" />
        </svg>
      </div>
    </div>
  );
};
