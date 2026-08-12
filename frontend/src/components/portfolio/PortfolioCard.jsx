import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, TrendingUp, Calendar, Building2, Monitor, Smartphone, Code } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Tilt3D } from '../3d/Tilt3D';
import { DepthLayer } from '../3d/DepthLayer';

export const PortfolioCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.1, ease: "easeOut" }}
      className="group relative w-full mb-32 last:mb-0"
    >
      <Tilt3D intensity={10} perspective={1200} glare={true} className="w-full">
        <div className="relative w-full rounded-2xl bg-white/80 backdrop-blur-xl border border-slate-200 p-8 md:p-12 shadow-2xl overflow-hidden min-h-[600px] flex flex-col md:flex-row items-center gap-12 group-hover:border-[#5BC0EB]/50 transition-colors duration-500">
          
          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-white to-[#5BC0EB]/5 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
          
          {/* Left Content Area */}
          <div className="relative z-10 w-full md:w-5/12 flex flex-col items-start text-left">
            {project.isFeatured && (
              <div className="mb-6 inline-flex items-center gap-1.5 px-3 py-1 bg-[#FF8A3D]/10 text-[#FF8A3D] border border-[#FF8A3D]/30 text-xs font-bold uppercase tracking-wider rounded-full shadow-[0_0_15px_rgba(255,138,61,0.3)]">
                <Star className="w-3.5 h-3.5 fill-current" /> Featured Showcase
              </div>
            )}
            
            <DepthLayer depth={20} className="w-full">
              <h3 className="text-4xl md:text-5xl font-black text-primary mb-4 leading-tight group-hover:text-primary transition-colors duration-300">
                {project.title || project.name}
              </h3>
            </DepthLayer>

            <DepthLayer depth={10} className="w-full">
              <p className="text-lg text-foreground leading-relaxed mb-8">
                {project.shortDescription || project.description}
              </p>
            </DepthLayer>

            <DepthLayer depth={30} className="w-full">
              {project.kpis && project.kpis.length > 0 && (
                <div className="flex flex-col gap-3 mb-8 w-full max-w-sm">
                  {project.kpis.slice(0, 2).map((kpi, i) => (
                    <div key={i} className="flex items-center gap-3 bg-muted backdrop-blur-sm p-3 rounded-xl border border-slate-100">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <TrendingUp className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">{kpi.metric}</div>
                        <div className="font-bold text-primary">{kpi.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <Link to={`/portfolio/${project.slug || project._id}`} className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-lg hover:shadow-[0_0_20px_rgba(11,45,77,0.4)] transition-all hover:-translate-y-1">
                Explore Case Study
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </DepthLayer>
          </div>

          {/* Right 3D Visual Area */}
          <div className="relative w-full md:w-7/12 h-[400px] md:h-[500px] flex items-center justify-center perspective-1000">
            
            {/* 1. Main Browser Mockup (Deepest) */}
            <DepthLayer depth={-30} className="absolute w-[90%] md:w-[85%] right-0 md:-right-10 top-1/2 -translate-y-1/2 rounded-xl overflow-hidden shadow-2xl border border-slate-200/80 bg-white/80 backdrop-blur-md">
              {/* Browser Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-muted border-b border-slate-200">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="mx-auto px-4 py-1 bg-white rounded text-[10px] text-muted-foreground flex items-center gap-2">
                  <Monitor className="w-3 h-3" /> {(project.title || project.name).toLowerCase().replace(/\s+/g, '')}.com
                </div>
              </div>
              {/* Browser Content */}
              <div className="relative aspect-video bg-muted">
                {project.image || project.thumbnail ? (
                  <img src={project.image || project.thumbnail} alt={project.title || project.name} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                ) : (
                  <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
                    <div className="flex gap-2">
                      <div className="w-16 h-16 rounded-xl bg-[#5BC0EB]/20 border border-[#5BC0EB]/30 animate-pulse" />
                      <div className="w-16 h-16 rounded-xl bg-[#FF8A3D]/20 border border-[#FF8A3D]/30 animate-pulse delay-75" />
                      <div className="w-16 h-16 rounded-xl bg-[#F4B942]/20 border border-[#F4B942]/30 animate-pulse delay-150" />
                    </div>
                    <div className="h-4 w-32 bg-muted rounded-full animate-pulse" />
                    <div className="h-2 w-48 bg-muted rounded-full animate-pulse" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-60" />
              </div>
            </DepthLayer>

            {/* 2. Mobile Mockup (Middle Depth) */}
            <DepthLayer depth={40} className="absolute w-[30%] md:w-[25%] left-0 md:left-10 bottom-0 md:-bottom-10 rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(11,45,77,0.15)] border-[6px] border-slate-100 bg-white">
              {/* Mobile Notch */}
              <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-10">
                <div className="w-1/2 h-4 bg-muted rounded-b-xl" />
              </div>
              <div className="relative aspect-[9/19] bg-muted">
                {project.image || project.thumbnail ? (
                  <img src={project.image || project.thumbnail} alt={`${project.title || project.name} Mobile`} className="w-full h-full object-cover scale-150 origin-top opacity-95 group-hover:scale-125 transition-transform duration-1000" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-4 pt-4">
                    <div className="w-3/4 h-2 bg-muted rounded-full animate-pulse" />
                    <div className="w-1/2 h-2 bg-muted rounded-full animate-pulse" />
                    <div className="w-3/4 h-1/3 bg-muted rounded-xl mt-4" />
                    <Smartphone className="w-12 h-12 text-muted-foreground absolute bottom-4" />
                  </div>
                )}
              </div>
            </DepthLayer>

            {/* 3. Floating Tech Stack / Elements (Highest Depth) */}
            <DepthLayer depth={80} className="absolute -right-4 md:right-10 top-10 md:top-20">
              <div className="flex flex-col gap-3">
                {(project.techStack || []).slice(0, 3).map((tech, i) => (
                  <div key={i} className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-md border border-slate-200 rounded-lg shadow-xl" style={{ transform: `translateX(${i * -15}px)` }}>
                    <Code className="w-4 h-4 text-[#5BC0EB]" />
                    <span className="text-xs font-bold text-primary">{tech}</span>
                  </div>
                ))}
              </div>
            </DepthLayer>

          </div>
        </div>
      </Tilt3D>
    </motion.div>
  );
};

