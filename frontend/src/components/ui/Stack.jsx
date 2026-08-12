import React from 'react';

/**
 * Standard Enterprise Vertical Stack
 * Enforces vertical spacing tokens between elements.
 */
export const Stack = ({ 
  children, 
  className = '', 
  space = 4, // 1 to 8 mapped to --space-X
  alignment = 'start',
  ...props 
}) => {
  const alignMap = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch'
  };

  return (
    <div 
      className={`flex flex-col ${alignMap[alignment] || 'items-start'} ${className}`} 
      style={{ gap: `var(--space-${space})` }}
      {...props}
    >
      {children}
    </div>
  );
};
