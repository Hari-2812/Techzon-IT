import React from 'react';
import { Helmet } from 'react-helmet-async';
import { PageTransition } from '../components/layout/PageTransition';
import { EngineeringJourneySection } from '../components/home/sections/EngineeringJourneySection/EngineeringJourneySection';

export const Process = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>Engineering Process | Techzon</title>
        <meta name="description" content="Discover our 8-stage digital lifecycle and software engineering process." />
      </Helmet>
      
      <div className="pt-32 pb-10 bg-white">
        <div className="text-center max-w-[800px] mx-auto px-4 mb-8">
          <h1 className="text-5xl font-display font-bold text-primary mb-6">Our Engineering Process</h1>
          <p className="text-lg text-foreground font-medium">We deliver enterprise software through a rigorous, automated pipeline that guarantees quality, security, and limitless scale.</p>
        </div>
      </div>

      <EngineeringJourneySection />

    </PageTransition>
  );
};
