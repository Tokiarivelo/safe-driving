import 'package:flutter/material.dart';
import 'dart:math' as math;
import 'package:safe_driving/features/onboarding/driver/services/driver_camera_service.dart';
import 'package:safe_driving/features/onboarding/driver/ui/widgets/camera/widgets/captured_image_widget.dart';

/// Selfie camera widget for driver onboarding
class SelfieCamera extends StatefulWidget {
  final Function(String) onPhotoTaken;
  final String? instruction;
  final bool showInstructions;

  const SelfieCamera({
    super.key,
    required this.onPhotoTaken,
    this.instruction,
    this.showInstructions = true,
  });

  @override
  State<SelfieCamera> createState() => _SelfieCameraState();
}

class _SelfieCameraState extends State<SelfieCamera> {
  bool _isCapturing = false;
  String? _capturedPhotoPath;
  void Function()? _externalTakePicture;

  @override
  void initState() {
    super.initState();
  }

  Future<void> _capturePhoto() async {
    if (_isCapturing) return;
    setState(() => _isCapturing = true);
    // Delegate to underlying camera service (real capture)
    _externalTakePicture?.call();
  }

  void _retakePhoto() {
    setState(() {
      _capturedPhotoPath = null;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        if (widget.showInstructions) ...[
          _buildInstructions(),
          const SizedBox(height: 12),
        ],
        // Utiliser l'espace disponible pour l'aperçu afin d'éviter tout overflow
        Expanded(
          child: _buildCameraPreview(),
        ),
        const SizedBox(height: 12),
        _buildCameraControls(),
      ],
    );
  }

  Widget _buildInstructions() {
    return Container(
      padding: const EdgeInsets.all(16),
      margin: const EdgeInsets.symmetric(horizontal: 16),
      decoration: BoxDecoration(
        color: Colors.blue.shade50,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.blue.shade200),
      ),
      child: Column(
        children: [
          Icon(Icons.camera_alt, color: Colors.blue.shade600, size: 32),
          const SizedBox(height: 8),
          Text(
            widget.instruction ?? 'Prenez une photo de vous',
            style: Theme.of(
              context,
            ).textTheme.titleMedium?.copyWith(color: Colors.blue.shade800),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 8),
          Text(
            'Assurez-vous que votre visage est clairement visible et bien éclairé.',
            style: Theme.of(
              context,
            ).textTheme.bodySmall?.copyWith(color: Colors.blue.shade600),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }

  Widget _buildCameraPreview() {
    // When a photo is captured, show only the photo (no confirmation frame)
    if (_capturedPhotoPath != null) {
      return LayoutBuilder(
        builder: (context, constraints) {
          final size = math.min(constraints.maxWidth, constraints.maxHeight);
          return Center(
            child: SizedBox(
              width: size,
              height: size,
              child: ClipRRect(
                borderRadius: BorderRadius.circular(12),
                child: CapturedImageWidget(
                  path: _capturedPhotoPath!,
                  fit: BoxFit.cover,
                ),
              ),
            ),
          );
        },
      );
    }

    // Show the live camera preview in a square using the available space
    return LayoutBuilder(
      builder: (context, constraints) {
        final size = math.min(constraints.maxWidth, constraints.maxHeight);
        return Center(
          child: SizedBox(
            width: size,
            height: size,
            child: ClipRRect(
              borderRadius: BorderRadius.circular(12),
              child: DriverCameraService(
                compact: true,
                onProvideTakePicture: (invoker) {
                  if (!mounted) return;
                  setState(() {
                    _externalTakePicture = () {
                      invoker();
                    };
                  });
                },
                onPictureTaken: (path) {
                  setState(() => _isCapturing = false);
                  if (path != null) {
                    setState(() => _capturedPhotoPath = path);
                    // Appel immédiat: validation automatique de la capture
                    widget.onPhotoTaken(path);
                  } else {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('Capture échouée')),
                    );
                  }
                },
              ),
            ),
          ),
        );
      },
    );
  }

  Widget _buildCameraControls() {
    if (_capturedPhotoPath != null) {
      return Center(
        child: ElevatedButton.icon(
          onPressed: _retakePhoto,
          icon: const Icon(Icons.refresh),
          label: const Text('Reprendre'),
          style: ElevatedButton.styleFrom(
            backgroundColor: Colors.orange,
            foregroundColor: Colors.white,
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
          ),
        ),
      );
    }

    final isReady = _externalTakePicture != null;
    return Center(
      child: ElevatedButton.icon(
        onPressed: isReady && !_isCapturing ? _capturePhoto : null,
        icon: _isCapturing
            ? const SizedBox(
                width: 16,
                height: 16,
                child: CircularProgressIndicator(
                  strokeWidth: 2,
                  color: Colors.white,
                ),
              )
            : const Icon(Icons.camera_alt),
        label: Text(_isCapturing ? 'Capture...' : 'Capturer'),
        style: ElevatedButton.styleFrom(
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
        ),
      ),
    );
  }
}
