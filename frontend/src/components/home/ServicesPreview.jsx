import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../config/axios';
import { Button } from '../ui/Button';
import { Loader2, AlertCircle, LayoutGrid, Cpu } from 'lucide-react';
import { DigitalCore, DigitalNode, OrbitRing, EnergyPath, EnergyPathDefs, useReducedMotion } from '../visual-system';
import { Tilt3D } from '../3d/Tilt3D';
import { DepthLayer } from '../3d/DepthLayer';

export const ServicesPreview = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeNode, setActiveNode] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/services');
      const data = response.data || [];
      // Limit to max 6 services to fit nicely around the circle on desktop
      setServices(data.slice(0, 6));
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load capabilities.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Pre-calculate positions for a 3D Capability Matrix
  const getCoordinates = (index, total) => {
    // 2 columns (left and right of the core)
    const isLeft = index % 2 === 0;
    const row = Math.floor(index / 2);
    // Offset X and Y for a dynamic matrix feel
    const x = isLeft ? -250 - (row * 30) : 250 + (row * 30);
    const y = (row * 180) - 180;
    return { x, y };
  };

  return (
    <section className="relative py-24 min-h-screen bg-white overflow-hidden font-sans border-t border-slate-100" id="services">
      
      {/* Background Ambience (Light Theme) */}
      <div className="absolute inset-0 pointer-events-none opacity-60">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-tr from-primary/5 via-[#5BC0EB]/5 to-[#FF8A3D]/5 rounded-full blur-[120px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 max-w-7xl h-full flex flex-col items-center">
        
        {/* SEO Heading Area */}
        <div className="text-center max-w-3xl mx-auto mb-16 relative z-30">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold text-primary uppercase tracking-widest mb-3"
          >
            Digital Capabilities
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary mb-6"
          >
            Enterprise Digital <span className="text-gradient-galaxy">Services</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-foreground text-lg md:text-xl font-sans max-w-2xl mx-auto font-medium"
          >
            We deploy elite engineering squads to architect scalable growth engines and resolve complex technical debt.
          </motion.p>
        </div>

        {/* Content Area */}
        <div className="w-full relative flex items-center justify-center min-h-[500px]">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center">
                <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                <span className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">Initializing Core...</span>
              </motion.div>
            ) : error ? (
              <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center text-center max-w-md bg-red-50 p-8 rounded-2xl border border-red-200">
                <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                <h3 className="text-lg font-bold text-red-900 mb-2">Service Discovery Interrupted</h3>
                <p className="text-red-700 mb-6">{error}</p>
                <Button onClick={fetchServices} variant="outline" className="gap-2 border-red-200 text-red-700 hover:bg-red-50">
                  <Loader2 className="w-4 h-4" />
                  Retry Connection
                </Button>
              </motion.div>
            ) : services.length === 0 ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center text-center max-w-md bg-muted p-8 rounded-2xl border border-slate-200 backdrop-blur-md">
                <LayoutGrid className="w-12 h-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground font-medium">No capabilities discovered in the core registry.</p>
              </motion.div>
            ) : (
              <motion.div 
                key="content" 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="w-full relative"
              >
                {isMobile ? (
                  /* Mobile: Stacked Vertical Flow */
                  <div className="flex flex-col items-center gap-6 pb-12 w-full max-w-sm mx-auto">
                    <DigitalCore title="TECHZON" subtitle="CAPABILITIES" icon={Cpu} size="md" pulse={activeNode !== null} className="mb-6" />
                    
                    {services.map((service, i) => (
                      <DigitalNode 
                        key={service._id || i}
                        icon={LayoutGrid}
                        title={service.name || service.title}
                        subtitle={service.shortDescription || service.description}
                        active={activeNode === (service._id || i)}
                        index={i}
                        onHoverStart={() => setActiveNode(service._id || i)}
                        onHoverEnd={() => setActiveNode(null)}
                        className="w-full"
                      />
                    ))}
                  </div>
                ) : (
                  /* Desktop: Orbital Capability Galaxy with Tilt3D */
                  <div className="relative w-full h-[750px] flex items-center justify-center perspective-[1500px]">
                    <Tilt3D disabled={prefersReducedMotion} max={10} className="w-full h-full max-w-[900px] mx-auto">
                      
                      {/* SVG Connections Canvas */}
                      <DepthLayer depth={0} className="absolute inset-0 w-full h-full pointer-events-none z-10">
                        <svg className="w-full h-full" preserveAspectRatio="xMidYMid meet" viewBox="-450 -375 900 750">
                          <EnergyPathDefs />
                          {services.map((service, i) => {
                            const coords = getCoordinates(i, services.length);
                            const isActive = activeNode === (service._id || i);
                            return (
                              <EnergyPath 
                                key={`path-${service._id || i}`}
                                pathData={`M 0 0 L ${coords.x} ${coords.y}`}
                                active={isActive}
                                animated={!prefersReducedMotion}
                              />
                            );
                          })}
                        </svg>
                      </DepthLayer>

                      {/* Matrix Grid Atmosphere (replaces OrbitRings) */}
                      <DepthLayer depth={-20} className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
                        <div className="w-[800px] h-[600px] border border-slate-100/50 rounded-xl transform rotate-3 opacity-30 shadow-[0_0_50px_rgba(118,87,217,0.05)]" style={{ backgroundImage: 'linear-gradient(#f8fafc 1px, transparent 1px), linear-gradient(90deg, #f8fafc 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                        <div className="absolute w-[600px] h-[400px] border border-slate-100/50 rounded-xl transform -rotate-1 opacity-40" />
                      </DepthLayer>

                      {/* Central Core */}
                      <DepthLayer depth={20} className="absolute top-1/2 left-1/2 z-30" style={{ transform: 'translate(-50%, -50%)' }}>
                        <DigitalCore 
                          title="TECHZON" 
                          subtitle="SOLUTIONS CORE" 
                          icon={Cpu} 
                          size="lg" 
                          pulse={activeNode !== null} 
                        />
                      </DepthLayer>

                      {/* Surrounding Nodes */}
                      {services.map((service, i) => {
                        const coords = getCoordinates(i, services.length);
                        const isActive = activeNode === (service._id || i);
                        // Make front nodes pop more
                        const zDepth = isActive ? 60 : (coords.y > 0 ? 35 : 15);
                        
                        return (
                          <DepthLayer 
                            key={service._id || i}
                            depth={zDepth}
                            className="absolute top-1/2 left-1/2 z-40 transition-all duration-700"
                            style={{
                              transform: `translate(calc(${coords.x}px - 50%), calc(${coords.y}px - 50%))`,
                              opacity: activeNode && !isActive ? 0.4 : 1
                            }}
                          >
                            <DigitalNode 
                              icon={LayoutGrid}
                              title={service.name || service.title}
                              subtitle={service.shortDescription || service.description}
                              active={isActive}
                              index={i}
                              onHoverStart={() => setActiveNode(service._id || i)}
                              onHoverEnd={() => setActiveNode(null)}
                              className="w-[260px]" // Fixed width to ensure text readability
                            />
                          </DepthLayer>
                        );
                      })}

                    </Tilt3D>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
