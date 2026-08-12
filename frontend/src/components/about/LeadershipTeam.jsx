import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LEADERSHIP } from '../../data/dummyData';
import { AlertCircle, Loader2, Users } from 'lucide-react';
import { Button } from '../ui/Button';

const LeaderCard = ({ leader, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
    className="group premium-card overflow-hidden flex flex-col h-full"
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
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd"/>
          </svg>
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
  <div className="premium-card overflow-hidden flex flex-col animate-pulse">
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

  return (
    <section className="py-24 bg-muted/20 border-b border-border">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Executive Leadership</h2>
          <p className="text-lg text-muted-foreground">The visionaries orchestrating our global engineering standards and strategic growth.</p>
        </div>

        <div className="min-h-[400px] relative">
          <AnimatePresence mode="wait">
              <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {LEADERSHIP.map((leader, i) => (
                  <LeaderCard key={leader._id || i} leader={leader} index={i} />
                ))}
              </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
