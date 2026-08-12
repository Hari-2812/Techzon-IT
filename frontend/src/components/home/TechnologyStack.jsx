import React, { useState, useEffect, useRef } from 'react';
import { Cloud, Database, LayoutGrid, Server, ArrowRightLeft } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { DigitalCore, useReducedMotion } from '../visual-system';
import { cn } from '../../utils/cn';

const TECHNOLOGIES = [
  { id: 'frontend', name: 'FRONTEND', tools: 'React • Next.js • Tailwind', icon: LayoutGrid, gridArea: 'frontend' },
  { id: 'api', name: 'API / SERVICES', tools: 'GraphQL • REST • gRPC', icon: ArrowRightLeft, gridArea: 'api' },
  { id: 'backend', name: 'BACKEND', tools: 'Node.js • Python • Go', icon: Server, gridArea: 'backend' },
  { id: 'database', name: 'DATABASE', tools: 'MongoDB • PostgreSQL', icon: Database, gridArea: 'database' },
  { id: 'cloud', name: 'CLOUD / INFRA', tools: 'AWS • Kubernetes • Docker', icon: Cloud, gridArea: 'cloud' }
];

const TechNode = ({ icon: Icon, name, tools, active, onHover, onLeave }) => {
  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={cn(
        "relative flex flex-col items-center text-center justify-center p-4 md:p-6 w-full max-w-[280px] mx-auto min-h-[120px] rounded-[20px] transition-all duration-500 cursor-pointer backdrop-blur-md border",
        active
          ? "bg-white/90 border-[#FF8A3D] shadow-[0_8px_32px_rgba(255,138,61,0.15)] scale-105 z-10"
          : "bg-white/75 border-[#5BC0EB]/30 shadow-[0_4px_24px_rgba(11,45,77,0.05)] hover:bg-white/85"
      )}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className={cn(
        "w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-colors duration-300",
        active ? "bg-[#FF8A3D]/10 text-[#FF8A3D]" : "bg-primary/5 text-primary"
      )}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-sm font-bold text-primary tracking-wide mb-1 uppercase">{name}</h3>
      <p className="text-xs font-medium text-muted-foreground tracking-wider break-words max-w-full">
        {tools}
      </p>
      
      {/* Inner highlight */}
      <div className={cn(
        "absolute inset-0 rounded-[20px] transition-opacity duration-500 pointer-events-none",
        active ? "opacity-100 bg-gradient-to-b from-[#5BC0EB]/5 to-transparent border border-[#5BC0EB]/20" : "opacity-0"
      )} />
    </div>
  );
};

export const TechnologyStack = () => {
  const [activeNode, setActiveNode] = useState(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section 
      ref={containerRef}
      className="relative w-full py-24 md:py-32 bg-[#F8FAFC] overflow-hidden font-sans border-t border-slate-200 flex flex-col items-center"
    >
      {/* Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-full max-w-[800px] h-full max-h-[800px] bg-gradient-to-tr from-[#D9F2FF]/40 to-transparent rounded-full blur-[120px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 md:px-8 max-w-6xl flex flex-col">
        
        {/* Layer 1: Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 relative z-30">
          <div className="text-xs font-bold text-primary uppercase tracking-widest mb-4">SYSTEM ARCHITECTURE</div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary mb-6">
            Technology Engine.
          </h2>
          <p className="font-sans text-base md:text-lg text-foreground max-w-2xl mx-auto font-medium leading-relaxed">
            Our vertical technology stack is engineered for maximum performance, security, and scalability from the ground up.
          </p>
        </div>

        {/* Layer 2 & 3: Architecture Grid */}
        <div className="relative w-full perspective-[2000px] mt-8">
          
          {/* Background SVG Connections (Desktop/Tablet) */}
          <div className="hidden md:block absolute inset-0 pointer-events-none z-0">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full" style={{ minHeight: '600px' }}>
              <defs>
                <linearGradient id="glowLine" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#5BC0EB" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#FF8A3D" stopOpacity={activeNode ? "0.6" : "0.2"} />
                  <stop offset="100%" stopColor="#0B2D4D" stopOpacity="0.8" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Paths to Core (Approximate centers based on Grid layout) */}
              <g stroke="url(#glowLine)" strokeWidth="0.5" vectorEffect="non-scaling-stroke" fill="none" className="transition-opacity duration-500" opacity={isInView ? 1 : 0}>
                {/* Frontend to Core */}
                <path d="M 50 10 Q 50 40 50 85" className={activeNode === 'frontend' ? 'opacity-100' : 'opacity-40'} />
                {/* API to Core */}
                <path d="M 25 35 Q 40 60 50 85" className={activeNode === 'api' ? 'opacity-100' : 'opacity-40'} />
                {/* Backend to Core */}
                <path d="M 75 35 Q 60 60 50 85" className={activeNode === 'backend' ? 'opacity-100' : 'opacity-40'} />
                {/* Database to Core */}
                <path d="M 25 60 Q 35 75 50 85" className={activeNode === 'database' ? 'opacity-100' : 'opacity-40'} />
                {/* Cloud to Core */}
                <path d="M 75 60 Q 65 75 50 85" className={activeNode === 'cloud' ? 'opacity-100' : 'opacity-40'} />
              </g>

              {/* Energy Particle */}
              {!prefersReducedMotion && isInView && (
                <circle r="1" fill="#FF8A3D" filter="url(#glow)">
                  <animateMotion 
                    dur="4s" 
                    repeatCount="indefinite" 
                    path="M 25 35 Q 40 60 50 85" 
                  />
                </circle>
              )}
            </svg>
          </div>

          {/* CSS Grid / Flex Layout */}
          <div className="relative z-10 flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-x-12 md:gap-y-16 items-center justify-center transform-style-3d"
               style={{
                 gridTemplateAreas: `
                   ". frontend ."
                   "api . backend"
                   "database . cloud"
                   ". core ."
                 `
               }}>
            
            {TECHNOLOGIES.map((tech) => (
              <div 
                key={tech.id} 
                className="w-full flex justify-center"
                style={{ gridArea: tech.gridArea }}
              >
                <TechNode 
                  icon={tech.icon}
                  name={tech.name}
                  tools={tech.tools}
                  active={activeNode === tech.id}
                  onHover={() => setActiveNode(tech.id)}
                  onLeave={() => setActiveNode(null)}
                />
              </div>
            ))}

            {/* Layer 3: Techzon Core */}
            <div 
              className="w-full flex justify-center mt-8 md:mt-0 relative"
              style={{ gridArea: 'core' }}
            >
              <div className="relative flex flex-col items-center">
                
                {/* Vertical connection line for mobile */}
                <div className="md:hidden w-px h-16 bg-gradient-to-b from-[#5BC0EB]/30 to-primary absolute -top-16 left-1/2 -translate-x-1/2" />
                
                <div className={cn(
                  "relative w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center bg-white shadow-[0_12px_40px_rgba(11,45,77,0.12)] border-4 border-primary transition-transform duration-700",
                  activeNode ? "scale-105" : "scale-100"
                )}>
                  {/* Inner glowing pulse */}
                  <div className="absolute inset-2 rounded-full border border-[#FF8A3D]/30 animate-pulse bg-[#D9F2FF]/20" />
                  
                  <DigitalCore active={!!activeNode} />
                </div>
                
                <div className="mt-4 px-6 py-2 bg-white/90 backdrop-blur-md rounded-full shadow-sm border border-slate-200">
                  <span className="text-sm font-extrabold text-primary tracking-widest uppercase">
                    Techzon Core
                  </span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologyStack;
