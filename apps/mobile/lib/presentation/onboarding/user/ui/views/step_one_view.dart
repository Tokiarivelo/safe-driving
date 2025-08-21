import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/buttons_widget.dart';
import '../../utils/user_onboarding_data.dart';

class StepOneView extends StatelessWidget {
  final VoidCallback onUserPressed;
  final VoidCallback onDriverPressed;

  const StepOneView({
    super.key,
    required this.onUserPressed,
    required this.onDriverPressed,
  });

  @override
  Widget build(BuildContext context) {
    final stepContent = UserOnboardingData.getStepContent(0);
    
    return Column(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          stepContent.title,
          style: const TextStyle(
            color: AppColors.buttonWithoutBackGround,
            fontSize: 20,
            fontWeight: FontWeight.w400,
          ),
        ),
        const SizedBox(height: 20),
        ButtonsWidget.roleChoiceButtons(
          onUserPressed: onUserPressed,
          onDriverPressed: onDriverPressed,
        ),
      ],
    );
  }
}
