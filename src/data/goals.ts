import type { Goal } from "@/types";

/**
 * Objectifs personnels : ce sont des intentions, pas des faits.
 * À ajuster librement selon le projet professionnel réel.
 */
export const goals: readonly Goal[] = [
  {
    id: "team",
    title: {
      fr: "Rejoindre une équipe produit",
      en: "Join a product team",
    },
    description: {
      fr: "Contribuer à une application utilisée en production, avec des revues de code et une vraie exigence de qualité.",
      en: "Contribute to a production application, with code reviews and a real standard of quality.",
    },
  },
  {
    id: "backend",
    title: {
      fr: "Consolider le backend",
      en: "Deepen the backend",
    },
    description: {
      fr: "Aller plus loin sur Java et Spring Boot : sécurité, tests automatisés et architecture applicative.",
      en: "Go further with Java and Spring Boot: security, automated tests and application architecture.",
    },
  },
  {
    id: "open-source",
    title: {
      fr: "Contribuer à l'open source",
      en: "Contribute to open source",
    },
    description: {
      fr: "Participer à des projets existants et documenter mes propres réalisations pour les rendre réutilisables.",
      en: "Take part in existing projects and document my own work so it can be reused.",
    },
  },
];
