import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Layers, PenTool, Monitor, Server, BrainCircuit, Cloud, ShieldCheck, TrendingUp } from 'lucide-react';

const MODULES = [
  { id: 'business', label: 'BUSINESS', icon: BarChart3, delay: 0.1 },
  { id: 'arch', label: 'ARCHITECTURE', icon: Layers, delay: 0.2 },
  { id: 'engineering', label: 'ENGINEERING', icon: PenTool, delay: 0.3 },
  { id: 'ai', label: 'AI', icon: BrainCircuit, delay: 0.4 },
  { id: 'cloud', label: 'CLOUD', icon: Cloud, delay: 0.5 },
  { id: 'security', label: 'SECURITY', icon: ShieldCheck, delay: 0.6 },
  { id: 'scalability', label: 'SCALABILITY', icon: TrendingUp, delay: 0.7 },
];

export const EngineeringPrinciples = () => {
  return (
    <section className="section-padding bg-[#F8FAFC] overflow-hidden relative perspective-container" id="process">
      <div className="container-global relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-20 relative z-30">
          <div className="text-xs font-bold text-primary uppercase tracking-widest mb-3 md:mb-4">
            System Control
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-[56px] font-bold text-primary mb-6 tracking-tight">
            Engineering Ecosystem
          </h2>
          <p className="text-lg md:text-xl font-sans font-medium text-foreground max-w-[560px] mx-auto leading-relaxed mb-12">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#5BC0EB] font-bold">Total control</span> over every digital parameter.
          </p>
        </div>

        {/* 3D Dashboard Canvas */}
        <div className="relative w-full max-w-[1000px] mx-auto h-[600px] md:h-[500px] perspective-[1600px] preserve-3d">
          
          {/* Main Floating Dashboard Panel */}
          <motion.div 
            initial={{ rotateX: 25, y: 50, opacity: 0 }}
            whileInView={{ rotateX: 15, y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full glass-surface shadow-[0_40px_80px_rgba(36,18,82,0.1)] border border-[#E5E2EA] rounded-3xl p-6 md:p-8 preserve-3d"
          >
            {/* Screen inner bezel */}
            <div className="w-full h-full border border-slate-200/50 rounded-2xl p-4 md:p-6 relative overflow-hidden bg-white/40">
              
              {/* Scanning line effect */}
              <motion.div 
                animate={{ top: ['-10%', '110%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#0B2D4D]/10 to-transparent z-0 pointer-events-none"
              />

              {/* Grid Layout for Modules */}
              <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 h-full auto-rows-fr">
                
                {/* Central Status Panel (Spans 2 rows/cols on desktop) */}
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  viewport={{ once: true }}
                  className="col-span-2 row-span-1 md:row-span-2 surface-elevated bg-gradient-to-br from-white to-[#F7F8FC] p-4 md:p-6 flex flex-col justify-between"
                >
                  <div className="flex justify-between items-start">
                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">System Status</div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[10px] font-bold text-green-600 uppercase">Online</span>
                    </div>
                  </div>
                  
                  <div className="w-full mt-4 h-full min-h-[80px] relative">
                    {/* Faux graph data */}
                    <svg className="w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="none">
                      <motion.path 
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 1.5, delay: 1 }}
                        viewport={{ once: true }}
                        d="M 0 80 Q 20 20, 50 60 T 100 40 T 150 70 T 200 30" 
                        fill="none" 
                        stroke="#0B2D4D" 
                        strokeWidth="3" 
                        strokeLinecap="round" 
                      />
                      <motion.path 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.1 }}
                        transition={{ duration: 0.5, delay: 2.5 }}
                        viewport={{ once: true }}
                        d="M 0 80 Q 20 20, 50 60 T 100 40 T 150 70 T 200 30 L 200 100 L 0 100 Z" 
                        fill="#0B2D4D" 
                      />
                    </svg>
                  </div>
                </motion.div>

                {/* Sub Modules */}
                {MODULES.map((mod, idx) => (
                  <motion.div
                    key={mod.id}
                    initial={{ translateZ: -20, opacity: 0 }}
                    whileInView={{ translateZ: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: mod.delay }}
                    viewport={{ once: true }}
                    className="surface-panel rounded-2xl p-3 md:p-4 flex flex-col items-center justify-center gap-2 md:gap-3 transition-transform duration-300 hover:translate-z-8 cursor-pointer relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <mod.icon className="w-5 h-5 md:w-6 md:h-6 text-primary transition-transform group-hover:scale-110" />
                    <div className="text-[9px] md:text-[10px] font-bold text-foreground tracking-wider uppercase text-center">{mod.label}</div>
                  </motion.div>
                ))}

              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
