import { Component, lazy, Suspense, useRef, type ReactNode } from 'react';
import { avatarScroll, gsap, hasWebGL, ScrollTrigger, useGSAP } from '../lib/motion';

const Avatar = lazy(() => import('./three/Avatar'));

class WebGLBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

/**
 * The robot lives in a fixed, click-through layer above the page, so it stays with the
 * visitor everywhere. Scrolling moves it from the hero into the corner of the screen.
 */
export default function AvatarStage() {
  const stage = useRef<HTMLDivElement>(null);
  const canRender = useRef(hasWebGL());

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      const about = document.getElementById('about');
      const ai = document.getElementById('ai');
      const track = (key: 'slide' | 'dock', vars: ScrollTrigger.Vars) =>
        ScrollTrigger.create({
          scrub: 0.6,
          ...vars,
          onUpdate: (self) => {
            avatarScroll[key] = self.progress;
          },
        });

      const fadeGlow = (vars: ScrollTrigger.Vars) => gsap.to('.stage-glow', { opacity: 0, ease: 'none', scrollTrigger: { scrub: true, ...vars } });

      media.add('(min-width: 1024px)', () => {
        const slide = track('slide', { trigger: about, start: 'top bottom', end: 'top top' });
        const dock = track('dock', { trigger: ai, start: 'top bottom', end: 'top 45%' });
        fadeGlow({ trigger: ai, start: 'top bottom', end: 'top 45%' });
        return () => {
          slide.kill();
          dock.kill();
          avatarScroll.slide = 0;
          avatarScroll.dock = 0;
        };
      });

      media.add('(max-width: 1023px)', () => {
        const dock = track('dock', { trigger: about, start: 'top 90%', end: 'top 35%' });
        fadeGlow({ trigger: about, start: 'top 90%', end: 'top 35%' });
        return () => {
          dock.kill();
          avatarScroll.dock = 0;
        };
      });

      return () => media.revert();
    },
    { scope: stage },
  );

  return (
    <div ref={stage} className="pointer-events-none fixed inset-0 z-20">
      <div className="stage-glow absolute inset-0" />
      {canRender.current && (
        <WebGLBoundary fallback={null}>
          <Suspense fallback={null}>
            <Avatar />
          </Suspense>
        </WebGLBoundary>
      )}
    </div>
  );
}
