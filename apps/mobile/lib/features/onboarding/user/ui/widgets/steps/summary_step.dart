part of '../user_step_content_widget.dart';

class _SummaryStep extends StatelessWidget {
  final UserOnboardingStepModel stepContent;
  final UserOnboardingViewModel viewModel;

  const _SummaryStep({required this.stepContent, required this.viewModel});

  @override
  Widget build(BuildContext context) {
    final l10n = context.l10n;

  
    String themeNameRaw = viewModel.appState.selectedTheme;
    final raw = themeNameRaw.toLowerCase();
    final themeName = (raw.contains('sombre') || raw.contains('dark'))
        ? l10n.stepPreferencesThemeDark
        : l10n.stepPreferencesThemeLight;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(l10n.stepSummaryTitle, style: AppTextStyles.h1(context)),
        const SizedBox(height: 8),
        Text(
          l10n.stepSummarySubtitle,
          style: AppTextStyles.body14(context).copyWith(
            color: Theme.of(context).colorScheme.onSurface.withValues(alpha: 0.75),
          ),
        ),
        const SizedBox(height: 16),
        Row(
          children: [
            SwitchesAndRadios.customSwitch(
              value: viewModel.appState.gpsEnabled,
              onChanged: (v) => viewModel.updateGps(v, context),
            ),
            const SizedBox(width: 8),
            Builder(
              builder: (context) => Text(
                l10n.stepSummaryGps,
                style: TextStyle(color: Theme.of(context).colorScheme.onSurface),
              ),
            ),
          ],
        ),
        Row(
          children: [
            SwitchesAndRadios.customSwitch(
              value: viewModel.appState.notifEnabled,
              onChanged: (v) => viewModel.updateNotifications(v, context),
            ),
            const SizedBox(width: 8),
            Builder(
              builder: (context) => Text(
                l10n.stepSummaryNotifications,
                style: TextStyle(color: Theme.of(context).colorScheme.onSurface),
              ),
            ),
          ],
        ),
        const SizedBox(height: 16),
        Builder(
          builder: (context) => Text(
            l10n.stepSummaryTheme(themeName),
            style: TextStyle(color: Theme.of(context).colorScheme.onSurface),
          ),
        ),
        const SizedBox(height: 8),
        Builder(
          builder: (context) => Text(
            l10n.stepSummaryTransports,
            style: TextStyle(color: Theme.of(context).colorScheme.onSurface),
          ),
        ),
        const SizedBox(height: 8),
        Container(
          decoration: BoxDecoration(
            border: Border.all(
              color: ColorsWidget.subtleBorderColor(context),
              width: 1,
            ),
            borderRadius: BorderRadius.circular(8),
          ),
          padding: const EdgeInsets.all(12),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              if (viewModel.appState.selectedTransports.isNotEmpty)
                Wrap(
                  spacing: 8,
                  runSpacing: 4,
                  children: viewModel.appState.selectedTransports
                      .map(
                        (transport) => Chip(
                          avatar: Icon(
                            UserOnboardingData.transportIcons[transport],
                            size: 16,
                            color: Theme.of(context).colorScheme.onSurface,
                          ),
                          label: Text(
                            transport,
                            style: TextStyle(
                              color: Theme.of(context).colorScheme.onSurface,
                              fontSize: 12,
                            ),
                          ),
                          deleteIcon: Icon(
                            Icons.close,
                            size: 18,
                            color: Theme.of(context).colorScheme.onSurface,
                          ),
                          onDeleted: () => viewModel.removeTransport(transport),
                          backgroundColor:
                              Theme.of(context).colorScheme.surface,
                          side: BorderSide(
                            color: ColorsWidget.subtleBorderColor(context),
                            width: 1,
                          ),
                        ),
                      )
                      .toList(),
                )
              else
                Text(
                  l10n.stepSummaryNoTransports,
                  style: TextStyle(
                    color: Theme.of(context).colorScheme.onSurface.withValues(alpha: 0.75),
                    fontStyle: FontStyle.italic,
                  ),
                ),
            ],
          ),
        ),
        const SizedBox(height: 16),
        Builder(
          builder: (context) => Text(
            '${l10n.language} :',
            style: TextStyle(color: Theme.of(context).colorScheme.onSurface),
          ),
        ),
        const SizedBox(height: 8),
        LanguageButtons.languageButtonContainer(
          selectedLanguage: viewModel.appState.selectedLanguage,
          onLanguageChanged: viewModel.updateLanguage,
        ),
        const SizedBox(height: 24),
        ButtonRows.laterAndActionButtons(
          onLaterPressed: () => viewModel.goToStep(1),
          onActionPressed: () async {
            final ok = await viewModel.completeOnboarding(context);
            if (!context.mounted) return;
            if (ok) {
              SnackbarHelper.showSuccess(
                context,
                l10n.stepSummaryValidate,
                duration: const Duration(seconds: 2),
              );
            } else {
              SnackbarHelper.showError(
                context,
                viewModel.errorMessage ?? l10n.networkError,
              );
            }
          },
          laterText: l10n.stepSummaryCancel,
          actionText: l10n.stepSummaryBegin,
          fontSize: 14,
          padding: const EdgeInsets.symmetric(vertical: 16),
        ),
      ],
    );
  }
}
