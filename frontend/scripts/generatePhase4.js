import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = path.resolve('d:/project/Techzon IT Solutions/frontend/src');

// 1. Featured Portfolio
const portfolioCode = `import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../config/axios';
import { Button } from '../ui/Button';
import { Loader2, AlertCircle, Briefcase, ArrowRight, ExternalLink } from 'lucide-react';

const PortfolioCard = ({ project, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
    whileHover={{ y: -8 }}
    className="group relative rounded-2xl bg-gradient-to-b from-border/50 to-transparent p-[1px] overflow-hidden flex flex-col h-full"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
    <div className="relative flex-1 bg-card/60 backdrop-blur-md rounded-2xl overflow-hidden border border-transparent shadow-sm flex flex-col">
      
      {/* Image Container with Zoom */}
      <div className="relative aspect-video overflow-hidden bg-muted">
        {project.image ? (
          <img 
            src={project.image} 
            alt={project.title} 
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-primary/5">
            <Briefcase className="w-12 h-12 text-primary/40" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full bg-background/80 backdrop-blur-md text-xs font-semibold text-foreground border border-border/50">
            {project.category || 'Enterprise Solution'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-3 flex-1">
          {project.description || project.shortDescription}
        </p>
        
        {/* Technologies */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.slice(0, 3).map((tech, i) => (
              <span key={i} className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md">
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
        )}

        <div className="mt-auto">
          <button className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-secondary transition-colors">
            View Case Study
            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  </motion.div>
);

const SkeletonPortfolio = () => (
  <div className="p-[1px] rounded-2xl bg-border/20 overflow-hidden h-full">
    <div className="w-full h-full bg-card/40 rounded-2xl flex flex-col animate-pulse">
      <div className="w-full aspect-video bg-muted" />
      <div className="p-6 flex flex-col flex-1">
        <div className="w-3/4 h-6 bg-muted rounded mb-4" />
        <div className="w-full h-4 bg-muted rounded mb-2" />
        <div className="w-5/6 h-4 bg-muted rounded mb-6 flex-1" />
        <div className="flex gap-2 mb-6">
          <div className="w-16 h-6 bg-muted rounded" />
          <div className="w-16 h-6 bg-muted rounded" />
        </div>
        <div className="w-32 h-4 bg-muted rounded mt-auto" />
      </div>
    </div>
  </div>
);

export const FeaturedPortfolio = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPortfolio = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/portfolio');
      setPortfolio(response.data || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load enterprise portfolio.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  return (
    <section className="py-24 bg-background border-t border-border" id="portfolio">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold text-primary uppercase tracking-widest mb-3"
          >
            Our Work
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4"
          >
            Engineering Excellence
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            Explore our featured deployments. We build mission-critical solutions that scale to millions of users with zero downtime.
          </motion.p>
        </div>

        <div className="min-h-[500px] relative">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {[...Array(6)].map((_, i) => <SkeletonPortfolio key={i} />)}
              </motion.div>
            ) : error ? (
              <motion.div 
                key="error"
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center p-12 text-center bg-destructive/5 rounded-2xl border border-destructive/20"
              >
                <AlertCircle className="w-12 h-12 text-destructive mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">Portfolio Registry Unavailable</h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                  {error}
                </p>
                <Button onClick={fetchPortfolio} variant="outline" className="gap-2">
                  <Loader2 className="w-4 h-4" />
                  Retry Connection
                </Button>
              </motion.div>
            ) : portfolio.length === 0 ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center p-12 text-center bg-muted/20 rounded-2xl border border-border"
              >
                <Briefcase className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
                <h3 className="text-xl font-bold text-foreground mb-2">No Deployments Found</h3>
                <p className="text-muted-foreground max-w-md">
                  Our portfolio registry is currently being updated. Please check back later.
                </p>
              </motion.div>
            ) : (
              <motion.div 
                key="content"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {portfolio.map((project, i) => (
                  <PortfolioCard key={project._id || i} project={project} index={i} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {!loading && !error && portfolio.length > 0 && (
          <div className="mt-16 text-center">
            <Button size="lg" variant="outline" className="rounded-full px-8 gap-2 border-border/50 hover:bg-muted/50">
              View All Projects
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
`;

