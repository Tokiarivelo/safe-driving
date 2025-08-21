import 'dart:async';
import 'package:flutter/material.dart';
import 'package:camera/camera.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:safe_driving/shared/widgets/customs/snackbar/snackbar_helper.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';

class PlatformDriverCameraService extends StatefulWidget {
  final Function(String? imagePath) onPictureTaken;
  final String? title;
  final String? description;
  final bool showDocumentGuide;

  const PlatformDriverCameraService({
    super.key,
    required this.onPictureTaken,
    this.title,
    this.description,
    this.showDocumentGuide = false,
  });

  @override
  DriverCameraServiceMobileState createState() => DriverCameraServiceMobileState();
}

class DriverCameraServiceMobileState extends State<PlatformDriverCameraService> {
  CameraController? _mobileController;
  Future<void>? _initializeMobileControllerFuture;
  PermissionStatus? _permissionStatus;

  @override
  void initState() {
    super.initState();
    _requestMobileCameraPermission();
  }

  Future<void> _requestMobileCameraPermission() async {
    final status = await Permission.camera.request();
    if (mounted) setState(() => _permissionStatus = status);
    if (status.isGranted) _initializeMobileCamera();
  }

  Future<void> _initializeMobileCamera() async {
    try {
      final cameras = await availableCameras();
      final front = cameras.firstWhere(
        (c) => c.lensDirection == CameraLensDirection.front,
        orElse: () => cameras.first,
      );
      _mobileController = CameraController(
        front,
        ResolutionPreset.medium,
        enableAudio: false,
      );
      _initializeMobileControllerFuture = _mobileController!.initialize();
      if (!mounted) return;
      setState(() {});
    } catch (e) {
      if (mounted) {
        SnackbarHelper.showError(context, "Erreur init caméra mobile : $e");
      }
    }
  }

  void _takePicture() async {
    if (_mobileController?.value.isInitialized != true) {
      if (mounted) {
        SnackbarHelper.showError(context, 'Caméra pas prête.');
      }
      return;
    }
    try {
      final img = await _mobileController!.takePicture();
      if (mounted) {
        widget.onPictureTaken(img.path);
      }
    } catch (e) {
      if (mounted) {
        SnackbarHelper.showError(context, 'Erreur prise de photo.');
        widget.onPictureTaken(null);
      }
    }
  }

  Widget _buildDocumentGuideOverlay() {
    return Center(
      child: Container(
        width: 350,
        height: 300,
        decoration: BoxDecoration(
          border: Border.all(color: AppColors.fillButtonBackground, width: 3),
          borderRadius: BorderRadius.circular(12),
        ),
        child: Container(
          margin: const EdgeInsets.all(8),
          decoration: BoxDecoration(
            border: Border.all(
              color: AppColors.fillButtonBackground.withValues(alpha: 0.5),
              width: 0.2,
            ),
            borderRadius: BorderRadius.circular(8),
          ),
        ),
      ),
    );
  }

  @override
  void dispose() {
    _mobileController?.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (_permissionStatus == null ||
        _initializeMobileControllerFuture == null) {
      return const Center(child: CircularProgressIndicator());
    }
    if (!_permissionStatus!.isGranted) {
      return Center(
        child: ElevatedButton(
          onPressed: _requestMobileCameraPermission,
          child: const Text('Autoriser la caméra'),
        ),
      );
    }
    return SizedBox(
      height: 350,
      child: Column(
        children: [
          Expanded(
            child: FutureBuilder<void>(
              future: _initializeMobileControllerFuture,
              builder: (_, snap) {
                if (snap.connectionState == ConnectionState.done) {
                  if (snap.hasError) {
                    WidgetsBinding.instance.addPostFrameCallback((_) {
                      SnackbarHelper.showError(
                        context,
                        'Erreur WebCam: ${snap.error}',
                      );
                    });
                    return const Center(child: CircularProgressIndicator());
                  }
                  return Stack(
                    children: [
                      CameraPreview(_mobileController!),
                      if (widget.showDocumentGuide) _buildDocumentGuideOverlay(),
                    ],
                  );
                }
                return const Center(child: CircularProgressIndicator());
              },
            ),
          ),
          const SizedBox(height: 8),
          Container(
            width: 100,
            height: 100,
            decoration: BoxDecoration(
              color: AppColors.buttonWithoutBackGround,
              borderRadius: BorderRadius.circular(100),
              boxShadow: [
                BoxShadow(
                  color: AppColors.dark.withValues(alpha: 0.6),
                  blurRadius: 8,
                  offset: const Offset(0, 2),
                ),
              ],
            ),
            child: IconButton(
              iconSize: 50,
              color: AppColors.light,
              onPressed: _takePicture,
              icon: const Icon(Icons.camera_alt),
            ),
          ),
        ],
      ),
    );
  }
}
