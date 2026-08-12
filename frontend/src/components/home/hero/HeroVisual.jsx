import React, { useRef, useEffect, useState } from 'react';
import { useMotionValue } from 'framer-motion';
import { HeroCore } from './HeroCore';
import { HeroOrbit } from './HeroOrbit';
import { HeroTechnologyNode } from './HeroTechnologyNode';
import { Cloud, Database, Network, Shield, Layout, Smartphone } from 'lucide-react';
import './Hero.css';

const useReducedMotion = () => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setMatches(mediaQuery.matches);
    const handler = (e) => setMatches(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);
  return matches;
};

export const HeroVisual = () => {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const handleMouseMove = (e) => {
    if (prefersReducedMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    if (prefersReducedMotion) return;
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full flex justify-center lg:justify-end items-center mt-12 lg:mt-0 perspective-[1200px] preserve-3d"
    >
      
      {/* Strict Visual Safe Area / Canvas (520-600px range) */}
      <div className="relative w-full max-w-[420px] h-[450px] lg:max-w-[580px] lg:h-[520px] preserve-3d">
        
        {/* Background Atmospheric Lighting within the canvas */}
        <div className="absolute inset-0 pointer-events-none preserve-3d -z-10">
          <div className="absolute top-[15%] left-[15%] w-[250px] h-[250px] bg-primary/[0.08] rounded-full blur-[60px]" style={{ transform: 'translateZ(-80px)' }} />
          <div className="absolute bottom-[15%] right-[15%] w-[250px] h-[250px] bg-[#5BC0EB]/[0.08] rounded-full blur-[60px]" style={{ transform: 'translateZ(-60px)' }} />
        </div>

        {/* 3D Scene Elements */}
        
        {/* Orbital Rings representing the mathematical paths */}
        {/* Orbit 1: horizontal / slightly tilted */}
        <HeroOrbit width={320} height={130} rotateX={65} rotateY={0} rotateZ={0} hasEnergy={true} energySpeed={0.8} energyInitialAngle={0} prefersReducedMotion={prefersReducedMotion} />
        {/* Orbit 2: diagonal */}
        <HeroOrbit width={290} height={160} rotateX={55} rotateY={25} rotateZ={-20} hasEnergy={true} energySpeed={-0.6} energyInitialAngle={Math.PI / 2} prefersReducedMotion={prefersReducedMotion} />
        {/* Orbit 3: opposite diagonal */}
        <HeroOrbit width={350} height={115} rotateX={75} rotateY={-30} rotateZ={25} hasEnergy={true} energySpeed={1} energyInitialAngle={Math.PI} prefersReducedMotion={prefersReducedMotion} />
        
        {/* Central 3D Core */}
        <HeroCore mouseX={mouseX} mouseY={mouseY} prefersReducedMotion={prefersReducedMotion} />

        {/* 
          Technology Modules (Capsules) orbiting mathematically.
          They are assigned to the radii and tilts matching the rings above.
        */}
        
        {/* Orbit 1 Nodes (rX: 160, rY: 65, tiltX: 65) */}
        <HeroTechnologyNode icon={Database} title="AI & Data" radiusX={160} radiusY={65} tiltX={65} speed={0.8} initialAngle={0} mouseX={mouseX} mouseY={mouseY} prefersReducedMotion={prefersReducedMotion} />
        <HeroTechnologyNode icon={Cloud} title="Cloud Solutions" radiusX={160} radiusY={65} tiltX={65} speed={0.8} initialAngle={Math.PI} mouseX={mouseX} mouseY={mouseY} prefersReducedMotion={prefersReducedMotion} />
        
        {/* Orbit 2 Nodes (rX: 145, rY: 80, tiltX: 55) */}
        <HeroTechnologyNode icon={Network} title="Web Engineering" radiusX={145} radiusY={80} tiltX={55} speed={-0.6} initialAngle={Math.PI / 2} mouseX={mouseX} mouseY={mouseY} prefersReducedMotion={prefersReducedMotion} />
        <HeroTechnologyNode icon={Smartphone} title="Mobile Apps" radiusX={145} radiusY={80} tiltX={55} speed={-0.6} initialAngle={(3 * Math.PI) / 2} mouseX={mouseX} mouseY={mouseY} prefersReducedMotion={prefersReducedMotion} />
        
        {/* Orbit 3 Nodes (rX: 175, rY: 57.5, tiltX: 75) */}
        <HeroTechnologyNode icon={Shield} title="Cyber Security" radiusX={175} radiusY={57.5} tiltX={75} speed={1} initialAngle={Math.PI / 4} mouseX={mouseX} mouseY={mouseY} prefersReducedMotion={prefersReducedMotion} />
        <HeroTechnologyNode icon={Layout} title="UI/UX Design" radiusX={175} radiusY={57.5} tiltX={75} speed={1} initialAngle={(5 * Math.PI) / 4} mouseX={mouseX} mouseY={mouseY} prefersReducedMotion={prefersReducedMotion} />
        
      </div>
    </div>
  );
};
