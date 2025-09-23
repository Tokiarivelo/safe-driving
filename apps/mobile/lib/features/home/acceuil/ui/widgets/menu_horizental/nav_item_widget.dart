import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/features/home/acceuil/models/nav_item.dart';

class NavItemWidget extends StatelessWidget {
  final NavItem item;
  final bool isActive;
  final Color activeColor;
  final Color tabBackgroundColor;
  final VoidCallback onTap;

  const NavItemWidget({
    super.key,
    required this.item,
    required this.isActive,
    required this.activeColor,
    required this.tabBackgroundColor,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    return GestureDetector(
      onTap: onTap,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeOutBack,
        transform: Matrix4.translationValues(0, isActive ? -20 : 0, 0),
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 35),
          decoration: BoxDecoration(
            color: isActive ? (isDark ? AppColors.backgroundSecondary : tabBackgroundColor) : null,
            shape: BoxShape.circle,
            border: isActive
                ? Border.all(color: isDark ? AppColors.light.withValues(alpha: 0.2) : tabBackgroundColor, width: 1)
                : null,
            boxShadow: isActive
                ? [
                    BoxShadow(
                      color: activeColor.withValues(alpha: 0.3),
                      blurRadius: 14,
                      offset: const Offset(0, 6),
                    ),
                  ]
                : null,
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              SvgPicture.asset(
                item.iconPath,
                width: isActive ? 35 : 25,
                height: isActive ? 35 : 25,
              ),
              Text(
                item.title,
                style: TextStyle(
                  color: isActive ? activeColor : (isDark ? AppColors.light : AppColors.dark),
                  fontWeight: isActive ? FontWeight.bold : FontWeight.w500,
                  fontSize: 11,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
