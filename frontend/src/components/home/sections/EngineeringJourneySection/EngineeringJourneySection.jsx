import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion';
import { Search, Layers, PenTool, Code2, ShieldCheck, Rocket, Activity, TrendingUp, CheckCircle2, Zap } from 'lucide-react';

const PIPELINE_STAGES = [
  { id: 'discover', name: 'DISCOVER', desc: 'Understand requirements and define the technical scope.', icon: Search, x: 100, y: 180, position: 'above' },
  { id: 'architect', name: 'ARCHITECT', desc: 'Design scalable systems and secure infrastructure.', icon: Layers, x: 260, y: 320, position: 'below' },
  { id: 'design', name: 'DESIGN', desc: 'Create seamless, intuitive user experiences.', icon: PenTool, x: 420, y: 180, position: 'above' },
  { id: 'engineer', name: 'ENGINEER', desc: 'Build robust code with modern technologies.', icon: Code2, x: 580, y: 320, position: 'below' },
  { id: 'test', name: 'TEST', desc: 'Automated QA and rigorous security audits.', icon: ShieldCheck, x: 740, y: 180, position: 'above' },
  { id: 'deploy', name: 'DEPLOY', desc: 'Zero-downtime CI/CD automated deployments.', icon: Rocket, x: 900, y: 320, position: 'below' },
  { id: 'monitor', name: 'MONITOR', desc: '24/7 telemetry and proactive incident response.', icon: Activity, x: 1060, y: 180, position: 'above' },
  { id: 'grow', name: 'GROW', desc: 'Continuous iteration and limitless scalability.', icon: TrendingUp, x: 1220, y: 320, position: 'below' },
];

const BENEFITS = [
  { icon: CheckCircle2, title: 'AUTOMATED FLOW', desc: 'End-to-end automated pipeline execution' },
  { icon: ShieldCheck, title: 'QUALITY BUILT-IN', desc: 'Quality checks at every stage' },
  { icon: Zap, title: 'FASTER DELIVERY', desc: 'Ship reliable software at lightning speed' },
  { icon: TrendingUp, title: 'CONTINUOUS GROWTH', desc: 'Monitor, learn and scale without limits' }
];

// Exact SVG Path for the pipeline
const PATH_D = "M 0 180 L 100 180 C 180 180, 180 320, 260 320 C 340 320, 340 180, 420 180 C 500 180, 500 320, 580 320 C 660 320, 660 180, 740 180 C 820 180, 820 320, 900 320 C 980 320, 980 180, 1060 180 C 1140 180, 1140 320, 1220 320 L 1320 320";

