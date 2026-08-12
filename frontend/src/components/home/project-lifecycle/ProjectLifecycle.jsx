import React from 'react';
import { LifecycleBoard } from './LifecycleBoard';
import { StatusPanel } from './StatusPanel';
import { DeliverablesPanel } from './DeliverablesPanel';

export const ProjectLifecycle = () => {
  return (
    <section className="w-full bg-white pt-[140px] pb-[120px] relative overflow-hidden z-0">
      
      {/* Background styling */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="w-full h-full opacity-[0.03] z-[1]" style={{ backgroundImage: 'linear-gradient(rgba(36,18,82,1) 1px, transparent 1px), linear-gradient(90deg, rgba(36,18,82,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-[1500px]">
        
        {/* Header - Z-40 so nothing overlaps it */}
        <div className="relative text-center mb-[80px] max-w-3xl mx-auto z-40">
          <h2 className="text-4xl md:text-5xl font-black text-primary tracking-tight mb-[24px]">
            Our Project Delivery Lifecycle
          </h2>
          <p className="text-lg text-foreground font-medium leading-relaxed">
            From the first consultation to long-term support, every project follows a transparent, structured, and enterprise-grade delivery process.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
          
          {/* Main Board (Left/Center) */}
          <div className="lg:col-span-9 relative">
             <LifecycleBoard />
          </div>

          {/* Right Status Panel */}
          <div className="lg:col-span-3 relative z-10">
             <StatusPanel />
          </div>
        </div>

        {/* Bottom Deliverables */}
        <div className="mt-[100px] relative z-10">
          <DeliverablesPanel />
        </div>

      </div>
    </section>
  );
};
