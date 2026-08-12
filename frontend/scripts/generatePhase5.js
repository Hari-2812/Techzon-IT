import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = path.resolve('d:/project/Techzon IT Solutions/frontend/src');

// 1. Client Testimonials
const testimonialsCode = `import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../config/axios';
import { Button } from '../ui/Button';
import { Loader2, AlertCircle, MessageSquareQuote, Star } from 'lucide-react';

const TestimonialCard = ({ testimonial }) => (
  <div className="flex-shrink-0 w-[350px] p-[1px] rounded-2xl bg-gradient-to-b from-border/50 to-transparent overflow-hidden">
    <div className="w-full h-full bg-card/60 backdrop-blur-md p-8 rounded-2xl flex flex-col border border-transparent shadow-sm relative">
      <MessageSquareQuote className="absolute top-6 right-6 w-12 h-12 text-primary/10" />
      
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={\`w-4 h-4 \${i < (testimonial.rating || 5) ? 'text-secondary fill-secondary' : 'text-muted-foreground'}\`} />
        ))}
      </div>
      
      <p className="text-muted-foreground leading-relaxed flex-1 mb-8 italic">
        "{testimonial.review || testimonial.content}"
      </p>
      
      <div className="flex items-center gap-4 mt-auto">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-muted flex items-center justify-center">
          {testimonial.photo ? (
            <img src={testimonial.photo} alt={testimonial.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-xl font-bold text-muted-foreground">{testimonial.name?.charAt(0)}</span>
          )}
        </div>
        <div>
          <h4 className="text-sm font-bold text-foreground">{testimonial.name}</h4>
          <p className="text-xs text-muted-foreground">{testimonial.designation}{testimonial.company ? \`, \${testimonial.company}\` : ''}</p>
        </div>
      </div>
    </div>
  </div>
);

const SkeletonTestimonial = () => (
  <div className="flex-shrink-0 w-[350px] p-[1px] rounded-2xl bg-border/20 overflow-hidden">
    <div className="w-full h-full bg-card/40 p-8 rounded-2xl flex flex-col animate-pulse">
      <div className="w-24 h-4 bg-muted rounded mb-6" />
      <div className="w-full h-4 bg-muted rounded mb-2" />
      <div className="w-5/6 h-4 bg-muted rounded mb-2" />
      <div className="w-4/5 h-4 bg-muted rounded mb-8" />
      
      <div className="flex items-center gap-4 mt-auto">
        <div className="w-12 h-12 rounded-full bg-muted" />
        <div className="flex-1">
          <div className="w-24 h-4 bg-muted rounded mb-2" />
          <div className="w-32 h-3 bg-muted rounded" />
        </div>
      </div>
    </div>
  </div>
);

export const ClientTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/testimonials');
      setTestimonials(response.data || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load client testimonials.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return (
    <section className="py-24 bg-muted/20 border-t border-border overflow-hidden" id="testimonials">
      <div className="container mx-auto px-6 mb-16">
        <div className="text-center max-w-2xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold text-primary uppercase tracking-widest mb-3"
          >
            Client Endorsements
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4"
          >
            Trusted by Leaders
          </motion.h2>
        </div>
      </div>

      <div className="relative w-full">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
        
        <div className="flex overflow-hidden group">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex gap-6 px-6"
              >
                {[...Array(5)].map((_, i) => <SkeletonTestimonial key={i} />)}
              </motion.div>
            ) : error ? (
              <motion.div 
                key="error"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="w-full flex justify-center py-12"
              >
                <div className="flex flex-col items-center p-8 bg-destructive/5 rounded-2xl border border-destructive/20 text-center max-w-md">
                  <AlertCircle className="w-10 h-10 text-destructive mb-4" />
                  <p className="text-muted-foreground mb-4">{error}</p>
                  <Button onClick={fetchTestimonials} variant="outline" size="sm" className="gap-2">
                    <Loader2 className="w-4 h-4" /> Retry
                  </Button>
                </div>
              </motion.div>
            ) : testimonials.length === 0 ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="w-full flex justify-center py-12"
              >
                <div className="flex flex-col items-center p-8 bg-card rounded-2xl border border-border text-center max-w-md">
                  <MessageSquareQuote className="w-10 h-10 text-muted-foreground mb-4 opacity-50" />
                  <p className="text-muted-foreground">Testimonial registry is currently empty.</p>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="content"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex gap-6 animate-marquee group-hover:[animation-play-state:paused] w-max"
              >
                {/* Duplicate the array for infinite loop effect */}
                {[...testimonials, ...testimonials, ...testimonials].map((test, i) => (
                  <TestimonialCard key={i} testimonial={test} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Add custom CSS for marquee animation in the global file later if needed, or inline here */}
      <style dangerouslySetInnerHTML={{__html: \`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 12px)); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      \`}} />
    </section>
  );
};
`;

