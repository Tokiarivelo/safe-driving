import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
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
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    return ElevatedButton(
      onPressed: onPressed,
      style: ElevatedButton.styleFrom(
        backgroundColor: isDark ? const Color(0xFF2A2A2A) : backgroundColor, 
        foregroundColor: isDark ? AppColors.light : AppColors.dark,
        elevation: isDark ? 2 : 3,
        shadowColor: isDark
            ? Colors.black.withValues(alpha: 0.3)
            : AppColors.dark.withValues(alpha: 0.1),
        padding: const EdgeInsets.all(5),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
          side: BorderSide(
            color: isDark ? const Color(0xFF3A3A3A) : Colors.transparent, // Bordure subtile en mode sombre
            width: 1,
          ),
        ),
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
                SvgPicture.asset(
                  iconPath,
                  width: iconSize,
                  height: iconSize,
                  // Keep original SVG color; do not override in dark mode
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
                  style: TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.w500,
                    color: isDark ? AppColors.light.withValues(alpha: 0.85) : AppColors.dark,
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
                    border: Border.all(
                      color: isDark ? const Color(0xFF2A2A2A) : backgroundColor,
                      width: 2,
                    ),
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
