import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PORTFOLIO } from '../../data/dummyData';
import { Button } from '../ui/Button';
import { Loader2, AlertCircle, Briefcase, ArrowRight, ExternalLink } from 'lucide-react';

const PortfolioCard = ({ project, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
    whileHover={{ y: -8 }}
    className="group relative rounded-lg bg-gradient-to-b from-border/50 to-transparent p-[1px] overflow-hidden flex flex-col h-full"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
    <div className="relative flex-1 surface-panel overflow-hidden flex flex-col">
      
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
          <Link to={`/portfolio/${project._id}`} className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
            View Case Study
            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  </motion.div>
);

const SkeletonPortfolio = () => (
  <div className="p-[1px] rounded-lg bg-border/20 overflow-hidden h-full">
    <div className="w-full h-full bg-card/40 rounded-lg flex flex-col animate-pulse">
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
              <motion.div 
                key="content"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {PORTFOLIO.map((project, i) => (
                  <PortfolioCard key={project._id || i} project={project} index={i} />
                ))}
              </motion.div>
          </AnimatePresence>
        </div>
        
          <div className="mt-16 text-center">
            <Button size="lg" variant="outline" >
              View All Projects
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
      </div>
    </section>
  );
};
