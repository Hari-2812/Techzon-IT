import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { ArrowRight, MessageSquare, Zap } from 'lucide-react';
import { DigitalCore, useReducedMotion } from '../visual-system';

export const FinalCTA = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative py-32 overflow-hidden bg-white border-t border-slate-100" id="cta">
      
      {/* Background and Energy Convergence (Light Theme) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Subtle base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC] to-white opacity-90" />
        
        {/* Glowing Launch Core (Background blur) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-primary/10 to-[#5BC0EB]/10 rounded-full blur-[100px]" />
        
        {/* Converging Energy Lines */}
        {!prefersReducedMotion && (
          <>
            <motion.div
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-primary/10"
            />
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-[#5BC0EB]/20"
            />
            
            {/* Horizontal Energy Pulse */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              viewport={{ once: true }}
              className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#0B2D4D]/30 to-transparent"
            />
          </>
        )}
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center relative">
          
          {/* Launch Portal UI */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
            className="relative p-10 md:p-20 rounded-[40px] bg-white/80 backdrop-blur-2xl border border-slate-200 shadow-[0_20px_60px_rgba(118,87,217,0.08),inset_0_2px_20px_rgba(255,255,255,1)] overflow-hidden"
          >
            {/* Top Core Icon */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center border border-slate-200 shadow-xl">
                <DigitalCore icon={Zap} pulse size="sm" />
              </div>
            </div>

            <div className="mt-12">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-slate-200 text-primary font-bold tracking-widest text-xs mb-8 shadow-sm uppercase"
              >
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                Launch Portal
              </motion.div>

              <motion.h2 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="font-display text-4xl md:text-6xl font-black text-primary tracking-tight mb-6 leading-tight"
              >
                Start Your Digital <br className="hidden md:block" />
                <span className="text-gradient-galaxy">Journey With Techzon.</span>
              </motion.h2>

              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-lg md:text-xl text-foreground leading-relaxed mb-10 max-w-2xl mx-auto font-medium"
              >
                Partner with our elite enterprise engineering team to construct secure, scalable, and future-proof digital infrastructure.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Link to="/contact" className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-full font-bold uppercase tracking-wider text-sm hover:bg-primary transition-colors shadow-[0_10px_30px_rgba(15,23,42,0.15)] hover:shadow-[0_15px_40px_rgba(15,23,42,0.25)] relative overflow-hidden group">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Start a Project
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <Button 
                  asChild
                  size="lg" 
                  variant="outline" 
                  className="w-full sm:w-auto text-base px-8 py-6 rounded-full bg-white hover:bg-muted border-slate-200 text-foreground font-bold shadow-sm hover:border-primary/30 transition-all gap-2"
                >
                  <Link to="/contact">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    Talk to Our Team
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
