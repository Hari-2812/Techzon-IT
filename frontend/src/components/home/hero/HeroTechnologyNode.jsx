import React, { useRef, useState } from 'react';
import { motion, useAnimationFrame, useMotionValue, useTransform, useSpring } from 'framer-motion';

export const HeroTechnologyNode = ({ 
  icon: Icon, 
  title, 
  radiusX, 
  radiusY, 
  speed = 1,
  initialAngle = 0,
  tiltX = 0,
  mouseX, 
  mouseY,
  prefersReducedMotion
}) => {
  const nodeRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Orbital mechanics values
  const angle = useMotionValue(initialAngle);
  
  // Convert tiltX from degrees to radians for mathematical projection
  const tiltRad = (tiltX * Math.PI) / 180;

  // We map the angle to continuous 3D coordinates.
  const orbitX = useTransform(angle, a => Math.cos(a) * radiusX);
  
  // y considers the tilt of the plane
  const orbitY = useTransform(angle, a => Math.sin(a) * radiusY * Math.cos(tiltRad));
  
  // z provides depth, used for scaling and occlusion
  const orbitZ = useTransform(angle, a => Math.sin(a) * radiusY * Math.sin(tiltRad));

  // Derive visual properties based on depth (Z)
  // When Z is positive (in front of core), scale up and increase opacity.
  // When Z is negative (behind core), scale down and fade slightly.
  // Note: We use absolute max values for interpolation ranges.
  const maxZ = radiusY * Math.sin(Math.abs(tiltRad)) || 1; 

  const scale = useTransform(orbitZ, [-maxZ, maxZ], [0.85, 1.15]);
  const opacity = useTransform(orbitZ, [-maxZ, 0, maxZ], [0.55, 0.85, 1]);
  // Z-index management based on depth to ensure front/back occlusion with the core
  const zIndex = useTransform(orbitZ, z => (z > 0 ? 30 : 10));

  // Mouse Parallax Effect (subtle offset based on mouse position)
  const parallaxX = useSpring(useTransform(mouseX, [0, 1], [-5, 5]), { stiffness: 40, damping: 20 });
  const parallaxY = useSpring(useTransform(mouseY, [0, 1], [-5, 5]), { stiffness: 40, damping: 20 });

  // Animation Loop
  useAnimationFrame((time, delta) => {
    if (prefersReducedMotion) return;
    
    // Smooth down speed to a crawl when hovered
    const currentSpeed = isHovered ? speed * 0.1 : speed;
    
    // delta is in ms, we convert to seconds and multiply by speed
    const deltaAngle = (delta / 1000) * currentSpeed;
    angle.set(angle.get() + deltaAngle);
  });

  return (
    <motion.div
      ref={nodeRef}
      className="absolute top-1/2 left-1/2 group cursor-default"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        // Combine orbital position and parallax
        x: useTransform([orbitX, parallaxX], ([oX, pX]) => oX + pX),
        y: useTransform([orbitY, parallaxY], ([oY, pY]) => oY + pY),
        zIndex,
        scale: prefersReducedMotion ? 1 : scale,
        opacity: prefersReducedMotion ? 1 : opacity,
        // The container needs to offset by -50% to center precisely on the coordinate
        transform: 'translate(-50%, -50%)'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      {/* Node Container (Remains upright mathematically without 3D text distortion) */}
      <motion.div
        animate={isHovered ? { scale: 1.08, y: -5 } : { scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative flex flex-col items-center justify-center"
      >
        {/* Soft atmospheric shadow below the capsule */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-4/5 h-1.5 bg-slate-400/30 rounded-[100%] blur-[3px] opacity-0 group-hover:opacity-40 transition-opacity duration-300" />

        {/* The compact glass capsule (120-150px wide) */}
        <div className="relative flex items-center gap-2 bg-white/55 backdrop-blur-[12px] border border-white/70 shadow-[0_5px_20px_rgba(118,87,217,0.08),inset_0_1px_5px_rgba(255,255,255,0.9)] rounded-full pl-2 pr-4 py-1.5 transition-all duration-300 group-hover:bg-white/75 group-hover:border-primary/50 group-hover:shadow-[0_10px_30px_rgba(118,87,217,0.2)]">
          
          {/* Inner highlight */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/90 to-transparent pointer-events-none" />
          
          {/* Active Hover Glow */}
          <div className="absolute inset-0 rounded-full bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500 pointer-events-none" />

          <div className="relative w-7 h-7 rounded-full bg-gradient-to-br from-primary/15 to-[#5BC0EB]/15 flex items-center justify-center border border-primary/25 group-hover:from-primary/30 group-hover:to-[#5BC0EB]/30 transition-colors">
            <Icon className="w-3.5 h-3.5 text-primary group-hover:brightness-110 transition-all" />
          </div>
          <span className="relative text-[11px] font-bold text-primary tracking-wide">{title}</span>
        </div>
      </motion.div>
    </motion.div>
  );
};
