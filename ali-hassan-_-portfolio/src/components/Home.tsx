import React from 'react';
import { motion } from "motion/react";
import TorusKnotCanvas from './TorusKnotCanvas'; // Import the new 3D component
import { ArrowRight, Download } from "lucide-react";
import Profile from "@/src/assets/2025_10_06_23_46_IMG_5109.PNG";

const Home = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 md:px-8 pt-24 md:pt-20">
      {/* Background 3D Canvas */}
      <div className="absolute inset-0 z-0 opacity-20 md:opacity-30 pointer-events-none">
        <TorusKnotCanvas />
      </div>

      <div className="max-w-7xl w-full relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        {/* Profile Side (Now on the Left) */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="relative p-3 rounded-full border-2 border-primary/20 glow-shadow max-w-sm mx-auto group">
            <div className="aspect-square rounded-full overflow-hidden border-4 border-surface shadow-2xl">
              <img 
                src={Profile}
                alt="Ali Hassan - Full Stack Developer" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Experience Badge */}
            <div className="absolute -bottom-4 -right-2 p-5 glass rounded-2xl border border-primary/20 shadow-xl">
              <span className="block text-primary font-black text-2xl leading-none">2+ Year</span>
              <span className="text-[10px] uppercase tracking-tighter font-bold text-on-surface-variant">Experience</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8 text-center lg:text-left"
        >
          <div className="space-y-8">
  {/* Branding Tag */}
  <div className="flex items-center gap-3">
    <span className="h-[1px] w-12 bg-primary"></span>
    <span className="text-xs md:text-sm uppercase tracking-[0.3em] text-primary font-bold">
      Full-Stack Architecture & 3D Web
    </span>
  </div>

  {/* Main Heading */}
  <h1 className="text-6xl sm:text-8xl lg:text-7xl font-extrabold text-editorial leading-[0.85] tracking-tighter">
    Ali <span className="text-primary">Hassan.</span>
  </h1>

  {/* Detailed Professional Bio */}
  <div className="max-w-3xl space-y-6">
    <p className="text-xl md:text-2xl text-on-surface font-semibold leading-snug">
      Engineering robust digital solutions through <span className="text-primary italic">precision</span> and <span className="text-primary italic">performance</span>.
    </p>
    
    <p className="text-on-surface-variant leading-relaxed text-base md:text-lg font-light border-l-2 border-primary/20 pl-6 py-2">
      With a core focus on the <span className="text-on-surface font-medium">Laravel & React ecosystem</span>, I build applications that bridge the gap between complex data management and immersive user interaction. 
      From developing full-scale <span className="text-on-surface font-medium">ERP systems and POS solutions</span> to experimenting with <span className="text-on-surface font-medium">React Three Fiber</span> for 3D web experiences, 
      my goal is to create software that is as reliable as it is visually compelling.
    </p>

    <p className="text-on-surface-variant leading-relaxed text-sm md:text-base opacity-80 italic">
      Currently exploring the intersection of high-performance backend architecture and creative front-end technologies to simplify complex decision-making through intuitive design.
    </p>
  </div>
</div>
        </motion.div>
      </div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
    </section>
  );
};

export default Home;