import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = path.resolve('d:/project/Techzon IT Solutions/frontend/src');

const aboutDir = path.join(baseDir, 'components', 'about');
if (!fs.existsSync(aboutDir)) {
  fs.mkdirSync(aboutDir, { recursive: true });
}

// 1. AboutHero
const aboutHero = `import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutHero = () => {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden bg-background border-b border-border">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[600px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6 text-center">
        {/* Breadcrumb */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-8"
        >
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-semibold">About Us</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-foreground via-foreground/90 to-primary mb-6"
        >
          Architecting the Digital <br/> Enterprise Future
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
        >
          We are an elite collective of engineers, strategists, and innovators dedicated to solving the world's most complex technical challenges.
        </motion.p>
      </div>
    </section>
  );
};
`;

// 2. CompanyStory
const companyStory = `import React from 'react';
import { motion } from 'framer-motion';

export const CompanyStory = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10" />
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2000" alt="Techzon Team" className="object-cover w-full h-full" />
            </motion.div>
          </div>
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Our Genesis</h2>
              <h3 className="text-3xl md:text-5xl font-bold text-foreground mb-6">Born from Engineering Excellence</h3>
              <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                <p>
                  Techzon IT Solutions was founded on a singular premise: Enterprise software should be resilient, scalable, and inherently secure by default. We began as a highly specialized boutique consultancy resolving critical technical debt for Fortune 500 financial institutions.
                </p>
                <p>
                  Over the past decade, we have evolved into a global powerhouse of technical excellence. We don't just write code; we architect entire digital ecosystems that empower industry leaders to outpace their competition and redefine their markets.
                </p>
                <p>
                  Our commitment remains unchanged: Uncompromising quality, absolute transparency, and a relentless pursuit of technological superiority.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
`;

// 3. MissionVision
const missionVision = `import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye } from 'lucide-react';

export const MissionVision = () => {
  return (
    <section className="py-24 bg-muted/20 border-y border-border">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative p-[1px] rounded-3xl bg-gradient-to-b from-primary/30 to-border overflow-hidden"
          >
            <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
            <div className="relative h-full bg-card/80 backdrop-blur-md p-10 rounded-3xl flex flex-col items-start border border-transparent shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-500">
                <Target className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-4">Our Mission</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                To engineer secure, scalable, and transformative digital solutions that empower global enterprises to achieve operational velocity and absolute market dominance.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.1 }}
            className="group relative p-[1px] rounded-3xl bg-gradient-to-b from-secondary/30 to-border overflow-hidden"
          >
            <div className="absolute inset-0 bg-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
            <div className="relative h-full bg-card/80 backdrop-blur-md p-10 rounded-3xl flex flex-col items-start border border-transparent shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6 group-hover:bg-secondary transition-colors duration-500">
                <Eye className="w-8 h-8 text-secondary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-4">Our Vision</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                To be the global benchmark for enterprise software engineering, where unprecedented innovation meets zero-trust security and flawless execution.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
`;

// 4. CoreValues
const coreValues = `import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, HeartHandshake, Lightbulb, Users, BarChart } from 'lucide-react';

const values = [
  { icon: Shield, title: 'Zero-Trust Security', desc: 'Security is not an afterthought; it is woven into the fabric of our architecture.' },
  { icon: Zap, title: 'Operational Velocity', desc: 'We deliver high-impact solutions with unprecedented speed and precision.' },
  { icon: HeartHandshake, title: 'Absolute Transparency', desc: 'Honest communication, transparent timelines, and clear architectural decisions.' },
  { icon: Lightbulb, title: 'Relentless Innovation', desc: 'We constantly push the boundaries of modern engineering and cloud tech.' },
  { icon: Users, title: 'Collective Brilliance', desc: 'Our strength lies in our elite, globally distributed engineering squads.' },
  { icon: BarChart, title: 'Data-Driven Outcomes', desc: 'Every line of code we write is designed to generate measurable business ROI.' },
];

export const CoreValues = () => {
  return (
    <section className="py-24 bg-background border-b border-border">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Our Core Values</h2>
          <p className="text-lg text-muted-foreground">The foundational principles that dictate our engineering culture and client partnerships.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((val, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-2xl bg-card border border-border shadow-sm hover:shadow-xl hover:border-primary/30 transition-all group"
            >
              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <val.icon className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
              </div>
              <h4 className="text-xl font-bold text-foreground mb-3">{val.title}</h4>
              <p className="text-muted-foreground leading-relaxed text-sm">{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
`;

