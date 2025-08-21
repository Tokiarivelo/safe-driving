import 'package:flutter/material.dart';
import '../models/user_onboarding_step_model.dart';
import '../services/user_service.dart';
import '../models/user_onboarding_data.dart';

class UserOnboardingViewModel extends ChangeNotifier {
  int _currentStep = 1;
  AppState _appState = const AppState();
  final Map<int, bool> _expandedTiles = {};
  bool _isLoading = false;
  String? _errorMessage;

  // Getters
  int get currentStep => _currentStep;
  AppState get appState => _appState;
  Map<int, bool> get expandedTiles => _expandedTiles;
  int get totalSteps => UserOnboardingData.totalSteps;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;
  bool get isFirstStep => _currentStep == 1;
  bool get isLastStep => _currentStep == UserOnboardingData.totalSteps;

  UserOnboardingViewModel() {
    _initializeExpandedTiles();
  }

  void _initializeExpandedTiles() {
    for (int i = 2; i <= totalSteps; i++) {
      _expandedTiles[i] = false;
    }
  }

  void _setLoading(bool loading) {
    _isLoading = loading;
    notifyListeners();
  }

  void _setError(String? error) {
    _errorMessage = error;
    notifyListeners();
  }

  // Navigation methods
  void nextStep() {
    if (_currentStep < totalSteps) {
      _updateStep(_currentStep + 1);
    }
  }

  void previousStep() {
    if (_currentStep > 1) {
      _updateStep(_currentStep - 1);
    }
  }

  void goToStep(int step) {
    if (UserOnboardingData.isValidStep(step)) {
      _updateStep(step);
    }
  }

  void nextStepImmediate() {
    if (_currentStep < totalSteps) {
      final newStep = _currentStep + 1;
      if (_currentStep > 1) {
        _expandedTiles[_currentStep] = false;
      }
      _currentStep = newStep;
      if (newStep > 1) {
        _expandedTiles[newStep] = true;
      }
      notifyListeners();
    }
  }

  void _updateStep(int newStep) {
    if (_currentStep > 1) {
      _expandedTiles[_currentStep] = false;
    }
    _currentStep = newStep;
    if (newStep > 1) {
      _expandedTiles[newStep] = true;
    }
    notifyListeners();
  }

  void updateExpansionTile(int step, bool expanded) {
    _expandedTiles[step] = expanded;
    if (expanded && _currentStep != step) {
      for (int i = 2; i <= totalSteps; i++) {
        if (i != step) {
          _expandedTiles[i] = false;
        }
      }
      _currentStep = step;
    }
    notifyListeners();
  }

  // State management methods
  Future<void> updateGps(
    bool value,
    BuildContext context, {
    bool shouldSave = true,
  }) async {
    if (value) {
      final granted = await UserOnboardingService.requestGpsPermission(context);
      _appState = _appState.copyWith(gpsEnabled: granted);
    } else {
      _appState = _appState.copyWith(gpsEnabled: value);
    }
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
    _appState = _appState.copyWith(notifEnabled: value);
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

  bool validateCurrentStep() {
    switch (_currentStep) {
      case 5:
        return _appState.selectedTransports.isNotEmpty;
      default:
        return true;
    }
  }

  String? getValidationError() {
    switch (_currentStep) {
      case 5:
        if (_appState.selectedTransports.isEmpty) {
          return 'Veuillez sélectionner au moins un mode de transport';
        }
        break;
    }
    return null;
  }

  // Utility methods
  String getStepTitle(int step) {
    return UserOnboardingData.getStepTitle(step);
  }

  UserOnboardingStepModel getStepContent(int index) {
    return UserOnboardingData.getStepContent(index);
  }

  double getProgress() {
    return _currentStep / UserOnboardingData.totalSteps;
  }

  // Service integration
  Future<void> _savePreferences() async {
    await UserOnboardingService.saveUserPreferences(_appState);
  }

  Future<void> loadPreferences() async {
    _setLoading(true);
    try {
      final savedState = await UserOnboardingService.loadUserPreferences();
      if (savedState != null) {
        _appState = savedState;
        notifyListeners();
      }
    } catch (e) {
      _setError('Erreur lors du chargement des préférences');
    } finally {
      _setLoading(false);
    }
  }

  Future<bool> completeOnboarding(BuildContext context) async {
    _setLoading(true);
    _setError(null);

    try {
      await _savePreferences();
      // Check if the widget is still mounted before using context
      if (context.mounted) {
        UserOnboardingService.completeOnboarding(context);
      }
      _setLoading(false);
      return true;
    } catch (e) {
      _setError('Erreur lors de la finalisation');
      _setLoading(false);
      return false;
    }
  }

  // Reset onboarding
  void resetOnboarding() {
    _currentStep = 1;
    _appState = const AppState();
    _initializeExpandedTiles();
    _isLoading = false;
    _errorMessage = null;
    notifyListeners();
  }
}
