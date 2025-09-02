part of '../user_ui_builder.dart';

Widget _buildOnboardingLayout({
  required Widget child,
  required int currentStep,
  required int totalSteps,
  required String stepTitle,
}) {
  return Column(
    children: [
      _buildHeader(),
      UserStepIndicator(currentStep: currentStep, totalSteps: totalSteps),
      Expanded(child: child),
    ],
  );
}
