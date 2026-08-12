import React from 'react';
import { motion } from 'framer-motion';
import { HeartPulse, Building2, Factory, GraduationCap, ShoppingBag, Truck, Landmark } from 'lucide-react';

const industryList = [
  { icon: Landmark, title: 'Banking & FinTech', desc: 'Secure payment gateways and ledger systems.' },
  { icon: HeartPulse, title: 'Healthcare', desc: 'HIPAA-compliant data lakes and patient portals.' },
  { icon: Factory, title: 'Manufacturing', desc: 'IoT orchestration and supply chain automation.' },
  { icon: ShoppingBag, title: 'Retail & E-commerce', desc: 'High-conversion, scalable digital storefronts.' },
  { icon: Truck, title: 'Logistics', desc: 'Real-time fleet tracking and routing algorithms.' },
  { icon: GraduationCap, title: 'Education', desc: 'Interactive LMS and virtual campus platforms.' },
  { icon: Building2, title: 'Government', desc: 'Federal-grade secure infrastructure deployments.' },
];

export const IndustriesWeServe = () => {
  return (
    <section className="py-24 bg-muted/20 border-y border-border">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Industries We Empower</h2>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4">
          {industryList.map((ind, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -5 }}
              className="flex-1 min-w-[250px] max-w-[300px] p-6 bg-card border border-border rounded-lg flex flex-col items-center text-center shadow-elevation-1 hover:shadow-elevation-1 hover:border-primary/30 transition-all"
            >
              <ind.icon className="w-8 h-8 text-primary mb-4" />
              <h4 className="text-lg font-bold text-foreground mb-2">{ind.title}</h4>
              <p className="text-sm text-muted-foreground">{ind.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
