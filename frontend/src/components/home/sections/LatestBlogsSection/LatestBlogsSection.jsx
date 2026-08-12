import React, { useState, useEffect } from 'react';
import { INSIGHTS } from '../../../../data/dummyData';
import { Button } from '../../../ui/Button';
import { Loader2, AlertCircle, ArrowRight, Clock, Calendar, FileText } from 'lucide-react';

const BlogCard = ({ blog }) => (
  <div className="bg-muted border border-slate-200 rounded-2xl overflow-hidden flex flex-col h-full">
    <div className="aspect-[16/9] w-full bg-muted relative">
      {blog.image ? (
        <img 
          src={blog.image} 
          alt={blog.title} 
          loading="lazy"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-muted">
          <FileText className="w-12 h-12 text-muted-foreground" />
        </div>
      )}
      <div className="absolute top-4 left-4">
        <span className="px-3 py-1 rounded-full bg-white text-primary text-xs font-bold shadow-sm">
          {blog.category?.name || blog.category || 'Featured'}
        </span>
      </div>
    </div>
    <div className="p-6 md:p-8 flex flex-col flex-1">
      <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground mb-4 uppercase tracking-wider">
        <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {new Date(blog.createdAt).toLocaleDateString()}</span>
        <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {blog.readTime || '5'} min read</span>
      </div>
      <h3 className="text-xl font-bold text-primary mb-3 line-clamp-2">
        {blog.title}
      </h3>
      <p className="text-sm text-foreground leading-relaxed mb-6 line-clamp-3 flex-1">
        {blog.excerpt || blog.description}
      </p>
      <div className="mt-auto pt-6 border-t border-slate-200">
        <Button variant="outline" className="gap-2 w-full">
          Read Article <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  </div>
);

export const LatestBlogsSection = () => {

  return (
    <section className="py-24 bg-white border-t border-slate-100" id="blogs">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-3xl">
            <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">
              Techzon Insights
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-primary">
              The Editorial Magazine
            </h2>
          </div>
          <Button className="hidden md:flex gap-2">
            Explore All Articles <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="min-h-[400px]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {INSIGHTS.slice(0, 3).map((blog, i) => (
                <BlogCard key={blog._id || i} blog={blog} />
              ))}
            </div>
        </div>
        
        <div className="mt-12 md:hidden">
          <Button className="w-full gap-2">
            Explore All Articles <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};
