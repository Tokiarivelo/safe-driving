import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/text_styles.dart';

class IconTextRow extends StatelessWidget {
  final IconData icon;
  final String text;
  final Color? color;
  const IconTextRow({super.key, required this.icon, required this.text, this.color});
  @override
  Widget build(BuildContext context) {
    return Row(children: [
      Icon(icon, size: 18, color: color ?? Colors.black),
      const SizedBox(width: 6),
      Text(text, style: subtitle14.copyWith(color: color ?? Colors.black)),
    ]);
  }
}
