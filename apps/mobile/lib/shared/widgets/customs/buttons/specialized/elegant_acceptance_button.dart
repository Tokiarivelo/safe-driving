import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';

class ElegantAcceptanceButton {
  static Widget elegantAcceptanceButton({
    required String text,
    required String subtitle,
    required bool isAccepted,
    required VoidCallback onTap,
  }) {
    return GestureDetector(
      onTap: isAccepted ? null : onTap,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        width: double.infinity,
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(
          color: AppColors.light,
          border: Border.all(
            color: isAccepted
                ? AppColors.fillButtonBackground
                : AppColors.fillButtonBackground.withValues(alpha: 0.3),
            width: 2,
          ),
          borderRadius: BorderRadius.circular(16),
          boxShadow: [
            BoxShadow(
              color: isAccepted
                  ? AppColors.buttonWithoutBackGround.withValues(alpha: 0.1)
                  : AppColors.fillButtonBackground.withValues(alpha: 0.1),
              blurRadius: 8,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: Row(
          children: [
            AnimatedContainer(
              duration: const Duration(milliseconds: 400),
              curve: Curves.easeInOut,
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: isAccepted
                    ? AppColors.buttonWithoutBackGround
                    : AppColors.fillButtonBackground,
                borderRadius: BorderRadius.circular(12),
                boxShadow: isAccepted
                    ? [
                        BoxShadow(
                          color: AppColors.fillButtonBackground.withValues(
                            alpha: 0.3,
                          ),
                          blurRadius: 8,
                          spreadRadius: 2,
                        ),
                      ]
                    : [],
              ),
              child: AnimatedSwitcher(
                duration: const Duration(milliseconds: 300),
                transitionBuilder: (Widget child, Animation<double> animation) {
                  return ScaleTransition(
                    scale: animation,
                    child: FadeTransition(opacity: animation, child: child),
                  );
                },
                child: Icon(
                  isAccepted ? Icons.check_circle : Icons.article_outlined,
                  key: ValueKey<bool>(isAccepted),
                  color: AppColors.light,
                  size: 24,
                ),
              ),
            ),
            const SizedBox(width: 16),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    text,
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                      color: AppColors.textColor,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    isAccepted ? "Accepté ✓" : subtitle,
                    style: TextStyle(
                      fontSize: 14,
                      color: AppColors.textColor.withValues(alpha: 0.7),
                      fontWeight: isAccepted
                          ? FontWeight.w500
                          : FontWeight.normal,
                    ),
                  ),
                ],
              ),
            ),
            if (!isAccepted)
              Icon(
                Icons.arrow_forward_ios,
                color: AppColors.fillButtonBackground,
                size: 20,
              ),
          ],
        ),
      ),
    );
  }
}
