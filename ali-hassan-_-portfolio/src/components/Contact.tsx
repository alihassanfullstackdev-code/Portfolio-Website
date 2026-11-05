import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useReveal } from '../lib/motion';
import { profile, socials } from '../data/portfolio';

const links = [
  { label: 'LinkedIn', href: socials.linkedin },
  { label: 'GitHub', href: socials.github },
  { label: 'Instagram', href: socials.instagram },
  { label: `WhatsApp ${socials.phone}`, href: socials.whatsapp },
];

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section id="contact" ref={root} className="tone-coral bg-accent text-ink">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-8 px-6 py-20 md:px-10 lg:px-24">
        <h2 className="reveal display text-[13vw] md:text-8xl">Let's talk</h2>
        <a href={`mailto:${profile.email}`} className="reveal inline-flex min-h-11 items-center text-xl font-semibold [overflow-wrap:anywhere] hover:underline md:text-3xl">
          {profile.email}
        </a>
        <ul className="reveal flex flex-wrap gap-x-8 gap-y-1 font-semibold">
          {links.map((link) => (
            <li key={link.label}>
              <a href={link.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1 hover:underline">
                {link.label} <ArrowUpRight size={16} />
              </a>
            </li>
          ))}
        </ul>
        <p className="border-t border-ink/25 pt-5 text-sm">
          © {new Date().getFullYear()} {profile.firstName} {profile.lastName}. {profile.location}.
        </p>
      </div>
    </section>
  );
}
