import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export const InteractiveGlobe = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / 20;
      const y = (e.clientY - rect.top - rect.height / 2) / 20;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-square max-w-[600px] mx-auto flex items-center justify-center pointer-events-none"
    >
      {/* Ambient Glow */}
      <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full mix-blend-screen" />
      <div className="absolute inset-10 bg-secondary/20 blur-[80px] rounded-full mix-blend-screen" />

      {/* Globe Container */}
      <motion.div
        animate={{
          rotateX: mousePos.y,
          rotateY: mousePos.x,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        className="relative w-full h-full preserve-3d"
        style={{ perspective: "1000px" }}
      >
        <div className="absolute inset-0 rounded-full border border-primary/20 bg-background/5 backdrop-blur-sm overflow-hidden flex items-center justify-center shadow-[inset_0_0_100px_rgba(36,18,82,0.5)]">
          
          {/* Rotating Lat/Long Lines */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            {[...Array(6)].map((_, i) => (
              <div 
                key={`lon-${i}`}
                className="absolute inset-0 border border-primary/10 rounded-full"
                style={{ transform: `rotateY(${i * 30}deg)` }}
              />
            ))}
            {[...Array(6)].map((_, i) => (
              <div 
                key={`lat-${i}`}
                className="absolute inset-0 border border-primary/10 rounded-full"
                style={{ transform: `rotateX(${i * 30}deg)` }}
              />
            ))}
          </motion.div>

          {/* Map Dots Pattern (Simplified for performance) */}
          <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[radial-gradient(circle_at_center,rgba(245,124,32,0.8)_1px,transparent_1px)] bg-[size:20px_20px]" />

          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF8A3D" stopOpacity="0" />
                <stop offset="50%" stopColor="#FF8A3D" stopOpacity="1" />
                <stop offset="100%" stopColor="#FF8A3D" stopOpacity="0" />
              </linearGradient>
            </defs>
            
            {/* Animated Connection Paths */}
            <motion.path
              d="M 20 40 Q 50 10 80 50"
              fill="none"
              stroke="url(#line-grad)"
              strokeWidth="0.5"
              initial={{ strokeDasharray: "0 100", strokeDashoffset: 100 }}
              animate={{ strokeDasharray: "100 100", strokeDashoffset: 0 }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
            />
            <motion.path
              d="M 15 60 Q 40 80 75 30"
              fill="none"
              stroke="url(#line-grad)"
              strokeWidth="0.5"
              initial={{ strokeDasharray: "0 100", strokeDashoffset: 100 }}
              animate={{ strokeDasharray: "100 100", strokeDashoffset: 0 }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatType: "reverse", delay: 1 }}
            />
            <motion.path
              d="M 30 20 Q 60 50 90 70"
              fill="none"
              stroke="url(#line-grad)"
              strokeWidth="0.5"
              initial={{ strokeDasharray: "0 100", strokeDashoffset: 100 }}
              animate={{ strokeDasharray: "100 100", strokeDashoffset: 0 }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", repeatType: "reverse", delay: 0.5 }}
            />
          </svg>

          {/* Nodes */}
          {[
            { top: '20%', left: '30%', delay: 0 },
            { top: '50%', left: '80%', delay: 1 },
            { top: '60%', left: '15%', delay: 2 },
            { top: '30%', left: '75%', delay: 1.5 },
            { top: '80%', left: '40%', delay: 0.5 },
          ].map((node, i) => (
            <div key={`node-${i}`} className="absolute" style={{ top: node.top, left: node.left }}>
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: node.delay }}
                className="w-2 h-2 rounded-full bg-accent shadow-[0_0_10px_#FF8A3D]"
              />
              <div className="absolute inset-0 w-2 h-2 rounded-full bg-white opacity-50" />
            </div>
          ))}

          {/* Central Core Glow */}
          <div className="absolute inset-1/4 bg-primary/30 rounded-full blur-[40px] mix-blend-screen" />
        </div>
      </motion.div>
    </div>
  );
};
