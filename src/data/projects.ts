import { site } from "@/lib/site";
import type { Project } from "@/types";

/**
 * Ajouter un projet = ajouter un objet ici.
 *
 * Visuel : déposer la capture réelle dans `public/projects/` (format 1600×1000
 * conseillé, WebP ou PNG), puis renseigner `cover`. Tant que `cover` est absent,
 * la carte affiche un emplacement « capture à venir » — jamais une image
 * présentée comme une vraie capture.
 *
 * Année : laisser `year` vide tant qu'elle n'est pas confirmée.
 * Liens : ne jamais inventer de dépôt. `links` reste vide si l'URL n'existe pas.
 */
export const projects: readonly Project[] = [
  {
    id: "depensepro",
    title: {
      fr: "DepensePro",
      en: "DepensePro",
    },
    summary: {
      fr: "Application de gestion des dépenses avec une API REST complète : entités, services, contrôleurs et validation des données.",
      en: "Expense management application built on a complete REST API: entities, services, controllers and data validation.",
    },
    kind: "fullstack",
    stack: ["Java", "Spring Boot", "API REST", "PostgreSQL"],
    details: [
      {
        fr: "Modélisation des entités et des relations métier",
        en: "Entity modelling and business relationships",
      },
      {
        fr: "Couche service et contrôleurs REST découplés",
        en: "Decoupled service layer and REST controllers",
      },
      {
        fr: "Validation des données entrantes et persistance PostgreSQL",
        en: "Incoming data validation and PostgreSQL persistence",
      },
    ],
    links: [],
    featured: true,
  },
  {
    id: "portfolio",
    title: {
      fr: "Portfolio personnel",
      en: "Personal portfolio",
    },
    summary: {
      fr: "Site vitrine construit avec Next.js et Tailwind CSS : composants réutilisables, responsive et navigation par sections.",
      en: "Showcase site built with Next.js and Tailwind CSS: reusable components, responsive layout and section navigation.",
    },
    kind: "frontend",
    stack: ["Next.js", "Tailwind CSS", "React"],
    details: [
      {
        fr: "Design system en tokens et composants partagés",
        en: "Token-based design system and shared components",
      },
      {
        fr: "Mise en page responsive du mobile au grand écran",
        en: "Responsive layout from mobile to large screens",
      },
    ],
    links: [
      {
        label: { fr: "Voir en ligne", en: "View live" },
        href: site.previousPortfolio,
      },
    ],
    featured: false,
  },
];
