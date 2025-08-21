import 'package:flutter/material.dart';

class AnimationConstants {
  AnimationConstants._();

  static const Duration fastDuration = Duration(milliseconds: 150);
  static const Duration normalDuration = Duration(milliseconds: 300);
  static const Duration slowDuration = Duration(milliseconds: 400);
  static const Duration contentDuration = Duration(milliseconds: 600);

  static const Curve easeInOut = Curves.easeInOut;
  static const Curve easeOut = Curves.easeOut;
  static const Curve bounceOut = Curves.bounceOut;

  static const double clickScale = 0.95;
  static const double hoverScale = 1.05;

  static final Tween<double> scaleTween = Tween<double>(
    begin: 1.0,
    end: clickScale,
  );
  static final Tween<double> opacityTween = Tween<double>(begin: 0.0, end: 1.0);
}
