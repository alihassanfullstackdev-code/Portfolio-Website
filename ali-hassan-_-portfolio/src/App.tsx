import React from 'react';
import { motion, useScroll, useSpring } from "motion/react";

// Components Imports
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Expertise from './components/Experties';
import Portfolio from './components/Portfolio';
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
      <Hero />
      <About />
      <Expertise />
      <Portfolio />
      <Contact />
      <Footer />
    </div>
  );
}