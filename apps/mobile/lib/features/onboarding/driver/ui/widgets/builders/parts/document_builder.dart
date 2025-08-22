import 'dart:io';
import 'package:flutter/material.dart';
import 'package:safe_driving/features/onboarding/driver/ui/widgets/specialized/upload_widget.dart';
import 'package:safe_driving/features/onboarding/driver/viewmodels/driver_onboarding_coordinator.dart';
import 'package:safe_driving/shared/widgets/customs/snackbar/snackbar_helper.dart';

class DocumentBuilder {
  static Widget buildIdentityDocuments(
    Map<String, dynamic> carteIdentiteData,
    DriverOnboardingCoordinator coordinator,
    BuildContext context,
  ) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (carteIdentiteData.containsKey('rectoID'))
          buildUploadSection(
            carteIdentiteData['rectoID'] as Map<String, dynamic>,
            coordinator,
            context,
          ),
        const SizedBox(height: 16),
        if (carteIdentiteData.containsKey('versoID'))
          buildUploadSection(
            carteIdentiteData['versoID'] as Map<String, dynamic>,
            coordinator,
            context,
          ),
        const SizedBox(height: 16),
        if (carteIdentiteData.containsKey('permisConduire'))
          buildUploadSection(
            carteIdentiteData['permisConduire'] as Map<String, dynamic>,
            coordinator,
            context,
          ),
      ],
    );
  }

  static Widget buildVehicleDocuments(
    Map<String, dynamic> documentsData,
    DriverOnboardingCoordinator coordinator,
    BuildContext context,
  ) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (documentsData.containsKey('certificatImmatriculation'))
          buildDocumentSection(
            documentsData['certificatImmatriculation'] as Map<String, dynamic>,
            'Certificat d\'immatriculation',
            coordinator,
            context,
          ),
        const SizedBox(height: 16),
        if (documentsData.containsKey('attestationAssurance'))
          buildDocumentSection(
            documentsData['attestationAssurance'] as Map<String, dynamic>,
            'Attestation d\'assurance',
            coordinator,
            context,
          ),
        const SizedBox(height: 16),
        if (documentsData.containsKey('photosVehicule'))
          buildDocumentSection(
            documentsData['photosVehicule'] as Map<String, dynamic>,
            'Photos du véhicule',
            coordinator,
            context,
          ),
      ],
    );
  }

  static Widget buildUploadSection(
    Map<String, dynamic> sectionData,
    DriverOnboardingCoordinator coordinator,
    BuildContext context,
  ) {
    final title = sectionData['title'] as String? ?? '';
    final textCenter = sectionData['textCenter'] as String?;
    final bouton = sectionData['bouton'] as String?;

    return UploadWidget(
      title: title,
      description: textCenter!,
      buttonText: bouton!,
      onPhotosChanged: (photos) async {
        String storageType;
        if (title.contains('Recto')) {
          storageType = 'carteIdentiteRecto';
        } else if (title.contains('Verso')) {
          storageType = 'carteIdentiteVerso';
        } else if (title.contains('Permis')) {
          storageType = 'permisConduire';
        } else {
          storageType = 'unknown';
        }

        await coordinator.documentUploadViewModel.uploadPhotos(
          photos.cast<File>(),
          storageType,
        );

        if (context.mounted) {
          SnackbarHelper.showSuccess(
            context,
            '${photos.length} photo${photos.length > 1 ? 's' : ''} sélectionnée${photos.length > 1 ? 's' : ''} pour $title',
          );
        }
      },
    );
  }

  static Widget buildDocumentSection(
    Map<String, dynamic> documentData,
    String defaultTitle,
    DriverOnboardingCoordinator coordinator,
    BuildContext context,
  ) {
    final uploadZone = documentData['uploadZone'] as Map<String, dynamic>?;
    final ajoutPhoto = documentData['ajoutPhoto'] as String?;

    if (uploadZone != null) {
      final textCenter = uploadZone['textCenter'] as String?;
      final bouton = uploadZone['bouton'] as String?;

      return UploadWidget(
        title: defaultTitle,
        description: textCenter!,
        buttonText: bouton!,
        addMorePhotosText: ajoutPhoto,
        onPhotosChanged: (photos) async {
          String storageType;
          if (defaultTitle.contains('Certificat')) {
            storageType = 'certificatImmatriculation';
          } else if (defaultTitle.contains('Attestation')) {
            storageType = 'attestationAssurance';
          } else if (defaultTitle.contains('Photos')) {
            storageType = 'photosVehicule';
          } else {
            storageType = 'unknown';
          }

          await coordinator.documentUploadViewModel.uploadPhotos(
            photos.cast<File>(),
            storageType,
          );

          if (context.mounted) {
            SnackbarHelper.showSuccess(
              context,
              '${photos.length} photo${photos.length > 1 ? 's' : ''} sélectionnée${photos.length > 1 ? 's' : ''} pour $defaultTitle',
            );
          }
        },
      );
    }

    return const SizedBox.shrink();
  }
}
