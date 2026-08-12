import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = path.resolve('d:/project/Techzon IT Solutions/frontend/src');

const portfolioDir = path.join(baseDir, 'components', 'portfolio');
if (!fs.existsSync(portfolioDir)) {
  fs.mkdirSync(portfolioDir, { recursive: true });
}

// 1. PortfolioHero
const heroCode = `import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PortfolioHero = ({ searchTerm, setSearchTerm }) => {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden bg-background border-b border-border">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[600px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-8"
        >
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-semibold">Our Portfolio</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-foreground via-foreground/90 to-primary mb-6"
        >
          Engineering Excellence
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Discover how we architect scalable, high-performance solutions that drive measurable business transformation across global industries.
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
              placeholder="Search projects, technologies, or industries..." 
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

// 2. PortfolioCard
const cardCode = `import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, TrendingUp, Calendar, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PortfolioCard = ({ project, index, layout = 'grid' }) => {
  const isList = layout === 'list';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      className={\`group relative rounded-2xl bg-card border border-border overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/50 transition-all flex \${isList ? 'flex-col md:flex-row' : 'flex-col h-full'}\`}
    >
      {project.isFeatured && (
        <div className="absolute top-4 left-4 z-20 flex items-center gap-1 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
          <Star className="w-3 h-3 fill-current" /> Featured
        </div>
      )}

      <div className={\`relative overflow-hidden bg-muted \${isList ? 'w-full md:w-2/5 aspect-[4/3] md:aspect-auto' : 'w-full aspect-[16/10]'}\`}>
        {project.image || project.thumbnail ? (
          <img 
            src={project.image || project.thumbnail} 
            alt={project.name} 
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
            <div className="w-16 h-16 rounded-2xl bg-card flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500">
              <div className="text-primary font-black text-2xl">{project.name.charAt(0)}</div>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80" />
      </div>

      <div className={\`flex flex-col flex-1 p-6 \${isList ? 'justify-center' : ''}\`}>
        <div className="flex flex-wrap items-center gap-3 mb-4 text-xs font-bold uppercase tracking-wider">
          <span className="text-primary">
            {project.category?.name || project.category || 'Case Study'}
          </span>
          {project.industry && (
            <span className="flex items-center gap-1 text-muted-foreground border-l border-border pl-3">
              <Building2 className="w-3 h-3" /> {project.industry}
            </span>
          )}
          {project.completionYear && (
            <span className="flex items-center gap-1 text-muted-foreground border-l border-border pl-3">
              <Calendar className="w-3 h-3" /> {project.completionYear}
            </span>
          )}
        </div>
        
        <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
          {project.name}
        </h3>
        
        <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-3 flex-1">
          {project.shortDescription || project.description}
        </p>

        {project.kpis && project.kpis.length > 0 && (
          <div className="flex flex-col gap-2 mb-6 bg-muted/50 p-3 rounded-xl border border-border/50">
            {project.kpis.slice(0, 2).map((kpi, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <TrendingUp className="w-4 h-4 text-secondary" />
                <span className="font-semibold text-foreground">{kpi.metric}:</span>
                <span className="text-muted-foreground">{kpi.value}</span>
              </div>
            ))}
          </div>
        )}

        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.slice(0, 4).map((tech, i) => (
              <span key={i} className="text-xs font-medium bg-muted text-muted-foreground px-2 py-1 rounded">
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="text-xs font-medium bg-muted text-muted-foreground px-2 py-1 rounded">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        )}
        
        <div className="mt-auto pt-4 border-t border-border/50">
          <Link to={\`/portfolio/\${project.slug}\`} className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors">
            View Case Study
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
`;

// 3. PortfolioDirectory
const directoryCode = `import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../config/axios';
import { PortfolioCard } from './PortfolioCard';
import { Button } from '../ui/Button';
import { Loader2, AlertCircle, LayoutGrid, List, Filter, ChevronLeft, ChevronRight, SearchX } from 'lucide-react';

const SkeletonCard = ({ layout }) => (
  <div className={\`bg-card rounded-2xl border border-border overflow-hidden flex \${layout === 'list' ? 'flex-col md:flex-row' : 'flex-col h-full'} animate-pulse\`}>
    <div className={\`bg-muted \${layout === 'list' ? 'w-full md:w-2/5 aspect-[4/3] md:aspect-auto' : 'w-full aspect-[16/10]'}\`} />
    <div className="p-6 flex flex-col flex-1">
      <div className="w-20 h-4 bg-muted rounded mb-4" />
      <div className="w-3/4 h-6 bg-muted rounded mb-4" />
      <div className="w-full h-4 bg-muted rounded mb-2" />
      <div className="w-5/6 h-4 bg-muted rounded mb-6" />
      <div className="flex flex-col gap-2 mb-6 p-3 bg-muted/50 rounded-xl">
        <div className="w-full h-4 bg-muted rounded" />
        <div className="w-3/4 h-4 bg-muted rounded" />
      </div>
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

export const PortfolioDirectory = ({ searchTerm }) => {
  const [projects, setProjects] = useState([]);
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
      const res = await api.get('/categories?type=portfolio');
      setCategories(res.data || []);
    } catch (e) {
      console.warn("Categories API offline, using fallback");
      setCategories([
        { _id: 'fintech', name: 'FinTech' },
        { _id: 'healthcare', name: 'Healthcare' },
        { _id: 'ecommerce', name: 'E-Commerce' },
        { _id: 'saas', name: 'SaaS Platforms' }
      ]);
    }
  };

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (activeCategory !== 'all') params.append('category', activeCategory);
      if (sortBy === 'featured') params.append('featured', 'true');
      if (sortBy === 'newest') params.append('sort', '-completionYear');
      if (sortBy === 'name') params.append('sort', 'name');
      params.append('page', page);
      params.append('limit', layout === 'list' ? 6 : 9);

      const response = await api.get(\`/portfolio?\${params.toString()}\`);
      
      if (response.data.docs || response.data.data) {
        const payload = response.data.data || response.data;
        setProjects(payload.docs || payload);
        setTotalPages(payload.totalPages || 1);
      } else {
        setProjects(response.data);
        setTotalPages(1);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch portfolio data.');
    } finally {
      setLoading(false);
    }
  }, [searchTerm, activeCategory, sortBy, page, layout]);

  useEffect(() => {
    fetchFilters();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [searchTerm, activeCategory, sortBy]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

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
              All Projects
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
                <option value="featured">Top Tier Impact</option>
                <option value="newest">Most Recent</option>
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
                {[...Array(layout === 'list' ? 4 : 6)].map((_, i) => <SkeletonCard key={i} layout={layout} />)}
              </motion.div>
            ) : error ? (
              <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
                  <AlertCircle className="w-8 h-8 text-destructive" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Portfolio Registry Offline</h3>
                <p className="text-muted-foreground mb-6 max-w-md">{error}</p>
                <Button onClick={fetchProjects} variant="outline" className="gap-2"><Loader2 className="w-4 h-4" /> Retry</Button>
              </motion.div>
            ) : projects.length === 0 ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-20 text-center bg-card border border-border rounded-2xl">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                  <SearchX className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">No Projects Found</h3>
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
                {projects.map((project, i) => (
                  <PortfolioCard key={project._id || i} project={project} index={i} layout={layout} />
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

// Main Portfolio Page
const pageCode = `import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { PortfolioHero } from '../components/portfolio/PortfolioHero';
import { PortfolioDirectory } from '../components/portfolio/PortfolioDirectory';
import { FinalCTA } from '../components/home/FinalCTA';
import { Footer } from '../components/home/Footer';

export const Portfolio = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="w-full flex flex-col min-h-screen">
      <Helmet>
        <title>Client Portfolio | Techzon IT Solutions</title>
        <meta name="description" content="Explore Techzon's enterprise project portfolio. See how we drive measurable impact through software architecture and AI." />
        <script type="application/ld+json">
          {\`
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
          \`}
        </script>
      </Helmet>
      
      <main className="flex-1">
        <PortfolioHero searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <PortfolioDirectory searchTerm={searchTerm} />
        <FinalCTA />
      </main>
      
      <Footer />
    </div>
  );
};
`;

fs.writeFileSync(path.join(portfolioDir, 'PortfolioHero.jsx'), heroCode);
fs.writeFileSync(path.join(portfolioDir, 'PortfolioCard.jsx'), cardCode);
fs.writeFileSync(path.join(portfolioDir, 'PortfolioDirectory.jsx'), directoryCode);

const pagesDir = path.join(baseDir, 'pages');
fs.writeFileSync(path.join(pagesDir, 'Portfolio.jsx'), pageCode);

console.log('Portfolio Listing components generated successfully.');
