import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Cpu, Server, Database, Cloud, Shield, Lightbulb, Target } from 'lucide-react';

export const ProjectOverview = ({ challenge, solution }) => {
  if (!challenge && !solution) return null;
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {challenge && (
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-card p-8 rounded-lg border border-border shadow-elevation-1">
              <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Business Challenge</h3>
              <p className="text-muted-foreground leading-relaxed">{challenge}</p>
            </motion.div>
          )}
          {solution && (
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-card p-8 rounded-lg border border-primary/20 shadow-elevation-1 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 pointer-events-none" />
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 relative z-10">
                <Lightbulb className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4 relative z-10">Solution Architecture</h3>
              <p className="text-muted-foreground leading-relaxed relative z-10">{solution}</p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export const ProjectResults = ({ kpis }) => {
  if (!kpis || kpis.length === 0) return null;
  return (
    <section className="py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Measurable Impact</h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">Our engineering delivered quantifiable business outcomes.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {kpis.map((kpi, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-background/10 backdrop-blur-md p-6 rounded-lg border border-white/20 text-center"
            >
              <TrendingUp className="w-8 h-8 mx-auto mb-4 text-secondary" />
              <div className="text-4xl font-black mb-2">{kpi.value}</div>
              <div className="text-sm font-semibold uppercase tracking-wider opacity-90">{kpi.metric}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const ProjectTechStack = ({ technologies }) => {
  if (!technologies || technologies.length === 0) return null;
  return (
    <section className="py-24 bg-muted/20 border-y border-border">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-foreground mb-16">Technology Stack</h2>
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {technologies.map((tech, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="px-6 py-3 premium-card shadow-elevation-1 font-semibold text-foreground flex items-center gap-2"
            >
              <Cpu className="w-4 h-4 text-primary" />
              {tech}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
