import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Globe2, Code2, Brain, Cloud, Palette, ShieldCheck, ArrowRight } from 'lucide-react';
import { useReducedMotion } from '../../../visual-system';

const SERVICES = [
  {
    id: "web-development",
    title: "Web Development",
    shortTitle: "Web",
    description: "High-performance websites and modern web applications built around your business goals.",
    icon: Globe2,
    accent: "purple",
    // 3D positioning
    x: 20, y: 30
  },
  {
    id: "software-development",
    title: "Custom Software",
    shortTitle: "Software",
    description: "Scalable software platforms designed to simplify operations and support business growth.",
    icon: Code2,
    accent: "blue",
    x: 80, y: 70
  },
  {
    id: "ai-data",
    title: "AI & Data Solutions",
    shortTitle: "AI & Data",
    description: "Intelligent data-driven solutions that help businesses automate decisions and uncover insights.",
    icon: Brain,
    accent: "cyan",
    x: 50, y: 15
  },
  {
    id: "cloud-solutions",
    title: "Cloud Solutions",
    shortTitle: "Cloud",
    description: "Secure and scalable cloud architecture designed for reliability, performance and growth.",
    icon: Cloud,
    accent: "orange",
    x: 80, y: 30
  },
  {
    id: "ui-ux",
    title: "UI/UX Design",
    shortTitle: "Design",
    description: "Modern user experiences that make complex digital products simple and engaging.",
    icon: Palette,
    accent: "pink",
    x: 20, y: 70
  },
  {
    id: "cyber-security",
    title: "Cyber Security",
    shortTitle: "Security",
    description: "Security-focused engineering practices that help protect applications, systems and data.",
    icon: ShieldCheck,
    accent: "purple",
    x: 50, y: 85
  }
];

export const ServicesSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  const getAccentColor = (accent) => {
    switch (accent) {
      case 'purple': return 'rgba(118,87,217,1)';
      case 'blue': return 'rgba(59,130,246,1)';
      case 'cyan': return 'rgba(6,182,212,1)';
      case 'orange': return 'rgba(249,115,22,1)';
      case 'pink': return 'rgba(236,72,153,1)';
      default: return 'rgba(118,87,217,1)';
    }
  };

  return (
    <section className="py-16 md:py-24 bg-[#F8FAFC] overflow-hidden border-t border-slate-100 relative font-sans" id="services" ref={containerRef}>
      
      {/* Background Atmosphere */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-primary/10 to-[#5BC0EB]/10 rounded-full blur-[100px]" />
      </div>

      <div className="container-global relative z-10">
        
        {/* SEO HTML Heading Area */}
        <div className="text-center max-w-[600px] mx-auto mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-[48px] font-display font-bold tracking-tight text-primary mb-6">
            Digital Solutions Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#5BC0EB]">Business Growth</span>
          </h2>
        </div>

        {/* Desktop 3D Ecosystem (Hidden on Mobile) */}
        <div className="hidden lg:block relative w-full h-[700px] perspective-[1500px] max-w-6xl mx-auto mb-16">
          <div className="absolute inset-0 preserve-3d">
            
            {/* SVG Connection Paths */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ transform: 'translateZ(-10px)' }}>
              <defs>
                <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(118,87,217,0.1)" />
                  <stop offset="100%" stopColor="rgba(6,182,212,0.1)" />
                </linearGradient>
              </defs>
              {isInView && SERVICES.map((service, idx) => (
                <motion.path
                  key={`path-${idx}`}
                  d={`M 50% 50% Q ${50 + (service.x - 50) / 2}% ${service.y}% ${service.x}% ${service.y}%`}
                  fill="none"
                  stroke="url(#path-gradient)"
                  strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 0.5 + idx * 0.1, ease: "easeOut" }}
                />
              ))}
            </svg>

            {/* Central Core */}
            <motion.div 
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 group"
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            >
              <div className="relative w-48 h-48 bg-white/60 backdrop-blur-xl border border-slate-200/50 rounded-full flex flex-col items-center justify-center shadow-[0_0_40px_rgba(118,87,217,0.1),inset_0_0_20px_rgba(255,255,255,1)]">
                {/* Subtle rings */}
                <div className="absolute inset-[-20px] border border-primary/10 rounded-full" />
                <div className="absolute inset-[-40px] border border-[#5BC0EB]/10 rounded-full" />
                
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/10 to-[#5BC0EB]/10 flex items-center justify-center mb-2">
                  <div className="w-3 h-3 bg-primary rounded-full shadow-[0_0_15px_#0B2D4D]" />
                </div>
                <div className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase mb-1">Techzon</div>
                <div className="text-sm font-bold text-primary">Digital Core</div>
              </div>
            </motion.div>

            {/* Service Nodes */}
            {SERVICES.map((service, idx) => (
              <motion.div
                key={service.id}
                className="absolute z-30"
                style={{ 
                  left: `${service.x}%`, 
                  top: `${service.y}%`,
                  transform: 'translate(-50%, -50%) translateZ(20px)'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.5 + idx * 0.1 }}
              >
                {!prefersReducedMotion && isInView && (
                  <motion.div
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 4 + (idx % 2), repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ServiceNode service={service} getAccentColor={getAccentColor} />
                  </motion.div>
                )}
                {(prefersReducedMotion || !isInView) && (
                   <ServiceNode service={service} getAccentColor={getAccentColor} />
                )}
              </motion.div>
            ))}

          </div>
        </div>

        {/* Mobile/Tablet Stacked Layout */}
        <div className="lg:hidden flex flex-col items-center gap-6 mb-16 relative">
          
          <div className="w-full flex justify-center mb-8">
            <div className="w-40 h-40 bg-white/60 backdrop-blur-xl border border-slate-200/50 rounded-full flex flex-col items-center justify-center shadow-[0_0_40px_rgba(118,87,217,0.1)] relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/10 to-[#5BC0EB]/10 flex items-center justify-center mb-2">
                <div className="w-2.5 h-2.5 bg-primary rounded-full shadow-[0_0_15px_#0B2D4D]" />
              </div>
              <div className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase mb-1">Techzon</div>
              <div className="text-xs font-bold text-primary">Digital Core</div>
            </div>
          </div>

          {SERVICES.map((service, idx) => (
            <motion.div
              key={service.id}
              className="w-full max-w-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <ServiceNode service={service} getAccentColor={getAccentColor} />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center z-40 relative">
          <Link to="/services" className="btn-primary px-8 py-4 rounded-xl font-bold flex items-center gap-2 group">
            Explore Our Services
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
};

const ServiceNode = ({ service, getAccentColor }) => {
  const Icon = service.icon;
  const accentHex = getAccentColor(service.accent);

  return (
    <div className="group relative w-[240px] md:w-[260px] cursor-pointer">
      {/* Hover glow */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 pointer-events-none" 
        style={{ backgroundColor: accentHex, opacity: 0.15 }}
      />
      
      {/* Main Glass Box */}
      <div className="relative bg-white/70 backdrop-blur-xl border border-slate-200/60 p-6 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.03)] group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] group-hover:-translate-y-2 transition-all duration-300">
        
        {/* Subtle gradient border overlay for hover */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-white/50 transition-colors pointer-events-none" />
        
        <div className="flex items-center gap-4 mb-4">
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-inner"
            style={{ backgroundColor: `${accentHex.replace('1)', '0.1)')}`, color: accentHex }}
          >
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-primary leading-tight">{service.title}</h3>
          </div>
        </div>
        
        <p className="text-xs text-foreground leading-relaxed font-medium">
          {service.description}
        </p>

      </div>
    </div>
  );
};
