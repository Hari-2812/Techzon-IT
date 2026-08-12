import React from 'react';
import { ArrowRight } from 'lucide-react';

const SOLUTIONS = [
  { problem: "Manual business processes", solution: "Workflow automation and custom software" },
  { problem: "Slow or outdated websites", solution: "Modern, high-performance web applications" },
  { problem: "Disconnected business systems", solution: "Integrated APIs and centralized platforms" },
  { problem: "Data is difficult to understand", solution: "AI, analytics and intelligent dashboards" },
  { problem: "Systems cannot scale", solution: "Cloud-ready scalable architecture" },
];

export const ClientSolutions = () => {
  return (
    <section className="py-24 bg-white relative">
      <div className="container-global">
        
        <div className="text-center max-w-[700px] mx-auto mb-16">
          <div className="text-xs font-bold text-primary uppercase tracking-widest mb-4">WHAT PROBLEMS WE SOLVE</div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">
            Real Challenges. <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#5BC0EB]">Real Solutions.</span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {SOLUTIONS.map((item, idx) => (
            <div key={idx} className="flex flex-col md:flex-row items-center gap-4 md:gap-8 bg-muted p-6 md:p-8 rounded-2xl border border-slate-100 hover:border-primary/30 hover:shadow-md transition-all group">
              <div className="flex-1 w-full">
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">The Problem</div>
                <h3 className="text-xl font-bold text-primary">"{item.problem}"</h3>
              </div>
              
              <div className="w-12 h-12 shrink-0 rounded-full bg-white flex items-center justify-center text-primary shadow-sm transform group-hover:translate-x-2 transition-transform hidden md:flex">
                <ArrowRight className="w-5 h-5" />
              </div>
              <div className="md:hidden text-primary py-2">
                <ArrowRight className="w-5 h-5 rotate-90" />
              </div>
              
              <div className="flex-1 w-full bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group-hover:border-primary/40 transition-colors">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-[#5BC0EB]" />
                <div className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Our Solution</div>
                <h3 className="text-lg font-bold text-primary">{item.solution}</h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
