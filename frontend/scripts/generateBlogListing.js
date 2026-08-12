import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = path.resolve('d:/project/Techzon IT Solutions/frontend/src');

const blogDir = path.join(baseDir, 'components', 'blog');
if (!fs.existsSync(blogDir)) {
  fs.mkdirSync(blogDir, { recursive: true });
}

// 1. BlogHero
const heroCode = `import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BlogHero = ({ searchTerm, setSearchTerm }) => {
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
          <span className="text-foreground font-semibold">Insights & Insights</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-foreground via-foreground/90 to-primary mb-6"
        >
          Enterprise Insights
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Explore thought leadership, engineering deep dives, and industry trends from the leading minds at Techzon.
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
              placeholder="Search articles, topics, or authors..." 
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

// 2. BlogCard
const cardCode = `import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BlogCard = ({ blog, index, layout = 'grid' }) => {
  const isList = layout === 'list';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      className={\`group relative rounded-2xl bg-card border border-border overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/50 transition-all flex \${isList ? 'flex-col md:flex-row' : 'flex-col h-full'}\`}
    >
      <div className={\`relative overflow-hidden bg-muted \${isList ? 'w-full md:w-2/5 aspect-[4/3] md:aspect-auto' : 'w-full aspect-[16/10]'}\`}>
        {blog.image || blog.thumbnail ? (
          <img 
            src={blog.image || blog.thumbnail} 
            alt={blog.title} 
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
            <div className="w-16 h-16 rounded-2xl bg-card flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500">
              <div className="text-primary font-black text-2xl">{blog.title.charAt(0)}</div>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80" />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="px-3 py-1 bg-primary/90 backdrop-blur-md text-primary-foreground text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
            {blog.category?.name || blog.category || 'Engineering'}
          </span>
        </div>
      </div>

      <div className={\`flex flex-col flex-1 p-6 \${isList ? 'justify-center' : ''}\`}>
        <div className="flex flex-wrap items-center gap-4 mb-4 text-xs font-semibold text-muted-foreground">
          <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {blog.author?.name || blog.author || 'Techzon Team'}</span>
          <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {new Date(blog.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {blog.readingTime || '5'} min read</span>
        </div>
        
        <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
          {blog.title}
        </h3>
        
        <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-3 flex-1">
          {blog.excerpt || blog.summary || 'Click to read this comprehensive guide and deep dive into our engineering best practices.'}
        </p>

        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {blog.tags.slice(0, 3).map((tag, i) => (
              <span key={i} className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                #{tag}
              </span>
            ))}
          </div>
        )}
        
        <div className="mt-auto pt-4 border-t border-border/50">
          <Link to={\`/blog/\${blog.slug}\`} className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors">
            Read Article
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
`;

// 3. BlogDirectory
const directoryCode = `import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../config/axios';
import { BlogCard } from './BlogCard';
import { Button } from '../ui/Button';
import { Loader2, AlertCircle, LayoutGrid, List, Filter, ChevronLeft, ChevronRight, SearchX } from 'lucide-react';

const SkeletonCard = ({ layout }) => (
  <div className={\`bg-card rounded-2xl border border-border overflow-hidden flex \${layout === 'list' ? 'flex-col md:flex-row' : 'flex-col h-full'} animate-pulse\`}>
    <div className={\`bg-muted \${layout === 'list' ? 'w-full md:w-2/5 aspect-[4/3] md:aspect-auto' : 'w-full aspect-[16/10]'}\`} />
    <div className="p-6 flex flex-col flex-1">
      <div className="w-32 h-4 bg-muted rounded mb-4" />
      <div className="w-full h-6 bg-muted rounded mb-4" />
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

export const BlogDirectory = ({ searchTerm }) => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filters & State
  const [layout, setLayout] = useState('grid');
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchFilters = async () => {
    try {
      const res = await api.get('/categories?type=blog');
      setCategories(res.data || []);
    } catch (e) {
      console.warn("Categories API offline, using fallback");
      setCategories([
        { _id: 'engineering', name: 'Engineering' },
        { _id: 'cloud', name: 'Cloud Native' },
        { _id: 'ai', name: 'AI & Data' },
        { _id: 'company', name: 'Company News' }
      ]);
    }
  };

  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (activeCategory !== 'all') params.append('category', activeCategory);
      if (sortBy === 'popular') params.append('sort', '-views');
      if (sortBy === 'latest') params.append('sort', '-createdAt');
      if (sortBy === 'name') params.append('sort', 'title');
      params.append('page', page);
      params.append('limit', layout === 'list' ? 6 : 9);

      const response = await api.get(\`/blogs?\${params.toString()}\`);
      
      if (response.data.docs || response.data.data) {
        const payload = response.data.data || response.data;
        setBlogs(payload.docs || payload);
        setTotalPages(payload.totalPages || 1);
      } else {
        setBlogs(response.data);
        setTotalPages(1);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch articles.');
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
    fetchBlogs();
  }, [fetchBlogs]);

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
              All Articles
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
                <option value="latest">Latest Updates</option>
                <option value="popular">Most Popular</option>
                <option value="name">Alphabetical</option>
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
                <h3 className="text-xl font-bold text-foreground mb-2">Blog Registry Offline</h3>
                <p className="text-muted-foreground mb-6 max-w-md">{error}</p>
                <Button onClick={fetchBlogs} variant="outline" className="gap-2"><Loader2 className="w-4 h-4" /> Retry</Button>
              </motion.div>
            ) : blogs.length === 0 ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-20 text-center bg-card border border-border rounded-2xl">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                  <SearchX className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">No Articles Found</h3>
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
                {blogs.map((blog, i) => (
                  <BlogCard key={blog._id || i} blog={blog} index={i} layout={layout} />
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

// Main Blog Page
const pageCode = `import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { BlogHero } from '../components/blog/BlogHero';
import { BlogDirectory } from '../components/blog/BlogDirectory';
import { Footer } from '../components/home/Footer';

export const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="w-full flex flex-col min-h-screen">
      <Helmet>
        <title>Engineering Blog | Techzon IT Solutions</title>
        <meta name="description" content="Explore thought leadership, engineering deep dives, and enterprise IT trends from the experts at Techzon." />
        <script type="application/ld+json">
          {\`
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
          \`}
        </script>
      </Helmet>
      
      <main className="flex-1">
        <BlogHero searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <BlogDirectory searchTerm={searchTerm} />
      </main>
      
      <Footer />
    </div>
  );
};
`;

fs.writeFileSync(path.join(blogDir, 'BlogHero.jsx'), heroCode);
fs.writeFileSync(path.join(blogDir, 'BlogCard.jsx'), cardCode);
fs.writeFileSync(path.join(blogDir, 'BlogDirectory.jsx'), directoryCode);

const pagesDir = path.join(baseDir, 'pages');
fs.writeFileSync(path.join(pagesDir, 'Blog.jsx'), pageCode);

console.log('Blog Listing components generated successfully.');
