import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';
import { useReducedMotion } from './useReducedMotion';

export const DigitalNode = ({
  icon: Icon,
  title,
  subtitle,
  active = false,
  onClick,
  onHoverStart,
  onHoverEnd,
  className,
  as: Component = 'div',
  delay = 0,
  index = 0
}) => {
  const prefersReducedMotion = useReducedMotion();

  const handleFocus = () => {
    if (onHoverStart) onHoverStart();
  };

  const handleBlur = () => {
    if (onHoverEnd) onHoverEnd();
  };

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: prefersReducedMotion ? 0 : delay + (index * 0.1) }}
      className={cn("relative", className)}
    >
      <Component
        onClick={onClick}
        onMouseEnter={onHoverStart}
        onMouseLeave={onHoverEnd}
        onFocus={handleFocus}
        onBlur={handleBlur}
        tabIndex={onClick || onHoverStart ? 0 : undefined}
        className={cn(
          "group relative flex items-center p-2 pr-4 md:p-3 md:pr-6 rounded-full galaxy-node cursor-pointer transition-all duration-300 outline-none focus:ring-2 focus:ring-primary",
          active 
            ? 'border-primary/40 shadow-[0_8px_32px_rgba(118,87,217,0.15)] bg-white/90 scale-105' 
            : 'hover:bg-white/80 hover:border-primary/30 hover:shadow-[0_8px_24px_rgba(118,87,217,0.08)]'
        )}
      >
        {/* Node Icon */}
        <div className={cn(
          "relative w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center mr-3 transition-colors duration-300 z-10",
          active ? 'bg-primary/10' : 'bg-muted group-hover:bg-primary/5'
        )}>
          {Icon && (
            <Icon className={cn(
              "w-4 h-4 md:w-5 md:h-5 transition-all duration-300",
              active ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'
            )} />
          )}
        </div>

        {/* Node Text */}
        <div className="flex flex-col relative z-10">
          <span className={cn(
            "text-xs md:text-sm font-sans font-bold transition-colors duration-300 tracking-wide",
            active ? 'text-primary' : 'text-foreground group-hover:text-primary'
          )}>
            {title}
          </span>
          
          {/* Subtitle (Appears on Hover/Active) */}
          <AnimatePresence>
            {(active || subtitle) && (
              <motion.span 
                initial={subtitle && !active ? false : { opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className={cn(
                  "text-[9px] md:text-[10px] font-semibold uppercase tracking-wider overflow-hidden transition-all duration-300",
                  active ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                )}
              >
                {subtitle}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Inner Active Gradient */}
        <div className={cn(
          "absolute inset-0 rounded-full transition-opacity duration-500 pointer-events-none",
          active ? "opacity-100 bg-gradient-to-r from-primary/5 to-transparent" : "opacity-0"
        )} />

        {/* Active Ping */}
        {active && !prefersReducedMotion && (
          <div className="absolute inset-0 rounded-full border border-primary/30 animate-ping opacity-20 pointer-events-none" />
        )}
      </Component>
    </motion.div>
  );
};
