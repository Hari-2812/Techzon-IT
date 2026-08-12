import React from 'react';
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
            className="group relative p-[1px] rounded-lg bg-gradient-to-b from-primary/30 to-border overflow-hidden"
          >
            <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
            <div className="relative h-full bg-card p-10 rounded-lg flex flex-col items-start border border-transparent shadow-elevation-1">
              <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-500">
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
            className="group relative p-[1px] rounded-lg bg-gradient-to-b from-secondary/30 to-border overflow-hidden"
          >
            <div className="absolute inset-0 bg-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
            <div className="relative h-full bg-card p-10 rounded-lg flex flex-col items-start border border-transparent shadow-elevation-1">
              <div className="w-16 h-16 rounded-lg bg-secondary/10 flex items-center justify-center mb-6 group-hover:bg-secondary transition-colors duration-500">
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
