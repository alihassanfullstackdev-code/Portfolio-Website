import { useEffect, useState } from 'react';
import { Menu, X, Github, Linkedin, Instagram, Phone, ArrowUpRight } from 'lucide-react';
import { navLinks, profile, socials } from '../data/portfolio';

const socialIcons = [
  { Icon: Github, href: socials.github, label: 'GitHub' },
  { Icon: Linkedin, href: socials.linkedin, label: 'LinkedIn' },
  { Icon: Instagram, href: socials.instagram, label: 'Instagram' },
  { Icon: Phone, href: socials.whatsapp, label: 'WhatsApp' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // The page behind the open phone menu should not scroll.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line/60 bg-ink/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-6 px-6 py-2 md:px-10">
          <a href="/" data-route className="display inline-flex min-h-11 items-center text-xl" aria-label="Back to top">
            {profile.initials}
          </a>
          <a href={`mailto:${profile.email}`} className="hidden min-h-11 items-center text-sm text-muted transition-colors hover:text-accent xl:inline-flex">
            {profile.email}
          </a>
          <nav className="hidden items-center gap-6 md:flex lg:gap-8" aria-label="Main">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} data-route className="inline-flex min-h-11 items-center text-sm font-semibold tracking-wide uppercase transition-colors hover:text-accent">
                {link.name}
              </a>
            ))}
            <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1 text-sm font-semibold tracking-wide text-accent uppercase hover:underline">
              Resume <ArrowUpRight size={16} />
            </a>
          </nav>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center md:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {open && (
        <nav className="fixed inset-0 z-40 flex flex-col justify-center gap-5 overflow-y-auto bg-ink px-6 py-20 md:hidden" aria-label="Mobile">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} data-route onClick={() => setOpen(false)} className="display inline-flex min-h-11 items-center text-3xl sm:text-4xl">
              {link.name}
            </a>
          ))}
          <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="display inline-flex min-h-11 items-center text-3xl text-accent sm:text-4xl">
            Resume
          </a>
        </nav>
      )}

      <div className="fixed bottom-6 left-4 z-30 hidden flex-col rounded-full bg-ink/75 p-0.5 text-white backdrop-blur md:left-7 lg:flex">
        {socialIcons.map(({ Icon, href, label }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="flex h-11 w-11 items-center justify-center">
            <Icon size={20} />
          </a>
        ))}
      </div>

    </>
  );
}
