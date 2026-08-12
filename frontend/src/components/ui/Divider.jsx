import React from 'react';

/**
 * Standard Enterprise Divider
 * Semantic separator for sections or content blocks.
 */
export const Divider = ({ className = '', ...props }) => {
  return (
    <hr 
      className={`w-full border-t border-border my-[var(--space-5)] ${className}`} 
      {...props}
    />
  );
};
