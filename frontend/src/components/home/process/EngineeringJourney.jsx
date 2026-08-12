import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Search, Target, Layers, PenTool, Code2, ShieldCheck, Rocket, Activity, TrendingUp } from 'lucide-react';
import { Tilt3D } from '../../3d/Tilt3D';
import { DepthLayer } from '../../3d/DepthLayer';
import { EnergyPathDefs, useReducedMotion } from '../../visual-system';
import { cn } from '../../../utils/cn';

const STAGES = [
  { id: 'discover', name: "DISCOVER", description: "Understand business goals.", icon: Search, color: "from-primary to-[#5BC0EB]" },
  { id: 'define', name: "DEFINE", description: "Identify requirements.", icon: Target, color: "from-primary to-[#5BC0EB]" },
  { id: 'architect', name: "ARCHITECT", description: "Design scalable foundation.", icon: Layers, color: "from-[#5BC0EB] to-primary" },
  { id: 'design', name: "DESIGN", description: "Create intuitive UX.", icon: PenTool, color: "from-[#5BC0EB] to-primary" },
  { id: 'engineer', name: "ENGINEER", description: "Build reliable software.", icon: Code2, color: "from-[#5BC0EB] to-[#5BC0EB]" },
  { id: 'test', name: "TEST", description: "Validate quality.", icon: ShieldCheck, color: "from-[#5BC0EB] to-[#5BC0EB]" },
  { id: 'deploy', name: "DEPLOY", description: "Launch solution.", icon: Rocket, color: "from-[#5BC0EB] to-[#FF8A3D]" },
  { id: 'monitor', name: "MONITOR", description: "Track performance.", icon: Activity, color: "from-[#FF8A3D] to-[#FF8A3D]" },
  { id: 'grow', name: "GROW", description: "Scale product.", icon: TrendingUp, color: "from-[#FF8A3D] to-[#E91E63]" }
];

// Asymmetric, elegant 3D route layout for desktop
const desktopCoords = [
  { x: 15, y: 85 }, // discover
  { x: 25, y: 70 }, // define
  { x: 40, y: 80 }, // architect
  { x: 50, y: 55 }, // design
  { x: 65, y: 65 }, // engineer
  { x: 75, y: 40 }, // test
  { x: 60, y: 25 }, // deploy
  { x: 75, y: 15 }, // monitor
  { x: 90, y: 20 }  // grow
];

// Vertical layout for mobile
const mobileCoords = STAGES.map((_, i) => ({
  x: 50,
  y: 5 + (i * 11)
}));

