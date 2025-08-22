import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
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
        Text(
          stepContent.title,
          style: const TextStyle(
            color: AppColors.buttonWithoutBackGround,
            fontWeight: FontWeight.w800,
            fontSize: 18,
          ),
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
