import React from 'react';

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

export const SolutionShowcaseSection = () => {
  return (
    <section className="py-24 md:py-32 bg-white border-t border-slate-100">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-primary mb-6 uppercase tracking-tighter">
            BUSINESS CHALLENGE <span className="text-muted-foreground mx-2 md:mx-4 font-normal">→</span> DIGITAL SOLUTION
          </h2>
          <p className="text-xl text-foreground font-light max-w-2xl mx-auto">
            We engineer high-performance systems through a rigorous, proven methodology.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Continuous Flow Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-muted -translate-x-1/2 hidden md:block" />

          <div className="flex flex-col gap-12 md:gap-24 relative z-10">
            {pipelineSteps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={step.id} className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 w-full ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Empty space for alternating layout */}
                  <div className="hidden md:block md:w-1/2" />
                  
                  {/* Step Card */}
                  <div className="w-full md:w-1/2">
                    <div className="p-8 md:p-12 rounded-3xl border border-slate-200 bg-muted relative overflow-hidden group">
                      
                      <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-4">
                          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-foreground font-bold text-xs">
                            {step.id}
                          </span>
                          <span className={`text-sm font-bold tracking-widest uppercase ${step.color}`}>
                            {step.phase}
                          </span>
                        </div>
                        
                        <h3 className="text-2xl md:text-3xl font-extrabold text-primary mb-4 tracking-tight">
                          {step.title}
                        </h3>
                        <p className="text-foreground leading-relaxed text-lg font-light">
                          {step.description}
                        </p>
                      </div>

                    </div>
                  </div>
                  
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-24 max-w-3xl mx-auto">
          <div className="p-12 text-center rounded-3xl border border-slate-200 bg-muted relative overflow-hidden">
             <h3 className="text-3xl font-extrabold text-primary mb-6 uppercase tracking-tight relative z-10">
               Ready to Architect Your Solution?
             </h3>
             <button className="bg-primary text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm hover:bg-primary transition-colors shadow-sm relative z-10">
               Initiate Discovery
             </button>
          </div>
        </div>
      </div>
    </section>
  );
};
