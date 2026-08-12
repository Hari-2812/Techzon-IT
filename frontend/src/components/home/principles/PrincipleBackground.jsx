import React from 'react';

export const PrincipleBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 bg-[#F7F8FC]">
    <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-orange-100 opacity-30 blur-3xl" />
    <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-100 opacity-30 blur-3xl" />
    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#0B2D4D 0.5px, transparent 0.5px)', backgroundSize: '24px 24px', opacity: 0.05 }} />
  </div>
);
