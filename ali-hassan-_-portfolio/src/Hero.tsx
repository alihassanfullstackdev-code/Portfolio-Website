import { motion } from "motion/react";
import { ArrowRight, Download } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-8 pt-20">
      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="space-y-2">
            <span className="text-sm label-editorial text-primary">Portfolio 2024</span>
            <h1 className="text-6xl md:text-8xl font-extrabold text-editorial leading-none">
              Hi, I'm <br />
              <span className="text-primary">Ali Hassan</span>
            </h1>
          </div>
          <div className="flex items-center gap-3 text-xl md:text-2xl text-on-surface-variant font-light">
            <span>I build</span>
            <span className="px-3 py-1 bg-surface-high border-l-2 border-primary text-on-surface font-medium">
              high-performance web apps
            </span>
          </div>
          <p className="max-w-lg text-on-surface-variant leading-relaxed text-lg">
            Transforming complex requirements into elegant, scalable digital solutions. Specializing in the intersection of design and robust engineering.
          </p>
          <div className="flex flex-wrap gap-6 pt-4">
            <a href="#work" className="px-8 py-4 bg-primary-container text-on-surface font-bold rounded-xl flex items-center gap-2 hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] transition-all duration-300 group">
              View My Work
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#" className="px-8 py-4 border border-outline-variant text-on-surface font-bold rounded-xl hover:bg-surface-low transition-all duration-300 flex items-center gap-2">
              Download CV
              <Download className="w-5 h-5" />
            </a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative flex justify-center items-center"
        >
          <div className="w-full aspect-square relative flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-primary/10 animate-[spin_20s_linear_infinite]"></div>
            <div className="absolute inset-4 rounded-full border border-primary/5 animate-[spin_15s_linear_infinite_reverse]"></div>
            <div className="w-64 h-64 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl opacity-30"></div>
            <div className="relative z-10 p-12 glass rounded-3xl glow-shadow">
              <div className="w-full h-full border-2 border-dashed border-primary/20 rounded-2xl flex items-center justify-center text-primary/40 text-center italic p-8">
                3D Torus Knot<br />Interactive Canvas
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
    </section>
  );
};