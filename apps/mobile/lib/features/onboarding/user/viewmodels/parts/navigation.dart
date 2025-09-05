part of '../user_onboarding_viewmodel.dart';

mixin UserOnboardingNavigationMixin on UserOnboardingContract {
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
      _expandedTiles[_currentStep] = false;
      _currentStep = newStep;
      _expandedTiles[newStep] = true;
      notifyListeners();
    }
  }

  void _updateStep(int newStep) {
    _expandedTiles[_currentStep] = false;
    _currentStep = newStep;
    _expandedTiles[newStep] = true;
    notifyListeners();
  }

  void updateExpansionTile(int step, bool expanded) {
    _expandedTiles[step] = expanded;
    if (expanded && _currentStep != step) {
      for (int i = 1; i <= totalSteps; i++) {
        if (i != step) {
          _expandedTiles[i] = false;
        }
      }
      _currentStep = step;
    }
    notifyListeners();
  }
}
