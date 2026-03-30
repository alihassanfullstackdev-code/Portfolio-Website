import React from 'react';
import { motion } from "motion/react";
import { Mail, Phone, Linkedin, Github, Instagram, ArrowUpRight } from "lucide-react";

const Contact = () => {
  const contactLinks = [
    { 
      icon: Mail, 
      label: "Email", 
      value: "alihassan.fullstack.dev@gmail.com", 
      href: "mailto:alihassan.fullstack.dev@gmail.com",
      color: "hover:text-blue-400"
    },
    { 
      icon: Linkedin, 
      label: "LinkedIn", 
      value: "Ali Hassan", 
      href: "https://www.linkedin.com/in/ali-hassan-4880b3266/",
      color: "hover:text-blue-600"
    },
    { 
      icon: Github, 
      label: "GitHub", 
      value: "alihassan-code", 
      href: "https://github.com/alihassanfullstackdev-code",
      color: "hover:text-white"
    },
    { 
      icon: Instagram, 
      label: "Instagram", 
      value: "Ali Hassan", // Apna handle yahan add karein
      href: "https://instagram.com/mirza_alihassan96", 
      color: "hover:text-pink-500"
    },
    { 
      icon: Phone, 
      label: "WhatsApp / Call", 
      value: "+92 301 6159800", 
      href: "https://wa.me/923016159800",
      color: "hover:text-green-500"
    }
  ];

  return (
    <section id="contact" className="py-32 px-8 bg-surface relative overflow-hidden">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        
        {/* Minimal Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24 space-y-4"
        >
          <div className="flex items-center justify-center gap-3">
            <span className="w-8 h-[1px] bg-primary/30"></span>
            <h2 className="text-xl font-black uppercase tracking-[0.5em] text-primary">Get in Touch</h2>
            <span className="w-8 h-[1px] bg-primary/30"></span>
          </div>
          <h3 className="text-5xl md:text-6xl font-black text-on-surface tracking-tighter leading-[0.8] uppercase">
            Contact <span className="text-primary italic"></span>
          </h3>
        </motion.div>

        {/* Clickable Contact Grid */}
        <div className="w-full grid md:grid-cols-2 gap-4">
          {contactLinks.map((item, i) => (
            <motion.a
              key={i}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`group relative p-8 rounded-[2rem] bg-surface-high/40 border border-white/5 flex items-center justify-between transition-all duration-500 hover:bg-surface-high hover:border-primary/20 ${item.color}`}
            >
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-surface flex items-center justify-center text-on-surface-variant group-hover:text-inherit group-hover:scale-110 transition-all duration-500 shadow-xl border border-white/5">
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 mb-1">{item.label}</p>
                  <p className="text-lg md:text-xl font-bold tracking-tight break-all">{item.value}</p>
                </div>
              </div>
              
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-4 group-hover:translate-x-0">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Final CTA Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-24 text-center"
        >
          <p className="text-on-surface-variant/40 font-medium tracking-widest text-[10px] uppercase">
            Based in Punjab, Pakistan — Available for Worldwide Projects
          </p>
        </motion.div>

      </div>

      {/* Decorative Blur */}
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
};

export default Contact;