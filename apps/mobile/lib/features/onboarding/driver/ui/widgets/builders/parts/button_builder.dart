import 'package:flutter/material.dart';
import 'package:safe_driving/features/onboarding/driver/models/driver_onboarding_data.dart';
import 'package:safe_driving/features/onboarding/driver/models/driver_onboarding_step_model.dart';
import 'package:safe_driving/features/onboarding/driver/ui/widgets/modals/policy_modal.dart';
import 'package:safe_driving/features/onboarding/driver/viewmodels/driver_onboarding_coordinator.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/buttons_widget.dart';
import 'preferences_builder.dart';

class ButtonBuilder {
  static Widget buildButtons(
    DriverOnboardingStepModel step,
    DriverOnboardingCoordinator coordinator,
    VoidCallback nextStep,
    BuildContext context,
  ) {
    if (step.title == "Partagez votre position") {
      return PreferencesBuilder.buildGpsButtons(coordinator, nextStep, context);
    }

    if (step.title == "Un dernier point avant de démarrer") {
      if (coordinator.legalViewModel.allCguAccepted) {
        return PrimaryButton.primaryButton(
          text: "Continuer",
          onPressed: nextStep,
          padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 40),
        );
      }
      return const SizedBox.shrink();
    }

    if (step.buttonTitles.isNotEmpty) {
      return ButtonRows.buttonRow(
        buttonTitles: step.buttonTitles,
        onPressedList: step.buttonTitles.map((buttonTitle) {
          final isMainButton =
              step.buttonTitles.indexOf(buttonTitle) ==
              step.buttonTitles.length - 1;
          final isPlusTard = buttonTitle.toLowerCase().contains('plus tard');

          return () {
            if (isMainButton && !isPlusTard) {
              nextStep();
            } else {
              nextStep();
            }
          };
        }).toList(),
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
          text: "Conditions Générales d'Utilisation",
          subtitle: "Lire et accepter les CGU",
          isAccepted: coordinator.legalViewModel.cguAccepted[0],
          onTap: () {
            showDialog(
              context: context,
              builder: (context) {
                final cguStep = DriverOnboardingData.getStep(12); // CGU step
                return PolicyModal(
                  titleContent: cguStep.title,
                  content: cguStep.additionalContent?["content"] ?? "",
                  onAccept: () {
                    coordinator.legalViewModel.setCguAccepted(0, true);
                  },
                );
              },
            );
          },
        ),
        const SizedBox(height: 16),
        ElegantAcceptanceButton.elegantAcceptanceButton(
          text: "Politique de Confidentialité",
          subtitle: "Lire et accepter la politique",
          isAccepted: coordinator.legalViewModel.cguAccepted[1],
          onTap: () {
            showDialog(
              context: context,
              builder: (context) {
                final privacyStep = DriverOnboardingData.getStep(
                  13,
                ); // Privacy step
                return PolicyModal(
                  titleContent: privacyStep.title,
                  content: privacyStep.additionalContent?["content"] ?? "",
                  onAccept: () {
                    coordinator.legalViewModel.setCguAccepted(1, true);
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
