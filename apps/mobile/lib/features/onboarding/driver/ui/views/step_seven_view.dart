import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/features/onboarding/driver/models/driver_onboarding_step_model.dart';
import 'package:safe_driving/features/onboarding/driver/viewmodels/driver_onboarding_viewmodel.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/controls/switches_and_radios.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/basic/primary_button.dart';

class StepSevenView extends StatelessWidget {
  final DriverOnboardingStepModel step;
  final DriverOnboardingViewModel viewModel;
  final VoidCallback onContinue;
  final VoidCallback? onSkip;

  const StepSevenView({
    super.key,
    required this.step,
    required this.viewModel,
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
            style: const TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.w600,
              color: AppColors.textColor,
              fontFamily: 'Inder',
            ),
          ),
          const SizedBox(height: 16),
          Text(
            step.description!,
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 16,
              color: AppColors.textColor.withAlpha(180),
              height: 1.5,
              fontFamily: 'Inder',
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
                      groupValue: viewModel.gpsEnabled
                          ? "Autoriser"
                          : "Plus tard",
                      onChanged: (value) => viewModel.setGpsEnabled(false),
                      titleColor: AppColors.fillButtonBackground,
                      activeColor: AppColors.fillButtonBackground,
                    ),
                  ),
                  Expanded(
                    child: SwitchesAndRadios.customRadio<String>(
                      title: "Autoriser",
                      value: "Autoriser",
                      groupValue: viewModel.gpsEnabled
                          ? "Autoriser"
                          : "Plus tard",
                      onChanged: (value) =>
                          viewModel.handleGpsPermission(context),
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
