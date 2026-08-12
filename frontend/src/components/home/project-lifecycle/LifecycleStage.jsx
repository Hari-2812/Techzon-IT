import React from 'react';
import { motion } from 'framer-motion';

export const LifecycleStage = ({ stage, isHovered }) => {
  const Icon = stage.icon;
  
  return (
    <motion.div 
      className={`w-full bg-white rounded-2xl p-5 cursor-pointer transition-all duration-300 transform-style-3d border ${isHovered ? 'border-[#FF8A3D] shadow-[0_20px_40px_-10px_rgba(245,124,32,0.2)] z-30' : 'border-gray-100 shadow-sm z-10'}`}
      animate={{ 
        y: isHovered ? -8 : 0,
        scale: isHovered ? 1.05 : 1,
        rotateX: isHovered ? 4 : 0,
        rotateY: isHovered ? -4 : 0
      }}
      style={{ transformPerspective: 800 }}
    >
       <div className={`w-10 h-10 rounded-xl mb-3 flex items-center justify-center transition-colors duration-300 ${isHovered ? 'bg-primary' : 'bg-muted'}`}>
         <Icon className={`w-5 h-5 transition-colors duration-300 ${isHovered ? 'text-white' : 'text-primary'}`} />
       </div>
       <div className="text-[10px] font-bold text-muted-foreground tracking-widest mb-1">{stage.id < 10 ? `0${stage.id}` : stage.id}</div>
       <h4 className={`text-sm md:text-base font-bold tracking-tight mb-2 transition-colors duration-300 ${isHovered ? 'text-[#FF8A3D]' : 'text-primary'}`}>
         {stage.title}
       </h4>
       
       <div className="text-xs text-muted-foreground font-medium leading-relaxed whitespace-pre-line">
         {stage.desc}
       </div>

       {isHovered && (
         <motion.div 
           layoutId="accent-line"
           className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF8A3D] to-primary rounded-b-2xl"
         />
       )}
    </motion.div>
  );
};
