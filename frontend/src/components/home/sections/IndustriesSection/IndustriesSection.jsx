import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Cloud, Database, ShieldCheck, Smartphone, Server, LayoutGrid, Cpu, ArrowRight } from 'lucide-react';
import { Button } from '../../../ui/Button';
import { Tilt3D } from '../../../3d/Tilt3D';

const TECHNOLOGIES = [
  { id: 'ai', name: 'AI & Data', desc: 'Predictive Analytics', icon: Database, position: { top: '5%', left: '40%', z: 20 } },
  { id: 'cloud', name: 'Cloud Infrastructure', desc: 'Scalable Systems', icon: Cloud, position: { top: '15%', right: '10%', z: 60 } },
  { id: 'web', name: 'Web Engineering', desc: 'High-Performance UI', icon: LayoutGrid, position: { top: '50%', right: '0%', z: 80 } },
  { id: 'security', name: 'Cyber Security', desc: 'Zero-Trust Networks', icon: ShieldCheck, position: { bottom: '20%', right: '15%', z: 40 } },
  { id: 'devops', name: 'DevOps', desc: 'Continuous Delivery', icon: Cpu, position: { bottom: '5%', left: '40%', z: 20 } },
  { id: 'mobile', name: 'Mobile Apps', desc: 'Native Experiences', icon: Smartphone, position: { bottom: '25%', left: '5%', z: 60 } },
  { id: 'enterprise', name: 'Enterprise Systems', desc: 'Core Architecture', icon: Server, position: { top: '45%', left: '-5%', z: 80 } },
];

