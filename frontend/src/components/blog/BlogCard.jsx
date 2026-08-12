import React from 'react';
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
      className={`group relative bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-[#FF8A3D]/50 transition-all duration-300 flex ${isList ? 'flex-col md:flex-row' : 'flex-col h-full'}`}
    >
      <div className={`relative overflow-hidden bg-muted ${isList ? 'w-full md:w-2/5 aspect-[4/3] md:aspect-auto' : 'w-full aspect-[16/10]'}`}>
        {blog.image || blog.thumbnail ? (
          <img 
            src={blog.image || blog.thumbnail} 
            alt={blog.title} 
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-[#5BC0EB]/10">
            <div className="w-16 h-16 rounded-xl bg-white flex items-center justify-center shadow-md group-hover:rotate-12 transition-transform duration-500">
              <div className="text-primary font-black text-2xl">{blog.title.charAt(0)}</div>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="px-3 py-1 bg-[#FF8A3D]/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-sm group-hover:bg-[#FF8A3D] transition-colors">
            {blog.category?.name || blog.category || 'Engineering'}
          </span>
        </div>
      </div>

      <div className={`flex flex-col flex-1 p-6 ${isList ? 'justify-center' : ''}`}>
        <div className="flex flex-wrap items-center gap-4 mb-4 text-xs font-medium text-muted-foreground">
          <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {blog.author?.name || blog.author || 'Techzon Team'}</span>
          <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {new Date(blog.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {blog.readingTime || '5'} min read</span>
        </div>
        
        <h3 className="text-xl lg:text-2xl font-bold text-primary mb-3 group-hover:text-[#5BC0EB] transition-colors line-clamp-2 leading-tight">
          {blog.title}
        </h3>
        
        <p className="text-sm text-foreground leading-relaxed mb-6 line-clamp-3 flex-1">
          {blog.excerpt || blog.summary || blog.description || 'Click to read this comprehensive guide and deep dive into our engineering best practices.'}
        </p>

        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {blog.tags.slice(0, 3).map((tag, i) => (
              <span key={i} className="text-xs font-semibold text-[#5BC0EB] bg-[#5BC0EB]/10 px-2 py-1 rounded">
                #{tag}
              </span>
            ))}
          </div>
        )}
        
        <div className="mt-auto pt-4 border-t border-slate-100 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#FF8A3D]/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          <Link to={`/blog/${blog.slug || blog._id}`} className="inline-flex items-center gap-2 text-sm font-bold text-primary group-hover:text-[#FF8A3D] transition-colors">
            Read Article
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
