import 'package:flutter/material.dart';
import '../../models/driver_onboarding_step_model.dart';
import '../../models/driver_onboarding_data.dart';

class OnboardingFlowViewModel extends ChangeNotifier {
  int _currentStep = 0;
  bool _isLoading = false;
  String? _errorMessage;

  // Getters
  int get currentStep => _currentStep;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;
  List<DriverOnboardingStepModel> get steps => DriverOnboardingData.getDriverSteps();

  void _setLoading(bool loading) {
    _isLoading = loading;
    notifyListeners();
  }

  void _setError(String? error) {
    _errorMessage = error;
    notifyListeners();
  }

  void goToStep(int stepIndex) {
    if (stepIndex >= 0 && stepIndex < steps.length) {
      _currentStep = stepIndex;
      notifyListeners();
    }
  }

  void nextStep() {
    if (_currentStep < steps.length - 1) {
      _currentStep++;
      notifyListeners();
    }
  }

  void previousStep() {
    if (_currentStep > 0) {
      _currentStep--;
      notifyListeners();
    }
  }

  void clearError() {
    _errorMessage = null;
    notifyListeners();
  }

  void setLoading(bool loading) {
    _setLoading(loading);
  }

  void setError(String error) {
    _setError(error);
  }
}
