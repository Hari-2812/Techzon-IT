import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { INSIGHTS } from '../../data/dummyData';
import { Button } from '../ui/Button';
import { Loader2, AlertCircle, ArrowRight, Clock, Calendar, FileText } from 'lucide-react';

const FeaturedBlogCard = ({ blog, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6 }}
    whileHover={{ y: -4 }}
    className="group relative bg-white/40 backdrop-blur-xl border border-white/50 shadow-lg rounded-3xl overflow-hidden flex flex-col md:flex-row h-full col-span-1 lg:col-span-2"
  >
    <div className="relative w-full md:w-1/2 aspect-video md:aspect-auto overflow-hidden bg-muted">
      {blog.image ? (
        <img 
          src={blog.image} 
          alt={blog.title} 
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-muted">
          <FileText className="w-16 h-16 text-muted-foreground opacity-30" />
        </div>
      )}
      <div className="absolute top-4 left-4 flex gap-2 z-10">
        <span className="px-4 py-1.5 rounded-full bg-primary/90 backdrop-blur-md text-primary-foreground text-xs font-bold tracking-wide shadow-lg">
          {blog.category?.name || blog.category || 'Featured'}
        </span>
      </div>
    </div>

    <div className="p-8 md:p-12 flex flex-col justify-center w-full md:w-1/2">
      <div className="flex items-center gap-4 text-xs font-semibold text-muted-foreground mb-6 uppercase tracking-wider">
        <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {new Date(blog.createdAt).toLocaleDateString()}</span>
        <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {blog.readTime || '5'} min read</span>
      </div>
      
      <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors leading-tight">
        {blog.title}
      </h3>
      
      <p className="text-base text-muted-foreground leading-relaxed mb-8 line-clamp-3">
        {blog.excerpt || blog.description}
      </p>
      
      <div className="mt-auto">
        <Button variant="outline" className="gap-2 rounded-full px-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
          Read Article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  </motion.div>
);

const StandardBlogCard = ({ blog, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: 0.2 }}
    whileHover={{ y: -4 }}
    className="group relative bg-white/40 backdrop-blur-xl border border-white/50 shadow-lg rounded-3xl overflow-hidden flex flex-col h-full"
  >
    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
      {blog.image ? (
        <img 
          src={blog.image} 
          alt={blog.title} 
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-muted">
          <FileText className="w-12 h-12 text-muted-foreground opacity-30" />
        </div>
      )}
      <div className="absolute top-4 left-4 flex gap-2">
        <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-foreground text-xs font-semibold shadow-sm">
          {blog.category?.name || blog.category || 'Tech'}
        </span>
      </div>
    </div>

    <div className="p-6 md:p-8 flex flex-col flex-1">
      <div className="flex items-center gap-3 text-xs font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {new Date(blog.createdAt).toLocaleDateString()}</span>
      </div>
      
      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
        {blog.title}
      </h3>
      
      <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-2 flex-1">
        {blog.excerpt || blog.description}
      </p>
      
      <div className="mt-auto pt-6 border-t border-border/30">
        <span className="inline-flex items-center text-sm font-semibold text-primary group-hover:text-primary/80 transition-colors cursor-pointer">
          Read Article
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </div>
  </motion.div>
);

const SkeletonBlog = ({ featured = false }) => (
  <div className={`bg-white/40 backdrop-blur-xl border border-white/50 rounded-3xl overflow-hidden flex ${featured ? 'flex-col md:flex-row col-span-1 lg:col-span-2' : 'flex-col'} animate-pulse`}>
    <div className={`${featured ? 'w-full md:w-1/2 aspect-video md:aspect-auto' : 'w-full aspect-[4/3]'} bg-muted/50`} />
    <div className={`flex flex-col flex-1 ${featured ? 'p-8 md:p-12 w-full md:w-1/2 justify-center' : 'p-6 md:p-8'}`}>
      <div className="flex gap-4 mb-4">
        <div className="w-24 h-4 bg-muted/50 rounded" />
      </div>
      <div className="w-full h-8 bg-muted/50 rounded mb-4" />
      <div className="w-4/5 h-8 bg-muted/50 rounded mb-6" />
      <div className="w-full h-4 bg-muted/50 rounded mb-2" />
      <div className="w-full h-4 bg-muted/50 rounded mb-2" />
      <div className="w-2/3 h-4 bg-muted/50 rounded mb-8" />
      <div className={`mt-auto ${!featured && 'pt-6 border-t border-border/30'}`}>
        <div className="w-32 h-10 bg-muted/50 rounded-full" />
      </div>
    </div>
  </div>
);

export const LatestBlogs = () => {

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden" id="blogs">
      {/* Premium background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 -left-40 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[80px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-4 flex items-center gap-3"
            >
              <span className="w-8 h-px bg-primary"></span>
              Techzon Insights
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground leading-tight"
            >
              The Editorial <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Magazine</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Button variant="outline" className="rounded-full px-8 py-6 font-semibold shadow-sm hover:shadow-md transition-all hidden md:flex">
              Explore All Articles <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>

        <div className="min-h-[500px] relative">
          <AnimatePresence mode="wait">
              <motion.div 
                key="content"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                {INSIGHTS.slice(0, 3).map((blog, i) => {
                  if (i === 0) {
                    return <FeaturedBlogCard key={blog._id || i} blog={blog} index={i} />;
                  }
                  return <StandardBlogCard key={blog._id || i} blog={blog} index={i} />;
                })}
              </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="mt-12 text-center md:hidden">
          <Button variant="outline" className="rounded-full w-full py-6 font-semibold shadow-sm">
            Explore All Articles <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};
