import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class ThemeController extends ChangeNotifier {
  static const _storageKey = 'theme_mode';

  ThemeMode _mode;

  ThemeController({ThemeMode initialMode = ThemeMode.light})
    : _mode = initialMode {
    _loadPersistedMode();
  }

  ThemeMode get mode => _mode;

  void setMode(ThemeMode mode) {
   
    if (mode == ThemeMode.system) {
      mode = ThemeMode.light;
    }
    if (_mode == mode) return;
    _mode = mode;
    notifyListeners();

    _persistMode(mode);
  }

  Future<void> _loadPersistedMode() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final value = prefs.getString(_storageKey);
      if (value == null) return;
      final loaded = _fromString(value);
      if (loaded != _mode) {
        _mode = loaded;
        notifyListeners();
      }
    } catch (_) {}
  }

  Future<void> _persistMode(ThemeMode mode) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString(_storageKey, _toString(mode));
    } catch (_) {
      // Ignorer les erreurs d'écriture
    }
  }

  static ThemeMode fromLabel(String label) {
    final l = label.trim().toLowerCase();
    if (l == 'clair' || l == 'light') return ThemeMode.light;
    if (l == 'sombre' || l == 'dark' || l == 'noir') return ThemeMode.dark;
    // Supprimer le mode automatique: toute saisie 'auto/automatique/system' => light
    if (l == 'system' ||
        l == 'système' ||
        l == 'systeme' ||
        l == 'auto' ||
        l == 'automatique') {
      return ThemeMode.light;
    }
    return ThemeMode.light;
  }

  static String _toString(ThemeMode mode) {
    switch (mode) {
      case ThemeMode.light:
        return 'light';
      case ThemeMode.dark:
        return 'dark';
      case ThemeMode.system:
        return 'system';
    }
  }

  static ThemeMode _fromString(String value) {
    switch (value) {
      case 'light':
        return ThemeMode.light;
      case 'dark':
        return ThemeMode.dark;
      case 'system':
      default:
        // Si une ancienne valeur 'system' est stockée, forcer maintenant à 'light'
        return ThemeMode.light;
    }
  }
}
