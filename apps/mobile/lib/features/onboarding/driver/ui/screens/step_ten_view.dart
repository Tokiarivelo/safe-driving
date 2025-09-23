import 'package:flutter/material.dart';
import 'package:safe_driving/core/theme/app_text_styles.dart';
import 'package:safe_driving/features/onboarding/driver/models/driver_onboarding_step_model.dart';
import 'package:safe_driving/features/onboarding/driver/ui/widgets/modals/policy_modal.dart';
import 'package:safe_driving/features/onboarding/driver/viewmodels/driver_onboarding_coordinator.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/specialized/elegant_acceptance_button.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/basic/primary_button.dart';
import 'package:safe_driving/l10n/l10n.dart';

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
            style: AppTextStyles.h1(
              context,
            ).copyWith(fontSize: 24, fontWeight: FontWeight.w600),
          ),
          const SizedBox(height: 16),
          Text(
            step.description!,
            textAlign: TextAlign.center,
            style: AppTextStyles.body16(context).copyWith(
              color: Theme.of(
                context,
              ).colorScheme.onSurface.withValues(alpha: 0.7),
              height: 1.5,
            ),
          ),
          const SizedBox(height: 32),

          Column(
            children: [
              ElegantAcceptanceButton.elegantAcceptanceButton(
                text: context.l10n.driverCguTitle,
                subtitle: context.l10n.readAndAcceptTerms,
                isAccepted: coordinator.legalViewModel.cguAccepted[0],
                onTap: () {
                  showDialog(
                    context: context,
                    builder: (context) {
                      return PolicyModal(
                        titleContent: context.l10n.driverCguTitle,
                        content: coordinator.legalViewModel.getCguContent(
                          context,
                        ),
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
                text: context.l10n.driverPrivacyTitle,
                subtitle: context.l10n.readAndAcceptPolicy,
                isAccepted: coordinator.legalViewModel.cguAccepted[1],
                onTap: () {
                  showDialog(
                    context: context,
                    builder: (context) {
                      return PolicyModal(
                        titleContent: context.l10n.driverPrivacyTitle,
                        content: coordinator.legalViewModel
                            .getPrivacyPolicyContent(context),
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
                  text: context.l10n.next,
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
