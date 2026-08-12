import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Building2, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ProjectDetailHero = ({ project }) => {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden bg-background border-b border-border">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[600px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-muted-foreground mb-8 flex-wrap"
        >
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/portfolio" className="hover:text-primary transition-colors">Portfolio</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-semibold">{project.name}</span>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="w-full lg:w-3/5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap items-center gap-3 mb-6"
            >
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                {project.category?.name || project.category || 'Case Study'}
              </div>
              {project.industry && (
                <div className="inline-flex items-center gap-1 text-muted-foreground text-xs font-bold uppercase tracking-wider">
                  <Building2 className="w-4 h-4" /> {project.industry}
                </div>
              )}
              {project.completionYear && (
                <div className="inline-flex items-center gap-1 text-muted-foreground text-xs font-bold uppercase tracking-wider border-l border-border pl-3">
                  <Calendar className="w-4 h-4" /> {project.completionYear}
                </div>
              )}
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6 leading-tight"
            >
              {project.name}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-muted-foreground leading-relaxed mb-8"
            >
              {project.shortDescription || project.description}
            </motion.p>
          </div>
          
          <div className="w-full lg:w-2/5">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-elevation-2 border border-border group"
            >
              {project.image || project.thumbnail ? (
                <img loading="lazy" decoding="async" fetchpriority="low" 
                  src={project.image || project.thumbnail} 
                  alt={project.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <div className="text-6xl font-black text-primary opacity-50">{project.name.charAt(0)}</div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-60" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
