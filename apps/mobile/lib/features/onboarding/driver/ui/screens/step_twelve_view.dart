import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/core/theme/app_text_styles.dart';
import 'package:safe_driving/features/onboarding/driver/models/driver_onboarding_step_model.dart';
import 'package:safe_driving/features/onboarding/driver/viewmodels/driver_onboarding_coordinator.dart';
import 'package:safe_driving/shared/state_management/providers.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/basic/primary_button.dart';
import 'package:safe_driving/l10n/l10n.dart';

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

  String _buildWelcomeTitle(BuildContext context) {
    final user = context.authVM.currentUser;
    final raw = (user?.fullName ?? user?.email ?? '').trim();
    final base = context.l10n.driverCompleteTitle;
    if (raw.isEmpty) return base.trim();
    return '$base$raw';
  }

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
            _buildWelcomeTitle(context),
            textAlign: TextAlign.center,
            style: AppTextStyles.h1(context).copyWith(
              fontSize: 24,
              fontWeight: FontWeight.w600,
              color: AppColors.light,
            ),
          ),
          const SizedBox(height: 16),
          Text(
            step.description!,
            textAlign: TextAlign.center,
            style: AppTextStyles.body16(
              context,
            ).copyWith(color: AppColors.light, height: 1.5),
          ),
          const SizedBox(height: 24),

          // QR Code section
          Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Text(
                context.l10n.driverCompleteQrCodeSubtitle,
                textAlign: TextAlign.center,
                style: AppTextStyles.body16(
                  context,
                ).copyWith(fontWeight: FontWeight.w600, color: AppColors.light),
              ),
              const SizedBox(height: 16),

              // QR code placeholder
              Container(
                width: 150,
                height: 150,
                decoration: BoxDecoration(
                  color: AppColors.inputTextBackground
                      .adapt(context)
                      .withAlpha(100),
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(
                    color: AppColors.fillButtonBackground
                        .adapt(context)
                        .withAlpha(100),
                    width: 2,
                  ),
                ),
                child: Center(
                  child: Icon(
                    Icons.qr_code,
                    size: 80,
                    color: AppColors.fillButtonBackground.adapt(context),
                  ),
                ),
              ),

              const SizedBox(height: 16),
              Text(
                context.l10n.driverCompleteQrCodeInstructions,
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: 14,
                  color: AppColors.light,
                  height: 1.4,
                  fontFamily: 'Inder',
                ),
              ),

              const SizedBox(height: 20),
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: AppColors.backgroundSecondary,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(
                    // Keep border light to ensure visibility in both themes
                    color: AppColors.light,
                    width: 1,
                  ),
                ),
                child: Text(
                  context.l10n.driverCompleteThankYou,
                  textAlign: TextAlign.center,
                  style: AppTextStyles.body14(context).copyWith(
                    fontWeight: FontWeight.w500,
                    height: 1.4,
                    color: AppColors.light,
                  ),
                ),
              ),
            ],
          ),

          const SizedBox(height: 32),

          PrimaryButton.primaryButton(
            text: context.l10n.driverCompleteStart,
            onPressed: onContinue,
            padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 40),
          ),
        ],
      ),
    );
  }
}
