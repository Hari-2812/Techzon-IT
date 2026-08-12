import React, { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { WhatsAppButton } from '../components/common/WhatsAppButton';
import { ScrollToTop } from '../components/common/ScrollToTop';

const Navbar = lazy(() =>
  import('../components/home/Navbar').then(module => ({
    default: module.Navbar,
  }))
);

const FooterSection = lazy(() =>
  import('../components/home/sections/FooterSection/FooterSection').then(module => ({
    default: module.FooterSection,
  }))
);



export const PublicLayout = () => (
  <Suspense
    fallback={
      <div className="flex h-screen w-full items-center justify-center text-[#5BC0EB] font-bold">
        Loading...
      </div>
    }
  >
    <ScrollToTop />
    <Navbar />

    <main className="flex-1 w-full">
      <Outlet />
    </main>

    <FooterSection />
    <WhatsAppButton />
  </Suspense>
);

export const AdminLayout = () => (
  <div className="flex min-h-screen bg-muted/40">
    <aside className="w-64 border-r border-border bg-background">Sidebar</aside>
    <main className="flex-1 p-6"><Outlet /></main>
  </div>
);

export const AuthLayout = () => (
  <div className="flex min-h-screen items-center justify-center bg-muted/40">
    <div className="w-full max-w-md"><Outlet /></div>
  </div>
);
