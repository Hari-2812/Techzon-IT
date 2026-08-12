import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQS } from '../../data/dummyData';
import { Button } from '../ui/Button';
import { Loader2, AlertCircle, ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import { EnergyPathDefs } from '../visual-system';

const AccordionItem = ({ faq, isOpen, onClick }) => (
  <div className={`relative mb-4 overflow-hidden rounded-2xl transition-all duration-300 border ${isOpen ? 'bg-white border-primary/30 shadow-md' : 'bg-white/60 border-slate-200 hover:border-primary/20 hover:bg-white backdrop-blur-sm'}`}>
    {/* Subtle node connection dot for visual flair */}
    <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1.5 rounded-r-full transition-all duration-300 ${isOpen ? 'h-12 bg-gradient-to-b from-primary to-[#5BC0EB]' : 'h-6 bg-muted'}`} />
    
    <button 
      onClick={onClick}
      className="w-full px-8 py-6 text-left flex justify-between items-center focus:outline-none"
      aria-expanded={isOpen}
    >
      <h3 className={`text-lg font-bold transition-colors font-display ${isOpen ? 'text-primary' : 'text-primary'}`}>
        {faq.question}
      </h3>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 ml-4 ${isOpen ? 'bg-primary/10' : 'bg-muted'}`}>
        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : 'text-muted-foreground'}`} />
      </div>
    </button>
    
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="px-8 pb-8 pt-0 text-foreground leading-relaxed font-sans font-medium">
            <div className="pt-4 border-t border-slate-100">
              {faq.answer}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const SkeletonFaq = () => (
  <div className="border border-slate-200 bg-muted rounded-2xl p-6 mb-4 animate-pulse">
    <div className="flex justify-between items-center">
      <div className="w-3/4 h-6 bg-muted rounded" />
      <div className="w-8 h-8 bg-muted rounded-full" />
    </div>
  </div>
);

export const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-24 md:py-32 bg-[#F8FAFC] border-t border-slate-200 relative overflow-hidden" id="faq">
      
      {/* Visual Layer: Knowledge Network (Subtle SVG Connections) */}
      <div className="absolute inset-0 pointer-events-none opacity-60">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-[#5BC0EB]/5 to-transparent rounded-full blur-[100px]" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(118,87,217,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(118,87,217,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        <svg className="absolute w-full h-full opacity-30" preserveAspectRatio="none">
          <EnergyPathDefs />
          <path d="M -100 200 Q 200 100 500 400 T 1200 100" fill="none" stroke="url(#line-gradient-default)" strokeWidth="0.5" />
          <path d="M -100 600 Q 300 800 600 500 T 1200 700" fill="none" stroke="url(#line-gradient-default)" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          <div className="w-full lg:w-5/12">
            <div className="sticky top-32">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-xs font-bold text-primary uppercase tracking-widest mb-3 flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Knowledge Network
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="font-display text-4xl md:text-5xl font-bold tracking-tight text-primary mb-6"
              >
                Frequently Asked <span className="text-gradient-galaxy">Questions</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-foreground text-lg mb-10 font-sans font-medium"
              >
                Find answers to common questions about our engineering process, technology stack, and partnership models. Can't find what you need? Connect with our team.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Button size="lg" className="group bg-white text-primary border border-slate-200 hover:border-primary/50 hover:bg-muted shadow-sm hover:shadow-md transition-all">
                  Contact Support <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </div>
          </div>

          <div className="w-full lg:w-7/12 relative">
              <AnimatePresence mode="wait">
                <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-20">
                  {FAQS.map((faq, i) => (
                    <AccordionItem 
                      key={faq._id || i} 
                      faq={faq} 
                      isOpen={openIndex === i} 
                      onClick={() => setOpenIndex(openIndex === i ? -1 : i)} 
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
