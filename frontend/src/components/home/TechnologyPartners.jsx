import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tilt3D } from '../3d/Tilt3D';
import { DepthLayer } from '../3d/DepthLayer';
import { Briefcase, HeartPulse, ShoppingCart, Truck, Landmark, Building2, Globe, Cpu } from 'lucide-react';
import { EnergyPathDefs, useReducedMotion } from '../visual-system';
import { cn } from '../../utils/cn';

const INDUSTRIES = [
  { id: 'healthcare', name: 'Healthcare', subtitle: 'Digital Care', icon: HeartPulse, deskX: 30, deskY: 20, depth: 30, delay: 0 },
  { id: 'technology', name: 'Technology', subtitle: 'Infrastructure', icon: Cpu, deskX: 50, deskY: 15, depth: 70, delay: 1.5 },
  { id: 'finance', name: 'Finance', subtitle: 'Secure Transactions', icon: Landmark, deskX: 70, deskY: 20, depth: 40, delay: 0.8 },
  { id: 'manufacturing', name: 'Manufacturing', subtitle: 'Industry 4.0', icon: Building2, deskX: 82, deskY: 50, depth: 20, delay: 2.2 },
  { id: 'retail', name: 'Retail', subtitle: 'Global Scale', icon: ShoppingCart, deskX: 70, deskY: 80, depth: 60, delay: 3 },
  { id: 'logistics', name: 'Logistics', subtitle: 'Smart Tracking', icon: Truck, deskX: 50, deskY: 85, depth: 30, delay: 1.2 },
  { id: 'education', name: 'Education', subtitle: 'EdTech Systems', icon: Globe, deskX: 30, deskY: 80, depth: 50, delay: 2.5 },
  { id: 'public', name: 'Public Sector', subtitle: 'Civic Systems', icon: Landmark, deskX: 18, deskY: 50, depth: 80, delay: 0.5 },
];

