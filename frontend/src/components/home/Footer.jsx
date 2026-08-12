import React, { useState } from 'react';
import { ArrowUp, Mail, Phone, MapPin, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import api from '../../config/axios';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');
    setMessage('');
    
    try {
      const res = await api.post('/newsletters', { email });
      setStatus('success');
      setMessage(res.data?.message || "You're subscribed successfully.");
      setEmail('');
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setStatus('error');
      setMessage(error.response?.data?.message || 'Unable to subscribe. Please try again.');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    Services: ['Web Engineering', 'Mobile Apps', 'Cloud Infrastructure', 'Cybersecurity', 'DevOps'],
    Solutions: ['Enterprise ERP', 'Data Analytics', 'AI Integration', 'IoT Systems', 'SaaS Platforms'],
    Industries: ['FinTech', 'Healthcare', 'E-Commerce', 'Logistics', 'Manufacturing'],
    Technology: ['React & Next.js', 'Node.js & Python', 'AWS & Azure', 'Docker & Kubernetes', 'GraphQL'],
    Resources: ['Documentation', 'API Reference', 'Case Studies', 'Whitepapers', 'Blog'],
    Company: ['About Techzon', 'Leadership Team', 'Careers', 'Partners', 'Press'],
  };

  return (
    <footer className="bg-white border-t border-gray-200/50 pt-24 pb-12 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* Brand & Newsletter */}
          <div className="lg:col-span-4 lg:pr-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center shadow-sm border border-primary/20">
                <span className="text-white font-bold text-2xl leading-none tracking-tighter">T</span>
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-primary">Techzon</span>
            </div>
            <p className="text-foreground mb-8 text-sm leading-relaxed">
              Architecting enterprise-grade digital ecosystems. Secure, scalable, and future-ready engineering for global enterprises.
            </p>
            <div className="glass-panel border border-gray-200/50 p-6 rounded-2xl relative overflow-hidden">
              <h4 className="text-primary font-bold mb-4 text-sm">Subscribe to Tech Insights</h4>
              
              {status === 'success' ? (
                <div className="flex items-center gap-3 text-green-600 bg-green-50 p-4 rounded-lg border border-green-100">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span className="text-sm font-medium">{message}</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col gap-3 relative z-10">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={status === 'loading'}
                      placeholder="Enterprise email address" 
                      className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm min-h-[44px] text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-muted-foreground disabled:opacity-50"
                    />
                    <button 
                      type="submit" 
                      disabled={status === 'loading'}
                      className="btn-primary px-6 rounded-lg font-medium min-h-[44px] flex items-center justify-center min-w-[120px] disabled:opacity-70"
                    >
                      {status === 'loading' ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Subscribe'}
                    </button>
                  </div>
                  {status === 'error' && (
                    <div className="flex items-center gap-2 text-red-500 mt-1 text-xs font-medium">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {message}
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-primary font-bold mb-6 tracking-wide text-xs uppercase text-opacity-80">{category}</h4>
                <ul className="space-y-4">
                  {links.map((item) => (
                    <li key={item}>
                      <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium inline-flex items-center">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Strip */}
        <div className="glass-panel py-8 px-8 mb-12 rounded-2xl border border-gray-200/50 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <h4 className="text-primary font-bold tracking-wide text-sm uppercase">Global Contact</h4>
            <div className="flex flex-col sm:flex-row gap-8 sm:gap-12">
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/20 transition-colors border border-gray-200 group-hover:border-primary/30">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <span className="text-foreground text-sm font-medium">Opposite Collector Office , Near SHIFA Hospital, Dindigul, TamilNadu</span>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/20 transition-colors border border-gray-200 group-hover:border-primary/30">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <a href="tel:+916374191654" className="text-foreground hover:text-primary transition-colors text-sm font-medium">
                  +91 6374191654
                </a>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/20 transition-colors border border-gray-200 group-hover:border-primary/30">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <a href="mailto:support@techzonwide.com" className="text-foreground hover:text-primary transition-colors text-sm font-medium">
                  support@techzonwide.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <p className="text-sm text-muted-foreground font-medium">
              &copy; {new Date().getFullYear()} Techzon IT Solutions. All rights reserved.
            </p>
            <div className="hidden md:flex gap-6 text-sm text-muted-foreground font-medium">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex gap-4">
              <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-all p-2 w-10 h-10 flex items-center justify-center rounded-full bg-muted hover:bg-muted border border-transparent hover:border-gray-200">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-all p-2 w-10 h-10 flex items-center justify-center rounded-full bg-muted hover:bg-muted border border-transparent hover:border-gray-200">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="#" aria-label="GitHub" className="text-muted-foreground hover:text-primary transition-all p-2 w-10 h-10 flex items-center justify-center rounded-full bg-muted hover:bg-muted border border-transparent hover:border-gray-200">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
              </a>
            </div>
            
            <button 
              onClick={scrollToTop}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 transition-all hover:scale-105 active:scale-95"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
