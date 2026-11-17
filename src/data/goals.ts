import type { Goal } from "@/types";

/**
 * Objectifs personnels : ce sont des intentions, pas des faits, mais elles
 * reprennent l'objectif écrit dans le CV (stage ou alternance full-stack,
 * accent frontend et mobile, au Cameroun ou à distance).
 */
export const goals: readonly Goal[] = [
  {
    id: "role",
    title: {
      fr: "Stage de fin d'études ou premier poste full-stack",
      en: "Final-year internship or junior full-stack role",
    },
    description: {
      fr: "Apporter une valeur immédiate sur l'intégration React / Next.js et la conception d'API Spring Boot, avec rigueur et autonomie, au Cameroun ou à distance.",
      en: "Deliver immediate value on React / Next.js interfaces and Spring Boot REST APIs, with rigor and autonomy, on-site or remotely.",
    },
  },
  {
    id: "team",
    title: {
      fr: "Intégrer une équipe technique exigeante",
      en: "Join an engineering team",
    },
    description: {
      fr: "Collaborer avec des développeurs expérimentés, participer activement aux revues de code et contribuer aux cycles de livraison continus.",
      en: "Collaborate with experienced engineers, take part in code reviews, and contribute to continuous delivery cycles.",
    },
  },
  {
    id: "backend",
    title: {
      fr: "Renforcer la fiabilité et la qualité logicielle",
      en: "Drive reliability and software quality",
    },
    description: {
      fr: "Mettre en pratique les tests automatisés, la conteneurisation Docker et les architectures modulaires, propres et maintenables.",
      en: "Implement automated testing, Docker containerization, and clean, maintainable modular architectures.",
    },
  },
];
