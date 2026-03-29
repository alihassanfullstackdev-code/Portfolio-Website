import React from 'react';
import { motion } from "motion/react";
import TorusKnotCanvas from './TorusKnotCanvas'; // Import the new 3D component
import { ArrowRight, Download } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 md:px-8 pt-24 md:pt-20">
      {/* Background 3D Canvas */}
      <div className="absolute inset-0 z-0 opacity-20 md:opacity-30 pointer-events-none">
        <TorusKnotCanvas />
      </div>

      <div className="max-w-7xl w-full relative z-10 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8 text-center"
        >
          <div className="space-y-4">
            <span className="text-sm label-editorial text-primary">Portfolio 2026</span>
            <h1 className="text-6xl sm:text-8xl md:text-9xl font-extrabold text-editorial leading-none tracking-tighter">
              Hi, I'm <br />
              <span className="text-primary">Ali Hassan</span>
            </h1>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 text-lg sm:text-xl md:text-2xl text-on-surface-variant font-light">
            <span>I build</span>
            <span className="px-3 py-1 bg-surface-high border-l-2 border-primary text-on-surface font-medium whitespace-nowrap">
              high-performance web apps
            </span>
          </div>
          <p className="max-w-2xl mx-auto text-on-surface-variant leading-relaxed text-lg md:text-xl">
            "Full-Stack Developer crafting scalable ERPs, high-performance POS systems, and seamless E-commerce experiences."   
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 pt-4">
            <a href="#work" className="px-6 py-3 md:px-8 md:py-4 bg-primary-container text-on-surface font-bold rounded-xl flex items-center gap-2 hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] transition-all duration-300 group text-sm md:text-base">
              View My Work
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="/Resume.pdf" 
              download="Resume.pdf"
              className="px-8 py-4 bg-primary text-surface rounded-full font-bold hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2"
            >
              Download CV <Download className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
    </section>
  );
};

export default Hero;