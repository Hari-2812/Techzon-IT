import React from 'react';
import { Helmet } from 'react-helmet-async';
import { PageTransition } from '../components/layout/PageTransition';
import { AboutHero } from '../components/about/AboutHero';
import { WhoWeAre } from '../components/about/WhoWeAre';
import { ProblemSolvingJourney } from '../components/about/ProblemSolvingJourney';
import { EngineeringApproach } from '../components/about/EngineeringApproach';
import { AboutTechnology } from '../components/about/AboutTechnology';
import { WhyChooseUs } from '../components/about/WhyChooseUs';
import { AboutCTA } from '../components/about/AboutCTA';

export const About = () => {
  return (
    <PageTransition className="w-full flex flex-col min-h-screen">
      <Helmet>
        <title>About Techzon | Digital Engineering Company</title>
        <meta name="description" content="Learn about Techzon's engineering philosophy, our core values, and the expert team behind our world-class digital solutions." />
        {/* Basic schema for demonstration */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Techzon IT Solutions",
              "url": "https://techzon.com",
              "logo": "https://techzon.com/logo.png"
            }
          `}
        </script>
      </Helmet>
      
      <main className="flex-1">
        <AboutHero />
        <WhoWeAre />
        <ProblemSolvingJourney />
        <EngineeringApproach />
        <AboutTechnology />
        <WhyChooseUs />
        <AboutCTA />
      </main>
    </PageTransition>
  );
};
