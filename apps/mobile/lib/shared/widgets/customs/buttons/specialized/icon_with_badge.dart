import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';

class IconButtonWithBadge extends StatelessWidget {
  final String iconPath;
  final String title;
  final bool hasNotification;
  final int notificationCount;
  final double iconSize;
  final double badgeSize;
  final Color badgeColor;
  final Color textColor;
  final VoidCallback onPressed;
  final EdgeInsetsGeometry padding;
  final Color backgroundColor;

  const IconButtonWithBadge({
    super.key,
    required this.iconPath,
    required this.title,
    required this.onPressed,
    this.hasNotification = false,
    this.notificationCount = 0,
    this.iconSize = 32,
    this.badgeSize = 20,
    this.badgeColor = AppColors.error,
    this.textColor = AppColors.light,
    this.padding = const EdgeInsets.all(5),
    this.backgroundColor = AppColors.light,
  });

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: onPressed,
      style: ElevatedButton.styleFrom(
        backgroundColor: backgroundColor,
        foregroundColor: AppColors.dark,
        elevation: 3,
        shadowColor: AppColors.dark.withValues(alpha: 0.1),
        padding: const EdgeInsets.all(5),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        animationDuration: const Duration(milliseconds: 100),
      ),
      child: Container(
        padding: padding,
        child: Stack(
          clipBehavior: Clip.none,
          children: [
            Column(
              mainAxisAlignment: MainAxisAlignment.center,
              mainAxisSize: MainAxisSize.min,
              children: [
                Image.asset(
                  iconPath,
                  width: iconSize,
                  height: iconSize,
                  errorBuilder: (context, error, stackTrace) {
                    return Icon(
                      Icons.error,
                      size: iconSize,
                      color: Colors.grey[600],
                    );
                  },
                ),
                Text(
                  title,
                  textAlign: TextAlign.center,
                  style: const TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.w500,
                    color: AppColors.dark,
                  ),
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                ),
              ],
            ),

            // Badge de notification
            if (hasNotification)
              Positioned(
                top: -6,
                right: -6,
                child: Container(
                  width: badgeSize,
                  height: badgeSize,
                  decoration: BoxDecoration(
                    color: badgeColor,
                    shape: BoxShape.circle,
                    border: Border.all(color: backgroundColor, width: 2),
                  ),
                  child: Center(
                    child: Text(
                      notificationCount > 9
                          ? '9+'
                          : notificationCount.toString(),
                      style: TextStyle(
                        color: textColor,
                        fontSize: badgeSize * 0.45,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }
}
