import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = path.resolve('d:/project/Techzon IT Solutions/frontend/src');

const detailsDir = path.join(baseDir, 'components', 'services', 'details');
if (!fs.existsSync(detailsDir)) {
  fs.mkdirSync(detailsDir, { recursive: true });
}

// 1. ServiceDetailHero
const heroCode = `import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ServiceDetailHero = ({ service }) => {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden bg-background border-b border-border">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[600px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-muted-foreground mb-8"
        >
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/services" className="hover:text-primary transition-colors">Services</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-semibold">{service.category?.name || service.category || 'Tech'}</span>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="w-full lg:w-3/5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6"
            >
              <Settings className="w-4 h-4" /> Enterprise Capability
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6 leading-tight"
            >
              {service.name}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-muted-foreground leading-relaxed mb-8"
            >
              {service.shortDescription}
            </motion.p>
          </div>
          
          <div className="w-full lg:w-2/5">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl border border-border"
            >
              {service.image ? (
                <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <div className="text-6xl font-black text-primary opacity-50">{service.name.charAt(0)}</div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
`;

// 2. Overview & Details blocks
const detailsCode = `import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CheckCircle2, Server, Globe2, ShieldCheck, Cpu } from 'lucide-react';

export const ServiceOverview = ({ content }) => (
  <section className="py-24 bg-background">
    <div className="container mx-auto px-6">
      <div className="max-w-4xl mx-auto prose prose-invert prose-lg text-muted-foreground">
        <h2 className="text-3xl font-bold text-foreground mb-6">Service Overview</h2>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  </section>
);

export const ServiceFeaturesGrid = ({ features }) => {
  if (!features || features.length === 0) return null;
  return (
    <section className="py-24 bg-muted/20 border-y border-border">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-foreground mb-16">Enterprise Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card p-8 rounded-2xl border border-border shadow-sm hover:border-primary/50 transition-colors"
            >
              <CheckCircle2 className="w-8 h-8 text-primary mb-4" />
              <h4 className="text-lg font-bold text-foreground mb-2">{typeof feat === 'string' ? feat : feat.title}</h4>
              {feat.description && <p className="text-sm text-muted-foreground">{feat.description}</p>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const ServiceProcessTimeline = ({ process }) => {
  if (!process || process.length === 0) return null;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-foreground mb-20">Development Process</h2>
        <div className="relative max-w-3xl mx-auto pl-8 md:pl-0">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-border md:-translate-x-1/2 rounded-full overflow-hidden">
            <motion.div className="w-full bg-primary" style={{ height }} />
          </div>
          <div className="flex flex-col gap-12">
            {process.map((step, i) => (
              <div key={i} className={\`relative flex flex-col md:flex-row items-start md:items-center gap-8 \${i % 2 === 0 ? '' : 'md:flex-row-reverse'}\`}>
                <div className={\`w-full md:w-1/2 \${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}\`}>
                  <div className="bg-card p-6 rounded-2xl border border-border">
                    <div className="text-primary font-bold text-sm uppercase mb-2">Phase {i+1}</div>
                    <h4 className="text-lg font-bold text-foreground mb-2">{typeof step === 'string' ? step : step.title}</h4>
                    {step.description && <p className="text-sm text-muted-foreground">{step.description}</p>}
                  </div>
                </div>
                <div className="absolute left-[-5px] md:left-1/2 top-6 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 w-4 h-4 rounded-full bg-primary ring-4 ring-background" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const ServiceTechStack = ({ techs }) => {
  if (!techs || techs.length === 0) return null;
  return (
    <section className="py-24 bg-muted/20 border-y border-border">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-foreground mb-16">Technology Stack</h2>
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {techs.map((tech, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="px-6 py-3 rounded-xl bg-card border border-border shadow-sm font-semibold text-foreground flex items-center gap-2"
            >
              <Cpu className="w-4 h-4 text-primary" />
              {tech}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
`;

// Main ServiceDetails Page
const pageCode = `import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import api from '../../config/axios';
import { ServiceDetailHero } from '../components/services/details/ServiceDetailHero';
import { ServiceOverview, ServiceFeaturesGrid, ServiceProcessTimeline, ServiceTechStack } from '../components/services/details/ServiceDetailsBlocks';
import { FinalCTA } from '../components/home/FinalCTA';
import { Footer } from '../components/home/Footer';
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
        const res = await api.get(\`/services/\${slug}\`);
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
        <title>{service.name} | Techzon IT Solutions</title>
        <meta name="description" content={service.shortDescription} />
        <script type="application/ld+json">
          {\`
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "\${service.name}",
              "provider": {
                "@type": "Organization",
                "name": "Techzon IT Solutions"
              },
              "description": "\${service.shortDescription}"
            }
          \`}
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
      
      <Footer />
    </div>
  );
};
`;

fs.writeFileSync(path.join(detailsDir, 'ServiceDetailHero.jsx'), heroCode);
fs.writeFileSync(path.join(detailsDir, 'ServiceDetailsBlocks.jsx'), detailsCode);

const pagesDir = path.join(baseDir, 'pages');
fs.writeFileSync(path.join(pagesDir, 'ServiceDetails.jsx'), pageCode);

// Update routes
const routesCode = `import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { PublicLayout, AdminLayout, AuthLayout } from '../layouts';
import { Home } from '../pages/Home';
import { About } from '../pages/About';
import { Services } from '../pages/Services';
import { ServiceDetails } from '../pages/ServiceDetails';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'services', element: <Services /> },
      { path: 'services/:slug', element: <ServiceDetails /> },
    ]
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <div>Login (Pending)</div> }
    ]
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <div>Dashboard (Pending)</div> }
    ]
  }
]);
`;
fs.writeFileSync(path.join(baseDir, 'routes', 'index.jsx'), routesCode);

console.log('Service Details components generated and routes updated successfully.');
