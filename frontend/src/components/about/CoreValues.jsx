import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, HeartHandshake, Lightbulb, Users, BarChart } from 'lucide-react';

const values = [
  { icon: Shield, title: 'Zero-Trust Security', desc: 'Security is not an afterthought; it is woven into the fabric of our architecture.' },
  { icon: Zap, title: 'Operational Velocity', desc: 'We deliver high-impact solutions with unprecedented speed and precision.' },
  { icon: HeartHandshake, title: 'Absolute Transparency', desc: 'Honest communication, transparent timelines, and clear architectural decisions.' },
  { icon: Lightbulb, title: 'Relentless Innovation', desc: 'We constantly push the boundaries of modern engineering and cloud tech.' },
  { icon: Users, title: 'Collective Brilliance', desc: 'Our strength lies in our elite, globally distributed engineering squads.' },
  { icon: BarChart, title: 'Data-Driven Outcomes', desc: 'Every line of code we write is designed to generate measurable business ROI.' },
];

export const CoreValues = () => {
  return (
    <section className="py-24 bg-background border-b border-border">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Our Core Values</h2>
          <p className="text-lg text-muted-foreground">The foundational principles that dictate our engineering culture and client partnerships.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((val, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              className="p-8 premium-card shadow-elevation-1 hover:shadow-elevation-2 hover:border-primary/30 transition-all group"
            >
              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <val.icon className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
              </div>
              <h4 className="text-xl font-bold text-foreground mb-3">{val.title}</h4>
              <p className="text-muted-foreground leading-relaxed text-sm">{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
