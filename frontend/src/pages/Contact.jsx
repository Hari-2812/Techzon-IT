import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { PageTransition } from '../components/layout/PageTransition';
import { Send, MapPin, Mail, Phone, AlertCircle } from 'lucide-react';
import api from '../config/axios';

export const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', projectType: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);
    
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        subject: formData.projectType || 'General Inquiry',
        message: formData.company ? `Company: ${formData.company}\n\n${formData.message}` : formData.message
      };
      
      const response = await api.post('/contacts', payload);
      setSubmitted(true);
      setFormData({ name: '', email: '', company: '', projectType: '', message: '' });
    } catch (error) {
      console.error('Contact submission error:', error);
      setFormError(error.response?.data?.message || "We couldn't submit your request right now. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <PageTransition>
      <Helmet>
        <title>Techzon IT Solutions</title>
        <meta name="description" content="Contact Techzon to start your next digital engineering project." />
      </Helmet>

      <div className="pt-32 pb-24 bg-muted min-h-screen">
        <div className="container-global">
          <div className="max-w-[1000px] mx-auto">
            
            <div className="text-center mb-16">
              <div className="text-xs font-bold text-primary uppercase tracking-widest mb-3">GET IN TOUCH</div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">Start a Project.</h1>
              <p className="text-lg text-foreground max-w-[600px] mx-auto font-medium">
                Ready to transform your business? Tell us about your vision, and our engineering team will help you build it.
              </p>
            </div>

            <div className="grid md:grid-cols-5 gap-12 lg:gap-20">
              
              {/* Contact Info */}
              <div className="md:col-span-2 space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-primary mb-6">Contact Information</h3>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0 text-primary">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-primary mb-1">Email Us</div>
                        <a href="mailto:support@techzon.com" className="text-foreground hover:text-primary transition-colors">support@techzonwide.com</a>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0 text-primary">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-primary mb-1">Call Us</div>
                        <a href="tel:+91 6374191654" className="text-foreground hover:text-primary transition-colors">+91 6374191654</a>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0 text-primary">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-primary mb-1">Headquarters</div>
                        <p className="text-foreground">Sector 6, HSR Layout, <br/>Bengaluru, Karnataka</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="md:col-span-3">
                <div className="glass-panel bg-white/80 p-8 md:p-10 rounded-[32px] shadow-[0_20px_40px_rgba(0,0,0,0.04)] border border-slate-100">
                  {submitted ? (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 rounded-full bg-green-50 text-green-500 flex items-center justify-center mx-auto mb-6">
                        <Send className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-bold text-primary mb-3">Message Sent!</h3>
                      <p className="text-foreground mb-8">Thank you! Your project request has been submitted to our team. Our team members will contact you soon.</p>
                      <button onClick={() => setSubmitted(false)} className="btn-primary px-8 py-3 rounded-full">
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2">Name</label>
                          <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-muted border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="John Doe" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2">Email</label>
                          <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-muted border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="john@company.com" />
                        </div>
                      </div>
                      
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2">Company</label>
                          <input type="text" name="company" value={formData.company} onChange={handleChange} className="w-full bg-muted border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="Optional" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2">Project Type</label>
                          <select required name="projectType" value={formData.projectType} onChange={handleChange} className="w-full bg-muted border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-foreground">
                            <option value="">Select a service</option>
                            <option value="Web Development">Web Development</option>
                            <option value="Mobile App">Mobile App</option>
                            <option value="Cloud Migration">Cloud Migration</option>
                            <option value="AI Integration">AI Integration</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2">Project Details</label>
                        <textarea required name="message" value={formData.message} onChange={handleChange} rows="4" className="w-full bg-muted border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none" placeholder="Tell us about your project goals..." />
                      </div>

                      <button disabled={isSubmitting} type="submit" className="btn-primary w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-70">
                        {isSubmitting ? 'Sending...' : 'Submit Request'}
                        {!isSubmitting && <Send className="w-4 h-4" />}
                      </button>
                      
                      {formError && (
                        <div className="flex items-center gap-2 text-red-500 mt-4 text-sm font-medium bg-red-50 p-3 rounded-xl border border-red-100">
                          <AlertCircle className="w-4 h-4" />
                          {formError}
                        </div>
                      )}
                    </form>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </PageTransition>
  );
};
