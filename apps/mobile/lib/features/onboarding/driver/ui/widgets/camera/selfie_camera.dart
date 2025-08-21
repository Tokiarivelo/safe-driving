import 'package:flutter/material.dart';

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
  bool _isCameraReady = false;
  bool _isCapturing = false;
  String? _capturedPhotoPath;

  @override
  void initState() {
    super.initState();
    _initializeCamera();
  }

  Future<void> _initializeCamera() async {
    // Simulate camera initialization
    await Future.delayed(const Duration(seconds: 1));
    if (mounted) {
      setState(() {
        _isCameraReady = true;
      });
    }
  }

  Future<void> _capturePhoto() async {
    if (!_isCameraReady || _isCapturing) return;

    setState(() {
      _isCapturing = true;
    });

    // Simulate photo capture
    await Future.delayed(const Duration(milliseconds: 500));

    final photoPath = 'selfie_${DateTime.now().millisecondsSinceEpoch}.jpg';

    setState(() {
      _capturedPhotoPath = photoPath;
      _isCapturing = false;
    });

    widget.onPhotoTaken(photoPath);
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
        if (widget.showInstructions) _buildInstructions(),
        const SizedBox(height: 16),
        Expanded(child: _buildCameraPreview()),
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
    if (!_isCameraReady) {
      return Container(
        margin: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.grey.shade200,
          borderRadius: BorderRadius.circular(16),
        ),
        child: const Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              CircularProgressIndicator(),
              SizedBox(height: 16),
              Text('Initialisation de la caméra...'),
            ],
          ),
        ),
      );
    }

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

    return Container(
      margin: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.black,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Stack(
        children: [
          // Camera preview placeholder
          Container(
            width: double.infinity,
            height: double.infinity,
            decoration: BoxDecoration(
              color: Colors.grey.shade800,
              borderRadius: BorderRadius.circular(16),
            ),
            child: const Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.person, color: Colors.white54, size: 100),
                  SizedBox(height: 16),
                  Text(
                    'Aperçu de la caméra',
                    style: TextStyle(color: Colors.white54),
                  ),
                ],
              ),
            ),
          ),
          // Camera overlay guidelines
          Center(
            child: Container(
              width: 250,
              height: 320,
              decoration: BoxDecoration(
                border: Border.all(color: Colors.white, width: 2),
                borderRadius: BorderRadius.circular(16),
              ),
              child: const Center(
                child: Text(
                  'Alignez votre visage\ndans ce cadre',
                  textAlign: TextAlign.center,
                  style: TextStyle(color: Colors.white, fontSize: 16),
                ),
              ),
            ),
          ),
        ],
      ),
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

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          GestureDetector(
            onTap: _isCameraReady && !_isCapturing ? _capturePhoto : null,
            child: Container(
              width: 80,
              height: 80,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: _isCameraReady && !_isCapturing
                    ? Colors.red
                    : Colors.grey,
                border: Border.all(color: Colors.white, width: 4),
              ),
              child: _isCapturing
                  ? const Center(
                      child: CircularProgressIndicator(
                        color: Colors.white,
                        strokeWidth: 3,
                      ),
                    )
                  : const Icon(Icons.camera, color: Colors.white, size: 32),
            ),
          ),
        ],
      ),
    );
  }
}
