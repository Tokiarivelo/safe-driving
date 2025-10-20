part of '../user_step_content_widget.dart';

class _GpsStep extends StatelessWidget {
  final UserOnboardingStepModel stepContent;
  final UserOnboardingViewModel viewModel;

  const _GpsStep({required this.stepContent, required this.viewModel});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(context.l10n.stepGpsTitle, style: AppTextStyles.h1(context)),
        const SizedBox(height: 8),
        Text(
          context.l10n.stepGpsSubtitle,
          style: AppTextStyles.body14(context).copyWith(
            color: Theme.of(
              context,
            ).colorScheme.onSurface.withValues(alpha: 0.75),
          ),
        ),
        const SizedBox(height: 16),
        Row(
          children: [
            Expanded(
              child: SwitchesAndRadios.customRadio<bool>(
                title: context.l10n.stepGpsLater,
                value: false,
                groupValue: viewModel.appState.gpsEnabled,
                onChanged: (value) =>
                    viewModel.updateGps(value!, context, shouldSave: true),
              ),
            ),
            Expanded(
              child: SwitchesAndRadios.customRadio<bool>(
                title: context.l10n.stepGpsEnable,
                value: true,
                groupValue: viewModel.appState.gpsEnabled,
                onChanged: (value) async {
                  await viewModel.updateGps(value!, context, shouldSave: true);
                  if (!context.mounted) return;
                  if (viewModel.appState.gpsEnabled) {
                    SnackbarHelper.showSuccess(
                      context,
                      'Géolocalisation activée avec succès !',
                      duration: const Duration(seconds: 2),
                    );
                  }
                },
              ),
            ),
          ],
        ),
        const SizedBox(height: 8),
        PrimaryButton.primaryButton(
          text: context.l10n.stepPreferencesValidate,
          onPressed: () async {
            await viewModel.saveCurrentPreferences();
            if (!context.mounted) return;
            viewModel.nextStepImmediate();
          },
          fontSize: 14,
          padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 24),
        ),
      ],
    );
  }
}
