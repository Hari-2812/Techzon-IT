import React, { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const Home = lazy(() => import('../pages/Home').then(m => ({ default: m.Home })));
const About = lazy(() => import('../pages/About').then(m => ({ default: m.About })));
const Services = lazy(() => import('../pages/Services').then(m => ({ default: m.Services })));
const ServiceDetails = lazy(() => import('../pages/ServiceDetails').then(m => ({ default: m.ServiceDetails })));
const Solutions = lazy(() => import('../pages/Solutions').then(m => ({ default: m.Solutions })));
const Process = lazy(() => import('../pages/Process').then(m => ({ default: m.Process })));
const Portfolio = lazy(() => import('../pages/Portfolio').then(m => ({ default: m.Portfolio })));
const ProjectDetails = lazy(() => import('../pages/ProjectDetails').then(m => ({ default: m.ProjectDetails })));
const Blog = lazy(() => import('../pages/Blog').then(m => ({ default: m.Blog })));
const BlogDetails = lazy(() => import('../pages/BlogDetails').then(m => ({ default: m.BlogDetails })));
const Contact = lazy(() => import('../pages/Contact').then(m => ({ default: m.Contact })));
const NotFound = lazy(() => import('../pages/NotFound').then(m => ({ default: m.NotFound })));

const PublicLayout = lazy(() => import('../layouts').then(m => ({ default: m.PublicLayout })));
const AdminLayout = lazy(() => import('../layouts').then(m => ({ default: m.AdminLayout })));
const AuthLayout = lazy(() => import('../layouts').then(m => ({ default: m.AuthLayout })));

const ErrorBoundary = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center flex-col bg-muted font-sans p-6 text-center">
      <h2 className="text-3xl font-bold text-primary mb-4">Something went wrong</h2>
      <p className="text-foreground mb-8">We encountered an unexpected error loading this page.</p>
      <div className="flex gap-4">
        <button onClick={() => window.location.reload()} className="px-6 py-2.5 rounded-full bg-white border border-slate-200 text-foreground font-medium hover:bg-muted transition-colors">
          Try Again
        </button>
        <a href="/" className="px-6 py-2.5 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-colors">
          Return Home
        </a>
      </div>
    </div>
  );
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'services', element: <Services /> },
      { path: 'services/category/:category', element: <Services /> },
      { path: 'services/:slug', element: <ServiceDetails /> },
      { path: 'solutions', element: <Solutions /> },
      { path: 'solutions/:slug', element: <Solutions /> },
      { path: 'process', element: <Process /> },
      { path: 'portfolio', element: <Portfolio /> },
      { path: 'portfolio/category/:category', element: <Portfolio /> },
      { path: 'portfolio/industry/:industry', element: <Portfolio /> },
      { path: 'portfolio/:slug', element: <ProjectDetails /> },
      { path: 'insights', element: <Blog /> },
      { path: 'insights/category/:category', element: <Blog /> },
      { path: 'insights/tag/:tag', element: <Blog /> },
      { path: 'insights/author/:author', element: <Blog /> },
      { path: 'insights/:slug', element: <BlogDetails /> },
      { path: 'contact', element: <Contact /> },
      { path: '*', element: <NotFound /> }
    ]
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      { path: 'login', element: <div>Login (Pending)</div> }
    ]
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <div>Dashboard (Pending)</div> }
    ]
  }
]);
