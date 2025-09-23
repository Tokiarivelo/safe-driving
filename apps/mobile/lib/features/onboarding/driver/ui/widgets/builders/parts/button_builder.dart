import 'package:flutter/material.dart';
import 'package:safe_driving/features/onboarding/driver/models/driver_onboarding_step_model.dart';
import 'package:safe_driving/features/onboarding/driver/ui/widgets/modals/policy_modal.dart';
import 'package:safe_driving/features/onboarding/driver/viewmodels/driver_onboarding_coordinator.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/buttons_widget.dart';
import 'package:safe_driving/l10n/l10n.dart';
import 'preferences_builder.dart';
import 'package:safe_driving/app/routes.dart';

class ButtonBuilder {
  static Widget buildButtons(
    DriverOnboardingStepModel step,
    DriverOnboardingCoordinator coordinator,
    VoidCallback nextStep,
    BuildContext context,
  ) {
    if (step.stepType == DriverStepType.gps) {
      return PreferencesBuilder.buildGpsButtons(coordinator, nextStep, context);
    }

    if (step.stepType == DriverStepType.completion) {
      return PrimaryButton.primaryButton(
        text: context.l10n.driverCompleteStart,
        onPressed: () {
          Navigator.pushReplacementNamed(context, AppRoutes.home);
        },
        padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 40),
      );
    }

    if (step.stepType == DriverStepType.legal) {
      if (coordinator.legalViewModel.allCguAccepted) {
        return PrimaryButton.primaryButton(
          text: context.l10n.next,
          onPressed: () {
      
            coordinator.nextStep().whenComplete(nextStep);
          },
          padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 40),
        );
      }
      return const SizedBox.shrink();
    }

    if (step.buttonTitles.isNotEmpty) {
      List<String> usedTitles;
      switch (step.stepType) {
        case DriverStepType.welcome:
          usedTitles = [context.l10n.driverOnboardingLater, context.l10n.driverOnboardingStart];
          break;
        case DriverStepType.personalInfo:
        case DriverStepType.vehicleInfo:
        case DriverStepType.documents:
        case DriverStepType.photos:
        case DriverStepType.selfie:
          usedTitles = [context.l10n.driverOnboardingLater, context.l10n.driverDetailsValidate];
          break;
        case DriverStepType.notifications:
          usedTitles = [context.l10n.driverOnboardingLater, context.l10n.stepPreferencesValidate];
          break;
        case DriverStepType.preferences:
          usedTitles = [context.l10n.driverOnboardingLater, context.l10n.stepPreferencesValidate];
          break;
        case DriverStepType.summary:
          usedTitles = [context.l10n.driverSummaryValidate];
          break;
        case DriverStepType.completion:
          usedTitles = [context.l10n.driverCompleteStart];
          break;
        case DriverStepType.gps:
          usedTitles = step.buttonTitles;
          break;
        case DriverStepType.legal:
          usedTitles = step.buttonTitles;
          break;
      }

      // Build onPressed handlers: last button triggers backend save via coordinator.nextStep()
      final List<VoidCallback> handlers = [];
      for (int i = 0; i < usedTitles.length; i++) {
        final isPrimary = i == usedTitles.length - 1;
        if (isPrimary) {
          handlers.add(() {
            // Trigger backend save then navigate
            coordinator.nextStep().whenComplete(nextStep);
          });
        } else {
          handlers.add(() {
            nextStep();
          });
        }
      }

      return ButtonRows.buttonRow(
        buttonTitles: usedTitles,
        onPressedList: handlers,
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        isLastButtonPrimary: true,
        spacing: 8,
        buttonPadding: const EdgeInsets.symmetric(vertical: 16),
        fontSize: 16,
      );
    }

    return const SizedBox.shrink();
  }

  static Widget buildLegalCheckboxes(
    List<String> checkboxOptions,
    DriverOnboardingCoordinator coordinator,
    BuildContext context,
  ) {
    return Column(
      children: [
        ElegantAcceptanceButton.elegantAcceptanceButton(
          text: context.l10n.driverCguTitle,
          subtitle: context.l10n.driverTermsSubtitle,
          isAccepted: coordinator.legalViewModel.cguAccepted[0],
          onTap: () {
            showDialog(
              context: context,
              builder: (context) {
                return PolicyModal(
                  titleContent: context.l10n.driverCguTitle,
                  content: coordinator.legalViewModel.getCguContent(context),
                  onAccept: () {
                    coordinator.acceptLegal(0);
                  },
                );
              },
            );
          },
        ),
        const SizedBox(height: 16),
        ElegantAcceptanceButton.elegantAcceptanceButton(
          text: context.l10n.driverPrivacyTitle,
          subtitle: context.l10n.driverTermsSubtitle,
          isAccepted: coordinator.legalViewModel.cguAccepted[1],
          onTap: () {
            showDialog(
              context: context,
              builder: (context) {
                return PolicyModal(
                  titleContent: context.l10n.driverPrivacyTitle,
                  content: coordinator.legalViewModel.getPrivacyPolicyContent(context),
                  onAccept: () {
                    coordinator.acceptLegal(1);
                  },
                );
              },
            );
          },
        ),
      ],
    );
  }
}
