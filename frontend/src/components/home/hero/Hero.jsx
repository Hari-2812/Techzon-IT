import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  ArrowRight,
  Mouse,
  ChevronDown
} from 'lucide-react';
import { Button } from '../../ui/Button';
import { GlobalNetworkGlobe } from './GlobalNetworkGlobe';


const TechnologyBadge = ({ name, description, iconUrl, position, delay, yRange, isActive, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      className={`absolute ${position} z-30 hidden md:flex items-center justify-center`}
    >
      <motion.button
        onClick={onClick}
        animate={{ y: yRange || [-4, 4, -4] }}
        transition={{ duration: 4 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }}
        className={`relative flex items-center gap-3 bg-white rounded-full px-4 py-3 border cursor-pointer transition-all duration-300 hover:-translate-y-1 ${
          isActive 
            ? 'border-[#5BC0EB] shadow-[0_8px_25px_rgba(91,192,235,0.4)] scale-105 z-40' 
            : 'border-[#D9F2FF] shadow-[0_6px_20px_rgba(11,45,77,0.06)] hover:border-[#5BC0EB] hover:shadow-[0_0_15px_rgba(91,192,235,0.25)] hover:scale-[1.04]'
        }`}
      >
        <div className="w-7 h-7 rounded-full bg-[#f8fafc] flex items-center justify-center overflow-hidden p-0.5">
          <img src={iconUrl} alt={name} className="w-full h-full object-contain pointer-events-none" />
        </div>
        <div className="flex flex-col items-start pr-2">
          <span className="text-[15px] font-bold text-[#0B2D4D] leading-tight">{name}</span>
          {isActive && (
            <motion.span 
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: 'auto' }} 
              className="text-[11px] font-medium text-[#1F2937] leading-tight mt-0.5"
            >
              {description}
            </motion.span>
          )}
        </div>

        {/* Active Indicator Dot */}
        {isActive && (
          <motion.div 
            layoutId="activeIndicator"
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#5BC0EB] shadow-[0_0_8px_#5BC0EB]" 
          />
        )}
      </motion.button>
    </motion.div>
  );
};

