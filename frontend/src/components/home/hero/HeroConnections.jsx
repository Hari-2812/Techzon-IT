import React from 'react';

export const HeroConnections = () => {
  return (
    <svg className="absolute inset-0 pointer-events-none w-full h-full preserve-3d -z-10" style={{ transform: 'translateZ(-20px)' }}>
      <line x1="50%" y1="50%" x2="20%" y2="20%" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4 4" className="animate-pulse" />
      <line x1="50%" y1="50%" x2="80%" y2="20%" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4 4" className="animate-pulse" />
      <line x1="50%" y1="50%" x2="10%" y2="50%" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4 4" className="animate-pulse" />
      <line x1="50%" y1="50%" x2="90%" y2="50%" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4 4" className="animate-pulse" />
      <line x1="50%" y1="50%" x2="20%" y2="80%" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4 4" className="animate-pulse" />
      <line x1="50%" y1="50%" x2="80%" y2="80%" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4 4" className="animate-pulse" />
      <line x1="50%" y1="50%" x2="50%" y2="10%" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4 4" className="animate-pulse" />
      <line x1="50%" y1="50%" x2="50%" y2="90%" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4 4" className="animate-pulse" />
    </svg>
  );
};
