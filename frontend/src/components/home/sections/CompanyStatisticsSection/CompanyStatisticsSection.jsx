import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { FloatingPanel } from '../../../3d/FloatingPanel';

const Counter = ({ value, label, suffix = "", prefix = "", decimals = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const spring = useSpring(0, {
    mass: 1,
    stiffness: 40,
    damping: 15,
  });
  
  const display = useTransform(spring, (current) => {
    return prefix + current.toFixed(decimals) + suffix;
  });

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, value, spring]);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center p-6 text-center">
      <motion.div className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-primary via-foreground to-foreground/70 mb-3 drop-shadow-sm">
        {display}
      </motion.div>
      <div className="text-sm md:text-base font-semibold text-muted-foreground uppercase tracking-widest leading-snug max-w-[150px]">{label}</div>
    </div>
  );
};

export const CompanyStatisticsSection = () => {
  const stats = [
    { value: 99.99, label: "Target Uptime Architecture", suffix: "%", decimals: 2 },
    { value: 0, label: "Trust Architecture Model", prefix: "Zero-" },
    { value: 100, label: "Code Peer Reviewed", suffix: "%" },
    { value: 24, label: "SecOps Monitoring", suffix: "/7" }
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden perspective-1000 z-20">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <FloatingPanel variant="glass" depth={20} className="rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl backdrop-blur-xl bg-white/40 max-w-6xl mx-auto transform-style-3d">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x divide-y md:divide-y-0 divide-border/50">
            {stats.map((stat, i) => (
              <Counter 
                key={i} 
                value={stat.value} 
                label={stat.label} 
                suffix={stat.suffix} 
                prefix={stat.prefix}
                decimals={stat.decimals}
              />
            ))}
          </div>
        </FloatingPanel>
      </div>
    </section>
  );
};
