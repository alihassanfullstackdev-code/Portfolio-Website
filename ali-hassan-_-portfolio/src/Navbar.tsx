import { NAV_LINKS } from "@/src/constants";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-primary/15">
      <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
        <div className="text-xl font-bold tracking-tighter text-primary">ALI HASSAN</div>
        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <a key={link.name} href={link.href} className="text-on-surface-variant hover:text-on-surface transition-colors">
              {link.name}
            </a>
          ))}
        </div>
        <button className="px-6 py-2 border border-primary/40 rounded-full text-primary hover:bg-primary/10 transition-all duration-300 font-medium">
          Hire Me
        </button>
      </div>
    </nav>
  );
};