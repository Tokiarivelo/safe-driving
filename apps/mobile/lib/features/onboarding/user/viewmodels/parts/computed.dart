part of '../user_onboarding_viewmodel.dart';

mixin UserOnboardingComputedMixin on UserOnboardingContract {
  String getStepTitle(int step) {
    return UserOnboardingData.getStepTitle(step);
  }

  UserOnboardingStepModel getStepContent(int index) {
    return UserOnboardingData.getStepContent(index);
  }

  double getProgress() {
    return _currentStep / UserOnboardingData.totalSteps;
  }
}

