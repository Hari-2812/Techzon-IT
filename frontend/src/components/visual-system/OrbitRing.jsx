import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { useReducedMotion } from './useReducedMotion';

export const OrbitRing = ({
  radius,
  active = false,
  duration = 45, // seconds for one full rotation
  className
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div 
      className={cn("absolute rounded-full border border-dashed pointer-events-none transition-colors duration-1000", className)}
      style={{
        width: radius * 2,
        height: radius * 2,
        left: '50%',
        top: '50%',
        marginLeft: -radius,
        marginTop: -radius,
        borderColor: active ? 'rgba(6, 182, 212, 0.4)' : 'rgba(118, 87, 217, 0.15)',
        boxShadow: active ? '0 0 30px rgba(6,182,212,0.1), inset 0 0 30px rgba(6,182,212,0.1)' : 'none'
      }}
    >
      {/* Actual rotating element so we don't rotate the container directly which could be tricky for nested elements */}
      {!prefersReducedMotion && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full"
        >
          {/* Subtle node marker on the ring */}
          <div className={cn(
            "absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full transition-colors duration-700",
            active ? "bg-[#5BC0EB] shadow-[0_0_8px_rgba(6,182,212,0.8)]" : "bg-primary/40"
          )} />
        </motion.div>
      )}
    </div>
  );
};
