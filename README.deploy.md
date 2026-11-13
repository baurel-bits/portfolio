# Déploiement Vercel

Procédure de (re)mise en ligne du portfolio sur Vercel, depuis un dépôt GitHub
([`baurel-bits/portfolio`](https://github.com/baurel-bits/portfolio), branche `main`).

Le domaine `teker-codes.vercel.app` a déjà répondu `DEPLOYMENT_NOT_FOUND` : plus aucun
déploiement n'est rattaché à ce nom. Les étapes ci-dessous repartent de ce constat.

## 1. Rattacher le dépôt à un projet Vercel

1. <https://vercel.com/new> → **Import Git Repository** → `baurel-bits/portfolio`.
2. Laisser le framework détecté (Next.js), le dossier racine `.` et la commande
   `npm run build`.
3. Déployer une première fois, même sans variable d'environnement.

Un déploiement échoue si la version de Node est trop ancienne : le projet exige
Node ≥ 20.9 (`engines` dans `package.json`), ce que Vercel respecte par défaut.

## 2. Définir les variables d'environnement

Dans **Settings → Environment Variables**, pour **Production** et **Preview** :

| Variable                            | Valeur                                            |
| ----------------------------------- | ------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`              | URL de production réelle, **sans barre oblique**  |
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`  | clé du formulaire de contact (voir README)        |
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID`      | facultatif, laisse l'analytics désactivé si vide  |

Deux points importants :

- Les variables `NEXT_PUBLIC_*` sont **figées au build** : après toute modification,
  il faut redéployer, sinon l'ancienne valeur reste dans le HTML.
- `NEXT_PUBLIC_SITE_URL` peut rester vide : `src/lib/site.ts` retombe alors sur
  `VERCEL_PROJECT_PRODUCTION_URL`, que Vercel fournit automatiquement. La renseigner
  explicitement n'est utile que pour forcer un domaine personnalisé.

## 3. Récupérer la bonne URL

**Settings → Domains** liste le domaine de production effectif :

- `nom-du-projet.vercel.app` si aucun domaine personnalisé n'est attaché ;
- le domaine personnalisé sinon (par exemple `teker-codes.com`).

C'est **cette** origine, protocole `https://` compris et sans `/` final, qui doit aller
dans `NEXT_PUBLIC_SITE_URL`. Elle alimente les balises `canonical`, Open Graph, le
`sitemap.xml` et `robots.txt` : une URL erronée fait pointer tout le référencement
vers un domaine mort.

## 4. Redéployer

- **Déploiement automatique** : un `git push` sur `main` suffit.
- **Redéploiement manuel** : onglet **Deployments** → dernier déploiement → **Redeploy**.
  Après un changement de variable d'environnement, ne pas cocher la réutilisation du
  cache de build.

## 5. Vérifier le déploiement

Remplacer `https://exemple.vercel.app` par l'URL réelle.

```bash
BASE=https://exemple.vercel.app

# 1. En-têtes de sécurité (doivent tous apparaître)
curl -s -o /dev/null -D - "$BASE/fr" \
  | grep -iE "x-content-type-options|x-frame-options|referrer-policy|permissions-policy"

# 2. Galerie : 11 figures sur la page Bibliothèque
curl -s "$BASE/fr/projets/bibiotheque" | grep -c "<figure>"

# 3. Canonical et Open Graph sur le bon domaine
curl -s "$BASE/fr" | grep -o 'rel="canonical"[^>]*'

# 4. Sitemap : 16 URL et des <lastmod>
curl -s "$BASE/sitemap.xml" | grep -c "<url>"
curl -s "$BASE/sitemap.xml" | grep -m1 "<lastmod>"

# 5. Redirection selon la langue du navigateur
curl -s -o /dev/null -D - -H "Accept-Language: en-US,en;q=0.9" "$BASE/" | grep -i "^location"
curl -s -o /dev/null -D - -H "Accept-Language: fr-FR,fr;q=0.9" "$BASE/" | grep -i "^location"
```

Attendu : quatre en-têtes, `11`, un canonical sur `$BASE`, `16` URL datées, puis
`location: /en` et `location: /fr`.

## Dépannage

| Symptôme | Cause probable |
| -------- | -------------- |
| `404 DEPLOYMENT_NOT_FOUND` | projet supprimé ou domaine détaché : refaire l'étape 1 |
| Formulaires sans effet, renvoi vers l'email | `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` absente au build |
| Canonical ou sitemap sur `localhost:3000` | build local : normal, l'URL est résolue à l'exécution sur Vercel |
| Canonical sur un ancien domaine | `NEXT_PUBLIC_SITE_URL` obsolète, à corriger puis redéployer |
| Preview indexée | `VERCEL_ENV=preview` pose `X-Robots-Tag: noindex` automatiquement |

## En local, pour reproduire un build de production

```bash
npm run build && npm run start -- -p 3100
```

C'est ce couple qui a servi à vérifier les en-têtes, la galerie et la redirection de
langue, indépendamment de Vercel.
