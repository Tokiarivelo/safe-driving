import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';

import 'package:safe_driving/l10n/generated/app_localizations.dart';

class L10n {
  static final List<Locale> supportedLocales = [
    const Locale('fr'),
    const Locale('en'),
  ];

  static String getLanguageName(String languageCode) {
    switch (languageCode) {
      case 'en':
        return 'English';
      case 'fr':
        return 'Français';
      default:
        return 'Français';
        
    }
  }

  static String getLanguageFlag(String languageCode) {
    switch (languageCode) {
      case 'en':
        return '🇺🇸';
      case 'fr':
        return '🇫🇷';
      default:
        return '🇫🇷';
    }
  }

  static bool isSupported(String languageCode) {
    return supportedLocales.any(
      (locale) => locale.languageCode == languageCode,
    );
  }

  static Locale get defaultLocale => supportedLocales.first;

  static const List<LocalizationsDelegate<dynamic>> localizationsDelegates = [
    AppLocalizations.delegate,

    GlobalMaterialLocalizations.delegate,

    GlobalCupertinoLocalizations.delegate,

    GlobalWidgetsLocalizations.delegate,
  ];
}

extension AppLocalizationsX on BuildContext {
  AppLocalizations get l10n => AppLocalizations.of(this)!;
}

class LocaleProvider with ChangeNotifier {
  Locale _locale = L10n.defaultLocale;

  Locale get locale => _locale;

  void setLocale(Locale locale) {
    if (!L10n.isSupported(locale.languageCode)) {
      return;
    }

    _locale = locale;

    notifyListeners();
  }

  void setLocaleFromCode(String languageCode) {
    setLocale(Locale(languageCode));
  }

  void nextLocale() {
    final currentIndex = L10n.supportedLocales.indexOf(_locale);
    final nextIndex = (currentIndex + 1) % L10n.supportedLocales.length;
    setLocale(L10n.supportedLocales[nextIndex]);
  }
}
