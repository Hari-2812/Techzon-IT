import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Users, ShieldCheck, Zap, Globe, Clock, TrendingUp } from 'lucide-react';
import { Tilt3D } from '../../../3d/Tilt3D';

const METRICS = [
  { value: "500", suffix: "+", label: "Projects Delivered", icon: Activity, progress: 85, color: "from-primary to-[#5BC0EB]" },
  { value: "120", suffix: "+", label: "Enterprise Clients", icon: Users, progress: 92, color: "from-[#5BC0EB] to-[#FF8A3D]" },
  { value: "99.99", suffix: "%", label: "Infrastructure Uptime", icon: ShieldCheck, progress: 99, color: "from-[#FF8A3D] to-[#E91E63]" },
  { value: "24/7", suffix: "", label: "Support Availability", icon: Clock, progress: 100, color: "from-[#E91E63] to-primary" }
];

export const SuccessMetricsSection = () => {
  return (
    <section className="section-padding bg-[#FFFFFF] overflow-hidden border-t border-slate-100 perspective-container">
      
      {/* Background Grid Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(#f1f5f9 1px, transparent 1px), linear-gradient(90deg, #f1f5f9 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="container-global relative z-10 h-full flex flex-col items-center">
        
        {/* SEO Heading Area */}
        <div className="text-center max-w-[560px] mx-auto mb-16 relative z-30 flex flex-col items-center">
          <div className="text-xs font-bold text-primary uppercase tracking-widest mb-3 md:mb-4 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> Live Telemetry
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-[56px] font-bold tracking-tight text-primary mb-6 text-center">
            Performance <span className="text-gradient-galaxy">Monitor.</span>
          </h2>
          <p className="font-sans text-lg md:text-xl text-foreground max-w-[560px] text-center font-medium">
            We measure our success purely by the operational velocity and stability we deliver to our clients.
          </p>
        </div>

        {/* 3D Dashboard */}
        <div className="relative w-full max-w-[1100px] mx-auto perspective-[1600px]">
          <Tilt3D max={4} className="w-full h-full preserve-3d">
            
            <div className="w-full bg-white/70 backdrop-blur-2xl border border-slate-200/80 rounded-[2rem] shadow-[0_30px_60px_rgba(36,18,82,0.06),0_0_0_10px_rgba(255,255,255,0.4)] overflow-hidden preserve-3d relative">
              
              {/* Dashboard Header Bar */}
              <div className="h-12 bg-muted border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-20 relative">
                <div className="flex items-center gap-4">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  </div>
                  <div className="text-[10px] font-mono font-bold text-muted-foreground tracking-widest hidden md:block">
                    SYSTEM_METRICS_V2.1
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded text-[9px] font-bold text-foreground uppercase tracking-widest shadow-sm">
                  <TrendingUp className="w-3 h-3 text-primary" />
                  Real-time Data
                </div>
              </div>

              {/* Dashboard Content Grid */}
              <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 relative z-10 bg-gradient-to-br from-white to-[#F8FAFC]">
                
                {/* Main Large Chart (Spans 2 columns) */}
                <div className="lg:col-span-2 surface-elevated p-6 md:p-8 flex flex-col h-full min-h-[300px]">
                  <div className="flex items-start justify-between mb-8">
                    <div>
                      <div className="text-xs font-bold text-muted-foreground tracking-widest uppercase mb-1">Global System Load</div>
                      <div className="text-3xl font-display font-bold text-primary">42,891 <span className="text-sm font-sans font-medium text-muted-foreground">req/s</span></div>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-xl text-primary">
                      <Globe className="w-5 h-5" />
                    </div>
                  </div>
                  
                  {/* Faux Animated Line Chart */}
                  <div className="flex-1 w-full relative mt-4">
                    {/* Y-axis grid lines */}
                    <div className="absolute inset-0 flex flex-col justify-between">
                      <div className="border-t border-slate-100 w-full" />
                      <div className="border-t border-slate-100 w-full" />
                      <div className="border-t border-slate-100 w-full" />
                      <div className="border-t border-slate-100 w-full" />
                    </div>
                    
                    <svg className="w-full h-full relative z-10 overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <motion.path 
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        viewport={{ once: true }}
                        d="M 0 80 Q 15 75 25 60 T 50 50 T 75 30 T 100 15"
                        fill="none"
                        stroke="#0B2D4D"
                        strokeWidth="3"
                        strokeLinecap="round"
                        vectorEffect="non-scaling-stroke"
                      />
                      <motion.path 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.1 }}
                        transition={{ duration: 1, delay: 1.5 }}
                        viewport={{ once: true }}
                        d="M 0 80 Q 15 75 25 60 T 50 50 T 75 30 T 100 15 L 100 100 L 0 100 Z"
                        fill="#0B2D4D"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                  </div>
                </div>

                {/* Right Side: Network Status */}
                <div className="surface-elevated p-6 md:p-8 flex flex-col justify-between h-full relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#5BC0EB]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div>
                    <div className="text-xs font-bold text-muted-foreground tracking-widest uppercase mb-1">Network Stability</div>
                    <div className="text-3xl font-display font-bold text-[#5BC0EB]">Stable</div>
                  </div>
                  
                  {/* Faux Animated Server Bars */}
                  <div className="mt-8 flex items-end gap-2 h-32 w-full">
                    {[1,2,3,4,5,6,7].map((bar, i) => (
                      <motion.div 
                        key={i}
                        initial={{ height: "10%" }}
                        whileInView={{ height: `${40 + Math.random() * 60}%` }}
                        transition={{ duration: 1.5, delay: i * 0.1, type: "spring" }}
                        viewport={{ once: true }}
                        className="flex-1 bg-gradient-to-t from-[#5BC0EB]/20 to-[#5BC0EB] rounded-t-sm"
                      />
                    ))}
                  </div>
                </div>

                {/* Bottom Row: 4 Metric Counters */}
                {METRICS.map((metric, idx) => (
                  <div key={idx} className={`surface-elevated p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group ${idx >= 2 ? (idx === 2 ? 'lg:col-span-1 lg:col-start-1' : 'lg:col-span-1 lg:col-start-2') : ''} ${idx === 3 ? 'lg:col-start-3 lg:col-span-1' : ''}`}>
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${metric.color} opacity-5 blur-[40px] rounded-bl-full transition-opacity duration-500 group-hover:opacity-15`} />
                    
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${metric.color} text-white shadow-inner`}>
                        <metric.icon className="w-5 h-5" />
                      </div>
                      <div className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase flex-1">{metric.label}</div>
                    </div>

                    <div>
                      <div className="text-4xl lg:text-5xl font-display font-bold text-primary tracking-tight flex items-baseline">
                        {metric.value}
                        <span className="text-lg lg:text-xl font-sans text-muted-foreground ml-1">{metric.suffix}</span>
                      </div>
                      
                      {/* Animated Progress Ring / Bar representation */}
                      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden mt-4 shadow-inner">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${metric.progress}%` }}
                          transition={{ duration: 1.5, delay: 0.5 + (idx * 0.2), ease: "easeOut" }}
                          viewport={{ once: true }}
                          className={`h-full bg-gradient-to-r ${metric.color}`}
                        />
                      </div>
                    </div>
                  </div>
                ))}

              </div>
            </div>

          </Tilt3D>
        </div>

      </div>
    </section>
  );
};
