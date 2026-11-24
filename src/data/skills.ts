import type { SkillDomain } from "@/types";

/**
 * Domaines repris du CV (`src/features/cv/CV_Baurel_Bemmo_Final.pdf`) :
 * aucun domaine ni technologie affiché ici qui n'y figure pas.
 */
export const skillDomains: readonly SkillDomain[] = [
  {
    id: "langages",
    title: {
      fr: "Langages",
      en: "Languages",
    },
    description: {
      fr: "Les langages que j'utilise au quotidien, du front au SQL.",
      en: "The languages I use day to day, from the front end to SQL.",
    },
    items: ["JavaScript", "TypeScript", "Java", "SQL", "HTML5", "CSS3"],
  },
  {
    id: "frontend",
    title: {
      fr: "Frontend",
      en: "Frontend",
    },
    description: {
      fr: "Interfaces web responsive, composants réutilisables et intégration soignée.",
      en: "Responsive web interfaces, reusable components and careful integration.",
    },
    items: ["React", "Next.js", "Angular", "Tailwind CSS", "Bootstrap"],
  },
  {
    id: "mobile",
    title: {
      fr: "Mobile",
      en: "Mobile",
    },
    description: {
      fr: "Applications mobiles multiplateformes : écrans, navigation et appels à l'API.",
      en: "Cross-platform mobile apps: screens, navigation and API calls.",
    },
    items: ["React Native", "Expo"],
  },
  {
    id: "backend",
    title: {
      fr: "Backend",
      en: "Backend",
    },
    description: {
      fr: "API REST structurées : entités, services, contrôleurs et validation.",
      en: "Structured REST APIs: entities, services, controllers and validation.",
    },
    items: ["Spring Boot", "API REST", "JWT"],
  },
  {
    id: "data",
    title: {
      fr: "Bases de données",
      en: "Databases",
    },
    description: {
      fr: "Modélisation relationnelle et requêtes SQL selon le besoin du projet.",
      en: "Relational modelling and SQL queries matched to the project.",
    },
    items: ["PostgreSQL", "MySQL", "MariaDB"],
  },
  {
    id: "tools",
    title: {
      fr: "DevOps & outils",
      en: "DevOps & tools",
    },
    description: {
      fr: "Conteneurisation, gestion de version et travail en ligne de commande.",
      en: "Containerisation, version control and command-line workflow.",
    },
    items: ["Git", "GitHub", "GitLab", "Docker", "Linux"],
  },
  {
    id: "quality",
    title: {
      fr: "Qualité & méthodes",
      en: "Quality & methods",
    },
    description: {
      fr: "Vérifier le produit et structurer le travail : tests fonctionnels et Agile.",
      en: "Checking the product and structuring the work: functional testing and Agile.",
    },
    items: ["Tests fonctionnels (QA)", "Agile"],
  },
  {
    id: "learning",
    title: {
      fr: "En apprentissage",
      en: "Currently learning",
    },
    description: {
      fr: "Les sujets que j'approfondis en ce moment, sans les présenter comme acquis.",
      en: "Topics I am deepening right now, without presenting them as mastered.",
    },
    items: ["Clean Architecture", "Microservices", "Tests"],
  },
];
