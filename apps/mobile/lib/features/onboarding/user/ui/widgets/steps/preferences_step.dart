part of '../user_step_content_widget.dart';

class _PreferencesStep extends StatelessWidget {
  final UserOnboardingStepModel stepContent;
  final UserOnboardingViewModel viewModel;

  const _PreferencesStep({required this.stepContent, required this.viewModel});

  @override
  Widget build(BuildContext context) {
    final themeLabel = context.l10n.stepPreferencesTheme;
    final themeOptions =
        (stepContent.additionalContent?['themeOptions'] as List<dynamic>?)
            ?.cast<String>() ??
        const ['Clair', 'Sombre'];
    final transportLabel = context.l10n.stepPreferencesTransport;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          context.l10n.stepPreferencesTitle,
          style: AppTextStyles.h1(context),
        ),
        const SizedBox(height: 8),
        Text(
          context.l10n.stepPreferencesSubtitle,
          style: AppTextStyles.body14(context).copyWith(
            color: Theme.of(
              context,
            ).colorScheme.onSurface.withValues(alpha: 0.75),
          ),
        ),
        const SizedBox(height: 16),
        Text(
          themeLabel,
          style: TextStyle(color: Theme.of(context).colorScheme.onSurface),
        ),
        UserThemeSelectorWidget(
          selectedTheme: viewModel.appState.selectedTheme,
          themeOptions: themeOptions,
          onThemeSelected: (theme) {
            viewModel.updateTheme(theme);
            final mode = ThemeController.fromLabel(theme);
            context.read<ThemeController>().setMode(mode);
          },
        ),
        const SizedBox(height: 16),
        Text(
          transportLabel,
          style: TextStyle(color: Theme.of(context).colorScheme.onSurface),
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
          onActionPressed: () async {
            if (!viewModel.validateCurrentStep()) {
              final msg =
                  viewModel.getValidationError() ??
                  context.l10n.stepPreferencesValidate;
              SnackbarHelper.showWarning(
                context,
                msg,
                duration: const Duration(seconds: 2),
              );
              return;
            }
            await viewModel.saveCurrentPreferences();
            if (!context.mounted) return;
            viewModel.nextStepImmediate();
          },
          actionText: context.l10n.stepPreferencesValidate,
          laterText: context.l10n.stepPreferencesLater,
          fontSize: 14,
          padding: const EdgeInsets.symmetric(vertical: 16),
        ),
      ],
    );
  }
}
