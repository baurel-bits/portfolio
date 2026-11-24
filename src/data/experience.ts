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
      fr: "2026",
      en: "2026",
    },
    role: {
      fr: "Développeur Frontend — SuperApp",
      en: "Frontend Developer — SuperApp",
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
    ],
    stack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GitLab"],
  },
  {
    id: "sekouh-qa",
    period: {
      fr: "2026",
      en: "2026",
    },
    role: {
      fr: "Assurance Qualité (QA) — SekouH",
      en: "Quality Assurance (QA) — SekouH",
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
      fr: "Recette fonctionnelle du système de gestion académique : scénarios de test, vérification des flux et remontée des anomalies.",
      en: "Functional quality assurance of the academic management system: test scenarios, flow verification and defect reporting.",
    },
    highlights: [
      {
        fr: "Définition et déroulement des scénarios de test d'assurance qualité (QA)",
        en: "Created and executed quality-assurance test scenarios for core workflows",
      },
    ],
    stack: ["QA", "PostgreSQL"],
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
