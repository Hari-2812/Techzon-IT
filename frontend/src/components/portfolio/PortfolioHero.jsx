import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Code, Cloud, Smartphone, Zap, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Tilt3D } from '../3d/Tilt3D';
import { DepthLayer } from '../3d/DepthLayer';

export const PortfolioHero = () => {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden bg-[#F8FAFC] border-b border-slate-200">
      <div className="absolute inset-0 bg-primary/[0.02] bg-[size:50px_50px]" />
      
      <div className="container-global relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Text Content */}
          <div className="flex flex-col items-start text-left">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-[11px] md:text-xs font-bold text-primary uppercase tracking-widest mb-6 md:mb-8"
            >
              <Link to="/" className="hover:text-[#5BC0EB] transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <span>Selected Work</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl md:text-6xl lg:text-[64px] font-bold text-primary tracking-tight leading-[1.1] mb-6"
            >
              Digital Products<br />
              Built to Create <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#5BC0EB]">Impact.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-foreground max-w-[500px] font-medium leading-relaxed mb-10"
            >
              Explore digital products, platforms, and engineering solutions designed to solve real business challenges.
            </motion.p>
          </div>

          {/* Right: 3D Project Core */}
          <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center perspective-[1200px]">
            <Tilt3D max={10} depth={20} className="w-full h-full relative preserve-3d">
              {/* Central Core */}
              <DepthLayer depth={0} className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white/80 backdrop-blur-xl border border-slate-200 shadow-[0_0_40px_rgba(11,45,77,0.1)] flex flex-col items-center justify-center relative z-20">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-[#5BC0EB] flex items-center justify-center mb-2 shadow-inner">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-primary">Project Core</span>
                </div>
              </DepthLayer>

              {/* Floating Nodes */}
              <DepthLayer depth={40} className="absolute inset-0 pointer-events-none preserve-3d">
                <FloatingNode icon={Code} label="WEB" x="20%" y="20%" delay={0} />
                <FloatingNode icon={Cpu} label="AI" x="80%" y="30%" delay={0.2} />
                <FloatingNode icon={Cloud} label="CLOUD" x="15%" y="70%" delay={0.4} />
                <FloatingNode icon={Smartphone} label="MOBILE" x="75%" y="80%" delay={0.6} />
              </DepthLayer>
              
            </Tilt3D>
          </div>

        </div>
      </div>
    </section>
  );
};

const FloatingNode = ({ icon: Icon, label, x, y, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.8, ease: "easeOut" }}
    className="absolute flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-200 shadow-sm"
    style={{ left: x, top: y, transform: "translate(-50%, -50%)" }}
  >
    <Icon className="w-4 h-4 text-primary" />
    <span className="text-[10px] font-bold tracking-widest text-primary uppercase">{label}</span>
  </motion.div>
);
