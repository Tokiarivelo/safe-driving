import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/core/theme/app_text_styles.dart';
import 'package:safe_driving/features/onboarding/driver/models/driver_onboarding_step_model.dart';
import 'package:safe_driving/features/onboarding/driver/viewmodels/driver_onboarding_coordinator.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/basic/primary_button.dart';

class StepTwelveView extends StatelessWidget {
  final DriverOnboardingStepModel step;
  final DriverOnboardingCoordinator coordinator;
  final VoidCallback onContinue;
  final VoidCallback? onSkip;

  const StepTwelveView({
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
            '${step.title} ${coordinator.getFieldValue('Prénom et Nom').isNotEmpty && coordinator.getFieldValue('Prénom et Nom') != 'Non renseigné' ? coordinator.getFieldValue('Prénom et Nom') : 'Conducteur'}',
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
          const SizedBox(height: 24),

          // QR Code section
          Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Text(
                "Votre QR code personnel a été généré :",
                textAlign: TextAlign.center,
                style: AppTextStyles.body16.copyWith(
                  fontWeight: FontWeight.w600,
                ),
              ),
              const SizedBox(height: 16),

              // QR code placeholder
              Container(
                width: 150,
                height: 150,
                decoration: BoxDecoration(
                  color: AppColors.inputTextBackground.withAlpha(100),
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(
                    color: AppColors.fillButtonBackground.withAlpha(100),
                    width: 2,
                  ),
                ),
                child: const Center(
                  child: Icon(
                    Icons.qr_code,
                    size: 80,
                    color: AppColors.fillButtonBackground,
                  ),
                ),
              ),

              const SizedBox(height: 16),
              Text(
                "Il permettra à vos passagers de vous identifier rapidement et en toute sécurité. Vous pouvez à tout moment consulter ou télécharger ce QR code dans le menu Mon compte > Mon QR code.",
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: 14,
                  color: AppColors.textColor.withAlpha(180),
                  height: 1.4,
                  fontFamily: 'Inder',
                ),
              ),

              const SizedBox(height: 20),
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: AppColors.fillButtonBackground.withAlpha(20),
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(
                    color: AppColors.fillButtonBackground.withAlpha(100),
                    width: 1,
                  ),
                ),
                child: Text(
                  "Merci de faire partie de la communauté Safe Driving. Nous vous souhaitons de bons trajets en toute sécurité !",
                  textAlign: TextAlign.center,
                  style: AppTextStyles.body14.copyWith(
                    fontWeight: FontWeight.w500,
                    height: 1.4,
                  ),
                ),
              ),
            ],
          ),

          const SizedBox(height: 32),

          PrimaryButton.primaryButton(
            text: "C'est parti",
            onPressed: onContinue,
            padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 40),
          ),
        ],
      ),
    );
  }
}
