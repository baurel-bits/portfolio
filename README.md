# TEKER Codes — portfolio de Baurel

Portfolio bilingue (français / anglais) construit avec Next.js 16 (App Router), React 19 et
Tailwind CSS v4. Le contenu est éditorial : chaque information affichée provient de
`src/data/` ou de `src/i18n/messages/`.

## Démarrer

```bash
npm install
cp .env.example .env.local   # puis renseigner les variables (voir ci-dessous)
npm run dev                  # http://localhost:3000 → redirige vers /fr
```

## Variables d'environnement

| Variable                           | Rôle                                  | Sans valeur                                       |
| ---------------------------------- | ------------------------------------- | ------------------------------------------------- |
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | Clé du formulaire de contact          | Le formulaire affiche l'email direct              |
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID`     | Identifiant du site pour l'analytics Umami | Aucune balise d'analytics n'est chargée      |
| `NEXT_PUBLIC_SITE_URL`             | URL publique (canonical, Open Graph, sitemap) | Domaine Netlify détecté (`URL` / `DEPLOY_PRIME_URL`), sinon `https://porfoliodeteker.netlify.app` |

Les variables `NEXT_PUBLIC_*` sont intégrées au build : après les avoir modifiées,
il faut relancer `npm run dev` ou `npm run build`.

## Formulaire de contact (Web3Forms)

