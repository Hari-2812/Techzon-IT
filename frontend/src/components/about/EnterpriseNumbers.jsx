import React from 'react';
import { motion } from 'framer-motion';

export const EnterpriseNumbers = () => {
  const stats = [
    { num: "500+", label: "Enterprise Projects" },
    { num: "120+", label: "Global Clients" },
    { num: "15+", label: "Countries Served" },
    { num: "99.99%", label: "Infrastructure Uptime" },
    { num: "24x7", label: "SLA Support" }
  ];

  return (
    <section className="py-20 bg-primary border-y border-border relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-wrap justify-between items-center gap-8">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center flex-1 min-w-[150px]"
            >
              <div className="text-4xl md:text-5xl font-black text-white mb-2">{stat.num}</div>
              <div className="text-sm font-semibold text-white/80 uppercase tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
