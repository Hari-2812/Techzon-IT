import React, { useState, useRef } from 'react';
import { Cloud, Database, LayoutGrid, Server, Brain, Shield, ArrowRightLeft, Cpu } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { DigitalCore, useReducedMotion } from '../visual-system';
import { cn } from '../../utils/cn';

const TECHNOLOGIES = [
  { id: 'frontend', name: 'FRONTEND', tools: 'React • Vue • Next.js', icon: LayoutGrid, gridArea: 'frontend' },
  { id: 'ai', name: 'AI & DATA', tools: 'Python • TensorFlow', icon: Brain, gridArea: 'ai' },
  { id: 'api', name: 'APIs', tools: 'GraphQL • REST', icon: ArrowRightLeft, gridArea: 'api' },
  { id: 'database', name: 'DATABASE', tools: 'MongoDB • PostgreSQL', icon: Database, gridArea: 'database' },
  { id: 'backend', name: 'BACKEND', tools: 'Node.js • Go • Java', icon: Server, gridArea: 'backend' },
  { id: 'cloud', name: 'CLOUD', tools: 'AWS • Azure • GCP', icon: Cloud, gridArea: 'cloud' },
  { id: 'security', name: 'SECURITY', tools: 'OAuth • JWT • IAM', icon: Shield, gridArea: 'security' }
];

const TechNode = ({ icon: Icon, name, tools, active, onHover, onLeave }) => (
  <div
    onMouseEnter={onHover}
    onMouseLeave={onLeave}
    className={cn(
      "relative flex flex-col items-center text-center justify-center p-4 w-full max-w-[260px] mx-auto min-h-[110px] rounded-2xl transition-all duration-300 cursor-default backdrop-blur-md border",
      active
        ? "bg-white border-[#FF8A3D] shadow-[0_8px_32px_rgba(255,138,61,0.15)] -translate-y-1 z-10"
        : "bg-white/90 border-[#5BC0EB]/40 shadow-[0_4px_20px_rgba(11,45,77,0.04)] hover:bg-white"
    )}
    style={{ transformStyle: 'preserve-3d' }}
  >
    <div className={cn(
      "w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors duration-300",
      active ? "bg-[#FF8A3D]/10 text-[#FF8A3D]" : "bg-primary/5 text-primary"
    )}>
      <Icon className="w-5 h-5" />
    </div>
    <h3 className="text-xs font-bold text-primary tracking-wider mb-1 uppercase">{name}</h3>
    <p className="text-[11px] font-medium text-muted-foreground tracking-wide break-words max-w-full">
      {tools}
    </p>
  </div>
);

export const AboutTechnology = () => {
  const [activeNode, setActiveNode] = useState(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section ref={containerRef} className="relative w-full py-24 md:py-32 bg-[#F8FAFC] border-t border-slate-200 overflow-hidden flex flex-col items-center">
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 md:px-8 max-w-6xl flex flex-col">
        
        <div className="text-center max-w-3xl mx-auto mb-16 relative z-30">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#1F2937] mb-6">
            Powered by Industry-Leading Technology
          </h2>
          <p className="font-sans text-base md:text-lg text-foreground max-w-2xl mx-auto font-medium leading-relaxed">
            We build scalable digital solutions using a robust, modern technology ecosystem.
          </p>
        </div>

        <div className="relative w-full mt-4 perspective-[2000px]">
          
          {/* Desktop Connection Lines SVG */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none z-0">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full" style={{ minHeight: '600px' }}>
              <defs>
                <linearGradient id="aboutGlowLine" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#5BC0EB" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#FF8A3D" stopOpacity={activeNode ? "0.6" : "0.2"} />
                  <stop offset="100%" stopColor="#0B2D4D" stopOpacity="0.8" />
                </linearGradient>
                <filter id="aboutGlow">
                  <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <g stroke="url(#aboutGlowLine)" strokeWidth="0.5" vectorEffect="non-scaling-stroke" fill="none" opacity={isInView ? 1 : 0} className="transition-opacity duration-500">
                <path d="M 50 10 Q 50 40 50 85" className={activeNode === 'frontend' ? 'opacity-100' : 'opacity-40'} />
                <path d="M 25 30 Q 40 50 50 85" className={activeNode === 'ai' ? 'opacity-100' : 'opacity-40'} />
                <path d="M 75 30 Q 60 50 50 85" className={activeNode === 'api' ? 'opacity-100' : 'opacity-40'} />
                <path d="M 25 55 Q 35 70 50 85" className={activeNode === 'database' ? 'opacity-100' : 'opacity-40'} />
                <path d="M 75 55 Q 65 70 50 85" className={activeNode === 'backend' ? 'opacity-100' : 'opacity-40'} />
                <path d="M 25 80 Q 40 82 50 85" className={activeNode === 'cloud' ? 'opacity-100' : 'opacity-40'} />
                <path d="M 75 80 Q 60 82 50 85" className={activeNode === 'security' ? 'opacity-100' : 'opacity-40'} />
              </g>
            </svg>
          </div>

          {/* Grid Layout */}
          <div className="relative z-10 flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-center justify-center transform-style-3d"
               style={{
                 gridTemplateAreas: `
                   ". frontend ."
                   "ai . api"
                   "database . backend"
                   "cloud core security"
                 `
               }}>
            
            {TECHNOLOGIES.map((tech) => (
              <div key={tech.id} className="w-full flex justify-center" style={{ gridArea: tech.gridArea }}>
                <TechNode 
                  icon={tech.icon} name={tech.name} tools={tech.tools}
                  active={activeNode === tech.id}
                  onHover={() => setActiveNode(tech.id)} onLeave={() => setActiveNode(null)}
                />
              </div>
            ))}

            {/* Layer 3: Techzon Core */}
            <div className="w-full flex justify-center mt-8 lg:mt-0 relative" style={{ gridArea: 'core' }}>
              <div className="relative flex flex-col items-center">
                <div className="md:hidden w-px h-12 bg-gradient-to-b from-[#5BC0EB]/30 to-primary absolute -top-12 left-1/2 -translate-x-1/2" />
                <div className={cn(
                  "relative w-32 h-32 rounded-full flex items-center justify-center bg-white shadow-[0_12px_40px_rgba(11,45,77,0.12)] border-4 border-primary transition-transform duration-700",
                  activeNode ? "scale-105" : "scale-100"
                )}>
                  <div className="absolute inset-2 rounded-full border border-[#FF8A3D]/30 animate-pulse bg-[#D9F2FF]/20" />
                  <Cpu className="w-10 h-10 text-primary" />
                </div>
                <div className="mt-4 px-6 py-2 bg-white/90 backdrop-blur-md rounded-full shadow-sm border border-slate-200">
                  <span className="text-sm font-extrabold text-primary tracking-widest uppercase">Techzon Core</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
