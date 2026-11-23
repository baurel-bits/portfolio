# Rapport de test UI/UX — portfolio Baurel Bemmo

Date : 17 novembre 2026 · Périmètre : site public FR/EN, page CV, pages projet, 404 · Auteur : Buffy

---

## 1. Résumé

Le site est **fonctionnellement solide** : aucune rupture de mise en page sur 4 largeurs d'écran, aucun débordement horizontal, aucune erreur JavaScript, aucune ressource en échec, navigation clavier et menu mobile corrects, thème et langue persistants, formulaire accessible.

Il reste **3 anomalies d'accessibilité** (contraste d'un token, nom accessible du H1, taille des cibles tactiles), **2 points de robustesse** (attributs `rel`, URL `/projets` inexistante) et **4 améliorations d'ergonomie/design** (longueur de page, icônes dupliquées, visuel rogné, détails typographiques).

---

## 2. Méthode

| Élément | Détail |
|---|---|
| Serveur | `next dev` sur le port 3111 (Next 16.4.5, React 19.3, Node 24.19) |
| Navigateur | Chrome stable, mode headless, piloté en CDP via le WebSocket natif de Node — **aucune dépendance ajoutée au projet** |
| Largeurs | 1440×900, 768×1024, 390×844, 320×700 |
| Pages | `/fr`, `/en`, `/fr/cv`, `/en/cv`, `/fr/projets/bibiotheque`, `/fr/projets/depensepro`, `/fr/projets/sekouh`, `/fr/inexistant` |
| Thèmes | clair et sombre (`prefers-color-scheme` émulé) |
| Clavier | vrais événements `Tab` / `Escape` (pas de `focus()` programmatique) |
| Contrastes | calcul WCAG depuis les tokens CSS (`--color-*`) |

**Limites de la campagne** : mesures en mode développement (pas de build de production), pas de Lighthouse ni d'axe-core, un seul navigateur, contrastes calculés sur les tokens et non sur les pixels composites (le header en `backdrop-blur` est exclu), pas de test avec lecteur d'écran réel.

---

## 3. Résultats des tests

### 3.1 Mise en page et responsive — ✅

| Page | 1440 | 768 | 390 | 320 |
|---|---|---|---|---|
| Accueil (hauteur du document) | 9 184 px | 11 912 px | 14 107 px | 15 579 px |
| Débordement horizontal | 0 | 0 | 0 | 0 |

Idem pour `/fr/cv`, `/en/cv` et les pages projet (0 débordement à 390 et 320). Aucun élément ne dépasse la largeur du viewport.

### 3.2 Structure et hiérarchie — ✅

| Page | H1 | H2 | H3 |
|---|---|---|---|
| Accueil | 1 | 6 | 19 |
| CV | 1 | 6 | — |
| Projet Bibliothèque | 1 | 4 | — |
| 404 | 1 | — | — |

Un seul H1 par page, aucun saut de niveau (pas de H2 suivi de H4).

### 3.3 Images et liens — ✅

- 7 images sur l'accueil, 12 sur la page Bibliothèque : **toutes ont un `alt` non vide**.
- **0 lien sans nom accessible** (texte ou `aria-label`).
- **0 ancre orpheline** : chaque `href="#…"` pointe vers un `id` existant.

### 3.4 Contrastes — ⚠️ une seule paire en échec

| Texte | Fond | Ratio | Verdict |
|---|---|---|---|
| `ink-muted` #6b726c | `paper-sunken` #edece5 | **4,17:1** | ❌ sous AA (4,5) |
| `ink-muted` #6b726c | `paper` #f6f5f0 | 4,53:1 | ✅ juste au-dessus |
| `ink-soft` #3c423e | `paper` | 9,43:1 | ✅ |
| `ink` #101311 | `paper` | 17,13:1 | ✅ |
| `accent` #2d3bff | `paper` | 6,05:1 | ✅ |
| `console-muted` #96a099 | `console` #0c0f0e | 7,14:1 | ✅ |
| `console-text` #ecefe9 | `console` | 16,59:1 | ✅ |
| `signal` #d6f24a | `console` | 15,28:1 | ✅ |
| **Thème sombre** : `ink-muted` | `paper` #101413 | 6,88:1 | ✅ |
| **Thème sombre** : `accent` | `paper` | 6,75:1 | ✅ |

