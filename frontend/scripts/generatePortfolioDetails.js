import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = path.resolve('d:/project/Techzon IT Solutions/frontend/src');

const detailsDir = path.join(baseDir, 'components', 'portfolio', 'details');
if (!fs.existsSync(detailsDir)) {
  fs.mkdirSync(detailsDir, { recursive: true });
}

// 1. ProjectDetailHero
const heroCode = `import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Building2, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ProjectDetailHero = ({ project }) => {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden bg-background border-b border-border">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[600px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-muted-foreground mb-8 flex-wrap"
        >
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/portfolio" className="hover:text-primary transition-colors">Portfolio</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-semibold">{project.name}</span>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="w-full lg:w-3/5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap items-center gap-3 mb-6"
            >
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                {project.category?.name || project.category || 'Case Study'}
              </div>
              {project.industry && (
                <div className="inline-flex items-center gap-1 text-muted-foreground text-xs font-bold uppercase tracking-wider">
                  <Building2 className="w-4 h-4" /> {project.industry}
                </div>
              )}
              {project.completionYear && (
                <div className="inline-flex items-center gap-1 text-muted-foreground text-xs font-bold uppercase tracking-wider border-l border-border pl-3">
                  <Calendar className="w-4 h-4" /> {project.completionYear}
                </div>
              )}
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6 leading-tight"
            >
              {project.name}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-muted-foreground leading-relaxed mb-8"
            >
              {project.shortDescription || project.description}
            </motion.p>
          </div>
          
          <div className="w-full lg:w-2/5">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-border group"
            >
              {project.image || project.thumbnail ? (
                <img 
                  src={project.image || project.thumbnail} 
                  alt={project.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <div className="text-6xl font-black text-primary opacity-50">{project.name.charAt(0)}</div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-60" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
`;

// 2. ImageGallery (Masonry + Lightbox)
const galleryCode = `import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

export const ImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setSelectedImage(images[index]);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const nextImage = useCallback(() => {
    if (!images) return;
    const newIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex]);
  }, [currentIndex, images]);

  const prevImage = useCallback(() => {
    if (!images) return;
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex]);
  }, [currentIndex, images]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, nextImage, prevImage]);

  if (!images || images.length === 0) return null;

  return (
    <section className="py-24 bg-background border-y border-border">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-foreground mb-16">Project Gallery</h2>
        
        {/* CSS Grid Masonry approximation */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 3) * 0.1 }}
              className="relative break-inside-avoid rounded-2xl overflow-hidden group cursor-pointer border border-border shadow-sm hover:shadow-xl transition-all"
              onClick={() => openLightbox(idx)}
            >
              <img 
                src={typeof img === 'string' ? img : img.url} 
                alt={typeof img === 'string' ? \`Gallery \${idx}\` : img.caption} 
                loading="lazy"
                className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="w-12 h-12 rounded-full bg-background/50 backdrop-blur flex items-center justify-center text-foreground">
                  <ZoomIn className="w-6 h-6" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm"
          >
            <button onClick={closeLightbox} className="absolute top-6 right-6 p-2 rounded-full bg-muted/50 hover:bg-muted text-foreground transition-colors z-50">
              <X className="w-6 h-6" />
            </button>

            <button onClick={prevImage} className="absolute left-6 p-3 rounded-full bg-background/50 hover:bg-primary text-foreground hover:text-white transition-colors z-50 hidden md:block">
              <ChevronLeft className="w-8 h-8" />
            </button>

            <div className="relative max-w-5xl max-h-[85vh] w-full px-4 flex items-center justify-center">
              <motion.img 
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                src={typeof selectedImage === 'string' ? selectedImage : selectedImage.url}
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              />
            </div>

            <button onClick={nextImage} className="absolute right-6 p-3 rounded-full bg-background/50 hover:bg-primary text-foreground hover:text-white transition-colors z-50 hidden md:block">
              <ChevronRight className="w-8 h-8" />
            </button>

            {typeof selectedImage !== 'string' && selectedImage.caption && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-2 bg-background/80 backdrop-blur rounded-full text-sm text-foreground shadow-lg">
                {selectedImage.caption}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
`;