// 5. LeadershipTeam
const leadership = `import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../config/axios';
import { Linkedin, AlertCircle, Loader2, Users } from 'lucide-react';
import { Button } from '../ui/Button';

const LeaderCard = ({ leader, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
    className="group bg-card rounded-2xl border border-border overflow-hidden flex flex-col h-full"
  >
    <div className="relative aspect-[4/5] overflow-hidden bg-muted">
      {leader.image ? (
        <img 
          src={leader.image} 
          alt={leader.name} 
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-primary/5 text-4xl font-bold text-muted-foreground/30">
          {leader.name.charAt(0)}
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-80" />
      
      {leader.linkedin && (
        <a href={leader.linkedin} target="_blank" rel="noopener noreferrer" className="absolute top-4 right-4 w-10 h-10 bg-background/50 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors text-foreground">
          <Linkedin className="w-5 h-5" />
        </a>
      )}
      
      <div className="absolute bottom-0 left-0 w-full p-6">
        <h3 className="text-xl font-bold text-white mb-1">{leader.name}</h3>
        <p className="text-sm font-semibold text-primary">{leader.role || leader.designation}</p>
      </div>
    </div>
    
    <div className="p-6 flex-1 flex flex-col">
      <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4 line-clamp-4">
        {leader.bio}
      </p>
      {leader.expertise && leader.expertise.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-auto">
          {leader.expertise.slice(0, 3).map((exp, i) => (
            <span key={i} className="text-[10px] uppercase tracking-wider font-semibold bg-muted text-muted-foreground px-2 py-1 rounded">
              {exp}
            </span>
          ))}
        </div>
      )}
    </div>
  </motion.div>
);

const SkeletonLeader = () => (
  <div className="bg-card rounded-2xl border border-border overflow-hidden flex flex-col animate-pulse">
    <div className="w-full aspect-[4/5] bg-muted" />
    <div className="p-6 flex flex-col flex-1">
      <div className="w-full h-4 bg-muted rounded mb-2" />
      <div className="w-4/5 h-4 bg-muted rounded mb-2" />
      <div className="w-3/4 h-4 bg-muted rounded mb-6" />
      <div className="flex gap-2 mt-auto">
        <div className="w-16 h-5 bg-muted rounded" />
        <div className="w-16 h-5 bg-muted rounded" />
      </div>
    </div>
  </div>
);

export const LeadershipTeam = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTeam = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/team');
      setTeam(response.data || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load leadership roster.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  return (
    <section className="py-24 bg-muted/20 border-b border-border">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Executive Leadership</h2>
          <p className="text-lg text-muted-foreground">The visionaries orchestrating our global engineering standards and strategic growth.</p>
        </div>

        <div className="min-h-[400px] relative">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => <SkeletonLeader key={i} />)}
              </motion.div>
            ) : error ? (
              <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center p-12 bg-destructive/5 rounded-2xl border border-destructive/20 text-center max-w-xl mx-auto">
                <AlertCircle className="w-12 h-12 text-destructive mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">Registry Unavailable</h3>
                <p className="text-muted-foreground mb-6">{error}</p>
                <Button onClick={fetchTeam} variant="outline" className="gap-2"><Loader2 className="w-4 h-4" /> Retry Connection</Button>
              </motion.div>
            ) : team.length === 0 ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center p-12 bg-card rounded-2xl border border-border text-center max-w-xl mx-auto">
                <Users className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
                <h3 className="text-xl font-bold text-foreground mb-2">No Roster Found</h3>
                <p className="text-muted-foreground">The leadership roster is currently empty.</p>
              </motion.div>
            ) : (
              <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {team.map((leader, i) => (
                  <LeaderCard key={leader._id || i} leader={leader} index={i} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
`;

