import React from 'react';
import { motion } from "motion/react";
import { Calendar, MapPin, Building2, Code2 } from "lucide-react";

interface ExperienceProps {
  role: string;
  company: string;
  duration: string;
  location: string;
  details: string[];
  current: boolean;
  isTraining?: boolean;
}

const ExperienceCard: React.FC<ExperienceProps & { index: number }> = ({ 
  role, company, duration, location, details, current, isTraining = false, index 
}) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative mb-20 last:mb-0"
    >
      {/* Central Desktop Line */}
      <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-[1px] bg-primary/10 -translate-x-1/2 hidden md:block" />
      
      {/* Central Node */}
      <div className="absolute left-[19px] md:left-1/2 top-0 -translate-x-1/2 w-10 h-10 rounded-full border-2 bg-surface z-10 flex items-center justify-center transition-all duration-500 group-hover:scale-110 border-primary/20 shadow-xl">
        <div className={`w-3 h-3 rounded-full ${current ? 'bg-primary animate-pulse' : 'bg-primary/20'}`} />
      </div>

      <div className={`flex flex-col md:flex-row items-start w-full ${isEven ? 'md:flex-row-reverse' : ''}`}>
        {/* Content Side */}
        <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pl-16' : 'md:pr-16 text-left md:text-right'}`}>
          <div className={`space-y-4 flex flex-col ${isEven ? 'items-start' : 'items-start md:items-end'}`}>
            
            <div className="flex flex-col space-y-1">
              <div className="flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
                {!isEven && <Calendar className="w-3 h-3 hidden md:block" />}
                {duration}
                {isEven && <Calendar className="w-3 h-3 hidden md:block" />}
              </div>
              <h4 className="text-3xl md:text-5xl font-black text-on-surface tracking-tighter leading-none uppercase">
                {role}
              </h4>
              <div className={`flex items-center gap-2 text-primary/70 font-bold text-lg italic ${isEven ? '' : 'md:justify-end'}`}>
                {isTraining ? <Code2 className="w-4 h-4" /> : <Building2 className="w-4 h-4" />}
                {company}
              </div>
            </div>

            <ul className={`space-y-3 max-w-md ${isEven ? 'text-left' : 'text-left md:text-right'}`}>
              {details.map((point, i) => (
                <li key={i} className={`text-on-surface-variant font-light leading-relaxed text-base flex gap-3 ${isEven ? '' : 'md:flex-row-reverse'}`}>
                  <span className="text-primary font-bold">/</span>
                  {point}
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2 text-on-surface-variant/40 text-[10px] font-bold uppercase tracking-widest">
              <MapPin className="w-3 h-3" />
              {location}
            </div>
          </div>
        </div>

        {/* Empty side for layout balance */}
        <div className="hidden md:block md:w-1/2" />
      </div>
    </motion.div>
  );
};

const Experience = () => {
  const experiences: ExperienceProps[] = [
    {
      role: "MERN Stack Trainee",
      company: "CodeBrisk",
      duration: "2024 — 2025",
      location: "Sargodha, PK",
      current: false,
      isTraining: true,
      details: [
        "Specialized in React.js and modern UI libraries.",
        "Mastered state management and API integrations.",
        "Developed reusable components for complex web apps."
      ]
    },
    {
      role: "Web Developer Intern",
      company: "Shalimar Smart City",
      duration: "2023 — 2024",
      location: "sargodha, PK",
      current: false,
      details: [
        "Developed interactive UI modules with Vue.js.",
        "Collaborated on responsive layout systems.",
        "Mastered foundational SDLC in industrial environments."
      ]
    }
  ];

  return (
    <section id="experience" className="py-32 px-8 bg-surface relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Minimalist Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32 flex flex-col items-center text-center"
        >
          <div className="flex items-center gap-3">
            <span className="w-12 h-[1px] bg-primary/30"></span>
            <h1 className="text-xl font-bold uppercase tracking-[0.5em] text-primary">Experience</h1>
            <span className="w-12 h-[1px] bg-primary/30"></span>
          </div>
        </motion.div>

        {/* Zig-Zag Timeline */}
        <div className="relative">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} index={index} {...exp} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;