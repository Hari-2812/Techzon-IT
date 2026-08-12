import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = path.resolve('d:/project/Techzon IT Solutions/frontend/src');

const detailsDir = path.join(baseDir, 'components', 'blog', 'details');
if (!fs.existsSync(detailsDir)) {
  fs.mkdirSync(detailsDir, { recursive: true });
}

// 1. ArticleHero
const heroCode = `import React from 'react';
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
          className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl border border-border"
        >
          {blog.image ? (
            <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
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
`;

// 2. ArticleContent (Rich Text & TOC)
const contentCode = `import React, { useEffect, useState } from 'react';
import { Share2, Twitter, Linkedin, Link as LinkIcon, CheckCircle2 } from 'lucide-react';

export const ArticleContent = ({ content, author, tags }) => {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Parse HTML content to extract headings for TOC
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const h2s = Array.from(doc.querySelectorAll('h2, h3'));
    const extracted = h2s.map((h, i) => {
      const id = h.id || \`heading-\${i}\`;
      return { id, text: h.textContent, level: h.tagName.toLowerCase() };
    });
    setHeadings(extracted);

    // Dynamic scroll spy for TOC
    const handleScroll = () => {
      const headingElements = extracted.map(h => document.getElementById(h.id));
      const scrollPosition = window.scrollY + 100;
      
      for (let i = headingElements.length - 1; i >= 0; i--) {
        const h = headingElements[i];
        if (h && h.offsetTop <= scrollPosition) {
          setActiveId(h.id);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [content]);

  // Transform content to inject IDs into H2/H3 for smooth scrolling
  const processHTML = (htmlStr) => {
    let processed = htmlStr;
    headings.forEach((h) => {
      processed = processed.replace(
        new RegExp(\`<(h[23])([^>]*)>(\${h.text.replace(/[-\\/\\\\^$*+?.()|[\\]{}]/g, '\\\\$&')})</\\\\1>\`, 'i'),
        \`<$1 id="\${h.id}"$2>$3</$1>\`
      );
    });
    return processed;
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
          
          {/* Main Content Area */}
          <div className="w-full lg:w-2/3">
            <div 
              className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-p:text-muted-foreground prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl prose-img:shadow-xl prose-pre:bg-muted/50 prose-pre:border prose-pre:border-border prose-pre:rounded-xl prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-muted/20 prose-blockquote:p-4 prose-blockquote:rounded-r-xl"
              dangerouslySetInnerHTML={{ __html: processHTML(content) }}
            />
            
            {/* Tags Matrix */}
            {tags && tags.length > 0 && (
              <div className="mt-16 pt-8 border-t border-border flex flex-wrap gap-3">
                <span className="text-foreground font-bold mr-2">Tags:</span>
                {tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm font-semibold">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Author Profile Block */}
            {author && (
              <div className="mt-12 p-8 rounded-3xl bg-card border border-border shadow-sm flex flex-col md:flex-row items-center gap-6">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-muted flex-shrink-0">
                  {author.avatar ? (
                    <img src={author.avatar} alt={author.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl font-black text-primary bg-primary/10">
                      {(author.name || 'T').charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-foreground mb-1">{author.name || 'Techzon Editorial'}</h4>
                  <p className="text-sm text-primary font-bold uppercase tracking-wider mb-3">{author.designation || 'Software Engineer'}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {author.bio || 'Enterprise architecture and software engineering thought leader dedicated to building scalable systems.'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Sticky Sidebar */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-32 space-y-8">
              
              {/* Table of Contents */}
              {headings.length > 0 && (
                <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
                  <h4 className="text-lg font-bold text-foreground mb-4">Table of Contents</h4>
                  <ul className="space-y-3 text-sm">
                    {headings.map((h, i) => (
                      <li key={i} className={\`\${h.level === 'h3' ? 'ml-4' : ''}\`}>
                        <a 
                          href={\`#\${h.id}\`}
                          className={\`block hover:text-primary transition-colors \${activeId === h.id ? 'text-primary font-bold' : 'text-muted-foreground'}\`}
                          onClick={(e) => {
                            e.preventDefault();
                            document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth' });
                          }}
                        >
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Share Module */}
              <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
                <h4 className="text-lg font-bold text-foreground mb-4">Share Article</h4>
                <div className="flex gap-3">
                  <a href={\`https://twitter.com/intent/tweet?url=\${encodeURIComponent(window.location.href)}\`} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-colors text-foreground">
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a href={\`https://www.linkedin.com/shareArticle?mini=true&url=\${encodeURIComponent(window.location.href)}\`} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-colors text-foreground">
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <button onClick={copyLink} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-colors text-foreground relative group">
                    {copied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <LinkIcon className="w-4 h-4" />}
                    {copied && <span className="absolute -top-10 bg-card border border-border text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">Copied!</span>}
                  </button>
                </div>
              </div>
              
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};
`;

