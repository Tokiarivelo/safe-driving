part of '../user_onboarding_viewmodel.dart';

mixin UserOnboardingValidationMixin on UserOnboardingContract {
  bool validateCurrentStep() {
    switch (_currentStep) {
      case 4:
        return _appState.selectedTransports.isNotEmpty;
      default:
        return true;
    }
  }

  String? getValidationError() {
    switch (_currentStep) {
      case 4:
        if (_appState.selectedTransports.isEmpty) {
          return 'Veuillez sélectionner au moins un mode de transport';
        }
        break;
    }
    return null;
  }
}
