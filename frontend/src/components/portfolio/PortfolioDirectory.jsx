import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CASE_STUDIES } from '../../data/projects';
import { PortfolioCard } from './PortfolioCard';
import { Button } from '../ui/Button';
import { Loader2, AlertCircle, LayoutGrid, List, Filter, ChevronLeft, ChevronRight, SearchX } from 'lucide-react';

const SkeletonCard = () => (
  <div className="w-full mb-32 last:mb-0">
    <div className="relative w-full rounded-2xl bg-white border border-slate-200 p-8 md:p-12 shadow-sm min-h-[600px] flex flex-col md:flex-row items-center gap-12">
      <div className="w-full md:w-5/12 flex flex-col items-start gap-4 animate-pulse">
        <div className="w-32 h-6 bg-muted rounded-full mb-4" />
        <div className="w-3/4 h-12 bg-muted rounded mb-4" />
        <div className="w-full h-4 bg-muted rounded" />
        <div className="w-5/6 h-4 bg-muted rounded mb-8" />
        <div className="w-full max-w-sm h-16 bg-muted rounded-xl mb-8" />
        <div className="w-48 h-12 bg-muted rounded-lg" />
      </div>
      <div className="relative w-full md:w-7/12 h-[400px] md:h-[500px] flex items-center justify-center animate-pulse">
        <div className="absolute w-[90%] md:w-[85%] right-0 md:-right-10 top-1/2 -translate-y-1/2 rounded-xl bg-muted aspect-video shadow-sm" />
        <div className="absolute w-[30%] md:w-[25%] left-0 md:left-10 bottom-0 md:-bottom-10 rounded-[2rem] bg-muted aspect-[9/19] shadow-sm border-[6px] border-white" />
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
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchFilters = () => {
    setCategories([
      { _id: 'web', name: 'WEB' },
      { _id: 'software', name: 'SOFTWARE' },
      { _id: 'ai-data', name: 'AI & DATA' },
      { _id: 'cloud', name: 'CLOUD' },
      { _id: 'automation', name: 'AUTOMATION' }
    ]);
  };

  const fetchProjects = useCallback(() => {
    setLoading(true);
    setError(null);
    
    // Simulate loading
    setTimeout(() => {
      setProjects(Object.values(CASE_STUDIES));
      setTotalPages(1);
      setLoading(false);
    }, 400);
  }, [searchTerm, activeCategory, sortBy, page]);

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
    <section className="py-16 bg-[#F8FAFC] min-h-screen">
      <div className="container-global mx-auto">
        
        {/* Controls Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-12 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          
          <div className="flex items-center gap-4 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
            <button 
              onClick={() => setActiveCategory('all')}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-all ${activeCategory === 'all' ? 'bg-primary text-white shadow-md' : 'text-muted-foreground hover:bg-muted hover:text-primary'}`}
            >
              ALL
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
                <option value="featured">Top Tier Impact</option>
                <option value="newest">Most Recent</option>
                <option value="name">Alphabetical (A-Z)</option>
              </select>
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
                className="flex flex-col w-full"
              >
                {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
              </motion.div>
            ) : error ? (
              <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <AlertCircle className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">Portfolio Registry Offline</h3>
                <p className="text-muted-foreground mb-6 max-w-md">{error}</p>
                <Button onClick={fetchProjects} variant="outline" className="gap-2"><Loader2 className="w-4 h-4" /> Retry</Button>
              </motion.div>
            ) : projects.length === 0 ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-20 text-center bg-white border border-slate-200 rounded-xl shadow-sm">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                  <SearchX className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">No Projects Found</h3>
                <p className="text-muted-foreground max-w-md">Try adjusting your filters or search terms.</p>
                {(searchTerm || activeCategory !== 'all') && (
                  <Button 
                    onClick={() => { setActiveCategory('all'); }} 
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
                className="flex flex-col w-full"
              >
                {projects.map((project, i) => (
                  <PortfolioCard key={project._id || i} project={project} index={i} />
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
