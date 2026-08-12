import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { PageTransition } from '../components/layout/PageTransition';
import { PortfolioHero } from '../components/portfolio/PortfolioHero';
import { PortfolioDirectory } from '../components/portfolio/PortfolioDirectory';
import { FinalCTA } from '../components/home/FinalCTA';

export const Portfolio = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <PageTransition className="w-full flex flex-col min-h-screen">
      <Helmet>
        <title>Software Development Portfolio | Techzon</title>
        <meta name="description" content="Explore Techzon's latest enterprise projects and digital transformations." />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Client Portfolio",
              "description": "Enterprise case studies and project success stories.",
              "publisher": {
                "@type": "Organization",
                "name": "Techzon IT Solutions"
              }
            }
          `}
        </script>
      </Helmet>
      
      <main className="flex-1">
        <PortfolioHero searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <PortfolioDirectory searchTerm={searchTerm} />
        <FinalCTA />
      </main>
      
          </PageTransition>
  );
};
