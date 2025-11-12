# Safe Driving Mobile App

Application mobile Flutter pour Safe Driving basée sur une architecture MVVM feature-based moderne et scalable.

---

## Architecture MVVM Feature-Based

Le projet adopte une architecture **Model-View-ViewModel (MVVM)** organisée par **features** pour une meilleure maintenabilité et séparation des responsabilités.

### Principes d'Architecture

- **Séparation par fonctionnalités** : Chaque feature est autonome avec ses propres models, views, viewmodels et services
- **MVVM Pattern** : Séparation claire entre logique métier (ViewModel), présentation (View) et données (Model)
- **Injection de dépendances** : Service locator pour une gestion centralisée des dépendances
- **Repository Pattern** : Abstraction de la couche de données avec interfaces
- **State Management** : Gestion d'état réactive avec modèles immutables

### Structure MVVM

```
Feature/
├── models/          # Modèles de données (Model)
├── ui/
│   ├── screens/     # Écrans (View)
│   └── widgets/     # Composants UI (View)
├── viewmodels/      # Logique de présentation (ViewModel)
├── services/        # Services métier
├── repository/      # Accès aux données
└── data/           # Sources de données
```

---

## Features Implémentées

### 1. Authentication Feature

- **Architecture MVVM complète** avec ViewModels dédiés
- **Gestion d'état réactive** pour les formulaires
- **Validation en temps réel** des champs
- **Intégration GraphQL** pour l'authentification
- **Repository Pattern** pour l'abstraction des données

#### Composants

- `AuthViewModel` : Logique d'authentification
- `SigninViewModel` : Gestion spécifique de la connexion
- `AuthFormViewModel` : Validation et état des formulaires
- `AuthService` : Services d'authentification
- `UserRepository` : Accès aux données utilisateur

### 2. Onboarding Feature

**Architecture séparée par rôles** :

#### User Onboarding

- **5 étapes interactives** avec navigation fluide
- **ViewModel dédié** pour la logique métier
- **State immutable** avec gestion centralisée
- **Widgets réutilisables** et modulaires

#### Driver Onboarding

- **12 étapes spécialisées** pour les chauffeurs
- **Gestion avancée de la caméra** (mobile/web)
- **Upload et validation de documents**
- **Services de stockage** intégrés

---

## Architecture Technique

### Couche Model (Données)

- **Models immutables** avec méthodes `copyWith()` pour les mises à jour
- **Modèles spécialisés** par feature (AuthModel, UserModel, OnboardingData)
- **Validation intégrée** dans les modèles de données
- **Sérialisation/Désérialisation** pour les échanges API

### Couche ViewModel (Logique)

- **ViewModels réactifs** gérant l'état et la logique métier
- **Séparation des responsabilités** : un ViewModel par écran/fonctionnalité
- **Gestion des erreurs** centralisée avec états loading/error/success
- **Communication avec les services** via injection de dépendances

### Couche View (Présentation)

- **Écrans stateless** consommant les ViewModels
- **Widgets réutilisables** organisés par domaine
- **Builder Pattern** pour la construction d'UI complexes
- **Animations et transitions** intégrées

### Services et Repository

- **Repository Pattern** avec interfaces pour l'abstraction
- **Services métier** encapsulant la logique complexe
- **Factory Pattern** pour la création des repositories
- **GraphQL Client** centralisé avec gestion des erreurs

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

## Stack Technique MVVM

### Framework & Langage

- **Flutter** : Framework UI multiplateforme
- **Dart** : Langage orienté objet avec null safety

### Architecture & Patterns

- **MVVM (Model-View-ViewModel)** : Séparation des responsabilités
- **Repository Pattern** : Abstraction de la couche de données
- **Factory Pattern** : Création d'objets complexes
- **Builder Pattern** : Construction d'UI modulaire
- **Service Locator** : Injection de dépendances

### State Management

- **Modèles immutables** avec méthodes `copyWith()`
- **ViewModels réactifs** avec `ChangeNotifier`
- **State centralisé** par feature
- **Providers** pour l'injection de dépendances

### Communication & Données

- **GraphQL** : API de communication type-safe
- **Repository abstrait** : Interfaces pour la flexibilité
- **Data Sources multiples** : API, cache, stockage local
- **Error Handling** : Gestion centralisée des erreurs

### UI & UX

- **Material Design 3** : Système de design moderne
- **Thèmes dynamiques** : Support clair/sombre
- **Animations fluides** : Micro-interactions intégrées
- **Responsive Design** : Adaptation multi-écrans

### Qualité & Maintenance

- **Feature-based organization** : Structure scalable
- **Barrel exports** : Imports simplifiés
- **Interface-driven development** : Facilite les tests
- **Séparation stricte** : MVVM respecté

