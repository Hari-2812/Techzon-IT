import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const milestones = [
  { year: '2014', title: 'Inception', desc: 'Founded as a boutique security consulting firm in San Francisco.' },
  { year: '2016', title: 'Cloud Expansion', desc: 'Partnered with AWS and migrated focus to enterprise cloud architecture.' },
  { year: '2019', title: 'Global Delivery', desc: 'Opened European and APAC engineering hubs to support global Fortune 500s.' },
  { year: '2022', title: 'AI Integration', desc: 'Launched our dedicated Machine Learning and Data Science division.' },
  { year: '2026', title: 'Enterprise Dominance', desc: 'Recognized globally as a top-tier digital transformation powerhouse.' }
];

export const CompanyTimeline = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const trackHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Our Evolution</h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Track */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-border md:-translate-x-1/2 rounded-full overflow-hidden">
            <motion.div className="w-full bg-primary" style={{ height: trackHeight }} />
          </div>

          <div className="flex flex-col gap-12">
            {milestones.map((milestone, i) => {
              const isEven = i % 2 === 0;
              return (
                <div key={i} className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-0 ${isEven ? '' : 'md:flex-row-reverse'}`}>
                  
                  {/* Content */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      className="premium-card p-6 hover:border-primary/50 transition-colors"
                    >
                      <div className="text-primary font-black text-2xl mb-2">{milestone.year}</div>
                      <h4 className="text-lg font-bold text-foreground mb-2">{milestone.title}</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">{milestone.desc}</p>
                    </motion.div>
                  </div>

                  {/* Marker */}
                  <div className="absolute left-[14px] md:left-1/2 top-6 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 w-6 h-6 rounded-full bg-background border-4 border-border z-10">
                    <motion.div 
                      className="w-full h-full rounded-full bg-primary"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
