# Authentification Flutter

Un module d’authentification simple développé avec Flutter.  
Ce module contient les vues de **connexion**, **inscription** et **mot de passe oublié**, avec des widgets réutilisables pour une meilleure organisation du code.

---

## 1. Préparation

- Création de la structure du fichier dans `views/` :
  - `auth_view.dart`
- Mise en place de la **navigation** entre les vues :
  - Connexion <> Inscription
  - Connexion <> Mot de passe oublié

---

## 2. Intégration

### Écran de Connexion

- Champ e-mail
- Champ mot de passe
- Bouton "sign in"
- Lien vers inscription et mot de passe oublié

### Écran d’Inscription

- Champ nom, e-mail, mot de passe
- Bouton "sign up"
- Lien vers l’écran de connexion

### Écran Mot de Passe Oublié

- Champ e-mail
- Bouton "Reset password"

---

## Widgets Réutilisables

- **`color.dart`** : Définition des couleurs de l’application
- **`auth_widgets.dart`** : Champs de texte personnalisés, boutons d’action, messages d’erreur, etc.

---

## Stack Technique

- Flutter
- Dart

---

## À venir

- Validation des champs
- Gestion des erreurs

---

## Structure du dossier

```
lib/
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

## Auteur

Lovasoa RM – Développeur Flutter
