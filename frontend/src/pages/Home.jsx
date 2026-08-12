import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { HeroSection } from '../components/home/sections/HeroSection/HeroSection';
import { TrustedCompaniesSection } from '../components/home/sections/TrustedCompaniesSection/TrustedCompaniesSection';

// Lazy load below-the-fold sections
const CompanyStatisticsSection = React.lazy(() => import('../components/home/sections/CompanyStatisticsSection/CompanyStatisticsSection').then(module => ({ default: module.CompanyStatisticsSection })));
const WhyChooseTechzonSection = React.lazy(() => import('../components/home/sections/WhyChooseTechzonSection/WhyChooseTechzonSection').then(module => ({ default: module.WhyChooseTechzonSection })));
const IndustriesSection = React.lazy(() => import('../components/home/sections/IndustriesSection/IndustriesSection').then(module => ({ default: module.IndustriesSection })));
const ServicesSection = React.lazy(() => import('../components/home/sections/ServicesSection/ServicesSection').then(module => ({ default: module.ServicesSection })));
const EngineeringJourneySection = React.lazy(() => import('../components/home/sections/EngineeringJourneySection/EngineeringJourneySection').then(module => ({ default: module.EngineeringJourneySection })));
const TechnologyStackSection = React.lazy(() => import('../components/home/sections/TechnologyStackSection/TechnologyStackSection').then(module => ({ default: module.TechnologyStackSection })));
const ProjectsSection = React.lazy(() => import('../components/home/sections/ProjectsSection/ProjectsSection').then(module => ({ default: module.ProjectsSection })));
const SolutionShowcaseSection = React.lazy(() => import('../components/home/sections/SolutionShowcaseSection/SolutionShowcaseSection').then(module => ({ default: module.SolutionShowcaseSection })));
const SuccessMetricsSection = React.lazy(() => import('../components/home/sections/SuccessMetricsSection/SuccessMetricsSection').then(module => ({ default: module.SuccessMetricsSection })));
const TestimonialsSection = React.lazy(() => import('../components/home/sections/TestimonialsSection/TestimonialsSection').then(module => ({ default: module.TestimonialsSection })));
const LatestBlogsSection = React.lazy(() => import('../components/home/sections/LatestBlogsSection/LatestBlogsSection').then(module => ({ default: module.LatestBlogsSection })));
const FaqSection = React.lazy(() => import('../components/home/sections/FaqSection/FaqSection').then(module => ({ default: module.FaqSection })));
const FinalCTASection = React.lazy(() => import('../components/home/sections/FinalCTASection/FinalCTASection').then(module => ({ default: module.FinalCTASection })));

export const Home = () => {
  return (
    <div className="w-full flex flex-col min-h-screen">
      <Helmet>
        <title>Techzon IT Solutions</title>
        <meta name="description" content="From custom software and modern web applications to AI and cloud solutions, we help businesses turn complex ideas into scalable, reliable digital products." />
      </Helmet>
      
      <main className="flex-1">
        <HeroSection />
        <TrustedCompaniesSection />
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-[#5BC0EB] border-t-transparent rounded-full animate-spin"></div></div>}>
          <CompanyStatisticsSection />
          <WhyChooseTechzonSection />
          <IndustriesSection />
          <ServicesSection />
          <EngineeringJourneySection />
          <TechnologyStackSection />
          <ProjectsSection />
          <SolutionShowcaseSection />
          <SuccessMetricsSection />
          <TestimonialsSection />
          <LatestBlogsSection />
          <FaqSection />
          <FinalCTASection />
        </Suspense>
      </main>
      
          </div>
  );
};
