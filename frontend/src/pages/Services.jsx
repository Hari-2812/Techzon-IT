import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { PageTransition } from '../components/layout/PageTransition';
import { ServicesHero } from '../components/services/ServicesHero';
import { ServicesDirectory } from '../components/services/ServicesDirectory';
import { FinalCTA } from '../components/home/FinalCTA';

export const Services = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="w-full flex flex-col min-h-screen">
      <Helmet>
        <title>Enterprise Services | Techzon IT Solutions</title>
        <meta name="description" content="Discover Techzon's comprehensive suite of enterprise software, cloud architecture, and AI engineering services." />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Enterprise Services",
              "description": "Enterprise software engineering and consulting services.",
              "publisher": {
                "@type": "Organization",
                "name": "Techzon IT Solutions"
              }
            }
          `}
        </script>
      </Helmet>
      
      <main className="flex-1">
        <ServicesHero searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <ServicesDirectory searchTerm={searchTerm} />
        <FinalCTA />
      </main>
      
          </div>
  );
};
