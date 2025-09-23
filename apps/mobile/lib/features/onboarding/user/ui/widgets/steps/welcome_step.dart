part of '../user_step_content_widget.dart';

class _WelcomeStep extends StatelessWidget {
  final UserOnboardingStepModel stepContent;
  final UserOnboardingViewModel viewModel;

  const _WelcomeStep({required this.stepContent, required this.viewModel});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Text(
          context.l10n.stepWelcomeTitle,
          style: AppTextStyles.h2(context),
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 8),
        Text(
          context.l10n.stepWelcomeSubtitle,
          style: AppTextStyles.body14(context).copyWith(
            color: Theme.of(context).colorScheme.onSurface.withValues(alpha: 0.75),
          ),
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 16),
        ButtonRows.laterAndActionButtons(
          onLaterPressed: viewModel.nextStepImmediate,
          onActionPressed: () async {
            await viewModel.saveCurrentPreferences();
            if (!context.mounted) return;
            viewModel.nextStepImmediate();
          },
          laterText: context.l10n.stepWelcomeLater,
          actionText: context.l10n.stepWelcomeStart,
          fontSize: 14,
          padding: const EdgeInsets.symmetric(vertical: 16),
        ),
      ],
    );
  }
}
