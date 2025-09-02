import 'dart:io';
import 'package:flutter/widgets.dart';

class CapturedImageWidget extends StatelessWidget {
  final String path;
  final BoxFit fit;

  const CapturedImageWidget({super.key, required this.path, this.fit = BoxFit.contain});

  @override
  Widget build(BuildContext context) {
    return Image.file(
      File(path),
      fit: fit,
    );
  }
}