L'échec concerne du texte de 11 px (étiquettes mono de section, mentions secondaires) sur les panneaux `paper-sunken` : trop petit pour bénéficier des exonérations de contraste, donc soumis au seuil de 4,5:1.

### 3.5 Cibles tactiles — ⚠️

Sur l'accueil à 1440 px : **53 éléments interactifs**, dont 42 sous 44 px, 37 sous 40 px et **31 sous 32 px** de hauteur. Les cas les plus marqués :

| Élément | Hauteur mesurée |
|---|---|
| « Retour en haut » (footer) | 14 px |
| Liens de navigation (header + footer) | 16 px |
| Lien e-mail, lien GitHub/GitLab | 16 px |
| « Voir le projet » (page CV) | 14 px |
| Boutons `.docx` / `.pdf` du CV | 36 px (mobile) |

À 390 px : 36 des 45 éléments interactifs sont sous 44 px. Le critère WCAG 2.2 **2.5.8 (taille minimale 24×24 px)** n'est pas respecté par les liens à 14–16 px lorsqu'ils ne sont pas dans un paragraphe de texte courant.

### 3.6 Navigation clavier et focus — ✅

- **Lien d'évitement** : devient visible au premier `Tab` (`top: 16px`, hauteur 44 px, outline 2 px), cible correcte.
- **Menu mobile** : `aria-expanded` bascule, `inert` retiré du panneau, focus déplacé dans le panneau, scroll de page verrouillé ; `Échap` ferme le panneau, restaure `inert` et rend le focus au bouton d'ouverture.
- **Ordre de tabulation** : suit l'ordre visuel, aucun piège de focus hors menu.

### 3.7 Formulaire de contact — ✅

- 4 champs requis ; soumission vide → 4 `aria-invalid="true"` et 4 messages `role="alert"`.
- Aucune requête réseau partie lors des soumissions invalides.
- Fallback `mailto` présent mais inactif car la clé Web3Forms est configurée (comportement attendu).

### 3.8 Thème — ✅

Bascule clair → sombre fonctionnelle, `aria-pressed` cohérent, choix persisté en `localStorage` et réappliqué après rechargement, sans flash de thème clair.

### 3.9 Langue — ✅

`/fr` → `/en` conserve la page et le contexte, `lang` mis à jour, contenu traduit. (`/fr/projets` sans slug renvoie 404 — voir anomalie 4.)

### 3.10 Mouvement — ✅

`prefers-reduced-motion` respecté (`scroll-behavior: auto`, révélations affichées immédiatement). En mouvement normal, 25/25 blocs `.reveal` deviennent visibles lors d'un défilement humain.

### 3.11 Erreurs console et réseau — ✅

0 exception JavaScript et 0 requête en échec (hors 404 volontaire) sur les 8 pages testées.

---

## 4. Anomalies

> Les ratios et mesures de cette section décrivent l'état **avant** correction.
> Les changements appliqués et les nouvelles mesures sont en section 7.

### P1 — Contraste insuffisant des micro-libellés (#6b726c sur #edece5) — 4,17:1
- **Constat** : étiquettes mono 11 px (« 02 — COMPÉTENCES », « CERTIFICAT OBTENU », métadonnées) sous le seuil AA.
- **Impact** : lisibilité réduite en basse vision et sur écran bon marché, en plein soleil.
- **Correctif** : assombrir `--color-ink-muted` vers ~#5c635e (≈5:1 sur `paper-sunken`) **ou** utiliser `ink-soft` pour les libellés posés sur `paper-sunken`.
- **Fichier** : `src/styles/globals.css` (tokens), usages dans les sections.

