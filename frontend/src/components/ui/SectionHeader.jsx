import React from 'react';

/**
 * Standard Enterprise Section Header
 * Enforces vertical rhythm and max-width for headers.
 */
export const SectionHeader = ({ 
  label, 
  title, 
  description, 
  className = '', 
  alignment = 'center',
  ...props 
}) => {
  const alignClass = alignment === 'center' ? 'mx-auto text-center items-center' : 'text-left items-start';

  return (
    <div 
      className={`w-full max-w-[var(--layout-header)] flex flex-col mb-[var(--space-6)] ${alignClass} ${className}`} 
      {...props}
    >
      {label && (
        <div className="text-sm font-semibold text-primary uppercase tracking-[0.1em] mb-[var(--space-4)]">
          {label}
        </div>
      )}
      
      {title && (
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-[var(--space-4)] max-w-4xl">
          {title}
        </h2>
      )}
      
      {description && (
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
          {description}
        </p>
      )}
    </div>
  );
};
