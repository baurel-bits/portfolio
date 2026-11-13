import type { EducationEntry } from "@/types";

/**
 * Formation reprise du CV (`public/cv/CV-Baurel-Bemmo-Fullstack.docx`).
 *
 * Une date inconnue s'écrit explicitement (« En cours », « Année à confirmer ») :
 * ne jamais laisser une année approximative.
 */
export const educationEntries: readonly EducationEntry[] = [
  {
    id: "pkfokam",
    period: {
      fr: "2023 — présent",
      en: "2023 — present",
    },
    title: {
      fr: "Institut PKFokam (KFOKAM48)",
      en: "PKFokam Institute (KFOKAM48)",
    },
    place: {
      fr: "Développement full-stack et mobile · fin de cycle",
      en: "Full-stack and mobile development · final year",
    },
    description: {
      fr: "Cursus orienté développement web et mobile, mené en parallèle des projets personnels et d'équipe présentés sur ce site.",
      en: "Web and mobile development programme, run alongside the personal and team projects presented on this site.",
    },
  },
  {
    id: "sololearn-web",
    period: {
      fr: "Certificat obtenu",
      en: "Certificate earned",
    },
    title: {
      fr: "Sololearn — Développement web",
      en: "Sololearn — Web development",
    },
    place: {
      fr: "Formation en ligne",
      en: "Online course",
    },
    description: {
      fr: "Parcours certifiant sur les fondamentaux du web : HTML, CSS, JavaScript et intégration d'interfaces.",
      en: "Certified path covering web fundamentals: HTML, CSS, JavaScript and interface integration.",
    },
  },
  {
    id: "openclassrooms-js",
    period: {
      fr: "Certificat obtenu",
      en: "Certificate earned",
    },
    title: {
      fr: "OpenClassrooms — JavaScript",
      en: "OpenClassrooms — JavaScript",
    },
    place: {
      fr: "Formation en ligne",
      en: "Online course",
    },
    description: {
      fr: "Parcours certifiant consacré au langage : logique, manipulation du DOM et interactions.",
      en: "Certified path focused on the language: logic, DOM manipulation and interactions.",
    },
  },
];
