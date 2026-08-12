import React from 'react';
import { motion } from 'framer-motion';
import { DigitalEnvironment } from '../visual/DigitalEnvironment';
import { ArchitecturalGrid } from '../visual/ArchitecturalGrid';
import { Tilt3D } from '../3d/Tilt3D';
import { DepthLayer } from '../3d/DepthLayer';
import { FloatingPanel } from '../3d/FloatingPanel';

const pipelineSteps = [
  {
    id: "01",
    phase: "CHALLENGE",
    title: "The Business Friction",
    description: "Legacy monolithic platforms failing under extreme transaction loads, resulting in unacceptable latency, customer churn, and lost revenue during peak scaling events.",
    color: "text-red-600"
  },
  {
    id: "02",
    phase: "ANALYSIS",
    title: "Systemic Audit",
    description: "Deep telemetry and performance profiling revealed cascading database locks and tightly coupled synchronous services causing severe systemic bottlenecks.",
    color: "text-orange-600"
  },
  {
    id: "03",
    phase: "ARCHITECTURE",
    title: "Composable Design",
    description: "Designed a decoupled, event-driven microservices topology utilizing CQRS and Event Sourcing patterns to guarantee eventual consistency and independent scalability.",
    color: "text-secondary"
  },
  {
    id: "04",
    phase: "ENGINEERING",
    title: "Precision Execution",
    description: "Rewrote core transactional engines for memory safety and parallel processing, containerized and orchestrated on Kubernetes for resilience.",
    color: "text-indigo-600"
  },
  {
    id: "05",
    phase: "DEPLOYMENT",
    title: "Zero-Downtime Rollout",
    description: "Implemented a fully automated GitOps pipeline for progressive delivery, canary releases, and automated rollback capabilities.",
    color: "text-teal-600"
  },
  {
    id: "06",
    phase: "OUTCOME",
    title: "Digital Dominance",
    description: "Achieved sub-10ms p99 latency, 99.999% high availability, and dynamic auto-scaling that handles 10x traffic spikes effortlessly.",
    color: "text-emerald-600"
  }
];

export const SolutionShowcase = () => {
  return (
    <DigitalEnvironment className="py-32 bg-background relative overflow-hidden">
      <ArchitecturalGrid opacity={0.03} theme="light" />
      
      <div className="container relative z-10 mx-auto px-6 preserve-3d">
        <DepthLayer depth={40}>
          <div className="text-center max-w-4xl mx-auto mb-32">
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6 uppercase tracking-tighter">
              BUSINESS CHALLENGE <span className="text-primary mx-2 md:mx-4 opacity-50">→</span> DIGITAL SOLUTION
            </h2>
            <p className="text-xl text-secondary font-light">
              We engineer high-performance systems through a rigorous, proven methodology.
            </p>
          </div>
        </DepthLayer>

        <div className="relative max-w-5xl mx-auto">
          {/* Continuous Flow Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent -translate-x-1/2 hidden md:block" />

          <div className="flex flex-col gap-12 md:gap-24 relative z-10">
            {pipelineSteps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={step.id} className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 w-full ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Empty space for alternating layout */}
                  <div className="hidden md:block md:w-1/2" />
                  
                  {/* Step Card */}
                  <div className="w-full md:w-1/2 preserve-3d">
                    <Tilt3D intensity={2} perspective={1000}>
                      <DepthLayer depth={20}>
                        <FloatingPanel variant="glass" className="p-8 md:p-12 rounded-3xl border border-black/5 bg-white/70 backdrop-blur-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.08)] relative overflow-hidden group">
                          
                          {/* Editorial large number */}
                          <div className="absolute -right-4 -bottom-8 text-[10rem] md:text-[12rem] font-bold text-black/[0.03] leading-none select-none transition-transform duration-700 group-hover:scale-110 pointer-events-none">
                            {step.id}
                          </div>
                          
                          <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-4">
                              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-xs">
                                {step.id}
                              </span>
                              <span className={`text-sm font-bold tracking-widest uppercase ${step.color}`}>
                                {step.phase}
                              </span>
                            </div>
                            
                            <h3 className="text-2xl md:text-3xl font-extrabold text-foreground mb-4 tracking-tight">
                              {step.title}
                            </h3>
                            <p className="text-secondary leading-relaxed text-lg font-light">
                              {step.description}
                            </p>
                          </div>

                        </FloatingPanel>
                      </DepthLayer>
                    </Tilt3D>
                  </div>
                  
                </div>
              );
            })}
          </div>
        </div>

        <DepthLayer depth={30} className="mt-32 max-w-3xl mx-auto">
           <FloatingPanel variant="glass" className="p-12 text-center rounded-3xl border border-primary/10 bg-white/60 backdrop-blur-2xl shadow-[0_30px_100px_-20px_rgba(0,0,0,0.1)] relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
             <h3 className="text-3xl font-extrabold text-foreground mb-6 uppercase tracking-tight relative z-10">
               Ready to Architect Your Solution?
             </h3>
             <button className="bg-foreground text-background px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm hover:scale-105 transition-transform shadow-xl relative z-10">
               Initiate Discovery
             </button>
           </FloatingPanel>
        </DepthLayer>
      </div>
    </DigitalEnvironment>
  );
};
