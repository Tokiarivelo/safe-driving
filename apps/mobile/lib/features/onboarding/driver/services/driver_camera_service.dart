import 'package:flutter/material.dart';

import 'driver_camera_service_mobile.dart'
    if (dart.library.html) 'driver_camera_service_web.dart';

class DriverCameraService extends StatelessWidget {
  final Function(String? imagePath) onPictureTaken;
  final String? title;
  final String? description;
  final bool showDocumentGuide;
  final bool compact; // Mode compact: preview seul, sans bouton interne
  final void Function(void Function())? onProvideTakePicture; // Fournit l'invoker

  const DriverCameraService({
    super.key,
    required this.onPictureTaken,
    this.title,
    this.description,
    this.showDocumentGuide = false,
    this.compact = false,
    this.onProvideTakePicture,
  });

  @override
  Widget build(BuildContext context) {
    return PlatformDriverCameraService(
      onPictureTaken: onPictureTaken,
      title: title,
      description: description,
      showDocumentGuide: showDocumentGuide,
      compact: compact,
      onProvideTakePicture: onProvideTakePicture,
    );
  }
}
