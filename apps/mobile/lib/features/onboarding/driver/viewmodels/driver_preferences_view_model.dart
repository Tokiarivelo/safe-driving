import 'package:flutter/material.dart';
import '../core/interfaces/driver_service_interface.dart';

class DriverPreferencesViewModel extends ChangeNotifier {
  final IDriverService _service;
  bool _gpsEnabled = false;
  final List<String> _selectedNotifications = [];
  String _selectedTheme = 'clair';
  String _selectedLanguage = 'fr';
  final List<bool> _cguAccepted = [false, false];
  bool _isLoading = false;
  String? _errorMessage;

  DriverPreferencesViewModel(this._service);

  bool get gpsEnabled => _gpsEnabled;
  List<String> get selectedNotifications => _selectedNotifications;
  String get selectedTheme => _selectedTheme;
  String get selectedLanguage => _selectedLanguage;
  List<bool> get cguAccepted => _cguAccepted;
  bool get allCguAccepted => _cguAccepted.every((accepted) => accepted);
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;

  void setGpsEnabled(bool enabled) {
    _gpsEnabled = enabled;
    notifyListeners();
  }

  void toggleNotification(String notification) {
    if (_selectedNotifications.contains(notification)) {
      _selectedNotifications.remove(notification);
    } else {
      _selectedNotifications.add(notification);
    }
    notifyListeners();
  }

  void setTheme(String theme) {
    _selectedTheme = theme;
    notifyListeners();
  }

  void setLanguage(String language) {
    _selectedLanguage = language;
    notifyListeners();
  }

  void setCguAccepted(int index, bool accepted) {
    if (index >= 0 && index < _cguAccepted.length) {
      _cguAccepted[index] = accepted;
      notifyListeners();
    }
  }

  // Validation methods
  bool isGpsConfigured() => true; // GPS is optional
  bool arePreferencesValid() => true; // Preferences are optional
  bool areTermsAccepted() => allCguAccepted;

  // Save methods
  Future<void> saveNotificationPreferences() async {
    _setLoading(true);
    try {
      final preferences = Map<String, bool>.fromEntries(
        _selectedNotifications.map((notif) => MapEntry(notif, true))
      );
      await _service.saveNotificationPreferences(preferences);
      _clearError();
    } catch (e) {
      _setError('Erreur lors de la sauvegarde des préférences de notification: $e');
      rethrow;
    } finally {
      _setLoading(false);
    }
  }

  Future<void> saveAppPreferences() async {
    _setLoading(true);
    try {
      await _service.saveAppPreferences(
        theme: _selectedTheme,
        language: _selectedLanguage,
      );
      _clearError();
    } catch (e) {
      _setError('Erreur lors de la sauvegarde des préférences de l\'application: $e');
      rethrow;
    } finally {
      _setLoading(false);
    }
  }

  Map<String, String> getPreferencesSummaryData() {
    return {
      'GPS': _gpsEnabled ? 'Activé' : 'Désactivé',
      'Notifications': _selectedNotifications.isNotEmpty
          ? _selectedNotifications.join(', ')
          : 'Aucune',
      'Thème': _selectedTheme == 'clair' ? 'Clair' : 'Sombre',
      'Langue': _selectedLanguage == 'fr' ? 'Français' : 'Anglais',
    };
  }

  // Data extraction methods
  Map<String, dynamic> getPreferencesData() {
    return {
      'gps_enabled': _gpsEnabled,
      'notifications': _selectedNotifications,
      'theme': _selectedTheme,
      'language': _selectedLanguage,
      'cgu_accepted': allCguAccepted,
    };
  }

  Map<String, String> getPreferencesSummary() {
    return getPreferencesSummaryData();
  }

  // State management
  void _setLoading(bool loading) {
    _isLoading = loading;
    notifyListeners();
  }

  void _setError(String? error) {
    _errorMessage = error;
    notifyListeners();
  }

  void _clearError() {
    _errorMessage = null;
    notifyListeners();
  }

  String getPreferenceValue(String preferenceName) {
    final preferencesData = getPreferencesSummaryData();
    return preferencesData[preferenceName] ?? 'Non renseigné';
  }
}