### P1 — Nom accessible du H1 : « BaurelTEKER Codes »
- **Constat** : `textContent` du H1 vaut `BaurelTEKER Codes` (les deux lignes sont deux `<span>` de bloc sans espace). Un lecteur d'écran annonce un mot inexistant.
- **Correctif** : ajouter un espace (ou un `{" "}`) entre les deux spans, ou un `<span class="sr-only"> </span>`.
- **Fichier** : `src/components/sections/hero-section.tsx` (l. 44-58).

### P1 — Cibles tactiles sous 24 px
- **Constat** : 31 éléments interactifs sous 32 px de haut sur desktop, 14–16 px pour les liens de nav/footer et « Retour en haut ».
- **Impact** : WCAG 2.2 SC 2.5.8 non respecté ; taps ratés sur mobile.
- **Correctif** : `py-1.5 -my-1.5` (ou `min-h-11` + `inline-flex items-center`) sur les liens de nav, footer et les liens « Voir le projet » / « Retour aux projets ». Aucun changement visuel nécessaire.
- **Fichiers** : `src/components/layout/navbar.tsx`, `src/components/layout/footer.tsx`, `src/app/[locale]/cv/page.tsx`, `src/app/[locale]/projets/[slug]/page.tsx`.

### P2 — 13 liens `target="_blank"` sans `rel`
- **Constat** : 13 liens (GitHub, GitLab, maquettes) sur l'accueil, 5 sur le CV, 4–5 par page projet ; `rel` absent, donc ni `noopener` ni `noreferrer`.
- **Impact** : `window.opener` exposé sur les navigateurs anciens, et le referrer complet est transmis aux sites tiers.
- **Correctif** : ajouter `rel="noopener noreferrer"` sur les liens externes.
- **Fichiers** : sections `contact`, `projets`, `formation`, pages projet.

### P2 — `/fr/projets` renvoie 404
- **Constat** : seules les URL `/…/projets/[slug]` existent. Aucun lien interne ne pointe vers l'index (le « Retour aux projets » mène bien à `/fr#projets`), mais une URL partagée tronquée tombe sur la 404.
- **Correctif** : redirection vers `/fr#projets` (le plus simple) ou index de projets.
- **Fichier** : `next.config.ts` (redirections) ou nouvelle route.

### P3 — Page d'accueil très longue, surtout sur mobile
- **Constat** : document de 9 184 px à 1440, **14 107 px à 390** et 15 579 px à 320. La section Projets pèse à elle seule 3 686 px (desktop), 5 720 px (390) et 6 406 px (320) ; « Formation » ne commence qu'à 6 158 px (desktop) / 10 766 px (320).
- **Impact** : la partie « Formation » et « Objectifs » n'est presque jamais atteinte ; perception de site interminable.
- **Correctif** : 3 projets en vedette + lien « Voir tous les projets » vers un index, ou cartes plus compactes (cover 16:10, hauteur fixe, résumé sur 2 lignes).

### P3 — Icônes de compétences dupliquées
- **Constat** : Frontend, Backend et « Architecture & qualité » utilisent le même glyphe `<>`.
- **Correctif** : trois glyphes distincts (par ex. écran, serveur, bouclier).
- **Fichier** : `src/data/skills.ts` / composant de carte compétence.

### P3 — Visuel DepensePro rogné
- **Constat** : le collage de trois captures est coupé en haut dans le cadre de la carte (la première capture est tronquée).
- **Correctif** : recadrer le visuel source ou passer la couverture en `object-contain` sur `paper-sunken`.

### P3 — Détails typographiques
- Accroche du hero (`DÉVELOPPEUR FULL-STACK · FRONTEND & MOBILE`) casse sur deux lignes en 320 px avec le `&` orphelin en fin de ligne → espaces insécables autour du `&` ou variante courte sur mobile.
- La 404 affiche côte à côte « Retour à l'accueil » et « Back to home » : voulu ou pas, deux libellés pour la même destination se lit comme un doublon ; choisir une langue selon `Accept-Language` ou n'en garder qu'un avec la bascule de langue.

