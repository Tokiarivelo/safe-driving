import 'package:flutter/material.dart';
import '../enums/slide_direction.dart';

class RouteSlideTransition extends StatelessWidget {
  final Widget child;
  final Animation<double> animation;
  final SlideDirection direction;
  final double distance;
  final Curve curve;

  const RouteSlideTransition({
    super.key,
    required this.child,
    required this.animation,
    this.direction = SlideDirection.fromRight,
    this.distance = 1.0,
    this.curve = Curves.easeOutCubic,
  });

  @override
  Widget build(BuildContext context) {
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

    final curvedAnimation = CurvedAnimation(parent: animation, curve: curve);

    final offsetTween = Tween<Offset>(begin: beginOffset, end: Offset.zero);

    return SlideTransition(
      position: offsetTween.animate(curvedAnimation),
      child: child,
    );
  }
}
