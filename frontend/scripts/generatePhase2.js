import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = path.resolve('d:/project/Techzon IT Solutions/frontend/src');

// 1. Trusted Companies (Logo Marquee)
const trustedCode = `import React from 'react';
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
`;

// 2. Company Statistics (Animated Counters)
const statsCode = `import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

const Counter = ({ value, label, suffix = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const spring = useSpring(0, {
    mass: 1,
    stiffness: 50,
    damping: 15,
  });
  
  const display = useTransform(spring, (current) => Math.floor(current) + suffix);

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, value, spring]);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center p-6 text-center">
      <motion.div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/70 mb-2">
        {display}
      </motion.div>
      <div className="text-sm font-medium text-muted-foreground uppercase tracking-widest">{label}</div>
    </div>
  );
};

export const CompanyStatistics = () => {
  const stats = [
    { value: 500, label: "Projects Delivered", suffix: "+" },
    { value: 120, label: "Enterprise Clients", suffix: "+" },
    { value: 99, label: "Uptime SLA", suffix: ".99%" },
    { value: 24, label: "Support", suffix: "/7" },
    { value: 15, label: "Tech Partners", suffix: "+" }
  ];

  return (
    <section className="py-24 bg-background relative border-b border-border">
      <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {stats.map((stat, i) => (
            <Counter key={i} value={stat.value} label={stat.label} suffix={stat.suffix} />
          ))}
        </div>
      </div>
    </section>
  );
};
`;

// 3. Why Choose Techzon
const whyCode = `import React from 'react';
import { motion } from 'framer-motion';

const features = [
  { title: "Enterprise Architecture", desc: "Scalable, highly available microservices engineered for global loads.", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
  { title: "Security First", desc: "Military-grade encryption, zero-trust models, and ISO/SOC2 compliant operations.", icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" },
  { title: "AI Ready", desc: "Future-proof your data with natively integrated AI and machine learning pipelines.", icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
  { title: "Cloud Native", desc: "Agnostic deployments across AWS, Azure, and GCP ensuring zero vendor lock-in.", icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" },
  { title: "Dedicated Support", desc: "24/7 proactive monitoring and an elite team of on-call DevSecOps engineers.", icon: "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" },
  { title: "Performance Optimized", desc: "Edge caching, CDN routing, and sub-100ms response times guaranteed globally.", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
];

export const WhyChooseTechzon = () => {
  return (
    <section className="py-32 bg-background relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">Built for the demands of modern enterprise.</h2>
          <p className="text-lg text-muted-foreground">We do not just write code. We engineer mission-critical digital infrastructures that empower Fortune 500s to operate with absolute certainty.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative p-[1px] rounded-2xl bg-gradient-to-b from-border/50 to-transparent overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative h-full bg-card/50 backdrop-blur-sm p-8 rounded-2xl flex flex-col items-start border border-transparent">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={feature.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
`;

// 4. Technology Partners
const techCode = `import React from 'react';
import { motion } from 'framer-motion';

const partners = [
  "Amazon Web Services", "Microsoft Azure", "Google Cloud", 
  "MongoDB", "React", "Node.js", "Docker", "Kubernetes"
];

export const TechnologyPartners = () => {
  return (
    <section className="py-24 bg-background border-t border-border relative overflow-hidden">
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-secondary/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-16">Powered by industry-leading technologies.</h2>
        
        <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
          {partners.map((partner, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ scale: 1.05, borderColor: "hsl(var(--primary))" }}
              className="px-6 py-4 rounded-xl border border-border bg-card/30 backdrop-blur-sm shadow-sm cursor-default transition-colors duration-300"
            >
              <span className="font-semibold text-foreground/80">{partner}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
`;

fs.writeFileSync(path.join(baseDir, 'components/home', 'TrustedCompanies.jsx'), trustedCode);
fs.writeFileSync(path.join(baseDir, 'components/home', 'CompanyStatistics.jsx'), statsCode);
fs.writeFileSync(path.join(baseDir, 'components/home', 'WhyChooseTechzon.jsx'), whyCode);
fs.writeFileSync(path.join(baseDir, 'components/home', 'TechnologyPartners.jsx'), techCode);

// Update Home.jsx
const homeCode = `import React from 'react';
import { Hero } from '../components/home/Hero';
import { TrustedCompanies } from '../components/home/TrustedCompanies';
import { CompanyStatistics } from '../components/home/CompanyStatistics';
import { WhyChooseTechzon } from '../components/home/WhyChooseTechzon';
import { TechnologyPartners } from '../components/home/TechnologyPartners';

export const Home = () => {
  return (
    <div className="w-full">
      <Hero />
      <TrustedCompanies />
      <CompanyStatistics />
      <WhyChooseTechzon />
      <TechnologyPartners />
      {/* Remaining sections will be appended here in future phases */}
    </div>
  );
};
`;

fs.writeFileSync(path.join(baseDir, 'pages', 'Home.jsx'), homeCode);

console.log('Home Page Phase 2 components successfully generated.');
