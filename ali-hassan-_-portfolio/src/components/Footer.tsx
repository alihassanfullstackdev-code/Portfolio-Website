import React from 'react';
import { Linkedin, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-surface-lowest w-full py-12 border-t border-primary/15">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 max-w-7xl mx-auto gap-8">
        <div className="text-primary font-bold text-xl tracking-tighter">ALI HASSAN</div>
        <p className="text-sm tracking-widest uppercase text-on-surface-variant">
          © 2026 Ali Hassan.
        </p>
        <div className="flex justify-center lg:justify-start gap-6 pt-4">
          {[
            { Icon: Linkedin, url: "https://www.linkedin.com/in/ali-hassan-4880b3266/" },
            { Icon: Github, url: "https://github.com/alihassanfullstackdev-code" }
          ].map((social, i) => (
            <a 
              key={i} 
              href={social.url} 
              target="_blank"             // New tab mein khulne ke liye
              rel="noopener noreferrer"  // Security ke liye zaroori hai
              className="w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-primary hover:text-surface transition-all duration-300 group"
            >
              <social.Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;