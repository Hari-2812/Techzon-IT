import React from 'react';
import { motion } from 'framer-motion';

export const EngineeringCore = () => {
  return (
    <div className="relative w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center mx-auto my-12 md:my-0 lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 z-20" style={{ transformStyle: "preserve-3d" }}>
      <motion.div 
        animate={{ rotateZ: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full border border-dashed border-primary/20"
      />
      <motion.div 
        animate={{ rotateZ: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute inset-4 rounded-full border border-primary/10 bg-white/30 backdrop-blur-sm"
      />
      <div className="relative z-10 w-32 h-32 bg-white rounded-full shadow-2xl flex flex-col items-center justify-center border-4 border-[#F7F8FC]">
        <span className="text-2xl font-black text-primary">CORE</span>
        <span className="text-xs text-orange-500 font-semibold tracking-widest mt-1">ENGINE</span>
      </div>
    </div>
  );
};
