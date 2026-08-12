import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = path.resolve('d:/project/Techzon IT Solutions/frontend/src');

const servicesCode = `import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../config/axios';
import { Button } from '../ui/Button';
import { Loader2, AlertCircle, LayoutGrid, ArrowRight } from 'lucide-react';

const ServiceCard = ({ service, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -8 }}
    className="group relative p-[1px] rounded-2xl bg-gradient-to-b from-border/50 to-transparent overflow-hidden h-full flex"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
    <div className="relative w-full h-full bg-card/60 backdrop-blur-md p-6 rounded-2xl flex flex-col items-start border border-transparent shadow-sm">
      
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary transition-colors duration-300">
        {service.icon ? (
          <svg className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={service.icon} />
          </svg>
        ) : (
          <LayoutGrid className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300 group-hover:scale-110" />
        )}
      </div>
      
      <h3 className="text-xl font-bold text-foreground mb-2">{service.title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-6">{service.description || service.shortDescription}</p>
      
      <button className="mt-auto flex items-center gap-2 text-sm font-semibold text-primary group-hover:text-secondary transition-colors">
        Learn more
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  </motion.div>
);

const SkeletonCard = () => (
  <div className="p-[1px] rounded-2xl bg-border/20 overflow-hidden h-full">
    <div className="w-full h-full bg-card/40 p-6 rounded-2xl flex flex-col animate-pulse">
      <div className="w-12 h-12 rounded-lg bg-muted mb-5" />
      <div className="w-3/4 h-6 bg-muted rounded mb-2" />
      <div className="w-full h-4 bg-muted rounded mb-2" />
      <div className="w-5/6 h-4 bg-muted rounded mb-6 flex-1" />
      <div className="w-24 h-4 bg-muted rounded mt-auto" />
    </div>
  </div>
);

export const ServicesPreview = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(null);
      // Our API returns an object { success, message, total, data: [...] }
      const response = await api.get('/services');
      setServices(response.data || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load enterprise services.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <section className="py-24 bg-background border-t border-border" id="services">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold text-primary uppercase tracking-widest mb-3"
          >
            Capabilities
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4"
          >
            Enterprise Digital Services
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            We deploy elite engineering squads to resolve complex technical debt and architect scalable growth engines.
          </motion.p>
        </div>

        <div className="min-h-[400px] relative">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
              </motion.div>
            ) : error ? (
              <motion.div 
                key="error"
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center p-12 text-center bg-destructive/5 rounded-2xl border border-destructive/20"
              >
                <AlertCircle className="w-12 h-12 text-destructive mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">Service Discovery Interrupted</h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                  {error}
                </p>
                <Button onClick={fetchServices} variant="outline" className="gap-2">
                  <Loader2 className="w-4 h-4" />
                  Retry Connection
                </Button>
              </motion.div>
            ) : services.length === 0 ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center p-12 text-center bg-muted/20 rounded-2xl border border-border"
              >
                <LayoutGrid className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
                <h3 className="text-xl font-bold text-foreground mb-2">No Services Configured</h3>
                <p className="text-muted-foreground max-w-md">
                  The enterprise service registry is currently empty. Please configure services via the admin dashboard.
                </p>
              </motion.div>
            ) : (
              <motion.div 
                key="content"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {services.map((service, i) => (
                  <ServiceCard key={service._id || i} service={service} index={i} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
`;

fs.writeFileSync(path.join(baseDir, 'components/home', 'ServicesPreview.jsx'), servicesCode);
console.log('ServicesPreview component refactored for API integration.');

// Update pages/Home.jsx to include Helmet
const homeCode = `import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Hero } from '../components/home/Hero';
import { TrustedCompanies } from '../components/home/TrustedCompanies';
import { CompanyStatistics } from '../components/home/CompanyStatistics';
import { WhyChooseTechzon } from '../components/home/WhyChooseTechzon';
import { TechnologyPartners } from '../components/home/TechnologyPartners';
import { ServicesPreview } from '../components/home/ServicesPreview';
import { DevelopmentProcess } from '../components/home/DevelopmentProcess';
import { TechnologyStack } from '../components/home/TechnologyStack';

export const Home = () => {
  return (
    <div className="w-full">
      <Helmet>
        <title>Techzon IT Solutions | Enterprise Software Engineering</title>
        <meta name="description" content="We architect, secure, and scale digital ecosystems for global industry leaders. Expert in Web, Mobile, Cloud, and AI." />
      </Helmet>
      
      <Hero />
      <TrustedCompanies />
      <CompanyStatistics />
      <WhyChooseTechzon />
      <TechnologyPartners />
      <ServicesPreview />
      <DevelopmentProcess />
      <TechnologyStack />
      {/* Remaining sections will be appended here in future phases */}
    </div>
  );
};
`;
fs.writeFileSync(path.join(baseDir, 'pages', 'Home.jsx'), homeCode);
console.log('Home.jsx updated with React Helmet.');

// Need to ensure HelmetProvider is wrapping the app.
const mainCode = `import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { router } from './routes'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>,
)
`;
fs.writeFileSync(path.join(baseDir, 'main.jsx'), mainCode);
console.log('main.jsx updated to include HelmetProvider.');

