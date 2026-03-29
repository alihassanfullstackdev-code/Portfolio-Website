import { LucideIcon } from "lucide-react";

export interface Skill {
  name: string;
  level: number;
}

export interface SkillGroupProps {
  title: string;
  icon: LucideIcon;
  skills: Skill[];
}

export interface ProjectProps {
  title: string;
  category: string;
  description: string;
  image: string;
  delay: number;
}

export interface NavLink {
  name: string;
  href: string;
}