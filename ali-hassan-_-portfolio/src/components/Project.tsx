import React, { useState } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, X, ZoomIn, ArrowUpRight } from "lucide-react";

// Images Import (Same as before)
import SchoolImg from "@/src/assets/school.png";
import HomeInspImg from "@/src/assets/home-inspection.png";
import POSImg from "@/src/assets/pos-dashboard.png";
import CaliPizzaImg from "@/src/assets/r_home.png"; 
import CarSalesImg from "@/src/assets/home.png"; 

const ProjectCard = ({ title, category, image, tech, delay, onImageClick }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    viewport={{ once: true }}
    className="group flex flex-col space-y-5"
  >
    {/* Clean Image Frame */}
    <div 
      className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-surface-high cursor-pointer border border-white/5 shadow-sm" 
      onClick={() => onImageClick(image)}
    >
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      {/* Premium Minimal Overlay */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[2px]">
        <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 scale-50 group-hover:scale-100 transition-transform duration-500">
          <ZoomIn className="text-white w-5 h-5" />
        </div>
      </div>
    </div>

    {/* Project Info Section */}
    <div className="flex justify-between items-start px-2">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
           <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
           <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/60">
             {category}
           </p>
        </div>
        <h4 className="text-2xl font-black text-on-surface tracking-tight group-hover:text-primary transition-colors duration-300">
          {title}
        </h4>
        {/* Tech Badges */}
        <div className="flex flex-wrap gap-2 pt-1 opacity-60 group-hover:opacity-100 transition-opacity">
          {tech.map((t) => (
            <span key={t} className="text-[9px] font-bold border border-on-surface/10 px-2 py-0.5 rounded-md italic">
              #{t}
            </span>
          ))}
        </div>
      </div>
      
      <motion.button 
        whileHover={{ rotate: 45 }}
        className="p-3 rounded-full bg-surface-high border border-white/5 text-primary shadow-lg"
      >
        <ArrowUpRight className="w-5 h-5" />
      </motion.button>
    </div>
  </motion.div>
);

const Project = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const projects = [
    { title: "RestoPos Engine", category: "F&B Management", tech: ["Laravel", "React"], image: POSImg },
    { title: "EduShield ERP", category: "Academic System", tech: ["PHP", "Laravel"], image: SchoolImg },
    { title: "CaliPizza Digital", category: "E-Commerce", tech: ["React", "GSAP"], image: CaliPizzaImg },
    { title: "AutoDrive Hub", category: "Marketplace", tech: ["Next.js", "Tailwind"], image: CarSalesImg },
    { title: "InspectPro", category: "Service Platform", tech: ["Vite", "Firebase"], image: HomeInspImg }
  ];

  return (
    <section id="projects" className="py-32 px-8 bg-surface relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-28"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="w-10 h-[1px] bg-primary/40"></span>
            <span className="text-xl font-bold uppercase tracking-[0.6em] text-primary">Showcase</span>
            <span className="w-10 h-[1px] bg-primary/40"></span>
          </div>
        </motion.div>

        {/* 3-Column Balanced Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-24">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.title} 
              {...project} 
              delay={index * 0.15} 
              onImageClick={setSelectedImage}
            />
          ))}
        </div>
      </div>

      {/* Fullscreen Preview Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-6"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button 
               whileHover={{ scale: 1.1 }}
               className="absolute top-10 right-10 text-white/50 hover:text-white"
            >
              <X size={40} />
            </motion.button>
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              src={selectedImage} 
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)]" 
              alt="Project Full View"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Project;