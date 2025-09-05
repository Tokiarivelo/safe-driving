import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:shared_preferences/shared_preferences.dart';

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
  static const String _prefsKey = 'app_locale';

  Locale _locale = L10n.defaultLocale;

  LocaleProvider() {
    _loadLocale();
  }

  Locale get locale => _locale;

  void setLocale(Locale locale) {
    if (!L10n.isSupported(locale.languageCode)) {
      return;
    }

    _locale = locale;
    notifyListeners();

    // Persist the chosen locale
    _persistLocale(locale.languageCode);
  }

  void setLocaleFromCode(String languageCode) {
    setLocale(Locale(languageCode));
  }

  void nextLocale() {
    final currentIndex = L10n.supportedLocales.indexOf(_locale);
    final nextIndex = (currentIndex + 1) % L10n.supportedLocales.length;
    setLocale(L10n.supportedLocales[nextIndex]);
  }

  Future<void> _loadLocale() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final code = prefs.getString(_prefsKey);
      if (code != null && L10n.isSupported(code)) {
        _locale = Locale(code);
        notifyListeners();
      }
    } catch (_) {
      // Ignore loading errors; keep default locale
    }
  }

  Future<void> _persistLocale(String code) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString(_prefsKey, code);
    } catch (_) {
      // Ignore persistence errors
    }
  }
}
