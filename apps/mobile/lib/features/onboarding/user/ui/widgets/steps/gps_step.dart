part of '../user_step_content_widget.dart';

class _GpsStep extends StatelessWidget {
  final UserOnboardingStepModel stepContent;
  final UserOnboardingViewModel viewModel;

  const _GpsStep({required this.stepContent, required this.viewModel});

  @override
  Widget build(BuildContext context) {
    final radioOptions =
        stepContent.additionalContent?['radioOptions'] ??
        ['Plus tard', 'Activer'];

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
            Expanded(
              child: SwitchesAndRadios.customRadio<bool>(
                title: radioOptions[0],
                value: false,
                groupValue: viewModel.appState.gpsEnabled,
                onChanged: (value) =>
                    viewModel.updateGps(value!, context, shouldSave: false),
              ),
            ),
            Expanded(
              child: SwitchesAndRadios.customRadio<bool>(
                title: radioOptions[1],
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
          text: 'Suivant',
          onPressed: viewModel.nextStepImmediate,
          fontSize: 14,
          padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 24),
        ),
      ],
    );
  }
}
