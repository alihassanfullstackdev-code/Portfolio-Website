import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { X, ZoomIn, ArrowUpRight, Globe, Github } from "lucide-react";

// Images Import
import SchoolImg from "@/src/assets/school.png";
import HomeInspImg from "@/src/assets/home-inspection.png";
import POSImg from "@/src/assets/pos-dashboard.png";
import CaliPizzaImg from "@/src/assets/r_home.png";
import CarSalesImg from "@/src/assets/home.png";
import LuxImg from "@/src/assets/lux.png";
import TracksImg from "@/src/assets/tracks.png"; 

gsap.registerPlugin(ScrollTrigger);

interface ProjectCardProps {
  title: string;
  category: string;
  image: string;
  tech: string[];
  github: string;
  visit?: string;
  onImageClick: (image: string) => void;
}

const ProjectCard = ({ title, category, image, tech, github, visit, onImageClick }: ProjectCardProps) => (
  <div className="group flex flex-col space-y-5 min-w-[450px] ml-12">
    {/* Image Frame */}
    <div
      className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-surface-high cursor-pointer border border-white/5 shadow-sm"
      onClick={() => onImageClick(image)}
    >
      <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[2px]">
        <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 scale-50 group-hover:scale-100 transition-transform duration-500">
          <ZoomIn className="text-white w-5 h-5" />
        </div>
      </div>
    </div>

    {/* Info Section */}
    <div className="flex justify-between items-start px-2">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/60">{category}</p>
        </div>
        <h4 className="text-2xl font-black text-on-surface tracking-tight group-hover:text-primary transition-colors duration-300">
          {title}
        </h4>
        <div className="flex flex-wrap gap-2 pt-1 opacity-60 group-hover:opacity-100 transition-opacity">
          {tech.map((t) => (
            <span key={t} className="text-[9px] font-bold border border-on-surface/10 px-2 py-0.5 rounded-md italic">#{t}</span>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        {visit && (
          <motion.a
            href={visit.startsWith('http') ? visit : `https://${visit}`}
            target="_blank" rel="noopener noreferrer"
            whileHover={{ y: -3 }}
            className="p-3 rounded-full bg-primary text-surface shadow-lg"
          >
            <Globe className="w-5 h-5" />
          </motion.a>
        )}
        <motion.a
          href={github} target="_blank" rel="noopener noreferrer"
          whileHover={{ rotate: 45, scale: 1.1 }}
          className="p-3 rounded-full bg-surface-high border border-white/5 text-primary shadow-lg hover:bg-primary hover:text-surface transition-all duration-300"
        >
          <ArrowUpRight className="w-5 h-5" />
        </motion.a>
      </div>
    </div>
  </div>
);

const Project = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      title: "RestoPos Engine",
      category: "F&B Management",
      tech: ["Laravel", "React"],
      image: POSImg,
      github: "https://github.com/alihassanfullstackdev-code/Restaurant-Software"
    },
    {
      title: "Lux Dine",
      category: "Fast Food Restaurant",
      tech: ["React Js", "Tailwndcss"],
      image: LuxImg,
      github: "https://github.com/alihassanfullstackdev-code/Lux-Dine",
      visit: "lux-dine.vercel.app"
    },
    {
      title: "Tracks Communications",
      category: "Digital Agency",
      tech: ["React", "Tailwind", "SEO"],
      image: TracksImg, // Replace with TracksImg
      github: "https://github.com/alihassanfullstackdev-code",
      visit: "https://tracks-comunications.vercel.app/"
    },
    {
      title: "EduShield ERP",
      category: "Academic System",
      tech: ["PHP", "Laravel"],
      image: SchoolImg,
      github: "https://github.com/alihassanfullstackdev-code/School-ERP"
    },
    {
      title: "CaliPizza Digital",
      category: "E-Commerce",
      tech: ["React", "GSAP"],
      image: CaliPizzaImg,
      github: "https://github.com/alihassanfullstackdev-code/Restaurant-Software"
    },
    {
      title: "AutoDrive Hub",
      category: "Marketplace",
      tech: ["Next.js", "Tailwind"],
      image: CarSalesImg,
      github: "https://github.com/alihassanfullstackdev-code/AutoDrive-Hub"
    },
    {
      title: "InspectPro",
      category: "Service Platform",
      tech: ["Vite", "Firebase"],
      image: HomeInspImg,
      github: "https://github.com/alihassanfullstackdev-code/Home-Inspection-Website"
    }
  ];

  useGSAP(() => {
    if (!triggerRef.current) return;
    const scrollWidth = triggerRef.current.scrollWidth;
    const amountToScroll = scrollWidth - window.innerWidth;

    gsap.to(triggerRef.current, {
      x: -amountToScroll,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${scrollWidth}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    });
  }, { scope: sectionRef });

  return (
    <section id="projects" ref={sectionRef} className="bg-surface relative overflow-hidden">
      <div className="h-screen flex flex-col justify-center">
        {/* Section Header */}
        {/* Section Header - Now Centered */}
        <div className="max-w-7xl mx-auto px-8 w-full mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center text-center"
          >
            <div className="flex items-center gap-4">
              {/* Left Line */}
              <span className="w-12 h-[1px] bg-primary/40"></span>

              <span className="text-xl font-bold uppercase tracking-[0.6em] text-primary">
                Projects
              </span>

              {/* Right Line */}
              <span className="w-12 h-[1px] bg-primary/40"></span>
            </div>
          </motion.div>
        </div>

        {/* Carousel Container */}
        <div ref={triggerRef} className="flex items-center">
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              {...project}
              onImageClick={setSelectedImage}
            />
          ))}
          <div className="min-w-[20vw]"></div> {/* Extra space at end */}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-6"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-10 right-10 text-white/50 hover:text-white"><X size={40} /></button>
            <motion.img
              initial={{ scale: 0.9 }} animate={{ scale: 1 }}
              src={selectedImage} className="max-w-full max-h-[85vh] object-contain rounded-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Project;