import 'package:flutter/material.dart';
import 'package:safe_driving/core/theme/app_text_styles.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/composite/button_rows.dart';
import '../../models/user_onboarding_data.dart';

class StepTwoView extends StatelessWidget {
  final VoidCallback onLaterPressed;
  final VoidCallback onActionPressed;

  const StepTwoView({
    super.key,
    required this.onLaterPressed,
    required this.onActionPressed,
  });

  @override
  Widget build(BuildContext context) {
    final stepContent = UserOnboardingData.getStepContent(0);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Text(stepContent.title, style: AppTextStyles.h2(context)),
        const SizedBox(height: 8),
        Text(
          stepContent.subtitle,
          style: AppTextStyles.body14(context).copyWith(
            color: Theme.of(
              context,
            ).colorScheme.onSurface.withValues(alpha: 0.75),
          ),
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 16),
        ButtonRows.laterAndActionButtons(
          onLaterPressed: onLaterPressed,
          onActionPressed: onActionPressed,
          actionText: stepContent.buttonTitles[1],
          fontSize: 14,
          padding: const EdgeInsets.symmetric(vertical: 16),
        ),
      ],
    );
  }
}
