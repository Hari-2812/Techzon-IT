import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tilt3D } from '../../3d/Tilt3D';
import { DepthLayer } from '../../3d/DepthLayer';
import { DigitalCore, DigitalNode, EnergyPath, EnergyPathDefs, OrbitRing, useReducedMotion } from '../../visual-system';
import { Cloud, Database, Cpu, Network, LayoutGrid, Shield, Zap, ChevronRight, ChevronLeft, Server as ServerIcon } from 'lucide-react';
import { cn } from '../../../utils/cn';

// Sample projects
const PROJECTS = [
  {
    id: 1,
    title: "Quantum Cloud Architecture",
    category: "Enterprise Infrastructure",
    description: "A highly resilient, globally distributed cloud architecture designed for zero downtime and infinite horizontal scaling.",
    tech: [
      { name: "Kubernetes", icon: Network, angle: 0 },
      { name: "Go", icon: Cpu, angle: 72 },
      { name: "AWS", icon: Cloud, angle: 144 },
      { name: "gRPC", icon: Zap, angle: 216 },
      { name: "PostgreSQL", icon: Database, angle: 288 }
    ],
    metrics: ["99.999% Uptime", "50ms Latency", "10k+ TPS"],
    accent: "from-[#5BC0EB] to-primary"
  },
  {
    id: 2,
    title: "Neural Threat Detection",
    category: "Cybersecurity Systems",
    description: "AI-driven autonomous security system that preemptively identifies and mitigates zero-day vulnerabilities in real-time.",
    tech: [
      { name: "Python", icon: Cpu, angle: 0 },
      { name: "TensorFlow", icon: Network, angle: 90 },
      { name: "Rust", icon: Shield, angle: 180 },
      { name: "Kafka", icon: Database, angle: 270 }
    ],
    metrics: ["<10ms Response", "Zero Breaches", "1M+ Events/s"],
    accent: "from-[#FF8A3D] to-primary"
  },
  {
    id: 3,
    title: "Global Supply Chain Ledger",
    category: "Distributed Systems",
    description: "Immutable ledger tracking logistics across 40 countries, providing real-time visibility and cryptographic verification.",
    tech: [
      { name: "Solidity", icon: Shield, angle: 45 },
      { name: "Node.js", icon: ServerIcon, angle: 135 },
      { name: "React", icon: LayoutGrid, angle: 225 },
      { name: "PostgreSQL", icon: Database, angle: 315 }
    ],
    metrics: ["40+ Countries", "Real-time Sync", "100% Traceable"],
    accent: "from-primary to-[#5BC0EB]"
  }
];


