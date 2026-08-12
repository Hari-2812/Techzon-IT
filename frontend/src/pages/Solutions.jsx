import React from 'react';
import { Helmet } from 'react-helmet-async';
import { PageTransition } from '../components/layout/PageTransition';
import { SolutionShowcaseSection } from '../components/home/sections/SolutionShowcaseSection/SolutionShowcaseSection';
import { FinalCTA } from '../components/home/FinalCTA';

export const Solutions = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>Digital Technology Solutions | Techzon</title>
        <meta name="description" content="Explore our enterprise software solutions, digital transformation strategies, and cloud modernization." />
      </Helmet>
      
      <div className="pt-32 pb-10 bg-white">
        <div className="text-center max-w-[800px] mx-auto px-4 mb-8">
          <div className="text-xs font-bold text-primary uppercase tracking-widest mb-4">OUR SOLUTIONS</div>
          <h1 className="text-5xl font-display font-bold text-primary mb-6">Digital Technology Solutions</h1>
          <p className="text-lg text-foreground font-medium">We engineer scalable, secure, and high-performance digital solutions that solve complex business challenges.</p>
        </div>
      </div>

      <SolutionShowcaseSection />
      
      <FinalCTA />

    </PageTransition>
  );
};
