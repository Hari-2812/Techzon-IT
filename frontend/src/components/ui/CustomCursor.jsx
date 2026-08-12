import React, { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Smooth interpolation using framer-motion springs
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);
  
  // Follower spring (slightly delayed)
  const followerConfig = { damping: 30, stiffness: 200, mass: 0.8 };
  const followerX = useSpring(0, followerConfig);
  const followerY = useSpring(0, followerConfig);

  useEffect(() => {
    // Detect touch device to disable cursor
    if (window.matchMedia("(pointer: coarse)").matches || 'ontouchstart' in window) {
      setIsTouchDevice(true);
      return;
    }

    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      followerX.set(e.clientX);
      followerY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      // Find closest interactive element
      const target = e.target.closest('a, button, [role="button"], input, select, textarea, .interactive-card');
      if (target) {
        setIsHovering(true);
        // Check for specific custom cursor labels
        const label = target.getAttribute('data-cursor-label');
        if (label) {
          setCursorText(label);
        } else {
          setCursorText('');
        }
      } else {
        setIsHovering(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, followerX, followerY]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Center glowing dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-[9999] shadow-[0_0_10px_2px_rgba(49,89,77,0.4)]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%'
        }}
      />
      
      {/* Smooth Follower / Hover Expansion */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] flex items-center justify-center rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm shadow-elevation-1"
        animate={{
          width: isHovering ? (cursorText ? 80 : 48) : 32,
          height: isHovering ? (cursorText ? 80 : 48) : 32,
        }}
        style={{
          x: followerX,
          y: followerY,
          translateX: '-50%',
          translateY: '-50%'
        }}
      >
        {isHovering && cursorText && (
          <motion.span 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[10px] font-bold text-primary uppercase tracking-widest text-center leading-tight"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </>
  );
};
