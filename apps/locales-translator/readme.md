# translate-locales

**translate-locales** est un petit outil en ligne de commande Node.js indépendant pour automatiser la traduction de fichiers JSON de localisation.

---

## 🚀 Fonctionnalités

- Parcourt récursivement tous les fichiers `*.json` dans `public/locales/fr`.
- Copie le contenu original pour la langue source (`fr`).
- Traduit **seulement les valeurs** (pas les clés), y compris dans les objets imbriqués et les tableaux.
- Utilise une API LibreTranslate configurable via `LIBRE_URL`.
- Ne ré-écrit un fichier de sortie que si son contenu a réellement changé (détection de diff via `fast-deep-equal`).
- Support ESM (`.mjs` ou `"type": "module"`).
- CLI accessible globalement via `translate-locales`.

---

## 🛠️ Prérequis

- Node.js v16 ou supérieur
- npm / pnpm
- (Optionnel) Compte et instance LibreTranslate si vous ne voulez pas utiliser une instance publique.

---

## 📦 Installation

1. Installer les dépendances :

   ```bash
   npm install
   # ou
   pnpm install
   ```

2. (Optionnel) Lier globalement pour utiliser la commande `translate-locales` :

   ```bash
   npm link
   # ou avec pnpm après avoir exécuté `pnpm setup`
   pnpm link --global
   ```

---

## ⚙️ Configuration

Créer un fichier `.env` à la racine du projet :

```ini
LIBRE_URL=https://mon-instance-libretranslate/translate
```

> Par défaut, si `.env` n’existe pas, le script lèvera une erreur et s’arrêtera.

---

## 📂 Structure du projet

```text
locales-translator/
├─ bin/
│  └─ translate.js       CLI exécutable
├─ src/
│  └─ translate.js       Logique de traduction exportée
├─ .env                 Variables d’environnement
├─ package.json         Configuration du package (type: module)
└─ README.md            Ce document
```

---

## 🚀 Usage

### En local

- Lancer la traduction :

  ```bash
  npm start
  # ou si installé globalement
  translate-locales
  ```

- Surveiller les changements de source et relancer automatiquement :

  ```bash
  npm run watch
  ```

### En CI / pipeline

Intégrer dans votre workflow (GitHub Actions, GitLab CI) :

```yaml
- name: Traduire les locales
  run: |
    npm ci
    npm run start
```

---

## 🎯 Personnalisation

- **Langues cibles** : modifier `TARGET_LANGS` dans `src/translate.js`.
- **Répertoire des locales** : changer `BASE_DIR` si votre structure diffère.
- **Délai entre requêtes** : ajuster `DELAY_MS`.

---

## 💬 Support

Pour toute question ou suggestion, ouvrez une issue sur le dépôt ou contactez l'équipe de développement.

---

## 📄 Licence

MIT © Mon Organisation
