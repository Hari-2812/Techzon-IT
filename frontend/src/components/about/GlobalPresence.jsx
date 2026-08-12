import React from 'react';
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
        
        <div className="relative w-full max-w-5xl mx-auto aspect-[2/1] premium-card shadow-elevation-1 flex items-center justify-center p-8 overflow-hidden">
          {/* Abstract SVG Map representation for layout purposes */}
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, hsl(var(--foreground)) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          
          <div className="relative w-full h-full">
            <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} className="absolute top-[30%] left-[20%] group">
              <MapPin className="w-8 h-8 text-primary -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_0_10px_rgba(var(--primary),0.8)] animate-bounce" />
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-background border border-border px-3 py-1 rounded text-xs font-bold shadow-elevation-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">San Francisco (HQ)</div>
            </motion.div>

            <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="absolute top-[25%] left-[50%] group">
              <MapPin className="w-6 h-6 text-secondary -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_0_10px_rgba(var(--secondary),0.8)]" />
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-background border border-border px-3 py-1 rounded text-xs font-bold shadow-elevation-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">London</div>
            </motion.div>

            <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="absolute top-[40%] left-[75%] group">
              <MapPin className="w-6 h-6 text-secondary -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_0_10px_rgba(var(--secondary),0.8)]" />
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-background border border-border px-3 py-1 rounded text-xs font-bold shadow-elevation-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Singapore</div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
