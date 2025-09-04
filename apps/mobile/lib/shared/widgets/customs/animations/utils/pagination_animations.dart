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
    return Builder(
      builder: (context) => ClipOval(
        child: Material(
          color: AppColors.transparent,
          child: InkWell(
            onTap: onTap,
            splashColor:
                AppColors.fillButtonBackground.adapt(context).withAlpha(77),
            highlightColor:
                AppColors.placeHolderInput.adapt(context).withAlpha(51),
            child: Container(
              width: size,
              height: size,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: isActive
                    ? AppColors.progress.adapt(context)
                    : AppColors.light.adapt(context),
                border: Border.all(
                  color: AppColors.light.adapt(context),
                  width: isCurrent ? 2.0 : (isActive ? 1.0 : 0.5),
                ),
                boxShadow: isCurrent
                    ? [
                        BoxShadow(
                          color: AppColors.light.adapt(context),
                          blurRadius: 2,
                          spreadRadius: 1,
                        ),
                      ]
                    : null,
              ),
            ),
          ),
        ),
      ),
    );
  }
}
