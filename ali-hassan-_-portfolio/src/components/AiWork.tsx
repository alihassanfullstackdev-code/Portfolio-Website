import { useRef } from 'react';
import { useReveal } from '../lib/motion';
import { aiProjects, type AiProject } from '../data/portfolio';

function Demo({ project }: { project: AiProject }) {
  if (project.video) {
    return (
      <video
        controls
        playsInline
        preload="none"
        poster={project.poster}
        aria-label={`${project.title} demo video`}
        className="aspect-video w-full rounded-lg border border-line bg-black object-contain"
      >
        <source src={project.video} type="video/mp4" />
      </video>
    );
  }

  return <img src={project.image} alt={project.imageAlt ?? ''} loading="lazy" className="aspect-video w-full rounded-lg border border-line object-cover object-top" />;
}

export default function AiWork() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section id="ai" ref={root} className="tone-sky bg-ink">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-16 px-6 py-24 md:gap-24 md:px-10 lg:px-24">
        <div className="reveal flex flex-col gap-5">
          <h2 className="display text-[11vw] md:text-7xl">
            AI <span className="text-accent">projects</span>
          </h2>
          <p className="max-w-2xl text-lg text-muted">
            RAG pipelines, stateful LangGraph agents and voice and WhatsApp automation, built to give answers people can check.
          </p>
        </div>

        {aiProjects.map((project, i) => (
          <article key={project.title} className="reveal grid items-center gap-6 lg:grid-cols-12 lg:gap-12">
            <div className={`lg:col-span-7 ${i % 2 ? 'lg:order-2' : ''}`}>
              <Demo project={project} />
            </div>
            <div className={`flex flex-col gap-3 lg:col-span-5 ${i % 2 ? 'lg:order-1' : ''}`}>
              <p className="text-sm font-semibold text-accent">{project.category}</p>
              <h3 className="display text-2xl [overflow-wrap:anywhere] md:text-4xl lg:text-3xl xl:text-4xl">{project.title}</h3>
              <p className="text-muted">{project.summary}</p>
              <p className="text-sm text-muted">{project.tech.join(' · ')}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
