import React from 'react';
import { TESTIMONIALS } from '../../../../data/dummyData';
import { Star, Quote, User } from 'lucide-react';

export const TestimonialsSection = () => {
  // Take only the first 3 testimonials for a clean, static grid
  const displayTestimonials = TESTIMONIALS.slice(0, 3);

  return (
    <section className="relative py-16 md:py-24 bg-[#F8FAFC] border-t border-slate-100" id="testimonials">
      <div className="container relative z-10 mx-auto px-4 max-w-7xl">
        
        {/* Heading */}
        <div className="text-center max-w-[600px] mx-auto mb-16">
          <div className="text-xs font-bold text-[#5BC0EB] uppercase tracking-widest mb-3 flex items-center justify-center gap-2">
            <Quote className="w-4 h-4 text-[#5BC0EB]" /> Client Endorsements
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-primary mb-4">
            Trusted by <span className="text-gradient-primary">Enterprises.</span>
          </h2>
          <p className="text-foreground font-medium">
            See what our enterprise partners have to say about our engineering quality and delivery.
          </p>
        </div>

        {/* Lightweight Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayTestimonials.map((testimonial, idx) => (
            <div 
              key={idx}
              className="bg-white border border-slate-200 rounded-2xl p-8 shadow-[0_8px_24px_rgba(11,45,77,0.04)] hover:shadow-[0_12px_32px_rgba(11,45,77,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col relative"
            >
              {/* Background Quote Icon */}
              <Quote className="absolute top-6 right-6 w-12 h-12 text-[#5BC0EB]/10 transform -scale-x-100 pointer-events-none" />
              
              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < (testimonial.rating || 5) ? 'text-[#F4B942] fill-[#F4B942]' : 'text-slate-200'}`} />
                ))}
              </div>

              {/* Review Content */}
              <p className="text-foreground italic font-medium leading-relaxed flex-1 mb-8">
                "{testimonial.review || testimonial.content}"
              </p>

              {/* Author Details */}
              <div className="flex items-center gap-4 mt-auto border-t border-slate-100 pt-6">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-muted border border-slate-200 shadow-sm flex items-center justify-center shrink-0">
                  {testimonial.photo ? (
                    <img src={testimonial.photo} alt={testimonial.name} className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-6 h-6 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-primary text-sm md:text-base">{testimonial.name}</h4>
                  <p className="text-xs md:text-sm font-medium text-muted-foreground">
                    {testimonial.designation}, {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
