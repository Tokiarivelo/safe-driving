part of '../user_onboarding_viewmodel.dart';

mixin UserOnboardingStateMixin on UserOnboardingContract {
  void init() {
    _initializeExpandedTiles();
  }

  void _initializeExpandedTiles() {
    for (int i = 1; i <= totalSteps; i++) {
      _expandedTiles[i] = false;
    }
    _expandedTiles[1] = true;
  }

  @override
  void _setLoading(bool loading) {
    _isLoading = loading;
    notifyListeners();
  }

  @override
  void _setError(String? error) {
    _errorMessage = error;
    notifyListeners();
  }

  void resetOnboarding() {
    _currentStep = 1;
    _appState = const AppState();
    _initializeExpandedTiles();
    _isLoading = false;
    _errorMessage = null;
    notifyListeners();
  }
}
