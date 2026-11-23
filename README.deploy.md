# Déploiement Netlify

Procédure de (re)mise en ligne du portfolio sur Netlify, depuis le dépôt GitHub
[`baurel-bits/portfolio`](https://github.com/baurel-bits/portfolio), branche `main`.

Domaine de production : `https://porfoliodeteker.netlify.app`. C'est cette origine
qui doit alimenter les balises `canonical`, Open Graph, le `sitemap.xml` et le PDF du CV.

> **Hébergement principal : Vercel (voir la section « Hébergement : pourquoi Vercel »).**
> Le déploiement Netlify fonctionne, mais son domaine est injoignable depuis certains
> FAI camerounais. La procédure Netlify ci-dessous reste valable comme secours.

## Hébergement : pourquoi Vercel

Le déploiement Netlify est sain : build, en-têtes de sécurité, `sitemap.xml` et
`canonical` ont été vérifiés sur la production. Le problème est ailleurs :
`*.netlify.app` résout vers les IP du load balancer Netlify (`35.157.26.135`,
`63.176.8.218`, `2a05:d014:58f:6200::/64`, AWS eu-central-1), qui sont injoignables
depuis certains réseaux (Cameroun) : `ping` à 100 % de perte, `tracert` qui s'arrête
après les sauts internes du FAI, ports 80 et 443 en timeout. Tous les `*.netlify.app`
sont concernés, pas seulement ce site.

Vercel est joignable depuis les mêmes réseaux (vérifié : `vercel.com` et `nextjs.org`
répondent `200`, `*.vercel.app` répond `307`). Le projet ne demande aucune
configuration supplémentaire : `next.config.ts` gère déjà `VERCEL_ENV` (previews en
`noindex`) et `src/lib/site.ts` résout `canonical`, Open Graph et `sitemap.xml` via
`VERCEL_PROJECT_PRODUCTION_URL` puis `VERCEL_URL`.

### Déployer sur Vercel

1. <https://vercel.com/new> → **Import Git Repository** → `baurel-bits/portfolio`.
   Framework détecté : Next.js. Aucune commande de build à saisir.
2. Variables d'environnement (Production, Preview, Development) :

   | Variable                           | Valeur                                        |
   | ---------------------------------- | --------------------------------------------- |
   | `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | clé du formulaire de contact                  |
   | `NEXT_PUBLIC_UMAMI_WEBSITE_ID`     | facultatif                                    |
   | `NEXT_PUBLIC_SITE_URL`             | **vide au premier déploiement**                |

   Ne pas recopier l'URL Netlify dans `NEXT_PUBLIC_SITE_URL` : sur Vercel, le domaine
   `*.vercel.app` du projet est détecté automatiquement et sert de `canonical`. Ne
   renseigner la variable qu'une fois un domaine personnalisé en place.
3. Déployer, puis vérifier `<projet>.vercel.app/fr` et `<projet>.vercel.app/sitemap.xml`.
4. `git push` sur `main` redéploie la production ; les PR obtiennent une preview en
   `noindex`.

En ligne de commande (optionnel) :

```bash
npx vercel login                                    # ou https://vercel.com/account/tokens
npx vercel link
npx vercel deploy                                   # preview
npx vercel deploy --prod
```

## 1. Rattacher le dépôt à un site Netlify

1. <https://app.netlify.com/> → **Add new site** → **Import an existing project** → **GitHub**
   → `baurel-bits/portfolio`.
2. Vérifier les réglages de build : base vide, commande `npm run build`, répertoire
   de publication `.next`. Netlify détecte Next.js et installe son runtime dédié ;
   le confirmer dans **Site configuration → Build & deploy → Plugins**.
3. Déployer une première fois. Le projet exige Node ≥ 20.9 (`engines` dans
   `package.json`) : le fixer dans **Environment variables → NODE_VERSION = 20** si
   besoin.

## 2. Définir les variables d'environnement

Dans **Site configuration → Environment variables**, pour **Production**, **Deploy previews**
et **Branch deploys** :

| Variable                           | Valeur                                            |
| ---------------------------------- | ------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`             | `https://porfoliodeteker.netlify.app`             |
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | clé du formulaire de contact (voir README)        |
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID`     | facultatif, laisse l'analytics désactivé si vide  |

Deux points importants :

- Les variables `NEXT_PUBLIC_*` sont **figées au build** : après toute modification,
  il faut redéployer avec **Clear cache and deploy site**.
- Netlify fournit déjà `URL`, `DEPLOY_PRIME_URL` et `CONTEXT`. Ne pas les surcharger :
  `src/lib/site.ts` les utilise comme repli et `next.config.ts` pose
  `X-Robots-Tag: noindex` sur les previews (`CONTEXT=deploy-preview`).

## 3. Redéployer

- **Déploiement automatique** : un `git push` sur `main` déclenche le déploiement de production.
- **Redéploiement manuel** : **Deploys** → **Trigger deploy** → **Clear cache and deploy site**.
  Indispensable après une modification des variables d'environnement.

## 4. Vérifier le déploiement

```bash
BASE=https://porfoliodeteker.netlify.app

# 1. En-têtes de sécurité (doivent tous apparaître)
curl -s -o /dev/null -D - "$BASE/fr" \
  | grep -iE "x-content-type-options|x-frame-options|referrer-policy|permissions-policy"

# 2. Galerie : 11 figures sur la page Bibliothèque
curl -s "$BASE/fr/projets/bibiotheque" | grep -c "<figure>"

# 3. Canonical et Open Graph sur le bon domaine
curl -s "$BASE/fr" | grep -o 'rel="canonical"[^>]*'

# 4. Sitemap : 18 URL et des <lastmod>
curl -s "$BASE/sitemap.xml" | grep -c "<url>"
curl -s "$BASE/sitemap.xml" | grep -m1 "<lastmod>"

# 5. Redirection selon la langue du navigateur
curl -s -o /dev/null -D - -H "Accept-Language: en-US,en;q=0.9" "$BASE/" | grep -i "^location"
curl -s -o /dev/null -D - -H "Accept-Language: fr-FR,fr;q=0.9" "$BASE/" | grep -i "^location"

# 6. 404 : un seul <html> et un statut 404
curl -s -o /dev/null -w "%{http_code}\n" "$BASE/fr/projets/inconnu"
```

Attendu : quatre en-têtes, `11`, un canonical sur `$BASE`, `18` URL datées,
`location: /en` puis `location: /fr`, et `404`.

## Dépannage

| Symptôme | Cause probable |
| -------- | -------------- |
| Page blanche ou 500 après le build | runtime Next.js absent du site Netlify : réinstaller le plugin |
| Formulaires sans effet, renvoi vers l'email | `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` absente au build |
| Canonical ou sitemap sur `localhost:3000` | build local : normal, l'URL est résolue à l'exécution sur Netlify |
| Canonical sur un ancien domaine | `NEXT_PUBLIC_SITE_URL` obsolète, à corriger puis redéployer sans cache |
| Preview indexée | `CONTEXT=deploy-preview` pose `X-Robots-Tag: noindex` automatiquement |

## En local, pour reproduire un build de production

```bash
Remove-Item -Recurse -Force .next
npm run build
npm run start -- -p 3100
```

Le nettoyage de `.next` évite le panic Turbopack quand le dossier provient d'une session
`next dev`. Ce couple permet de vérifier les en-têtes, la galerie, le sitemap et la
redirection de langue, indépendamment de Netlify.
