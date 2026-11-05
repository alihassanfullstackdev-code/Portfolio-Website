import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { hasWebGL } from '../lib/motion';
import { skills, stack } from '../data/portfolio';

const TechBalls = lazy(() => import('./three/TechBalls'));

export default function TechStack() {
  const root = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [canRender] = useState(hasWebGL);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setMounted(true);
      },
      { rootMargin: '200px' },
    );
    if (root.current) observer.observe(root.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="stack" ref={root} className="tone-coral relative bg-ink">
      <div className="mx-auto max-w-[1500px] px-6 pt-24 md:px-10 lg:px-24">
        <h2 className="display text-center text-[11vw] md:text-7xl">
          My <span className="text-accent">tech stack</span>
        </h2>
      </div>
      {canRender ? (
        <div className="h-[60svh] min-h-[420px] lg:h-[75svh]">
          {mounted && (
            <Suspense fallback={null}>
              <TechBalls labels={stack} active={inView} />
            </Suspense>
          )}
        </div>
      ) : (
        <ul className="mx-auto flex max-w-3xl flex-wrap justify-center gap-3 px-6 py-16">
          {stack.map((name) => (
            <li key={name} className="rounded-full border border-line px-5 py-2">
              {name}
            </li>
          ))}
        </ul>
      )}
      <div className="mx-auto max-w-[1500px] px-6 pb-24 md:px-10 lg:px-24">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4 lg:gap-x-10">
          {skills.map((group) => (
            <div key={group.name}>
              <dt className="text-sm font-semibold text-accent">{group.name}</dt>
              <dd className="mt-2 flex flex-col gap-1 text-muted">
                {group.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
