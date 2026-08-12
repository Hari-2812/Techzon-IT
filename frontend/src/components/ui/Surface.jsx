import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Standard Enterprise Surface
 * Enforces the 3-layer depth system and V9.0 surface primitives.
 */
export const Surface = ({ 
  children, 
  variant = 'panel', 
  className = '', 
  ...props 
}) => {
  const variants = {
    flat: 'surface-flat',
    panel: 'surface-panel',
    featured: 'surface-featured',
  };

  return (
    <div 
      className={cn(variants[variant] || variants.panel, className)} 
      {...props}
    >
      {children}
    </div>
  );
};