export const EngineeringJourney = () => {
  const [activeStage, setActiveStage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { margin: "0px" });

  useEffect(() => {
    if (prefersReducedMotion || !isInView) return;
    const interval = setInterval(() => {
      setActiveStage(prev => (prev + 1) % STAGES.length);
    }, 4000); // Slower, premium transition
    return () => clearInterval(interval);
  }, [prefersReducedMotion, isInView]);

  const coords = isMobile ? mobileCoords : desktopCoords;

  const generatePath = () => {
    let d = `M ${coords[0].x} ${coords[0].y} `;
    for (let i = 1; i < coords.length; i++) {
      if (!isMobile) {
        const prev = coords[i-1];
        const curr = coords[i];
        const midX = (prev.x + curr.x) / 2;
        d += `C ${midX} ${prev.y}, ${midX} ${curr.y}, ${curr.x} ${curr.y} `;
      } else {
        d += `L ${coords[i].x} ${coords[i].y} `;
      }
    }
    return d;
  };

  const generateActivePath = () => {
    if (activeStage === 0) return `M ${coords[0].x} ${coords[0].y} L ${coords[0].x} ${coords[0].y}`;
    let d = `M ${coords[0].x} ${coords[0].y} `;
    for (let i = 1; i <= activeStage; i++) {
      if (!isMobile) {
        const prev = coords[i-1];
        const curr = coords[i];
        const midX = (prev.x + curr.x) / 2;
        d += `C ${midX} ${prev.y}, ${midX} ${curr.y}, ${curr.x} ${curr.y} `;
      } else {
        d += `L ${coords[i].x} ${coords[i].y} `;
      }
    }
    return d;
  };

  return (
    <section ref={containerRef} className="relative w-full min-h-[500px] md:min-h-screen bg-white overflow-hidden py-16 md:py-32 flex flex-col font-sans border-t border-slate-100">
      
      {/* Background Ambience (Strict Light Theme) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-[20%] left-[20%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] right-[20%] w-[800px] h-[800px] bg-[#5BC0EB]/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 flex flex-col h-full">
        
        {/* Header */}
        <div className="text-center mb-20 relative z-30">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary mb-6"
          >
            Digital <span className="text-gradient-galaxy">Lifecycle</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-sans text-lg md:text-xl text-foreground max-w-2xl mx-auto font-medium"
          >
            From concept to scalable product. Watch how energy flows through our engineering pipeline.
          </motion.p>
        </div>
        
        {/* Main 3D Journey Container */}
        <div className={cn(
          "relative w-full flex-1 perspective-[2000px]",
          isMobile ? "h-[1400px]" : "h-[700px]"
        )}>
          <Tilt3D 
            disabled={isMobile || prefersReducedMotion} 
            max={8} 
            className="w-full h-full"
          >
            
            {/* SVG Background Path Layer */}
            <DepthLayer depth={0} className="absolute inset-0 w-full h-full pointer-events-none z-10">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                <EnergyPathDefs />
                
                {/* Base Faint Path */}
                <path 
                  d={generatePath()} 
                  fill="none" 
                  stroke="#F1F5F9" 
                  strokeWidth="0.8" 
                  vectorEffect="non-scaling-stroke"
                />
                
                {/* Active Energy Flow */}
                {!prefersReducedMotion && activeStage > 0 && (
                  <motion.path 
                    key={`active-route-${activeStage}`}
                    d={generateActivePath()} 
                    fill="none" 
                    stroke="url(#active-line-gradient)" 
                    strokeWidth="1.2" 
                    filter="url(#glow-line)"
                    vectorEffect="non-scaling-stroke"
                    initial={{ pathLength: (activeStage - 1) / activeStage }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />
                )}
              </svg>
            </DepthLayer>

            {/* Traveling Energy Particle */}
            {!prefersReducedMotion && (
              <DepthLayer depth={60} className="absolute inset-0 pointer-events-none z-40">
                <motion.div
                  className="absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-50 mix-blend-screen"
                  animate={{
                    left: `${coords[activeStage].x}%`,
                    top: `${coords[activeStage].y}%`,
                  }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                >
                  <div className="absolute inset-0 rounded-full bg-cyan-400 blur-[8px] opacity-80" />
                  <div className="absolute w-3 h-3 bg-white rounded-full shadow-[0_0_15px_rgba(6,182,212,1)]" />
                  <div className="absolute w-12 h-12 rounded-full border border-cyan-400/30 animate-ping" />
                </motion.div>
              </DepthLayer>
            )}

            {/* 3D Lifecycle Nodes */}
            {STAGES.map((stage, idx) => {
              const isActive = idx === activeStage;
              const isPast = idx < activeStage;
              const nodeDepth = isActive ? 80 : (20 + (idx % 3) * 15);
              const Icon = stage.icon;
              
              return (
                <DepthLayer
                  key={stage.id}
                  depth={isMobile ? 0 : nodeDepth}
                  className="absolute z-30 transition-all duration-1000"
                  style={{ 
                    left: `${coords[idx].x}%`, 
                    top: `${coords[idx].y}%`,
                  }}
                >
                  <div 
                    className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer group"
                    onClick={() => setActiveStage(idx)}
                  >
                    
                    {/* Atmospheric Back Glow */}
                    <div className={cn(
                      "absolute inset-0 rounded-full blur-[30px] transition-all duration-700 -z-10",
                      isActive ? `bg-gradient-to-br ${stage.color} opacity-20 scale-150` : "opacity-0 scale-100"
                    )} />

                    <div className={cn(
                      "relative flex flex-col items-center bg-white/95 backdrop-blur-2xl p-4 md:p-6 rounded-[24px] border-2 shadow-[0_20px_40px_rgba(118,87,217,0.08)] transition-all duration-700",
                      isMobile ? "w-[240px]" : "w-[150px] md:w-[170px]",
                      isActive 
                        ? 'border-primary/30 scale-105 shadow-[0_30px_60px_rgba(118,87,217,0.15)]' 
                        : (isPast ? 'border-slate-200' : 'border-slate-100 hover:border-slate-200 opacity-70 hover:opacity-100')
                    )}>
                      
                      {/* Icon Core */}
                      <div className={cn(
                        "w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center mb-4 border transition-all duration-700",
                        isActive 
                          ? `bg-gradient-to-br ${stage.color} border-white/20 shadow-inner`
                          : "bg-muted border-slate-100 group-hover:bg-muted"
                      )}>
                        <Icon className={cn(
                          "w-6 h-6 transition-colors duration-700",
                          isActive ? "text-white" : "text-muted-foreground group-hover:text-foreground"
                        )} />
                      </div>

                      {/* Stage Number */}
                      <div className="absolute top-4 right-4 md:top-5 md:right-5 text-[10px] font-mono font-bold text-muted-foreground">
                        0{idx + 1}
                      </div>

                      {/* Text Content */}
                      <div className="text-center w-full">
                        <h3 className={cn(
                          "text-sm font-bold tracking-widest mb-1.5 transition-colors duration-700",
                          isActive ? "text-primary" : "text-foreground"
                        )}>
                          {stage.name}
                        </h3>
                        <p className={cn(
                          "text-xs font-medium leading-relaxed transition-all duration-700",
                          isActive ? "text-foreground" : "text-muted-foreground"
                        )}>
                          {stage.description}
                        </p>
                      </div>

                    </div>
                  </div>
                </DepthLayer>
              );
            })}
            
          </Tilt3D>
        </div>
      </div>
    </section>
  );
};
