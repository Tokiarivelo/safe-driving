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

    return _UploadWithSingleSnackbar(
      title: title,
      description: textCenter ?? '',
      buttonText: bouton ?? '',
      coordinator: coordinator,
      storageTypeResolver: () {
        if (title.contains('Recto')) return 'carteIdentiteRecto';
        if (title.contains('Verso')) return 'carteIdentiteVerso';
        if (title.contains('Permis')) return 'permisConduire';
        return 'unknown';
      },
      sectionTitleForMessage: title,
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

      return _UploadWithSingleSnackbar(
        title: defaultTitle,
        description: textCenter ?? '',
        buttonText: bouton ?? '',
        addMorePhotosText: ajoutPhoto,
        coordinator: coordinator,
        storageTypeResolver: () {
          if (defaultTitle.contains('Certificat')) return 'certificatImmatriculation';
          if (defaultTitle.contains('Attestation')) return 'attestationAssurance';
          if (defaultTitle.contains('Photos')) return 'photosVehicule';
          return 'unknown';
        },
        sectionTitleForMessage: defaultTitle,
      );
    }

    return const SizedBox.shrink();
  }
}

class _UploadWithSingleSnackbar extends StatefulWidget {
  final String title;
  final String description;
  final String buttonText;
  final String? addMorePhotosText;
  final DriverOnboardingCoordinator coordinator;
  final String Function() storageTypeResolver;
  final String sectionTitleForMessage;

  const _UploadWithSingleSnackbar({
    required this.title,
    required this.description,
    required this.buttonText,
    required this.coordinator,
    required this.storageTypeResolver,
    required this.sectionTitleForMessage,
    this.addMorePhotosText,
  });

  @override
  State<_UploadWithSingleSnackbar> createState() => _UploadWithSingleSnackbarState();
}

class _UploadWithSingleSnackbarState extends State<_UploadWithSingleSnackbar> {
  bool _hasShownUploadSnack = false;
  int _previousCount = 0;

  Future<void> _onPhotosChanged(List<File> photos) async {
    final storageType = widget.storageTypeResolver();

    await widget.coordinator.documentUploadViewModel.uploadPhotos(
      photos,
      storageType,
    );

    if (!_hasShownUploadSnack && _previousCount == 0 && photos.isNotEmpty && mounted) {
      final count = photos.length;
      SnackbarHelper.showSuccess(
        context,
        '$count photo${count > 1 ? 's' : ''} sélectionnée${count > 1 ? 's' : ''} pour ${widget.sectionTitleForMessage}',
      );
      _hasShownUploadSnack = true;
    }

    _previousCount = photos.length;
  }

  @override
  Widget build(BuildContext context) {
    return UploadWidget(
      title: widget.title,
      description: widget.description,
      buttonText: widget.buttonText,
      addMorePhotosText: widget.addMorePhotosText,
      onPhotosChanged: _onPhotosChanged,
    );
  }
}
