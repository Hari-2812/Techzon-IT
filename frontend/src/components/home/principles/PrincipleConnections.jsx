import React from 'react';

export const PrincipleConnections = ({ isMobile }) => {
  if (isMobile) return null;
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none -z-10" style={{ filter: 'drop-shadow(0 0 8px rgba(249,115,22,0.3))' }}>
      <defs>
        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f97316" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#f97316" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#f97316" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      
      <line x1="50%" y1="50%" x2="25%" y2="15%" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="6 6">
        <animate attributeName="stroke-dashoffset" values="100;0" dur="3s" repeatCount="indefinite" />
      </line>
      <line x1="50%" y1="50%" x2="75%" y2="15%" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="6 6">
        <animate attributeName="stroke-dashoffset" values="100;0" dur="4s" repeatCount="indefinite" />
      </line>
      <line x1="50%" y1="50%" x2="20%" y2="50%" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="6 6">
        <animate attributeName="stroke-dashoffset" values="100;0" dur="3.5s" repeatCount="indefinite" />
      </line>
      <line x1="50%" y1="50%" x2="80%" y2="50%" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="6 6">
        <animate attributeName="stroke-dashoffset" values="100;0" dur="2.5s" repeatCount="indefinite" />
      </line>
      <line x1="50%" y1="50%" x2="50%" y2="85%" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="6 6">
        <animate attributeName="stroke-dashoffset" values="100;0" dur="3s" repeatCount="indefinite" />
      </line>
    </svg>
  );
};