// 3. NewsletterCTA
const newsletterCode = `import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import api from '../../../config/axios';

export const NewsletterCTA = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');

  const subscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    try {
      setStatus('loading');
      await api.post('/newsletter', { email });
      setStatus('success');
      setMessage('Subscription successful! Welcome aboard.');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setMessage(err.response?.data?.message || 'Failed to subscribe. Please try again.');
    }
  };

  return (
    <section className="py-24 bg-muted/20 border-y border-border">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-card p-8 md:p-12 rounded-3xl border border-border shadow-xl text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 pointer-events-none" />
          <div className="relative z-10">
            <Mail className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Stay Ahead of the Curve</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Join over 10,000 engineering leaders. Get our latest insights, case studies, and architecture deep-dives delivered straight to your inbox.
            </p>
            
            <form onSubmit={subscribe} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input 
                type="email" 
                placeholder="Enter your enterprise email..." 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === 'loading' || status === 'success'}
                className="flex-1 bg-background border border-border rounded-xl px-6 py-4 text-foreground focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
              />
              <button 
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="bg-primary text-primary-foreground font-bold px-8 py-4 rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center min-w-[140px]"
              >
                {status === 'loading' ? <Loader2 className="w-5 h-5 animate-spin" /> : 
                 status === 'success' ? <CheckCircle2 className="w-5 h-5" /> : 'Subscribe'}
              </button>
            </form>
            
            {status === 'success' && <p className="text-green-500 text-sm mt-4 font-semibold">{message}</p>}
            {status === 'error' && <p className="text-destructive text-sm mt-4 flex items-center justify-center gap-1"><AlertCircle className="w-4 h-4" />{message}</p>}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
`;

// 4. Main BlogDetails Page
const pageCode = `import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import api from '../../config/axios';
import { ArticleHero } from '../components/blog/details/ArticleHero';
import { ArticleContent } from '../components/blog/details/ArticleContent';
import { NewsletterCTA } from '../components/blog/details/NewsletterCTA';
import { FinalCTA } from '../components/home/FinalCTA';
import { Footer } from '../components/home/Footer';
import { Loader2, AlertCircle } from 'lucide-react';

export const BlogDetails = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await api.get(\`/blogs/\${slug}\`);
        setBlog(res.data.data || res.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Article not found.');
      } finally {
        setLoading(false);
      }
    };
    
    window.scrollTo(0, 0);
    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6 text-center">
        <AlertCircle className="w-16 h-16 text-destructive mb-4" />
        <h1 className="text-3xl font-bold text-foreground mb-4">Article Offline</h1>
        <p className="text-muted-foreground max-w-md mb-8">{error}</p>
        <Link to="/blog" className="px-6 py-3 bg-primary text-primary-foreground font-bold rounded-full">
          Return to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col min-h-screen">
      <Helmet>
        <title>{blog.title} | Techzon Insights</title>
        <meta name="description" content={blog.excerpt || blog.summary} />
        <script type="application/ld+json">
          {\`
            {
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": "\${blog.title}",
              "author": {
                "@type": "Person",
                "name": "\${blog.author?.name || 'Techzon Team'}"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Techzon IT Solutions"
              },
              "datePublished": "\${blog.createdAt || new Date().toISOString()}"
            }
          \`}
        </script>
      </Helmet>
      
      <main className="flex-1">
        <ArticleHero blog={blog} />
        <ArticleContent content={blog.content || ''} author={blog.author} tags={blog.tags} />
        <NewsletterCTA />
        <FinalCTA />
      </main>
      
      <Footer />
    </div>
  );
};
`;

fs.writeFileSync(path.join(detailsDir, 'ArticleHero.jsx'), heroCode);
fs.writeFileSync(path.join(detailsDir, 'ArticleContent.jsx'), contentCode);
fs.writeFileSync(path.join(detailsDir, 'NewsletterCTA.jsx'), newsletterCode);

const pagesDir = path.join(baseDir, 'pages');
fs.writeFileSync(path.join(pagesDir, 'BlogDetails.jsx'), pageCode);

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
import { Blog } from '../pages/Blog';
import { BlogDetails } from '../pages/BlogDetails';

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
      { path: 'blog', element: <Blog /> },
      { path: 'blog/category/:category', element: <Blog /> },
      { path: 'blog/tag/:tag', element: <Blog /> },
      { path: 'blog/author/:author', element: <Blog /> },
      { path: 'blog/:slug', element: <BlogDetails /> },
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

console.log('Blog Details components generated and routes updated successfully.');
