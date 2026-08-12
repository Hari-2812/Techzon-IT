import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { PageTransition } from '../components/layout/PageTransition';
import { AlertCircle } from 'lucide-react';

export const NotFound = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>Techzon IT Solutions</title>
        <meta name="description" content="The page you are looking for does not exist." />
      </Helmet>
      
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 bg-muted pt-24">
        <div className="glass-panel w-full max-w-md p-10 bg-white/80 rounded-3xl border border-slate-100 shadow-xl flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-muted-foreground mb-6">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h1 className="text-6xl font-display font-bold text-primary mb-2">404</h1>
          <h2 className="text-xl font-bold text-primary mb-4 uppercase tracking-wider">Page Not Found</h2>
          <p className="text-muted-foreground font-medium mb-8">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <Link to="/" className="btn-primary px-8 py-3 rounded-full font-bold">
            Return Home
          </Link>
        </div>
      </div>
    </PageTransition>
  );
};
