import 'dart:io';
import 'package:flutter/material.dart';
import 'package:safe_driving/core/theme/app_text_styles.dart';
import 'package:safe_driving/features/onboarding/driver/models/driver_onboarding_step_model.dart';
import 'package:safe_driving/features/onboarding/driver/ui/widgets/specialized/upload_widget.dart';
import 'package:safe_driving/features/onboarding/driver/viewmodels/driver_onboarding_coordinator.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/composite/button_rows.dart';

class StepThreeView extends StatelessWidget {
  final DriverOnboardingStepModel step;
  final DriverOnboardingCoordinator coordinator;
  final VoidCallback onContinue;
  final VoidCallback? onSkip;

  const StepThreeView({
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
            step.description ?? '',
            textAlign: TextAlign.center,
            style: AppTextStyles.body16(context).copyWith(
              color: Theme.of(
                context,
              ).colorScheme.onSurface.withValues(alpha: 0.7),
              height: 1.5,
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
                    onPhotosChanged: (List<File> photos) => coordinator
                        .documentUploadViewModel
                        .queuePhotosForUpload(photos, 'carteIdentiteRecto'),
                  ),

                  const SizedBox(height: 16),

                  // Carte d'identité - Verso
                  UploadWidget(
                    title: "Carte d'identité - Verso",
                    description:
                        "Téléchargez la face arrière de votre carte d'identité",
                    buttonText: "Ajouter un fichier",
                    onPhotosChanged: (List<File> photos) => coordinator
                        .documentUploadViewModel
                        .queuePhotosForUpload(photos, 'carteIdentiteVerso'),
                  ),

                  const SizedBox(height: 16),

                  // Permis de conduire
                  UploadWidget(
                    title: "Permis de conduire",
                    description: "Téléchargez votre permis de conduire valide",
                    buttonText: "Ajouter un fichier",
                    onPhotosChanged: (List<File> photos) => coordinator
                        .documentUploadViewModel
                        .queuePhotosForUpload(photos, 'permisConduire'),
                  ),

                  const SizedBox(height: 32),
                ],
              ),
            ),
          ),

          ButtonRows.buttonRow(
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