export const TechnologyPartners = () => {
  const [activeNode, setActiveNode] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const corePos = isMobile ? { x: 20, y: 5 } : { x: 50, y: 50 };

  const getCoordinates = (index, deskX, deskY) => {
    if (isMobile) {
      // Vertical tree layout on mobile (node offset to the right of the vertical core line)
      return { x: 60, y: 15 + (index * 11) };
    }
    return { x: deskX, y: deskY };
  };

  return (
    <section className="relative w-full py-24 md:py-32 bg-[#FFFFFF] overflow-hidden font-sans border-t border-slate-100">
      
      {/* Premium Light Theme Background */}
      <div className="absolute inset-0 pointer-events-none opacity-50 z-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-[#5BC0EB]/10 to-transparent rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(118,87,217,0.03)_0%,transparent_70%)]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-8 max-w-[1400px] h-full flex flex-col items-center">
        
        {/* Centered Heading */}
        <motion.div 
          onViewportEnter={() => setIsVisible(true)}
          className="text-center w-full max-w-4xl mx-auto mb-16 md:mb-24 relative z-30 flex flex-col items-center"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary mb-6 text-center"
          >
            Powering Global <br />
            <span className="text-gradient-galaxy">Industries.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-sans text-lg md:text-xl text-foreground max-w-2xl text-center font-medium"
          >
            Our technology ecosystem delivers mission-critical digital infrastructure
            for the world's most demanding sectors.
          </motion.p>
        </motion.div>

        {/* 3D Industry Network */}
        <div className={cn(
          "relative w-full max-w-[1200px] mx-auto perspective-[2500px] flex items-center justify-center",
          isMobile ? "h-[1100px]" : "h-[750px] md:h-[800px]"
        )}>
          <Tilt3D disabled={isMobile || prefersReducedMotion} max={8} className="w-full h-full">
            
            {/* SVG Connections Layer */}
            <DepthLayer depth={0} className="absolute inset-0 w-full h-full pointer-events-none z-10">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                <EnergyPathDefs />
                <AnimatePresence>
                  {isVisible && INDUSTRIES.map((industry, index) => {
                    const isActive = activeNode === industry.id;
                    const coords = getCoordinates(index, industry.deskX, industry.deskY);
                    
                    let pathData = "";
                    if (isMobile) {
                      // Curved L-shape branching tree for mobile (╰────◉)
                      pathData = `M ${corePos.x} ${corePos.y} L ${corePos.x} ${coords.y - 2} Q ${corePos.x} ${coords.y} ${corePos.x + 5} ${coords.y} L ${coords.x} ${coords.y}`;
                    } else {
                      // Smooth bezier curve for desktop 3D network
                      pathData = `M ${corePos.x} ${corePos.y} C ${(corePos.x + coords.x)/2} ${corePos.y}, ${(corePos.x + coords.x)/2} ${coords.y}, ${coords.x} ${coords.y}`;
                    }

                    return (
                      <g key={`path-${industry.id}`}>
                        {/* Base Curved Line */}
                        <motion.path 
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          transition={{ duration: 1.5, delay: index * 0.15 }}
                          d={pathData} 
                          fill="none" 
                          stroke={isActive ? "url(#active-line-gradient)" : "rgba(118,87,217,0.15)"} 
                          strokeWidth={isActive ? "1.5" : "0.5"} 
                          vectorEffect="non-scaling-stroke"
                          className="transition-all duration-700"
                          filter={isActive ? "url(#glow-line)" : "none"}
                        />
                        
                        {/* Continuous Traveling Energy Particle */}
                        {!prefersReducedMotion && (
                          <motion.circle 
                            r={isActive ? "2" : "1.2"} 
                            fill={isActive ? "#5BC0EB" : "#0B2D4D"} 
                            filter="url(#glow-line)"
                            className="transition-all duration-700"
                          >
                            <animateMotion 
                              dur={isActive ? "1.5s" : "4s"} 
                              repeatCount="indefinite" 
                              path={pathData} 
                              keyPoints="0;1" 
                              keyTimes="0;1" 
                              calcMode="linear" 
                              begin={`${industry.delay}s`}
                            />
                          </motion.circle>
                        )}
                      </g>
                    );
                  })}
                </AnimatePresence>
              </svg>
            </DepthLayer>

            {/* Central Ecosystem Core */}
            <DepthLayer 
              depth={30} 
              className="absolute z-40" 
              style={{ left: `${corePos.x}%`, top: `${corePos.y}%`, transform: 'translate(-50%, -50%)' }}
            >
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                transition={{ type: "spring", duration: 1.5 }}
                className="relative group flex items-center justify-center"
              >
                {/* Breathing Ambient Light */}
                {!prefersReducedMotion && (
                  <motion.div 
                    animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-gradient-to-br from-primary to-[#5BC0EB] rounded-full blur-[40px] -z-10" 
                  />
                )}
                
                {/* Core Structure */}
                <div className={cn(
                  "bg-white/95 backdrop-blur-3xl border border-white p-8 rounded-full shadow-[0_30px_60px_rgba(118,87,217,0.1),inset_0_4px_20px_rgba(255,255,255,1)] flex flex-col items-center justify-center text-center relative overflow-hidden transition-transform duration-700",
                  isMobile ? "w-[120px] h-[120px]" : "w-[180px] h-[180px] md:w-[220px] md:h-[220px]"
                )}>
                  
                  {/* Rotating Outer Ring */}
                  {!prefersReducedMotion && (
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 rounded-full border-[1px] border-dashed border-primary/30 m-2"
                    />
                  )}
                  {/* Rotating Inner Ring */}
                  {!prefersReducedMotion && (
                    <motion.div 
                      animate={{ rotate: -360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-[15px] rounded-full border-[1px] border-dotted border-[#5BC0EB]/40"
                    />
                  )}

                  {!isMobile && (
                    <div className="absolute top-6 text-[9px] md:text-[10px] font-bold tracking-[0.2em] text-primary uppercase bg-primary/5 px-3 py-1 rounded-full border border-primary/10">
                      Digital Network
                    </div>
                  )}
                  
                  {/* Glowing Core Point */}
                  <div className={cn(
                    "relative rounded-full bg-gradient-to-br from-primary/10 to-[#5BC0EB]/10 flex items-center justify-center mt-2 mb-2 shadow-inner border border-primary/20",
                    isMobile ? "w-10 h-10" : "w-12 h-12 md:w-16 md:h-16"
                  )}>
                    <Briefcase className={cn("text-primary relative z-10", isMobile ? "w-5 h-5" : "w-6 h-6 md:w-8 md:h-8")} />
                    {!prefersReducedMotion && (
                       <motion.div 
                        animate={{ scale: [1, 1.25, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 bg-primary/20 rounded-full blur-[10px]"
                      />
                    )}
                  </div>
                  
                  {!isMobile && (
                    <div className="text-sm md:text-[15px] font-bold text-primary leading-tight tracking-wide uppercase">
                      TECHZON DIGITAL<br/>ENGINEERING
                    </div>
                  )}
                  
                  {!isMobile && (
                    <div className="absolute bottom-6 text-[8px] font-mono tracking-widest text-muted-foreground">
                      CONNECTED SYSTEMS
                    </div>
                  )}
                </div>
              </motion.div>
            </DepthLayer>

            {/* Industry Nodes */}
            {INDUSTRIES.map((industry, index) => {
              const isActive = activeNode === industry.id;
              const coords = getCoordinates(index, industry.deskX, industry.deskY);
              const nodeDepth = isActive ? 100 : (isMobile ? 0 : industry.depth); 
              const Icon = industry.icon;

              return (
                <DepthLayer 
                  key={industry.id} 
                  depth={nodeDepth}
                  className="absolute z-50 transition-all duration-700"
                  style={{ 
                    left: `${coords.x}%`, 
                    top: `${coords.y}%`, 
                    transform: isMobile ? 'translate(0%, -50%)' : 'translate(-50%, -50%)',
                    opacity: activeNode && !isActive ? 0.5 : 1,
                    scale: activeNode && !isActive ? 0.95 : 1
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.8, delay: prefersReducedMotion ? 0 : 0.5 + (index * 0.1) }}
                    onMouseEnter={() => setActiveNode(industry.id)}
                    onMouseLeave={() => setActiveNode(null)}
                  >
                    <motion.div
                      animate={prefersReducedMotion ? {} : { 
                        y: [0, -6, 0],
                        x: [0, 3, 0]
                      }}
                      transition={{ 
                        duration: 4 + (index % 3), 
                        repeat: Infinity, 
                        ease: "easeInOut",
                        delay: index * 0.2
                      }}
                      className={cn(
                        "group relative flex items-center p-3 pr-6 rounded-[20px] cursor-pointer transition-all duration-500",
                        isMobile ? "min-w-[180px]" : "min-w-[210px]",
                        isActive 
                          ? 'bg-white border-2 border-primary/40 shadow-[0_20px_40px_rgba(118,87,217,0.15)] scale-[1.05]'
                          : 'bg-white/95 border-2 border-white/60 shadow-[0_8px_20px_rgba(0,0,0,0.04)] hover:border-primary/30 hover:bg-white backdrop-blur-2xl'
                      )}
                    >
                      {/* Node Icon Core */}
                      <div className={cn(
                        "relative w-12 h-12 rounded-[14px] flex items-center justify-center mr-4 transition-all duration-500 z-10 flex-shrink-0 shadow-inner",
                        isActive 
                          ? 'bg-gradient-to-br from-primary to-[#5BC0EB] text-white border-white/20' 
                          : 'bg-muted border border-slate-100 group-hover:bg-primary/5 group-hover:border-primary/20'
                      )}>
                        <Icon className={cn(
                          "w-5 h-5 transition-all duration-500",
                          isActive ? 'text-white' : 'text-foreground group-hover:text-primary'
                        )} />
                      </div>

                      {/* Node Text Content */}
                      <div className="flex flex-col relative z-10">
                        <h3 className={cn(
                          "text-sm font-bold transition-colors duration-500 whitespace-nowrap tracking-wide",
                          isActive ? 'text-primary' : 'text-primary group-hover:text-primary'
                        )}>
                          {industry.name}
                        </h3>
                        
                        <span className={cn(
                          "text-[10px] font-semibold transition-colors duration-500 tracking-wider",
                          isActive ? "text-[#5BC0EB]" : "text-muted-foreground group-hover:text-primary"
                        )}>
                          {industry.subtitle}
                        </span>
                      </div>

                      {/* Active Node Pulse & Glow */}
                      {isActive && !prefersReducedMotion && (
                        <>
                          <div className="absolute inset-0 rounded-[20px] bg-gradient-to-r from-primary/5 to-[#5BC0EB]/5 pointer-events-none" />
                          <motion.div 
                            initial={{ scale: 1, opacity: 0.5 }}
                            animate={{ scale: 1.25, opacity: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="absolute inset-0 rounded-[20px] border border-[#5BC0EB]/60 pointer-events-none" 
                          />
                        </>
                      )}
                    </motion.div>
                  </motion.div>
                </DepthLayer>
              );
            })}

          </Tilt3D>
        </div>
      </div>
    </section>
  );
};
