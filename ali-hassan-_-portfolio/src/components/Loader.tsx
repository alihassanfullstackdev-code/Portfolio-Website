import { useRef, useState } from 'react';
import { gsap, prefersReducedMotion, useGSAP } from '../lib/motion';
import { profile } from '../data/portfolio';

export default function Loader({ onDone }: { onDone: () => void }) {
  const [gone, setGone] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        setGone(true);
        onDone();
        return;
      }
      const progress = { value: 0 };
      gsap
        .timeline({
          onComplete: () => setGone(true),
        })
        .to(progress, {
          value: 100,
          duration: 1.3,
          ease: 'power2.inOut',
          onUpdate: () => {
            if (count.current) count.current.textContent = String(Math.round(progress.value));
          },
        })
        .to('.loader-bar', { scaleX: 1, duration: 1.3, ease: 'power2.inOut' }, 0)
        .call(onDone)
        .to(root.current, { yPercent: -100, duration: 0.7, ease: 'power3.inOut' });
    },
    { scope: root },
  );

  if (gone) return null;

  return (
    <div ref={root} className="fixed inset-0 z-[100] flex flex-col justify-end gap-4 bg-ink px-6 pb-10 md:px-12" role="status" aria-label="Loading">
      <div className="flex items-end justify-between">
        <span className="display text-2xl md:text-4xl">
          {profile.firstName} {profile.lastName}
        </span>
        <span className="display text-5xl text-accent tabular-nums md:text-7xl">
          <span ref={count}>0</span>
        </span>
      </div>
      <div className="loader-bar h-0.5 origin-left scale-x-0 bg-accent" />
    </div>
  );
}
