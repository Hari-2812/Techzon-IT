import React from 'react';

/**
 * Standard Enterprise Container
 * Enforces global max-width and horizontal padding tokens.
 */
export const Container = ({ children, className = '', size = 'default', ...props }) => {
  // size can be 'default' (1440px) or 'large' (1600px)
  const maxWidthClass = size === 'large' ? 'max-w-[var(--layout-content-lg)]' : 'max-w-[var(--layout-content)]';
  
  return (
    <div 
      className={`mx-auto w-full px-[20px] md:px-[40px] lg:px-[64px] xl:px-[80px] ${maxWidthClass} ${className}`} 
      {...props}
    >
      {children}
    </div>
  );
};
