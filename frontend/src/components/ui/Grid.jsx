import React from 'react';

/**
 * Standard Enterprise Grid
 * Enforces 12-col desktop, 6-col tablet, 1-col mobile rules.
 */
export const Grid = ({ 
  children, 
  className = '', 
  gap = 'column',
  ...props 
}) => {
  const gapClass = gap === 'column' ? 'gap-[var(--space-5)]' : 'gap-[var(--space-4)]';

  return (
    <div 
      className={`grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 ${gapClass} ${className}`} 
      {...props}
    >
      {children}
    </div>
  );
};
