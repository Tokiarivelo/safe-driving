import 'package:flutter/material.dart';

import 'camera_management_mobile.dart'
    if (dart.library.html) 'camera_management_web.dart';

class CameraManagement extends StatelessWidget {
  final Function(String? imagePath) onPictureTaken;
  final String? title;
  final String? description;
  final bool showDocumentGuide;

  const CameraManagement({
    super.key,
    required this.onPictureTaken,
    this.title,
    this.description,
    this.showDocumentGuide = false,
  });

  @override
  Widget build(BuildContext context) {
    return PlatformCameraManagement(
      onPictureTaken: onPictureTaken,
      title: title,
      description: description,
      showDocumentGuide: showDocumentGuide,
    );
  }
}
