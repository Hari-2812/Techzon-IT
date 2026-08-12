import React from 'react';
import { cn } from '../../utils/cn';

export const ArchitecturalGrid = ({ className, lineSpacing = 40, opacity = 0.05 }) => {
  return (
    <div className={cn("absolute inset-0 pointer-events-none overflow-hidden", className)}>
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="architectural-grid"
            width={lineSpacing}
            height={lineSpacing}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${lineSpacing} 0 L 0 0 0 ${lineSpacing}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity={opacity}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#architectural-grid)" />
      </svg>
      {/* Subtle radial gradient to simulate ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--background)_80%)]" />
    </div>
  );
};
