import React, { useRef, useState, useEffect } from 'react';
import { cn } from '../../utils/cn';

/**
 * Performant 3D Tilt Wrapper using native CSS variables.
 * DOES NOT call setState on mousemove to avoid React render cycles.
 */
export const Tilt3D = ({ 
  children, 
  className,
  intensity = 15, // max rotation in degrees
  depth = 0,
  glare = false,
  perspective = 1000
}) => {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    const listener = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  const rectRef = useRef(null);

  const handleMouseMove = (e) => {
    if (isReducedMotion || !containerRef.current || !rectRef.current) return;
    
    // Only update if not on a coarse pointer (touch device)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const rect = rectRef.current;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -intensity;
    const rotateY = ((x - centerX) / centerX) * intensity;
    
    // Update CSS variables directly, bypassing React state
    containerRef.current.style.setProperty('--rx', `${rotateX}deg`);
    containerRef.current.style.setProperty('--ry', `${rotateY}deg`);
    if (glare) {
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      containerRef.current.style.setProperty('--gx', `${glareX}%`);
      containerRef.current.style.setProperty('--gy', `${glareY}%`);
    }
  };

  const handleMouseEnter = () => {
    if (containerRef.current) {
      rectRef.current = containerRef.current.getBoundingClientRect();
    }
    setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    rectRef.current = null;
    if (containerRef.current) {
      containerRef.current.style.setProperty('--rx', '0deg');
      containerRef.current.style.setProperty('--ry', '0deg');
    }
  };

  return (
    <div 
      className={cn("relative group", className)}
      style={{ perspective: `${perspective}px` }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        ref={containerRef}
        className="w-full h-full transition-transform duration-200 ease-out preserve-3d"
        style={{ 
          transform: isHovered && !isReducedMotion ? `translateZ(${depth}px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))` : `translateZ(0px) rotateX(0deg) rotateY(0deg)`
        }}
      >
        {children}
        {glare && isHovered && !isReducedMotion && (
          <div 
            className="absolute inset-0 pointer-events-none rounded-inherit transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at var(--gx, 50%) var(--gy, 50%), rgba(255,255,255,0.1) 0%, transparent 50%)`,
              opacity: 1
            }}
          />
        )}
      </div>
    </div>
  );
};
