import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Cpu, Globe, Server, Shield } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useReducedMotion } from '../visual-system';

export const WhoWeAre = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  const capabilities = [
    { icon: Cpu, label: 'Modern Engineering', color: '#5BC0EB' },
    { icon: Shield, label: 'Enterprise Security', color: 'var(--color-primary)' },
    { icon: Server, label: 'Scalable Architecture', color: '#FF8A3D' },
    { icon: Globe, label: 'Global Solutions', color: '#F4B942' }
  ];

  return (
    <section ref={containerRef} className="relative py-24 md:py-32 bg-white overflow-hidden">
      <div className="container relative z-10 mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Content */}
          <div className="lg:col-span-5 flex flex-col">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#1F2937] mb-6 tracking-tight">
              Who We Are
            </h2>
            <div className="w-12 h-1 bg-[#5BC0EB] mb-8 rounded-full" />
            
            <p className="text-base md:text-lg text-foreground mb-6 leading-relaxed">
              We are an elite collective of software engineers, system architects, and technical strategists. At Techzon, we believe that technology should serve the business, not complicate it.
            </p>
            <p className="text-base md:text-lg text-foreground leading-relaxed">
              We partner with forward-thinking enterprises to design, build, and deploy modern digital solutions. Our client-focused development approach ensures that every architecture decision directly supports scalable growth and operational excellence.
            </p>
          </div>

          {/* RIGHT: Visual */}
          <div className="lg:col-span-7 relative flex justify-center items-center perspective-[1200px]">
            <div className="relative w-full max-w-[600px] h-[400px] md:h-[500px] transform-style-3d">
              
              {/* Central Glass Core */}
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8, rotateY: -10 }}
                animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 m-auto w-[240px] h-[240px] md:w-[300px] md:h-[300px] bg-gradient-to-tr from-[#D9F2FF] to-white border border-[#5BC0EB]/30 rounded-full flex items-center justify-center shadow-[0_20px_60px_rgba(11,45,77,0.08)] backdrop-blur-xl z-20"
              >
                <div className="w-3/4 h-3/4 rounded-full border border-dashed border-primary/20 animate-[spin_60s_linear_infinite]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center shadow-lg transform rotate-45">
                     <span className="text-white font-bold text-2xl -rotate-45">T</span>
                  </div>
                </div>
              </motion.div>

              {/* Floating Nodes */}
              {capabilities.map((cap, i) => {
                const positions = [
                  { top: '10%', left: '10%' },
                  { top: '10%', right: '10%' },
                  { bottom: '10%', left: '10%' },
                  { bottom: '10%', right: '10%' }
                ];
                const pos = positions[i];

                return (
                  <motion.div
                    key={cap.label}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + (i * 0.1) }}
                    className={cn(
                      "absolute z-30 glass-panel bg-white/90 border border-slate-200 rounded-xl p-4 flex items-center gap-3 shadow-[0_8px_24px_rgba(11,45,77,0.06)] backdrop-blur-md"
                    )}
                    style={{ ...pos }}
                  >
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${cap.color}15`, color: cap.color }}>
                      <cap.icon className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-bold text-primary whitespace-nowrap">{cap.label}</span>
                  </motion.div>
                );
              })}
              
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
