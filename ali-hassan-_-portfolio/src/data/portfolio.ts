import docQaPoster from '../assets/ai/document-qa.jpg';
import hubPoster from '../assets/ai/knowledge-hub.jpg';
import mapLeadsPoster from '../assets/ai/mapleads.jpg';
import arAssistant from '../assets/ai/ar-assistant.jpg';
import filingLens from '../assets/ai/filinglens.jpg';
import arErp from '../assets/work/ar-erp.jpg';
import empireLink from '../assets/work/empirelink.jpg';
import restoPos from '../assets/work/restopos.jpg';
import schoolErp from '../assets/work/school-erp.jpg';
import arsite from '../assets/work/arsite.jpg';
import blackride from '../assets/work/blackride.jpg';
import gold from '../assets/work/gold.jpg';
import luxdine from '../assets/work/luxdine.jpg';
import ruhaab from '../assets/work/ruhaab.jpg';
import safehome from '../assets/work/safehome.jpg';
import tracks from '../assets/work/tracks.jpg';

export const profile = {
  firstName: 'Ali',
  lastName: 'Hassan',
  initials: 'AH',
  email: 'alihassan.fullstack.dev@gmail.com',
  resume: '/Resume.pdf',
  location: 'Sargodha, Pakistan',
  roles: ['Developer', 'Engineer'],
  tagline: 'Laravel, Vue.js and React. Stateful AI agents and enterprise systems.',
};

export const navLinks = [
  { name: 'About', href: '/about' },
  { name: 'AI', href: '/ai' },
  { name: 'Work', href: '/work' },
  { name: 'Stack', href: '/stack' },
  { name: 'Career', href: '/career' },
  { name: 'Contact', href: '/contact' },
];

export const socials = {
  github: 'https://github.com/alihassanfullstackdev-code',
  linkedin: 'https://www.linkedin.com/in/ali-hassanfullstack/',
  instagram: 'https://instagram.com/mirza_alihassan96',
  whatsapp: 'https://wa.me/923016159800',
  phone: '+92 301 6159800',
};

export const skills = [
  { name: 'Languages', items: ['PHP', 'Python', 'JavaScript', 'TypeScript', 'HTML', 'CSS'] },
  { name: 'Frameworks', items: ['Laravel', 'FastAPI', 'React.js', 'Vue.js', 'Inertia.js', 'Tailwind CSS', 'Vite'] },
  {
    name: 'AI and automation',
    items: ['RAG', 'Generative AI', 'AI agents', 'LangChain', 'LangGraph', 'PyTorch', 'Keras', 'Chroma DB', 'Embeddings', 'Tokenization', 'faster-whisper', 'edge-tts', 'WhatsApp automation (Green API)'],
  },
  { name: 'Backend and architecture', items: ['RESTful APIs', 'Eloquent ORM', 'MySQL', 'ERP and POS modules', 'Inventory modules', 'RBAC', 'Reverb WebSockets'] },
  { name: '3D and motion', items: ['Three.js', 'TresJS', 'Anime.js', 'GSAP'] },
  { name: 'Tools and delivery', items: ['GitHub', 'Stripe', 'Safepay', 'Vercel', 'Nginx'] },
  { name: 'Soft skills', items: ['Team communication', 'Problem solving', 'Autonomous workflow design'] },
  { name: 'Spoken languages', items: ['English (fluent)', 'Urdu (native)'] },
];

/** Labels on the balls in the Tech Stack section. */
export const stack = ['Laravel', 'React', 'PHP', 'Python', 'LangGraph', 'Vue.js', 'FastAPI', 'Tailwind', 'MySQL', 'Three.js'];

export interface AiProject {
  title: string;
  category: string;
  summary: string;
  tech: string[];
  /** Demo video in public/videos. Projects without one show an image instead. */
  video?: string;
  poster?: string;
  image?: string;
  imageAlt?: string;
}