export const IndustriesSection = () => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Parallax Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Background Parallax (2px)
  const bgX = useTransform(smoothX, [-1, 1], [-2, 2]);
  const bgY = useTransform(smoothY, [-1, 1], [-2, 2]);

  // Orbital Layer Parallax (5px)
  const orbitX = useTransform(smoothX, [-1, 1], [-5, 5]);
  const orbitY = useTransform(smoothY, [-1, 1], [-5, 5]);

  // Globe Parallax (8px)
  const globeX = useTransform(smoothX, [-1, 1], [-8, 8]);
  const globeY = useTransform(smoothY, [-1, 1], [-8, 8]);

  // Nodes Parallax (15px)
  const nodeX = useTransform(smoothX, [-1, 1], [-15, 15]);
  const nodeY = useTransform(smoothY, [-1, 1], [-15, 15]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e) => {
    if (isMobile || !containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    // Normalize to -1 to 1
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
      className="section-padding bg-[#FFFFFF] overflow-hidden font-sans border-t border-slate-100 relative min-h-[450px] lg:min-h-[650px] lg:max-h-[800px] flex items-center perspective-container" 
      id="infrastructure"
    >
      
      {/* Background Atmosphere */}
      <motion.div 
        style={!isMobile ? { x: bgX, y: bgY } : {}}
        className="absolute inset-0 pointer-events-none z-0"
      >
        {/* Soft radial glow behind globe (Right Side) */}
        <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.03)_0%,rgba(118,87,217,0.02)_40%,transparent_70%)] rounded-full blur-3xl" />
      </motion.div>

      <div className="container-global relative z-10 w-full h-full">
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-12 lg:gap-8 items-center h-full">
          
          {/* =========================
              LEFT: CONTENT
          ========================== */}
          <div className="relative z-30 flex flex-col justify-center text-center lg:text-left order-2 lg:order-1 mt-12 lg:mt-0">
            <div className="text-[11px] md:text-xs font-bold text-primary uppercase tracking-widest mb-3 md:mb-4">
              Global Reach
            </div>
            
            <h2 className="font-display text-[38px] md:text-5xl lg:text-[56px] font-bold tracking-tight text-primary mb-6 leading-[1.1]">
              Global Digital <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#4F7FE8] to-[#5BC0EB]">Infrastructure.</span>
            </h2>
            
            <p className="font-sans text-base md:text-lg text-foreground max-w-[560px] mx-auto lg:mx-0 font-medium leading-relaxed mb-8">
              We seamlessly connect cloud architecture, big data, and elite engineering into one unified, hyper-scalable global network.
            </p>

            <div className="flex justify-center lg:justify-start">
               <Button className="bg-primary text-white rounded-full px-6 py-2.5 hover:bg-primary transition-colors gap-2 text-sm font-semibold shadow-[0_10px_20px_rgba(118,87,217,0.15)]">
                 Explore Architecture <ArrowRight className="w-4 h-4" />
               </Button>
            </div>
          </div>

          {/* =========================
              RIGHT: 3D VISUALIZATION
          ========================== */}
          <div className="relative z-20 w-full h-[450px] lg:h-[650px] flex items-center justify-center order-1 lg:order-2 perspective-[1200px]">
            
            <Tilt3D max={3} depth={10} className="w-full h-full relative flex items-center justify-center preserve-3d">
              
              {/* --- ORBITAL PATHS & DATA PARTICLES --- */}
              <motion.div 
                style={!isMobile ? { x: orbitX, y: orbitY } : {}}
                className="absolute inset-0 flex items-center justify-center pointer-events-none preserve-3d"
              >
                {/* Horizontal Route */}
                <div className="absolute w-[120%] md:w-[100%] h-32 rounded-[100%] border border-[#5BC0EB]/20 rotate-x-60 -rotate-z-12 preserve-3d shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                   {/* Data Particle moving along horizontal route */}
                   <motion.div 
                     animate={{ rotateZ: 360 }}
                     transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                     className="absolute inset-0 preserve-3d origin-center"
                   >
                     <div className="absolute top-0 left-1/2 -ml-1 -mt-1 w-2 h-2 rounded-full bg-[#5BC0EB] shadow-[0_0_15px_#5BC0EB] rotate-x-[-60deg]" />
                   </motion.div>
                </div>

                {/* Vertical Route */}
                <div className="absolute w-48 h-[120%] md:h-[100%] rounded-[100%] border border-primary/20 rotate-y-60 rotate-z-45 preserve-3d shadow-[0_0_15px_rgba(118,87,217,0.1)]">
                   {/* Data Particle moving along vertical route */}
                   <motion.div 
                     animate={{ rotateZ: 360 }}
                     transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                     className="absolute inset-0 preserve-3d origin-center"
                   >
                     <div className="absolute top-1/2 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-primary shadow-[0_0_15px_#0B2D4D] rotate-y-[-60deg]" />
                   </motion.div>
                </div>
              </motion.div>

              {/* --- MAIN 3D GLOBE --- */}
              <motion.div 
                style={!isMobile ? { x: globeX, y: globeY } : {}}
                className="absolute w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] lg:w-[420px] lg:h-[420px] xl:w-[480px] xl:h-[480px] flex items-center justify-center preserve-3d"
              >
                {/* Globe Shadow Base */}
                <div className="absolute -bottom-[20%] left-1/2 -translate-x-1/2 w-[60%] h-[15%] bg-primary/15 blur-xl rounded-full pointer-events-none" />

                {/* Rotating Globe Sphere */}
                <motion.div 
                  animate={{ rotateY: 360 }}
                  transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                  className="w-full h-full rounded-full border border-white/50 bg-white/30 backdrop-blur-md shadow-[inset_-20px_-20px_60px_rgba(6,182,212,0.08),0_30px_60px_rgba(36,18,82,0.05)] relative overflow-hidden preserve-3d flex items-center justify-center"
                >
                  {/* Atmosphere Glow */}
                  <div className="absolute inset-0 rounded-full shadow-[inset_0_0_30px_rgba(255,255,255,1)] pointer-events-none" />
                  
                  {/* Map / Grid Texture */}
                  <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: 'radial-gradient(#0B2D4D 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                  
                  {/* Latitude / Longitude Rings */}
                  <div className="absolute inset-0 rounded-full border border-[#5BC0EB]/10 rotate-x-60" />
                  <div className="absolute inset-0 rounded-full border border-primary/10 rotate-y-60" />
                  <div className="absolute inset-0 rounded-full border border-[#5BC0EB]/10 rotate-y-120" />

                  {/* Central Digital Core inside globe */}
                  <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-white/80 backdrop-blur-lg border border-white flex items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.3)] relative preserve-3d z-10 rotate-y-0">
                    <motion.div 
                      animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#5BC0EB] to-primary blur-md opacity-50"
                    />
                    <div className="text-[8px] sm:text-[10px] font-bold text-primary tracking-widest uppercase z-10 text-center leading-tight">
                      System<br/>Core
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* --- TECHNOLOGY NODES --- */}
              <motion.div
                style={!isMobile ? { x: nodeX, y: nodeY } : {}}
                className="absolute inset-0 preserve-3d pointer-events-none"
              >
                {TECHNOLOGIES.map((tech) => (
                  <div 
                    key={tech.id}
                    className="absolute"
                    style={{
                      top: tech.position.top,
                      left: tech.position.left,
                      right: tech.position.right,
                      bottom: tech.position.bottom,
                      transform: `translateZ(${tech.position.z}px)`
                    }}
                  >
                    <div className="glass-panel p-2.5 sm:p-3 flex items-center gap-3 border border-white/60 bg-white/70 backdrop-blur-xl shadow-[0_15px_30px_rgba(36,18,82,0.06),0_2px_10px_rgba(0,0,0,0.03)] hover:border-[#5BC0EB]/40 hover:shadow-[0_20px_40px_rgba(6,182,212,0.15)] transition-all duration-300 pointer-events-auto cursor-default group scale-75 sm:scale-100 origin-center">
                      
                      {/* Subtly glowing icon box */}
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 flex items-center justify-center text-primary group-hover:text-[#5BC0EB] transition-colors relative overflow-hidden">
                        <div className="absolute inset-0 bg-[#5BC0EB]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <tech.icon className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" />
                      </div>
                      
                      <div className="pr-1 sm:pr-2">
                        <div className="text-[9px] sm:text-[11px] font-bold text-primary uppercase tracking-wider leading-tight">{tech.name}</div>
                        <div className="text-[8px] sm:text-[9px] font-medium text-muted-foreground mt-0.5">{tech.desc}</div>
                      </div>

                    </div>
                  </div>
                ))}
              </motion.div>

            </Tilt3D>
          </div>

        </div>
      </div>
    </section>
  );
};
