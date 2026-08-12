import React from 'react';
import { HeartHandshake } from 'lucide-react';

export const OurCommitment = () => {
  return (
    <section className="py-24 bg-white relative">
      <div className="container-global">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2rem] p-8 md:p-16 relative overflow-hidden text-center text-white">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(118,87,217,0.2),transparent_70%)] pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center mx-auto mb-8 border border-white/20">
              <HeartHandshake className="w-8 h-8 text-[#5BC0EB]" />
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 leading-tight">
              Our Commitment to You
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-0 font-medium leading-relaxed">
              We promise transparency, elite technical execution, and a partnership focused entirely on achieving your business goals. When you succeed, we succeed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
