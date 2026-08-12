import React from 'react';
import { FileText, FileCode2, Layout, TestTube, Cloud, BookOpen, Presentation, CheckCircle2 } from 'lucide-react';

const deliverables = [
  { name: 'Requirement Document', icon: FileText },
  { name: 'Wireframes', icon: Layout },
  { name: 'Prototype', icon: Presentation },
  { name: 'Source Code', icon: FileCode2 },
  { name: 'Testing Report', icon: TestTube },
  { name: 'Deployment Guide', icon: Cloud },
  { name: 'Support Documents', icon: BookOpen },
  { name: 'Final Handover', icon: CheckCircle2 }
];

export const DeliverablesPanel = () => {
  return (
    <div className="w-full bg-white border border-gray-100 rounded-3xl p-8 shadow-[0_10px_40px_-15px_rgba(36,18,82,0.08)]">
      <h3 className="text-sm font-black uppercase tracking-widest text-primary mb-6 text-center">Client Deliverables</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {deliverables.map((item, i) => {
          const Icon = item.icon;
          return (
             <div key={i} className="flex flex-col items-center justify-center p-4 rounded-xl bg-muted border border-gray-100 hover:border-[#FF8A3D] hover:shadow-md transition-all duration-300 cursor-pointer group">
               <Icon className="w-6 h-6 text-muted-foreground group-hover:text-[#FF8A3D] mb-3 transition-colors duration-300" />
               <span className="text-[10px] md:text-xs font-semibold text-foreground text-center leading-tight group-hover:text-primary transition-colors duration-300">
                 {item.name}
               </span>
             </div>
          );
        })}
      </div>
    </div>
  );
};