// 3. ProjectDetailsBlocks
const blocksCode = `import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Cpu, Server, Database, Cloud, Shield, Lightbulb, Target } from 'lucide-react';

export const ProjectOverview = ({ challenge, solution }) => {
  if (!challenge && !solution) return null;
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {challenge && (
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-card p-8 rounded-3xl border border-border shadow-sm">
              <div className="w-12 h-12 bg-destructive/10 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Business Challenge</h3>
              <p className="text-muted-foreground leading-relaxed">{challenge}</p>
            </motion.div>
          )}
          {solution && (
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-card p-8 rounded-3xl border border-primary/20 shadow-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 pointer-events-none" />
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 relative z-10">
                <Lightbulb className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4 relative z-10">Solution Architecture</h3>
              <p className="text-muted-foreground leading-relaxed relative z-10">{solution}</p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export const ProjectResults = ({ kpis }) => {
  if (!kpis || kpis.length === 0) return null;
  return (
    <section className="py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Measurable Impact</h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">Our engineering delivered quantifiable business outcomes.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {kpis.map((kpi, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-background/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center"
            >
              <TrendingUp className="w-8 h-8 mx-auto mb-4 text-secondary" />
              <div className="text-4xl font-black mb-2">{kpi.value}</div>
              <div className="text-sm font-semibold uppercase tracking-wider opacity-90">{kpi.metric}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const ProjectTechStack = ({ technologies }) => {
  if (!technologies || technologies.length === 0) return null;
  return (
    <section className="py-24 bg-muted/20 border-y border-border">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-foreground mb-16">Technology Stack</h2>
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {technologies.map((tech, i) => (
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

// 4. Main ProjectDetails Page
const pageCode = `import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import api from '../../config/axios';
import { ProjectDetailHero } from '../components/portfolio/details/ProjectDetailHero';
import { ProjectOverview, ProjectResults, ProjectTechStack } from '../components/portfolio/details/ProjectDetailsBlocks';
import { ImageGallery } from '../components/portfolio/details/ImageGallery';
import { FinalCTA } from '../components/home/FinalCTA';
import { Footer } from '../components/home/Footer';
import { Loader2, AlertCircle } from 'lucide-react';

export const ProjectDetails = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await api.get(\`/portfolio/\${slug}\`);
        setProject(res.data.data || res.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Project not found.');
      } finally {
        setLoading(false);
      }
    };
    
    window.scrollTo(0, 0);
    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6 text-center">
        <AlertCircle className="w-16 h-16 text-destructive mb-4" />
        <h1 className="text-3xl font-bold text-foreground mb-4">Case Study Offline</h1>
        <p className="text-muted-foreground max-w-md mb-8">{error}</p>
        <Link to="/portfolio" className="px-6 py-3 bg-primary text-primary-foreground font-bold rounded-full">
          Return to Portfolio
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col min-h-screen">
      <Helmet>
        <title>{project.name} | Techzon Case Study</title>
        <meta name="description" content={project.shortDescription || project.description} />
        <script type="application/ld+json">
          {\`
            {
              "@context": "https://schema.org",
              "@type": "CreativeWork",
              "name": "\${project.name}",
              "creator": {
                "@type": "Organization",
                "name": "Techzon IT Solutions"
              },
              "description": "\${project.shortDescription || project.description}"
            }
          \`}
        </script>
      </Helmet>
      
      <main className="flex-1">
        <ProjectDetailHero project={project} />
        <ProjectOverview challenge={project.businessChallenge} solution={project.solutionArchitecture} />
        <ProjectResults kpis={project.kpis} />
        <ImageGallery images={project.gallery} />
        <ProjectTechStack technologies={project.technologies} />
        <FinalCTA />
      </main>
      
      <Footer />
    </div>
  );
};
`;

fs.writeFileSync(path.join(detailsDir, 'ProjectDetailHero.jsx'), heroCode);
fs.writeFileSync(path.join(detailsDir, 'ImageGallery.jsx'), galleryCode);
fs.writeFileSync(path.join(detailsDir, 'ProjectDetailsBlocks.jsx'), blocksCode);

const pagesDir = path.join(baseDir, 'pages');
fs.writeFileSync(path.join(pagesDir, 'ProjectDetails.jsx'), pageCode);

// Update routes
const routesCode = `import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { PublicLayout, AdminLayout, AuthLayout } from '../layouts';
import { Home } from '../pages/Home';
import { About } from '../pages/About';
import { Services } from '../pages/Services';
import { ServiceDetails } from '../pages/ServiceDetails';
import { Portfolio } from '../pages/Portfolio';
import { ProjectDetails } from '../pages/ProjectDetails';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'services', element: <Services /> },
      { path: 'services/category/:category', element: <Services /> },
      { path: 'services/:slug', element: <ServiceDetails /> },
      { path: 'portfolio', element: <Portfolio /> },
      { path: 'portfolio/category/:category', element: <Portfolio /> },
      { path: 'portfolio/industry/:industry', element: <Portfolio /> },
      { path: 'portfolio/:slug', element: <ProjectDetails /> },
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

console.log('Portfolio Details components generated and routes updated successfully.');
