import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

export const ImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setSelectedImage(images[index]);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const nextImage = useCallback(() => {
    if (!images) return;
    const newIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex]);
  }, [currentIndex, images]);

  const prevImage = useCallback(() => {
    if (!images) return;
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex]);
  }, [currentIndex, images]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, nextImage, prevImage]);

  if (!images || images.length === 0) return null;

  return (
    <section className="py-24 bg-background border-y border-border">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-foreground mb-16">Project Gallery</h2>
        
        {/* CSS Grid Masonry approximation */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 3) * 0.1 }}
              className="relative break-inside-avoid rounded-lg overflow-hidden group cursor-pointer border border-border shadow-elevation-1 hover:shadow-elevation-2 transition-all"
              onClick={() => openLightbox(idx)}
            >
              <img 
                src={typeof img === 'string' ? img : img.url} 
                alt={typeof img === 'string' ? `Gallery ${idx}` : img.caption} 
                loading="lazy"
                className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="w-12 h-12 rounded-full bg-background/50 backdrop-blur flex items-center justify-center text-foreground">
                  <ZoomIn className="w-6 h-6" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm"
          >
            <button onClick={closeLightbox} >
              <X className="w-6 h-6" />
            </button>

            <button onClick={prevImage} >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <div className="relative max-w-5xl max-h-[85vh] w-full px-4 flex items-center justify-center">
              <motion.img 
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                src={typeof selectedImage === 'string' ? selectedImage : selectedImage.url}
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-elevation-2"
              />
            </div>

            <button onClick={nextImage} >
              <ChevronRight className="w-8 h-8" />
            </button>

            {typeof selectedImage !== 'string' && selectedImage.caption && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-2 bg-background/80 backdrop-blur rounded-full text-sm text-foreground shadow-elevation-2">
                {selectedImage.caption}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
