import React from 'react';
import { ArchitecturalGrid } from '../../ui/ArchitecturalGrid';

export const HeroBackground = () => (
  <div className="absolute inset-0 z-0 pointer-events-none">
    <ArchitecturalGrid opacity={0.03} />
  </div>
);
