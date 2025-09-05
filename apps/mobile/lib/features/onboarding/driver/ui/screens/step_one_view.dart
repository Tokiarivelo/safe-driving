import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/core/theme/app_text_styles.dart';
import 'package:safe_driving/features/onboarding/driver/models/driver_onboarding_step_model.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/composite/button_rows.dart';

class StepOneView extends StatelessWidget {
  final DriverOnboardingStepModel step;
  final VoidCallback onContinue;
  final VoidCallback? onSkip;

  const StepOneView({
    super.key,
    required this.step,
    required this.onContinue,
    this.onSkip,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          const SizedBox(height: 20),
          Text(
            step.title,
            textAlign: TextAlign.center,
            style: AppTextStyles.h1(context).copyWith(
              fontSize: 24,
              fontWeight: FontWeight.w600,
            ),
          ),
          const SizedBox(height: 16),
          Text(
            step.description ?? '',
            textAlign: TextAlign.center,
            style: AppTextStyles.body16(context).copyWith(
              color: AppColors.textColor.adapt(context).withAlpha(180),
              height: 1.5,
            ),
          ),
          const SizedBox(height: 32),
          const Spacer(),
          ButtonRows.buttonRow(
            buttonTitles: step.buttonTitles,
            onPressedList: [onSkip ?? () {}, onContinue],
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            isLastButtonPrimary: true,
            spacing: 8,
            buttonPadding: const EdgeInsets.symmetric(vertical: 16),
            fontSize: 16,
          ),
        ],
      ),
    );
  }
}
