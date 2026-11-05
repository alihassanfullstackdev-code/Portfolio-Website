import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import type { RefObject } from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export { gsap, ScrollTrigger, useGSAP };

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** The three brand colours from index.css: lime, coral, sky. */
export function brandColors() {
  const css = getComputedStyle(document.documentElement);
  const read = (name: string, fallback: string) => css.getPropertyValue(name).trim() || fallback;
  return {
    lime: read('--color-lime', '#c8f04a'),
    coral: read('--color-coral', '#ff6b5e'),
    sky: read('--color-sky', '#6fd3ff'),
  };
}

export function hasWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

/** Fades in every `.reveal` child as it scrolls into view. */
export function useReveal(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
        gsap.from(el, {
          y: 36,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      });
    },
    { scope },
  );
}

/**
 * Drives the robot from outside the canvas.
 * slide: 0 in the hero, 1 beside the About text (desktop only).
 * dock: 0 full size, 1 small in the corner, where it stays for the rest of the site.
 */
export const avatarScroll = { slide: 0, dock: 0 };
