import React, { useState, useEffect } from 'react';
import { LazyMotion, domAnimation, m, AnimatePresence } from 'framer-motion';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { cn } from '../../utils/cn';
import logo from '../../assets/logo.jpeg';

const navLinks = [
  { name: 'Services', path: '/services' },
  { name: 'Solutions', path: '/solutions' },
  { name: 'Process', path: '/process' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Insights', path: '/insights' },
  { name: 'About', path: '/about' },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <m.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn('fixed top-0 left-0 right-0 z-[100] transition-all duration-300 pt-4 px-4 sm:px-6')}
      >
        <div
          className={cn(
            'mx-auto w-full max-w-[1400px] h-16 sm:h-20 flex items-center justify-between px-4 sm:px-6 md:px-12 lg:px-16 transition-all duration-300',
            isScrolled
              ? 'glass-panel shadow-sm border border-slate-200/50 rounded-full'
              : 'bg-transparent border border-transparent rounded-full'
          )}
        >
          {/* Logo */}
          <Link to="/" aria-label="Home" className="flex items-center shrink-0">
            <img
              src={logo}
              alt="Techzon"
              className="h-11 sm:h-12 lg:h-14 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  cn(
                    'px-4 py-2 text-sm font-semibold rounded-full transition-all',
                    isActive
                      ? 'text-primary bg-primary/10'
                      : 'text-foreground hover:text-primary hover:bg-muted/50'
                  )
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center">
            <Link to="/contact" className="btn-primary rounded-full px-6 py-2.5 text-sm font-semibold">
              Start a Project
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden flex flex-col items-center justify-center gap-1.5 w-11 h-11 rounded-md hover:bg-muted/50 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <span className={cn('block w-5 h-0.5 bg-primary transition-transform', isMobileMenuOpen ? 'rotate-45 translate-y-2' : '')} />
            <span className={cn('block w-5 h-0.5 bg-primary transition-opacity', isMobileMenuOpen ? 'opacity-0' : '')} />
            <span className={cn('block w-5 h-0.5 bg-primary transition-transform', isMobileMenuOpen ? '-rotate-45 -translate-y-2' : '')} />
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <m.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="lg:hidden mt-4 mx-auto w-full max-w-[1400px] glass-panel rounded-2xl overflow-hidden shadow-md border border-slate-200/50"
            >
              <nav className="flex flex-col p-4 gap-1">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center px-4 py-3 text-base font-medium rounded-xl transition-all',
                        isActive
                          ? 'text-primary bg-primary/10'
                          : 'text-foreground hover:text-primary hover:bg-muted/50'
                      )
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
                <div className="mt-4 pt-4 border-t border-slate-200/50 px-2">
                  <Link to="/contact" className="btn-primary w-full rounded-xl py-3 font-semibold text-base block text-center">
                    Start a Project
                  </Link>
                </div>
              </nav>
            </m.div>
          )}
        </AnimatePresence>
      </m.header>
    </LazyMotion>
  );
};