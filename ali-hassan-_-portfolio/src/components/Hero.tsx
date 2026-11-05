import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { gsap, prefersReducedMotion, useGSAP } from '../lib/motion';
import { profile } from '../data/portfolio';

function RotatingRole() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % profile.roles.length), 2600);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="relative block h-[1.1em] overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.span
          key={profile.roles[index]}
          initial={{ y: '110%' }}
          animate={{ y: 0 }}
          exit={{ y: '-110%' }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="absolute inset-x-0 top-0 block"
        >
          {profile.roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ready || prefersReducedMotion()) return;
      gsap.from('.hero-line', { y: 40, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08 });
    },
    { scope: root, dependencies: [ready] },
  );

  return (
    <section id="top" ref={root} className="relative h-svh min-h-[560px]">
      {/* keeps the hero text readable over the robot on phones */}
      <div className="absolute inset-x-0 bottom-0 z-[25] h-[42%] bg-gradient-to-t from-ink via-ink/95 to-transparent lg:hidden" />
      <div className="relative z-30 mx-auto flex h-full max-w-[1500px] flex-col justify-between px-6 pt-20 pb-8 md:px-10 lg:grid lg:grid-cols-[1fr_minmax(0,38vw)_1fr] lg:items-center lg:px-24 lg:pt-0 lg:pb-0">
        <div>
          <p className="hero-line text-lg text-accent md:text-xl">Hello! I'm</p>
          <h1 className="hero-line display mt-1 text-4xl md:text-5xl xl:text-6xl">
            {profile.firstName}
            <br />
            {profile.lastName}
          </h1>
        </div>
        <div className="hidden lg:block" />
        <div className="text-right lg:text-left">
          <p className="hero-line text-lg text-accent md:text-xl">A Full Stack</p>
          <p className="hero-line display mt-1 text-3xl md:text-4xl lg:text-3xl xl:text-4xl">
            <RotatingRole />
          </p>
          <p className="hero-line mt-3 ml-auto max-w-[26ch] text-sm text-muted lg:ml-0 lg:text-base">
            {profile.tagline}
          </p>
        </div>
      </div>
    </section>
  );
}
