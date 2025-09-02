part of '../user_onboarding_viewmodel.dart';

mixin UserOnboardingPreferencesMixin on UserOnboardingContract {
  Future<void> updateGps(
    bool value,
    BuildContext context, {
    bool shouldSave = true,
  }) async {
    bool granted = value;
    if (value) {
      granted = await _repository.requestGpsPermission(context);
    }
    _appState = _appState.copyWith(gpsEnabled: granted);
    notifyListeners();
    if (shouldSave && value) {
      await _savePreferences();
    }
  }

  Future<void> updateNotifications(
    bool value,
    BuildContext context, {
    bool shouldSave = true,
  }) async {
    bool granted = value;
    if (value) {
      final selectedNotifications = ['push', 'alerts', 'updates'];
      granted = await _repository.requestNotificationPermission(
        context,
        selectedNotifications,
      );
    }
    _appState = _appState.copyWith(notifEnabled: granted);
    notifyListeners();
    if (shouldSave && value) {
      await _savePreferences();
    }
  }

  void updateTheme(String theme) {
    _appState = _appState.copyWith(selectedTheme: theme);
    notifyListeners();
  }

  void updateTransport(String transport, bool selected) {
    final newTransports = List<String>.from(_appState.selectedTransports);
    if (selected) {
      newTransports.add(transport);
    } else {
      newTransports.remove(transport);
    }
    _appState = _appState.copyWith(selectedTransports: newTransports);
    notifyListeners();
  }

  void removeTransport(String transport) {
    final newTransports = List<String>.from(_appState.selectedTransports);
    newTransports.remove(transport);
    _appState = _appState.copyWith(selectedTransports: newTransports);
    notifyListeners();
  }

  void updateLanguage(String language) {
    _appState = _appState.copyWith(selectedLanguage: language);
    notifyListeners();
  }
}

