# Safe Driving Mobile App

Application mobile Flutter pour Safe Driving, incluant un système d'authentification complet et un menu interactif d'onboarding.

---

## Fonctionnalités Principales

### Système d'Authentification

- Configuration de la base de données (`.env`, URL, identifiants)
- Intégration API GraphQL pour lecture/écriture
- Fonctionnalités `login/register` complètes
- Validation intelligente des champs avec amélioration UX/UI

### Menu Interactif d'Onboarding

- Widget refactorisé avec architecture modulaire
- Animations fluides et transitions immédiates
- Gestion d'état centralisée avec modèles immutables
- Interface utilisateur optimisée

---

## Architecture du Code

### Modèles de Données

- **StepInfo** : Structure pour les informations d'étape
- **AppState** : Modèle immutable pour l'état de l'application avec méthode `copyWith()`

### Gestion d'État

- État centralisé avec un seul objet `AppState`
- Méthodes dédiées pour chaque mise à jour (`_updateGps`, `_updateNotifications`, etc.)
- Approche immutable évitant les `setState` multiples

### Optimisations Performance

- Widgets `const` utilisés quand possible
- Configuration centralisée avec constantes
- Map des icônes de transport pour éviter les conditions multiples
- Gestion fine de l'état d'expansion des tiles

---

## Écrans et Fonctionnalités

### Module d'Authentification

## Écran de Connexion

- Champ e-mail avec validation
- Champ mot de passe sécurisé
- Bouton **Sign in**
- Navigation vers Inscription et Mot de passe oublié

## Écran d'Inscription

- Champs Nom, E-mail, Mot de passe
- Validation en temps réel
- Bouton **Sign up**
- Retour vers l'écran de Connexion

## Écran Mot de Passe Oublié

- Champ E-mail
- Bouton **Reset password**
- Gestion des erreurs et confirmations

### Menu Interactif d'Onboarding

## Étape 1 - Sélection du Rôle

- Choix entre Utilisateur et Chauffeur
- Interface avec boutons optimisés

## Étape 2 - Bienvenue

- Message de bienvenue personnalisé
- Options "Plus tard" et "Démarrer"

## Étape 3 - Configuration GPS

- Boutons radio rapprochés avec `visualDensity` optimisée
- Texte avec `FontWeight.w600` pour meilleure lisibilité
- Options Activer/Plus tard

## Étape 4 - Notifications

- Interface identique au GPS
- Gestion des alertes temps réel

## Étape 5 - Préférences

- Sélection du thème (Clair/Sombre)
- Choix des modes de transport avec icônes
- FilterChips interactifs

## Étape 6 - Récapitulatif

- Résumé des choix utilisateur
- Possibilité de modification
- Validation finale

---

## Widgets et Composants

### Widgets d'Authentification

- `color.dart` : Palette de couleurs de l'application
- `auth_widgets.dart` : Champs de texte personnalisés, boutons d'action, messages d'erreur
- `snackbar.dart` : Composants de notification
- `validator.dart` : Système de validation des champs

### Widget Interactif

- `interactive_menu_widget.dart` : Menu d'onboarding refactorisé
  - Architecture modulaire avec séparation des responsabilités
  - Animations et transitions fluides
  - Gestion d'état optimisée
  - Composants réutilisables

### Widgets d'Animation

- `animation_widget.dart` : Effets de slide et transitions
- Animations immédiates sur les interactions utilisateur
- ExpansionTiles avec effet de slide personnalisé

---

## Stack Technique

- **Flutter** : Framework principal
- **Dart** : Langage de programmation
- **GraphQL** : API de communication
- **State Management** : Approche immutable avec `copyWith`

---

## Améliorations Récentes

### Refactorisation du Menu Interactif

- Architecture modulaire avec modèles de données séparés
- Gestion d'état centralisée et optimisée
- Performance améliorée avec widgets `const`
- Code plus maintenable et extensible

### Optimisations UX/UI

- Animations immédiates lors des interactions
- Boutons radio avec espacement réduit
- Police plus lisible (FontWeight.w600)
- Transitions fluides entre les étapes

### Qualité du Code

- Constantes centralisées pour la configuration
- Méthodes dédiées pour chaque responsabilité
- Types sécurisés et nommage explicite
- Réduction significative de la duplication

---

## Structure du Projet

```lib/
├── core/
│   └── constants/
│       └── colors/
│           └── colors.dart
├── models/
│   └── auth/
│       └── interactive_menu/
│           └── for_user.dart
├── shared/
│   └── widgets/
│       ├── animations/
│       │   └── animation_widget.dart
│       ├── auth/
│       │   └── auth_widget.dart
│       ├── colors/
│       │   └── colors_widget.dart
│       ├── customs/
│       │   └── interactive_menu_widget.dart
│       └── snackbar/
│           └── snackbar_helper.dart
├── views/
│   └── auth/
│       └── auth_view.dart
└── main.dart
```

### Organisation des Modèles

- **StepInfo** : Configuration des étapes d'onboarding
- **AppState** : État global de l'application
- **ForUser** : Modèles spécifiques aux utilisateurs

## Installation et Lancement

### Prérequis

- Flutter SDK installé
- Dart SDK
- Configuration de l'environnement (.env)

### Commandes

```bash
# Lancer l'application Flutter
flutter run

# Démarrer le serveur de développement
pnpm start:dev

# Tests
flutter test

# Build
flutter build apk
```

## Configuration

### Variables d'Environnement

- URL de l'API GraphQL
- Identifiants de base de données
- Clés d'authentification

### Thèmes

- Thème clair (par défaut)
- Thème sombre
- Couleurs personnalisables via `AppColors`

## Auteur

Lovasoa RM – Développeur Flutter
