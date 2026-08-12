import React from 'react';

/**
 * Standard Enterprise Section Footer
 * Enforces vertical rhythm (80px top margin) for CTAs and bottom actions.
 */
export const SectionFooter = ({ 
  children, 
  className = '', 
  alignment = 'center',
  ...props 
}) => {
  const alignClass = alignment === 'center' ? 'mx-auto text-center justify-center' : 'text-left justify-start';

  return (
    <div 
      className={`w-full mt-[var(--space-7)] flex ${alignClass} ${className}`} 
      {...props}
    >
      {children}
    </div>
  );
};
