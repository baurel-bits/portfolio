import type { Locale } from "@/i18n/config";

export type LocalizedText = Record<Locale, string>;

export type ProjectKind = "frontend" | "fullstack";

export type ProjectLink = {
  label: LocalizedText;
  href: string;
};

/**
 * Visuel de couverture d'un projet.
 * `src` pointe un fichier de `public/projects/`, `alt` décrit la capture réelle.
 * Laisser `cover` absent tant que la vraie capture n'est pas fournie :
 * la carte affiche alors un emplacement explicitement identifié.
 */
export type ProjectCover = {
  src: string;
  width: number;
  height: number;
  alt: LocalizedText;
};

export type Project = {
  id: string;
  title: LocalizedText;
  summary: LocalizedText;
  /** Année à confirmer : omise, elle n'est pas affichée. */
  year?: string;
  kind: ProjectKind;
  stack: readonly string[];
  details: readonly LocalizedText[];
  links: readonly ProjectLink[];
  cover?: ProjectCover;
  featured: boolean;
};

export type SkillDomain = {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  items: readonly string[];
};

export type EducationEntry = {
  id: string;
  period: LocalizedText;
  title: LocalizedText;
  place: LocalizedText;
  description: LocalizedText;
};

export type Goal = {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
};
