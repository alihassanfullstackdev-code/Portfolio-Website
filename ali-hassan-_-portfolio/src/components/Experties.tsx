import React from 'react';
import { motion } from "motion/react";
import { Code2, Database, Wrench } from "lucide-react";
import { SkillGroupProps } from '../types';

const SkillCard: React.FC<SkillGroupProps> = ({ title, icon: Icon, skills }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="glass p-8 rounded-3xl space-y-8 group transition-all duration-500"
  >
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
        <Icon className="w-6 h-6" />
      </div>
      <h4 className="text-2xl font-bold">{title}</h4>
    </div>
    <div className="space-y-6">
      {skills.map((skill) => (
        <div key={skill.name} className="space-y-2">
          <div className="flex justify-between text-sm uppercase tracking-widest">
            <span>{skill.name}</span>
            <span className="text-primary">{skill.level}%</span>
          </div>
          <div className="h-1 bg-surface-high rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              transition={{ duration: 1, delay: 0.2 }}
              className="h-full bg-primary"
            ></motion.div>
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

const Expertise = () => {
  return (
    <section id="expertise" className="py-32 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 space-y-4 text-center">
          <h2 className="text-sm label-editorial text-primary">Expertise</h2>
          <h3 className="text-4xl md:text-5xl font-bold tracking-tight">Technical Toolbelt</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <SkillCard 
              title="Frontend & UI/UX" 
              icon={Code2} 
              skills={[
                { name: "React / Vue / Next.js", level: 98 },      // Core Frameworks
                { name: "Tailwind / GSAP / Framer", level: 95 },  // Styling & Animations
                { name: "Three.js / React Three Fiber", level: 85 }, // 3D & Creative Coding
                { name: "TypeScript / State Management", level: 90 } // Scalable Logic
              ]} 
            />
          <SkillCard 
            title="Backend" 
            icon={Database} 
            skills={[
              { name: "Laravel / PHP", level: 80 },
              { name: "MySQL / PhpMyAdmin", level: 80 },
              // { name: "PhpMyAdmin", level: 85 },
              { name: "Node.js", level: 88 },
            ]} 
          />
          <SkillCard 
              title="Tools & Ecosystem" 
              icon={Wrench} 
              skills={[
                { name: "Git / GitHub / CI-CD", level: 95 },    // Professional Workflow
                { name: "Docker / AWS / Vercel", level: 82 },   // Deployment & Cloud
                { name: "Postman / Rest API", level: 90 },      // Backend Testing
                { name: "AI Tools / Claude Code", level: 88 }   // Modern Tech (Ollama/Gemini)
              ]} 
            />
        </div>
      </div>
    </section>
  );
};

export default Expertise;