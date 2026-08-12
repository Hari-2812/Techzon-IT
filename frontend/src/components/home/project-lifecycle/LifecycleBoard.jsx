import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, LayoutDashboard, PenTool, Code2, ShieldCheck, Cloud, Headset, TrendingUp } from 'lucide-react';
import { LifecycleStage } from './LifecycleStage';

const stages = [
  { id: 1, title: 'Discovery', icon: Users, desc: 'Requirement Gathering\nBusiness Goals\nCompetitor Analysis' },
  { id: 2, title: 'Planning', icon: LayoutDashboard, desc: 'System Planning\nUser Flow\nDatabase Design' },
  { id: 3, title: 'UI / UX Design', icon: PenTool, desc: 'Wireframes\nPrototype\nResponsive Design' },
  { id: 4, title: 'Development', icon: Code2, desc: 'Frontend & Backend\nAPI & Database\nAuthentication' },
  { id: 5, title: 'Testing', icon: ShieldCheck, desc: 'QA & Bug Testing\nSecurity\nPerformance' },
  { id: 6, title: 'Deployment', icon: Cloud, desc: 'AWS & Domain\nSSL & Hosting\nCI/CD' },
  { id: 7, title: 'Support', icon: Headset, desc: 'Bug Fixes\nMonitoring\nMaintenance' },
  { id: 8, title: 'Growth', icon: TrendingUp, desc: 'SEO & Marketing\nOptimization\nNew Features' }
];

export const LifecycleBoard = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="relative w-full h-[650px] md:h-[800px] lg:h-[900px] flex items-center justify-center overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-[0_10px_40px_-15px_rgba(36,18,82,0.05)]">
      
      {/* Central "PROJECT" Node */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-32 h-32 md:w-40 md:h-40 bg-white rounded-full shadow-[0_20px_60px_-15px_rgba(36,18,82,0.15)] border border-gray-100 flex items-center justify-center flex-col">
        <span className="text-[#FF8A3D] font-black text-xs tracking-[0.2em] uppercase mb-1">Central</span>
        <span className="text-primary font-black text-xl tracking-tight">PROJECT</span>
      </div>

      {/* Circular arrangement of stages */}
      <div className="absolute inset-0">
        {stages.map((stage, i) => {
          // Calculate position on a circle
          const angle = (i * (360 / stages.length)) - 90; // Start at top (-90deg)
          const radius = typeof window !== 'undefined' && window.innerWidth < 768 ? 140 : 280;
          
          // Convert angle to radians
          const rad = angle * (Math.PI / 180);
          const x = `calc(50% + ${Math.cos(rad) * radius}px)`;
          const y = `calc(50% + ${Math.sin(rad) * radius}px)`;
          
          const isHovered = hovered === stage.id;
          
          return (
            <div 
              key={stage.id}
              className="absolute w-40 md:w-48 -ml-20 md:-ml-24 -mt-20 md:-mt-24 z-10"
              style={{ left: x, top: y }}
              onMouseEnter={() => setHovered(stage.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <LifecycleStage stage={stage} isHovered={isHovered} />
            </div>
          );
        })}
      </div>

      {/* SVG Connectors */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
             <stop offset="0%" stopColor="#0B2D4D" stopOpacity="0.1" />
             <stop offset="100%" stopColor="#FF8A3D" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="activeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
             <stop offset="0%" stopColor="#FF8A3D" />
             <stop offset="100%" stopColor="#0B2D4D" />
          </linearGradient>
        </defs>
        
        {/* Draw lines from center to each node */}
        {stages.map((stage, i) => {
          const angle = (i * (360 / stages.length)) - 90;
          const radius = typeof window !== 'undefined' && window.innerWidth < 768 ? 140 : 280;
          const rad = angle * (Math.PI / 180);
          
          // Approximating center percentages
          const x2 = 50 + (Math.cos(rad) * (radius / 8)); // Using % for SVG, rough approx for demo
          const y2 = 50 + (Math.sin(rad) * (radius / 8));
          
          const isHovered = hovered === stage.id;
          
          return (
            <g key={`conn-${stage.id}`}>
               <line 
                 x1="50%" y1="50%" 
                 x2={`${50 + Math.cos(rad)*35}%`} y2={`${50 + Math.sin(rad)*35}%`} 
                 stroke={isHovered ? "url(#activeGrad)" : "url(#lineGrad)"}
                 strokeWidth={isHovered ? "3" : "1"}
                 strokeDasharray={isHovered ? "none" : "4 4"}
                 className="transition-all duration-300"
               />
               {isHovered && (
                 <circle cx={`${50 + Math.cos(rad)*35}%`} cy={`${50 + Math.sin(rad)*35}%`} r="3" fill="#FF8A3D" />
               )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};
