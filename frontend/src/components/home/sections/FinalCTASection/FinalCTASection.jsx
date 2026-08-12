import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../../ui/Button';
import { ArrowRight, MessageSquare, Power, Terminal } from 'lucide-react';
import { Tilt3D } from '../../../3d/Tilt3D';
import { DepthLayer } from '../../../3d/DepthLayer';

export const FinalCTASection = () => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <section className="section-padding bg-white border-t border-slate-100 overflow-hidden perspective-container" id="cta">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-50 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        {/* Dynamic Glow responding to hover */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[100px] transition-all duration-1000 ${isHovering ? 'bg-[#5BC0EB]/15 scale-110' : 'bg-primary/5 scale-100'}`} />
      </div>

      <div className="container-global relative z-10">
        <div className="max-w-[1000px] mx-auto flex flex-col items-center">
          
          <div className="w-full relative min-h-[500px] flex flex-col items-center justify-center">
            <Tilt3D max={10} depth={20} className="w-full h-full preserve-3d absolute inset-0 flex items-center justify-center">
              
              {/* Central Power Core Element */}
              <DepthLayer depth={0} className="relative flex items-center justify-center preserve-3d">
                <div 
                  className="relative w-64 h-64 md:w-80 md:h-80 cursor-pointer group flex items-center justify-center"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  
                  {/* Base Ring Layer */}
                  <div className={`absolute inset-0 rounded-full border-2 transition-all duration-700 ${isHovering ? 'border-[#5BC0EB]/40 rotate-180 scale-110' : 'border-slate-200 border-dashed rotate-0 scale-100'}`} />
                  <div className={`absolute inset-4 rounded-full border border-primary/20 transition-all duration-1000 ${isHovering ? '-rotate-90 scale-105' : 'rotate-0 scale-100'}`} />
                  
                  {/* Central physical button */}
                  <div className={`w-40 h-40 md:w-48 md:h-48 rounded-full flex flex-col items-center justify-center z-20 backdrop-blur-md transition-all duration-500 shadow-[0_20px_40px_rgba(36,18,82,0.1),inset_0_4px_15px_rgba(255,255,255,1)] border-4 ${isHovering ? 'bg-white/90 border-[#5BC0EB]/50 scale-95 shadow-[0_10px_20px_rgba(6,182,212,0.3),inset_0_0_30px_rgba(6,182,212,0.1)]' : 'bg-white/70 border-white scale-100'}`}>
                    <Power className={`w-12 h-12 md:w-16 md:h-16 mb-2 transition-colors duration-500 ${isHovering ? 'text-[#5BC0EB]' : 'text-muted-foreground'}`} />
                    <span className={`text-[10px] md:text-xs font-bold tracking-widest uppercase transition-colors duration-500 ${isHovering ? 'text-[#5BC0EB]' : 'text-muted-foreground'}`}>
                      {isHovering ? 'System Ready' : 'Initialize'}
                    </span>
                  </div>

                  {/* Radiating Energy Waves on Hover */}
                  <motion.div 
                    animate={isHovering ? { scale: [1, 2], opacity: [0.5, 0] } : { scale: 1, opacity: 0 }}
                    transition={isHovering ? { duration: 1.5, repeat: Infinity, ease: "easeOut" } : { duration: 0 }}
                    className="absolute inset-0 rounded-full border-2 border-[#5BC0EB]"
                  />
                  <motion.div 
                    animate={isHovering ? { scale: [1, 1.8], opacity: [0.5, 0] } : { scale: 1, opacity: 0 }}
                    transition={isHovering ? { duration: 1.5, delay: 0.5, repeat: Infinity, ease: "easeOut" } : { duration: 0 }}
                    className="absolute inset-0 rounded-full border-2 border-primary"
                  />

                  {/* 3D Floating UI Elements */}
                  <DepthLayer depth={60} className={`absolute -top-12 -left-12 transition-all duration-700 ${isHovering ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <div className="glass-panel px-4 py-2 border border-[#5BC0EB]/30 shadow-sm flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-[#5BC0EB]" />
                      <span className="text-[10px] font-mono font-bold text-foreground">Boot Sequence Initiated</span>
                    </div>
                  </DepthLayer>
                  <DepthLayer depth={80} className={`absolute -bottom-8 -right-8 transition-all duration-700 delay-100 ${isHovering ? 'opacity-100 -translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                    <div className="glass-panel px-4 py-2 border border-primary/30 shadow-sm flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[10px] font-mono font-bold text-foreground">Core Online</span>
                    </div>
                  </DepthLayer>

                </div>
              </DepthLayer>
            </Tilt3D>
            
            {/* Front UI Content Overlay (Click-through) */}
            <div className="absolute inset-0 flex flex-col items-center justify-between pointer-events-none pb-12 pt-12 z-20">
              
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-slate-200 text-muted-foreground font-bold tracking-widest text-xs mb-8 uppercase">
                  <span className="w-2 h-2 rounded-full bg-[#5BC0EB] animate-pulse"></span>
                  Launch Portal
                </div>

                <h2 className="font-display text-4xl md:text-5xl lg:text-[56px] font-bold text-primary tracking-tight mb-4">
                  Start Your <span className="text-gradient-primary">Digital System.</span>
                </h2>
                
                <p className="text-lg text-foreground font-medium max-w-[560px] mx-auto">
                  Partner with our elite engineering team to construct secure, scalable infrastructure.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto">
                <Button 
                  size="lg" 
                  className={`text-base px-8 py-6 rounded-full font-bold transition-all duration-300 gap-2 shadow-lg ${isHovering ? 'bg-gradient-to-r from-primary to-[#5BC0EB] text-white hover:shadow-[0_10px_20px_rgba(6,182,212,0.3)] scale-105' : 'bg-primary text-white hover:bg-primary'}`}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  Deploy Project
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-base px-8 py-6 rounded-full bg-white hover:bg-muted border-slate-200 text-foreground font-bold gap-2"
                >
                  <MessageSquare className="w-5 h-5 text-muted-foreground" />
                  Talk to Our Team
                </Button>
              </div>

            </div>

          </div>
          
        </div>
      </div>
    </section>
  );
};
