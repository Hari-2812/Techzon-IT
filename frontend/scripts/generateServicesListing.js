import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = path.resolve('d:/project/Techzon IT Solutions/frontend/src');

const servicesDir = path.join(baseDir, 'components', 'services');
if (!fs.existsSync(servicesDir)) {
  fs.mkdirSync(servicesDir, { recursive: true });
}

// 1. ServicesHero
const heroCode = `import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ServicesHero = ({ searchTerm, setSearchTerm }) => {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden bg-background border-b border-border">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[600px] bg-secondary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-8"
        >
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-semibold">Enterprise Services</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-foreground via-foreground/90 to-secondary mb-6"
        >
          Architecting Your <br/> Digital Future
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Explore our elite suite of enterprise-grade solutions engineered for absolute scalability, security, and operational dominance.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-xl mx-auto relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-secondary/50 rounded-full blur opacity-25 group-hover:opacity-50 transition-opacity" />
          <div className="relative flex items-center bg-card border border-border rounded-full p-2 shadow-lg">
            <Search className="w-5 h-5 text-muted-foreground ml-3 shrink-0" />
            <input 
              type="text" 
              placeholder="Search services, technologies, or keywords..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent border-none focus:outline-none text-foreground px-4 py-2"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
`;

// 2. ServiceCard (Reusable)
const cardCode = `import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ServiceCard = ({ service, index, layout = 'grid' }) => {
  const isList = layout === 'list';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      className={\`group relative rounded-2xl bg-card border border-border overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/50 transition-all flex \${isList ? 'flex-col md:flex-row' : 'flex-col h-full'}\`}
    >
      {service.isFeatured && (
        <div className="absolute top-4 left-4 z-20 flex items-center gap-1 px-3 py-1 bg-secondary text-secondary-foreground text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
          <Star className="w-3 h-3 fill-current" /> Featured
        </div>
      )}

      <div className={\`relative overflow-hidden bg-muted \${isList ? 'w-full md:w-1/3 aspect-[4/3] md:aspect-auto' : 'aspect-[16/10]'}\`}>
        {service.image ? (
          <img 
            src={service.image} 
            alt={service.name} 
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
            <div className="w-16 h-16 rounded-2xl bg-card flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500">
              <div className="text-primary font-black text-2xl">{service.name.charAt(0)}</div>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80" />
      </div>

      <div className={\`flex flex-col flex-1 p-6 \${isList ? 'justify-center' : ''}\`}>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold text-primary uppercase tracking-wider">
            {service.category?.name || service.category}
          </span>
        </div>
        
        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
          {service.name}
        </h3>
        
        <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-3 flex-1">
          {service.shortDescription || service.description}
        </p>

        {service.technologies && service.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {service.technologies.slice(0, 3).map((tech, i) => (
              <span key={i} className="text-xs font-medium bg-muted text-muted-foreground px-2 py-1 rounded">
                {tech}
              </span>
            ))}
            {service.technologies.length > 3 && (
              <span className="text-xs font-medium bg-muted text-muted-foreground px-2 py-1 rounded">
                +{service.technologies.length - 3}
              </span>
            )}
          </div>
        )}
        
        <div className="mt-auto pt-4 border-t border-border/50">
          <Link to={\`/services/\${service.slug}\`} className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors">
            Explore Solution
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
`;