// 6. CompanyTimeline
const companyTimeline = `import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const milestones = [
  { year: '2014', title: 'Inception', desc: 'Founded as a boutique security consulting firm in San Francisco.' },
  { year: '2016', title: 'Cloud Expansion', desc: 'Partnered with AWS and migrated focus to enterprise cloud architecture.' },
  { year: '2019', title: 'Global Delivery', desc: 'Opened European and APAC engineering hubs to support global Fortune 500s.' },
  { year: '2022', title: 'AI Integration', desc: 'Launched our dedicated Machine Learning and Data Science division.' },
  { year: '2026', title: 'Enterprise Dominance', desc: 'Recognized globally as a top-tier digital transformation powerhouse.' }
];

export const CompanyTimeline = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const trackHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Our Evolution</h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Track */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-border md:-translate-x-1/2 rounded-full overflow-hidden">
            <motion.div className="w-full bg-primary" style={{ height: trackHeight }} />
          </div>

          <div className="flex flex-col gap-12">
            {milestones.map((milestone, i) => {
              const isEven = i % 2 === 0;
              return (
                <div key={i} className={\`relative flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-0 \${isEven ? '' : 'md:flex-row-reverse'}\`}>
                  
                  {/* Content */}
                  <div className={\`w-full md:w-1/2 pl-12 md:pl-0 \${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16'}\`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      className="bg-card p-6 rounded-2xl border border-border shadow-sm hover:border-primary/50 transition-colors"
                    >
                      <div className="text-primary font-black text-2xl mb-2">{milestone.year}</div>
                      <h4 className="text-lg font-bold text-foreground mb-2">{milestone.title}</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">{milestone.desc}</p>
                    </motion.div>
                  </div>

                  {/* Marker */}
                  <div className="absolute left-[14px] md:left-1/2 top-6 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 w-6 h-6 rounded-full bg-background border-4 border-border z-10">
                    <motion.div 
                      className="w-full h-full rounded-full bg-primary"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
`;

// 7. IndustriesWeServe
const industries = `import React from 'react';
import { motion } from 'framer-motion';
import { HeartPulse, Building2, Factory, GraduationCap, ShoppingBag, Truck, Landmark } from 'lucide-react';

const industryList = [
  { icon: Landmark, title: 'Banking & FinTech', desc: 'Secure payment gateways and ledger systems.' },
  { icon: HeartPulse, title: 'Healthcare', desc: 'HIPAA-compliant data lakes and patient portals.' },
  { icon: Factory, title: 'Manufacturing', desc: 'IoT orchestration and supply chain automation.' },
  { icon: ShoppingBag, title: 'Retail & E-commerce', desc: 'High-conversion, scalable digital storefronts.' },
  { icon: Truck, title: 'Logistics', desc: 'Real-time fleet tracking and routing algorithms.' },
  { icon: GraduationCap, title: 'Education', desc: 'Interactive LMS and virtual campus platforms.' },
  { icon: Building2, title: 'Government', desc: 'Federal-grade secure infrastructure deployments.' },
];

export const IndustriesWeServe = () => {
  return (
    <section className="py-24 bg-muted/20 border-y border-border">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Industries We Empower</h2>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4">
          {industryList.map((ind, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -5 }}
              className="flex-1 min-w-[250px] max-w-[300px] p-6 bg-card border border-border rounded-2xl flex flex-col items-center text-center shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
            >
              <ind.icon className="w-8 h-8 text-primary mb-4" />
              <h4 className="text-lg font-bold text-foreground mb-2">{ind.title}</h4>
              <p className="text-sm text-muted-foreground">{ind.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
`;

