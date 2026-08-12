import React from 'react';

export const PrincipleLighting = () => (
  <div className="absolute inset-0 pointer-events-none z-10 mix-blend-overlay">
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white opacity-40 blur-3xl rounded-full" />
    <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-white opacity-40 blur-3xl rounded-full" />
  </div>
);
