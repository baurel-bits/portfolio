export const sectionIds = [
  "a-propos",
  "competences",
  "projets",
  "experience",
  "formation",
  "objectifs",
  "contact",
] as const;

export type SectionId = (typeof sectionIds)[number];
