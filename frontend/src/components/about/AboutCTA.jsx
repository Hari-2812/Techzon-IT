import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const AboutCTA = () => {
  return (
    <section className="py-24 md:py-32 bg-white border-t border-slate-200">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-[#1F2937] mb-6">
          Have a business challenge to solve?
        </h2>
        <p className="text-lg text-foreground mb-10 max-w-2xl mx-auto">
          Partner with Techzon to engineer scalable, reliable digital solutions that drive your enterprise forward.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/contact" className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-full font-bold uppercase tracking-wider text-sm hover:bg-[#1F2937] transition-all flex items-center justify-center gap-2 group shadow-lg shadow-[#0B2D4D]/20">
            Start a Project
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link to="/services" className="w-full sm:w-auto px-8 py-4 bg-white text-primary border border-slate-200 rounded-full font-bold uppercase tracking-wider text-sm hover:bg-muted transition-colors text-center shadow-sm">
            Explore Our Services
          </Link>
        </div>
      </div>
    </section>
  );
};
