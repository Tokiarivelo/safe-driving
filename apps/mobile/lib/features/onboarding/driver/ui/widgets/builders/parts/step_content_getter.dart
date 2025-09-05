import 'package:flutter/material.dart';
import 'package:safe_driving/core/theme/app_text_styles.dart';
import 'package:safe_driving/features/onboarding/driver/models/driver_onboarding_step_model.dart';
import 'package:safe_driving/features/onboarding/driver/viewmodels/driver_onboarding_coordinator.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/l10n/l10n.dart';
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
          Builder(
            builder: (context) {
              String title = step.title;
              String subtitle = step.subtitle;

              switch (step.stepType) {
                case DriverStepType.welcome:
                  title = context.l10n.driverOnboardingWelcomeTitle;
                  subtitle = context.l10n.driverOnboardingWelcomeSubtitle;
                  break;
                case DriverStepType.personalInfo:
                  title = context.l10n.driverDetailsTitle;
                  subtitle = context.l10n.driverDetailsSubtitle;
                  break;
                case DriverStepType.vehicleInfo:
                  title = context.l10n.driverVehicleInfoTitle;
                  subtitle = context.l10n.driverVehicleInfoSubtitle;
                  break;
                case DriverStepType.documents:
                  if (step.additionalContent?.containsKey('carteIdentité') == true) {
                    title = context.l10n.driverIdentityVerificationTitle;
                    subtitle = context.l10n.driverIdentityVerificationSubtitle;
                  } else if (step.additionalContent?.containsKey('documents') == true) {
                    title = context.l10n.driverVehicleDocumentsTitle;
                    subtitle = context.l10n.driverVehicleDocumentsSubtitle;
                  }
                  break;
                case DriverStepType.photos:
                  title = context.l10n.driverVehicleDocumentsTitle;
                  subtitle = context.l10n.driverVehicleDocumentsSubtitle;
                  break;
                case DriverStepType.selfie:
                  title = context.l10n.driverIdentityPhotoTitle;
                  subtitle = context.l10n.driverIdentityPhotoSubtitle;
                  break;
                case DriverStepType.gps:
                  title = context.l10n.driverLocationTitle;
                  subtitle = context.l10n.driverLocationSubtitle;
                  break;
                case DriverStepType.notifications:
                  title = context.l10n.driverNotificationTitle;
                  subtitle = context.l10n.driverNotificationSubtitle;
                  break;
                case DriverStepType.preferences:
                  title = context.l10n.stepPreferencesTheme; // overridden by block below
                  title = context.l10n.driverCustomizeTitle;
                  subtitle = context.l10n.driverCustomizeSubtitle;
                  break;
                case DriverStepType.legal:
                  title = context.l10n.driverTermsTitle;
                  subtitle = context.l10n.driverTermsSubtitle;
                  break;
                case DriverStepType.summary:
                  title = context.l10n.driverSummaryTitle;
                  subtitle = context.l10n.driverSummarySubtitle;
                  break;
                case DriverStepType.completion:
                  title = context.l10n.driverCompleteTitle;
                  subtitle = context.l10n.driverCompleteSubtitle;
                  break;
              }

              return Column(
                children: [
                  Text(
                    title,
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
                    subtitle,
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
                ],
              );
            },
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
