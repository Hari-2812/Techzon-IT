import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Video, CreditCard, MessageSquare, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const LMSMockup = () => (
  <div className="w-full h-full bg-[#f8fafc] rounded-t-3xl p-4 sm:p-6 overflow-hidden border-b border-slate-200 shadow-inner flex flex-col gap-4 relative select-none">
    {/* Header */}
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
    
    {/* Main Area */}
    <div className="flex gap-4 h-full">
      {/* Sidebar */}
      <div className="w-32 lg:w-40 h-full hidden sm:flex flex-col gap-3">
        <div className="h-8 w-full bg-white border border-slate-100 rounded-lg shadow-sm"></div>
        <div className="h-4 w-3/4 bg-slate-200 rounded-md mt-2"></div>
        <div className="h-4 w-3/4 bg-slate-100 rounded-md"></div>
        <div className="h-4 w-3/4 bg-slate-100 rounded-md"></div>
        <div className="h-4 w-3/4 bg-slate-100 rounded-md mt-6"></div>
        <div className="h-4 w-2/3 bg-slate-100 rounded-md"></div>
      </div>
      
      {/* Content */}
      <div className="flex-1 flex flex-col gap-4">
        {/* Stats Row */}
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
        
        {/* Course Cards */}
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
  <div className="w-full h-full bg-[#f8fafc] rounded-t-3xl p-4 sm:p-6 overflow-hidden border-b border-slate-200 shadow-inner flex flex-col gap-4 relative select-none">
    {/* Header */}
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
    
    {/* Main Area */}
    <div className="flex gap-4 h-full">
      {/* Contact List */}
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
      
      {/* Chat/Campaign Area */}
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
          {/* Chat bubbles */}
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

const PROJECTS = [
  {
    id: 1,
    slug: "lms-system",
    title: "LMS System",
    category: "Learning Management System",
    description: "An end-to-end learning platform that enables students, mentors, and administrators to manage courses, live classes, recorded content, payments, progress, assessments, and certificates from one centralized platform.",
    tech: ["React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "Redux Toolkit", "React Query", "Razorpay", "JWT", "Socket.IO"],
    mockup: <LMSMockup />
  },
  {
    id: 2,
    slug: "whatsapp-crm-dashboard",
    title: "WhatsApp CRM Dashboard",
    category: "CRM / Customer Engagement",
    description: "A centralized WhatsApp CRM platform that helps businesses manage contacts, campaigns, templates, customer communication, scheduling, and campaign analytics through a powerful dashboard.",
    tech: ["React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "WhatsApp Cloud API", "JWT", "REST API", "Webhooks"],
    mockup: <CRMMockup />
  }
];

export const ProjectsSection = () => {
  return (
    <section className="section-padding bg-white" id="portfolio">
      <div className="container-global">
        
        {/* Header Area */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center md:items-start text-center md:text-left mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#5BC0EB]" />
            <span className="text-xs font-bold text-[#0B2D4D] uppercase tracking-[0.2em]">Selected Work</span>
          </div>
          <h3 className="font-display text-4xl md:text-5xl font-bold text-[#0B2D4D] tracking-tight mb-4">
            Featured Projects
          </h3>
          <p className="text-[#1F2937] max-w-2xl text-lg font-medium">
            Real-world digital products built to solve complex business and customer problems.
          </p>
        </motion.div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
              className="group flex flex-col bg-white rounded-3xl border border-[#D9F2FF] shadow-[0_8px_30px_rgba(11,45,77,0.04)] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(91,192,235,0.12)] hover:border-[#5BC0EB]/30"
            >
              {/* Top Visual Mockup Area */}
              <div className="w-full h-[280px] sm:h-[320px] bg-[#F8FAFC] overflow-hidden flex items-end justify-center pt-8 px-6 sm:px-10">
                <div className="w-full h-full transition-transform duration-500 group-hover:scale-[1.02] origin-bottom">
                  {project.mockup}
                </div>
              </div>

              {/* Bottom Content Area */}
              <div className="p-8 sm:p-10 flex flex-col flex-1">
                <div className="mb-6">
                  <div className="inline-block px-3 py-1 bg-[#D9F2FF]/50 text-[#0B2D4D] text-xs font-bold uppercase tracking-wider rounded-full mb-4 border border-[#5BC0EB]/20">
                    {project.category}
                  </div>
                  <h4 className="font-display text-2xl sm:text-3xl font-bold text-[#0B2D4D] mb-3">
                    {project.title}
                  </h4>
                  <p className="text-[#1F2937] leading-relaxed text-sm sm:text-base">
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack */}
                <div className="mt-auto mb-8">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((techName) => (
                      <span 
                        key={techName}
                        className="px-3 py-1.5 bg-white border border-[#D9F2FF] rounded-full text-[13px] font-bold text-[#0B2D4D] shadow-sm transition-all duration-300 group-hover:border-[#5BC0EB]/40 hover:bg-[#F8FAFC]"
                      >
                        {techName}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <Link to={`/portfolio/${project.slug}`} className="inline-flex items-center gap-2 text-[#0B2D4D] font-bold text-sm sm:text-base transition-colors hover:text-[#5BC0EB]">
                  View Project
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
