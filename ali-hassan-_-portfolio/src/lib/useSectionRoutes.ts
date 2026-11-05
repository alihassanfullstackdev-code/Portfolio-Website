import { useEffect } from 'react';
import { navLinks } from '../data/portfolio';

const sectionIds = navLinks.map((link) => link.href.slice(1));

/** `/work` or an old `/#work` link both mean the work section. */
function sectionFromUrl() {
  const name = (location.hash.slice(1) || location.pathname.slice(1)).replace(/\/$/, '');
  return sectionIds.includes(name) ? name : null;
}

function scrollToSection(id: string | null, behavior: ScrollBehavior = 'smooth') {
  if (id) document.getElementById(id)?.scrollIntoView({ behavior });
  else window.scrollTo({ top: 0, behavior });
}

/**
 * The site is one long page, so each section gets a clean path. Links push the path and
 * scroll, scrolling keeps the path in step, and opening a path goes straight to its section.
 */
export function useSectionRoutes(ready: boolean) {
  useEffect(() => {
    history.scrollRestoration = 'manual';

    const onClick = (e: MouseEvent) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      const link = (e.target as Element).closest<HTMLAnchorElement>('a[data-route]');
      if (!link) return;
      e.preventDefault();
      const path = link.getAttribute('href') ?? '/';
      history.pushState(null, '', path);
      scrollToSection(path === '/' ? null : path.slice(1));
    };
    const onPopState = () => scrollToSection(sectionFromUrl());

    document.addEventListener('click', onClick);
    window.addEventListener('popstate', onPopState);
    return () => {
      document.removeEventListener('click', onClick);
      window.removeEventListener('popstate', onPopState);
    };
  }, []);

  useEffect(() => {
    if (!ready) return;

    const target = sectionFromUrl();
    history.replaceState(null, '', target ? `/${target}` : '/');
    scrollToSection(target, 'auto');

    // The section crossing the middle of the screen decides the path.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (!visible) return;
        const path = visible.target.id === 'top' ? '/' : `/${visible.target.id}`;
        if (location.pathname !== path) history.replaceState(null, '', path);
      },
      { rootMargin: '-50% 0px -50% 0px' },
    );
    ['top', ...sectionIds].forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, [ready]);
}
