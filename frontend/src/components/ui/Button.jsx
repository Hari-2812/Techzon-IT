import React from 'react';
import { cn } from '../../utils/cn';

export const Button = React.forwardRef(({ className, variant = 'primary', size = 'md', isLoading, children, icon, ...props }, ref) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 tracking-wide';
  
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'bg-transparent text-[#111318] border border-[#E1E4EA] hover:border-primary hover:text-primary shadow-sm',
    ghost: 'bg-transparent text-primary hover:bg-[#F1F3F6]',
    icon: 'bg-transparent text-[#4B5563] hover:text-primary hover:bg-[#F8F9FC]'
  };

  const sizes = {
    xs: 'h-8 px-3 text-xs rounded-[4px] gap-1.5',
    sm: 'h-9 px-4 text-sm rounded-[4px] gap-2',
    md: 'h-11 px-6 text-base rounded-[4px] gap-2',
    lg: 'h-14 px-8 text-lg rounded-[8px] gap-3',
    icon: 'h-10 w-10 p-0 rounded-[4px] flex items-center justify-center'
  };

  return (
    <button 
      ref={ref} 
      className={cn(baseStyles, variants[variant], sizes[variant === 'icon' ? 'icon' : size], className)} 
      disabled={isLoading} 
      {...props}
    >
      {isLoading && (
        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {!isLoading && icon && (
        <span className="transition-transform duration-300">
          {icon}
        </span>
      )}
      {children}
    </button>
  );
});

Button.displayName = 'Button';