// 8. Certifications & 9. Awards
const certsAwards = `import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Medal, Star } from 'lucide-react';

const certs = ['ISO 27001 Certified', 'SOC 2 Type II', 'AWS Advanced Partner', 'Microsoft Gold Partner', 'Google Cloud Premier'];
const awards = ['Top B2B Company 2025', 'Fastest Growing Tech 2024', 'Excellence in Enterprise IT', 'Best Cloud Architecture'];

export const CertificationsAwards = () => {
  return (
    <section className="py-24 bg-background border-b border-border overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Certifications */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-primary" />
              Global Certifications
            </h3>
            <div className="flex flex-wrap gap-4">
              {certs.map((cert, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="px-6 py-4 rounded-xl bg-muted/50 border border-border font-semibold text-foreground flex items-center gap-3"
                >
                  <Star className="w-5 h-5 text-secondary fill-secondary" />
                  {cert}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Awards */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
              <Award className="w-8 h-8 text-primary" />
              Industry Recognition
            </h3>
            <div className="space-y-4">
              {awards.map((award, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-4 rounded-xl bg-card border border-border flex items-center gap-4 hover:border-primary/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Medal className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-bold text-foreground">{award}</span>
                </motion.div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};
`;

// 10. GlobalPresence
const globalPresence = `import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

export const GlobalPresence = () => {
  return (
    <section className="py-32 bg-muted/20 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Global Reach, Local Impact</h2>
          <p className="text-lg text-muted-foreground">Operating from strict engineering hubs across 3 continents.</p>
        </div>
        
        <div className="relative w-full max-w-5xl mx-auto aspect-[2/1] rounded-3xl bg-card border border-border shadow-sm flex items-center justify-center p-8 overflow-hidden">
          {/* Abstract SVG Map representation for layout purposes */}
          <div className="absolute inset-0 opacity-20 dark:opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, hsl(var(--foreground)) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          
          <div className="relative w-full h-full">
            <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} className="absolute top-[30%] left-[20%] group">
              <MapPin className="w-8 h-8 text-primary -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_0_10px_rgba(var(--primary),0.8)] animate-bounce" />
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-background border border-border px-3 py-1 rounded text-xs font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">San Francisco (HQ)</div>
            </motion.div>

            <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="absolute top-[25%] left-[50%] group">
              <MapPin className="w-6 h-6 text-secondary -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_0_10px_rgba(var(--secondary),0.8)]" />
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-background border border-border px-3 py-1 rounded text-xs font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">London</div>
            </motion.div>

            <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="absolute top-[40%] left-[75%] group">
              <MapPin className="w-6 h-6 text-secondary -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_0_10px_rgba(var(--secondary),0.8)]" />
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-background border border-border px-3 py-1 rounded text-xs font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Singapore</div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
`;

// 11. WhyChooseUs
const whyChooseUs = `import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const features = [
  "Zero-Trust Cloud Architecture",
  "Dedicated Elite Engineering Squads",
  "Strict ISO & SOC2 Compliance",
  "24/7 SLA-Backed Support",
  "Transparent Agile Sprints",
  "Custom AI & ML Integration"
];

export const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-background border-y border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">The Enterprise Advantage</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Generic agencies build websites. We architect resilient technical assets that directly increase corporate valuation and operational ROI.
            </p>
            <ul className="space-y-4">
              {features.map((feat, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 text-foreground font-semibold"
                >
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                  {feat}
                </motion.li>
              ))}
            </ul>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="bg-card rounded-3xl p-8 border border-border shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
              <h3 className="text-2xl font-bold text-foreground mb-6 border-b border-border/50 pb-4">Competitor Comparison</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-muted-foreground">Standard Agencies</span>
                  <span className="font-bold text-destructive">Template Driven</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-primary">Techzon IT Solutions</span>
                  <span className="font-bold text-secondary">Custom Microservices</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-muted-foreground">Standard Agencies</span>
                  <span className="font-bold text-destructive">Reactive Maintenance</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-primary">Techzon IT Solutions</span>
                  <span className="font-bold text-secondary">Predictive AI Monitoring</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
`;

// 12. EnterpriseNumbers
const enterpriseNumbers = `import React from 'react';
import { motion } from 'framer-motion';

export const EnterpriseNumbers = () => {
  const stats = [
    { num: "500+", label: "Enterprise Projects" },
    { num: "120+", label: "Global Clients" },
    { num: "15+", label: "Countries Served" },
    { num: "99.99%", label: "Infrastructure Uptime" },
    { num: "24x7", label: "SLA Support" }
  ];

  return (
    <section className="py-20 bg-primary border-y border-border relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-wrap justify-between items-center gap-8">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center flex-1 min-w-[150px]"
            >
              <div className="text-4xl md:text-5xl font-black text-white mb-2">{stat.num}</div>
              <div className="text-sm font-semibold text-white/80 uppercase tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
`;

