import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Calendar, Clock, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ArticleHero = ({ blog }) => {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden bg-background border-b border-border">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[600px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6 max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-muted-foreground mb-8 flex-wrap"
        >
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-semibold">{blog.category?.name || blog.category || 'Engineering'}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center gap-4 mb-6 text-sm font-semibold text-muted-foreground"
        >
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
            {blog.category?.name || blog.category || 'Engineering'}
          </span>
          <span className="flex items-center gap-1.5 border-l border-border pl-4"><User className="w-4 h-4" /> {blog.author?.name || blog.author || 'Techzon Team'}</span>
          <span className="flex items-center gap-1.5 border-l border-border pl-4"><Calendar className="w-4 h-4" /> {new Date(blog.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          <span className="flex items-center gap-1.5 border-l border-border pl-4"><Clock className="w-4 h-4" /> {blog.readingTime || '5'} min read</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-12 leading-tight"
        >
          {blog.title}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative w-full aspect-[21/9] rounded-lg overflow-hidden shadow-elevation-2 border border-border"
        >
          {blog.image ? (
            <img loading="lazy" decoding="async" fetchpriority="low" src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <div className="text-6xl font-black text-primary opacity-50">{blog.title.charAt(0)}</div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