export const EngineeringJourneySection = () => {
  const [activeStage, setActiveStage] = useState(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredStage, setHoveredStage] = useState(null);

  // Parallax Setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const pipelineX = useTransform(smoothX, [-1, 1], [-4, 4]);
  const pipelineY = useTransform(smoothY, [-1, 1], [-4, 4]);
  const platformX = useTransform(smoothX, [-1, 1], [-6, 6]);
  const platformY = useTransform(smoothY, [-1, 1], [-6, 6]);
  const cardX = useTransform(smoothX, [-1, 1], [-10, 10]);
  const cardY = useTransform(smoothY, [-1, 1], [-10, 10]);

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
      className="section-padding bg-[#FFFFFF] relative overflow-hidden font-sans border-t border-slate-100"
    >
      {/* Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1400px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(118,87,217,0.03)_0%,rgba(6,182,212,0.02)_50%,transparent_70%)] rounded-full blur-3xl" />
      </div>

      <div className="container-global relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center text-center max-w-[650px] mx-auto mb-16 lg:mb-24">
          <div className="text-[11px] md:text-xs font-bold text-primary uppercase tracking-widest mb-3 md:mb-4">
            DIGITAL LIFECYCLE
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-[56px] font-bold tracking-tight text-primary mb-6 leading-tight">
            The Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#4F7FE8] to-[#22B8D6]">Pipeline.</span>
          </h2>
          <p className="font-sans text-base md:text-lg text-foreground font-medium leading-relaxed max-w-[560px]">
            A seamless, automated delivery pipeline moving from discovery to infinite scale.
          </p>
        </div>

        {/* =======================================================
            DESKTOP 3D PIPELINE (Hidden on Mobile)
        ======================================================= */}
        <div className="hidden lg:block relative w-full max-w-[1450px] mx-auto h-[500px] perspective-[1400px]">
          <div className="absolute inset-0 w-full h-full preserve-3d">
            
            {/* Pipeline SVG Layer (Z=0) */}
            <motion.div style={{ x: pipelineX, y: pipelineY }} className="absolute inset-0 w-full h-full preserve-3d z-0">
              <svg viewBox="0 0 1320 500" className="w-full h-full overflow-visible pointer-events-none">
                <defs>
                  <linearGradient id="pipelineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0B2D4D" />
                    <stop offset="33%" stopColor="#4F7FE8" />
                    <stop offset="66%" stopColor="#22B8D6" />
                    <stop offset="100%" stopColor="#FF8A3D" />
                  </linearGradient>
                  <radialGradient id="particleGlow">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="40%" stopColor="#22B8D6" />
                    <stop offset="100%" stopColor="transparent" />
                  </radialGradient>
                </defs>

                {/* 1. Ambient Shadow */}
                <path d={PATH_D} fill="none" stroke="rgba(118,87,217,0.15)" strokeWidth="32" filter="blur(16px)" />
                {/* 2. Glass Track */}
                <path d={PATH_D} fill="none" stroke="rgba(248,250,252,0.8)" strokeWidth="20" strokeLinecap="round" />
                {/* 3. Inner Color Channel */}
                <path d={PATH_D} fill="none" stroke="url(#pipelineGradient)" strokeWidth="6" strokeLinecap="round" opacity="0.3" />
                {/* 4. Bright Highlight Edge */}
                <path d={PATH_D} fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1" strokeLinecap="round" transform="translate(0, -5)" />

                {/* Active Energy Particle (Z=60 effectively due to SVG stacking, but visually above) */}
                {isInView && (
                  <motion.g
                    animate={{ offsetDistance: ["0%", "100%"] }}
                    transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                    style={{ offsetPath: `path("${PATH_D}")`, offsetRotate: "auto" }}
                    onUpdate={(latest) => {
                      const progress = parseFloat(latest.offsetDistance) / 100;
                      if (!isNaN(progress)) {
                        const index = Math.min(Math.floor(progress * PIPELINE_STAGES.length), PIPELINE_STAGES.length - 1);
                        if (index !== activeStage) setActiveStage(index);
                      }
                    }}
                  >
                    <circle r="12" fill="url(#particleGlow)" />
                    <circle r="4" fill="#FFFFFF" />
                  </motion.g>
                )}
              </svg>
            </motion.div>

            {/* Platforms & Cards Layer */}
            {PIPELINE_STAGES.map((stage, idx) => {
              const isActive = activeStage === idx;
              const isHovered = hoveredStage === stage.id;
              const visuallyActive = isActive || isHovered;
              
              const leftPercent = (stage.x / 1320) * 100;
              const topPercent = (stage.y / 500) * 100;
              
              const isAbove = stage.position === 'above';
              
              return (
                <div key={stage.id} className="absolute preserve-3d pointer-events-none" style={{ left: `${leftPercent}%`, top: `${topPercent}%` }}>
                  
                  {/* Platform (Z=20) */}
                  <motion.div 
                    style={{ x: platformX, y: platformY }} 
                    className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 translate-z-20 preserve-3d"
                  >
                    <Link 
                      to={`/process#${stage.id}`}
                      className={`w-[72px] h-[72px] rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md cursor-pointer pointer-events-auto
                        ${visuallyActive 
                          ? 'bg-white border-2 border-[#4F7FE8] shadow-[0_10px_20px_rgba(79,127,232,0.3)] scale-110' 
                          : 'bg-white/70 border border-white shadow-[0_5px_15px_rgba(0,0,0,0.05)] scale-100'
                        }
                      `}
                      onMouseEnter={() => setHoveredStage(stage.id)}
                      onMouseLeave={() => setHoveredStage(null)}
                    >
                      {visuallyActive && (
                        <div className="absolute inset-0 bg-[#4F7FE8]/20 rounded-full blur-md animate-pulse" />
                      )}
                      <stage.icon className={`w-6 h-6 transition-colors duration-300 relative z-10 ${visuallyActive ? 'text-[#4F7FE8]' : 'text-muted-foreground'}`} />
                    </Link>
                  </motion.div>

                  {/* Vertical Connector */}
                  <motion.div 
                    style={{ x: platformX, y: platformY }}
                    className={`absolute left-0 w-px bg-gradient-to-b transition-opacity duration-300
                      ${isAbove ? 'bottom-[36px] h-12 origin-bottom' : 'top-[36px] h-12 origin-top'}
                      ${visuallyActive ? 'from-[#4F7FE8] to-transparent opacity-100' : 'from-slate-300 to-transparent opacity-40'}
                    `}
                  />

                  {/* Information Card (Z=40) */}
                  <motion.div 
                    style={{ x: cardX, y: cardY }}
                    className={`absolute left-0 transform -translate-x-1/2 translate-z-40 preserve-3d
                      ${isAbove ? 'bottom-[84px]' : 'top-[84px]'}
                    `}
                  >
                    <Link 
                      to={`/process#${stage.id}`}
                      className={`block w-[200px] p-4 glass-panel rounded-2xl transition-all duration-300 pointer-events-auto cursor-pointer
                        ${visuallyActive 
                          ? 'bg-white border-[#4F7FE8]/30 shadow-[0_20px_40px_rgba(79,127,232,0.15)] scale-[1.04]' 
                          : 'bg-white/80 border-white shadow-[0_10px_20px_rgba(0,0,0,0.03)] scale-100'
                        }
                      `}
                      onMouseEnter={() => setHoveredStage(stage.id)}
                      onMouseLeave={() => setHoveredStage(null)}
                    >
                      <div className="text-[10px] font-bold text-primary mb-1">0{idx + 1}</div>
                      <h4 className={`text-sm font-bold uppercase tracking-wide mb-1.5 transition-colors ${visuallyActive ? 'text-primary' : 'text-primary'}`}>
                        {stage.name}
                      </h4>
                      <p className="text-[11px] font-medium text-muted-foreground leading-snug">
                        {stage.desc}
                      </p>
                    </Link>
                  </motion.div>

                </div>
              );
            })}
          </div>
        </div>

        {/* =======================================================
            MOBILE VERTICAL LAYOUT (Hidden on Desktop)
        ======================================================= */}
        <div className="block lg:hidden w-full max-w-sm mx-auto relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-[#4F7FE8] to-[#FF8A3D] opacity-20 -translate-x-1/2 rounded-full" />
          
          {PIPELINE_STAGES.map((stage, idx) => {
            const isActive = activeStage === idx;
            return (
              <Link to={`/process#${stage.id}`} key={stage.id} className="relative mb-8 last:mb-0 w-full flex flex-col items-center cursor-pointer block">
                
                {/* Platform */}
                <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 z-10 mb-4
                  ${isActive ? 'bg-white border-2 border-[#4F7FE8] shadow-lg scale-110' : 'bg-muted border border-slate-200'}
                `}>
                  <stage.icon className={`w-5 h-5 ${isActive ? 'text-[#4F7FE8]' : 'text-muted-foreground'}`} />
                </div>
                
                {/* Card */}
                <div className={`w-full max-w-[280px] p-5 rounded-2xl transition-all duration-300 bg-white/90 backdrop-blur-md z-10 text-center
                  ${isActive ? 'border-[#4F7FE8]/30 shadow-xl scale-[1.02]' : 'border-slate-100 border shadow-sm hover:border-[#4F7FE8]/30 hover:shadow-md'}
                `}>
                  <div className="text-[10px] font-bold text-primary mb-1">0{idx + 1}</div>
                  <h4 className="text-sm font-bold uppercase tracking-wide text-primary mb-2">{stage.name}</h4>
                  <p className="text-xs font-medium text-foreground leading-snug">{stage.desc}</p>
                </div>
                
              </Link>
            );
          })}
        </div>

        {/* =======================================================
            BOTTOM BENEFIT STRIP
        ======================================================= */}
        <div className="w-full max-w-[1200px] mx-auto mt-16 lg:mt-24">
          <div className="glass-panel w-full bg-white/70 backdrop-blur-xl border border-white shadow-[0_15px_40px_rgba(36,18,82,0.05)] rounded-3xl p-6 lg:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x divide-slate-200/60">
              {BENEFITS.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center text-center px-4">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mb-3 text-primary">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-[11px] font-bold text-primary tracking-widest uppercase mb-1.5">{item.title}</h4>
                  <p className="text-[11px] font-medium text-muted-foreground leading-relaxed max-w-[200px]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
