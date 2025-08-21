import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/features/onboarding/driver/services/driver_camera_service.dart';

class CameraInterface extends StatefulWidget {
  final Function(String? imagePath) onPictureTaken;
  final String? title;
  final String? description;

  const CameraInterface({
    super.key,
    required this.onPictureTaken,
    this.title,
    this.description,
  });

  @override
  CameraInterfaceState createState() => CameraInterfaceState();
}

class CameraInterfaceState extends State<CameraInterface> {
  @override
  Widget build(BuildContext context) {
    return Container(
      height: MediaQuery.of(context).size.height * 0.9,
      decoration: const BoxDecoration(
        color: AppColors.light,
        borderRadius: BorderRadius.only(
          topLeft: Radius.circular(24),
          topRight: Radius.circular(24),
        ),
      ),
      child: Column(
        children: [
          // Header
          Padding(
            padding: const EdgeInsets.fromLTRB(16.0, 8.0, 16.0, 8.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text(
                  'Capture de document',
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.w600,
                    color: AppColors.textColor,
                    fontFamily: 'Inder',
                  ),
                ),
                IconButton(
                  icon: const Icon(Icons.close, color: AppColors.textColor),
                  onPressed: () => Navigator.of(context).pop(),
                ),
              ],
            ),
          ),

          // Instructions
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0),
            child: Text(
              'Placez le document dans le carré et appuyez sur le bouton pour capturer',
              style: TextStyle(
                fontSize: 14,
                color: AppColors.textColor.withValues(alpha: 0.7),
                fontFamily: 'Inder',
              ),
              textAlign: TextAlign.center,
            ),
          ),

          const SizedBox(height: 10),
          Expanded(
            flex: 1,
            child: Container(
              width: double.infinity,
              color: AppColors.softBackgroundColor,
              child: DriverCameraService(
                onPictureTaken: widget.onPictureTaken,
                title: 'Capture de document',
                description:
                    'Placez le document dans le cadre et appuyez sur le bouton pour capturer',
                showDocumentGuide: true,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
