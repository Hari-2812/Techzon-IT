import React from 'react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';

export const SystemTopology = ({ className, activeNode = null }) => {
  // A reusable system topology background
  return (
    <div className={cn("absolute inset-0 pointer-events-none overflow-hidden opacity-20", className)}>
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <g stroke="currentColor" strokeWidth="1" fill="none" opacity="0.4">
          <path d="M 0,100 C 150,100 200,200 400,200 C 600,200 700,50 900,50 L 1200,50" />
          <path d="M 0,300 C 300,300 400,100 600,100 C 800,100 900,400 1200,400" />
          <path d="M 200,0 L 200,200" strokeDasharray="4 4" />
          <path d="M 600,100 L 600,400" strokeDasharray="4 4" />
          <path d="M 900,50 L 900,250" strokeDasharray="4 4" />
        </g>
        <g fill="currentColor">
          <circle cx="200" cy="200" r="4" className={activeNode === 1 ? "text-[#FF8A3D]" : ""} />
          <circle cx="400" cy="200" r="4" className={activeNode === 2 ? "text-[#FF8A3D]" : ""} />
          <circle cx="600" cy="100" r="4" className={activeNode === 3 ? "text-[#FF8A3D]" : ""} />
          <circle cx="900" cy="50"  r="4" className={activeNode === 4 ? "text-[#FF8A3D]" : ""} />
        </g>
      </svg>
    </div>
  );
};
