import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICES } from '../../data/dummyData';
import { Button } from '../ui/Button';
import { Loader2, AlertCircle, SearchX, Server, Cloud, Cpu, Shield, Database, LayoutTemplate, Code2, Link as LinkIcon, ArrowRight, Layers } from 'lucide-react';
import { DigitalEnvironment } from '../visual/DigitalEnvironment';
import { Tilt3D } from '../3d/Tilt3D';
import { SystemNode } from '../3d/SystemNode';
import { ConnectionLine } from '../3d/ConnectionLine';
import { FloatingPanel } from '../3d/FloatingPanel';
import { DepthLayer } from '../3d/DepthLayer';
import { Link } from 'react-router-dom';

const getCategoryIcon = (categoryName) => {
  const name = categoryName?.toLowerCase() || '';
  if (name.includes('web') || name.includes('front')) return <LayoutTemplate className="w-5 h-5" />;
  if (name.includes('cloud') || name.includes('devops')) return <Cloud className="w-5 h-5" />;
  if (name.includes('ai') || name.includes('data')) return <Cpu className="w-5 h-5" />;
  if (name.includes('security')) return <Shield className="w-5 h-5" />;
  if (name.includes('back') || name.includes('server')) return <Server className="w-5 h-5" />;
  if (name.includes('database')) return <Database className="w-5 h-5" />;
  return <Code2 className="w-5 h-5" />;
};

