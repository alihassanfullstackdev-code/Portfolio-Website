import React from 'react';
import { motion, useScroll, useSpring } from "motion/react";

// Components Imports
import Navbar from './components/Navbar';
import Home from './components/Home';
import Education from './components/Education';
import Experience from './components/Experience';
import Project from './components/Project';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen">
      {/* Scroll indicator - requires CSS class 'scroll-indicator' */}
      <motion.div 
        className="scroll-indicator fixed top-0 left-0 right-0 h-1 bg-primary z-[60]" 
        style={{ scaleY, transformOrigin: "top" }} 
      />
      
      <Navbar />
      <Home />
      <Education />
      <Experience />
      <Project />
      <Contact />
      {/* <Footer /> */}
    </div>
  );
}