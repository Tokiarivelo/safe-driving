import 'package:flutter/material.dart';
import 'package:safe_driving/core/theme/app_text_styles.dart';
import 'package:safe_driving/features/onboarding/driver/models/driver_onboarding_step_model.dart';
import 'package:safe_driving/features/onboarding/driver/viewmodels/driver_onboarding_coordinator.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
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
    final bool forceLightHeader =
        step.stepType == DriverStepType.summary ||
        step.stepType == DriverStepType.completion;

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
            style: AppTextStyles.h1(
              context,
            ).copyWith(
              fontSize: 24,
              fontWeight: FontWeight.w600,
              color: forceLightHeader
                  ? (Theme.of(context).brightness == Brightness.dark
                      ? AppColors.light
                      : Theme.of(context).colorScheme.onSurface)
                  : null,
            ),
          ),
          const SizedBox(height: 16),
          Text(
            step.subtitle,
            textAlign: TextAlign.center,
            style: AppTextStyles.body16(context).copyWith(
              color: forceLightHeader
                  ? (Theme.of(context).brightness == Brightness.dark
                      ? AppColors.light
                      : Theme.of(context).colorScheme.onSurface.withValues(alpha: 0.7))
                  : Theme.of(context).colorScheme.onSurface.withValues(alpha: 0.7),
              height: 1.5,
            ),
          ),
          const SizedBox(height: 24),

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
