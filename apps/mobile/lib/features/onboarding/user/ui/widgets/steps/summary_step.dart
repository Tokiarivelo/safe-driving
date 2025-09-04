part of '../user_step_content_widget.dart';

class _SummaryStep extends StatelessWidget {
  final UserOnboardingStepModel stepContent;
  final UserOnboardingViewModel viewModel;

  const _SummaryStep({required this.stepContent, required this.viewModel});

  @override
  Widget build(BuildContext context) {
    final summaryLabels =
        (stepContent.additionalContent?['summaryLabels'] as Map?)
            ?.cast<String, String>() ??
        const {
          'gps': 'GPS',
          'notifications': 'Notifications',
          'theme': 'Thème',
          'transport': 'Transport(s)',
          'language': 'Langue',
          'noTransport': 'Aucun transport sélectionné',
        };

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(stepContent.title, style: AppTextStyles.h1(context)),
        const SizedBox(height: 8),
        Text(
          stepContent.subtitle,
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
                summaryLabels['gps']!,
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
                summaryLabels['notifications']!,
                style: TextStyle(color: Theme.of(context).colorScheme.onSurface),
              ),
            ),
          ],
        ),
        const SizedBox(height: 16),
        Builder(
          builder: (context) => Text(
            '${summaryLabels['theme']} : ${viewModel.appState.selectedTheme}',
            style: TextStyle(color: Theme.of(context).colorScheme.onSurface),
          ),
        ),
        const SizedBox(height: 8),
        Builder(
          builder: (context) => Text(
            '${summaryLabels['transport']} :',
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
                  summaryLabels['noTransport']!,
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
            '${summaryLabels['language']} :',
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
                'Configuration terminée avec succès !',
                duration: const Duration(seconds: 2),
              );
            } else {
              SnackbarHelper.showError(
                context,
                viewModel.errorMessage ?? 'Erreur lors de la finalisation',
              );
            }
          },
          laterText: stepContent.buttonTitles[0],
          actionText: stepContent.buttonTitles[1],
          fontSize: 14,
          padding: const EdgeInsets.symmetric(vertical: 16),
        ),
      ],
    );
  }
}
