import React from 'react';
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
              className="relative aspect-square rounded-lg overflow-hidden shadow-elevation-2"
            >
              <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10" />
              <img loading="lazy" decoding="async" fetchpriority="low" src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800&fm=avif" alt="Techzon Team" className="object-cover w-full h-full" />
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
