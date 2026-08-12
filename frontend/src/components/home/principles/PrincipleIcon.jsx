import React from 'react';

export const PrincipleIcon = ({ icon: Icon, colorClass = "text-orange-500" }) => {
  return (
    <div className="relative w-16 h-16 flex items-center justify-center transform-gpu preserve-3d group-hover:translate-z-10 transition-transform duration-500">
      <div className="absolute inset-0 bg-white shadow-xl rounded-xl border-[2px] border-primary shadow-[0_0_15px_rgba(36,18,82,0.15)] -rotate-3 group-hover:rotate-0 transition-transform duration-500"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-inner"></div>
      <Icon className={`relative z-10 w-8 h-8 ${colorClass}`} />
    </div>
  );
};
