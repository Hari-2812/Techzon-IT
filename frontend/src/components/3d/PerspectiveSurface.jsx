import React from 'react';
import { cn } from '../../utils/cn';

/**
 * PerspectiveSurface provides the elevated styling for major sections (like Hero center).
 */
export const PerspectiveSurface = ({ children, className }) => {
  return (
    <div className={cn("surface-elevated preserve-3d p-8 relative", className)}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent pointer-events-none" />
      <div className="relative z-10 preserve-3d">
        {children}
      </div>
    </div>
  );
};
