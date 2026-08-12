import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Server, Globe2, ShieldCheck, Cpu, ArrowRight } from 'lucide-react';
import { ArchitecturalGrid } from '../../visual/ArchitecturalGrid';
import { DigitalEnvironment } from '../../visual/DigitalEnvironment';
import { Tilt3D } from '../../3d/Tilt3D';
import { DepthLayer } from '../../3d/DepthLayer';
import { PerspectiveSurface } from '../../3d/PerspectiveSurface';

export const ServiceOverview = ({ content }) => (
  <DigitalEnvironment className="py-24">
    <ArchitecturalGrid opacity={0.1} />
    <div className="container relative z-10 mx-auto px-6 preserve-3d">
      <Tilt3D intensity={5} perspective={1500}>
        <DepthLayer depth={20} className="max-w-4xl mx-auto">
          <PerspectiveSurface className="p-8 md:p-12 prose prose-invert prose-lg text-secondary">
            <h2 className="text-3xl font-bold text-foreground mb-6">Service Overview</h2>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </PerspectiveSurface>
        </DepthLayer>
      </Tilt3D>
    </div>
  </DigitalEnvironment>
);

export const ServiceFeaturesGrid = ({ features }) => {
  if (!features || features.length === 0) return null;
  return (
    <DigitalEnvironment className="py-24 bg-background/50 border-y border-white/5">
      <div className="container mx-auto px-6 preserve-3d">
        <DepthLayer depth={10}>
          <h2 className="text-3xl font-bold text-center text-foreground mb-16">Enterprise Capabilities</h2>
        </DepthLayer>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 preserve-3d">
          {features.map((feat, i) => (
            <Tilt3D key={i} intensity={10} depth={20 + i * 5} className="h-full">
              <div className="h-full surface-panel p-8 group relative flex flex-col items-start transition-all duration-300 hover:surface-elevated hover:border-primary/50">
                <CheckCircle2 className="w-8 h-8 text-accent mb-4 group-hover:text-accent-light transition-colors" />
                <h4 className="text-lg font-bold text-foreground mb-2">{typeof feat === 'string' ? feat : feat.title}</h4>
                {feat.description && <p className="text-sm text-secondary">{feat.description}</p>}
              </div>
            </Tilt3D>
          ))}
        </div>
      </div>
    </DigitalEnvironment>
  );
};

export const ServiceProcessTimeline = ({ process }) => {
  const [activeStage, setActiveStage] = useState(0);

  if (!process || process.length === 0) return null;

  return (
    <DigitalEnvironment className="py-32 bg-background relative">
      <ArchitecturalGrid perspective={true} opacity={0.08} size={80} />
      
      <div className="container relative z-10 mx-auto px-6 preserve-3d">
        <DepthLayer depth={40}>
          <h2 className="text-4xl font-bold text-center text-foreground mb-20 tracking-tight">HOW WE BUILD</h2>
        </DepthLayer>
        
        {/* 3D Perspective Pipeline */}
        <div className="relative max-w-6xl mx-auto h-[400px] flex items-center justify-center preserve-3d perspective-container">
          <Tilt3D intensity={15} perspective={2000} className="w-full h-full flex items-center justify-center">
             <div className="flex gap-4 w-full h-full items-center justify-center preserve-3d" style={{ transform: 'rotateX(10deg)' }}>
                {process.map((step, i) => {
                  const isActive = i === activeStage;
                  const isPast = i < activeStage;
                  
                  return (
                    <div 
                      key={i}
                      onMouseEnter={() => setActiveStage(i)}
                      className="relative cursor-pointer transition-all duration-500 ease-out preserve-3d"
                      style={{
                        transform: isActive ? 'translateZ(100px) scale(1.1)' : `translateZ(${isPast ? -50 : 0}px) scale(${isPast ? 0.9 : 1})`,
                        opacity: isActive ? 1 : 0.5,
                        zIndex: isActive ? 50 : 10
                      }}
                    >
                       <div className={`surface-panel w-32 md:w-40 p-4 text-center border-t-2 ${isActive ? 'border-t-accent bg-surface-elevated shadow-elevated' : 'border-t-primary'}`}>
                          <div className="text-xs text-secondary mb-1">STAGE 0{i + 1}</div>
                          <h4 className="text-sm font-bold text-foreground uppercase tracking-wider">
                            {typeof step === 'string' ? step : step.title}
                          </h4>
                       </div>
                    </div>
                  );
                })}
             </div>
          </Tilt3D>
        </div>
      </div>
    </DigitalEnvironment>
  );
};

export const ServiceTechStack = ({ techs }) => {
  if (!techs || techs.length === 0) return null;
  return (
    <DigitalEnvironment className="py-24 bg-background/80 border-y border-white/5 relative">
      <div className="container mx-auto px-6 preserve-3d">
        <h2 className="text-3xl font-bold text-center text-foreground mb-16">Technology Ecosystem</h2>
        
        <Tilt3D intensity={8} perspective={1500} depth={20}>
          <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto preserve-3d">
            {techs.map((tech, i) => (
              <DepthLayer key={i} depth={Math.random() * 40} className="transition-transform duration-500 hover:translate-z-50">
                <div className="px-6 py-3 surface-panel flex items-center gap-2 hover:border-primary/50 cursor-default group">
                  <Cpu className="w-4 h-4 text-primary group-hover:text-accent transition-colors" />
                  <span className="font-semibold text-foreground text-sm tracking-wide">{tech}</span>
                </div>
              </DepthLayer>
            ))}
          </div>
        </Tilt3D>
      </div>
    </DigitalEnvironment>
  );
};