const ArchitectureNode = ({ service, index, isActive, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
      className={`relative p-4 md:p-6 rounded-xl border transition-all cursor-pointer backdrop-blur-md shadow-elevation-1
        ${isActive 
          ? 'bg-white/80 border-[#FF8A3D] shadow-[0_0_30px_rgba(245,124,32,0.4)] z-10' 
          : 'bg-white/50 border-gray-200 hover:border-[#8A2BE2]/50 hover:bg-white z-0'
        }`}
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-lg flex-shrink-0 transition-colors ${isActive ? 'bg-gradient-to-r from-[#FF8A3D] to-[#8A2BE2] text-white' : 'bg-muted text-muted-foreground'}`}>
          {getCategoryIcon(service.category?.name || service.category)}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className={`text-lg font-bold truncate transition-colors ${isActive ? 'text-[#FF8A3D]' : 'text-primary'}`}>
            {service.name}
          </h4>
          <p className="text-sm text-foreground line-clamp-2 mt-1">
            {service.shortDescription || service.description}
          </p>
          
          <AnimatePresence>
            {isActive && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 overflow-hidden"
              >
                {service.technologies && service.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.technologies.slice(0, 4).map((tech, i) => (
                      <span key={i} className="text-xs font-mono bg-muted text-foreground px-2 py-1 rounded border border-gray-200">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                <Link 
                  to={`/services/${service.slug}`} 
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#FF8A3D] hover:text-[#8A2BE2] transition-colors"
                >
                  View Implementation Details <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Connection points for visualization */}
      <div className={`absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 ${isActive ? 'border-[#8A2BE2]' : 'border-gray-300'}`} />
      <div className={`absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 ${isActive ? 'border-[#FF8A3D]' : 'border-gray-300'}`} />
    </motion.div>
  );
};

export const ServicesDirectory = ({ searchTerm }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeService, setActiveService] = useState(null);
  const [hoveredService, setHoveredService] = useState(null);

  const fetchServices = useCallback(() => {
    setLoading(true);
    setError(null);
    
    // Simulate slight delay for effect
    setTimeout(() => {
      setServices(SERVICES);
      setLoading(false);
    }, 400);
  }, [searchTerm]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const groupedServices = useMemo(() => {
    const groups = {};
    services.forEach(service => {
      const catName = service.category?.name || service.category || 'Other Core Services';
      if (!groups[catName]) groups[catName] = [];
      groups[catName].push(service);
    });
    return groups;
  }, [services]);

  const categories = Object.keys(groupedServices);

  const getSatelliteStyle = (index, total) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
    const radiusX = 35;
    const radiusY = 35;
    const left = 50 + radiusX * Math.cos(angle);
    const top = 50 + radiusY * Math.sin(angle);
    return { left: `${left}%`, top: `${top}%` };
  };

  return (
    <DigitalEnvironment className="py-24 min-h-screen bg-muted text-primary">
      <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row gap-12">
        
        {/* Left Side: 3D Architecture Scene */}
        <div className="flex-1 lg:sticky lg:top-24 h-[600px] md:h-[700px] w-full flex flex-col justify-center items-center">
          <div className="text-center mb-8 relative z-20 pointer-events-none">
            <h2 className="text-3xl md:text-5xl font-black text-primary mb-4 tracking-tight drop-shadow-xl">
              TECHZON DIGITAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8A3D] to-[#8A2BE2]">CAPABILITIES</span>
            </h2>
            <p className="text-foreground">Interactive Ecosystem Topology</p>
          </div>

          <Tilt3D intensity={25} depth={50} className="w-full h-full max-w-[600px] mx-auto relative rounded-3xl border border-white/20 bg-white/30 backdrop-blur-md shadow-2xl">
            {categories.map((category, idx) => {
              const pos = getSatelliteStyle(idx, categories.length);
              const isActive = activeService === category;
              const isHovered = hoveredService === category;
              
              return (
                <React.Fragment key={category}>
                  <ConnectionLine 
                    x1="50%" 
                    y1="50%" 
                    x2={pos.left} 
                    y2={pos.top} 
                    active={isActive || isHovered}
                    className={`transition-all duration-300 ${isActive || isHovered ? 'stroke-[#FF8A3D] opacity-80' : 'stroke-gray-300 opacity-40'}`} 
                  />
                  <div 
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                    style={{ left: pos.left, top: pos.top }}
                    onClick={() => setActiveService(isActive ? null : category)}
                    onMouseEnter={() => setHoveredService(category)}
                    onMouseLeave={() => setHoveredService(null)}
                  >
                    <FloatingPanel variant="glass" depth={isActive ? 60 : isHovered ? 40 : 20} className="p-1 rounded-2xl">
                      <DepthLayer depth={isActive ? 20 : 10}>
                        <SystemNode 
                          icon={() => getCategoryIcon(category)} 
                          label={category} 
                          active={isActive || isHovered} 
                          depth={0}
                          className={`transition-all duration-300 ${isActive || isHovered ? 'shadow-[0_0_20px_rgba(138,43,226,0.5)] border-[#8A2BE2]' : 'border-gray-200 bg-white/80'}`}
                        />
                      </DepthLayer>
                    </FloatingPanel>
                  </div>
                </React.Fragment>
              );
            })}
            
            {/* Central Node */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <FloatingPanel variant="glass" depth={80} className="p-2 rounded-2xl">
                <DepthLayer depth={20}>
                  <SystemNode 
                    icon={Layers} 
                    label="Core Architecture" 
                    active={true} 
                    depth={0}
                    className="scale-125 bg-gradient-to-br from-[#FF8A3D] to-[#8A2BE2] text-white shadow-[0_0_30px_rgba(245,124,32,0.5)] border-white/30"
                  />
                </DepthLayer>
              </FloatingPanel>
            </div>
          </Tilt3D>
        </div>

        {/* Right Side: Details / Capabilities List */}
        <div className="flex-1 flex flex-col gap-8 lg:pt-32">
          {loading ? (
            <div className="flex justify-center items-center py-32">
              <Loader2 className="w-12 h-12 text-[#FF8A3D] animate-spin" />
            </div>
          ) : error ? (
             <div className="flex flex-col items-center justify-center p-12 text-center bg-white/80 backdrop-blur border border-red-200 rounded-2xl">
              <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
              <p className="text-foreground mb-6">{error}</p>
              <Button onClick={fetchServices} variant="outline" className="gap-2"><Loader2 className="w-4 h-4" /> Reconnect</Button>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeService || 'all'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col gap-6"
              >
                {!activeService ? (
                  <FloatingPanel variant="glass" depth={10} className="p-8 rounded-2xl bg-white/60 border border-gray-200 backdrop-blur-md text-center">
                    <Layers className="w-12 h-12 text-[#8A2BE2] mx-auto mb-4 opacity-50" />
                    <h3 className="text-2xl font-bold mb-2 text-primary">Explore the Ecosystem</h3>
                    <p className="text-foreground">Select a node in the digital capabilities architecture to view specific services within that domain.</p>
                  </FloatingPanel>
                ) : (
                  <>
                    <div className="flex items-center gap-4 mb-4 border-b border-gray-200 pb-4">
                      <div className="p-3 rounded-lg bg-gradient-to-r from-[#FF8A3D] to-[#8A2BE2] text-white shadow-lg">
                        {getCategoryIcon(activeService)}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-primary">{activeService} Capabilities</h3>
                    </div>
                    
                    {groupedServices[activeService]?.map((service, i) => (
                      <ArchitectureNode
                        key={service._id || i}
                        service={service}
                        index={i}
                        isActive={hoveredService === activeService || false}
                        onClick={() => {}}
                      />
                    ))}
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </DigitalEnvironment>
  );
};

