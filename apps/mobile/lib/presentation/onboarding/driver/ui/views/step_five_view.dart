import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/buttons_widget.dart';
import 'package:safe_driving/presentation/onboarding/driver/ui/widgets/upload_widget.dart';
import 'package:safe_driving/presentation/onboarding/driver/services/storage_service.dart';
import 'package:safe_driving/shared/widgets/customs/snackbar/snackbar_helper.dart';

class StepFiveView extends StatefulWidget {
  final VoidCallback onNext;
  final VoidCallback onSkip;

  const StepFiveView({super.key, required this.onNext, required this.onSkip});

  @override
  State<StepFiveView> createState() => _StepFiveViewState();
}

class _StepFiveViewState extends State<StepFiveView> {
  final StorageService _storageService = StorageService();

  Future<void> _handlePhotosChanged(
    List<dynamic> photos,
    String storageType,
  ) async {
    try {
      await _storageService.storePhotos(photos, storageType);
      if (mounted) {
        final typeLabel = _getTypeLabel(storageType);
        SnackbarHelper.showSuccess(
          context,
          '${photos.length} photo${photos.length > 1 ? 's' : ''} ajoutée${photos.length > 1 ? 's' : ''} pour $typeLabel',
        );
      }
    } catch (e) {
      if (mounted) {
        SnackbarHelper.showError(context, 'Erreur lors de l\'ajout des photos');
      }
    }
  }

  String _getTypeLabel(String storageType) {
    switch (storageType) {
      case StorageService.certificatImmatriculationType:
        return 'le certificat d\'immatriculation';
      case StorageService.attestationAssuranceType:
        return 'l\'attestation d\'assurance';
      case StorageService.photosVehiculeType:
        return 'les photos du véhicule';
      default:
        return 'le document';
    }
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
          const Text(
            'À propos de votre véhicule',
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.w600,
              color: AppColors.textColor,
              fontFamily: 'Inder',
            ),
          ),
          const SizedBox(height: 16),
          Text(
            'Ajoutez votre certificat d\'immatriculation, votre attestation d\'assurance et quelques photos du véhicule.',
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
            child: SingleChildScrollView(
              child: Column(
                children: [
                  UploadWidget(
                    title: 'Certificat d\'immatriculation',
                    description:
                        'Téléchargez votre certificat d\'immatriculation (carte grise)',
                    buttonText: 'Ajouter un fichier',
                    addMorePhotosText: 'Ajouter plus de photos',
                    onPhotosChanged: (photos) => _handlePhotosChanged(
                      photos,
                      StorageService.certificatImmatriculationType,
                    ),
                  ),
                  const SizedBox(height: 16),

                  UploadWidget(
                    title: 'Attestation d\'assurance',
                    description:
                        'Téléchargez votre attestation d\'assurance valide',
                    buttonText: 'Ajouter un fichier',
                    addMorePhotosText: 'Ajouter plus de photos',
                    onPhotosChanged: (photos) => _handlePhotosChanged(
                      photos,
                      StorageService.attestationAssuranceType,
                    ),
                  ),
                  const SizedBox(height: 16),

                  UploadWidget(
                    title: 'Photos du véhicule',
                    description:
                        'Ajoutez des photos de votre véhicule (extérieur et intérieur)',
                    buttonText: 'Ajouter un fichier',
                    addMorePhotosText: 'Ajouter plus de photos',
                    onPhotosChanged: (photos) => _handlePhotosChanged(
                      photos,
                      StorageService.photosVehiculeType,
                    ),
                  ),
                ],
              ),
            ),
          ),

          const SizedBox(height: 32),
          ButtonsWidget.buttonRow(
            buttonTitles: ['Plus tard', 'Valider'],
            onPressedList: [widget.onSkip, widget.onNext],
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
