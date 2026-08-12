import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { INSIGHTS } from '../../data/dummyData';
import { BlogCard } from './BlogCard';
import { Button } from '../ui/Button';
import { Loader2, AlertCircle, LayoutGrid, List, Filter, ChevronLeft, ChevronRight, SearchX } from 'lucide-react';

const SkeletonCard = ({ layout }) => (
  <div className={`overflow-hidden rounded-xl bg-white border border-slate-200 flex ${layout === 'list' ? 'flex-col md:flex-row' : 'flex-col h-full'} animate-pulse`}>
    <div className={`bg-muted ${layout === 'list' ? 'w-full md:w-2/5 aspect-[4/3] md:aspect-auto' : 'w-full aspect-[16/10]'}`} />
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
      <div className="mt-auto pt-4 border-t border-slate-100">
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

  const fetchFilters = () => {
    setCategories([
      { _id: 'engineering', name: 'Software Engineering' },
      { _id: 'ai', name: 'AI & Data' },
      { _id: 'cloud', name: 'Cloud & Infrastructure' },
      { _id: 'web', name: 'Web Development' },
      { _id: 'business', name: 'Business Technology' }
    ]);
  };

  const fetchBlogs = useCallback(() => {
    setLoading(true);
    setError(null);
    
    // Simulate slight delay for effect
    setTimeout(() => {
      setBlogs(INSIGHTS);
      setTotalPages(1);
      setLoading(false);
    }, 400);
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
    <section className="py-16 bg-[#F8FAFC] min-h-screen">
      <div className="container-global mx-auto">
        
        {/* Controls Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-12 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          
          <div className="flex items-center gap-4 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
            <button 
              onClick={() => setActiveCategory('all')}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-all ${activeCategory === 'all' ? 'bg-primary text-white shadow-md' : 'text-muted-foreground hover:bg-muted hover:text-primary'}`}
            >
              All Articles
            </button>
            {categories.map(c => (
              <button 
                key={c._id}
                onClick={() => setActiveCategory(c._id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-all ${activeCategory === c._id ? 'bg-primary text-white shadow-md' : 'text-muted-foreground hover:bg-muted hover:text-primary'}`}
              >
                {c.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 w-full lg:w-auto justify-between lg:justify-end border-t lg:border-t-0 border-slate-200 pt-4 lg:pt-0">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="w-4 h-4" />
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-none focus:outline-none font-semibold text-primary cursor-pointer"
              >
                <option value="latest">Latest Updates</option>
                <option value="popular">Most Popular</option>
                <option value="name">Alphabetical</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2 bg-muted border border-slate-200 rounded-lg p-1">
              <button 
                onClick={() => setLayout('grid')}
                className={`p-1.5 rounded-md transition-colors ${layout === 'grid' ? 'bg-white shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setLayout('list')}
                className={`p-1.5 rounded-md transition-colors ${layout === 'list' ? 'bg-white shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}
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
                className={`grid gap-6 ${layout === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}
              >
                {[...Array(layout === 'list' ? 4 : 6)].map((_, i) => <SkeletonCard key={i} layout={layout} />)}
              </motion.div>
            ) : error ? (
              <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <AlertCircle className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">Blog Registry Offline</h3>
                <p className="text-muted-foreground mb-6 max-w-md">{error}</p>
                <Button onClick={fetchBlogs} variant="outline" className="gap-2"><Loader2 className="w-4 h-4" /> Retry</Button>
              </motion.div>
            ) : blogs.length === 0 ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-20 text-center bg-white border border-slate-200 rounded-xl shadow-sm">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                  <SearchX className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">No Articles Found</h3>
                <p className="text-muted-foreground max-w-md">Try adjusting your filters or search terms.</p>
                {(searchTerm || activeCategory !== 'all') && (
                  <Button 
                    onClick={() => { setSearchTerm(''); setActiveCategory('all'); }} 
                    variant="outline" className="mt-6 border-slate-200 text-foreground hover:bg-muted"
                  >
                    Clear All Filters
                  </Button>
                )}
              </motion.div>
            ) : (
              <motion.div 
                key="content" 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
                className={`grid gap-6 ${layout === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}
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
            <span className="text-sm font-semibold text-primary">Page {page} of {totalPages}</span>
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
