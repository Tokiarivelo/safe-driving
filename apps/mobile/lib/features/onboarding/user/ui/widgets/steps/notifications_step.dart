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
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(context.l10n.stepNotificationsTitle, style: AppTextStyles.h1(context)),
        const SizedBox(height: 8),
        Text(
          context.l10n.stepNotificationsSubtitle,
          style: AppTextStyles.body14(context).copyWith(
            color: Theme.of(context).colorScheme.onSurface.withValues(alpha: 0.75),
          ),
        ),
        const SizedBox(height: 16),
        Row(
          children: [
            Expanded(
              child: SwitchesAndRadios.customRadio<bool>(
                title: context.l10n.stepNotificationsLater,
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
                title: context.l10n.stepNotificationsEnable,
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
          text: context.l10n.next,
          onPressed: viewModel.nextStepImmediate,
          fontSize: 14,
          padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 24),
        ),
      ],
    );
  }
}
