import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion';
import { LayoutGrid, Server, Database, Cloud, Network, Cpu, ShieldCheck, Zap, TrendingUp } from 'lucide-react';
import { Tilt3D } from '../../../3d/Tilt3D';
import { DepthLayer } from '../../../3d/DepthLayer';

const STACK_LAYERS = [
  { id: 'frontend', name: 'FRONTEND', desc: 'React, Next.js, Tailwind', icon: LayoutGrid, colorFrom: '#5BC0EB', colorTo: '#0B2D4D', x: 400, y: 100, z: 50 },
  { id: 'api', name: 'API GATEWAY', desc: 'GraphQL, REST, gRPC', icon: Network, colorFrom: '#0B2D4D', colorTo: '#5BC0EB', x: 180, y: 240, z: 30 },
  { id: 'backend', name: 'BACKEND', desc: 'Node.js, Go, Python', icon: Server, colorFrom: '#FF8A3D', colorTo: '#0B2D4D', x: 620, y: 240, z: 45 },
  { id: 'database', name: 'DATA LAYER', desc: 'PostgreSQL, MongoDB', icon: Database, colorFrom: '#E91E63', colorTo: '#FF8A3D', x: 120, y: 420, z: 20 },
  { id: 'cloud', name: 'CLOUD INFRA', desc: 'AWS, Kubernetes', icon: Cloud, colorFrom: '#0B2D4D', colorTo: '#5BC0EB', x: 680, y: 420, z: 35 },
];

const ENGINE_FEATURES = [
  { icon: ShieldCheck, title: 'Enterprise Grade', desc: 'Built with security, compliance and reliability at the core.' },
  { icon: Zap, title: 'High Performance', desc: 'Optimized for speed, efficiency and real-world scale.' },
  { icon: TrendingUp, title: 'Scalable Architecture', desc: 'Designed to grow with your business without limits.' },
  { icon: Network, title: 'Seamless Integration', desc: 'Modern APIs and services that connect everything.' }
];