---

## Implémentation MVVM Avancée

### Séparation des Responsabilités

**Models (Données)**

- Modèles immutables avec validation intégrée
- Méthodes `copyWith()` pour les mises à jour
- Sérialisation JSON automatisée
- Types sécurisés avec enums et sealed classes

**ViewModels (Logique Métier)**

- État réactif avec `ChangeNotifier`
- Gestion asynchrone avec `Future` et `Stream`
- Validation en temps réel des formulaires
- Communication avec les services via injection

**Views (Interface)**

- Widgets stateless consommant les ViewModels
- Builder pattern pour les UI conditionnelles
- Animations déclaratives intégrées
- Composition over inheritance

### Architecture Multi-Features

**Authentication Feature**

- `AuthViewModel` : Gestion de l'état d'authentification
- `SigninViewModel` : Logique spécifique de connexion
- `AuthFormViewModel` : Validation des formulaires
- `AuthService` : Opérations métier
- `UserRepository` : Abstraction des données

**Onboarding Features**

- Séparation User/Driver avec ViewModels dédiés
- Services spécialisés (Camera, Storage)
- Repository pattern pour la persistance
- UI builders pour la modularité

### Injection de Dépendances

- **Service Locator** centralisé
- **Factory Pattern** pour les repositories
- **Provider Pattern** pour les ViewModels
- **Interface-based** pour la testabilité

### Gestion d'État Avancée

- **State immutable** évitant les effets de bord
- **Loading/Error/Success** states typés
- **Debouncing** pour les validations
- **Caching** intelligent des données

---

## Structure du Projet MVVM Feature-Based

```
lib/
├── app/                           # Configuration globale
│   ├── app_initializer.dart       # Initialisation de l'app
│   ├── app_providers.dart         # Providers globaux
│   └── routes.dart               # Routing centralisé
│
├── core/                          # Éléments transversaux
│   ├── constants/                # Constantes globales
│   ├── repositories/             # Abstractions Repository
│   ├── theme/                    # Thèmes et styles
│   └── utils/                    # Utilitaires
│
├── features/                      # Features organisées en MVVM
│   ├── authentication/           # Feature Authentification
│   │   ├── models/               # Models (données)
│   │   │   ├── auth_model.dart
│   │   │   ├── user_model.dart
│   │   │   └── auth_result.dart
│   │   ├── viewmodels/           # ViewModels (logique)
│   │   │   ├── auth_view_model.dart
│   │   │   ├── signin_view_model.dart
│   │   │   └── auth_form_view_model.dart
│   │   ├── ui/                   # Views (présentation)
│   │   │   ├── screens/          # Écrans
│   │   │   └── widgets/          # Composants UI
│   │   ├── services/             # Services métier
│   │   ├── repository/           # Accès aux données
│   │   └── data/                # Sources de données
│   │
│   └── onboarding/               # Feature Onboarding
│       ├── user/                 # Onboarding Utilisateur
│       │   ├── models/
│       │   ├── viewmodels/
│       │   ├── ui/
│       │   ├── services/
│       │   └── repository/
│       └── driver/               # Onboarding Chauffeur
│           ├── models/
│           ├── viewmodels/
│           ├── ui/
│           ├── services/
│           └── repository/
│
├── shared/                        # Éléments partagés
│   ├── services/                 # Services globaux (GraphQL, etc.)
│   ├── state_management/         # Gestion d'état globale
│   ├── widgets/                  # Widgets réutilisables
│   └── shared_onboarding/        # Composants onboarding communs
│
├── l10n/                         # Internationalisation
├── resources/                    # Assets (images, fonts, etc.)
└── main.dart                     # Point d'entrée
```

### Architecture par Feature

Chaque feature suit le pattern MVVM :

#### Models (Données)

- **Modèles immutables** avec validation
- **DTOs** pour les échanges API
- **Enums** et constantes spécifiques

#### ViewModels (Logique Métier)

- **État réactif** avec notifications
- **Gestion des interactions** utilisateur
- **Communication** avec les services
- **Validation** et transformation des données

#### Views (Interface Utilisateur)

- **Écrans** consommant les ViewModels
- **Widgets composés** et réutilisables
- **Builders** pour les UI complexes
- **Animations** et micro-interactions

#### Services & Repository

- **Services métier** encapsulant la logique
- **Repository** abstrayant l'accès aux données
- **Data Sources** (API, cache, local)

## Installation et Lancement

### Prérequis

- Flutter SDK installé
- Dart SDK
- Configuration de l'environnement (.env)

### Commandes

```bash
# Installer les dépendaces de l'application Flutter
flutter pub get

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
