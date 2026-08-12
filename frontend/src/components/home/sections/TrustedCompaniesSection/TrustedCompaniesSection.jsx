import React from 'react';

const logos = [
  "Acme Corp", "GlobalTech", "Nexus Finance", "Stratos Industries", "Omni Systems"
];

export const TrustedCompaniesSection = () => {
  return (
    <section className="py-20 bg-white border-b border-slate-100 overflow-hidden">
      <div className="container mx-auto px-6 mb-10 text-center">
        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">Trusted by industry leaders worldwide</p>
      </div>
      
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 px-8 max-w-7xl mx-auto">
        {logos.map((logo, i) => (
          <div key={i} className="text-xl md:text-2xl font-black text-muted-foreground select-none">
            {logo}
          </div>
        ))}
      </div>
    </section>
  );
};
