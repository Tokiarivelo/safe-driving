import 'package:flutter/material.dart';
import 'package:safe_driving/features/onboarding/driver/ui/widgets/camera/selfie_camera.dart';
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
      child: SelfieCamera(
        instruction: (selfieData['description'] as String?) ??
            'Positionnez-vous face à la caméra et assurez-vous que votre visage soit bien visible.',
        onPhotoTaken: (imagePath) async {
          // Utiliser le flux dédié au selfie (et non l'upload générique de documents)
          await coordinator.documentUploadViewModel.onSelfieTaken(imagePath);

          if (context.mounted) {
            SnackbarHelper.showSuccess(context, 'Selfie pris avec succès !');
            showCapturedPhotosModal(context, coordinator);
          }
        },
        showInstructions: false,
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
