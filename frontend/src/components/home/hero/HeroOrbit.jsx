import React from 'react';
import { motion, useAnimationFrame, useMotionValue, useTransform } from 'framer-motion';

const OrbitParticle = ({ radiusX, radiusY, speed, initialAngle, tiltX, prefersReducedMotion }) => {
  const angle = useMotionValue(initialAngle);
  const tiltRad = (tiltX * Math.PI) / 180;

  const orbitX = useTransform(angle, a => Math.cos(a) * radiusX);
  const orbitY = useTransform(angle, a => Math.sin(a) * radiusY * Math.cos(tiltRad));
  const orbitZ = useTransform(angle, a => Math.sin(a) * radiusY * Math.sin(tiltRad));

  // Determine z-index and scaling based on depth
  const maxZ = radiusY * Math.sin(Math.abs(tiltRad)) || 1; 
  const scale = useTransform(orbitZ, [-maxZ, maxZ], [0.7, 1.2]);
  const opacity = useTransform(orbitZ, [-maxZ, 0, maxZ], [0.3, 0.7, 1]);
  const zIndex = useTransform(orbitZ, z => (z > 0 ? 25 : 15));

  useAnimationFrame((time, delta) => {
    if (prefersReducedMotion) return;
    const deltaAngle = (delta / 1000) * speed;
    angle.set(angle.get() + deltaAngle);
  });

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-gradient-to-r from-white to-[#5BC0EB] rounded-full blur-[0.5px] shadow-[0_0_8px_#0B2D4D,0_0_15px_#5BC0EB]"
      style={{
        x: orbitX,
        y: orbitY,
        scale,
        opacity,
        zIndex,
        transform: 'translate(-50%, -50%)'
      }}
    />
  );
};

export const HeroOrbit = ({ 
  width,
  height,
  rotateX, 
  rotateY, 
  rotateZ, 
  hasEnergy = false,
  energySpeed = 1,
  energyInitialAngle = 0,
  prefersReducedMotion
}) => {
  return (
    <>
      {/* Static Transparent Glass Ring representing the orbital path */}
      <div 
        className="absolute top-1/2 left-1/2 preserve-3d pointer-events-none z-20"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          transform: `translate(-50%, -50%) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`
        }}
      >
        <div className="w-full h-full rounded-[100%] border border-primary/20" />
        {/* Subtle glow on part of the ring */}
        <div className="absolute inset-0 rounded-[100%] border border-white/20 opacity-40 mask-radial-fade" />
      </div>

      {/* Energy Particle mathematically orbiting along the exact same path */}
      {hasEnergy && !prefersReducedMotion && (
        <OrbitParticle 
          radiusX={width / 2} 
          radiusY={height / 2} 
          speed={energySpeed} 
          initialAngle={energyInitialAngle} 
          tiltX={rotateX} 
          prefersReducedMotion={prefersReducedMotion} 
        />
      )}
    </>
  );
};
