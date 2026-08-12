import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FAQS } from '../../../../data/dummyData';
import { Button } from '../../../ui/Button';
import { Loader2, AlertCircle, ChevronDown, HelpCircle, ArrowRight, Database, Search, FileText, Code2, Layers, Network, Settings, ShieldCheck } from 'lucide-react';
import { Tilt3D } from '../../../3d/Tilt3D';
import { DepthLayer } from '../../../3d/DepthLayer';

const AccordionItem = ({ faq, isOpen, onClick }) => (
  <div className={`mb-3 border rounded-2xl bg-white overflow-hidden transition-all duration-300 ${isOpen ? 'border-primary/30 shadow-[0_10px_20px_rgba(118,87,217,0.05)]' : 'border-slate-100 hover:border-slate-200'}`}>
    <button 
      onClick={onClick}
      className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none group"
      aria-expanded={isOpen}
    >
      <h3 className={`text-base font-bold transition-colors ${isOpen ? 'text-primary' : 'text-primary group-hover:text-primary'}`}>
        {faq.question}
      </h3>
      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ml-4 transition-all duration-300 ${isOpen ? 'bg-primary rotate-180' : 'bg-muted border border-slate-200 group-hover:bg-muted'}`}>
        <ChevronDown className={`w-3.5 h-3.5 transition-colors ${isOpen ? 'text-white' : 'text-muted-foreground'}`} />
      </div>
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div 
          initial="collapsed" animate="open" exit="collapsed" 
          variants={{ open: { opacity: 1, height: "auto" }, collapsed: { opacity: 0, height: 0 } }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="px-6 pb-6 pt-0 text-foreground text-sm font-medium leading-relaxed">
            <div className="pt-3 border-t border-slate-100 relative">
              <div className="absolute top-3 -left-4 w-1 h-full bg-gradient-to-b from-primary to-transparent rounded-r-md opacity-20" />
              {faq.answer}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const NODES = [
  { id: 'docs', label: 'Documentation', desc: 'System Manuals', icon: FileText, x: 140, y: 120, z: 35 },
  { id: 'standards', label: 'Technical Standards', desc: 'Engineering Guides', icon: Code2, x: 460, y: 100, z: 65 },
  { id: 'arch', label: 'Architecture', desc: 'System Blueprints', icon: Layers, x: 80, y: 280, z: 20 },
  { id: 'api', label: 'API References', desc: 'Integration Specs', icon: Network, x: 520, y: 260, z: 80 },
  { id: 'ops', label: 'Operations', desc: 'Deployment Logs', icon: Settings, x: 160, y: 460, z: 45 },
  { id: 'support', label: 'Support', desc: 'Service Desk', icon: ShieldCheck, x: 480, y: 440, z: 55 }
];

export const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredNode, setHoveredNode] = useState(null);

  // Parallax Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const bgX = useTransform(smoothX, [-1, 1], [-2, 2]);
  const bgY = useTransform(smoothY, [-1, 1], [-2, 2]);
  const orbitX = useTransform(smoothX, [-1, 1], [-4, 4]);
  const orbitY = useTransform(smoothY, [-1, 1], [-4, 4]);
  const coreX = useTransform(smoothX, [-1, 1], [-6, 6]);
  const coreY = useTransform(smoothY, [-1, 1], [-6, 6]);
  const nodeX = useTransform(smoothX, [-1, 1], [-12, 12]);
  const nodeY = useTransform(smoothY, [-1, 1], [-12, 12]);
  const docX = useTransform(smoothX, [-1, 1], [-16, 16]);
  const docY = useTransform(smoothY, [-1, 1], [-16, 16]);

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
      className="section-padding bg-[#FFFFFF] border-t border-slate-100 overflow-hidden relative perspective-container" 
      id="faq"
    >
      {/* Subtle Background Elements */}
      <motion.div style={!isMobile ? { x: bgX, y: bgY } : {}} className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(118,87,217,0.03)_0%,rgba(6,182,212,0.02)_50%,transparent_70%)] rounded-full blur-3xl" />
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(118,87,217,0.02)_0%,transparent_70%)] rounded-full blur-3xl" />
      </motion.div>

      <div className="container-global relative z-10 w-full h-full min-h-[450px] lg:min-h-[650px] lg:max-h-[900px]">
        <div className="grid grid-cols-1 lg:grid-cols-[0.45fr_0.55fr] gap-12 lg:gap-16 items-center h-full">
          
          {/* =======================================================
              LEFT SIDE: Content & FAQ Accordion
          ======================================================= */}
          <div className="flex flex-col justify-center relative z-30">
            <div className="mb-8">
              <div className="text-xs font-bold text-primary uppercase tracking-widest mb-3 md:mb-4 flex items-center gap-2">
                <Search className="w-4 h-4" /> System Query
              </div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-[56px] font-bold tracking-tight text-primary mb-6 leading-tight">
                Knowledge <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#5BC0EB]">System.</span>
              </h2>
              <p className="text-foreground text-base md:text-lg mb-8 font-sans font-medium max-w-[520px] leading-relaxed">
                Access our central database of operational protocols, technical requirements, and partnership structures.
              </p>
              <Button size="lg" className="bg-primary hover:bg-[#6042c0] text-white gap-2 shadow-[0_10px_20px_rgba(118,87,217,0.2)] rounded-full">
                Access Support Portal <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Accordion List directly in the left column */}
            <div className="w-full max-w-[520px] mt-4">
              <h4 className="text-sm font-bold text-primary mb-4 tracking-wide uppercase">Common Queries</h4>
                <div className="relative">
                  {FAQS.slice(0, 4).map((faq, i) => (
                    <AccordionItem 
                      key={faq._id || i} 
                      faq={faq} 
                      isOpen={openIndex === i} 
                      onClick={() => setOpenIndex(openIndex === i ? -1 : i)} 
                    />
                  ))}
                  {FAQS.length > 4 && (
                    <Button variant="outline" className="w-full bg-white border-slate-200 text-foreground hover:text-primary rounded-xl mt-2">
                      View all queries
                    </Button>
                  )}
                </div>
            </div>
          </div>

          {/* =======================================================
              RIGHT SIDE: 3D Knowledge Core
          ======================================================= */}
          <div className="relative w-full h-[400px] md:h-[500px] lg:h-[700px] flex items-center justify-center perspective-[1200px]">
            
            <Tilt3D max={4} depth={10} className="w-full h-full max-w-[700px] relative preserve-3d mx-auto">
              
              {/* SVG Connections Layer */}
              <DepthLayer depth={0} className="absolute inset-0 preserve-3d pointer-events-none z-0">
                <svg viewBox="0 0 600 600" className="w-full h-full overflow-visible opacity-50">
                  <defs>
                    <linearGradient id="connGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0B2D4D" stopOpacity="0.3" />
                      <stop offset="50%" stopColor="#5BC0EB" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#0B2D4D" stopOpacity="0.3" />
                    </linearGradient>
                    <linearGradient id="activeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0B2D4D" />
                      <stop offset="50%" stopColor="#5BC0EB" />
                      <stop offset="100%" stopColor="#5BC0EB" />
                    </linearGradient>
                  </defs>
                  
                  {NODES.map((node, i) => {
                    const isHovered = hoveredNode === node.id;
                    const pathD = `M 300 300 Q 300 ${node.y} ${node.x} ${node.y}`;
                    return (
                      <g key={`path-${i}`}>
                        {/* Base path */}
                        <path 
                          d={pathD} 
                          fill="none" 
                          stroke="url(#connGrad)" 
                          strokeWidth={isHovered ? "2.5" : "1.5"} 
                          className="transition-all duration-500"
                        />
                        {/* Active moving particle trail */}
                        <motion.path
                          d={pathD}
                          fill="none"
                          stroke="url(#activeGrad)"
                          strokeWidth="3"
                          strokeDasharray="0 1"
                          animate={{ pathLength: [0, 1] }}
                          transition={{ 
                            duration: isHovered ? 2 : 4 + (i % 3), 
                            repeat: Infinity, 
                            ease: "linear",
                            delay: i * 0.5
                          }}
                          className={`drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] ${isHovered ? 'opacity-100' : 'opacity-60'}`}
                        />
                      </g>
                    );
                  })}
                </svg>
              </DepthLayer>

              {/* Central Knowledge Core */}
              <DepthLayer depth={0} className="absolute inset-0 flex items-center justify-center preserve-3d pointer-events-none">
                <motion.div style={!isMobile ? { x: coreX, y: coreY } : {}} className="relative w-48 h-48 md:w-56 md:h-56 flex items-center justify-center preserve-3d">
                  
                  {/* Outer glowing atmosphere */}
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl" />
                  
                  {/* Slow rotating outer ring */}
                  <motion.div 
                    animate={{ rotateZ: 360, rotateX: 20, rotateY: 10 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[-20%] rounded-full border border-[#5BC0EB]/30 border-dashed preserve-3d opacity-60"
                  />
                  
                  {/* Medium rotating orbital ring */}
                  <motion.div 
                    animate={{ rotateZ: -360, rotateX: -15, rotateY: 25 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[-10%] rounded-full border-2 border-primary/20 preserve-3d"
                  />
                  
                  {/* Central Glass Disk */}
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white/70 backdrop-blur-[30px] border border-primary/30 shadow-[0_0_40px_rgba(118,87,217,0.15),inset_0_0_20px_rgba(255,255,255,1)] flex flex-col items-center justify-center relative preserve-3d z-10 overflow-hidden">
                    {/* Inner pulse */}
                    <motion.div 
                      animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-0 bg-gradient-to-br from-primary to-[#5BC0EB] blur-md opacity-40 mix-blend-overlay"
                    />
                    
                    <Database className="w-8 h-8 md:w-10 md:h-10 text-primary mb-1 relative z-10 drop-shadow-sm" />
                    <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-primary text-center relative z-10 leading-tight">
                      Knowledge<br/>Core
                    </span>
                  </div>
                </motion.div>
              </DepthLayer>

              {/* Floating Knowledge Nodes */}
              <DepthLayer depth={0} className="absolute inset-0 pointer-events-none preserve-3d">
                <motion.div style={!isMobile ? { x: nodeX, y: nodeY } : {}} className="w-full h-full relative preserve-3d">
                  {NODES.map((node) => {
                    const isHovered = hoveredNode === node.id;
                    const leftPercent = (node.x / 600) * 100;
                    const topPercent = (node.y / 600) * 100;

                    return (
                      <div 
                        key={node.id} 
                        className="absolute pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 preserve-3d"
                        style={{ 
                          left: `${leftPercent}%`, 
                          top: `${topPercent}%`,
                          transform: `translate(-50%, -50%) translateZ(${node.z}px)`
                        }}
                        onMouseEnter={() => setHoveredNode(node.id)}
                        onMouseLeave={() => setHoveredNode(null)}
                      >
                        <div className={`glass-panel flex items-center p-2.5 pr-4 border rounded-2xl transition-all duration-300 ${isHovered ? 'bg-white/95 border-primary/50 shadow-[0_15px_30px_rgba(118,87,217,0.15)] scale-105' : 'bg-white/80 border-primary/20 shadow-[0_5px_15px_rgba(36,18,82,0.05)]'} backdrop-blur-[20px] cursor-default group`}>
                          
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mr-3 transition-colors duration-300 ${isHovered ? 'bg-gradient-to-br from-primary to-[#5BC0EB] text-white shadow-inner' : 'bg-muted border border-slate-100 text-primary'}`}>
                            <node.icon className="w-4 h-4" />
                          </div>
                          
                          <div>
                            <h4 className={`text-[10px] md:text-[11px] font-bold tracking-widest uppercase mb-0.5 leading-none transition-colors ${isHovered ? 'text-primary' : 'text-primary'}`}>
                              {node.label}
                            </h4>
                            <p className="text-[9px] md:text-[10px] font-medium text-[#5B5964] leading-none">
                              {node.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              </DepthLayer>

              {/* Floating Document Panels */}
              <DepthLayer depth={0} className="absolute inset-0 pointer-events-none preserve-3d hidden md:block">
                <motion.div style={!isMobile ? { x: docX, y: docY } : {}} className="w-full h-full relative preserve-3d">
                  
                  {/* Doc 1 */}
                  <div className="absolute top-[15%] left-[25%] transform -translate-x-1/2 -translate-y-1/2 translate-z-40 rotate-12 opacity-80">
                    <div className="glass-panel px-3 py-2 bg-white/60 border border-white backdrop-blur-md rounded-lg shadow-sm flex items-center gap-2">
                      <FileText className="w-3 h-3 text-[#5BC0EB]" />
                      <span className="text-[8px] font-mono font-bold text-foreground">API_v2.4.pdf</span>
                    </div>
                  </div>

                  {/* Doc 2 */}
                  <div className="absolute top-[80%] left-[85%] transform -translate-x-1/2 -translate-y-1/2 translate-z-80 -rotate-6 opacity-70">
                    <div className="glass-panel px-3 py-2 bg-white/60 border border-white backdrop-blur-md rounded-lg shadow-sm flex items-center gap-2">
                      <Layers className="w-3 h-3 text-primary" />
                      <span className="text-[8px] font-mono font-bold text-foreground">ARCH_GUIDE</span>
                    </div>
                  </div>

                </motion.div>
              </DepthLayer>

            </Tilt3D>
          </div>

        </div>
      </div>
    </section>
  );
};
