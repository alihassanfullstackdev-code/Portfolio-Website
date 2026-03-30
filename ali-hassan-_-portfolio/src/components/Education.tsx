import React from 'react';
import { motion } from "motion/react";
import { GraduationCap, Calendar, MapPin, Code2, ShieldCheck, Award } from "lucide-react";

const Education = () => {
  return (
    <section id="education" className="py-32 px-8 bg-surface-low relative overflow-hidden">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6 mb-16"
        >
          <div className="flex items-center justify-center gap-3">
            <span className="w-8 h-[1px] bg-primary"></span>
            <h2 className="text-xl font-bold uppercase tracking-[0.3em] text-primary">Education</h2>
            <span className="w-8 h-[1px] bg-primary"></span>
          </div>
          
          {/* <h6 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight text-editorial">
            Cultivating Technical <br />
            <span className="text-primary italic">Excellence.</span>
          </h6> */}
        </motion.div>

        {/* Main Narrative */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="space-y-8 max-w-3xl"
        >
          <div className="space-y-6 text-on-surface-variant text-lg md:text-xl font-light leading-relaxed">
            <p>
              Currently pursuing my <span className="text-on-surface font-semibold underline decoration-primary/30 underline-offset-4">Bachelor of Science in Computer Software Engineering</span> at The Superior University, Sargodha. My academic path is driven by a commitment to mastering the mechanics of large-scale digital infrastructures.
            </p>
            {/* <p>
              Unlike traditional learning, I focus on the **Practical Application** of engineering principles—bridging theoretical computer science with modern industrial-grade software solutions.
            </p> */}
          </div>

          {/* Education Card (Centered) */}
          <div className="pt-10 border-t border-primary/10 w-full">
            <div className="glass p-8 rounded-3xl border border-primary/10 inline-block text-left relative group hover:border-primary/30 transition-all duration-500">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="p-4 bg-primary/10 rounded-2xl">
                  <GraduationCap className="w-10 h-10 text-primary" />
                </div>
                
                <div className="space-y-2 text-center md:text-left">
                  <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-primary/70">
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> 2022 – Dec 2026</span>
                    <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Sargodha, Pakistan</span>
                  </div>
                  <h5 className="text-2xl md:text-3xl font-black text-on-surface tracking-tight">The Superior University</h5>
                  <p className="text-primary font-medium text-lg">BS in Computer Software Engineering</p>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Highlights Tags */}
          <div className="flex flex-wrap justify-center gap-3 pt-6">
            {["System Design", "Cloud Architecture", "SDLC", "Agile Methodology"].map((tag) => (
              <span key={tag} className="px-6 py-2 bg-primary/5 border border-primary/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-primary hover:bg-primary/10 transition-colors">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Education;