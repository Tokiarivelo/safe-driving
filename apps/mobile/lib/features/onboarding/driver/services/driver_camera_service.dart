import 'package:flutter/material.dart';

import 'driver_camera_service_mobile.dart'
    if (dart.library.html) 'driver_camera_service_web.dart';

class DriverCameraService extends StatelessWidget {
  final Function(String? imagePath) onPictureTaken;
  final String? title;
  final String? description;
  final bool showDocumentGuide;

  const DriverCameraService({
    super.key,
    required this.onPictureTaken,
    this.title,
    this.description,
    this.showDocumentGuide = false,
  });

  @override
  Widget build(BuildContext context) {
    return PlatformDriverCameraService(
      onPictureTaken: onPictureTaken,
      title: title,
      description: description,
      showDocumentGuide: showDocumentGuide,
    );
  }
}