export const Hero = () => {
  const [activeTech, setActiveTech] = useState(null);

  const handleTechClick = (name) => {
    setActiveTech(prev => prev === name ? null : name);
  };
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate min-h-[100vh] overflow-hidden bg-[#FFFFFF]"
    >
      {/* Subtle Background Elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[5%] top-[10%] h-full w-[80%] bg-[radial-gradient(circle_at_center,rgba(217,242,255,0.4),transparent_50%)]" />
        <div className="absolute right-[20%] top-[30%] h-[60%] w-[60%] bg-[radial-gradient(circle_at_center,rgba(91,192,235,0.05),transparent_60%)]" />
      </div>

      <div className="container-global relative z-10 flex min-h-[100vh] items-center pt-28 pb-20 md:py-32">
        <div className="flex w-full flex-col items-center lg:flex-row lg:items-center">
          
          {/* =========================
              LEFT CONTENT (45%)
          ========================== */}
          <div className="z-20 flex w-full shrink-0 flex-col items-center text-center lg:w-[45%] lg:items-start lg:text-left pr-0 lg:pr-8">
            
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D9F2FF] bg-[#FFFFFF] px-4 py-1.5 shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5BC0EB] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#5BC0EB]" />
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.15em] text-[#0B2D4D]">
                Digital Engineering. Intelligent Solutions.
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              id="hero-title"
              className="font-display mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-bold leading-[1.1] tracking-[-0.02em]"
            >
              <span className="block">
                <span className="text-[#0B2D4D]">Digital </span>
                <span className="bg-gradient-to-r from-[#0B2D4D] to-[#5BC0EB] bg-clip-text text-transparent">Solutions</span>
              </span>
              <span className="mt-1 block text-[#1F2937]">
                That Move Your
              </span>
              <span className="mt-1 block">
                <span className="text-[#0B2D4D]">Business </span>
                <span className="text-[#FF8A3D]">Forward</span>
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-10 max-w-[580px] text-[16px] sm:text-[18px] lg:text-[20px] font-medium leading-[1.7] text-[#1F2937]"
            >
              From custom software and modern web applications to AI and cloud
              solutions, we help businesses turn complex ideas into powerful digital products.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 relative z-20 w-full lg:w-auto"
            >
              <Link to="/services" className="w-full sm:w-auto px-8 py-4 bg-[#FF8A3D] text-white rounded-[12px] font-bold tracking-wide text-[14px] hover:bg-[#e67a36] hover:-translate-y-0.5 transition-all shadow-[0_8px_20px_rgba(255,138,61,0.25)] flex items-center justify-center gap-2 group">
                Explore Our Services
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/portfolio" className="w-full sm:w-auto px-8 py-4 bg-white text-[#0B2D4D] border-2 border-[#5BC0EB]/30 rounded-[12px] font-bold tracking-wide text-[14px] hover:bg-[#D9F2FF]/30 hover:border-[#5BC0EB] transition-all flex items-center justify-center group">
                View Our Work
                <ArrowRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-2 group-hover:translate-x-1 transition-all" />
              </Link>
            </motion.div>

            {/* Trusted Technologies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-full mt-14 lg:mt-16"
            >
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#1F2937]/60 mb-4 text-center lg:text-left">
                Trusted Technologies
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 sm:gap-8 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" alt="AWS" className="h-6 object-contain" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original-wordmark.svg" alt="Google Cloud" className="h-6 object-contain" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original-wordmark.svg" alt="MongoDB" className="h-6 object-contain" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original-wordmark.svg" alt="Node.js" className="h-6 object-contain" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" className="h-5 object-contain" />
              </div>
            </motion.div>
          </div>

          {/* =========================
              RIGHT 3D ORBITAL VISUAL (55%)
          ========================== */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative flex min-h-[400px] sm:min-h-[500px] w-full items-center justify-center mt-12 lg:mt-0 lg:min-h-[700px] lg:w-[55%]"
          >
            {/* Tech Stack Floating Badges overlaying the canvas */}
            <TechnologyBadge 
              name="React" 
              description="Frontend UI"
              iconUrl="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" 
              position="top-[15%] left-[10%]" 
              delay={0.6} 
              isActive={activeTech === 'React'}
              onClick={() => handleTechClick('React')}
            />
            <TechnologyBadge 
              name="Node.js" 
              description="Backend Runtime"
              iconUrl="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" 
              position="top-[45%] left-[0%]" 
              delay={0.7} 
              yRange={[-5, 5, -5]}
              isActive={activeTech === 'Node.js'}
              onClick={() => handleTechClick('Node.js')}
            />
            <TechnologyBadge 
              name="MongoDB" 
              description="Database"
              iconUrl="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" 
              position="bottom-[20%] left-[12%]" 
              delay={0.8} 
              isActive={activeTech === 'MongoDB'}
              onClick={() => handleTechClick('MongoDB')}
            />
            <TechnologyBadge 
              name="AWS" 
              description="Cloud Infrastructure"
              iconUrl="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" 
              position="top-[20%] right-[5%]" 
              delay={0.9} 
              isActive={activeTech === 'AWS'}
              onClick={() => handleTechClick('AWS')}
            />
            <TechnologyBadge 
              name="Next.js" 
              description="Full-Stack Framework"
              iconUrl="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" 
              position="top-[50%] right-[-5%]" 
              delay={1.0} 
              yRange={[-3, 3, -3]}
              isActive={activeTech === 'Next.js'}
              onClick={() => handleTechClick('Next.js')}
            />
            <TechnologyBadge 
              name="TypeScript" 
              description="Typed JavaScript"
              iconUrl="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" 
              position="bottom-[25%] right-[8%]" 
              delay={1.1} 
              isActive={activeTech === 'TypeScript'}
              onClick={() => handleTechClick('TypeScript')}
            />

            <GlobalNetworkGlobe />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <div className="w-6 h-10 rounded-full border-2 border-[#5BC0EB]/30 flex justify-center p-1">
          <motion.div 
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-[#5BC0EB]"
          />
        </div>
      </motion.div>

    </section>
  );
};

export default Hero;