import { useRef } from 'react';
import { gsap, prefersReducedMotion, useGSAP, useReveal } from '../lib/motion';
import { career } from '../data/portfolio';

export default function Career() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from('.career-line', {
        scaleY: 0,
        ease: 'none',
        scrollTrigger: { trigger: '.career-list', start: 'top 70%', end: 'bottom 70%', scrub: 0.5 },
      });
    },
    { scope: root },
  );

  return (
    <section id="career" ref={root} className="tone-sky bg-panel">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-14 px-6 py-24 md:px-10 lg:px-24">
        <h2 className="reveal display text-[11vw] md:text-7xl">
          My career <span className="text-accent">&amp; education</span>
        </h2>
        <div className="career-list relative flex flex-col gap-14 pl-8 md:pl-12">
          <div className="absolute top-0 bottom-0 left-0 w-px bg-line" />
          <div className="career-line absolute top-0 bottom-0 left-0 w-px origin-top bg-accent" />
          {career.map((item) => (
            <article key={item.role} className="reveal grid gap-3 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-5">
                <h3 className="display text-xl md:text-3xl">{item.role}</h3>
                <p className="mt-2 text-accent">{item.place}</p>
              </div>
              <p className="display text-lg text-muted tabular-nums md:text-2xl lg:col-span-3">{item.when}</p>
              <ul className="flex flex-col gap-1 text-muted lg:col-span-4">
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
