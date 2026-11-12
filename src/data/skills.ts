import type { SkillDomain } from "@/types";

/**
 * Domaines repris du CV (`public/cv/CV-Baurel-Bemmo-Fullstack.docx`) :
 * aucun domaine ni technologie affiché ici qui n'y figure pas.
 */
export const skillDomains: readonly SkillDomain[] = [
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
    items: [
      "React",
      "Angular",
      "Next.js",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Bootstrap",
    ],
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
    items: ["Java", "Spring Boot", "API REST"],
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
    items: ["PostgreSQL", "MariaDB", "MySQL", "SQL"],
  },
  {
    id: "tools",
    title: {
      fr: "DevOps & versioning",
      en: "DevOps & versioning",
    },
    description: {
      fr: "Conteneurisation, gestion de version et travail en ligne de commande.",
      en: "Containerisation, version control and command-line workflow.",
    },
    items: ["Docker", "Git", "GitHub", "GitLab", "Linux"],
  },
  {
    id: "architecture",
    title: {
      fr: "Architecture & qualité",
      en: "Architecture & quality",
    },
    description: {
      fr: "Structurer le code et le vérifier : découpage des responsabilités et tests.",
      en: "Structuring and checking the code: separation of concerns and testing.",
    },
    items: ["Clean Architecture", "Microservices", "Tests", "Assurance qualité (QA)"],
  },
];
