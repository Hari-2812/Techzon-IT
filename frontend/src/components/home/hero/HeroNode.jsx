import React from 'react';
import { FloatingPanel } from '../../3d/FloatingPanel';
import { GlassReflection } from '../../3d/GlassReflection';

export const HeroNode = ({ 
  icon: Icon, 
  label, 
  subLabel,
  positionClass, 
  depth = 50, 
  delay = 0, 
  colorClass = "text-foreground",
  bgClass = "bg-white/60",
  borderClass = "border-slate-200",
  isSpecial = false
}) => {
  return (
    <div className={`absolute ${positionClass}`}>
      <FloatingPanel 
        variant="glass" 
        depth={depth} 
        delay={delay} 
        className={`w-14 h-14 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-2xl flex flex-col items-center justify-center p-2 ${bgClass} ${borderClass} shadow-lg overflow-hidden backdrop-blur-sm`}
      >
        <GlassReflection intensity={isSpecial ? 0.2 : 0.1} />
        <Icon className={`w-5 h-5 sm:w-7 sm:h-7 lg:w-8 lg:h-8 ${colorClass} mb-1 sm:mb-2`} />
        {subLabel ? (
          <>
            <div className={`font-bold text-[10px] sm:text-xs lg:text-sm ${colorClass} mb-0.5`}>{label}</div>
            <span className="text-[7px] sm:text-[8px] lg:text-[9px] font-bold uppercase tracking-wider text-muted-foreground">{subLabel}</span>
          </>
        ) : (
          <span className={`text-[8px] sm:text-[9px] lg:text-[10px] font-bold uppercase tracking-wider ${colorClass}`}>{label}</span>
        )}
      </FloatingPanel>
    </div>
  );
};