Le formulaire utilise l'endpoint officiel `https://api.web3forms.com/submit`
([documentation](https://docs.web3forms.com/getting-started/api-reference)),
appelé depuis le navigateur comme le recommande Web3Forms.

Obtenir une clé :

1. Ouvrir <https://web3forms.com/> et créer une clé avec l'adresse email de réception.
2. Valider l'email de confirmation : la clé est envoyée par email.
3. La coller dans `.env.local` : `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=...`.
4. Relancer le build / le serveur, puis envoyer un message de test depuis `/fr#contact`.

La clé est publique par conception (elle identifie le formulaire, elle ne permet pas de
lire les messages reçus). Tant qu'aucune clé n'est configurée, le formulaire n'affiche
pas de champs inutiles : il renvoie vers l'adresse email.

## Analytics (Umami Cloud)

L'analytics est optionnel et ne s'active qu'avec `NEXT_PUBLIC_UMAMI_WEBSITE_ID`.
Umami ne dépose pas de cookie : aucune bannière de consentement n'est nécessaire.

1. Créer un site sur <https://cloud.umami.is> avec le domaine du portfolio.
2. Copier l'attribut `data-website-id` de la balise fournie.
3. Le renseigner dans `.env.local`, puis relancer le build ou le serveur.

Sans identifiant, aucune requête vers `cloud.umami.is` n'est faite : le site
reste sans mesure d'audience.

## CV

Les boutons d'action de la navbar et du hero pointent vers la page web `/{locale}/cv`,
qui est la version de référence du CV. Le bouton de cette page télécharge le PDF
`public/cv/CV-Baurel-Bemmo-Fullstack.pdf` (3 pages A4), servi tel quel.

Ce PDF n'est pas rédigé séparément : il est **imprimé depuis `/{locale}/cv`**, donc la
mise en page livrée est la règle `@media print` de `src/styles/globals.css`. Une seule
source de contenu, `src/data/`, alimente la page web et le document.

Mettre le CV à jour : modifier `src/data/`, puis réimprimer et remplacer le fichier.

```bash
npm run build && npm start          # serveur de production local
"<chemin Chrome>" --headless=new --disable-gpu --no-sandbox --hide-scrollbars \
  --no-pdf-header-footer --virtual-time-budget=15000 \
  --print-to-pdf="$PWD/public/cv/CV-Baurel-Bemmo-Fullstack.pdf" \
  http://localhost:3000/fr/cv
```

Imprimer depuis un serveur démarré **après** le dernier build : un serveur plus ancien
sert l'ancien HTML et le PDF sort sans les styles d'impression.

Le `.docx` du même nom reste dans `public/cv/` comme source éditable historique : il
n'est plus servi au téléchargement et n'est plus synchronisé avec le PDF. `npm run cv:pdf`
(rendu du DOCX via `docx-preview` dans Chrome headless) décrit l'ancienne chaîne.

## Thème (clair / sombre)

Le thème est choisi par le visiteur (bouton `Sun / Moon` dans la navbar et dans le pied
de page). Quelques pages sont volontairement verrouillées en clair :

- `/cv` : le CV doit rester lisible en impression et lorsqu'il est partagé sous forme
  de lien critique (entretien, envoi par email). Le mode sombre y est donc désactivé.

La préférence est persistée dans `localStorage` et respectée dès le chargement de
la page (script inline injecté avant le premier rendu). Le site respecte également la
préférence système (`prefers-color-scheme`) lors du premier visite.

## Accessibilité, performance, SEO

- Navigation au clavier : la quasi-totalité des interactions est reachable au clavier.
- Images : `next/image` avec `sizes` adaptés et `loading="lazy"` sur les images hors
   première viewport. Les fichiers de `public/projects` sont en WebP ; chaque couverture
  garde un `og.jpg` pour les aperçus sociaux qui ignorent le WebP (LinkedIn, Bluesky).
- Moteurs de recherche : `src/app/sitemap.ts` et `src/app/robots.ts` sont générés et
  utilisent `NEXT_PUBLIC_SITE_URL`. Le sitemap indique `lastmod` à la date du build.
- Langue : `/` redirige vers `/fr` ou `/en` selon l'en-tête `Accept-Language` du
  navigateur (voir `src/proxy.ts`), avec `Vary: Accept-Language` sur la réponse.
- Données structurées : `Person` sur toutes les pages, `CreativeWork` sur chaque page
  projet, générées à partir de `src/data/projects.ts`.
- Meta tags : titre, description, canonical, Open Graph et Twitter Card sont définis
  par page (accueil, CV, projets).
- Animation : une animation de zoom subtil au scroll est appliquée sur la couverture des
  projets, via CSS pur (`animation-timeline: view()`). Elle est désactivée si le visiteur
  a demandé `prefers-reduced-motion: reduce`.

## Déploiement

Le site est déployé sur Netlify à l'adresse `https://porfoliodeteker.netlify.app`.
La procédure complète est dans [README.deploy.md](./README.deploy.md) (rattachement
du dépôt, variables d'environnement, vérifications et dépannage).

### Résumé

1. Connecter le dépôt GitHub `baurel-bits/portfolio` à un site Netlify (build
   `npm run build`, publication `.next`).
2. Définir les variables d'environnement (voir tableau plus bas).
3. `git push` : la branche par défaut (`main`) déclenche le déploiement de production.
4. Après une modification des variables, redéployer avec **Clear cache and deploy site**.

### Variables Netlify

| Variable d'environnement            | Valeur                                | Notes                                           |
| ----------------------------------- | ------------------------------------- | ----------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`              | `https://porfoliodeteker.netlify.app` | URL publique finale (production)                |
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`  | `...`                                 | Clé du formulaire de contact (voir plus haut)   |
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID`      | `...`                                 | Analytics Umami (facultatif)                    |

- Netlify fournit `URL`, `DEPLOY_PRIME_URL` et `CONTEXT` : ne pas les surcharger.
- Les deploy previews reçoivent automatiquement `X-Robots-Tag: noindex`.
- Les variables `NEXT_PUBLIC_*` sont injectées au build : après les avoir modifiées,
  relancer le déploiement sans cache.

## Projets

Les projets sont définis dans `src/data/projects.ts`. Pour en ajouter un :

1. Ajouter un objet dans le tableau `projects` (champs : `id`, `title`, `summary`,
   `kind`, `stack`, `details`, `links`, `screens`, `featured`).
2. Si une image de couverture existe, la déposer dans `public/projects/` et renseigner
   le champ `cover`. Tant que `cover` est absent, la carte affiche un emplacement
   « capture à venir » (jamais d'image inventée).
3. Les liens externes existants uniquement : ne pas inventer de dépôt ou d'URL.

### Images des projets

Quelques captures d'écran de projets externes sont disponibles dans `public/projects/` :

- `bibiotheque/` : la couverture `home.webp` et 11 captures de l'application de
  bibliothèque (Spring Boot + Angular).

`home.webp` sert de couverture au projet Bibliothèque. Les autres captures sont
listées dans le champ `screens` de ce projet et affichées en galerie sur sa page
(`/fr/projets/bibiotheque`). Pour un nouveau projet, ajouter un tableau `screens`
avec, pour chaque capture, `src`, `width`, `height`, `alt` et `caption` (FR et EN).

## Structure du site

- `/` → redirige vers `/fr`
- `/fr` et `/en` : pages d'accueil bilingues
- `/fr/cv` et `/en/cv` : CV (verrouillé en clair)
- `/fr/projets/[slug]` et `/en/projets/[slug]` : pages de détail par projet
- `/sitemap.xml` et `/robots.txt` : générés

## Contribuer

Les corrections et améliorations sont les bienvenues. Avant de proposer une modification
importante, ouvrir une issue pour discuter du besoin.

---

## Réseaux sociaux

- GitHub : [baurel-bits](https://github.com/baurel-bits)
- GitLab : [baurel](https://gitlab.com/baurel)

---

Portfolio de Baurel — TEKER Codes. Contenu éditorial, zéro données externes.
