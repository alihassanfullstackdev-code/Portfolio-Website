import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useReveal } from '../lib/motion';
import { featured, moreProjects, sites } from '../data/portfolio';

function ProjectLink({ href, children }: { href: string; children: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1 font-semibold transition-colors hover:text-accent">
      {children} <ArrowUpRight size={16} />
    </a>
  );
}

export default function Work() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section id="work" ref={root} className="bg-panel">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-16 px-6 py-24 md:gap-24 md:px-10 lg:px-24">
        <h2 className="reveal display text-[11vw] md:text-7xl">
          My <span className="text-accent">work</span>
        </h2>

        {featured.map((project, i) => (
          <article key={project.title} className="reveal grid items-center gap-6 lg:grid-cols-12 lg:gap-12">
            <div className={`lg:col-span-7 ${i % 2 ? 'lg:order-2' : ''}`}>
              <img
                src={project.image}
                alt={`${project.title} screenshot`}
                loading="lazy"
                className="aspect-[16/10] w-full rounded-lg border border-line object-cover object-top"
              />
            </div>
            <div className={`flex flex-col gap-3 lg:col-span-5 ${i % 2 ? 'lg:order-1' : ''}`}>
              <p className="text-sm font-semibold text-accent">{project.category}</p>
              <h3 className="display text-2xl [overflow-wrap:anywhere] md:text-4xl lg:text-3xl xl:text-4xl">{project.title}</h3>
              <p className="text-muted">{project.summary}</p>
              {project.modules && <p className="text-sm">{project.modules.join(' · ')}</p>}
              <p className="text-sm text-muted">{project.tech.join(' · ')}</p>
              {project.note && <p className="text-sm text-muted">{project.note}</p>}
              {(project.live || project.code) && (
                <div className="flex gap-6">
                  {project.live && <ProjectLink href={project.live}>{project.liveLabel ?? 'Live site'}</ProjectLink>}
                  {project.code && <ProjectLink href={project.code}>Source code</ProjectLink>}
                </div>
              )}
            </div>
          </article>
        ))}

        <div className="flex flex-col gap-8">
          <h3 className="reveal display text-2xl md:text-4xl">Websites</h3>
          <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {sites.map((site) => (
              <a key={site.title} href={site.live} target="_blank" rel="noopener noreferrer" className="reveal group flex flex-col gap-3">
                <span className="overflow-hidden rounded-lg border border-line">
                  <img
                    src={site.image}
                    alt={`${site.title} home page`}
                    loading="lazy"
                    className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </span>
                <span>
                  <span className="block font-semibold">{site.title}</span>
                  <span className="block text-sm text-muted">
                    {site.category} · {site.tech}
                  </span>
                  <span className="mt-1 inline-flex min-h-11 items-center gap-1 font-semibold text-accent group-hover:underline">
                    Live site <ArrowUpRight size={16} />
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <h3 className="reveal display text-2xl md:text-4xl">Also built</h3>
          <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
            {moreProjects.map((project) => (
              <a key={project.title} href={project.href} target="_blank" rel="noopener noreferrer" className="reveal group flex flex-col gap-3">
                <span className="overflow-hidden rounded-lg border border-line">
                  <img
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    loading="lazy"
                    className="aspect-[16/10] w-full object-cover object-left-top transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </span>
                <span>
                  <span className="block font-semibold">{project.title}</span>
                  <span className="block text-sm text-muted">{project.note}</span>
                  <span className="mt-1 inline-flex min-h-11 items-center gap-1 font-semibold text-accent group-hover:underline">
                    Source code <ArrowUpRight size={16} />
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
