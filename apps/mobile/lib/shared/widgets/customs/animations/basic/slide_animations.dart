import 'package:flutter/material.dart';

Widget slideSmoothAnimation({required Widget child}) {
  return TweenAnimationBuilder<double>(
    duration: const Duration(milliseconds: 700),
    curve: Curves.easeOutCubic,
    tween: Tween<double>(begin: 0.0, end: 1.0),
    builder: (context, value, child) {
      return Transform.translate(
        offset: Offset(0.0, (1 - value) * 15),
        child: child,
      );
    },
    child: child,
  );
}

Widget slideRightSmoothAnimation({
  required Widget child,
  required ValueKey<String> key,
}) {
  return TweenAnimationBuilder<double>(
    duration: const Duration(milliseconds: 450),
    curve: Curves.easeInOut,
    tween: Tween<double>(begin: 0.0, end: 1.0),
    builder: (context, value, child) {
      return Transform.translate(
        offset: Offset((1 - value) * 20, 0),
        child: Opacity(opacity: 0.3 + (value * 0.7), child: child),
      );
    },
    child: child,
  );
}

Widget slideRightSmoothSwitcher({
  required Widget child,
  Duration duration = const Duration(milliseconds: 450),
}) {
  return AnimatedSwitcher(
    duration: duration,
    switchInCurve: Curves.easeInOut,
    switchOutCurve: Curves.easeInOut,
    layoutBuilder: (Widget? currentChild, List<Widget> previousChildren) {
      return Stack(
        alignment: Alignment.center,
        children: <Widget>[if (currentChild != null) currentChild],
      );
    },
    transitionBuilder: (Widget child, Animation<double> animation) {
      return SlideTransition(
        position: Tween<Offset>(begin: const Offset(0.08, 0), end: Offset.zero)
            .animate(
              CurvedAnimation(parent: animation, curve: Curves.easeOutCubic),
            ),
        child: child,
      );
    },
    child: child,
  );
}
