import 'dart:io';
import 'package:flutter/material.dart';
import 'package:safe_driving/features/onboarding/driver/ui/widgets/specialized/upload_widget.dart';
import 'package:safe_driving/features/onboarding/driver/viewmodels/driver_onboarding_coordinator.dart';
import 'package:safe_driving/shared/widgets/customs/snackbar/snackbar_helper.dart';
import 'package:safe_driving/l10n/l10n.dart';

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
            'recto',
            coordinator,
            context,
          ),
        const SizedBox(height: 16),
        if (carteIdentiteData.containsKey('versoID'))
          buildUploadSection(
            'verso',
            coordinator,
            context,
          ),
        const SizedBox(height: 16),
        if (carteIdentiteData.containsKey('permisConduire'))
          buildUploadSection(
            'permis',
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
            'registration',
            coordinator,
            context,
          ),
        const SizedBox(height: 16),
        if (documentsData.containsKey('attestationAssurance'))
          buildDocumentSection(
            'insurance',
            coordinator,
            context,
          ),
        const SizedBox(height: 16),
        if (documentsData.containsKey('photosVehicule'))
          buildDocumentSection(
            'photos',
            coordinator,
            context,
          ),
      ],
    );
  }

  static Widget buildUploadSection(
    String identityType,
    DriverOnboardingCoordinator coordinator,
    BuildContext context,
  ) {
    String title;
    switch (identityType) {
      case 'recto':
        title = context.l10n.driverIdentityRecto;
        break;
      case 'verso':
        title = context.l10n.driverIdentityVerso;
        break;
      case 'permis':
        title = context.l10n.driverIdentityLicense;
        break;
      default:
        title = '';
    }

    return _UploadWithSingleSnackbar(
      title: title,
      description: context.l10n.driverIdentityUploadText,
      buttonText: context.l10n.driverIdentityChooseFile,
      coordinator: coordinator,
      storageTypeResolver: () {
        if (identityType == 'recto') return 'carteIdentiteRecto';
        if (identityType == 'verso') return 'carteIdentiteVerso';
        if (identityType == 'permis') return 'permisConduire';
        return 'unknown';
      },
      sectionTitleForMessage: title,
    );
  }

  static Widget buildDocumentSection(
    String docType,
    DriverOnboardingCoordinator coordinator,
    BuildContext context,
  ) {
    String title;
    switch (docType) {
      case 'registration':
        title = context.l10n.driverVehicleRegistration;
        break;
      case 'insurance':
        title = context.l10n.driverSummaryVehicle; // fallback
        break;
      case 'photos':
        title = context.l10n.driverSummaryVehiclePhotos;
        break;
      default:
        title = '';
    }

    return _UploadWithSingleSnackbar(
      title: title,
      description: context.l10n.driverIdentityUploadText,
      buttonText: context.l10n.driverIdentityChooseFile,
      addMorePhotosText: context.l10n.driverVehicleAddPhotos,
      coordinator: coordinator,
      storageTypeResolver: () {
        if (docType == 'registration') return 'certificatImmatriculation';
        if (docType == 'insurance') return 'attestationAssurance';
        if (docType == 'photos') return 'photosVehicule';
        return 'unknown';
      },
      sectionTitleForMessage: title,
    );
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


    widget.coordinator.documentUploadViewModel.queuePhotosForUpload(
      photos,
      storageType,
    );

    if (!_hasShownUploadSnack && _previousCount == 0 && photos.isNotEmpty && mounted) {
      final count = photos.length;
      SnackbarHelper.showSuccess(
        context,
        '${context.l10n.driverSummaryVehiclePhotos}: $count',
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
