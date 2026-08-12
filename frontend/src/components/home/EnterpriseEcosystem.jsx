import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Cloud, 
  ShieldCheck, 
  Activity, 
  Server, 
  Database, 
  Cpu, 
  Bot, 
  GitMerge, 
  LineChart, 
  Globe2, 
  ArrowRight,
  Code2,
  Lock,
  Workflow
} from 'lucide-react';
import { cn } from '../../utils/cn';

export const EnterpriseEcosystem = () => {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / 40;
      const y = (e.clientY - rect.top - rect.height / 2) / 40;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const layer1Y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const layer2Y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const layer3Y = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <div ref={containerRef} className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] perspective-1000 hidden lg:flex items-center justify-center">
      
      {/* Background Layers (Mouse Parallax) */}
      <motion.div 
        animate={{ x: mousePos.x * 0.5, y: mousePos.y * 0.5 }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute top-[20%] left-[20%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[100px] mix-blend-screen" />
        <div className="absolute bottom-[20%] right-[20%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[100px] mix-blend-screen" />
      </motion.div>

      {/* Layer 2: Geometric Background */}
      <motion.div 
        style={{ y: layer1Y }}
        animate={{ x: mousePos.x, y: mousePos.y }}
        className="absolute inset-0 z-10 flex items-center justify-center opacity-30"
      >
        <div className="w-[80%] h-[80%] border-[0.5px] border-primary/20 rounded-full flex items-center justify-center border-dashed">
          <div className="w-[80%] h-[80%] border-[0.5px] border-primary/30 rounded-full flex items-center justify-center">
             <div className="w-[80%] h-[80%] border-[0.5px] border-primary/40 rounded-full border-dashed" />
          </div>
        </div>
      </motion.div>

      {/* Layer 4: Connection Lines */}
      <div className="absolute inset-0 z-20 pointer-events-none opacity-50">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <motion.path 
            d="M 50 50 L 20 20 M 50 50 L 80 20 M 50 50 L 20 80 M 50 50 L 80 80 M 50 50 L 50 15 M 50 50 L 15 50"
            stroke="url(#lineGrad)" 
            strokeWidth="0.2"
            fill="none"
            initial={{ strokeDasharray: "0 100", strokeDashoffset: 100 }}
            animate={{ strokeDasharray: "100 100", strokeDashoffset: 0 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0B2D4D" stopOpacity="0" />
              <stop offset="50%" stopColor="#FF8A3D" stopOpacity="1" />
              <stop offset="100%" stopColor="#0B2D4D" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Layer 3: Central Node (API / Database Core) */}
      <motion.div 
        animate={{ y: [-5, 5, -5], rotateY: [0, 10, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute z-30 p-8 rounded-3xl border border-primary/20 bg-background/60 backdrop-blur-2xl shadow-[0_0_50px_rgba(36,18,82,0.3)] flex flex-col items-center justify-center w-64"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,124,32,0.1)_0%,transparent_70%)]" />
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-lg mb-4 relative">
          <Database className="w-8 h-8 text-white" />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-background animate-pulse" />
        </div>
        <div className="text-lg font-bold text-foreground">Global Data Core</div>
        <div className="text-xs text-emerald-500 font-mono mt-1 flex items-center gap-1">
          <Activity className="w-3 h-3" /> SYNCING (12ms)
        </div>
      </motion.div>

      {/* Cloud Architecture Panel (Top Left) */}
      <motion.div 
        style={{ y: layer2Y }}
        animate={{ y: [0, -15, 0], x: mousePos.x * 2 }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute z-40 top-[15%] left-[5%] p-4 rounded-xl border border-border bg-background/80 backdrop-blur-xl shadow-2xl w-56"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <Cloud className="w-4 h-4 text-blue-500" />
          </div>
          <span className="text-sm font-semibold text-foreground">Cloud Engine</span>
        </div>
        <div className="space-y-2">
          {['us-east', 'eu-central', 'ap-south'].map((r) => (
            <div key={r} className="flex justify-between items-center text-xs">
              <span className="text-muted-foreground font-mono">{r}</span>
              <span className="text-emerald-500">Active</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* AI Assistant Panel (Top Right) */}
      <motion.div 
        style={{ y: layer3Y }}
        animate={{ y: [0, 10, 0], x: mousePos.x * 1.5 }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute z-40 top-[20%] right-[5%] p-4 rounded-xl border border-primary/20 bg-primary/5 backdrop-blur-xl shadow-[0_8px_30px_rgba(36,18,82,0.15)] w-48"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">AI Copilot</span>
          <Bot className="w-4 h-4 text-primary" />
        </div>
        <div className="text-sm font-medium text-foreground">Model Status: <span className="text-accent">Training</span></div>
        <div className="w-full h-1 bg-border rounded-full mt-2 overflow-hidden">
          <motion.div animate={{ width: ["0%", "100%", "0%"] }} transition={{ duration: 4, repeat: Infinity }} className="h-full bg-accent" />
        </div>
      </motion.div>

      {/* Security Shield (Bottom Left) */}
      <motion.div 
        style={{ y: layer2Y }}
        animate={{ y: [0, -10, 0], x: mousePos.x * 2.5 }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute z-40 bottom-[20%] left-[10%] p-4 rounded-xl border border-emerald-500/20 bg-background/90 backdrop-blur-xl shadow-2xl w-48"
      >
        <div className="flex items-center gap-3 mb-2">
          <ShieldCheck className="w-5 h-5 text-emerald-500" />
          <span className="text-sm font-bold text-foreground">Zero Trust</span>
        </div>
        <div className="text-[10px] text-muted-foreground font-mono">1,240 threats blocked</div>
      </motion.div>

      {/* Deployment Pipeline (Bottom Right) */}
      <motion.div 
        style={{ y: layer3Y }}
        animate={{ y: [0, 15, 0], x: mousePos.x * 1.8 }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute z-40 bottom-[15%] right-[10%] p-4 rounded-xl border border-border bg-background/80 backdrop-blur-xl shadow-2xl w-60"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-foreground">CI/CD Pipeline</span>
          <GitMerge className="w-4 h-4 text-muted-foreground" />
        </div>
        <div className="flex gap-1 mb-1">
          <div className="flex-1 h-1.5 rounded-full bg-emerald-500" />
          <div className="flex-1 h-1.5 rounded-full bg-emerald-500" />
          <div className="flex-1 h-1.5 rounded-full bg-emerald-500" />
          <div className="flex-1 h-1.5 rounded-full bg-primary animate-pulse" />
        </div>
        <div className="text-[10px] text-muted-foreground text-right">Deploying to production...</div>
      </motion.div>

      {/* Floating Indicators (Layer 5) */}
      <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute z-50 top-[10%] left-[40%] w-10 h-10 rounded-full border border-border bg-background/50 backdrop-blur-md flex items-center justify-center shadow-lg">
        <Code2 className="w-4 h-4 text-foreground" />
      </motion.div>
      <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 5, repeat: Infinity, delay: 1.5 }} className="absolute z-50 bottom-[10%] right-[40%] w-12 h-12 rounded-full border border-primary/20 bg-primary/10 backdrop-blur-md flex items-center justify-center shadow-lg">
        <Workflow className="w-5 h-5 text-primary" />
      </motion.div>

    </div>
  );
};
