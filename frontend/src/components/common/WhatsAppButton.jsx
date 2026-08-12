import React from 'react';

export const WhatsAppButton = () => {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER;
  
  if (!whatsappNumber) return null;
  
  const message = "Hello Techzon, I would like to discuss a project with your team.";
  const href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 lg:bottom-5 lg:right-5 z-50 w-[52px] h-[52px] lg:w-[56px] lg:h-[56px] bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-lg shadow-[#25D366]/30 hover:shadow-xl hover:shadow-[#25D366]/40 transition-all hover:-translate-y-1 group"
      aria-label="Chat on WhatsApp"
    >
      {/* Subtle outer glow on hover */}
      <div className="absolute inset-0 bg-[#25D366] rounded-full scale-110 opacity-0 group-hover:opacity-40 blur-md transition-opacity duration-300" />
      
      {/* Official WhatsApp SVG Logo */}
      <svg 
        className="w-7 h-7 lg:w-8 lg:h-8 relative z-10 fill-current" 
        viewBox="0 0 24 24"
      >
        <path d="M12.031 0C5.385 0 0 5.388 0 12.04c0 2.12.553 4.195 1.603 6.012L.15 23.344l5.426-1.423A11.96 11.96 0 0 0 12.03 24c6.643 0 12.03-5.388 12.03-12.04C24.06 5.388 18.674 0 12.031 0zm.014 20.144a10.02 10.02 0 0 1-5.111-1.402l-.367-.217-3.799.996.996-3.704-.239-.379A10.038 10.038 0 0 1 2.016 12.04c0-5.525 4.502-10.033 10.033-10.033 5.53 0 10.033 4.508 10.033 10.033 0 5.526-4.503 10.034-10.037 10.034zM17.544 14.6c-.302-.152-1.785-.882-2.062-.983-.277-.101-.479-.152-.681.152-.202.304-.78 1.025-.956 1.235-.175.21-.351.236-.653.084-.302-.151-1.275-.47-2.428-1.5-.897-.801-1.503-1.79-1.68-2.093-.175-.303-.018-.466.133-.618.135-.136.302-.352.453-.529.151-.176.202-.303.302-.505.101-.202.05-.38-.025-.53-.076-.152-.681-1.642-.932-2.247-.245-.591-.494-.51-.681-.52-.175-.008-.376-.008-.578-.008-.202 0-.528.075-.805.378-.277.303-1.057 1.033-1.057 2.518 0 1.485 1.082 2.92 1.233 3.123.151.202 2.128 3.247 5.155 4.551 2.073.89 2.76.995 3.524.835.702-.146 2.061-.842 2.351-1.654.29-.812.29-1.508.202-1.654-.087-.146-.328-.236-.63-.388z" />
      </svg>
    </a>
  );
};