---

## 5. Propositions d'amélioration (au-delà des correctifs)

1. **Hiérarchiser les projets** : 1 projet phare en grand, 2 secondaires, puis « Voir tous les projets ». Réduit la page mobile de ~40 % et donne un parcours de lecture.
2. **Ajouter une navigation de section active** (déjà partiellement en place) : barre de progression de lecture ou indicateur de section courante sur mobile, utile sur 14 000 px.
3. **Résumé exécutif en haut de chaque page projet** : problème / solution / stack / résultat en 4 lignes avant le détail — c'est ce que regarde un recruteur pressé.
4. **États de focus explicites hors skip link** : vérifier un `outline` visible sur liens de nav, cartes projet et boutons (les cartes utilisent un `after` inset, à confirmer au clavier).
5. **Métadonnées sociales** : vérifier le rendu de l'image OG sur LinkedIn/Bluesky après le changement d'`alt` (aucun test de plateforme réelle effectué).
6. **Performance** : à mesurer sur un build de production (LCP/CLS) — non couvert ici.

---

## 6. Ce qui n'a pas été testé

- Build de production (les chiffres viennent de `next dev`) et Core Web Vitals.
- Lecteurs d'écran réels (NVDA/VoiceOver), mode contraste forcé Windows.
- Safari/Firefox/iOS.
- Envoi réel du formulaire vers Web3Forms.
- Rendu des partages sociaux (LinkedIn, Bluesky, X).

---

---

## 7. Correctifs appliqués (branche `fix/uiux-audit`)

| Anomalie | Changement | Mesure après |
|---|---|---|
| Contraste des micro-libellés | `--color-ink-muted` #6b726c → #5c635e (thème clair) | **5,21:1** sur `paper-sunken`, 5,66:1 sur `paper` |
| Nom accessible du H1 | espace réel entre les deux lignes du titre | « Baurel TEKER Codes » |
| Cibles tactiles | nav 44 px (soulignement replacé), footer 44 px, liens CV/projet ≥ 24 px | **0 élément sous 24 px** sur les 10 vues mesurées |
| Liens externes | `rel="noreferrer"` → `rel="noopener noreferrer"` | 14/14 liens `target="_blank"` |
| `/fr/projets` en 404 | nouvelle page index bilingue (H1, 7 cartes, canonical + hreflang, sitemap) | 200 ; « Retour aux projets » et fil d'Ariane pointent dessus |
| Page d'accueil trop longue | 3 projets en trois colonnes + bouton « Voir tous les projets » | 9 184 → **6 847 px** (1440, −25 %), 14 107 → **11 270 px** (390, −20 %), 15 579 → **12 336 px** (320, −21 %) |
| Icônes de compétences dupliquées | Mobile → smartphone, Architecture → calques | un glyphe par domaine |
| Visuel DepensePro rogné | champ `fit: "contain"` sur `ProjectCover` : visuel affiché entier sur un fond ambiant flouté du même visuel | visuel complet, sans rognage ni bandes noires, sans zoom au survol |
| Accroche hero coupée | espaces insécables autour du `·` et du `&` | « DÉVELOPPEUR FULL-STACK · » / « FRONTEND & MOBILE », plus de `&` orphelin |
| Anneau de focus sur fond sombre | variable `--focus-ring` : `signal` sur les sections `console`, le footer et les cartes projet, `accent` ailleurs | **15:1** sur `console` (l'accent n'y donnait que 2,9:1) |