// 3. ServicesDirectory
const directoryCode = `import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../config/axios';
import { ServiceCard } from './ServiceCard';
import { Button } from '../ui/Button';
import { Loader2, AlertCircle, LayoutGrid, List, Filter, ChevronLeft, ChevronRight, SearchX } from 'lucide-react';

const SkeletonCard = ({ layout }) => (
  <div className={\`bg-card rounded-2xl border border-border overflow-hidden flex \${layout === 'list' ? 'flex-col md:flex-row' : 'flex-col h-full'} animate-pulse\`}>
    <div className={\`bg-muted \${layout === 'list' ? 'w-full md:w-1/3 aspect-[4/3] md:aspect-auto' : 'w-full aspect-[16/10]'}\`} />
    <div className="p-6 flex flex-col flex-1">
      <div className="w-20 h-4 bg-muted rounded mb-4" />
      <div className="w-3/4 h-6 bg-muted rounded mb-4" />
      <div className="w-full h-4 bg-muted rounded mb-2" />
      <div className="w-5/6 h-4 bg-muted rounded mb-6" />
      <div className="flex gap-2 mb-6">
        <div className="w-16 h-6 bg-muted rounded" />
        <div className="w-16 h-6 bg-muted rounded" />
      </div>
      <div className="mt-auto pt-4 border-t border-border/50">
        <div className="w-32 h-4 bg-muted rounded" />
      </div>
    </div>
  </div>
);

export const ServicesDirectory = ({ searchTerm }) => {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filters & State
  const [layout, setLayout] = useState('grid');
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchFilters = async () => {
    try {
      // Future-ready: Get categories dynamically
      const res = await api.get('/categories?type=service');
      setCategories(res.data || []);
    } catch (e) {
      console.warn("Categories API missing, using hardcoded fallback for now.");
      setCategories([
        { _id: 'web', name: 'Web Engineering' },
        { _id: 'cloud', name: 'Cloud & DevOps' },
        { _id: 'ai', name: 'AI & Data' },
        { _id: 'security', name: 'Cybersecurity' }
      ]);
    }
  };

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Build query string based on CMS-ready architecture
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (activeCategory !== 'all') params.append('category', activeCategory);
      if (sortBy === 'featured') params.append('featured', 'true');
      if (sortBy === 'newest') params.append('sort', '-createdAt');
      if (sortBy === 'name') params.append('sort', 'name');
      params.append('page', page);
      params.append('limit', 9);

      const response = await api.get(\`/services?\${params.toString()}\`);
      
      // Handle standardized paginated response or flat array
      if (response.data.docs || response.data.data) {
        const payload = response.data.data || response.data;
        setServices(payload.docs || payload);
        setTotalPages(payload.totalPages || 1);
      } else {
        setServices(response.data);
        setTotalPages(1);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch services.');
    } finally {
      setLoading(false);
    }
  }, [searchTerm, activeCategory, sortBy, page]);

  useEffect(() => {
    fetchFilters();
  }, []);

  useEffect(() => {
    // Reset to page 1 when filters change
    setPage(1);
  }, [searchTerm, activeCategory, sortBy]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  return (
    <section className="py-16 bg-muted/20 min-h-screen">
      <div className="container mx-auto px-6">
        
        {/* Controls Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-12 bg-card p-4 rounded-2xl border border-border shadow-sm">
          
          <div className="flex items-center gap-4 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
            <button 
              onClick={() => setActiveCategory('all')}
              className={\`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-all \${activeCategory === 'all' ? 'bg-primary text-primary-foreground shadow-md' : 'text-muted-foreground hover:bg-muted'}\`}
            >
              All Solutions
            </button>
            {categories.map(c => (
              <button 
                key={c._id}
                onClick={() => setActiveCategory(c._id)}
                className={\`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-all \${activeCategory === c._id ? 'bg-primary text-primary-foreground shadow-md' : 'text-muted-foreground hover:bg-muted'}\`}
              >
                {c.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 w-full lg:w-auto justify-between lg:justify-end border-t lg:border-t-0 border-border pt-4 lg:pt-0">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="w-4 h-4" />
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-none focus:outline-none font-semibold text-foreground cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="newest">Newest Arrivals</option>
                <option value="name">Alphabetical (A-Z)</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
              <button 
                onClick={() => setLayout('grid')}
                className={\`p-1.5 rounded-md transition-colors \${layout === 'grid' ? 'bg-background shadow text-foreground' : 'text-muted-foreground hover:text-foreground'}\`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setLayout('list')}
                className={\`p-1.5 rounded-md transition-colors \${layout === 'list' ? 'bg-background shadow text-foreground' : 'text-muted-foreground hover:text-foreground'}\`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Grid/List Engine */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                key="loading" 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
                className={\`grid gap-6 \${layout === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}\`}
              >
                {[...Array(6)].map((_, i) => <SkeletonCard key={i} layout={layout} />)}
              </motion.div>
            ) : error ? (
              <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
                  <AlertCircle className="w-8 h-8 text-destructive" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Service Registry Offline</h3>
                <p className="text-muted-foreground mb-6 max-w-md">{error}</p>
                <Button onClick={fetchServices} variant="outline" className="gap-2"><Loader2 className="w-4 h-4" /> Retry</Button>
              </motion.div>
            ) : services.length === 0 ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-20 text-center bg-card border border-border rounded-2xl">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                  <SearchX className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">No Solutions Found</h3>
                <p className="text-muted-foreground max-w-md">Try adjusting your filters or search terms.</p>
                {(searchTerm || activeCategory !== 'all') && (
                  <Button 
                    onClick={() => { setSearchTerm(''); setActiveCategory('all'); }} 
                    variant="outline" className="mt-6"
                  >
                    Clear All Filters
                  </Button>
                )}
              </motion.div>
            ) : (
              <motion.div 
                key="content" 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
                className={\`grid gap-6 \${layout === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}\`}
              >
                {services.map((service, i) => (
                  <ServiceCard key={service._id || i} service={service} index={i} layout={layout} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Pagination Engine */}
        {!loading && !error && totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-16">
            <Button 
              variant="outline" 
              size="icon" 
              disabled={page === 1} 
              onClick={() => { setPage(p => p - 1); window.scrollTo({top: 0, behavior: 'smooth'}); }}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm font-semibold text-foreground">Page {page} of {totalPages}</span>
            <Button 
              variant="outline" 
              size="icon" 
              disabled={page === totalPages} 
              onClick={() => { setPage(p => p + 1); window.scrollTo({top: 0, behavior: 'smooth'}); }}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}

      </div>
    </section>
  );
};
`;

// Main Services Page
const pageCode = `import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ServicesHero } from '../components/services/ServicesHero';
import { ServicesDirectory } from '../components/services/ServicesDirectory';
import { FinalCTA } from '../components/home/FinalCTA';
import { Footer } from '../components/home/Footer';

export const Services = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="w-full flex flex-col min-h-screen">
      <Helmet>
        <title>Enterprise Services | Techzon IT Solutions</title>
        <meta name="description" content="Discover Techzon's comprehensive suite of enterprise software, cloud architecture, and AI engineering services." />
        <script type="application/ld+json">
          {\`
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
          \`}
        </script>
      </Helmet>
      
      <main className="flex-1">
        <ServicesHero searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <ServicesDirectory searchTerm={searchTerm} />
        <FinalCTA />
      </main>
      
      <Footer />
    </div>
  );
};
`;

fs.writeFileSync(path.join(servicesDir, 'ServicesHero.jsx'), heroCode);
fs.writeFileSync(path.join(servicesDir, 'ServiceCard.jsx'), cardCode);
fs.writeFileSync(path.join(servicesDir, 'ServicesDirectory.jsx'), directoryCode);

const pagesDir = path.join(baseDir, 'pages');
fs.writeFileSync(path.join(pagesDir, 'Services.jsx'), pageCode);

console.log('Services Listing components generated successfully.');
