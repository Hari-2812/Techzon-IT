import React, { useState } from 'react';
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
      const response = await api.post('/newsletters', { email });
      setStatus('success');
      setMessage(response.message || "Thank you for subscribing! You'll receive updates from Techzon Wide.");
      setEmail('');
    } catch (err) {
      setStatus('error');
      setMessage(err.response?.data?.message || "We couldn't complete your subscription right now. Please try again.");
    }
  };

  return (
    <section className="py-24 bg-muted/20 border-y border-border">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-card p-8 md:p-12 rounded-lg border border-border shadow-elevation-2 text-center relative overflow-hidden"
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
                className="flex-1 bg-background border border-border rounded-lg px-6 py-4 text-foreground focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
              />
              <button 
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                
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
