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
  /** Variante JPEG de `src`, pour les aperçus sociaux qui refusent le WebP. */
  ogSrc?: string;
  width: number;
  height: number;
  alt: LocalizedText;
  /**
   * Ratio du cadre large de la page projet, pour les bannières composées
   * (ex. « 26 / 10 »). Par défaut le cadre reste en 16/10 et le visuel est rogné.
   */
  aspect?: string;
};

/**
 * Capture d'écran d'un écran de l'application, affichée dans la galerie du projet.
 * Les dimensions sont celles du fichier, pour éviter tout décalage de mise en page.
 */
export type ProjectScreen = {
  src: string;
  width: number;
  height: number;
  alt: LocalizedText;
  caption: LocalizedText;
};

export type Project = {
  id: string;
  title: LocalizedText;
  summary: LocalizedText;
  /** Résumé court réservé au CV imprimé (une ligne). */
  cvSummary?: LocalizedText;
  /** Année à confirmer : omise, elle n'est pas affichée. */
  year?: string;
  kind: ProjectKind;
  stack: readonly string[];
  details: readonly LocalizedText[];
  links: readonly ProjectLink[];
  cover?: ProjectCover;
  screens?: readonly ProjectScreen[];
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