// 2. Featured Case Studies
const casesCode = `import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '../ui/Button';

const caseStudies = [
  {
    industry: "FinTech & Banking",
    title: "Global Payment Gateway Migration",
    challenge: "A Fortune 500 bank was struggling with monolithic legacy systems handling 10M+ daily transactions, suffering from high latency and scaling bottlenecks.",
    solution: "We engineered a microservices-driven architecture on AWS, utilizing Kubernetes orchestration and zero-trust security protocols to seamlessly migrate their core processing engine with zero downtime.",
    tech: ["AWS", "Kubernetes", "Node.js", "PostgreSQL", "Redis"],
    results: ["99.999% Uptime achieved", "10x throughput capacity", "Sub-50ms latency"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000"
  },
  {
    industry: "Healthcare Provider",
    title: "AI-Driven Patient Analytics Platform",
    challenge: "Siloed patient data across 50+ hospitals was preventing predictive healthcare models and causing extreme operational inefficiencies.",
    solution: "Architected a highly secure, HIPAA-compliant data lake on Google Cloud, training custom machine learning models to analyze patient history and predict critical health events in real-time.",
    tech: ["Google Cloud", "Python", "TensorFlow", "React", "MongoDB"],
    results: ["30% reduction in readmissions", "Real-time global sync", "HIPAA/SOC2 Compliant"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2000"
  }
];

export const FeaturedCaseStudies = () => {
  return (
    <section className="py-32 bg-background border-t border-border overflow-hidden" id="case-studies">
      <div className="container mx-auto px-6">
        
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold text-primary uppercase tracking-widest mb-3"
          >
            Case Studies
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4"
          >
            Impact at Enterprise Scale
          </motion.h2>
        </div>

        <div className="flex flex-col gap-32">
          {caseStudies.map((study, i) => {
            const isEven = i % 2 === 0;
            const targetRef = useRef(null);
            const { scrollYProgress } = useScroll({
              target: targetRef,
              offset: ["start end", "end start"]
            });
            const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

            return (
              <div key={i} ref={targetRef} className={\`flex flex-col lg:flex-row items-center gap-12 \${isEven ? '' : 'lg:flex-row-reverse'}\`}>
                
                {/* Image / Visual */}
                <div className="w-full lg:w-1/2 relative">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
                  >
                    <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10" />
                    <motion.img 
                      style={{ y }}
                      src={study.image} 
                      alt={study.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-[120%] object-cover"
                    />
                  </motion.div>
                  {/* Decorative element */}
                  <div className={\`absolute -z-10 top-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-primary/10 to-secondary/5 blur-3xl rounded-full \${isEven ? '-left-1/4' : '-right-1/4'}\`} />
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2">
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                  >
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-6">
                      {study.industry}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">{study.title}</h3>
                    
                    <div className="space-y-6 mb-8">
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-2">The Challenge</h4>
                        <p className="text-muted-foreground leading-relaxed">{study.challenge}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-2">The Solution</h4>
                        <p className="text-muted-foreground leading-relaxed">{study.solution}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 py-6 border-y border-border/50 mb-8">
                      <div>
                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Key Results</div>
                        <ul className="space-y-2">
                          {study.results.map((res, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm text-foreground font-medium">
                              <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                              {res}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Tech Stack</div>
                        <div className="flex flex-wrap gap-2">
                          {study.tech.map((t, idx) => (
                            <span key={idx} className="text-xs font-medium bg-muted text-muted-foreground px-2 py-1 rounded">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <Button className="rounded-full gap-2 hover:scale-105 transition-transform shadow-lg shadow-primary/20">
                      Read Full Case Study
                    </Button>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
`;

// 3. Success Metrics
const metricsCode = `import React, { useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

const MetricCounter = ({ value, label, suffix = "" }) => {
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
    <div ref={ref} className="relative group p-[1px] rounded-2xl bg-gradient-to-b from-border/50 to-transparent overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md" />
      <div className="relative h-full bg-card/60 backdrop-blur-md p-8 rounded-2xl flex flex-col items-center justify-center text-center border border-transparent">
        <motion.div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/60 mb-3 group-hover:from-primary group-hover:to-secondary transition-all duration-500">
          {display}
        </motion.div>
        <div className="text-sm font-medium text-muted-foreground tracking-widest">{label}</div>
      </div>
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
    <section className="py-24 bg-background relative border-t border-border overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">Quantifiable Enterprise Success</h2>
          <p className="text-lg text-muted-foreground">We measure our success purely by the operational velocity and stability we deliver to our clients.</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <MetricCounter value={metric.value} label={metric.label} suffix={metric.suffix} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
`;

fs.writeFileSync(path.join(baseDir, 'components/home', 'FeaturedPortfolio.jsx'), portfolioCode);
fs.writeFileSync(path.join(baseDir, 'components/home', 'FeaturedCaseStudies.jsx'), casesCode);
fs.writeFileSync(path.join(baseDir, 'components/home', 'SuccessMetrics.jsx'), metricsCode);

// Update pages/Home.jsx
const homeCode = `import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Hero } from '../components/home/Hero';
import { TrustedCompanies } from '../components/home/TrustedCompanies';
import { CompanyStatistics } from '../components/home/CompanyStatistics';
import { WhyChooseTechzon } from '../components/home/WhyChooseTechzon';
import { TechnologyPartners } from '../components/home/TechnologyPartners';
import { ServicesPreview } from '../components/home/ServicesPreview';
import { DevelopmentProcess } from '../components/home/DevelopmentProcess';
import { TechnologyStack } from '../components/home/TechnologyStack';
import { FeaturedPortfolio } from '../components/home/FeaturedPortfolio';
import { FeaturedCaseStudies } from '../components/home/FeaturedCaseStudies';
import { SuccessMetrics } from '../components/home/SuccessMetrics';

export const Home = () => {
  return (
    <div className="w-full">
      <Helmet>
        <title>Techzon IT Solutions | Enterprise Software Engineering</title>
        <meta name="description" content="We architect, secure, and scale digital ecosystems for global industry leaders. Expert in Web, Mobile, Cloud, and AI." />
      </Helmet>
      
      <Hero />
      <TrustedCompanies />
      <CompanyStatistics />
      <WhyChooseTechzon />
      <TechnologyPartners />
      <ServicesPreview />
      <DevelopmentProcess />
      <TechnologyStack />
      
      {/* Phase 4 Sections */}
      <FeaturedPortfolio />
      <FeaturedCaseStudies />
      <SuccessMetrics />
      
      {/* Remaining sections will be appended here in future phases */}
    </div>
  );
};
`;

fs.writeFileSync(path.join(baseDir, 'pages', 'Home.jsx'), homeCode);
console.log('Phase 4 components generated.');
