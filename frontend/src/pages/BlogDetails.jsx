import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import api from '../config/axios';
import { ArticleHero } from '../components/blog/details/ArticleHero';
import { ArticleContent } from '../components/blog/details/ArticleContent';
import { NewsletterCTA } from '../components/blog/details/NewsletterCTA';
import { FinalCTA } from '../components/home/FinalCTA';
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
        const res = await api.get(`/blogs/${slug}`);
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
          {`
            {
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": "${blog.title}",
              "author": {
                "@type": "Person",
                "name": "${blog.author?.name || 'Techzon Team'}"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Techzon IT Solutions"
              },
              "datePublished": "${blog.createdAt || new Date().toISOString()}"
            }
          `}
        </script>
      </Helmet>
      
      <main className="flex-1">
        <ArticleHero blog={blog} />
        <ArticleContent content={blog.content || ''} author={blog.author} tags={blog.tags} />
        <NewsletterCTA />
        <FinalCTA />
      </main>
      
          </div>
  );
};
