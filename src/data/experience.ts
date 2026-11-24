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
      fr: "Plateforme clients / prestataires — projet d'équipe agile (promotion KFOKAM48)",
      en: "Client / provider platform — agile team project (KFOKAM48 cohort)",
    },
    location: {
      fr: "Yaoundé, Cameroun",
      en: "Yaoundé, Cameroon",
    },
    description: {
      fr: "Plateforme clients / prestataires — projet d'équipe agile (promotion KFOKAM48).",
      en: "Client / provider platform — agile team project (KFOKAM48 cohort).",
    },
    highlights: [
      {
        fr: "Composants d'interface réutilisables et responsive en Next.js / TypeScript",
        en: "Reusable, responsive UI components built with Next.js / TypeScript",
      },
      {
        fr: "Intégration dans l'interface des données fournies par l'API REST",
        en: "Integrated REST API data into the user interface",
      },
      {
        fr: "Travail collaboratif sous GitLab : branches de fonctionnalités et revues de code",
        en: "Collaborative GitLab workflow: feature branches and code reviews",
      },
    ],
    stack: ["Next.js", "TypeScript", "React", "Tailwind CSS", "GitLab"],
  },
  {
    id: "sekouh-qa",
    period: {
      fr: "2026",
      en: "2026",
    },
    role: {
      fr: "Testeur QA (assurance qualité) — SekouH",
      en: "QA Tester (quality assurance) — SekouH",
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
      fr: "Recette fonctionnelle du système de gestion académique : scénarios de test, vérification des flux et remontée des anomalies.",
      en: "Functional quality assurance of the academic management system: test scenarios, flow verification and defect reporting.",
    },
    highlights: [
      {
        fr: "Définition et exécution des scénarios de test d'assurance qualité (recette fonctionnelle)",
        en: "Defined and executed quality-assurance test scenarios (functional acceptance)",
      },
    ],
    stack: ["QA", "Tests fonctionnels", "Java", "Spring Boot", "PostgreSQL"],
  },
  {
    id: "ecole-freelance",
    period: {
      fr: "2026",
      en: "2026",
    },
    role: {
      fr: "Développeur Web — Site vitrine du Groupe Scolaire",
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
        fr: "Conception, développement et mise en ligne d'un site vitrine responsive (déploiement continu et domaine sur Netlify)",
        en: "Designed, built and launched a responsive showcase website (continuous deployment and custom domain on Netlify)",
      },
    ],
    stack: ["Next.js", "React", "Tailwind CSS", "Netlify"],
  },
];
