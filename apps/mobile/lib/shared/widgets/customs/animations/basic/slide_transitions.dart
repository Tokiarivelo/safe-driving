import 'package:flutter/material.dart';
import '../enums/slide_direction.dart';

class SlideInTransition extends StatelessWidget {
  final Widget child;
  final Duration duration;
  final Curve curve;
  final Offset beginOffset;
  final bool animate;

  const SlideInTransition({
    super.key,
    required this.child,
    this.duration = const Duration(milliseconds: 500),
    this.curve = Curves.easeOutCubic,
    this.beginOffset = const Offset(0, 0.1),
    this.animate = true,
  });

  @override
  Widget build(BuildContext context) {
    if (!animate) return child;

    return TweenAnimationBuilder<Offset>(
      duration: duration,
      curve: curve,
      tween: Tween<Offset>(begin: beginOffset, end: Offset.zero),
      builder: (context, offset, child) {
        return Transform.translate(
          offset: Offset(offset.dx * 20, offset.dy * 20),
          child: Opacity(opacity: 1 - offset.dy.abs(), child: child),
        );
      },
      child: child,
    );
  }
}

class SmoothSlideTransition extends StatelessWidget {
  final Widget child;
  final Duration duration;
  final Curve curve;
  final SlideDirection direction;
  final double distance;
  final bool animate;

  const SmoothSlideTransition({
    super.key,
    required this.child,
    this.duration = const Duration(milliseconds: 500),
    this.curve = Curves.easeOutCubic,
    this.direction = SlideDirection.fromRight,
    this.distance = 15.0,
    this.animate = true,
  });

  @override
  Widget build(BuildContext context) {
    if (!animate) return child;

    Offset beginOffset;
    switch (direction) {
      case SlideDirection.fromLeft:
        beginOffset = Offset(-distance, 0);
        break;
      case SlideDirection.fromRight:
        beginOffset = Offset(distance, 0);
        break;
      case SlideDirection.fromTop:
        beginOffset = Offset(0, -distance);
        break;
      case SlideDirection.fromBottom:
        beginOffset = Offset(0, distance);
        break;
    }

    return AnimatedSwitcher(
      duration: duration,
      switchInCurve: curve,
      layoutBuilder: (Widget? currentChild, List<Widget> previousChildren) {
        return Stack(
          children: <Widget>[
            ...previousChildren,
            if (currentChild != null) currentChild,
          ],
        );
      },
      child: TweenAnimationBuilder<Offset>(
        key: ValueKey<SlideDirection>(direction),
        duration: duration,
        curve: curve,
        tween: Tween<Offset>(begin: beginOffset, end: Offset.zero),
        builder: (context, offset, child) {
          return Transform.translate(offset: offset, child: child);
        },
        child: child,
      ),
    );
  }
}
