# Journal de Travail de l'Agent — Optimisation du Portfolio & CV

**Date :** 17 novembre 2026  
**Candidat :** Baurel Bemmo (`TEKER Codes`)  
**URL de production :** [https://porfoliodeteker.netlify.app/fr](https://porfoliodeteker.netlify.app/fr)  
**URL du CV en ligne :** [https://porfoliodeteker.netlify.app/fr/cv](https://porfoliodeteker.netlify.app/fr/cv)  
**Objectif :** Aligner le portfolio et le CV sur les standards attendus par les recruteurs tech et Lead Developers : suppression des freins bloquants, clarté de positionnement et valorisation des projets prouvés.

---

## 1. Audit & Diagnostic initial (Perspective Recruteur)

- **Analyse complète de la base de code** : Next.js 16 (App Router), React 19, TypeScript strict, Tailwind CSS v4, i18n FR/EN.
- **Vérification du rapport UI/UX existant (`RAPPORT-UIUX.md`)** : validation de l'accessibilité générale, de la navigation clavier et des formulaires.
- **Identification des 4 freins majeurs côté recrutement** :
  1. *CV au format `.docx`* : format inadapté au recrutement (risque sécurité, déformatage mobile, rejet par les ATS).
  2. *Identité incomplète* : mention du seul prénom `Baurel` associé au pseudo `TEKER Codes` au lieu du nom professionnel complet `Baurel Bemmo`.
  3. *Projets vedettes sans code* : `DepensePro` affiché en tête d'accueil avec une maquette et 0 lien/code.
  4. *Syndrome du couteau suisse junior* : accumulation de technologies sans hiérarchie de maîtrise.

---

## 2. Modifications appliquées pas à pas (Toutes terminées ✅)

### Étape 1 : Domaine de production et identité (`src/lib/site.ts`) — ✅
- **Origine officielle Netlify** : configuration de `https://porfoliodeteker.netlify.app` en fallback de production et support des variables d'environnement Netlify (`process.env.URL`, `process.env.DEPLOY_PRIME_URL`).
- **Nom complet du candidat** : mise à jour de `owner: "Baurel Bemmo"`.
- **Ajout des champs LinkedIn** : `linkedin` et `linkedinHandle` pour visibilité professionnelle.
- **URL du CV** : déduite de `siteUrl` et de la locale dans les métadonnées, sans URL dupliquée dans les données.

### Étape 2 : Accès et ergonomie du CV (`download-cv-button.tsx`, `navbar.tsx`, `hero-section.tsx`) — ✅
- **Consultation directe en ligne** : les boutons d'action pointent vers la page CV interactive (`/{locale}/cv`).
- **Libellé professionnel** : « Consulter le CV » au lieu de « Télécharger le CV ».
- **Téléchargement PDF préservé** : le bouton sur la page `/cv` télécharge le fichier `.pdf`.

### Étape 3 : Configuration du linter (`eslint.config.mjs`) — ✅
- Ajout de `".freebuff/**"` aux exclusions globales.
- Résultat : `npm run lint` = 0 erreur, 0 avertissement.

### Étape 4 : Clarification éditoriale & positionnement (`fr.ts`, `en.ts`, `goals.ts`) — ✅
- **Hero** : « Baurel Bemmo » en titre principal, disponibilité pour stage/premier poste.
- **Objectifs** : discours orienté valeur ajoutée (pas de formules scolaires).
- **Footer et méta-données** : nom complet partout.

### Étape 5 : Restructuration des projets (`src/data/projects.ts`) — ✅
- **Réorganisation homepage** : SuperApp → KFOKAM48 → Bibliothèque.
- **DepensePro** : étiqueté « prototype en cours », déplacé hors de la page d'accueil.
- **Descriptions enrichies** : spécificités techniques mises en avant.

### Étape 6 : Intégration LinkedIn — ✅
- **`src/components/ui/icons.tsx`** : ajout du composant `LinkedInIcon` (SVG).
- **`src/components/sections/contact-section.tsx`** : lien LinkedIn dans la section Contact.
- **`src/components/layout/footer.tsx`** : lien LinkedIn dans le footer.
- **`src/app/[locale]/cv/page.tsx`** : ligne de métadonnées LinkedIn dans l'en-tête du CV.

### Étape 7 : Données d'expérience professionnelle (`src/data/experience.ts`) — ✅
- Création du fichier de données avec 3 entrées bilingues (FR/EN) :
  1. **SuperApp** — Développeur Frontend & Intégration API (Next.js, TypeScript, Tailwind CSS, GitLab).
  2. **SekouH** — Développeur Backend & QA (Java, Spring Boot, PostgreSQL).
  3. **École** — Développeur Web freelance (Next.js, Tailwind CSS, Netlify).
- Chaque entrée contient : période, rôle, entreprise, lieu, description, points forts et stack.

### Étape 8 : Section Expérience câblée dans la page CV — ✅
- **`src/app/[locale]/cv/page.tsx`** : import de `experiences` et rendu d'une section `<CvSection>` complète entre Profil et Compétences.
- Design cohérent avec la section Formation : timeline verticale, puces accent, tags de stack.
- Affichage des highlights avec icônes `CheckIcon` pour chaque point fort.

### Étape 9 : Nettoyage — ✅
- Suppression des fichiers temporaires : `scratch_find_urls.js`, `scratch_inspect_cv.js`.

---

## 3. Vérification du fichier CV Word (`public/cv/CV-Baurel-Bemmo-Fullstack.docx`)

- ✅ Le fichier `.docx` contient déjà l'URL `https://porfoliodeteker.netlify.app/fr` en texte visible.
- ⚠️ Les URLs dans le document sont en texte brut, pas en hyperlien cliquable (aucune relation hyperlink dans `word/_rels/document.xml.rels`).
- 💡 Recommandation : ouvrir le fichier dans Word et transformer manuellement les URLs en hyperliens cliquables (Ctrl+K).

---

## 4. Contrôles de validation technique

| Vérification | Résultat |
|---|---|
| `npx tsc --noEmit` | ✅ 0 erreur |
| `npx eslint src` | ✅ 0 erreur, 0 avertissement |
| Routes dynamiques `[locale]`, `[slug]` | ✅ Préservées |
| i18n FR/EN cohérence des clés | ✅ Toutes les clés alignées |

---

## 5. Fichiers modifiés (liste complète)

| Fichier | Type |
|---|---|
| `eslint.config.mjs` | Modifié |
| `src/lib/site.ts` | Modifié |
| `src/components/ui/download-cv-button.tsx` | Modifié |
| `src/components/ui/icons.tsx` | Modifié |
| `src/components/layout/navbar.tsx` | Modifié |
| `src/components/layout/footer.tsx` | Modifié |
| `src/components/sections/hero-section.tsx` | Modifié |
| `src/components/sections/contact-section.tsx` | Modifié |
| `src/i18n/messages/fr.ts` | Modifié |
| `src/i18n/messages/en.ts` | Modifié |
| `src/data/goals.ts` | Modifié |
| `src/data/projects.ts` | Modifié |
| `src/app/[locale]/cv/page.tsx` | Modifié |
| `src/data/experience.ts` | **Créé** |
| `AGENTWORK.md` | **Créé** |

---

## 6. Points restants & recommandations

### À faire par le candidat
- [ ] **Confirmer l'URL LinkedIn** : actuellement `https://www.linkedin.com/in/baurel-bemmo` (placeholder).
- [ ] **Rendre les liens cliquables dans le `.docx`** : ouvrir dans Word → sélectionner chaque URL → Ctrl+K → coller le lien.
- [ ] **Consolider les comptes GitHub** : 2 comptes affichés (principal + ancien) — envisager de n'en montrer qu'un.

### Améliorations appliquées depuis
- [x] Schema.org `sameAs` enrichi (GitHub, LinkedIn, GitLab) dans `layout.tsx`.
- [x] Section Expérience ajoutée à la page d'accueil, avec ancre dans la nav et le footer.
- [x] 404 sans `<html>` imbriqué : `global-not-found.tsx` pour les URL non correspondantes,
  `not-found.tsx` pour les `notFound()` dans `[locale]`.
- [x] Documentation de déploiement alignée sur Netlify (URL canonique, variables, previews).
- [x] Build local fiabilisé : supprimer `.next` avant `npm run build` si le dossier vient de `next dev`.

### Améliorations futures suggérées
- [ ] Réduire le coût du changement de thème sur mobile bridé (TBT 2,2 s mesuré dans `RAPPORT-UIUX.md`).

---

## 7. Passe de correction et redéploiement (23 novembre 2026)

- 404 sans `<html>` imbriqué (`global-not-found.tsx` + `not-found.tsx` + `experimental.globalNotFound`).
- Cible de déploiement confirmée : Netlify ; `.env.example`, `.env.local`, `README.md` et
  `README.deploy.md` alignés sur `https://porfoliodeteker.netlify.app`.
- Previews Netlify signalées `noindex` via `CONTEXT=deploy-preview` dans `next.config.ts`.
- Numérotation des sections harmonisée (01 à 07) et clés de la section Expérience stabilisées.
- Champ `site.cvUrl` supprimé : l'URL du CV est dérivée de `siteUrl` et de la locale.
- Vérifications : `npm run lint`, `npx tsc --noEmit`, `npm run build` et contrôles HTTP locaux.
