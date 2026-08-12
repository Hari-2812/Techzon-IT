import React, { useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { OrbitRing, useReducedMotion } from '../visual-system';
import { Tilt3D } from '../3d/Tilt3D';
import { DepthLayer } from '../3d/DepthLayer';

const MetricCounter = ({ value, label, suffix = "", delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();
  
  const spring = useSpring(0, {
    mass: 1,
    stiffness: 40,
    damping: 15,
  });
  
  const display = useTransform(spring, (current) => Math.floor(current) + suffix);

  useEffect(() => {
    if (isInView) {
      if (prefersReducedMotion) {
        spring.set(value);
      } else {
        setTimeout(() => spring.set(value), delay * 1000);
      }
    }
  }, [isInView, value, spring, prefersReducedMotion, delay]);

  return (
    <div ref={ref} className="relative w-[280px] h-[280px] flex items-center justify-center mx-auto perspective-[1000px]">
      <Tilt3D disabled={prefersReducedMotion} max={15} className="w-full h-full">
        {/* Orbital Rings Background */}
        <DepthLayer depth={-20} className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <OrbitRing radius={110} duration={30} className="opacity-[0.15]" />
            <OrbitRing radius={130} duration={45} className="opacity-[0.05]" active={isInView} />
          </div>
        </DepthLayer>

        {/* Metric Core Node */}
        <DepthLayer depth={30} className="absolute inset-0">
          <div className="relative group w-full h-full flex flex-col items-center justify-center text-center">
            {/* Soft Glow */}
            <div className="absolute inset-4 bg-gradient-to-br from-primary/10 to-[#5BC0EB]/10 rounded-full blur-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            {/* Glass Surface */}
            <div className="relative w-48 h-48 bg-white/80 backdrop-blur-md rounded-full flex flex-col items-center justify-center border border-slate-200 shadow-[0_10px_30px_rgba(118,87,217,0.08),inset_0_2px_10px_rgba(255,255,255,1)] group-hover:scale-105 group-hover:border-primary/30 transition-all duration-500">
              <motion.div className="text-4xl md:text-5xl font-extrabold text-primary tracking-tight">
                {display}
              </motion.div>
              <div className="text-xs font-bold text-primary tracking-widest uppercase mt-2 max-w-[120px]">
                {label}
              </div>
            </div>
          </div>
        </DepthLayer>
      </Tilt3D>
    </div>
  );
};

export const SuccessMetrics = () => {
  const metrics = [
    { value: 500, label: "Projects Delivered", suffix: "+" },
    { value: 120, label: "Enterprise Clients", suffix: "+" },
    { value: 99, label: "Infrastructure Uptime", suffix: ".99%" },
    { value: 15, label: "Technology Partners", suffix: "+" },
    { value: 24, label: "Support Availability", suffix: "/7" },
    { value: 100, label: "Client Satisfaction", suffix: "%" }
  ];

  return (
    <section className="py-24 md:py-32 bg-[#F8FAFC] relative border-t border-slate-200 overflow-hidden font-sans">
      
      {/* Background Ambience (Light Theme) */}
      <div className="absolute inset-0 pointer-events-none opacity-60">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl bg-gradient-to-tr from-primary/5 to-[#5BC0EB]/5 blur-[120px] rounded-full" />
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_center,rgba(118,87,217,0.03)_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        
        {/* SEO Heading Area */}
        <div className="text-center max-w-3xl mx-auto mb-20 relative z-30">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold text-primary uppercase tracking-widest mb-3"
          >
            Live Network Telemetry
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary mb-6"
          >
            Data <span className="text-gradient-galaxy">Orbit</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-foreground text-lg md:text-xl font-sans max-w-2xl mx-auto font-medium"
          >
            We measure our success purely by the operational velocity and stability we deliver to our clients.
          </motion.p>
        </div>
        
        {/* Data Orbits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
            >
              <MetricCounter 
                value={metric.value} 
                label={metric.label} 
                suffix={metric.suffix} 
                delay={i * 0.1}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
