import 'dart:convert';
import 'dart:typed_data';
import 'package:flutter/widgets.dart';

class CapturedImageWidget extends StatelessWidget {
  final String path; // data URL (data:image/png;base64,...) or blob: URL
  final BoxFit fit;

  const CapturedImageWidget({
    super.key,
    required this.path,
    this.fit = BoxFit.contain,
  });

  @override
  Widget build(BuildContext context) {
    if (path.startsWith('data:')) {
      final base64Index = path.indexOf('base64,');
      if (base64Index != -1) {
        final b64 = path.substring(base64Index + 7);
        try {
          final Uint8List bytes = base64Decode(b64);
          return Image.memory(bytes, fit: fit);
        } catch (_) {
          // Fallback to network if decoding fails
          return Image.network(path, fit: fit);
        }
      }
      return Image.network(path, fit: fit);
    }
    // blob: or http(s):
    return Image.network(path, fit: fit);
  }
}
