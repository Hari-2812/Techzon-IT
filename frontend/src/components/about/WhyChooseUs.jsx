import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const features = [
  "Zero-Trust Cloud Architecture",
  "Dedicated Elite Engineering Squads",
  "Strict ISO & SOC2 Compliance",
  "24/7 SLA-Backed Support",
  "Transparent Agile Sprints",
  "Custom AI & ML Integration"
];

export const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-background border-y border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">The Enterprise Advantage</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Generic agencies build websites. We architect resilient technical assets that directly increase corporate valuation and operational ROI.
            </p>
            <ul className="space-y-4">
              {features.map((feat, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 text-foreground font-semibold"
                >
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                  {feat}
                </motion.li>
              ))}
            </ul>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="bg-card rounded-lg p-8 border border-border shadow-elevation-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
              <h3 className="text-2xl font-bold text-foreground mb-6 border-b border-border/50 pb-4">Competitor Comparison</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-muted-foreground">Standard Agencies</span>
                  <span className="font-bold text-destructive">Template Driven</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-primary">Techzon IT Solutions</span>
                  <span className="font-bold text-secondary">Custom Microservices</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-muted-foreground">Standard Agencies</span>
                  <span className="font-bold text-destructive">Reactive Maintenance</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-primary">Techzon IT Solutions</span>
                  <span className="font-bold text-secondary">Predictive AI Monitoring</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