// Main About Page
const aboutPage = `import React from 'react';
import { Helmet } from 'react-helmet-async';
import { AboutHero } from '../components/about/AboutHero';
import { CompanyStory } from '../components/about/CompanyStory';
import { MissionVision } from '../components/about/MissionVision';
import { CoreValues } from '../components/about/CoreValues';
import { LeadershipTeam } from '../components/about/LeadershipTeam';
import { CompanyTimeline } from '../components/about/CompanyTimeline';
import { IndustriesWeServe } from '../components/about/IndustriesWeServe';
import { CertificationsAwards } from '../components/about/CertificationsAwards';
import { GlobalPresence } from '../components/about/GlobalPresence';
import { WhyChooseUs } from '../components/about/WhyChooseUs';
import { EnterpriseNumbers } from '../components/about/EnterpriseNumbers';
import { FinalCTA } from '../components/home/FinalCTA';
import { Footer } from '../components/home/Footer';

export const About = () => {
  return (
    <div className="w-full flex flex-col min-h-screen">
      <Helmet>
        <title>About Us | Techzon IT Solutions</title>
        <meta name="description" content="Discover Techzon's mission, vision, and the elite engineering leadership team behind our enterprise digital solutions." />
        {/* Basic schema for demonstration */}
        <script type="application/ld+json">
          {\`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Techzon IT Solutions",
              "url": "https://techzon.com",
              "logo": "https://techzon.com/logo.png"
            }
          \`}
        </script>
      </Helmet>
      
      <main className="flex-1">
        <AboutHero />
        <EnterpriseNumbers />
        <CompanyStory />
        <MissionVision />
        <CoreValues />
        <LeadershipTeam />
        <CompanyTimeline />
        <IndustriesWeServe />
        <CertificationsAwards />
        <GlobalPresence />
        <WhyChooseUs />
        <FinalCTA />
      </main>
      
      <Footer />
    </div>
  );
};
`;

fs.writeFileSync(path.join(aboutDir, 'AboutHero.jsx'), aboutHero);
fs.writeFileSync(path.join(aboutDir, 'CompanyStory.jsx'), companyStory);
fs.writeFileSync(path.join(aboutDir, 'MissionVision.jsx'), missionVision);
fs.writeFileSync(path.join(aboutDir, 'CoreValues.jsx'), coreValues);
fs.writeFileSync(path.join(aboutDir, 'LeadershipTeam.jsx'), leadership);
fs.writeFileSync(path.join(aboutDir, 'CompanyTimeline.jsx'), companyTimeline);
fs.writeFileSync(path.join(aboutDir, 'IndustriesWeServe.jsx'), industries);
fs.writeFileSync(path.join(aboutDir, 'CertificationsAwards.jsx'), certsAwards); // combines 8 & 9
fs.writeFileSync(path.join(aboutDir, 'GlobalPresence.jsx'), globalPresence);
fs.writeFileSync(path.join(aboutDir, 'WhyChooseUs.jsx'), whyChooseUs);
fs.writeFileSync(path.join(aboutDir, 'EnterpriseNumbers.jsx'), enterpriseNumbers);

const pagesDir = path.join(baseDir, 'pages');
fs.writeFileSync(path.join(pagesDir, 'About.jsx'), aboutPage);

// Update routes
const routesCode = `import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { PublicLayout, AdminLayout, AuthLayout } from '../layouts';
import { Home } from '../pages/Home';
import { About } from '../pages/About';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
    ]
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <div>Login (Pending)</div> }
    ]
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <div>Dashboard (Pending)</div> }
    ]
  }
]);
`;
fs.writeFileSync(path.join(baseDir, 'routes', 'index.jsx'), routesCode);

console.log('About Page and all 13 components generated successfully.');
