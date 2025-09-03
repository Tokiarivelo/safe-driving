part of '../user_step_content_widget.dart';

class _PreferencesStep extends StatelessWidget {
  final UserOnboardingStepModel stepContent;
  final UserOnboardingViewModel viewModel;

  const _PreferencesStep({required this.stepContent, required this.viewModel});

  @override
  Widget build(BuildContext context) {
    final themeLabel = stepContent.additionalContent?['themeLabel'] ?? 'Thème';
    final themeOptions =
        (stepContent.additionalContent?['themeOptions'] as List<dynamic>?)
            ?.cast<String>() ??
        const ['Clair', 'Sombre'];
    final transportLabel =
        stepContent.additionalContent?['transportLabel'] ?? 'Type de transport';

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(stepContent.title, style: AppTextStyles.h1(context)),
        const SizedBox(height: 8),
        Text(
          stepContent.subtitle,
          style: AppTextStyles.body14(context).copyWith(
            color: AppColors.buttonWithoutBackGround.withValues(alpha: 0.75),
          ),
        ),
        const SizedBox(height: 16),
        Text(
          themeLabel,
          style: const TextStyle(color: AppColors.buttonWithoutBackGround),
        ),
        UserThemeSelectorWidget(
          selectedTheme: viewModel.appState.selectedTheme,
          themeOptions: themeOptions,
          onThemeSelected: viewModel.updateTheme,
        ),
        const SizedBox(height: 16),
        Text(
          transportLabel,
          style: const TextStyle(color: AppColors.buttonWithoutBackGround),
        ),
        const SizedBox(height: 8),
        UserTransportSelectorWidget(
          selectedTransports: viewModel.appState.selectedTransports,
          onSelectionChanged: (entry) =>
              viewModel.updateTransport(entry.key, entry.value),
        ),
        const SizedBox(height: 24),
        ButtonRows.laterAndActionButtons(
          onLaterPressed: viewModel.nextStepImmediate,
          onActionPressed: () {
            if (!viewModel.validateCurrentStep()) {
              final msg =
                  viewModel.getValidationError() ??
                  'Veuillez compléter les informations requises';
              SnackbarHelper.showWarning(
                context,
                msg,
                duration: const Duration(seconds: 2),
              );
              return;
            }
            viewModel.nextStepImmediate();
          },
          actionText: stepContent.buttonTitles.length > 1
              ? stepContent.buttonTitles[1]
              : 'Valider',
          fontSize: 14,
          padding: const EdgeInsets.symmetric(vertical: 16),
        ),
      ],
    );
  }
}
