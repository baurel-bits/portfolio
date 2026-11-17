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
  // 1. SuperApp (Projet d'équipe - frontend & intégration)
  {
    id: "superapp",
    title: {
      fr: "SuperApp",
      en: "SuperApp",
    },
    summary: {
      fr: "Plateforme de mise en relation clients et prestataires de services : architecture frontend Next.js, typage strict TypeScript et consommation d'API REST.",
      en: "Client and service provider matchmaking platform: Next.js frontend architecture, strict TypeScript typing and REST API integration.",
    },
    kind: "fullstack",
    stack: ["React", "Next.js", "TypeScript", "API REST", "PostgreSQL"],
    details: [
      {
        fr: "Mise en relation ciblée clients / prestataires",
        en: "Targeted matchmaking between clients and service providers",
      },
      {
        fr: "Espaces dédiés profil client et profil prestataire",
        en: "Dedicated portals for client and provider profiles",
      },
      {
        fr: "Intégration d'API REST et formulaires typés",
        en: "REST API integration and strongly typed forms",
      },
    ],
    cover: {
      src: "/projects/superapp/screen.webp",
      ogSrc: "/projects/superapp/og.jpg",
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

  // 2. KFOKAM48 — Backend d'entreprise & frontend
  {
    id: "kfokam48",
    title: {
      fr: "KFOKAM48 — Présences & Relectures",
      en: "KFOKAM48 — Attendance & Peer Reviews",
    },
    summary: {
      fr: "Application complète d'émargement et d'évaluation anonyme par les pairs : API REST contractuelle OpenAPI en Java 21, migrations Flyway et frontend Next.js.",
      en: "Full attendance and anonymous peer-review application: contract-first OpenAPI REST API in Java 21, Flyway migrations and Next.js frontend.",
    },
    kind: "fullstack",
    stack: ["Java 21", "Spring Boot", "PostgreSQL", "Next.js", "TypeScript"],
    details: [
      {
        fr: "Trois espaces distincts : formateur, étudiant et relecteur",
        en: "Three dedicated areas: instructor, student and peer reviewer",
      },
      {
        fr: "Conception contractuelle d'API REST (OpenAPI) et migrations Flyway",
        en: "Contract-first REST API design (OpenAPI) with Flyway migrations",
      },
      {
        fr: "Algorithme de relecture anonyme et notation décentralisée sur 20",
        en: "Anonymous peer review algorithm and decentralized grading out of 20",
      },
    ],
    cover: {
      src: "/projects/kfokam48/screen.webp",
      ogSrc: "/projects/kfokam48/og.jpg",
      width: 1600,
      height: 1000,
      alt: {
        fr: "Capture d'écran de l'application KFOKAM48 — accueil « Présences, exercices et relectures par les pairs » avec les trois espaces",
        en: "KFOKAM48 app screenshot — “Attendance, assignments and peer reviews” home page with the three areas",
      },
    },
    links: [
      {
        label: { fr: "Code source", en: "Source code" },
        href: "https://github.com/baurel-bits/kfokam48-epreuve-KF48-YAO-168",
      },
    ],
    featured: true,
  },

  // 3. Bibliothèque — Spring Boot & Angular
  {
    id: "bibiotheque",
    title: {
      fr: "Bibliothèque",
      en: "Library",
    },
    summary: {
      fr: "Système complet de gestion de bibliothèque : catalogue, cycle de vie des emprunts et retours, rôles utilisateurs et sécurité JWT (Spring Boot + Angular).",
      en: "Full library management system: book catalogue, loan and return lifecycle, user roles and JWT security (Spring Boot + Angular).",
    },
    kind: "fullstack",
    stack: ["Spring Boot", "Angular", "MySQL", "JWT"],
    details: [
      {
        fr: "Gestion complète du catalogue de livres et des adhérents",
        en: "Complete book catalogue and member management",
      },
      {
        fr: "Suivi rigoureux des emprunts, retours et pénalités de retard",
        en: "Tracking of borrowings, returns and overdue penalties",
      },
      {
        fr: "Authentification JWT avec contrôle d'accès basé sur les rôles (RBAC)",
        en: "JWT authentication with role-based access control (RBAC)",
      },
    ],
    cover: {
      src: "/projects/bibiotheque/home.webp",
      ogSrc: "/projects/bibiotheque/og.jpg",
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
    screens: [
      {
        src: "/projects/bibiotheque/book_list.webp",
        width: 1909,
        height: 1037,
        alt: {
          fr: "Capture d'écran — liste des livres",
          en: "Screenshot — book list",
        },
        caption: { fr: "Liste des livres", en: "Book list" },
      },
      {
        src: "/projects/bibiotheque/book_details.webp",
        width: 1921,
        height: 1037,
        alt: {
          fr: "Capture d'écran — détail d'un livre",
          en: "Screenshot — book details",
        },
        caption: { fr: "Détail d'un livre", en: "Book details" },
      },
      {
        src: "/projects/bibiotheque/book_add.webp",
        width: 1909,
        height: 1037,
        alt: {
          fr: "Capture d'écran — formulaire d'ajout d'un livre",
          en: "Screenshot — add a book",
        },
        caption: { fr: "Ajout d'un livre", en: "Adding a book" },
      },
      {
        src: "/projects/bibiotheque/book_update.webp",
        width: 1919,
        height: 1037,
        alt: {
          fr: "Capture d'écran — formulaire de modification d'un livre",
          en: "Screenshot — edit a book",
        },
        caption: { fr: "Modification d'un livre", en: "Editing a book" },
      },
      {
        src: "/projects/bibiotheque/borrow_book.webp",
        width: 1909,
        height: 1037,
        alt: {
          fr: "Capture d'écran — emprunt d'un livre",
          en: "Screenshot — borrowing a book",
        },
        caption: { fr: "Emprunt d'un livre", en: "Borrowing a book" },
      },
      {
        src: "/projects/bibiotheque/return_book.webp",
        width: 1909,
        height: 1037,
        alt: {
          fr: "Capture d'écran — retour d'un livre",
          en: "Screenshot — returning a book",
        },
        caption: { fr: "Retour d'un livre", en: "Returning a book" },
      },
      {
        src: "/projects/bibiotheque/user_list.webp",
        width: 1919,
        height: 1037,
        alt: {
          fr: "Capture d'écran — liste des utilisateurs",
          en: "Screenshot — user list",
        },
        caption: { fr: "Liste des utilisateurs", en: "User list" },
      },
      {
        src: "/projects/bibiotheque/user_details.webp",
        width: 1919,
        height: 1039,
        alt: {
          fr: "Capture d'écran — détail d'un utilisateur",
          en: "Screenshot — user details",
        },
        caption: { fr: "Détail d'un utilisateur", en: "User details" },
      },
      {
        src: "/projects/bibiotheque/user_add.webp",
        width: 1909,
        height: 1037,
        alt: {
          fr: "Capture d'écran — formulaire d'ajout d'un utilisateur",
          en: "Screenshot — add a user",
        },
        caption: { fr: "Ajout d'un utilisateur", en: "Adding a user" },
      },
      {
        src: "/projects/bibiotheque/login.webp",
        width: 1919,
        height: 1037,
        alt: {
          fr: "Capture d'écran — écran de connexion",
          en: "Screenshot — sign-in screen",
        },
        caption: { fr: "Connexion", en: "Sign in" },
      },
      {
        src: "/projects/bibiotheque/forbidden.webp",
        width: 1921,
        height: 1037,
        alt: {
          fr: "Capture d'écran — accès refusé",
          en: "Screenshot — access denied",
        },
        caption: { fr: "Accès refusé", en: "Access denied" },
      },
    ],
    featured: true,
  },

  // 4. Site vitrine de l'école (Déployé en production)
  {
    id: "ecole",
    title: {
      fr: "Site du Groupe Scolaire",
      en: "School Showcase Website",
    },
    summary: {
      fr: "Site vitrine responsive déployé en ligne : présentation de l'établissement, filières éducatives et formulaire de contact direct.",
      en: "Live responsive showcase website: school presentation, educational tracks and contact form.",
    },
    kind: "frontend",
    stack: ["Next.js", "Tailwind CSS", "React"],
    details: [
      {
        fr: "Mise en page responsive et navigation fluide multi-écrans",
        en: "Responsive layout and smooth cross-device navigation",
      },
      {
        fr: "Déploiement continu et intégration sur Netlify",
        en: "Continuous deployment and hosting on Netlify",
      },
    ],
    cover: {
      src: "/projects/ecole/screen.webp",
      ogSrc: "/projects/ecole/og.jpg",
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

  // 5. DepensePro (Prototype mobile en cours de développement)
  {
    id: "depensepro",
    title: {
      fr: "DepensePro",
      en: "DepensePro",
    },
    summary: {
      fr: "Application mobile de suivi des dépenses et des budgets (prototype en développement) : tableau de bord, alertes de seuil, notifications et export des données.",
      en: "Mobile expense and budget tracking app (prototype in progress): dashboard, threshold alerts, notifications and data export.",
    },
    kind: "fullstack",
    stack: ["React Native", "Expo", "Spring Boot", "PostgreSQL"],
    details: [
      {
        fr: "Tableau de bord financier et suivi budgétaire en temps réel",
        en: "Financial dashboard and real-time budget tracking",
      },
      {
        fr: "Gestion des dépenses récurrentes et programmation de notifications",
        en: "Recurring expense management and scheduled notifications",
      },
      {
        fr: "Synthèses statistiques et fonctions d'export des données",
        en: "Statistical summaries and data export functions",
      },
    ],
    cover: {
      src: "/projects/depensepro/mockup.webp",
      ogSrc: "/projects/depensepro/og.jpg",
      width: 1600,
      height: 1000,
      fit: "contain",
      alt: {
        fr: "Maquette de l'application mobile DepensePro — tableau de bord des dépenses en vert et blanc (maquette et non capture de l'application)",
        en: "Mockup of the DepensePro mobile app — expense dashboard in green and white (a mockup, not a screenshot of the app)",
      },
    },
    links: [],
    featured: false,
  },

  // 6. GestiStock
  {
    id: "gestistock",
    title: {
      fr: "GestiStock",
      en: "GestiStock",
    },
    summary: {
      fr: "Application de gestion de stock avec API REST Java / Spring Boot : gestion des articles, mouvements d'entrées/sorties et validation des flux.",
      en: "Inventory management app with Java / Spring Boot REST API: items, inbound/outbound stock movements and flow validation.",
    },
    kind: "fullstack",
    stack: ["Java", "Spring Boot", "API REST", "PostgreSQL"],
    details: [
      {
        fr: "Gestion rigoureuse des entrées et sorties de stock",
        en: "Management of stock inbound and outbound movements",
      },
      {
        fr: "API REST découplée avec validation des contraintes d'intégrité",
        en: "Decoupled REST API with integrity constraint validation",
      },
      {
        fr: "Modélisation relationnelle des articles et historique des transactions",
        en: "Relational modelling of items and transaction history",
      },
    ],
    cover: {
      src: "/projects/gestistock/screen.webp",
      ogSrc: "/projects/gestistock/og.jpg",
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

  // 7. SekouH
  {
    id: "sekouh",
    title: {
      fr: "SekouH",
      en: "SekouH",
    },
    summary: {
      fr: "Système de gestion académique : établissements scolaires, classes, élèves, modules d'enseignement et relevés de notes.",
      en: "Academic management system: schools, classes, students, teaching units and grade reports.",
    },
    kind: "fullstack",
    stack: ["Java", "Spring Boot", "PostgreSQL"],
    details: [
      {
        fr: "Administration des écoles, affectation des classes et suivi des effectifs",
        en: "School administration, class assignments and student tracking",
      },
      {
        fr: "Suivi continu des enseignements et calcul des moyennes",
        en: "Continuous tracking of teaching units and GPA calculations",
      },
    ],
    cover: {
      src: "/projects/sekouh/screen.webp",
      ogSrc: "/projects/sekouh/og.jpg",
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
];