// 2. Latest Blogs
const blogsCode = `import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../config/axios';
import { Button } from '../ui/Button';
import { Loader2, AlertCircle, ArrowRight, Clock, Calendar, FileText } from 'lucide-react';

const BlogCard = ({ blog, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
    whileHover={{ y: -8 }}
    className="group relative rounded-2xl bg-card border border-border overflow-hidden flex flex-col h-full shadow-sm hover:shadow-xl transition-shadow"
  >
    <div className="relative aspect-[16/10] overflow-hidden bg-muted">
      {blog.image ? (
        <img 
          src={blog.image} 
          alt={blog.title} 
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <FileText className="w-12 h-12 text-muted-foreground opacity-30" />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60" />
      
      <div className="absolute top-4 left-4 flex gap-2">
        <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold shadow-sm">
          {blog.category?.name || blog.category || 'Tech'}
        </span>
      </div>
    </div>

    <div className="p-6 flex flex-col flex-1">
      <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground mb-4">
        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(blog.createdAt).toLocaleDateString()}</span>
        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {blog.readTime || '5'} min read</span>
      </div>
      
      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
        {blog.title}
      </h3>
      
      <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-3 flex-1">
        {blog.excerpt || blog.description}
      </p>
      
      <div className="mt-auto pt-4 border-t border-border/50">
        <button className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors">
          Read Full Article
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  </motion.div>
);

const SkeletonBlog = () => (
  <div className="rounded-2xl bg-card border border-border overflow-hidden flex flex-col h-full animate-pulse">
    <div className="w-full aspect-[16/10] bg-muted" />
    <div className="p-6 flex flex-col flex-1">
      <div className="flex gap-4 mb-4">
        <div className="w-20 h-3 bg-muted rounded" />
        <div className="w-20 h-3 bg-muted rounded" />
      </div>
      <div className="w-full h-6 bg-muted rounded mb-2" />
      <div className="w-4/5 h-6 bg-muted rounded mb-4" />
      <div className="w-full h-4 bg-muted rounded mb-2" />
      <div className="w-full h-4 bg-muted rounded mb-6" />
      <div className="mt-auto pt-4 border-t border-border/50">
        <div className="w-32 h-4 bg-muted rounded" />
      </div>
    </div>
  </div>
);

export const LatestBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/blogs?limit=3');
      setBlogs(response.data || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load engineering insights.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <section className="py-24 bg-background border-t border-border" id="blogs">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-semibold text-primary uppercase tracking-widest mb-3"
            >
              Engineering Insights
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold tracking-tight text-foreground"
            >
              The Techzon Journal
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Button variant="outline" className="rounded-full gap-2 hidden md:flex">
              View All Insights <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>

        <div className="min-h-[400px] relative">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {[...Array(3)].map((_, i) => <SkeletonBlog key={i} />)}
              </motion.div>
            ) : error ? (
              <motion.div 
                key="error"
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center p-12 text-center bg-destructive/5 rounded-2xl border border-destructive/20"
              >
                <AlertCircle className="w-12 h-12 text-destructive mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">Blog Registry Unavailable</h3>
                <p className="text-muted-foreground mb-6 max-w-md">{error}</p>
                <Button onClick={fetchBlogs} variant="outline" className="gap-2">
                  <Loader2 className="w-4 h-4" /> Retry
                </Button>
              </motion.div>
            ) : blogs.length === 0 ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center p-12 text-center bg-muted/20 rounded-2xl border border-border"
              >
                <FileText className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
                <h3 className="text-xl font-bold text-foreground mb-2">No Articles Found</h3>
                <p className="text-muted-foreground max-w-md">Our journal is currently empty.</p>
              </motion.div>
            ) : (
              <motion.div 
                key="content"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {blogs.map((blog, i) => (
                  <BlogCard key={blog._id || i} blog={blog} index={i} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <Button variant="outline" className="rounded-full w-full gap-2">
            View All Insights <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};
`;

