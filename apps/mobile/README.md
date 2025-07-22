# Authentification Flutter

Un module d’authentification simple développé avec Flutter.  
Ce module contient les vues de **connexion**, **inscription** et **mot de passe oublié**, avec des widgets réutilisables pour une meilleure organisation du code.

---

## Attendu

- La configuration de la base est correcte (`.env`, URL, identifiants…)
- Le serveur peut exécuter des requêtes de lecture/écriture
- Le client Flutter pourra ultérieurement interagir avec la base via API GraphQL
- Les fonctionnalités `login/register` sont fonctionnelles

---

## 1. Préparation

- Création de la structure du fichier dans `views/` :
  - `auth_view.dart`
- Mise en place de la **navigation** entre les vues :
  - Connexion ↔ Inscription
  - Connexion ↔ Mot de passe oublié

---

## 2. Intégration

### Écran de Connexion

- Champ e-mail  
- Champ mot de passe  
- Bouton **Sign in**  
- Lien vers **Inscription** et **Mot de passe oublié**

### Écran d’Inscription

- Champ **Nom**, **E-mail**, **Mot de passe**  
- Bouton **Sign up**  
- Lien vers l’écran de **Connexion**

### Écran Mot de Passe Oublié

- Champ **E-mail**  
- Bouton **Reset password**

---

## Widgets Réutilisables

- `color.dart` : Définition des couleurs de l’application
- `auth_widgets.dart` : Champs de texte personnalisés, boutons d’action, messages d’erreur, etc.
- `snackbar.dart` : pour les snakbar

---

## Stack Technique

- Flutter  
- Dart

---

## À venir

- Menu interactive

---

## Structure du dossier

```lib/
├── auth/
│ ├── auth_view.dart
│ 
│ 
├── widgets/
│ ├── auth_widget.dart
│ └── color.dart
└── main.dart
```

## Lancement

- flutter run
- pnpm start:dev

## Auteur

Lovasoa RM – Développeur Flutter
