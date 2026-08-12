import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { PageTransition } from '../components/layout/PageTransition';
import { BlogHero } from '../components/blog/BlogHero';
import { BlogDirectory } from '../components/blog/BlogDirectory';

export const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <PageTransition className="w-full flex flex-col min-h-screen">
      <Helmet>
        <title>Technology Insights | Techzon</title>
        <meta name="description" content="Read the latest technology insights, engineering articles, and best practices from Techzon." />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Engineering Blog",
              "description": "Techzon thought leadership and engineering insights.",
              "publisher": {
                "@type": "Organization",
                "name": "Techzon IT Solutions"
              }
            }
          `}
        </script>
      </Helmet>
      
      <main className="flex-1">
        <BlogHero searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <BlogDirectory searchTerm={searchTerm} />
      </main>
      
          </PageTransition>
  );
};
