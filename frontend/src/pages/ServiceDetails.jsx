import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import api from '../config/axios';
import { ServiceDetailHero } from '../components/services/details/ServiceDetailHero';
import { ServiceOverview, ServiceFeaturesGrid, ServiceProcessTimeline, ServiceTechStack } from '../components/services/details/ServiceDetailsBlocks';
import { FinalCTA } from '../components/home/FinalCTA';
import { Loader2, AlertCircle } from 'lucide-react';

export const ServiceDetails = () => {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await api.get(`/services/${slug}`);
        setService(res.data.data || res.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Service not found.');
      } finally {
        setLoading(false);
      }
    };
    
    // Scroll restoration
    window.scrollTo(0, 0);
    fetchService();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6 text-center">
        <AlertCircle className="w-16 h-16 text-destructive mb-4" />
        <h1 className="text-3xl font-bold text-foreground mb-4">Service Offline</h1>
        <p className="text-muted-foreground max-w-md mb-8">{error}</p>
        <Link to="/services" className="px-6 py-3 bg-primary text-primary-foreground font-bold rounded-full">
          Return to Registry
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col min-h-screen">
      <Helmet>
        <title>Techzon IT Solutions</title>
        <meta name="description" content={service.shortDescription} />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "${service.name}",
              "provider": {
                "@type": "Organization",
                "name": "Techzon IT Solutions"
              },
              "description": "${service.shortDescription}"
            }
          `}
        </script>
      </Helmet>
      
      <main className="flex-1">
        <ServiceDetailHero service={service} />
        <ServiceOverview content={service.description} />
        <ServiceFeaturesGrid features={service.features || ["Architecture Design", "API Development", "Cloud Deployment"]} />
        <ServiceProcessTimeline process={service.process || ["Discovery & Planning", "System Architecture", "Agile Development", "QA & Testing", "Deployment & Handover"]} />
        <ServiceTechStack techs={service.technologies} />
        <FinalCTA />
      </main>
      
          </div>
  );
};
