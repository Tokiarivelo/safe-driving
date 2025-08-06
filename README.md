# SafeDriving.page # Safe Driving Monorepo

Ce repo contient deux applications principales :

- **web** : Frontend Next.js (React) (filter `web`)
- **graphql-server** : Backend NestJS + Prisma + GraphQL (filter `graphql-server`)

Le mono-repo utilise **pnpm** et **pnpm Workspaces**.

---

## Prérequis

- Node.js v20+ (recommandé)
- pnpm v10+
- PostgreSQL 12+ (avec support JSON)
- Git

---

## Installation locale

1. Clonez le dépôt :

   ```bash
   git clone git@gitlab.com:digitallforyou/formation/mynotestage/safe-driving.git
   cd safe-driving
   ```

Ce projet est organisé en monorepo avec trois workspaces principaux :

- **web** : frontend Next.js (dossier `web`)
- **graphql-server** : backend NestJS + Prisma + GraphQL (dossier `graphql-server`)
- **workspace racine** : scripts globaux via `pnpm`

---

## Prérequis

- **Node.js** (version définie dans `.nvmrc`) : Installez via nvm :

  ```bash
  nvm install
  ```

- **pnpm** : si non installé :

  ```bash
  npm install -g pnpm
  ```

---

## 0. Lancer la base de données en local via Docker Compose

Dans la raçin du projet, il y a un fichier `docker-compose.yml`:

```yaml
version: '3.8'
services:
  postgis:
    image: postgis/postgis:15-3.3
    container_name: postgis
    restart: always
    environment:
      POSTGRES_USER: safedriving_admin
      POSTGRES_PASSWORD: safedriving_pass
      POSTGRES_DB: safedriving_db
    ports:
      - '5432:5432'
    volumes:
      - postgis_data:/var/lib/postgresql/data

  pgadmin:
    image: dpage/pgadmin4
    container_name: pgadmin
    restart: always
    ports:
      - '8080:80'
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@safedriving.com
      PGADMIN_DEFAULT_PASSWORD: admin123
    volumes:
      - pgadmin_data:/var/lib/pgadmin
    depends_on:
      - postgis

volumes:
  postgis_data:
  pgadmin_data:
```

Lance ensuite :

```bash
docker-compose up -d
```

Cette commande démarrera :

- **PostGIS** sur le port 5432
- **pgAdmin** sur le port 8080 (accès via [http://localhost:8080](http://localhost:8080))

---

## Application Mobile (Flutter)

### Prérequis

- Flutter SDK (version recommandée : 3.0+)
- Dart SDK
- Android Studio / VS Code
- Un émulateur Android ou iOS

### Installation

```bash
# Naviguer vers le dossier mobile
cd apps/mobile

# Installer les dépendances
flutter pub get

# Lancer l'application
flutter run
```

### Fonctionnalités principales

- Interface d'onboarding interactive
- Gestion des rôles utilisateur
- Configuration GPS et notifications
- Personnalisation des préférences
- Sélection des modes de transport

---

## 1. Installation

À la racine du dépôt :

```bash
# Charger la version de Node définie
nvm use

# Installer toutes les dépendances
pnpm install
```

---

## 2. Configuration Prisma & GraphQL

Tous les scripts Prisma et NestJS se trouvent dans le workspace `graphql-server` et sont exposés via le root.

### 2.1 Générer le client Prisma

```bash
# À la racine
pnpm graphql:prisma:generate
```

### 2.2 Créer et appliquer une migration (dev)

```bash
# Création d'une nouvelle migration nommée "<nom>"
pnpm graphql:prisma:migrate -- <nom>

# Applique les migrations en cours et régénère le client
pnpm graphql:prisma:migrate:apply
```

> **Autres développeurs** : après `git pull`, ils n’ont qu’à exécuter :
>
> ```bash
> pnpm graphql:prisma:migrate
> ```
>
> pour synchroniser leur BDD de dev.

### 2.3 Déploiement / CI

En environnement CI ou production :

```bash
pnpm graphql:prisma:migrate:deploy
```

### 2.4 Prototype / tests rapides

> En prototypage, pour pousser directement le schéma sans créer de migration :
>
> ```bash
> pnpm graphql:prisma:db-push
> ```

---

## 3. Lancement des serveurs

### 3.1 Backend GraphQL (NestJS)

```bash
# Mode développement (watch)
pnpm graphql:dev

# Build production
pnpm graphql:build
pnpm graphql:start:prod
```

### 3.2 Frontend Next.js (web)

```bash
# Dev rapide avec turbopack
pnpm web:dev

# Dev sans turbopack
pnpm web:dev:wt

# Génération (GraphQL codegen)
pnpm web:generate

# Build production
pnpm web:build
```

---

## 4. Lancement de latranslation

### 4.1 Lancement du docker

```bash
# Mode développement (watch)
docker compose up -d libretranslate

# pour voir les logs du libre translate
docker compose logs -f libretranslate
```

### 4.2 Mise à jour de l'env du web pour pointer vers libre-translate locale

```bash
LIBRE_URL=http://localhost:5000/translate
```

### 4.3 Lancement des translations

```bash
# si c'est dans la raçine du projet
pnpm web:translate

# si c'est dans apps/web
pnpm translate
```

## 5. Récapitulatif des scripts

| Contexte   | Commande                                 | Description                        |
| ---------- | ---------------------------------------- | ---------------------------------- |
| **Racine** | `pnpm install`                           | Installe tout                      |
|            | `pnpm web:dev`                           | Dev Next.js (turbopack)            |
|            | `pnpm web:dev:wt`                        | Dev Next.js (sans turbopack)       |
|            | `
`                      | GraphQL Codegen                    |
|            | `pnpm web:build`                         | Build Next.js                      |
|            | `pnpm web:translate`                     | Lancer la translation de textes    |
|            | `pnpm graphql:dev`                       | Dev NestJS (+ Prisma, GraphQL)     |
|            | `pnpm graphql:build`                     | Build NestJS                       |
|            | `pnpm graphql:start:prod`                | Lancement prod NestJS              |
|            | `pnpm graphql:prisma:generate`           | `prisma generate`                  |
|            | `pnpm graphql:prisma:migrate [-- <nom>]` | Génère + applique migration (dev)  |
|            | `pnpm graphql:prisma:apply`              | Applique migrations en dev         |
|            | `pnpm graphql:prisma:deploy`             | Déploiement migrations (CI / prod) |
|            | `pnpm graphql:prisma:db-push`            | Pousse schema direct               |
|            | `pnpm graphql:prisma:studio`             | Ouvre Prisma Studio                |

---

## 5. Notes

- Veillez à ce que le serveur GraphQL écoute sur `http://localhost:4000/graphql` et le frontend sur `http://localhost:3000`.
- Le workspace root permet de filtrer les commandes sur chaque package via `pnpm --filter <nom> <script>`.
- Les scripts Prisma exposés au root facilitent leur utilisation sans entrer dans le dossier `graphql-server`.

---
