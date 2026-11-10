import type { EducationEntry } from "@/types";

/**
 * Aucun diplôme n'a été communiqué : seule la formation par la pratique est
 * affichée, et cette mention est exacte. Rien n'est inventé ici.
 *
 * Pour ajouter un cursus réel, dupliquer cette forme :
 *
 *   {
 *     id: "licence-…",
 *     title: { fr: "…", en: "…" },
 *     place: { fr: "Établissement, ville", en: "Institution, city" },
 *     period: { fr: "2023 — 2025", en: "2023 — 2025" },
 *     description: { fr: "…", en: "…" },
 *   }
 *
 * Une date inconnue s'écrit explicitement (« En cours », « Année à confirmer ») :
 * ne jamais laisser une année approximative.
 */
export const educationEntries: readonly EducationEntry[] = [
  {
    id: "self-taught",
    period: {
      fr: "En continu",
      en: "Ongoing",
    },
    title: {
      fr: "Apprentissage autodidacte",
      en: "Self-directed learning",
    },
    place: {
      fr: "Projets personnels et documentation",
      en: "Personal projects and documentation",
    },
    description: {
      fr: "Apprentissage par la pratique : API REST Java et Spring Boot, interfaces React et Next.js, publication régulière des projets sur GitHub.",
      en: "Learning by building: Java and Spring Boot REST APIs, React and Next.js interfaces, with regular project releases on GitHub.",
    },
  },
];