export const TechnologyStackSection = () => {
  const [hoveredNode, setHoveredNode] = useState(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });
  const [isMobile, setIsMobile] = useState(false);

  // Parallax Setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const bgX = useTransform(smoothX, [-1, 1], [-2, 2]);
  const bgY = useTransform(smoothY, [-1, 1], [-2, 2]);
  const coreX = useTransform(smoothX, [-1, 1], [-4, 4]);
  const coreY = useTransform(smoothY, [-1, 1], [-4, 4]);
  const nodeX = useTransform(smoothX, [-1, 1], [-8, 8]);
  const nodeY = useTransform(smoothY, [-1, 1], [-8, 8]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e) => {
    if (isMobile || !containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    mouseX.set(x * 2 - 1);
    mouseY.set(y * 2 - 1);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="section-padding bg-[#FFFFFF] overflow-hidden font-sans border-t border-slate-100 perspective-container relative"
    >
      {/* Background Ambience */}
      <motion.div style={!isMobile ? { x: bgX, y: bgY } : {}} className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-[radial-gradient(circle_at_center,rgba(118,87,217,0.02)_0%,rgba(6,182,212,0.01)_40%,transparent_70%)] rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.015]" />
      </motion.div>

      <div className="container-global relative z-10 h-full flex flex-col items-center">
        
        {/* Header Section */}
        <div className="text-center max-w-[650px] mx-auto mb-16 lg:mb-20 relative z-30 flex flex-col items-center">
          <div className="text-[11px] md:text-xs font-bold text-primary uppercase tracking-widest mb-3 md:mb-4">
            SYSTEM ARCHITECTURE
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-[56px] font-bold tracking-tight text-primary mb-6 leading-tight">
            Technology <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#5BC0EB]">Engine.</span>
          </h2>
          <p className="font-sans text-base md:text-lg text-foreground font-medium leading-relaxed max-w-[560px]">
            Our vertical technology stack is engineered for maximum performance, security, and scalability from the ground up.
          </p>
        </div>

        {/* =======================================================
            DESKTOP 3D ARCHITECTURE (Hidden on Mobile)
        ======================================================= */}
        <div className="hidden lg:flex relative w-full max-w-[900px] mx-auto h-[650px] perspective-[1200px] items-center justify-center">
          <Tilt3D max={4} depth={10} className="w-full h-full preserve-3d">
            
            {/* SVG Connections */}
            <DepthLayer depth={0} className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 preserve-3d">
              <svg viewBox="0 0 800 650" className="w-full h-full overflow-visible opacity-70">
                <defs>
                  {STACK_LAYERS.map(node => (
                    <linearGradient key={`grad-${node.id}`} id={`grad-${node.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={node.colorFrom} />
                      <stop offset="100%" stopColor={node.colorTo} />
                    </linearGradient>
                  ))}
                  <linearGradient id="activeEnergy" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#5BC0EB" />
                    <stop offset="100%" stopColor="#0B2D4D" />
                  </linearGradient>
                </defs>
                
                {STACK_LAYERS.map((node, i) => {
                  const isHovered = hoveredNode === node.id;
                  const isDimmed = hoveredNode && !isHovered;
                  // Core is at (400, 520)
                  const pathD = `M ${node.x} ${node.y} C ${node.x} 520, 400 ${node.y}, 400 520`;
                  
                  return (
                    <g key={`path-${node.id}`} style={{ opacity: isDimmed ? 0.3 : 1 }} className="transition-opacity duration-300">
                      {/* Base static path */}
                      <path 
                        d={pathD} 
                        fill="none" 
                        stroke={`url(#grad-${node.id})`} 
                        strokeWidth={isHovered ? "3" : "1.5"} 
                        strokeOpacity={isHovered ? 0.8 : 0.4}
                        className="transition-all duration-500"
                      />
                      {/* Animated traveling particle */}
                      <motion.path
                        d={pathD}
                        fill="none"
                        stroke="url(#activeEnergy)"
                        strokeWidth="4"
                        strokeDasharray="0 1"
                        animate={isInView ? { pathLength: [0, 1] } : { pathLength: 0 }}
                        transition={{ 
                          duration: isHovered ? 1.5 : 3 + (i % 2), 
                          repeat: Infinity, 
                          ease: "easeInOut",
                          delay: i * 0.4
                        }}
                        className={`drop-shadow-[0_0_8px_rgba(118,87,217,0.8)] ${isHovered ? 'opacity-100' : 'opacity-50'}`}
                        style={{ strokeLinecap: 'round' }}
                      />
                    </g>
                  );
                })}
              </svg>
            </DepthLayer>

            {/* Central Technology Engine Hub (Z=80) */}
            <DepthLayer depth={0} className="absolute inset-0 flex items-center justify-center pointer-events-none preserve-3d">
              <motion.div style={{ x: coreX, y: coreY }} className="absolute left-[400px] top-[520px] transform -translate-x-1/2 -translate-y-1/2 translate-z-[80px] flex items-center justify-center preserve-3d w-64 h-64">
                
                {/* Outer Glow */}
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl" />
                
                {/* Orbital Rings */}
                <motion.div 
                  animate={isInView ? { rotateZ: 360, rotateX: 10, rotateY: 15 } : { rotateZ: 0, rotateX: 10, rotateY: 15 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[5%] rounded-full border border-[#5BC0EB]/30 border-dashed opacity-50 preserve-3d"
                />
                <motion.div 
                  animate={isInView ? { rotateZ: -360, rotateX: -15, rotateY: 10 } : { rotateZ: 0, rotateX: -15, rotateY: 10 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[15%] rounded-full border-2 border-primary/20 preserve-3d"
                />
                
                {/* Glass CPU Core */}
                <div className="w-36 h-36 rounded-full bg-white/90 border border-white shadow-[0_20px_50px_rgba(36,18,82,0.1),inset_0_2px_10px_rgba(255,255,255,1)] flex flex-col items-center justify-center relative preserve-3d overflow-hidden backdrop-blur-xl">
                  <motion.div 
                    animate={isInView ? { opacity: [0.3, 0.6, 0.3], scale: [0.95, 1.05, 0.95] } : { opacity: 0.3, scale: 0.95 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-gradient-to-tr from-primary to-[#5BC0EB] blur-lg mix-blend-overlay opacity-30"
                  />
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-[#5BC0EB] flex items-center justify-center mb-1.5 shadow-[inset_0_2px_5px_rgba(255,255,255,0.3)] relative z-10">
                    <Cpu className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-primary text-center relative z-10 leading-tight">
                    Techzon<br/>Engine
                  </span>
                </div>

              </motion.div>
            </DepthLayer>

            {/* Floating Technology Cards */}
            <DepthLayer depth={0} className="absolute inset-0 pointer-events-none preserve-3d">
              <motion.div style={{ x: nodeX, y: nodeY }} className="w-full h-full relative preserve-3d">
                {STACK_LAYERS.map((node) => {
                  const isHovered = hoveredNode === node.id;
                  const isDimmed = hoveredNode && !isHovered;
                  
                  const leftPercent = (node.x / 800) * 100;
                  const topPercent = (node.y / 650) * 100;

                  return (
                    <div 
                      key={node.id} 
                      className="absolute pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 preserve-3d transition-opacity duration-300"
                      style={{ 
                        left: `${leftPercent}%`, 
                        top: `${topPercent}%`,
                        transform: `translate(-50%, -50%) translateZ(${node.z}px)`,
                        opacity: isDimmed ? 0.4 : 1
                      }}
                      onMouseEnter={() => setHoveredNode(node.id)}
                      onMouseLeave={() => setHoveredNode(null)}
                    >
                      <div className={`w-48 flex flex-col items-center p-4 rounded-[20px] transition-all duration-300 cursor-default text-center
                        ${isHovered 
                          ? 'bg-white border-primary/40 shadow-[0_20px_40px_rgba(118,87,217,0.15)] scale-[1.03] translate-z-10' 
                          : 'bg-white/80 border-primary/10 shadow-[0_10px_20px_rgba(36,18,82,0.04)] scale-100 backdrop-blur-xl'
                        } border`}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2.5 transition-colors duration-300 shadow-inner
                          ${isHovered ? 'bg-gradient-to-br from-primary to-[#5BC0EB] text-white' : 'bg-muted border border-slate-100 text-primary'}
                        `}>
                          <node.icon className="w-5 h-5" />
                        </div>
                        
                        <h4 className={`text-[11px] font-bold tracking-widest uppercase mb-1 leading-tight transition-colors ${isHovered ? 'text-primary' : 'text-primary'}`}>
                          {node.name}
                        </h4>
                        <p className="text-[10px] font-medium text-[#5B5964] leading-tight">
                          {node.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </DepthLayer>

          </Tilt3D>
        </div>

        {/* =======================================================
            MOBILE VERTICAL FLOW (Hidden on Desktop)
        ======================================================= */}
        <div className="flex lg:hidden flex-col items-center w-full max-w-sm mx-auto mt-4 gap-6">
          
          <div className="flex flex-col gap-4 w-full relative">
            <div className="absolute left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-primary to-[#5BC0EB] opacity-20 -translate-x-1/2 rounded-full" />
            
            {STACK_LAYERS.slice(0, 3).map((node) => (
              <div key={node.id} className="relative z-10 glass-panel w-full p-4 border border-primary/10 bg-white/90 rounded-2xl flex items-center gap-4 shadow-sm backdrop-blur-md">
                <div className="w-10 h-10 rounded-xl bg-muted border border-slate-100 flex items-center justify-center text-primary shrink-0">
                  <node.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold tracking-widest uppercase mb-0.5 text-primary">
                    {node.name}
                  </h4>
                  <p className="text-[11px] font-medium text-[#5B5964]">
                    {node.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Central Core */}
          <div className="w-32 h-32 rounded-full bg-white border border-primary/20 shadow-[0_15px_30px_rgba(118,87,217,0.1)] flex flex-col items-center justify-center relative my-2 z-10">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-[#5BC0EB] blur-lg mix-blend-overlay opacity-20 rounded-full" />
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-[#5BC0EB] flex items-center justify-center mb-1.5 shadow-inner relative z-10">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <span className="text-[9px] font-bold tracking-widest uppercase text-primary text-center relative z-10 leading-tight">
              Techzon<br/>Engine
            </span>
          </div>

          <div className="flex flex-col gap-4 w-full relative">
            <div className="absolute left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#5BC0EB] to-primary opacity-20 -translate-x-1/2 rounded-full" />
            
            {STACK_LAYERS.slice(3).map((node) => (
              <div key={node.id} className="relative z-10 glass-panel w-full p-4 border border-primary/10 bg-white/90 rounded-2xl flex items-center gap-4 shadow-sm backdrop-blur-md">
                <div className="w-10 h-10 rounded-xl bg-muted border border-slate-100 flex items-center justify-center text-primary shrink-0">
                  <node.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold tracking-widest uppercase mb-0.5 text-primary">
                    {node.name}
                  </h4>
                  <p className="text-[11px] font-medium text-[#5B5964]">
                    {node.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =======================================================
            BOTTOM FEATURE STRIP
        ======================================================= */}
        <div className="w-full max-w-[1200px] mx-auto mt-16 lg:mt-24 relative z-20">
          <div className="w-full bg-white/80 backdrop-blur-xl border border-primary/10 shadow-[0_15px_40px_rgba(36,18,82,0.04)] rounded-[24px] p-6 lg:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x divide-slate-100">
              {ENGINE_FEATURES.map((feature, idx) => (
                <div key={idx} className="flex flex-col items-center text-center px-4">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mb-3.5 text-primary">
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-primary mb-1.5">{feature.title}</h4>
                  <p className="text-xs font-medium text-muted-foreground leading-relaxed max-w-[220px]">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
