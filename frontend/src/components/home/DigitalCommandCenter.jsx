import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Shield, Cloud, Database, Activity, ArrowUpRight } from 'lucide-react';

export const DigitalCommandCenter = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <div ref={containerRef} className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] perspective-1000">
      {/* Background Ambient Lighting */}
      <div className="absolute inset-0 bg-primary/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute inset-20 bg-secondary/15 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />
      
      {/* Central Architecture Map */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px] aspect-video border border-primary/20 rounded-2xl bg-background/40 backdrop-blur-md shadow-2xl overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(36,18,82,0.2)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_30%,transparent_100%)] opacity-30" />
        
        {/* Connection SVG */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="line-glow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0B2D4D" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#FF8A3D" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0B2D4D" stopOpacity="0.2" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <motion.path 
            d="M 20 50 Q 40 20 80 40" 
            fill="none" 
            stroke="url(#line-glow)" 
            strokeWidth="0.5" 
            filter="url(#glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
          />
          <motion.path 
            d="M 20 50 Q 50 80 80 40" 
            fill="none" 
            stroke="url(#line-glow)" 
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2.5, delay: 0.5, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
          />
        </svg>

        {/* Server Nodes inside central map */}
        <div className="absolute top-1/2 left-[20%] -translate-y-1/2 w-3 h-3 rounded-full bg-primary shadow-[0_0_15px_rgba(36,18,82,0.8)] animate-pulse" />
        <div className="absolute top-[40%] right-[20%] w-3 h-3 rounded-full bg-accent shadow-[0_0_15px_rgba(245,124,32,0.8)] animate-pulse" style={{ animationDelay: '1s' }} />
      </motion.div>

      {/* Floating Panel 1: Analytics */}
      <motion.div 
        style={{ y: y1 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] -left-4 lg:-left-12 p-4 rounded-xl border border-primary/20 bg-background/80 backdrop-blur-xl shadow-2xl w-48 hidden md:block"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-accent" />
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Throughput</span>
          </div>
          <ArrowUpRight className="w-3 h-3 text-emerald-500" />
        </div>
        <div className="text-2xl font-bold text-foreground mb-1">45.2 TB/s</div>
        {/* Mini Chart */}
        <div className="h-8 w-full flex items-end gap-1 mt-2">
          {[40, 60, 45, 80, 55, 90, 70, 100].map((h, i) => (
            <motion.div 
              key={i} 
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex-1 bg-primary/40 rounded-t-sm"
            />
          ))}
        </div>
      </motion.div>

      {/* Floating Panel 2: Cloud Infrastructure */}
      <motion.div 
        style={{ y: y2 }}
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-[30%] -right-4 lg:-right-16 p-4 rounded-xl border border-border bg-background/90 backdrop-blur-xl shadow-2xl w-56 hidden md:block"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Cloud className="w-5 h-5 text-primary" />
          </div>
          <div>
            <div className="text-sm font-semibold text-foreground">Global CDN</div>
            <div className="text-xs text-muted-foreground">99.999% SLA</div>
          </div>
        </div>
        <div className="space-y-2">
          {['us-east-1', 'eu-west-2', 'ap-south-1'].map((region, i) => (
            <div key={region} className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground font-mono">{region}</span>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" style={{ animationDelay: `${i * 0.5}s` }} />
                <span className="text-foreground font-medium">Active</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Floating Panel 3: Security & AI */}
      <motion.div 
        style={{ y: y3 }}
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-[20%] left-4 lg:left-0 p-4 rounded-xl border border-primary/20 bg-background/80 backdrop-blur-xl shadow-[0_8px_30px_rgba(36,18,82,0.15)] w-52 hidden sm:block"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Zero Trust</span>
          <Shield className="w-4 h-4 text-primary" />
        </div>
        <div className="flex items-center gap-3 mb-2">
          <div className="relative w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <div>
            <div className="text-sm font-bold text-foreground">Threat Model</div>
            <div className="text-xs text-emerald-500">Secured</div>
          </div>
        </div>
        <div className="w-full h-1 bg-border rounded-full mt-3 overflow-hidden">
          <motion.div 
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, repeat: Infinity }}
            className="h-full bg-gradient-to-r from-primary to-accent"
          />
        </div>
      </motion.div>

      {/* Floating Panel 4: Database/API */}
      <motion.div 
        style={{ y: y1 }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[10%] right-8 lg:-right-4 p-4 rounded-xl border border-border bg-background/90 backdrop-blur-xl shadow-2xl w-48 hidden lg:block"
      >
        <div className="flex items-center gap-2 mb-3">
          <Database className="w-4 h-4 text-accent" />
          <span className="text-xs font-semibold text-foreground">Data Pipeline</span>
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-between items-center bg-muted/50 px-2 py-1.5 rounded-md">
            <span className="text-[10px] text-muted-foreground font-mono">POST /api/v1</span>
            <span className="text-[10px] text-emerald-500 font-mono">200 OK</span>
          </div>
          <div className="flex justify-between items-center bg-muted/50 px-2 py-1.5 rounded-md">
            <span className="text-[10px] text-muted-foreground font-mono">GET /metrics</span>
            <span className="text-[10px] text-emerald-500 font-mono">12ms</span>
          </div>
          <div className="flex justify-between items-center bg-primary/5 px-2 py-1.5 rounded-md border border-primary/20">
            <span className="text-[10px] text-primary font-mono">SYNC nodes</span>
            <div className="w-2 h-2 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      </motion.div>

    </div>
  );
};
