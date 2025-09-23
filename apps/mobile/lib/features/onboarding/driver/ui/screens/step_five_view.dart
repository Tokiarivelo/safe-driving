import 'dart:io';
import 'package:flutter/material.dart';

import 'package:safe_driving/core/theme/app_text_styles.dart';
import 'package:safe_driving/features/onboarding/driver/ui/widgets/specialized/upload_widget.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/composite/button_rows.dart';
import 'package:safe_driving/shared/widgets/customs/snackbar/snackbar_helper.dart';
import 'package:safe_driving/shared/state_management/providers.dart';

class StepFiveView extends StatefulWidget {
  final VoidCallback onNext;
  final VoidCallback onSkip;

  const StepFiveView({super.key, required this.onNext, required this.onSkip});

  @override
  State<StepFiveView> createState() => _StepFiveViewState();
}

class _StepFiveViewState extends State<StepFiveView> {
  bool _hasShownUploadSnack = false;
  int _previousCount = 0;

  void _queuePhotos(
    List<File> photos,
    String storageType,
  ) {
    try {
      context.driverOnboardingVM.documentUploadViewModel.queuePhotosForUpload(
            photos,
            storageType,
          );

      if (!_hasShownUploadSnack && _previousCount == 0 && photos.isNotEmpty && mounted) {
        final count = photos.length;
        SnackbarHelper.showSuccess(
          context,
          '$count photo${count > 1 ? 's' : ''} sélectionnée${count > 1 ? 's' : ''}',
        );
        _hasShownUploadSnack = true;
      }
      _previousCount = photos.length;
    } catch (e) {
      if (mounted) {
        SnackbarHelper.showError(
          context,
          'Erreur lors de la sélection des photos',
        );
      }
    }
  }

  Future<void> _onValidate() async {
    bool ok = true;
    try {
      await context.driverOnboardingVM.documentUploadViewModel.flushPendingUploads();
    } catch (e) {
      ok = false;
      if (mounted) {
        SnackbarHelper.showError(context, 'Échec du téléchargement des documents. Vérifiez votre connexion et réessayez.');
      }
    }
    if (ok && mounted) widget.onNext();
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
            'À propos de votre véhicule',
            textAlign: TextAlign.center,
            style: AppTextStyles.h1(context),
          ),
          const SizedBox(height: 16),
          Text(
            'Ajoutez votre certificat d\'immatriculation, votre attestation d\'assurance et quelques photos du véhicule.',
            textAlign: TextAlign.center,
            style: AppTextStyles.body16(context).copyWith(
              color: Theme.of(
                context,
              ).colorScheme.onSurface.withValues(alpha: 0.7),
              height: 1.5,
            ),
          ),
          const SizedBox(height: 24),

          Expanded(
            child: SingleChildScrollView(
              child: Column(
                children: [
                  UploadWidget(
                    title: 'Certificat d\'immatriculation',
                    description:
                        'Téléchargez votre certificat d\'immatriculation (carte grise)',
                    buttonText: 'Ajouter un fichier',
                    addMorePhotosText: 'Ajouter plus de photos',
                    onPhotosChanged: (photos) => _queuePhotos(
                      photos,
                      'certificatImmatriculation',
                    ),
                  ),
                  const SizedBox(height: 16),

                  UploadWidget(
                    title: 'Attestation d\'assurance',
                    description:
                        'Téléchargez votre attestation d\'assurance valide',
                    buttonText: 'Ajouter un fichier',
                    addMorePhotosText: 'Ajouter plus de photos',
                    onPhotosChanged: (photos) => _queuePhotos(
                      photos,
                      'attestationAssurance',
                    ),
                  ),
                  const SizedBox(height: 16),

                  UploadWidget(
                    title: 'Photos du véhicule',
                    description:
                        'Ajoutez des photos de votre véhicule (extérieur et intérieur)',
                    buttonText: 'Ajouter un fichier',
                    addMorePhotosText: 'Ajouter plus de photos',
                    onPhotosChanged: (photos) => _queuePhotos(
                      photos,
                      'photosVehicule',
                    ),
                  ),
                ],
              ),
            ),
          ),

          const SizedBox(height: 32),
          ButtonRows.buttonRow(
            buttonTitles: ['Plus tard', 'Valider'],
            onPressedList: [widget.onSkip, _onValidate],
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
