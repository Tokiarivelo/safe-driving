// Fichier de configuration pour l'internationalisation (l10n)
// Ce fichier exporte les classes et configurations nécessaires pour la localisation

import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';

// Import des fichiers générés automatiquement par Flutter
// Ces fichiers seront créés après avoir exécuté 'flutter gen-l10n'
import '../generated/app_localizations.dart';

/// Classe utilitaire pour la gestion des langues supportées
class L10n {
  // Liste des langues supportées par l'application
  // Chaque Locale représente une langue avec son code ISO
  static final List<Locale> supportedLocales = [
    const Locale('en'), // Anglais (langue par défaut)
    const Locale('fr'), // Français
  ];

  // Méthode pour obtenir le nom affiché de la langue
  // Utilisé dans les sélecteurs de langue
  static String getLanguageName(String languageCode) {
    switch (languageCode) {
      case 'en':
        return 'English';
      case 'fr':
        return 'Français';
      default:
        return 'English'; // Langue par défaut
    }
  }

  // Méthode pour obtenir le drapeau emoji correspondant à la langue
  // Utilisé pour l'affichage visuel dans les sélecteurs
  static String getLanguageFlag(String languageCode) {
    switch (languageCode) {
      case 'en':
        return '🇺🇸'; // Drapeau américain pour l'anglais
      case 'fr':
        return '🇫🇷'; // Drapeau français
      default:
        return '🇺🇸'; // Drapeau par défaut
    }
  }

  // Méthode pour vérifier si une langue est supportée
  static bool isSupported(String languageCode) {
    return supportedLocales.any(
      (locale) => locale.languageCode == languageCode,
    );
  }

  // Méthode pour obtenir la locale par défaut
  static Locale get defaultLocale => supportedLocales.first;

  // Délégués de localisation requis pour Flutter
  // Ces délégués gèrent la localisation des widgets Material et Cupertino
  static const List<LocalizationsDelegate<dynamic>> localizationsDelegates = [
    // Délégué pour nos traductions personnalisées
    AppLocalizations.delegate,
    // Délégués pour les widgets Material Design
    GlobalMaterialLocalizations.delegate,
    // Délégués pour les widgets Cupertino (iOS)
    GlobalCupertinoLocalizations.delegate,
    // Délégués pour les widgets de base
    GlobalWidgetsLocalizations.delegate,
  ];
}

/// Extension pour faciliter l'accès aux traductions dans les widgets
/// Permet d'utiliser context.l10n au lieu de AppLocalizations.of(context)
extension AppLocalizationsX on BuildContext {
  // Getter pour accéder facilement aux traductions
  // Usage: context.l10n.login au lieu de AppLocalizations.of(context)!.login
  AppLocalizations get l10n => AppLocalizations.of(this)!;
}

/// Provider pour la gestion du changement de langue
/// Utilisé avec le package Provider pour gérer l'état de la langue
class LocaleProvider with ChangeNotifier {
  // Langue actuelle de l'application
  Locale _locale = L10n.defaultLocale;

  // Getter pour obtenir la langue actuelle
  Locale get locale => _locale;

  // Méthode pour changer la langue
  // Notifie tous les widgets qui écoutent ce provider
  void setLocale(Locale locale) {
    // Vérifier si la langue est supportée
    if (!L10n.isSupported(locale.languageCode)) {
      return;
    }

    _locale = locale;
    // Notifier les widgets pour qu'ils se reconstruisent
    notifyListeners();
  }

  // Méthode pour changer la langue par code
  void setLocaleFromCode(String languageCode) {
    setLocale(Locale(languageCode));
  }

  // Méthode pour obtenir la langue suivante dans la liste
  // Utile pour un bouton de changement de langue rapide
  void nextLocale() {
    final currentIndex = L10n.supportedLocales.indexOf(_locale);
    final nextIndex = (currentIndex + 1) % L10n.supportedLocales.length;
    setLocale(L10n.supportedLocales[nextIndex]);
  }
}
