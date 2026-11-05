import { useRef } from 'react';
import { useReveal } from '../lib/motion';
import { profile } from '../data/portfolio';

export default function About() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section id="about" ref={root} className="relative flex min-h-svh items-center bg-ink lg:bg-transparent">
      <div className="relative z-30 mx-auto w-full max-w-[1500px] px-6 py-24 md:px-10 lg:px-24">
        <div className="flex max-w-2xl flex-col gap-7">
          <p className="reveal font-semibold text-accent">About me</p>
          <h2 className="reveal display text-3xl md:text-5xl">I build enterprise software and AI agents.</h2>
          <p className="reveal text-lg text-muted">
            I'm a Software Engineering graduate from The Superior University with 2+ years of hands-on full-stack development, including university projects. I
            build web applications with Laravel, React and Vue.js, and practical AI agent workflows with RAG and LangGraph.
          </p>
          <p className="reveal text-lg text-muted">
            My work includes enterprise ERP and POS systems, real-time inventory sync and accurate document intelligence pipelines. I'm based
            in {profile.location} and open to roles and projects worldwide.
          </p>
        </div>
      </div>
    </section>
  );
}