export const aiProjects: AiProject[] = [
  {
    title: 'Enterprise Knowledge Hub',
    category: 'RAG · Document chat',
    summary: 'A document chat engine that indexes company files in Chroma DB, summarizes them and answers questions, so people stop searching through long documents by hand.',
    tech: ['Python', 'RAG', 'Chroma DB'],
    video: '/videos/knowledge-hub.mp4',
    poster: hubPoster,
  },
  {
    title: 'Zero-Hallucination Doc Q&A',
    category: 'RAG · Guardrails',
    summary: 'A PDF assistant that only answers from the uploaded file. It enforces citations and refuses questions the document cannot support, which matters for regulatory searches.',
    tech: ['Python', 'RAG', 'Embeddings'],
    video: '/videos/document-qa.mp4',
    poster: docQaPoster,
  },
  {
    title: 'AR Interior AI Assistant',
    category: 'Multi-agent · WhatsApp and voice',
    summary: 'The AI service behind the AR Interior ERP. A router sends each customer or staff question to a design, inventory or sales agent that works with live business data.',
    tech: ['FastAPI', 'LangGraph', 'Groq', 'Green API', 'edge-tts'],
    image: arAssistant,
    imageAlt: 'System diagram: web chat, WhatsApp and voice go to an intent router, then design, inventory or sales agents, then business tools and a reply',
  },
  {
    title: 'Stateful Multi-Agent Blueprint',
    category: 'LangGraph · Agent workflow',
    summary: 'Agents run in a structured pipeline and handle reports with mixed formats. FilingLens, its document app, reads finance and legal PDFs page by page and routes each question to a table or document specialist.',
    tech: ['LangGraph', 'FastAPI', 'Python', 'React'],
    image: filingLens,
    imageAlt: 'FilingLens upload screen for finance and legal documents',
  },
  {
    title: 'MapLeads',
    category: 'Automation · Lead generation',
    summary: 'Searches Google Maps for a business type and city, shows live scraper logs, and fills a leads pipeline you can filter and export as CSV or JSON.',
    tech: ['Python', 'Playwright', 'React', 'SQLite'],
    video: '/videos/mapleads.mp4',
    poster: mapLeadsPoster,
  },
];

export interface FeaturedProject {
  title: string;
  category: string;
  summary: string;
  tech: string[];
  image: string;
  modules?: string[];
  live?: string;
  /** Link text when the live link is not the project itself. */
  liveLabel?: string;
  code?: string;
  note?: string;
}

/** The biggest systems, shown large. */
export const featured: FeaturedProject[] = [
  {
    title: 'AR Interior ERP',
    category: 'Business software · ERP and POS',
    summary:
      'One system for an interior design and woodwork business, from showroom sale to finished site. Every open terminal updates live over WebSockets.',
    tech: ['Laravel 12', 'React 19', 'TypeScript', 'Reverb WebSockets'],
    image: arErp,
    modules: ['POS terminal', 'Quotation studio', 'Active site tracking', 'Batch inventory', 'Supplier ledgers', 'Profit reports', 'Damaged items', 'Roles and permissions'],
    note: 'Private client software, login only. Screenshot uses an empty demo database.',
    live: 'https://ar-interiors.vercel.app',
    liveLabel: 'Client website',
  },
  {
    title: 'Black Ride Limo',
    category: 'Booking platform · Live business',
    summary:
      'A chauffeur service site with online booking, Stripe payments and four language versions. Its admin dashboard controls bookings, fleet, blog, leads and every image on the site.',
    tech: ['Laravel 12', 'React 19', 'TypeScript', 'Stripe', 'GSAP'],
    image: blackride,
    live: 'https://www.blackridelimos.com/',
  },
  {
    title: 'SG&J Jewellers',
    category: 'E-commerce · Jewellery store',
    summary:
      'An online store for a Sargodha jeweller with a live gold and silver rates ticker, cart, online payments and an admin panel for products, rates and orders.',
    tech: ['Laravel', 'React', 'TypeScript', 'Filament', 'Safepay'],
    image: gold,
    live: 'https://gold-silver-jewellers.vercel.app',
    code: 'https://github.com/alihassanfullstackdev-code/Gold-Silver-Jewellers',
  },
  {
    title: 'RestoPos Engine',
    category: 'Business software · Restaurant POS',
    summary: 'Restaurant software that takes an order from the table to the kitchen to the sales report, with stock and staff access in one place.',
    tech: ['Laravel', 'React', 'TypeScript'],
    note: 'Screenshot uses demo menu data.',
    image: restoPos,
    modules: ['POS terminal', 'Floor plan', 'Kitchen display', 'Menu management', 'Inventory', 'Suppliers', 'Sales reports', 'Roles matrix'],
    code: 'https://github.com/alihassanfullstackdev-code/Restaurant-Software',
  },
];

