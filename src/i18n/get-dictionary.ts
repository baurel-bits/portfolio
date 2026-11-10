import type { Locale } from "@/i18n/config";
import { en } from "@/i18n/messages/en";
import { fr } from "@/i18n/messages/fr";

export type Dictionary = typeof fr;

const dictionaries: Record<Locale, Dictionary> = { fr, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
