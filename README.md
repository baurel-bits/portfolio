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
| `NEXT_PUBLIC_SITE_URL`             | URL publique (canonical, Open Graph, sitemap) | Domaine Vercel détecté, sinon `http://localhost:3000` |

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

Protection anti-spam : champ honeypot `botcheck` (masqué, ignoré s'il est rempli),
validation côté client, limitation de débit et filtrage côté Web3Forms.

## CV téléchargeable

Les fichiers servis par le bouton « Télécharger mon CV » sont :

- `public/cv/baurel-cv-fr.pdf`
- `public/cv/baurel-cv-en.pdf`

Pour mettre le CV à jour : remplacer ces deux fichiers en conservant les noms, ou
régénérer depuis les pages `/fr/cv` et `/en/cv` (impression navigateur → « Enregistrer
au format PDF », format A4, marges par défaut). Les deux langues doivent être mises à jour.

## Visuels de projets

Déposer les captures réelles dans `public/projects/`, puis renseigner `cover` dans
`src/data/projects.ts` (`src`, `width`, `height`, `alt` bilingue). Sans `cover`, la carte
affiche un emplacement « capture à venir » : aucune image d'illustration n'est présentée
comme une capture réelle.

Chaque projet dispose automatiquement d'une page de détail `/fr/projets/<id>` et
`/en/projets/<id>`. L'`id` sert d'URL : le modifier change l'adresse publique du projet.

## Déploiement sur Vercel

Le dossier n'est pas encore versionné : créer un dépôt Git, le pousser sur GitHub, puis
importer le dépôt depuis <https://vercel.com/new>. Aucun `vercel.json` n'est nécessaire,
Vercel détecte Next.js, ses routes et son dossier de sortie.

### Réglages du projet

| Réglage           | Valeur                                                |
| ----------------- | ----------------------------------------------------- |
| Framework Preset  | Next.js (détecté)                                     |
| Root Directory    | `.`                                                   |
| Install Command   | `npm install`                                         |
| Build Command     | `npm run build`                                       |
| Output Directory  | laisser vide (Vercel utilise `.next`)                 |
| Node.js Version   | 22.x (minimum 20.9, déclaré par `engines` du `package.json`) |

### Variables d'environnement

À renseigner dans **Project → Settings → Environment Variables** avant le premier
déploiement de production.

| Variable                           | Production                                | Preview                                        | Development        |
| ---------------------------------- | ----------------------------------------- | ---------------------------------------------- | ------------------ |
| `NEXT_PUBLIC_SITE_URL`             | `https://votre-domaine.tld` (sans slash)  | laisser vide (URL Vercel du déploiement)       | laisser vide       |
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | clé Web3Forms de réception                | même clé, pour tester le formulaire            | même clé ou vide   |

Sans `NEXT_PUBLIC_SITE_URL`, l'URL est résolue automatiquement :
`VERCEL_PROJECT_PRODUCTION_URL`, puis `VERCEL_URL`, puis `http://localhost:3000`.
Sur un domaine personnalisé, définir la variable et redéployer pour que canonical et
Open Graph pointent le bon hôte.

Les deux variables sont `NEXT_PUBLIC_*` : elles sont **intégrées au build**. Après une
modification, utiliser **Deployments → ⋯ → Redeploy** ; un simple redémarrage ne suffit
pas. Les déploiements de prévisualisation reçoivent automatiquement l'en-tête
`X-Robots-Tag: noindex` (`next.config.ts`).

### Après le premier déploiement

- `/` redirige en 307 vers `/fr`.
- `/fr`, `/en` et `/fr/projets/depensepro` répondent 200.
- `/cv/baurel-cv-fr.pdf` répond 200 et s'ouvre sur une page A4.
- Un envoi réel du formulaire arrive dans la boîte email associée à la clé.
- `/fr/opengraph-image` et le favicon s'affichent, canonical et OG utilisent le bon domaine.
- `/sitemap.xml` liste les pages FR/EN et `/robots.txt` pointe vers ce sitemap, tous deux
  sur le domaine public.

### Déploiement en ligne de commande (optionnel)

```bash
npx vercel         # prévisualisation
npx vercel --prod  # production
```

## Contenus à compléter

- **Années des projets** : champ `year` dans `src/data/projects.ts`, omis tant qu'il n'est
  pas confirmé (le libellé « Année » disparaît alors).
- **Formation réelle** : `src/data/education.ts` (intitulé, établissement, dates).
- **Traductions anglaises** : `src/i18n/messages/en.ts` à relire.
- **URL publique** : `NEXT_PUBLIC_SITE_URL` avant mise en ligne.

## Vérifications

```bash
npx tsc --noEmit
npm run lint
npm run build
```
