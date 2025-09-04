part of '../user_step_content_widget.dart';

class _NotificationsStep extends StatelessWidget {
  final UserOnboardingStepModel stepContent;
  final UserOnboardingViewModel viewModel;

  const _NotificationsStep({
    required this.stepContent,
    required this.viewModel,
  });

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
                groupValue: viewModel.appState.notifEnabled,
                onChanged: (value) => viewModel.updateNotifications(
                  value!,
                  context,
                  shouldSave: false,
                ),
              ),
            ),
            Expanded(
              child: SwitchesAndRadios.customRadio<bool>(
                title: radioOptions[1],
                value: true,
                groupValue: viewModel.appState.notifEnabled,
                onChanged: (value) => viewModel.updateNotifications(
                  value!,
                  context,
                  shouldSave: true,
                ),
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
