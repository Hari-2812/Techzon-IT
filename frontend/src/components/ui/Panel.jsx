import React from 'react';

/**
 * Standard Enterprise Panel
 * Enforces internal padding tokens for surfaces.
 */
export const Panel = ({ 
  children, 
  className = '', 
  padding = 'default',
  ...props 
}) => {
  const paddingMap = {
    none: 'p-0',
    small: 'p-[var(--space-3)]', // 24px
    default: 'p-[var(--space-4)] md:p-[var(--space-5)]', // 32/48px
    large: 'p-[var(--space-5)] md:p-[var(--space-6)]' // 48/64px
  };

  return (
    <div 
      className={`w-full h-full flex flex-col ${paddingMap[padding] || paddingMap.default} ${className}`} 
      {...props}
    >
      {children}
    </div>
  );
};
