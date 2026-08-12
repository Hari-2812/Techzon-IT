import React from 'react';
import { cn } from '../../utils/cn';

/**
 * ConnectionLine draws SVG lines between nodes.
 */
export const ConnectionLine = ({ x1="50%", y1="50%", x2="50%", y2="50%", active = false, className }) => {
  return (
    <svg className={cn("absolute inset-0 pointer-events-none w-full h-full preserve-3d -z-10", className)} style={{ transform: 'translateZ(-10px)' }}>
      <line 
        x1={x1} y1={y1} x2={x2} y2={y2}
        fill="none" 
        stroke={active ? "#FF8A3D" : "rgba(255,255,255,0.1)"} 
        strokeWidth={active ? "2" : "1"} 
        strokeDasharray={active ? "none" : "4 4"}
        className={cn("transition-all duration-500", active && "animate-pulse")}
      />
    </svg>
  );
};
