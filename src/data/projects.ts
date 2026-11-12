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
      fr: "Application mobile de suivi des dépenses et des budgets : tableau de bord, dépenses récurrentes, notifications, statistiques et export des données.",
      en: "Mobile app for tracking expenses and budgets: dashboard, recurring expenses, notifications, statistics and data export.",
    },
    kind: "fullstack",
    stack: ["React Native", "Expo", "Spring Boot", "PostgreSQL"],
    details: [
      {
        fr: "Tableau de bord des dépenses et suivi du budget",
        en: "Expense dashboard and budget tracking",
      },
      {
        fr: "Dépenses récurrentes et notifications",
        en: "Recurring expenses and notifications",
      },
      {
        fr: "Statistiques et export des données",
        en: "Statistics and data export",
      },
    ],
    cover: {
      src: "/projects/depensepro/mockup.png",
      width: 1600,
      height: 1000,
      alt: {
        fr: "Maquette de l'application mobile DepensePro — tableau de bord des dépenses en vert et blanc (maquette et non capture de l'application)",
        en: "Mockup of the DepensePro mobile app — expense dashboard in green and white (a mockup, not a screenshot of the app)",
      },
    },
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
    links: [
      {
        label: { fr: "Code source", en: "Source code" },
        href: "https://github.com/baurel-bits/bibiotheque",
      },
    ],
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
    cover: {
      src: "/projects/gestistock/screen.jpeg",
      width: 1337,
      height: 645,
      alt: {
        fr: "Capture d'écran de GestiStock — écran de connexion au gestionnaire de stock",
        en: "GestiStock screenshot — sign-in screen of the stock manager",
      },
    },
    links: [
      {
        label: { fr: "Code source", en: "Source code" },
        href: "https://github.com/baurel-bits/Gesti-Stock-App",
      },
    ],
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
    cover: {
      src: "/projects/sekouh/screen.jpeg",
      width: 1600,
      height: 749,
      alt: {
        fr: "Capture d'écran de SekouH — page d'accueil et tableau de bord de gestion scolaire",
        en: "SekouH screenshot — landing page and school management dashboard",
      },
    },
    links: [
      {
        label: { fr: "Code source (frontend)", en: "Source code (frontend)" },
        href: "https://gitlab.com/kfofam48/sekouh/sekouh-frontend",
      },
    ],
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
    cover: {
      src: "/projects/superapp/screen.jpeg",
      width: 1600,
      height: 806,
      alt: {
        fr: "Capture d'écran de SuperApp — page d'accueil de mise en relation avec les prestataires",
        en: "SuperApp screenshot — landing page for connecting with service providers",
      },
    },
    links: [
      {
        label: { fr: "Code source (frontend)", en: "Source code (frontend)" },
        href: "https://gitlab.com/kfofam48/super-app/front-end/frontend_superapp",
      },
    ],
    featured: true,
  },

  // TradeFlow : annoncé « en conception » dans le CV. Pas encore de capture,
  // donc pas de `cover` — la carte affiche l'emplacement réservé, sans image.
  {
    id: "tradeflow",
    title: {
      fr: "TradeFlow",
      en: "TradeFlow",
    },
    summary: {
      fr: "Solution B2B de mise en relation entre grossistes et revendeurs de produits frais : suivi des commandes et gestion des problèmes de qualité, en mobile et en espace web fournisseur.",
      en: "B2B platform connecting wholesalers and retailers of fresh produce: order tracking and quality-issue handling, on mobile and in a supplier web space.",
    },
    kind: "fullstack",
    stack: ["React Native", "Next.js", "Spring Boot", "PostgreSQL"],
    details: [
      {
        fr: "Suivi des commandes côté grossiste et revendeur",
        en: "Order tracking for wholesalers and retailers",
      },
      {
        fr: "Déclaration et suivi des problèmes de qualité",
        en: "Quality-issue reporting and follow-up",
      },
      {
        fr: "Application mobile et espace web fournisseur",
        en: "Mobile app and supplier web space",
      },
    ],
    links: [],
    featured: false,
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
    cover: {
      src: "/projects/ecole/screen.jpeg",
      width: 1600,
      height: 768,
      alt: {
        fr: "Capture d'écran du site de l'école — page d'accueil du groupe scolaire bilingue",
        en: "School website screenshot — home page of the bilingual school group",
      },
    },
    links: [
      {
        label: { fr: "Voir en ligne", en: "View live" },
        href: "https://teal-palmier-dfed6f.netlify.app/",
      },
    ],
    featured: false,
  },
];
