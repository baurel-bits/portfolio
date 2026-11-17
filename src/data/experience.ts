import type { LocalizedText } from "@/types";

export type ExperienceEntry = {
  id: string;
  period: LocalizedText;
  role: LocalizedText;
  company: LocalizedText;
  location: LocalizedText;
  description: LocalizedText;
  highlights: readonly LocalizedText[];
  stack: readonly string[];
};

export const experiences: readonly ExperienceEntry[] = [
  {
    id: "superapp-team",
    period: {
      fr: "2024",
      en: "2024",
    },
    role: {
      fr: "Développeur Frontend & Intégration API — SuperApp",
      en: "Frontend Developer & API Integration — SuperApp",
    },
    company: {
      fr: "Projet d'équipe (Promotion KFOKAM48)",
      en: "Team project (KFOKAM48 cohort)",
    },
    location: {
      fr: "Yaoundé, Cameroun",
      en: "Yaoundé, Cameroon",
    },
    description: {
      fr: "Développement collaboratif de l'interface d'une plateforme de mise en relation de services en méthodologie agile.",
      en: "Collaborative frontend development for a service marketplace platform using agile methodology.",
    },
    highlights: [
      {
        fr: "Création de composants d'interface réutilisables et responsive en Next.js / TypeScript",
        en: "Built responsive, reusable UI components using Next.js and TypeScript",
      },
      {
        fr: "Intégration et validation des flux de données avec l'API REST backend",
        en: "Integrated and validated data flows with backend REST API endpoints",
      },
      {
        fr: "Travail collaboratif sous GitLab : branches de fonctionnalités et revues de code",
        en: "Collaborative Git workflow via GitLab: feature branches and peer code reviews",
      },
    ],
    stack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GitLab"],
  },
  {
    id: "sekouh-qa",
    period: {
      fr: "2024",
      en: "2024",
    },
    role: {
      fr: "Développeur Backend & Assurance Qualité — SekouH",
      en: "Backend & QA Developer — SekouH",
    },
    company: {
      fr: "Système de gestion académique",
      en: "Academic management system",
    },
    location: {
      fr: "Yaoundé, Cameroun",
      en: "Yaoundé, Cameroon",
    },
    description: {
      fr: "Participation à la conception de l'API Spring Boot et exécution de la recette fonctionnelle.",
      en: "Participated in Spring Boot API design and functional quality assurance testing.",
    },
    highlights: [
      {
        fr: "Modélisation relationnelle et vérification des contraintes d'intégrité PostgreSQL",
        en: "Relational data modeling and verification of PostgreSQL integrity constraints",
      },
      {
        fr: "Définition et déroulement des scénarios de test d'assurance qualité (QA)",
        en: "Created and executed quality-assurance test scenarios for core workflows",
      },
    ],
    stack: ["Java", "Spring Boot", "PostgreSQL", "QA"],
  },
  {
    id: "ecole-freelance",
    period: {
      fr: "2024",
      en: "2024",
    },
    role: {
      fr: "Développeur Web — Site Vitrine du Groupe Scolaire",
      en: "Web Developer — School Showcase Website",
    },
    company: {
      fr: "Groupe Scolaire Bilingue",
      en: "Bilingual School Group",
    },
    location: {
      fr: "Yaoundé, Cameroun",
      en: "Yaoundé, Cameroon",
    },
    description: {
      fr: "Conception, développement et mise en production d'un site vitrine complet pour un établissement scolaire.",
      en: "Designed, developed and deployed a full showcase website for an educational institution.",
    },
    highlights: [
      {
        fr: "Architecture d'information, ergonomie responsive et navigation multi-appareils",
        en: "Information architecture, responsive layout and seamless multi-device navigation",
      },
      {
        fr: "Déploiement continu, paramétrage de domaine et mise en ligne sur Netlify",
        en: "Continuous deployment pipeline, domain configuration and production release on Netlify",
      },
    ],
    stack: ["Next.js", "Tailwind CSS", "React", "Netlify"],
  },
];
