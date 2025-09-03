import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/core/theme/app_text_styles.dart';
import 'package:safe_driving/features/onboarding/driver/models/driver_onboarding_step_model.dart';
import 'package:safe_driving/features/onboarding/driver/ui/widgets/camera/selfie_camera.dart';
import 'package:safe_driving/features/onboarding/driver/viewmodels/driver_onboarding_coordinator.dart';

class StepSixView extends StatelessWidget {
  final DriverOnboardingStepModel step;
  final DriverOnboardingCoordinator coordinator;
  final VoidCallback onContinue;
  final VoidCallback? onSkip;

  const StepSixView({
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
          const SizedBox(height: 12),
          Text(
            step.title,
            textAlign: TextAlign.center,
            style: AppTextStyles.h1(context).copyWith(
              fontSize: 22,
              fontWeight: FontWeight.w600,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            step.description ?? '',
            maxLines: 2,
            overflow: TextOverflow.ellipsis,
            textAlign: TextAlign.center,
            style: AppTextStyles.body14(context).copyWith(
              color: AppColors.textColor.withAlpha(180),
              height: 1.4,
            ),
          ),
          const SizedBox(height: 12),

          Expanded(
            child: SelfieCamera(
              instruction:
                  'Positionnez-vous face à la caméra et assurez-vous que votre visage soit bien visible.',
              onPhotoTaken: (imagePath) async {
                await coordinator.documentUploadViewModel.onSelfieTaken(
                  imagePath,
                );
                onContinue();
              },
              showInstructions: false,
            ),
          ),

          const SizedBox(height: 16),
        ],
      ),
    );
  }
}
