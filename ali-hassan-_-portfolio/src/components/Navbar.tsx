import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { NAV_LINKS } from '../constants';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('#home'); // Default active section

  // Scroll Tracking Logic using Intersection Observer
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px', // Jab section screen ke beech mein ho tab active ho
      threshold: 0,
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // entry.target.id ko href format mein convert karein (#projects)
          setActiveLink(`#${entry.target.id}`);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    // Saare sections ko observe karein (jinke pas IDs hain)
    NAV_LINKS.forEach((link) => {
      const sectionId = link.href.replace('#', '');
      const element = document.getElementById(sectionId);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Smooth Scroll Function (Manual Click ke liye)
  const handleNavLinkClick = (e, href) => {
    e.preventDefault();
    const sectionId = href.replace('#', '');
    const element = document.getElementById(sectionId);

    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Navbar ki height ke mutabiq offset
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
      <div className="glass rounded-full px-6 md:px-8 py-3 flex justify-center items-center border border-white/5 shadow-2xl backdrop-blur-2xl relative">
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

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden absolute right-6 p-2 text-primary hover:bg-primary/10 rounded-full transition-colors"
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
            />
            
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "110%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-4 right-4 w-[85%] max-w-sm glass rounded-[2rem] shadow-2xl z-[60] md:hidden flex flex-col p-8 border border-white/10"
            >
              <div className="flex justify-between items-center mb-16">
                <span className="text-xl font-black text-primary tracking-tighter">NAVIGATION</span>
                <button onClick={() => setIsOpen(false)} className="p-3 bg-primary/10 text-primary rounded-full">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col gap-8">
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
                    <ArrowUpRight className={`w-8 h-8 ${activeLink === link.href ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;