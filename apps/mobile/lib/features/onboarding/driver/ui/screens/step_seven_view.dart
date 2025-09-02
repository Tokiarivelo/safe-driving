import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/core/theme/app_text_styles.dart';
import 'package:safe_driving/features/onboarding/driver/models/driver_onboarding_step_model.dart';
import 'package:safe_driving/features/onboarding/driver/viewmodels/driver_onboarding_coordinator.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/controls/switches_and_radios.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/basic/primary_button.dart';

class StepSevenView extends StatelessWidget {
  final DriverOnboardingStepModel step;
  final DriverOnboardingCoordinator coordinator;
  final VoidCallback onContinue;
  final VoidCallback? onSkip;

  const StepSevenView({
    super.key,
    required this.step,
    required this.coordinator,
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
            style: AppTextStyles.h1.copyWith(
              fontSize: 24,
              fontWeight: FontWeight.w600,
            ),
          ),
          const SizedBox(height: 16),
          Text(
            step.description!,
            textAlign: TextAlign.center,
            style: AppTextStyles.body16.copyWith(
              color: AppColors.textColor.withAlpha(180),
              height: 1.5,
            ),
          ),
          const SizedBox(height: 32),

          const Spacer(),

          Column(
            children: [
              Row(
                children: [
                  Expanded(
                    child: SwitchesAndRadios.customRadio<String>(
                      title: "Plus tard",
                      value: "Plus tard",
                      groupValue: coordinator.preferencesViewModel.gpsEnabled
                          ? "Autoriser"
                          : "Plus tard",
                      onChanged: (value) =>
                          coordinator.preferencesViewModel.setGpsEnabled(false),
                      titleColor: AppColors.fillButtonBackground,
                      activeColor: AppColors.fillButtonBackground,
                    ),
                  ),
                  Expanded(
                    child: SwitchesAndRadios.customRadio<String>(
                      title: "Autoriser",
                      value: "Autoriser",
                      groupValue: coordinator.preferencesViewModel.gpsEnabled
                          ? "Autoriser"
                          : "Plus tard",
                      onChanged: (value) => coordinator.preferencesViewModel
                          .handleGpsPermission(context),
                      titleColor: AppColors.fillButtonBackground,
                      activeColor: AppColors.fillButtonBackground,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 32),
              PrimaryButton.primaryButton(
                text: "Continuer",
                onPressed: onContinue,
                padding: const EdgeInsets.symmetric(
                  vertical: 16,
                  horizontal: 40,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
