import React from 'react';

/**
 * Standard Enterprise Section
 * Enforces global min-height and padding variants.
 */
export const Section = ({ 
  children, 
  variant = 'content', 
  className = '', 
  id,
  ...props 
}) => {
  let variantClass = '';

  switch (variant) {
    case 'hero':
      variantClass = 'lg:min-h-[100vh] flex items-center py-[var(--space-8)] lg:py-0';
      break;
    case 'feature':
      variantClass = 'lg:min-h-[90vh] flex items-center py-[var(--space-8)] lg:py-0';
      break;
    case 'content':
      variantClass = 'h-auto py-[var(--space-6)] lg:py-[var(--space-8)]';
      break;
    case 'compact':
      variantClass = 'h-auto py-[var(--space-5)] lg:py-[var(--space-7)]';
      break;
    default:
      variantClass = 'h-auto py-[var(--space-6)] lg:py-[var(--space-8)]';
  }

  return (
    <section 
      id={id}
      className={`relative w-full ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </section>
  );
};
