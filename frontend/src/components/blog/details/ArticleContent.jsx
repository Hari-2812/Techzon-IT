import React, { useEffect, useState } from 'react';
import { Share2, Link as LinkIcon, CheckCircle2 } from 'lucide-react';

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
      const id = h.id || `heading-${i}`;
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
        new RegExp(`<(h[23])([^>]*)>(${h.text.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})</\\1>`, 'i'),
        `<$1 id="${h.id}"$2>$3</$1>`
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
              className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-p:text-muted-foreground prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-img:shadow-elevation-2 prose-pre:bg-muted/50 prose-pre:border prose-pre:border-border prose-pre:rounded-lg prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-muted/20 prose-blockquote:p-4 prose-blockquote:rounded-r-xl"
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
              <div className="mt-12 p-8 premium-card shadow-elevation-1 flex flex-col md:flex-row items-center gap-6">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-muted flex-shrink-0">
                  {author.avatar ? (
                    <img loading="lazy" decoding="async" fetchpriority="low" src={author.avatar} alt={author.name} className="w-full h-full object-cover" />
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
                <div className="premium-card p-6">
                  <h4 className="text-lg font-bold text-foreground mb-4">Table of Contents</h4>
                  <ul className="space-y-3 text-sm">
                    {headings.map((h, i) => (
                      <li key={i} className={`${h.level === 'h3' ? 'ml-4' : ''}`}>
                        <a 
                          href={`#${h.id}`}
                          className={`block hover:text-primary transition-colors ${activeId === h.id ? 'text-primary font-bold' : 'text-muted-foreground'}`}
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
              <div className="premium-card p-6">
                <h4 className="text-lg font-bold text-foreground mb-4">Share Article</h4>
                <div className="flex gap-3">
                  <button onClick={copyLink} >
                    {copied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <LinkIcon className="w-4 h-4" />}
                    {copied && <span className="absolute -top-10 bg-card border border-border text-xs px-2 py-1 rounded shadow-elevation-2 whitespace-nowrap">Copied!</span>}
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
