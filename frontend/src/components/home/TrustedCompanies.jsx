import React from 'react';
import { motion } from 'framer-motion';

const logos = [
  "Acme Corp", "GlobalTech", "Nexus Finance", "Stratos Industries", "Omni Systems",
  "Acme Corp", "GlobalTech", "Nexus Finance", "Stratos Industries", "Omni Systems"
];

export const TrustedCompanies = () => {
  return (
    <section className="py-20 bg-background border-b border-border overflow-hidden">
      <div className="container mx-auto px-6 mb-10 text-center">
        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">Trusted by industry leaders worldwide</p>
      </div>
      
      <div className="relative flex overflow-x-hidden group">
        {/* Left Gradient Mask */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        
        <motion.div 
          className="flex whitespace-nowrap items-center space-x-16 px-8"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
          style={{ width: "fit-content" }}
          whileHover={{ animationPlayState: "paused" }}
        >
          {logos.map((logo, i) => (
            <div key={i} className="text-2xl font-black text-muted-foreground/30 hover:text-foreground/80 transition-colors duration-300 select-none flex-shrink-0 cursor-default">
              {logo}
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {logos.map((logo, i) => (
            <div key={'dup-'+i} className="text-2xl font-black text-muted-foreground/30 hover:text-foreground/80 transition-colors duration-300 select-none flex-shrink-0 cursor-default">
              {logo}
            </div>
          ))}
        </motion.div>
        
        {/* Right Gradient Mask */}
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
};
