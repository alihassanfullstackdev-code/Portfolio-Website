import React, { useState } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, X, ZoomIn } from "lucide-react";

// Images Import
import SchoolImg from "@/src/assets/school.png";
import HomeInspImg from "@/src/assets/home-inspection.png";
import POSImg from "@/src/assets/pos-dashboard.png";
import CaliPizzaImg from "@/src/assets/r_home.png"; 
import CarSalesImg from "@/src/assets/home.png"; 

const ProjectCard = ({ title, category, description, image, tech, delay, onImageClick }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    viewport={{ once: true }}
    className="group relative overflow-hidden rounded-3xl glass bg-black/20 flex flex-col h-full"
  >
    {/* Image Container */}
    <div 
      className="aspect-[16/9] overflow-hidden relative cursor-pointer bg-surface-low flex items-center justify-center" 
      onClick={() => onImageClick(image)}
    >
      <img 
        src={image} 
        alt="" 
        className="absolute inset-0 w-full h-full object-cover blur-xl opacity-20"
      />
      <img 
        src={image} 
        alt={title} 
        className="relative z-10 w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
        <ZoomIn className="text-white w-8 h-8" />
      </div>
    </div>

    {/* Content Area */}
    <div className="p-8 space-y-4 bg-surface-low flex-grow flex flex-col">
      <div className="space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-widest text-primary px-2 py-1 bg-primary/10 rounded-md">
          {category}
        </span>
        <h4 className="text-2xl font-bold">{title}</h4>
      </div>
      
      <p className="text-on-surface-variant text-sm leading-relaxed line-clamp-3">
        {description}
      </p>

      {/* Tech Stack Tags */}
      <div className="flex flex-wrap gap-2 pt-2">
        {tech.map((item) => (
          <span key={item} className="text-[10px] bg-surface-high px-2 py-1 rounded-md text-on-surface/70 border border-white/5">
            {item}
          </span>
        ))}
      </div>

      <div className="pt-4 mt-auto">
        <button className="text-primary flex items-center gap-2 text-sm font-bold hover:gap-3 transition-all">
          Explore Case Study <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </div>
  </motion.div>
);

const Portfolio = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const projects = [
    {
      title: "RestoPos Engine",
      category: "F&B Management",
      description: "A comprehensive POS solution with real-time table tracking, inventory management, and automated financial reporting.",
      tech: ["Laravel", "Vue.js", "MySQL", "Tailwind"],
      image: POSImg
    },
    {
      title: "EduShield ERP",
      category: "Academic Management",
      description: "Robust school system featuring secure role-based access, student performance tracking, and automated fee management.",
      tech: ["PHP", "Laravel", "JavaScript", "Bootstrap"],
      image: SchoolImg
    },
    {
      title: "CaliPizza Digital",
      category: "E-Commerce",
      description: "High-speed digital storefront with custom product configurators and seamless multi-step checkout flow.",
      tech: ["React", "Node.js", "GSAP", "Framer Motion"],
      image: CaliPizzaImg
    },
    {
      title: "AutoDrive Hub",
      category: "Marketplace",
      description: "Automotive portal with advanced filtering, dynamic inventory sorting, and lead capture systems.",
      tech: ["Next.js", "TypeScript", "Tailwind", "PostgreSQL"],
      image: CarSalesImg
    },
    {
      title: "InspectPro",
      category: "Service Platform",
      description: "Specialized service booking engine for property inspectors with dynamic reporting and schedule management.",
      tech: ["React", "Vite", "Firebase", "Lucide Icons"],
      image: HomeInspImg
    }
  ];

  return (
    <section id="work" className="py-32 px-8 bg-surface-lowest">
      {/* Container Size Increased to 1400px */}
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="space-y-4">
            <h2 className="text-sm label-editorial text-primary uppercase tracking-widest font-bold">Portfolio</h2>
            <h3 className="text-5xl md:text-6xl font-bold tracking-tight">Crafted Solutions</h3>
          </div>
          <p className="text-on-surface-variant max-w-lg text-lg leading-relaxed">
            From enterprise-grade ERPs to fluid consumer experiences, these projects showcase a commitment to technical excellence and user-centric design.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.title} 
              {...project} 
              delay={index * 0.1} 
              onImageClick={setSelectedImage}
            />
          ))}
        </div>
      </div>

      {/* Modal remains the same */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-6"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"><X size={40} /></button>
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              src={selectedImage} className="max-w-full max-h-[90vh] object-contain rounded-lg" alt="Full View"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;