import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/presentation/onboarding/driver/models/driver_onboarding_step_model.dart';
import 'package:safe_driving/presentation/onboarding/driver/viewmodels/driver_onboarding_viewmodel.dart';
import 'package:safe_driving/presentation/onboarding/driver/ui/widgets/camera_interface.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/buttons_widget.dart';

class StepSixView extends StatelessWidget {
  final DriverOnboardingStepModel step;
  final DriverOnboardingViewModel viewModel;
  final VoidCallback onContinue;
  final VoidCallback? onSkip;

  const StepSixView({
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
          const SizedBox(height: 24),

          Expanded(
            child: CameraInterface(
              title: 'Selfie de vérification',
              description:
                  'Positionnez-vous face à la caméra et assurez-vous que votre visage soit bien visible.',
              onPictureTaken: viewModel.onSelfieTaken,
            ),
          ),

          const SizedBox(height: 32),

          ButtonsWidget.buttonRow(
            buttonTitles: ['Plus tard', 'Valider'],
            onPressedList: [onSkip ?? () {}, onContinue],
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            isLastButtonPrimary: true,
            spacing: 8,
            buttonPadding: const EdgeInsets.symmetric(vertical: 16),
            fontSize: 16,
          ),
        ],
      ),
    );
  }
}
