import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/presentation/onboarding/driver/models/driver_onboarding_step_model.dart';
import 'package:safe_driving/presentation/onboarding/driver/viewmodels/driver_onboarding_viewmodel.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/buttons_widget.dart';
import 'package:safe_driving/presentation/onboarding/driver/ui/widgets/upload_widget.dart';

class StepThreeView extends StatelessWidget {
  final DriverOnboardingStepModel step;
  final DriverOnboardingViewModel viewModel;
  final VoidCallback onContinue;
  final VoidCallback? onSkip;

  const StepThreeView({
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
            step.description ?? '',
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 16,
              color: AppColors.textColor.withAlpha(180),
              height: 1.5,
              fontFamily: 'Inder',
            ),
          ),
          const SizedBox(height: 24),

          // Upload sections
          Expanded(
            child: SingleChildScrollView(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Carte d'identité - Recto
                  UploadWidget(
                    title: "Carte d'identité - Recto",
                    description:
                        "Téléchargez la face avant de votre carte d'identité",
                    buttonText: "Ajouter un fichier",
                    onPhotosChanged: (photos) =>
                        viewModel.handleIdentityRectoPhotos(photos),
                  ),

                  const SizedBox(height: 16),

                  // Carte d'identité - Verso
                  UploadWidget(
                    title: "Carte d'identité - Verso",
                    description:
                        "Téléchargez la face arrière de votre carte d'identité",
                    buttonText: "Ajouter un fichier",
                    onPhotosChanged: (photos) =>
                        viewModel.handleIdentityVersoPhotos(photos),
                  ),

                  const SizedBox(height: 16),

                  // Permis de conduire
                  UploadWidget(
                    title: "Permis de conduire",
                    description: "Téléchargez votre permis de conduire valide",
                    buttonText: "Ajouter un fichier",
                    onPhotosChanged: (photos) =>
                        viewModel.handleDrivingLicensePhotos(photos),
                  ),

                  const SizedBox(height: 32),
                ],
              ),
            ),
          ),

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
