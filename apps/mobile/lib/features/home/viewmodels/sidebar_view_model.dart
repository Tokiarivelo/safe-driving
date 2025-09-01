import 'package:flutter/material.dart';
import '../models/sidebar_model.dart';

enum AppTheme { dark, light, system }

enum AppLanguage { french, english }

class SidebarViewModel with ChangeNotifier {
  final SidebarModel _model = SidebarModel();
  AppLanguage _currentLanguage = AppLanguage.french;
  AppTheme _currentTheme = AppTheme.dark;

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
    notifyListeners();
  }

  void setLanguage(AppLanguage language) {
    _currentLanguage = language;
    notifyListeners();
  }
}
