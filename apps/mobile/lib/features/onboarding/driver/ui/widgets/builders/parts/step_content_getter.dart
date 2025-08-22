import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/features/onboarding/driver/models/driver_onboarding_step_model.dart';
import 'package:safe_driving/features/onboarding/driver/viewmodels/driver_onboarding_coordinator.dart';
import 'content_builder.dart';
import 'button_builder.dart';

class StepContentGetter {
  static Widget buildStepContent(
    DriverOnboardingStepModel step,
    DriverOnboardingCoordinator coordinator,
    VoidCallback nextStep,
    Function(int) navigateToStep,
    BuildContext context,
  ) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          const SizedBox(height: 20),
          Text(
            textAlign: TextAlign.center,
            step.title,
            style: const TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.w600,
              color: AppColors.textColor,
              fontFamily: 'Inder',
            ),
          ),
          const SizedBox(height: 16),
          Text(
            textAlign: TextAlign.center,
            step.subtitle,
            style: TextStyle(
              fontSize: 16,
              color: AppColors.textColor.withAlpha(180),
              height: 1.5,
              fontFamily: 'Inder',
            ),
          ),
          const SizedBox(height: 24),

          // Build additional content based on step type
          if (step.additionalContent != null)
            ContentBuilder.buildAdditionalContent(
              step.additionalContent!,
              step,
              coordinator,
              navigateToStep,
              context,
            ),

          const SizedBox(height: 32),

          // Build buttons
          ButtonBuilder.buildButtons(step, coordinator, nextStep, context),
        ],
      ),
    );
  }
}
