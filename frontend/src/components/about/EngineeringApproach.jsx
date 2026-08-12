import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Target, Zap, Lightbulb, ShieldCheck, Maximize } from 'lucide-react';
import { useReducedMotion } from '../visual-system';
import { cn } from '../../utils/cn';

export const EngineeringApproach = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  const principles = [
    { id: 'business', label: 'Business Understanding', icon: Target },
    { id: 'excellence', label: 'Engineering Excellence', icon: Zap },
    { id: 'innovation', label: 'Innovation', icon: Lightbulb },
    { id: 'quality', label: 'Quality', icon: ShieldCheck },
    { id: 'scalability', label: 'Scalability', icon: Maximize }
  ];

  return (
    <section ref={containerRef} className="relative py-24 md:py-32 bg-white overflow-hidden">
      <div className="container relative z-10 mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
        
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#1F2937] mb-6 tracking-tight">
            Engineering Principles
          </h2>
          <p className="text-lg text-foreground font-medium">
            Our core values drive every technical decision we make.
          </p>
        </div>

        {/* 3D Flow Visual */}
        <div className="relative w-full max-w-5xl mx-auto min-h-[400px] md:min-h-[500px] flex flex-col md:flex-row items-center justify-center gap-12 perspective-[1500px]">
          
          {/* Principles Stack */}
          <div className="flex flex-col gap-4 w-full md:w-1/2 max-w-md z-10">
            {principles.map((p, index) => (
              <motion.div
                key={p.id}
                initial={prefersReducedMotion ? false : { opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : index * 0.1 }}
                className="group relative flex items-center p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-[#5BC0EB] hover:shadow-[0_8px_24px_rgba(91,192,235,0.15)] transition-all duration-300 cursor-default"
              >
                <div className="w-10 h-10 rounded-lg bg-[#F8FAFC] flex items-center justify-center text-primary group-hover:bg-[#FF8A3D] group-hover:text-white transition-colors duration-300 shrink-0 mr-4">
                  <p.icon className="w-5 h-5" />
                </div>
                <span className="font-bold text-primary tracking-wide">{p.label}</span>
                
                {/* Connection point for desktop */}
                <div className="hidden md:block absolute top-1/2 -right-3 w-3 h-px bg-muted group-hover:bg-[#FF8A3D] transition-colors duration-300" />
              </motion.div>
            ))}
          </div>

          {/* Core Visual */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full md:w-1/2 flex items-center justify-center z-10"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border border-dashed border-[#5BC0EB]/40 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#D9F2FF]/40 to-transparent rounded-full animate-pulse" />
              <div className="w-40 h-40 md:w-48 md:h-48 glass-panel bg-white/80 border border-slate-200 shadow-[0_20px_60px_rgba(11,45,77,0.08)] rounded-full flex flex-col items-center justify-center backdrop-blur-xl relative z-20">
                <ShieldCheck className="w-10 h-10 text-primary mb-2" />
                <span className="text-[10px] font-extrabold text-primary tracking-widest uppercase text-center leading-tight">
                  ENGINEERING<br/>CORE
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
