import React from 'react';
import { motion } from "motion/react";
import Profile from "@/src/assets/2025_10_06_23_46_IMG_5109.PNG";

const About = () => {
  return (
    <section id="about" className="py-32 px-8 bg-surface-low">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-16 items-center">
          
          {/* Left Side: Image & Experience Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-5 relative"
          >
            <div className="relative p-3 rounded-full border-2 border-primary/20 glow-shadow max-w-sm mx-auto group">
              <div className="aspect-square rounded-full overflow-hidden border-4 border-surface shadow-2xl">
                <img 
                  src={Profile}
                  alt="Ali Hassan - Full Stack Developer" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-110 group-hover:scale-100"
                />
              </div>
              {/* Experience Badge */}
              <div className="absolute -bottom-4 -right-2 p-5 glass rounded-2xl border border-primary/20 shadow-xl">
                <span className="block text-primary font-black text-2xl leading-none">1+ Year</span>
                <span className="text-[10px] uppercase tracking-tighter font-bold text-on-surface-variant">Professional Experience</span>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-7 space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-sm label-editorial text-primary font-bold uppercase tracking-widest">The Architect</h2>
              <h3 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                Transforming Ideas into <br />
                <span className="text-primary">Scalable Digital Reality.</span>
              </h3>
            </div>

            <div className="space-y-6 text-on-surface-variant text-lg leading-relaxed max-w-2xl">
              <p>
                I am <span className="text-on-surface font-semibold">Ali Hassan</span>, a Computer Software Engineering student and Full-Stack Developer. I specialize in building high-performance applications using the <span className="text-primary font-medium">TALL Stack (Tailwind, Alpine, Laravel, Livewire)</span> and modern JavaScript frameworks like <span className="text-primary font-medium">React & Vue.js</span>.
              </p>
              <p>
                My approach focuses on <span className="italic">clean architecture</span> and <span className="italic">user-centric design</span>. From developing complex ERP systems to interactive 3D portfolios, I bridge the gap between robust backend logic and fluid frontend experiences.
              </p>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 gap-8 pt-6">
              {/* Left Stat: Focus on the scale of your projects */}
              <div className="space-y-2 border-l-4 border-primary/40 pl-6 group">
                <h4 className="text-4xl font-black text-primary group-hover:translate-x-1 transition-transform">10+</h4>
                <p className="text-xs uppercase tracking-widest font-bold text-on-surface-variant">
                  Full-Stack Solutions
                </p>
              </div>
              
              {/* Right Stat: Focus on your professional/industrial background */}
              <div className="space-y-2 border-l-4 border-primary/40 pl-6 group">
                <h4 className="text-4xl font-black text-primary group-hover:translate-x-1 transition-transform">1+ Year</h4>
                <p className="text-xs uppercase tracking-widest font-bold text-on-surface-variant">
                  Industrial Experience
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;