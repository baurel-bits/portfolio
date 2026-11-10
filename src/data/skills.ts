import type { SkillDomain } from "@/types";

export const skillDomains: readonly SkillDomain[] = [
  {
    id: "frontend",
    title: {
      fr: "Frontend",
      en: "Frontend",
    },
    description: {
      fr: "Interfaces responsive, composants réutilisables et intégration soignée.",
      en: "Responsive interfaces, reusable components and careful integration.",
    },
    items: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS", "Bootstrap"],
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
    items: ["Java", "Spring Boot"],
  },
  {
    id: "data",
    title: {
      fr: "Données",
      en: "Data",
    },
    description: {
      fr: "Modélisation relationnelle et requêtes SQL sur PostgreSQL.",
      en: "Relational modelling and SQL queries on PostgreSQL.",
    },
    items: ["PostgreSQL", "SQL"],
  },
  {
    id: "tools",
    title: {
      fr: "Outils",
      en: "Tools",
    },
    description: {
      fr: "Versioning, environnement de développement et travail en ligne de commande.",
      en: "Version control, development environment and command-line workflow.",
    },
    items: ["Git", "GitHub", "Linux"],
  },
];
