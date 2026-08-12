import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Search, PenTool, Code2, Rocket } from 'lucide-react';
import { useReducedMotion } from '../visual-system';
import { cn } from '../../utils/cn';

export const ProblemSolvingJourney = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  const steps = [
    { num: '01', title: 'Understand', desc: 'Understand the business problem and requirements.', icon: Search },
    { num: '02', title: 'Strategize', desc: 'Define the right technology and solution architecture.', icon: PenTool },
    { num: '03', title: 'Build', desc: 'Design, develop and test the digital solution.', icon: Code2 },
    { num: '04', title: 'Scale', desc: 'Deploy, optimize and continuously improve.', icon: Rocket }
  ];

  return (
    <section ref={containerRef} className="relative py-24 md:py-32 bg-[#F8FAFC] border-t border-slate-200 overflow-hidden">
      <div className="container relative z-10 mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
        
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#1F2937] mb-6 tracking-tight">
            How We Solve Business Problems
          </h2>
          <p className="text-lg text-foreground font-medium">
            Our systematic engineering process transforms complex challenges into elegant digital solutions.
          </p>
        </div>

        {/* Desktop Horizontal Flow / Mobile Vertical Flow */}
        <div className="relative w-full">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-[60px] left-0 right-0 h-1 bg-gradient-to-r from-[#5BC0EB]/20 via-[#FF8A3D]/40 to-primary/20 z-0 rounded-full" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.num}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : index * 0.15 }}
                className="flex flex-col relative group"
              >
                {/* Node Icon */}
                <div className="w-24 h-24 md:w-28 md:h-28 mx-auto lg:mx-0 rounded-2xl bg-white border border-slate-200 shadow-[0_8px_32px_rgba(11,45,77,0.06)] flex flex-col items-center justify-center mb-8 relative transition-transform duration-300 group-hover:-translate-y-2 z-10">
                  <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shadow-md">
                    {step.num}
                  </span>
                  <div className="w-12 h-12 rounded-full bg-[#D9F2FF] flex items-center justify-center text-[#5BC0EB] group-hover:bg-[#FF8A3D]/10 group-hover:text-[#FF8A3D] transition-colors duration-300">
                    <step.icon className="w-6 h-6" />
                  </div>
                </div>

                {/* Content */}
                <div className="text-center lg:text-left">
                  <h3 className="text-xl font-bold text-primary mb-3">{step.title}</h3>
                  <p className="text-foreground text-sm md:text-base leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
