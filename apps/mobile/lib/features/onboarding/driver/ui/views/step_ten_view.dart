import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/features/onboarding/driver/models/driver_onboarding_step_model.dart';
import 'package:safe_driving/features/onboarding/driver/viewmodels/driver_onboarding_viewmodel.dart';
import 'package:safe_driving/features/onboarding/driver/ui/widgets/policy_modal.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/buttons_widget.dart';

class StepTenView extends StatelessWidget {
  final DriverOnboardingStepModel step;
  final DriverOnboardingViewModel viewModel;
  final VoidCallback onContinue;
  final VoidCallback? onSkip;

  const StepTenView({
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

          Column(
            children: [
              ButtonsWidget.elegantAcceptanceButton(
                text: "Conditions Générales d'Utilisation",
                subtitle: "Lire et accepter les CGU",
                isAccepted: viewModel.cguAccepted[0],
                onTap: () {
                  showDialog(
                    context: context,
                    builder: (context) {
                      return PolicyModal(
                        titleContent:
                            "Conditions Générales d'Utilisation (CGU) de Safe Driving",
                        content: viewModel.getCguContent(),
                        onAccept: () {
                          viewModel.setCguAccepted(0, true);
                        },
                      );
                    },
                  );
                },
              ),
              const SizedBox(height: 16),
              ButtonsWidget.elegantAcceptanceButton(
                text: "Politique de Confidentialité",
                subtitle: "Lire et accepter la politique",
                isAccepted: viewModel.cguAccepted[1],
                onTap: () {
                  showDialog(
                    context: context,
                    builder: (context) {
                      return PolicyModal(
                        titleContent: "Politique de Confidentialité",
                        content: viewModel.getPrivacyPolicyContent(),
                        onAccept: () {
                          viewModel.setCguAccepted(1, true);
                        },
                      );
                    },
                  );
                },
              ),
              const SizedBox(height: 32),
              if (viewModel.cguAccepted.every((accepted) => accepted))
                ButtonsWidget.primaryButton(
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
