import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from './useReducedMotion';

export const EnergyPath = ({
  pathData,
  active = false,
  animated = true, // Whether to show the traveling particle
  className = ""
}) => {
  const prefersReducedMotion = useReducedMotion();

  // If we shouldn't animate, just return static active lines without particles
  const shouldAnimate = animated && !prefersReducedMotion;

  return (
    <g className={className}>
      {/* Base Path */}
      <path 
        d={pathData}
        stroke="url(#line-gradient-default)"
        strokeWidth="1.5"
        fill="none"
        vectorEffect="non-scaling-stroke"
        className="transition-all duration-700"
      />
      
      {/* Active Highlight Path */}
      {active && (
        <motion.path 
          d={pathData}
          stroke="url(#active-line-gradient)"
          strokeWidth={shouldAnimate ? "3" : "2"}
          fill="none"
          filter={shouldAnimate ? "url(#glow-line)" : undefined}
          vectorEffect="non-scaling-stroke"
          initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : false}
          animate={shouldAnimate ? { pathLength: 1, opacity: 1 } : { opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
      )}
    </g>
  );
};

// Export the SVG defs needed for the EnergyPath
export const EnergyPathDefs = () => (
  <defs>
    <linearGradient id="line-gradient-default" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#0B2D4D" stopOpacity="0.15" />
      <stop offset="100%" stopColor="#5BC0EB" stopOpacity="0.1" />
    </linearGradient>
    <linearGradient id="active-line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#5BC0EB" stopOpacity="0.8" />
      <stop offset="50%" stopColor="#0B2D4D" stopOpacity="0.9" />
      <stop offset="100%" stopColor="#FF8A3D" stopOpacity="1" />
    </linearGradient>
    <filter id="glow-line" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
);
