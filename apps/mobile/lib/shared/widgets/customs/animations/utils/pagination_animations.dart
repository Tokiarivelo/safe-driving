import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';

class PaginationAnimations {
  static Widget buildProgressBarAnimation({
    required Animation<double> animation,
    required Widget child,
  }) {
    return AnimatedBuilder(
      animation: animation,
      builder: (context, child) {
        final clampedOpacity = animation.value.clamp(0.0, 1.0);
        final translateY = (1 - clampedOpacity) * 30 - 5;

        return Transform.translate(
          offset: Offset(0, translateY),
          child: Opacity(opacity: clampedOpacity, child: child),
        );
      },
      child: child,
    );
  }

  static Widget buildClickAnimation({
    required Animation<double> animation,
    required Widget child,
  }) {
    return AnimatedBuilder(
      animation: animation,
      builder: (context, child) {
        return Transform.scale(scale: animation.value, child: child);
      },
      child: child,
    );
  }

  static Widget buildDotAnimation({
    required bool isActive,
    required bool isCurrent,
    required VoidCallback onTap,
    required double size,
  }) {
    return ClipOval(
      child: Material(
        color: AppColors.transparent,
        child: InkWell(
          onTap: onTap,
          splashColor: AppColors.fillButtonBackground.withAlpha(77),
          highlightColor: AppColors.placeHolderInput.withAlpha(51),
          child: Container(
            width: size,
            height: size,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: isActive ? AppColors.progress : AppColors.light,
              border: Border.all(
                color: AppColors.light,
                width: isCurrent ? 2.0 : (isActive ? 1.0 : 0.5),
              ),
              boxShadow: isCurrent
                  ? [
                      BoxShadow(
                        color: AppColors.light,
                        blurRadius: 2,
                        spreadRadius: 1,
                      ),
                    ]
                  : null,
            ),
          ),
        ),
      ),
    );
  }
}