// 3. FAQ Section
const faqCode = `import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../config/axios';
import { Button } from '../ui/Button';
import { Loader2, AlertCircle, ChevronDown, HelpCircle } from 'lucide-react';

const AccordionItem = ({ faq, isOpen, onClick }) => (
  <div className="border border-border/50 bg-card rounded-2xl overflow-hidden mb-4 shadow-sm hover:border-primary/30 transition-colors">
    <button 
      onClick={onClick}
      className="w-full p-6 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
      aria-expanded={isOpen}
    >
      <h3 className={\`text-lg font-bold transition-colors \${isOpen ? 'text-primary' : 'text-foreground'}\`}>
        {faq.question}
      </h3>
      <ChevronDown className={\`w-5 h-5 text-muted-foreground transition-transform duration-300 \${isOpen ? 'rotate-180 text-primary' : ''}\`} />
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="px-6 pb-6 pt-2 text-muted-foreground leading-relaxed border-t border-border/20">
            {faq.answer}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const SkeletonFaq = () => (
  <div className="border border-border/50 bg-card/40 rounded-2xl p-6 mb-4 animate-pulse">
    <div className="flex justify-between items-center">
      <div className="w-3/4 h-6 bg-muted rounded" />
      <div className="w-5 h-5 bg-muted rounded-full" />
    </div>
  </div>
);

export const FaqSection = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openIndex, setOpenIndex] = useState(0);

  const fetchFaqs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/faqs');
      setFaqs(response.data || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load FAQ registry.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  return (
    <section className="py-24 bg-muted/20 border-t border-border" id="faq">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="w-full lg:w-1/3">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-semibold text-primary uppercase tracking-widest mb-3"
            >
              Support Center
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6"
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-lg mb-8"
            >
              Can't find the answer you're looking for? Reach out to our enterprise support team.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Button size="lg" className="rounded-full">Contact Support</Button>
            </motion.div>
          </div>

          <div className="w-full lg:w-2/3 relative min-h-[400px]">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {[...Array(5)].map((_, i) => <SkeletonFaq key={i} />)}
                </motion.div>
              ) : error ? (
                <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center p-12 bg-destructive/5 rounded-2xl border border-destructive/20 text-center">
                  <AlertCircle className="w-12 h-12 text-destructive mb-4" />
                  <p className="text-muted-foreground mb-4">{error}</p>
                  <Button onClick={fetchFaqs} variant="outline" size="sm" className="gap-2"><Loader2 className="w-4 h-4" /> Retry</Button>
                </motion.div>
              ) : faqs.length === 0 ? (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center p-12 bg-card rounded-2xl border border-border text-center">
                  <HelpCircle className="w-12 h-12 text-muted-foreground opacity-50 mb-4" />
                  <p className="text-muted-foreground">FAQ registry is currently empty.</p>
                </motion.div>
              ) : (
                <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {faqs.map((faq, i) => (
                    <AccordionItem 
                      key={faq._id || i} 
                      faq={faq} 
                      isOpen={openIndex === i} 
                      onClick={() => setOpenIndex(openIndex === i ? -1 : i)} 
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
`;

// 4. Final CTA
const ctaCode = `import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

export const FinalCTA = () => {
  return (
    <section className="py-24 relative overflow-hidden" id="cta">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-indigo-900 to-secondary opacity-95" />
      
      {/* Animated Background Shapes */}
      <motion.div 
        animate={{ rotate: 360 }} 
        transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
        className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-secondary/30 rounded-full blur-[100px]" 
      />
      <motion.div 
        animate={{ rotate: -360 }} 
        transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] bg-primary/40 rounded-full blur-[100px]" 
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center p-12 md:p-16 rounded-[2.5rem] bg-background/5 backdrop-blur-xl border border-white/10 shadow-2xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6"
          >
            Transform Your Business with Techzon
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-white/80 leading-relaxed mb-10 max-w-2xl mx-auto"
          >
            Build secure, scalable, and future-ready digital solutions with our elite enterprise engineering team.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" className="w-full sm:w-auto rounded-full bg-white text-primary hover:bg-white/90 text-base font-bold shadow-xl">
              Schedule Consultation
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full text-white border-white/30 hover:bg-white/10 text-base font-bold">
              Get Free Quote
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
`;

