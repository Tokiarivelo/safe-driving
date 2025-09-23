import 'package:flutter/material.dart';
import 'package:safe_driving/core/theme/theme_controller.dart';
import 'package:safe_driving/l10n/l10n.dart';
import '../models/sidebar_model.dart';

enum AppTheme { dark, light, system }

enum AppLanguage { french, english }

class SidebarViewModel with ChangeNotifier {
  final SidebarModel _model = SidebarModel();
  AppLanguage _currentLanguage = AppLanguage.french;
  AppTheme _currentTheme = AppTheme.dark;

  final ThemeController themeController;
  final LocaleProvider localeProvider;

  SidebarViewModel({required this.themeController, required this.localeProvider}) {
    // Initialize from global controllers
    _currentTheme = _fromThemeMode(themeController.mode);
    _currentLanguage = _fromLocale(localeProvider.locale);

    // Keep in sync with global changes
    themeController.addListener(_onThemeChanged);
    localeProvider.addListener(_onLocaleChanged);
  }

  int get selectedIndex => _model.selectedIndex;
  bool get isDarkTheme => _model.isDarkTheme;
  AppLanguage get currentLanguage => _currentLanguage;
  AppTheme get currentTheme => _currentTheme;

  String get currentThemeName {
    switch (_currentTheme) {
      case AppTheme.dark:
        return 'Sombre';
      case AppTheme.light:
        return 'Clair';
      case AppTheme.system:
        return 'Système';
    }
  }

  String get currentLanguageName {
    switch (_currentLanguage) {
      case AppLanguage.french:
        return 'Français';
      case AppLanguage.english:
        return 'English';
    }
  }

  void selectMenuItem(int index) {
    _model.selectIndex(index);
    notifyListeners();
  }

  void toggleTheme() {
    _model.toggleTheme();
    notifyListeners();
  }

  void setTheme(AppTheme theme) {
    _currentTheme = theme;
    themeController.setMode(_toThemeMode(theme));
    notifyListeners();
  }

  void setLanguage(AppLanguage language) {
    _currentLanguage = language;
    final code = language == AppLanguage.french ? 'fr' : 'en';
    localeProvider.setLocaleFromCode(code);
    notifyListeners();
  }

  void _onThemeChanged() {
    final newTheme = _fromThemeMode(themeController.mode);
    if (newTheme != _currentTheme) {
      _currentTheme = newTheme;
      notifyListeners();
    }
  }

  void _onLocaleChanged() {
    final newLang = _fromLocale(localeProvider.locale);
    if (newLang != _currentLanguage) {
      _currentLanguage = newLang;
      notifyListeners();
    }
  }

  AppTheme _fromThemeMode(ThemeMode mode) {
    switch (mode) {
      case ThemeMode.dark:
        return AppTheme.dark;
      case ThemeMode.light:
        return AppTheme.light;
      case ThemeMode.system:
        return AppTheme.system;
    }
  }

  ThemeMode _toThemeMode(AppTheme theme) {
    switch (theme) {
      case AppTheme.dark:
        return ThemeMode.dark;
      case AppTheme.light:
        return ThemeMode.light;
      case AppTheme.system:
        return ThemeMode.system;
    }
  }

  AppLanguage _fromLocale(Locale locale) {
    switch (locale.languageCode) {
      case 'en':
        return AppLanguage.english;
      case 'fr':
      default:
        return AppLanguage.french;
    }
  }

  @override
  void dispose() {
    themeController.removeListener(_onThemeChanged);
    localeProvider.removeListener(_onLocaleChanged);
    super.dispose();
  }
}
