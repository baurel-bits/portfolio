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
      fr: "Un stage ou une alternance full-stack",
      en: "A full-stack internship or work-study role",
    },
    description: {
      fr: "Construire des interfaces web et mobiles et les API qui les alimentent, avec un accent sur le frontend et le mobile, au Cameroun ou à distance.",
      en: "Build web and mobile interfaces and the APIs behind them, with a focus on frontend and mobile, in Cameroon or remotely.",
    },
  },
  {
    id: "team",
    title: {
      fr: "Livrer en équipe",
      en: "Ship as part of a team",
    },
    description: {
      fr: "Continuer sur des projets menés à plusieurs, comme SuperApp côté frontend et Sekouh côté qualité, avec revues de code et exigence de qualité.",
      en: "Keep working on shared projects, as on SuperApp for the frontend and Sekouh for quality, with code reviews and a real standard of quality.",
    },
  },
  {
    id: "backend",
    title: {
      fr: "Consolider backend et qualité",
      en: "Deepen backend and quality",
    },
    description: {
      fr: "Progresser sur les tests automatisés et le déploiement, en gardant une architecture propre : Clean Architecture, microservices et Docker.",
      en: "Grow on automated testing and deployment while keeping a clean architecture: Clean Architecture, microservices and Docker.",
    },
  },
];
