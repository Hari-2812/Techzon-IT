import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Medal, Star } from 'lucide-react';

const certs = ['ISO 27001 Certified', 'SOC 2 Type II', 'AWS Advanced Partner', 'Microsoft Gold Partner', 'Google Cloud Premier'];
const awards = ['Top B2B Company 2025', 'Fastest Growing Tech 2024', 'Excellence in Enterprise IT', 'Best Cloud Architecture'];

export const CertificationsAwards = () => {
  return (
    <section className="py-24 bg-background border-b border-border overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Certifications */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-primary" />
              Global Certifications
            </h3>
            <div className="flex flex-wrap gap-4">
              {certs.map((cert, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="px-6 py-4 rounded-lg bg-muted/50 border border-border font-semibold text-foreground flex items-center gap-3"
                >
                  <Star className="w-5 h-5 text-secondary fill-secondary" />
                  {cert}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Awards */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
              <Award className="w-8 h-8 text-primary" />
              Industry Recognition
            </h3>
            <div className="space-y-4">
              {awards.map((award, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-4 premium-card flex items-center gap-4 hover:border-primary/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Medal className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-bold text-foreground">{award}</span>
                </motion.div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};
