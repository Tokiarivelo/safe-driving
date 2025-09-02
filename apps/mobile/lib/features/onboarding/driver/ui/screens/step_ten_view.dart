import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/core/theme/app_text_styles.dart';
import 'package:safe_driving/features/onboarding/driver/models/driver_onboarding_step_model.dart';
import 'package:safe_driving/features/onboarding/driver/ui/widgets/modals/policy_modal.dart';
import 'package:safe_driving/features/onboarding/driver/viewmodels/driver_onboarding_coordinator.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/specialized/elegant_acceptance_button.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/basic/primary_button.dart';

class StepTenView extends StatelessWidget {
  final DriverOnboardingStepModel step;
  final DriverOnboardingCoordinator coordinator;
  final VoidCallback onContinue;
  final VoidCallback? onSkip;

  const StepTenView({
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

          Column(
            children: [
              ElegantAcceptanceButton.elegantAcceptanceButton(
                text: "Conditions Générales d'Utilisation",
                subtitle: "Lire et accepter les CGU",
                isAccepted: coordinator.legalViewModel.cguAccepted[0],
                onTap: () {
                  showDialog(
                    context: context,
                    builder: (context) {
                      return PolicyModal(
                        titleContent: coordinator.legalViewModel.getCguTitle(),
                        content: coordinator.legalViewModel.getCguContent(),
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
                      return PolicyModal(
                        titleContent: coordinator.legalViewModel
                            .getPrivacyPolicyTitle(),
                        content: coordinator.legalViewModel
                            .getPrivacyPolicyContent(),
                        onAccept: () {
                          coordinator.legalViewModel.setCguAccepted(1, true);
                        },
                      );
                    },
                  );
                },
              ),
              const SizedBox(height: 32),
              if (coordinator.legalViewModel.cguAccepted.every(
                (accepted) => accepted,
              ))
                PrimaryButton.nextButton(
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