Contrôles après modification : `tsc --noEmit` et `eslint --max-warnings=0` propres ; 0 exception JavaScript ; 0 débordement horizontal ; un seul H1 par page, aucun saut de niveau (l'index `/projets` a un H1 et des cartes en H2).

**États de focus vérifiés au vrai clavier** (vrais événements `Tab`, pas de `focus()` programmatique) : 47 éléments sur `/fr`, 78 sur `/fr/projets`, 31 sur une page projet, 40 sur le CV, 47 sur `/en`, 78 à 320 px, plus les 9 liens du menu mobile — **tous avec un indicateur visible**. Les seuls éléments sans anneau sont ceux du portail de développement Next (`NEXTJS-PORTAL`), absent en production. Menu mobile ouvert avec `Entrée` : focus déplacé dans le panneau, piège de focus circulaire, `Échap` referme et rend le focus au bouton.

**Corrigé depuis** : la 404 rendait un document HTML complet à l'intérieur du layout localisé (`<html>` imbriqué). `src/app/global-not-found.tsx` gère désormais les URL non correspondantes, et `src/app/not-found.tsx` ne rend plus que le contenu des `notFound()` localisés.

**Non appliqué, à trancher** : les aperçus sociaux et les mesures sur build de production. La section Expérience ajoutée depuis allonge la page d'accueil ; les hauteurs du tableau ci-dessus sont donc antérieures à cet ajout.

---

## 8. Core Web Vitals sur build de production

**Méthode** : `next build` + `next start`, Chrome headless, mobile 390×844 DPR 2, **CPU ×4**, réseau **1,6 Mb/s / 150 ms RTT**, cache vidé à chaque page, interactions réelles (clics) pour l'INP. LCP et CLS via `PerformanceObserver`, INP approché par la durée maximale des événements, TBT = somme des dépassements au-delà de 50 ms.

| Page | LCP avant | LCP après | CLS | TBT | INP (à ×4) |
|---|---|---|---|---|---|
| `/fr` | 1 936 ms | **2 276 ms** | 0 | 2 211 ms | 424 ms |
| `/en` | 1 696 ms | **2 096 ms** | 0 | 1 993 ms | 416 ms |
| `/fr/cv` | 1 180 ms | **1 428 ms** | 0 | 588 ms | 208 ms |
| `/fr/projets` | 3 676 ms ❌ | **1 820 ms** | 0 | 916 ms | 360 ms |
| `/fr/projets/depensepro` | 3 296 ms ❌ | **1 256 ms** | 0 | 658 ms | 152 ms |
| `/fr/projets/bibiotheque` | 3 500 ms ❌ | **1 420 ms** | 0 | 561 ms | 208 ms |
| `/fr` desktop non bridé | 292 ms | 248 ms | 0 | 81 ms | 136 ms |

**Régression trouvée et corrigée** : sur les pages projet et l'index, le bloc au-dessus de la ligne de flottaison était enveloppé dans `Reveal`, donc en `opacity: 0` jusqu'à l'hydratation. Le LCP attendait React (3,3 à 3,7 s) au lieu du premier paint. Un réglage `immediate` sur `Reveal` et `SectionHeader` rend ces blocs visibles dès le HTML, sans animation : LCP ramené entre 1,2 et 1,8 s. Les sections sous la ligne de flottaison continuent de s'animer.

CLS à 0 sur toutes les pages : chaque image porte ses dimensions, les polices sont chargées par `next/font` et le thème est posé avant le premier rendu.

**Reste au-dessus des seuils, non corrigé** :

- **TBT 2,2 s et INP 424 ms sur l'accueil** à CPU ×4. Le clic mesuré est la bascule de thème : le traitement JavaScript ne prend que 5 à 12 ms, le reste est l'attente de la frame — le changement de `data-theme` recalcule les variables CSS sur ~745 nœuds. Sur desktop non bridé, le même clic donne 136 ms. Non corrigé car cela demanderait de réduire la surface de repeinture du thème ou de supprimer l'hydratation des `Reveal` (passage en animations CSS `view()`), un changement plus large que la correction demandée.

**Limites** : pas de données terrain (CrUX), une seule passe par page (±20 % de variance), INP mesuré sur une seule interaction, pas de test sur un appareil mobile réel. À noter aussi : `next build` échoue avec un panic Turbopack si le dossier `.next` provient d'une session `next dev` ; `rm -rf .next` avant le build règle le problème (sans rapport avec le code).

*Captures et profils de test : `.freebuff/uiux/` (dossier ignoré par git).*