export interface SiteProject {
  title: string;
  category: string;
  tech: string;
  image: string;
  live: string;
}

/** Client and concept websites, shown as a grid. */
export const sites: SiteProject[] = [
  { title: 'Tracks Communications', category: 'Digital agency', tech: 'React, Three.js', image: tracks, live: 'https://trackscommunications.com/' },
  { title: 'Rohaab Collections', category: 'Fashion and jewellery', tech: 'React, Three.js, GSAP', image: ruhaab, live: 'https://ruhaab-collections.vercel.app' },
  { title: 'AR Interior', category: 'Interior design studio', tech: 'React, Tailwind CSS', image: arsite, live: 'https://ar-interiors.vercel.app' },
  { title: 'Lux Dine', category: 'Fast food restaurant', tech: 'React, GSAP', image: luxdine, live: 'https://lux-dine.vercel.app' },
  { title: 'SafeHome Inspections', category: 'Home services', tech: 'React, Express', image: safehome, live: 'https://home-inspection-website.vercel.app' },
];

/** Projects without a public demo. */
export const moreProjects = [
  { title: 'School ERP', note: 'Admin, teacher and student portals with exams and results. Laravel, Vue.js', href: 'https://github.com/alihassanfullstackdev-code/School-ERP', image: schoolErp },
  { title: 'EmpireLink Limousine', note: 'Fleet site with a 3D scene. Laravel, Vue.js, Three.js', href: 'https://github.com/alihassanfullstackdev-code/AutoDrive-Hub', image: empireLink },
];

export const career = [
  {
    when: 'Mar 2026 – Present',
    role: 'Freelance Full-Stack Developer',
    place: 'Remote',
    points: [
      'Build ERP, POS, booking and e-commerce systems for clients with Laravel, React and TypeScript.',
      'Integrate Stripe and Safepay payments and real-time updates with Laravel Reverb.',
      'Build AI services with FastAPI and LangGraph, including WhatsApp and voice assistants.',
    ],
  },
  {
    when: 'Nov 2025 – Mar 2026',
    role: 'Laravel and React Trainee',
    place: 'CodeBrisk, Sargodha',
    points: ['Trained in full-stack development with Laravel and React.', 'Worked on state management and API integrations.', 'Built reusable components for complex web apps.'],
  },
  {
    when: 'Mar 2025 – Nov 2025',
    role: 'Software Developer Intern',
    place: 'Shalimar Group of Companies, Sargodha',
    points: [
      'Built and improved backend parts of internal business apps with Laravel, MySQL and REST APIs, which made data responses faster.',
      'Made responsive front-end parts and data tables with Vue.js and fixed UI and UX issues with senior developers.',
      'Improved database queries and fixed errors to keep enterprise systems reliable every day.',
    ],
  },
  {
    when: 'Nov 2022 – Jul 2026',
    role: 'BS in Software Engineering',
    place: 'The Superior University, Sargodha',
    points: [],
  },
];
