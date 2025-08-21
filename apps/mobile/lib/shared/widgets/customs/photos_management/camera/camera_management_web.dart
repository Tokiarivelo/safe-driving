// ignore_for_file: avoid_web_libraries_in_flutter, deprecated_member_use

import 'dart:async';
import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'dart:html' as html;
import 'dart:ui_web' as ui_web;
import 'package:safe_driving/shared/widgets/customs/snackbar/snackbar_helper.dart';

class PlatformCameraManagement extends StatefulWidget {
  final Function(String? imagePath) onPictureTaken;
  final String? title;
  final String? description;

  const PlatformCameraManagement({
    super.key,
    required this.onPictureTaken,
    this.title,
    this.description,
  });

  @override
  CameraManagementWebState createState() => CameraManagementWebState();
}

class CameraManagementWebState extends State<PlatformCameraManagement> {
  html.VideoElement? _videoElement;
  html.MediaStream? _mediaStream;
  bool _ready = false;
  String? _error;
  final String _viewType =
      'web-camera-${DateTime.now().microsecondsSinceEpoch}';

  @override
  void initState() {
    super.initState();
    _videoElement = html.VideoElement()
      ..autoplay = true
      ..muted = true
      ..style.width = '100%'
      ..style.height = '100%'
      ..style.objectFit = 'cover';

    // ignore: undefined_prefixed_name
    ui_web.platformViewRegistry.registerViewFactory(_viewType, (int viewId) {
      return _videoElement!;
    });
    _startCamera();
  }

  Future<void> _startCamera() async {
    try {
      _mediaStream = await html.window.navigator.mediaDevices!.getUserMedia({
        'video': {'facingMode': 'user'},
      });
      _videoElement!.srcObject = _mediaStream;
      await _videoElement!.play();
      if (mounted) setState(() => _ready = true);
    } catch (e) {
      if (mounted) setState(() => _error = e.toString());
    }
  }

  void _takePicture() {
    if (!_ready || _videoElement!.videoWidth == 0) {
      SnackbarHelper.showError(context, 'Caméra Web pas encore prête.');
      return;
    }
    final w = _videoElement!.videoWidth;
    final h = _videoElement!.videoHeight;
    final canvas = html.CanvasElement(width: w, height: h);
    canvas.context2D.drawImage(_videoElement!, 0, 0);
    final dataUrl = canvas.toDataUrl('image/png');
    widget.onPictureTaken(dataUrl);
  }

  @override
  void dispose() {
    _mediaStream?.getTracks().forEach((t) => t.stop());
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (_error != null) {
      return Center(child: Text('Erreur WebCam: $_error'));
    }
    if (!_ready) {
      return const Center(child: CircularProgressIndicator());
    }
    return SizedBox(
      height: 400,
      child: Column(
        children: [
          Expanded(child: HtmlElementView(viewType: _viewType)),
          const SizedBox(height: 16),
          Container(
            width: 100,
            height: 100,
            decoration: BoxDecoration(
              color: AppColors.buttonWithoutBackGround,
              borderRadius: BorderRadius.circular(100),
              boxShadow: [
                BoxShadow(
                  color: AppColors.dark.withOpacity(0.6),
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
