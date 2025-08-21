import 'package:flutter/material.dart';

class CustomButton {
  static Widget customButton({
    required String text,
    required VoidCallback onPressed,
    ButtonStyle? style,
    Widget? child,
  }) {
    return ElevatedButton(
      onPressed: onPressed,
      style: style,
      child: child ?? Text(text),
    );
  }
}
