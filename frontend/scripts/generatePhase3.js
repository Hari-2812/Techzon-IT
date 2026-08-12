import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = path.resolve('d:/project/Techzon IT Solutions/frontend/src');

// 1. Services Preview
const servicesCode = `import React from 'react';
import { motion } from 'framer-motion';

const services = [
  { title: 'Website Development', desc: 'High-conversion, ultra-fast enterprise websites engineered for absolute scale.', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
  { title: 'Web Application Development', desc: 'Complex, mission-critical SaaS platforms with zero-trust security built-in.', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
  { title: 'Mobile App Development', desc: 'Native iOS and Android architectures utilizing cross-platform ecosystems.', icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z' },
  { title: 'Digital Marketing', desc: 'Data-driven growth hacking, analytics, and omni-channel acquisition strategies.', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
  { title: 'Search Engine Optimization', desc: 'Algorithmic DOM dominance ensuring top-tier organic visibility globally.', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
  { title: 'Cloud Solutions', desc: 'Serverless deployments, edge computing, and multi-cloud agnostic orchestration.', icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z' },
  { title: 'AI & Automation', desc: 'Machine learning pipelines and operational automation tailored for enterprise efficiency.', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { title: 'UI/UX Design', desc: 'Aesthetically flawless, psychologically mapped user experiences and interfaces.', icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01' },
];

export const ServicesPreview = () => {
  return (
    <section className="py-24 bg-background border-t border-border" id="services">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold text-primary uppercase tracking-widest mb-3"
          >
            Capabilities
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4"
          >
            Enterprise Digital Services
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            We deploy elite engineering squads to resolve complex technical debt and architect scalable growth engines.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative p-[1px] rounded-2xl bg-gradient-to-b from-border/50 to-transparent overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
              <div className="relative h-full bg-card/60 backdrop-blur-md p-6 rounded-2xl flex flex-col items-start border border-transparent shadow-sm">
                
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary transition-colors duration-300">
                  <svg className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={service.icon} />
                  </svg>
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-6">{service.desc}</p>
                
                <button className="mt-auto flex items-center gap-2 text-sm font-semibold text-primary group-hover:text-secondary transition-colors">
                  Learn more
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
`;

// 2. Development Process
const processCode = `import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const steps = [
  { num: '01', title: 'Discovery', desc: 'Deep-dive architectural review and requirement mapping.' },
  { num: '02', title: 'Planning', desc: 'Resource allocation, sprint structuring, and infrastructure design.' },
  { num: '03', title: 'UI/UX Design', desc: 'Wireframing, prototyping, and enterprise design system creation.' },
  { num: '04', title: 'Development', desc: 'Agile sprints executing scalable, microservices-driven code.' },
  { num: '05', title: 'Testing & QA', desc: 'Automated CI/CD pipelines, penetration testing, and zero-downtime validation.' },
  { num: '06', title: 'Deployment', desc: 'Containerized orchestration onto global edge networks.' },
  { num: '07', title: 'Maintenance', desc: '24/7 SLA-backed monitoring and continuous optimization.' },
];

export const DevelopmentProcess = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="py-24 bg-muted/20 relative" id="process">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">The Development Lifecycle</h2>
          <p className="text-lg text-muted-foreground">Absolute transparency and engineering precision from Day 1 to Production.</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Timeline Track (Desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-border -translate-x-1/2 rounded-full overflow-hidden">
            <motion.div 
              className="w-full bg-gradient-to-b from-primary to-secondary"
              style={{ height: pathHeight }}
            />
          </div>

          <div className="flex flex-col gap-12 md:gap-0">
            {steps.map((step, i) => {
              const isEven = i % 2 === 0;
              return (
                <div key={i} className={\`relative flex flex-col md:flex-row items-center \${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}\`}>
                  
                  {/* Step Content */}
                  <div className={\`w-full md:w-1/2 p-6 \${isEven ? 'md:text-right md:pr-16' : 'md:text-left md:pl-16'}\`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5 }}
                      className="bg-card/50 backdrop-blur-md p-6 rounded-2xl border border-border/50 hover:border-primary/50 transition-colors shadow-sm"
                    >
                      <div className="text-primary font-black text-4xl opacity-20 mb-2 leading-none">{step.num}</div>
                      <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                      <p className="text-muted-foreground text-sm">{step.desc}</p>
                    </motion.div>
                  </div>

                  {/* Indicator Node (Desktop) */}
                  <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background border-4 border-border items-center justify-center z-10 transition-colors duration-500 hover:border-primary">
                    <motion.div 
                      className="w-2 h-2 rounded-full bg-primary"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
`;

