import 'package:flutter/material.dart';
import 'package:safe_driving/features/onboarding/driver/ui/widgets/camera/selfie_camera.dart';
import 'package:safe_driving/features/onboarding/driver/viewmodels/driver_onboarding_coordinator.dart';

class CameraBuilder {
  static Widget buildSelfieCamera(
    Map<String, dynamic> selfieData,
    DriverOnboardingCoordinator coordinator,
    BuildContext context,
  ) {
 
    final screenHeight = MediaQuery.of(context).size.height;
    final cameraHeight = screenHeight * 0.5; // occupy half the screen
    return SizedBox(
      height: cameraHeight,
      child: SelfieCamera(
        instruction: (selfieData['description'] as String?) ??
            'Positionnez-vous face à la caméra et assurez-vous que votre visage soit bien visible.',
        onPhotoTaken: (imagePath) async {
          await coordinator.documentUploadViewModel.onSelfieTaken(imagePath);
        },
        showInstructions: false,
      ),
    );
  }
}
