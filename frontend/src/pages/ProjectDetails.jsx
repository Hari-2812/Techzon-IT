import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowLeft, Terminal, Cpu, Database as DbIcon, Shield, Server, ArrowDown, Layout, Code, BookOpen, Users, Video, CreditCard, MessageSquare, CheckCircle, Lock, Zap, FileText, Globe, ArrowRight } from 'lucide-react';
import { CASE_STUDIES } from '../data/projects';

// Mockups
const LMSMockup = () => (
  <div className="w-full h-full bg-[#f8fafc] rounded-t-3xl p-4 sm:p-6 overflow-hidden border-x border-t border-slate-200 shadow-inner flex flex-col gap-4 relative select-none">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#0B2D4D] flex items-center justify-center shadow-md">
          <BookOpen className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="h-3.5 w-24 bg-slate-200 rounded-full mb-1.5"></div>
          <div className="h-2 w-16 bg-slate-200 rounded-full"></div>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-slate-100"></div>
        <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-slate-100"></div>
      </div>
    </div>
    <div className="flex gap-4 h-full">
      <div className="w-32 lg:w-40 h-full hidden sm:flex flex-col gap-3">
        <div className="h-8 w-full bg-white border border-slate-100 rounded-lg shadow-sm"></div>
        <div className="h-4 w-3/4 bg-slate-200 rounded-md mt-2"></div>
        <div className="h-4 w-3/4 bg-slate-100 rounded-md"></div>
        <div className="h-4 w-3/4 bg-slate-100 rounded-md"></div>
        <div className="h-4 w-3/4 bg-slate-100 rounded-md mt-6"></div>
      </div>
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex gap-3">
          <div className="flex-1 bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#D9F2FF] flex items-center justify-center">
              <Video className="w-4 h-4 text-[#5BC0EB]" />
            </div>
            <div>
              <div className="h-2.5 w-12 bg-slate-200 rounded-full mb-1.5"></div>
              <div className="h-4 w-8 bg-slate-300 rounded-full"></div>
            </div>
          </div>
          <div className="flex-1 bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-[#FF8A3D]" />
            </div>
            <div>
              <div className="h-2.5 w-12 bg-slate-200 rounded-full mb-1.5"></div>
              <div className="h-4 w-8 bg-slate-300 rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="bg-white flex-1 rounded-xl border border-slate-100 shadow-sm p-4 flex flex-col gap-3">
          <div className="h-3.5 w-32 bg-slate-200 rounded-full mb-2"></div>
          <div className="flex gap-3">
            <div className="w-1/3 aspect-video bg-[#5BC0EB]/10 rounded-lg border border-[#5BC0EB]/20"></div>
            <div className="flex-1 flex flex-col gap-1.5 justify-center">
              <div className="h-3.5 w-4/5 bg-slate-300 rounded-full"></div>
              <div className="h-2.5 w-full bg-slate-200 rounded-full"></div>
              <div className="h-2.5 w-2/3 bg-slate-200 rounded-full"></div>
              <div className="w-full bg-slate-100 rounded-full h-2 mt-2 overflow-hidden">
                <div className="bg-[#5BC0EB] h-full w-[65%] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const CRMMockup = () => (
  <div className="w-full h-full bg-[#f8fafc] rounded-t-3xl p-4 sm:p-6 overflow-hidden border-x border-t border-slate-200 shadow-inner flex flex-col gap-4 relative select-none">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center shadow-md">
          <MessageSquare className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="h-3.5 w-32 bg-slate-200 rounded-full mb-1.5"></div>
          <div className="h-2 w-20 bg-slate-200 rounded-full"></div>
        </div>
      </div>
      <div className="h-8 w-24 bg-white shadow-sm border border-slate-100 rounded-full"></div>
    </div>
    <div className="flex gap-4 h-full">
      <div className="w-2/5 sm:w-1/3 bg-white rounded-xl border border-slate-100 shadow-sm p-3 flex flex-col gap-2">
        <div className="h-8 w-full bg-slate-100 rounded-lg mb-2"></div>
        {[1, 2, 3].map(i => (
          <div key={i} className="flex items-center gap-2.5 p-1.5 border-b border-slate-50 last:border-0">
            <div className="w-8 h-8 rounded-full bg-slate-200 shrink-0"></div>
            <div className="flex-1">
              <div className="h-2.5 w-20 bg-slate-300 rounded-full mb-1.5"></div>
              <div className="h-2 w-12 bg-slate-200 rounded-full"></div>
            </div>
            {i === 1 && <div className="w-2.5 h-2.5 rounded-full bg-[#5BC0EB] shadow-[0_0_8px_rgba(91,192,235,0.6)]"></div>}
          </div>
        ))}
      </div>
      <div className="flex-1 flex flex-col gap-3">
        <div className="flex gap-3">
          <div className="flex-1 bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex items-center justify-center gap-1.5 flex-col">
            <Users className="w-5 h-5 text-[#0B2D4D]" />
            <div className="h-2.5 w-16 bg-slate-300 rounded-full mt-1"></div>
          </div>
          <div className="flex-1 bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex items-center justify-center gap-1.5 flex-col">
            <CheckCircle className="w-5 h-5 text-[#25D366]" />
            <div className="h-2.5 w-16 bg-slate-300 rounded-full mt-1"></div>
          </div>
        </div>
        <div className="bg-white flex-1 rounded-xl border border-slate-100 shadow-sm p-4 flex flex-col justify-end relative overflow-hidden">
          <div className="self-end bg-[#D9F2FF] p-3 rounded-l-xl rounded-tr-xl max-w-[85%] mb-3 shadow-sm border border-[#5BC0EB]/20">
            <div className="h-2 w-24 bg-[#5BC0EB]/40 rounded-full mb-1.5"></div>
            <div className="h-2 w-16 bg-[#5BC0EB]/40 rounded-full"></div>
          </div>
          <div className="self-start bg-slate-100 p-3 rounded-r-xl rounded-tl-xl max-w-[85%] shadow-sm">
            <div className="h-2 w-32 bg-slate-300 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const ProjectDetails = () => {
  const { slug } = useParams();
  const normalizedSlug = slug?.trim().toLowerCase();
  const project = Object.values(CASE_STUDIES).find(p => p.slug?.toLowerCase() === normalizedSlug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] p-6 text-center pt-24">
        <AlertCircle className="w-16 h-16 text-[#FF8A3D] mb-4" />
        <h1 className="font-display text-4xl font-bold text-[#0B2D4D] mb-4">Project Not Found</h1>
        <p className="text-[#1F2937] max-w-md mb-8">The case study you are looking for does not exist or has been removed.</p>
        <Link to="/portfolio" className="px-6 py-3 bg-[#0B2D4D] text-white font-bold rounded-full hover:bg-[#5BC0EB] transition-colors">
          Return to Portfolio
        </Link>
      </div>
    );
  }

  const getTechIcon = (category) => {
    switch (category) {
      case 'Frontend': return <Layout className="w-5 h-5 text-[#5BC0EB]" />;
      case 'Backend': return <Terminal className="w-5 h-5 text-[#FF8A3D]" />;
      case 'Database': return <DbIcon className="w-5 h-5 text-[#F4B942]" />;
      case 'Authentication': return <Shield className="w-5 h-5 text-purple-500" />;
      default: return <Cpu className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="w-full flex flex-col min-h-screen bg-white pt-24">
      <Helmet>
        <title>Techzon IT Solutions</title>
        <meta name="description" content={project.shortDescription} />
      </Helmet>
      
      <main className="flex-1">
        
        {/* HERO SECTION */}
        <section className="pt-12 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
          <Link to="/portfolio" className="inline-flex items-center gap-2 text-[#5BC0EB] font-bold mb-8 hover:text-[#0B2D4D] transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Portfolio
          </Link>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="inline-block px-3 py-1 bg-[#D9F2FF]/50 text-[#0B2D4D] text-xs font-bold uppercase tracking-wider rounded-full mb-6 border border-[#5BC0EB]/20">
              {project.category}
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-[#0B2D4D] tracking-tight mb-6">
              {project.title}
            </h1>
            <p className="text-xl md:text-2xl text-[#1F2937] max-w-4xl leading-relaxed whitespace-pre-line mb-8">
              {project.shortDescription}
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              {project.url && (
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-[#0B2D4D] text-white font-bold rounded-lg shadow-md hover:-translate-y-1 hover:shadow-lg transition-all inline-flex items-center gap-2">
                  <Globe className="w-5 h-5" /> View Live Project
                </a>
              )}
            </div>
          </motion.div>

          {/* Product Visual Mockup */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full h-[400px] md:h-[600px] rounded-t-3xl overflow-hidden mt-12 bg-[#F8FAFC]"
          >
            {project.slug === 'lms-system' ? <LMSMockup /> : <CRMMockup />}
          </motion.div>
        </section>

        {/* CONTENT & SIDEBAR */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-3 gap-16">
            
            {/* Sidebar (Desktop) / Stacked (Mobile) */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="lg:sticky lg:top-32 bg-[#F8FAFC] border border-[#D9F2FF] rounded-2xl p-8 shadow-sm">
                <h3 className="font-display text-xl font-bold text-[#0B2D4D] mb-6">Project Information</h3>
                
                <div className="space-y-6">
                  {project.sidebarInfo && Object.entries(project.sidebarInfo).map(([key, value]) => (
                    <div key={key}>
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{key}</h4>
                      <p className="font-medium text-[#0B2D4D]">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <div className="mb-16">
                <h2 className="font-display text-3xl font-bold text-[#0B2D4D] mb-6">Project Overview</h2>
                <p className="text-lg text-[#1F2937] leading-relaxed whitespace-pre-line">
                  {project.overview}
                </p>
              </div>

              {project.objective && (
                <div className="mb-16">
                  <h2 className="font-display text-3xl font-bold text-[#0B2D4D] mb-6">Project Objective</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.objective.map((obj, i) => (
                      <div key={i} className="flex gap-3 bg-[#F8FAFC] p-4 rounded-xl border border-slate-100">
                        <CheckCircle className="w-5 h-5 text-[#5BC0EB] shrink-0 mt-0.5" />
                        <span className="font-medium text-[#1F2937]">{obj}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        </section>

        {/* KEY FEATURES */}
        <section className="py-20 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0B2D4D] mb-12">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.features.map((feature, idx) => (
                <motion.div 
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex gap-4"
                >
                  <div className="w-12 h-12 shrink-0 rounded-xl bg-[#D9F2FF] flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-[#5BC0EB]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-[#0B2D4D] mb-2">{feature.title}</h4>
                    <p className="text-[#1F2937] leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* TECHNOLOGY STACK */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0B2D4D] mb-12">Technology Stack</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(project.technologies).map(([category, techs], idx) => (
                <motion.div 
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-[#F8FAFC] rounded-2xl p-6 border border-[#D9F2FF] shadow-sm hover:border-[#5BC0EB]/40 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    {getTechIcon(category)}
                    <h3 className="font-bold text-[#0B2D4D] uppercase tracking-wider text-sm">{category.replace('_', '-')}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {techs.map(tech => (
                      <span key={tech} className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-[#1F2937]">
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ARCHITECTURE */}
        <section className="py-20 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0B2D4D] mb-16">System Architecture</h2>
            
            <div className="max-w-3xl mx-auto flex flex-col items-center">
              {/* Client Layer */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="w-full md:w-2/3 p-4 bg-slate-100 rounded-xl mb-6 font-bold text-slate-500 uppercase tracking-widest text-sm"
              >
                {project.slug === 'lms-system' ? 'Student / Mentor / Admin' : 'Business User'}
              </motion.div>
              
              <ArrowDown className="w-6 h-6 text-slate-300 mb-6" />

              {/* Frontend */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="w-full md:w-2/3 p-6 bg-white border border-[#D9F2FF] rounded-2xl shadow-sm"
              >
                <Layout className="w-8 h-8 text-[#5BC0EB] mx-auto mb-3" />
                <h3 className="font-bold text-[#0B2D4D] text-lg">{project.architecture.frontend}</h3>
              </motion.div>
              
              <div className="h-10 w-px bg-slate-300"></div>
              
              {/* Backend */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="w-full md:w-2/3 p-6 bg-[#0B2D4D] border border-[#0B2D4D] rounded-2xl shadow-md text-white relative"
              >
                <Server className="w-8 h-8 text-[#5BC0EB] mx-auto mb-3" />
                <h3 className="font-bold text-white text-lg">{project.architecture.backend}</h3>
              </motion.div>
              
              <div className="h-10 w-px bg-slate-300"></div>
              
              {/* Database */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="w-full md:w-2/3 p-6 bg-white border border-[#D9F2FF] rounded-2xl shadow-sm"
              >
                <DbIcon className="w-8 h-8 text-[#F4B942] mx-auto mb-3" />
                <h3 className="font-bold text-[#0B2D4D] text-lg">{project.architecture.database}</h3>
              </motion.div>
              
              {/* External Services */}
              <div className="mt-12 w-full pt-8 border-t border-slate-200">
                <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">External Services</h4>
                <div className="flex flex-wrap justify-center gap-4">
                  {project.architecture.external.map(ext => (
                    <div key={ext} className="px-5 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-[#0B2D4D] shadow-sm">
                      {ext}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
          </div>
        </section>

        {/* HOW IT WORKS (WORKFLOW) */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0B2D4D] mb-16">How It Works</h2>
            <div className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-4 md:gap-6 max-w-5xl mx-auto">
              {project.workflow.map((step, idx) => (
                <React.Fragment key={step}>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="px-6 py-3 rounded-full bg-[#0B2D4D] border border-[#0B2D4D] font-bold text-white shadow-sm"
                  >
                    {step}
                  </motion.div>
                  {idx < project.workflow.length - 1 && (
                    <ArrowRight className="w-5 h-5 text-[#5BC0EB] hidden md:block" />
                  )}
                  {idx < project.workflow.length - 1 && (
                    <ArrowDown className="w-5 h-5 text-[#5BC0EB] block md:hidden" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* CHALLENGES & SOLUTIONS */}
        <section className="py-20 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <h2 className="font-display text-3xl font-bold text-[#0B2D4D] mb-8 flex items-center gap-3">
                  <AlertCircle className="w-8 h-8 text-[#FF8A3D]" />
                  Challenges
                </h2>
                <div className="space-y-6">
                  {project.challenges.map((item, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm"
                    >
                      <p className="text-[#1F2937] font-medium leading-relaxed">{item.challenge}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="font-display text-3xl font-bold text-[#0B2D4D] mb-8 flex items-center gap-3">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                  Solutions
                </h2>
                <div className="space-y-6">
                  {project.challenges.map((item, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="p-6 rounded-2xl bg-[#D9F2FF]/30 border border-[#D9F2FF] shadow-sm"
                    >
                      <p className="text-[#0B2D4D] font-medium leading-relaxed">{item.solution}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECT OUTCOME */}
        {project.outcome && (
          <section className="py-24 bg-white border-b border-slate-100">
            <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
              <h2 className="font-display text-3xl md:text-5xl font-bold text-[#0B2D4D] mb-8">Project Outcome</h2>
              <p className="text-xl text-[#1F2937] leading-relaxed whitespace-pre-line">
                {project.outcome}
              </p>
            </div>
          </section>
        )}

        {/* BOTTOM NAVIGATION */}
        <section className="py-16 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
            <Link to="/portfolio" className="inline-flex items-center gap-2 px-8 py-4 bg-[#0B2D4D] text-white font-bold rounded-full hover:bg-[#5BC0EB] transition-colors shadow-md hover:shadow-xl hover:-translate-y-1">
              <ArrowLeft className="w-5 h-5" /> Back to Portfolio
            </Link>
          </div>
        </section>

      </main>
    </div>
  );
};

