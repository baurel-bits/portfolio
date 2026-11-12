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
    id: "bibiotheque",
    title: {
      fr: "Bibliothèque",
      en: "Library",
    },
    summary: {
      fr: "Application de gestion de bibliothèque (Spring Boot + Angular). Création, consultation et modification des livres et des utilisateurs, gestion des emprunts.",
      en: "Library management application (Spring Boot + Angular). Create, view and update books and users, manage borrowings.",
    },
    kind: "fullstack",
    stack: ["Spring Boot", "Angular", "MySQL", "JWT"],
    details: [
      {
        fr: "Gestion des livres et des utilisateurs",
        en: "Book and user management",
      },
      {
        fr: "Suivi des emprunts et des retours",
        en: "Tracking of borrowings and returns",
      },
      {
        fr: "Authentification JWT et rôles",
        en: "JWT authentication and roles",
      },
    ],
    cover: {
      src: "/projects/bibiotheque/home.png",
      width: 1918,
      height: 1035,
      alt: {
        fr: "Capture d'écran de l'application de bibliothèque — vue d'accueil",
        en: "Screenshot of the library application — home view",
      },
    },
    links: [],
    featured: false,
  },

  {
    id: "gestistock",
    title: {
      fr: "GestiStock",
      en: "GestiStock",
    },
    summary: {
      fr: "Application de gestion de stock avec API REST : articles, mouvements d'entrée et de sortie, validation et persistance.",
      en: "Stock management application with a REST API: items, in/out movements, validation and persistence.",
    },
    kind: "fullstack",
    stack: ["Java", "Spring Boot", "API REST", "PostgreSQL"],
    details: [
      {
        fr: "Gestion des entrées et sorties de stock",
        en: "Management of stock in and out movements",
      },
      {
        fr: "API REST découplée et validée",
        en: "Decoupled and validated REST API",
      },
      {
        fr: "Modélisation des articles et des mouvements",
        en: "Modelling of items and movements",
      },
    ],
    links: [],
    featured: false,
  },

  {
    id: "sekouh",
    title: {
      fr: "SekouH",
      en: "SekouH",
    },
    summary: {
      fr: "Application de gestion scolaire : établissements, classes, élèves, enseignements et suivi des notes.",
      en: "School management application: institutions, classes, students, teaching and grade tracking.",
    },
    kind: "fullstack",
    stack: ["Java", "Spring Boot", "PostgreSQL"],
    details: [
      {
        fr: "Gestion des écoles, classes et élèves",
        en: "Management of schools, classes and students",
      },
      {
        fr: "Suivi des enseignements et des notes",
        en: "Tracking of teaching and grades",
      },
    ],
    links: [],
    featured: false,
  },

  {
    id: "superapp",
    title: {
      fr: "SuperApp",
      en: "SuperApp",
    },
    summary: {
      fr: "Application de mise en relation entre clients et prestataires de services, avec un espace dédié à chaque profil.",
      en: "Application connecting clients with service providers, with a dedicated space for each profile.",
    },
    kind: "fullstack",
    stack: ["React", "Next.js", "TypeScript", "API REST", "PostgreSQL"],
    details: [
      {
        fr: "Mise en relation clients / prestataires",
        en: "Matching clients with service providers",
      },
      {
        fr: "Espace client et espace prestataire",
        en: "Client and provider areas",
      },
    ],
    links: [],
    featured: true,
  },

  // Site vitrine de l'école (remplace l'ancien projet « portfolio »).
  {
    id: "ecole",
    title: {
      fr: "Site de l'école",
      en: "School website",
    },
    summary: {
      fr: "Site vitrine de l'école, conçu et déployé : présentation de l'établissement, des filières et des contacts.",
      en: "School showcase website, designed and deployed: presentation of the institution, its programmes and contact details.",
    },
    kind: "frontend",
    stack: ["Next.js", "Tailwind CSS", "React"],
    details: [
      {
        fr: "Mise en page responsive et navigation claire",
        en: "Responsive layout and clear navigation",
      },
      {
        fr: "Déploiement continu sur Netlify",
        en: "Continuous deployment on Netlify",
      },
    ],
    links: [
      {
        label: { fr: "Voir en ligne", en: "View live" },
        href: "https://teal-palmier-dfed6f.netlify.app/",
      },
    ],
    featured: false,
  },
];
