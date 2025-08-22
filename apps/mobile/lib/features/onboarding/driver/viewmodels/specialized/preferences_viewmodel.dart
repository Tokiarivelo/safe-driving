import 'package:flutter/material.dart';
import '../../core/interfaces/driver_service_interface.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/utils/permission_handlers.dart';
import 'package:safe_driving/shared/widgets/customs/snackbar/snackbar_helper.dart';

class PreferencesViewModel extends ChangeNotifier {
  final IDriverService _service;

  PreferencesViewModel(this._service);

  bool _gpsEnabled = false;
  final List<String> _selectedNotifications = [];
  String _selectedTheme = 'clair';
  String _selectedLanguage = 'fr';
  bool _isLoading = false;
  String? _errorMessage;

  // Getters
  bool get gpsEnabled => _gpsEnabled;
  List<String> get selectedNotifications => _selectedNotifications;
  String get selectedTheme => _selectedTheme;
  String get selectedLanguage => _selectedLanguage;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;

  void _setLoading(bool loading) {
    _isLoading = loading;
    notifyListeners();
  }

  void _setError(String? error) {
    _errorMessage = error;
    notifyListeners();
  }

  // GPS methods
  void setGpsEnabled(bool enabled) {
    _gpsEnabled = enabled;
    notifyListeners();
  }

  Future<bool> requestGpsPermission() async {
    _setLoading(true);
    try {
      final granted = await _service.requestLocationPermission();
      setGpsEnabled(granted);
      return granted;
    } catch (e) {
      _setError('Erreur lors de la demande de permission GPS: $e');
      return false;
    } finally {
      _setLoading(false);
    }
  }

  Future<void> handleGpsPermission(BuildContext context) async {
    final granted = await PermissionHandlers.handleGpsPermission(context);
    setGpsEnabled(granted);
    if (granted && context.mounted) {
      SnackbarHelper.showSuccess(
        context,
        'Géolocalisation activée avec succès !',
      );
    }
  }

  // Notifications methods
  void toggleNotification(String notification) {
    if (_selectedNotifications.contains(notification)) {
      _selectedNotifications.remove(notification);
    } else {
      _selectedNotifications.add(notification);
    }
    notifyListeners();
  }

  void addNotification(String notification) {
    if (!_selectedNotifications.contains(notification)) {
      _selectedNotifications.add(notification);
      notifyListeners();
    }
  }

  void removeNotification(String notification) {
    if (_selectedNotifications.remove(notification)) {
      notifyListeners();
    }
  }

  void clearNotifications() {
    _selectedNotifications.clear();
    notifyListeners();
  }

  // Theme methods
  void setTheme(String theme) {
    _selectedTheme = theme;
    notifyListeners();
  }

  void setSelectedTheme(String theme) {
    _selectedTheme = theme;
    notifyListeners();
  }

  // Language methods
  void setLanguage(String language) {
    _selectedLanguage = language;
    notifyListeners();
  }

  void setSelectedLanguage(String language) {
    _selectedLanguage = language;
    notifyListeners();
  }

  // Summary methods
  Map<String, String> getPreferencesSummary() {
    return {
      'GPS': _gpsEnabled ? 'Activé' : 'Désactivé',
      'Notifications': _selectedNotifications.isNotEmpty
          ? _selectedNotifications.join(', ')
          : 'Aucune',
      'Thème': _selectedTheme == 'clair' ? 'Clair' : 'Sombre',
      'Langue': _selectedLanguage == 'fr' ? 'Français' : 'Anglais',
    };
  }

  Map<String, dynamic> getPreferencesData() {
    return {
      'gps_enabled': _gpsEnabled,
      'notifications': _selectedNotifications,
      'theme': _selectedTheme,
      'language': _selectedLanguage,
    };
  }

  void resetPreferences() {
    _gpsEnabled = false;
    _selectedNotifications.clear();
    _selectedTheme = 'clair';
    _selectedLanguage = 'fr';
    notifyListeners();
  }

  void clearError() {
    _errorMessage = null;
    notifyListeners();
  }
}
