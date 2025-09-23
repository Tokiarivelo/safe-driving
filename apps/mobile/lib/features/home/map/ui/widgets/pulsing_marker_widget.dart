import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';

class PulsingMarkerWidget extends StatefulWidget {
  const PulsingMarkerWidget({super.key});
  @override
  State<PulsingMarkerWidget> createState() => _PulsingMarkerWidgetState();
}

class _PulsingMarkerWidgetState extends State<PulsingMarkerWidget> with SingleTickerProviderStateMixin {
  late final AnimationController _c;
  late final Animation<double> _scale;
  late final Animation<double> _opacity;

  @override
  void initState() {
    super.initState();
    _c = AnimationController(vsync: this, duration: const Duration(seconds: 2))..repeat();
    _scale = Tween<double>(begin: 1, end: 2.2).animate(CurvedAnimation(parent: _c, curve: Curves.easeOut));
    _opacity = Tween<double>(begin: 0.5, end: 0).animate(CurvedAnimation(parent: _c, curve: Curves.easeOut));
  }

  @override
  void dispose() {
    _c.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 80,
      height: 80,
      child: Stack(
        alignment: Alignment.center,
        children: [
          AnimatedBuilder(
            animation: _c,
            builder: (context, child) {
              return Transform.scale(
                scale: _scale.value,
                child: Opacity(
                  opacity: _opacity.value,
                  child: Container(
                    width: 40,
                    height: 40,
                    decoration: BoxDecoration(color: kBluePulse, shape: BoxShape.circle),
                  ),
                ),
              );
            },
          ),
          Container(
            width: 24,
            height: 24,
            decoration: const BoxDecoration(color: kBluePulse, shape: BoxShape.circle),
          ),
        ],
      ),
    );
  }
}