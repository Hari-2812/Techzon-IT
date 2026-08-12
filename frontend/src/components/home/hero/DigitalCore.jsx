import React from 'react';
import { DepthLayer } from '../../3d/DepthLayer';
import { PerspectiveSurface } from '../../3d/PerspectiveSurface';
import { GlassReflection } from '../../3d/GlassReflection';
import { Server } from 'lucide-react';
import { HeroConnections } from './HeroConnections';

export const DigitalCore = ({ children }) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center preserve-3d">
      
      {/* Back Layer: Background Elements */}
      <DepthLayer depth={-50} className="absolute inset-0 flex items-center justify-center">
        <div className="w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] lg:w-[600px] lg:h-[600px] rounded-full border border-primary/5 animate-spin-slow" style={{ animationDuration: '30s' }} />
        <div className="absolute w-[200px] h-[200px] sm:w-[350px] sm:h-[350px] lg:w-[450px] lg:h-[450px] rounded-full border border-primary/10 animate-spin-slow" style={{ animationDuration: '20s', animationDirection: 'reverse' }} />
      </DepthLayer>

      {/* Connections */}
      <HeroConnections />

      {/* Central Core (Z-Index 30) */}
      <DepthLayer depth={30} className="relative z-30">
        <PerspectiveSurface className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-3xl flex flex-col items-center justify-center border border-primary/20 bg-white/80 backdrop-blur-md shadow-2xl overflow-hidden">
          <GlassReflection intensity={0.2} />
          <Server className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-primary mb-2 sm:mb-4 drop-shadow-md" />
          <div className="text-[10px] sm:text-xs lg:text-sm font-bold uppercase tracking-widest text-primary text-center leading-tight">Command<br/>Center</div>
          <div className="absolute -inset-4 sm:-inset-6 border-2 border-primary/30 rounded-3xl animate-pulse" />
        </PerspectiveSurface>
      </DepthLayer>

      {/* Surrounding Nodes */}
      {children}
    </div>
  );
};
