import React from 'react';
import { cn } from '../../utils/cn';

export const DigitalEnvironment = ({ children, className }) => {
  return (
    <div className={cn("relative w-full min-h-screen bg-background overflow-hidden", className)}>
      {/* 
        This is the base wrapper for any spatial section. 
        It ensures proper overflow handling and basic perspective 
        if we want the entire section to act as a 3D volume.
      */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Soft Ambient V11 Light Lighting */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#D9F2FF] blur-[100px] opacity-80" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#FFFFFF] blur-[100px] opacity-80" />
      </div>
      
      {/* Foreground Content */}
      <div className="relative z-10 w-full h-full preserve-3d">
        {children}
      </div>
    </div>
  );
};
