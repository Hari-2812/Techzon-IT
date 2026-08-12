import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ServiceCard = ({ service, index, layout = 'grid' }) => {
  const isList = layout === 'list';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      className={`group relative premium-card overflow-hidden shadow-elevation-1 hover:shadow-elevation-2 hover:border-primary/50 transition-all flex ${isList ? 'flex-col md:flex-row' : 'flex-col h-full'}`}
    >
      {service.isFeatured && (
        <div className="absolute top-4 left-4 z-20 flex items-center gap-1 px-3 py-1 bg-secondary text-secondary-foreground text-xs font-bold uppercase tracking-wider rounded-full shadow-elevation-2">
          <Star className="w-3 h-3 fill-current" /> Featured
        </div>
      )}

      <div className={`relative overflow-hidden bg-muted ${isList ? 'w-full md:w-1/3 aspect-[4/3] md:aspect-auto' : 'aspect-[16/10]'}`}>
        {service.image ? (
          <img 
            src={service.image} 
            alt={service.name} 
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
            <div className="w-16 h-16 rounded-lg bg-card flex items-center justify-center shadow-elevation-2 group-hover:rotate-12 transition-transform duration-500">
              <div className="text-primary font-black text-2xl">{service.name.charAt(0)}</div>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80" />
      </div>

      <div className={`flex flex-col flex-1 p-6 ${isList ? 'justify-center' : ''}`}>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold text-primary uppercase tracking-wider">
            {service.category?.name || service.category}
          </span>
        </div>
        
        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
          {service.name}
        </h3>
        
        <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-3 flex-1">
          {service.shortDescription || service.description}
        </p>

        {service.technologies && service.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {service.technologies.slice(0, 3).map((tech, i) => (
              <span key={i} className="text-xs font-medium bg-muted text-muted-foreground px-2 py-1 rounded">
                {tech}
              </span>
            ))}
            {service.technologies.length > 3 && (
              <span className="text-xs font-medium bg-muted text-muted-foreground px-2 py-1 rounded">
                +{service.technologies.length - 3}
              </span>
            )}
          </div>
        )}
        
        <div className="mt-auto pt-4 border-t border-border/50">
          <Link to={`/services/${service.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors">
            Explore Solution
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