// 5. Footer
const footerCode = `import React from 'react';
import { Button } from '../ui/Button';
import { Facebook, Twitter, Linkedin, Instagram, ArrowUp, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-background border-t border-border pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand & Newsletter */}
          <div className="lg:col-span-4">
            <div className="text-2xl font-black text-foreground mb-6 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary" />
              TECHZON
            </div>
            <p className="text-muted-foreground mb-8 text-sm leading-relaxed max-w-xs">
              Architecting enterprise-grade digital ecosystems. Secure, scalable, and future-ready engineering.
            </p>
            <h4 className="text-foreground font-bold mb-4">Subscribe to our newsletter</h4>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enterprise email address" 
                className="flex-1 bg-muted/50 border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button>Subscribe</Button>
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-2">
            <h4 className="text-foreground font-bold mb-6 tracking-wide text-sm uppercase">Company</h4>
            <ul className="space-y-4">
              {['About', 'Careers', 'Portfolio', 'Blogs'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-foreground font-bold mb-6 tracking-wide text-sm uppercase">Services</h4>
            <ul className="space-y-4">
              {['Web Development', 'Mobile Apps', 'Cloud Solutions', 'AI & Data'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h4 className="text-foreground font-bold mb-6 tracking-wide text-sm uppercase">Global HQ</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm leading-relaxed">
                  100 Enterprise Way, Suite 500<br/>San Francisco, CA 94105
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href="tel:+91 6374191654" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  +91 6374191654
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:support@techzonwide.com" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  support@techzonwide.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Techzon IT Solutions. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><Linkedin className="w-5 h-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><Instagram className="w-5 h-5" /></a>
            </div>
            
            <button 
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-border transition-colors"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
`;

fs.writeFileSync(path.join(baseDir, 'components/home', 'ClientTestimonials.jsx'), testimonialsCode);
fs.writeFileSync(path.join(baseDir, 'components/home', 'LatestBlogs.jsx'), blogsCode);
fs.writeFileSync(path.join(baseDir, 'components/home', 'FaqSection.jsx'), faqCode);
fs.writeFileSync(path.join(baseDir, 'components/home', 'FinalCTA.jsx'), ctaCode);
fs.writeFileSync(path.join(baseDir, 'components/home', 'Footer.jsx'), footerCode);

// Update pages/Home.jsx
const homeCode = `import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Hero } from '../components/home/Hero';
import { TrustedCompanies } from '../components/home/TrustedCompanies';
import { CompanyStatistics } from '../components/home/CompanyStatistics';
import { WhyChooseTechzon } from '../components/home/WhyChooseTechzon';
import { TechnologyPartners } from '../components/home/TechnologyPartners';
import { ServicesPreview } from '../components/home/ServicesPreview';
import { DevelopmentProcess } from '../components/home/DevelopmentProcess';
import { TechnologyStack } from '../components/home/TechnologyStack';
import { FeaturedPortfolio } from '../components/home/FeaturedPortfolio';
import { FeaturedCaseStudies } from '../components/home/FeaturedCaseStudies';
import { SuccessMetrics } from '../components/home/SuccessMetrics';
import { ClientTestimonials } from '../components/home/ClientTestimonials';
import { LatestBlogs } from '../components/home/LatestBlogs';
import { FaqSection } from '../components/home/FaqSection';
import { FinalCTA } from '../components/home/FinalCTA';
import { Footer } from '../components/home/Footer';

export const Home = () => {
  return (
    <div className="w-full flex flex-col min-h-screen">
      <Helmet>
        <title>Techzon IT Solutions | Enterprise Software Engineering</title>
        <meta name="description" content="We architect, secure, and scale digital ecosystems for global industry leaders. Expert in Web, Mobile, Cloud, and AI." />
      </Helmet>
      
      <main className="flex-1">
        <Hero />
        <TrustedCompanies />
        <CompanyStatistics />
        <WhyChooseTechzon />
        <TechnologyPartners />
        <ServicesPreview />
        <DevelopmentProcess />
        <TechnologyStack />
        <FeaturedPortfolio />
        <FeaturedCaseStudies />
        <SuccessMetrics />
        <ClientTestimonials />
        <LatestBlogs />
        <FaqSection />
        <FinalCTA />
      </main>
      
      <Footer />
    </div>
  );
};
`;

fs.writeFileSync(path.join(baseDir, 'pages', 'Home.jsx'), homeCode);
console.log('Phase 5 components generated and integrated.');
