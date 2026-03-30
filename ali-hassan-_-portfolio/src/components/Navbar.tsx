import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { NAV_LINKS } from '../constants';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('#home');

  // Scroll Tracking Logic
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLink(`#${entry.target.id}`);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    NAV_LINKS.forEach((link) => {
      const sectionId = link.href.replace('#', '');
      const element = document.getElementById(sectionId);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Smooth Scroll Function
  const handleNavLinkClick = (e, href) => {
    e.preventDefault();
    const sectionId = href.replace('#', '');
    const element = document.getElementById(sectionId);

    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth',
      });
      setActiveLink(href);
      setIsOpen(false);
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl z-50"
    >
      {/* Container fix: justify-between keeps things in place on mobile */}
      <div className="glass rounded-full px-6 md:px-8 py-3 flex justify-between md:justify-center items-center border border-white/5 shadow-2xl backdrop-blur-2xl relative">
        
        {/* Mobile Logo Placeholder (Helpful for alignment) */}
        <div className="md:hidden text-primary font-black tracking-tighter">
          ALİ
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link, index) => (
            <motion.a 
              key={link.name} 
              href={link.href} 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              onClick={(e) => handleNavLinkClick(e, link.href)}
              className={`px-5 py-2 rounded-full text-[13px] font-bold uppercase tracking-widest transition-all duration-300 relative group
                ${activeLink === link.href ? 'text-primary' : 'text-on-surface-variant hover:text-primary'}
              `}
            >
              <span className="relative z-10">{link.name}</span>
              {activeLink === link.href && (
                <motion.span 
                  layoutId="activeNavIndicator"
                  className="absolute inset-0 bg-primary/10 rounded-full -z-0 border border-primary/20"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.a>
          ))}
        </div>

        {/* Mobile Toggle Button: Removed 'absolute' for better flow */}
        <button 
          className="md:hidden relative p-2 text-primary hover:bg-primary/10 rounded-full transition-colors z-[70]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[55] md:hidden"
              style={{ width: '100vw', height: '100vh', left: '50%', x: '-50%', top: '-24px' }}
            />
            
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "110%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 right-0 w-[85%] max-w-sm glass rounded-l-[2rem] shadow-2xl z-[60] md:hidden flex flex-col p-10 border-l border-white/10"
              style={{ height: '100vh' }}
            >
              <div className="flex justify-between items-center mb-16">
                <span className="text-xl font-black text-primary tracking-tighter uppercase">Menu</span>
                <button onClick={() => setIsOpen(false)} className="p-3 bg-primary/10 text-primary rounded-full">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col gap-6">
                {NAV_LINKS.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                    onClick={(e) => handleNavLinkClick(e, link.href)}
                    className={`text-5xl font-black tracking-tighter flex items-center justify-between group 
                      ${activeLink === link.href ? 'text-primary' : 'text-on-surface-variant hover:text-primary'}
                    `}
                  >
                    {link.name}
                    <ArrowUpRight className={`w-8 h-8 transition-transform ${activeLink === link.href ? 'opacity-100 rotate-45' : 'opacity-0 group-hover:opacity-100'}`} />
                  </motion.a>
                ))}
              </div>

              <div className="mt-auto">
                <p className="text-xs text-white/20 tracking-widest uppercase">Faisalabad, PK // 2026</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;