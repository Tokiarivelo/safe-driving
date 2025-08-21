import 'dart:io';
import 'package:flutter/material.dart';
import 'package:safe_driving/features/onboarding/driver/ui/widgets/camera/camera_interface.dart';
import 'package:safe_driving/features/onboarding/driver/ui/widgets/modals/captured_photos_modal.dart';
import 'package:safe_driving/features/onboarding/driver/viewmodels/driver_onboarding_coordinator.dart';
import 'package:safe_driving/shared/widgets/customs/snackbar/snackbar_helper.dart';

class CameraBuilder {
  static Widget buildSelfieCamera(
    Map<String, dynamic> selfieData,
    DriverOnboardingCoordinator coordinator,
    BuildContext context,
  ) {
    return SizedBox(
      height: 400,
      child: CameraInterface(
        onPictureTaken: (imagePath) async {
          if (imagePath != null) {
            final capturedFile = File(imagePath);
            coordinator.documentUploadViewModel.addCapturedPhoto(capturedFile);

            await coordinator.documentUploadViewModel.uploadPhotos([
              capturedFile,
            ], 'selfie');

            if (context.mounted) {
              SnackbarHelper.showSuccess(context, 'Selfie pris avec succès !');
              showCapturedPhotosModal(context, coordinator);
            }
          } else {
            SnackbarHelper.showError(
              context,
              'Erreur lors de la prise de photo',
            );
          }
        },
      ),
    );
  }

  static void showCapturedPhotosModal(
    BuildContext context,
    DriverOnboardingCoordinator coordinator,
  ) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) {
        return CapturedPhotosModal(
          selectedImages: coordinator.documentUploadViewModel.capturedPhotos,
          onImagesChanged: (updatedImages) {
            coordinator.documentUploadViewModel.updateCapturedPhotos(
              updatedImages,
            );
          },
        );
      },
    );
  }
}