// 3. Technology Stack
const techStackCode = `import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const techData = [
  { name: 'React', category: 'Frontend' },
  { name: 'Vite', category: 'Frontend' },
  { name: 'Tailwind CSS', category: 'Frontend' },
  { name: 'Framer Motion', category: 'Frontend' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Express', category: 'Backend' },
  { name: 'MongoDB', category: 'Database' },
  { name: 'AWS', category: 'Cloud' },
  { name: 'Cloudinary', category: 'Cloud' },
  { name: 'Google Analytics', category: 'Marketing' },
  { name: 'Google Ads', category: 'Marketing' },
  { name: 'Meta Ads', category: 'Marketing' },
  { name: 'Figma', category: 'Design' },
  { name: 'Adobe XD', category: 'Design' },
];

const categories = ['All', ...new Set(techData.map(t => t.category))];

const TiltCard = ({ name }) => {
  const ref = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateXValue = ((y - centerY) / centerY) * -15;
    const rotateYValue = ((x - centerX) / centerX) * 15;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1, rotateX, rotateY }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="relative flex items-center justify-center p-6 bg-card/40 backdrop-blur-sm border border-border rounded-xl cursor-default group"
      style={{ perspective: 1000 }}
    >
      <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl blur-md" />
      <span className="relative z-10 font-bold text-foreground/80 group-hover:text-primary transition-colors">{name}</span>
    </motion.div>
  );
};

export const TechnologyStack = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const filteredTech = techData.filter(t => activeCategory === 'All' || t.category === activeCategory);

  return (
    <section className="py-24 bg-background border-t border-border">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">Enterprise Technology Ecosystem</h2>
          <p className="text-lg text-muted-foreground mb-8">We engineer using battle-tested, globally scaled technology frameworks.</p>
          
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={\`px-4 py-2 rounded-full text-sm font-semibold transition-all \${
                  activeCategory === cat 
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25' 
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }\`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filteredTech.map((tech) => (
              <TiltCard key={tech.name} name={tech.name} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
`;

fs.writeFileSync(path.join(baseDir, 'components/home', 'ServicesPreview.jsx'), servicesCode);
fs.writeFileSync(path.join(baseDir, 'components/home', 'DevelopmentProcess.jsx'), processCode);
fs.writeFileSync(path.join(baseDir, 'components/home', 'TechnologyStack.jsx'), techStackCode);

// Update Home.jsx
const homeCode = `import React from 'react';
import { Hero } from '../components/home/Hero';
import { TrustedCompanies } from '../components/home/TrustedCompanies';
import { CompanyStatistics } from '../components/home/CompanyStatistics';
import { WhyChooseTechzon } from '../components/home/WhyChooseTechzon';
import { TechnologyPartners } from '../components/home/TechnologyPartners';
import { ServicesPreview } from '../components/home/ServicesPreview';
import { DevelopmentProcess } from '../components/home/DevelopmentProcess';
import { TechnologyStack } from '../components/home/TechnologyStack';

export const Home = () => {
  return (
    <div className="w-full">
      <Hero />
      <TrustedCompanies />
      <CompanyStatistics />
      <WhyChooseTechzon />
      <TechnologyPartners />
      <ServicesPreview />
      <DevelopmentProcess />
      <TechnologyStack />
      {/* Remaining sections will be appended here in future phases */}
    </div>
  );
};
`;

fs.writeFileSync(path.join(baseDir, 'pages', 'Home.jsx'), homeCode);

console.log('Home Page Phase 3 components successfully generated.');
