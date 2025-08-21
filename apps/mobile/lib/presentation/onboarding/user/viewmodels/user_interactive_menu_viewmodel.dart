import 'package:flutter/foundation.dart';
import '../models/app_state.dart';
import '../models/user_onboarding_data.dart';
import '../repository/user_repository.dart';

class UserInteractiveMenuViewModel extends ChangeNotifier {
  final UserRepository _repository;

  UserInteractiveMenuViewModel(this._repository);

  AppState _appState = AppState();
  AppState get appState => _appState;

  UserOnboardingData? _onboardingData;
  UserOnboardingData? get onboardingData => _onboardingData;

  bool _isLoading = false;
  bool get isLoading => _isLoading;

  String? _error;
  String? get error => _error;

  void _setLoading(bool loading) {
    _isLoading = loading;
    notifyListeners();
  }

  void _setError(String? error) {
    _error = error;
    notifyListeners();
  }

  Future<void> loadUserData(String userId) async {
    _setLoading(true);
    _setError(null);

    try {
      final preferences = await _repository.getUserPreferences(userId);
      final data = await _repository.getUserOnboardingData(userId);

      _appState = preferences;
      _onboardingData = data;
    } catch (e) {
      _setError('Erreur lors du chargement des données utilisateur: $e');
    } finally {
      _setLoading(false);
    }
  }

  Future<void> updateTheme(String theme) async {
    try {
      await _repository.saveThemePreference(theme);
      _appState = _appState.copyWith(theme: theme);
      notifyListeners();
    } catch (e) {
      _setError('Erreur lors de la sauvegarde du thème: $e');
    }
  }

  Future<void> updateLanguage(String language) async {
    try {
      await _repository.saveLanguagePreference(language);
      _appState = _appState.copyWith(language: language);
      notifyListeners();
    } catch (e) {
      _setError('Erreur lors de la sauvegarde de la langue: $e');
    }
  }

  Future<void> updateGpsPreference(bool enabled) async {
    try {
      await _repository.saveGpsPreference(enabled);
      _appState = _appState.copyWith(gpsEnabled: enabled);
      notifyListeners();
    } catch (e) {
      _setError('Erreur lors de la sauvegarde des préférences GPS: $e');
    }
  }

  Future<void> updateNotificationPreference(bool enabled) async {
    try {
      await _repository.saveNotificationPreference(enabled);
      _appState = _appState.copyWith(notificationsEnabled: enabled);
      notifyListeners();
    } catch (e) {
      _setError('Erreur lors de la sauvegarde des préférences de notification: $e');
    }
  }

  Future<void> updateTransportPreferences(List<String> transports) async {
    try {
      await _repository.saveTransportPreferences(transports);
      _appState = _appState.copyWith(transportPreferences: transports);
      notifyListeners();
    } catch (e) {
      _setError('Erreur lors de la sauvegarde des préférences de transport: $e');
    }
  }

  Future<void> completeOnboarding() async {
    _setLoading(true);
    _setError(null);

    try {
      await _repository.completeOnboarding(_appState);
      _appState = _appState.copyWith(onboardingCompleted: true);
    } catch (e) {
      _setError('Erreur lors de la finalisation de l\'onboarding: $e');
    } finally {
      _setLoading(false);
    }
  }

  void clearError() {
    _setError(null);
  }

  void reset() {
    _appState = AppState();
    _onboardingData = null;
    _isLoading = false;
    _error = null;
    notifyListeners();
  }
}
