import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronRight, ArrowDown, Settings, Code, Activity, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { useReducedMotion } from '../visual-system';

export const AboutHero = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  const flowSteps = [
    { id: 'problem', label: 'BUSINESS PROBLEM', icon: Settings, color: '#FF8A3D' },
    { id: 'engineering', label: 'TECHZON ENGINEERING', icon: Code, color: '#5BC0EB' },
    { id: 'solution', label: 'DIGITAL SOLUTION', icon: Activity, color: 'var(--color-primary)' },
    { id: 'growth', label: 'BUSINESS GROWTH', icon: TrendingUp, color: '#F4B942' },
  ];

  return (
    <section ref={containerRef} className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden bg-[#F8FAFC] border-b border-slate-200">
      
      {/* Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#D9F2FF]/50 to-transparent rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#5BC0EB]/10 to-transparent rounded-full blur-[80px] -translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Content */}
          <div className="flex flex-col">
            <motion.div 
              initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-sm text-primary font-bold tracking-widest uppercase mb-8"
            >
              <span>About Techzon</span>
            </motion.div>

            <motion.h1 
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: prefersReducedMotion ? 0 : 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-[#1F2937] mb-6 leading-[1.1] tracking-tight"
            >
              Building <span className="bg-gradient-to-r from-[#5BC0EB] to-primary bg-clip-text text-transparent">Digital Solutions</span><br className="hidden md:block" />
              That Solve Real Business Problems.
            </motion.h1>

            <motion.p 
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: prefersReducedMotion ? 0 : 0.2 }}
              className="text-lg md:text-xl text-foreground max-w-xl leading-relaxed font-medium mb-10"
            >
              Techzon helps businesses turn complex ideas into scalable digital products through modern software engineering, AI, cloud, and automation.
            </motion.p>
          </div>

          {/* RIGHT: 3D Flow Visual */}
          <div className="relative w-full min-h-[400px] md:min-h-[500px] flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[400px] flex flex-col items-center gap-4 md:gap-6 perspective-[1000px] transform-style-3d">
              
              {flowSteps.map((step, index) => (
                <React.Fragment key={step.id}>
                  {/* Node */}
                  <motion.div
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 20, rotateX: 10 }}
                    animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                    transition={{ duration: 0.6, delay: prefersReducedMotion ? 0 : index * 0.15 }}
                    className="w-full relative z-10 glass-panel bg-white/80 border border-slate-200 shadow-[0_8px_32px_rgba(11,45,77,0.06)] rounded-2xl p-4 md:p-5 flex items-center gap-4 overflow-hidden group hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(11,45,77,0.12)] transition-all duration-300 cursor-default"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-slate-100 shadow-sm" style={{ backgroundColor: `${step.color}15`, color: step.color }}>
                      <step.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-primary text-sm md:text-base uppercase tracking-wide">{step.label}</h3>
                    </div>
                  </motion.div>

                  {/* Connection */}
                  {index < flowSteps.length - 1 && (
                    <motion.div
                      initial={prefersReducedMotion ? false : { opacity: 0, height: 0 }}
                      animate={isInView ? { opacity: 1, height: 24 } : {}}
                      transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : (index * 0.15) + 0.1 }}
                      className="w-px bg-gradient-to-b from-slate-300 to-slate-400 relative z-0 flex justify-center"
                    >
                      <ArrowDown className="w-4 h-4 text-muted-foreground absolute -bottom-2 bg-[#F8FAFC]" />
                    </motion.div>
                  )}
                </React.Fragment>
              ))}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
