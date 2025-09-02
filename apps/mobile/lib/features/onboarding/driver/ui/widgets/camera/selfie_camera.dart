import 'package:flutter/material.dart';
import 'dart:math' as math;
import 'package:safe_driving/features/onboarding/driver/services/driver_camera_service.dart';

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
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        if (widget.showInstructions) ...[
          _buildInstructions(),
          const SizedBox(height: 16),
        ],
        // Aperçu caméra compact dans un carré, centré
        _buildCameraPreview(),
        const SizedBox(height: 16),
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
    // Show confirmation/info once a photo is captured
    if (_capturedPhotoPath != null) {
      return Container(
        margin: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.grey.shade300,
          borderRadius: BorderRadius.circular(16),
        ),
        child: Stack(
          children: [
            Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.check_circle, color: Colors.green, size: 64),
                  const SizedBox(height: 16),
                  Text(
                    'Photo capturée !',
                    style: Theme.of(context).textTheme.titleLarge,
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Votre selfie a été pris avec succès',
                    style: Theme.of(context).textTheme.bodyMedium,
                  ),
                ],
              ),
            ),
            Positioned(
              top: 16,
              right: 16,
              child: Container(
                padding: const EdgeInsets.symmetric(
                  horizontal: 12,
                  vertical: 6,
                ),
                decoration: BoxDecoration(
                  color: Colors.green,
                  borderRadius: BorderRadius.circular(20),
                ),
                child: const Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Icon(Icons.check, color: Colors.white, size: 16),
                    SizedBox(width: 4),
                    Text(
                      'Validé',
                      style: TextStyle(color: Colors.white, fontSize: 12),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      );
    }

    // Show the live camera preview in a large square (use as much space as possible)
    return LayoutBuilder(
      builder: (context, constraints) {
        final available = math.min(constraints.maxWidth, constraints.maxHeight);
        final size = available * 0.95; // use 95% of the smallest dimension
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
      return Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          ElevatedButton.icon(
            onPressed: _retakePhoto,
            icon: const Icon(Icons.refresh),
            label: const Text('Reprendre'),
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.orange,
              foregroundColor: Colors.white,
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
            ),
          ),
          ElevatedButton.icon(
            onPressed: () {
              // Photo already taken, callback already called
              ScaffoldMessenger.of(
                context,
              ).showSnackBar(const SnackBar(content: Text('Photo validée !')));
            },
            icon: const Icon(Icons.check),
            label: const Text('Valider'),
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.green,
              foregroundColor: Colors.white,
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
            ),
          ),
        ],
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