export const ProjectShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredTech, setHoveredTech] = useState(null);
  const prefersReducedMotion = useReducedMotion();
  
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % PROJECTS.length);
    setHoveredTech(null);
  };
  
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
    setHoveredTech(null);
  };

  const project = PROJECTS[currentIndex];

  return (
    <section className="relative w-full py-24 lg:py-32 bg-white overflow-hidden border-t border-slate-100">
      
      {/* Cinematic Background (Light) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-br from-primary/5 via-[#5BC0EB]/5 to-transparent rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
          <div>
            <h2 className="text-sm font-mono font-bold tracking-widest text-primary mb-2 uppercase">Engineered Products</h2>
            <h3 className="font-display text-4xl md:text-5xl font-bold text-primary">Project <span className="text-gradient-galaxy">Worlds</span></h3>
          </div>
          
          {/* Controls */}
          <div className="flex items-center gap-6 mt-8 md:mt-0">
            <button 
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-slate-200 bg-white/80 backdrop-blur-md flex items-center justify-center hover:bg-white hover:border-primary/30 transition-all text-foreground shadow-sm hover:shadow-md group"
            >
              <ChevronLeft className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
            </button>
            <div className="font-mono text-lg text-muted-foreground font-bold tracking-widest">
              <span className="text-primary">0{currentIndex + 1}</span> / 0{PROJECTS.length}
            </div>
            <button 
              onClick={handleNext}
              className="w-12 h-12 rounded-full border border-slate-200 bg-white/80 backdrop-blur-md flex items-center justify-center hover:bg-white hover:border-primary/30 transition-all text-foreground shadow-sm hover:shadow-md group"
            >
              <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
            </button>
          </div>
        </div>

        {/* 3D Showcase Area - Project Worlds */}
        <div className="relative w-full h-[600px] lg:h-[700px] mt-12 flex items-center justify-center perspective-[2000px]">
          <Tilt3D disabled={prefersReducedMotion} max={10} className="w-full h-full max-w-[1000px] mx-auto">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)", zIndex: -1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="relative w-full h-full flex items-center justify-center"
              >
                
                {/* SVG Connections Layer */}
                <DepthLayer depth={0} className="absolute inset-0 w-full h-full pointer-events-none">
                  <svg className="w-full h-full" preserveAspectRatio="none">
                    <EnergyPathDefs />
                    {project.tech.map((t, idx) => {
                      // Custom positions for a 3D branching look instead of a perfect circle
                      const positions = [
                        { x: 30, y: 25 },
                        { x: 70, y: 20 },
                        { x: 20, y: 70 },
                        { x: 80, y: 65 },
                        { x: 50, y: 85 }
                      ];
                      const pos = positions[idx % positions.length];
                      const isActive = hoveredTech === t.name;
                      
                      return (
                        <EnergyPath
                          key={`path-${t.name}`}
                          pathData={`M 50% 50% Q ${50} ${pos.y} ${pos.x}% ${pos.y}%`}
                          active={isActive}
                          animated={!prefersReducedMotion}
                        />
                      );
                    })}
                  </svg>
                </DepthLayer>

                {/* Background Atmosphere Layers instead of Orbits */}
                <DepthLayer depth={-20} className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="w-[60%] h-[60%] border border-slate-100 rounded-3xl transform rotate-3 opacity-30 shadow-[0_0_50px_rgba(118,87,217,0.05)]" />
                  <div className="absolute w-[80%] h-[80%] border border-slate-100 rounded-[40px] transform -rotate-2 opacity-20 shadow-[0_0_50px_rgba(6,182,212,0.05)]" />
                </DepthLayer>

                {/* Project Central Core (Light Theme) */}
                <DepthLayer depth={30} className="absolute z-30">
                  <div className="relative group flex items-center justify-center">
                    {/* Hover glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-[#5BC0EB] rounded-full blur-[40px] opacity-10 group-hover:opacity-20 transition-opacity duration-700" />
                    
                    <div className="relative bg-white/90 backdrop-blur-2xl border border-slate-200 p-8 md:p-12 rounded-full w-[280px] h-[280px] md:w-[320px] md:h-[320px] flex flex-col items-center justify-center text-center shadow-[0_20px_60px_rgba(118,87,217,0.1),inset_0_2px_20px_rgba(255,255,255,1)] transition-transform duration-700 group-hover:scale-105 group-hover:border-primary/30">
                      <div className="absolute top-8 px-4 py-1 bg-muted border border-slate-200 rounded-full text-[10px] font-bold tracking-widest text-primary">
                        {project.category}
                      </div>
                      
                      <h4 className="font-display text-2xl md:text-3xl font-bold text-primary mb-4 mt-6 leading-tight">
                        {project.title}
                      </h4>
                      
                      <p className="text-sm text-foreground font-sans leading-relaxed line-clamp-3 font-medium">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </DepthLayer>

                {/* Branching Technology Nodes */}
                {project.tech.map((t, idx) => {
                  const positions = [
                    { x: 30, y: 25 },
                    { x: 70, y: 20 },
                    { x: 20, y: 70 },
                    { x: 80, y: 65 },
                    { x: 50, y: 85 }
                  ];
                  const pos = positions[idx % positions.length];
                  const isActive = hoveredTech === t.name;
                  
                  return (
                    <DepthLayer 
                      key={t.name}
                      depth={isActive ? 80 : 50 + (idx * 5)}
                      className="absolute z-40 transition-all duration-500"
                      style={{ 
                        left: `${pos.x}%`, 
                        top: `${pos.y}%`, 
                        transform: `translate(-50%, -50%) translateZ(${isActive ? '30px' : '0px'})`,
                        opacity: hoveredTech && !isActive ? 0.4 : 1
                      }}
                    >
                      <DigitalNode
                        icon={t.icon}
                        title={t.name}
                        active={isActive}
                        onHoverStart={() => setHoveredTech(t.name)}
                        onHoverEnd={() => setHoveredTech(null)}
                      />
                    </DepthLayer>
                  );
                })}

                {/* Metrics Panel (Floating off to the side) */}
                <DepthLayer depth={80} className="absolute right-[5%] bottom-[10%] z-50 hidden md:block">
                  <div className="bg-white/90 backdrop-blur-xl border border-slate-200 p-6 rounded-2xl shadow-[0_20px_40px_rgba(118,87,217,0.1)] min-w-[220px]">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-primary mb-4 block">LIVE METRICS</span>
                    <div className="space-y-4">
                      {project.metrics.map((m, i) => (
                        <div key={i} className="flex flex-col gap-1.5">
                          <span className="text-sm font-bold text-primary">{m}</span>
                          <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden shadow-inner">
                            <div className={`h-full bg-gradient-to-r ${project.accent}`} style={{ width: `${60 + Math.random() * 40}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </DepthLayer>

              </motion.div>
            </AnimatePresence>

          </Tilt3D>
        </div>

      </div>
    </section>
  );
};
