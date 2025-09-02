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
          stepContent.title,
          style: const TextStyle(
            color: AppColors.buttonWithoutBackGround,
            fontWeight: FontWeight.w800,
            fontSize: 18,
          ),
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 8),
        Text(
          stepContent.subtitle,
          style: TextStyle(
            color: AppColors.buttonWithoutBackGround.withValues(alpha: 0.75),
          ),
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 16),
        ButtonRows.laterAndActionButtons(
          onLaterPressed: viewModel.nextStepImmediate,
          onActionPressed: viewModel.nextStepImmediate,
          laterText: stepContent.buttonTitles[0],
          actionText: stepContent.buttonTitles[1],
          fontSize: 14,
          padding: const EdgeInsets.symmetric(vertical: 16),
        ),
      ],
    );
  }
}

